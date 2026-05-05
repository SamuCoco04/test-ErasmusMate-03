import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seed() {
  await prisma.learningAgreementEvent.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.documentSubmissionEvent.deleteMany();
  await prisma.documentAttachment.deleteMany();
  await prisma.socialReport.deleteMany();
  await prisma.socialMessage.deleteMany();
  await prisma.cityRecommendation.deleteMany();
  await prisma.socialConnection.deleteMany();
  await prisma.exceptionRequest.deleteMany();
  await prisma.deadline.deleteMany();
  await prisma.documentSubmission.deleteMany();
  await prisma.learningAgreementRow.deleteMany();
  await prisma.learningAgreement.deleteMany();
  await prisma.auditRecord.deleteMany();
  await prisma.mobilityRecord.deleteMany();
  await prisma.documentRequirement.deleteMany();
  await prisma.procedureDefinition.deleteMany();
  await prisma.socialProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.institution.deleteMany();

  await prisma.institution.upsert({ where: { id: 'inst-home-1' }, update: { name: 'Universidad de Sevilla', code: 'US', country: 'Spain' }, create: { id: 'inst-home-1', name: 'Universidad de Sevilla', code: 'US', country: 'Spain' } });
  await prisma.institution.upsert({ where: { id: 'inst-host-1' }, update: { name: 'KU Leuven', code: 'KUL', country: 'Belgium' }, create: { id: 'inst-host-1', name: 'KU Leuven', code: 'KUL', country: 'Belgium' } });

  await prisma.user.upsert({ where: { id: 'student-1' }, update: { email: 'student1@erasmusmate.demo', displayName: 'Student One', role: 'STUDENT', institutionId: 'inst-home-1' }, create: { id: 'student-1', email: 'student1@erasmusmate.demo', displayName: 'Student One', role: 'STUDENT', institutionId: 'inst-home-1' } });
  await prisma.user.upsert({ where: { id: 'coordinator-1' }, update: { email: 'coordinator1@erasmusmate.demo', displayName: 'Coordinator One', role: 'COORDINATOR', institutionId: 'inst-home-1' }, create: { id: 'coordinator-1', email: 'coordinator1@erasmusmate.demo', displayName: 'Coordinator One', role: 'COORDINATOR', institutionId: 'inst-home-1' } });
  await prisma.user.upsert({ where: { id: 'admin-1' }, update: { email: 'admin1@erasmusmate.demo', displayName: 'Admin One', role: 'ADMIN', institutionId: 'inst-home-1' }, create: { id: 'admin-1', email: 'admin1@erasmusmate.demo', displayName: 'Admin One', role: 'ADMIN', institutionId: 'inst-home-1' } });

  
  await prisma.user.upsert({ where: { id: 'student-2' }, update: { email: 'student2@erasmusmate.demo', displayName: 'Maria Silva', role: 'STUDENT', institutionId: 'inst-home-1' }, create: { id: 'student-2', email: 'student2@erasmusmate.demo', displayName: 'Maria Silva', role: 'STUDENT', institutionId: 'inst-home-1' } });
  await prisma.user.upsert({ where: { id: 'student-3' }, update: { email: 'student3@erasmusmate.demo', displayName: 'Luca Rossi', role: 'STUDENT', institutionId: 'inst-home-1' }, create: { id: 'student-3', email: 'student3@erasmusmate.demo', displayName: 'Luca Rossi', role: 'STUDENT', institutionId: 'inst-home-1' } });
  await prisma.user.upsert({ where: { id: 'student-4' }, update: { email: 'student4@erasmusmate.demo', displayName: 'Nora Klein', role: 'STUDENT', institutionId: 'inst-home-1' }, create: { id: 'student-4', email: 'student4@erasmusmate.demo', displayName: 'Nora Klein', role: 'STUDENT', institutionId: 'inst-home-1' } });
  await prisma.user.upsert({ where: { id: 'student-5' }, update: { email: 'student5@erasmusmate.demo', displayName: 'Omar Aziz', role: 'STUDENT', institutionId: 'inst-home-1' }, create: { id: 'student-5', email: 'student5@erasmusmate.demo', displayName: 'Omar Aziz', role: 'STUDENT', institutionId: 'inst-home-1' } });
  await prisma.user.upsert({ where: { id: 'student-6' }, update: { email: 'student6@erasmusmate.demo', displayName: 'Elena Novak', role: 'STUDENT', institutionId: 'inst-home-1' }, create: { id: 'student-6', email: 'student6@erasmusmate.demo', displayName: 'Elena Novak', role: 'STUDENT', institutionId: 'inst-home-1' } });

  const socialProfiles = [
    { id:'sp-student-1', userId:'student-1', displayName:'Alex Moreno', homeCity:'Porto', hostCity:'Leuven', hostCountry:'Belgium', homeInstitutionName:'Universidad de Sevilla', hostInstitutionName:'KU Leuven', studyArea:'Computer Science', mobilityPhase:'Before departure', languagesJson: JSON.stringify(['English','Spanish','Portuguese']), interestsJson: JSON.stringify(['Study groups','City walks']), bio:'Going to Leuven this semester and happy to share practical Erasmus tips.', visibility:'VISIBLE', contactPreference:'OPEN_TO_REQUESTS', mapVisibility:'HIDDEN', approximateLatitude:null, approximateLongitude:null, moderationState:'ACTIVE' },
    { id:'sp-student-2', userId:'student-2', displayName:'Maria Silva', homeCity:'Braga', hostCity:'Leuven', hostCountry:'Belgium', homeInstitutionName:'Universidad de Sevilla', hostInstitutionName:'KU Leuven', studyArea:'Computer Science', mobilityPhase:'On mobility', languagesJson: JSON.stringify(['English','Portuguese']), interestsJson: JSON.stringify(['Coding','Coffee chats']), bio:'Second semester in Leuven, open to social orientation.', visibility:'VISIBLE', contactPreference:'CONNECTIONS_ONLY', mapVisibility:'CITY_ONLY', approximateLatitude:50.8798, approximateLongitude:4.7005, moderationState:'ACTIVE' },
    { id:'sp-student-3', userId:'student-3', displayName:'Luca Rossi', homeCity:'Milan', hostCity:'Ghent', hostCountry:'Belgium', homeInstitutionName:'Universidad de Sevilla', hostInstitutionName:'Ghent University', studyArea:'Business', mobilityPhase:'On mobility', languagesJson: JSON.stringify(['English','Italian']), interestsJson: JSON.stringify(['Startup events']), bio:'Business student looking for study partners.', visibility:'VISIBLE', contactPreference:'OPEN_TO_REQUESTS', mapVisibility:'CITY_ONLY', approximateLatitude:51.0543, approximateLongitude:3.7174, moderationState:'ACTIVE' },
    { id:'sp-student-4', userId:'student-4', displayName:'Nora Klein', homeCity:'Berlin', hostCity:'Leuven', hostCountry:'Belgium', homeInstitutionName:'Universidad de Sevilla', hostInstitutionName:'KU Leuven', studyArea:'Law', mobilityPhase:'On mobility', languagesJson: JSON.stringify(['English','German']), interestsJson: JSON.stringify(['Museums']), bio:'', visibility:'HIDDEN', contactPreference:'HIDDEN', mapVisibility:'CITY_ONLY', approximateLatitude:50.8798, approximateLongitude:4.7005, moderationState:'ACTIVE' },
    { id:'sp-student-5', userId:'student-5', displayName:'Omar Aziz', homeCity:'Cairo', hostCity:'Antwerp', hostCountry:'Belgium', homeInstitutionName:'Universidad de Sevilla', hostInstitutionName:'University of Antwerp', studyArea:'Architecture', mobilityPhase:'On mobility', languagesJson: JSON.stringify(['English','Arabic']), interestsJson: JSON.stringify(['Urban sketching']), bio:'', visibility:'VISIBLE', contactPreference:'OPEN_TO_REQUESTS', mapVisibility:'CITY_ONLY', approximateLatitude:51.2194, approximateLongitude:4.4025, moderationState:'HIDDEN_BY_MODERATION' },
    { id:'sp-student-6', userId:'student-6', displayName:'Elena Novak', homeCity:'Prague', hostCity:'Leuven', hostCountry:'Belgium', homeInstitutionName:'Universidad de Sevilla', hostInstitutionName:'KU Leuven', studyArea:'Computer Science', mobilityPhase:'On mobility', languagesJson: JSON.stringify(['English','Czech']), interestsJson: JSON.stringify(['AI clubs']), bio:'Happy to share class tips.', visibility:'VISIBLE', contactPreference:'CONNECTIONS_ONLY', mapVisibility:'CITY_ONLY', approximateLatitude:50.8798, approximateLongitude:4.7005, moderationState:'ACTIVE' },
  ] as const;
  for (const profile of socialProfiles) {
    await prisma.socialProfile.upsert({ where: { userId: profile.userId }, update: profile, create: profile });
  }

  const cityRecommendations = [
    { id:'rec-1', createdByProfileId:'sp-student-2', title:'KU Leuven Agora Study Space', description:'Quiet morning hours and reliable desks near group rooms.', category:'STUDY', city:'Leuven', country:'Belgium', addressLabel:'AGORA Learning Centre', approximateLatitude:50.8779, approximateLongitude:4.7012, visibility:'VISIBLE', moderationState:'ACTIVE' },
    { id:'rec-2', createdByProfileId:'sp-student-3', title:'Cheap lunch near station', description:'Budget student menu before 14:00 with vegetarian option.', category:'FOOD', city:'Leuven', country:'Belgium', addressLabel:'Martelarenplein area', approximateLatitude:50.8822, approximateLongitude:4.7154, visibility:'VISIBLE', moderationState:'ACTIVE' },
    { id:'rec-3', createdByProfileId:'sp-student-6', title:'City registration checklist', description:'Bring rental contract and passport copy for faster city hall processing.', category:'BUREAUCRACY', city:'Leuven', country:'Belgium', addressLabel:'Leuven City Hall', approximateLatitude:50.879, approximateLongitude:4.7003, visibility:'VISIBLE', moderationState:'ACTIVE' },
    { id:'rec-4', createdByProfileId:'sp-student-1', title:'Night bus safety tip', description:'Use night bus N2 after library closing; stops near major student residences.', category:'SAFETY', city:'Leuven', country:'Belgium', addressLabel:'Leuven Station Bus Hub', approximateLatitude:50.882, approximateLongitude:4.7152, visibility:'VISIBLE', moderationState:'ACTIVE' },
  ] as const;
  for (const rec of cityRecommendations) {
    await prisma.cityRecommendation.upsert({ where: { id: rec.id }, update: rec, create: rec });
  }

  const socialConnections = [
    { id: 'conn-seed-1', pairKey: 'sp-student-1__sp-student-2', requesterProfileId: 'sp-student-1', receiverProfileId: 'sp-student-2', state: 'PENDING', requestedAt: new Date('2026-05-01T08:00:00.000Z'), lastActionByProfileId: 'sp-student-1' },
    { id: 'conn-seed-2', pairKey: 'sp-student-1__sp-student-3', requesterProfileId: 'sp-student-3', receiverProfileId: 'sp-student-1', state: 'ACCEPTED', requestedAt: new Date('2026-04-21T08:00:00.000Z'), respondedAt: new Date('2026-04-22T08:00:00.000Z'), lastActionByProfileId: 'sp-student-1' },
    { id: 'conn-seed-3', pairKey: 'sp-student-2__sp-student-6', requesterProfileId: 'sp-student-2', receiverProfileId: 'sp-student-6', state: 'REJECTED', requestedAt: new Date('2026-04-12T08:00:00.000Z'), respondedAt: new Date('2026-04-13T08:00:00.000Z'), lastActionByProfileId: 'sp-student-6' },
    { id: 'conn-seed-4', pairKey: 'sp-student-1__sp-student-6', requesterProfileId: 'sp-student-6', receiverProfileId: 'sp-student-1', state: 'BLOCKED', requestedAt: new Date('2026-04-10T08:00:00.000Z'), blockedAt: new Date('2026-04-11T08:00:00.000Z'), lastActionByProfileId: 'sp-student-1' },
  ] as const;
  for (const connection of socialConnections) {
    await prisma.socialConnection.upsert({ where: { id: connection.id }, update: connection, create: connection });
  }

  const socialMessages = [
    { id: 'msg-seed-1', connectionId: 'conn-seed-2', senderProfileId: 'sp-student-1', recipientProfileId: 'sp-student-3', body: 'Hi Luca, are you also taking Operating Systems this term?', createdAt: new Date('2026-04-23T08:00:00.000Z') },
    { id: 'msg-seed-2', connectionId: 'conn-seed-2', senderProfileId: 'sp-student-3', recipientProfileId: 'sp-student-1', body: 'Yes, I can share my notes and schedule.', createdAt: new Date('2026-04-23T08:10:00.000Z') },
  ] as const;
  for (const message of socialMessages) {
    await prisma.socialMessage.upsert({ where: { id: message.id }, update: message, create: message });
  }


  const socialReports = [
    { id: 'sreport-seed-1', reporterProfileId: 'sp-student-1', targetProfileId: 'sp-student-2', targetMessageId: null, targetRecommendationId: null, reason: 'Spam invitations', details: 'Repeated unwanted connection attempts after refusal.', status: 'PENDING', decisionRationale: null, reviewedById: null, reviewedAt: null },
    { id: 'sreport-seed-2', reporterProfileId: 'sp-student-3', targetProfileId: 'sp-student-5', targetMessageId: null, targetRecommendationId: null, reason: 'Harassment in profile bio', details: 'Offensive terms in biography text.', status: 'ACTIONED', decisionRationale: 'Profile hidden pending manual follow-up.', reviewedById: 'admin-1', reviewedAt: new Date('2026-04-25T09:00:00.000Z') },
    { id: 'sreport-seed-3', reporterProfileId: 'sp-student-1', targetProfileId: null, targetMessageId: 'msg-seed-2', targetRecommendationId: null, reason: 'Uncivil language', details: 'Tone was aggressive.', status: 'DISMISSED', decisionRationale: 'Message reviewed and within acceptable limits.', reviewedById: 'admin-1', reviewedAt: new Date('2026-04-26T09:00:00.000Z') },
  ] as const;
  for (const report of socialReports) {
    await prisma.socialReport.upsert({ where: { id: report.id }, update: report, create: report });
  }

await prisma.mobilityRecord.upsert({ where: { id: 'mobility-1' }, update: { studentId: 'student-1', coordinatorId: 'coordinator-1', homeInstitutionId: 'inst-home-1', hostInstitutionId: 'inst-host-1', mobilityStatus: 'ACTIVE', startDate: new Date('2026-09-01T00:00:00.000Z'), endDate: new Date('2027-01-31T00:00:00.000Z') }, create: { id: 'mobility-1', studentId: 'student-1', coordinatorId: 'coordinator-1', homeInstitutionId: 'inst-home-1', hostInstitutionId: 'inst-host-1', mobilityStatus: 'ACTIVE', startDate: new Date('2026-09-01T00:00:00.000Z'), endDate: new Date('2027-01-31T00:00:00.000Z') } });

  const procedures = [
    { id: 'proc-1', title: 'Passport copy', sortOrder: 1 },
    { id: 'proc-2', title: 'Insurance proof', sortOrder: 2 },
    { id: 'proc-3', title: 'Arrival certificate', sortOrder: 3 },
    { id: 'proc-4', title: 'Transcript request', sortOrder: 4 },
  ];
  for (const p of procedures) {
    await prisma.procedureDefinition.upsert({ where: { id: p.id }, update: { institutionId: 'inst-home-1', title: p.title, description: `${p.title} for Erasmus procedure`, isRequired: true, sortOrder: p.sortOrder, acceptedMimeTypesJson: JSON.stringify(['application/pdf']), maxSizeBytes: 5_242_880, isActive: true, createdById: 'coordinator-1' }, create: { id: p.id, institutionId: 'inst-home-1', title: p.title, description: `${p.title} for Erasmus procedure`, isRequired: true, sortOrder: p.sortOrder, acceptedMimeTypesJson: JSON.stringify(['application/pdf']), maxSizeBytes: 5_242_880, isActive: true, createdById: 'coordinator-1' } });
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

  const documentAttachments = [
    { id: 'att-1', submissionId: 'sub-2', uploadedById: 'student-1', fileName: 'insurance-proof.pdf', mimeType: 'application/pdf', sizeBytes: 248000, storageKey: 'demo/sub-2/insurance-proof-v1.pdf', version: 1, status: 'ACTIVE' },
    { id: 'att-2', submissionId: 'sub-5', uploadedById: 'student-1', fileName: 'passport-copy-v1.pdf', mimeType: 'application/pdf', sizeBytes: 142000, storageKey: 'demo/sub-5/passport-copy-v1.pdf', version: 1, status: 'REPLACED' },
    { id: 'att-3', submissionId: 'sub-5', uploadedById: 'student-1', fileName: 'passport-copy-v2.pdf', mimeType: 'application/pdf', sizeBytes: 151000, storageKey: 'demo/sub-5/passport-copy-v2.pdf', version: 2, status: 'ACTIVE' },
    { id: 'att-4', submissionId: 'sub-4', uploadedById: 'student-1', fileName: 'transcript-request-v1.pdf', mimeType: 'application/pdf', sizeBytes: 88000, storageKey: 'demo/sub-4/transcript-request-v1.pdf', version: 1, status: 'ACTIVE' },
  ] as const;

  for (const attachment of documentAttachments) {
    await prisma.documentAttachment.upsert({ where: { id: attachment.id }, update: attachment, create: attachment });
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


  await prisma.learningAgreement.upsert({
    where: { id: 'la-seed-1' },
    update: {
      mobilityRecordId: 'mobility-1',
      studentId: 'student-1',
      coordinatorId: 'coordinator-1',
      state: 'IN_REVIEW',
      version: 2,
      submittedAt: new Date('2026-05-01T10:00:00.000Z'),
    },
    create: {
      id: 'la-seed-1',
      mobilityRecordId: 'mobility-1',
      studentId: 'student-1',
      coordinatorId: 'coordinator-1',
      state: 'IN_REVIEW',
      version: 2,
      submittedAt: new Date('2026-05-01T10:00:00.000Z'),
    },
  });

  const laRows = [
    { id:'lar-seed-1', agreementId:'la-seed-1', rowKey:'rk-1', revision:1, isLatest:false, supersedesRowId:null, homeCourseCode:'SEV-101', homeCourseName:'Databases', destinationCourseCode:'KUL-DB1', destinationCourseName:'Database Systems', ects:6, semester:'FALL', grade:'8.5', status:'APPROVED', decisionRationale:null, reviewedById:'coordinator-1', reviewedAt:new Date('2026-04-20T10:00:00.000Z'), createdById:'student-1' },
    { id:'lar-seed-2', agreementId:'la-seed-1', rowKey:'rk-1', revision:2, isLatest:true, supersedesRowId:'lar-seed-1', homeCourseCode:'SEV-101', homeCourseName:'Databases and SQL', destinationCourseCode:'KUL-DB1', destinationCourseName:'Database Systems', ects:6, semester:'FALL', grade:null, status:'IN_REVIEW', decisionRationale:null, reviewedById:null, reviewedAt:null, createdById:'student-1' },
    { id:'lar-seed-3', agreementId:'la-seed-1', rowKey:'rk-2', revision:1, isLatest:true, supersedesRowId:null, homeCourseCode:'SEV-220', homeCourseName:'Operating Systems', destinationCourseCode:'KUL-OS2', destinationCourseName:'Operating Systems', ects:6, semester:'FALL', grade:null, status:'DENIED', decisionRationale:'Course content mismatch', reviewedById:'coordinator-1', reviewedAt:new Date('2026-04-21T10:00:00.000Z'), createdById:'student-1' },
    { id:'lar-seed-4', agreementId:'la-seed-1', rowKey:'rk-3', revision:1, isLatest:true, supersedesRowId:null, homeCourseCode:'SEV-330', homeCourseName:'Computer Networks', destinationCourseCode:'KUL-NET1', destinationCourseName:'Networks', ects:5, semester:'SPRING', grade:null, status:'APPROVED', decisionRationale:null, reviewedById:'coordinator-1', reviewedAt:new Date('2026-04-22T10:00:00.000Z'), createdById:'student-1' }
  ] as const;
  for (const row of laRows.filter((candidate) => candidate.supersedesRowId === null)) {
    await prisma.learningAgreementRow.upsert({ where: { id: row.id }, update: row, create: row });
  }
  for (const row of laRows.filter((candidate) => candidate.supersedesRowId !== null)) {
    if (row.supersedesRowId) {
      const superseded = await prisma.learningAgreementRow.findUnique({ where: { id: row.supersedesRowId } });
      if (!superseded) {
        throw new Error(`Missing superseded learning agreement row: ${row.supersedesRowId}`);
      }
    }
    await prisma.learningAgreementRow.upsert({ where: { id: row.id }, update: row, create: row });
  }
  const laEvents = [
    { id: 'laevt-seed-1', agreementId: 'la-seed-1', actorId: 'student-1', actionType: 'submit_agreement', fromState: 'DRAFT', toState: 'SUBMITTED', rowId: null, noteOrRationale: null },
    { id: 'laevt-seed-2', agreementId: 'la-seed-1', actorId: 'coordinator-1', actionType: 'deny_row', fromState: 'IN_REVIEW', toState: 'DENIED', rowId: 'lar-seed-3', noteOrRationale: 'Course content mismatch' },
  ] as const;
  for (const event of laEvents) {
    await prisma.learningAgreementEvent.upsert({ where: { id: event.id }, update: event, create: event });
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
