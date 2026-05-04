# ErasmusMate — TEST_STRATEGY.md

## Purpose

This document defines the testing strategy for ErasmusMate Iteration 3.

The project follows a **test-first / acceptance-first** approach.

The objective is not only to check that the application compiles, but to verify that the main ErasmusMate workflows work end-to-end with real frontend, backend, persistence, and role-based behavior.

Testing must support:

- product reliability
- workflow correctness
- regression prevention
- traceability for the TFG
- confidence before each merge
- demo readiness

---

# 1. Testing principles

## 1.1 Test before or alongside implementation

For major functionality, tests should be created before or alongside implementation.

It is acceptable for tests to fail initially when the implementation does not exist yet.

However, no phase is complete until:

- relevant tests exist
- tests pass, or failing tests are clearly documented as deferred
- `TRACEABILITY_TEST_MATRIX.md` is updated

## 1.2 Test workflows, not isolated screens only

ErasmusMate must be tested by user journeys and workflow behavior.

A screen that renders correctly is not enough if the underlying workflow does not work.

Each critical workflow should verify:

- correct UI journey
- backend persistence
- role permissions
- state transitions
- validation rules
- relevant audit/event creation where applicable

## 1.3 Backend rules must be tested directly where possible

Important business rules should not rely only on E2E tests.

Rules such as state transitions, permissions, visibility, moderation, deadline blocking, and resubmission guards should be tested at service/API level when practical.

## 1.4 Tests must be traceable

Every meaningful test should appear in `TRACEABILITY_TEST_MATRIX.md`.

The matrix must link tests to:

- workflow
- actor
- requirement or business rule when available
- test type
- scenario
- expected result
- status

---

# 2. Testing layers

ErasmusMate uses three main testing layers:

1. E2E tests.
2. Service/API/domain tests.
3. Smoke tests.

---

# 3. E2E testing

## Tool

Use **Playwright**.

## Purpose

E2E tests validate complete user journeys through the UI.

They should verify that the application works as a real product, not just as separate technical components.

## Recommended folder structure

    e2e/
      auth-demo.spec.ts
      institutional/
        student-dashboard.spec.ts
        submissions.spec.ts
        coordinator-review.spec.ts
        deadlines.spec.ts
        exceptions.spec.ts
        learning-agreement.spec.ts
      social/
        discovery.spec.ts
        connections.spec.ts
        messaging.spec.ts
        content.spec.ts
        moderation.spec.ts
        map.spec.ts
      smoke/
        app-routes.spec.ts

## Main E2E journeys

### Student institutional journeys

Tests should cover:

- student can open dashboard
- student sees pending institutional tasks
- student can view mobility record
- student can submit a procedure/document
- student can see submission status changes
- student can create exception request
- student can create and submit Learning Agreement
- student can revise denied Learning Agreement rows
- student can view Academic Summary

### Coordinator institutional journeys

Tests should cover:

- coordinator can open dashboard
- coordinator can see review queue
- coordinator can approve a submission
- coordinator can reject a submission with rationale
- coordinator can reopen or request correction when supported
- coordinator can review exception requests
- coordinator can review Learning Agreement rows
- coordinator can approve or deny Learning Agreement rows
- coordinator can enter grade only where allowed

### Admin journeys

Tests should cover:

- admin can open dashboard
- admin can access moderation queue
- admin can review reported content
- admin can hide, remove, or restrict content when workflow allows
- admin actions affect social content visibility

### Social journeys

Tests should cover:

- student can create or update social profile
- student can discover visible eligible students
- student can send connection request
- student can accept, reject, or cancel connection request
- accepted connections can message
- non-accepted or blocked users cannot message
- student can create recommendation, tip, or review
- student can favorite content
- student can report content
- hidden or restricted content is not visible where appropriate

### Map journeys

Tests should cover:

