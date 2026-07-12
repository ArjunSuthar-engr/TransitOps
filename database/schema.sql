-- TransitOps Database Schema
-- Supabase PostgreSQL 

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. ENUMS (Wait, we will use VARCHAR with CHECK for easier Supabase migration/maintenance, or ENUMs)
-- We will use CHECK constraints for better portability, as proposed in the implementation plan.
-- ==========================================

-- ==========================================
-- 2. TABLES
-- ==========================================

-- Roles Table
CREATE TABLE IF NOT EXISTS public.roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Users Table (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES public.roles(id) ON DELETE SET NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Vehicles Table
CREATE TABLE IF NOT EXISTS public.vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    registration_number VARCHAR(100) UNIQUE NOT NULL,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    capacity INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('active', 'in_maintenance', 'out_of_service')) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Drivers Table
CREATE TABLE IF NOT EXISTS public.drivers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    license_number VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    status VARCHAR(50) NOT NULL CHECK (status IN ('available', 'on_trip', 'off_duty')) DEFAULT 'available',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Trips Table
CREATE TABLE IF NOT EXISTS public.trips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE RESTRICT,
    driver_id UUID REFERENCES public.drivers(id) ON DELETE RESTRICT,
    start_location VARCHAR(255) NOT NULL,
    end_location VARCHAR(255) NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) NOT NULL CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')) DEFAULT 'scheduled',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Maintenance Logs Table
CREATE TABLE IF NOT EXISTS public.maintenance_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    cost DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    maintenance_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('scheduled', 'in_progress', 'completed')) DEFAULT 'scheduled',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Fuel Logs Table
CREATE TABLE IF NOT EXISTS public.fuel_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE,
    trip_id UUID REFERENCES public.trips(id) ON DELETE SET NULL,
    quantity_liters DECIMAL(10, 2) NOT NULL,
    cost DECIMAL(10, 2) NOT NULL,
    fuel_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Expenses Table
CREATE TABLE IF NOT EXISTS public.expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(50) NOT NULL CHECK (type IN ('fuel', 'maintenance', 'other')),
    amount DECIMAL(10, 2) NOT NULL,
    expense_date DATE NOT NULL,
    trip_id UUID REFERENCES public.trips(id) ON DELETE SET NULL,
    maintenance_id UUID REFERENCES public.maintenance_logs(id) ON DELETE SET NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- 3. INDEXES
-- ==========================================
CREATE INDEX idx_users_role_id ON public.users(role_id);
CREATE INDEX idx_trips_vehicle_id ON public.trips(vehicle_id);
CREATE INDEX idx_trips_driver_id ON public.trips(driver_id);
CREATE INDEX idx_trips_status ON public.trips(status);
CREATE INDEX idx_maintenance_vehicle_id ON public.maintenance_logs(vehicle_id);
CREATE INDEX idx_fuel_vehicle_id ON public.fuel_logs(vehicle_id);
CREATE INDEX idx_fuel_trip_id ON public.fuel_logs(trip_id);
CREATE INDEX idx_expenses_trip_id ON public.expenses(trip_id);
CREATE INDEX idx_expenses_maintenance_id ON public.expenses(maintenance_id);

-- ==========================================
-- 4. ROW LEVEL SECURITY (RLS)
-- ==========================================
-- Enable RLS on all tables
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fuel_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- Basic Policies (Simplified for Hackathon Demo)
-- Allow authenticated users to perform SELECT, INSERT, UPDATE, DELETE

CREATE POLICY "Allow all access for authenticated users on roles" ON public.roles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access for authenticated users on users" ON public.users FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access for authenticated users on vehicles" ON public.vehicles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access for authenticated users on drivers" ON public.drivers FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access for authenticated users on trips" ON public.trips FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access for authenticated users on maintenance_logs" ON public.maintenance_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access for authenticated users on fuel_logs" ON public.fuel_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access for authenticated users on expenses" ON public.expenses FOR ALL TO authenticated USING (true) WITH CHECK (true);
