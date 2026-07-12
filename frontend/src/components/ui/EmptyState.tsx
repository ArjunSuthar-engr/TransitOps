import { Card, CardContent } from './Card';

export interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  action,
  icon
}: EmptyStateProps) {
  return (
    <Card className="border-dashed border-brand-border bg-transparent dark:bg-transparent shadow-none">
      <CardContent className="flex flex-col items-center justify-center text-center p-12 max-w-sm mx-auto gap-1.5 font-sans">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-surface dark:bg-slate-900 border border-brand-border dark:border-slate-800 text-brand-neutral-dark/60 dark:text-slate-400">
          {icon || (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          )}
        </div>
        <h3 className="mt-3 text-sm font-semibold text-brand-primary dark:text-white">
          {title}
        </h3>
        <p className="text-xs text-brand-neutral-dark/60 dark:text-slate-400 leading-normal">
          {description}
        </p>
        {action && <div className="mt-4">{action}</div>}
      </CardContent>
    </Card>
  );
}
