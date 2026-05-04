import { getDemoContextFromRequest, resolveRoleLabel } from '@/src/modules/shared/demo-context';
import { DashboardCard } from '@/src/components/DashboardCard';
import { ErrorState } from '@/src/components/States';
import { PageHeader } from '@/src/components/PageHeader';

export default async function AdminDashboardPage() {
    const demoContext = await getDemoContextFromRequest();

  return (
    <div className="space-y-6">
      <PageHeader
        sectionLabel="Admin dashboard"
        title="Institutional oversight"
        subtitle={`Demo user: ${demoContext.userId} (${resolveRoleLabel(demoContext.role)}). Admin workflows are placeholders in this phase.`}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <DashboardCard title="Moderation overview" description="Report handling and actions will be wired in a later phase." status="Pending setup" />
        <DashboardCard title="System updates" description="Operational summaries will be added with backend support." status="Pending setup" />
      </div>
      <ErrorState description="Admin context is loaded from demo mode. Governance workflows are still pending." />
    </div>
  );
}
