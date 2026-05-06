import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

function read(path: string) {
  return readFileSync(path, 'utf8');
}

describe('Phase 8A.4 audit artifacts', () => {
  it('includes coverage audit artifact', () => {
    const content = read('artifacts/phase-8a-coverage-audit.md');
    expect(content).toContain('Phase 8A.4');
    expect(content).toContain('Proposed Phase 8B backlog');
  });

  it('traceability matrix references phase 8A.4 mapping', () => {
    const matrix = read('TRACEABILITY_TEST_MATRIX.md');
    expect(matrix).toContain('3.12 Phase 8A.4 coverage audit mapping');
    expect(matrix).toContain('AUDIT-8A4-001');
  });

  it('decisions ledger references phase 8A.4 audit decision', () => {
    const decisions = read('DECISIONS.md');
    expect(decisions).toContain('DEC-017');
    expect(decisions).toContain('Phase 8A.4');
  });
});
