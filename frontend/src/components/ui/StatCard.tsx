import { Card, CardContent } from './Card';

export interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number | string;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  className = ''
}: StatCardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-5.5 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-brand-neutral-dark/60 dark:text-slate-400 tracking-wider uppercase">
            {title}
          </p>
          {icon && (
            <div className="p-1.75 bg-brand-surface dark:bg-slate-900 border border-brand-border/60 dark:border-slate-800 text-brand-neutral-dark dark:text-slate-350 rounded-lg">
              {icon}
            </div>
          )}
        </div>
        <div className="flex items-baseline gap-2 mt-1.5">
          <span className="text-2xl font-display font-bold tracking-tight text-brand-primary dark:text-white">
            {value}
          </span>
          {trend && (
            <span
              className={`inline-flex items-center text-[10px] font-sans font-medium px-2 py-0.5 rounded-full border ${
                trend.isPositive
                  ? 'bg-[#A5D48C]/15 text-slate-800 border-[#A5D48C]/35 dark:bg-[#A5D48C]/10 dark:text-[#A5D48C]'
                  : 'bg-red-500/10 text-red-750 border-red-500/20 dark:bg-red-950/20 dark:text-red-400'
              }`}
            >
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </span>
          )}
        </div>
        {description && (
          <p className="text-[10px] font-sans text-brand-neutral-dark/50 dark:text-slate-500 mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
