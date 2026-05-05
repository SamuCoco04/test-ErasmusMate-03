import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { AttachmentError, removeAttachment } from '@/src/modules/institutional/attachments';

const statusFor = (code: string) => code === 'FORBIDDEN' ? 403 : code === 'NOT_FOUND' ? 404 : code === 'INVALID_STATE' ? 409 : 400;

export async function DELETE(_: Request, { params }: { params: Promise<{ submissionId: string; attachmentId: string }> }) {
  try {
    const ctx = await getDemoContextFromRequest();
    const { submissionId, attachmentId } = await params;
    const data = await removeAttachment(ctx, submissionId, attachmentId);
    return Response.json({ data });
  } catch (error) {
    if (error instanceof AttachmentError) return Response.json({ error: error.message }, { status: statusFor(error.code) });
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
