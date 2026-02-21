# 1Fi Full Stack Developer Assignment - Mobile Display App

A full-stack web application that displays smartphones with variant-wise EMI plans.

## Tech Stack

- **Frontend:** React (Vite), React Router, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose

## Features Implemented

- Dynamic product listing page from backend API (`/products`)
- Unique product URLs (`/products/:slug`)
- Product detail view with:
  - product name, variant, MRP, price, image
  - selectable EMI plans (monthly amount, tenure, interest rate, cashback, mutual fund backing)
  - proceed button for selected plan
- Backend APIs with database-driven data (no hardcoded frontend data)
- Seed script with **23 products**, each having **2 variants**, and each variant having **2 EMI plans**

---

## Project Structure

- `client/` → React frontend
- `server/` → Express backend + MongoDB schema/seed

---

## Setup and Run Instructions

### 1) Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### 2) Backend setup

```bash
cd server
cp .env.example .env
```

Update `.env` if needed:

```env
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/mobile_display_app
```

Install and seed data:

```bash
npm install
npm run seed
```

Run backend:

```bash
npm run dev
```

Backend will run on `http://localhost:4000`.

### 3) Frontend setup

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`.

---

## API Endpoints and Example Responses

### `GET /api/health`

Response:

```json
{
  "status": "ok"
}
```

### `GET /api/products`

Returns product list for cards.

Example response:

```json
[
  {
    "id": "65f1b2...",
    "name": "Apple iPhone 17 Pro",
    "slug": "apple-iphone-17-pro",
    "shortDescription": "Flagship Apple smartphone with Pro camera system.",
    "startingPrice": 142999,
    "imageUrl": "https://...",
    "variantCount": 2
  }
]
```

### `GET /api/products/:slug`

Returns full product details including variants and EMI plans.

Example response:

```json
{
  "_id": "65f1b2...",
  "name": "Apple iPhone 17 Pro",
  "slug": "apple-iphone-17-pro",
  "shortDescription": "Flagship Apple smartphone with Pro camera system.",
  "variants": [
    {
      "_id": "65f1b3...",
      "name": "256 GB · Silver",
      "mrp": 149900,
      "price": 142999,
      "imageUrl": "https://...",
      "emiPlans": [
        {
          "_id": "65f1b4...",
          "fundName": "Axis Mutual Fund",
          "monthlyPayment": 11917,
          "tenureMonths": 12,
          "interestRate": 0,
          "cashback": 3000
        }
      ]
    }
  ]
}
```

---

## Schema Used

`Product` collection schema:

- `name` (String, required)
- `slug` (String, required, unique)
- `shortDescription` (String)
- `variants` (Array, min 2):
  - `name` (String, required)
  - `mrp` (Number, required)
  - `price` (Number, required)
  - `imageUrl` (String, required)
  - `emiPlans` (Array, min 1):
    - `fundName` (String, required)
    - `monthlyPayment` (Number, required)
    - `tenureMonths` (Number, required)
    - `interestRate` (Number, required)
    - `cashback` (Number, default 0)

Seed file path: `server/seed/seed.js`

---

## Deployment Notes

### Suggested hosting

- **Frontend:** Vercel
- **Backend:** Render / Railway / Fly.io
- **Database:** MongoDB Atlas

### Environment variables

- Backend (`server`):
  - `PORT`
  - `MONGO_URI`
- Frontend (`client`):
  - `VITE_API_BASE_URL` (point this to deployed backend URL)

---

