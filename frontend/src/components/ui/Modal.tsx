import { useEffect, useRef, type ReactNode } from 'react';
import { Button } from './Button';

type ModalProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function Modal({ open, title, children, onClose }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    panel?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab' && panel) {
        const focusables = panel.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      previous?.focus();
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-civic-primary/35 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div ref={panelRef} tabIndex={-1} className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 id="modal-title" className="text-xl font-bold text-civic-primary">{title}</h2>
          <Button variant="ghost" onClick={onClose} aria-label="Close modal">×</Button>
        </div>
        {children}
      </div>
    </div>
  );
}
