# Phase 8A.4 Coverage Audit — Requirements, Workflow, Business Rules, Tests

- **Audit date:** 2026-05-06
- **Phase:** 8A.4
- **Scope:** Institutional workflows, social workflows, role/permission guard coverage, UI contract coverage, test suite quality, and documentation consistency.
- **Evidence sources:** `prisma/schema.prisma`, `src/modules/**`, `app/api/**`, `app/(institutional)/**`, `app/(social)/**`, `src/components/**`, `tests/**`, `e2e/**`, `DECISIONS.md`, `TRACEABILITY_TEST_MATRIX.md`, `TEST_STRATEGY.md`, `PLAN.md`, `README.md`.

## 1) Implemented coverage summary

### Institutional
- Strong service/API coverage for submissions transitions (including rationale and audit records), deadlines blocking/overrides, exceptions, Learning Agreement revision model, academic summary scoping, attachments lifecycle, and dashboard read models.
- UI contract tests exist for student submissions, coordinator review queue, coordinator dashboard, deadlines, admin procedures, student/coordinator Learning Agreement screens, and activity feed.
- API routes and modules are aligned to institutional boundaries.

### Social
- Strong service/API coverage for social profile update guards, discovery visibility protections, connection lifecycle stabilization (cancel/reject/block/unblock/re-request), accepted-only messaging, recommendation reporting and moderation actions, and map/recommendation visibility filtering.
- UI contract coverage exists for social discovery, profile, connections, messages, recommendations, and map page contracts.
- Admin social moderation workflows are implemented in API + services and covered by social moderation tests.

### Role/permissions and safety
- Explicit tests cover role restrictions for major social APIs (non-student forbidden), coordinator assignment checks in institutional review, ownership checks, and hidden/moderation-hidden protections.
- No local filesystem path exposure observed in attachment-open behavior and API responses; storage keys are handled server-side.

## 2) Uncovered / weakly covered areas

## Critical
- **None identified** (no immediate data integrity or permission bypass gap found in current audited implementation).

## High
1. **E2E depth lagging behind service/API maturity.**
   - Most workflow rows in traceability remain Planned for real Playwright acceptance scenarios despite broad backend coverage.
   - Recommendation: **Fix in 8B** (author/activate workflow E2E slices for highest-risk journeys first).

2. **Exception workflow negative-path coverage is incomplete.**
   - Service tests do not fully cover unsupported apply payload variants and detailed rationale enforcement matrix.
   - Recommendation: **Fix in 8B**.

## Medium
1. **Notifications workflow coverage is thin.**
   - API exists and UI panel exists, but dedicated service/API tests for mark-read/read-all edge cases are limited.
   - Recommendation: **Fix in 8B**.

2. **UI contract coverage for launcher and role-area labels could be more explicit.**
   - Shared tests validate navigation coherence but not a strict matrix for every role label/entry.
   - Recommendation: **Fix in 8B**.

3. **Security hardening assertions (stack trace/storage key leakage) are not centralized.**
   - Coverage is implicit across tests rather than consolidated as explicit safety contract tests.
   - Recommendation: **Defer to 9A**.

## Low
1. **Some test naming still carries phase-era labels (e.g., phase-prefixed filenames).**
   - Not functionally incorrect but impacts maintainability and discoverability.
   - Recommendation: **Document as limitation** and clean in 8B/9A refactor windows.

2. **A few traceability rows are optimistic vs current executable evidence phrasing.**
   - Requires periodic wording harmonization only.
   - Recommendation: **No action needed immediately** (refresh incrementally in 8B updates).

## 3) Suspected workflow gaps (implementation present, acceptance evidence weak)

- Full cross-role end-to-end flow for: submission decision loop, exception approval+apply, and moderation visibility propagation across discovery/recommendations/map.
- Explicit E2E for map report-from-preview to admin moderation action and post-action visibility re-check.
- Explicit institutional notification-to-action user journey tests.

## 4) Test suite audit findings

### Classification (current)
- **Service/domain/API tests:** Broad institutional + social module coverage (majority of `tests/institutional/*`, `tests/social/*`).
- **UI contract tests:** Institutional/social/shared route and component contracts present.
- **Smoke tests:** Seed idempotency + route smoke tests present (`tests/smoke/*`, `e2e/smoke/*`).
- **Routing tests:** Shared routing contract tests present.
- **Seed/idempotency tests:** Present in smoke + social/service contexts.

