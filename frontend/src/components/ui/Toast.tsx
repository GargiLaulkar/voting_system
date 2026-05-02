import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

type ToastKind = 'success' | 'error' | 'info';
type ToastItem = { id: number; kind: ToastKind; message: string };
type ToastContextValue = { showToast: (kind: ToastKind, message: string) => void };

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((kind: ToastKind, message: string) => {
    const id = Date.now() + Math.random();
    setToasts((items) => [...items, { id, kind, message }]);
    window.setTimeout(() => setToasts((items) => items.filter((item) => item.id !== id)), 4000);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-20 z-[60] flex w-[min(92vw,360px)] flex-col gap-3" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-lg border bg-white px-4 py-3 text-sm font-semibold shadow-card ${
              toast.kind === 'success' ? 'border-green-200 text-civic-success' : toast.kind === 'error' ? 'border-red-200 text-red-700' : 'border-blue-200 text-civic-accent'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used inside ToastProvider');
  return context;
}
