import type { ElectionStatus } from '../../lib/mockData';

type BadgeProps = {
  status: ElectionStatus | 'Eligible' | 'Not Registered' | 'Already Voted' | 'Operational';
};

const styles: Record<BadgeProps['status'], string> = {
  Active: 'bg-green-50 text-civic-success ring-green-200',
  Draft: 'bg-amber-50 text-civic-warning ring-amber-200',
  Closed: 'bg-slate-100 text-slate-700 ring-slate-200',
  Live: 'bg-blue-50 text-civic-accent ring-blue-200 animate-pulse',
  Eligible: 'bg-green-50 text-civic-success ring-green-200',
  'Not Registered': 'bg-amber-50 text-civic-warning ring-amber-200',
  'Already Voted': 'bg-slate-100 text-slate-700 ring-slate-200',
  Operational: 'bg-green-50 text-civic-success ring-green-200',
};

export function Badge({ status }: BadgeProps) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${styles[status]}`}>{status}</span>;
}
