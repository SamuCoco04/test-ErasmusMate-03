import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { addAttachment, AttachmentError, listAttachments } from '@/src/modules/institutional/attachments';
import { saveInstitutionalUpload } from '@/src/modules/institutional/file-storage';

function statusFor(code: string) {
  if (code === 'FORBIDDEN') return 403;
  if (code === 'NOT_FOUND') return 404;
  if (code === 'INVALID_STATE') return 409;
  return 400;
}

export async function GET(request: Request, { params }: { params: Promise<{ submissionId: string }> }) {
  try {
    const ctx = await getDemoContextFromRequest(request);
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
    const ctx = await getDemoContextFromRequest(request);
    const { submissionId } = await params;
    const form = await request.formData();
    const file = form.get('file');
    if (!(file instanceof File)) return Response.json({ error: 'A file is required' }, { status: 400 });
    const buf = Buffer.from(await file.arrayBuffer());
    const stored = await saveInstitutionalUpload(buf, file.name);
    const data = await addAttachment(ctx, submissionId, { fileName: file.name, mimeType: file.type || 'application/octet-stream', sizeBytes: file.size, storageKey: stored.storageKey });
    return Response.json({ data }, { status: 201 });
  } catch (error) {
    if (error instanceof AttachmentError) return Response.json({ error: error.message }, { status: statusFor(error.code) });
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
