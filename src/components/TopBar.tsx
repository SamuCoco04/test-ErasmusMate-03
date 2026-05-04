import { StatusBadge } from '@/src/components/Badge';

export function TopBar({ areaName }: { areaName: string }) {
  return (
    <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-card">
      <p className="text-sm font-medium text-slate-700">{areaName}</p>
      <StatusBadge tone="pending">Demo mode setup pending</StatusBadge>
    </div>
  );
}
