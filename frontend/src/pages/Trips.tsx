import { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

export default function Trips() {
  const [isOpen, setIsOpen] = useState(false);
  const mockTrips = [
    { id: 'TRP-1042', vehicle: 'Ford Transit (TX-402-A)', driver: 'Marcus Vance', origin: 'Depot A', destination: 'North Station', start: '09:00 AM', status: 'in_progress' },
    { id: 'TRP-1041', vehicle: 'Volvo Coach (TX-901-B)', driver: 'Sarah Connor', origin: 'Central Mall', destination: 'South Station', start: '07:30 AM', status: 'completed' },
    { id: 'TRP-1040', vehicle: 'Mercedes Benz (TX-112-C)', driver: 'Elena Rostova', origin: 'Depot B', destination: 'City Center', start: '11:00 AM', status: 'scheduled' },
    { id: 'TRP-1039', vehicle: 'Chevrolet Express (TX-504-D)', driver: 'James Carter', origin: 'Depot A', destination: 'Airport Terminal 2', start: '06:00 AM', status: 'cancelled' }
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Trips Dispatch"
        description="Dispatch and monitor active vehicle runs and operator assignments."
        actions={<Button size="sm" onClick={() => setIsOpen(true)}>Dispatch Run</Button>}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Trip ID</TableHeaderCell>
            <TableHeaderCell>Vehicle</TableHeaderCell>
            <TableHeaderCell>Driver</TableHeaderCell>
            <TableHeaderCell>Route</TableHeaderCell>
            <TableHeaderCell>Scheduled Start</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell className="text-right">Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockTrips.map((trip) => (
            <TableRow key={trip.id}>
              <TableCell className="font-semibold text-slate-900 dark:text-white">{trip.id}</TableCell>
              <TableCell>{trip.vehicle}</TableCell>
              <TableCell>{trip.driver}</TableCell>
              <TableCell>{trip.origin} → {trip.destination}</TableCell>
              <TableCell>{trip.start}</TableCell>
              <TableCell>
                <Badge variant={trip.status === 'completed' ? 'success' : trip.status === 'in_progress' ? 'info' : trip.status === 'scheduled' ? 'neutral' : 'danger'}>
                  {trip.status.replace('_', ' ')}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">Manage</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Dispatch New Trip"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setIsOpen(false)}>Confirm Dispatch</Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Vehicle ID" placeholder="e.g. Ford Transit (TX-402-A)" />
            <Input label="Driver ID" placeholder="e.g. Marcus Vance" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Origin Location" placeholder="e.g. Depot A" />
            <Input label="Destination Location" placeholder="e.g. North Station" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Time" type="time" />
            <Input label="Est. End Time" type="time" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
