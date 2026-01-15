# GIGflow – Freelance Marketplace (Hiring Flow)

A full-stack marketplace application where clients can post gigs, freelancers can place bids, and clients can **hire** a freelancer. The hiring action is implemented as a **transaction-safe, atomic business event**:

* A gig transitions from `open` → `assigned`
* The selected bid becomes `hired`
* All other bids become `rejected`

This guarantees data consistency even under concurrent requests.

---

## Tech Stack

* **Backend:** Node.js, Express, MongoDB, Mongoose
* **Frontend:** React (Vite) + Tailwind
* **Auth:** Cookie-based session / JWT

---

## Features

* User authentication
* Gig creation & listing
* Bidding on gigs
* Secure hiring flow (transactional)
* Status management for gigs and bids

---

## Project Structure

```
root/
  backend/
    src/
        middlewares/
        models/
        routes/
        utils/
    app.js
    db.js
  frontend/
    src/
    vite.config.js
  .env.example
  README.md
```
---

## API Overview

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/login`    | Log in a user       |
| POST   | `/api/auth/register` | Register a new user |

### Gigs

| Method | Endpoint       | Description                                  |
| ------ | -------------- | -------------------------------------------- |
| GET    | `/api/gigs`    | Fetch all **open** gigs                      |
| GET    | `/api/gigs/me` | Fetch all gigs created by the signed-in user |
| POST   | `/api/gigs`    | Create a new gig                             |

### Bids

| Method | Endpoint           | Description                                 |
| ------ | ------------------ | ------------------------------------------- |
| GET    | `/api/bids/me`     | Fetch all bids placed by the signed-in user |
| GET    | `/api/bids/:gigId` | Fetch all bids for a specific gig           |
| PATCH  | `/api/bids/:bidId` | Hire a bidder (transactional)               |
| POST   | `/api/bids`        | Create a new bid                            |


---

## Environment Setup

Create a `.env` file in the backend and frontend based on `.env.example`.

### `.env.example`

```env
# Backend
PORT=5000
MONGODB_URI
JWT_ACCESS_SECRET
JWT_REFRESH_SECRET
NODE_ENV=production

# Frontend (Vite)
VITE_API_URL=http://localhost:5000
```

---

## Running the Project

### Backend

```bash
cd backend
npm install
npm run dev
```

Server runs on `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

---

## Hiring Flow (Core Assignment)

1. Client logs in 
2. Navigates to profile 
3. Opens a gig
4. Sees all the bids
4. Clicks **Hire** on a bid
5. Backend executes a transaction:

   * Gig: `open` → `assigned`
   * Selected bid: `pending` → `hired`
   * Other bids: `pending` → `rejected`
6. UI updates without page refresh

This flow is concurrency-safe and cannot leave the system in a partial state.

---

## API Overview

### Hire a Bid

```
PATCH /api/bids/:id
```

* Requires authentication
* Only the gig owner may perform this action
* Executes a MongoDB transaction

Success response:

```json
{ "message": "Bid hired successfully" }
```

---

## Demo

A minute Loom video demonstrates:

Client:
    * Login
    * Create a gig
    * Check his profile
    * Opening a gig
    * Viewing bids
    * Hiring a freelancer
    * Live UI update of statuses

Freelancer:
    * Searches for the gig
    * Places a bid

---

