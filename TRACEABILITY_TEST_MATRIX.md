# ErasmusMate — TRACEABILITY_TEST_MATRIX.md

## Purpose

This document links ErasmusMate workflows, requirements/business rules, actors, tests, scenarios, and expected results.

It supports:

- test-first / acceptance-first development
- TFG traceability
- workflow validation
- regression control
- implementation review
- demo readiness

A test does not need to be implemented immediately to appear in this matrix. During early phases, many entries can remain as `Planned` or `Implemented - expected failing`.

---

# 1. Status values

Use the following status values:

| Status | Meaning |
|---|---|
| Planned | Test is planned but not yet implemented. |
| Implemented - expected failing | Test exists but fails because the feature is not implemented yet. |
| Implemented - passing | Test exists and passes. |
| Implemented - failing | Test exists and fails unexpectedly. |
| Deferred | Test is intentionally postponed with reason. |
| Removed | Test was removed and the reason must be documented. |

---

# 2. Test type values

Use the following test type values:

| Type | Meaning |
|---|---|
| E2E | Playwright end-to-end browser test. |
| Service/API | Vitest or equivalent test for service, API, domain, or backend rule. |
| Smoke | Basic route/app boot test. |
| Manual | Manual validation required for demo or UX behavior. |

---

# 3. Traceability matrix

## 3.1 Smoke and repository setup

| Test ID | Workflow / Area | Requirement / Rule | Actor | Type | Scenario | Expected result | Status |
|---|---|---|---|---|---|---|---|
| SMOKE-001 | App boot | App must run locally | Developer | Smoke | Start application from clean setup (`e2e/smoke/routes.spec.ts`; `tests/smoke/routes-smoke.test.ts`) | App starts without critical runtime errors | Implemented - passing |
| SMOKE-002 | Database setup | Prisma + SQLite local persistence | Developer | Smoke | Run Prisma generate, migrate, and seed | Database is created and seeded successfully | Implemented - passing |
| SMOKE-003 | Main routes | Main pages must load | Student / Coordinator / Admin | Smoke | Open home, student, coordinator, admin, and social student routes (`e2e/smoke/routes.spec.ts`) | Main routes render without 500 errors | Implemented - passing |
| SMOKE-004 | Demo users | Seeded demo context | Student / Coordinator / Admin | Smoke | Read/update demo context via `/api/demo-context` and verify seeded role mapping (`tests/shared/demo-context.test.ts`; `e2e/smoke/routes.spec.ts`) | Student, coordinator and admin contexts are available via cookie-backed demo mode | Implemented - passing |
| SMOKE-005 | Navigation context | Demo context must be reliable | Student / Coordinator / Admin | API/Smoke | PATCH demo-context API and verify GET returns the updated role (`e2e/smoke/routes.spec.ts`) | API correctly persists and returns the updated demo role via cookie | Implemented - passing |
| SMOKE-005b | Navigation context | Demo context must survive UI role switch | Student / Coordinator / Admin | E2E | Switch role via the UI role-switcher dropdown and navigate between dashboards | Selected role is reflected server-side on each dashboard after switching | Planned |
| SMOKE-006 | Figma style baseline | Visual reference must be used | Developer | Manual | Compare key screens with Figma/frontend-concept references | UI follows the same visual direction and does not look like a plain scaffold | Planned |
| SMOKE-007 | Conventional commits | Conventional commits required | Developer / Codex | Manual | Review commit history for phase | Commits follow Conventional Commits format | Planned |
| SMOKE-008 | Decision log | Decisions must be documented | Developer / Codex | Manual | Review phase completion | DECISIONS.md contains meaningful decisions from phase | Planned |

---

## 3.2 Institutional dashboard and mobility overview

