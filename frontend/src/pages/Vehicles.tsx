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
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [regNum, setRegNum] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [capacity, setCapacity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = v.registration_number.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (v.make + ' ' + v.model).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === '' || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenModal = () => {
    setRegNum('');
    setMake('');
    setModel('');
    setYear(new Date().getFullYear().toString());
    setCapacity('');
    setIsOpen(true);
  };

  const handleFillDemoVehicle = () => {
    const demoVehicles = vehicles.filter(v => v.make === 'Demo');
    let maxNum = 0;
    demoVehicles.forEach(v => {
      const num = parseInt(v.model.replace('Model ', ''));
      if (!isNaN(num) && num > maxNum) maxNum = num;
    });
    const nextNum = maxNum + 1;
    const randomCapacity = Math.floor(Math.random() * (40 - 10 + 1) + 10);
    
    setRegNum(`DEMO-KA-${nextNum.toString().padStart(4, '0')}`);
    setMake('Demo');
    setModel(`Model ${nextNum}`);
    setYear(new Date().getFullYear().toString());
    setCapacity(randomCapacity.toString());
  };

  const handleAddVehicle = async () => {
    if (!regNum || !make || !model || !year || !capacity) {
      alert('Please fill out all fields.');
      return;
    }
    setIsSubmitting(true);
    try {
      const newVehicle = {
        registration_number: regNum,
        make,
        model,
        year: parseInt(year) || new Date().getFullYear(),
        capacity: parseInt(capacity) || 0,
        status: 'active' as const
      };
      await vehicleService.create(newVehicle);
      const data = await vehicleService.getAll();
      setVehicles(data || []);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to add vehicle:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        actions={<Button size="sm" onClick={handleOpenModal}>Add Vehicle</Button>}
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto font-sans">
          <select 
            className="px-3.5 py-2 border border-brand-border rounded-xl text-xs bg-brand-card text-brand-neutral-dark focus:outline-none focus:ring-2 focus:ring-brand-primary font-medium"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-brand-neutral-dark/60">Loading vehicles...</TableCell>
            </TableRow>
          ) : filteredVehicles.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-brand-neutral-dark/60">No vehicles found.</TableCell>
            </TableRow>
          ) : (
            filteredVehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell className="font-semibold text-brand-primary dark:text-white">{vehicle.registration_number}</TableCell>
                <TableCell>{vehicle.make} {vehicle.model}</TableCell>
                <TableCell>{vehicle.year}</TableCell>
                <TableCell>{vehicle.capacity} Tonnes</TableCell>
                <TableCell>
                  <Badge variant={vehicle.status === 'active' ? 'success' : vehicle.status === 'in_maintenance' ? 'warning' : 'danger'}>
                    {vehicle.status ? vehicle.status.replace(/_/g, ' ') : 'Unknown'}
                  </Badge>
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
          <div className="flex w-full items-center justify-between">
            <Button variant="outline" size="sm" onClick={handleFillDemoVehicle}>
              Add Demo Vehicle
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button size="sm" onClick={handleAddVehicle} disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Vehicle'}
              </Button>
            </div>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <Input 
            label="Registration Number" 
            placeholder="e.g. TX-402-A" 
            value={regNum}
            onChange={(e) => setRegNum(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Make" 
              placeholder="e.g. Ford" 
              value={make}
              onChange={(e) => setMake(e.target.value)}
            />
            <Input 
              label="Model" 
              placeholder="e.g. Transit" 
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Year" 
              type="number" 
              placeholder="e.g. 2022" 
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <Input 
              label="Capacity (Tonnes)" 
              type="number" 
              placeholder="e.g. 12" 
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
