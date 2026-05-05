import { PageHeader } from '@/src/components/PageHeader';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { listReviewQueueForCoordinator } from '@/src/modules/institutional/submissions';
import { listAttachments } from '@/src/modules/institutional/attachments';
import { getSubmissionStatusLabel } from '@/src/modules/institutional/status-labels';

export default async function CoordinatorReviewQueuePage() {
  const ctx = await getDemoContextFromRequest();
  const items = ctx.role === 'COORDINATOR' ? await listReviewQueueForCoordinator(ctx) : [];
  const attachmentsBySubmission = new Map<string, Awaited<ReturnType<typeof listAttachments>>>();
  if (ctx.role === 'COORDINATOR') {
    for (const item of items) attachmentsBySubmission.set(item.id, await listAttachments(ctx, item.id));
  }
  return <div className='space-y-6'>
    <PageHeader sectionLabel='Review queue' title='Coordinator tasks' subtitle='Start review and complete decisions for assigned student requests.' />
    <div className='rounded-xl border bg-white p-4'>
      <ul className='space-y-2 text-sm'>
        {items.map((s) => <li key={s.id} className='rounded border p-3'>
          <div className='font-medium'>{s.procedure.title}</div>
          <div>Status: {getSubmissionStatusLabel(s.state)}</div>
          {s.reviewerNotes && <div>Latest rationale: {s.reviewerNotes}</div>}
          <div className='mt-2 text-xs text-slate-600'>Attachments ({attachmentsBySubmission.get(s.id)?.length ?? 0})</div>
          <ul className='list-disc pl-5 text-xs'>
            {(attachmentsBySubmission.get(s.id) ?? []).map((a) => <li key={a.id}>{a.fileName} · {a.mimeType} · {a.sizeBytes} bytes · v{a.version}</li>)}
          </ul>
        </li>)}
      </ul>
    </div>
  </div>;
}
