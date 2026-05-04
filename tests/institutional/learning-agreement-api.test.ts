import { beforeEach, describe, expect, it, vi } from 'vitest';

import { seed } from '@/prisma/seed';
import { GET as getLearningAgreement } from '@/app/api/institutional/learning-agreement/route';
import { GET as getReviewQueue } from '@/app/api/institutional/learning-agreement/review-queue/route';
import { GET as getAcademicSummary } from '@/app/api/institutional/academic-summary/route';

const getDemoContextFromRequest = vi.hoisted(() => vi.fn());

vi.mock('@/src/modules/shared/demo-context', async () => {
  const actual = await vi.importActual<typeof import('@/src/modules/shared/demo-context')>('@/src/modules/shared/demo-context');
  return {
    ...actual,
    getDemoContextFromRequest,
  };
});

describe('Institutional API: Learning Agreement role guards', () => {
  beforeEach(async () => {
    await seed();
    vi.clearAllMocks();
  });

  it('allows student access to learning-agreement endpoint', async () => {
    getDemoContextFromRequest.mockResolvedValue({ role: 'STUDENT', userId: 'student-1' });

    const response = await getLearningAgreement();
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(payload.data)).toBe(true);
  });

  it('returns controlled forbidden for coordinator review queue with wrong role', async () => {
    getDemoContextFromRequest.mockResolvedValue({ role: 'STUDENT', userId: 'student-1' });

    const response = await getReviewQueue();
    const payload = await response.json();

    expect(response.status).toBe(403);
    expect(payload).toEqual({ error: 'Forbidden' });
  });

  it('allows coordinator access to review queue endpoint', async () => {
    getDemoContextFromRequest.mockResolvedValue({ role: 'COORDINATOR', userId: 'coordinator-1' });

    const response = await getReviewQueue();
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(payload.data)).toBe(true);
  });

  it('guards academic-summary endpoint by role and ownership', async () => {
    getDemoContextFromRequest.mockResolvedValue({ role: 'ADMIN', userId: 'admin-1' });
    const blocked = await getAcademicSummary(new Request('http://localhost/api/institutional/academic-summary'));
    expect(blocked.status).toBe(403);

    getDemoContextFromRequest.mockResolvedValue({ role: 'STUDENT', userId: 'student-2' });
    const forbidden = await getAcademicSummary(new Request('http://localhost/api/institutional/academic-summary?mobilityRecordId=mobility-1'));
    expect(forbidden.status).toBe(403);
  });
});
