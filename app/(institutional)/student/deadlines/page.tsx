import { PageHeader } from '@/src/components/PageHeader';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { listDeadlinesForStudent } from '@/src/modules/institutional/deadlines';
import { getDeadlineStatusLabel } from '@/src/modules/institutional/status-labels';

export default async function Page(){
  const ctx = await getDemoContextFromRequest();
  const items = ctx.role==='STUDENT' ? await listDeadlinesForStudent(ctx) : [];
  return <div className='space-y-6'><PageHeader sectionLabel='Student deadlines' title='Your deadlines' subtitle='Due soon, overdue, extended, and completed tasks.'/>
  <div className='rounded-xl border bg-white p-4 space-y-2'>{items.map((d)=> <div key={d.id} className='rounded border p-3 text-sm'><div className='font-medium'>{d.title}</div><div>Due date: {d.dueDate.toISOString().slice(0,10)}</div><div>Effective due date: {(d.overrideDueDate ?? d.dueDate).toISOString().slice(0,10)}</div><div>Status: {getDeadlineStatusLabel(d.effectiveState)}</div></div>)}</div></div>;
}
