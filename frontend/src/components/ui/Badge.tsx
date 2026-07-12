import type { HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}

export function Badge({
  children,
  className = '',
  variant = 'neutral',
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.75 rounded-full text-[10px] font-sans font-medium border transition-colors tracking-wide uppercase';
  
  const variants = {
    neutral: 'bg-brand-surface text-brand-neutral-dark border-brand-border dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800',
    success: 'bg-[#A5D48C]/15 text-slate-800 border-[#A5D48C]/40 dark:bg-[#A5D48C]/10 dark:text-[#A5D48C] dark:border-[#A5D48C]/35',
    warning: 'bg-[#F7B558]/15 text-slate-800 border-[#F7B558]/45 dark:bg-[#F7B558]/10 dark:text-[#F7B558] dark:border-[#F7B558]/35',
    danger: 'bg-red-500/10 text-red-700 border-red-500/20 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/50',
    info: 'bg-blue-500/10 text-blue-700 border-blue-500/20 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/50'
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
