# ErasmusMate — DECISIONS.md

## Purpose

This ledger records meaningful architectural, workflow, testing, and UX decisions for Iteration 3.

---

## 1. Decision record format

### DEC-XXX — Decision title

- **Date:** YYYY-MM-DD
- **Phase:** Pre-implementation planning / Implementation phase name
- **Decision:**
- **Rationale:**
- **Alternatives considered:**
- **Consequences / trade-offs:**
- **Affected areas:**
- **Status:** Accepted / Superseded / Rejected
- **Evidence level:** Planned / Accepted from planning baseline / Confirmed by implementation / Revised by implementation

---

## 2. Initial accepted planning decisions

### DEC-001 — Single Next.js full-stack repository architecture
- **Date:** 2026-05-04
- **Phase:** Pre-implementation planning
- **Decision:** ErasmusMate will be built as a single Next.js repository containing frontend pages and backend route handlers/services.
- **Rationale:** Keeps institutional and social workflows in one coherent deployable MVP and improves traceability and demo reliability.
- **Alternatives considered:** Separate frontend/backend repositories.
- **Consequences / trade-offs:** Simpler local operation; requires disciplined module boundaries.
- **Affected areas:** app structure, API boundaries, developer workflow.
- **Status:** Accepted
- **Evidence level:** Planned / Accepted from planning baseline

### DEC-002 — Institutional core primary, social layer secondary and separated
- **Date:** 2026-05-04
- **Phase:** Pre-implementation planning
- **Decision:** Institutional workflows remain primary and must stay clearly separated from social-support workflows.
- **Rationale:** Matches functional scope and governance constraints.
- **Alternatives considered:** Unified mixed navigation and workflow model.
- **Consequences / trade-offs:** Clearer role understanding; requires deliberate IA and routing separation.
- **Affected areas:** navigation, route groups, module boundaries, UX copy.
- **Status:** Accepted
- **Evidence level:** Planned / Accepted from planning baseline

### DEC-003 — Complexity-based layered architecture rule
- **Date:** 2026-05-04
- **Phase:** Pre-implementation planning
- **Decision:** Use full layered structure (domain/service/repository/policy/validator/mapper) for complex workflows; allow lighter structure for small modules.
- **Rationale:** Balances maintainability with speed and avoids overengineering.
- **Alternatives considered:** Full strict layering everywhere; minimal ad-hoc structure everywhere.
- **Consequences / trade-offs:** Better fit per module complexity; requires judgment and consistency review.
- **Affected areas:** module implementation style, code review criteria.
- **Status:** Accepted
- **Evidence level:** Planned / Accepted from planning baseline

### DEC-004 — Test-first / acceptance-first workflow
- **Date:** 2026-05-04
- **Phase:** Pre-implementation planning
- **Decision:** Major workflow implementation follows test-first or acceptance-first sequencing.
- **Rationale:** Reduces regressions and keeps implementation aligned with workflow acceptance.
- **Alternatives considered:** Implement-first then test.
- **Consequences / trade-offs:** More upfront planning effort; stronger confidence and traceability.
- **Affected areas:** phase process, PR cadence, test authoring order.
- **Status:** Accepted
- **Evidence level:** Planned / Accepted from planning baseline

### DEC-005 — Playwright + Vitest + smoke strategy
- **Date:** 2026-05-04
- **Phase:** Pre-implementation planning
- **Decision:** Use Playwright for E2E, Vitest for service/API/domain rules, and smoke checks for boot/routes/seed/demo context reliability.
- **Rationale:** Covers user journeys, backend rules, and environment readiness.
- **Alternatives considered:** E2E-only testing; service-only testing.
- **Consequences / trade-offs:** Broader coverage with added maintenance effort.
- **Affected areas:** `e2e/`, `tests/`, CI/local validation commands.
- **Status:** Accepted
- **Evidence level:** Planned / Accepted from planning baseline

### DEC-006 — Prisma + SQLite local demo persistence
- **Date:** 2026-05-04
- **Phase:** Pre-implementation planning
- **Decision:** Use Prisma ORM with SQLite for local development and demo persistence in Iteration 3.
- **Rationale:** Deterministic and low-friction setup appropriate for MVP scope.
- **Alternatives considered:** External managed DB; in-memory/mock persistence.
- **Consequences / trade-offs:** Fast onboarding and reproducibility; not production scale target.
- **Affected areas:** schema, migrations, local setup scripts.
- **Status:** Accepted
- **Evidence level:** Planned / Accepted from planning baseline

### DEC-007 — Deterministic seed strategy
- **Date:** 2026-05-04
- **Phase:** Pre-implementation planning
- **Decision:** Seed data must be deterministic and cover institutional, social, moderation, and map demo scenarios.
- **Rationale:** Required for reliable demos and reproducible tests.
- **Alternatives considered:** Randomized or minimal seed data.
- **Consequences / trade-offs:** More initial seed design effort; stable demos and test consistency.
- **Affected areas:** Prisma seed scripts, smoke tests, E2E fixtures.
- **Status:** Accepted
- **Evidence level:** Planned / Accepted from planning baseline

### DEC-008 — Demo-only identity with server-readable demo context
- **Date:** 2026-05-04
- **Phase:** Pre-implementation planning
- **Decision:** Identity in this iteration is explicitly demo-only and resolved server-side using a server-readable demo cookie or explicit server-readable demo context helper.
- **Rationale:** Honest representation of MVP auth constraints while enabling backend-enforced role flows.
- **Alternatives considered:** Production-like auth now; localStorage-only identity.
- **Consequences / trade-offs:** Clear demo semantics and fewer misleading assumptions.
- **Affected areas:** context resolver, API guards, shell role switcher, UI copy.
- **Status:** Accepted
- **Evidence level:** Planned / Accepted from planning baseline

### DEC-009 — localStorage is UI convenience only
- **Date:** 2026-05-04
- **Phase:** Pre-implementation planning
- **Decision:** localStorage cannot be the authoritative identity mechanism; it may be used only for UI convenience.
- **Rationale:** localStorage is not server-readable and cannot support backend identity enforcement.
- **Alternatives considered:** localStorage-only role context.
- **Consequences / trade-offs:** Requires server-readable mechanism in addition to optional local UI memory.
- **Affected areas:** demo context design, API identity resolution.
- **Status:** Accepted
- **Evidence level:** Planned / Accepted from planning baseline

### DEC-010 — Figma/frontend-concept are visual references only
- **Date:** 2026-05-04
- **Phase:** Pre-implementation planning
- **Decision:** `figma/frontend-concept` is used for visual and UX guidance only; its Vite structure is not copied into implementation.
- **Rationale:** Required by project governance and stack constraints.
- **Alternatives considered:** Direct reuse of frontend-concept project structure.
- **Consequences / trade-offs:** Requires reinterpretation into Next.js; preserves approved stack.
- **Affected areas:** design system, UI implementation planning.
- **Status:** Accepted
- **Evidence level:** Planned / Accepted from planning baseline

### DEC-011 — Human-friendly language and low-click UX are enforced rules
- **Date:** 2026-05-04
- **Phase:** Pre-implementation planning
- **Decision:** UI wording must avoid technical/internal jargon and key actions should be reachable with minimal reasonable clicks.
- **Rationale:** Improves comprehension and demo quality for students, coordinators, and admins.
- **Alternatives considered:** Engineering-centric labels and deeper navigation chains.
- **Consequences / trade-offs:** Additional UX review effort; better usability and presentation quality.
- **Affected areas:** copywriting, dashboard/action layouts, manual UX checks.
- **Status:** Accepted
- **Evidence level:** Planned / Accepted from planning baseline

### DEC-012 — Traceability matrix update rule is mandatory
- **Date:** 2026-05-04
- **Phase:** Pre-implementation planning
- **Decision:** `TRACEABILITY_TEST_MATRIX.md` must be updated whenever tests are planned, added, changed, deferred, or removed.
- **Rationale:** Keeps explicit links between requirements/workflows and verification.
- **Alternatives considered:** Informal or ad-hoc test tracking.
- **Consequences / trade-offs:** Documentation overhead; stronger auditability.
- **Affected areas:** testing workflow, phase completion checks.
- **Status:** Accepted
- **Evidence level:** Planned / Accepted from planning baseline