- map loads
- backend-backed markers appear
- filters update visible results
- selecting list item updates preview
- selecting marker updates preview
- user can open content detail from map
- user can report mapped content
- moderation and visibility rules affect map results

---

# 4. Service/API/domain testing

## Tool

Use **Vitest** where practical.

## Purpose

Service/API/domain tests validate workflow logic without requiring browser UI.

They should focus on rules that are too important to leave only to E2E tests.

## Recommended folder structure

    tests/
      setup/
        test-db.ts
        factories.ts
      institutional/
        submissions.service.test.ts
        deadlines.service.test.ts
        exceptions.service.test.ts
        learning-agreement.service.test.ts
      social/
        discovery.service.test.ts
        connections.service.test.ts
        messaging.service.test.ts
        content.service.test.ts
        moderation.service.test.ts
        map-visibility.service.test.ts
      shared/
        permissions.test.ts
        audit.test.ts

## Institutional rules to test

### Submissions

Test:

- student can create draft
- student can submit own draft
- student cannot submit another student’s item
- coordinator can approve assigned submission
- coordinator can reject with rationale
- rejection without rationale is blocked
- invalid transitions are blocked
- approved, rejected, and reopened transitions create event/audit records

### Deadlines

Test:

- upcoming deadline is not blocked
- overdue deadline blocks submission when policy requires it
- override deadline is respected
- expired override can become overdue again if designed that way
- fulfilled deadline does not block

### Exceptions

Test:

- student can create valid exception request
- deadline-scoped exception requires deadline reference
- coordinator can approve or reject exception
- applying exception updates the related obligation/deadline when supported
- invalid apply action is blocked

### Learning Agreement

Test:

- student can create draft agreement
- student can add valid rows
- empty agreement cannot be submitted
- invalid rows block submission
- duplicate or conflicting equivalences are blocked
- coordinator can approve latest row
- coordinator can deny latest row with rationale
- deny without rationale is blocked
- partial approval changes aggregate state correctly
- denied rows must be revised before resubmission
- approved row edit creates a new reviewable revision
- approved row is not silently mutated
- grade is not editable by student
- grade is coordinator-controlled and non-governing

---

# 5. Social rules to test

## Discovery and visibility

Test:

- discoverable students appear
- non-discoverable students do not appear
- contactability settings are respected
- social discovery remains separate from institutional record search

## Connections

Test:

- student can send request when allowed
- recipient can accept or reject
- sender can cancel pending request
- blocked pair cannot create new connection
- invalid state transitions are blocked

## Messaging

Test:

- accepted connection can message
- pending connection cannot message
- rejected, cancelled, or blocked connection cannot message
- blocked users cannot continue messaging

## Content

Test:

- student can create recommendation, tip, or review
- student can edit/delete own content when allowed
- student cannot edit/delete others’ content
- favorites persist
- reported content creates moderation record

## Moderation

Test:

- admin can review reports
- admin can hide, remove, or restrict content
- hidden, restricted, or removed content visibility is enforced server-side
- high report threshold behavior is enforced if implemented

## Map visibility

Test:

- map returns only visible content
- removed/hidden content does not appear
- visibility rules are enforced server-side
- report from map creates moderation record

---

# 6. Smoke testing

## Purpose

Smoke tests verify that the application can start and the main routes are not broken.

They are not a substitute for workflow tests.

## Smoke tests should cover

- app home loads
- student dashboard loads
- coordinator dashboard loads
- admin dashboard loads
- social student dashboard loads
- map page loads
- Learning Agreement page loads
- API health or basic read endpoints respond
- seed data exists
- no critical 500 errors on main routes

## Recommended file

    e2e/smoke/app-routes.spec.ts

---

# 7. Seed data strategy

Seed data must be deterministic and demo-ready.

Seed should create at least:

## Users

- one student
- one coordinator
- one administrator
- optional additional students for discovery/social tests

## Institutional data

- institution
- mobility record
- procedures
- submissions in several states
- deadlines
- exception requests
- audit/event records
- Learning Agreement with mixed row states

