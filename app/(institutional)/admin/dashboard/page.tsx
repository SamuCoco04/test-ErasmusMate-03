import { DashboardCard } from '@/src/components/DashboardCard';
import { PageHeader, PageShell } from '@/src/components/layout/page-shell';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { getAdminInstitutionalOverview } from '@/src/modules/institutional/read-models';

export default async function AdminDashboardPage() {
  const ctx = await getDemoContextFromRequest();
  const data = ctx.role === 'ADMIN' ? await getAdminInstitutionalOverview(ctx) : null;
  return <PageShell>
    <PageHeader sectionLabel='Admin dashboard' title='Institutional overview' subtitle='Institutional totals are backend-backed in Phase 3A. Social moderation and map workflows are not implemented in this phase.' />
    {data && <div className='grid gap-4 md:grid-cols-2'>
      <DashboardCard title='Users' description={`${data.users} seeded users`} status='Institutional data' />
      <DashboardCard title='Mobility records' description={`${data.mobilityRecords} active records`} status='Institutional data' />
      <DashboardCard title='Procedure submissions' description={`${data.submissions} total submissions`} status='Read only' />
      <DashboardCard title='Exception requests' description={`${data.exceptions} total requests`} status='Read only' />
    </div>}
  </PageShell>;
}