### DEC-013 — Conventional Commits are required
- **Date:** 2026-05-04
- **Phase:** Pre-implementation planning
- **Decision:** All commits must use Conventional Commit format.
- **Rationale:** Improves history clarity and reviewability.
- **Alternatives considered:** Free-form commit messages.
- **Consequences / trade-offs:** Requires discipline; clearer project history.
- **Affected areas:** git workflow, release/change review.
- **Status:** Accepted
- **Evidence level:** Planned / Accepted from planning baseline

---

## 3. Note for implementation phases

Implementation phases must append new decision entries when new choices are made. If implementation confirms or changes a planning decision, update the corresponding decision entry status/evidence level (for example, from planning baseline to implementation-confirmed or implementation-revised) and record rationale.

---

## 4. Pending future decisions

- Final Prisma schema detail and migration strategy.
- Map provider/package final selection for local demo use.
- Optional production-auth roadmap beyond demo identity.
- Deployment and runtime strategy after MVP completeness.

---

## 5. Working rule

A major phase is not complete unless relevant decisions are documented here with rationale, trade-offs, and evidence level.

### DEC-014 — Phase 1 minimal test harness before app scaffolding
- **Date:** 2026-05-04
- **Phase:** Phase 1 — Testing foundation first
- **Decision:** Introduce only the minimal root-level testing harness (`package.json`, TypeScript test config, Vitest config, Playwright config, and test folders) before creating the Next.js app or Prisma schema.
- **Rationale:** Keeps this phase strictly aligned with “testing foundation first” while preserving test-first execution.
- **Alternatives considered:** Bootstrap Next.js and Prisma first to run non-placeholder tests.
- **Consequences / trade-offs:** Clear scope control and faster contract setup; executable browser tests are deferred until app scaffolding exists.
- **Affected areas:** test toolchain files, `tests/`, `e2e/`.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-015 — Pre-implementation contract policy uses todo/skip
- **Date:** 2026-05-04
- **Phase:** Phase 1 — Testing foundation first
- **Decision:** Use `it.todo` for service/API/domain contracts and `test.skip`/`it.skip` for E2E and route smoke contracts that require missing application routes.
- **Rationale:** Establishes full planned coverage without forcing artificial failures before implementation exists.
- **Alternatives considered:** Force failing tests immediately with “expected failing” status.
- **Consequences / trade-offs:** Coverage intent is explicit and reviewable; pass/fail evidence is intentionally deferred.
- **Affected areas:** `tests/**/*.test.ts`, `e2e/**/*.spec.ts`.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-016 — Phase 1 validation command baseline
- **Date:** 2026-05-04
- **Phase:** Phase 1 — Testing foundation first
- **Decision:** Keep validation command baseline as `npm install`, `npm run test`, and `npm run test:e2e`, documenting environment limitations when registry or browser prerequisites block execution.
- **Rationale:** Matches requested validation while giving a deterministic command set for local continuation.
- **Alternatives considered:** Skip E2E validation command entirely until app exists.
- **Consequences / trade-offs:** Command surface is stable; some environments may require additional setup (`npx playwright install`) later.
- **Affected areas:** developer workflow, README testing commands.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-017 — Phase 2A minimal Next.js foundation before workflow implementation
- **Date:** 2026-05-04
- **Phase:** Phase 2A minimal foundation
- **Decision:** Introduce a minimal Next.js App Router + Tailwind baseline with a single honest landing page, while intentionally deferring workflows, Prisma, and demo identity.
- **Rationale:** Establishes a runnable product shell and visual direction with a small, reviewable diff that respects phased delivery.
- **Alternatives considered:** Waiting to scaffold until workflow phases; scaffolding with additional premature modules.
- **Consequences / trade-offs:** Faster start for subsequent vertical slices; temporary absence of workflow pages and backend persistence is explicit in UI copy.
- **Affected areas:** app foundation, scripts, minimal styling, smoke baseline.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-018 — Phase 2B shared UI primitives for shell-first delivery
- **Date:** 2026-05-04
- **Phase:** Phase 2B — UI primitives and shell placeholders
- **Decision:** Add a lightweight shared primitive set (`Button`, `Card`, `Badge/StatusBadge`, `PageHeader`, `DashboardCard`, state cards, sidebar/top bar) in `src/components` with Tailwind classes and no large UI dependency expansion.
- **Rationale:** Establishes a reusable visual baseline aligned with Figma direction while keeping this phase small and reviewable.
- **Alternatives considered:** Build each placeholder page ad-hoc; import a large component library immediately.
- **Consequences / trade-offs:** Faster consistency across role dashboards; some primitives may be refactored as workflow complexity grows.
- **Affected areas:** `src/components/*`, `src/lib/cn.ts`, route placeholder pages.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-019 — Institutional shell placeholder strategy before workflow logic
- **Date:** 2026-05-04
- **Phase:** Phase 2B — UI primitives and shell placeholders
- **Decision:** Create institutional route-group layouts and dashboard placeholders for student, coordinator, and admin with clear “coming later phase” messaging and visible navigation regions.
- **Rationale:** Validates IA and shell structure early without misrepresenting workflow completion.
- **Alternatives considered:** Delay all role pages until business logic implementation.
- **Consequences / trade-offs:** Enables visual/product review and smoke-route evolution now; requires later replacement of placeholder cards with real workflow surfaces.
- **Affected areas:** `app/(institutional)/*`.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-020 — Social shell remains secondary with explicit return path
- **Date:** 2026-05-04
- **Phase:** Phase 2B — UI primitives and shell placeholders
- **Decision:** Add a student social shell placeholder with secondary positioning and an explicit link back to the institutional student dashboard.
- **Rationale:** Reinforces institutional primacy and separation while still exposing planned social IA.
- **Alternatives considered:** Single mixed dashboard for institutional + social placeholders.
- **Consequences / trade-offs:** Clearer product boundaries; minor duplication in shell navigation until shared navigation rules mature.
- **Affected areas:** `app/(social)/student/*`, landing navigation.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-021 — Honest placeholder copy rule for Phase 2B
- **Date:** 2026-05-04
- **Phase:** Phase 2B — UI primitives and shell placeholders
- **Decision:** All new shell pages must explicitly state that workflows, demo mode identity, and data-backed features are pending later phases.
- **Rationale:** Prevents misleading stakeholders during demos and aligns with tutor guidance for honest MVP communication.
- **Alternatives considered:** Marketing-style copy implying workflows are available.
- **Consequences / trade-offs:** Reduces confusion and trust risk; copy will need phased updates as features land.
- **Affected areas:** `app/page.tsx`, institutional/social dashboard placeholders.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-022 — Demo identity deferred to Phase 2D
- **Date:** 2026-05-04
- **Phase:** Phase 2B — UI primitives and shell placeholders
- **Decision:** Keep demo identity/context mechanics out of Phase 2B and surface a “Demo mode setup pending” notice in shells.
- **Rationale:** Keeps Phase 2B focused on layout primitives and avoids partial/fragile identity behavior.
- **Alternatives considered:** Partial query/localStorage role toggles in Phase 2B.
- **Consequences / trade-offs:** No role persistence yet; cleaner separation for planned Phase 2D identity implementation.
- **Affected areas:** top bar messaging, dashboard copy, phase planning continuity.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-023 — Phase 2C minimal Prisma schema boundary
- **Date:** 2026-05-04
- **Phase:** Phase 2C — Prisma SQLite foundation and deterministic demo seed
- **Decision:** Implement only foundational persistence models (`Institution`, `User`, `MobilityRecord`) and defer workflow-heavy tables.
- **Rationale:** Phase scope requires DB foundation without prematurely implementing institutional/social workflow semantics.
- **Alternatives considered:** Modeling full submissions/deadlines/exceptions/social/moderation/map schemas now.
- **Consequences / trade-offs:** Faster stable base for next phases; later phases must add domain-specific models incrementally.
- **Affected areas:** `prisma/schema.prisma`, seed strategy, upcoming workflow modules.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-024 — String-based role/status fields for SQLite-safe early phase
- **Date:** 2026-05-04
- **Phase:** Phase 2C — Prisma SQLite foundation and deterministic demo seed
- **Decision:** Use `String` fields for role and mobility status in foundation schema, with documented allowed values in comments and shared constants.
- **Rationale:** Avoid enum migration friction in an early SQLite phase while preserving clear allowed demo values.
- **Alternatives considered:** Prisma enums in Phase 2C.
- **Consequences / trade-offs:** Simpler early migrations; strict validation must be enforced at service/validation layer in later phases.
- **Affected areas:** `prisma/schema.prisma`, `src/modules/shared/demo-identity.ts`, tests.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-025 — Deterministic idempotent demo seed baseline
- **Date:** 2026-05-04
- **Phase:** Phase 2C — Prisma SQLite foundation and deterministic demo seed
- **Decision:** Seed fixed IDs (`student-1`, `coordinator-1`, `admin-1`, institution IDs, mobility record ID) using Prisma upserts.
- **Rationale:** Ensures repeatable local demos and stable references for future tests/routes.
- **Alternatives considered:** Randomized seed data; insert-only seed scripts.
- **Consequences / trade-offs:** Predictable local environment and rerun safety; less variability for exploratory scenarios.
- **Affected areas:** `prisma/seed.ts`, package scripts, README setup commands.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation


