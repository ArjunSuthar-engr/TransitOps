import { useState, useEffect, useMemo } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { fuelService } from '@/services/fuelService';

export default function Fuel() {
  const [isOpen, setIsOpen] = useState(false);
  const [fuelLogs, setFuelLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFuelLogs = async () => {
      try {
        const data = await fuelService.getAll();
        setFuelLogs(data || []);
      } catch (error) {
        console.error('Failed to fetch fuel logs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFuelLogs();
  }, []);

  const totalFuelFilled = useMemo(() => fuelLogs.reduce((acc, log) => acc + (Number(log.quantity) || 0), 0), [fuelLogs]);
  const combinedSpend = useMemo(() => fuelLogs.reduce((acc, log) => acc + (Number(log.cost) || 0), 0), [fuelLogs]);
  const avgPrice = totalFuelFilled > 0 ? (combinedSpend / totalFuelFilled).toFixed(2) : '0.00';

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Fuel Logs"
        description="Log fuel purchases, trace consumption ratios, and manage refueling financial data."
        actions={<Button size="sm" onClick={() => setIsOpen(true)}>Log Fuel Fill</Button>}
      />

      {/* Fuel Financial Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5 flex flex-col gap-1 font-sans">
            <span className="text-[10px] font-semibold text-brand-neutral-dark/50 uppercase tracking-wider">Total Fuel Filled</span>
            <span className="text-xl font-display font-bold text-brand-primary">{totalFuelFilled} Liters</span>
            <span className="text-[10px] text-brand-neutral-dark/40 mt-1">Sum of active refueling logs</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex flex-col gap-1 font-sans">
            <span className="text-[10px] font-semibold text-brand-neutral-dark/50 uppercase tracking-wider">Average Price/L</span>
            <span className="text-xl font-display font-bold text-brand-primary">₹{avgPrice}</span>
            <span className="text-[10px] text-[#A5D48C] font-semibold mt-1">Calculated from logs</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex flex-col gap-1 font-sans">
            <span className="text-[10px] font-semibold text-brand-neutral-dark/50 uppercase tracking-wider">Combined Spend</span>
            <span className="text-xl font-display font-bold text-brand-primary">₹{combinedSpend.toLocaleString('en-IN')}</span>
            <span className="text-[10px] text-brand-neutral-dark/40 mt-1">Direct fuel expenditures</span>
          </CardContent>
        </Card>
      </div>

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
            placeholder="Search fuel vehicle logs..."
            className="w-full rounded-xl border border-brand-border bg-brand-surface/20 py-1.75 pl-8.5 pr-3 text-xs placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>
      </div>

      {/* Grid Table */}
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
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-brand-neutral-dark/60">Loading fuel logs...</TableCell>
            </TableRow>
          ) : fuelLogs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-brand-neutral-dark/60">No fuel logs found.</TableCell>
            </TableRow>
          ) : (
            fuelLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-semibold text-brand-primary dark:text-white">
                  {log.vehicle ? `${log.vehicle.make} ${log.vehicle.model} (${log.vehicle.registration_number})` : 'N/A'}
                </TableCell>
                <TableCell>{log.quantity} L</TableCell>
                <TableCell className="font-semibold text-brand-primary dark:text-white">₹{Number(log.cost).toLocaleString('en-IN')}</TableCell>
                <TableCell>{formatDate(log.date)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Refuel Modal */}
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
        <div className="flex flex-col gap-4 font-sans">
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
