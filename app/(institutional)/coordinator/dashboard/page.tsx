import { DashboardCard } from '@/src/components/DashboardCard';
import { PageHeader } from '@/src/components/PageHeader';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { getCoordinatorDashboardSummary } from '@/src/modules/institutional/read-models';

export default async function CoordinatorDashboardPage() {
  const ctx = await getDemoContextFromRequest();
  const data = ctx.role === 'COORDINATOR' ? await getCoordinatorDashboardSummary(ctx) : null;
  return <div className='space-y-6'>
    <PageHeader sectionLabel='Coordinator dashboard' title='Review area' subtitle='Review queue actions are active for assigned submissions in Phase 3B.' />
    {data && <div className='grid gap-4 md:grid-cols-2'>
      <DashboardCard title='Assigned mobility records' description={`${data.assignedCount} assigned records`} status='Current scope' />
      <DashboardCard title='Review queue preview' description={`${data.reviewQueue.length} submissions pending review`} status='Open /coordinator/review-queue' />
      <DashboardCard title='Deadline risk' description={`Overdue: ${data.deadlines.filter(d=>d.state==='OVERDUE').length} · Due soon: ${data.deadlines.filter(d=>d.state==='UPCOMING').length}`} status='Monitor' />
      <DashboardCard title='Exception preview' description={`${data.exceptions.length} awaiting decision`} status='Awaiting decision' />
    </div>}
  </div>;
}