### DEC-026 — Phase 2D server-readable demo cookie as authoritative context
- **Date:** 2026-05-04
- **Phase:** Phase 2D — Demo context cookie and role switching
- **Decision:** Use an HTTP-only server-readable cookie (`erasmusmate_demo_context`) as the authoritative demo identity context for role/user resolution.
- **Rationale:** Server-rendered pages and API guards must resolve the same context without relying on client-only state.
- **Alternatives considered:** localStorage-only context; query-parameter authoritative context.
- **Consequences / trade-offs:** Reliable server visibility and refresh consistency; this remains demo-only and not real authentication.
- **Affected areas:** `src/modules/shared/demo-context.ts`, `app/api/demo-context/route.ts`, top bar role switcher behavior.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-027 — Local storage remains non-authoritative in demo mode
- **Date:** 2026-05-04
- **Phase:** Phase 2D — Demo context cookie and role switching
- **Decision:** Do not use localStorage as authoritative identity; only cookie-backed server context is authoritative.
- **Rationale:** localStorage cannot be read by route handlers or server components.
- **Alternatives considered:** dual-authority client/server context.
- **Consequences / trade-offs:** Removes mismatch risk between UI and backend context.
- **Affected areas:** demo identity strategy and tests.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-028 — Demo context API + switcher behavior and auth deferral
- **Date:** 2026-05-04
- **Phase:** Phase 2D — Demo context cookie and role switching
- **Decision:** Add `/api/demo-context` GET/PATCH routes for demo context read/update, wire top-bar role switcher to this API, and refresh after switching. Keep production authentication explicitly deferred and keep placeholders workflow-free.
- **Rationale:** Provides deterministic demo role switching while honestly communicating auth/workflow scope.
- **Alternatives considered:** hardcoded role switch UI without server update; introducing production auth early.
- **Consequences / trade-offs:** Reliable demo behavior now, no false claim of production auth, and workflows remain intentionally pending.
- **Affected areas:** API route, top bar UI, dashboard placeholders, smoke tests, docs.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-029 — Phase 3A institutional read-model services
- **Date:** 2026-05-04
- **Phase:** Phase 3A — Institutional core data foundation
- **Decision:** Implement read-only institutional services under `src/modules/institutional/read-models.ts` and keep API route handlers thin.
- **Rationale:** Delivers backend-backed dashboards quickly while preserving separation of transport and data shaping.
- **Alternatives considered:** Query Prisma directly in route handlers/pages.
- **Consequences / trade-offs:** Cleaner boundary and testability; later mutations will require expanding module structure.
- **Affected areas:** institutional services, API routes, dashboard pages.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-030 — Phase 3A schema and state strategy
- **Date:** 2026-05-04
- **Phase:** Phase 3A — Institutional core data foundation
- **Decision:** Add minimal institutional tables (`ProcedureDefinition`, `DocumentSubmission`, `Deadline`, `ExceptionRequest`, `AuditRecord`) and keep workflow states as `String` values.
- **Rationale:** Enables Phase 3 read models without over-modeling future transitions while staying SQLite-safe.
- **Alternatives considered:** Full enum-heavy workflow engine in Phase 3A.
- **Consequences / trade-offs:** Faster delivery and migration simplicity; state validation remains service-level responsibility.
- **Affected areas:** `prisma/schema.prisma`, seed data, read services.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-031 — Phase 3A deterministic institutional seed scenario
- **Date:** 2026-05-04
- **Phase:** Phase 3A — Institutional core data foundation
- **Decision:** Seed fixed institutional scenario with one student mobility record, assigned coordinator, representative submission/deadline/exception states, and basic audit rows.
- **Rationale:** Supports reproducible dashboard reads and service/API tests.
- **Alternatives considered:** Randomized or partial seed values.
- **Consequences / trade-offs:** Stable demos/tests; less variability in seed scenarios.
- **Affected areas:** `prisma/seed.ts`, dashboard and service tests.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-032 — Mutations deferred to Phase 3B/3C
- **Date:** 2026-05-04
- **Phase:** Phase 3A — Institutional core data foundation
- **Decision:** Keep institutional endpoints read-only and explicitly defer submission decisions and exception mutation workflows.
- **Rationale:** Maintains strict phase scope and honest product behavior.
- **Alternatives considered:** partial mutation actions in Phase 3A.
- **Consequences / trade-offs:** Clear reviewable scope; action buttons/workflows remain unavailable until next subphases.
- **Affected areas:** API design, dashboard copy, traceability status.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-020 — Phase 3B submission workflow model and guards
- **Date:** 2026-05-04
- **Phase:** Phase 3B — Document submission workflow and coordinator review
- **Decision:** Implement submission states `DRAFT`, `SUBMITTED`, `IN_REVIEW`, `APPROVED`, `REJECTED`, `REOPENED`, `RESUBMITTED` with backend-enforced action guards in a dedicated institutional submissions service.
- **Rationale:** Keeps transition logic authoritative on the backend and aligned with institutional governance.
- **Consequences / trade-offs:** Slightly more backend code; substantially lower risk of UI-only rule bypass.
- **Affected areas:** `src/modules/institutional/submissions.ts`, submissions API routes, submission/review pages.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-021 — Phase 3B rationale and audit/event policy
- **Date:** 2026-05-04
- **Phase:** Phase 3B — Document submission workflow and coordinator review
- **Decision:** Require rationale for reject/reopen, keep submit rationale-free, and persist both submission event rows and `AuditRecord` rows for every state transition.
- **Rationale:** Maintains institutional traceability and reviewer accountability while keeping student submission friction low.
- **Consequences / trade-offs:** Additional storage writes per transition; clearer review history and auditability.
- **Affected areas:** Prisma schema/migration, seed, submission service, tests.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-022 — Phase 3B deferred scope boundaries
- **Date:** 2026-05-04
- **Phase:** Phase 3B — Document submission workflow and coordinator review
- **Decision:** Keep this phase as metadata-only submission workflow; defer file upload/storage and deadline blocking/exception decision coupling to Phase 3C.
- **Rationale:** Prevents overreach while delivering backend-backed submission and review actions now.
- **Consequences / trade-offs:** Honest but partial workflow surface; clearer incremental roadmap.
- **Affected areas:** UI copy, README scope section, traceability statuses.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