| Test ID | Workflow / Area | Requirement / Rule | Actor | Type | Scenario | Expected result | Status |
|---|---|---|---|---|---|---|---|
| E2E-INST-DASH-001 | Student dashboard | Student must see relevant mobility status | Student | E2E | Student opens dashboard | Dashboard shows current Erasmus stay, pending tasks, key deadlines and quick actions | Planned |
| E2E-INST-DASH-002 | Student dashboard | Minimum-click UX | Student | E2E | Student opens dashboard with pending task | Student can access next pending action in one or few clicks | Planned |
| E2E-INST-DASH-003 | Mobility record | Student can view mobility record | Student | E2E | Student opens My Mobility Record | Mobility details and academic summary entry are visible | Planned |
| E2E-INST-DASH-004 | Coordinator dashboard | Coordinator must see assigned work | Coordinator | E2E | Coordinator opens dashboard | Review queue, exceptions and deadlines are visible (decision actions deferred) | Planned |
| E2E-INST-DASH-005 | Admin dashboard | Admin must access governance areas | Admin | E2E | Admin opens dashboard | Moderation/governance entry points are visible | Planned |
| SERVICE-INST-DASH-001 | Mobility read model | Role-scoped institutional data | Student / Coordinator | Service/API | Fetch mobility overview for authorized and unauthorized actors (`tests/institutional/dashboard-read-models.test.ts`) | Authorized users receive data; unauthorized users are blocked | Implemented - passing |

---

## 3.3 Official procedure and document submission workflow

| Test ID | Workflow / Area | Requirement / Rule | Actor | Type | Scenario | Expected result | Status |
|---|---|---|---|---|---|---|---|
| E2E-SUB-001 | Document submission | Student can create submission | Student | E2E | Student starts a required procedure submission | Draft or editable submission is created | Planned |
| E2E-SUB-002 | Document submission | Student can submit own procedure | Student | E2E | Student submits a required item | Submission changes to submitted state and appears to coordinator | Planned |
| E2E-SUB-003 | Coordinator review | Coordinator can approve | Coordinator | E2E | Coordinator approves submitted item | Submission becomes approved and student sees updated state | Planned |
| E2E-SUB-004 | Coordinator review | Coordinator can reject with rationale | Coordinator | E2E | Coordinator rejects submitted item with rationale | Submission becomes rejected and rationale is visible to student | Planned |
| E2E-SUB-005 | Rejection rationale | Rejection requires rationale | Coordinator | E2E | Coordinator attempts reject without rationale | Action is blocked with clear message | Planned |
| E2E-SUB-006 | Resubmission | Student can resubmit after rejection | Student | E2E | Student revises rejected item and resubmits | Submission returns to review queue | Planned |
| E2E-SUB-007 | Reopen | Coordinator can reopen when supported | Coordinator / Student | E2E | Coordinator reopens approved/reviewed item | Student sees item as needing correction or review again | Planned |
| SERVICE-SUB-001 | Submission transitions | Invalid transitions blocked | Student / Coordinator | Service/API | Attempt invalid state transition (`tests/institutional/submissions.test.ts`) | Backend rejects transition | Implemented - passing |
| SERVICE-SUB-002 | Submission ownership | Student cannot submit another student’s item | Student | Service/API | Student attempts to mutate another student submission | Backend rejects action | Implemented - passing |
| SERVICE-SUB-003 | Coordinator assignment | Coordinator can only review assigned items | Coordinator | Service/API | Unassigned coordinator attempts decision | Backend rejects action | Implemented - passing |
| SERVICE-SUB-004 | Auditability | Critical submission actions audited | Student / Coordinator | Service/API | Submit, approve, reject, reopen | Event/audit records are created | Implemented - passing |

---

## 3.4 Deadlines

| Test ID | Workflow / Area | Requirement / Rule | Actor | Type | Scenario | Expected result | Status |
|---|---|---|---|---|---|---|---|
| E2E-DEAD-001 | Deadlines | Student sees upcoming deadlines | Student | E2E | Student opens deadlines page/dashboard widget | Upcoming deadlines are visible and understandable | Planned |
| E2E-DEAD-002 | Deadlines | Coordinator sees risk/overdue items | Coordinator | E2E | Coordinator opens deadline view | Assigned students’ risk/overdue obligations are visible | Planned |
| SERVICE-DEAD-001 | Deadline blocking | Overdue deadline blocks submission when policy requires | Student | Service/API | Student submits after effective due date (`tests/institutional/deadlines.test.ts`) | Backend blocks action when rule applies | Planned |
| SERVICE-DEAD-002 | Deadline override | Override due date is respected | Student / Coordinator | Service/API | Exception extends due date | Submission allowed until override date | Planned |
| SERVICE-DEAD-003 | Expired override | Expired override can become overdue again | Student / Coordinator | Service/API | Override date passes | Deadline state becomes overdue or blocks when designed | Planned |
| SERVICE-DEAD-004 | Fulfilled deadline | Fulfilled deadline does not block | Student | Service/API | Submit after obligation fulfilled | Backend does not block due to fulfilled deadline | Planned |

