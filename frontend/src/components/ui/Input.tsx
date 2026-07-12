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
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {label}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          className={`w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-all placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950 dark:focus:ring-white focus:border-transparent ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-slate-200 dark:border-slate-800'
          } ${className}`}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-500 font-medium">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
