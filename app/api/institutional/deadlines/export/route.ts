import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { listDeadlinesForContext } from '@/src/modules/institutional/deadlines';

function toIcsDate(value: Date) { return value.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'; }

export async function GET() {
  const ctx = await getDemoContextFromRequest();
  const deadlines = await listDeadlinesForContext(ctx);
  const events = deadlines.map((d) => ['BEGIN:VEVENT', `UID:erasmusmate-deadline-${d.id}`, `DTSTAMP:${toIcsDate(new Date())}`, `DTSTART:${toIcsDate(d.effectiveDueDate)}`, `SUMMARY:${d.title.replace(/\n/g, ' ')}`, `DESCRIPTION:Procedure ${d.relatedProcedureTitle ?? 'N/A'} | State ${d.effectiveState}`, 'END:VEVENT'].join('\r\n'));
  const body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//ErasmusMate//Deadlines//EN', ...events, 'END:VCALENDAR', ''].join('\r\n');
  return new Response(body, { headers: { 'Content-Type': 'text/calendar; charset=utf-8', 'Content-Disposition': 'attachment; filename="erasmusmate-deadlines.ics"' } });
}
