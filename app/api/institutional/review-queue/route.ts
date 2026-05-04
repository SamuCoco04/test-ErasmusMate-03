import { withInstitutionalRead } from '../_shared';
import { getCoordinatorReviewQueuePreview } from '@/src/modules/institutional/read-models';
export async function GET() { return withInstitutionalRead(['COORDINATOR'], getCoordinatorReviewQueuePreview); }
