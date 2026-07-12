interface TopNavbarProps {
  onMenuToggle: () => void;
  title: string;
}

export function TopNavbar({ onMenuToggle, title }: TopNavbarProps) {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-brand-border/60 bg-brand-card px-6 text-brand-primary">
      {/* Title & Mobile Toggle Container */}
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger */}
        <button
          onClick={onMenuToggle}
          className="flex p-1.5 rounded-xl border border-brand-border md:hidden hover:bg-brand-surface cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-primary"
          aria-label="Toggle navigation menu"
        >
          <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Breadcrumb & Navigation title */}
        <div className="hidden items-center gap-1.5 text-xs font-sans text-brand-neutral-dark/50 sm:flex select-none">
          <span>TransitOps</span>
          <span>/</span>
          <span className="font-semibold text-brand-primary font-display tracking-tight text-xs md:text-sm">
            {title}
          </span>
        </div>
        <span className="font-semibold text-brand-primary font-display tracking-tight text-xs sm:hidden">
          {title}
        </span>
      </div>

      {/* Right Controls Panel */}
      <div className="flex items-center gap-3">
        {/* Search input UI */}
        <div className="relative hidden max-w-xs sm:block font-sans">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search console..."
            className="w-48 rounded-xl border border-brand-border bg-brand-surface/40 py-1.5 pl-8.5 pr-3 text-xs placeholder-slate-455 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
          />
        </div>

        {/* Notifications */}
        <button
          className="relative p-1.75 rounded-xl text-slate-400 hover:text-brand-primary hover:bg-brand-surface transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-primary"
          aria-label="View notifications"
        >
          <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-primary"></span>
          </span>
        </button>

        {/* User profile info */}
        <div className="flex items-center gap-2 border-l border-brand-border pl-3">
          <div className="h-7.5 w-7.5 overflow-hidden rounded-lg border border-brand-border bg-brand-surface flex items-center justify-center font-display font-bold text-[10px] text-brand-primary shadow-[0_1px_2px_rgba(12,13,13,0.02)] select-none">
            OP
          </div>
        </div>
      </div>
    </header>
  );
}
