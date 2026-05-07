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
| Implemented - passing E2E | Test exists, is executable end-to-end, and passes. |
| Implemented - failing | Test exists and fails unexpectedly. |
| Deferred | Test is intentionally postponed with reason. |
| Removed | Test was removed and the reason must be documented. |

---

# 2. Test type values

Use the following test type values:

| Type | Meaning |
|---|---|
| E2E | Playwright end-to-end browser test. |
| E2E (API-assisted acceptance) | Playwright acceptance journey with real pages plus selected API-triggered transitions for deterministic local execution. |
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

| UI-LAUNCH-001 | Global launcher | Launcher exposes role entry points | Student / Coordinator / Admin | Service/API | Contract-check launcher labels and routes (`tests/shared/launcher-contract.test.ts`) | Stable labels/links for Student Dashboard, Coordinator Dashboard, Admin Dashboard, Student Social | Implemented - UI contract tests |
| UI-LAUNCH-002 | Role-area cues | Major areas keep role/context cues and return path | Student / Coordinator / Admin | Service/API | Contract-check top bar return affordance and role coherence (`tests/shared/navigation-role-coherence.test.ts`) | Area context remains visible and Back to ErasmusMate home is discoverable | Implemented - UI contract tests |
| E2E-INST-DASH-001 | Student dashboard | Student must see relevant mobility status | Student | E2E | Student opens dashboard | Dashboard shows current Erasmus stay, pending tasks, key deadlines and quick actions | Planned |
| E2E-INST-DASH-002 | Student dashboard | Minimum-click UX | Student | E2E | Student opens dashboard with pending task | Student can access next pending action in one or few clicks | Planned |
| E2E-INST-DASH-003 | Mobility record | Student can view mobility record | Student | E2E | Student opens My Mobility Record | Mobility details and academic summary entry are visible | Planned |
| E2E-INST-DASH-004 | Coordinator dashboard | Coordinator must see assigned work | Coordinator | E2E | Coordinator opens dashboard | Review queue, exceptions and deadlines are visible (decision actions deferred) | Planned |
| E2E-INST-DASH-005 | Admin dashboard | Admin must access governance areas | Admin | E2E | Admin opens dashboard | Moderation/governance entry points are visible | Planned |
| SERVICE-INST-DASH-001 | Mobility read model | Role-scoped institutional data | Student / Coordinator | Service/API | Fetch mobility overview for authorized and unauthorized actors (`tests/institutional/dashboard-read-models.test.ts`) | Authorized users receive data; unauthorized users are blocked | Implemented - passing |

---

| UI-INST-DASH-004 | Student dashboard copy hygiene | UI must avoid route-like/internal implementation labels | Student | Service/API | Assert institutional student dashboard does not include route-shaped labels in card copy (`tests/institutional/student-dashboard-copy.test.ts`) | User-facing labels remain human-readable and non-technical | Implemented - passing |

## 3.3 Official procedure and document submission workflow

| Test ID | Workflow / Area | Requirement / Rule | Actor | Type | Scenario | Expected result | Status |
|---|---|---|---|---|---|---|---|
| E2E-SUB-001 | Document submission | Student can create submission | Student | E2E | Student starts a required procedure submission | Draft or editable submission is created | Planned |
| E2E-SUB-002 | Document submission | Student can submit own procedure | Student | E2E (API-assisted acceptance) | Student resubmits a correction-required item and status returns to waiting review (`e2e/institutional/workflows.spec.ts`) | Submission changes to submitted/resubmitted state and appears to coordinator queue | Implemented - passing E2E (API-assisted acceptance) |
| E2E-SUB-003 | Coordinator review | Coordinator can approve | Coordinator | E2E (API-assisted acceptance) | Coordinator starts review and approves seeded student submission (`e2e/institutional/workflows.spec.ts`) | Submission becomes approved and student/API view reflects updated state | Implemented - passing E2E (API-assisted acceptance) |
| E2E-SUB-004 | Coordinator review | Coordinator can reject with rationale | Coordinator | E2E | Coordinator rejects submitted item with rationale | Submission becomes rejected and rationale is visible to student | Planned |
| E2E-SUB-005 | Rejection rationale | Rejection requires rationale | Coordinator | E2E | Coordinator attempts reject without rationale | Action is blocked with clear message | Planned |
| E2E-SUB-006 | Resubmission | Student can resubmit after rejection | Student | E2E (API-assisted acceptance) | Student triggers resubmit action from correction state (`e2e/institutional/workflows.spec.ts`) | Submission returns to coordinator review queue | Implemented - passing E2E (API-assisted acceptance) |
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
| SERVICE-DEAD-001 | Deadline blocking | Overdue deadline blocks submission when policy requires | Student | Service/API | Student submits after effective due date (tests/institutional/deadlines.test.ts + submission guards) | Backend blocks action when rule applies | Implemented - passing |
| SERVICE-DEAD-002 | Deadline override | Override due date is respected | Student / Coordinator | Service/API | Exception extends due date (tests/institutional/deadlines.test.ts, tests/institutional/exceptions.test.ts) | Submission allowed until override date | Implemented - passing |
| SERVICE-DEAD-003 | Expired override | Expired override can become overdue again | Student / Coordinator | Service/API | Override date passes | Deadline state becomes overdue or blocks when designed | Planned |
| SERVICE-DEAD-004 | Fulfilled deadline | Fulfilled deadline does not block | Student | Service/API | Submit after obligation fulfilled | Backend does not block due to fulfilled deadline | Planned |

---

## 3.5 Exception request workflow

| Test ID | Workflow / Area | Requirement / Rule | Actor | Type | Scenario | Expected result | Status |
|---|---|---|---|---|---|---|---|
| E2E-EXC-001 | Exception request | Student can create exception request | Student | E2E (API-assisted acceptance) | Student submits new exception request from exception page (`e2e/institutional/workflows.spec.ts`) | Request is created and visible in coordinator exception queue | Implemented - passing E2E (API-assisted acceptance) |
| E2E-EXC-002 | Exception review | Coordinator can approve exception | Coordinator | E2E (API-assisted acceptance) | Coordinator approves newly created student exception (`e2e/institutional/workflows.spec.ts`) | Exception state updates to Approved and remains visible in queue | Implemented - passing E2E (API-assisted acceptance) |
| E2E-EXC-003 | Exception review | Coordinator can reject exception with rationale | Coordinator | E2E | Coordinator rejects exception request | Student sees rejection and rationale | Planned |
| E2E-EXC-004 | Exception application | Approved exception can apply supported change | Coordinator | E2E (API-assisted acceptance) | Coordinator approves and applies a student exception, then student sees the applied outcome (`e2e/institutional/workflows.spec.ts`) | Exception moves to Applied and student-facing exception card reflects applied rationale/state | Implemented - passing E2E (API-assisted acceptance) |
| SERVICE-EXC-001 | Scope validation | Deadline-scoped exception requires deadline reference | Student | Service/API | Create deadline exception with invalid/foreign scope and non-student actor (`tests/institutional/exceptions.test.ts`) | Backend rejects request with role/ownership guard | Implemented - negative-path coverage |
| SERVICE-EXC-002 | Apply guard | Unsupported apply action blocked | Coordinator | Service/API | Apply exception from non-approved state or without required apply payload (`tests/institutional/exceptions.test.ts`) | Backend rejects unsafe apply transition/payload | Implemented - negative-path coverage |
| SERVICE-EXC-003 | Exception permissions | Only authorized coordinator decides | Coordinator | Service/API | Unassigned coordinator tries to decide (tests/institutional/exceptions.test.ts) | Backend rejects action | Implemented - passing |
| SERVICE-EXC-004 | Auditability | Exception actions audited | Student / Coordinator | Service/API | Create, approve, apply exception (tests/institutional/exceptions.test.ts) | Event/audit records are created | Implemented - passing |
| SERVICE-EXC-005 | Review guard matrix | Exception review guard behavior stays safe | Coordinator | Service/API | Reject without rationale and transition unknown ID (`tests/institutional/exceptions.test.ts`) | Validation and not-found behaviors are controlled and deterministic | Implemented - service/API tests |

