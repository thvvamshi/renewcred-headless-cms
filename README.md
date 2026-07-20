# RenewCred Headless CMS

A decoupled CMS implementation with:

- `backend`: Node.js, Express, MongoDB/Mongoose, bcryptjs, JWT auth, block-based page schema.
- `admin-frontend`: React/Vite, Tailwind CSS, Redux Toolkit, TipTap-powered structured content editing.
- `public-frontend`: Next.js, Tailwind CSS, dynamic block renderer with table and LaTeX equation support.

## Quick Start

```bash
cp .env.example .env
npm install
npm run seed
npm run dev:backend
npm run dev:admin
npm run dev:public
```

Default admin credentials:

- Email: `admin@renewcred.local`
- Password: `ChangeMe123!`

## Docker

```bash
docker compose up --build
```

Services:

- Backend API: `http://localhost:4000/api/v1`
- Admin CMS: `http://localhost:5173`
- Public frontend: `http://localhost:3000/standards/ev`

## API

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`
- `GET /api/v1/content/pages`
- `GET /api/v1/content/pages/:slug`
- Protected admin routes under `/api/v1/content/admin/pages`
