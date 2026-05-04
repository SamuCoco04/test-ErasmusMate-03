import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seed() {
  await prisma.auditRecord.deleteMany();
  await prisma.exceptionRequest.deleteMany();
  await prisma.deadline.deleteMany();
  await prisma.documentSubmissionEvent.deleteMany();
  await prisma.documentSubmission.deleteMany();
  await prisma.procedureDefinition.deleteMany();

  await prisma.institution.upsert({ where: { id: 'inst-home-1' }, update: { name: 'Universidad de Sevilla', code: 'US', country: 'Spain' }, create: { id: 'inst-home-1', name: 'Universidad de Sevilla', code: 'US', country: 'Spain' } });
  await prisma.institution.upsert({ where: { id: 'inst-host-1' }, update: { name: 'KU Leuven', code: 'KUL', country: 'Belgium' }, create: { id: 'inst-host-1', name: 'KU Leuven', code: 'KUL', country: 'Belgium' } });

  await prisma.user.upsert({ where: { id: 'student-1' }, update: { email: 'student1@erasmusmate.demo', displayName: 'Student One', role: 'STUDENT', institutionId: 'inst-home-1' }, create: { id: 'student-1', email: 'student1@erasmusmate.demo', displayName: 'Student One', role: 'STUDENT', institutionId: 'inst-home-1' } });
  await prisma.user.upsert({ where: { id: 'coordinator-1' }, update: { email: 'coordinator1@erasmusmate.demo', displayName: 'Coordinator One', role: 'COORDINATOR', institutionId: 'inst-home-1' }, create: { id: 'coordinator-1', email: 'coordinator1@erasmusmate.demo', displayName: 'Coordinator One', role: 'COORDINATOR', institutionId: 'inst-home-1' } });
  await prisma.user.upsert({ where: { id: 'admin-1' }, update: { email: 'admin1@erasmusmate.demo', displayName: 'Admin One', role: 'ADMIN', institutionId: 'inst-home-1' }, create: { id: 'admin-1', email: 'admin1@erasmusmate.demo', displayName: 'Admin One', role: 'ADMIN', institutionId: 'inst-home-1' } });

  await prisma.mobilityRecord.upsert({ where: { id: 'mobility-1' }, update: { studentId: 'student-1', coordinatorId: 'coordinator-1', homeInstitutionId: 'inst-home-1', hostInstitutionId: 'inst-host-1', mobilityStatus: 'ACTIVE', startDate: new Date('2026-09-01T00:00:00.000Z'), endDate: new Date('2027-01-31T00:00:00.000Z') }, create: { id: 'mobility-1', studentId: 'student-1', coordinatorId: 'coordinator-1', homeInstitutionId: 'inst-home-1', hostInstitutionId: 'inst-host-1', mobilityStatus: 'ACTIVE', startDate: new Date('2026-09-01T00:00:00.000Z'), endDate: new Date('2027-01-31T00:00:00.000Z') } });

  const procedures = [
    { id: 'proc-1', title: 'Passport copy', sortOrder: 1 },
    { id: 'proc-2', title: 'Insurance proof', sortOrder: 2 },
    { id: 'proc-3', title: 'Arrival certificate', sortOrder: 3 },
    { id: 'proc-4', title: 'Transcript request', sortOrder: 4 },
  ];
  for (const p of procedures) {
    await prisma.procedureDefinition.upsert({ where: { id: p.id }, update: { institutionId: 'inst-home-1', description: `${p.title} for Erasmus procedure`, isRequired: true, sortOrder: p.sortOrder }, create: { id: p.id, institutionId: 'inst-home-1', title: p.title, description: `${p.title} for Erasmus procedure`, isRequired: true, sortOrder: p.sortOrder } });
  }

  await prisma.documentSubmission.createMany({ data: [
    { id: 'sub-1', mobilityRecordId: 'mobility-1', procedureId: 'proc-1', state: 'DRAFT' },
    { id: 'sub-2', mobilityRecordId: 'mobility-1', procedureId: 'proc-2', state: 'SUBMITTED', submittedAt: new Date('2026-05-01T09:00:00.000Z') },
    { id: 'sub-3', mobilityRecordId: 'mobility-1', procedureId: 'proc-3', state: 'IN_REVIEW', submittedAt: new Date('2026-04-10T09:00:00.000Z'), reviewedAt: new Date('2026-04-12T09:00:00.000Z') },
    { id: 'sub-4', mobilityRecordId: 'mobility-1', procedureId: 'proc-4', state: 'REJECTED', submittedAt: new Date('2026-04-09T09:00:00.000Z'), reviewedAt: new Date('2026-04-11T09:00:00.000Z'), reviewerNotes: 'Needs corrected file format' },
    { id: 'sub-5', mobilityRecordId: 'mobility-1', procedureId: 'proc-1', state: 'APPROVED', submittedAt: new Date('2026-04-01T09:00:00.000Z'), reviewedAt: new Date('2026-04-03T09:00:00.000Z') },
  ] });

  await prisma.deadline.createMany({ data: [
    { id: 'dead-1', mobilityRecordId: 'mobility-1', title: 'Before departure documents', dueDate: new Date('2026-06-10T00:00:00.000Z'), state: 'UPCOMING' },
    { id: 'dead-2', mobilityRecordId: 'mobility-1', title: 'Accommodation proof', dueDate: new Date('2026-04-15T00:00:00.000Z'), state: 'OVERDUE' },
    { id: 'dead-3', mobilityRecordId: 'mobility-1', title: 'Arrival registration', dueDate: new Date('2026-03-20T00:00:00.000Z'), state: 'FULFILLED', fulfilledAt: new Date('2026-03-18T00:00:00.000Z') },
  ] });

  await prisma.exceptionRequest.upsert({ where: { id: 'exc-1' }, update: { mobilityRecordId: 'mobility-1', requestedById: 'student-1', title: 'Deadline extension request', reason: 'Visa appointment delayed by embassy.', state: 'PENDING' }, create: { id: 'exc-1', mobilityRecordId: 'mobility-1', requestedById: 'student-1', title: 'Deadline extension request', reason: 'Visa appointment delayed by embassy.', state: 'PENDING' } });

  await prisma.auditRecord.createMany({ data: [
    { id: 'audit-1', mobilityRecordId: 'mobility-1', actorId: 'student-1', eventType: 'SUBMISSION_CREATED', details: 'Created draft for Passport copy' },
    { id: 'audit-2', mobilityRecordId: 'mobility-1', actorId: 'coordinator-1', eventType: 'SUBMISSION_APPROVED', details: 'Approved Arrival certificate' },
  ] });
}

async function runSeedCli() {
  try {
    await seed();
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  void runSeedCli();
}
