import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { driverService } from '@/services/driverService';
import type { Driver } from '@/types/database';

export default function Drivers() {
  const [isOpen, setIsOpen] = useState(false);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const data = await driverService.getAll();
        setDrivers(data || []);
      } catch (error) {
        console.error('Failed to fetch drivers:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDrivers();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Drivers Registry"
        description="Manage vehicle operators, contact details, shifts, and active licensing status."
        actions={<Button size="sm" onClick={() => setIsOpen(true)}>Add Driver</Button>}
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
            placeholder="Search drivers name..."
            className="w-full rounded-xl border border-brand-border bg-brand-surface/20 py-1.75 pl-8.5 pr-3 text-xs placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto font-sans">
          <select className="px-3.5 py-2 border border-brand-border rounded-xl text-xs bg-brand-card text-brand-neutral-dark focus:outline-none focus:ring-2 focus:ring-brand-primary font-medium">
            <option value="">All Availabilities</option>
            <option value="available">Available</option>
            <option value="on_trip">On Trip</option>
            <option value="off_duty">Off Duty</option>
          </select>
        </div>
      </div>

      {/* Grid Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Driver Name</TableHeaderCell>
            <TableHeaderCell>Phone</TableHeaderCell>
            <TableHeaderCell>License No.</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell className="text-right">Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-brand-neutral-dark/60">Loading drivers...</TableCell>
            </TableRow>
          ) : drivers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-brand-neutral-dark/60">No drivers found.</TableCell>
            </TableRow>
          ) : (
            drivers.map((driver) => (
              <TableRow key={driver.id}>
                <TableCell className="font-semibold text-brand-primary dark:text-white">{driver.first_name} {driver.last_name}</TableCell>
                <TableCell>{driver.phone || 'N/A'}</TableCell>
                <TableCell>{driver.license_number}</TableCell>
                <TableCell>
                  <Badge variant={driver.status === 'available' ? 'success' : driver.status === 'on_trip' ? 'info' : 'neutral'}>
                    {driver.status ? driver.status.replace('_', ' ') : 'Unknown'}
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
        title="Add New Driver"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setIsOpen(false)}>Add Driver</Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input label="Full Name" placeholder="e.g. Marcus Vance" />
          <Input label="Phone Number" type="tel" placeholder="e.g. +1 555-0199" />
          <Input label="License Number" placeholder="e.g. DL-98402A" />
        </div>
      </Modal>
    </div>
  );
}
