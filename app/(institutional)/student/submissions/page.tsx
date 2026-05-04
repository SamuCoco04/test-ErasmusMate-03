import Link from 'next/link';
import { PageHeader } from '@/src/components/PageHeader';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { listSubmissionsForStudent } from '@/src/modules/institutional/submissions';

export default async function StudentSubmissionsPage() {
  const ctx = await getDemoContextFromRequest();
  const items = ctx.role === 'STUDENT' ? await listSubmissionsForStudent(ctx) : [];
  return <div className='space-y-6'>
    <PageHeader sectionLabel='Student submissions' title='Document metadata workflow' subtitle='File upload will be connected in a later phase. Deadline and exception handling continue in Phase 3C.' />
    <div className='rounded-xl border bg-white p-4'>
      <p className='mb-3 text-sm text-slate-600'>Actions: Submit draft items or resubmit items that need correction.</p>
      <ul className='space-y-2 text-sm'>
        {items.map((s) => <li key={s.id} className='rounded border p-3'>
          <div className='font-medium'>{s.procedure.title}</div>
          <div>State: {s.state}</div>
          {s.reviewerNotes && <div>Latest note: {s.reviewerNotes}</div>}
        </li>)}
      </ul>
      <div className='mt-3'><Link href='/student/dashboard' className='text-sm text-blue-700 underline'>Back to dashboard</Link></div>
    </div>
  </div>;
}
