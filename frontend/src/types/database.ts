export type VehicleStatus = 'active' | 'in_maintenance' | 'out_of_service';

export interface Vehicle {
  id: string;
  registration_number: string;
  make: string;
  model: string;
  year: number;
  capacity: number;
  status: VehicleStatus;
  created_at: string;
  updated_at: string;
}

export type DriverStatus = 'available' | 'on_trip' | 'off_duty';

export interface Driver {
  id: string;
  license_number: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  status: DriverStatus;
  created_at: string;
  updated_at: string;
}

export type TripStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export interface Trip {
  id: string;
  vehicle_id: string | null;
  driver_id: string | null;
  start_location: string;
  end_location: string;
  start_time: string;
  end_time: string | null;
  status: TripStatus;
  created_at: string;
  updated_at: string;
}

export type MaintenanceStatus = 'scheduled' | 'in_progress' | 'completed';

export interface MaintenanceLog {
  id: string;
  vehicle_id: string;
  description: string;
  cost: number;
  maintenance_date: string;
  status: MaintenanceStatus;
  created_at: string;
  updated_at: string;
}

export interface FuelLog {
  id: string;
  vehicle_id: string;
  trip_id: string | null;
  quantity_liters: number;
  cost: number;
  fuel_date: string;
  created_at: string;
  updated_at: string;
}

export type ExpenseType = 'fuel' | 'maintenance' | 'other';

export interface Expense {
  id: string;
  type: ExpenseType;
  amount: number;
  expense_date: string;
  trip_id: string | null;
  maintenance_id: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: string;
  name: string;
  created_at: string;
}

export interface User {
  id: string;
  role_id: string | null;
  full_name: string;
  email: string;
  created_at: string;
  updated_at: string;
}
