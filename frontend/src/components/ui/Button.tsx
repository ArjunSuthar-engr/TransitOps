import type { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-sans font-medium rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
  
  const variants = {
    primary: 'bg-brand-primary text-white hover:bg-brand-primary/90 focus-visible:ring-brand-primary dark:bg-white dark:text-brand-primary dark:hover:bg-slate-100 dark:focus-visible:ring-white',
    secondary: 'bg-brand-surface text-brand-neutral-dark hover:bg-slate-100 border border-brand-border focus-visible:ring-brand-primary dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:focus-visible:ring-slate-600',
    outline: 'border border-brand-border bg-transparent text-brand-neutral-dark hover:bg-brand-surface focus-visible:ring-brand-primary dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 dark:bg-red-750 dark:hover:bg-red-700'
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.75 gap-1.5',
    md: 'text-sm px-4.5 py-2.25 gap-2',
    lg: 'text-base px-5.5 py-2.75 gap-2.5'
  };

  const spinner = (
    <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && spinner}
      {children}
    </button>
  );
}
