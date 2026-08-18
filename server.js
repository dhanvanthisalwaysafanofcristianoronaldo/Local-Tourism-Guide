const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const destinations = [
  {
    id: "ooty",
    name: "Ooty",
    category: "Hill Station",
    bestFor: "Nature, tea gardens and cool weather",
    shortDescription: "Misty mountains, beautiful tea gardens and pleasant weather.",
    description: "Ooty is a popular hill destination known for its scenic landscapes, tea estates, gardens and cool climate.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "kodaikanal",
    name: "Kodaikanal",
    category: "Hill Station",
    bestFor: "Lakes, viewpoints and trekking",
    shortDescription: "Peaceful lakes, waterfalls and breathtaking viewpoints.",
    description: "Kodaikanal offers scenic viewpoints, forest routes, a beautiful lake and a relaxed hill-station atmosphere.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "madurai",
    name: "Madurai",
    category: "Heritage",
    bestFor: "Temples, culture and architecture",
    shortDescription: "Historic temples, culture and traditional architecture.",
    description: "Madurai is a historic cultural destination famous for its temple architecture, markets and traditional Tamil heritage.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80"
  }
];

const DATA_DIR = path.join(__dirname, "data");
const CONTACT_FILE = path.join(DATA_DIR, "contacts.json");
const BOOKING_FILE = path.join(DATA_DIR, "bookings.json");

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(CONTACT_FILE)) fs.writeFileSync(CONTACT_FILE, "[]");
if (!fs.existsSync(BOOKING_FILE)) fs.writeFileSync(BOOKING_FILE, "[]");

function saveRecord(file, record) {
  const records = JSON.parse(fs.readFileSync(file, "utf8"));
  records.push(record);
  fs.writeFileSync(file, JSON.stringify(records, null, 2));
}

app.get("/api/destinations", (req, res) => {
  res.json(destinations.map(({id, name, category, shortDescription, image}) =>
    ({id, name, category, shortDescription, image})
  ));
});

app.get("/api/destinations/:id", (req, res) => {
  const destination = destinations.find(d => d.id === req.params.id);
  if (!destination) return res.status(404).json({message: "Destination not found"});
  res.json(destination);
});

app.post("/api/contact", (req, res) => {
  const {name, email, message} = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({message: "Please fill in all contact fields."});
  }

  saveRecord(CONTACT_FILE, {
    id: Date.now(),
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  });

  res.json({message: "Thanks! Your message has been received."});
});

app.post("/api/bookings", (req, res) => {
  const {name, destinationId, destination} = req.body;

  if (!name || !destinationId || !destination) {
    return res.status(400).json({message: "Missing booking information."});
  }

  saveRecord(BOOKING_FILE, {
    id: Date.now(),
    name,
    destinationId,
    destination,
    createdAt: new Date().toISOString()
  });

  res.json({message: `Trip request for ${destination} received, ${name}!`});
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Local Tourism Guide running at http://localhost:${PORT}`);
});