---

## 3.5 Exception request workflow

| Test ID | Workflow / Area | Requirement / Rule | Actor | Type | Scenario | Expected result | Status |
|---|---|---|---|---|---|---|---|
| E2E-EXC-001 | Exception request | Student can create exception request | Student | E2E | Student submits exception request for deadline/procedure issue | Request is created and visible to coordinator | Planned |
| E2E-EXC-002 | Exception review | Coordinator can approve exception | Coordinator | E2E | Coordinator approves exception request | Exception state updates and student sees decision | Planned |
| E2E-EXC-003 | Exception review | Coordinator can reject exception with rationale | Coordinator | E2E | Coordinator rejects exception request | Student sees rejection and rationale | Planned |
| E2E-EXC-004 | Exception application | Approved exception can apply supported change | Coordinator | E2E | Coordinator applies deadline exception | Related deadline or obligation reflects approved exception | Planned |
| SERVICE-EXC-001 | Scope validation | Deadline-scoped exception requires deadline reference | Student | Service/API | Create deadline exception without reference (`tests/institutional/exceptions.test.ts`) | Backend rejects request | Planned |
| SERVICE-EXC-002 | Apply guard | Unsupported apply action blocked | Coordinator | Service/API | Apply exception without supported target | Backend rejects action | Planned |
| SERVICE-EXC-003 | Exception permissions | Only authorized coordinator decides | Coordinator | Service/API | Unassigned coordinator tries to decide | Backend rejects action | Planned |
| SERVICE-EXC-004 | Auditability | Exception actions audited | Student / Coordinator | Service/API | Create, approve, reject, apply exception | Event/audit records are created | Planned |

---

## 3.6 Learning Agreement and Academic Summary