- 2026-05-04 — Phase 3C: Effective due date = override date when present, but expired override reverts to overdue behavior unless fulfilled. Status: accepted.
- 2026-05-04 — Phase 3C: Submission submit/resubmit is blocked only when linked deadline is effectively overdue. Status: accepted.
- 2026-05-04 — Phase 3C: Exception states use PENDING/IN_REVIEW/APPROVED/REJECTED/APPLIED/CLOSED with rationale on decisions. Status: accepted.
- 2026-05-04 — Phase 3C: Applying approved exception writes audit for exception transition and deadline override. Status: accepted.
- 2026-05-04 — Phase 3C: Full deadline CRUD, policy templates, file upload remain deferred. Status: deferred.


### DEC-020 — Phase 3D institutional hardening pass
- **Date:** 2026-05-04
- **Phase:** Phase 3D
- **Decision:** Prioritize regression hardening, consistent status labels, audit consistency checks, and small UX wording improvements over new workflows.
- **Rationale:** Close institutional core safely before Phase 4 scope expansion.
- **Consequences / trade-offs:** Better consistency and confidence; no large UX redesign in this phase.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-021 — Deferred scope confirmation for Phase 3D
- **Date:** 2026-05-04
- **Phase:** Phase 3D
- **Decision:** Keep Learning Agreement, Academic Summary, social workflows, moderation, real map integration, production auth, and file upload/storage deferred.
- **Rationale:** Prevent scope creep and keep Phase 3D focused on institutional hardening.
- **Consequences / trade-offs:** Honest MVP boundaries; deferred capabilities remain pending later phases.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation


### DEC-033 — Phase 4A Learning Agreement table-first foundation
- **Date:** 2026-05-04
- **Phase:** Phase 4A
- **Decision:** Implement Learning Agreement with minimal proposal + row + event models and table-first workflow states.
- **Rationale:** Delivers backend-correct equivalence workflow before UI-heavy phases.
- **Consequences / trade-offs:** Strong state/rule base now; polished student/coordinator UI intentionally deferred.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-034 — Immutable approved-row edit and denied-row resubmission guard
- **Date:** 2026-05-04
- **Phase:** Phase 4A
- **Decision:** Editing latest APPROVED or DENIED rows creates new `IN_REVIEW` revisions and preserves historical rows; resubmission is blocked while latest denied rows remain unresolved.
- **Rationale:** Preserves auditability and enforces institutional correction flow server-side.
- **Consequences / trade-offs:** More row versions to manage; safer traceability and review semantics.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-035 — Grade non-governing strategy and derived Academic Summary
- **Date:** 2026-05-04
- **Phase:** Phase 4A
- **Decision:** Grade remains nullable/non-governing for approval and is blocked for student mutations; Academic Summary is derived from latest approved rows without snapshot table in this phase.
- **Rationale:** Matches current institutional rule set while keeping data model minimal and deterministic.
- **Consequences / trade-offs:** Summary is always live-derived; snapshot/historical summary strategy deferred.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-019 — Serialize Vitest DB-backed execution for shared SQLite stability
- **Date:** 2026-05-04
- **Phase:** Phase 4A backend foundation stabilization
- **Decision:** Configure Vitest to run test files serially (`fileParallelism: false`, single worker) so all Prisma/SQLite-backed suites share one deterministic seed lifecycle.
- **Rationale:** Existing tests call shared `seed()` and mutate overlapping records; parallel workers caused intermittent foreign key failures in Learning Agreement seed/event writes.
- **Alternatives considered:** Per-suite isolated SQLite files; broad fixture refactor to eliminate shared seeded records.
- **Consequences / trade-offs:** Lower parallel test throughput but stable deterministic runs across Phase 3 and Phase 4A backend suites.
- **Affected areas:** `vitest.config.ts`, institutional service/API tests using Prisma seed data.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation


### DEC-021 — Phase 4A transactional reseed and strict FK-safe Learning Agreement event writes
- **Date:** 2026-05-04
- **Phase:** Phase 4A stabilization
- **Decision:** Keep seed setup deterministic by clearing dependent tables in transactional dependency order and preserve strict Learning Agreement event integrity checks before event creation (agreement, actor, and row consistency checks).
- **Rationale:** Prevent cross-suite test interference with shared SQLite state and avoid dangling audit/event records.
- **Alternatives considered:** Relax FK integrity for events; remove Learning Agreement seed coverage; skip failing suites.
- **Consequences / trade-offs:** More explicit seed ordering and setup discipline; stronger data integrity and reliable reseeding.
- **Affected areas:** `prisma/seed.ts`, learning-agreement service/event flows, Vitest DB-backed test stability.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation


### DEC-017 — Phase 4B student table-first Learning Agreement editor
- **Date:** 2026-05-04
- **Phase:** Phase 4B — Student Learning Agreement UI
- **Decision:** Implement `/student/learning-agreement` as a table-first page with a server-fetched initial agreement and a client editor that calls Phase 4A API routes and refreshes with `router.refresh()`.
- **Rationale:** Keeps transport thin, preserves backend rule ownership, and provides a usable low-click student workflow now.
- **Alternatives considered:** Full server actions pipeline; coordinator-grade combined UI in same phase.
- **Consequences / trade-offs:** Fast and reliable student UX; coordinator review UI remains deferred to Phase 4C.
- **Affected areas:** student institutional route, Learning Agreement UI, dashboard navigation.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-018 — Student does not edit grade in Phase 4B
- **Date:** 2026-05-04
- **Phase:** Phase 4B — Student Learning Agreement UI
- **Decision:** Student add/edit form excludes grade field and relies on backend guard if unexpected payloads include grade.
- **Rationale:** Matches Learning Agreement rule that grade is coordinator-controlled only.
- **Alternatives considered:** Show disabled grade control in student UI.
- **Consequences / trade-offs:** Clear role boundary; grade UX for coordinator remains for Phase 4C.
- **Affected areas:** student LA form, permissions messaging.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-019 — Explicit deferrals for Phase 4C and 4D remain
- **Date:** 2026-05-04
- **Phase:** Phase 4B — Student Learning Agreement UI
- **Decision:** Keep full coordinator Learning Agreement review UI deferred to Phase 4C and polished Academic Summary page deferred to Phase 4D.
- **Rationale:** Protects phase scope and delivery focus on student workflow completeness.
- **Alternatives considered:** Partial coordinator review implementation during Phase 4B.
- **Consequences / trade-offs:** Cleaner scope; coordinator/student parity completes in later phases.
- **Affected areas:** roadmap communication, README, traceability statuses.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-017 — Phase 4C coordinator Learning Agreement review UI pattern
- **Date:** 2026-05-04
- **Phase:** Phase 4C — Coordinator Learning Agreement review UI
- **Decision:** Build `/coordinator/learning-agreement-review` as a server-rendered page with initial queue/detail fetch and a client component for row decisions + refresh.
- **Rationale:** Keeps route handler/service logic unchanged while enabling fast, low-click coordinator decisions.
- **Alternatives considered:** Fully client-side page fetch; new server action layer.
- **Consequences / trade-offs:** Simple integration and predictable UX; client state must handle success/error messages.
- **Affected areas:** coordinator page, coordinator navigation, Learning Agreement review interactions.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-018 — Deny rationale UX is enforced before backend call
- **Date:** 2026-05-04
- **Phase:** Phase 4C — Coordinator Learning Agreement review UI
- **Decision:** Deny action requires visible rationale input and client-side pre-check; backend remains final validator.
- **Rationale:** Reduces failed clicks while preserving backend source-of-truth validation.
- **Alternatives considered:** Backend-only validation with no inline pre-check.
- **Consequences / trade-offs:** Better coordinator feedback; still handles blocked actions from API cleanly.
- **Affected areas:** coordinator row decision form, API error display.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-019 — Academic Summary UI deferred to Phase 4D
- **Date:** 2026-05-04
- **Phase:** Phase 4C — Coordinator Learning Agreement review UI
- **Decision:** Keep Academic Summary as backend-derived output and defer polished standalone page to Phase 4D.
- **Rationale:** Phase 4C focuses coordinator review workflow scope.
- **Alternatives considered:** Build summary page now.
- **Consequences / trade-offs:** Tighter focus for Phase 4C; summary presentation remains pending.
- **Affected areas:** institutional roadmap, coordinator/student IA.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-017 — Phase 4D Academic Summary uses latest approved rows and read-only student view
- **Date:** 2026-05-04
- **Phase:** Phase 4D — Academic Summary
- **Decision:** Student Academic Summary (`/student/academic-summary`) reads only latest approved Learning Agreement rows; students can view grades when present but cannot edit grades.
- **Rationale:** Keeps Academic Summary aligned with approved institutional outcomes and prevents unauthorized grade changes.
- **Alternatives considered:** Showing all row states/revisions; allowing student grade editing.
- **Consequences / trade-offs:** Cleaner and safer summary; coordinator grade editing is explicitly deferred to a later institutional polish phase.
- **Affected areas:** student institutional page, learning-agreement summary service, API role guard behavior.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-018 — Phase 4D defers transcript import/export and coordinator grade editing UI
- **Date:** 2026-05-04
- **Phase:** Phase 4D — Academic Summary
- **Decision:** Do not add transcript import/export or coordinator grade editing UI in this phase; keep grade display only with “Not recorded” fallback.
- **Rationale:** Maintains Phase 4D scope and avoids shipping partial high-complexity flows without complete validation/auditing UX.
- **Alternatives considered:** Implementing quick coordinator grade form in Phase 4D.
- **Consequences / trade-offs:** Faster delivery of stable student-facing summary; coordinator grade workflow remains pending.
- **Affected areas:** student academic summary UI, roadmap documentation.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-036 — Phase 5A social profile as secondary support data
- **Date:** 2026-05-04
- **Phase:** Phase 5A — Social profile and discovery foundation
- **Decision:** Introduce `SocialProfile` as student social-support data, explicitly separate from institutional records and workflow processing.
- **Rationale:** Supports discovery MVP without mixing official mobility procedures.
- **Consequences / trade-offs:** Clear separation and safer API outputs; social interactions remain limited in this phase.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-037 — Phase 5A discovery visibility and safe-field filtering
- **Date:** 2026-05-04
- **Phase:** Phase 5A — Social profile and discovery foundation
- **Decision:** Discovery excludes own profile, hidden profiles, and moderation-hidden profiles and returns only safe public fields.
- **Rationale:** Prevents accidental exposure and keeps social discovery deterministic.
- **Consequences / trade-offs:** Stronger privacy and moderation baseline; richer social actions deferred.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-038 — Phase 5A contact preference informational only
- **Date:** 2026-05-04
- **Phase:** Phase 5A — Social profile and discovery foundation
- **Decision:** Contact preference is shown as profile metadata only and does not enable connection or messaging actions yet.
- **Rationale:** Keeps Phase 5A strictly foundational and honest.
- **Consequences / trade-offs:** Clear UX boundaries; interaction workflows deferred to Phase 5B+.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation


