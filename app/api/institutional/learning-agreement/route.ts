import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { createOrGetDraftAgreement, getLearningAgreementForCoordinator, getLearningAgreementForStudent, LearningAgreementError } from '@/src/modules/institutional/learning-agreement';

function statusFor(code: string) {
  if (code === 'FORBIDDEN') return 403;
  if (code === 'NOT_FOUND') return 404;
  return 400;
}

export async function GET() {
  try {
    const ctx = await getDemoContextFromRequest();
    const data = ctx.role === 'STUDENT' ? await getLearningAgreementForStudent(ctx) : await getLearningAgreementForCoordinator(ctx);
    return Response.json({ data });
  } catch (error) {
    if (error instanceof LearningAgreementError) return Response.json({ error: error.message }, { status: statusFor(error.code) });
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const ctx = await getDemoContextFromRequest();
    const data = await createOrGetDraftAgreement(ctx);
    return Response.json({ data });
  } catch (error) {
    if (error instanceof LearningAgreementError) return Response.json({ error: error.message }, { status: statusFor(error.code) });
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