---

## 3.6 Learning Agreement and Academic Summary

| Test ID | Workflow / Area | Requirement / Rule | Actor | Type | Scenario | Expected result | Status |
|---|---|---|---|---|---|---|---|
| E2E-LA-001 | Learning Agreement | Student can create agreement | Student | E2E | Student opens My Learning Agreement | Draft agreement exists or is created | Planned (Phase 4B UI ready; E2E pending execution) |
| E2E-LA-002 | Learning Agreement rows | Student can add course equivalence row | Student | E2E | Student adds home/destination course equivalence | Row is saved with required fields | Planned (Phase 4B UI ready; E2E pending execution) |
| E2E-LA-003 | Learning Agreement validation | Empty agreement cannot be submitted | Student | E2E | Student submits agreement with zero rows | Submission is blocked with clear message | Planned |
| E2E-LA-004 | Learning Agreement validation | Incomplete rows block submission | Student | E2E | Student submits row missing required data | Submission is blocked and row issue is visible | Planned |
| E2E-LA-005 | Learning Agreement submit | Student can submit valid agreement | Student | E2E | Student submits valid course table | Agreement moves to review state and appears to coordinator | Planned |
| E2E-LA-006 | Row review | Coordinator can approve row | Coordinator | E2E (API-assisted acceptance) | Coordinator approves an in-review Learning Agreement row (`e2e/institutional/workflows.spec.ts`) | Row becomes approved and visible to student | Implemented - passing E2E (API-assisted acceptance) |
| E2E-LA-007 | Row review | Coordinator can deny row with rationale | Coordinator | E2E | Coordinator denies row with rationale | Row becomes denied and rationale is visible to student | Planned |
| E2E-LA-008 | Row review | Deny requires rationale | Coordinator | E2E | Coordinator denies row without rationale | Action is blocked | Planned (Phase 4C UI ready; E2E pending execution) |
| E2E-LA-009 | Partial approval | Mixed decisions produce partial approval | Student / Coordinator | E2E | Some rows approved and some denied | Agreement displays partial approval state | Planned |
| E2E-LA-010 | Denied-row resubmission | Denied rows must be revised before resubmission | Student | E2E (API-assisted acceptance) | Student attempts resubmit before revising requested-changes row (`e2e/institutional/workflows.spec.ts`) | Resubmission is blocked with clear message until row is updated | Implemented - passing E2E (API-assisted acceptance) |
| E2E-LA-011 | Denied-row revision | Student can revise denied row and resubmit | Student | E2E (API-assisted acceptance) | Coordinator requests changes; student revises denied row and resubmits from My Learning Agreement (`e2e/institutional/workflows.spec.ts`) | Resubmission is blocked until denied row is revised, then agreement returns to review | Implemented - passing E2E (API-assisted acceptance) |
| E2E-LA-012 | Approved-row safe edit | Approved row edit creates new reviewable revision | Student | E2E | Student edits previously approved row | Original approved row remains historical; new row revision enters review | Planned |
| E2E-LA-013 | Academic Summary | Approved latest rows appear in summary | Student | E2E | Student opens Academic Summary | Summary shows latest approved rows only | Planned (Phase 4D UI ready; E2E pending execution) |
| E2E-LA-014 | Grade ownership | Student cannot edit grade | Student | E2E | Student attempts grade entry/edit | Grade is hidden or read-only for student | Planned |
| E2E-LA-015 | Grade coordinator control | Coordinator can enter/update grade where allowed | Coordinator | E2E | Coordinator updates grade in allowed screen | Grade is saved and does not govern approval | Planned |
| SERVICE-LA-001 | Learning Agreement validation | Duplicate equivalences blocked | Student | Service/API | Create duplicate home/destination equivalence (`tests/institutional/learning-agreement.test.ts`) | Backend rejects duplicate or conflict | Implemented - passing |
| SERVICE-LA-002 | Row state rules | Invalid row decision blocked | Coordinator | Service/API | Decide non-latest or already decided row (`tests/institutional/learning-agreement.test.ts`; `tests/institutional/learning-agreement-api.test.ts`) | Backend rejects action | Implemented - passing |
| SERVICE-LA-003 | Aggregate state | State computed from latest rows | Student / Coordinator | Service/API | Multiple row decisions across revisions (`tests/institutional/learning-agreement.test.ts`) | Agreement aggregate state is correct | Implemented - passing |
| SERVICE-LA-004 | Safe revision | Approved row not silently mutated | Student | Service/API | Edit approved row (`tests/institutional/learning-agreement.test.ts`) | Backend creates new revision and keeps old row immutable | Implemented - passing |
| SERVICE-LA-005 | Grade permissions | Student cannot mutate grade | Student | Service/API | Student sends payload with grade value (`tests/institutional/learning-agreement.test.ts`) | Backend rejects or ignores unauthorized grade mutation | Implemented - passing |
| SERVICE-LA-006 | Auditability | Learning Agreement actions audited | Student / Coordinator | Service/API | Create, submit, decide, resubmit, revise row (`tests/institutional/learning-agreement.test.ts`) | Event records are created | Implemented - passing |
| SERVICE-LA-007 | Academic Summary API guard | Summary route is role/ownership scoped | Student / Coordinator / Admin | Service/API | Call `/api/institutional/academic-summary` as unauthorized role or non-owner (`tests/institutional/learning-agreement-api.test.ts`) | API returns controlled forbidden for unauthorized access | Implemented - passing |
| SERVICE-LA-008 | Academic Summary display values | Summary UI uses human-friendly labels and empty grade value | Student | Service/API | Render source for `/student/academic-summary` and assert copy/fallbacks (`tests/institutional/student-learning-agreement-ui.test.ts`) | Page shows “Approved courses”, “Total ECTS”, “No approved courses yet”, and “Not recorded” | Implemented - passing |

---

## 3.6b Institutional notifications

