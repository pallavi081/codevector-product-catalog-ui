# Product Catalog — Frontend

A modern, production-ready dashboard for the **CodeVector Product Catalog API** — a FastAPI + PostgreSQL backend with cursor-based pagination, built as a take-home internship assignment.

**Backend repo:** https://github.com/pallavi081/codevector-product-catalog-api
**Live API:** https://codevector-product-catalog-api.onrender.com
**Live frontend:** _add your Vercel URL here after deploying_

![status](https://img.shields.io/badge/status-ready-6EE7B7) ![stack](https://img.shields.io/badge/stack-React%20%2B%20Vite%20%2B%20Tailwind-A78BFA)

---

## Overview

This is the frontend bonus deliverable for the Product Catalog take-home assignment. It consumes the backend's `GET /products` and `GET /health` endpoints and presents the catalog as a dark-mode, glassmorphic SaaS dashboard — with correct **cursor-based** pagination (no page numbers), category filtering, client-side search, and live API health monitoring.

## Features

- **Dashboard layout** — sticky navbar, stat cards, responsive content area
- **Statistics cards** — Products Loaded, Current Category, Average Price, API Status (live from `/health`)
- **Category filters** — All, Electronics, Fashion, Books, Home, Sports, Beauty, Automotive
- **Search** — instant, debounced, client-side search over already-loaded products (name + category)
- **Cursor pagination** — `next_cursor` / `has_more` drive a "Load More" button that appends results; pagination state resets correctly when the category filter changes
- **Responsive product display** — table on desktop (`lg:` breakpoint and up), cards on mobile/tablet
- **Loading states** — skeleton table/cards on first load, inline spinner on "Load More"
- **Empty states** — distinct messaging for "no products in this category" vs. "no search matches"
- **Error states** — friendly error panel with a Retry button; degrades gracefully if the API is asleep (Render free-tier cold start) or unreachable
- **Live health polling** — `/health` is polled every 30s and reflected in the navbar dot and stat card

## Architecture

```
src/
├── components/        # Presentational, mostly-stateless UI pieces
│   ├── Navbar.jsx
│   ├── StatsBar.jsx
│   ├── CategoryFilter.jsx
│   ├── SearchBox.jsx
│   ├── CategoryBadge.jsx
│   ├── ProductTable.jsx      # desktop view
│   ├── ProductCardGrid.jsx   # mobile/tablet view
│   ├── SkeletonState.jsx
│   ├── EmptyState.jsx
│   ├── ErrorState.jsx
│   ├── LoadMoreButton.jsx
│   └── CursorTrail.jsx       # shows the live next_cursor / has_more state
├── hooks/              # Stateful logic, decoupled from UI
│   ├── useProducts.js   # owns cursor pagination state + fetch lifecycle
│   ├── useHealth.js     # polls GET /health
│   └── useDebouncedValue.js
├── services/
│   └── api.js           # single fetch client — base URL, error handling, normalization
├── utils/
│   └── format.js         # price/date formatting, cursor truncation for display
├── App.jsx
├── main.jsx
└── index.css
```

**Data flow:** `App.jsx` owns `category` and `search` UI state. `useProducts` encapsulates everything related to talking to `/products` — it resets and refetches from `cursor: null` whenever `category` changes (cursors aren't valid across different filters), and appends results on `loadMore()`. All network calls funnel through `services/api.js`, so there's exactly one place that knows about the backend's URL shape and error format.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Fonts | Space Grotesk (display), Inter (body), JetBrains Mono (data) |
| Backend | FastAPI + PostgreSQL (Neon) — see [backend repo](https://github.com/pallavi081/codevector-product-catalog-api) |

## Screenshots

> _Add screenshots here after running the app locally or visiting the deployed URL._

| Desktop | Mobile |
|---|---|
| `docs/screenshot-desktop.png` | `docs/screenshot-mobile.png` |

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm

### 1. Clone and install

```bash
git clone https://github.com/<your-username>/codevector-product-catalog-ui.git
cd codevector-product-catalog-ui
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=https://codevector-product-catalog-api.onrender.com
```

> Use your backend's deployed URL (or `http://localhost:8000` for local backend development). No trailing slash.

### 3. Run locally

```bash
npm run dev
```

Visit `http://localhost:5173`.

### 4. Build for production

```bash
npm run build
npm run preview   # sanity-check the production build locally
```

## Deployment (Vercel)

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

When prompted, set the environment variable:

```
VITE_API_URL=https://codevector-product-catalog-api.onrender.com
```

### Option B — Vercel Dashboard

1. Push this repo to GitHub (see commands below).
2. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repo.
3. Framework preset: **Vite** (auto-detected).
4. Under **Environment Variables**, add:
   - `VITE_API_URL` = `https://codevector-product-catalog-api.onrender.com`
5. Click **Deploy**.
6. Once deployed, copy the production URL and paste it at the top of this README.

### Pushing to GitHub

```bash
git init
git add .
git commit -m "feat: production-ready frontend dashboard for product catalog API"
git branch -M main
git remote add origin https://github.com/<your-username>/codevector-product-catalog-ui.git
git push -u origin main
```

## Notes on Cursor Pagination

This UI deliberately avoids page numbers. State held in `useProducts`:

- `nextCursor` — the opaque token from the last response's `next_cursor`
- `hasMore` — whether another page exists
- `items` — the accumulated, appended list

`Load More` sends `GET /products?cursor=<nextCursor>&category=<category>&limit=<limit>` and **appends** the response to `items`, never replaces it. Switching categories resets `cursor` to `null` and refetches from the start, since a cursor issued under one filter isn't guaranteed valid under another.

## License

MIT — built as a take-home assignment deliverable.
