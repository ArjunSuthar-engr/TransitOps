# TransitOps 8-Hour Execution Plan

This is the hour-by-hour roadmap for our 8-hour hackathon. The timeline is divided into distinct phases with strict deliverables to ensure we ship a fully working application on time.

---

## ⏱️ Execution Timeline Overview

| Phase | Time / Duration | Focus Area | Key Deliverables |
| :--- | :--- | :--- | :--- |
| **Phase 0** | 0:00 - 0:20 (20 mins) | Strategy & Setup | ER Diagram, DB schema design, Mock UI mapping |
| **Phase 1** | 0:20 - 2:00 (1h 40m) | Supabase Setup & Authentication | Supabase DB tables & seed, Routing & Login UI, Supabase Auth service & hooks |
| **Phase 2** | 2:00 - 3:30 (1h 30m) | Service Layer & CRUD UI | Vehicles & Drivers service layer methods, CRUD UI pages, Dashboard metrics |
| **Phase 3** | 3:30 - 5:00 (1h 30m) | Business Validation & Dispatcher | Trip dispatch service methods, validation logic, conflict checks, Dispatcher panel UI |
| **Phase 4** | 5:00 - 6:00 (1h 00m) | Expense Services & Charts | Fuel tracking & expense services, charts & cost breakdown UI |
| **Phase 5** | 6:00 - 7:00 (1h 00m) | Integration Testing & Polish | Functional QA, Responsive UI verification, Theme toggle, Edge-case handling |
| **Phase 6** | 7:00 - 8:00 (1h 00m) | Cloud Deployment & Demo Prep | Frontend cloud hosting (Vercel/Netlify), Live Supabase DB check, Pitch runs |

---

## 🎯 Detailed Phase Deliverables

### 🗺️ Phase 0: Strategy & Architecture (Time: 0:00 - 0:20)
* **Goal**: Align team, scope requirements, and map schemas.
* **Tasks**:
  - [ ] **Read Problem Statement**: Identify all mandatory specs; immediately defer any non-essential/bonus features.
  - [ ] **Data Modeling**: Sketch the Entity-Relationship (ER) diagram, define key relationships and column types.
  - [ ] **UI Mapping**: Map out the core page layouts and frontend routes.
  - [ ] **Work Division**: Finalize branch setup and task allocation.
* **Deliverables**:
  * Finalized DB schema outline.
  * Wireframe sketches of frontend layout (Sidebar, Dashboard, CRUD tables).
  * Feature branches assigned to respective developers.

---

### 🧱 Phase 1: Supabase Setup & Authentication (Time: 0:20 - 2:00)
* **Goal**: Build the database tables and implement basic client authentication.
* **Tasks**:
  * **Database & Schema (Rajkumar)**:
    - [ ] Create all base SQL tables in Supabase.
    - [ ] Write seed SQL file to populate initial database records for testing.
  * **Frontend & Navigation (Arjun)**:
    - [ ] Initialize the React application routing (React Router).
    - [ ] Create main layout wrappers: Sidebar, Header, and PageLayout.
    - [ ] Code the Login user interface layout.
  * **Supabase Integration & Auth (Janak)**:
    - [ ] Set up the Supabase Client connection utilities.
    - [ ] Code the User Authentication service (login, logout, session persistence hooks).
* **Deliverables**:
  * Database tables created and successfully seeded in Supabase with test records.
  * Operational local router showing Sidebar navigation.
  * Working User Login/Logout workflow linked to Supabase authentication.

---

### 🚗 Phase 2: Service Layer & CRUD UI (Time: 2:00 - 3:30)
* **Goal**: Build full data tracking modules for vehicles and drivers.
* **Tasks**:
  * **Vehicles & Drivers CRUD (Arjun + Janak)**:
    - [ ] Create frontend data grid lists for Vehicles and Drivers.
    - [ ] Implement forms for creating, updating, and removing vehicles and drivers.
    - [ ] Connect state to Supabase service layer (`getAll`, `getById`, `create`, `update`, `delete` methods).
  * **Dashboard Setup (Arjun + Rajkumar)**:
    - [ ] Setup summary KPI metrics cards (e.g., Active Drivers, Total Fleet, Idle Vehicles).
* **Deliverables**:
  * Fully functional Vehicles and Drivers management dashboards.
  * Integrated database read/write actions on the frontend grids.
  * Live KPI cards displaying aggregate count metrics from database views.

---

### 📅 Phase 3: Business Validation & Dispatcher (Time: 3:30 - 5:00)
* **Goal**: Implement trip assignments and operations flow.
* **Tasks**:
  * **Trip Dispatch Engine (Arjun + Janak)**:
    - [ ] Build Dispatch Form to assign trips (vehicle, driver, route, schedule).
    - [ ] Write service-level business validations (e.g., alert if driver/vehicle is already assigned to a concurrent trip).
  * **Maintenance Tracking (Rajkumar + Arjun)**:
    - [ ] Set up table schemas and logging interface for vehicle service histories.
* **Deliverables**:
  * Interactive Trip Dispatch panel with conflict-prevention validation.
  * Preventative maintenance status indicator on the vehicles grid.

---

### 📈 Phase 4: Expense Services & Charts (Time: 5:00 - 6:00)
* **Goal**: Track financial costs and display operations analytics.
* **Tasks**:
  * **Expense Tracker (Janak + Rajkumar)**:
    - [ ] Set up database tables and Supabase service methods for logging fuel fills and miscellaneous expenses.
  * **Charts & Analytics (Arjun)**:
    - [ ] Implement charts (using Chart.js, Recharts, or simple SVG layouts) for operational costs over time.
* **Deliverables**:
  * Expense logging modals.
  * Visual reporting dashboard depicting fuel cost trends and total expense breakdowns.

---

### 💅 Phase 5: Integration Testing & Polish (Time: 6:00 - 7:00)
* **Goal**: Iron out bugs, clean styling, and improve overall UX feel.
* **Tasks**:
  - [ ] **Cross-Browser Verification**: Check page flows on multiple viewports.
  - [ ] **Responsive Design**: Verify page columns collapse cleanly on tablet and mobile resolutions.
  - [ ] **Dark Mode Styling**: Implement a fast theme-toggle system.
  - [ ] **Bug Hunting**: Ensure edge cases (like empty lists or null values) fail gracefully.
* **Deliverables**:
  * Bug-free builds on the `develop` integration branch.
  * Polished, responsive UI with functioning Dark Mode toggle.

---

### 🚀 Phase 6: Cloud Deployment & Demo Preparation (Time: 7:00 - 8:00)
* **Goal**: Deploy the web application and rehearse the pitch.
* **Tasks**:
  - [ ] **Staging Deploy**: Deploy frontend to Vercel/Netlify.
  - [ ] **Final QA**: Validate database integrations on production URLs.
  - [ ] **Demo Strategy**: Assign roles (e.g., Speaker, Live Driver, Slide Operator).
  - [ ] **Practice Runs**: Complete 2-3 run-throughs of the demo to nail timing.
* **Deliverables**:
  * Live URL pointing to the deployed project.
  * A practiced 3-5 minute demo showcase outlining core user stories and database integrations.
