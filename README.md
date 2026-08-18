# Local Tourism Guide — Full Stack

## Requirements
- Node.js installed
- VS Code recommended

## Run
1. Open this folder in VS Code.
2. Open the terminal in this folder.
3. Run:
   npm install
4. Then run:
   npm start
5. Open:
   http://localhost:3000

## Features
- Responsive HTML5/CSS3 frontend
- Flexbox and media queries
- Working navigation buttons
- Working destination "Explore" buttons
- Destination details loaded from backend API
- Contact form connected to backend
- Trip planning request connected to backend
- JSON files used as a simple local database

## Backend API
GET  /api/destinations
GET  /api/destinations/:id
POST /api/contact
POST /api/bookings

Submitted contact messages are saved in:
data/contacts.json

Trip requests are saved in:
data/bookings.json
