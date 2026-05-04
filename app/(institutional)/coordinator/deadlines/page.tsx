import { PageHeader } from '@/src/components/PageHeader';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { getDeadlineSummary } from '@/src/modules/institutional/deadlines';

export default async function Page(){const ctx=await getDemoContextFromRequest(); const data=ctx.role==='COORDINATOR'?await getDeadlineSummary(ctx):{counts:{upcoming:0,overdue:0,fulfilled:0,overridden:0},items:[]};
return <div className='space-y-6'><PageHeader sectionLabel='Coordinator deadlines' title='Deadline risk overview' subtitle='Track due soon, overdue, extended, and completed tasks.'/><div className='rounded-xl border bg-white p-4 text-sm'>Overdue: {data.counts.overdue} · Due soon: {data.counts.upcoming} · Extended: {data.counts.overridden} · Completed: {data.counts.fulfilled}</div></div>}
