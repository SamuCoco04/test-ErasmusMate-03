import { withInstitutionalRead } from '../_shared';
import { getDeadlineSummary } from '@/src/modules/institutional/read-models';
export async function GET() { return withInstitutionalRead(['STUDENT','COORDINATOR','ADMIN'], getDeadlineSummary); }
