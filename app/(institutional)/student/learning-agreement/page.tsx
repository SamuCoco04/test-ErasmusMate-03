import { PageHeader } from '@/src/components/PageHeader';
import { ErrorState } from '@/src/components/States';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { createOrGetDraftAgreement, getLearningAgreementDetail } from '@/src/modules/institutional/learning-agreement';
import { StudentLearningAgreementEditor } from '@/src/components/student-learning-agreement-editor';
import { ButtonLink } from '@/src/components/Button';

export default async function StudentLearningAgreementPage() {
  try {
    const ctx = await getDemoContextFromRequest();
    const base = await createOrGetDraftAgreement(ctx);
    const detail = await getLearningAgreementDetail(ctx, base.id);
    if (!detail) throw new Error('Learning Agreement not found');

    return <div className="space-y-6">
      <PageHeader sectionLabel="Learning Agreement" title="My Learning Agreement" subtitle="Manage your course equivalences and send updates for coordinator review." />
      <div className="flex justify-end"><ButtonLink href="/student/academic-summary" variant="secondary">View Academic Summary</ButtonLink></div>
      <p className="text-sm text-slate-600">Editing an approved row creates a new version for review.</p>
      <StudentLearningAgreementEditor agreement={detail as never} />
    </div>;
  } catch (error) {
    return <div className="space-y-6">
      <PageHeader sectionLabel="Learning Agreement" title="My Learning Agreement" subtitle="Manage your course equivalences and send updates for coordinator review." />
      <ErrorState description={error instanceof Error ? error.message : 'Unable to load Learning Agreement.'} />
    </div>;
  }
}
