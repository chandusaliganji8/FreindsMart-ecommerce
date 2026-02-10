# FriendSmart E-commerce (Amazon/Flipkart-style starter)

This project includes:
- **Backend:** Node.js + Express + MongoDB (Mongoose)
- **Frontend:** HTML + CSS + JavaScript using `fetch()` APIs

## 1) Backend setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Update `.env` values:
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: secure random string
- `CLIENT_ORIGIN`: frontend origin for CORS

Backend runs at `http://localhost:5000`.

## 2) Frontend setup

You can serve frontend with any static server, e.g. VSCode Live Server or:

```bash
# from repository root
python3 -m http.server 5500
```

Open `http://localhost:5500/frontend/index.html`.

## 3) Connecting frontend with backend

Frontend API base URL is defined in:
- `frontend/js/api.js` → `API_BASE_URL = 'http://localhost:5000/api'`

If backend host/port changes, update this constant.

## 4) API overview

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` (admin)
- `PUT /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)
- `GET /api/cart`
- `POST /api/cart/add`
- `DELETE /api/cart/remove/:productId`
- `POST /api/orders`
- `GET /api/orders`

## 5) Admin user

Register a normal user, then manually update role in MongoDB to `admin` for that user document.
