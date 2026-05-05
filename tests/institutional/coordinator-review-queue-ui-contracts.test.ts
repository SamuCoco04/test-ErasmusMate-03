import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

const reviewQueueClient = readFileSync('src/components/institutional/coordinator-review-queue-client.tsx', 'utf8');

describe('Coordinator review queue UX contracts', () => {
  it('supports status filters, approved toggle, and text search', () => {
    expect(reviewQueueClient).toContain('const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);');
    expect(reviewQueueClient).toContain("const [showApproved, setShowApproved] = useState(false);");
    expect(reviewQueueClient).toContain("const [searchText, setSearchText] = useState('');");
    expect(reviewQueueClient).toContain('Show approved');
    expect(reviewQueueClient).toContain('Search by student request, attachment, or rationale');
    expect(reviewQueueClient).toContain('if (!showApproved && s.state === \'APPROVED\') return false;');
  });

  it('shows attachment actions only for real stored files', () => {
    expect(reviewQueueClient).toContain('a.hasStoredContent');
    expect(reviewQueueClient).toContain('Open document');
    expect(reviewQueueClient).toContain('Demo metadata only');
  });

  it('keeps transition API as backend authority', () => {
    expect(reviewQueueClient).toContain('/api/institutional/submissions/${submissionId}/transition');
    expect(reviewQueueClient).toContain("method: 'PATCH'");
    expect(reviewQueueClient).toContain('window.location.reload()');
  });
});
