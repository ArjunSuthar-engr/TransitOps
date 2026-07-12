import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function Reports() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Reports & Analytics"
        description="Operational cost trends, active metrics, fuel logs, and efficiency indicators."
        actions={<Button size="sm">Export Data</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Total Spent (This Month)" value="$12,450.00" trend={{ value: '14.2%', isPositive: false }} description="Maintenance & fuel aggregates" />
        <StatCard title="Average Trip Cost" value="$85.20" trend={{ value: '3.1%', isPositive: true }} description="Trip fuel & toll metrics" />
        <StatCard title="Fuel Efficiency Index" value="14.2 L/100km" trend={{ value: '1.2%', isPositive: true }} description="Fleet average performance" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Cost Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Fleet Cost Trends</CardTitle>
            <CardDescription>Monthly expense distributions ($) over the past 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6 h-64">
            <svg className="w-full h-full max-h-44" viewBox="0 0 500 200" fill="none">
              <line x1="40" y1="30" x2="480" y2="30" stroke="#E5E7EB" strokeWidth="1" opacity="0.4" />
              <line x1="40" y1="80" x2="480" y2="80" stroke="#E5E7EB" strokeWidth="1" opacity="0.4" />
              <line x1="40" y1="130" x2="480" y2="130" stroke="#E5E7EB" strokeWidth="1" opacity="0.4" />
              <line x1="40" y1="180" x2="480" y2="180" stroke="#E5E7EB" strokeWidth="1.5" />

              <defs>
                <linearGradient id="reports-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0C0D0D" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#0C0D0D" stopOpacity="0" />
                </linearGradient>
              </defs>

              <path
                d="M 60 150 Q 140 100 220 120 T 380 50 T 460 70"
                fill="none"
                stroke="#0C0D0D"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              <path
                d="M 60 150 Q 140 100 220 120 T 380 50 T 460 70 L 460 180 L 60 180 Z"
                fill="url(#reports-gradient)"
              />

              <circle cx="60" cy="150" r="3" fill="#0C0D0D" />
              <circle cx="140" cy="100" r="3" fill="#0C0D0D" />
              <circle cx="220" cy="120" r="3" fill="#0C0D0D" />
              <circle cx="380" cy="50" r="3" fill="#0C0D0D" />
              <circle cx="460" cy="70" r="3" fill="#0C0D0D" />

              <text x="60" y="195" textAnchor="middle" fill="#363236" opacity="0.6" className="text-[9px] font-sans font-bold">Jan</text>
              <text x="140" y="195" textAnchor="middle" fill="#363236" opacity="0.6" className="text-[9px] font-sans font-bold">Feb</text>
              <text x="220" y="195" textAnchor="middle" fill="#363236" opacity="0.6" className="text-[9px] font-sans font-bold">Mar</text>
              <text x="300" y="195" textAnchor="middle" fill="#363236" opacity="0.6" className="text-[9px] font-sans font-bold">Apr</text>
              <text x="380" y="195" textAnchor="middle" fill="#363236" opacity="0.6" className="text-[9px] font-sans font-bold">May</text>
              <text x="460" y="195" textAnchor="middle" fill="#363236" opacity="0.6" className="text-[9px] font-sans font-bold">Jun</text>
            </svg>
          </CardContent>
        </Card>

        {/* Expenses Share Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Distribution</CardTitle>
            <CardDescription>Relative distribution (%) of fleet operational costs.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6 h-64">
            <div className="flex items-center gap-8 w-full max-w-xs justify-center">
              <svg className="w-28 h-28" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#E5E7EB" strokeWidth="10" fill="none" />
                <circle cx="50" cy="50" r="40" stroke="#0C0D0D" strokeWidth="10" fill="none" strokeDasharray="138 251" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="40" stroke="#A5D48C" strokeWidth="10" fill="none" strokeDasharray="88 251" strokeDashoffset="-138" />
                <circle cx="50" cy="50" r="40" stroke="#363236" strokeWidth="10" fill="none" strokeDasharray="25 251" strokeDashoffset="-226" />
              </svg>
              <div className="flex flex-col gap-2.5 text-xs font-sans">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded bg-brand-primary inline-block"></span>
                  <span className="font-semibold text-brand-neutral-dark">Fuel (55%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded bg-[#A5D48C] inline-block"></span>
                  <span className="font-semibold text-brand-neutral-dark">Service (35%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded bg-[#363236] inline-block"></span>
                  <span className="font-semibold text-brand-neutral-dark">Other (10%)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
