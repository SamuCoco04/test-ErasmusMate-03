import { Card } from '@/src/components/Card';
import { StatusBadge } from '@/src/components/Badge';

export function DashboardCard({ title, description, status }: { title: string; description: string; status: string }) {
  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-semibold text-ink">{title}</h2>
        <StatusBadge tone="pending">{status}</StatusBadge>
      </div>
      <p className="text-sm text-muted">{description}</p>
    </Card>
  );
}
