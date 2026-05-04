import { PageHeader } from '@/src/components/PageHeader';

export default function StudentLearningAgreementPlaceholderPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        sectionLabel="Learning Agreement"
        title="Learning Agreement editor is coming next"
        subtitle="Phase 4A includes stable APIs and rules. The full table editor UI lands in Phase 4B."
      />
      <p className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
        For now, use the API endpoints for workflow validation. This page is intentionally a placeholder.
      </p>
    </div>
  );
}
