'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';

type Report = {
  id: string;
  targetProfileId: string | null;
  targetMessageId: string | null;
  targetRecommendationId: string | null;
  reason: string;
  details: string | null;
  status: 'PENDING' | 'ACTIONED' | 'DISMISSED';
  targetType: 'PROFILE' | 'MESSAGE' | 'RECOMMENDATION';
  reporterDisplayName: string;
  decisionRationale: string | null;
  reviewedByDisplayName: string | null;
  reviewedAt: string | null;
};

const statusTabs: Report['status'][] = ['PENDING', 'ACTIONED', 'DISMISSED'];

const targetLabels: Record<Report['targetType'], string> = {
  PROFILE: 'Profile report',
  MESSAGE: 'Message report',
  RECOMMENDATION: 'Recommendation report',
};

export default function AdminSocialModerationPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [tab, setTab] = useState<Report['status']>('PENDING');
  const [rationaleByReport, setRationaleByReport] = useState<Record<string, string>>({});

  const load = useCallback(async () => {
    const res = await fetch('/api/admin/social/reports');
    const data = (await res.json()) as Report[];
    setReports(data);
  }, []);
  useEffect(() => { void load(); }, [load]);

  const transition = async (reportId: string, action: 'DISMISS' | 'HIDE_PROFILE' | 'HIDE_RECOMMENDATION' | 'MARK_ACTIONED') => {
    await fetch(`/api/admin/social/reports/${reportId}/transition`, {
      method: 'PATCH', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ action, decisionRationale: rationaleByReport[reportId]?.trim() || undefined }),
    });
    await load();
  };

  const visibleReports = useMemo(() => reports.filter((report) => report.status === tab), [reports, tab]);

  return <div className='space-y-4'>
    <h1 className='text-2xl font-semibold'>Social moderation</h1>
    <p className='text-sm text-slate-600'>Review profile, message, and recommendation reports and take safe moderation decisions.</p>

    <div className='flex flex-wrap gap-2'>
      {statusTabs.map((status) => <button key={status} className={`rounded border px-3 py-1 text-sm ${tab === status ? 'bg-slate-900 text-white' : 'bg-white'}`} onClick={() => setTab(status)}>{status === 'PENDING' ? 'Pending' : status === 'ACTIONED' ? 'Actioned' : 'Dismissed'}</button>)}
    </div>

    {visibleReports.length === 0 ? <div className='rounded-xl border bg-white p-6 text-sm text-slate-600'>No reports in this section.</div> : null}

    <div className='space-y-3'>
      {visibleReports.map((report) => <article key={report.id} className='rounded-xl border bg-white p-4'>
        <div className='flex items-start justify-between gap-3'>
          <div>
            <h2 className='text-sm font-semibold'>{targetLabels[report.targetType]}</h2>
            <p className='text-xs text-slate-500'>Reference: {report.id}</p>
          </div>
          <span className='rounded-full bg-slate-100 px-2 py-1 text-xs'>{report.status === 'PENDING' ? 'Pending' : report.status === 'ACTIONED' ? 'Actioned' : 'Dismissed'}</span>
        </div>

        <div className='mt-2 grid gap-1 text-sm'>
          <div><strong>Reporter:</strong> {report.reporterDisplayName}</div>
          <div><strong>Reason:</strong> {report.reason}</div>
          <div><strong>Details:</strong> {report.details?.trim() || 'No extra details provided.'}</div>
        </div>

        {report.status === 'PENDING' ? <label className='mt-3 block text-sm'>Decision rationale
          <textarea className='mt-1 w-full rounded border px-3 py-2' value={rationaleByReport[report.id] ?? ''} onChange={(event) => setRationaleByReport((prev) => ({ ...prev, [report.id]: event.target.value }))} />
        </label> : <div className='mt-3 space-y-1 text-sm'>
          <div><strong>Decision rationale:</strong> {report.decisionRationale || 'No rationale provided.'}</div>
          <div><strong>Reviewed by:</strong> {report.reviewedByDisplayName || 'N/A'}</div>
          <div><strong>Reviewed at:</strong> {report.reviewedAt ? new Date(report.reviewedAt).toLocaleString() : 'N/A'}</div>
        </div>}

        {report.status === 'PENDING' ? <div className='mt-3 flex flex-wrap gap-2'>
          <button className='rounded border px-2 py-1 text-sm' onClick={() => transition(report.id, 'DISMISS')}>Dismiss report</button>
          {report.targetType === 'PROFILE' ? <button className='rounded bg-slate-900 px-2 py-1 text-sm text-white' onClick={() => transition(report.id, 'HIDE_PROFILE')}>Hide profile</button> : null}
          {report.targetType === 'RECOMMENDATION' ? <button className='rounded bg-slate-900 px-2 py-1 text-sm text-white' onClick={() => transition(report.id, 'HIDE_RECOMMENDATION')}>Hide recommendation</button> : null}
          {report.targetType === 'MESSAGE' ? <button className='rounded bg-slate-900 px-2 py-1 text-sm text-white' onClick={() => transition(report.id, 'MARK_ACTIONED')}>Mark actioned</button> : null}
        </div> : null}
      </article>)}
    </div>
  </div>;
}
