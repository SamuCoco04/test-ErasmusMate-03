'use client';
import { useState } from 'react';

type AttachmentView = { id: string; fileName: string; status: string };
type SubmissionView = { id: string; procedureTitle: string; state: string; reviewerNotes: string | null; attachments: AttachmentView[] };

export function StudentSubmissionsClient({ initialSubmissions, procedureOptions }: { initialSubmissions: SubmissionView[]; procedureOptions: { id: string; title: string }[] }) {
  const [error, setError] = useState<string | null>(null);
  const call = async (url: string, body: unknown) => {
    setError(null);
    const r = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    if (!r.ok) {
      const p = await r.json().catch(() => ({} as { error?: string }));
      setError(p.error ?? 'Request failed');
      return;
    }
    window.location.reload();
  };

  return <div className='space-y-4'>
    {error && <div className='rounded border border-red-300 bg-red-50 p-2 text-sm text-red-700'>{error}</div>}
    <form onSubmit={async (e) => { e.preventDefault(); const f = new FormData(e.currentTarget); await call('/api/institutional/submissions', { procedureId: String(f.get('procedureId') ?? '') }); }} className='flex gap-2'>
      <select name='procedureId' className='rounded border px-2 py-1 text-sm'>{procedureOptions.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}</select>
      <button className='rounded bg-blue-600 px-3 py-1 text-sm text-white'>Create draft</button>
    </form>
    {initialSubmissions.map((s) => {
      const editable = ['DRAFT', 'REJECTED', 'REOPENED', 'NEEDS_CORRECTION'].includes(s.state);
      return <div key={s.id} className='rounded border p-3 text-sm'><div className='font-medium'>{s.procedureTitle}</div><div>Status: {s.state}</div>{s.reviewerNotes && <div>Coordinator notes: {s.reviewerNotes}</div>}<ul className='list-disc pl-5 text-xs'>{s.attachments.map((a) => <li key={a.id}>{a.fileName} · {a.status}{editable && <button className='ml-2 underline' onClick={() => call(`/api/institutional/submissions/${s.id}/attachments/${a.id}/remove`, {})}>Remove</button>}</li>)}</ul>{editable && <button className='mt-2 underline' onClick={() => call(`/api/institutional/submissions/${s.id}/attachments`, { fileName: 'new-upload.pdf', mimeType: 'application/pdf', sizeBytes: 1200, storageKey: `demo/${s.id}/new-upload.pdf` })}>Quick add demo attachment</button>}<div className='mt-2'>{s.state === 'DRAFT' && <button className='underline' onClick={() => call(`/api/institutional/submissions/${s.id}/transition`, { action: 'submit' })}>Submit for review</button>}{['REJECTED', 'REOPENED', 'NEEDS_CORRECTION'].includes(s.state) && <button className='underline' onClick={() => call(`/api/institutional/submissions/${s.id}/transition`, { action: 'resubmit' })}>Resubmit</button>}</div></div>;
    })}
  </div>;
}
