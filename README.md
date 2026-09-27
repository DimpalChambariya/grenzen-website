# Grenzen Pharmachem — Website

A two-part project built from the Grenzen Pharmachem product catalogue:

- **backend/** — a Node.js + Express API that serves company info, product
  categories, product specifications, upcoming manufacturing projects and
  an enquiry-form endpoint.
- **frontend/** — a React (Vite) single-page app that consumes that API:
  live-filtered product catalogue, animated stats, an expandable spec
  table per product, and a working contact form.

## Running it locally

You need Node.js 18+ installed.

### 1. Start the API

```bash
cd backend
npm install
npm start
```

Configure your email settings in `backend/.env` (see `backend/.env.example`):
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@grenzenpharmachem.com
SMTP_PASS=your_password_or_app_password
EMAIL_TO=info@grenzenpharmachem.com
```

The API runs at `http://localhost:4000`. Try `http://localhost:4000/api/products`
in your browser to confirm it's serving data, and `http://localhost:4000/api/test-email`
to verify your SMTP configuration.

### 2. Start the website

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The site runs at `http://localhost:5173` and proxies `/api/*` requests to the
backend automatically (see `frontend/vite.config.js`).

## Building for production

```bash
cd frontend
npm run build
```

This outputs a static bundle to `frontend/dist/`, which can be served by any
static host (Netlify, Vercel, Nginx, etc.) as long as the backend API is
deployed separately and `VITE_API_URL` is set to its public URL at build time,
e.g.:

```bash
VITE_API_URL=https://api.yourdomain.com/api npm run build
```

Deploy `backend/` as a normal Node service (Render, Railway, an EC2/VPS box
behind Nginx, etc.). Set `PORT` if your host requires a specific port.

## What's dynamic here

- Product data, categories, company stats, leadership, and the manufacturing
  roadmap are all fetched live from the Express API — nothing is hard-coded
  in the React components.
- The product catalogue supports live search and category filtering, and
  each product expands in place to reveal its full specification table.
- Home page stats animate up from zero once scrolled into view, using the
  live figures returned by `/api/stats`.
- The contact form validates client-side and posts to `POST /api/enquiries`,
  which the backend stores and logs (swap this for a database/email
  integration in production).

## Project structure

```
grenzen-website/
├── backend/
│   ├── data/catalogue.js   # single source of truth for all catalogue content
│   └── server.js           # Express API
└── frontend/
    └── src/
        ├── api.js           # fetch wrapper for the backend
        ├── components/      # Navbar, Footer, Counter, ProcessMotif
        └── pages/           # Home, About, Products, Manufacturing, Contact
```
