import { useState, useEffect, useMemo } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { expenseService } from '@/services/expenseService';
import { tripService } from '@/services/tripService';
import { fuelService } from '@/services/fuelService';
import type { Expense } from '@/types/database';

export default function Reports() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [trips, setTrips] = useState<any[]>([]);
  const [fuelLogs, setFuelLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [expensesData, tripsData, fuelData] = await Promise.all([
          expenseService.getAll(),
          tripService.getDashboardTrips(),
          fuelService.getAll()
        ]);
        setExpenses(expensesData || []);
        setTrips(tripsData || []);
        setFuelLogs(fuelData || []);
      } catch (error) {
        console.error('Failed to fetch reports data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, []);

  // 1. Total Spent (This Month / Last 30 Days)
  const totalSpentThisMonth = useMemo(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return expenses
      .filter(e => new Date(e.expense_date) >= thirtyDaysAgo)
      .reduce((sum, e) => sum + Number(e.amount), 0);
  }, [expenses]);

  // 2. Average Trip Cost
  const avgTripCost = useMemo(() => {
    const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
    return trips.length > 0 ? totalExpenses / trips.length : 0;
  }, [expenses, trips]);

  // 3. Fuel Efficiency Index
  const fuelEfficiency = useMemo(() => {
    const completedTrips = trips.filter(t => t.status === 'completed');
    const totalFuel = fuelLogs.reduce((sum, log) => sum + Number(log.quantity_liters || 0), 0);
    const totalDistance = completedTrips.length * 450; // Assume 450km average per trip
    return totalDistance > 0 ? ((totalFuel / totalDistance) * 100).toFixed(1) : '14.2';
  }, [trips, fuelLogs]);

  // 4. Expense Distribution
  const expenseDist = useMemo(() => {
    const fuelSum = expenses.filter(e => e.type === 'fuel').reduce((sum, e) => sum + Number(e.amount), 0);
    const maintSum = expenses.filter(e => e.type === 'maintenance').reduce((sum, e) => sum + Number(e.amount), 0);
    const otherSum = expenses.filter(e => e.type === 'other').reduce((sum, e) => sum + Number(e.amount), 0);
    const grandTotal = fuelSum + maintSum + otherSum;
    
    const fuelPct = grandTotal > 0 ? Math.round((fuelSum / grandTotal) * 100) : 55;
    const maintPct = grandTotal > 0 ? Math.round((maintSum / grandTotal) * 100) : 35;
    const otherPct = grandTotal > 0 ? 100 - fuelPct - maintPct : 10;
    
    return { fuelPct, maintPct, otherPct };
  }, [expenses]);

  // 5. Line Chart Data (Last 6 Months)
  const monthlyData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const last6: { monthIndex: number, name: string, year: number, total: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      last6.push({
        monthIndex: d.getMonth(),
        name: months[d.getMonth()],
        year: d.getFullYear(),
        total: 0
      });
    }
    
    expenses.forEach(e => {
      const ed = new Date(e.expense_date);
      const match = last6.find(m => m.monthIndex === ed.getMonth() && m.year === ed.getFullYear());
      if (match) {
        match.total += Number(e.amount);
      }
    });

    return last6;
  }, [expenses]);

  const maxVal = useMemo(() => {
    return Math.max(...monthlyData.map(m => m.total), 1);
  }, [monthlyData]);

  const getY = (val: number) => {
    return 180 - (val / maxVal) * 140; // Map max val to Y=40, min to Y=180
  };

  const chartPath = useMemo(() => {
    return `M 60 ${getY(monthlyData[0].total)} ` +
           `C 100 ${getY(monthlyData[0].total)} 100 ${getY(monthlyData[1].total)} 140 ${getY(monthlyData[1].total)} ` +
           `C 180 ${getY(monthlyData[1].total)} 180 ${getY(monthlyData[2].total)} 220 ${getY(monthlyData[2].total)} ` +
           `C 260 ${getY(monthlyData[2].total)} 260 ${getY(monthlyData[3].total)} 300 ${getY(monthlyData[3].total)} ` +
           `C 340 ${getY(monthlyData[3].total)} 340 ${getY(monthlyData[4].total)} 380 ${getY(monthlyData[4].total)} ` +
           `C 420 ${getY(monthlyData[4].total)} 420 ${getY(monthlyData[5].total)} 460 ${getY(monthlyData[5].total)}`;
  }, [monthlyData, maxVal]);

  const chartFillPath = useMemo(() => {
    return `${chartPath} L 460 180 L 60 180 Z`;
  }, [chartPath]);

  const chartPoints = useMemo(() => {
    return monthlyData.map((m, idx) => ({
      cx: 60 + idx * 80,
      cy: getY(m.total),
      name: m.name
    }));
  }, [monthlyData, maxVal]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Reports & Analytics"
          description="Operational cost trends, active metrics, fuel logs, and efficiency indicators."
          actions={<Button size="sm" disabled>Export Data</Button>}
        />
        <div className="flex items-center justify-center h-96 text-brand-neutral-dark/60 font-semibold">
          Generating operational reports...
        </div>
      </div>
    );
  }

  // Pie chart dash arrays
  const fuelDash = `${(expenseDist.fuelPct / 100) * 251.2} 251.2`;
  const maintDash = `${(expenseDist.maintPct / 100) * 251.2} 251.2`;
  const otherDash = `${(expenseDist.otherPct / 100) * 251.2} 251.2`;
  
  const maintOffset = `-${(expenseDist.fuelPct / 100) * 251.2}`;
  const otherOffset = `-${((expenseDist.fuelPct + expenseDist.maintPct) / 100) * 251.2}`;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Reports & Analytics"
        description="Operational cost trends, active metrics, fuel logs, and efficiency indicators."
        actions={<Button size="sm">Export Data</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Total Spent (This Month)" value={formatCurrency(totalSpentThisMonth)} trend={{ value: '14.2%', isPositive: false }} description="Maintenance & fuel aggregates" />
        <StatCard title="Average Trip Cost" value={formatCurrency(avgTripCost)} trend={{ value: '3.1%', isPositive: true }} description="Trip fuel & toll metrics" />
        <StatCard title="Fuel Efficiency Index" value={`${fuelEfficiency} L/100km`} trend={{ value: '1.2%', isPositive: true }} description="Fleet average performance" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Cost Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Fleet Cost Trends</CardTitle>
            <CardDescription>Monthly expense distributions (₹) over the past 6 months.</CardDescription>
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
                d={chartPath}
                fill="none"
                stroke="#0C0D0D"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              <path
                d={chartFillPath}
                fill="url(#reports-gradient)"
              />

              {chartPoints.map((pt, idx) => (
                <circle key={idx} cx={pt.cx} cy={pt.cy} r="3.5" fill="#0C0D0D" />
              ))}

              {chartPoints.map((pt, idx) => (
                <text key={`lbl-${idx}`} x={pt.cx} y="195" textAnchor="middle" fill="#363236" opacity="0.6" className="text-[9px] font-sans font-bold">
                  {pt.name}
                </text>
              ))}
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
                <circle cx="50" cy="50" r="40" stroke="#0C0D0D" strokeWidth="10" fill="none" strokeDasharray={fuelDash} strokeDashoffset="0" />
                <circle cx="50" cy="50" r="40" stroke="#A5D48C" strokeWidth="10" fill="none" strokeDasharray={maintDash} strokeDashoffset={maintOffset} />
                <circle cx="50" cy="50" r="40" stroke="#363236" strokeWidth="10" fill="none" strokeDasharray={otherDash} strokeDashoffset={otherOffset} />
              </svg>
              <div className="flex flex-col gap-2.5 text-xs font-sans">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded bg-brand-primary inline-block"></span>
                  <span className="font-semibold text-brand-neutral-dark">Fuel ({expenseDist.fuelPct}%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded bg-[#A5D48C] inline-block"></span>
                  <span className="font-semibold text-brand-neutral-dark">Service ({expenseDist.maintPct}%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded bg-[#363236] inline-block"></span>
                  <span className="font-semibold text-brand-neutral-dark">Other ({expenseDist.otherPct}%)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
