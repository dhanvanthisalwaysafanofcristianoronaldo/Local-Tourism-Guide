/* Experiment 10: Node.js form handling and MongoDB persistence.
 * Uses only Node's built-in HTTP server plus the MongoDB driver and bcryptjs.
 * Comments call out routing, body parsing, validation, persistence, and rendering.
 */
"use strict";

const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");

const PORT = Number(process.env.PORT || 6000);
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const DATABASE = process.env.MONGODB_DATABASE || "experiment10";
const CSS_PATH = path.join(__dirname, "public", "styles.css");
const MAX_BODY_BYTES = 16 * 1024;
const STATES = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];
const SKILLS = ["JavaScript", "Python", "C++", "Java"];
const client = new MongoClient(MONGODB_URI);
let registrations;

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);
}

function send(res, status, content, type = "text/html; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": type,
    "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy": "default-src 'self'; style-src 'self' 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
    "Referrer-Policy": "no-referrer"
  });
  res.end(content);
}

function readForm(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    let bytes = 0;
    req.on("data", (chunk) => {
      bytes += chunk.length;
      if (bytes > MAX_BODY_BYTES) {
        reject(Object.assign(new Error("Form submission is too large."), { status: 413 }));
        req.destroy();
        return;
      }
      body += chunk.toString("utf8");
    });
    req.on("end", () => resolve(new URLSearchParams(body)));
    req.on("error", reject);
  });
}