## Social data

- social profiles
- visible/discoverable students
- hidden/non-discoverable student
- connections in several states
- message thread for accepted connection
- recommendations, tips, and reviews
- favorites
- reports
- moderation cases
- map place contexts

## Seed requirements

Seed must support:

- reliable demos
- repeatable E2E tests
- predictable IDs or stable selectors where useful
- clean reset behavior for local development

If seed destroys existing local data, document that clearly in `README.md`.

---

# 8. Demo identity testing

A production authentication system is not required unless explicitly implemented.

However, the demo identity system must be reliable.

Tests should verify:

- student context loads student data
- coordinator context loads coordinator data
- admin context loads admin data
- navigation preserves active demo context
- role switcher behavior is honest and consistent
- social pages remain student-scoped unless intentionally designed otherwise

If query params, local storage, cookies, or demo session helpers are used, document the decision in `DECISIONS.md`.

---

# 9. UI and accessibility testing

Automated accessibility testing is not required as a full audit, but basic issues should be avoided.

E2E or manual checks should verify:

- buttons are real buttons
- links are real links
- no invalid nested interactive elements
- main navigation has clear active state
- forms have labels
- errors are visible and understandable
- empty states explain what to do
- keyboard flow is reasonable for main actions
- status badges are supported by text, not color only

UI copy should be checked for human-friendly wording.

Avoid technical language in user-facing screens.

---

# 10. Test IDs and selectors

Prefer user-facing selectors when stable:

- role
- label text
- button text
- heading text
- accessible name

Use `data-testid` only when necessary.

If `data-testid` is used, use clear stable names:

    student-dashboard
    coordinator-review-queue
    learning-agreement-table
    learning-agreement-row
    academic-summary-table
    social-discovery-results
    social-map-marker-list
    moderation-case-card

Do not overuse test IDs when accessible selectors work.

---

# 11. Validation commands

Recommended validation commands:

    npm install
    npx prisma generate
    npx prisma migrate dev
    npm run db:seed
    npm run lint
    npm run build
    npm run test
    npx playwright test

If a command cannot run in Codex or CI due to environment limitations, document:

- which command failed
- why it failed
- whether it should pass locally
- what the developer should run manually

---

# 12. Phase-level testing requirements

Each implementation phase must include a testing step.

## Before phase implementation

Codex should identify:

- which tests already cover this area
- which tests need to be added
- whether the traceability matrix needs new entries

## During phase implementation

Codex should:

- add or update tests
- keep selectors stable
- preserve existing passing tests where possible

## After phase implementation

Codex must:

- run available tests
- document any failures
- update `TRACEABILITY_TEST_MATRIX.md`
- update `DECISIONS.md` if testing strategy decisions were made

---

# 13. Test status labels

Use these status values in `TRACEABILITY_TEST_MATRIX.md`:

- `Planned`
- `Implemented - expected failing`
- `Implemented - passing`
- `Implemented - failing`
- `Deferred`
- `Removed`

## Planned

Test is intended but not yet implemented.

## Implemented - expected failing

Test exists but fails because the feature is not yet implemented.

## Implemented - passing

Test exists and passes.

## Implemented - failing

Test exists and fails unexpectedly.

## Deferred

Test is intentionally postponed with reason.

## Removed

Test was removed and the reason must be documented.

---

# 14. Review policy

A pull request or phase should not be merged until:

- lint/build status is known
- relevant tests are run or documented
- critical E2E flows are not broken
- traceability matrix is updated
- decisions are updated
- no blocking review issues remain

If Copilot/Codex review identifies blocking issues, fix them before merge.

---

# 15. Definition of done for testing

Testing is sufficient for a phase when:

- relevant test files exist
- important workflow paths are covered
- important backend rules are covered where practical
- traceability matrix is updated
- validation commands were run or documented
- failures are explained
- no unexpected blocking failure remains
