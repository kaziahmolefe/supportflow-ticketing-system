SUPPORTFLOW BY KAZIAH MOLEFE

# 🚀 SupportFlow

A modern enterprise support ticket management system built with **Next.js 16**, **TypeScript**, **Prisma ORM**, and **Server-Sent Events (SSE)**.

SupportFlow enables organizations to manage customer support tickets through a secure dashboard with real-time updates, analytics, notifications, and a responsive user interface.

---

# 📖 Overview

SupportFlow was developed as a Work Integrated Learning (WIL) project to demonstrate full-stack software engineering skills including:

* Authentication
* Database management
* REST API development
* Real-time communication
* Responsive UI design
* Dashboard analytics
* Production deployment readiness

---

# ✨ Features

## Authentication

* Secure login
* Protected dashboard routes
* Session-based authentication
* Logout functionality

---

## Dashboard

* Live KPI cards
* Ticket overview charts
* Ticket priority distribution
* Ticket category analytics
* Recent activity feed
* Satisfaction metrics
* Notification feed

---

## Ticket Management

* Create tickets
* View tickets
* Update tickets
* Delete tickets
* Search tickets
* Ticket categories
* Priority management
* Status tracking

---

## Notifications

* Automatic notification generation
* Notification bell
* Mark notifications as read
* View linked tickets
* Live notification updates

---

## Real-Time Updates

Implemented using **Server-Sent Events (SSE)**.

Connected dashboards automatically receive updates whenever:

* A ticket is created
* A ticket is updated
* A ticket is deleted
* A notification is generated

No browser refresh is required.

---

## Responsive Design

* Desktop support
* Tablet support
* Mobile support
* Dark Mode
* Smooth animations using Framer Motion

---

# 🛠️ Tech Stack

### Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS
* Framer Motion

### Backend

* Next.js Route Handlers
* Prisma ORM
* SQLite

### Authentication

* Credential-based authentication
* bcryptjs password hashing

### Real-Time

* Server-Sent Events (SSE)

### Development Tools

* Prisma Studio
* ESLint
* Turbopack

---

# 📂 Project Structure

```
src/
│
├── app/
│   ├── api/
│   ├── dashboard/
│   ├── tickets/
│   ├── notifications/
│   └── login/
│
├── components/
│   ├── dashboard/
│   ├── layout/
│   ├── notifications/
│   ├── tickets/
│   └── ui/
│
├── context/
│
├── lib/
│
└── prisma/
```

---

# How to test it!

## Install dependencies

```bash
npm install
```

---

## Generate Prisma Client

```bash
npx prisma generate
```

---

## Run database migrations

```bash
npx prisma migrate dev
```

---

## Start the development server

```bash
npm run dev
```

---

## NOTE: If localhost domain does not match http://localhost:3000, change the AUTH_URL in env. generated file to match given domain

## Open the application

```
http://localhost:3000
```

---

# Database

The project uses Prisma ORM with SQLite.

Useful commands:

```bash
npx prisma studio
```

```bash
npx prisma migrate dev
```

```bash
npx prisma generate
```

---

# Real-Time Architecture

SupportFlow uses Server-Sent Events (SSE) to broadcast server-side events to all connected clients.

Event types include:

* ticket-created
* ticket-updated
* ticket-deleted
* notification-created

This approach provides efficient one-way server-to-client communication without continuous polling.

---

# Future Improvements

* Role-based access control
* File attachments
* Email notifications
* Dashboard export (PDF/Excel)
* Audit logs
* PostgreSQL support
* Docker deployment
* Redis caching
* Unit and integration testing
* CI/CD with GitHub Actions
* Cloud deployment (Azure/AWS)

---

Author

*Kaziah Molefe*

Software Developer | Full-Stack Engineer | 

GitHub: https://github.com/kaziahmolefe

LinkedIn: https://www.linkedin.com/in/kaziahmolefe

---

# License

This project was developed for educational and portfolio purposes.
Cannot be accessed without author permission
