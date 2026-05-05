import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { addAttachment, AttachmentError, listAttachments } from '@/src/modules/institutional/attachments';

function statusFor(code: string) {
  if (code === 'FORBIDDEN') return 403;
  if (code === 'NOT_FOUND') return 404;
  if (code === 'INVALID_STATE') return 409;
  return 400;
}

export async function GET(_: Request, { params }: { params: Promise<{ submissionId: string }> }) {
  try {
    const ctx = await getDemoContextFromRequest();
    const { submissionId } = await params;
    const data = await listAttachments(ctx, submissionId);
    return Response.json({ data });
  } catch (error) {
    if (error instanceof AttachmentError) return Response.json({ error: error.message }, { status: statusFor(error.code) });
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ submissionId: string }> }) {
  try {
    const ctx = await getDemoContextFromRequest();
    const { submissionId } = await params;
    const body = await request.json();
    const data = await addAttachment(ctx, submissionId, body);
    return Response.json({ data }, { status: 201 });
  } catch (error) {
    if (error instanceof AttachmentError) return Response.json({ error: error.message }, { status: statusFor(error.code) });
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
