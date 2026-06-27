# MV Dugar — backend

Express + MongoDB API powering the public product catalogue and the `/admin` console on the frontend.

## Stack
- Node.js (ESM) + Express 4
- MongoDB via Mongoose
- JWT-based admin session (single shared password)
- Multer image uploads (served from `/uploads`)

## First-time setup

```bash
cd backend
npm install
cp .env.example .env      # fill ADMIN_PASSWORD + JWT_SECRET + MONGODB_URI
npm run seed              # one-time: import the existing 5-Series catalogue
npm run dev               # start on http://localhost:4000
```

You need a MongoDB instance — either local (`mongod`) or a free Atlas cluster.

## Endpoints

| Method | Path                       | Auth | Notes                           |
| ------ | -------------------------- | ---- | ------------------------------- |
| GET    | `/api/health`              | —    | liveness probe                  |
| POST   | `/api/auth/login`          | —    | body `{ password }` → `{ token }` |
| GET    | `/api/auth/me`             | bearer | token-validity check          |
| GET    | `/api/products`            | —    | public catalogue                |
| GET    | `/api/products/:slug`      | —    | single product                  |
| POST   | `/api/products`            | admin | create                          |
| PUT    | `/api/products/:slug`      | admin | update                          |
| DELETE | `/api/products/:slug`      | admin | hard delete                     |
| POST   | `/api/upload`              | admin | multipart `file` field → `{ url }` |

Send the admin token as `Authorization: Bearer <token>`.

## Environment

Required keys (`.env`):
- `MONGODB_URI` — Mongo connection string
- `ADMIN_PASSWORD` — single shared admin password
- `JWT_SECRET` — long random string used to sign session tokens
- `PORT` — defaults to 4000
- `PUBLIC_BASE_URL` — base used when building image URLs (e.g. `http://localhost:4000`)
- `CORS_ORIGINS` — comma-separated allowed origins (e.g. `http://localhost:5173`)
