import { beforeEach, describe, expect, it } from 'vitest';
import { seed } from '@/prisma/seed';
import { prisma } from '@/src/lib/prisma';
import { openAttachment } from '@/src/modules/institutional/attachments';
import { saveInstitutionalUpload } from '@/src/modules/institutional/file-storage';

describe('Institutional attachment opening', () => {
  beforeEach(async () => {
    await seed();
  });

  it('student and assigned coordinator can open uploaded attachment; filename, mime and bytes are preserved', async () => {
    const payload = Buffer.from([37, 80, 68, 70, 45, 49, 46, 55]);
    const stored = await saveInstitutionalUpload(payload, 'visa-document.pdf');
    await prisma.documentAttachment.create({ data: { id: 'att-open-1', submissionId: 'sub-1', uploadedById: 'student-1', fileName: 'visa-document.pdf', mimeType: 'application/pdf', sizeBytes: payload.byteLength, storageKey: stored.storageKey, status: 'ACTIVE' } });

    const studentOpened = await openAttachment({ role: 'STUDENT', userId: 'student-1' }, 'sub-1', 'att-open-1');
    expect(studentOpened.fileName).toBe('visa-document.pdf');
    expect(studentOpened.mimeType).toBe('application/pdf');
    expect(studentOpened.sizeBytes).toBe(payload.byteLength);
    expect(Buffer.compare(studentOpened.file, payload)).toBe(0);

    const coordinatorOpened = await openAttachment({ role: 'COORDINATOR', userId: 'coordinator-1' }, 'sub-1', 'att-open-1');
    expect(Buffer.compare(coordinatorOpened.file, payload)).toBe(0);
  });

  it('unrelated student or coordinator cannot open attachment', async () => {
    const stored = await saveInstitutionalUpload(Buffer.from([1, 2, 3]), 'x.pdf');
    await prisma.documentAttachment.create({ data: { id: 'att-open-2', submissionId: 'sub-1', uploadedById: 'student-1', fileName: 'x.pdf', mimeType: 'application/pdf', sizeBytes: 3, storageKey: stored.storageKey, status: 'ACTIVE' } });
    await prisma.user.upsert({ where: { id: 'student-2' }, update: { email: 'student2@erasmusmate.demo', displayName: 'Student Two', role: 'STUDENT', institutionId: 'inst-home-1' }, create: { id: 'student-2', email: 'student2@erasmusmate.demo', displayName: 'Student Two', role: 'STUDENT', institutionId: 'inst-home-1' } });
    await prisma.user.upsert({ where: { id: 'coordinator-2' }, update: { email: 'coordinator2@erasmusmate.demo', displayName: 'Coordinator Two', role: 'COORDINATOR', institutionId: 'inst-home-1' }, create: { id: 'coordinator-2', email: 'coordinator2@erasmusmate.demo', displayName: 'Coordinator Two', role: 'COORDINATOR', institutionId: 'inst-home-1' } });

    await expect(openAttachment({ role: 'STUDENT', userId: 'student-2' }, 'sub-1', 'att-open-2')).rejects.toThrow('Forbidden');
    await expect(openAttachment({ role: 'COORDINATOR', userId: 'coordinator-2' }, 'sub-1', 'att-open-2')).rejects.toThrow('Forbidden');
  });

  it('open attachment response never exposes storage key internals', async () => {
    await expect(openAttachment({ role: 'STUDENT', userId: 'student-1' }, 'sub-4', 'att-2')).rejects.not.toThrow(/demo\//i);
  });
});
