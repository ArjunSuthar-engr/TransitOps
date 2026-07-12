import type { HTMLAttributes } from 'react';

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-xl shadow-xs overflow-hidden ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`px-6 py-5 border-b border-slate-50 dark:border-slate-900 flex flex-col gap-1.5 ${className}`}
      {...props}
    />
  );
}

export function CardTitle({ className = '', ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`text-base font-semibold text-slate-900 dark:text-white tracking-tight ${className}`}
      {...props}
    />
  );
}

export function CardDescription({ className = '', ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`text-xs text-slate-500 dark:text-slate-400 ${className}`}
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
      className={`px-6 py-4 border-t border-slate-50 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950 flex items-center justify-end gap-3 ${className}`}
      {...props}
    />
  );
}
