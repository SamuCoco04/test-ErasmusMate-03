# ErasmusMate — AGENTS.md

## Project identity

ErasmusMate is a full-stack MVP for Erasmus mobility management.

The product has two clearly separated layers:

1. **Institutional core**
   - official Erasmus mobility procedures
   - mobility records
   - submissions
   - deadlines
   - exception requests
   - coordinator review
   - Learning Agreement / course equivalences
   - auditability and traceability

2. **Social-support layer**
   - student discovery
   - connections
   - accepted-only messaging
   - recommendations / tips / reviews
   - favorites
   - moderation / reporting
   - map-based social discovery

The institutional core is primary.
The social layer is secondary and must remain clearly separated.

This iteration must produce a backend-backed, frontend-complete, locally runnable MVP that feels like a product that could be shown to a tutor, client, or potential buyer.

---

## Repository starting point

The repository starts almost empty.

Expected initial contents:

- `README.md`
- `AGENTS.md`
- `PLAN.md`
- `DECISIONS.md`
- `TEST_STRATEGY.md`
- `TRACEABILITY_TEST_MATRIX.md`
- `/artifacts`
- `/figma`
- `/figma/frontend-concept`

Do not assume an existing implementation unless files are actually present.

---

## Source of truth priority

Use the following source priority:

1. `AGENTS.md`
2. `PLAN.md`
3. `TEST_STRATEGY.md`
4. `TRACEABILITY_TEST_MATRIX.md`
5. `DECISIONS.md`
6. `/artifacts`
7. `/figma`
8. `/figma/frontend-concept`

If there is conflict:

- requirements, business rules, workflows, and domain artifacts define functional scope
- Figma and frontend-concept define visual/product direction
- `PLAN.md` defines the current iteration execution strategy
- `DECISIONS.md` records why choices were made

Do not invent product scope when the artifacts are unclear. Make the safest reasonable decision, keep it inside ErasmusMate’s approved scope, and document it in `DECISIONS.md`.

---

## Figma and frontend-concept usage

The `/figma` folder contains screenshots and visual references.

The `/figma/frontend-concept` folder may contain a Vite/React design prototype, CSS, components, and theme files.

Important:

- Treat `/figma/frontend-concept` as **visual and UX reference only**.
- Do not treat it as the target implementation stack.
- Do not copy the Vite project structure into the final implementation.
- Do not place Vite, index.html, or frontend-concept package setup at the project root.
- Extract design language, layout, hierarchy, components, navigation patterns, spacing, card structure, badges, tables, colors, and UX behavior.
- Final implementation must follow the approved stack in this file.

Not every screen has exported CSS or a direct frontend-concept equivalent.  
When CSS or component reference is missing, infer the design from:

- available Figma screenshots
- frontend-concept components
- `DESIGN_SYSTEM.md`
- theme CSS files
- neighboring screens
- existing student/coordinator/admin/social patterns

Do not create a different visual style for missing screens.

---

## Required stack

The base stack is fixed unless there is a strong documented reason to change it.

Use:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui-style components
- React Hook Form
- Zod
- Prisma
- SQLite for local development/demo
- Playwright for E2E tests
- Vitest for service/API/domain tests where useful

Backend must live inside the same Next.js repository using route handlers and service/domain modules.

Do not leave backend work until the end.

---

## Architecture expectations

Use a full-stack architecture with clear boundaries.

Recommended structure:

- `app/` for routes, layouts, pages, and API route handlers
- `src/modules/institutional/*`
- `src/modules/social/*`
- `src/modules/shared/*`
- `src/components/*`
- `src/lib/*`
- `prisma/*`
- `tests/*`
- `e2e/*`

Route handlers should be thin transport layers.

Core workflow logic should live in service/domain modules.

Use backend-enforced rules for:

- permissions
- role access
- ownership checks
- state transitions
- moderation visibility
- consent/contactability
- deadline blocking
- resubmission guards
- audit/event creation

Do not enforce important rules only in frontend state.

---

## Workflow-driven implementation

Implement by workflow, not by screen alone.

Main workflows to preserve or implement:

### Institutional
- student dashboard / mobility overview
- document submission workflow
- coordinator review / approve / reject / reopen
- deadlines
- exception requests
- Learning Agreement / course equivalences
- Academic Summary in My Mobility Record
- audit trail

### Social
- social profile
- discovery
- connection lifecycle
- accepted-only messaging
- recommendations / tips / reviews
- favorites
- reporting
- moderation queue / actions
- map-based discovery

Each meaningful workflow must have:

- backend persistence
- state transitions
- validation
- role guards
- UI journey
- at least one E2E or service/API test where appropriate
- traceability entry in `TRACEABILITY_TEST_MATRIX.md`

---

## Test-first / acceptance-first rule

Before implementing major functionality, create or update tests.

This project follows a test-first or acceptance-first approach.

Required testing layers:

1. **E2E tests**
   - use Playwright
   - cover main user workflows
   - verify real UI journeys

2. **Service/API/domain tests**
   - use Vitest where practical
   - cover state transitions, guards, validation, and backend rules

3. **Smoke tests**
   - app boots
   - main routes load
   - seed works
   - no critical 500 errors
   - role/demo context works

It is acceptable for newly added tests to fail initially if the implementation does not exist yet.  
However, no phase is complete until relevant tests pass or the failure is explicitly documented as deferred.

---

## Traceability matrix rule

Maintain `TRACEABILITY_TEST_MATRIX.md`.

Every major test should be linked to:

- workflow ID or workflow name
- requirement / business rule if available
- actor
- test type
- scenario
- expected result
- current status

When adding or changing features, update the traceability matrix.

