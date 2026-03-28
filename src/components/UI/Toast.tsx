import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  visible: boolean;
}

export function Toast({ message, type = 'success', visible }: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
    } else {
      const timeout = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  if (!show) return null;

  const styles: Record<string, string> = {
    success: 'bg-accent-50 dark:bg-accent-500/15 text-accent-600 dark:text-accent-300 border-accent-500/20 dark:border-accent-500/25',
    error: 'bg-danger-50 dark:bg-danger-500/15 text-danger-600 dark:text-danger-300 border-danger-500/20 dark:border-danger-500/25',
    info: 'bg-primary-50 dark:bg-primary-500/15 text-primary-600 dark:text-primary-300 border-primary-500/20 dark:border-primary-500/25',
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div
        className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border backdrop-blur-xl shadow-2xl shadow-black/40 ${styles[type]}`}
      >
        {type === 'success' && (
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        {type === 'info' && (
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        {type === 'error' && (
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}
