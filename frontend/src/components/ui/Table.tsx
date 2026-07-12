import type { HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';

export function Table({ className = '', ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto border border-brand-border/60 dark:border-slate-900 rounded-2xl bg-brand-card dark:bg-slate-950 shadow-[0_1px_3px_rgba(12,13,13,0.02)]">
      <table
        className={`w-full text-left border-collapse text-sm text-brand-neutral-dark dark:text-slate-400 ${className}`}
        {...props}
      />
    </div>
  );
}

export function TableHeader({ className = '', ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={`bg-brand-surface dark:bg-slate-900/50 border-b border-brand-border/80 dark:border-slate-900 text-xs font-semibold text-brand-neutral-dark/80 dark:text-slate-400 uppercase tracking-wider sticky top-0 z-10 ${className}`}
      {...props}
    />
  );
}

export function TableBody({ className = '', ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={`divide-y divide-brand-border/50 dark:divide-slate-900 bg-brand-card dark:bg-slate-950 ${className}`}
      {...props}
    />
  );
}

export function TableRow({ className = '', ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={`hover:bg-brand-surface/40 dark:hover:bg-slate-900/20 transition-colors ${className}`}
      {...props}
    />
  );
}

export function TableHeaderCell({ className = '', ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={`px-6 py-4 font-sans font-bold text-brand-primary dark:text-slate-300 ${className}`}
      {...props}
    />
  );
}

export function TableCell({ className = '', ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={`px-6 py-4 font-sans text-brand-neutral-dark dark:text-slate-200 font-normal align-middle ${className}`}
      {...props}
    />
  );
}