| Test ID | Workflow / Area | Requirement / Rule | Actor | Type | Scenario | Expected result | Status |
|---|---|---|---|---|---|---|---|
| E2E-LA-001 | Learning Agreement | Student can create agreement | Student | E2E | Student opens My Learning Agreement | Draft agreement exists or is created | Planned |
| E2E-LA-002 | Learning Agreement rows | Student can add course equivalence row | Student | E2E | Student adds home/destination course equivalence | Row is saved with required fields | Planned |
| E2E-LA-003 | Learning Agreement validation | Empty agreement cannot be submitted | Student | E2E | Student submits agreement with zero rows | Submission is blocked with clear message | Planned |
| E2E-LA-004 | Learning Agreement validation | Incomplete rows block submission | Student | E2E | Student submits row missing required data | Submission is blocked and row issue is visible | Planned |
| E2E-LA-005 | Learning Agreement submit | Student can submit valid agreement | Student | E2E | Student submits valid course table | Agreement moves to review state and appears to coordinator | Planned |
| E2E-LA-006 | Row review | Coordinator can approve row | Coordinator | E2E | Coordinator approves row | Row becomes approved | Planned |
| E2E-LA-007 | Row review | Coordinator can deny row with rationale | Coordinator | E2E | Coordinator denies row with rationale | Row becomes denied and rationale is visible to student | Planned |
| E2E-LA-008 | Row review | Deny requires rationale | Coordinator | E2E | Coordinator denies row without rationale | Action is blocked | Planned |
| E2E-LA-009 | Partial approval | Mixed decisions produce partial approval | Student / Coordinator | E2E | Some rows approved and some denied | Agreement displays partial approval state | Planned |
| E2E-LA-010 | Denied-row resubmission | Denied rows must be revised before resubmission | Student | E2E | Student tries to resubmit unchanged denied rows | Resubmission is blocked | Planned |
| E2E-LA-011 | Denied-row revision | Student can revise denied row and resubmit | Student | E2E | Student edits denied row and resubmits | Agreement returns to review | Planned |
| E2E-LA-012 | Approved-row safe edit | Approved row edit creates new reviewable revision | Student | E2E | Student edits previously approved row | Original approved row remains historical; new row revision enters review | Planned |
| E2E-LA-013 | Academic Summary | Approved latest rows appear in summary | Student | E2E | Student opens Academic Summary | Summary shows latest approved rows only | Planned |
| E2E-LA-014 | Grade ownership | Student cannot edit grade | Student | E2E | Student attempts grade entry/edit | Grade is hidden or read-only for student | Planned |
| E2E-LA-015 | Grade coordinator control | Coordinator can enter/update grade where allowed | Coordinator | E2E | Coordinator updates grade in allowed screen | Grade is saved and does not govern approval | Planned |
| SERVICE-LA-001 | Learning Agreement validation | Duplicate equivalences blocked | Student | Service/API | Create duplicate home/destination equivalence | Backend rejects duplicate or conflict | Planned |
| SERVICE-LA-002 | Row state rules | Invalid row decision blocked | Coordinator | Service/API | Decide non-latest or already decided row (`tests/institutional/learning-agreement.test.ts`) | Backend rejects action | Planned |
| SERVICE-LA-003 | Aggregate state | State computed from latest rows | Student / Coordinator | Service/API | Multiple row decisions across revisions | Agreement aggregate state is correct | Planned |
| SERVICE-LA-004 | Safe revision | Approved row not silently mutated | Student | Service/API | Edit approved row | Backend creates new revision and keeps old row immutable | Planned |
| SERVICE-LA-005 | Grade permissions | Student cannot mutate grade | Student | Service/API | Student sends payload with grade value | Backend rejects or ignores unauthorized grade mutation | Planned |
| SERVICE-LA-006 | Auditability | Learning Agreement actions audited | Student / Coordinator | Service/API | Create, submit, decide, resubmit, revise row | Event/audit records are created | Planned |

---

## 3.7 Social profile and discovery

| Test ID | Workflow / Area | Requirement / Rule | Actor | Type | Scenario | Expected result | Status |
|---|---|---|---|---|---|---|---|
| E2E-SOC-DISC-001 | Social profile | Student can create/update social profile | Student | E2E | Student edits social profile | Profile changes persist | Planned |
| E2E-SOC-DISC-002 | Visibility settings | Student can control discoverability | Student | E2E | Student disables discoverability | Student disappears from discovery results | Planned |
| E2E-SOC-DISC-003 | Discovery | Student can find visible eligible students | Student | E2E | Student filters discovery by city/institution/stage | Results update with eligible visible profiles | Planned |
| E2E-SOC-DISC-004 | Contactability | Non-contactable profiles cannot be contacted | Student | E2E | Student tries to request connection with non-contactable profile | Request action is not available or blocked | Planned |
| SERVICE-SOC-DISC-001 | Discoverability | Hidden profiles excluded server-side | Student | Service/API | Query discovery with hidden profile in DB (`tests/social/discovery.test.ts`) | Hidden profile is not returned | Planned |
| SERVICE-SOC-DISC-002 | Consent/contactability | Contactability enforced server-side | Student | Service/API | Attempt request when target is not contactable | Backend rejects request | Planned |
| SERVICE-SOC-DISC-003 | Separation | Social discovery does not expose official institutional records | Student | Service/API | Query social discovery | Response contains social-safe profile fields only | Planned |

---

## 3.8 Connections and messaging

