import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { AttachmentError, replaceAttachment } from '@/src/modules/institutional/attachments';
import { saveInstitutionalUpload } from '@/src/modules/institutional/file-storage';

const statusFor = (code: string) => code === 'FORBIDDEN' ? 403 : code === 'NOT_FOUND' ? 404 : code === 'INVALID_STATE' ? 409 : 400;

async function handle(request: Request, { params }: { params: Promise<{ submissionId: string; attachmentId: string }> }) {
  try {
    const ctx = await getDemoContextFromRequest(request);
    const { submissionId, attachmentId } = await params;
    const form = await request.formData();
    const file = form.get('file');
    if (!(file instanceof File)) return Response.json({ error: 'A file is required' }, { status: 400 });
    const stored = await saveInstitutionalUpload(Buffer.from(await file.arrayBuffer()), file.name);
    const data = await replaceAttachment(ctx, submissionId, attachmentId, { fileName: file.name, mimeType: file.type || 'application/octet-stream', sizeBytes: file.size, storageKey: stored.storageKey });
    return Response.json({ data });
  } catch (error) {
    if (error instanceof AttachmentError) return Response.json({ error: error.message }, { status: statusFor(error.code) });
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ submissionId: string; attachmentId: string }> }) { return handle(request, context); }
export async function POST(request: Request, context: { params: Promise<{ submissionId: string; attachmentId: string }> }) { return handle(request, context); }
