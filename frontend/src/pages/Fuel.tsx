import { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

export default function Fuel() {
  const [isOpen, setIsOpen] = useState(false);
  const mockFuelLogs = [
    { id: '1', vehicle: 'Ford Transit (TX-402-A)', quantity: 45, cost: '$67.50', date: '2026-07-11' },
    { id: '2', vehicle: 'Volvo Coach (TX-901-B)', quantity: 180, cost: '$270.00', date: '2026-07-10' },
    { id: '3', vehicle: 'Mercedes Benz (TX-112-C)', quantity: 50, cost: '$75.00', date: '2026-07-09' }
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Fuel Logs"
        description="Log fuel purchases, trace consumption ratios, and monitor refueling data grids."
        actions={<Button size="sm" onClick={() => setIsOpen(true)}>Log Fuel Fill</Button>}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Vehicle</TableHeaderCell>
            <TableHeaderCell>Quantity (Liters)</TableHeaderCell>
            <TableHeaderCell>Cost</TableHeaderCell>
            <TableHeaderCell>Fill Date</TableHeaderCell>
            <TableHeaderCell className="text-right">Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockFuelLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="font-semibold text-slate-900 dark:text-white">{log.vehicle}</TableCell>
              <TableCell>{log.quantity} L</TableCell>
              <TableCell className="font-semibold text-slate-900 dark:text-white">{log.cost}</TableCell>
              <TableCell>{log.date}</TableCell>
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
        title="Log Fuel Fill-Up"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setIsOpen(false)}>Save Log</Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input label="Vehicle ID / Registration" placeholder="e.g. Ford Transit (TX-402-A)" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Quantity (Liters)" type="number" placeholder="e.g. 50" />
            <Input label="Cost ($)" type="number" placeholder="e.g. 75" />
          </div>
          <Input label="Fill-up Date" type="date" />
        </div>
      </Modal>
    </div>
  );
}
