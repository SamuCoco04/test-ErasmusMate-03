import { PageHeader } from '@/src/components/PageHeader';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { listDeadlinesForCoordinator } from '@/src/modules/institutional/deadlines';

export default async function Page({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const params: Record<string, string | string[] | undefined> = await (searchParams ?? Promise.resolve({} as Record<string, string | string[] | undefined>));
  const risk = typeof params.risk === 'string' ? params.risk : 'all';
  const ctx = await getDemoContextFromRequest();
  const all = ctx.role === 'COORDINATOR' ? await listDeadlinesForCoordinator(ctx) : [];
  const data = all.filter((d) => {
    if (risk === 'all') return true;
    if (risk === 'overdue') return d.effectiveState === 'OVERDUE';
    if (risk === 'due-soon') return d.reminderLabel === 'Due soon';
    if (risk === 'overridden') return d.overrideDueDate !== null;
    if (risk === 'fulfilled') return d.effectiveState === 'FULFILLED';
    return true;
  }).sort((a, b) => (a.effectiveState === 'OVERDUE' ? 0 : 1) - (b.effectiveState === 'OVERDUE' ? 0 : 1) || a.effectiveDueDate.getTime() - b.effectiveDueDate.getTime());
  return <div className='space-y-6'><PageHeader sectionLabel='Coordinator deadlines' title='Deadline risk overview' subtitle='Track due soon, overdue, extended, and completed tasks.'/>
    <div className='rounded-xl border bg-white p-4 text-sm flex gap-2 flex-wrap'><span>Filters:</span>
      {['all','overdue','due-soon','overridden','fulfilled'].map((f) => <a key={f} href={`/coordinator/deadlines?risk=${f}`} className={`rounded border px-2 py-1 ${risk===f?'bg-slate-100':''}`}>{f==='overdue' ? 'Overdue first' : f.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</a>)}
      <a href='/api/institutional/deadlines/export' className='ml-auto rounded bg-slate-900 px-3 py-1 text-white'>Export calendar</a></div>
    {data.length===0 ? <div className='rounded-xl border bg-white p-6 text-sm text-slate-600'>No assigned deadlines for this filter.</div> : null}
    <div className='rounded-xl border bg-white p-4 space-y-2 text-sm'>{data.map((d) => <div key={d.id} className='rounded border p-3'><div className='font-medium'>{d.title} {d.overrideDueDate ? <span className='ml-2 rounded bg-amber-100 px-2 py-0.5 text-xs'>Overridden</span> : null}</div><div>Student: {d.mobilityStudentName ?? 'Unknown'}</div><div>Effective due date: {d.effectiveDueDate.toISOString().slice(0, 10)}</div><div>Original due date: {d.overrideDueDate ? d.dueDate.toISOString().slice(0, 10) : 'Same as effective due date'}</div><div>Risk: {d.reminderLabel}</div><div>Procedure: {d.relatedProcedureTitle ?? 'N/A'}</div><div>Exception related: {d.hasActiveExceptionRequest ? 'Yes' : 'No'}</div></div>)}</div></div>;
}
