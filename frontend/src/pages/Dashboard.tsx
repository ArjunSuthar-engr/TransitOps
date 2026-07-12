import { useEffect, useState, useMemo } from 'react';
import { tripService } from '@/services/tripService';
import { expenseService } from '@/services/expenseService';
import { driverService } from '@/services/driverService';
import { vehicleService } from '@/services/vehicleService';
import { authService } from '@/services/authService';
import dayjs from 'dayjs';
import { useRole } from '@/contexts/RoleContext';
import { useLocation } from 'react-router-dom';

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
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPickup, setNewPickup] = useState('');
  const [newDelivery, setNewDelivery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableDrivers, setAvailableDrivers] = useState<any[]>([]);
  const [availableVehicles, setAvailableVehicles] = useState<any[]>([]);
  const [driverName, setDriverName] = useState<string>('Driver');
  const [myDriverId, setMyDriverId] = useState<string | null>(null);
  const { role } = useRole();
  const location = useLocation();

  const handleStickyInteraction = () => {
    const sentinel = document.getElementById('filters-sentinel');
    if (sentinel) {
      const y = sentinel.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y + 1, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const user = await authService.getUser();
        let userDriverNum = '';
        if (user?.email && user.email.startsWith('driver')) {
          userDriverNum = user.email.replace('driver', '').split('@')[0];
          setDriverName(`Driver ${userDriverNum}`);
        }

        let fetchedTrips = await tripService.getDashboardTrips();
        const expensesData = await expenseService.getAll();
        setExpenses(expensesData || []);
        const total = (expensesData || []).reduce((acc, curr) => acc + Number(curr.amount), 0);
        setTotalExpenses(total);

        const dData = await driverService.getAll();
        const available = dData.filter(d => d.status === 'available' || d.status === 'on_trip') || [];
        setAvailableDrivers(available);

        if (role === 'driver' && userDriverNum) {
          const matchingDriver = available.find(d => d.first_name === 'Driver' && d.last_name === userDriverNum);
          if (matchingDriver) setMyDriverId(matchingDriver.id);
          
          fetchedTrips = fetchedTrips.filter(t => 
            (t.driver?.first_name === 'Driver' && t.driver?.last_name === userDriverNum) || 
            !t.driver_id
          );
        }
        setTrips(fetchedTrips);

        const vData = await vehicleService.getAll();
        setAvailableVehicles(vData.filter(v => v.status === 'active') || []);
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

  const availableLocations = useMemo(() => {
    const locs = new Set<string>();
    trips.forEach(t => {
      if (t.start_location) locs.add(t.start_location);
      if (t.end_location) locs.add(t.end_location);
    });
    return Array.from(locs).sort();
  }, [trips]);

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

  const handleCreateTrip = async () => {
    if (!newPickup || !newDelivery) return;
    setIsSubmitting(true);
    try {
      // Create an unassigned trip. Use dayjs() as the exact creation time.
      await tripService.create({
        vehicle_id: null,
        driver_id: null,
        start_location: newPickup,
        end_location: newDelivery,
        start_time: dayjs().toISOString(),
        end_time: null,
        status: 'scheduled'
      });
      // Refresh trips
      const fetchedTrips = await tripService.getDashboardTrips();
      setTrips(fetchedTrips || []);
      
      setNewPickup('');
      setNewDelivery('');
      setShowCreateModal(false);
    } catch (err) {
      console.error('Failed to create trip:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAssignResource = async (tripId: string, field: 'driver_id' | 'vehicle_id', value: string) => {
    try {
      await tripService.update(tripId, { [field]: value });
      const fetchedTrips = await tripService.getDashboardTrips();
      setTrips(fetchedTrips || []);
      const updatedTrip = fetchedTrips?.find((t: any) => t.id === tripId);
      if (updatedTrip) setSelectedTrip(updatedTrip);
    } catch (err) {
      console.error('Failed to assign resource:', err);
    }
  };

  const handleUpdateTripStatus = async (tripId: string, currentStatus: string) => {
    try {
      let nextStatus = currentStatus;
      let updates: any = {};
      if (currentStatus === 'scheduled') {
        nextStatus = 'in_progress';
      } else if (currentStatus === 'in_progress') {
        nextStatus = 'completed';
        updates.end_time = dayjs().toISOString();
      } else {
        return;
      }
      updates.status = nextStatus;
      await tripService.update(tripId, updates);
      
      const fetchedTrips = await tripService.getDashboardTrips();
      setTrips(fetchedTrips || []);
      const updatedTrip = fetchedTrips?.find((t: any) => t.id === tripId);
      if (updatedTrip) setSelectedTrip(updatedTrip);
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleCancelTrip = async (tripId: string) => {
    if (!window.confirm('Are you sure you want to cancel this trip?')) return;
    try {
      await tripService.update(tripId, { status: 'cancelled' });
      const fetchedTrips = await tripService.getDashboardTrips();
      setTrips(fetchedTrips || []);
      const updatedTrip = fetchedTrips?.find((t: any) => t.id === tripId);
      if (updatedTrip) setSelectedTrip(updatedTrip);
    } catch (err) {
      console.error('Failed to cancel trip:', err);
    }
  };

  const handleAcceptTrip = async (tripId: string) => {
    if (!myDriverId) return;
    try {
      await tripService.update(tripId, { driver_id: myDriverId });
      const fetchedTrips = await tripService.getDashboardTrips();
      // Re-filter for driver
      const userDriverNum = driverName.replace('Driver ', '');
      const updatedTrips = (fetchedTrips || []).filter(t => 
        (t.driver?.first_name === 'Driver' && t.driver?.last_name === userDriverNum) || 
        !t.driver_id
      );
      setTrips(updatedTrips);
    } catch (err) {
      console.error('Failed to accept trip:', err);
    }
  };

  const FILTERS: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Scheduled', value: 'scheduled' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Completed', value: 'completed' },
  ];

  if (role === 'driver') {
    const userDriverNum = driverName.replace('Driver ', '');
    const activeTrip = trips.find(t => t.driver?.last_name === userDriverNum && (t.status === 'in_progress' || t.status === 'scheduled'));
    const openTrips = trips.filter(t => !t.driver_id && t.status === 'scheduled');
    const completedTrips = trips.filter(t => t.driver?.last_name === userDriverNum && t.status === 'completed');

    return (
      <div className="flex flex-col gap-6 w-full p-4 sm:p-6 lg:p-8 font-sans max-w-2xl mx-auto min-h-screen">
        <div className="bg-brand-surface rounded-[2rem] p-8 shadow-sm border border-brand-border/40 text-center">
          <div className="w-20 h-20 bg-brand-primary rounded-full mx-auto flex items-center justify-center mb-5 shadow-xl shadow-brand-primary/20">
            <span className="text-3xl">🚚</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-brand-primary">Welcome, {driverName}!</h1>
          <p className="text-brand-neutral-dark/50 mt-1 font-medium">Role: Driver</p>
        </div>

        {/* ── Active Assignment Tab ── */}
        {location.pathname === '/dashboard' && (
          activeTrip ? (
            <div className="bg-[#0C0D0D] text-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="absolute top-0 right-0 bg-brand-primary px-6 py-2 rounded-bl-3xl text-[10px] font-bold uppercase tracking-wider">
                {activeTrip.status.replace('_', ' ')}
              </div>
              
              <h2 className="text-xl font-display font-bold mb-8">Current Assignment</h2>
              
              <div className="flex flex-col gap-8">
                <div className="flex gap-5 items-start">
                  <div className="flex flex-col items-center mt-1.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
                    <div className="w-0.5 h-16 bg-white/10 my-2" />
                    <div className="w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
                  </div>
                  <div className="flex flex-col gap-8 flex-1">
                    <div>
                      <p className="text-[11px] text-white/40 font-bold uppercase tracking-widest mb-1.5">Pickup Location</p>
                      <p className="text-lg font-bold text-white leading-tight">{activeTrip.start_location}</p>
                      <p className="text-[13px] text-white/60 mt-1">{formatDateTime(activeTrip.start_time)}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-white/40 font-bold uppercase tracking-widest mb-1.5">Delivery Destination</p>
                      <p className="text-lg font-bold text-white leading-tight">{activeTrip.end_location}</p>
                      <p className="text-[13px] text-white/60 mt-1">Est. Arrival: {formatDateTime(activeTrip.end_time || '')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {activeTrip.status === 'in_progress' && (
                <button
                  onClick={() => handleUpdateTripStatus(activeTrip.id, activeTrip.status)}
                  className="mt-10 w-full py-4 rounded-2xl bg-emerald-500 text-white text-[15px] font-bold hover:bg-emerald-600 transition-colors shadow-xl shadow-emerald-500/20 active:scale-[0.98]"
                >
                  Mark as Completed
                </button>
              )}
              
              {activeTrip.status === 'scheduled' && (
                <button
                  onClick={() => handleUpdateTripStatus(activeTrip.id, activeTrip.status)}
                  className="mt-10 w-full py-4 rounded-2xl bg-brand-primary text-white text-[15px] font-bold hover:bg-brand-primary/90 transition-colors shadow-xl shadow-brand-primary/20 active:scale-[0.98]"
                >
                  Start Trip Now
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-brand-border/40 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-16 h-16 bg-brand-surface rounded-full mx-auto flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-brand-neutral-dark/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-primary">No Active Trips</h3>
              <p className="text-brand-neutral-dark/60 mt-2">You don't have a current assignment. Accept a trip from the load board below.</p>
            </div>
          )
        )}

        {/* ── Open Load Board Tab ── */}
        {location.pathname === '/open-deliveries' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-display font-bold text-brand-primary mb-4 flex items-center gap-2">
              <span className="text-xl">📡</span> Open Deliveries
            </h2>
            {openTrips.length === 0 ? (
              <div className="bg-brand-surface/50 rounded-2xl p-6 text-center border border-brand-border/40">
                <p className="text-brand-neutral-dark/60 text-sm font-medium">No open deliveries available right now.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {openTrips.map(trip => (
                  <div key={trip.id} className="bg-white rounded-2xl p-5 border border-brand-border shadow-sm flex flex-col gap-4 hover:border-brand-primary/30 transition-colors">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          <p className="text-xs font-bold text-brand-neutral-dark/40 uppercase tracking-widest">Pickup</p>
                        </div>
                        <p className="text-brand-primary font-bold">{trip.start_location}</p>
                        <p className="text-xs text-brand-neutral-dark/60 mt-0.5">{formatDateTime(trip.start_time)}</p>
                      </div>
                      <div className="flex-1 border-l border-brand-border/50 pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <p className="text-xs font-bold text-brand-neutral-dark/40 uppercase tracking-widest">Dropoff</p>
                        </div>
                        <p className="text-brand-primary font-bold">{trip.end_location}</p>
                        <p className="text-xs text-brand-neutral-dark/60 mt-0.5">Est: {formatDateTime(trip.end_time || '')}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAcceptTrip(trip.id)}
                      disabled={!!activeTrip}
                      className="w-full py-2.5 rounded-xl bg-blue-50 text-blue-600 text-sm font-bold hover:bg-blue-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {activeTrip ? 'Finish current trip first' : 'Accept Trip'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Trip History Tab ── */}
        {location.pathname === '/trip-history' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-display font-bold text-brand-primary mb-4 flex items-center gap-2">
              <span className="text-xl">📜</span> Trip History
            </h2>
            {completedTrips.length === 0 ? (
              <div className="bg-brand-surface/50 rounded-2xl p-6 text-center border border-brand-border/40">
                <p className="text-brand-neutral-dark/60 text-sm font-medium">You haven't completed any trips yet.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {completedTrips.map(trip => (
                  <div key={trip.id} className="bg-white rounded-xl p-4 border border-brand-border/40 flex justify-between items-center opacity-70">
                    <div>
                      <p className="text-sm font-bold text-brand-primary">{trip.start_location} → {trip.end_location}</p>
                      <p className="text-xs text-brand-neutral-dark/60 mt-0.5">Completed {formatDateTime(trip.end_time || '')}</p>
                    </div>
                    <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-wider">
                      Done
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

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
            onFocus={handleStickyInteraction}
            className="w-full pl-9 pr-4 py-1.5 bg-brand-surface border border-brand-border/60 rounded-xl focus:outline-none text-sm placeholder:text-brand-neutral-dark/50 text-brand-primary thick-caret"
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
              onClick={() => {
                setActiveFilter(f.value);
                handleStickyInteraction();
              }}
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
              className="w-full pl-7 pr-4 py-1 bg-transparent border-b border-brand-neutral-dark/20 focus:border-brand-primary focus:outline-none text-sm font-sans placeholder:text-brand-neutral-dark/50 text-brand-primary thick-caret"
            />
          </div>
          {/* Sentinel 1: Track when hero search leaves view */}
          <div id="search-sentinel" className="absolute top-10 h-px w-full pointer-events-none" />

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="relative w-[172px] h-[40px]">
              {showCreateModal && (
                <div className="fixed inset-0 z-40" onClick={() => setShowCreateModal(false)} />
              )}
              
              <div 
                className={`absolute right-0 top-0 bg-[#0C0D0D] text-white overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-50 ${
                  showCreateModal 
                    ? 'w-[320px] h-[340px] rounded-2xl border border-white/10 shadow-2xl cursor-default' 
                    : 'w-[172px] h-[40px] rounded-[14px] cursor-pointer hover:bg-black shadow-sm'
                }`}
                onClick={() => {
                  if (!showCreateModal) setShowCreateModal(true);
                }}
              >
                {/* Button State */}
                <div 
                  className={`absolute inset-0 flex items-center justify-center gap-2 px-5 transition-opacity duration-300 ${
                    showCreateModal ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-200'
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-[13px] font-semibold whitespace-nowrap">Add new shipment</span>
                </div>

                {/* Form State */}
                <div 
                  className={`absolute top-0 right-0 w-[320px] p-5 flex flex-col gap-4 transition-opacity duration-500 ${
                    showCreateModal ? 'opacity-100 delay-150' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-[14px] font-bold text-white mb-1">Create Shipment</h4>
                      <p className="text-[11px] text-white/50 font-medium leading-tight">
                        The order will be scheduled instantly.
                      </p>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setShowCreateModal(false); }} 
                      className="text-white/40 hover:text-white transition-colors mt-0.5"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-white/70">Pickup Location</label>
                    <input 
                      type="text" 
                      list="locations"
                      placeholder="e.g. Warehouse A"
                      value={newPickup}
                      onChange={e => setNewPickup(e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-white/40 text-xs font-semibold text-white placeholder:text-white/30"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-white/70">Delivery Location</label>
                    <input 
                      type="text" 
                      list="locations"
                      placeholder="e.g. Pune Hub"
                      value={newDelivery}
                      onChange={e => setNewDelivery(e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-white/40 text-xs font-semibold text-white placeholder:text-white/30"
                    />
                  </div>

                  <button
                    onClick={handleCreateTrip}
                    disabled={isSubmitting || !newPickup || !newDelivery}
                    className="mt-2 w-full py-2.5 rounded-xl bg-white text-[#0C0D0D] text-[13px] font-bold hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Order'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className={`grid grid-cols-1 ${role !== 'dispatcher' ? 'lg:grid-cols-2' : ''} gap-12 lg:gap-16`}>

          {/* LEFT: Fulfillment Performance */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-base font-sans font-medium text-brand-primary">Fulfillment Performance</h3>
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
                  <span className={`text-[9px] font-bold mb-1 ${i === 6 ? 'text-brand-primary' : 'text-brand-neutral-dark/40'}`}>{h}</span>
                  <div className={`w-full rounded-sm transition-all duration-700 ease-out ${i === 6 ? 'bg-brand-primary' : 'bg-gradient-to-t from-brand-border/10 to-brand-border/80'}`} style={{ height: `${h}%` }}>
                    {i !== 6 && <div className="h-0.5 w-full bg-brand-neutral-dark/60 rounded-t-sm" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Total Expenses */}
          {role !== 'dispatcher' && (
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-sans font-medium text-brand-primary">Total Expenses</h3>
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
                <svg className="w-full h-full opacity-10" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <polygon 
                    points={`0,${100 - (expenseData.fuel.reduce((a, b) => a + b, 0) * 0.8)} 100,${100 - (expenseData.maintenance.reduce((a, b) => a + b, 0) * 0.8)} 100,100 0,100`} 
                    fill="currentColor" 
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-1 w-1/4 h-full justify-end relative z-10 text-center">
                <span className="text-[10px] font-bold text-brand-primary mb-1">Maintenance</span>
                {expenseData.maintenance[3] > 0 && <div className="bg-brand-neutral-dark/30 rounded-md w-full transition-all duration-700" style={{ height: `${expenseData.maintenance[3]}%` }} />}
                {expenseData.maintenance[2] > 0 && <div className="bg-brand-neutral-dark/50 rounded-md w-full transition-all duration-700" style={{ height: `${expenseData.maintenance[2]}%` }} />}
                {expenseData.maintenance[1] > 0 && <div className="bg-brand-neutral-dark/70 rounded-md w-full transition-all duration-700" style={{ height: `${expenseData.maintenance[1]}%` }} />}
                {expenseData.maintenance[0] > 0 && <div className="bg-brand-primary rounded-md w-full transition-all duration-700" style={{ height: `${expenseData.maintenance[0]}%` }} />}
              </div>
              <div className="absolute left-[62.5%] w-[12.5%] h-full">
                <svg className="w-full h-full opacity-10" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <polygon 
                    points={`0,${100 - (expenseData.maintenance.reduce((a, b) => a + b, 0) * 0.8)} 100,${100 - (expenseData.other.reduce((a, b) => a + b, 0) * 0.8)} 100,100 0,100`} 
                    fill="currentColor" 
                  />
                </svg>
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
          )}
        </div>
      </div>

      {/* ── LIVE ORDERS SECTION ── */}
      <div className="w-full relative min-h-screen">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 px-2">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-sans font-medium text-brand-primary">
              {FILTERS.find(f => f.value === activeFilter)?.label || 'All'} Orders
            </h2>
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
                {selectedTrip.driver ? (
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full border border-brand-border/60 bg-brand-primary/10 text-brand-primary font-display font-bold text-lg">
                      {selectedTrip.driver.first_name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-brand-primary">
                        {`${selectedTrip.driver.first_name} ${selectedTrip.driver.last_name}`}
                      </p>
                      <p className="text-[11px] text-brand-neutral-dark/50">Driver</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold text-brand-primary">Unassigned</p>
                    {(role === 'dispatcher' || role === 'admin') && (
                      <select 
                        className="w-full px-3 py-2 bg-brand-surface border border-brand-border/60 rounded-lg focus:outline-none text-xs font-semibold text-brand-primary"
                        onChange={(e) => handleAssignResource(selectedTrip.id, 'driver_id', e.target.value)}
                        value=""
                      >
                        <option value="" disabled>Select an available driver...</option>
                        {availableDrivers.map(d => {
                          const isOccupied = d.status === 'on_trip' || trips.some(t => t.driver_id === d.id && t.status === 'in_progress');
                          return (
                            <option key={d.id} value={d.id}>
                              {d.first_name} {d.last_name} {isOccupied ? '(Occupied - assign after current trip)' : ''}
                            </option>
                          );
                        })}
                      </select>
                    )}
                  </div>
                )}
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

              <div className="rounded-2xl border border-brand-border/40 p-4">
                <p className="text-[10px] font-semibold text-brand-neutral-dark/40 uppercase tracking-wider mb-2">Vehicle</p>
                {selectedTrip.vehicle ? (
                  <>
                    <p className="text-sm font-bold text-brand-primary">{selectedTrip.vehicle.make} {selectedTrip.vehicle.model}</p>
                    <p className="text-[11px] text-brand-neutral-dark/50 mt-0.5">{selectedTrip.vehicle.registration_number}</p>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold text-brand-primary">Unassigned</p>
                    {(role === 'dispatcher' || role === 'admin') && (
                      <select 
                        className="w-full px-3 py-2 bg-brand-surface border border-brand-border/60 rounded-lg focus:outline-none text-xs font-semibold text-brand-primary"
                        onChange={(e) => handleAssignResource(selectedTrip.id, 'vehicle_id', e.target.value)}
                        value=""
                      >
                        <option value="" disabled>Select an active vehicle...</option>
                        {availableVehicles.map(v => (
                          <option key={v.id} value={v.id}>{v.registration_number} ({v.make} {v.model})</option>
                        ))}
                      </select>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-brand-border/40 flex flex-col gap-3">
              {(role === 'dispatcher' || role === 'admin') && selectedTrip.status === 'scheduled' && (
                <button
                  onClick={() => handleUpdateTripStatus(selectedTrip.id, selectedTrip.status)}
                  disabled={!selectedTrip.driver_id || !selectedTrip.vehicle_id}
                  className="w-full py-3 rounded-2xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {!selectedTrip.driver_id || !selectedTrip.vehicle_id ? 'Assign Driver & Vehicle First' : 'Start Trip (Mark In Progress)'}
                </button>
              )}
              {(role === 'admin') && selectedTrip.status === 'in_progress' && (
                <button
                  onClick={() => handleUpdateTripStatus(selectedTrip.id, selectedTrip.status)}
                  className="w-full py-3 rounded-2xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors"
                >
                  Complete Trip
                </button>
              )}
              {(role === 'dispatcher' || role === 'admin') && selectedTrip.status !== 'completed' && selectedTrip.status !== 'cancelled' && (
                <button
                  onClick={() => handleCancelTrip(selectedTrip.id)}
                  className="w-full py-3 rounded-2xl bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 transition-colors"
                >
                  Cancel Trip
                </button>
              )}
              <button
                onClick={() => setSelectedTrip(null)}
                className="w-full py-3 rounded-2xl bg-white border border-brand-border/60 text-brand-primary text-sm font-semibold hover:bg-brand-surface transition-colors"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>

      <datalist id="locations">
        {availableLocations.map((loc) => (
          <option key={loc} value={loc} />
        ))}
      </datalist>

    </div>
  );
}
