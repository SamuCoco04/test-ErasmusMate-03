import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

const adminProceduresPage = readFileSync('app/(institutional)/admin/procedures/page.tsx', 'utf8');
const adminDocumentRequirementsPage = readFileSync('app/(institutional)/admin/document-requirements/page.tsx', 'utf8');

describe('Phase 6D admin UI contracts', () => {
  it('admin procedures page renders active/inactive and required/optional state', () => {
    expect(adminProceduresPage).toContain("i.isActive?'Active':'Inactive'");
    expect(adminProceduresPage).toContain("i.isRequired?'Required':'Optional'");
  });

  it('admin document requirements page and procedure page render file rule details and form controls', () => {
    expect(adminDocumentRequirementsPage).toContain('admin/procedures/page');
    expect(adminProceduresPage).toContain('Accepted files:');
    expect(adminProceduresPage).toContain('maxSizeBytes');
    expect(adminProceduresPage).toContain('Create procedure');
    expect(adminProceduresPage).toContain('Deactivate');
  });
});
