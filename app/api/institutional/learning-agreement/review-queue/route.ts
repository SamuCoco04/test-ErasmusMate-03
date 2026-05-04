import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { getLearningAgreementReviewQueue, LearningAgreementError } from '@/src/modules/institutional/learning-agreement';

export async function GET() {
  try {
    const ctx = await getDemoContextFromRequest();
    const data = await getLearningAgreementReviewQueue(ctx);
    return Response.json({ data });
  } catch (error) {
    if (error instanceof LearningAgreementError) {
      return Response.json({ error: error.message }, { status: error.code === 'FORBIDDEN' ? 403 : 400 });
    }
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
