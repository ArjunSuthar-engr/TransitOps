import type { HTMLAttributes } from 'react';

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-brand-card dark:bg-slate-950 border border-brand-border/60 dark:border-slate-900 rounded-2xl shadow-[0_1px_3px_rgba(12,13,13,0.02)] overflow-hidden transition-all ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`px-6 py-5 border-b border-brand-border/40 dark:border-slate-900 flex flex-col gap-1.5 ${className}`}
      {...props}
    />
  );
}

export function CardTitle({ className = '', ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`text-base font-display font-semibold text-brand-primary dark:text-white tracking-tight ${className}`}
      {...props}
    />
  );
}

export function CardDescription({ className = '', ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`text-xs font-sans text-brand-neutral-dark/70 dark:text-slate-400 ${className}`}
      {...props}
    />
  );
}

export function CardContent({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`p-6 ${className}`}
      {...props}
    />
  );
}

export function CardFooter({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`px-6 py-4.5 border-t border-brand-border/40 dark:border-slate-900 bg-brand-surface/40 dark:bg-slate-950 flex items-center justify-end gap-3 ${className}`}
      {...props}
    />
  );
}
