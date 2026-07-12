# Database Integration Guide for Application Logic (Janak)

This guide documents the database structures, enums, and suggested services for integrating the React application with Supabase.

## Table Architectures & Models

### 1. `roles`
Stores RBAC roles.
- `id` (UUID, Primary Key)
- `name` (VARCHAR, Unique) - e.g., 'admin', 'dispatcher', 'manager'
- `created_at` (TIMESTAMP)

### 2. `users`
Extends `auth.users` with application-specific metadata.
- `id` (UUID, Primary Key, Foreign Key to `auth.users(id)`)
- `role_id` (UUID, Foreign Key to `roles(id)`)
- `full_name` (VARCHAR)
- `email` (VARCHAR, Unique)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### 3. `vehicles`
Fleet information.
- `id` (UUID, Primary Key)
- `registration_number` (VARCHAR, Unique)
- `make` (VARCHAR)
- `model` (VARCHAR)
- `year` (INTEGER)
- `capacity` (INTEGER)
- `status` (VARCHAR, Enum-like constraint: 'active', 'in_maintenance', 'out_of_service')
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### 4. `drivers`
Driver personnel.
- `id` (UUID, Primary Key)
- `license_number` (VARCHAR, Unique)
- `first_name` (VARCHAR)
- `last_name` (VARCHAR)
- `phone` (VARCHAR)
- `status` (VARCHAR, Enum-like constraint: 'available', 'on_trip', 'off_duty')
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### 5. `trips`
Central trip ledger.
- `id` (UUID, Primary Key)
- `vehicle_id` (UUID, Foreign Key to `vehicles(id)`)
- `driver_id` (UUID, Foreign Key to `drivers(id)`)
- `start_location` (VARCHAR)
- `end_location` (VARCHAR)
- `start_time` (TIMESTAMP WITH TIME ZONE)
- `end_time` (TIMESTAMP WITH TIME ZONE, nullable)
- `status` (VARCHAR, Enum-like constraint: 'scheduled', 'in_progress', 'completed', 'cancelled')
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### 6. `maintenance_logs`
Maintenance tracking for vehicles.
- `id` (UUID, Primary Key)
- `vehicle_id` (UUID, Foreign Key to `vehicles(id)`)
- `description` (TEXT)
- `cost` (DECIMAL)
- `maintenance_date` (DATE)
- `status` (VARCHAR, Enum-like constraint: 'scheduled', 'in_progress', 'completed')
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### 7. `fuel_logs`
Fuel fillings per vehicle.
- `id` (UUID, Primary Key)
- `vehicle_id` (UUID, Foreign Key to `vehicles(id)`)
- `trip_id` (UUID, nullable Foreign Key to `trips(id)`)
- `quantity_liters` (DECIMAL)
- `cost` (DECIMAL)
- `fuel_date` (DATE)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### 8. `expenses`
Operational expenses.
- `id` (UUID, Primary Key)
- `type` (VARCHAR, Enum-like constraint: 'fuel', 'maintenance', 'other')
- `amount` (DECIMAL)
- `expense_date` (DATE)
- `trip_id` (UUID, nullable Foreign Key to `trips(id)`)
- `maintenance_id` (UUID, nullable Foreign Key to `maintenance_logs(id)`)
- `description` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

---

## Suggested Service Names for Application Layer

To maintain separation of concerns, it is recommended to implement the following services in `frontend/src/services/`:

- `authService`: Login, session management, logout (via Supabase Auth API).
- `userService`: Manage `public.users` profiles and assign roles.
- `vehicleService`: CRUD for vehicles.
- `driverService`: CRUD for drivers.
- `tripService`: Creation and lifecycle management of trips.
- `maintenanceService`: Manage vehicle maintenance history.
- `fuelService`: Track fuel logs.
- `expenseService`: Aggregate and report on operational costs.

---

## Important Validation Rules to Enforce in Application Layer

While the database has strict constraints, the application layer MUST validate the following business logic before submitting to Supabase to provide better UI feedback:

1. **Trip Assignments**: A vehicle or driver cannot be assigned to a new trip if they are currently assigned to a trip with an `in_progress` status.
2. **Maintenance Blockers**: A vehicle cannot be assigned to a trip if its status is `in_maintenance` or `out_of_service`.
3. **Availability Validation**: A driver cannot be assigned to a trip if their status is `off_duty`.
4. **Expense Linking**: If an expense `type` is 'fuel', ideally `trip_id` should be provided if known. If `type` is 'maintenance', `maintenance_id` should be provided.

## Row Level Security (RLS)

- RLS is enabled for all tables.
- For the hackathon demo, permissive policies (`USING (true) WITH CHECK (true)`) are in place for all authenticated users to allow seamless testing of SELECT, INSERT, UPDATE, and DELETE operations. Ensure the user is logged in before attempting CRUD.
