import { DashboardCard } from '@/src/components/DashboardCard';
import { EmptyState } from '@/src/components/States';
import { PageHeader } from '@/src/components/PageHeader';

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        sectionLabel="Student dashboard"
        title="Official mobility workspace"
        subtitle="This dashboard layout is ready. Workflow setup is coming in a later phase."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <DashboardCard title="Document submissions" description="Upload and review steps will be connected in a later phase." status="Pending setup" />
        <DashboardCard title="Learning Agreement" description="Course table and coordinator feedback will appear in the next phase." status="Pending setup" />
      </div>
      <EmptyState description="Demo mode setup is pending, so student context and next tasks are not active yet." />
    </div>
  );
}
