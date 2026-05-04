# ErasmusMate — PLAN.md

## Iteration 3 accepted execution plan (documentation baseline)

This file defines the accepted pre-implementation execution plan for Iteration 3. It is planning-only and does not imply that application scaffolding or feature implementation has started.

---

## 1) Architecture proposal

ErasmusMate will be implemented as a **single Next.js full-stack repository** with explicit institutional/social boundaries.

Planned top-level structure:

- `app/` — pages/layouts and API route handlers (transport only)
- `src/modules/institutional/*` — institutional domain workflows
- `src/modules/social/*` — social-support workflows
- `src/modules/shared/*` — shared primitives (errors, audit helpers, demo context resolver, shared types)
- `src/components/*` — reusable UI components
- `src/lib/*` — infra helpers (Prisma client, config, utility)
- `prisma/*` — schema, migrations, seed
- `tests/*` — Vitest/service/API/smoke
- `e2e/*` — Playwright

Institutional core remains primary. Social support remains secondary and clearly separated.

---

## 2) Architecture pattern rule (complexity-based)

For complex workflows (submissions, exceptions, Learning Agreement, moderation, map visibility), use layered modules:

- domain
- service
- repository
- policy/guard
- validator
- mapper

For small/simple modules, a lighter structure is allowed when more maintainable (for example route+service or service+repository).

Do not overengineer small modules.

---

## 3) Frontend structure and UX direction

Planned route grouping:

- `app/(institutional)/student/*`
- `app/(institutional)/coordinator/*`
- `app/(institutional)/admin/*`
- `app/(social)/student/*`
- `app/(shared)/*`

UX expectations:

- human-friendly UI language
- low-click paths for common actions
- institutional workflows visually/functionally primary
- social workflows clearly secondary

---

## 4) Backend module structure

Institutional modules:

- mobility overview/dashboard
- procedures and submissions
- deadlines
- exceptions
- Learning Agreement
- Academic Summary
- audit trail/events

Social modules:

- profile/discovery
- connections
- accepted-only messaging
- recommendations/tips/reviews
- favorites
- reporting/moderation
- map discovery

Shared backend support:

- demo context resolution helper
- role/ownership guards
- standardized API error mapping

---

## 5) API route organization

Planned organization under `app/api/`:

- `demo-context/*`
- `institutional/*` (dashboard, submissions, deadlines, exceptions, learning-agreement, summary)
- `social/*` (discovery, connections, messages, content, favorites, map, reports)
- `admin/moderation/*`

Route handlers remain thin:

1. parse and validate request (Zod)
2. resolve demo actor/role from server-readable demo context
3. call service/domain logic
4. map service result to API response

---

## 6) Prisma + SQLite strategy

- Prisma ORM with SQLite for local MVP/demo persistence.
- Schema models will encode workflow states, permissions boundaries, and auditability.
- Revision/history support required where workflow semantics demand immutability/reviewability.
- Constraints and indexes should support ownership checks, role-scoped queries, and dashboard/use-case reads.

---

## 7) Deterministic seed strategy

Seed data must be deterministic and demo-ready, including:

- student/coordinator/admin users
- institutional scenarios (pending/rejected/approved/reopened/resubmitted)
- Learning Agreement mixed row outcomes and revision scenarios
- social profile visibility and contactability scenarios
- connections/messaging eligibility states
- moderation queue scenarios
- map-backed content with moderated visibility examples

---

## 8) Demo identity / role switching strategy (demo-only)

Identity for Iteration 3 is explicitly **demo-only**, not production authentication.

- Preferred mechanism: **server-readable demo cookie** or explicit server-readable demo context helper.
- API/server identity resolution must rely on server-readable demo context.
- A visible “Demo mode” indicator should be present in the UI.

Important clarification:

- `localStorage` alone is **not server-readable**.
- `localStorage` may be used only for UI convenience, not as the source of server/API identity.

---

## 9) Design-system strategy from Figma/frontend-concept

Figma screenshots and `figma/frontend-concept` are **visual/UX references only**.

- Do not copy the Vite project structure into production implementation.
- Build a Next.js-native design system using Tailwind + shadcn-style components.
- Align tokens, hierarchy, cards, badges, table/form density, and state feedback with the references.
- Infer missing screens using existing design direction and notes, without changing style family.

