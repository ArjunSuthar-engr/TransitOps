import { useState } from 'react';

interface TopNavbarProps {
  onMenuToggle: () => void;
  title: string;
}

export function TopNavbar({ onMenuToggle, title }: TopNavbarProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 px-6 text-slate-900 dark:text-white">
      {/* Title & mobile toggle container */}
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger */}
        <button
          onClick={onMenuToggle}
          className="flex p-1.5 rounded-lg border border-slate-200 dark:border-slate-850 md:hidden hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Current title */}
        <span className="font-semibold text-sm tracking-tight text-slate-900 dark:text-white md:text-base">
          {title}
        </span>
      </div>

      {/* Right controls panel */}
      <div className="flex items-center gap-4">
        {/* Search input UI */}
        <div className="relative hidden max-w-xs sm:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search operations..."
            className="w-52 rounded-lg border border-slate-200 dark:border-slate-850 bg-slate-50/30 dark:bg-slate-900 py-1.5 pl-9 pr-4 text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-950 dark:focus:ring-white focus:border-transparent transition-all"
          />
        </div>

        {/* Dark Mode toggle button */}
        <button
          onClick={toggleDarkMode}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-500 dark:hover:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
          aria-label="Toggle theme color"
        >
          {isDarkMode ? (
            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          ) : (
            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* Notifications Icon button */}
        <button
          className="relative p-1.5 rounded-lg text-slate-400 hover:text-slate-500 dark:hover:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
          aria-label="View notifications"
        >
          <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {/* Notification bubble */}
          <span className="absolute top-1 right-1 flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-slate-900 dark:bg-white"></span>
          </span>
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2 border-l border-slate-100 dark:border-slate-900 pl-4">
          <div className="h-8 w-8 overflow-hidden rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 flex items-center justify-center font-bold text-xs text-slate-700 dark:text-slate-350 shadow-xxs">
            AS
          </div>
          <div className="hidden flex-col text-left md:flex">
            <span className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">Arjun Suthar</span>
            <span className="text-[10px] text-slate-450 dark:text-slate-400 leading-none">Operations Manager</span>
          </div>
        </div>
      </div>
    </header>
  );
}
