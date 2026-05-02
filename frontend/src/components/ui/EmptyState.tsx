import type { ReactNode } from 'react';

type EmptyStateProps = {
  title: string;
  message: string;
  action?: ReactNode;
};

export function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="rounded-xl bg-white px-6 py-12 text-center shadow-card ring-1 ring-slate-200">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-civic-accent" aria-hidden="true">
        <svg className="h-9 w-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Z" />
          <path d="M8 9h8M8 13h5" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-civic-primary">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-slate-600">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