## Phase 5B — social connection lifecycle
- Decision: Use `SocialConnection.pairKey` as sorted unordered profile pair key with unique constraint.
- Rationale: SQLite-safe duplicate prevention for active pair interactions.
- Consequence: One canonical row per pair at a time; history is represented by state transitions.
- Status: Accepted.

- Decision: State model includes `PENDING`, `ACCEPTED`, `REJECTED`, `CANCELLED`, `BLOCKED`.
- Rationale: Covers request lifecycle and safety blocking without introducing messaging yet.
- Consequence: Messaging remains deferred and not implied in UI actions.
- Status: Accepted.

- Decision: Keep social area secondary and separate from institutional workflows.
- Rationale: Preserve institutional primacy and avoid scope leakage.
- Consequence: Social routes remain under `/social/student/*` and dashboard links back to institutional pages.
- Status: Accepted.

- Phase 5C social messaging: connection-based student messaging for accepted connections only; no realtime in this phase.

### DEC-039 — Phase 5D social UX + safety hardening keeps accepted-only messaging and participant-scoped block semantics
- **Date:** 2026-05-04
- **Phase:** Phase 5D — Social UX and safety hardening
- **Decision:** Clarify social navigation labels and active state, show only the other student in connection rows, and require explicit confirmation before blocking while preserving accepted-only messaging safeguards.
- **Rationale:** Reduces user confusion (especially around ambiguous pair labels) and lowers accidental safety actions without broadening feature scope.
- **Consequences / trade-offs:** Improved clarity and safer social actions; real-time chat and moderation dashboard remain deferred.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-040 — Phase 5D follow-up uses perspective-safe connection DTOs
- **Date:** 2026-05-04
- **Phase:** Phase 5D — Social UX and safety hardening (follow-up)
- **Decision:** `/api/social/connections` now returns only perspective-safe connection rows with `otherProfile` and `allowedActions`, and hides pair/internal fields.
- **Rationale:** Prevents ambiguous labels like `Luca Rossi & Alex Moreno` and keeps unsafe/internal identifiers out of frontend contracts.
- **Consequences / trade-offs:** Cleaner UI mapping and stronger API boundary; frontend must rely on allowed actions instead of raw state internals.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

- 2026-05-05 | Added SocialReport backend workflow with admin review transitions (dismiss/hide profile) and student reporting guards; kept demo-context auth model unchanged. | Ensures moderation is backend-enforced while staying MVP-simple. | Added API/services/tests/seed updates and admin moderation page; hidden profiles are excluded from discovery and new connections. | Accepted | Implemented in Phase 5E.

## 2026-05-05 — Phase 5F social lifecycle hardening
- Decision: Reuse existing connection pair rows for re-request after CANCELLED/REJECTED and set UNBLOCK transition to CANCELLED state for a clean restart.
- Rationale: Keeps one stable pair record, prevents duplicate active rows, and clearly restores request flow without auto-reconnecting.
- Consequences: Users must send a new request after unblock; messaging stays blocked until reconnection is accepted.
- Status: Accepted.
- Evidence level: Implemented in service + tests.

## 2026-05-05 — Phase 5F.2 re-request and unblock lifecycle cleanup
- Decision: Treat `CANCELLED` and `REJECTED` as non-active pair states and allow deterministic re-request by resetting same `pairKey` row to `PENDING`.
- Rationale: Fixes stale "Request sent" behavior and preserves one canonical row per profile pair.
- Consequences: Students can cancel/re-request and reject/re-request cleanly; duplicate and blocked pair guards remain enforced server-side.
- Status: Accepted.
- Evidence level: Implemented in social connection/discovery services and tests.

- Decision: Discovery now emits one canonical status plus student-safe `unavailableReason` for contact-preference-only unavailability.
- Rationale: Prevents contradictory labels after unblock and makes CONNECTIONS_ONLY behavior explicit without exposing moderation internals.
- Consequences: UI can show "Only available to existing connections" consistently; moderation details remain hidden from student payloads.
- Status: Accepted.
- Evidence level: Implemented in discovery API mapping and discovery UI contract.

- 2026-05-05: Implemented Phase 5G city-level social map discovery with explicit mapVisibility and approximate city-center coordinates only; no precise/live location fields are stored or exposed.

## 2026-05-05 — Phase 5G correction: recommendation-based social map
- Decision: Replace student-profile map discovery with city recommendation map items (places/tips only) and keep discover-students as a separate workflow.
- Rationale: Product rules require social support map to show Erasmus city recommendations without exposing student live or personal location.
- Consequences: Added `CityRecommendation` model + recommendation services/routes/pages; `/api/social/map` is now a compatibility wrapper over recommendation map data.
- Status: Accepted.
- Evidence level: Implemented in schema, seed, APIs, UI, and tests.

## 2026-05-05 — Phase 5G.1 map provider integration (Leaflet/OpenStreetMap)
- Decision: Implement a client-only Leaflet map with OpenStreetMap tiles for `/social/student/map`, loaded via Next dynamic import with `ssr: false`.
- Rationale: Provides a real interactive map without requiring API keys, avoids SSR window access issues, and preserves local/offline-tolerant MVP setup.
- Consequences: Map API payload is now normalized to recommendation-only fields including `recommendationId`; no student location/profile internals are exposed by map endpoints.
- Status: Accepted.
- Evidence level: Implemented in social map page/component, recommendation map service, and social map tests.

