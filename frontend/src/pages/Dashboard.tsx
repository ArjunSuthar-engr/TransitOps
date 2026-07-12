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
      description: 'Active fleet registered'
    },
    {
      title: 'Active Drivers',
      value: '38',
      trend: { value: '12% active', isPositive: true },
      description: 'On-duty operators'
    },
    {
      title: 'Active Trips',
      value: '12',
      trend: { value: '8 dispatch', isPositive: true },
      description: 'Trips on route'
    },
    {
      title: 'In Maintenance',
      value: '3',
      trend: { value: '1 resolved', isPositive: true },
      description: 'Workshop service logs'
    },
    {
      title: 'Fuel Cost (Month)',
      value: '$4,280',
      trend: { value: '5.2% down', isPositive: true },
      description: 'Total refueling cost'
    },
    {
      title: 'Monthly Expenses',
      value: '$12,450',
      trend: { value: '8.4% up', isPositive: false },
      description: 'Combined fleet spend'
    }
  ];

  const quickActions = [
    {
      title: 'Dispatch Trip',
      description: 'Assign driver and vehicle to route',
      icon: (
        <svg className="h-4.5 w-4.5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      )
    },
    {
      title: 'Add Vehicle',
      description: 'Register specifications and number',
      icon: (
        <svg className="h-4.5 w-4.5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Register Driver',
      description: 'Onboard new operator and license',
      icon: (
        <svg className="h-4.5 w-4.5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Schedule Maintenance',
      description: 'Log inspection or service records',
      icon: (
        <svg className="h-4.5 w-4.5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Export Data</Button>
            <Button size="sm">New Trip</Button>
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
        <h2 className="text-[10px] font-bold uppercase tracking-wider text-brand-neutral-dark/50 dark:text-slate-400">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Card
              key={action.title}
              className="group hover:border-brand-primary dark:hover:border-slate-800 transition-all cursor-pointer hover:shadow-md"
            >
              <CardContent className="p-4 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-brand-surface dark:bg-slate-900 border border-brand-border/60 dark:border-slate-800 transition-colors group-hover:bg-brand-primary group-hover:text-white group-hover:border-transparent text-brand-primary flex items-center justify-center">
                  {action.icon}
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <h3 className="text-xs font-semibold text-brand-primary dark:text-white truncate">{action.title}</h3>
                  <p className="text-[10px] text-brand-neutral-dark/60 dark:text-slate-400 leading-tight">{action.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Map Section: Live Fleet Tracking Placeholder */}
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Live Fleet Tracking</CardTitle>
              <CardDescription>Real-time vehicle position and dispatch path telemetries.</CardDescription>
            </div>
            <div className="flex gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-sans font-medium px-2.5 py-0.5 rounded-full border bg-emerald-500/10 text-slate-800 border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Sync Active
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 relative h-[360px] bg-[#ECF4EE]/30 dark:bg-slate-900/60 overflow-hidden flex items-center justify-center">
          {/* Map Vector Mockup SVG */}
          <svg className="absolute inset-0 h-full w-full opacity-35 dark:opacity-10" fill="none" viewBox="0 0 800 400" preserveAspectRatio="none">
            {/* Grid grid lines */}
            <path d="M 0,50 L 800,50 M 0,100 L 800,100 M 0,150 L 800,150 M 0,200 L 800,200 M 0,250 L 800,250 M 0,300 L 800,300 M 0,350 L 800,350" stroke="#E5E7EB" strokeWidth="1" />
            <path d="M 100,0 L 100,400 M 200,0 L 200,400 M 300,0 L 300,400 M 400,0 L 400,400 M 500,0 L 500,400 M 600,0 L 600,400 M 700,0 L 700,400" stroke="#E5E7EB" strokeWidth="1" />
            
            {/* Streets/Roads */}
            <path d="M 50,200 C 150,150 250,250 350,200 S 550,100 650,200 S 750,300 800,280" stroke="#D1D5DB" strokeWidth="6" strokeLinecap="round" />
            <path d="M 150,0 C 200,100 120,200 300,250 S 500,220 520,400" stroke="#D1D5DB" strokeWidth="4" strokeLinecap="round" />
            <path d="M 0,80 Q 250,60 450,180 T 800,50" stroke="#D1D5DB" strokeWidth="3" strokeLinecap="round" />
            
            {/* Active route highlight */}
            <path d="M 150,0 C 200,100 120,200 300,250 S 500,220 520,400" stroke="#0C0D0D" strokeWidth="2.5" strokeDasharray="6,4" strokeLinecap="round" />
            
            {/* Map markers */}
            <circle cx="210" cy="180" r="5" fill="#A5D48C" stroke="#363236" strokeWidth="1.5" />
            <circle cx="480" cy="235" r="5" fill="#F7B558" stroke="#363236" strokeWidth="1.5" />
            <circle cx="610" cy="200" r="5" fill="#A5D48C" stroke="#363236" strokeWidth="1.5" />
          </svg>

          {/* Absolute telemetry info overlays (Stripe / Dispatch inspired) */}
          <div className="absolute top-4 left-4 max-w-sm w-[90%] sm:w-[280px]">
            <Card className="shadow-lg border-brand-border">
              <CardContent className="p-4 flex flex-col gap-3 font-sans">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-primary">AB-S1A22546</span>
                  <Badge variant="info">In Transit</Badge>
                </div>
                <div className="flex flex-col gap-1 text-[10px] text-brand-neutral-dark/80">
                  <div className="flex justify-between border-b border-brand-border/40 pb-1">
                    <span>Route</span>
                    <span className="font-semibold text-brand-primary">Newark → Brooklyn</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-border/40 pb-1">
                    <span>Cargo Weight</span>
                    <span className="font-semibold text-brand-primary">14.2 / 18t (80%)</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-border/40 pb-1">
                    <span>Battery Status</span>
                    <span className="font-semibold text-brand-primary">58% (320 km)</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span>Driver</span>
                    <span className="font-semibold text-brand-primary">Robert R.</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="absolute bottom-4 right-4 hidden sm:block">
            <div className="bg-brand-card/95 border border-brand-border/60 rounded-xl p-3 shadow-md max-w-xs text-[10px] font-sans text-brand-neutral-dark/70">
              <p className="font-semibold text-brand-primary">SDK Integration Layer</p>
              <p className="mt-0.5">Mapbox GL JS, Leaflet or Google Maps scripts inject seamlessly here using standard ref binds.</p>
            </div>
          </div>
        </CardContent>
      </Card>

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
                    <TableCell className="font-semibold text-brand-primary dark:text-white">{trip.id}</TableCell>
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
            <CardContent className="flex flex-col gap-4 font-sans">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-brand-neutral-dark/80">
                  <span>On Trip</span>
                  <span className="text-brand-primary">33 Vehicles (70%)</span>
                </div>
                <div className="w-full bg-brand-surface dark:bg-slate-900 h-2 rounded-full overflow-hidden border border-brand-border/40">
                  <div className="bg-brand-primary h-full w-[70%]" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-brand-neutral-dark/80">
                  <span>Available</span>
                  <span className="text-brand-primary">12 Vehicles (25%)</span>
                </div>
                <div className="w-full bg-brand-surface dark:bg-slate-900 h-2 rounded-full overflow-hidden border border-brand-border/40">
                  <div className="bg-[#A5D48C] h-full w-[25%]" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-brand-neutral-dark/80">
                  <span>Maintenance</span>
                  <span className="text-brand-primary">3 Vehicles (5%)</span>
                </div>
                <div className="w-full bg-brand-surface dark:bg-slate-900 h-2 rounded-full overflow-hidden border border-brand-border/40">
                  <div className="bg-[#F7B558] h-full w-[5%]" />
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
                    <stop offset="0%" stopColor="#ECF4EE" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#ECF4EE" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 10 80 Q 80 40 150 60 T 290 20"
                  fill="none"
                  stroke="#0C0D0D"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M 10 80 Q 80 40 150 60 T 290 20 L 290 100 L 10 100 Z"
                  fill="url(#line-gradient)"
                />
                <circle cx="10" cy="80" r="3" fill="#0C0D0D" />
                <circle cx="80" cy="45" r="3" fill="#0C0D0D" />
                <circle cx="150" cy="60" r="3" fill="#0C0D0D" />
                <circle cx="290" cy="20" r="3" fill="#0C0D0D" />
                
                <text x="10" y="95" textAnchor="middle" fill="#363236" opacity="0.6" className="text-[8px] font-sans font-bold">W1</text>
                <text x="80" y="95" textAnchor="middle" fill="#363236" opacity="0.6" className="text-[8px] font-sans font-bold">W2</text>
                <text x="150" y="95" textAnchor="middle" fill="#363236" opacity="0.6" className="text-[8px] font-sans font-bold">W3</text>
                <text x="290" y="95" textAnchor="middle" fill="#363236" opacity="0.6" className="text-[8px] font-sans font-bold">W4</text>
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
          <CardContent className="flex flex-col gap-3 font-sans">
            {maintenanceAlerts.map((alert, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3.5 border rounded-xl text-xs border-brand-border/60 bg-brand-surface/20"
              >
                <span
                  className={`mt-1 inline-block h-2 w-2 rounded-full ${
                    alert.urgency === 'high'
                      ? 'bg-red-500'
                      : alert.urgency === 'medium'
                      ? 'bg-[#F7B558]'
                      : 'bg-blue-500'
                  }`}
                />
                <div className="flex flex-col gap-0.5">
                  <p className="font-bold text-brand-primary">{alert.vehicle}</p>
                  <p className="text-brand-neutral-dark/70">{alert.issue}</p>
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
          <CardContent className="p-5.5 font-sans">
            <div className="relative border-l border-brand-border/80 pl-4 flex flex-col gap-5 text-xs">
              {recentActivity.map((activity, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-[20.5px] top-1 flex h-2 w-2 items-center justify-center rounded-full bg-brand-primary ring-4 ring-brand-card" />
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-brand-primary">{activity.title}</span>
                    <span className="text-[9px] text-brand-neutral-dark/50 font-bold uppercase">{activity.time}</span>
                  </div>
                  <p className="text-brand-neutral-dark/70 mt-0.5 leading-relaxed">{activity.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
