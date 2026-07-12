# Project Structure

This document outlines the folder layout for the entire SERN stack project.

## Root Directory
```text
hackathon-project/
├── backend/            # Express Backend
├── database/           # Database Schemas & Migrations
├── docs/               # Project Documentation
└── frontend/           # React + Vite + TypeScript Frontend
```

---

## Frontend Layout (`frontend/src/`)
```text
src/
├── assets/             # Images, SVGs, static assets
├── components/         # Reusable presentation components (Buttons, Cards, Inputs)
├── features/           # Feature-based modules (Auth, Dashboard, Profile)
├── hooks/              # Custom React hooks
├── layouts/            # Layout wrappers (Sidebar, PageLayout)
├── pages/              # View pages mapped to routes (Home, Login, NotFound)
├── services/           # API integration and client requests
├── types/              # TypeScript interfaces and type definitions
├── utils/              # Helper utilities and shared functions
├── App.tsx             # Main App entry point
└── main.tsx            # DOM bootstrapping and setup
```

---

## Backend Layout (`backend/`)
```text
backend/
├── src/
│   ├── config/         # Server and database configurations
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom Express middlewares
│   ├── models/         # Database query models
│   ├── routes/         # Router declarations
│   ├── services/       # Core business logic / third-party services
│   └── utils/          # Shared utility methods
├── .env.example        # Environment variables template
├── package.json        # NPM scripts and dependencies
├── README.md           # Backend documentation
└── server.js           # Server startup entry point
```

---

## Database Layout (`database/`)
```text
database/
└── (Schema and SQL migration files go here)
```