function validate(fields) {
  const errors = [];
  const name = (fields.get("name") || "").trim();
  const password = fields.get("password") || "";
  const ageText = fields.get("age") || "";
  const age = Number(ageText);
  const mobile = (fields.get("mobile") || "").trim();
  const email = (fields.get("email") || "").trim();
  const gender = fields.get("gender") || "";
  const state = fields.get("state") || "";
  const skills = fields.getAll("skills");

  if (!/^[\p{L}][\p{L} .'-]{0,79}$/u.test(name)) errors.push("Enter a name using letters, spaces, apostrophes, periods, or hyphens.");
  if (password.length < 8 || password.length > 128) errors.push("Password must be between 8 and 128 characters.");
  if (!Number.isInteger(age) || age < 1 || age > 120) errors.push("Age must be a whole number from 1 to 120.");
  if (!/^\d{10}$/.test(mobile)) errors.push("Mobile number must contain exactly 10 digits.");
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Enter a valid email address.");
  if (!["Male", "Female"].includes(gender)) errors.push("Choose a gender option.");
  if (!STATES.includes(state)) errors.push("Choose a state from the list.");
  if (!skills.length || skills.some((skill) => !SKILLS.includes(skill))) errors.push("Select at least one listed skill.");

  return { errors, values: { name, age: ageText, mobile, email, gender, state, skills } };
}

function page(content, title = "Experiment 10 | Registration") {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title><link rel="stylesheet" href="/styles.css"></head><body><header class="top"><div class="wrap top-inner"><a class="brand" href="/">Form Lab <span>10</span></a><nav><a href="/">Registration</a><a href="/records">Saved records</a></nav></div></header><main class="wrap">${content}</main><footer class="foot"><div class="wrap">Experiment 10 · HTML Form Request Handling Using Node.js and MongoDB</div></footer></body></html>`;
}

function renderErrors(errors) {
  if (!errors.length) return "";
  return `<section class="errors" role="alert"><h2>Please correct these fields</h2><ul>${errors.map((e) => `<li>${escapeHtml(e)}</li>`).join("")}</ul></section>`;
}

function renderForm(errors = [], values = {}) {
  const checked = (skill) => values.skills?.includes(skill) ? " checked" : "";
  const selected = (key, value) => values[key] === value ? " selected" : "";
  const fields = `<section class="intro"><p class="kicker">Program 01 · Node.js + MongoDB</p><h1>User registration form</h1><p class="lead">Complete every required field. Your submission is checked by the browser and validated again by the server before it is saved.</p><div class="notice"><strong>Privacy:</strong> passwords are hashed before storage and are never shown on the results page.</div></section>${renderErrors(errors)}<form class="form card" action="/server" method="post">
  <div class="form-grid"><div class="field"><label for="name">Name <b>*</b></label><input id="name" name="name" type="text" required maxlength="80" pattern="[A-Za-z][A-Za-z .'-]*" value="${escapeHtml(values.name || "")}" autocomplete="name" placeholder="John David"></div>
  <div class="field"><label for="password">Password <b>*</b></label><input id="password" name="password" type="password" required minlength="8" maxlength="128" autocomplete="new-password" placeholder="At least 8 characters"></div>
  <div class="field"><label for="age">Age <b>*</b></label><input id="age" name="age" type="number" min="1" max="120" step="1" required value="${escapeHtml(values.age || "")}" placeholder="30"></div>
  <div class="field"><label for="mobile">Mobile number <b>*</b></label><input id="mobile" name="mobile" type="tel" required pattern="[0-9]{10}" minlength="10" maxlength="10" inputmode="numeric" autocomplete="tel" value="${escapeHtml(values.mobile || "")}" placeholder="10 digits"></div>
  <div class="field"><label for="email">Email <b>*</b></label><input id="email" name="email" type="email" required maxlength="254" autocomplete="email" value="${escapeHtml(values.email || "")}" placeholder="you@example.com"></div>
  <fieldset class="field"><legend>Gender <b>*</b></legend><label class="choice"><input type="radio" name="gender" value="Male" required${selected("gender","Male")}> Male</label><label class="choice"><input type="radio" name="gender" value="Female" required${selected("gender","Female")}> Female</label></fieldset>
  <div class="field"><label for="state">State <b>*</b></label><select id="state" name="state" required><option value="">Select your state</option>${STATES.map((s)=>`<option${selected("state",s)}>${escapeHtml(s)}</option>`).join("")}</select></div>
  <fieldset class="field skills"><legend>Skills <b>*</b> <small>Select at least one</small></legend>${SKILLS.map((s,i)=>`<label class="choice"><input type="checkbox" name="skills" value="${escapeHtml(s)}"${i === 0 ? " required" : ""}${checked(s)}> ${escapeHtml(s)}</label>`).join("")}</fieldset></div>
  <button class="button" type="submit">Submit registration</button><p class="hint">* All fields are mandatory. Fields are also validated on the server.</p></form>`;
  return page(fields);
}

function renderRecordRows(records) {
  if (!records.length) return `<tr><td colspan="8" class="empty">No registrations saved yet. <a href="/">Create the first one.</a></td></tr>`;
  return records.map((record) => `<tr><td>${escapeHtml(record.name)}</td><td>${escapeHtml(record.age)}</td><td>${escapeHtml(record.mobile)}</td><td>${escapeHtml(record.email)}</td><td>${escapeHtml(record.gender)}</td><td>${escapeHtml(record.state)}</td><td>${escapeHtml(record.skills.join(", "))}</td><td>${escapeHtml(new Date(record.createdAt).toLocaleString())}</td></tr>`).join("");
}

async function showRecords(res, records, success = false) {
  const content = `<p class="kicker">MongoDB collection · registrations</p><h1>User submitted details</h1>${success ? '<p class="success" role="status">Registration saved successfully in MongoDB.</p>' : ""}<p class="lead">The table shows saved registration details. Passwords are intentionally excluded.</p><div class="table-wrap card"><table><thead><tr><th>Name</th><th>Age</th><th>Mobile</th><th>Email</th><th>Gender</th><th>State</th><th>Skills</th><th>Submitted</th></tr></thead><tbody>${renderRecordRows(records)}</tbody></table></div><p class="actions"><a class="button" href="/">Register another user</a></p>`;
  send(res, 200, page(content, "Submitted details | Experiment 10"));
}

async function handle(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  if (req.method === "GET" && url.pathname === "/") {
    return send(res, 200, renderForm());
  }
  if (req.method === "GET" && url.pathname === "/styles.css") {
    return send(res, 200, fs.readFileSync(CSS_PATH, "utf8"), "text/css; charset=utf-8");
  }
  if (req.method === "GET" && url.pathname === "/records") {
    const records = await registrations.find({}, { projection: { passwordHash: 0 } }).sort({ createdAt: -1 }).limit(200).toArray();
    return showRecords(res, records);
  }
  if (req.method === "POST" && url.pathname === "/server") {
    let fields;
    try { fields = await readForm(req); }
    catch (error) { return send(res, error.status || 400, page(`<h1>Could not read the form</h1><p>${escapeHtml(error.message)}</p><a href="/">Return to registration</a>`)); }
    const { errors, values } = validate(fields);
    if (errors.length) return send(res, 400, renderForm(errors, values));
    const passwordHash = await bcrypt.hash(fields.get("password"), 12);
    const saved = await registrations.insertOne({ ...values, passwordHash, createdAt: new Date() });
    const records = await registrations.find({}, { projection: { passwordHash: 0 } }).sort({ createdAt: -1 }).limit(200).toArray();
    // Keep the inserted id available as a simple response confirmation.
    if (!saved.insertedId) throw new Error("MongoDB did not confirm the insert.");
    return showRecords(res, records, true);
  }
  return send(res, 404, page(`<h1>Page not found</h1><p>The requested route does not exist.</p><a href="/">Return to registration</a>`));
}

async function start() {
  await client.connect();
  registrations = client.db(DATABASE).collection("registrations");
  await registrations.createIndex({ createdAt: -1 });
  const server = http.createServer((req, res) => {
    handle(req, res).catch((error) => {
      console.error("Request failed:", error);
      if (!res.headersSent) send(res, 500, page(`<h1>Something went wrong</h1><p>Check that MongoDB is running, then try again.</p><a href="/">Return to registration</a>`));
      else res.destroy();
    });
  });
  server.listen(PORT, () => console.log(`Experiment 10 ready at http://localhost:${PORT}`));
  const shutdown = async () => { server.close(); await client.close(); process.exit(0); };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

start().catch((error) => {
  console.error("Could not start the app. Ensure MongoDB is running and MONGODB_URI is correct.", error.message);
  process.exit(1);
});
