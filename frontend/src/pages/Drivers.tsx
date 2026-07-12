import { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

export default function Drivers() {
  const [isOpen, setIsOpen] = useState(false);
  const mockDrivers = [
    { id: '1', name: 'Marcus Vance', phone: '+1 555-0199', license_number: 'DL-98402A', status: 'on_trip' },
    { id: '2', name: 'Sarah Connor', phone: '+1 555-0122', license_number: 'DL-44812B', status: 'available' },
    { id: '3', name: 'Elena Rostova', phone: '+1 555-0188', license_number: 'DL-11802C', status: 'available' },
    { id: '4', name: 'James Carter', phone: '+1 555-0155', license_number: 'DL-55204D', status: 'off_duty' }
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Drivers Registry"
        description="Manage vehicle operators, contact coordinates, shift patterns, and license configurations."
        actions={<Button size="sm" onClick={() => setIsOpen(true)}>Add Driver</Button>}
      />

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
          {mockDrivers.map((driver) => (
            <TableRow key={driver.id}>
              <TableCell className="font-semibold text-slate-900 dark:text-white">{driver.name}</TableCell>
              <TableCell>{driver.phone}</TableCell>
              <TableCell>{driver.license_number}</TableCell>
              <TableCell>
                <Badge variant={driver.status === 'available' ? 'success' : driver.status === 'on_trip' ? 'info' : 'neutral'}>
                  {driver.status.replace('_', ' ')}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
