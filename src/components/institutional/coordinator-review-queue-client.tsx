'use client';

import { useState } from 'react';

type Attachment = { id: string; fileName: string; mimeType: string; sizeBytes: number; version: number; hasStoredContent: boolean };
type Submission = { id: string; title: string; state: string; reviewerNotes: string | null; attachments: Attachment[] };

export function CoordinatorReviewQueueClient({ initialItems }: { initialItems: Submission[] }) {
  const [error, setError] = useState<string | null>(null);
  const [rationaleBySubmission, setRationaleBySubmission] = useState<Record<string, string>>({});

  async function transition(submissionId: string, action: string, requiresRationale: boolean) {
    setError(null);
    const rationale = rationaleBySubmission[submissionId]?.trim();
    if (requiresRationale && !rationale) {
      setError('Rationale is required for this action.');
      return;
    }
    const response = await fetch(`/api/institutional/submissions/${submissionId}/transition`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ action, rationale }),
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => ({} as { error?: string }));
      setError(payload.error ?? 'Failed to update submission state.');
      return;
    }
    window.location.reload();
  }

  return <div className='space-y-4'>
    {error && <div className='rounded border border-red-300 bg-red-50 p-2 text-sm text-red-700'>{error}</div>}
    {initialItems.map((s) => {
      const canStart = ['SUBMITTED', 'RESUBMITTED', 'REOPENED'].includes(s.state);
      const inReview = s.state === 'IN_REVIEW';
      return <div key={s.id} className='rounded border p-3 text-sm'>
        <div className='font-medium'>{s.title}</div>
        <div>Status: {s.state}</div>
        {s.reviewerNotes && <div>Latest rationale: {s.reviewerNotes}</div>}
        <div className='mt-2 text-xs text-slate-600'>Attachments ({s.attachments.length})</div>
        <ul className='list-disc pl-5 text-xs'>
          {s.attachments.map((a) => <li key={a.id}>{a.fileName} · {a.mimeType} · {a.sizeBytes} bytes · v{a.version} · {a.hasStoredContent ? <a className='underline' href={`/api/institutional/submissions/${s.id}/attachments/${a.id}/open`} target='_blank' rel='noreferrer'>Open document</a> : <span className='text-slate-500'>Demo metadata only</span>}</li>)}
        </ul>
        <div className='mt-2 space-y-2'>
          {canStart && <button className='underline' onClick={() => transition(s.id, 'start_review', false)}>Start review</button>}
          {inReview && <div className='flex flex-wrap gap-3'>
            <button className='underline' onClick={() => transition(s.id, 'approve', false)}>Approve</button>
            <button className='underline' onClick={() => transition(s.id, 'request_correction', true)}>Request correction</button>
            <button className='underline' onClick={() => transition(s.id, 'reject', true)}>Reject</button>
          </div>}
          {inReview && <textarea className='w-full rounded border p-2 text-xs' placeholder='Required rationale for correction/rejection' value={rationaleBySubmission[s.id] ?? ''} onChange={(e) => setRationaleBySubmission((prev) => ({ ...prev, [s.id]: e.target.value }))} />}
        </div>
      </div>;
    })}
  </div>;
}
