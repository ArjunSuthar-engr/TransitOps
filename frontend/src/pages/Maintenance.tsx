import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { maintenanceService } from '@/services/maintenanceService';
import { vehicleService } from '@/services/vehicleService';
import type { Vehicle } from '@/types/database';

export default function Maintenance() {
  const [isOpen, setIsOpen] = useState(false);
  const [maintenanceLogs, setMaintenanceLogs] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [serviceDate, setServiceDate] = useState('');
  const [serviceCost, setServiceCost] = useState('');

  useEffect(() => {
    const fetchMaintenanceAndVehicles = async () => {
      try {
        const [logsData, vehiclesData] = await Promise.all([
          maintenanceService.getAll(),
          vehicleService.getAll()
        ]);
        setMaintenanceLogs(logsData || []);
        setVehicles((vehiclesData || []).filter(v => v.status === 'active'));
      } catch (error) {
        console.error('Failed to fetch maintenance logs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMaintenanceAndVehicles();
  }, []);

  const handleOpenModal = () => {
    setSelectedVehicleId('');
    setServiceDescription('');
    setServiceDate('');
    setServiceCost('');
    setIsOpen(true);
  };

  const handleFillDemoService = () => {
    const demoEntries = [
      'Engine oil replacement and filter inspection',
      'Brake pad inspection with fluid top-up',
      'Battery check, terminal cleaning, and diagnostics',
      'Tire rotation and wheel alignment',
      'General servicing with coolant flush'
    ];

    const demoCosts = ['7450', '10920', '5950', '8320', '6230'];
    const latestVehicle = vehicles[0];

    if (latestVehicle) {
      setSelectedVehicleId(latestVehicle.id);
    }
    setServiceDescription(demoEntries[maintenanceLogs.length % demoEntries.length]);
    setServiceDate(new Date().toISOString().slice(0, 10));
    setServiceCost(demoCosts[maintenanceLogs.length % demoCosts.length]);
    setIsOpen(true);
  };

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
        title="Maintenance Logs"
        description="Log service records, scheduled inspections, preventative checklists, and service costs."
        actions={<Button size="sm" onClick={handleOpenModal}>Log Service</Button>}
      />

      {/* Maintenance Timeline Service Cards List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full py-8 text-center text-brand-neutral-dark/60 font-sans text-sm">Loading maintenance logs...</div>
        ) : maintenanceLogs.length === 0 ? (
          <div className="col-span-full py-8 text-center text-brand-neutral-dark/60 font-sans text-sm">No maintenance logs found.</div>
        ) : (
          maintenanceLogs.map((log) => (
            <Card key={log.id} className="hover:border-brand-primary dark:hover:border-slate-800 transition-colors flex flex-col justify-between">
              <div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant={log.status === 'completed' ? 'success' : log.status === 'in_progress' ? 'warning' : 'neutral'}>
                      {log.status ? log.status.replace(/_/g, ' ') : 'Unknown'}
                    </Badge>
                    <span className="text-[10px] text-brand-neutral-dark/50 font-bold font-sans">{formatDate(log.date)}</span>
                  </div>
                  <CardTitle className="mt-2.5 text-sm">{log.vehicle ? `${log.vehicle.make} ${log.vehicle.model} (${log.vehicle.registration_number})` : 'N/A'}</CardTitle>
                </CardHeader>
                <CardContent className="font-sans text-xs flex flex-col gap-4">
                  <p className="text-brand-neutral-dark/80 min-h-9 leading-relaxed">{log.description}</p>
                  <div className="flex items-center justify-between border-t border-brand-border/40 pt-3 text-[10px]">
                    <span className="text-brand-neutral-dark/50 font-bold uppercase tracking-wider">Maintenance Cost</span>
                    <span className="font-bold text-brand-primary text-sm">₹{Number(log.cost).toLocaleString('en-IN')}</span>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Service Logging Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Log Vehicle Service"
        footer={
          <div className="flex w-full items-center justify-between gap-3">
            <Button variant="outline" size="sm" onClick={handleFillDemoService}>
              Add Demo Service
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button size="sm" onClick={() => setIsOpen(false)}>Save Log</Button>
            </div>
          </div>
        }
      >
        <div className="flex flex-col gap-4 font-sans">
          <div className="flex flex-col gap-1.5 w-full font-sans">
            <label className="text-xs font-semibold text-brand-neutral-dark/80 dark:text-slate-300">Vehicle</label>
            <select
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
              className="w-full px-3.5 py-2.25 border border-brand-border/80 rounded-xl text-sm bg-white dark:bg-slate-950 text-brand-primary dark:text-white transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-white focus:border-transparent"
            >
              <option value="">Select from available vehicles</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.make} {vehicle.model} ({vehicle.registration_number})
                </option>
              ))}
            </select>
          </div>
          <Input
            label="Description of Service"
            placeholder="e.g. Engine oil replacement"
            value={serviceDescription}
            onChange={(e) => setServiceDescription(e.target.value)}
            list="service-options"
          />
          <datalist id="service-options">
            <option value="Engine oil replacement" />
            <option value="Routine checkup" />
            <option value="Tire replacement" />
            <option value="Brake pad replacement" />
            <option value="Battery replacement" />
            <option value="Coolant flush" />
          </datalist>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Service Date"
              type="date"
              value={serviceDate}
              onChange={(e) => setServiceDate(e.target.value)}
            />
            <Input
              label="Service Cost (₹)"
              type="number"
              placeholder="e.g. 150"
              value={serviceCost}
              onChange={(e) => setServiceCost(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