---

## 10) Test-first / acceptance-first strategy

For major workflow slices:

1. update traceability entries first (planned)
2. create/adjust service/API tests (Vitest)
3. create/adjust E2E tests (Playwright)
4. implement backend workflow logic
5. implement UI journey
6. move tests to passing (or document deferral)
7. record decisions in `DECISIONS.md`

---

## 11) Testing phases (E2E / service / smoke)

- Foundation testing: Playwright/Vitest/smoke baseline
- Institutional testing: submissions/reviews/deadlines/exceptions
- Learning Agreement testing: row-level decisions/revisions/grade permissions/summary
- Social testing: discovery/connections/accepted-only messaging/content/favorites
- Moderation + map testing: reporting/actions/visibility filtering/map flows
- Final hardening: regression + demo journeys

---

## 12) Traceability matrix update process

Maintain `TRACEABILITY_TEST_MATRIX.md` continuously:

- update planned rows before/with test creation
- keep test IDs, workflow links, actor, type, scenario, expected result, status current
- use explicit status progression (Planned → Implemented-expected-failing → Implemented-passing)
- do not close a major phase with missing traceability for its tests

---

## 13) Decisions ledger update process

At each phase boundary, update `DECISIONS.md` with meaningful decisions and trade-offs, including:

- architecture/module boundary choices
- demo identity mechanics
- testing structure changes
- design-system and UX conventions
- deferred complexity and rationale

---

## 14) Conventional commit strategy

All generated commits must follow Conventional Commits.

Examples:

- `docs(plan): finalize iteration 3 execution plan`
- `test(foundation): add playwright vitest and smoke harness`
- `feat(institutional): implement submission workflow transitions`
- `docs(decisions): record demo-only identity strategy`

---

## 15) Revised implementation phases (ordering)

### Phase 0 — Planning and architecture finalization (no implementation)

- finalize architecture/module boundaries
- finalize design-system strategy
- update initial `DECISIONS.md`
- accept final execution plan

### Phase 1 — Testing foundation first

- Playwright baseline
- Vitest baseline
- smoke baseline
- traceability baseline updates

### Phase 2 — App foundation implementation

- Next.js scaffold
- Prisma/SQLite setup
- deterministic seed
- demo context mechanism
- shell/navigation foundation
- baseline UI primitives

### Phase 3 — Institutional core MVP

- dashboards, submissions, reviews, deadlines, exceptions
- backend-enforced guards/transitions/audit
- associated E2E + service/API tests

### Phase 4 — Learning Agreement + Academic Summary

- table-first LA workflow
- row-level review and safe revision logic
- coordinator-only grade ownership
- derived Academic Summary
- associated tests

### Phase 5 — Social support MVP

- discovery/profile
- connection lifecycle
- accepted-only messaging
- recommendations/tips/reviews + favorites
- associated tests

### Phase 6 — Moderation + map-based discovery

- reporting/moderation workflow
- real map with backend markers/filters/preview/detail/report
- server-side moderation/visibility filtering
- associated tests

### Phase 7 — UX/visual refinement + demo hardening

- Figma alignment pass
- language simplification and click-efficiency pass
- regression stabilization

---

## 16) Validation commands per phase

Recommended validation commands:

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run db:seed
npm run lint
npm run build
npm run test
npx playwright test
npm run dev
```

Use targeted checks per phase and full checks at milestones.

---

## 17) Definition of done per phase

A phase is complete only when:

1. phase scope is met
2. backend rules/persistence are in place (implementation phases)
3. required tests are created/updated and statuses are clear
4. smoke checks are passing or explicitly deferred
5. traceability matrix is updated
6. decisions ledger is updated
7. UI language remains human-friendly
8. key actions remain low-click
9. institutional/social separation remains clear
10. commits follow Conventional Commit format

---

## 18) Pre-coding documentation gate

Before coding starts:

- this accepted plan is present in `PLAN.md`
- `DECISIONS.md` records selected architecture, demo identity strategy, testing structure, and design-system approach

No application implementation should begin until this documentation gate is satisfied.
