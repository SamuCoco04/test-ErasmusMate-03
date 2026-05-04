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