| Test ID | Workflow / Area | Requirement / Rule | Actor | Type | Scenario | Expected result | Status |
|---|---|---|---|---|---|---|---|
| SERVICE-NOTIF-001 | Notification listing | Notification API is owner-scoped | Student / Coordinator | Service/API | List notifications for student context with mixed seeded recipients (`tests/institutional/notifications-api.test.ts`) | Response includes only active user notifications with read state fields | Implemented - service/API tests |
| SERVICE-NOTIF-002 | Mark-read ownership | Only owner can mark notification as read | Student / Coordinator | Service/API | Mark own, foreign, and missing notification IDs (`tests/institutional/notifications-api.test.ts`) | Owner succeeds; foreign/missing IDs return safe forbidden without internals | Implemented - negative-path coverage |
| SERVICE-NOTIF-003 | Read-all ownership and idempotency | Read-all mutates only active user state | Student | Service/API | Execute read-all twice with mixed recipient notifications (`tests/institutional/notifications-api.test.ts`) | First call marks only own unread rows; second call is idempotent; other users remain unread | Implemented - service/API tests |
| SERVICE-NOTIF-004 | Empty notification safety | Notification endpoints remain stable on empty/unread-empty states | Student | Service/API | List/mark-all when no unread notifications exist (`tests/institutional/notifications-api.test.ts`) | API returns stable 200 response with empty or zero-count payload | Implemented - service/API tests |

| E2E-NOTIF-001 | Institutional notifications | Recipient sees own notifications and can mark as read | Student / Coordinator | E2E (API-assisted acceptance) | Coordinator approval triggers student notification; student marks it read and coordinator cannot see student-only notification (`e2e/institutional/workflows.spec.ts`) | Notification visibility remains owner-scoped and read status updates in UI | Implemented - passing E2E (API-assisted acceptance) |

## 3.7 Social profile and discovery

| Test ID | Workflow / Area | Requirement / Rule | Actor | Type | Scenario | Expected result | Status |
|---|---|---|---|---|---|---|---|
| E2E-SOC-DISC-001 | Social profile | Student can create/update social profile | Student | E2E | Student edits social profile | Profile changes persist | Planned |
| E2E-SOC-DISC-002 | Visibility settings | Student can control discoverability | Student | E2E | Student disables discoverability | Student disappears from discovery results | Planned |
| E2E-SOC-DISC-003 | Discovery | Student can find visible eligible students | Student | E2E | Student filters discovery by city/institution/stage | Results update with eligible visible profiles | Planned |
| E2E-SOC-DISC-004 | Contactability | Non-contactable profiles cannot be contacted | Student | E2E | Student tries to request connection with non-contactable profile | Request action is not available or blocked | Planned |
| E2E-SOC-DEF-001 | Social deferred acceptance | Discovery -> connection -> accepted-only messaging contract deferred intentionally | Student | E2E | `test.skip` contract in `e2e/social/workflows.spec.ts` | Contract kept visible; implementation/testing deferred intentionally after institutional closure | Deferred |
| E2E-SOC-DEF-002 | Social deferred acceptance | Recommendation/reporting/moderation visibility lifecycle deferred intentionally | Student / Admin | E2E | `test.skip` contract in `e2e/social/workflows.spec.ts` | Contract kept visible; implementation/testing deferred intentionally after institutional closure | Deferred |
| E2E-SOC-DEF-003 | Social deferred acceptance | Map discovery with filtering and report flow deferred intentionally | Student | E2E | `test.skip` contract in `e2e/social/workflows.spec.ts` | Contract kept visible; implementation/testing deferred intentionally after institutional closure | Deferred |
| SERVICE-SOC-DISC-001 | Discoverability | Hidden profiles excluded server-side | Student | Service/API | Query discovery with hidden and moderation-hidden profiles (`tests/social/discovery.test.ts`) | Hidden and moderation-hidden profiles are not returned | Implemented - passing |
| SERVICE-SOC-DISC-002 | Consent/contactability | Contactability enforced server-side | Student | Service/API | Attempt request when target is not contactable | Backend rejects request | Planned |
| SERVICE-SOC-DISC-003 | Separation | Social discovery does not expose official institutional records | Student | Service/API | Query social discovery (`tests/social/discovery.test.ts`) | Response contains social-safe profile fields only | Implemented - passing |

---

| SERVICE-SOC-PROF-001 | Social profile | Student can read own social profile | Student | Service/API | Read own profile (`tests/social/profile.test.ts`) | Current student profile is returned | Implemented - passing |
| SERVICE-SOC-PROF-002 | Social profile | Student can update allowed fields only | Student | Service/API | Update own profile and attempt forbidden field (`tests/social/profile.test.ts`) | Allowed fields update; internal moderation field stays protected | Implemented - passing |
| SERVICE-SOC-PROF-003 | Social role guards | Coordinator/admin social-student endpoints are forbidden | Coordinator / Admin | Service/API | Call social profile/discovery services with non-student roles (`tests/social/social-api.test.ts`) | Controlled forbidden response/error | Implemented - passing |
| SMOKE-SOC-SEED-001 | Seed idempotency | Social seed reruns safely | Developer | Smoke | Run seed twice (`tests/social/social-api.test.ts`) | Seed reruns without unique constraint errors | Implemented - passing |

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
| SERVICE-CONN-001 | Connection state | Invalid connection transitions blocked | Student | Service/API | Attempt invalid accept/cancel/block transition (`tests/social/connections.test.ts`) | Backend rejects action | Implemented - passing |
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
| UX-001 | UI language | Human-friendly language | Student / Coordinator / Admin | Manual | Review key institutional pages in Phase 3D | UI avoids technical/internal wording | Implemented - passing |
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


| SERVICE-LA-007 | Student Learning Agreement UI routing | Student LA route and navigation wiring | Student | Service/API | Verify `/student/learning-agreement` title, no grade field, and no broken `/student/institutional/learning-agreement` link usage (`tests/institutional/student-learning-agreement-ui.test.ts`) | Student route/navigation and form constraints are present in code | Implemented - passing |

| SERVICE-CONN-002 | Connection request guard | Hidden, self, duplicate and blocked requests are rejected | Student | Service/API | Request self/hidden/moderation-hidden/duplicate/blocked pair (`tests/social/connections.test.ts`) | Backend rejects invalid requests | Implemented - passing |

| Social messaging (Phase 5C) | STUDENT | Service/API | List threads, read history, send only on ACCEPTED connections; block non-participants/non-students/hidden recipients | Covered | tests/social/messaging.test.ts |