## 2026-05-05 — Phase 5G.2 student-created recommendations with map placement
- Decision: Allow STUDENT users to create city recommendations from both recommendations page and map page, with required place coordinates and map-click placement.
- Rationale: Completes social recommendation workflow end-to-end while keeping the map focused on recommendation places (not people).
- Consequences: Added strict coordinate/required-field validation and safe response projection; map API now returns `descriptionExcerpt` only; creation forms include explicit privacy safety copy.
- Status: Accepted.
- Evidence level: Implemented in services, route handlers, UI forms, and tests.

- 2026-05-05: Added DocumentAttachment metadata-only model and lifecycle endpoints with status-based replacement/removal (ACTIVE/REPLACED/REMOVED), keeping binary storage out of DB.

- Decision: Reused `ProcedureDefinition` as configurable requested document definitions for phase 6B hotfix, extending it with attachment constraints and active flag.
  - Rationale: Avoided introducing a parallel model while enabling coordinator/admin configuration with minimal migration risk.
  - Consequences / trade-offs: Procedure definitions now carry requested-document metadata (`acceptedMimeTypesJson`, `maxSizeBytes`, `isActive`, `createdById`), which keeps workflows coherent but couples procedure and requirement semantics.
  - Status: accepted.
  - Evidence level: implemented in schema, seed, API, and coordinator UI.

- Decision: Preserve strict attachment validation for submit/resubmit and fix resubmit target state to `RESUBMITTED`.
  - Rationale: Enforces institutional auditability and aligns transitions with expected workflow semantics.
  - Consequences / trade-offs: Tests and fixtures must explicitly include active attachments before transitions.
  - Status: accepted.
  - Evidence level: implemented in submissions transition logic and updated submission tests.

### DEC-017 — Real multipart upload as canonical submission attachment flow
- **Date:** 2026-05-05
- **Phase:** Institutional document upload hardening
- **Decision:** Keep `/api/institutional/submissions/[submissionId]/attachments` and replacement routes as multipart/form-data endpoints backed by real `File` parsing, persisted metadata, and sanitized API responses without storage internals.
- **Rationale:** Ensures student uploads use normal browser file inputs with backend-owned metadata persistence and preserves security boundaries.
- **Alternatives considered:** JSON-only metadata upload; exposing storage paths for debugging.
- **Consequences / trade-offs:** Slightly more API test complexity; materially better realism and safer response contract.
- **Affected areas:** attachment API routes, student submissions UI labels, institutional attachment API tests.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

## 2026-05-05 — Coordinator review queue actions + secure attachment open
- Decision: Keep submission transition authority exclusively in existing `/api/institutional/submissions/[submissionId]/transition` and add action controls in coordinator UI by status.
- Rationale: Prevents duplicate state logic in UI and preserves backend validation/guards (including rationale requirements).
- Consequences: Coordinator queue now performs actionable review transitions; rationale is captured when required.
- Status: Accepted.
- Evidence level: Implemented in coordinator review queue page/client and existing transition API.

- Decision: Introduce secure attachment-open endpoint using role/ownership checks and private storage-key reads without path exposure.
- Rationale: Makes real uploaded files openable while preserving access boundaries and hiding storage internals.
- Consequences: Student/coordinator/admin can open authorized attachments inline; seed-only metadata attachments stay non-openable as demo-only.
- Status: Accepted.
- Evidence level: Implemented in attachments module, open route, and institutional attachment-open tests.

## 2026-05-05 — Phase 6C coordinator review queue UX improvements
- Decision: Add coordinator-side queue filters (status chips, text search) and hide `APPROVED` records by default with an explicit "Show approved" toggle.
- Rationale: Keeps coordinator focus on pending/reviewable work while still allowing access to approved history on demand.
- Consequences: Queue is less noisy by default; backend transition authority remains unchanged because all actions still call the existing transition endpoint.
- Status: Accepted.
- Evidence level: Implemented in review queue client and UI contract tests.

- Decision: Render attachment rows with explicit action semantics (`Open document` only when stored binary exists; `Demo metadata only` for seed/demo records).
- Rationale: Prevents dead-end actions for metadata-only attachments and communicates demo limitations clearly.
- Consequences: Better operator trust and fewer failed open attempts; no guard weakening in backend APIs.
- Status: Accepted.
- Evidence level: Implemented in UI and contract tests.

### DEC-021 — Phase 6D student submissions clarity is client-led, backend-authoritative
- **Date:** 2026-05-05
- **Phase:** Phase 6D — Student submissions UX polish and workflow clarity
- **Decision:** Improve student submissions UX with status filters, search, approved toggle behavior, clearer card/attachment summaries, and safer action visibility while keeping backend transition/permission logic authoritative.
- **Rationale:** Students need quicker understanding of pending work and file actions without implying client-side authority.
- **Alternatives considered:** Moving state/action checks to frontend-only rule logic; redesigning around a heavier UI framework.
- **Consequences / trade-offs:** Better scanability and lower clutter; still relies on full page refresh after successful actions in this phase.
- **Affected areas:** `src/components/institutional/student-submissions-client.tsx`, student submissions UX contract tests, submissions traceability rows.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

- Phase 6C: Implemented institutional deadline calendar filters/grouping, ICS export endpoint, and idempotent reminder generation using existing notifications. Kept demo-role scoping and avoided external scheduler dependencies.

### DEC-022 — Phase 6D admin-owned institutional procedure configuration
- **Date:** 2026-05-05
- **Phase:** Phase 6D — Admin Configuration of Institutional Processes
- **Decision:** Restrict procedure-definition mutations to ADMIN only, treat ProcedureDefinition as the single source for requested-document rules, and expose only active procedures to non-admin API consumers.
- **Rationale:** Keeps institutional governance explicit, avoids duplicate models, and prevents coordinator/student configuration drift.
- **Consequences / trade-offs:** Coordinator pages become read-only for procedure definitions; document requirements UI reuses procedure configuration semantics.
- **Affected areas:** `/api/institutional/procedures`, admin procedures/document requirements pages, institutional API/UI contract tests.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation and tests

### DEC-023 — Phase 6C deadline calendar read model and deterministic reminder/export
- **Date:** 2026-05-05
- **Phase:** Phase 6C — Calendar, Deadline Export & Reminder Rules
- **Decision:** Keep deadline calendar as a backend read model (`effectiveDueDate`, reminder labels, scoped visibility) and implement `.ics` export in-memory from scoped records.
- **Rationale:** Preserves institutional ownership/role guards while making deadlines actionable without introducing external schedulers.
- **Consequences / trade-offs:** No cron/email/push in this phase; reminder generation remains deterministic service logic invoked by application/test flows.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-044 — Phase 6D admin procedure configuration uses soft deactivation and institution-scoped creation
- **Date:** 2026-05-06
- **Phase:** Phase 6D — Admin configuration of institutional processes
- **Decision:** Keep procedure definition lifecycle non-destructive in APIs (create/update/activate/deactivate) and block student draft creation for inactive procedures; create new procedure definitions under the acting admin's institution rather than hardcoded institution IDs.
- **Rationale:** Preserves historical submissions/auditability, avoids cross-institution leakage, and keeps official workflows stable while allowing admin configuration changes.
- **Alternatives considered:** Add destructive delete endpoint; keep hardcoded institution ID during procedure creation.
- **Consequences / trade-offs:** Historical records remain intact and future submissions respect active configuration; fully dedicated institution-level admin audit model remains deferred.
- **Affected areas:** `app/api/institutional/procedures/route.ts`, `src/modules/institutional/submissions.ts`, institutional API tests.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-045 — Phase 6D procedure configuration changes write best-effort audit entries through existing mobility-linked model
- **Date:** 2026-05-06
- **Phase:** Phase 6D — Admin configuration of institutional processes
- **Decision:** When a procedure definition is created/updated, write audit events using the existing `AuditRecord` model by attaching events to the earliest mobility record of the same institution when available.
- **Rationale:** The current audit model is mobility-record scoped and has no institution-only audit table; this keeps traceability without schema expansion in this phase.
- **Alternatives considered:** Add a new institution-scoped audit table in Phase 6D; skip audit events entirely.
- **Consequences / trade-offs:** Provides practical audit evidence now; institution-wide audit history is indirect and should be refined in a future phase.
- **Affected areas:** `app/api/institutional/procedures/route.ts`.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-032 — Phase 6E coordinator operational dashboard read model and deterministic risk tiers
- **Date:** 2026-05-06
- **Phase:** Phase 6E — Coordinator Operational Review Workspace
- **Decision:** Extend the coordinator dashboard read model with server-side scoped operational counts, assigned-student workload rows, and deterministic HIGH/MEDIUM/LOW risk classification based on overdue deadlines, rejected submissions, pending exceptions, and pending review workload.
- **Rationale:** Coordinators need a practical assigned-student operations view without duplicating transition authority or exposing unassigned data.
- **Alternatives considered:** Client-side aggregation from multiple endpoints; complex weighted risk score.
- **Consequences / trade-offs:** Better coordinator triage and testability with simple transparent logic; risk model is intentionally coarse and may need refinement in Phase 7.
- **Affected areas:** `src/modules/institutional/read-models.ts`, coordinator dashboard UI, institutional tests, traceability mapping.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

