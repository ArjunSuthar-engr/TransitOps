import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { tripService } from '@/services/tripService';

export default function Trips() {
  const [trips, setTrips] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (trip.start_location && trip.start_location.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (trip.end_location && trip.end_location.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (trip.driver && `${trip.driver.first_name} ${trip.driver.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (trip.vehicle && `${trip.vehicle.make} ${trip.vehicle.model} ${trip.vehicle.registration_number}`.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === '' || trip.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await tripService.getDashboardTrips();
        setTrips(data || []);
      } catch (error) {
        console.error('Failed to fetch trips:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Trips"
        description="Monitor active vehicle runs, route schedules, and driver assignments."
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
            placeholder="Search Trip ID or Destination..."
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
            <option value="">All Dispatch Statuses</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="scheduled">Scheduled</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Grid Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Trip ID</TableHeaderCell>
            <TableHeaderCell>Vehicle</TableHeaderCell>
            <TableHeaderCell>Driver</TableHeaderCell>
            <TableHeaderCell>Route</TableHeaderCell>
            <TableHeaderCell>Scheduled Start</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-brand-neutral-dark/60">Loading trips...</TableCell>
            </TableRow>
          ) : filteredTrips.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-brand-neutral-dark/60">No trips found.</TableCell>
            </TableRow>
          ) : (
            filteredTrips.map((trip) => (
              <TableRow key={trip.id}>
                <TableCell className="font-semibold text-brand-primary dark:text-white" title={trip.id}>{trip.id.split('-')[0].toUpperCase()}</TableCell>
                <TableCell>{trip.vehicle ? `${trip.vehicle.make} ${trip.vehicle.model} (${trip.vehicle.registration_number})` : 'N/A'}</TableCell>
                <TableCell>{trip.driver ? `${trip.driver.first_name} ${trip.driver.last_name}` : 'N/A'}</TableCell>
                <TableCell>{trip.start_location} → {trip.end_location}</TableCell>
                <TableCell>{formatDate(trip.start_time)}</TableCell>
                <TableCell>
                  <Badge variant={trip.status === 'completed' ? 'success' : trip.status === 'in_progress' ? 'info' : trip.status === 'scheduled' ? 'neutral' : 'danger'}>
                    {trip.status ? trip.status.replace(/_/g, ' ') : 'Unknown'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
