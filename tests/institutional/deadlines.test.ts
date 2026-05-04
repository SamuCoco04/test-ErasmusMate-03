import { describe, expect, it } from 'vitest';
import { computeEffectiveDeadlineState } from '@/src/modules/institutional/deadlines';

describe('Institutional: deadlines rules', () => {
  it('effective deadline uses override date', () => {
    const now = new Date('2026-05-04T00:00:00.000Z');
    expect(computeEffectiveDeadlineState({ state: 'UPCOMING', dueDate: new Date('2026-05-01T00:00:00.000Z'), overrideDueDate: new Date('2026-06-01T00:00:00.000Z'), fulfilledAt: null }, now)).toBe('OVERRIDDEN');
  });

  it('expired override becomes overdue', () => {
    const now = new Date('2026-05-04T00:00:00.000Z');
    expect(computeEffectiveDeadlineState({ state: 'OVERRIDDEN', dueDate: new Date('2026-05-01T00:00:00.000Z'), overrideDueDate: new Date('2026-05-02T00:00:00.000Z'), fulfilledAt: null }, now)).toBe('OVERDUE');
  });

  it('fulfilled deadline does not block', () => {
    expect(computeEffectiveDeadlineState({ state: 'FULFILLED', dueDate: new Date('2026-01-01T00:00:00.000Z'), overrideDueDate: null, fulfilledAt: new Date('2026-01-01T00:00:00.000Z') })).toBe('FULFILLED');
  });
});
