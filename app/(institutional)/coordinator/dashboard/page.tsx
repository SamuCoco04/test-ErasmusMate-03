import Link from 'next/link';
import { DashboardCard } from '@/src/components/DashboardCard';
import { PageHeader } from '@/src/components/PageHeader';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { getCoordinatorDashboardSummary } from '@/src/modules/institutional/read-models';

export default async function CoordinatorDashboardPage() {
  const ctx = await getDemoContextFromRequest();
  const data = ctx.role === 'COORDINATOR' ? await getCoordinatorDashboardSummary(ctx) : null;
  return <div className='space-y-6'>
    <PageHeader sectionLabel='Coordinator dashboard' title='Review area' subtitle='Review institutional items and Learning Agreements assigned to you.' />
    {data && <>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <DashboardCard title='Assigned students' description={`${data.assignedCount} assigned mobility records`} status='Coordinator scope only' />
        <DashboardCard title='Pending review' description={`${data.pendingReviewCount} submissions waiting`} status='Open review queue' />
        <DashboardCard title='In review' description={`${data.inReviewCount} submissions in progress`} status='Track current decisions' />
        <DashboardCard title='Needs correction' description={`${data.needsCorrectionCount} submissions rejected`} status='Student resubmission needed' />
        <DashboardCard title='Overdue deadlines' description={`${data.overdueDeadlineCount} overdue institutional deadlines`} status='Open deadline management' />
        <DashboardCard title='Pending exceptions' description={`${data.pendingExceptionCount} requests needing decision`} status='Open exceptions queue' />
      </div>

      <div className='flex gap-3'>
        <Link href='/coordinator/learning-agreement-review' className='inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50'>
          Review Learning Agreements
        </Link>
      </div>

      <section className='space-y-3'>
        <h2 className='text-lg font-semibold'>Assigned student workload</h2>
        {data.workload.length === 0 ? (
          <p className='rounded-xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600'>No assigned mobility records yet. Once students are assigned, their submission and deadline workload will appear here.</p>
        ) : (
          <div className='space-y-3'>
            {data.workload.map((item) => <article key={item.mobilityRecordId} className='rounded-xl border border-slate-200 bg-white p-4'>
              <div className='flex flex-wrap items-center justify-between gap-2'>
                <h3 className='font-semibold text-slate-900'>{item.studentLabel}</h3>
                <span className={`rounded-full px-2 py-1 text-xs font-semibold ${item.riskLevel === 'HIGH' ? 'bg-rose-100 text-rose-700' : item.riskLevel === 'MEDIUM' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>Risk: {item.riskLevel}</span>
              </div>
              <p className='mt-1 text-sm text-slate-700'>Mobility status: {item.mobilityStatus}</p>
              <p className='mt-1 text-sm text-slate-700'>Submissions — Submitted: {item.submissionCounts.submitted}, In review: {item.submissionCounts.inReview}, Needs correction: {item.submissionCounts.rejected}</p>
              <p className='mt-1 text-sm text-slate-700'>Nearest deadline: {item.nearestDeadline ? item.nearestDeadline.dueDate.toLocaleDateString() : 'No deadlines set'}</p>
              <p className='mt-1 text-sm text-slate-700'>Pending exception: {item.hasPendingException ? 'Yes' : 'No'}</p>
            </article>)}
          </div>
        )}
      </section>
    </>}
  </div>;
}
