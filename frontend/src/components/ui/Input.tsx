import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', type = 'text', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full font-sans">
        {label && (
          <label className="text-xs font-semibold text-brand-neutral-dark/80 dark:text-slate-300">
            {label}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          className={`w-full px-3.5 py-2.25 border rounded-xl text-sm bg-white dark:bg-slate-950 text-brand-primary dark:text-white transition-all placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-white focus:border-transparent ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-brand-border/80 dark:border-slate-800'
          } ${className}`}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-655 font-medium">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span className="text-xs text-brand-neutral-dark/50 dark:text-slate-500">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
