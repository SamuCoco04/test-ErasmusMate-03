import { prisma } from '@/src/lib/prisma';
import { DemoContext } from '@/src/modules/shared/demo-context';
import { createNotification } from '@/src/modules/notifications/notifications';

const ALLOWED_MIME = new Set(['application/pdf', 'image/png', 'image/jpeg']);
const MAX_SIZE_BYTES = 10 * 1024 * 1024;
const EDITABLE_STATES = new Set(['DRAFT', 'REJECTED', 'REOPENED', 'NEEDS_CORRECTION']);

export class AttachmentError extends Error { constructor(public code: string, message: string) { super(message); } }

type AttachmentInput = { fileName: string; mimeType: string; sizeBytes: number; storageKey: string };

async function getSubmissionForScope(submissionId: string, ctx: DemoContext) {
  const submission = await prisma.documentSubmission.findUnique({ where: { id: submissionId }, include: { mobilityRecord: true, attachments: true } });
  if (!submission) throw new AttachmentError('NOT_FOUND', 'Submission not found');
  if (ctx.role === 'STUDENT' && submission.mobilityRecord.studentId !== ctx.userId) throw new AttachmentError('FORBIDDEN', 'Forbidden');
  if (ctx.role === 'COORDINATOR' && submission.mobilityRecord.coordinatorId !== ctx.userId) throw new AttachmentError('FORBIDDEN', 'Forbidden');
  return submission;
}

function validateInput(input: AttachmentInput) {
  if (!input.fileName?.trim()) throw new AttachmentError('VALIDATION', 'Filename is required');
  if (!ALLOWED_MIME.has(input.mimeType)) throw new AttachmentError('VALIDATION', 'Unsupported file type');
  if (!Number.isInteger(input.sizeBytes) || input.sizeBytes <= 0) throw new AttachmentError('VALIDATION', 'Invalid file size');
  if (input.sizeBytes > MAX_SIZE_BYTES) throw new AttachmentError('VALIDATION', 'File is too large');
}

function sanitize(attachment: { id: string; submissionId: string; fileName: string; mimeType: string; sizeBytes: number; version: number; status: string; createdAt: Date; updatedAt: Date }) {
  return {
    id: attachment.id,
    submissionId: attachment.submissionId,
    fileName: attachment.fileName,
    mimeType: attachment.mimeType,
    sizeBytes: attachment.sizeBytes,
    version: attachment.version,
    status: attachment.status,
    createdAt: attachment.createdAt,
    updatedAt: attachment.updatedAt,
  };
}

export async function listAttachments(ctx: DemoContext, submissionId: string) {
  if (!['STUDENT', 'COORDINATOR', 'ADMIN'].includes(ctx.role)) throw new AttachmentError('FORBIDDEN', 'Forbidden');
  if (ctx.role === 'ADMIN') {
    const rows = await prisma.documentAttachment.findMany({ where: { submissionId }, orderBy: { createdAt: 'asc' } });
    return rows.map(sanitize);
  }
  const submission = await getSubmissionForScope(submissionId, ctx);
  return submission.attachments.map(sanitize);
}

export async function addAttachment(ctx: DemoContext, submissionId: string, input: AttachmentInput) {
  if (ctx.role !== 'STUDENT') throw new AttachmentError('FORBIDDEN', 'Forbidden');
  validateInput(input);
  const submission = await getSubmissionForScope(submissionId, ctx);
  if (!EDITABLE_STATES.has(submission.state)) throw new AttachmentError('INVALID_STATE', 'Submission is locked for attachments');
  const version = submission.attachments.length + 1;
  const created = await prisma.documentAttachment.create({ data: { id: `att-${crypto.randomUUID()}`, submissionId, uploadedById: ctx.userId, fileName: input.fileName.trim(), mimeType: input.mimeType, sizeBytes: input.sizeBytes, storageKey: input.storageKey, version, status: 'ACTIVE' } });
  await prisma.auditRecord.create({ data: { id: `audit-${crypto.randomUUID()}`, mobilityRecordId: submission.mobilityRecordId, actorId: ctx.userId, eventType: 'SUBMISSION_ATTACHMENT_ADDED', details: JSON.stringify({ submissionId, attachmentId: created.id, fileName: created.fileName }) } });
  await createNotification({ recipientUserId: submission.mobilityRecord.coordinatorId, actorUserId: ctx.userId, area: 'INSTITUTIONAL', type: 'SUBMISSION_ATTACHMENT_UPDATED', title: 'Submission attachment updated', body: 'A student updated files in a submission that may need review.', entityType: 'SUBMISSION', entityId: submissionId });
  return sanitize(created);
}

export async function replaceAttachment(ctx: DemoContext, submissionId: string, attachmentId: string, input: AttachmentInput) {
  if (ctx.role !== 'STUDENT') throw new AttachmentError('FORBIDDEN', 'Forbidden');
  validateInput(input);
  const submission = await getSubmissionForScope(submissionId, ctx);
  if (!EDITABLE_STATES.has(submission.state)) throw new AttachmentError('INVALID_STATE', 'Submission is locked for attachments');
  const previous = await prisma.documentAttachment.findFirst({ where: { id: attachmentId, submissionId } });
  if (!previous) throw new AttachmentError('NOT_FOUND', 'Attachment not found');
  await prisma.documentAttachment.update({ where: { id: previous.id }, data: { status: 'REPLACED' } });
  const created = await prisma.documentAttachment.create({ data: { id: `att-${crypto.randomUUID()}`, submissionId, uploadedById: ctx.userId, fileName: input.fileName.trim(), mimeType: input.mimeType, sizeBytes: input.sizeBytes, storageKey: input.storageKey, version: previous.version + 1, status: 'ACTIVE' } });
  await prisma.auditRecord.create({ data: { id: `audit-${crypto.randomUUID()}`, mobilityRecordId: submission.mobilityRecordId, actorId: ctx.userId, eventType: 'SUBMISSION_ATTACHMENT_REPLACED', details: JSON.stringify({ submissionId, replacedAttachmentId: previous.id, newAttachmentId: created.id }) } });
  return sanitize(created);
}

export async function removeAttachment(ctx: DemoContext, submissionId: string, attachmentId: string) {
  if (ctx.role !== 'STUDENT') throw new AttachmentError('FORBIDDEN', 'Forbidden');
  const submission = await getSubmissionForScope(submissionId, ctx);
  if (!EDITABLE_STATES.has(submission.state)) throw new AttachmentError('INVALID_STATE', 'Submission is locked for attachments');
  const previous = await prisma.documentAttachment.findFirst({ where: { id: attachmentId, submissionId } });
  if (!previous) throw new AttachmentError('NOT_FOUND', 'Attachment not found');
  const removed = await prisma.documentAttachment.update({ where: { id: previous.id }, data: { status: 'REMOVED' } });
  await prisma.auditRecord.create({ data: { id: `audit-${crypto.randomUUID()}`, mobilityRecordId: submission.mobilityRecordId, actorId: ctx.userId, eventType: 'SUBMISSION_ATTACHMENT_REMOVED', details: JSON.stringify({ submissionId, attachmentId: previous.id }) } });
  return sanitize(removed);
}
