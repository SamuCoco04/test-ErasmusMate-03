import { PageHeader } from '@/src/components/PageHeader';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { computeDeadlineBucket, listDeadlinesForStudent } from '@/src/modules/institutional/deadlines';
import { getDeadlineStatusLabel } from '@/src/modules/institutional/status-labels';

function toIsoDay(value: Date) {
  return value.toISOString().slice(0, 10);
}

function getCalendarMonth(allDates: Date[]) {
  const today = new Date();
  if (allDates.length === 0) {
    return { year: today.getUTCFullYear(), monthIndex: today.getUTCMonth() };
  }

  const monthCounts = new Map<string, number>();
  for (const date of allDates) {
    const key = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;
    monthCounts.set(key, (monthCounts.get(key) ?? 0) + 1);
  }

  let bestKey = '';
  let bestCount = -1;
  for (const [key, count] of monthCounts.entries()) {
    if (count > bestCount) {
      bestCount = count;
      bestKey = key;
    }
  }

  const [year, monthIndex] = bestKey.split('-').map(Number);
  return { year, monthIndex };
}

export default async function Page({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const params: Record<string, string | string[] | undefined> = await (searchParams ?? Promise.resolve({} as Record<string, string | string[] | undefined>));
  const filter = typeof params.filter === 'string' ? params.filter : 'all';
  const selectedDay = typeof params.day === 'string' ? params.day : null;
  const ctx = await getDemoContextFromRequest();
  const all = ctx.role === 'STUDENT' ? await listDeadlinesForStudent(ctx) : [];
  const filtered = all.filter((d) => {
    if (filter === 'all') return true;
    if (filter === 'fulfilled') return d.effectiveState === 'FULFILLED';
    if (filter === 'overdue') return d.effectiveState === 'OVERDUE';
    if (filter === 'due-soon') return d.reminderLabel === 'Due soon';
    if (filter === 'overridden') return d.overrideDueDate !== null;
    return d.effectiveState === 'UPCOMING';
  }).sort((a, b) => a.effectiveDueDate.getTime() - b.effectiveDueDate.getTime());

  const dayFiltered = selectedDay ? filtered.filter((d) => toIsoDay(d.effectiveDueDate) === selectedDay) : filtered;

  const groups = { OVERDUE: dayFiltered.filter((d) => computeDeadlineBucket(d) === 'OVERDUE'), DUE_SOON: dayFiltered.filter((d) => computeDeadlineBucket(d) === 'DUE_SOON'), THIS_MONTH: dayFiltered.filter((d) => computeDeadlineBucket(d) === 'THIS_MONTH'), LATER: dayFiltered.filter((d) => computeDeadlineBucket(d) === 'LATER') };

  const { year, monthIndex } = getCalendarMonth(all.map((d) => d.effectiveDueDate));
  const firstDay = new Date(Date.UTC(year, monthIndex, 1));
  const daysInMonth = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
  const firstWeekday = firstDay.getUTCDay();
  const monthDeadlines = filtered.filter((d) => d.effectiveDueDate.getUTCFullYear() === year && d.effectiveDueDate.getUTCMonth() === monthIndex);
  const byIsoDay = new Map<string, typeof monthDeadlines>();
  for (const item of monthDeadlines) {
    const day = toIsoDay(item.effectiveDueDate);
    const existing = byIsoDay.get(day) ?? [];
    existing.push(item);
    byIsoDay.set(day, existing);
  }

  const calendarCells = Array.from({ length: firstWeekday + daysInMonth }, (_, i) => {
    if (i < firstWeekday) return null;
    const day = i - firstWeekday + 1;
    const isoDay = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return { day, isoDay, items: byIsoDay.get(isoDay) ?? [] };
  });

  const upcomingList = filtered
    .filter((d) => d.effectiveState !== 'FULFILLED')
    .slice(0, 6);

  return <div className='space-y-6'><PageHeader sectionLabel='Student deadlines' title='Your deadlines' subtitle='Due soon, overdue, extended, and completed tasks.'/>
    <div className='rounded-xl border bg-white p-4 flex gap-2 text-sm flex-wrap'>
      {['all','upcoming','due-soon','overdue','fulfilled','overridden'].map((f) => <a key={f} href={`/student/deadlines?filter=${f}`} className={`rounded border px-2 py-1 ${filter===f?'bg-slate-100':''}`}>{f.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</a>)}
      <a href='/api/institutional/deadlines/export' className='ml-auto rounded bg-slate-900 px-3 py-1 text-white'>Export calendar</a>
    </div>

    <div className='rounded-xl border bg-white p-4'>
      <h2 className='text-sm font-semibold'>Deadline calendar (read-only)</h2>
      <p className='text-xs text-slate-600 mb-3'>Select a marked date to focus the list below.</p>
      <div className='grid grid-cols-7 gap-2 text-xs text-slate-500 mb-2'>
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((label) => <div key={label}>{label}</div>)}
      </div>
      <div className='grid grid-cols-7 gap-2 text-sm'>
        {calendarCells.map((cell, index) => cell === null ? <div key={`blank-${index}`} className='h-16 rounded border bg-slate-50' /> : <a key={cell.isoDay} href={`/student/deadlines?filter=${filter}&day=${cell.isoDay}`} className={`h-16 rounded border p-1 ${selectedDay === cell.isoDay ? 'border-slate-900 bg-slate-100' : 'bg-white'}`}>
          <div className='font-medium'>{cell.day}</div>
          {cell.items.length > 0 ? <div className='mt-1 rounded bg-slate-900 px-1 text-[11px] text-white'>{cell.items.length} deadline{cell.items.length > 1 ? 's' : ''}</div> : null}
        </a>)}
      </div>
      {selectedDay ? <div className='mt-3 text-xs text-slate-600'>Showing deadlines for {selectedDay}. <a href={`/student/deadlines?filter=${filter}`} className='underline'>Clear date filter</a></div> : null}
    </div>

    <div className='rounded-xl border bg-white p-4'>
      <h2 className='text-sm font-semibold'>Upcoming deadlines</h2>
      <div className='mt-2 grid gap-2 text-sm'>
        {upcomingList.length === 0 ? <div className='text-slate-600'>No upcoming items right now.</div> : upcomingList.map((d) => <div key={`upcoming-${d.id}`} className='rounded border p-2'><div className='font-medium'>{d.title}</div><div>{toIsoDay(d.effectiveDueDate)} · {d.reminderLabel} · {getDeadlineStatusLabel(d.effectiveState)}</div></div>)}
      </div>
    </div>

    {dayFiltered.length === 0 ? <div className='rounded-xl border bg-white p-6 text-sm text-slate-600'>No deadlines match the current filter.</div> : null}
    {Object.entries(groups).map(([bucket, items]) => items.length > 0 ? <div key={bucket} className='space-y-2'><h2 className='text-sm font-semibold'>{bucket.replace('_', ' ')}</h2><div className='grid gap-2'>{items.map((d) => <div key={d.id} className='rounded border p-3 text-sm'><div className='font-medium'>{d.title}</div><div>Effective due date: {d.effectiveDueDate.toISOString().slice(0, 10)}</div><div>Original due date: {d.overrideDueDate ? d.dueDate.toISOString().slice(0, 10) : 'Same as effective due date'}</div><div>State: {getDeadlineStatusLabel(d.effectiveState)}</div><div>Reminder: {d.reminderLabel}</div><div>Procedure: {d.relatedProcedureTitle ?? 'N/A'}</div></div>)}</div></div> : null)}
  </div>;
}
