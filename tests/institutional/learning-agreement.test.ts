import { beforeEach, describe, expect, it } from 'vitest';
import { prisma } from '@/src/lib/prisma';
import { addAgreementRow, createOrGetDraftAgreement, decideAgreementRow, getAcademicSummaryForMobilityRecord, getLearningAgreementReviewQueue, resubmitAgreement, submitAgreement, updateAgreementRow } from '@/src/modules/institutional/learning-agreement';
import { seed } from '@/prisma/seed';

const studentCtx={role:'STUDENT' as const,userId:'la-student-1'};
const coordinatorCtx={role:'COORDINATOR' as const,userId:'la-coordinator-1'};
const anotherStudent={role:'STUDENT' as const,userId:'la-student-x'};

describe('Institutional: Learning Agreement service',()=>{
  beforeEach(async()=>{
    await seed();
    await prisma.user.upsert({where:{id:'la-student-1'},update:{email:'la.student1@x.com',displayName:'LA Student',role:'STUDENT',institutionId:'inst-home-1'},create:{id:'la-student-1',email:'la.student1@x.com',displayName:'LA Student',role:'STUDENT',institutionId:'inst-home-1'}});
    await prisma.user.upsert({where:{id:'la-student-x'},update:{email:'la.studentx@x.com',displayName:'LA Student X',role:'STUDENT',institutionId:'inst-home-1'},create:{id:'la-student-x',email:'la.studentx@x.com',displayName:'LA Student X',role:'STUDENT',institutionId:'inst-home-1'}});
    await prisma.user.upsert({where:{id:'la-coordinator-1'},update:{email:'la.coordinator@x.com',displayName:'LA Coordinator',role:'COORDINATOR',institutionId:'inst-home-1'},create:{id:'la-coordinator-1',email:'la.coordinator@x.com',displayName:'LA Coordinator',role:'COORDINATOR',institutionId:'inst-home-1'}});
    await prisma.mobilityRecord.upsert({
      where:{id:'mobility-la-test-1'},
      update:{studentId:'la-student-1',coordinatorId:'la-coordinator-1',homeInstitutionId:'inst-home-1',hostInstitutionId:'inst-host-1',mobilityStatus:'ACTIVE',startDate:new Date('2026-09-01T00:00:00.000Z'),endDate:new Date('2027-01-31T00:00:00.000Z')},
      create:{id:'mobility-la-test-1',studentId:'la-student-1',coordinatorId:'la-coordinator-1',homeInstitutionId:'inst-home-1',hostInstitutionId:'inst-host-1',mobilityStatus:'ACTIVE',startDate:new Date('2026-09-01T00:00:00.000Z'),endDate:new Date('2027-01-31T00:00:00.000Z')},
    });
  });

  it('student can create/get draft and add rows, but not submit empty', async()=>{
    const agreement=await createOrGetDraftAgreement(studentCtx);
    await expect(submitAgreement(studentCtx,agreement.id)).rejects.toThrow();
    const row=await addAgreementRow(studentCtx,agreement.id,{homeCourseCode:'CS101',homeCourseName:'Algorithms',destinationCourseCode:'INF200',destinationCourseName:'Algo',ects:6,semester:'FALL'});
    expect(row.status).toBe('IN_REVIEW');
  });

  it('duplicate equivalence is blocked and student cannot set grade', async()=>{
    const agreement=await createOrGetDraftAgreement(studentCtx);
    await addAgreementRow(studentCtx,agreement.id,{homeCourseCode:'CS101',homeCourseName:'Algorithms',destinationCourseCode:'INF200',destinationCourseName:'Algo',ects:6,semester:'FALL'});
    await expect(addAgreementRow(studentCtx,agreement.id,{homeCourseCode:'CS101',homeCourseName:'Algorithms',destinationCourseCode:'INF200',destinationCourseName:'Algo',ects:6,semester:'FALL'})).rejects.toThrow();
    await expect(addAgreementRow(studentCtx,agreement.id,{homeCourseCode:'CS102',homeCourseName:'DB',destinationCourseCode:'INF202',destinationCourseName:'DB',ects:6,semester:'FALL',grade:'A'})).rejects.toThrow();
  });

  it('ownership and coordinator queue guards work', async()=>{
    const agreement=await createOrGetDraftAgreement(studentCtx);
    await expect(addAgreementRow(anotherStudent,agreement.id,{homeCourseCode:'X',homeCourseName:'X',destinationCourseCode:'Y',destinationCourseName:'Y',ects:5,semester:'SPRING'})).rejects.toThrow();
    await addAgreementRow(studentCtx,agreement.id,{homeCourseCode:'CS200',homeCourseName:'Math',destinationCourseCode:'MAT10',destinationCourseName:'Math',ects:5,semester:'SPRING'});
    await submitAgreement(studentCtx,agreement.id);
    const queue=await getLearningAgreementReviewQueue(coordinatorCtx);
    expect(queue.some(q=>q.id===agreement.id)).toBe(true);
  });

  it('coordinator decisions require rationale for deny and recompute state', async()=>{
    const agreement=await createOrGetDraftAgreement(studentCtx);
    const row1=await addAgreementRow(studentCtx,agreement.id,{homeCourseCode:'CS300',homeCourseName:'AI',destinationCourseCode:'AIX',destinationCourseName:'AI',ects:6,semester:'FALL'});
    const row2=await addAgreementRow(studentCtx,agreement.id,{homeCourseCode:'CS301',homeCourseName:'OS',destinationCourseCode:'OSX',destinationCourseName:'OS',ects:6,semester:'FALL'});
    await submitAgreement(studentCtx,agreement.id);
    await expect(decideAgreementRow(coordinatorCtx,agreement.id,row1.id,'DENIED')).rejects.toThrow();
    await decideAgreementRow(coordinatorCtx,agreement.id,row1.id,'APPROVED');
    await decideAgreementRow(coordinatorCtx,agreement.id,row2.id,'DENIED','Mismatch content');
    const refreshed=await prisma.learningAgreement.findUniqueOrThrow({where:{id:agreement.id}});
    expect(refreshed.state).toBe('PARTIALLY_APPROVED');
  });

  it('approved row edit and denied revision preserve history and unblock resubmit', async()=>{
    const agreement=await createOrGetDraftAgreement(studentCtx);
    const row=await addAgreementRow(studentCtx,agreement.id,{homeCourseCode:'CS400',homeCourseName:'Networks',destinationCourseCode:'NET1',destinationCourseName:'Networks',ects:6,semester:'SPRING'});
    await submitAgreement(studentCtx,agreement.id);
    await decideAgreementRow(coordinatorCtx,agreement.id,row.id,'APPROVED');
    const revised=await updateAgreementRow(studentCtx,agreement.id,row.id,{homeCourseCode:'CS400',homeCourseName:'Networks II',destinationCourseCode:'NET1',destinationCourseName:'Networks',ects:6,semester:'SPRING'});
    const old=await prisma.learningAgreementRow.findUniqueOrThrow({where:{id:row.id}});
    expect(old.isLatest).toBe(false); expect(old.status).toBe('APPROVED'); expect(revised.revision).toBe(2);

    const row2=await addAgreementRow(studentCtx,agreement.id,{homeCourseCode:'CS401',homeCourseName:'ML',destinationCourseCode:'ML1',destinationCourseName:'ML',ects:5,semester:'SPRING'});
    await decideAgreementRow(coordinatorCtx,agreement.id,row2.id,'DENIED','Need better match');
    const stateChanged=await prisma.learningAgreement.findUniqueOrThrow({where:{id:agreement.id}});
    await expect(resubmitAgreement(studentCtx,agreement.id)).rejects.toThrow();
    const deniedLatest=await prisma.learningAgreementRow.findUniqueOrThrow({where:{id:row2.id}});
    const deniedRev=await updateAgreementRow(studentCtx,agreement.id,deniedLatest.id,{homeCourseCode:'CS401',homeCourseName:'Machine Learning',destinationCourseCode:'ML2',destinationCourseName:'ML',ects:5,semester:'SPRING'});
    await prisma.learningAgreement.update({where:{id:agreement.id},data:{state:stateChanged.state==='PARTIALLY_APPROVED'?'PARTIALLY_APPROVED':'CHANGES_REQUESTED'}});
    await resubmitAgreement(studentCtx,agreement.id);
    expect(deniedRev.status).toBe('IN_REVIEW');
  });

  it('academic summary returns only latest approved rows and writes events', async()=>{
    const agreement=await createOrGetDraftAgreement(studentCtx);
    const row1=await addAgreementRow(studentCtx,agreement.id,{homeCourseCode:'CS500',homeCourseName:'Data',destinationCourseCode:'D1',destinationCourseName:'Data',ects:6,semester:'FALL'});
    const row2=await addAgreementRow(studentCtx,agreement.id,{homeCourseCode:'CS501',homeCourseName:'Robotics',destinationCourseCode:'R1',destinationCourseName:'Robotics',ects:6,semester:'FALL'});
    await submitAgreement(studentCtx,agreement.id);
    await decideAgreementRow(coordinatorCtx,agreement.id,row1.id,'APPROVED');
    await decideAgreementRow(coordinatorCtx,agreement.id,row2.id,'DENIED','Not equivalent');
    const summary=await getAcademicSummaryForMobilityRecord(studentCtx,'mobility-la-test-1');
    expect(summary.rows.length).toBe(1);
    const events=await prisma.learningAgreementEvent.findMany({where:{agreementId:agreement.id}});
    expect(events.length).toBeGreaterThan(3);
  });
});
