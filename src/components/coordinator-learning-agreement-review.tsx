'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/Button';
import { Card } from '@/src/components/Card';
import { ErrorState, EmptyState, SuccessState } from '@/src/components/States';
import { StatusBadge } from '@/src/components/Badge';
import { learningAgreementRowStatusLabels, learningAgreementStateLabels } from '@/src/modules/institutional/status-labels';

type ReviewQueueItem = {
  id: string;
  state: keyof typeof learningAgreementStateLabels;
  version: number;
  submittedAt: string | null;
  mobilityRecordId: string;
  mobilityRecord?: { studentId: string } | null;
};

type AgreementDetail = {
  id: string;
  state: keyof typeof learningAgreementStateLabels;
  rows: Array<{
    id: string;
    rowKey: string;
    revision: number;
    homeCourseCode: string;
    homeCourseName: string;
    destinationCourseCode: string;
    destinationCourseName: string;
    ects: number;
    semester: string;
    status: keyof typeof learningAgreementRowStatusLabels;
    decisionRationale: string | null;
    isLatest: boolean;
  }>;
};

export function CoordinatorLearningAgreementReview({ queue, initialDetail }: { queue: ReviewQueueItem[]; initialDetail: AgreementDetail | null }) {
  const [selectedAgreementId, setSelectedAgreementId] = useState(initialDetail?.id ?? queue[0]?.id ?? null);
  const [detail, setDetail] = useState<AgreementDetail | null>(initialDetail);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [denyRationales, setDenyRationales] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const reviewCounts = useMemo(() => {
    const rows = detail?.rows.filter((row) => row.isLatest) ?? [];
    return {
      inReview: rows.filter((row) => row.status === 'IN_REVIEW').length,
      approved: rows.filter((row) => row.status === 'APPROVED').length,
      denied: rows.filter((row) => row.status === 'DENIED').length,
    };
  }, [detail]);

  async function loadAgreement(agreementId: string) {
    setErrorMessage(null);
    setSuccessMessage(null);
    setSelectedAgreementId(agreementId);
    const response = await fetch(`/api/institutional/learning-agreement/${agreementId}`);
    const payload = await response.json();
    if (!response.ok) {
      setErrorMessage(payload.error ?? 'Unable to load agreement details.');
      return;
    }
    setDetail(payload.data);
  }

  async function makeDecision(rowId: string, decision: 'APPROVED' | 'DENIED') {
    if (!selectedAgreementId) return;
    setErrorMessage(null);
    setSuccessMessage(null);
    const rationale = denyRationales[rowId]?.trim() ?? '';
    if (decision === 'DENIED' && !rationale) {
      setErrorMessage('Please add a reason before requesting changes.');
      return;
    }

    const response = await fetch(`/api/institutional/learning-agreement/${selectedAgreementId}/rows/${rowId}/decision`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ decision, rationale: rationale || undefined }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      setErrorMessage(payload.error ?? 'Action is blocked right now.');
      return;
    }

    setSuccessMessage(decision === 'APPROVED' ? 'Row approved.' : 'Changes requested for row.');
    startTransition(async () => {
      await loadAgreement(selectedAgreementId);
      router.refresh();
    });
  }

  if (queue.length === 0) {
    return <EmptyState description="No assigned Learning Agreements are waiting for review." />;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <Card>
        <h2 className="text-base font-semibold text-ink">Assigned agreements</h2>
        <div className="mt-4 space-y-3">
          {queue.map((item) => (
            <button
              key={item.id}
              className={`w-full rounded-lg border p-3 text-left ${selectedAgreementId === item.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white'}`}
              onClick={() => void loadAgreement(item.id)}
            >
              <p className="text-sm font-semibold text-ink">Student: {item.mobilityRecord?.studentId ?? 'Unknown student'}</p>
              <p className="mt-1 text-xs text-slate-600">Mobility record: {item.mobilityRecordId}</p>
              <p className="mt-1 text-xs text-slate-600">Version {item.version}</p>
              <p className="mt-1 text-xs text-slate-600">Submitted: {item.submittedAt ? new Date(item.submittedAt).toLocaleDateString() : 'Not sent yet'}</p>
              <div className="mt-2"><StatusBadge tone="pending">{learningAgreementStateLabels[item.state]}</StatusBadge></div>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        {!detail ? <EmptyState description="Select an agreement to review latest rows." /> : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-ink">Agreement details</h2>
              <StatusBadge tone="info">{learningAgreementStateLabels[detail.state]}</StatusBadge>
            </div>
            <p className="mt-2 text-sm text-slate-600">Approved rows will appear in the Academic Summary.</p>
            <p className="mt-1 text-xs text-slate-500">In review: {reviewCounts.inReview} · Approved: {reviewCounts.approved} · Needs changes: {reviewCounts.denied}</p>
            {errorMessage ? <div className="mt-4"><ErrorState description={errorMessage} /></div> : null}
            {successMessage ? <div className="mt-4"><SuccessState description={successMessage} /></div> : null}
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-500">
                    <th className="py-2 pr-3">Home course</th><th className="py-2 pr-3">Destination course</th><th className="py-2 pr-3">ECTS</th><th className="py-2 pr-3">Semester</th><th className="py-2 pr-3">Status</th><th className="py-2 pr-3">Review</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.rows.filter((row) => row.isLatest).map((row) => (
                    <tr key={row.id} className="border-b border-slate-100 align-top">
                      <td className="py-3 pr-3"><p className="font-medium text-ink">{row.homeCourseCode}</p><p className="text-slate-600">{row.homeCourseName}</p></td>
                      <td className="py-3 pr-3"><p className="font-medium text-ink">{row.destinationCourseCode}</p><p className="text-slate-600">{row.destinationCourseName}</p><p className="text-xs text-slate-500">Revision {row.revision}</p></td>
                      <td className="py-3 pr-3">{row.ects}</td>
                      <td className="py-3 pr-3">{row.semester}</td>
                      <td className="py-3 pr-3"><StatusBadge tone={row.status === 'APPROVED' ? 'success' : row.status === 'DENIED' ? 'warning' : 'pending'}>{learningAgreementRowStatusLabels[row.status]}</StatusBadge>{row.decisionRationale ? <p className="mt-2 text-xs text-slate-600">Reason: {row.decisionRationale}</p> : null}</td>
                      <td className="py-3 pr-3">
                        {row.status === 'IN_REVIEW' ? <div className="space-y-2"><Button onClick={() => void makeDecision(row.id, 'APPROVED')} disabled={isPending}>Approve</Button><textarea className="w-full rounded-md border border-slate-300 p-2 text-sm" placeholder="Add reason for changes" value={denyRationales[row.id] ?? ''} onChange={(event) => setDenyRationales((prev) => ({ ...prev, [row.id]: event.target.value }))} /><Button variant="secondary" onClick={() => void makeDecision(row.id, 'DENIED')} disabled={isPending}>Request changes</Button></div> : <span className="text-xs text-slate-500">Already reviewed</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
