import { PageHeader } from '@/src/components/PageHeader';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { listReviewQueueForCoordinator } from '@/src/modules/institutional/submissions';

export default async function CoordinatorReviewQueuePage() {
  const ctx = await getDemoContextFromRequest();
  const items = ctx.role === 'COORDINATOR' ? await listReviewQueueForCoordinator(ctx) : [];
  return <div className='space-y-6'>
    <PageHeader sectionLabel='Coordinator review queue' title='Submission decisions' subtitle='Start review, approve, reject with rationale, or reopen when needed.' />
    <div className='rounded-xl border bg-white p-4'>
      <ul className='space-y-2 text-sm'>
        {items.map((s) => <li key={s.id} className='rounded border p-3'>
          <div className='font-medium'>{s.procedure.title}</div>
          <div>State: {s.state}</div>
          {s.reviewerNotes && <div>Latest rationale: {s.reviewerNotes}</div>}
        </li>)}
      </ul>
    </div>
  </div>;
}
