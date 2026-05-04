import { DashboardCard } from '@/src/components/DashboardCard';
import { PageHeader } from '@/src/components/PageHeader';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { getStudentDashboardSummary } from '@/src/modules/institutional/read-models';

export default async function StudentDashboardPage() {
  const ctx = await getDemoContextFromRequest();
  const data = ctx.role === 'STUDENT' ? await getStudentDashboardSummary(ctx) : null;
  return <div className='space-y-6'>
    <PageHeader sectionLabel='Student dashboard' title='Official mobility workspace' subtitle='Read-only backend data is available in Phase 3A. Submission actions are coming in Phase 3B/3C.' />
    {data && <div className='grid gap-4 md:grid-cols-2'>
      <DashboardCard title='Current Erasmus stay' description={`${data.record?.homeInstitutionId} → ${data.record?.hostInstitution.name} (${data.record?.mobilityStatus})`} status='Active record' />
      <DashboardCard title='Procedure summary' description={`Draft: ${data.submissions.filter(s=>s.state==='DRAFT').length} · Pending review: ${data.submissions.filter(s=>s.state==='SUBMITTED').length} · Approved: ${data.submissions.filter(s=>s.state==='APPROVED').length} · Needs correction: ${data.submissions.filter(s=>s.state==='REJECTED').length}`} status='Read only' />
      <DashboardCard title='Deadline summary' description={`Due soon: ${data.deadlines.filter(d=>d.state==='UPCOMING').length} · Overdue: ${data.deadlines.filter(d=>d.state==='OVERDUE').length} · Fulfilled: ${data.deadlines.filter(d=>d.state==='FULFILLED').length}`} status='Track now' />
      <DashboardCard title='Exception requests' description={`Awaiting decision: ${data.exceptions.filter(e=>['PENDING','UNDER_REVIEW'].includes(e.state)).length}`} status='Read only' />
    </div>}
  </div>;
}
