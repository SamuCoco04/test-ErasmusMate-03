import { PageHeader } from '@/src/components/PageHeader';

export default function CoordinatorLearningAgreementReviewPlaceholderPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        sectionLabel="Learning Agreement review"
        title="Review interface is coming next"
        subtitle="Phase 4A stabilizes backend behavior and tests. Full review UI is planned for Phase 4B."
      />
      <p className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
        Use the review queue API in this phase. This placeholder avoids dead navigation links.
      </p>
    </div>
  );
}
