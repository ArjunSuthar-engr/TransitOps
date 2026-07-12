import { useEffect } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className = ''
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay (flat neutral, no blur to avoid glassmorphism) */}
      <div
        className="fixed inset-0 bg-brand-primary/20 dark:bg-slate-950/60 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div
        className={`relative w-full max-w-lg bg-brand-card dark:bg-slate-950 border border-brand-border dark:border-slate-900 rounded-2xl shadow-lg flex flex-col max-h-[85vh] overflow-hidden animate-in fade-in zoom-in-98 duration-150 ${className}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border/60 dark:border-slate-900">
          <h3 className="text-sm font-display font-semibold text-brand-primary dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-brand-primary dark:hover:text-slate-300 transition-colors p-1.5 rounded-lg hover:bg-brand-surface dark:hover:bg-slate-900 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-primary"
            aria-label="Close modal"
          >
            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 text-sm text-brand-neutral-dark/95 dark:text-slate-400">
          {children}
        </div>

        {/* Footer */}
        {footer ? (
          <div className="px-6 py-4.5 border-t border-brand-border/60 dark:border-slate-900 bg-brand-surface/40 dark:bg-slate-950 flex items-center justify-end gap-3">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
