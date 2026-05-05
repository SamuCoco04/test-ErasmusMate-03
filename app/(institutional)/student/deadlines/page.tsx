import { PageHeader } from '@/src/components/PageHeader';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { computeDeadlineBucket, listDeadlinesForStudent } from '@/src/modules/institutional/deadlines';
import { getDeadlineStatusLabel } from '@/src/modules/institutional/status-labels';

export default async function Page({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }){
  const params: Record<string, string | string[] | undefined> = await (searchParams ?? Promise.resolve({} as Record<string, string | string[] | undefined>));
  const filter = typeof params.filter === 'string' ? params.filter : 'all';
  const ctx = await getDemoContextFromRequest();
  const all = ctx.role==='STUDENT' ? await listDeadlinesForStudent(ctx) : [];
  const filtered = all.filter((d)=> filter==='all' ? true : filter==='fulfilled' ? d.effectiveState==='FULFILLED' : filter==='overdue' ? d.effectiveState==='OVERDUE' : filter==='upcoming' ? d.effectiveState==='UPCOMING' : filter==='overridden' ? d.overrideDueDate!==null : true)
    .sort((a,b)=> a.effectiveDueDate.getTime()-b.effectiveDueDate.getTime());
  const groups = { OVERDUE: filtered.filter((d)=>computeDeadlineBucket(d)==='OVERDUE'), THIS_WEEK: filtered.filter((d)=>computeDeadlineBucket(d)==='THIS_WEEK'), THIS_MONTH: filtered.filter((d)=>computeDeadlineBucket(d)==='THIS_MONTH'), LATER: filtered.filter((d)=>computeDeadlineBucket(d)==='LATER') };
  return <div className='space-y-6'><PageHeader sectionLabel='Student deadlines' title='Your deadlines' subtitle='Due soon, overdue, extended, and completed tasks.'/>
    <div className='rounded-xl border bg-white p-4 flex gap-2 text-sm flex-wrap'>
      {['all','upcoming','overdue','fulfilled','overridden'].map((f)=><a key={f} href={`/student/deadlines?filter=${f}`} className={`rounded border px-2 py-1 ${filter===f?'bg-slate-100':''}`}>{f[0].toUpperCase()+f.slice(1)}</a>)}
      <a href='/api/institutional/deadlines/export' className='ml-auto rounded bg-slate-900 px-3 py-1 text-white'>Export calendar</a>
    </div>
    {Object.entries(groups).map(([bucket, items]) => <div key={bucket} className='space-y-2'><h2 className='text-sm font-semibold'>{bucket.replace('_', ' ')}</h2><div className='grid gap-2'>{items.map((d)=> <div key={d.id} className='rounded border p-3 text-sm'><div className='font-medium'>{d.title}</div><div>Due date: {d.dueDate.toISOString().slice(0,10)}</div><div>Effective due date: {d.effectiveDueDate.toISOString().slice(0,10)}</div><div>Status: {getDeadlineStatusLabel(d.effectiveState)}</div><div>Procedure: {d.relatedProcedureTitle ?? 'N/A'}</div><div>Fulfilled: {d.fulfilledAt ? 'Yes' : 'No'}</div><div>Active exception: {d.hasActiveExceptionRequest ? 'Yes' : 'No'}</div></div>)}</div></div>)}
  </div>;
}
