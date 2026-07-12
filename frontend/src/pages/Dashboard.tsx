
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function Dashboard() {
  const stats = [
    { title: 'Active Fleet', value: '42 / 48', trend: { value: '8.4%', isPositive: true }, description: 'Vehicles currently on route' },
    { title: 'Drivers On Duty', value: '38', trend: { value: '12.0%', isPositive: true }, description: 'Available & assigned operators' },
    { title: 'Pending Trips', value: '5', trend: { value: '2.5%', isPositive: false }, description: 'Awaiting operator dispatch' },
    { title: 'Active Service Logs', value: '3', trend: { value: '1', isPositive: false }, description: 'Vehicles in maintenance' }
  ];

  const recentTrips = [
    { id: 'TRP-1042', vehicle: 'Ford Transit #04', driver: 'Marcus Vance', destination: 'North Station', status: 'in_progress' },
    { id: 'TRP-1041', vehicle: 'Volvo Coach #12', driver: 'Sarah Connor', destination: 'South Station', status: 'completed' },
    { id: 'TRP-1040', vehicle: 'Mercedes Benz Sprinter #08', driver: 'Elena Rostova', destination: 'City Center', status: 'scheduled' }
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Dashboard"
        description="Operational dashboard monitoring fleet activity, driver status, and logs."
        actions={<Button size="sm">Create Trip</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            trend={stat.trend}
            description={stat.description}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Trips</CardTitle>
            <CardDescription>A live summary of recently dispatched vehicle trips.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Trip ID</TableHeaderCell>
                  <TableHeaderCell>Vehicle</TableHeaderCell>
                  <TableHeaderCell>Driver</TableHeaderCell>
                  <TableHeaderCell>Destination</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTrips.map((trip) => (
                  <TableRow key={trip.id}>
                    <TableCell className="font-medium text-slate-900 dark:text-white">{trip.id}</TableCell>
                    <TableCell>{trip.vehicle}</TableCell>
                    <TableCell>{trip.driver}</TableCell>
                    <TableCell>{trip.destination}</TableCell>
                    <TableCell>
                      <Badge variant={trip.status === 'completed' ? 'success' : trip.status === 'in_progress' ? 'info' : 'neutral'}>
                        {trip.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Notifications</CardTitle>
            <CardDescription>Real-time vehicle and operational alerts.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-start gap-3 p-3 border border-red-50 bg-red-50/20 dark:border-red-950/20 dark:bg-red-950/5 rounded-lg text-xs">
              <span className="text-red-550 dark:text-red-400 mt-0.5">⚠️</span>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Service Overdue</p>
                <p className="text-slate-500 dark:text-slate-405 mt-0.5">Ford Transit #04 exceeded mileage limit for maintenance.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 border border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/20 rounded-lg text-xs">
              <span className="text-slate-500 dark:text-slate-400 mt-0.5">ℹ️</span>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Driver Assigned</p>
                <p className="text-slate-500 dark:text-slate-405 mt-0.5">Sarah Connor checked in and is on standby duty.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
