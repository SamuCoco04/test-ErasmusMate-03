export const submissionStatusLabels = {
  DRAFT: 'Draft',
  SUBMITTED: 'Waiting for review',
  IN_REVIEW: 'Under review',
  APPROVED: 'Approved',
  REJECTED: 'Needs correction',
  REOPENED: 'Needs correction',
  NEEDS_CORRECTION: 'Needs correction',
} as const;

export const deadlineStatusLabels = {
  UPCOMING: 'Upcoming',
  OVERDUE: 'Overdue',
  FULFILLED: 'Completed',
  OVERRIDDEN: 'Extended',
} as const;

export const exceptionStatusLabels = {
  PENDING: 'Pending review',
  IN_REVIEW: 'Under review',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  APPLIED: 'Applied',
  CLOSED: 'Closed',
} as const;

export function getSubmissionStatusLabel(state: string) {
  return submissionStatusLabels[state as keyof typeof submissionStatusLabels] ?? state;
}

export function getDeadlineStatusLabel(state: string) {
  return deadlineStatusLabels[state as keyof typeof deadlineStatusLabels] ?? state;
}

export function getExceptionStatusLabel(state: string) {
  return exceptionStatusLabels[state as keyof typeof exceptionStatusLabels] ?? state;
}

export const learningAgreementStateLabels = {
  DRAFT: 'Draft',
  SUBMITTED: 'Sent for review',
  IN_REVIEW: 'Under review',
  PARTIALLY_APPROVED: 'Partially approved',
  CHANGES_REQUESTED: 'Changes requested',
  ACCEPTED: 'Accepted',
} as const;

export const learningAgreementRowStatusLabels = {
  IN_REVIEW: 'In review',
  APPROVED: 'Approved',
  DENIED: 'Needs changes',
} as const;
