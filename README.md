# Josh Fallarcuna — Portfolio Website

**Dark Cinematic Hybrid Designer + Developer Portfolio**

## Stack

| Layer     | Technology                                    |
|-----------|-----------------------------------------------|
| Frontend  | React + TypeScript + Vite + Tailwind + Framer Motion |
| Backend   | Node.js + Express.js                          |
| Database  | Supabase PostgreSQL + Supabase Storage        |
| Deploy    | Vercel (frontend) + Railway (backend) + Supabase Cloud |

---

## Project Structure

```
PORTFOLIO-WEBSITE/
├── frontend/          # React app (Phase 1)
├── backend/           # Express API (Phase 2)
├── database/          # SQL schema, seed, RLS policies (Phase 3)
└── docs/              # Architecture, branding, content, phases
```

---

## Getting Started

### Phase 1 — Frontend only

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Visit http://localhost:5173

### Phase 2 — Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

API available at http://localhost:4000/api

### Phase 3 — Supabase

See `database/README.md` for full setup instructions.
Add `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` to `backend/.env`.

---

## Key commands

| Command             | What it does                          |
|---------------------|---------------------------------------|
| `npm run dev`       | Start dev server                      |
| `npm run build`     | Production build                      |
| `npm run lint`      | Run ESLint                            |
| `npm run preview`   | Preview production build (frontend)   |

---

## Phase status

- [x] Phase 1 — Frontend Foundation
- [x] Phase 2 — Backend API
- [x] Phase 3 — Database Schema & Supabase Integration
- [ ] Phase 4 — Deployment (Vercel + Railway + Supabase Cloud)
