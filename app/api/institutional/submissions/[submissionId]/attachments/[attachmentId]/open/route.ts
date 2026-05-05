import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { AttachmentError, openAttachment } from '@/src/modules/institutional/attachments';

function safeName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
}

export async function GET(_: Request, { params }: { params: Promise<{ submissionId: string; attachmentId: string }> }) {
  try {
    const ctx = await getDemoContextFromRequest();
    const { submissionId, attachmentId } = await params;
    const opened = await openAttachment(ctx, submissionId, attachmentId);
    return new Response(opened.file, {
      status: 200,
      headers: {
        'Content-Type': opened.mimeType,
        'Content-Disposition': `inline; filename="${safeName(opened.fileName)}"`,
        'Content-Length': String(opened.file.byteLength),
        'Cache-Control': 'private, no-store',
        'Pragma': 'no-cache',
      },
    });
  } catch (error) {
    if (error instanceof AttachmentError) return Response.json({ error: error.message }, { status: error.code === 'FORBIDDEN' ? 403 : 404 });
    return Response.json({ error: 'Document not available' }, { status: 404 });
  }
}
