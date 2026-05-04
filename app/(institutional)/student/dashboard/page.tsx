import { getDemoContextFromRequest, resolveRoleLabel } from '@/src/modules/shared/demo-context';
import { DashboardCard } from '@/src/components/DashboardCard';
import { EmptyState } from '@/src/components/States';
import { PageHeader } from '@/src/components/PageHeader';

export default async function StudentDashboardPage() {
    const demoContext = await getDemoContextFromRequest();

  return (
    <div className="space-y-6">
      <PageHeader
        sectionLabel="Student dashboard"
        title="Official mobility workspace"
        subtitle={`Demo user: ${demoContext.userId} (${resolveRoleLabel(demoContext.role)}). Workflow setup is coming in a later phase.`}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <DashboardCard title="Document submissions" description="Upload and review steps will be connected in a later phase." status="Pending setup" />
        <DashboardCard title="Learning Agreement" description="Course table and coordinator feedback will appear in the next phase." status="Pending setup" />
      </div>
      <EmptyState description="Student context is loaded from demo mode. Institutional workflows are still pending." />
    </div>
  );
}
