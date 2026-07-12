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
      <CardContent className="p-5 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-slate-450 dark:text-slate-400 tracking-wide uppercase">
            {title}
          </p>
          {icon && (
            <div className="p-2 bg-slate-50/70 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-350 rounded-lg shadow-xxs">
              {icon}
            </div>
          )}
        </div>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </span>
          {trend && (
            <span
              className={`inline-flex items-center text-xs font-medium px-1.5 py-0.5 rounded-md ${
                trend.isPositive
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400'
                  : 'bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400'
              }`}
            >
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
