# Product Catalog — Frontend

A modern, production-ready dashboard for the **CodeVector Product Catalog API** — a FastAPI + PostgreSQL backend with cursor-based pagination, built as a take-home internship assignment.

**Submitted By:** Pallavi Kumari

**Backend repo:** https://github.com/pallavi081/codevector-product-catalog-api

**Frontend repo:** https://github.com/pallavi081/codevector-product-catalog-ui

**Live API:** https://codevector-product-catalog-api.onrender.com

**Live Frontend:** https://codevector-product-catalog-ui.vercel.app

**API Documentation:** https://codevector-product-catalog-api.onrender.com/docs

![status](https://img.shields.io/badge/status-ready-6EE7B7) ![stack](https://img.shields.io/badge/stack-React%20%2B%20Vite%20%2B%20Tailwind-A78BFA)

---

# Assignment Information

**Candidate:** Pallavi Kumari

**Role:** Backend Developer Intern (Take Home Assignment)

**Organization:** CodeVector

### Features Implemented

* FastAPI Backend API
* PostgreSQL Database Integration
* Cursor-Based Pagination
* Category Filtering
* Product Search
* API Health Monitoring
* Responsive Frontend Dashboard
* Render Deployment
* Vercel Deployment
* Production Ready UI (Bonus Task)

---

# Overview

This is the frontend bonus deliverable for the Product Catalog take-home assignment. It consumes the backend's `GET /products` and `GET /health` endpoints and presents the catalog as a dark-mode, glassmorphic SaaS dashboard — with correct cursor-based pagination (no page numbers), category filtering, client-side search, and live API health monitoring.

---

# Features

* Dashboard layout with sticky navbar, stat cards, and responsive content area
* Statistics cards:

  * Products Loaded
  * Current Category
  * Average Price
  * API Status
* Category filters:

  * All
  * Electronics
  * Fashion
  * Books
  * Home
  * Sports
  * Beauty
  * Automotive
* Instant search over loaded products
* Cursor-based pagination using:

  * next_cursor
  * has_more
* Load More functionality
* Mobile responsive card layout
* Desktop responsive table layout
* Loading skeletons
* Error handling with retry support
* Empty states
* Live API health polling every 30 seconds
* Modern dark glassmorphism UI

---

# Architecture

```text
src/
├── components/
│   ├── Navbar.jsx
│   ├── StatsBar.jsx
│   ├── CategoryFilter.jsx
│   ├── SearchBox.jsx
│   ├── CategoryBadge.jsx
│   ├── ProductTable.jsx
│   ├── ProductCardGrid.jsx
│   ├── SkeletonState.jsx
│   ├── EmptyState.jsx
│   ├── ErrorState.jsx
│   ├── LoadMoreButton.jsx
│   └── CursorTrail.jsx

├── hooks/
│   ├── useProducts.js
│   ├── useHealth.js
│   └── useDebouncedValue.js

├── services/
│   └── api.js

├── utils/
│   └── format.js

├── App.jsx
├── main.jsx
└── index.css
```

### Data Flow

* App.jsx manages category and search state.
* useProducts handles:

  * cursor state
  * pagination
  * API requests
  * load more logic
* useHealth polls `/health`.
* api.js centralizes backend communication.
* Components remain reusable and presentation-focused.

---

# Tech Stack

| Layer              | Technology                           |
| ------------------ | ------------------------------------ |
| Frontend Framework | React 18                             |
| Build Tool         | Vite 5                               |
| Styling            | Tailwind CSS 3                       |
| Fonts              | Space Grotesk, Inter, JetBrains Mono |
| Backend            | FastAPI                              |
| Database           | PostgreSQL (Neon)                    |
| Deployment         | Vercel + Render                      |

---

# Screenshots

### Desktop View

* Product statistics dashboard
* Cursor pagination
* Search and category filters
* Live API monitoring

### Mobile View

* Responsive product cards
* Touch-friendly layout
* Optimized navigation

---

# Setup Instructions

## Prerequisites

* Node.js 18+
* npm

---

## Clone Repository

```bash
git clone https://github.com/pallavi081/codevector-product-catalog-ui.git

cd codevector-product-catalog-ui
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create `.env`

```env
VITE_API_URL=https://codevector-product-catalog-api.onrender.com
```

---

## Run Development Server

```bash
npm run dev
```

Application runs at:

```text
http://localhost:5173
```

---

## Production Build

```bash
npm run build

npm run preview
```

---

# Deployment

## Vercel Deployment

### Environment Variable

```env
VITE_API_URL=https://codevector-product-catalog-api.onrender.com
```

### Build Settings

```text
Framework: Vite

Build Command:
npm run build

Output Directory:
dist
```

---

# Backend Information

### Backend Repository

https://github.com/pallavi081/codevector-product-catalog-api

### Live Backend API

https://codevector-product-catalog-api.onrender.com

### Swagger Documentation

https://codevector-product-catalog-api.onrender.com/docs

### Health Endpoint

```http
GET /health
```

### Product Endpoint

```http
GET /products
```

Supports:

```text
cursor
category
limit
```

---

# Cursor Pagination Design

The frontend intentionally avoids page numbers.

State maintained:

```javascript
nextCursor
hasMore
items
```

### Load More Flow

```text
GET /products?cursor=<nextCursor>
```

Results are appended to the existing list.

Changing category:

* resets cursor
* clears items
* fetches fresh data

This guarantees cursor correctness across filters.

---

# Live Demo

### Frontend

https://codevector-product-catalog-ui.vercel.app

### Backend

https://codevector-product-catalog-api.onrender.com

### API Documentation

https://codevector-product-catalog-api.onrender.com/docs

---

# GitHub Repositories

### Backend

https://github.com/pallavi081/codevector-product-catalog-api

### Frontend

https://github.com/pallavi081/codevector-product-catalog-ui

---

# Project Status

✅ Backend Completed

✅ PostgreSQL Integrated

✅ Cursor Pagination Implemented

✅ Render Deployment Completed

✅ Frontend Dashboard Completed

✅ Vercel Deployment Completed

✅ Bonus Task Completed

---

# License

MIT License

Built as a take-home internship assignment submission for CodeVector.
