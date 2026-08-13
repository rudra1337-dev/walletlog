# WalletLog

WalletLog is a full-stack personal finance app that helps users track income and expenses, view summaries, and analyze spending patterns with clear visual dashboards.

This repository contains:
- a Node.js + Express API backend
- a React + Vite frontend application
- a PostgreSQL database managed with Prisma
- Google OAuth and local email/password authentication

## Features

- User sign up and login with email/password
- Google OAuth sign-in
- Add, edit, and delete transactions
- Categorize transactions by income or expense type
- Dashboard summary for balance, income, and spending
- Category, monthly, and trend analytics charts
- Protected routes based on authenticated user state
- JWT-based auth with secure cookie handling

## Tech Stack

- Frontend: React, Vite, Redux Toolkit, React Router, Axios, Bootstrap, Recharts
- Backend: Node.js, Express.js, Prisma ORM, PostgreSQL, Passport.js
- Authentication: JWT + Google OAuth 2.0
- Database: PostgreSQL

## Repository Structure

```bash
walletlog/
├── backend/
│   ├── prisma/
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── README.md
└── .gitignore
```

## Prerequisites

Before running the project, install:

- Node.js 18+
- npm
- PostgreSQL database
- Google OAuth client credentials if using Google login

## Quick Start

### 1) Clone the repository

```bash
git clone <your-repo-url>
cd walletlog
```

### 2) Configure environment variables

Create a backend environment file at `backend/.env` with the values below:

```env
DATABASE_URL="postgresql://user:password@host:5432/walletlog"
DIRECT_URL="postgresql://user:password@host:5432/walletlog"
JWT_SECRET="your-long-random-secret"
CLIENT_URL="http://localhost:5173"
PORT=5000
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

Create a frontend environment file at `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3) Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 4) Set up the database

```bash
cd backend
npx prisma generate
npx prisma migrate dev
node prisma/seed.js
```

### 5) Run the app

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend:

```bash
cd frontend
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend runs on `http://localhost:5000`.

## Default Pages and Routes

Frontend routes include:

- `/` landing page
- `/login` user login
- `/signup` registration
- `/dashboard` summary dashboard
- `/transactions` transaction list and management
- `/analytics` analytics and charts
- `/profile` user profile

## Auth Flow

WalletLog supports two authentication methods:

- Email/password using bcrypt + JWT
- Google OAuth via Passport.js

Both methods issue the same JWT and store it in an httpOnly cookie for protected requests.

## Database Model

Core entities:

- `User`: stores account details and auth method
- `Category`: default and custom categories for income/expense records
- `Transaction`: individual financial entries linked to a user and category

## Scripts

### Backend

```bash
npm run dev
npm start
npm run prisma:migrate
npm run prisma:studio
npm run prisma:seed
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Notes

This project is a practical finance tracking application for learning and portfolio use. It is designed to show real-world patterns such as API routing, JWT auth, protected UI, Prisma data modeling, and analytics dashboards.

---

For backend-specific setup and API docs, see [backend/README.md](backend/README.md).
For frontend-specific setup and UI docs, see [frontend/README.md](frontend/README.md).
```
│   ├── routes/
│   │   └── ProtectedRoute.jsx
│   ├── hooks/
│   │   └── useAuth.js
│   └── App.jsx
```

#### 4.4.2 State Management

- Lightweight **Redux Toolkit** (or React Context if you want to keep it minimal) for: `auth` (user, token) and `transactions` (cached list + summary).
- Charts and analytics pages fetch fresh from `/api/analytics/*` on mount — no need to duplicate that logic in global state.

---

## 5. Gemini Image Generation Prompts

Use these with Gemini's image generation to create clean UI mockup visuals for your slides. Each prompt is self-contained.

**1. Login Page**
> "A clean, modern web app login page UI mockup for a finance/expense tracker. Centered white card on a soft gradient background (blue to purple). Fields: Email, Password, a filled blue 'Log In' button, a 'Continue with Google' button with Google logo below it, and a small 'Don't have an account? Sign up' link. Minimal, professional SaaS design, Bootstrap-style, plenty of whitespace, sans-serif typography."

**2. Signup Page**
> "A modern web app signup page UI mockup for a finance/expense tracker. Centered card layout with fields for Name, Email, Password, Confirm Password, a filled blue 'Create Account' button, and a 'Continue with Google' button with Google logo. Clean SaaS aesthetic, soft shadows, rounded corners, light background."

**3. Dashboard Page**
> "A financial dashboard UI mockup for an expense tracker web app. Top row: three summary cards labeled 'Current Balance', 'Total Income', 'Total Expenses' with large bold numbers and small icons. Below: a donut/pie chart showing expense breakdown by category with a colorful legend, next to a recent transactions list with category icons, amounts in green/red, and dates. A prominent blue '+ Add Transaction' button top-right. Clean Bootstrap-style dashboard, light theme, card-based layout."

**4. Transactions List Page**
> "A transactions table page UI mockup for an expense tracker web app. Full-width data table with columns: Date, Category (with colored tag), Type (Income/Expense badge), Amount, Notes, and a red trash-icon delete button per row. Filter bar above the table with dropdowns for Type, Category, and a date range picker. Pagination controls at the bottom. Clean, modern, minimal SaaS table design."

**5. Add/Edit Transaction Modal**
> "A modal popup UI mockup for adding a transaction in a finance app. Centered modal overlay on a dimmed background. Contains: a toggle switch for Income/Expense, Amount input with currency symbol, Category dropdown, Date picker field, Notes textarea, Tags input with chip-style tags, and 'Cancel' / 'Save Transaction' buttons at the bottom. Rounded corners, soft shadow, clean modern SaaS modal design."

**6. Analytics Page**
> "An analytics dashboard UI mockup for an expense tracker web app. Three chart sections stacked or in a grid: a colorful pie chart labeled 'Expenses by Category', a bar chart labeled 'Monthly Expenses' with months on the x-axis, and a line chart labeled 'Expense Trend Over Time' with a smooth upward/downward line. Light background, card containers around each chart, clean modern data-visualization SaaS style."

**7. Profile / Settings Page**
> "A user profile settings page UI mockup for a web app. Left-aligned circular avatar image, user's name and email displayed next to it, an 'Auth Provider: Google' or 'Email' badge, and a red 'Logout' button below. Minimal card layout, plenty of whitespace, clean modern SaaS design."

---

## 6. Suggested Presentation Outline

1. **Problem & Goal** — what the tracker solves, why manual-entry MVP
2. **Feature Scope** — required vs. future (Section 2)
3. **Page Walkthrough** — the 6 pages + mockup images (Section 3 + 5)
4. **System Architecture** — client/server/DB diagram (Section 4.1)
5. **Database Design** — ER diagram + DBMS reasoning (Section 4.3) — this is your strongest section given the DBMS learning goal
6. **API Design** — endpoint table (Section 4.2.2)
7. **Next Steps** — implementation roadmap, ask for sign-off to start building

---

*This document is the single source of truth for planning. Implementation will proceed phase by phase (DB schema → Auth → Backend API → Frontend pages → Charts) with mentor/architect review at each step.*
