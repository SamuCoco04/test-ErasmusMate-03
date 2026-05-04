import { withInstitutionalRead } from '../_shared';
import { getStudentProcedureSummary } from '@/src/modules/institutional/read-models';
export async function GET() { return withInstitutionalRead(['STUDENT'], getStudentProcedureSummary); }
