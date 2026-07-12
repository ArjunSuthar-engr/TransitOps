import { useEffect, useState, useMemo } from 'react';
import { tripService } from '@/services/tripService';
import { expenseService } from '@/services/expenseService';
import dayjs from 'dayjs';

type FilterType = 'all' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export default function Dashboard() {
  const [trips, setTrips] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrip, setSelectedTrip] = useState<any | null>(null);
  const [showStickySearch, setShowStickySearch] = useState(false);
  const [showStickyFilters, setShowStickyFilters] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const fetchedTrips = await tripService.getDashboardTrips();
        setTrips(fetchedTrips || []);
        const expensesData = await expenseService.getAll();
        setExpenses(expensesData || []);
        const total = (expensesData || []).reduce((acc, curr) => acc + Number(curr.amount), 0);
        setTotalExpenses(total);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();

    // Observer 1: Watch the hero search bar
    const observer1 = new IntersectionObserver(
      ([entry]) => {
        // Only trigger when scrolling past the top edge
        if (entry.boundingClientRect.top < 0) {
          setShowStickySearch(!entry.isIntersecting);
        } else {
          setShowStickySearch(false);
        }
      },
      { threshold: 0 }
    );
    
    // Observer 2: Watch the original filters
    const observer2 = new IntersectionObserver(
      ([entry]) => {
        if (entry.boundingClientRect.top < 0) {
          setShowStickyFilters(!entry.isIntersecting);
        } else {
          setShowStickyFilters(false);
        }
      },
      { threshold: 0 }
    );
    
    const searchSentinel = document.getElementById('search-sentinel');
    const filtersSentinel = document.getElementById('filters-sentinel');
    
    if (searchSentinel) observer1.observe(searchSentinel);
    if (filtersSentinel) observer2.observe(filtersSentinel);
    
    return () => {
      observer1.disconnect();
      observer2.disconnect();
    };
  }, []);

  // ── DYNAMIC DATA SHIFTING (HACKATHON MODE) ── //
  // Shift all dates forward so the most recent completed/in_progress trip happens today.
  const dateOffsetMs = useMemo(() => {
    if (!trips.length && !expenses.length) return 0;
    
    const activeTrips = trips.filter(t => t.status === 'completed' || t.status === 'in_progress');
    const tripPool = activeTrips.length > 0 ? activeTrips : trips;
    
    let maxDate = dayjs(0);
    if (tripPool.length > 0) {
      maxDate = tripPool.reduce((max, t) => {
        const d = dayjs(t.start_time || t.created_at);
        return d.isAfter(max) ? d : max;
      }, dayjs(0));
    } else if (expenses.length > 0) {
      maxDate = expenses.reduce((max, e) => {
        const d = dayjs(e.expense_date || e.created_at);
        return d.isAfter(max) ? d : max;
      }, dayjs(0));
    }
    
    return dayjs().diff(maxDate, 'millisecond');
  }, [trips, expenses]);

  const liveTrips = useMemo(() => {
    if (dateOffsetMs === 0) return trips;
    return trips.map(t => {
      const shifted = { ...t };
      if (shifted.start_time) shifted.start_time = dayjs(shifted.start_time).add(dateOffsetMs, 'ms').toISOString();
      if (shifted.end_time) shifted.end_time = dayjs(shifted.end_time).add(dateOffsetMs, 'ms').toISOString();
      if (shifted.created_at) shifted.created_at = dayjs(shifted.created_at).add(dateOffsetMs, 'ms').toISOString();
      return shifted;
    });
  }, [trips, dateOffsetMs]);

  const liveExpenses = useMemo(() => {
    if (dateOffsetMs === 0) return expenses;
    return expenses.map(e => {
      const shifted = { ...e };
      if (shifted.expense_date) shifted.expense_date = dayjs(shifted.expense_date).add(dateOffsetMs, 'ms').toISOString();
      if (shifted.created_at) shifted.created_at = dayjs(shifted.created_at).add(dateOffsetMs, 'ms').toISOString();
      return shifted;
    });
  }, [expenses, dateOffsetMs]);

  // ── DYNAMIC DATA CALCULATIONS ── //

  // Fulfillment Performance: 17 days (6 past, today, 10 future)
  const performanceData = useMemo(() => {
    if (!liveTrips.length) return Array(17).fill(5);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const counts = Array(17).fill(0);

    liveTrips.forEach(t => {
      if (!t.start_time) return;
      const d = new Date(t.start_time);
      d.setHours(0, 0, 0, 0);
      const diffDays = Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      const index = 6 + diffDays;
      if (index >= 0 && index < 17) {
        counts[index]++;
      }
    });

    const max = Math.max(...counts, 1);
    return counts.map(c => (c === 0 ? 5 : Math.max(10, Math.round((c / max) * 100))));
  }, [liveTrips]);

  // Expenses by Quarter and Category
  const expenseData = useMemo(() => {
    const data = {
      fuel: [0, 0, 0, 0],
      maintenance: [0, 0, 0, 0],
      other: [0, 0, 0, 0]
    };

    liveExpenses.forEach(e => {
      if (!e.amount || !e.type) return;
      const d = new Date(e.expense_date || e.created_at);
      const q = Math.floor(d.getMonth() / 3);
      if (e.type === 'fuel') data.fuel[q] += Number(e.amount);
      else if (e.type === 'maintenance') data.maintenance[q] += Number(e.amount);
      else data.other[q] += Number(e.amount);
    });

    const fuelTotal = data.fuel.reduce((a, b) => a + b, 0);
    const maintTotal = data.maintenance.reduce((a, b) => a + b, 0);
    const otherTotal = data.other.reduce((a, b) => a + b, 0);
    
    // Scale heights to maximum column height
    const maxTotal = Math.max(fuelTotal, maintTotal, otherTotal, 1);
    const toPct = (val: number) => Math.round((val / maxTotal) * 100);

    return {
      fuel: data.fuel.map(toPct),
      maintenance: data.maintenance.map(toPct),
      other: data.other.map(toPct)
    };
  }, [liveExpenses]);

  const filteredTrips = useMemo(() => {
    let list = liveTrips;
    if (activeFilter !== 'all') {
      list = list.filter(t => t.status === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(t =>
        (t.id && t.id.toLowerCase().includes(q)) ||
        (t.start_location && t.start_location.toLowerCase().includes(q)) ||
        (t.end_location && t.end_location.toLowerCase().includes(q)) ||
        (t.driver && `${t.driver.first_name} ${t.driver.last_name}`.toLowerCase().includes(q))
      );
    }
    return list;
  }, [liveTrips, activeFilter, searchQuery]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-orange-500';
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-50 text-green-700 border-green-200';
      case 'in_progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-orange-50 text-orange-700 border-orange-200';
    }
  };

  const getStatusLabel = (status: string) => {
    if (!status) return 'Unknown';
    return status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const FILTERS: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Scheduled', value: 'scheduled' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className="flex flex-col gap-8 w-full pb-10 font-sans relative">

      {/* ── UNIFIED FIXED STICKY HEADER ── */}
      <div 
        className={`fixed top-0 left-0 md:left-[260px] right-0 z-40 bg-white shadow-sm border-b border-brand-border/40 px-4 md:px-6 lg:px-8 py-3 flex items-center justify-between transition-transform duration-300 ease-in-out ${
          showStickySearch ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Left: Search Bar */}
        <div className="relative flex items-center w-full max-w-sm">
          <svg className="absolute left-3 h-4 w-4 text-brand-neutral-dark/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search orders, drivers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-brand-surface border border-brand-border/60 rounded-xl focus:outline-none text-sm placeholder:text-brand-neutral-dark/50 text-brand-primary"
          />
        </div>

        {/* Right: Filters (Appears later) */}
        <div 
          className={`flex items-center gap-2 overflow-x-auto transition-all duration-300 ease-in-out scrollbar-none ${
            showStickyFilters ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none absolute right-4 md:right-8'
          }`}
        >
          {FILTERS.map(f => (
            <button
              key={`sticky-${f.value}`}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-1.5 rounded-xl text-[12px] font-semibold shadow-sm whitespace-nowrap transition-colors ${
                activeFilter === f.value
                  ? 'bg-brand-primary text-white'
                  : 'bg-white border border-brand-border/60 text-brand-neutral-dark/80 hover:bg-brand-surface'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>


      {/* ── TOP HERO SECTION ── */}
      <div className="w-full rounded-[2rem] bg-[#F1F6F3] p-6 lg:p-8 relative shadow-sm border border-brand-border/30">

        {/* Search & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 relative">
          <div className="relative w-full sm:max-w-xs flex items-center">
            <svg className="absolute left-0 h-4.5 w-4.5 text-brand-neutral-dark/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search order..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-7 pr-4 py-1.5 bg-transparent focus:outline-none text-sm font-sans placeholder:text-brand-neutral-dark/50 text-brand-primary"
            />
          </div>
          {/* Sentinel 1: Track when hero search leaves view */}
          <div id="search-sentinel" className="absolute top-10 h-px w-full pointer-events-none" />

          <div className="flex items-center gap-3 sm:gap-5">
            <button className="flex items-center gap-2 text-[13px] font-semibold text-brand-primary hover:opacity-70 transition-opacity">
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Export
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white text-[13px] font-semibold rounded-[14px] hover:bg-brand-primary/90 transition-colors shadow-sm">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Add new shipment
            </button>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* LEFT: Fulfillment Performance */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-base font-sans font-medium text-brand-primary">Fulfillment Performance</h3>
              <div className="flex gap-2">
                <button className="h-9 w-9 flex items-center justify-center rounded-[10px] bg-white border border-brand-border/40 shadow-sm text-brand-primary hover:bg-brand-surface">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
                <button className="h-9 w-9 flex items-center justify-center rounded-[10px] bg-white border border-brand-border/40 shadow-sm text-brand-primary hover:bg-brand-surface">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="relative h-48 w-full flex items-end justify-between px-2">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
                <div className="w-full flex justify-end"><span className="text-[10px] text-brand-neutral-dark/40 font-semibold transform -translate-y-1/2">100%</span></div>
                <div className="w-full border-t border-brand-border/50 border-dashed flex justify-end"><span className="text-[10px] text-brand-neutral-dark/40 font-semibold transform -translate-y-1/2 bg-[#F1F6F3] pl-2">50%</span></div>
                <div className="w-full border-t border-brand-border/50 flex justify-end"><span className="text-[10px] text-brand-neutral-dark/40 font-semibold transform -translate-y-1/2 bg-[#F1F6F3] pl-2">0%</span></div>
              </div>
              {performanceData.map((h, i) => (
                <div key={i} className="relative flex flex-col items-center group w-4 h-full justify-end z-10">
                  {i === 6 && <span className="absolute -top-7 text-[11px] font-bold text-brand-primary whitespace-nowrap">Today</span>}
                  <div className={`w-full rounded-sm transition-all duration-700 ease-out ${i === 6 ? 'bg-brand-primary' : 'bg-gradient-to-t from-brand-border/10 to-brand-border/80'}`} style={{ height: `${h}%` }}>
                    {i !== 6 && <div className="h-0.5 w-full bg-brand-neutral-dark/60 rounded-t-sm" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Total Expenses */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-sans font-medium text-brand-primary">Total Expenses</h3>
              <div className="flex gap-2">
                <button className="h-9 w-9 flex items-center justify-center rounded-[10px] bg-white border border-brand-border/40 shadow-sm text-brand-primary hover:bg-brand-surface">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </button>
                <button className="h-9 w-9 flex items-center justify-center rounded-[10px] bg-white border border-brand-border/40 shadow-sm text-brand-primary hover:bg-brand-surface">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-end gap-3 mb-6">
              <span className="text-[40px] font-sans font-medium text-brand-primary tracking-tight leading-none">
                {isLoading ? '₹...' : formatCurrency(totalExpenses)}
              </span>
              <span className="inline-flex items-center gap-0.5 mb-1.5 px-2 py-0.5 rounded-[6px] bg-white border border-brand-border/60 text-[10px] font-bold text-brand-neutral-dark/50 shadow-sm">Live Data</span>
            </div>
            <div className="relative h-[110px] w-full flex items-end justify-between">
              <div className="flex flex-col gap-1 w-1/4 h-full justify-end relative z-10">
                <span className="text-[10px] font-bold text-brand-primary mb-1">Fuel</span>
                {expenseData.fuel[3] > 0 && <div className="bg-brand-neutral-dark/30 rounded-md w-full transition-all duration-700" style={{ height: `${expenseData.fuel[3]}%` }} />}
                {expenseData.fuel[2] > 0 && <div className="bg-brand-neutral-dark/50 rounded-md w-full transition-all duration-700" style={{ height: `${expenseData.fuel[2]}%` }} />}
                {expenseData.fuel[1] > 0 && <div className="bg-brand-neutral-dark/70 rounded-md w-full transition-all duration-700" style={{ height: `${expenseData.fuel[1]}%` }} />}
                {expenseData.fuel[0] > 0 && <div className="bg-brand-primary rounded-md w-full transition-all duration-700" style={{ height: `${expenseData.fuel[0]}%` }} />}
              </div>
              <div className="absolute left-[25%] w-[12.5%] h-full">
                <svg className="w-full h-full opacity-10" preserveAspectRatio="none"><polygon points="0,45 100,65 100,110 0,110" fill="currentColor" /></svg>
              </div>
              <div className="flex flex-col gap-1 w-1/4 h-full justify-end relative z-10 text-center">
                <span className="text-[10px] font-bold text-brand-primary mb-1">Maintenance</span>
                {expenseData.maintenance[3] > 0 && <div className="bg-brand-neutral-dark/30 rounded-md w-full transition-all duration-700" style={{ height: `${expenseData.maintenance[3]}%` }} />}
                {expenseData.maintenance[2] > 0 && <div className="bg-brand-neutral-dark/50 rounded-md w-full transition-all duration-700" style={{ height: `${expenseData.maintenance[2]}%` }} />}
                {expenseData.maintenance[1] > 0 && <div className="bg-brand-neutral-dark/70 rounded-md w-full transition-all duration-700" style={{ height: `${expenseData.maintenance[1]}%` }} />}
                {expenseData.maintenance[0] > 0 && <div className="bg-brand-primary rounded-md w-full transition-all duration-700" style={{ height: `${expenseData.maintenance[0]}%` }} />}
              </div>
              <div className="absolute left-[62.5%] w-[12.5%] h-full">
                <svg className="w-full h-full opacity-10" preserveAspectRatio="none"><polygon points="0,65 100,10 100,110 0,110" fill="currentColor" /></svg>
              </div>
              <div className="flex flex-col gap-1 w-1/4 h-full justify-end relative z-10 text-right">
                <span className="text-[10px] font-bold text-brand-primary mb-1">Other</span>
                {expenseData.other[3] > 0 && <div className="bg-brand-neutral-dark/30 rounded-md w-full transition-all duration-700" style={{ height: `${expenseData.other[3]}%` }} />}
                {expenseData.other[2] > 0 && <div className="bg-brand-neutral-dark/50 rounded-md w-full transition-all duration-700" style={{ height: `${expenseData.other[2]}%` }} />}
                {expenseData.other[1] > 0 && <div className="bg-brand-neutral-dark/70 rounded-md w-full transition-all duration-700" style={{ height: `${expenseData.other[1]}%` }} />}
                {expenseData.other[0] > 0 && <div className="bg-brand-primary rounded-md w-full transition-all duration-700" style={{ height: `${expenseData.other[0]}%` }} />}
              </div>
            </div>
            <div className="flex justify-center items-center gap-4 mt-6 text-[10px] font-semibold text-brand-primary">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-brand-primary" />Q1</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-brand-neutral-dark/70" />Q2</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-brand-neutral-dark/50" />Q3</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-brand-neutral-dark/30" />Q4</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── LIVE ORDERS SECTION ── */}
      <div className="w-full relative">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 px-2">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-sans font-medium text-brand-primary">Live Orders</h2>
            <span className="px-2.5 py-1 rounded-lg bg-white border border-brand-border/60 text-xs font-bold text-brand-neutral-dark/70 shadow-sm">
              {filteredTrips.length}
            </span>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-4 py-2 rounded-xl text-[13px] font-semibold shadow-sm whitespace-nowrap transition-colors ${
                  activeFilter === f.value
                    ? 'bg-brand-primary text-white'
                    : 'bg-white border border-brand-border/60 text-brand-neutral-dark/80 hover:bg-brand-surface'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Sentinel 2: Track when original filters leave view */}
        <div id="filters-sentinel" className="absolute top-10 h-px w-full pointer-events-none" />

        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-6 gap-4 px-6 py-2 text-[11px] font-semibold text-brand-neutral-dark/50">
            <div>Order ID</div>
            <div>Assigned to</div>
            <div>Pickup</div>
            <div>Delivery</div>
            <div>Est. delivery</div>
            <div>Status</div>
          </div>

          {isLoading ? (
            <div className="text-center py-10 text-sm font-semibold text-brand-neutral-dark/50">Loading orders from database...</div>
          ) : filteredTrips.length === 0 ? (
            <div className="text-center py-10 text-sm font-semibold text-brand-neutral-dark/50">
              {searchQuery ? `No orders match "${searchQuery}"` : 'No orders found.'}
            </div>
          ) : (
            filteredTrips.map((order) => (
              <div key={order.id} className="grid grid-cols-6 items-center gap-4 px-6 py-4 bg-white rounded-2xl shadow-sm border border-brand-border/30 hover:border-brand-border transition-colors">
                <div className="text-[13px] font-bold text-brand-primary truncate">{order.id ? order.id.split('-')[0].toUpperCase() : 'N/A'}</div>
                <div className="text-[13px] font-semibold text-brand-primary truncate">
                  {order.driver ? `${order.driver.first_name} ${order.driver.last_name}` : 'Unassigned'}
                </div>
                <div className="text-[13px] font-semibold text-brand-primary flex items-center gap-2 truncate">
                  <div className="w-4 h-4 rounded-full bg-brand-surface border border-brand-border/60 flex-shrink-0" />
                  <span className="truncate">{order.start_location}</span>
                </div>
                <div className="text-[13px] font-semibold text-brand-primary flex items-center gap-2 truncate">
                  <div className="w-4 h-4 rounded-full bg-brand-surface border border-brand-border/60 flex-shrink-0" />
                  <span className="truncate">{order.end_location}</span>
                </div>
                <div className="text-[13px] font-semibold text-brand-primary">{formatDate(order.end_time || order.start_time)}</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 flex-shrink-0 rounded-full ${getStatusColor(order.status)}`} />
                    <span className="text-[13px] font-semibold text-brand-primary truncate">{getStatusLabel(order.status)}</span>
                  </div>
                  <button
                    onClick={() => setSelectedTrip(order)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-brand-border/60 text-[11px] font-semibold text-brand-primary hover:bg-brand-surface shadow-sm whitespace-nowrap ml-2"
                  >
                    See more
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── SLIDE-IN DETAIL PANEL ── */}
      {selectedTrip && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
          onClick={() => setSelectedTrip(null)}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          selectedTrip ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedTrip && (
          <>
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border/40">
              <div>
                <p className="text-[11px] font-semibold text-brand-neutral-dark/40 uppercase tracking-wider mb-0.5">Trip Details</p>
                <h3 className="text-lg font-display font-bold text-brand-primary">
                  {selectedTrip.id ? selectedTrip.id.split('-')[0].toUpperCase() : 'N/A'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTrip(null)}
                className="h-9 w-9 flex items-center justify-center rounded-xl border border-brand-border/60 text-brand-neutral-dark/60 hover:bg-brand-surface transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-5">
              <span className={`inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-xl border text-xs font-bold ${getStatusBadgeStyle(selectedTrip.status)}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(selectedTrip.status)}`} />
                {getStatusLabel(selectedTrip.status)}
              </span>

              <div className="rounded-2xl border border-brand-border/40 p-4">
                <p className="text-[10px] font-semibold text-brand-neutral-dark/40 uppercase tracking-wider mb-2">Assigned Driver</p>
                <div className="flex items-center gap-3">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedTrip.driver?.first_name || 'Unknown'}&backgroundColor=e2e8f0`}
                    alt="Driver"
                    className="h-10 w-10 rounded-full border border-brand-border/60 bg-brand-surface"
                  />
                  <div>
                    <p className="text-sm font-bold text-brand-primary">
                      {selectedTrip.driver ? `${selectedTrip.driver.first_name} ${selectedTrip.driver.last_name}` : 'Unassigned'}
                    </p>
                    <p className="text-[11px] text-brand-neutral-dark/50">Driver</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-brand-border/40 p-4 flex flex-col gap-3">
                <p className="text-[10px] font-semibold text-brand-neutral-dark/40 uppercase tracking-wider">Route</p>
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center pt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <div className="w-0.5 h-8 bg-brand-border/60 my-1" />
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-primary" />
                  </div>
                  <div className="flex flex-col gap-3 flex-1">
                    <div>
                      <p className="text-[10px] text-brand-neutral-dark/40 font-medium">Pickup</p>
                      <p className="text-sm font-semibold text-brand-primary">{selectedTrip.start_location}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-brand-neutral-dark/40 font-medium">Delivery</p>
                      <p className="text-sm font-semibold text-brand-primary">{selectedTrip.end_location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-brand-border/40 p-4">
                  <p className="text-[10px] font-semibold text-brand-neutral-dark/40 uppercase tracking-wider mb-1">Departure</p>
                  <p className="text-sm font-bold text-brand-primary">{formatDateTime(selectedTrip.start_time)}</p>
                </div>
                <div className="rounded-2xl border border-brand-border/40 p-4">
                  <p className="text-[10px] font-semibold text-brand-neutral-dark/40 uppercase tracking-wider mb-1">Est. Arrival</p>
                  <p className="text-sm font-bold text-brand-primary">{formatDateTime(selectedTrip.end_time || '')}</p>
                </div>
              </div>

              {selectedTrip.vehicle && (
                <div className="rounded-2xl border border-brand-border/40 p-4">
                  <p className="text-[10px] font-semibold text-brand-neutral-dark/40 uppercase tracking-wider mb-2">Vehicle</p>
                  <p className="text-sm font-bold text-brand-primary">{selectedTrip.vehicle.make} {selectedTrip.vehicle.model}</p>
                  <p className="text-[11px] text-brand-neutral-dark/50 mt-0.5">{selectedTrip.vehicle.registration_number}</p>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-brand-border/40">
              <button
                onClick={() => setSelectedTrip(null)}
                className="w-full py-3 rounded-2xl bg-brand-primary text-white text-sm font-semibold hover:bg-brand-primary/90 transition-colors"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
