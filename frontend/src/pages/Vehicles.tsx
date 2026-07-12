import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { vehicleService } from '@/services/vehicleService';
import type { Vehicle } from '@/types/database';

export default function Vehicles() {
  const [isOpen, setIsOpen] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await vehicleService.getAll();
        setVehicles(data || []);
      } catch (error) {
        console.error('Failed to fetch vehicles:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Vehicles Fleet"
        description="Manage vehicle specifications, active route allocations, and status tracking."
        actions={<Button size="sm" onClick={() => setIsOpen(true)}>Add Vehicle</Button>}
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-brand-card p-4 border border-brand-border/60 rounded-2xl shadow-[0_1px_3px_rgba(12,13,13,0.01)]">
        <div className="relative w-full sm:max-w-xs font-sans">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search registration or model..."
            className="w-full rounded-xl border border-brand-border bg-brand-surface/20 py-1.75 pl-8.5 pr-3 text-xs placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto font-sans">
          <select className="px-3.5 py-2 border border-brand-border rounded-xl text-xs bg-brand-card text-brand-neutral-dark focus:outline-none focus:ring-2 focus:ring-brand-primary font-medium">
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="in_maintenance">In Maintenance</option>
            <option value="out_of_service">Out of Service</option>
          </select>
        </div>
      </div>

      {/* Grid Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Registration No.</TableHeaderCell>
            <TableHeaderCell>Make & Model</TableHeaderCell>
            <TableHeaderCell>Year</TableHeaderCell>
            <TableHeaderCell>Capacity</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell className="text-right">Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-brand-neutral-dark/60">Loading vehicles...</TableCell>
            </TableRow>
          ) : vehicles.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-brand-neutral-dark/60">No vehicles found.</TableCell>
            </TableRow>
          ) : (
            vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell className="font-semibold text-brand-primary dark:text-white">{vehicle.registration_number}</TableCell>
                <TableCell>{vehicle.make} {vehicle.model}</TableCell>
                <TableCell>{vehicle.year}</TableCell>
                <TableCell>{vehicle.capacity} seats</TableCell>
                <TableCell>
                  <Badge variant={vehicle.status === 'active' ? 'success' : vehicle.status === 'in_maintenance' ? 'warning' : 'danger'}>
                    {vehicle.status ? vehicle.status.replace(/_/g, ' ') : 'Unknown'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Add Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add New Vehicle"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setIsOpen(false)}>Add Vehicle</Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input label="Registration Number" placeholder="e.g. TX-402-A" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Make" placeholder="e.g. Ford" />
            <Input label="Model" placeholder="e.g. Transit" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Year" type="number" placeholder="e.g. 2022" />
            <Input label="Capacity (Seats)" type="number" placeholder="e.g. 12" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
