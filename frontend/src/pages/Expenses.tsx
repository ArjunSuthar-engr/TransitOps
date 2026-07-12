import { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

export default function Expenses() {
  const [isOpen, setIsOpen] = useState(false);
  const mockExpenses = [
    { id: '1', type: 'fuel', amount: '$270.00', date: '2026-07-10', description: 'Refueling for Volvo Coach' },
    { id: '2', type: 'maintenance', amount: '$340.00', date: '2026-07-10', description: 'Mercedes Benz brake pads service' },
    { id: '3', type: 'other', amount: '$45.00', date: '2026-07-08', description: 'Depot washing supplies' }
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Operational Expenses"
        description="Log operational costs, group them by category, and track cost distributions."
        actions={<Button size="sm" onClick={() => setIsOpen(true)}>Record Expense</Button>}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
            <TableHeaderCell>Expense Date</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell className="text-right">Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockExpenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>
                <Badge variant={expense.type === 'fuel' ? 'info' : expense.type === 'maintenance' ? 'warning' : 'neutral'}>
                  {expense.type}
                </Badge>
              </TableCell>
              <TableCell className="font-semibold text-slate-900 dark:text-white">{expense.amount}</TableCell>
              <TableCell>{expense.date}</TableCell>
              <TableCell>{expense.description}</TableCell>
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
        title="Record New Expense"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setIsOpen(false)}>Save Expense</Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Amount ($)" type="number" placeholder="e.g. 150" />
            <Input label="Expense Date" type="date" />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Expense Type
            </label>
            <select className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-950 dark:focus:ring-white">
              <option value="fuel">Fuel</option>
              <option value="maintenance">Maintenance</option>
              <option value="other">Other</option>
            </select>
          </div>
          <Input label="Description" placeholder="e.g. Depot washing supplies" />
        </div>
      </Modal>
    </div>
  );
}