| Test ID | Workflow / Area | Requirement / Rule | Actor | Type | Scenario | Expected result | Status |
|---|---|---|---|---|---|---|---|
| E2E-CONN-001 | Connection request | Student can send request | Student | E2E | Student requests connection from discovery | Request is created as pending | Planned |
| E2E-CONN-002 | Connection response | Recipient can accept request | Student | E2E | Recipient accepts request | Connection becomes accepted | Planned |
| E2E-CONN-003 | Connection response | Recipient can reject request | Student | E2E | Recipient rejects request | Connection becomes rejected and messaging unavailable | Planned |
| E2E-CONN-004 | Cancel request | Sender can cancel pending request | Student | E2E | Sender cancels pending request | Request becomes cancelled/removed from active pending list | Planned |
| E2E-CONN-005 | Blocking | Blocked pair cannot interact | Student | E2E | Student blocks another student | Future connection/message actions are unavailable or rejected | Planned |
| E2E-MSG-001 | Messaging | Accepted connections can message | Student | E2E | Accepted pair opens thread and sends message | Message appears in thread and persists | Planned |
| E2E-MSG-002 | Messaging guard | Pending connection cannot message | Student | E2E | Pending pair attempts message | Messaging is blocked | Planned |
| E2E-MSG-003 | Messaging guard | Blocked users cannot message | Student | E2E | Blocked pair attempts message | Backend/UI blocks message | Planned |
| SERVICE-CONN-001 | Connection state | Invalid connection transitions blocked | Student | Service/API | Attempt invalid accept/cancel/block transition (`tests/social/connections.test.ts`) | Backend rejects action | Planned |
| SERVICE-MSG-001 | Messaging permission | Accepted-only rule enforced server-side | Student | Service/API | Send message without accepted connection (`tests/social/messaging.test.ts`) | Backend rejects message | Planned |
| SERVICE-MSG-002 | Messaging persistence | Messages persist | Student | Service/API | Send message and fetch thread | Message is present with correct author/time | Planned |

---

## 3.9 Social content, favorites, reporting and moderation

| Test ID | Workflow / Area | Requirement / Rule | Actor | Type | Scenario | Expected result | Status |
|---|---|---|---|---|---|---|---|
| E2E-CONT-001 | Recommendations/tips/reviews | Student can create content | Student | E2E | Student creates recommendation/tip/review | Content is saved and visible if allowed | Planned |
| E2E-CONT-002 | Own content | Student can edit own content | Student | E2E | Student edits own recommendation | Changes persist | Planned |
| E2E-CONT-003 | Own content | Student cannot edit others’ content | Student | E2E | Student attempts edit on another author’s content | Action is unavailable or blocked | Planned |
| E2E-FAV-001 | Favorites | Student can favorite content | Student | E2E | Student saves recommendation as favorite | Favorite appears in saved items | Planned |
| E2E-FAV-002 | Favorites | Student can remove favorite | Student | E2E | Student removes saved item | Favorite no longer appears | Planned |
| E2E-REP-001 | Reporting | Student can report content | Student | E2E | Student reports recommendation/review | Moderation report is created | Planned |
| E2E-MOD-001 | Moderation queue | Admin can view reports | Admin | E2E | Admin opens moderation queue | Pending reports are visible | Planned |
| E2E-MOD-002 | Moderation action | Admin can hide content | Admin | E2E | Admin hides reported content | Content no longer appears to regular users | Planned |
| E2E-MOD-003 | Moderation action | Admin can remove content | Admin | E2E | Admin removes content | Content is removed or unavailable according to rule | Planned |
| SERVICE-CONT-001 | Content ownership | Only owner edits own content | Student | Service/API | Non-owner attempts edit/delete | Backend rejects action | Planned |
| SERVICE-FAV-001 | Favorites persistence | Favorites persist by user | Student | Service/API | Add/remove favorite and fetch list | Favorite state is correct | Planned |
| SERVICE-REP-001 | Reporting | Report creates moderation case/record | Student | Service/API | Submit content report (`tests/social/content-moderation.test.ts`) | Moderation data is created | Planned |
| SERVICE-MOD-001 | Moderation enforcement | Hidden/removed content filtered server-side | Student / Admin | Service/API | Query content after moderation action | Visibility matches moderation decision | Planned |
| SERVICE-MOD-002 | Report threshold | Highly reported content hidden/obscured if implemented | Student / Admin | Service/API | Create multiple reports over threshold | Content visibility changes according to rule | Planned |

---