| SERVICE-SOC-UX-5D-001 | Social connections UI clarity | Show only other student and sectioned states | Student | Service/API | Static contract checks for sections, connected-only actions, and explicit block confirmation (`tests/social/social-ui-contracts.test.ts`) | Connections UX copy and actions remain clear/scoped | Implemented - passing |
| SERVICE-SOC-UX-5D-002 | Discovery safe actions | Request button appears only when requestable and safe labels shown | Student | Service/API | Verify safe labels, guarded request condition, and no moderation internals in discovery UI source (`tests/social/social-ui-contracts.test.ts`) | Discovery avoids unsafe/misleading actions and internals | Implemented - passing |
| SERVICE-SOC-UX-5D-003 | Messaging empty guard | Empty/whitespace messages cannot be submitted from UI | Student | Service/API | Verify UI-empty guard + disabled send button contract (`tests/social/social-ui-contracts.test.ts`) | Compose flow prevents empty message submits | Implemented - passing |
| SERVICE-SOC-UX-5D-004 | Connections API safe DTO | Expose perspective-safe `otherProfile` and hide pair/internal fields | Student | Service/API | Validate `getMyConnections` output excludes `pairKey/requesterProfileId/receiverProfileId` and includes `otherProfile.displayName` (`tests/social/connections.test.ts`) | Safe transport contract is preserved | Implemented - passing |
| SERVICE-SOC-UX-5D-005 | Messages other-student naming | Conversation list uses only other student name | Student | Service/API | Validate threads include `otherProfile.displayName` and no raw requester/receiver rendering in UI contracts (`tests/social/messaging.test.ts`, `tests/social/social-ui-contracts.test.ts`) | Message list stays perspective-safe and unambiguous | Implemented - passing |

| Social moderation & reporting | Student/Admin | Service/API + E2E-ready | Student reports profile/message; admin dismisses/actions report; hidden profile excluded from discovery/connections | Report created with guards; moderation transition updates status and profile moderation state | Active |

| SW-SOC-5F-1 | Connection lifecycle | Student | Service/API | Cancel pending then re-request same profile | Request can be sent again using same pair row | Passing |
| SW-SOC-5F-2 | Connection lifecycle | Student | Service/API | Reject then re-request same profile | Request can be sent again using same pair row | Passing |
| SW-SOC-5F-3 | Messaging guard | Student | Service/API | Block accepted connection | Messaging is forbidden while blocked | Passing |
| SW-SOC-5F-4 | Connection lifecycle | Student | Service/API | Unblock blocked connection | Pair returns to requestable status (not auto-connected) | Passing |
| SW-SOC-5F-5 | Reporting | Student | Service/API | Duplicate open report for same target | Second report is rejected | Passing |
| SW-SOC-5F-6 | Social navigation | Student | UI contract | Sidebar includes social routes and active-safe checks | Labels present and matching route targets | Passing |
| SW-SOC-5F2-001 | Discovery lifecycle | Cancelled outgoing request should become requestable again | Student | Service/API | Cancel `PENDING` outgoing request and reload discovery (`tests/social/connections.test.ts`) | Target profile resolves to `AVAILABLE_TO_REQUEST` when otherwise requestable | Implemented - passing |
| SW-SOC-5F2-002 | Re-request lifecycle | Student can re-request after cancel/reject | Student | Service/API | Re-send request after CANCELLED/REJECTED state (`tests/social/connections.test.ts`) | Existing pair row is safely reused and set back to `PENDING` | Implemented - passing |
| SW-SOC-5F2-003 | Unblock + contact preference | Unblock respects OPEN_TO_REQUESTS vs CONNECTIONS_ONLY | Student | Service/API | Unblock then list discovery for OPEN/CONNECTIONS_ONLY targets (`tests/social/connections.test.ts`, `tests/social/discovery.test.ts`) | OPEN target becomes requestable; CONNECTIONS_ONLY becomes `UNAVAILABLE` with safe reason | Implemented - passing |
| SW-SOC-5F2-004 | Safe discovery payload | No moderation internals leak in student discovery payload | Student | Service/API | Inspect discovery list payload (`tests/social/discovery.test.ts`) | Payload excludes moderation internals and includes canonical status fields only | Implemented - passing |

| Social map visibility | Student | Service/API + UI contract | `/api/social/map` and `/social/student/map` enforce city-only visibility, moderation filters, role guard, and safe payload | Implemented |
| SW-SOC-5G-REC-001 | City recommendations listing/filtering | Student | Service/API | List visible recommendations filtered by city/category | Hidden/moderation-hidden records are excluded and payload remains student-safe | Implemented - passing (`tests/social/map-visibility.test.ts`) |
| SW-SOC-5G-REC-002 | Recommendation creation + role guards | Student/Coordinator/Admin | Service/API | Student creates recommendation; coordinator/admin creation forbidden | Student creation succeeds, non-student blocked | Implemented - passing (`tests/social/map-visibility.test.ts`) |
| SW-SOC-5G-REC-003 | Recommendation map transport | Student | Service/API | Recommendation map endpoint returns place-level cards only | No student profile/live location fields exposed | Implemented - passing (`tests/social/map-visibility.test.ts`) |
| SW-SOC-5G-REC-004 | Recommendation reporting | Student | Service/API | Report recommendation by id | Moderation report row is created with recommendation target | Implemented - passing (`tests/social/map-visibility.test.ts`) |
| SW-SOC-5G1-001 | Recommendation map provider rendering | Student | UI contract | `/social/student/map` contains Leaflet/OpenStreetMap provider copy and recommendation marker contract references (`tests/social/social-ui-contracts.test.ts`) | Map page keeps recommendation-only map UX and safety copy visible | Implemented - passing |
| SW-SOC-5G1-002 | Recommendation map data safety + filters | Student | Service/API | Map items include coordinates + `recommendationId`, exclude personal/live/profile fields, exclude hidden/moderated records, and apply city/category filters (`tests/social/map-visibility.test.ts`) | Safe recommendation map payload with backend filtering rules | Implemented - passing |
| SW-SOC-5G2-001 | Student recommendation creation validation | Student | Service/API | Student creates recommendation with required fields and valid coordinates (`tests/social/map-visibility.test.ts`) | Recommendation is created and persisted with visible/active defaults | Implemented - passing |
| SW-SOC-5G2-002 | Non-student create guard | Coordinator/Admin | Service/API | Coordinator/admin try POST create recommendation (`tests/social/map-visibility.test.ts`) | Backend returns forbidden and prevents creation | Implemented - passing |
| SW-SOC-5G2-003 | Coordinate and empty-field rejection | Student | Service/API | Submit invalid lat/lng and empty title/category/description (`tests/social/map-visibility.test.ts`) | Backend returns controlled validation errors | Implemented - passing |
| SW-SOC-5G2-004 | List/map consistency for new records | Student | Service/API | Create recommendation then query list/map with matching filters (`tests/social/map-visibility.test.ts`) | New record appears in both list and map APIs | Implemented - passing |
| SW-SOC-5G2-005 | Map create affordance contract | Student | UI contract | Map page includes create section, map-click guidance, and safety copy (`tests/social/social-ui-contracts.test.ts`) | UI exposes map placement recommendation creation safely | Implemented - passing |

| WF-INS-SUB-ATTACH | Official document attachment metadata lifecycle | Student/Coordinator/Admin | Vitest | Add/list/replace/remove attachments with role and state guards | Metadata persists; unauthorized and locked-state operations blocked | Implemented |

