import { getDemoContextFromRequest, resolveRoleLabel } from '@/src/modules/shared/demo-context';
import { ButtonLink } from '@/src/components/Button';
import { DashboardCard } from '@/src/components/DashboardCard';
import { EmptyState } from '@/src/components/States';
import { PageHeader } from '@/src/components/PageHeader';

export default async function SocialStudentDashboardPage() {
    const demoContext = await getDemoContextFromRequest();

  return (
    <div className="space-y-6">
      <PageHeader
        sectionLabel="Social support"
        title="Student community area"
        subtitle={`Demo user: ${demoContext.userId} (${resolveRoleLabel(demoContext.role)}). Social workflows are coming in a later phase.`}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <DashboardCard title="Discover students" description="Search, filters, and profile cards are planned for next phase." status="Pending setup" />
        <DashboardCard title="Messages and connections" description="Accepted-only messaging is not active yet." status="Pending setup" />
      </div>
      <EmptyState description="Social page stays student-scoped in demo mode. Social workflows are pending." />
      <ButtonLink href="/student/dashboard" variant="secondary">Back to official mobility area</ButtonLink>
    </div>
  );
}
