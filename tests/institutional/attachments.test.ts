import { beforeEach, describe, expect, it } from 'vitest';
import { seed } from '@/prisma/seed';
import { prisma } from '@/src/lib/prisma';
import { addAttachment, listAttachments, removeAttachment, replaceAttachment } from '@/src/modules/institutional/attachments';

describe('Institutional attachment workflow', () => {
  beforeEach(async () => {
    await seed();
  });

  it('student can add attachment to own editable submission', async () => {
    const data = await addAttachment({ role: 'STUDENT', userId: 'student-1' }, 'sub-1', { fileName: 'doc.pdf', mimeType: 'application/pdf', sizeBytes: 1234, storageKey: 'demo/sub-1/doc.pdf' });
    expect(data.fileName).toBe('doc.pdf');
  });

  it('student cannot add attachment to another student submission', async () => {
    await expect(addAttachment({ role: 'STUDENT', userId: 'student-2' }, 'sub-1', { fileName: 'doc.pdf', mimeType: 'application/pdf', sizeBytes: 1234, storageKey: 'demo/sub-1/doc.pdf' })).rejects.toThrow('Forbidden');
  });

  it('student cannot alter locked submission attachments', async () => {
    await expect(addAttachment({ role: 'STUDENT', userId: 'student-1' }, 'sub-2', { fileName: 'doc.pdf', mimeType: 'application/pdf', sizeBytes: 1234, storageKey: 'demo/sub-2/doc.pdf' })).rejects.toThrow('locked');
    await expect(replaceAttachment({ role: 'STUDENT', userId: 'student-1' }, 'sub-2', 'att-1', { fileName: 'doc2.pdf', mimeType: 'application/pdf', sizeBytes: 1234, storageKey: 'demo/sub-2/doc2.pdf' })).rejects.toThrow('locked');
    await expect(removeAttachment({ role: 'STUDENT', userId: 'student-1' }, 'sub-2', 'att-1')).rejects.toThrow('locked');
  });

  it('coordinator can view assigned attachments and not unassigned', async () => {
    const items = await listAttachments({ role: 'COORDINATOR', userId: 'coordinator-1' }, 'sub-2');
    expect(items.length).toBeGreaterThan(0);
    await prisma.user.upsert({ where: { id: 'coordinator-2' }, update: { email: 'coordinator2@erasmusmate.demo', displayName: 'Coordinator Two', role: 'COORDINATOR', institutionId: 'inst-home-1' }, create: { id: 'coordinator-2', email: 'coordinator2@erasmusmate.demo', displayName: 'Coordinator Two', role: 'COORDINATOR', institutionId: 'inst-home-1' } });
    await expect(listAttachments({ role: 'COORDINATOR', userId: 'coordinator-2' }, 'sub-2')).rejects.toThrow('Forbidden');
  });

  it('coordinator cannot modify attachments', async () => {
    await expect(addAttachment({ role: 'COORDINATOR', userId: 'coordinator-1' }, 'sub-2', { fileName: 'doc.pdf', mimeType: 'application/pdf', sizeBytes: 1234, storageKey: 'demo/sub-2/doc.pdf' })).rejects.toThrow('Forbidden');
  });

  it('admin can read metadata and no storage internals leaked', async () => {
    const data = await listAttachments({ role: 'ADMIN', userId: 'admin-1' }, 'sub-5');
    expect(data[0]).not.toHaveProperty('uploadedById');
    expect(data[0]).not.toHaveProperty('storageKey');
  });

  it('validation rejects bad metadata and oversized', async () => {
    await expect(addAttachment({ role: 'STUDENT', userId: 'student-1' }, 'sub-1', { fileName: '', mimeType: 'application/pdf', sizeBytes: 100, storageKey: 'a' })).rejects.toThrow('Filename');
    await expect(addAttachment({ role: 'STUDENT', userId: 'student-1' }, 'sub-1', { fileName: 'a.txt', mimeType: 'text/plain', sizeBytes: 100, storageKey: 'a' })).rejects.toThrow('Unsupported');
    await expect(addAttachment({ role: 'STUDENT', userId: 'student-1' }, 'sub-1', { fileName: 'a.pdf', mimeType: 'application/pdf', sizeBytes: 11 * 1024 * 1024, storageKey: 'a' })).rejects.toThrow('large');
  });

  it('replace marks previous as replaced', async () => {
    const replaced = await replaceAttachment({ role: 'STUDENT', userId: 'student-1' }, 'sub-5', 'att-3', { fileName: 'passport-copy-v3.pdf', mimeType: 'application/pdf', sizeBytes: 161000, storageKey: 'demo/sub-5/passport-copy-v3.pdf' });
    expect(replaced.status).toBe('ACTIVE');
    const prior = await prisma.documentAttachment.findUniqueOrThrow({ where: { id: 'att-3' } });
    expect(prior.status).toBe('REPLACED');
  });

  it('seed remains idempotent', async () => {
    await seed();
    const count = await prisma.documentAttachment.count();
    expect(count).toBe(3);
  });
});