| WF | Requirement / Rule | Actor | Test Type | Scenario | Expected Result | Status |
|---|---|---|---|---|---|---|
| Institutional submissions | submit/resubmit requires >=1 ACTIVE attachment | Student | Service/API (Vitest) | Submit draft without active attachment | Transition blocked with validation error | Updated in phase 6B hotfix |
| Institutional submissions | resubmit state semantics | Student | Service/API (Vitest) | Resubmit REJECTED/REOPENED/NEEDS_CORRECTION with active attachment | State becomes RESUBMITTED | Updated in phase 6B hotfix |
| Institutional submissions | reviewer notes integrity on student resubmit | Student/Coordinator | Service/API (Vitest) | Student provides rationale on resubmit after reviewer notes exist | Reviewer notes remain unchanged | Updated in phase 6B hotfix |
| Requested documents configuration | coordinator/admin can configure requested docs | Coordinator/Admin | UI/API | Create requested document definition in coordinator page | Definition persists and appears in list; students can select active definitions when creating drafts | Implemented phase 6B hotfix |
| SERVICE-SUB-005 | Document upload | Upload uses real multipart/form-data and persists file metadata | Student | Service/API | POST multipart file to submission attachment endpoint (`tests/institutional/attachments-api.test.ts`) | Attachment stores uploaded file name, MIME type, byte size, ACTIVE status and linked submission | Implemented - passing |
| SERVICE-SUB-006 | Document upload replacement | Replace marks previous ACTIVE attachment as REPLACED and creates new ACTIVE version | Student | Service/API | POST multipart file to replace endpoint (`tests/institutional/attachments-api.test.ts`) | Old attachment becomes REPLACED; new version is ACTIVE with incremented version | Implemented - passing |

| WF-INS-SUB-REVIEW-ACTIONS | Coordinator submission review actions | Coordinator | UI + API | From review queue: start review on SUBMITTED/RESUBMITTED; approve/request correction/reject on IN_REVIEW with required rationale where applicable | Valid transitions succeed via transition API; missing rationale actions are blocked with validation error | Implemented - passing (`tests/institutional/submissions.test.ts`) |
| WF-INS-SUB-ATTACH-OPEN | Secure openable uploaded documents | Student/Coordinator/Admin | Service/API (Vitest) | Open uploaded attachment by owner or assigned coordinator; reject unrelated users; preserve file metadata and bytes | Authorized users can open inline; unauthorized blocked; storage internals not exposed in open flow | Implemented (`tests/institutional/attachments-open.test.ts`) |
| WF-INS-SUB-REVIEW-UX-6C-001 | Coordinator review queue filtering | Coordinator | UI contract | Review queue supports status filters, approved toggle (off by default), and text search (`tests/institutional/coordinator-review-queue-ui-contracts.test.ts`) | Coordinator can reduce queue noise and focus on actionable items | Implemented - passing |
| WF-INS-SUB-REVIEW-UX-6C-002 | Attachment row action safety | Coordinator | UI contract | Attachment row only shows Open document for stored files and Demo metadata for seed-only files (`tests/institutional/coordinator-review-queue-ui-contracts.test.ts`) | Open action appears only when backend-backed file exists | Implemented - passing |
| WF-INS-SUB-UX-6D-001 | Student submissions filtering and search clarity | Students can filter by lifecycle state and search by procedure/reviewer note/attachment filename | Student | UI contract | Validate status filters, approved toggle, and search contract in student submissions client (`tests/institutional/student-submissions-ux.test.ts`) | Student can reduce clutter and find relevant submissions quickly | Implemented - passing |
| WF-INS-SUB-UX-6D-002 | Student action visibility by state | Upload/replace/remove and submit/resubmit actions appear only in editable/allowed states | Student | UI contract | Verify editable-state and resubmission affordance contracts (`tests/institutional/student-submissions-ux.test.ts`) | Locked/in-review/approved items do not show misleading actions | Implemented - passing |
| WF-INS-SUB-UX-6D-003 | Attachment open affordance safety | Open action appears only for stored files and demo-only records are clearly labeled without storage path leaks | Student | UI contract | Check Open document/Demo metadata copy and absence of storageKey/path leaks (`tests/institutional/student-submissions-ux.test.ts`) | Secure document opening stays clear and storage internals stay hidden | Implemented - passing |

| PH6C-1 | Student deadline calendar filters/scoping | Student | Vitest | Student only sees own deadlines with calendar filters | Scoped and filterable deadlines returned | Pass |
| PH6C-2 | Coordinator deadline risk visibility/scoping | Coordinator | Vitest | Coordinator sees assigned records with overdue-first view | Scoped coordinator deadlines and risk markers shown | Pass |
| PH6C-3 | Deadline export ICS safety | Student/Coordinator | Vitest | Export endpoint returns ICS without internal fields | text/calendar and safe payload only | Pass |
| PH6C-4 | Reminder rules + idempotency | Student | Vitest | Upcoming/overdue reminders generated once per rule/deadline/user | Notifications created and no duplicates on rerun | Pass |
| PH6D-1 | Admin procedure configuration listing | Admin | Service/API | Admin lists institutional procedure definitions (`tests/institutional/admin-procedures-api.test.ts`) | Full configuration list is returned including active/inactive definitions | Implemented - passing |
| PH6D-2 | Admin create/update procedure rules | Admin | Service/API | Admin creates and updates title/description/order/required/active/mime/max-size (`tests/institutional/admin-procedures-api.test.ts`) | Procedure definition persists with validated rule updates | Implemented - passing |
| PH6D-3 | Role mutation guard on institutional configuration | Coordinator/Student | Service/API | Coordinator/student attempt procedure mutation (`tests/institutional/admin-procedures-api.test.ts`) | Backend returns 403 and blocks mutation | Implemented - passing |
| PH6D-4 | File-rule validation safety | Admin | Service/API | Invalid MIME or max-size is submitted (`tests/institutional/admin-procedures-api.test.ts`) | Backend returns controlled 400 validation errors | Implemented - passing |
| PH6D-5 | Active-only visibility for non-admin procedure lists | Student | Service/API | Admin deactivates procedure, student re-lists (`tests/institutional/admin-procedures-api.test.ts`) | Deactivated procedures are excluded for student/coordinator active-only lists | Implemented - passing |
| PH6D-6 | Admin configuration UI contract clarity | Admin | UI contract | Procedure config page contains state badges/file rules/action controls (`tests/institutional/admin-procedures-ui-contracts.test.ts`) | Admin sees active/required state and can access create/deactivate controls | Implemented - passing |

| PH6C-5 | Effective due date + reminder classification rules | Student/Coordinator | Service/API | Override, overdue, due-soon-window, fulfilled exclusion classification (`tests/institutional/deadlines-phase6c.test.ts`) | Deterministic reminder categories and effective due date behavior | Implemented - passing |
| PH6C-6 | Deadline UI filter and clarity contract | Student/Coordinator | UI contract | Due-soon/overridden filters, original+effective date copy, empty state, export affordance (`tests/institutional/deadlines-ui-contracts.test.ts`) | Calendar pages keep clear reminder labels and scoped actions | Implemented - passing |

## 3.12 Phase 6D — Admin institutional process configuration

