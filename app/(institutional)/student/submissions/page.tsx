import Link from 'next/link';
import { PageHeader } from '@/src/components/PageHeader';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { listSubmissionsForStudent } from '@/src/modules/institutional/submissions';
import { getSubmissionStatusLabel } from '@/src/modules/institutional/status-labels';

export default async function StudentSubmissionsPage() {
  const ctx = await getDemoContextFromRequest();
  const items = ctx.role === 'STUDENT' ? await listSubmissionsForStudent(ctx) : [];
  return <div className='space-y-6'>
    <PageHeader sectionLabel='Student tasks' title='Submission requests' subtitle='Upload files is still pending. In this phase you can manage request states and reviews.' />
    <div className='rounded-xl border bg-white p-4'>
      <p className='mb-3 text-sm text-slate-600'>You can send draft requests for review and resend requests that need correction.</p>
      <ul className='space-y-2 text-sm'>
        {items.map((s) => <li key={s.id} className='rounded border p-3'>
          <div className='font-medium'>{s.procedure.title}</div>
          <div>Status: {getSubmissionStatusLabel(s.state)}</div>
          {s.reviewerNotes && <div>Coordinator notes: {s.reviewerNotes}</div>}
        </li>)}
      </ul>
      <div className='mt-3'><Link href='/student/dashboard' className='text-sm text-blue-700 underline'>Back to dashboard</Link></div>
    </div>
  </div>;
}
