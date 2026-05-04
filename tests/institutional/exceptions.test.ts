import { describe, expect, it } from 'vitest';
import { transitionException } from '@/src/modules/institutional/exceptions';

describe('Institutional: exceptions contract', () => {
  it('keeps transition guard contract callable', async () => {
    await expect(transitionException({ role: 'STUDENT', userId: 'student-1' } as any, 'x', 'approve', {})).rejects.toMatchObject({ code: 'FORBIDDEN' });
  });
});