| Test ID | Workflow / Area | Requirement / Rule | Actor | Type | Scenario | Expected result | Status |
|---|---|---|---|---|---|---|---|
| SERVICE-ADM-PROC-001 | Admin procedure config | Admin can list/create/update/deactivate procedure definitions | Admin | Service/API | Manage procedure definitions via institutional procedures API (`tests/institutional/admin-procedures-api.test.ts`) | Procedure definitions persist with active/inactive and file-rule updates | Implemented - passing |
| SERVICE-ADM-PROC-002 | Admin procedure config guards | Coordinator/student cannot mutate admin configuration | Coordinator / Student | Service/API | Attempt POST/PATCH to procedure config APIs with non-admin roles (`tests/institutional/admin-procedures-api.test.ts`) | API returns forbidden for non-admin mutation attempts | Implemented - passing |
| SERVICE-ADM-PROC-003 | Active configuration usage | Inactive procedures are not available for new submission drafts | Student | Service/API | Deactivate procedure then create draft (`tests/institutional/submissions.test.ts`) | Backend blocks new draft creation for inactive procedures | Implemented - passing |
| SERVICE-ADM-PROC-004 | Attachment validation by active config | Updated MIME rules affect future uploads | Student / Admin | Service/API | Admin updates procedure accepted MIME list then student uploads disallowed type (`tests/institutional/attachments-api.test.ts`) | Upload is rejected using updated procedure constraints | Implemented - passing |
| SMOKE-ADM-PROC-001 | Seed idempotency | Seed remains idempotent after Phase 6D updates | Developer | Smoke | Run `npm run db:seed` twice | Both seed runs complete without uniqueness/consistency failures | Implemented - passing |

## 3.12 Coordinator operational review workspace (Phase 6E)

| Test ID | Workflow / Area | Requirement / Rule | Actor | Type | Scenario | Expected result | Status |
|---|---|---|---|---|---|---|---|
| SERVICE-COORD-OPS-001 | Coordinator dashboard scoping | Coordinator sees only assigned mobility records | Coordinator | Service/API | Build dashboard summary for coordinator (`tests/institutional/dashboard-read-models.test.ts`) | Returned counts/workload/recent items are scoped to assigned records only | Implemented - passing |
| SERVICE-COORD-OPS-002 | Coordinator summary metrics | Operational counters are deterministic from seeded records | Coordinator | Service/API | Validate pending/in-review/rejected/overdue/exception counts (`tests/institutional/dashboard-read-models.test.ts`) | Summary cards are backed by correct server-side counts | Implemented - passing |
| SERVICE-COORD-OPS-003 | Risk classification | HIGH/MEDIUM/LOW risk uses deterministic backend rules | Coordinator | Service/API | Seed high/medium/low assigned records and validate risk labels (`tests/institutional/dashboard-read-models.test.ts`) | Risk labels match urgent vs waiting vs stable workload conditions | Implemented - passing |
| SERVICE-COORD-OPS-004 | Empty workload | Empty coordinator assignment returns safe empty state data | Coordinator | Service/API | Coordinator without assignments requests summary (`tests/institutional/dashboard-read-models.test.ts`) | No rows are leaked; empty workload and queue are returned | Implemented - passing |
| UI-COORD-OPS-001 | Coordinator dashboard UX contract | Dashboard includes summary cards, workload section, and risk labels | Coordinator | UI Contract | Source contract check for `/coordinator/dashboard` (`tests/institutional/coordinator-dashboard-ui-contracts.test.ts`) | Page includes expected operational cards, workload overview, risk badges, and empty-state copy | Implemented - passing |

| WF-ACT-6F | Institutional/Social activity feed scoping and sanitization | Student/Coordinator/Admin | API/Service | Role-scoped feed returns newest-first normalized items and hides sensitive fields | Feed limited, sorted, and sanitized by role | Implemented |

## 3.13 Phase 7A — Frontend design system foundation

| Test ID | Workflow / Area | Requirement / Rule | Actor | Type | Scenario | Expected result | Status |
|---|---|---|---|---|---|---|---|
| UI-DS-7A-001 | Reusable UI foundation | Introduce typed reusable UI/layout primitives without domain changes | Developer | UI Contract | Validate presence of Phase 7A foundation docs and exported `PageShell`/`PageHeader`/`SectionHeader` (`tests/ui/phase7a-design-system-foundation.test.ts`) | Foundation modules are present and documented for phased adoption | Implemented - passing |
| UI-DS-7A-002 | Representative page adoption | Apply new foundation lightly to representative institutional pages | Student/Coordinator/Admin | UI Contract | Validate student/coordinator/admin dashboard pages use new `PageShell` composition (`tests/ui/phase7a-design-system-foundation.test.ts`) | Limited migration proves reusable foundation integration while preserving existing workflows | Implemented - passing |

## 3.14 Phase 7B — Institutional UI polish

| Test ID | Workflow / Area | Requirement / Rule | Actor | Type | Scenario | Expected result | Status |
|---|---|---|---|---|---|---|---|
| UI-DS-7B-001 | Institutional notifications UX | Notification pages must use shared `PageShell`/`PageHeader` layout after Phase 7B polish | Student/Coordinator/Admin | UI Contract | Validate student, coordinator, and admin notification pages import and use `PageShell` and `PageHeader` (`tests/institutional/phase7b-institutional-ui-contracts.test.ts`) | All three notification pages include `PageShell` and `PageHeader` composition without breaking role-specific headings | Implemented - passing |
| UI-DS-7B-002 | Institutional route link integrity | Key student and coordinator route links must remain present after UI polish | Student/Coordinator | UI Contract | Check that dashboard, submission, and deadline pages retain expected navigation hrefs (`tests/institutional/phase7b-institutional-ui-contracts.test.ts`) | Links to `/student/learning-agreement`, `/student/dashboard`, and deadline export endpoint are present | Implemented - passing |
| UI-DS-7B-003 | Document/attachment affordances | Submission UI must expose safe open/replace/remove actions without revealing internal storage paths | Student | UI Contract | Validate `student-submissions-client.tsx` contains action labels and omits `/uploads/` path exposure (`tests/institutional/phase7b-institutional-ui-contracts.test.ts`) | Open document, Replace, and Remove affordances are present; no raw upload path is leaked to the UI | Implemented - passing |
| UI-DS-7B-004 | Coordinator/admin scanning labels | Coordinator review queue and admin procedures pages must retain status and scanning labels | Coordinator/Admin | UI Contract | Check coordinator queue contains role label and admin procedures page contains configuration and status labels (`tests/institutional/phase7b-institutional-ui-contracts.test.ts`) | "Coordinator tasks", "Procedure configuration", "Active", and "Required" labels are present after UI polish | Implemented - passing |

| WF-SOC-UI-7C | Social UI overhaul contracts | Student/Admin | UI contract (Vitest) | Social dashboard/profile/discovery/connections/messages/recommendations/map/moderation labels, actions, and safe-data visibility verified | Pass |

## 3.15 Phase 7D — Responsive, accessibility, and demo polish

