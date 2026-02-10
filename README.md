# FriendsMart E-commerce (Amazon/Flipkart-style starter)

This project contains a full-stack e-commerce starter with:

- `frontend/`: HTML + CSS + Vanilla JavaScript UI
- `backend/`: Node.js + Express + MongoDB (Mongoose)

## 1) Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Update `.env` values:

- `MONGO_URI`: your MongoDB connection string
- `JWT_SECRET`: strong random secret

Run backend:

```bash
npm run dev
```

API runs on `http://localhost:5000`.

## 2) Frontend setup

Serve `frontend/` with a simple static server (example):

```bash
cd frontend
python3 -m http.server 5500
```

Then open: `http://localhost:5500/index.html`

## 3) How frontend connects to backend

- `frontend/js/config.js` defines `API_BASE_URL = 'http://localhost:5000/api'`.
- All pages use `fetch()` calls to this API.
- On login/register, JWT token is stored in `localStorage`.
- Protected requests include `Authorization: Bearer <token>`.

## 4) Implemented API routes

- Auth:
  - `POST /api/auth/signup`
  - `POST /api/auth/login`
  - `GET /api/auth/me`
- Products:
  - `GET /api/products`
  - `GET /api/products/:id`
  - `POST /api/products` (admin)
  - `PUT /api/products/:id` (admin)
  - `DELETE /api/products/:id` (admin)
- Cart:
  - `GET /api/cart`
  - `POST /api/cart/add`
  - `DELETE /api/cart/remove/:productId`
- Orders:
  - `POST /api/orders`
  - `GET /api/orders`

## 5) User roles

- Default role on signup: `customer`
- To create admin users quickly for demo, send `role: "admin"` in signup payload.

## 6) Notes

- Checkout is implemented without real payment integration, as requested.
- UI is responsive and intentionally simple for extension.
