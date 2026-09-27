# 🌿 SafarSetu (सफ़र सेतु)
> **Sustainable Tourism & Smart Eco-Mobility Platform**

SafarSetu is a full-stack smart tourism and eco-mobility application designed to promote sustainable travel across India. The platform integrates green transit options, eco-certified homestays/hotels, real-time carbon offset incentives via an Eco-Token economy, interactive routing, and a seamless in-app checkout experience.

---

## 🚀 Live Demo
* **Live Deployment:** [https://safarsetu-tixw.onrender.com](https://safarsetu-tixw.onrender.com)
* **GitHub Repository:** [https://github.com/BhattSakshi/SafarSetu](https://github.com/BhattSakshi/SafarSetu)

---

## ✨ Key Features

### 1. 🚆 Sustainable Transit & Stays
* Browse verified green transit options (electric buses, carbon-neutral trains, EV cabs).
* Explore sustainable hotels and heritage homestays with verified green ratings.
* Dynamic off-peak fare reductions and transparent sustainability fee breakdowns.

### 2. 🪙 Eco-Token Incentive Engine
* Travelers earn **Eco-Tokens** automatically upon booking eco-friendly transit and accommodation.
* Tokens can be redeemed during checkout for instant discounts on future bookings.
* Integrated profile dashboard tracking carbon offsets and accumulated token balances.

### 3. 💳 Interactive Checkout System
* Multi-channel checkout supporting **UPI & QR Codes** (GPay, PhonePe, Paytm), **Credit/Debit Cards**, **Net Banking**, and **Wallets**.
* Automated order state generation, transaction referencing, and real-time payment status simulation.
* Instant generation of verifiable tax receipts and synchronized "My Bookings" profile updates.

### 4. 🗺️ Interactive Maps & Experience Explorer
* Leaflet-based geospatial mapping of sustainable cultural sites, scenic routes, and local artisan hubs.
* Filterable points of interest with real-time route visualization.

---

## 🛠️ Tech Stack

* **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3, Tailwind CSS / Custom Glassmorphic UI, Leaflet.js
* **Backend:** Node.js, Express.js
* **Database:** SQLite (lightweight, zero-config relational persistence)
* **Authentication:** JWT (JSON Web Tokens) with secure local storage persistence
* **Deployment & CI/CD:** Render, GitHub Actions / Auto-Deploy

---

## 📂 Project Architecture

```text
SafarSetu/
├── public/                 # Static client assets
│   ├── css/                # Styling and layout rules
│   ├── js/                 # Client-side controllers and DOM logic
│   │   └── app.js          # Main frontend logic & payment triggers
│   └── index.html          # Main single-page web view
├── database.sqlite         # SQLite database file
├── server.js               # Express application server, API routes & SQLite queries
├── package.json            # Project dependencies and run scripts
└── README.md               # Project documentation
