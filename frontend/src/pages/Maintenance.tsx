import { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

export default function Maintenance() {
  const [isOpen, setIsOpen] = useState(false);
  const mockLogs = [
    { id: '1', vehicle: 'Ford Transit (TX-402-A)', description: 'Engine oil replacement and filter change', date: '2026-07-02', cost: '$120.00', status: 'completed' },
    { id: '2', vehicle: 'Mercedes Benz (TX-112-C)', description: 'Brake pads replacement & rotor turning', date: '2026-07-10', cost: '$340.00', status: 'in_progress' },
    { id: '3', vehicle: 'Volvo Coach (TX-901-B)', description: 'Transmission fluid flush and system check', date: '2026-07-25', cost: '$580.00', status: 'scheduled' }
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Maintenance Logs"
        description="Log service records, scheduled inspections, preventative checklists, and service costs."
        actions={<Button size="sm" onClick={() => setIsOpen(true)}>Log Service</Button>}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Vehicle</TableHeaderCell>
            <TableHeaderCell>Service Task</TableHeaderCell>
            <TableHeaderCell>Service Date</TableHeaderCell>
            <TableHeaderCell>Cost</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell className="text-right">Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="font-semibold text-slate-900 dark:text-white">{log.vehicle}</TableCell>
              <TableCell>{log.description}</TableCell>
              <TableCell>{log.date}</TableCell>
              <TableCell className="font-semibold text-slate-900 dark:text-white">{log.cost}</TableCell>
              <TableCell>
                <Badge variant={log.status === 'completed' ? 'success' : log.status === 'in_progress' ? 'warning' : 'neutral'}>
                  {log.status.replace('_', ' ')}
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
        title="Log Vehicle Service"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setIsOpen(false)}>Save Log</Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input label="Vehicle ID / Registration" placeholder="e.g. Ford Transit (TX-402-A)" />
          <Input label="Description of Service" placeholder="e.g. Engine oil replacement" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Service Date" type="date" />
            <Input label="Service Cost ($)" type="number" placeholder="e.g. 150" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
