import { DashboardCard } from '@/src/components/DashboardCard';
import { ErrorState } from '@/src/components/States';
import { PageHeader } from '@/src/components/PageHeader';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        sectionLabel="Admin dashboard"
        title="Institutional oversight"
        subtitle="Administrative workflows are intentionally shown as placeholders during this phase."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <DashboardCard title="Moderation overview" description="Report handling and actions will be wired in a later phase." status="Pending setup" />
        <DashboardCard title="System updates" description="Operational summaries will be added with backend support." status="Pending setup" />
      </div>
      <ErrorState description="No admin data is loaded yet because backend workflows are still pending." />
    </div>
  );
}
