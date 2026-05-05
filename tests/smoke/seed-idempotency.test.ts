import { describe, expect, it } from 'vitest';
import { seed } from '../../prisma/seed';

describe('seed idempotency smoke', () => {
  it('runs twice without foreign key deletion errors', async () => {
    await expect(seed()).resolves.toBeUndefined();
    await expect(seed()).resolves.toBeUndefined();
  });
});