## 3.10 Map-based social discovery

| Test ID | Workflow / Area | Requirement / Rule | Actor | Type | Scenario | Expected result | Status |
|---|---|---|---|---|---|---|---|
| E2E-MAP-001 | Map | Real map loads | Student | E2E | Student opens map page | Interactive map appears without fatal error | Planned |
| E2E-MAP-002 | Map data | Backend-backed markers appear | Student | E2E | Map loads with seeded place/content data | Markers or result list appear from backend data | Planned |
| E2E-MAP-003 | Map filters | Filters update results | Student | E2E | Student changes city/category/content filter | Marker/list results update | Planned |
| E2E-MAP-004 | Map list/preview | Selecting list item updates preview | Student | E2E | Student clicks result list item | Preview panel shows selected item | Planned |
| E2E-MAP-005 | Map marker/preview | Selecting marker updates preview | Student | E2E | Student clicks marker | Preview panel shows selected item | Planned |
| E2E-MAP-006 | Map detail | Student opens detail from map | Student | E2E | Student clicks open detail from preview | Content detail page opens | Planned |
| E2E-MAP-007 | Report from map | Student reports mapped content | Student | E2E | Student clicks report from map | Report is created through moderation flow | Planned |
| SERVICE-MAP-001 | Map visibility | Hidden/removed content excluded | Student | Service/API | Query map items with hidden/removed content (`tests/social/map-visibility.test.ts`) | Hidden/removed items are not returned | Planned |
| SERVICE-MAP-002 | Map privacy | Private unsafe locations not exposed | Student | Service/API | Query map data | Response contains only approved public place context | Planned |
| SERVICE-MAP-003 | Map moderation | Server-side moderation filtering enforced | Student | Service/API | Query map data after moderation action | Visibility reflects moderation decision | Planned |

---

## 3.11 Product-wide visual and UX quality

| Test ID | Workflow / Area | Requirement / Rule | Actor | Type | Scenario | Expected result | Status |
|---|---|---|---|---|---|---|---|
| UX-001 | UI language | Human-friendly language | Student / Coordinator / Admin | Manual | Review main screens | UI avoids technical/internal wording | Planned |
| UX-002 | Minimum-click UX | Common actions accessible quickly | Student | Manual | From dashboard, access next pending task | Action is reachable in fewest reasonable clicks | Planned |
| UX-003 | Coordinator efficiency | Review actions easy to reach | Coordinator | Manual | Coordinator opens queue and decides item | Approve/reject/request change actions are visible and direct | Planned |
| UX-004 | Visual alignment | Figma visual direction followed | Student / Coordinator / Admin | Manual | Compare key screens to Figma/frontend-concept | Layout, hierarchy, cards, badges and navigation feel aligned | Planned |
| UX-005 | Empty/loading/error/success | Feedback states consistent | Student / Coordinator / Admin | Manual | Trigger loading, empty, error and success states | States are clear, useful and visually consistent | Planned |
| UX-006 | Accessibility basics | Basic accessible interactions | Student / Coordinator / Admin | Manual | Review navigation, forms, buttons and links | Labels, roles, focus and active states are understandable | Planned |
| UX-007 | Social IA | Social layer is clear and secondary | Student | Manual | Navigate social area | Social does not feel mixed into official institutional workflows | Planned |
| UX-008 | Institutional primacy | Institutional core remains primary | Student / Coordinator / Admin | Manual | Review global IA and dashboards | Official mobility processing remains visually and functionally primary | Planned |

---

# 4. Update policy

This matrix must be updated when:

- a new workflow is added
- a test is created
- a test changes status
- a workflow is deferred
- a requirement/business rule is clarified
- a phase is completed
- a test is removed

No implementation phase is complete until this matrix reflects the tests and scenarios relevant to that phase.

---

# 5. Notes for Codex

Codex must not treat this matrix as optional.

When implementing a phase, Codex must:

1. identify affected rows in this matrix
2. add missing rows if needed
3. update status values
4. add test IDs matching actual test files when implemented
5. document deferred tests with a reason

If Codex creates tests with different names or IDs, it must update this matrix to match the implementation.