No major workflow phase is complete unless its tests are represented in the traceability matrix.

---

## Decisions ledger rule

Maintain `DECISIONS.md`.

Every meaningful technical, architectural, workflow, testing, or UX/product decision must be recorded.

For each decision, include:

- decision
- rationale
- consequences / trade-offs
- status
- evidence level when relevant

Examples of decisions that must be recorded:

- stack changes
- database modeling choices
- backend architecture changes
- testing strategy changes
- map integration decisions
- UI/UX conventions
- workflow semantics
- deferred complexity
- rejected alternatives

Do not wait until the end of the project to document decisions.

A phase is not complete until `DECISIONS.md` is updated with the decisions made during that phase.

---

## Conventional commits

Use Conventional Commits for every commit.

Examples:

- `feat(institutional): add student submission workflow`
- `feat(learning-agreement): add row-level coordinator review`
- `fix(navigation): preserve demo context across shell links`
- `test(e2e): add coordinator review workflow scenario`
- `docs(decisions): record map integration decision`
- `refactor(ui): extract status badge component`
- `style(shell): align dashboard cards with figma reference`

Keep commits focused and reviewable.

---

## UX and product quality rules

This iteration must improve product quality, not just generate screens.

The interface must be:

- understandable
- human-friendly
- demo-ready
- close to the Figma/mockup direction
- efficient to use
- visually coherent

### Language rule

Avoid technical or uncommon UI words.

Do not use implementation vocabulary in the UI.

Avoid terms such as:

- backend-visible
- workflow artifact
- policy-aware
- moderation-limited state
- mobility context
- apply transition
- governance surface
- domain object
- route handler
- persisted entity

Prefer simple user-facing language:

- Visible recommendations
- Learning Agreement
- Hidden after reports
- Mark as reviewed
- Erasmus stay
- Request change
- Review queue
- Pending approval
- Needs correction

Students and coordinators should understand the interface without knowing software engineering vocabulary.

### Click-efficiency rule

Main actions should require the fewest reasonable clicks.

Examples:

- student should reach the next pending task quickly from dashboard
- coordinator should open review items directly from dashboard or queue
- approve/reject should be possible from the review detail without extra navigation
- denied Learning Agreement rows should be easy to find and revise
- message threads should open directly from accepted connections
- map browsing should combine filters, list, preview, and detail actions coherently

Do not add unnecessary intermediate screens.

---

## Visual design expectations

Use Figma and frontend-concept as the visual baseline.

Prioritize:

- stronger dashboards
- clear side navigation
- clear top navigation
- cards with hierarchy
- status badges
- tables with readable density
- forms with clear validation
- consistent buttons and actions
- clear empty/loading/error/success states
- polished Learning Agreement and Academic Summary
- coordinator/admin productivity
- social IA coherence
- map + list + preview interaction

Design missing screens by matching the style of existing Figma references.

Do not produce a plain scaffold look if visual references exist.

---

## Demo context / authentication expectation

A production-grade authentication system is not required unless explicitly planned.

However, demo identity and role switching must be reliable and honest.

If the app uses demo users, seeded users, query params, local storage, or role switchers:

- navigation must preserve the active demo context
- the UI must not imply stronger auth than exists
- demo journeys must be deterministic
- role switching must not break workflows
- social pages should remain student-scoped unless intentionally designed otherwise

If demo identity mechanics are simplified, document the decision in `DECISIONS.md`.

---

## Backend and data rules

Use real backend persistence for MVP workflows.

Do not implement major flows as frontend-only mocks.

Use Prisma + SQLite for local demo unless changed by documented decision.

Seed data must be deterministic and demo-ready.

Seed scenarios should cover:

- student
- coordinator
- administrator
- institutional workflows
- social workflows
- moderation
- map discovery
- Learning Agreement

Avoid destructive or confusing seed behavior unless clearly documented.

---

## Map requirement

The map must be real, not a static placeholder.

Use a maintainable map integration suitable for local demo use.

Requirements:

- real map rendering
- real markers from backend-backed data
- filterable results
- marker preview
- detail navigation
- report action from map flow
- moderation and visibility filtering server-side

Do not implement:

- route planning
- live user tracking
- exposure of private addresses
- generic tourism behavior unrelated to Erasmus support

---

## Institutional/social separation

Keep institutional and social areas separate.

Institutional core includes:

- official mobility processing
- deadlines
- submissions
- reviews
- exceptions
- Learning Agreement
- auditability

Social support includes:

- discovery
- connections
- messaging
- recommendations
- reviews
- favorites
- map
- reports
- moderation

Do not mix official procedure navigation with social discovery/search.

Do not let social functionality distort official mobility workflow semantics.

---

## Learning Agreement rules

Learning Agreement is a structured institutional workflow for course equivalences.

It is not a generic document upload.

Core expectations:

- table-first workflow
- home course code/name
- destination course code/name
- ECTS
- semester
- grade optional and coordinator-controlled only
- row-level review
- partial approval
- denied rows require revision before resubmission
- approved rows are not silently mutable
- approved-row edits must create reviewable revisions
- Academic Summary is read-only and derived from approved latest rows unless a documented decision introduces snapshots

Student must not edit grade.

Coordinator may enter or update grade only where the workflow allows.

Grade must not govern initial approval unless a future explicit decision changes that.

---

## Review and validation workflow

After each implementation phase:

1. run local validation commands
2. review the diff against scope
3. fix blocking issues
4. update tests
5. update `TRACEABILITY_TEST_MATRIX.md`
6. update `DECISIONS.md`
7. summarize what changed
8. use Conventional Commit format

Recommended validation commands may include:

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
