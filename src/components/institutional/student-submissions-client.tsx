'use client';
import { useMemo, useState } from 'react';

type AttachmentView = {
  id: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  version: number;
  status: string;
  hasStoredContent: boolean;
};

type SubmissionView = {
  id: string;
  procedureTitle: string;
  state: string;
  reviewerNotes: string | null;
  attachments: AttachmentView[];
  hasActiveAttachment: boolean;
};

const EDITABLE_STATES = ['DRAFT', 'REJECTED', 'REOPENED', 'NEEDS_CORRECTION'];
const RESUBMIT_STATES = ['REJECTED', 'REOPENED', 'NEEDS_CORRECTION'];
const ACTIVE_STATES = ['DRAFT', 'SUBMITTED', 'RESUBMITTED', 'IN_REVIEW', 'REJECTED', 'REOPENED', 'NEEDS_CORRECTION'];

function formatBytes(sizeBytes: number) {
  if (sizeBytes < 1024) return `${sizeBytes} B`;
  if (sizeBytes < 1024 * 1024) return `${(sizeBytes / 1024).toFixed(1)} KB`;
  return `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`;
}

function statusLabel(state: string) {
  if (state === 'SUBMITTED' || state === 'RESUBMITTED') return 'Waiting for review';
  if (state === 'NEEDS_CORRECTION' || state === 'REJECTED' || state === 'REOPENED') return 'Needs correction';
  return state.replaceAll('_', ' ');
}

