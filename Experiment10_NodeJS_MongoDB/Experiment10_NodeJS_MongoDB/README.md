# Experiment 10 — HTML Form Request Handling Using Node.js and MongoDB

This project implements the registration exercise in the supplied manual. A required HTML registration form is served at `http://localhost:6000`. Submitting it posts to `/server`; the Node.js HTTP server validates the form, hashes the password, saves the record in MongoDB, and renders the saved entries in a table. `/records` shows the saved table again.

## Fields from the manual

Name, password, age, mobile number, email, gender, state, and skills. Browser-native form validation is included, and every field is checked again on the server. At least one skill is required.

## Requirements

- Node.js 18 or newer
- MongoDB Community Server running locally, or a MongoDB connection URI
- Internet access once to install the project packages

## Start on Windows / Git Bash

1. Start MongoDB locally. The default URI is `mongodb://127.0.0.1:27017`.
2. Open Git Bash in this project directory.
3. Run:

   ```bash
   npm install
   npm start
   ```

4. Open `http://localhost:6000` in your browser.

To use a different MongoDB URI, set `MONGODB_URI` before `npm start`. Optional settings are `PORT` (default `6000`) and `MONGODB_DATABASE` (default `experiment10`). The `.env.example` file documents these values; Node does not load `.env` automatically.

## MongoDB data

Records are saved in database `experiment10`, collection `registrations`. Passwords are stored as bcrypt hashes and are never rendered in the result table. The results view intentionally displays submitted personal details to match the lab exercise; use sample data for a classroom demo.

## Request flow

`GET /` serves the form → `POST /server` parses and validates `application/x-www-form-urlencoded` form data → MongoDB insert → HTML table response. `GET /records` reads the newest saved records. Output values are HTML-escaped.
