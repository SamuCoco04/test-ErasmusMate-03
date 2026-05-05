import { PageHeader } from '@/src/components/PageHeader';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { listDeadlinesForCoordinator } from '@/src/modules/institutional/deadlines';

export default async function Page({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }){
  const params: Record<string, string | string[] | undefined> = await (searchParams ?? Promise.resolve({} as Record<string, string | string[] | undefined>));
  const student = typeof params.student==='string'?params.student:'';
  const state = typeof params.state==='string'?params.state:'';
  const risk = typeof params.risk==='string'?params.risk:'';
  const procedure = typeof params.procedure==='string'?params.procedure:'';
  const ctx=await getDemoContextFromRequest();
  const all=ctx.role==='COORDINATOR'?await listDeadlinesForCoordinator(ctx):[];
  const data=all.filter((d)=> !student || (d.mobilityStudentName??'').toLowerCase().includes(student.toLowerCase()))
    .filter((d)=> !state || d.effectiveState===state)
    .filter((d)=> !risk || (risk==='overdue'?d.effectiveState==='OVERDUE':d.effectiveState!=='OVERDUE'))
    .filter((d)=> !procedure || (d.relatedProcedureTitle??'').toLowerCase().includes(procedure.toLowerCase()))
    .sort((a,b)=> (a.effectiveState==='OVERDUE'?0:1)-(b.effectiveState==='OVERDUE'?0:1) || a.effectiveDueDate.getTime()-b.effectiveDueDate.getTime());
return <div className='space-y-6'><PageHeader sectionLabel='Coordinator deadlines' title='Deadline risk overview' subtitle='Track due soon, overdue, extended, and completed tasks.'/>
<div className='rounded-xl border bg-white p-4 text-sm flex gap-2 flex-wrap'><span>Filters:</span><a href='/coordinator/deadlines?risk=overdue' className='rounded border px-2 py-1'>Overdue first</a><a href='/api/institutional/deadlines/export' className='ml-auto rounded bg-slate-900 px-3 py-1 text-white'>Export calendar</a></div>
<div className='rounded-xl border bg-white p-4 space-y-2 text-sm'>{data.map((d)=><div key={d.id} className='rounded border p-3'><div className='font-medium'>{d.title} {d.overrideDueDate ? <span className='ml-2 rounded bg-amber-100 px-2 py-0.5 text-xs'>Overridden</span> : null}</div><div>Student: {d.mobilityStudentName ?? 'Unknown'}</div><div>Effective due date: {d.effectiveDueDate.toISOString().slice(0,10)}</div><div>State: {d.effectiveState}</div><div>Procedure: {d.relatedProcedureTitle ?? 'N/A'}</div><div>Exception related: {d.hasActiveExceptionRequest ? 'Yes' : 'No'}</div></div>)}</div></div>}
