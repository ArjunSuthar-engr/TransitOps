import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopNavbar } from '@/components/layout/TopNavbar';

export function AppLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Ensure dark mode class is stripped from HTML to lock layout in light theme
    document.documentElement.classList.remove('dark');
  }, []);

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
    <div className="flex h-screen w-screen overflow-hidden bg-brand-bg dark:bg-slate-900 transition-colors">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0 h-full">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-brand-primary/15 transition-opacity animate-in fade-in duration-150"
            onClick={() => setIsMobileOpen(false)}
          />
          {/* Drawer content */}
          <div className="relative flex w-full max-w-[240px] flex-1 flex-col bg-brand-card animate-in slide-in-from-left duration-150 shadow-lg border-r border-brand-border">
            {/* Close button inside drawer */}
            <div className="absolute top-4 right-4 z-50">
              <button
                type="button"
                className="flex h-7.5 w-7.5 items-center justify-center rounded-lg border border-brand-border bg-brand-card text-brand-neutral-dark/80 hover:bg-brand-surface cursor-pointer"
                onClick={() => setIsMobileOpen(false)}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <Sidebar onCloseMobile={() => setIsMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Right Content Viewport Frame */}
      <div className="flex flex-1 flex-col overflow-hidden h-full">
        {/* Top Navbar */}
        <TopNavbar onMenuToggle={handleToggleMobile} title={getPageTitle(location.pathname)} />

        {/* Inner page content container */}
        <main className="flex-1 overflow-y-auto bg-brand-surface/40 dark:bg-slate-900/40 p-5 md:p-6.5">
          <div className="mx-auto max-w-6.5xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
export default AppLayout;
