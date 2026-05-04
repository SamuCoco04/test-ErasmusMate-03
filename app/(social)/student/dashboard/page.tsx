import { ButtonLink } from '@/src/components/Button';
import { DashboardCard } from '@/src/components/DashboardCard';
import { EmptyState } from '@/src/components/States';
import { PageHeader } from '@/src/components/PageHeader';

export default function SocialStudentDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        sectionLabel="Social support"
        title="Student community area"
        subtitle="This area stays secondary to official mobility. Social workflows are coming in a later phase."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <DashboardCard title="Discover students" description="Search, filters, and profile cards are planned for next phase." status="Pending setup" />
        <DashboardCard title="Messages and connections" description="Accepted-only messaging is not active yet." status="Pending setup" />
      </div>
      <EmptyState description="Social features will be connected in a later phase. This layout is a placeholder." />
      <ButtonLink href="/student/dashboard" variant="secondary">Back to official mobility area</ButtonLink>
    </div>
  );
}