| Test ID | Workflow / Area | Requirement / Rule | Actor | Type | Scenario | Expected result | Status |
|---|---|---|---|---|---|---|---|
| UI-7D-001 | Shared navigation polish | Institutional and social navigation labels remain consistent and separated | Student | UI Contract | Validate student institutional/social layout labels and route cues (`tests/shared/phase7d-responsive-accessibility-polish.test.ts`) | "Submissions", "Deadlines", "Exceptions", and "Social discovery" labels remain visible with area separation intact | Implemented - passing |
| UI-7D-002 | Social form/filter accessibility | Key message/recommendation/discovery controls expose clear labels | Student | UI Contract | Check key `aria-label` and filter label strings in social pages (`tests/shared/phase7d-responsive-accessibility-polish.test.ts`) | Important controls are label-addressable for accessibility and demo clarity | Implemented - passing |
| UI-7D-003 | Empty state clarity | Core social empty states and shared state wording are explicit | Student | UI Contract | Validate social message/recommendation empty copy and shared empty-state title (`tests/shared/phase7d-responsive-accessibility-polish.test.ts`) | Clear no-data messaging exists for demo flows | Implemented - passing |
| UI-7D-004 | Sensitive internals hiding | Student-facing social UI does not expose local storage paths or moderation internals | Student | UI Contract | Assert absence of `/uploads/`, `moderationState`, and `storagePath` leak strings (`tests/shared/phase7d-responsive-accessibility-polish.test.ts`) | Student UI contract stays safe and avoids backend internals exposure | Implemented - passing |

## 3.16 Phase 8A.1 — Global navigation, role context & demo coherence hotfix

| Test ID | Workflow / Area | Requirement / Rule | Actor | Type | Scenario | Expected result | Status |
|---|---|---|---|---|---|---|---|
| UI-NAV-8A1-001 | Global launcher | Root route must expose direct entry points for student institutional, student social, coordinator, and admin areas | Student/Coordinator/Admin | UI Contract | Check `/` source contains links to `/student/dashboard`, `/social/student/dashboard`, `/coordinator/dashboard`, and `/admin/dashboard` (`tests/shared/navigation-role-coherence.test.ts`) | Launcher keeps all four role-area entry links visible and deterministic | Implemented - passing |
| UI-NAV-8A1-002 | Student institutional/social bridge | Student institutional UI must provide direct bridge to social support and social UI must provide bridge back to official mobility | Student | UI Contract | Validate student institutional/social layout labels and cross-area hrefs (`tests/shared/navigation-role-coherence.test.ts`) | Students can move between official mobility and social support without dead ends | Implemented - passing |
| UI-NAV-8A1-003 | Global return affordance | Main role areas need a consistent way back to ErasmusMate home | Student/Coordinator/Admin | UI Contract | Validate shared `TopBar` includes “Back to ErasmusMate home” and all role layouts render `TopBar` (`tests/shared/navigation-role-coherence.test.ts`) | All main role areas expose a discoverable return path to `/` | Implemented - passing |
| UI-NAV-8A1-004 | Role/area clarity | Area labels must be human-readable with explicit role context | Student/Coordinator/Admin | UI Contract | Validate role-area labels in student institutional, student social, coordinator, and admin layouts (`tests/shared/navigation-role-coherence.test.ts`) | Labels clearly state “Student institutional area”, “Student social support”, “Coordinator workspace”, and “Admin console” | Implemented - passing |
| UI-NAV-8A1-005 | Obsolete demo copy cleanup | Key launcher/dashboard pages should not claim functional areas are deferred when now implemented | Student/Admin | UI Contract | Assert absence of obsolete “later phase / not implemented” copy on home + key dashboards (`tests/shared/navigation-role-coherence.test.ts`) | Demo copy reflects current functional state without misleading phase-deferral text | Implemented - passing |

| Phase | Workflow | Requirement / Rule | Actor | Test Type | Scenario | Expected Result | Status |
|---|---|---|---|---|---|---|---|
| 8A.2 | Social moderation queue | Admin can review profile/message/recommendation reports clearly | Admin | Vitest service contract | `listSocialReports` returns all three target types with user-safe labels | Moderation queue exposes clear target type and reviewer-safe metadata | Covered |
| 8A.2 | Recommendation moderation | Actioned recommendation reports hide unsafe recommendations | Admin/Student | Vitest service contract | Admin actions recommendation report with `HIDE_RECOMMENDATION` | Recommendation is hidden from recommendations list + map APIs | Covered |
| 8A.2 | Moderation access control | Non-admin roles must not access admin moderation endpoints/services | Coordinator/Student | Vitest service contract | Coordinator and student call moderation list service | Forbidden errors returned; no moderation data exposed | Covered |
| 8A.2 | Moderation UI clarity | Admin moderation UI must expose explicit report/action/status labels | Admin | Vitest UI contract | Validate moderation page source labels (Profile/Message/Recommendation, Pending/Actioned/Dismissed, Decision rationale) | Demo-ready moderation labels present and consistent | Covered |

## 3.17 Phase 8A.3 — Social connection lifecycle hotfix

| Test ID | Workflow / Area | Requirement / Rule | Actor | Type | Scenario | Expected result | Status |
|---|---|---|---|---|---|---|---|
| SOC-CONN-8A3-001 | Send request rules | Request allowed only for requestable visible/active target; duplicate pending/accepted blocked | Student | Service/API | `requestConnection` happy path + duplicate checks (`tests/social/connections.test.ts`) | Request succeeds once; duplicate pending/accepted requests rejected | Implemented - passing |
| SOC-CONN-8A3-002 | Cancel + re-request | Requester can cancel pending and re-request using same pair row | Student | Service/API | Cancel then request again (`tests/social/connections.test.ts`) | Pair returns to pending and remains reusable | Implemented - passing |
| SOC-CONN-8A3-003 | Reject + re-request | Receiver can reject pending; requester can re-request safely | Student | Service/API | Re-request after rejected seed pair (`tests/social/connections.test.ts`) | Pair row reused and returns to pending | Implemented - passing |
| SOC-CONN-8A3-004 | Block/unblock + requestability | Block prevents messaging/requests; unblock restores safe non-connected state | Student | Service/API | Block accepted pair, verify message forbidden; unblock then request again (`tests/social/connections.test.ts`) | Messaging blocked while blocked; new request possible after unblock | Implemented - passing |
| SOC-CONN-8A3-005 | Discovery status consistency | Discovery returns safe status and action affordances after lifecycle transitions | Student | Service/API | Status checks after cancel/block/unblock (`tests/social/connections.test.ts`, `tests/social/discovery.test.ts`) | Discovery reflects available/pending/connected/blocked/unavailable correctly | Implemented - passing |
| SOC-CONN-8A3-006 | Connections blocked actions | Blocked connections show unblock action for blocker | Student | Service/API | Fetch my connections with blocked pair (`tests/social/connections.test.ts`) | Blocked row exists with unblock action enabled for blocker | Implemented - passing |
| SOC-CONN-8A3-007 | Accepted-only messaging + protections | Non-accepted, hidden, moderation-hidden targets cannot receive messages | Student | Service/API | Messaging tests across states/visibility (`tests/social/messaging.test.ts`) | Only accepted + visible + active pairs can message | Implemented - passing |
| SOC-CONN-8A3-008 | Role guards | Coordinator/admin forbidden from student social transitions/messaging | Coordinator/Admin | Service/API | Connection transition/request and messaging role checks (`tests/social/connections.test.ts`, `tests/social/messaging.test.ts`) | Forbidden errors; no privileged bypass | Implemented - passing |
| SOC-CONN-8A3-009 | UI lifecycle labels | Discovery/connections/messages expose safe user-facing lifecycle labels and actions | Student | UI Contract | Source checks for labels/actions (`tests/social/social-ui-contracts.test.ts`) | Required labels and action affordances visible without internal terms | Implemented - passing |
| SOC-CONN-8A3-010 | Seed reliability | Seed remains idempotent with connection lifecycle logic | Developer | Smoke/Service | Run seed twice + idempotency test (`tests/social/messaging.test.ts`) | No unique errors; deterministic setup preserved | Implemented - passing |

