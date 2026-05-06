import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const studentLayout = readFileSync('app/(institutional)/student/layout.tsx', 'utf8');
const socialLayout = readFileSync('app/(social)/social/student/layout.tsx', 'utf8');
const messages = readFileSync('app/(social)/social/student/messages/page.tsx', 'utf8');
const recommendations = readFileSync('app/(social)/social/student/recommendations/page.tsx', 'utf8');
const discovery = readFileSync('app/(social)/social/student/discovery/page.tsx', 'utf8');
const stateComponent = readFileSync('src/components/ui/state.tsx', 'utf8');


describe('phase 7D responsive/accessibility/demo polish contracts', () => {
  it('keeps institutional and social navigation labels consistent and separated', () => {
    expect(studentLayout).toContain('Submissions');
    expect(studentLayout).toContain('Deadlines');
    expect(studentLayout).toContain('Exceptions');
    expect(socialLayout).toContain('Social discovery');
    expect(socialLayout).toContain('Go to official mobility area');
  });

  it('shows accessible labels on key social filters and forms', () => {
    expect(discovery).toContain('Host city filter');
    expect(messages).toContain("aria-label='Message body'");
    expect(recommendations).toContain('Recommendations city filter');
    expect(recommendations).toContain('Recommendation description');
  });

  it('keeps explicit empty states and clear status text', () => {
    expect(messages).toContain('No messages yet. Accept a connection to start a conversation.');
    expect(recommendations).toContain('No recommendations match the current filters.');
    expect(stateComponent).toContain("title='No results yet'");
  });

  it('does not expose local storage paths or moderation internals in student social views', () => {
    expect(messages).not.toContain('/uploads/');
    expect(discovery).not.toContain('moderationState');
    expect(recommendations).not.toContain('storagePath');
  });
});