### Quality notes
- **Duplicates:** Limited acceptable overlap between `deadlines.test.ts` and `deadlines-phase6c.test.ts` and between certain social moderation assertions; overlap is currently useful regression redundancy.
- **Fragility:** Some tests assert seed IDs and specific seeded actor IDs; practical for deterministic MVP but brittle if seed fixtures are re-keyed.
- **Asserts too little:** Several UI contract tests validate presence/copy only and do not verify actionable transitions.
- **Asserts implementation details:** Some tests directly depend on specific internal seeded IDs and exact state constants; acceptable now, but candidates for helper-driven factories in 9A hardening.

## 5) Documentation consistency audit

- `TEST_STRATEGY.md` already distinguishes E2E, service/API/domain, and smoke layers sufficiently; no mandatory structural update required in this phase.
- `TRACEABILITY_TEST_MATRIX.md` needed explicit Phase 8A.4 audit mapping section (added).
- `DECISIONS.md` needed explicit phase decision to prevent accidental scope creep in this audit phase (added).

## 6) Proposed Phase 8B backlog (from this audit)

1. Promote highest-risk Planned E2E workflows to passing:
   - institutional submission loop (student + coordinator);
   - exception create/review/apply;
   - Learning Agreement submit/review/revise/resubmit;
   - moderation action propagation to discovery/recommendations/map.
2. Add focused notification service/API tests (list/read/read-all permissions and ownership).
3. Add explicit role-label/global-launcher UI contract assertions for student/coordinator/admin area cues.
4. Add explicit error-safety contract tests ensuring no stack traces/storage keys leak via public API responses.
5. Normalize legacy phase-prefixed test filenames where low risk.

## 7) Recommendations by item

- E2E workflow depth gap: **Fix in 8B**
- Exception negative-path matrix: **Fix in 8B**
- Notification test depth: **Fix in 8B**
- Launcher/role-label contract explicitness: **Fix in 8B**
- Security hardening explicit contract pack: **Defer to 9A**
- Evidence pack synthesis/reporting outputs: **Defer to 9B**
- Legacy naming cleanup: **Document as limitation**
- Areas already sufficiently covered by service/API contracts: **No action needed**


## 8) Phase 8B.1 follow-up — institutional E2E acceptance activation

Reduced gaps in this slice:
- Activated executable Playwright acceptance evidence for cross-role institutional submission loop (student resubmit + coordinator decision).
- Activated executable Playwright acceptance evidence for Learning Agreement coordinator row decision with student-visible confirmation.
- Activated executable Playwright acceptance evidence for exception create + coordinator approve path.

Remaining limitations for next slice (Phase 8B.2):
- Learning Agreement full submit → deny/request changes → revise/resubmit loop is still only partially covered in E2E; deeper revision semantics remain primarily service/API-backed.
- Exception `apply` transition is not yet E2E-covered due to prompt-driven UI interactions and fixture brittleness risk.
- Institutional notification-to-action acceptance path remains pending dedicated E2E coverage.

## 9) Phase 8B.2 follow-up — exception negative paths and notification service depth

Coverage added in this slice:
- Added service-level exception negative-path matrix checks for role guard, ownership guard, reject rationale requirement, apply-state restrictions, missing apply payload, and not-found transition behavior.
- Added dedicated notifications API/service coverage for list ownership scoping, mark-read ownership, missing notification handling, read-all ownership isolation, and read-all idempotency/zero-unread behavior.
- Added direct assertions for safe error behavior on covered negative paths (controlled status + no local path leakage in payloads).

Remaining deferred gaps after Phase 8B.2:
- Exception `apply` transition remains deferred at full E2E depth; service/API guard coverage now exists.
- Institutional notification-to-action E2E journey remains deferred; backend/API semantics are now covered.
- Learning Agreement full deny/request-changes → revise/resubmit loop remains only partially covered at E2E depth.

Current limitation notes:
- Exception and notification hardening here is scoped to direct workflow guard assertions; centralized Phase 9A security hardening pack remains intentionally out of scope.