## 3.12 Phase 8A.4 coverage audit mapping

| Audit ID | Workflow / Area | Actor | Type | Evidence | Current status |
|---|---|---|---|---|---|
| AUDIT-8A4-001 | Institutional workflows coverage audit | Student / Coordinator / Admin | Manual + Service/API evidence | `artifacts/phase-8a-coverage-audit.md`, `tests/institutional/*.test.ts`, `app/api/institutional/*` | Implemented - passing |
| AUDIT-8A4-002 | Social workflows coverage audit | Student / Admin | Manual + Service/API evidence | `artifacts/phase-8a-coverage-audit.md`, `tests/social/*.test.ts`, `app/api/social/*`, `app/api/admin/social/*` | Implemented - passing |
| AUDIT-8A4-003 | Role/permission guard coverage audit | Student / Coordinator / Admin | Manual + Service/API evidence | `artifacts/phase-8a-coverage-audit.md`, `tests/social/social-api.test.ts`, `tests/institutional/*.test.ts` | Implemented - passing |
| AUDIT-8A4-004 | UI route/contract coverage audit | Student / Coordinator / Admin | Manual + UI contract evidence | `artifacts/phase-8a-coverage-audit.md`, `tests/shared/*.test.ts`, `tests/institutional/*ui*.test.ts`, `tests/social/social-ui-contracts.test.ts` | Implemented - passing |
| AUDIT-8A4-005 | Audit artifact traceability | Developer | Smoke/Meta | `artifacts/phase-8a-coverage-audit.md`, `tests/smoke/phase8a4-audit-artifacts.test.ts` | Implemented - passing |

| UI-TOPBAR-001 | Global topbar utilities | Notification affordance must be discoverable from area shell | Student / Coordinator / Admin | Service/API | Contract-check topbar notification entry and accessibility labels (`tests/shared/topbar-contract.test.ts`; `tests/shared/navigation-role-coherence.test.ts`) | Topbar includes a notification bell/button with stable label and discoverable entry point | Partial - full lifecycle deferred to 9C |
| UI-TOPBAR-002 | Global topbar utilities | Profile affordance must be discoverable from area shell | Student / Coordinator / Admin | Service/API | Contract-check topbar profile entry and accessibility labels (`tests/shared/topbar-contract.test.ts`; `tests/shared/navigation-role-coherence.test.ts`) | Topbar includes a profile/avatar entry point with stable label | Implemented - UI contract tests |
| UI-NAV-AREA-003 | Cross-area navigation consistency | Institutional/social area switch labels must stay consistent | Student | Service/API | Contract-check institutional/social layout labels for area switching (`tests/shared/navigation-role-coherence.test.ts`) | Area-switch wording remains consistent and discoverable | Implemented - UI contract tests |
| UI-COPY-005 | Route-copy hygiene | Route-shaped labels must not be exposed in dashboard card copy | Student | Service/API | Contract-check dashboard copy excludes route-shaped CTA labels (`tests/institutional/student-dashboard-copy.test.ts`) | Copy remains product-facing and avoids internal route strings | Implemented - copy hygiene contract |

## 3.18 Phase 8C.3 — Social interaction UX and action-state fixes

| Test ID | Workflow / Area | Requirement / Rule | Actor | Type | Scenario | Expected result | Status |
|---|---|---|---|---|---|---|---|
| SOC-UX-8C3-001 | Discovery request availability | Privacy-restricted profiles must explain unavailable request state with safe wording | Student | UI Contract | Validate discovery source includes unavailable helper copy and unavailable/request labels (`tests/social/social-ui-contracts.test.ts`) | Users see clear reason when request cannot be sent | Implemented - UI contract tests |
| SOC-UX-8C3-002 | Connection request action | Eligible flow remains requestable with duplicate and availability protections enforced | Student | Service/API | Validate duplicate and availability protections in request flow (`tests/social/connections.test.ts`) | Request flow preserves safe guardrails and deterministic outcomes | Implemented - service/API tests |
| SOC-UX-8C3-003 | Block/unblock state updates | Block/unblock transitions must be reflected in connection status lists and messaging guard behavior | Student | Service/API | Validate block forbids messaging and unblock returns non-connected state (`tests/social/connections.test.ts`) | State transitions remain correct and messaging protections enforced | Implemented - service/API tests |
| SOC-UX-8C3-004 | Action-state UI feedback | Social action pages should provide deterministic post-action feedback for request/block transitions | Student | UI Contract | Validate discovery/connections pages contain action-state feedback labels (`tests/social/social-ui-contracts.test.ts`) | Users receive visible result cues after actions | Implemented - UI contract tests |
| SOC-UX-8C3-005 | Advanced social UX polish backlog | Deeper visual/action micro-interactions are deferred | Student | UX backlog | Track rich interaction polish after 8C.3 fixes | Minor UX polish intentionally deferred | Partial - advanced UX deferred to 9C |


| WF-INS-DEADLINE-CALENDAR | Deadline calendar visualization | Student sees a read-only monthly deadline calendar with marked days | Student | UI contract | Open student deadlines and verify calendar section, marked dates, and upcoming list | Calendar and upcoming list are visible with read-only filtering affordance | Implemented - read-only calendar view |
| WF-INS-DEADLINE-DEMO-DATA | Deadline demo-data visibility | Seeded data includes overdue, due soon, upcoming, fulfilled/extended examples | Student / Coordinator | Service/API + UI | Seed and inspect deadline read models and deadlines page sections | Multiple deadline states visible in seeded demo | Implemented - seeded demo data |
| WF-SEED-DEMO-READY | Seed demo-readiness | Seed is deterministic and idempotent after expansion | All roles | Smoke | Run seed twice and re-run tests | Seed remains idempotent and stable for tests | Implemented - seeded demo data |
| WF-INS-DEADLINE-UI-CONTRACT | Deadline UI contract | Deadline page keeps human-facing copy and avoids raw internal IDs in primary text | Student | UI contract tests | Validate deadlines page contract text assertions | Contract passes including no raw seeded internal ID copy | Implemented - UI contract tests |
