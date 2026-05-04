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
