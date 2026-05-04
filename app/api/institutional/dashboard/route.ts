import { withInstitutionalRead } from '../_shared';
import { getAdminInstitutionalOverview, getCoordinatorDashboardSummary, getStudentDashboardSummary } from '@/src/modules/institutional/read-models';

export async function GET() {
  return withInstitutionalRead(['STUDENT', 'COORDINATOR', 'ADMIN'], async (ctx) => {
    if (ctx.role === 'STUDENT') return { role: ctx.role, ...(await getStudentDashboardSummary(ctx)) };
    if (ctx.role === 'COORDINATOR') return { role: ctx.role, ...(await getCoordinatorDashboardSummary(ctx)) };
    return { role: ctx.role, ...(await getAdminInstitutionalOverview(ctx)) };
  });
}
