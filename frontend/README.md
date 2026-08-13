# WalletLog Frontend

This is the React frontend for WalletLog. It provides the user interface for authentication, dashboards, transaction management, and analytics.

## Tech Stack

- React
- Vite
- React Router
- Redux Toolkit
- Axios
- Bootstrap
- Recharts

## Features

- Landing page
- Login and signup pages
- Protected route handling
- Dashboard summary cards
- Transaction creation, listing, and deletion
- Category and monthly analytics charts
- User profile area with logout flow
- Dark/light theme support

## Project Structure

```bash
frontend/
├── public/
├── src/
│   ├── app/
│   │   └── store.js
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── SummaryCard.jsx
│   │   ├── TransactionModal.jsx
│   │   └── charts/
│   │       ├── CategoryPieChart.jsx
│   │       ├── MonthlyBarChart.jsx
│   │       └── TrendLineChart.jsx
│   ├── features/
│   │   ├── authSlice.js
│   │   └── transactionSlice.js
│   ├── hooks/
│   │   └── useTheme.js
│   ├── pages/
│   │   ├── Analytics.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│   │   ├── Signup.jsx
│   │   └── Transactions.jsx
│   ├── routes/
│   │   └── ProtectedRoute.jsx
│   ├── services/
│   │   ├── analyticsApi.js
│   │   ├── api.js
│   │   ├── authApi.js
│   │   └── transactionApi.js
│   ├── style/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Prerequisites

- Node.js 18+
- npm
- Running backend on `http://localhost:5000`

## Environment Variables

Create a `.env` file in the frontend folder:

```env
VITE_API_URL=http://localhost:5000/api
```

This value is used by Axios to call the backend API.

## Installation

```bash
cd frontend
npm install
```

## Run in Development

```bash
npm run dev
```

The app starts with Vite and is usually available at:

```bash
http://localhost:5173
```

## Production Build

```bash
npm run build
```

To preview the built app:

```bash
npm run preview
```

## Available Routes

- `/` — landing page
- `/login` — sign in page
- `/signup` — create account
- `/dashboard` — account overview
- `/transactions` — manage transactions
- `/analytics` — visual reports
- `/profile` — user profile and logout

## State and Data Flow

This app uses Redux Toolkit for global state management:

- `authSlice.js` handles current user session and auth state
- `transactionSlice.js` handles transactions fetched from the API

API calls are centralized in the service layer using Axios from `src/services`.

## Protected Routing

Routes such as dashboard, transactions, analytics, and profile are guarded by `ProtectedRoute.jsx`.

If the user is not authenticated, they are redirected to the login page.

## Theme Support

The frontend includes a theme hook to switch between dark and light modes. It is integrated into the navbar and broader app styling.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Notes

The frontend was designed to be simple, modular, and easy to extend. Components are separated by responsibility so the dashboard, analytics, auth, and transaction views can be updated independently.

This frontend relies on the backend for all data persistence and business logic, keeping the UI focused on presentation and user interaction.

