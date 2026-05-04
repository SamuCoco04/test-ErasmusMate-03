'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/Button';
import { Card } from '@/src/components/Card';
import { StatusBadge } from '@/src/components/Badge';
import { EmptyState } from '@/src/components/States';

type AgreementRow = {
  id: string;
  rowKey: string;
  revision: number;
  isLatest: boolean;
  homeCourseCode: string;
  homeCourseName: string;
  destinationCourseCode: string;
  destinationCourseName: string;
  ects: number;
  semester: string;
  status: 'IN_REVIEW' | 'APPROVED' | 'DENIED';
  decisionRationale: string | null;
};

type AgreementDetail = {
  id: string;
  state: string;
  version: number;
  submittedAt: string | null;
  rows: AgreementRow[];
};

const statusMap = {
  DRAFT: 'Draft',
  SUBMITTED: 'Sent for review',
  IN_REVIEW: 'In review',
  PARTIALLY_APPROVED: 'Partially approved',
  CHANGES_REQUESTED: 'Needs changes',
  ACCEPTED: 'Accepted',
} as const;

const rowStatusMap = {
  IN_REVIEW: 'In review',
  APPROVED: 'Approved',
  DENIED: 'Needs changes',
} as const;

const rowToneMap = {
  IN_REVIEW: 'pending',
  APPROVED: 'success',
  DENIED: 'warning',
} as const;

const emptyForm = { homeCourseCode: '', homeCourseName: '', destinationCourseCode: '', destinationCourseName: '', ects: 6, semester: '' };

export function StudentLearningAgreementEditor({ agreement }: { agreement: AgreementDetail }) {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const latestRows = useMemo(() => agreement.rows.filter((row) => row.isLatest), [agreement.rows]);

  async function request(path: string, init?: RequestInit) {
    const response = await fetch(path, init);
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error ?? 'Request failed. Please try again.');
    return payload;
  }

  async function onSaveRow(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true); setError(null); setMessage(null);
    try {
      const method = editingRowId ? 'PATCH' : 'POST';
      const path = editingRowId
        ? `/api/institutional/learning-agreement/${agreement.id}/rows/${editingRowId}`
        : `/api/institutional/learning-agreement/${agreement.id}/rows`;
      await request(path, { method, headers: { 'content-type': 'application/json' }, body: JSON.stringify(form) });
      setMessage(editingRowId ? 'Row updated and sent for review.' : 'Course equivalence added.');
      setEditingRowId(null);
      setForm(emptyForm);
      router.refresh();
    } catch (e) {
      setError((e as Error).message);
    } finally { setBusy(false); }
  }

  function beginEdit(row: AgreementRow) {
    setEditingRowId(row.id);
    setForm({
      homeCourseCode: row.homeCourseCode,
      homeCourseName: row.homeCourseName,
      destinationCourseCode: row.destinationCourseCode,
      destinationCourseName: row.destinationCourseName,
      ects: row.ects,
      semester: row.semester,
    });
    setMessage(row.status === 'APPROVED' ? 'Editing an approved row creates a new version for review.' : null);
    setError(null);
  }

  async function submitAction(kind: 'submit' | 'resubmit') {
    setBusy(true); setError(null); setMessage(null);
    try {
      await request(`/api/institutional/learning-agreement/${agreement.id}/${kind}`, { method: 'POST' });
      setMessage(kind === 'submit' ? 'Sent for review.' : 'Resubmitted for review.');
      router.refresh();
    } catch (e) {
      const raw = (e as Error).message;
      const mapped = raw.includes('at least one row')
        ? 'Add at least one course before sending.'
        : raw.includes('incomplete rows')
        ? 'Complete all course fields before sending.'
        : raw.includes('Denied rows must be revised')
        ? 'Update rows that need changes before resubmitting.'
        : raw;
      setError(mapped);
    } finally { setBusy(false); }
  }

  const canSubmit = agreement.state === 'DRAFT';
  const canResubmit = ['PARTIALLY_APPROVED', 'CHANGES_REQUESTED'].includes(agreement.state);

  return <div className="space-y-6">
    <Card className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge tone="info">State: {statusMap[agreement.state as keyof typeof statusMap] ?? agreement.state}</StatusBadge>
        <span className="text-sm text-slate-600">Version {agreement.version}</span>
        <span className="text-sm text-slate-600">Submitted: {agreement.submittedAt ? new Date(agreement.submittedAt).toLocaleDateString() : 'Not sent yet'}</span>
      </div>
      <p className="text-sm text-slate-700">Rows needing changes must be updated before resubmission.</p>
    </Card>

    <Card className="overflow-x-auto">
      <h2 className="mb-3 text-lg font-semibold text-ink">Course equivalences</h2>
      {latestRows.length === 0 ? <EmptyState description="No courses yet. Add your first equivalence below." /> :
      <table className="min-w-full text-sm">
        <thead className="text-left text-slate-600"><tr><th>Home course</th><th>Destination course</th><th>ECTS</th><th>Semester</th><th>Status</th><th>Notes</th><th></th></tr></thead>
        <tbody>
          {latestRows.map((row) => <tr key={row.id} className="border-t border-slate-200 align-top">
            <td className="py-3"><div className="font-semibold">{row.homeCourseCode}</div><div>{row.homeCourseName}</div></td>
            <td className="py-3"><div className="font-semibold">{row.destinationCourseCode}</div><div>{row.destinationCourseName}</div></td>
            <td className="py-3">{row.ects}</td><td className="py-3">{row.semester}</td>
            <td className="py-3"><StatusBadge tone={rowToneMap[row.status]}>{rowStatusMap[row.status]}</StatusBadge></td>
            <td className="py-3">{row.decisionRationale ?? '—'}<div className="text-xs text-slate-500">Revision {row.revision} · Latest version</div></td>
            <td className="py-3"><Button variant="secondary" onClick={() => beginEdit(row)}>Edit</Button></td>
          </tr>)}
        </tbody>
      </table>}
    </Card>

    <Card>
      <h2 className="mb-3 text-lg font-semibold text-ink">{editingRowId ? 'Edit course equivalence' : 'Add course equivalence'}</h2>
      <form className="grid gap-3 md:grid-cols-2" onSubmit={onSaveRow}>
        {Object.entries(form).map(([key, value]) => <label key={key} className="text-sm text-slate-700">{key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
          <input required name={key} value={value as string | number} type={key==='ects'?'number':'text'} min={key==='ects'?1:undefined} onChange={(e) => setForm((prev) => ({ ...prev, [key]: key === 'ects' ? Number(e.target.value) : e.target.value }))} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
        </label>)}
        <div className="md:col-span-2 flex gap-3">
          <Button type="submit" disabled={busy}>{editingRowId ? 'Save changes' : 'Add row'}</Button>
          {editingRowId ? <Button type="button" variant="ghost" onClick={() => { setEditingRowId(null); setForm(emptyForm); }}>Cancel</Button> : null}
        </div>
      </form>
    </Card>

    <div className="flex gap-3">
      <Button onClick={() => submitAction('submit')} disabled={!canSubmit || busy}>Send for review</Button>
      <Button variant="secondary" onClick={() => submitAction('resubmit')} disabled={!canResubmit || busy}>Resubmit</Button>
    </div>

    {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
    {error ? <p className="text-sm text-rose-700">{error}</p> : null}
  </div>;
}
