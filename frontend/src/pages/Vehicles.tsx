import { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

export default function Vehicles() {
  const [isOpen, setIsOpen] = useState(false);
  const mockVehicles = [
    { id: '1', registration_number: 'TX-402-A', make: 'Ford', model: 'Transit', year: 2021, capacity: 12, status: 'active' },
    { id: '2', registration_number: 'TX-901-B', make: 'Volvo', model: 'Coach 9700', year: 2019, capacity: 45, status: 'active' },
    { id: '3', registration_number: 'TX-112-C', make: 'Mercedes Benz', model: 'Sprinter', year: 2020, capacity: 15, status: 'in_maintenance' },
    { id: '4', registration_number: 'TX-504-D', make: 'Chevrolet', model: 'Express', year: 2018, capacity: 12, status: 'out_of_service' }
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Vehicles Fleet"
        description="Manage vehicle tracking, specifications, capacity metrics, and statuses."
        actions={<Button size="sm" onClick={() => setIsOpen(true)}>Add Vehicle</Button>}
      />

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
          {mockVehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell className="font-semibold text-slate-900 dark:text-white">{vehicle.registration_number}</TableCell>
              <TableCell>{vehicle.make} {vehicle.model}</TableCell>
              <TableCell>{vehicle.year}</TableCell>
              <TableCell>{vehicle.capacity} seats</TableCell>
              <TableCell>
                <Badge variant={vehicle.status === 'active' ? 'success' : vehicle.status === 'in_maintenance' ? 'warning' : 'danger'}>
                  {vehicle.status.replace('_', ' ')}
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
