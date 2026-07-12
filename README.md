# TransitOps 🚀

**Live Demo:** [https://transit-ops-two.vercel.app](https://transit-ops-two.vercel.app)

TransitOps is a modern, high-performance fleet operations and transit management dashboard built for an 8-hour hackathon. It streamlines vehicle dispatching, driver management, operational logging, maintenance tracking, and fuel expense analytics in a single real-time UI.

---

## 🏗️ Project Architecture

TransitOps is built as a serverless web application that connects directly to a secure, managed cloud database using Supabase. There is **no runtime Express backend** in this active architecture.

```text
       React (Frontend App)
                │
                ▼
  Supabase Services / Client Layer (Auth, CRUD, Business Rules)
                │
                ▼
     Supabase Backend Services
  (Auth + PostgreSQL Database + RLS Policies)
```

### Key Architectural Pillars:
1. **Frontend UI**: Built with React (v19), Vite, TypeScript, and styled with Tailwind CSS (v4).
2. **Service Layer**: Predefined queries, JWT authentication helpers, and validation utilities located under `frontend/src/services/`, `hooks/`, and `utils/`. React components must never communicate directly with Supabase; they must always route requests through this service layer.
3. **Database & Security**: PostgreSQL hosted on Supabase, protected by Row Level Security (RLS) policies to ensure safe, user-isolated direct access.

---

## 🛠️ Technology Stack

* **Frontend Framework**: React (v19) + TypeScript
* **Build Tool**: Vite
* **Styling**: Tailwind CSS (v4)
* **Routing**: React Router DOM (v7)
* **Database & Auth**: Supabase (PostgreSQL)

---

## 💻 Local Setup

To run TransitOps locally, follow these steps:

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher)
* [npm](https://www.npmjs.com/)

### Steps
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd hackathon-project
   ```

2. **Configure Environment Variables**:
   Create a `.env` or `.env.local` file in the `frontend` folder (or copy from the `.env.example` in the root) and insert your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Install Dependencies**:
   Navigate to the `frontend` folder and install:
   ```bash
   cd frontend
   npm install
   ```

4. **Run Local Dev Server**:
   Start the local Vite development server:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

---

## 🔑 Environment Variables

The application relies on the following environment variables. Ensure they are configured in your local environment and deployment settings:

| Variable Name | Description | Required |
| :--- | :--- | :---: |
| `VITE_SUPABASE_URL` | The public API URL of your Supabase project instance | Yes |
| `VITE_SUPABASE_ANON_KEY` | The anonymous public key used to authorize database queries via client-side libraries | Yes |

*Note: You do not need database connection strings (like `DATABASE_URL`) or port variables for local development since the frontend talks directly to the Supabase client API.*

---

## 🚀 Deployment

Since the runtime architecture requires no active node backend, the deployment process is extremely straightforward:

### 1. Database Setup
* Run the SQL commands in `database/schema.sql` inside the Supabase SQL editor to create all necessary tables and RLS constraints.
* (Optional) Run the SQL commands in `database/seed.sql` to populate the database with mock vehicles, drivers, and user roles for testing.

### 2. Frontend Hosting
* **Automatic Vercel Deployment**: Any merge or push into the `main` branch automatically triggers a production build and deployment to Vercel. No manual folder uploads or specific deployment branches are required.
* Ensure you configure the environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your Vercel project settings dashboard.
