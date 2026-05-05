'use client';
import { useCallback, useEffect, useState } from 'react';

type Report = { id: string; reporterProfileId: string; targetProfileId: string | null; targetMessageId: string | null; reason: string; details: string | null; status: string };

export default function AdminSocialModerationPage() {
  const [reports, setReports] = useState<Report[]>([]);

  const load = useCallback(async () => {
    const res = await fetch('/api/admin/social/reports');
    const data = (await res.json()) as Report[];
    setReports(data);
  }, []);
  useEffect(() => { void load(); }, [load]);

  const transition = async (reportId: string, action: 'DISMISS' | 'HIDE_PROFILE') => {
    await fetch(`/api/admin/social/reports/${reportId}/transition`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action }) });
    await load();
  };

  return <div className='space-y-4'>
    <h1 className='text-2xl font-semibold'>Social moderation</h1>
    <p className='text-sm text-slate-600'>Review student reports and apply visibility actions when needed.</p>
    <div className='space-y-3'>
      {reports.map((report) => <article key={report.id} className='rounded-xl border bg-white p-4'>
        <div className='text-sm'><strong>Status:</strong> {report.status}</div>
        <div className='text-sm'><strong>Reporter:</strong> {report.reporterProfileId}</div>
        <div className='text-sm'><strong>Target profile:</strong> {report.targetProfileId ?? 'N/A'}</div>
        <div className='text-sm'><strong>Target message:</strong> {report.targetMessageId ?? 'N/A'}</div>
        <div className='text-sm'><strong>Reason:</strong> {report.reason}</div>
        <div className='text-sm'><strong>Details:</strong> {report.details ?? 'No details'}</div>
        {report.status === 'PENDING' ? <div className='mt-2 flex gap-2'>
          <button className='rounded border px-2 py-1 text-sm' onClick={() => transition(report.id, 'DISMISS')}>Dismiss</button>
          {report.targetProfileId ? <button className='rounded bg-slate-900 px-2 py-1 text-sm text-white' onClick={() => transition(report.id, 'HIDE_PROFILE')}>Hide profile</button> : null}
        </div> : null}
      </article>)}
    </div>
  </div>;
}
