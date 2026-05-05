import { beforeEach, describe, expect, it } from 'vitest';
import { seed } from '@/prisma/seed';
import { prisma } from '@/src/lib/prisma';
import { POST as addAttachmentRoute } from '@/app/api/institutional/submissions/[submissionId]/attachments/route';
import { POST as replaceAttachmentRoute } from '@/app/api/institutional/submissions/[submissionId]/attachments/[attachmentId]/replace/route';

describe('Institutional attachment API multipart flow', () => {
  beforeEach(async () => {
    await seed();
  });

  it('accepts multipart upload and persists file metadata from uploaded file', async () => {
    const form = new FormData();
    const payload = new Uint8Array([37, 80, 68, 70, 45, 49, 46, 52]);
    form.set('file', new File([payload], 'housing-proof.pdf', { type: 'application/pdf' }));
    const request = new Request('http://localhost/api/institutional/submissions/sub-1/attachments', { method: 'POST', body: form });

    const response = await addAttachmentRoute(request, { params: Promise.resolve({ submissionId: 'sub-1' }) });
    expect(response.status).toBe(201);

    const json = await response.json() as { data: { id: string; fileName: string; mimeType: string; sizeBytes: number; status: string; version: number; submissionId: string } };
    expect(json.data.fileName).toBe('housing-proof.pdf');
    expect(json.data.mimeType).toBe('application/pdf');
    expect(json.data.sizeBytes).toBe(payload.byteLength);
    expect(json.data.status).toBe('ACTIVE');
    expect(json.data.submissionId).toBe('sub-1');

    const fromDb = await prisma.documentAttachment.findUniqueOrThrow({ where: { id: json.data.id } });
    expect(fromDb.fileName).toBe('housing-proof.pdf');
    expect(fromDb.mimeType).toBe('application/pdf');
    expect(fromDb.sizeBytes).toBe(payload.byteLength);
    expect(fromDb.status).toBe('ACTIVE');
  });

  it('replacement marks prior ACTIVE attachment as REPLACED and creates a new ACTIVE version', async () => {
    const form = new FormData();
    form.set('file', new File([new Uint8Array([1, 2, 3, 4])], 'passport-copy-v3.pdf', { type: 'application/pdf' }));
    const request = new Request('http://localhost/api/institutional/submissions/sub-5/attachments/att-3/replace', { method: 'POST', body: form });

    const response = await replaceAttachmentRoute(request, { params: Promise.resolve({ submissionId: 'sub-5', attachmentId: 'att-3' }) });
    expect(response.status).toBe(200);
    const json = await response.json() as { data: { id: string; status: string; version: number; fileName: string } };

    expect(json.data.fileName).toBe('passport-copy-v3.pdf');
    expect(json.data.status).toBe('ACTIVE');
    expect(json.data.version).toBe(3);

    const oldAttachment = await prisma.documentAttachment.findUniqueOrThrow({ where: { id: 'att-3' } });
    const newAttachment = await prisma.documentAttachment.findUniqueOrThrow({ where: { id: json.data.id } });
    expect(oldAttachment.status).toBe('REPLACED');
    expect(newAttachment.status).toBe('ACTIVE');
  });
});
