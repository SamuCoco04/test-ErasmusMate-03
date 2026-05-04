import { DashboardCard } from '@/src/components/DashboardCard';
import { LoadingState } from '@/src/components/States';
import { PageHeader } from '@/src/components/PageHeader';

export default function CoordinatorDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        sectionLabel="Coordinator dashboard"
        title="Review area"
        subtitle="Queue and decision flows are planned and will be implemented in a later phase."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <DashboardCard title="Pending reviews" description="Submission and Learning Agreement decisions will be available soon." status="Pending setup" />
        <DashboardCard title="Deadline watch" description="Urgency cards and reminders are planned for the next phase." status="Pending setup" />
      </div>
      <LoadingState description="Coordinator data panels are not connected yet." />
    </div>
  );
}
