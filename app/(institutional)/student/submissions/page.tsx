import Link from 'next/link';
import { PageHeader } from '@/src/components/PageHeader';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { listSubmissionsForStudent } from '@/src/modules/institutional/submissions';
import { listAttachments } from '@/src/modules/institutional/attachments';
import { prisma } from '@/src/lib/prisma';
import { StudentSubmissionsClient } from '@/src/components/institutional/student-submissions-client';

export default async function StudentSubmissionsPage() {
  const ctx = await getDemoContextFromRequest();
  const items = ctx.role === 'STUDENT' ? await listSubmissionsForStudent(ctx) : [];
  const attachmentsBySubmission = new Map<string, Awaited<ReturnType<typeof listAttachments>>>();
  if (ctx.role === 'STUDENT') {
    for (const item of items) attachmentsBySubmission.set(item.id, await listAttachments(ctx, item.id));
  }
  const procedures = await prisma.procedureDefinition.findMany({ orderBy: { sortOrder: 'asc' } });
  return <div className='space-y-6'>
    <PageHeader sectionLabel='Student tasks' title='Submission requests' subtitle='Upload real files and send requests for coordinator review.' />
    <div className='rounded-xl border bg-white p-4'>
      <p className='mb-3 text-sm text-slate-600'>Choose a procedure, upload a file, and submit when ready.</p>
      <StudentSubmissionsClient
        initialSubmissions={items.map((s) => ({ id: s.id, procedureTitle: s.procedure.title, state: s.state, reviewerNotes: s.reviewerNotes, attachments: (attachmentsBySubmission.get(s.id) ?? []).map((a) => ({ id: a.id, fileName: a.fileName, status: a.status })), hasActiveAttachment: (attachmentsBySubmission.get(s.id) ?? []).some((a) => a.status === 'ACTIVE') }))}
        procedureOptions={procedures.map((p) => ({ id: p.id, title: p.title }))}
      />
      <div className='mt-3'><Link href='/student/dashboard' className='text-sm text-blue-700 underline'>Back to dashboard</Link></div>
    </div>
  </div>;
}
