# John Deere Nepal — Website

Marketing website for John Deere Nepal. Built frontend-first; the backend follows.

```
John Deere/
├── frontend/   → React + Vite + Tailwind CSS site (in progress)
└── backend/    → API server (placeholder — built later)
```

## Frontend

Cinematic, image-led site with four pages: **Home, Products, Why Us, About**.

**Stack:** React 19 · Vite · React Router · Tailwind CSS v4 · Motion (animations)

```bash
cd frontend
npm install
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview the production build
```

### Notes
- Product imagery currently uses Unsplash placeholders (see `frontend/src/data/products.js`).
  Swap these for official John Deere brand assets before launch.
- Design tokens (brand colours, fonts) live in `frontend/src/index.css`.
- The About-page contact form is front-end only for now; it will POST to the backend once built.

## Backend

Not started yet — see `backend/README.md` for the planned scope.
