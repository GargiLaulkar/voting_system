import type { ReactNode } from 'react';

type StatCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  trend?: string;
};

export function StatCard({ icon, label, value, trend }: StatCardProps) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-card ring-1 ring-slate-200/80">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-600">{label}</p>
          <p className="mt-2 text-3xl font-bold text-civic-primary" aria-live="polite">{value}</p>
          {trend && <p className="mt-2 text-sm font-semibold text-civic-success">{trend}</p>}
        </div>
        <div className="rounded-lg bg-blue-50 p-3 text-civic-accent" aria-hidden="true">{icon}</div>
      </div>
    </div>
  );
}
