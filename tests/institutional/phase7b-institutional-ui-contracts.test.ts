import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const studentDashboard = readFileSync('app/(institutional)/student/dashboard/page.tsx', 'utf8');
const studentSubmissions = readFileSync('app/(institutional)/student/submissions/page.tsx', 'utf8');
const studentDeadlines = readFileSync('app/(institutional)/student/deadlines/page.tsx', 'utf8');
const coordinatorQueue = readFileSync('app/(institutional)/coordinator/review-queue/page.tsx', 'utf8');
const coordinatorDeadlines = readFileSync('app/(institutional)/coordinator/deadlines/page.tsx', 'utf8');
const adminProcedures = readFileSync('app/(institutional)/admin/procedures/page.tsx', 'utf8');
const studentNotifications = readFileSync('app/(institutional)/student/notifications/page.tsx', 'utf8');
const coordinatorNotifications = readFileSync('app/(institutional)/coordinator/notifications/page.tsx', 'utf8');
const adminNotifications = readFileSync('app/(institutional)/admin/notifications/page.tsx', 'utf8');
const submissionsClient = readFileSync('src/components/institutional/student-submissions-client.tsx', 'utf8');

describe('phase 7B institutional UI contracts', () => {
  it('keeps shared page shell/page header foundation in institutional experience', () => {
    expect(studentDashboard).toContain('PageShell');
    expect(coordinatorQueue).toContain('PageHeader');
    expect(studentNotifications).toContain('PageShell');
    expect(coordinatorNotifications).toContain('PageShell');
    expect(adminNotifications).toContain('PageShell');
  });

  it('retains key institutional route links and actions', () => {
    expect(studentDashboard).toContain('/student/learning-agreement');
    expect(studentSubmissions).toContain('/student/dashboard');
    expect(studentDeadlines).toContain('/api/institutional/deadlines/export');
    expect(coordinatorDeadlines).toContain('/api/institutional/deadlines/export');
  });

  it('preserves submission/document affordances without exposing file storage paths', () => {
    expect(submissionsClient).toContain('Open document');
    expect(submissionsClient).toContain('Replace');
    expect(submissionsClient).toContain('Remove');
    expect(submissionsClient).not.toContain('/uploads/');
  });

  it('keeps coordinator/admin scanning labels and statuses visible', () => {
    expect(coordinatorQueue).toContain('Review queue');
    expect(adminProcedures).toContain('Procedure configuration');
    expect(adminProcedures).toContain('Active');
    expect(adminProcedures).toContain('Required');
  });
});
