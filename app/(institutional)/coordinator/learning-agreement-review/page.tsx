import { PageHeader } from '@/src/components/PageHeader';
import { ErrorState } from '@/src/components/States';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { getLearningAgreementDetail, getLearningAgreementReviewQueue } from '@/src/modules/institutional/learning-agreement';
import { CoordinatorLearningAgreementReview } from '@/src/components/coordinator-learning-agreement-review';

export default async function CoordinatorLearningAgreementReviewPage() {
  try {
    const ctx = await getDemoContextFromRequest();
    const queue = await getLearningAgreementReviewQueue(ctx);
    const initialDetail = queue[0] ? await getLearningAgreementDetail(ctx, queue[0].id) : null;

    return (
      <div className="space-y-6">
        <PageHeader
          sectionLabel="Coordinator"
          title="Learning Agreement Review"
          subtitle="Review assigned Learning Agreement rows and decide what can move forward."
        />
        <CoordinatorLearningAgreementReview queue={queue as never} initialDetail={initialDetail as never} />
      </div>
    );
  } catch (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          sectionLabel="Coordinator"
          title="Learning Agreement Review"
          subtitle="Review assigned Learning Agreement rows and decide what can move forward."
        />
        <ErrorState description={error instanceof Error ? error.message : 'Unable to load review queue.'} />
      </div>
    );
  }
}
