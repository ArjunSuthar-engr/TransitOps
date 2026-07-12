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
            placeholder="Search expenses logs..."
            className="w-full rounded-xl border border-brand-border bg-brand-surface/20 py-1.75 pl-8.5 pr-3 text-xs placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto font-sans">
          <select className="px-3.5 py-2 border border-brand-border rounded-xl text-xs bg-brand-card text-brand-neutral-dark focus:outline-none focus:ring-2 focus:ring-brand-primary font-medium">
            <option value="">All Categories</option>
            <option value="fuel">Fuel</option>
            <option value="maintenance">Maintenance</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Grid Table */}
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
              <TableCell className="font-semibold text-brand-primary dark:text-white">{expense.amount}</TableCell>
              <TableCell>{expense.date}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Expense Modal */}
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
        <div className="flex flex-col gap-4 font-sans">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Amount ($)" type="number" placeholder="e.g. 150" />
            <Input label="Expense Date" type="date" />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-semibold text-brand-neutral-dark/80 dark:text-slate-300">
              Expense Type
            </label>
            <select className="w-full px-3.5 py-2.25 border border-brand-border bg-white dark:bg-slate-950 text-brand-primary dark:text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary">
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
