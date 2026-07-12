import type { Vehicle, Driver, Trip } from '@/types/database';

export const businessRules = {
  canDispatchVehicle: (vehicle: Vehicle, requestedCapacity: number = 0): { allowed: boolean; reason?: string } => {
    if (vehicle.status === 'in_maintenance') {
      return { allowed: false, reason: 'Vehicle is currently in maintenance.' };
    }
    if (vehicle.status === 'out_of_service') {
      return { allowed: false, reason: 'Vehicle is out of service.' };
    }
    if (requestedCapacity > vehicle.capacity) {
      return { allowed: false, reason: 'Cargo exceeds vehicle capacity.' };
    }
    return { allowed: true };
  },

  canDispatchDriver: (driver: Driver): { allowed: boolean; reason?: string } => {
    if (driver.status === 'on_trip') {
      return { allowed: false, reason: 'Driver is already on a trip.' };
    }
    if (driver.status === 'off_duty') {
      return { allowed: false, reason: 'Driver is currently off duty.' };
    }
    return { allowed: true };
  },

  isVehicleAvailableForSchedule: (vehicleId: string, activeTrips: Trip[]): { allowed: boolean; reason?: string } => {
    const isBusy = activeTrips.some(
      t => t.vehicle_id === vehicleId && (t.status === 'in_progress' || t.status === 'scheduled')
    );
    if (isBusy) {
      return { allowed: false, reason: 'Vehicle is already scheduled or on a trip.' };
    }
    return { allowed: true };
  },

  isDriverAvailableForSchedule: (driverId: string, activeTrips: Trip[]): { allowed: boolean; reason?: string } => {
    const isBusy = activeTrips.some(
      t => t.driver_id === driverId && (t.status === 'in_progress' || t.status === 'scheduled')
    );
    if (isBusy) {
      return { allowed: false, reason: 'Driver is already scheduled or on a trip.' };
    }
    return { allowed: true };
  }
};
