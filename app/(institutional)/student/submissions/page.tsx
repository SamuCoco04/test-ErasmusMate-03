import Link from 'next/link';
import { PageHeader } from '@/src/components/PageHeader';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { listSubmissionsForStudent } from '@/src/modules/institutional/submissions';
import { listAttachments } from '@/src/modules/institutional/attachments';
import { getSubmissionStatusLabel } from '@/src/modules/institutional/status-labels';

export default async function StudentSubmissionsPage() {
  const ctx = await getDemoContextFromRequest();
  const items = ctx.role === 'STUDENT' ? await listSubmissionsForStudent(ctx) : [];
  const attachmentsBySubmission = new Map<string, Awaited<ReturnType<typeof listAttachments>>>();
  if (ctx.role === 'STUDENT') {
    for (const item of items) attachmentsBySubmission.set(item.id, await listAttachments(ctx, item.id));
  }
  return <div className='space-y-6'>
    <PageHeader sectionLabel='Student tasks' title='Submission requests' subtitle='Upload files is still pending. In this phase you can manage request states and reviews.' />
    <div className='rounded-xl border bg-white p-4'>
      <p className='mb-3 text-sm text-slate-600'>You can send draft requests for review and resend requests that need correction.</p>
      <ul className='space-y-2 text-sm'>
        {items.map((s) => <li key={s.id} className='rounded border p-3'>
          <div className='font-medium'>{s.procedure.title}</div>
          <div>Status: {getSubmissionStatusLabel(s.state)}</div>
          {s.reviewerNotes && <div>Coordinator notes: {s.reviewerNotes}</div>}
          <div className='mt-2 text-xs text-slate-600'>Attachments ({attachmentsBySubmission.get(s.id)?.length ?? 0})</div>
          <ul className='list-disc pl-5 text-xs'>
            {(attachmentsBySubmission.get(s.id) ?? []).map((a) => <li key={a.id}>{a.fileName} · {a.mimeType} · {a.sizeBytes} bytes · {a.status}</li>)}
          </ul>
          {!['DRAFT','REJECTED','REOPENED'].includes(s.state) && <div className='mt-2 text-xs text-amber-700'>Attachments are locked in this status.</div>}
        </li>)}
      </ul>
      <div className='mt-3'><Link href='/student/dashboard' className='text-sm text-blue-700 underline'>Back to dashboard</Link></div>
    </div>
  </div>;
}
