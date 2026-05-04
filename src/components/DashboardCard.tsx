import { Card } from '@/src/components/Card';
import { StatusBadge } from '@/src/components/Badge';
import type { ReactNode } from 'react';

export function DashboardCard({ title, description, status, action }: { title: string; description: string; status: string; action?: ReactNode }) {
  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-semibold text-ink">{title}</h2>
        <StatusBadge tone="pending">{status}</StatusBadge>
      </div>
      <p className="text-sm text-muted">{description}</p>
      {action ? <div className="pt-2">{action}</div> : null}
    </Card>
  );
}
