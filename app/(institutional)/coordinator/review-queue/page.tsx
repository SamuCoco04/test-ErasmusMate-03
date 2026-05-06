import { PageHeader } from '@/src/components/PageHeader';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { listReviewQueueForCoordinator } from '@/src/modules/institutional/submissions';
import { listAttachments } from '@/src/modules/institutional/attachments';
import { CoordinatorReviewQueueClient } from '@/src/components/institutional/coordinator-review-queue-client';

export default async function CoordinatorReviewQueuePage() {
  const ctx = await getDemoContextFromRequest();
  const items = ctx.role === 'COORDINATOR' ? await listReviewQueueForCoordinator(ctx) : [];
  const attachmentsBySubmission = new Map<string, Awaited<ReturnType<typeof listAttachments>>>();
  if (ctx.role === 'COORDINATOR') {
    for (const item of items) attachmentsBySubmission.set(item.id, await listAttachments(ctx, item.id));
  }
  return <div className='space-y-6'>
    <PageHeader sectionLabel='Review queue' title='Review queue' subtitle='Start review and complete decisions for assigned student requests.' />
    <div className='rounded-xl border bg-white p-4'>
      <CoordinatorReviewQueueClient initialItems={items.map((s) => ({ id: s.id, title: s.procedure.title, state: s.state, reviewerNotes: s.reviewerNotes, attachments: (attachmentsBySubmission.get(s.id) ?? []).map((a) => ({ id: a.id, fileName: a.fileName, mimeType: a.mimeType, sizeBytes: a.sizeBytes, version: a.version, hasStoredContent: a.hasStoredContent })) }))} />
    </div>
  </div>;
}