export function StudentSubmissionsClient({ initialSubmissions, procedureOptions }: { initialSubmissions: SubmissionView[]; procedureOptions: { id: string; title: string }[] }) {
  const [error, setError] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');

  const defaultHideApproved = initialSubmissions.some((s) => ACTIVE_STATES.includes(s.state));
  const [showApproved, setShowApproved] = useState(!defaultHideApproved);

  const filteredSubmissions = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();
    return initialSubmissions.filter((s) => {
      if (!showApproved && s.state === 'APPROVED') return false;
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(s.state)) return false;
      if (!normalizedSearch) return true;
      const attachmentNames = s.attachments.map((a) => a.fileName.toLowerCase()).join(' ');
      return [s.procedureTitle, s.reviewerNotes ?? '', attachmentNames].join(' ').toLowerCase().includes(normalizedSearch);
    });
  }, [initialSubmissions, searchText, selectedStatuses, showApproved]);

  const runAction = async (actionKey: string, request: () => Promise<Response>, fallbackError: string) => {
    setPendingAction(actionKey);
    setError(null);
    try {
      const r = await request();
      if (!r.ok) {
        const p = await r.json().catch(() => ({} as { error?: string }));
        setError(p.error ?? fallbackError);
        return;
      }
      window.location.reload();
    } finally {
      setPendingAction(null);
    }
  };

  const call = async (actionKey: string, url: string, body: unknown) => runAction(actionKey, () => fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }), 'Request failed');

  const upload = async (actionKey: string, url: string, file: File | null) => {
    if (!file) return setError('Please select a file');
    const fd = new FormData();
    fd.set('file', file);
    await runAction(actionKey, () => fetch(url, { method: 'POST', body: fd }), 'Upload failed');
  };

  const statusFilters: { label: string; states: string[] }[] = [
    { label: 'All', states: [] },
    { label: 'Draft', states: ['DRAFT'] },
    { label: 'Submitted / Waiting for review', states: ['SUBMITTED', 'RESUBMITTED'] },
    { label: 'In review', states: ['IN_REVIEW'] },
    { label: 'Needs correction / Rejected / Reopened', states: ['NEEDS_CORRECTION', 'REJECTED', 'REOPENED'] },
    { label: 'Approved', states: ['APPROVED'] },
  ];

  return <div className='space-y-4'>
    {error && <div className='rounded border border-red-300 bg-red-50 p-2 text-sm text-red-700'>{error}</div>}

    <form onSubmit={async (e) => { e.preventDefault(); const f = new FormData(e.currentTarget); await call('create-submission', '/api/institutional/submissions', { procedureId: String(f.get('procedureId') ?? '') }); }} className='rounded-lg border bg-slate-50 p-3'>
      <p className='mb-2 text-xs font-medium uppercase tracking-wide text-slate-600'>New submission</p>
      <div className='flex flex-wrap items-center gap-2'>
        <select name='procedureId' className='rounded border px-2 py-1 text-sm'>{procedureOptions.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}</select>
        <button disabled={pendingAction === 'create-submission'} className='rounded bg-blue-600 px-3 py-1 text-sm text-white disabled:cursor-not-allowed disabled:bg-blue-400'>{pendingAction === 'create-submission' ? 'Creating…' : 'Create submission'}</button>
      </div>
    </form>

    <div className='rounded-lg border p-3'>
      <div className='mb-3 flex flex-wrap items-center gap-2'>
        {statusFilters.map((filter) => {
          const active = selectedStatuses.join(',') === filter.states.join(',');
          return <button key={filter.label} type='button' onClick={() => setSelectedStatuses(filter.states)} className={`rounded-full border px-3 py-1 text-xs ${active ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-300 text-slate-700'}`}>{filter.label}</button>;
        })}
      </div>
      <div className='flex flex-wrap items-center gap-3'>
        <label className='flex-1 text-sm'>
          <span className='mb-1 block text-xs text-slate-600'>Search by procedure, reviewer note, or attachment filename</span>
          <input value={searchText} onChange={(e) => setSearchText(e.target.value)} className='w-full rounded border px-2 py-1 text-sm' placeholder='Search submissions' />
        </label>
        <label className='mt-5 flex items-center gap-2 text-sm'>
          <input checked={showApproved} onChange={(e) => setShowApproved(e.target.checked)} type='checkbox' />
          Show approved
        </label>
      </div>
    </div>

    {filteredSubmissions.length === 0 && <div className='rounded border border-dashed p-4 text-sm text-slate-600'>No submissions match your current filters.</div>}

    {filteredSubmissions.map((s) => {
      const editable = EDITABLE_STATES.includes(s.state);
      return <div key={s.id} data-testid='submission-card' data-submission-id={s.id} className='rounded-lg border p-3 text-sm'>
        <div className='mb-2 flex flex-wrap items-start justify-between gap-2'>
          <div>
            <div className='font-medium'>{s.procedureTitle}</div>
            <div className='text-xs text-slate-500'>Reference ID: {s.id}</div>
          </div>
          <span data-testid='submission-status-badge' aria-label={`Submission status: ${statusLabel(s.state)}`} className='rounded-full border border-slate-300 px-2 py-1 text-xs font-medium'>{statusLabel(s.state)}</span>
        </div>
        {s.reviewerNotes && <div className='mb-2 rounded bg-amber-50 p-2 text-xs text-amber-800'><span className='font-medium'>Latest reviewer note: </span>{s.reviewerNotes}</div>}
        <div className='mb-2 text-xs text-slate-600'>Attachments: {s.attachments.length}</div>
        <ul className='space-y-2'>
          {s.attachments.map((a) => <li key={a.id} className='rounded border bg-slate-50 p-2 text-xs'>
            <div className='font-medium'>{a.fileName}</div>
            <div className='text-slate-600'>
              {a.mimeType} · {formatBytes(a.sizeBytes)} · v{a.version} · {a.status}
            </div>
            <div className='mt-1 flex flex-wrap items-center gap-2'>
              {a.hasStoredContent ? <a className='underline' href={`/api/institutional/submissions/${s.id}/attachments/${a.id}/open`} target='_blank' rel='noreferrer'>Open document</a> : <span className='text-slate-500'>Demo metadata only</span>}
              {editable && a.status === 'ACTIVE' && <>
                <button disabled={pendingAction === `remove-${a.id}`} className='underline disabled:text-slate-400' onClick={() => call(`remove-${a.id}`, `/api/institutional/submissions/${s.id}/attachments/${a.id}/remove`, {})}>{pendingAction === `remove-${a.id}` ? 'Removing…' : 'Remove file'}</button>
                <label aria-label={`Replace file for ${a.fileName}`} className='flex cursor-pointer items-center gap-1 text-xs underline'>
                  <span>{pendingAction === `replace-${a.id}` ? 'Replacing…' : 'Replace file'}</span>
                  <input disabled={pendingAction === `replace-${a.id}`} className='sr-only' type='file' onChange={(e) => upload(`replace-${a.id}`, `/api/institutional/submissions/${s.id}/attachments/${a.id}/replace`, e.target.files?.[0] ?? null)} />
                </label>
              </>}
            </div>
          </li>)}
        </ul>
        {editable && <div className='mt-2 flex items-center gap-2'>
          <input disabled={pendingAction === `upload-${s.id}`} type='file' onChange={(e) => upload(`upload-${s.id}`, `/api/institutional/submissions/${s.id}/attachments`, e.target.files?.[0] ?? null)} />
          {pendingAction === `upload-${s.id}` && <span className='text-xs text-slate-500'>Uploading…</span>}
        </div>}

        <div className='mt-3 flex flex-wrap gap-3'>
          {s.state === 'DRAFT' && <button disabled={!s.hasActiveAttachment || pendingAction === `submit-${s.id}`} className='rounded border px-2 py-1 text-xs disabled:text-slate-400' onClick={() => call(`submit-${s.id}`, `/api/institutional/submissions/${s.id}/transition`, { action: 'submit' })}>{pendingAction === `submit-${s.id}` ? 'Submitting…' : 'Submit for review'}</button>}
          {RESUBMIT_STATES.includes(s.state) && <button disabled={!s.hasActiveAttachment || pendingAction === `resubmit-${s.id}`} className='rounded border px-2 py-1 text-xs disabled:text-slate-400' onClick={() => call(`resubmit-${s.id}`, `/api/institutional/submissions/${s.id}/transition`, { action: 'resubmit' })}>{pendingAction === `resubmit-${s.id}` ? 'Resubmitting…' : 'Resubmit'}</button>}
        </div>
      </div>;
    })}
  </div>;
}