- Phase 6F: Introduced normalized activity feed read-model combining institutional audit records, learning-agreement events, and admin-only sanitized social moderation events. Rationale: coherent traceability view without leaking internals. Consequence: dashboards/notifications can render consistent timeline while keeping role scoping strict.

### DEC-046 — Phase 7A reusable frontend design-system foundation with deferred full overhaul
- **Date:** 2026-05-06
- **Phase:** Phase 7A — Frontend Design System Foundation
- **Decision:** Introduce typed, reusable UI and layout primitives (`src/components/ui/*`, `src/components/layout/page-shell.tsx`) and lightly migrate representative institutional dashboards without altering backend/domain logic, Prisma schema, seed data, API contracts, or role/workflow semantics.
- **Rationale:** Enables consistent iterative UI modernization in later phases while preserving already-validated institutional/social workflows.
- **Consequences / trade-offs:** Faster, safer UI reuse now; full institutional/social redesign is explicitly deferred to Phase 7B/7C/7D.
- **Affected areas:** `src/components/ui/*`, `src/components/layout/page-shell.tsx`, dashboard pages, UI contract tests, traceability matrix.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation and tests

## 2026-05-06 — Phase 7B institutional UI/UX overhaul using shared design-system foundation
- **Decision:** Polish institutional student/coordinator/admin screens by aligning them to the Phase 7A reusable layout/state primitives (PageShell/PageHeader/cards/state messaging) without changing institutional domain behavior.
- **Rationale:** Improve scanning, hierarchy, and demo quality while preserving trusted backend rules and API contracts.
- **Consequences / trade-offs:** No Prisma schema, API contract, or workflow-state change in this phase; social UI redesign is explicitly deferred to Phase 7C; full responsive/accessibility polish is deferred to Phase 7D.
- **Status:** Accepted.
- **Evidence level:** Code and UI contract test coverage updated in Phase 7B.

- Phase 7C Social UI/UX Overhaul | Social workflows UI polish using Phase 7A design primitives; preserve existing backend/schema/contracts and role/moderation guards; defer final responsive/accessibility micro-polish to Phase 7D. | Accepted

### DEC-047 — Phase 7D responsive/accessibility/demo polish without backend contract changes
- **Date:** 2026-05-06
- **Phase:** Phase 7D — Responsive, Accessibility & Demo Polish
- **Decision:** Apply focused UI-only improvements across institutional/social pages (responsive wrapping, clearer labels, explicit empty/error copy, and practical form/action accessibility labels) while keeping Prisma schema, API contracts, business rules, role guards, and moderation logic unchanged.
- **Rationale:** Raise demo readiness and evidence quality without destabilizing validated workflows.
- **Consequences / trade-offs:** UX clarity and accessibility improve with minimal code churn; a final full-application coverage audit is deferred to Phase 8A.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation and Phase 7D UI contract tests

### DEC-048 — Phase 8A.1 global launcher and role-navigation coherence hotfix
- **Date:** 2026-05-06
- **Phase:** Phase 8A.1 — Global Navigation, Role Context & Demo Coherence Hotfix
- **Decision:** Add a root ErasmusMate launcher with four role-area entry cards, add explicit student institutional/social bridge links, standardize a shared “Back to ErasmusMate home” affordance in role layouts, and clarify role/area labels across student/coordinator/admin shells.
- **Rationale:** Cross-cutting navigation confusion blocked fast workflow traversal and reduced demo trust even though core features are already implemented.
- **Consequences / trade-offs:** Improves discoverability and role context clarity with minimal UI-only changes; institutional/social conceptual separation is preserved while enabling intentional cross-navigation for students.
- **Guardrails kept:** No Prisma schema changes, no API contract changes, no workflow-state/business-rule/guard changes.
- **Affected areas:** `app/page.tsx`, role layout shells, shared `TopBar`, and Phase 8A.1 UI contract tests/traceability rows.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation and tests

## 2026-05-06 — Phase 8A.2 social moderation completion hotfix
- **Decision:** Extend social moderation review to clearly support profile, message, and recommendation report targets with explicit target labels and state-aware actions.
- **Rationale:** UX review identified that admin moderation felt limited to profiles and exposed overly technical data, which left unsafe social recommendation/message reports unclear to review.
- **Consequences / trade-offs:** We reused the existing `SocialReport` and recommendation moderation state instead of adding schema changes; message moderation uses a safe actioned workflow (with rationale) without unsafe message deletion.
- **Status:** Accepted.
- **Evidence level:** Implemented in moderation service/API/UI with tests covering target visibility, recommendation hiding, authorization guards, and student-safe visibility.

### DEC-049 — Phase 8A.3 social connection lifecycle stabilization hotfix
- **Date:** 2026-05-06
- **Phase:** Phase 8A.3 — Social Connection Lifecycle Hotfix
- **Decision:** Stabilize social connection transitions so cancelled/rejected/unblocked pairs return to a safe non-connected requestable lifecycle, preserve accepted-only messaging, and keep blocked/hidden/moderation-hidden protections and role guards intact.
- **Rationale:** UX review found inconsistent request reuse and cross-page status behavior after cancel/reject/unblock transitions.
- **Consequences / trade-offs:** Reuses existing pair row/state model (no Prisma schema change) and keeps moderation internals hidden; block/unblock remains participant-scoped with unblock limited to the blocker.
- **Status:** Accepted
- **Evidence level:** Confirmed by updated service/UI contract tests

### DEC-017 — Phase 8A.4 formal coverage audit with controlled scope
- **Date:** 2026-05-06
- **Phase:** Phase 8A.4 — Requirements, Workflow, Business Rule & Test Coverage Audit
- **Decision:** Run a formal cross-area coverage audit and prioritize documentation of gaps over feature implementation during this phase.
- **Rationale:** Phase 8A.4 is intended to establish evidence of what is implemented vs weakly covered, without silently expanding scope or introducing unplanned workflow behavior.
- **Alternatives considered:** Implementing missing features directly during audit; postponing audit to later hardening phases.
- **Consequences / trade-offs:** Produces a clear 8B backlog and preserves phase discipline; known gaps remain until targeted implementation phases.
- **Affected areas:** `artifacts/phase-8a-coverage-audit.md`, `TRACEABILITY_TEST_MATRIX.md`, test planning for Phase 8B.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-018 — Phase 8A.4 deferral policy for hardening and evidence packs
- **Date:** 2026-05-06
- **Phase:** Phase 8A.4 — Requirements, Workflow, Business Rule & Test Coverage Audit
- **Decision:** Move uncovered functional/test items to Phase 8B backlog, defer security-hardening consolidation to 9A, and defer evidence-pack synthesis to 9B.
- **Rationale:** Keeps audit phase focused on gap detection and traceability while aligning execution order with the existing roadmap.
- **Alternatives considered:** Addressing all coverage and hardening gaps immediately in 8A.4.
- **Consequences / trade-offs:** Better planning clarity and lower audit-phase risk; remaining gaps require disciplined follow-through in later phases.
- **Affected areas:** Phase roadmap execution, backlog prioritization, documentation consistency.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-050 — Phase 8B.1 prioritizes institutional E2E acceptance before lower-risk coverage polish
- **Date:** 2026-05-06
- **Phase:** Phase 8B.1 — Institutional E2E Acceptance Activation
- **Decision:** Prioritize executable Playwright institutional acceptance loops (submission decision flow, Learning Agreement row decision visibility, exception create/review) before notification-depth and security-hardening tasks.
- **Rationale:** Phase 8A.4 identified the highest current risk as weak end-to-end acceptance evidence despite strong service/API depth; activating institutional E2E closes the biggest demo and regression confidence gap first.
- **Consequences / trade-offs:** Institutional E2E confidence improves immediately; some medium-priority and hardening tasks remain intentionally deferred to subsequent phases (8B.2/9A).
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation and E2E specs

