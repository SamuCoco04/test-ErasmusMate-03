'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/src/components/Badge';

type Attachment = { id: string; fileName: string; mimeType: string; sizeBytes: number; version: number; hasStoredContent: boolean };
type Submission = { id: string; title: string; state: string; reviewerNotes: string | null; attachments: Attachment[] };

const STATE_LABELS: Record<string, string> = {
  SUBMITTED: 'Submitted',
  RESUBMITTED: 'Resubmitted',
  IN_REVIEW: 'In review',
  APPROVED: 'Approved',
  NEEDS_CORRECTION: 'Needs correction',
  REJECTED: 'Rejected',
};

const FILTER_OPTIONS = [
  { label: 'Submitted', value: 'SUBMITTED' },
  { label: 'Resubmitted', value: 'RESUBMITTED' },
  { label: 'In review', value: 'IN_REVIEW' },
  { label: 'Needs correction', value: 'NEEDS_CORRECTION' },
  { label: 'Rejected', value: 'REJECTED' },
] as const;

export function CoordinatorReviewQueueClient({ initialItems }: { initialItems: Submission[] }) {
  const [error, setError] = useState<string | null>(null);
  const [rationaleBySubmission, setRationaleBySubmission] = useState<Record<string, string>>({});
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [showApproved, setShowApproved] = useState(false);
  const [searchText, setSearchText] = useState('');

  const filteredItems = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    return initialItems.filter((s) => {
      if (!showApproved && s.state === 'APPROVED') return false;
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(s.state)) return false;
      if (!query) return true;
      const attachmentNames = s.attachments.map((a) => a.fileName.toLowerCase()).join(' ');
      const reviewerNotes = (s.reviewerNotes ?? '').toLowerCase();
      return s.title.toLowerCase().includes(query) || attachmentNames.includes(query) || reviewerNotes.includes(query);
    });
  }, [initialItems, searchText, selectedStatuses, showApproved]);

  function toggleStatusFilter(status: string) {
    setSelectedStatuses((prev) => prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]);
  }

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

    <div className='rounded-lg border border-slate-200 bg-slate-50 p-3'>
      <div className='grid gap-3 md:grid-cols-[1fr_auto]'>
        <input
          className='w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm'
          placeholder='Search by student request, attachment, or rationale'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <label className='inline-flex items-center gap-2 text-sm text-slate-700'>
          <input type='checkbox' checked={showApproved} onChange={(e) => setShowApproved(e.target.checked)} />
          Show approved
        </label>
      </div>
      <div className='mt-3 flex flex-wrap gap-2'>
        {FILTER_OPTIONS.map((option) => <button key={option.value} type='button' className={`rounded-full border px-3 py-1 text-xs ${selectedStatuses.includes(option.value) ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-300 bg-white text-slate-700'}`} onClick={() => toggleStatusFilter(option.value)}>{option.label}</button>)}
      </div>
    </div>

    {filteredItems.length === 0 && <div className='rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600'>No requests match these filters.</div>}

    {filteredItems.map((s) => {
      const canStart = ['SUBMITTED', 'RESUBMITTED'].includes(s.state);
      const inReview = s.state === 'IN_REVIEW';
      return <div key={s.id} className='rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm'>
        <div className='flex flex-wrap items-start justify-between gap-3'>
          <div>
            <div className='font-medium text-slate-900'>{s.title}</div>
            <div className='mt-1 text-xs text-slate-500'>Reference ID: {s.id}</div>
          </div>
          <Badge data-testid='submission-status-badge' aria-label={`Submission status: ${STATE_LABELS[s.state] ?? s.state}`} tone={s.state === 'APPROVED' ? 'success' : s.state === 'REJECTED' ? 'danger' : s.state === 'NEEDS_CORRECTION' ? 'warning' : 'info'}>{STATE_LABELS[s.state] ?? s.state}</Badge>
        </div>

        {s.reviewerNotes && <div className='mt-3 rounded-md border border-amber-200 bg-amber-50 p-2 text-xs text-amber-900'>
          <span className='font-medium'>Latest rationale:</span> {s.reviewerNotes}
        </div>}

        <div className='mt-3'>
          <div className='text-xs font-medium text-slate-700'>Attachments ({s.attachments.length})</div>
          <div className='mt-2 space-y-2'>
            {s.attachments.map((a) => <div key={a.id} className='flex flex-wrap items-center justify-between gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs'>
              <div>{a.fileName} · {a.mimeType} · {a.sizeBytes} bytes · v{a.version}</div>
              {a.hasStoredContent
                ? <a className='font-medium text-blue-700 underline' href={`/api/institutional/submissions/${s.id}/attachments/${a.id}/open`} target='_blank' rel='noreferrer'>Open document</a>
                : <span className='text-slate-500'>Demo metadata only</span>}
            </div>)}
          </div>
        </div>

        <div className='mt-3 space-y-2'>
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
