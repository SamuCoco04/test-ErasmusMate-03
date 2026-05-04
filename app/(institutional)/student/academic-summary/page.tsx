import { Card } from '@/src/components/Card';
import { PageHeader } from '@/src/components/PageHeader';
import { EmptyState, ErrorState } from '@/src/components/States';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { getAcademicSummaryForMobilityRecord } from '@/src/modules/institutional/learning-agreement';

export default async function StudentAcademicSummaryPage() {
  try {
    const ctx = await getDemoContextFromRequest();
    const summary = await getAcademicSummaryForMobilityRecord(ctx);
    return <div className="space-y-6">
      <PageHeader sectionLabel="Academic Summary" title="Academic Summary" subtitle="Approved rows from your Learning Agreement appear here." />
      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Mobility record" description={summary.mobilityRecordId} />
        <Card title="Home institution" description={summary.homeInstitutionName ?? 'Not available'} />
        <Card title="Host institution" description={summary.hostInstitutionName ?? 'Not available'} />
      </div>
      <Card title="Approved courses" description="Only latest approved rows are included.">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-slate-600">Approved rows from your Learning Agreement appear here.</p>
          <p className="text-sm font-semibold text-slate-900">Total ECTS: {summary.totalEcts}</p>
        </div>
        {summary.rows.length === 0 ? <EmptyState title="No approved courses yet" description="Approved rows from your Learning Agreement appear here." /> :
          <div className="overflow-x-auto"><table className="min-w-full divide-y divide-slate-200 text-sm"><thead className="bg-slate-50 text-left text-slate-700"><tr><th className="px-3 py-2 font-semibold">Home course</th><th className="px-3 py-2 font-semibold">Destination course</th><th className="px-3 py-2 font-semibold">Semester</th><th className="px-3 py-2 font-semibold">ECTS</th><th className="px-3 py-2 font-semibold">Grade</th></tr></thead><tbody className="divide-y divide-slate-100">{summary.rows.map((row) => <tr key={row.id}><td className="px-3 py-2 text-slate-800">{row.homeCourseCode} — {row.homeCourseName}</td><td className="px-3 py-2 text-slate-800">{row.destinationCourseCode} — {row.destinationCourseName}</td><td className="px-3 py-2 text-slate-800">{row.semester}</td><td className="px-3 py-2 text-slate-800">{row.ects}</td><td className="px-3 py-2 text-slate-800">{row.grade ?? 'Not recorded'}</td></tr>)}</tbody></table></div>}
      </Card>
    </div>;
  } catch (error) {
    return <div className="space-y-6"><PageHeader sectionLabel="Academic Summary" title="Academic Summary" subtitle="Approved rows from your Learning Agreement appear here." /><ErrorState description={error instanceof Error ? error.message : 'Unable to load Academic Summary.'} /></div>;
  }
}
