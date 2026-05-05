import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { AttachmentError, replaceAttachment } from '@/src/modules/institutional/attachments';

const statusFor = (code: string) => code === 'FORBIDDEN' ? 403 : code === 'NOT_FOUND' ? 404 : code === 'INVALID_STATE' ? 409 : 400;

async function handle(request: Request, { params }: { params: Promise<{ submissionId: string; attachmentId: string }> }) {
  try {
    const ctx = await getDemoContextFromRequest();
    const { submissionId, attachmentId } = await params;
    const body = await request.json();
    const data = await replaceAttachment(ctx, submissionId, attachmentId, body);
    return Response.json({ data });
  } catch (error) {
    if (error instanceof AttachmentError) return Response.json({ error: error.message }, { status: statusFor(error.code) });
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ submissionId: string; attachmentId: string }> }) {
  return handle(request, context);
}

export async function POST(request: Request, context: { params: Promise<{ submissionId: string; attachmentId: string }> }) {
  return handle(request, context);
}
