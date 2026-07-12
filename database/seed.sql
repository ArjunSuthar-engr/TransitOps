-- TransitOps Database Seed Data

-- 1. Roles
INSERT INTO public.roles (id, name) VALUES 
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'admin'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'dispatcher'),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'manager')
ON CONFLICT (name) DO NOTHING;

-- Note: In a real Supabase environment, users need to be created in auth.users first.
-- For local testing without full auth, you might bypass inserting into `users` or mock `auth.users`.
-- Here we'll skip mocking `auth.users` directly in seed to prevent foreign key errors if `auth.users` isn't ready.
-- Alternatively, if needed, Janak can create users via the Supabase Auth API, which can then trigger insertion into `public.users`.

-- 2. Vehicles
INSERT INTO public.vehicles (id, registration_number, make, model, year, capacity, status) VALUES
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'KA-01-AB-1234', 'Tata', 'Marcopolo', 2020, 40, 'active'),
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', 'MH-02-CD-5678', 'Ashok Leyland', 'Cheetah', 2019, 50, 'active'),
('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', 'DL-03-EF-9012', 'Volvo', 'B11R', 2022, 45, 'in_maintenance')
ON CONFLICT (registration_number) DO NOTHING;

-- 3. Drivers
INSERT INTO public.drivers (id, license_number, first_name, last_name, phone, status) VALUES
('10eebc99-9c0b-4ef8-bb6d-6bb9bd380a77', 'DL-123456789', 'Rajesh', 'Kumar', '+919876543210', 'available'),
('20eebc99-9c0b-4ef8-bb6d-6bb9bd380a88', 'MH-987654321', 'Suresh', 'Singh', '+919876543211', 'on_trip'),
('30eebc99-9c0b-4ef8-bb6d-6bb9bd380a99', 'KA-456789123', 'Amit', 'Sharma', '+919876543212', 'off_duty')
ON CONFLICT (license_number) DO NOTHING;

-- 4. Trips
INSERT INTO public.trips (id, vehicle_id, driver_id, start_location, end_location, start_time, end_time, status) VALUES
('40eebc99-9c0b-4ef8-bb6d-6bb9bd380a00', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', '10eebc99-9c0b-4ef8-bb6d-6bb9bd380a77', 'Bangalore', 'Mysore', '2026-07-12 08:00:00+05:30', '2026-07-12 11:00:00+05:30', 'completed'),
('50eebc99-9c0b-4ef8-bb6d-6bb9bd380b11', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', '20eebc99-9c0b-4ef8-bb6d-6bb9bd380a88', 'Mumbai', 'Pune', '2026-07-12 14:00:00+05:30', NULL, 'in_progress')
ON CONFLICT (id) DO NOTHING;

-- 5. Maintenance Logs
INSERT INTO public.maintenance_logs (id, vehicle_id, description, cost, maintenance_date, status) VALUES
('60eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', 'Engine Oil Change and Brake Inspection', 5000.00, '2026-07-11', 'in_progress'),
('70eebc99-9c0b-4ef8-bb6d-6bb9bd380b33', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'Tire Replacement', 15000.00, '2026-06-15', 'completed')
ON CONFLICT (id) DO NOTHING;

-- 6. Fuel Logs
INSERT INTO public.fuel_logs (id, vehicle_id, trip_id, quantity_liters, cost, fuel_date) VALUES
('80eebc99-9c0b-4ef8-bb6d-6bb9bd380b44', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', '40eebc99-9c0b-4ef8-bb6d-6bb9bd380a00', 50.00, 4500.00, '2026-07-12'),
('90eebc99-9c0b-4ef8-bb6d-6bb9bd380b55', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', '50eebc99-9c0b-4ef8-bb6d-6bb9bd380b11', 80.00, 7200.00, '2026-07-12')
ON CONFLICT (id) DO NOTHING;

-- 7. Expenses
INSERT INTO public.expenses (id, type, amount, expense_date, trip_id, maintenance_id, description) VALUES
('a1eebc99-9c0b-4ef8-bb6d-6bb9bd380b66', 'fuel', 4500.00, '2026-07-12', '40eebc99-9c0b-4ef8-bb6d-6bb9bd380a00', NULL, 'Fuel for Bangalore-Mysore trip'),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b77', 'maintenance', 5000.00, '2026-07-11', NULL, '60eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'Engine Oil Change advance payment'),
('c1eebc99-9c0b-4ef8-bb6d-6bb9bd380b88', 'other', 500.00, '2026-07-12', '40eebc99-9c0b-4ef8-bb6d-6bb9bd380a00', NULL, 'Toll tax')
ON CONFLICT (id) DO NOTHING;
