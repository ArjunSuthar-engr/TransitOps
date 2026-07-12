# TransitOps Database Documentation

This directory contains the database design, schema, and seed files for the **TransitOps** project.

## Files
- `schema.sql`: Contains the complete database schema with tables, extensions, relationships, constraints, indexes, and Row Level Security (RLS) policies.
- `seed.sql`: Contains initial realistic mock data for testing UI functionality.

## Table Architecture

### 1. `roles` & `users`
- Connects Supabase's `auth.users` to our custom role-based access control (RBAC) system.
- Roles can be: `admin`, `dispatcher`, or `manager`.

### 2. `vehicles`
- Stores our fleet of vehicles. 
- `registration_number` is unique. 
- Lifecycle statuses tracked via `status` ('active', 'in_maintenance', 'out_of_service').

### 3. `drivers`
- Stores driver details. 
- `license_number` is unique.
- Driver statuses tracked via `status` ('available', 'on_trip', 'off_duty').

### 4. `trips`
- Central entity connecting a vehicle and driver.
- Enforces the rule that a trip references exactly one vehicle and one driver.
- Statuses: 'scheduled', 'in_progress', 'completed', 'cancelled'.

### 5. `maintenance_logs`
- References a vehicle to track service history.
- Logs costs, descriptions, and statuses of the maintenance.

### 6. `fuel_logs`
- References a vehicle and optionally a trip to track fuel consumption and costs.

### 7. `expenses`
- Financial ledger for the system.
- Can optionally reference a `trip_id` or `maintenance_id` to trace operational costs directly to operations.
- Types: 'fuel', 'maintenance', 'other'.

## Integration Notes for Backend & Frontend Developers (Janak & Arjun)
1. **Supabase URL & Key**: I have created an `.env.example` in the project root. You will need to replace the placeholders with your actual Supabase URL and anon key once the project is deployed to the Supabase cloud dashboard.
2. **Schema & Seed Execution**: Run the SQL commands located in `schema.sql` first in the Supabase SQL editor. Follow it by running `seed.sql`.
3. **Authentication Flow**: The `public.users` table relies on `auth.users` being present. So, for the seed data to work perfectly without foreign key violations if you enforce them strictly, create the corresponding auth users first. Or, temporarily disable foreign key constraints in `public.users` during local seed testing.
4. **RLS (Row Level Security)**: I have enabled RLS on all tables, with basic permissive policies to get us started. Janak can refine these policies in Phase 1 based on JWT claims and user roles.
