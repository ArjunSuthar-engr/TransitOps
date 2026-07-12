import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopNavbar } from '@/components/layout/TopNavbar';

export function AppLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const handleToggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/dashboard':
        return 'Dashboard Overview';
      case '/vehicles':
        return 'Vehicles Fleet';
      case '/drivers':
        return 'Drivers Registry';
      case '/trips':
        return 'Trips Dispatch';
      case '/maintenance':
        return 'Maintenance Logs';
      case '/fuel':
        return 'Fuel Tracking';
      case '/expenses':
        return 'Operational Expenses';
      case '/reports':
        return 'Reports & Analytics';
      case '/settings':
        return 'Settings Configuration';
      default:
        return 'TransitOps';
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Desktop Sidebar (visible on md and up) */}
      <div className="hidden md:flex md:flex-shrink-0 h-full">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsMobileOpen(false)}
          />
          {/* Drawer content */}
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-slate-950 animate-in slide-in-from-left duration-200">
            {/* Close button in drawer header */}
            <div className="absolute top-3 right-3 z-50">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer"
                onClick={() => setIsMobileOpen(false)}
              >
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <Sidebar onCloseMobile={() => setIsMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Right Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden h-full">
        {/* Top Navbar */}
        <TopNavbar onMenuToggle={handleToggleMobile} title={getPageTitle(location.pathname)} />

        {/* Dynamic Content Main View */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-900/40 p-5 md:p-6.5">
          <div className="mx-auto max-w-6.5xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
