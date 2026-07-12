export interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-brand-border/60 dark:border-slate-900 pb-4 mb-6">
      <div>
        <h1 className="text-xl font-display font-bold tracking-tight text-brand-primary dark:text-white">
          {title}
        </h1>
        {description && (
          <p className="mt-0.5 text-xs font-sans text-brand-neutral-dark/60 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2.5 self-start md:self-auto">
          {actions}
        </div>
      )}
    </div>
  );
}
