import { getDemoContextFromRequest, resolveRoleLabel } from '@/src/modules/shared/demo-context';
import { DashboardCard } from '@/src/components/DashboardCard';
import { LoadingState } from '@/src/components/States';
import { PageHeader } from '@/src/components/PageHeader';

export default async function CoordinatorDashboardPage() {
    const demoContext = await getDemoContextFromRequest();

  return (
    <div className="space-y-6">
      <PageHeader
        sectionLabel="Coordinator dashboard"
        title="Review area"
        subtitle={`Demo user: ${demoContext.userId} (${resolveRoleLabel(demoContext.role)}). Queue and decision flows are planned for a later phase.`}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <DashboardCard title="Pending reviews" description="Submission and Learning Agreement decisions will be available soon." status="Pending setup" />
        <DashboardCard title="Deadline watch" description="Urgency cards and reminders are planned for the next phase." status="Pending setup" />
      </div>
      <LoadingState description="Coordinator context is loaded from demo mode. Review data is not connected yet." />
    </div>
  );
}
