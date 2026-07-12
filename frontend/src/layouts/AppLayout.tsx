import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';

export function AppLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    // Ensure dark mode class is stripped from HTML to lock layout in light theme
    document.documentElement.classList.remove('dark');
  }, []);

  const handleToggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white transition-colors font-sans">
      {/* Desktop Sidebar (Fixed Width, Blended) */}
      <div className="hidden md:flex h-full w-[260px] flex-shrink-0 z-50">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="fixed inset-0 bg-brand-primary/15 transition-opacity animate-in fade-in duration-150"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative flex h-full">
            <div className="w-[260px] h-full bg-white">
              <Sidebar onCloseMobile={() => setIsMobileOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Right Content Viewport Frame */}
      <div className="flex flex-1 flex-col overflow-hidden h-full relative">
        <button
          onClick={handleToggleMobile}
          className="fixed top-4 left-4 z-30 flex p-2.5 rounded-xl border border-brand-border bg-white md:hidden shadow-sm text-brand-primary cursor-pointer hover:bg-brand-surface transition-colors"
          aria-label="Toggle navigation menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pt-20 md:pt-6 bg-white">
          <div className="mx-auto max-w-[1400px] h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
export default AppLayout;
