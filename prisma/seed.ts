import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seed() {
  await prisma.learningAgreementEvent.deleteMany();
  await prisma.learningAgreementRow.deleteMany();
  await prisma.learningAgreement.deleteMany();
  await prisma.documentSubmissionEvent.deleteMany();

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
    await prisma.procedureDefinition.upsert({ where: { id: p.id }, update: { institutionId: 'inst-home-1', title: p.title, description: `${p.title} for Erasmus procedure`, isRequired: true, sortOrder: p.sortOrder }, create: { id: p.id, institutionId: 'inst-home-1', title: p.title, description: `${p.title} for Erasmus procedure`, isRequired: true, sortOrder: p.sortOrder } });
  }

  const documentSubmissions = [
    { id: 'sub-1', mobilityRecordId: 'mobility-1', procedureId: 'proc-1', state: 'DRAFT' },
    { id: 'sub-2', mobilityRecordId: 'mobility-1', procedureId: 'proc-2', state: 'SUBMITTED', submittedAt: new Date('2026-05-01T09:00:00.000Z') },
    { id: 'sub-3', mobilityRecordId: 'mobility-1', procedureId: 'proc-3', state: 'IN_REVIEW', submittedAt: new Date('2026-04-10T09:00:00.000Z'), reviewedAt: new Date('2026-04-12T09:00:00.000Z') },
    { id: 'sub-4', mobilityRecordId: 'mobility-1', procedureId: 'proc-4', state: 'REJECTED', submittedAt: new Date('2026-04-09T09:00:00.000Z'), reviewedAt: new Date('2026-04-11T09:00:00.000Z'), reviewerNotes: 'Needs corrected file format' },
    { id: 'sub-5', mobilityRecordId: 'mobility-1', procedureId: 'proc-1', state: 'APPROVED', submittedAt: new Date('2026-04-01T09:00:00.000Z'), reviewedAt: new Date('2026-04-03T09:00:00.000Z') },
  ] as const;

  for (const submission of documentSubmissions) {
    await prisma.documentSubmission.upsert({ where: { id: submission.id }, update: submission, create: submission });
  }

  const deadlines = [
    { id: 'dead-1', mobilityRecordId: 'mobility-1', title: 'Before departure documents', dueDate: new Date('2026-06-10T00:00:00.000Z'), overrideDueDate: null, relatedProcedureId: 'proc-1', state: 'UPCOMING', fulfilledAt: null },
    { id: 'dead-2', mobilityRecordId: 'mobility-1', title: 'Accommodation proof', dueDate: new Date('2026-04-15T00:00:00.000Z'), overrideDueDate: null, relatedProcedureId: 'proc-2', state: 'OVERDUE', fulfilledAt: null },
    { id: 'dead-3', mobilityRecordId: 'mobility-1', title: 'Arrival registration', dueDate: new Date('2026-03-20T00:00:00.000Z'), overrideDueDate: null, relatedProcedureId: 'proc-3', state: 'FULFILLED', fulfilledAt: new Date('2026-03-18T00:00:00.000Z') },
    { id: 'dead-4', mobilityRecordId: 'mobility-1', title: 'Insurance extension', dueDate: new Date('2026-04-20T00:00:00.000Z'), overrideDueDate: new Date('2026-05-20T00:00:00.000Z'), relatedProcedureId: 'proc-2', state: 'OVERRIDDEN', fulfilledAt: null },
    { id: 'dead-5', mobilityRecordId: 'mobility-1', title: 'Late transcript support', dueDate: new Date('2026-03-15T00:00:00.000Z'), overrideDueDate: new Date('2026-04-01T00:00:00.000Z'), relatedProcedureId: 'proc-4', state: 'OVERRIDDEN', fulfilledAt: null },
  ] as const;

  for (const deadline of deadlines) {
    await prisma.deadline.upsert({ where: { id: deadline.id }, update: deadline, create: deadline });
  }

  const exceptions = [
    { id: 'exc-1', mobilityRecordId: 'mobility-1', requestedById: 'student-1', deadlineId: 'dead-2', title: 'Deadline extension request', reason: 'Visa appointment delayed by embassy.', state: 'PENDING', coordinatorRationale: null, reviewedById: null },
    { id: 'exc-2', mobilityRecordId: 'mobility-1', requestedById: 'student-1', deadlineId: 'dead-4', title: 'Need more time for insurance docs', reason: 'Insurer issued corrected policy late.', state: 'IN_REVIEW', coordinatorRationale: null, reviewedById: 'coordinator-1' },
    { id: 'exc-3', mobilityRecordId: 'mobility-1', requestedById: 'student-1', deadlineId: 'dead-2', title: 'Accommodation contract delay', reason: 'Landlord signed the document late.', state: 'APPROVED', coordinatorRationale: 'Evidence accepted. Extension can be applied.', reviewedById: 'coordinator-1' },
    { id: 'exc-4', mobilityRecordId: 'mobility-1', requestedById: 'student-1', deadlineId: 'dead-4', title: 'Already resolved request', reason: 'Handled in earlier meeting.', state: 'APPLIED', coordinatorRationale: 'Applied with approved extension.', reviewedById: 'coordinator-1' },
    { id: 'exc-5', mobilityRecordId: 'mobility-1', requestedById: 'student-1', deadlineId: 'dead-5', title: 'Rejected request sample', reason: 'No supporting evidence available.', state: 'REJECTED', coordinatorRationale: 'Please attach supporting evidence before requesting again.', reviewedById: 'coordinator-1' },
  ] as const;

  for (const exception of exceptions) {
    await prisma.exceptionRequest.upsert({ where: { id: exception.id }, update: exception, create: exception });
  }


  await prisma.learningAgreement.upsert({ where: { mobilityRecordId: 'mobility-1' }, update: { id:'la-seed-1', studentId:'student-1', coordinatorId:'coordinator-1', state:'IN_REVIEW', version:2, submittedAt:new Date('2026-05-01T10:00:00.000Z') }, create: { id:'la-seed-1', mobilityRecordId:'mobility-1', studentId:'student-1', coordinatorId:'coordinator-1', state:'IN_REVIEW', version:2, submittedAt:new Date('2026-05-01T10:00:00.000Z') } });

  const laRows = [
    { id:'lar-seed-1', agreementId:'la-seed-1', rowKey:'rk-1', revision:1, isLatest:false, supersedesRowId:null, homeCourseCode:'SEV-101', homeCourseName:'Databases', destinationCourseCode:'KUL-DB1', destinationCourseName:'Database Systems', ects:6, semester:'FALL', grade:'8.5', status:'APPROVED', decisionRationale:null, reviewedById:'coordinator-1', reviewedAt:new Date('2026-04-20T10:00:00.000Z'), createdById:'student-1' },
    { id:'lar-seed-2', agreementId:'la-seed-1', rowKey:'rk-1', revision:2, isLatest:true, supersedesRowId:'lar-seed-1', homeCourseCode:'SEV-101', homeCourseName:'Databases and SQL', destinationCourseCode:'KUL-DB1', destinationCourseName:'Database Systems', ects:6, semester:'FALL', grade:null, status:'IN_REVIEW', decisionRationale:null, reviewedById:null, reviewedAt:null, createdById:'student-1' },
    { id:'lar-seed-3', agreementId:'la-seed-1', rowKey:'rk-2', revision:1, isLatest:true, supersedesRowId:null, homeCourseCode:'SEV-220', homeCourseName:'Operating Systems', destinationCourseCode:'KUL-OS2', destinationCourseName:'Operating Systems', ects:6, semester:'FALL', grade:null, status:'DENIED', decisionRationale:'Course content mismatch', reviewedById:'coordinator-1', reviewedAt:new Date('2026-04-21T10:00:00.000Z'), createdById:'student-1' },
    { id:'lar-seed-4', agreementId:'la-seed-1', rowKey:'rk-3', revision:1, isLatest:true, supersedesRowId:null, homeCourseCode:'SEV-330', homeCourseName:'Computer Networks', destinationCourseCode:'KUL-NET1', destinationCourseName:'Networks', ects:5, semester:'SPRING', grade:null, status:'APPROVED', decisionRationale:null, reviewedById:'coordinator-1', reviewedAt:new Date('2026-04-22T10:00:00.000Z'), createdById:'student-1' }
  ] as const;
  for (const row of laRows) {
    await prisma.learningAgreementRow.upsert({ where: { id: row.id }, update: row, create: row });
  }
  const auditSeedData = [
    { id: 'audit-1', mobilityRecordId: 'mobility-1', actorId: 'student-1', eventType: 'SUBMISSION_CREATED', details: 'Created draft for Passport copy' },
    { id: 'audit-2', mobilityRecordId: 'mobility-1', actorId: 'coordinator-1', eventType: 'SUBMISSION_APPROVED', details: 'Approved Arrival certificate' },
  ] as const;

  for (const audit of auditSeedData) {
    await prisma.auditRecord.upsert({ where: { id: audit.id }, update: audit, create: audit });
  }
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
