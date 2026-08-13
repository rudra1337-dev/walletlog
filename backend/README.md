# WalletLog Backend

This is the backend service for WalletLog, built with Node.js, Express.js, Prisma, and PostgreSQL.

It provides authentication, protected transaction APIs, category lookup, and analytics endpoints for the frontend application.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Passport.js
- JWT
- bcrypt
- Zod validation

## Project Structure

```bash
backend/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   ├── seed.js
│   └── seedDemo.js
├── src/
│   ├── config/
│   │   └── passport.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── transaction.controller.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   └── validate.js
│   ├── routes/
│   │   ├── analytics.routes.js
│   │   ├── auth.routes.js
│   │   ├── category.routes.js
│   │   └── transaction.routes.js
│   ├── services/
│   │   ├── analytics.service.js
│   │   ├── auth.service.js
│   │   └── transaction.service.js
│   ├── utils/
│   │   ├── authCookie.js
│   │   └── jwt.js
│   └──
├── .env
├── package.json
├── server.js
└── README.md
```

## Features

- Local signup and login
- JWT-based protected routes
- Google OAuth login flow
- Transaction CRUD endpoints
- Analytics summary endpoints
- Category listing for filters and dropdowns
- Validation using Zod schemas
- Prisma-based database access

## Prerequisites

- Node.js 18+
- PostgreSQL instance running
- A Google Cloud OAuth client configured (optional for Google auth)

## Environment Variables

Create a `.env` file in the backend folder:

```env
DATABASE_URL="postgresql://user:password@host:5432/walletlog"
DIRECT_URL="postgresql://user:password@host:5432/walletlog"
JWT_SECRET="your-super-secret-key"
CLIENT_URL="http://localhost:5173"
PORT=5000
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Notes

- `DATABASE_URL` is used by Prisma for normal app queries.
- `DIRECT_URL` is commonly used for Prisma migrations.
- `CLIENT_URL` is used in CORS and Google OAuth redirects.
- `JWT_SECRET` is required to sign and validate tokens.

## Installation

```bash
cd backend
npm install
```

## Database Setup

Generate Prisma client and apply migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

Seed default categories:

```bash
node prisma/seed.js
```

If you want demo data as well:

```bash
node prisma/seedDemo.js
```

## Run the Server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The backend server starts on port `5000` by default.

## Health Check

```bash
curl http://localhost:5000/api/health
```

Expected response:

```json
{ "status": "ok" }
```

## API Overview

### Authentication

- `POST /api/auth/signup` — register a user
- `POST /api/auth/login` — login with email and password
- `POST /api/auth/logout` — clear auth cookie
- `GET /api/auth/me` — fetch current authenticated user
- `GET /api/auth/google` — start Google OAuth flow
- `GET /api/auth/google/callback` — complete Google OAuth flow

### Transactions

All transaction endpoints require authentication.

- `GET /api/transactions` — list user transactions
- `GET /api/transactions/:id` — fetch one transaction
- `POST /api/transactions` — create a transaction
- `PUT /api/transactions/:id` — update a transaction
- `DELETE /api/transactions/:id` — delete a transaction

### Categories

- `GET /api/categories` — fetch categories for filtering or dropdowns

### Analytics

- `GET /api/analytics/summary` — total income, expense, and balance
- `GET /api/analytics/by-category` — category spending breakdown
- `GET /api/analytics/monthly` — monthly totals
- `GET /api/analytics/trend` — trend data over time

## Auth Behavior

The backend uses JWTs stored in an httpOnly cookie for protected requests.

When a user logs in or signs up, the server creates a token and sends it via cookie. The frontend then includes credentials automatically with Axios.

## Prisma Schema

The main Prisma models are:

- `User`
- `Category`
- `Transaction`

A user has many transactions, and each transaction belongs to a user and category.

## Scripts

```bash
npm run dev
npm start
npm run prisma:migrate
npm run prisma:studio
npm run prisma:seed
npm run prisma:seed-demo
```

## Notes

This backend is designed for a personal finance dashboard but follows clean architecture patterns such as:

- route-level auth middleware
- controller/service separation
- centralized error handling
- Prisma data access
- validation at the request layer

This keeps the project simple to understand while staying practical for real-world use.
