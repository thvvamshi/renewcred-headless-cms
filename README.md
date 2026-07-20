# RenewCred Headless CMS

A production-ready Headless Content Management System (CMS) built with the MERN stack that enables authenticated administrators to manage dynamic website content through an intuitive admin dashboard. The public-facing website consumes content from REST APIs instead of relying on hardcoded data.

---
## Links
- public : https://renewcred-public.onrender.com
- Admin : https://renewcred-admin.onrender.com
- Backend api : https://renewcred-headless-cms.onrender.com
# health :  https://renewcred-headless-cms.onrender.com/health
## ✨ Features

### Authentication
- JWT-based authentication
- Secure admin login/logout
- Protected API routes
- Password hashing using bcrypt

### Content Management
- Create pages
- Update pages
- Delete pages
- Live Preview
- Draft & Published status
- Version metadata
- Dynamic page rendering

### Block-Based Editor
Supports reusable content blocks including:

- Header
- Paragraph
- Lists
- Tables
- Rich structured content

### Public Website
- Fetches content dynamically from backend
- No hardcoded page content
- Responsive layout
- Block renderer architecture

### Developer Experience
- Dockerized environment
- MongoDB database
- RESTful API
- Redux Toolkit state management
- Modular architecture

---

# Tech Stack

## Frontend (Admin)

- React
- Vite
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Lucide React

## Frontend (Public)

- React
- Vite
- Tailwind CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Infrastructure

- Docker
- Docker Compose

---

# Architecture

```
                    ┌────────────────────┐
                    │   Admin Frontend   │
                    │ React + Redux      │
                    └─────────┬──────────┘
                              │
                         REST API
                              │
                    ┌─────────▼──────────┐
                    │ Express Backend    │
                    │ Authentication     │
                    │ CRUD APIs          │
                    └─────────┬──────────┘
                              │
                        Mongoose ODM
                              │
                    ┌─────────▼──────────┐
                    │     MongoDB        │
                    └────────────────────┘
                              ▲
                              │
                    ┌─────────┴──────────┐
                    │ Public Frontend    │
                    │ Dynamic Renderer   │
                    └────────────────────┘
```

---

# Project Structure

```
renewcred-headless-cms
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── scripts
│   │   └── server.js
│   │
│   ├── Dockerfile
│   └── package.json
│
├── admin-frontend
│   ├── src
│   │   ├── components
│   │   ├── features
│   │   ├── lib
│   │   ├── pages
│   │   └── store
│   │
│   ├── Dockerfile
│   └── package.json
│
├── public-frontend
│   ├── src
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
├── README.md
└── .env.example
```

---

# REST API

## Authentication

```
POST /api/v1/auth/login
```

---

## Content

```
GET    /api/v1/content/pages
GET    /api/v1/content/pages/:slug

GET    /api/v1/content/admin/pages
GET    /api/v1/content/admin/pages/:id

POST   /api/v1/content/admin/pages
PUT    /api/v1/content/admin/pages/:id
DELETE /api/v1/content/admin/pages/:id
```

---

# Getting Started

## 1. Clone Repository

```bash
git clone https://github.com/your-username/renewcred-headless-cms.git

cd renewcred-headless-cms
```

---

## 2. Environment Variables

Create a `.env` file inside the backend.

Example:

```env
PORT=5000

MONGODB_URI=mongodb://mongo:27017/renewcred

JWT_SECRET=your-secret-key

ADMIN_EMAIL=admin@renewcred.com

ADMIN_PASSWORD=admin123
```

---

## 3. Run with Docker

```bash
docker compose up --build
```

---

## Services

| Service | Port |
|---------|------|
| Backend | 5000 |
| Admin Frontend | 5173 |
| Public Frontend | 5174 |
| MongoDB | 27017 |

---

# Seed Data

The backend automatically seeds the database on startup if no pages exist.

Sample admin credentials:

```
Email:
admin@renewcred.com

Password:
admin123
```

---

# Development

Backend

```bash
cd backend

npm install

npm run dev
```

Admin

```bash
cd admin-frontend

npm install

npm run dev
```

Public

```bash
cd public-frontend

npm install

npm run dev
```

---

# Design Decisions

The project follows a Headless CMS architecture where content management is completely separated from presentation.

Key decisions include:

- Block-based page model for extensibility
- JWT authentication for secure admin access
- Redux Toolkit for predictable state management
- RESTful API design
- Dockerized development environment
- Reusable UI components
- Modular folder structure for scalability

---

# Assumptions

- Single administrator account is sufficient for evaluation.
- MongoDB is used as the primary database.
- Authentication is JWT-based.
- Images and file uploads are outside the assignment scope.
- Version metadata is stored with each page.

---

# Future Improvements

- Rich text editor (TipTap)
- Drag-and-drop block ordering
- Image uploads
- Role-based access control
- Content scheduling
- Revision history
- Search functionality
- Multi-language support
- Unit and integration tests
- CI/CD pipeline

---

# Assignment Coverage

- JWT Authentication
- Protected Admin Dashboard
- CRUD Operations
- Dynamic Content Rendering
- Redux Toolkit
- Responsive UI
- REST APIs
- Dockerized Setup
- MongoDB Integration
- Block-Based Content Model

---

# Author

**Boda Vamshi Kumar**

GitHub: https://github.com/thvvamshi

LinkedIn: https://www.linkedin.com/in/boda-vamshi-kumar/

---

## License

This project was developed as part of the **RenewCred Frontend Engineering Assignment**.