### DEC-051 — Phase 8B.2 prioritizes backend exception/notification guards before broader E2E expansion
- **Date:** 2026-05-06
- **Phase:** Phase 8B.2 — Exception negative paths and notification coverage
- **Decision:** Prioritize service/API-level coverage for exception negative paths and notifications ownership/idempotency semantics ahead of broader institutional E2E expansion and security-pack work.
- **Rationale:** Phase 8A.4 and 8B.1 left highest residual risk in backend guard matrices and notification ownership/read semantics; these are faster and safer to stabilize through deterministic service/API tests than UI-heavy flows.
- **Alternatives considered:** Expand Playwright-first to exception apply and notification-to-action journeys in this phase.
- **Consequences / trade-offs:** Faster risk reduction in backend correctness and error safety; some acceptance depth remains deferred to 8B.3 for full UI-driven coverage.
- **Affected areas:** `tests/institutional/exceptions.test.ts`, `tests/institutional/notifications-api.test.ts`, traceability/audit alignment.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-052 — Phase 8B.3 prioritizes institutional E2E acceptance closure after service/API hardening
- **Date:** 2026-05-06
- **Phase:** Phase 8B.3 — Remaining institutional E2E acceptance closure
- **Decision:** Focus this phase on closing high-value institutional Playwright acceptance gaps (exception apply, notification recipient journey, and Learning Agreement request-changes revise/resubmit) instead of expanding backend rule scope.
- **Rationale:** Phase 8B.2 already strengthened exception and notification service/API guard depth, so the highest risk shifted to missing end-user acceptance proof across UI + backend persistence.
- **Alternatives considered:** Add more service-only permutations first; broad UI refactors to remove existing prompt interactions before adding E2E.
- **Consequences / trade-offs:** Faster closure of audit-visible deferred acceptance items; notification click-through remains explicitly deferred until UI exposes direct action links.
- **Affected areas:** `e2e/institutional/workflows.spec.ts`, `TRACEABILITY_TEST_MATRIX.md`, `artifacts/phase-8a-coverage-audit.md`.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-053 — Phase 8 closure via traceability and UI contract harmonization
- **Date:** 2026-05-06
- **Phase:** Phase 8B.4 — Closure
- **Decision:** Close Phase 8 by harmonizing traceability statuses/evidence and strengthening launcher/role-label UI contracts, while deferring notification click-through routing to a later UX-focused phase.
- **Rationale:** Institutional acceptance coverage was already functionally closed in 8B.1–8B.3; remaining risk was audit/readiness drift (status inconsistency and role/navigation contract ambiguity), not missing core workflow behavior.
- **Alternatives considered:** Expanding closure into schema/UI feature work for generalized notification target routing.
- **Consequences / trade-offs:** Phase 8 ends cleanly with stronger demo and audit confidence; notification action navigation remains partial and explicitly deferred to Phase 9C to avoid speculative route contracts.
- **Affected areas:** `TRACEABILITY_TEST_MATRIX.md`, shared UI contract tests, phase audit artifact.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation


### DEC-052 — Phase 8C.1 frontend-readiness audit with copy-only hotfix policy
- **Date:** 2026-05-06
- **Phase:** Phase 8C.1 — Frontend UX readiness audit
- **Decision:** Run a focused UX readiness audit and limit implementation changes to low-risk copy hygiene + UI contract guard tests, deferring larger navigation/top-bar affordance redesign work to later UX-polish phases.
- **Rationale:** The pre-Phase-9 goal is risk discovery and demo-readiness assessment, not structural redesign.
- **Alternatives considered:** Immediate bell/avatar implementation and broad shell/nav restyling in this phase.
- **Consequences / trade-offs:** Fast, low-risk improvements now; known top-bar utility and cross-area navigation polish remains a tracked backlog for Phase 8C.2/9C.
- **Affected areas:** `artifacts/phase-8c-frontend-ux-audit.md`, student dashboard copy, UI contract tests.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-8C2 — Apply focused UX hotfixes before Phase 9A/9C
- **Date:** 2026-05-06
- **Phase:** Phase 8C.2 — Frontend UX hotfixes
- **Decision:** Implement a limited topbar/navigation/copy hotfix pass (cross-area wording, top-right notifications/profile affordances, route-copy guard tests) before Phase 9A hardening and before any broad Phase 9C redesign.
- **Rationale:** Phase 8C.1 audit showed no critical blockers but highlighted high-visibility product-affordance gaps that reduce demo credibility. A controlled hotfix pass closes these gaps quickly with low regression risk.
- **Alternatives considered:**
  1. Skip UX updates and move directly to 9A security hardening.
  2. Start full redesign early (Phase 9C scope) before security phase.
- **Consequences / trade-offs:**
  - Improves discoverability and product-like presentation now.
  - Keeps backend/schema and workflow semantics stable.
  - Leaves richer notification/profile lifecycle UX intentionally deferred to 9C.
- **Affected areas:** `src/components/TopBar.tsx`, institutional/social layouts, shared UI contract tests, traceability evidence.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation

### DEC-8C3 — Resolve social action-state clarity before Phase 9A hardening
- **Date:** 2026-05-06
- **Phase:** Phase 8C.3 — Social interaction UX and action-state fixes
- **Decision:** Prioritize a focused fix for discovery request clarity and connection block/unblock feedback correctness before starting Phase 9A security/error-safety hardening.
- **Rationale:** Manual UX review found social action outcomes were functionally hard to interpret (especially unavailable request reasons and post-block UI feedback), which is a product-readiness blocker even when core backend guards exist.
- **Alternatives considered:**
  1. Defer all social UX issues to Phase 9C redesign.
  2. Start 9A immediately and leave unclear social action-state behavior unresolved.
- **Consequences / trade-offs:**
  - Improves demo reliability and user comprehension with minimal scope.
  - Keeps schema and broader redesign out of scope.
  - Retains rich microinteraction polish for 9C.
- **Affected areas:** social discovery/connections UI, social connection request guard, social UI contracts, traceability and audit artifacts.
- **Status:** Accepted
- **Evidence level:** Confirmed by implementation and tests

### DEC-8C4 — Stabilize institutional E2E via deterministic role context and serial isolation
- **Date:** 2026-05-06
- **Phase:** Phase 8C.4 — E2E Stabilization and Fixture Isolation
- **Decision:** Stabilize institutional Playwright workflows by (1) ensuring demo role cookie is explicitly set in browser context during tests, (2) scoping ambiguous form selectors, (3) making Learning Agreement request-changes test generate its own in-review row, and (4) running institutional workflow specs serially.
- **Rationale:** Failures were caused by role-context drift, selector collisions with the topbar role select, and state mutation between tests against shared seed records.
- **Alternatives considered:** Full DB reseed per test; broad data-testid rollout; skipping brittle tests.
- **Consequences / trade-offs:** Higher local reliability with minimal product impact; institutional suite execution is slower due to serial mode.
- **Affected areas:** `e2e/institutional/workflows.spec.ts`, `playwright.config.ts`.
- **Status:** Accepted
- **Evidence level:** Confirmed by targeted and full E2E runs
