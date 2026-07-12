import { NavLink } from 'react-router-dom';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export function Sidebar({ onCloseMobile }: SidebarProps) {
  return (
    <div className="flex h-full w-full flex-col bg-white text-brand-primary pt-8 pb-6 px-5 overflow-hidden border-0">
      
      {/* Brand Title with Truck Logo */}
      <div className="flex items-center gap-1.5 mb-8 px-1">
         <div className="flex items-center justify-center w-10 h-8">
            {/* Truck Logo scaled nicely */}
            <svg className="w-full h-full" viewBox="0 0 100 60">
               <rect x="25" y="10" width="55" height="35" rx="2" fill="#2A323C" />
               <text x="52" y="34" fill="white" fontSize="16" fontWeight="bold" fontFamily="sans-serif">TO</text>
               {/* Changed cab color to sleek silver/grey */}
               <path d="M 10 25 L 25 25 L 25 45 L 10 45 Q 5 45 5 40 L 5 30 Q 5 25 10 25 Z" fill="#E2E8F0" />
               <circle cx="20" cy="45" r="7" fill="#2A323C" stroke="#E2E8F0" strokeWidth="2" />
               <circle cx="70" cy="45" r="7" fill="#2A323C" stroke="#E2E8F0" strokeWidth="2" />
               <circle cx="55" cy="45" r="7" fill="#2A323C" stroke="#E2E8F0" strokeWidth="2" />
            </svg>
         </div>
         <div className="font-display font-extrabold text-[22px] tracking-tight text-brand-primary">
           TransitOps
         </div>
      </div>

      {/* Profile Widget */}
      <div className="flex items-center justify-between mb-8 px-4 py-3 rounded-[16px] border border-brand-border/40 shadow-sm bg-white cursor-pointer hover:bg-brand-surface/50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-brand-surface overflow-hidden border border-brand-border/60">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan&backgroundColor=e2e8f0" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-brand-primary leading-tight">Arjun Suthar</span>
            <span className="text-[11px] font-semibold text-brand-neutral-dark/40 leading-tight mt-0.5">Admin</span>
          </div>
        </div>
        <svg className="h-5 w-5 text-brand-neutral-dark/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </div>

      {/* Main Navigation - Vertical List */}
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto scrollbar-none pb-4">
        
        {/* Dashboard Block - kept large and prominent as requested */}
        <NavLink
          to="/dashboard"
          onClick={onCloseMobile}
          className={({ isActive }) =>
            `flex items-center gap-4 h-16 px-5 mb-2 rounded-[20px] transition-transform active:scale-[0.98] ${
              isActive || true // Keep this styling active for the main dashboard view
                ? 'bg-[#111111] text-white shadow-md'
                : 'bg-white text-brand-primary border border-brand-border/40 hover:bg-brand-surface'
            }`
          }
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
          </svg>
          <span className="text-[14px] font-semibold">Dashboard</span>
        </NavLink>

        {/* Database Operations Links */}
        {[
          { name: 'Vehicles', path: '/vehicles', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M13 16h2m-2 0H5m14 0h2m-2 0h-4m-2 0h2m-2 0v-4h6m-1 4H8m10-4V9l-3-4H9" /> },
          { name: 'Drivers', path: '/drivers', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /> },
          { name: 'Trips', path: '/trips', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /> },
          { name: 'Services', path: '/maintenance', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /> },
          { name: 'Fuel', path: '/fuel', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /> },
          { name: 'Expenses', path: '/expenses', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
          { name: 'Reports', path: '/reports', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2zm9-1v-4a2 2 0 00-2-2h-2a2 2 0 00-2 2v4a2 2 0 002 2h2a2 2 0 002-2z" /> },
          { name: 'Settings', path: '/settings', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /> },
        ].map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex items-center gap-3.5 h-12 px-4 rounded-xl text-[14px] font-semibold transition-all whitespace-nowrap overflow-hidden ${
                isActive
                  ? 'bg-brand-surface text-brand-primary'
                  : 'bg-transparent text-brand-neutral-dark/80 hover:bg-brand-surface/50 hover:text-brand-primary'
              }`
            }
          >
            <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {item.icon}
            </svg>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

    </div>
  );
}
export default Sidebar;
