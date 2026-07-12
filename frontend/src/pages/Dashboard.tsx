import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Vehicles',
      value: '48',
      trend: { value: '4 new', isPositive: true },
      description: 'Total active fleet size'
    },
    {
      title: 'Active Drivers',
      value: '38',
      trend: { value: '12% active', isPositive: true },
      description: 'On-duty shift operators'
    },
    {
      title: 'Active Trips',
      value: '12',
      trend: { value: '8 dispatch', isPositive: true },
      description: 'Trips currently on route'
    },
    {
      title: 'Vehicles in Maintenance',
      value: '3',
      trend: { value: '1 resolve', isPositive: true },
      description: 'Active workshop service logs'
    },
    {
      title: 'Fuel Cost (This Month)',
      value: '$4,280',
      trend: { value: '5.2% decrease', isPositive: true },
      description: 'Total refuel expense logs'
    },
    {
      title: 'Monthly Expenses',
      value: '$12,450',
      trend: { value: '8.4% increase', isPositive: false },
      description: 'Combined fleet expenditures'
    }
  ];

  const quickActions = [
    {
      title: 'Dispatch Trip',
      description: 'Assign a driver and vehicle to route',
      icon: (
        <svg className="h-5 w-5 text-slate-650 dark:text-slate-450" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      )
    },
    {
      title: 'Add Vehicle',
      description: 'Register specifications and number',
      icon: (
        <svg className="h-5 w-5 text-slate-650 dark:text-slate-450" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Register Driver',
      description: 'Onboard a new operator and license',
      icon: (
        <svg className="h-5 w-5 text-slate-650 dark:text-slate-450" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Schedule Maintenance',
      description: 'Log inspection or service records',
      icon: (
        <svg className="h-5 w-5 text-slate-650 dark:text-slate-450" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        </svg>
      )
    }
  ];

  const recentTrips = [
    { id: 'TRP-1042', driver: 'Marcus Vance', vehicle: 'Ford Transit #04', status: 'in_progress', destination: 'North Station' },
    { id: 'TRP-1041', driver: 'Sarah Connor', vehicle: 'Volvo Coach #12', status: 'completed', destination: 'South Station' },
    { id: 'TRP-1040', driver: 'Elena Rostova', vehicle: 'Mercedes Benz Sprinter #08', status: 'scheduled', destination: 'City Center' },
    { id: 'TRP-1039', driver: 'James Carter', vehicle: 'Chevrolet Express #15', status: 'completed', destination: 'Airport Terminal 2' }
  ];

  const maintenanceAlerts = [
    { vehicle: 'Ford Transit (TX-402-A)', issue: 'Brake pads check - 500km overdue', urgency: 'high' },
    { vehicle: 'Volvo Coach (TX-901-B)', issue: 'Transmission fluid service due in 100km', urgency: 'medium' },
    { vehicle: 'Mercedes Benz (TX-112-C)', issue: 'Scheduled emissions test registration', urgency: 'low' }
  ];

  const recentActivity = [
    { time: '10 mins ago', title: 'Trip TRP-1042 Dispatched', desc: 'Marcus Vance departed on Ford Transit #04 to North Station.' },
    { time: '1 hour ago', title: 'Maintenance Log Logged', desc: 'Mercedes Benz Sprinter #08 brake service logged by workshop.' },
    { time: '3 hours ago', title: 'Refuel Log Completed', desc: 'Volvo Coach #12 refueled with 180 Liters ($270.00).' },
    { time: 'Yesterday', title: 'New Driver Onboarded', desc: 'James Carter registered under license DL-55204D.' }
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Header */}
      <PageHeader
        title="Fleet Operations Overview 👋"
        description="Here is the live operational summary for the TransitOps fleet today."
        actions={
          <div className="flex gap-2.5">
            <Button variant="outline" size="sm">Export Report</Button>
            <Button size="sm">Create Trip</Button>
          </div>
        }
      />

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
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

      {/* Quick Actions Grid */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Card
              key={action.title}
              className="group hover:border-slate-350 dark:hover:border-slate-800 transition-colors cursor-pointer"
            >
              <CardContent className="p-4 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 transition-colors group-hover:bg-slate-100/50 dark:group-hover:bg-slate-850">
                  {action.icon}
                </div>
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-xs font-semibold text-slate-900 dark:text-white">{action.title}</h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{action.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Primary Panels split layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Trips Table Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Trips</CardTitle>
            <CardDescription>A summary of current and recently completed dispatches.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Trip ID</TableHeaderCell>
                  <TableHeaderCell>Driver</TableHeaderCell>
                  <TableHeaderCell>Vehicle</TableHeaderCell>
                  <TableHeaderCell>Destination</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTrips.map((trip) => (
                  <TableRow key={trip.id}>
                    <TableCell className="font-semibold text-slate-900 dark:text-white">{trip.id}</TableCell>
                    <TableCell>{trip.driver}</TableCell>
                    <TableCell>{trip.vehicle}</TableCell>
                    <TableCell>{trip.destination}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          trip.status === 'completed'
                            ? 'success'
                            : trip.status === 'in_progress'
                            ? 'info'
                            : 'neutral'
                        }
                      >
                        {trip.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Right side panels: Fleet Status and Fuel Overview */}
        <div className="flex flex-col gap-6">
          {/* Fleet Status Card */}
          <Card>
            <CardHeader>
              <CardTitle>Fleet Status Split</CardTitle>
              <CardDescription>Overall fleet status allocations across all vehicles.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-350">On Trip</span>
                  <span className="text-slate-900 dark:text-white">33 Vehicles (70%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-slate-900 dark:bg-white h-full w-[70%]" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-350">Available</span>
                  <span className="text-slate-900 dark:text-white">12 Vehicles (25%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-550 dark:bg-emerald-500 h-full w-[25%]" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-350">Maintenance</span>
                  <span className="text-slate-900 dark:text-white">3 Vehicles (5%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-550 dark:bg-amber-500 h-full w-[5%]" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fuel Overview SVG Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Fuel Consumption Overview</CardTitle>
              <CardDescription>Weekly fuel usage trends (Liters) over the past 4 weeks.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-4">
              <svg className="w-full h-24" viewBox="0 0 300 100" fill="none">
                <defs>
                  <linearGradient id="line-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0f172a" stopOpacity="0.1" className="dark:stop-color-white" />
                    <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 10 80 Q 80 40 150 60 T 290 20"
                  fill="none"
                  stroke="#0f172a"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="dark:stroke-white"
                />
                <path
                  d="M 10 80 Q 80 40 150 60 T 290 20 L 290 100 L 10 100 Z"
                  fill="url(#line-gradient)"
                />
                <circle cx="10" cy="80" r="3" fill="#0f172a" className="dark:fill-white" />
                <circle cx="80" cy="45" r="3" fill="#0f172a" className="dark:fill-white" />
                <circle cx="150" cy="60" r="3" fill="#0f172a" className="dark:fill-white" />
                <circle cx="290" cy="20" r="3" fill="#0f172a" className="dark:fill-white" />
                
                <text x="10" y="95" textAnchor="middle" fill="#94a3b8" className="text-[8px] font-medium">W1</text>
                <text x="80" y="95" textAnchor="middle" fill="#94a3b8" className="text-[8px] font-medium">W2</text>
                <text x="150" y="95" textAnchor="middle" fill="#94a3b8" className="text-[8px] font-medium">W3</text>
                <text x="290" y="95" textAnchor="middle" fill="#94a3b8" className="text-[8px] font-medium">W4</text>
              </svg>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Secondary split layout */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Maintenance Alerts Card */}
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Alerts</CardTitle>
            <CardDescription>Vehicles requiring immediate service or scheduled checkups.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {maintenanceAlerts.map((alert, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3.5 border rounded-lg text-xs border-slate-100 bg-slate-50/20 dark:border-slate-900 dark:bg-slate-950/20"
              >
                <span
                  className={`mt-1 inline-block h-2 w-2 rounded-full ${
                    alert.urgency === 'high'
                      ? 'bg-red-500'
                      : alert.urgency === 'medium'
                      ? 'bg-amber-500'
                      : 'bg-blue-500'
                  }`}
                />
                <div className="flex flex-col gap-0.5">
                  <p className="font-semibold text-slate-900 dark:text-white">{alert.vehicle}</p>
                  <p className="text-slate-500 dark:text-slate-400">{alert.issue}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity Timeline Card */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Live timeline log of fleet dispatching and maintenance.</CardDescription>
          </CardHeader>
          <CardContent className="p-5.5">
            <div className="relative border-l border-slate-150 dark:border-slate-800 pl-4 flex flex-col gap-5 text-xs">
              {recentActivity.map((activity, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-[21px] top-1 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-slate-900 dark:bg-white ring-4 ring-white dark:ring-slate-950" />
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-slate-900 dark:text-white">{activity.title}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{activity.time}</span>
                  </div>
                  <p className="text-slate-550 dark:text-slate-450 mt-0.5 leading-relaxed">{activity.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
