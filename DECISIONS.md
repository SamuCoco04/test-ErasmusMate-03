# ErasmusMate — DECISIONS.md

## Purpose

This ledger records meaningful architectural, workflow, testing, and UX decisions for Iteration 3.

---

## 1. Decision record format

### DEC-XXX — Decision title

- **Decision**
- **Rationale**
- **Alternatives considered**
- **Consequences / trade-offs**
- **Affected areas**
- **Status**

---

## 2. Initial accepted planning decisions

### DEC-001 — Single Next.js full-stack repository architecture

- **Decision:** ErasmusMate will be built as a single Next.js repository containing frontend pages and backend route handlers/services.
- **Rationale:** Keeps institutional and social workflows in one coherent deployable MVP, improves traceability and demo reliability.
- **Alternatives considered:** Separate frontend/backend repositories.
- **Consequences / trade-offs:** Simpler local operation; requires disciplined module boundaries.
- **Affected areas:** app structure, API boundaries, developer workflow.
- **Status:** Accepted.

### DEC-002 — Institutional core primary, social layer secondary and separated

- **Decision:** Institutional workflows remain primary and must stay clearly separated from social-support workflows.
- **Rationale:** Matches functional scope and governance constraints.
- **Alternatives considered:** Unified mixed navigation and workflow model.
- **Consequences / trade-offs:** Clearer role understanding; requires deliberate IA and routing separation.
- **Affected areas:** navigation, route groups, module boundaries, UX copy.
- **Status:** Accepted.

### DEC-003 — Complexity-based layered architecture rule

- **Decision:** Use full layered structure (domain/service/repository/policy/validator/mapper) for complex workflows; allow lighter structure for small modules.
- **Rationale:** Balances maintainability with speed and avoids overengineering.
- **Alternatives considered:** Full strict layering everywhere; minimal ad-hoc structure everywhere.
- **Consequences / trade-offs:** Better fit per module complexity; requires judgment and consistency review.
- **Affected areas:** module implementation style, code review criteria.
- **Status:** Accepted.

### DEC-004 — Test-first / acceptance-first workflow

- **Decision:** Major workflow implementation follows test-first or acceptance-first sequencing.
- **Rationale:** Reduces regressions and keeps implementation aligned with workflow acceptance.
- **Alternatives considered:** Implement-first then test.
- **Consequences / trade-offs:** More upfront planning effort; stronger confidence and traceability.
- **Affected areas:** phase process, PR cadence, test authoring order.
- **Status:** Accepted.

### DEC-005 — Playwright + Vitest + smoke strategy

- **Decision:** Use Playwright for E2E, Vitest for service/API/domain rules, and smoke checks for boot/routes/seed/demo context reliability.
- **Rationale:** Covers user journeys, backend rules, and environment readiness.
- **Alternatives considered:** E2E-only testing; service-only testing.
- **Consequences / trade-offs:** Broader coverage with added maintenance effort.
- **Affected areas:** `e2e/`, `tests/`, CI/local validation commands.
- **Status:** Accepted.

### DEC-006 — Prisma + SQLite local demo persistence

- **Decision:** Use Prisma ORM with SQLite for local development and demo persistence in Iteration 3.
- **Rationale:** Deterministic and low-friction setup appropriate for MVP scope.
- **Alternatives considered:** External managed DB; in-memory/mock persistence.
- **Consequences / trade-offs:** Fast onboarding and reproducibility; not production scale target.
- **Affected areas:** schema, migrations, local setup scripts.
- **Status:** Accepted.

### DEC-007 — Deterministic seed strategy

- **Decision:** Seed data must be deterministic and cover institutional, social, moderation, and map demo scenarios.
- **Rationale:** Required for reliable demo and reproducible tests.
- **Alternatives considered:** Randomized or minimal seed data.
- **Consequences / trade-offs:** More initial seed design effort; stable demos and test consistency.
- **Affected areas:** prisma seed scripts, smoke tests, E2E fixtures.
- **Status:** Accepted.

### DEC-008 — Demo-only identity with server-readable demo context

- **Decision:** Identity in this iteration is explicitly demo-only and resolved server-side using a server-readable demo cookie or explicit server-readable demo context helper.
- **Rationale:** Honest representation of MVP auth constraints while enabling backend-enforced role flows.
- **Alternatives considered:** Production-like auth implementation now; localStorage-only identity.
- **Consequences / trade-offs:** Clear demo semantics; avoids misleading auth claims.
- **Affected areas:** context resolver, API guards, shell role switcher, copy.
- **Status:** Accepted.

### DEC-009 — localStorage is UI convenience only

- **Decision:** localStorage cannot be the authoritative identity mechanism; it may be used only for UI convenience.
- **Rationale:** localStorage is not server-readable and cannot support backend identity enforcement.
- **Alternatives considered:** localStorage-only role context.
- **Consequences / trade-offs:** Requires server-readable mechanism in addition to optional local UI memory.
- **Affected areas:** demo context design, API identity resolution.
- **Status:** Accepted.

### DEC-010 — Figma/frontend-concept are visual references only

- **Decision:** `figma/frontend-concept` is used for visual and UX guidance only; its Vite stack/structure is not copied into implementation.
- **Rationale:** Required by project governance and stack constraints.
- **Alternatives considered:** Direct reuse of frontend-concept project structure.
- **Consequences / trade-offs:** Requires reinterpretation into Next.js; preserves approved stack.
- **Affected areas:** design system, UI implementation planning.
- **Status:** Accepted.

### DEC-011 — Human-friendly language and low-click UX are enforced rules

- **Decision:** UI wording must avoid technical/internal jargon and key actions should be reachable with minimal reasonable clicks.
- **Rationale:** Improves comprehension and demo quality for students/coordinators/admins.
- **Alternatives considered:** Engineering-centric labels and deeper navigation chains.
- **Consequences / trade-offs:** Additional UX review effort; better usability and presentation quality.
- **Affected areas:** copywriting, dashboard/action layouts, manual UX checks.
- **Status:** Accepted.

### DEC-012 — Traceability matrix update rule is mandatory

- **Decision:** `TRACEABILITY_TEST_MATRIX.md` must be updated whenever tests are planned, added, changed, deferred, or removed.
- **Rationale:** Keeps explicit link between requirements/workflows and verification.
- **Alternatives considered:** Informal or ad-hoc test tracking.
- **Consequences / trade-offs:** Documentation overhead; much stronger auditability.
- **Affected areas:** testing workflow, phase completion checks.
- **Status:** Accepted.

### DEC-013 — Conventional Commits are required

- **Decision:** All commits must use Conventional Commit format.
- **Rationale:** Improves history clarity and reviewability.
- **Alternatives considered:** Free-form commit messages.
- **Consequences / trade-offs:** Requires discipline; clearer project history.
- **Affected areas:** git workflow, release/change review.
- **Status:** Accepted.

---

## 3. Pending future decisions

- Final Prisma schema detail and migration strategy.
- Map provider/package final selection for local demo use.
- Optional production-auth roadmap beyond demo identity.
- Deployment and runtime strategy after MVP completeness.

---

## 4. Working rule

A major phase is not considered complete unless relevant new decisions are recorded here with rationale and trade-offs.
