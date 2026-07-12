import type { HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';

export function Table({ className = '', ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto border border-slate-50 dark:border-slate-900 rounded-xl bg-white dark:bg-slate-950">
      <table
        className={`w-full text-left border-collapse text-sm text-slate-600 dark:text-slate-400 ${className}`}
        {...props}
      />
    </div>
  );
}

export function TableHeader({ className = '', ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={`bg-slate-50/70 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-900 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider ${className}`}
      {...props}
    />
  );
}

export function TableBody({ className = '', ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={`divide-y divide-slate-50 dark:divide-slate-900 bg-white dark:bg-slate-950 ${className}`}
      {...props}
    />
  );
}

export function TableRow({ className = '', ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={`hover:bg-slate-50/30 dark:hover:bg-slate-900/20 transition-colors ${className}`}
      {...props}
    />
  );
}

export function TableHeaderCell({ className = '', ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={`px-6 py-3.5 font-semibold text-slate-700 dark:text-slate-300 ${className}`}
      {...props}
    />
  );
}

export function TableCell({ className = '', ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={`px-6 py-4 text-slate-900 dark:text-slate-200 font-normal align-middle ${className}`}
      {...props}
    />
  );
}
