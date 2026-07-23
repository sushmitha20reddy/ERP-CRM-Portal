# ERP CRM Portal

A full-stack Enterprise Resource Planning (ERP) and Customer Relationship Management (CRM) web application built using React, Express, TypeScript, Prisma ORM, and PostgreSQL.

The application enables businesses to manage customers, products, inventory, stock movements, challans, and user authentication through a secure and scalable architecture.

---

# Live Demo

## Frontend
https://<your-vercel-project>.vercel.app](https://erp-crm-portal-kappa.vercel.app

## Backend API

https://erp-crm-portal-8p2u.onrender.com

# GitHub Repository

https://github.com/sushmitha20reddy/ERP-CRM-Portal

---

# Features

- User Authentication using JWT
- Role-Based User Management
- Customer Management
- Product Management
- Category Management
- Stock Movement Tracking
- Challan Management
- Dashboard Analytics
- Secure Password Hashing using bcrypt
- RESTful API Architecture
- Swagger API Documentation
- Cloud Deployment

---

# Technology Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- JWT Authentication
- bcrypt
- Zod Validation
- Swagger

## Database

- PostgreSQL (Neon)

## Deployment

- Frontend: Vercel
- Backend: Render
- Database: Neon PostgreSQL

---

# Project Structure

```
ERP-CRM-Portal/
│
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   └── app.ts
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── docs/
│   ├── ERP_CRM_API.postman_collection.json
│   └── README.md
│
└── README.md
```

---

# System Architecture

```
                Client
                   │
                   ▼
      React + TypeScript + Vite
            (Frontend)
                   │
             Axios REST API
                   │
                   ▼
      Express + TypeScript Backend
                   │
             Prisma ORM
                   │
                   ▼
        Neon PostgreSQL Database
```

---

# Environment Variables

Create a `.env` file inside the backend directory.

```env
DATABASE_URL = postgresql://neondb_owner:npg_5cSjmsbKIdp2@ep-hidden-mouse-ayvdaq01-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require

JWT_SECRET = mySuperSecretKey123456
```

---

# Installation

## Clone the repository

```bash
git clone https://github.com/sushmitha20reddy/ERP-CRM-Portal.git
```

```
cd ERP-CRM-Portal
```

---

# Backend Setup

```
cd backend
```

Install dependencies

```bash
npm install
```

Generate Prisma Client

```bash
npx prisma generate
```

Run migrations

```bash
npx prisma migrate deploy
```

Start the backend

```bash
npm run dev
```

Backend runs at

```
http://localhost:3000
```

---

# Frontend Setup

```
cd frontend
```

Install dependencies

```bash
npm install
```

Start frontend

```bash
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# Deployment

## Backend

Platform: Render

Build Command

```bash
npm install
npm run build
```

Start Command

```bash
npm start
```

Environment Variables

```
DATABASE_URL

JWT_SECRET
```

---

## Frontend

Platform: Vercel

Build Command

```bash
npm run build
```

Output Directory

```
dist
```

---

# API Documentation

Swagger Documentation

https://erp-crm-portal-8p2u.onrender.com/api-docs

A Postman Collection is also included in the `docs` folder.

---

# Test Login Credentials

| Role | Email | Password |
|------|-------|----------|
| ADMIN | admin@test.com | Admin@123 |
| SALES | sales@test.com | Sales@123 |
| WAREHOUSE | warehouse@test.com | Warehouse@123 |
| ACCOUNTS | accounts@test.com | Accounts@123 |

---

# Authentication

The application uses JWT Authentication.

Workflow

```
User Login

↓

Password Verification

↓

JWT Token Generated

↓

Token Returned to Client

↓

Protected API Access
```

Authorization Header

```
Authorization: Bearer <JWT_TOKEN>
```

---

# API Modules

- Authentication
- Customers
- Products
- Categories
- Stock Management
- Challan Management
- Dashboard

---

# Assumptions

- Users must register before logging in.
- Email addresses are unique.
- Passwords are securely hashed using bcrypt.
- JWT authentication is required for protected routes.
- PostgreSQL is hosted on Neon.
- Frontend and backend are deployed separately.
- Prisma migrations are executed before deployment.

---

# Known Limitations

The following features are planned for future implementation:

- Docker Support
- GitHub Actions CI/CD
- Invoice PDF Export
- AWS S3 Product Image Upload
- Email Verification
- Password Reset
- Automated Testing
- Audit Logs
- Real-time Notifications

---

# Future Enhancements

- Docker Containerization
- GitHub Actions
- PDF Invoice Generation
- AWS S3 Storage
- Role-Based Access Control Enhancements
- Analytics Dashboard
- Email Notifications
- Multi-Tenant Support

---

# Author

**Karla Sushmitha Reddy**

B.Tech – Artificial Intelligence & Machine Learning

GitHub: https://github.com/sushmitha20reddy

---

# License

This project was developed for educational and assessment purposes.
