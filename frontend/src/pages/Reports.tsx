
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
        <StatCard title="Total Spent (This Month)" value="$1,245.00" trend={{ value: '14.2%', isPositive: false }} description="Maintenance & fuel aggregates" />
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
              <line x1="40" y1="30" x2="480" y2="30" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-900" />
              <line x1="40" y1="80" x2="480" y2="80" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-900" />
              <line x1="40" y1="130" x2="480" y2="130" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-900" />
              <line x1="40" y1="180" x2="480" y2="180" stroke="#f1f5f9" strokeWidth="2" className="dark:stroke-slate-900" />

              <defs>
                <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0f172a" stopOpacity="0.15" className="dark:stop-color-white" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <path
                d="M 60 150 Q 140 100 220 120 T 380 50 T 460 70"
                fill="none"
                stroke="#0f172a"
                strokeWidth="3"
                strokeLinecap="round"
                className="dark:stroke-white"
              />

              <path
                d="M 60 150 Q 140 100 220 120 T 380 50 T 460 70 L 460 180 L 60 180 Z"
                fill="url(#chart-gradient)"
              />

              <circle cx="60" cy="150" r="3.5" fill="#0f172a" className="dark:fill-white" />
              <circle cx="140" cy="100" r="3.5" fill="#0f172a" className="dark:fill-white" />
              <circle cx="220" cy="120" r="3.5" fill="#0f172a" className="dark:fill-white" />
              <circle cx="380" cy="50" r="3.5" fill="#0f172a" className="dark:fill-white" />
              <circle cx="460" cy="70" r="3.5" fill="#0f172a" className="dark:fill-white" />

              <text x="60" y="195" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-medium">Jan</text>
              <text x="140" y="195" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-medium">Feb</text>
              <text x="220" y="195" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-medium">Mar</text>
              <text x="300" y="195" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-medium">Apr</text>
              <text x="380" y="195" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-medium">May</text>
              <text x="460" y="195" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-medium">Jun</text>
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
                <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="10" fill="none" className="dark:stroke-slate-900" />
                <circle cx="50" cy="50" r="40" stroke="#0f172a" strokeWidth="10" fill="none" strokeDasharray="138 251" strokeDashoffset="0" className="dark:stroke-white" />
                <circle cx="50" cy="50" r="40" stroke="#64748b" strokeWidth="10" fill="none" strokeDasharray="88 251" strokeDashoffset="-138" className="dark:stroke-slate-400" />
                <circle cx="50" cy="50" r="40" stroke="#cbd5e1" strokeWidth="10" fill="none" strokeDasharray="25 251" strokeDashoffset="-226" className="dark:stroke-slate-600" />
              </svg>
              <div className="flex flex-col gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded bg-slate-900 dark:bg-white inline-block"></span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Fuel (55%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded bg-slate-500 dark:bg-slate-400 inline-block"></span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Service (35%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded bg-slate-300 dark:bg-slate-600 inline-block"></span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Other (10%)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
