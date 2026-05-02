# ErasmusMate — DECISIONS.md

## Purpose

This file records meaningful technical, architectural, workflow, testing, and UX/product decisions made during the ErasmusMate implementation.

It must be updated continuously during the project.

A phase is not considered complete until the decisions made during that phase are recorded here.

---

# 1. Decision record format

Each decision should follow this structure:

## DEC-XXX — Decision title

- **Date:** YYYY-MM-DD
- **Phase:** Phase name or task name
- **Status:** active | deferred | replaced | rejected
- **Evidence level:** confirmed | inferred from implementation | planned

### Decision

Describe the decision clearly.

### Rationale

Explain why this decision was made.

### Alternatives considered

List alternatives if relevant.

### Consequences / trade-offs

Explain the benefits, drawbacks, and implications.

### Affected areas

Mention files, modules, workflows, or UI areas affected if useful.

---

# 2. Initial project decisions

## DEC-001 — ErasmusMate will be implemented as a full-stack MVP

- **Date:** 2026-05-02
- **Phase:** Repository preparation
- **Status:** active
- **Evidence level:** confirmed

### Decision

ErasmusMate will be implemented as a full-stack MVP with both frontend and backend functionality.

The product must be locally runnable and suitable for demonstration to a tutor, client, or potential buyer.

### Rationale

Previous iterations showed that a frontend-only implementation creates static screens and weak demo value. The project needs real workflows, persistence, and role-based behavior.

### Alternatives considered

- Frontend-only prototype.
- Backend-only technical prototype.
- Full-stack MVP.

The full-stack MVP approach was selected.

### Consequences / trade-offs

- Better demo credibility.
- More implementation complexity.
- Requires database, seed data, API routes, workflow logic, and tests.
- Reduces risk of decorative screens with no real behavior.

### Affected areas

- Frontend
- Backend
- Database
- Tests
- Repository structure
- Demo workflow

---

## DEC-002 — Institutional core remains primary and social support remains secondary

- **Date:** 2026-05-02
- **Phase:** Repository preparation
- **Status:** active
- **Evidence level:** confirmed

### Decision

The product will maintain two clearly separated layers:

1. Institutional core.
2. Social-support layer.

The institutional core remains the primary product area.

### Rationale

The main value of ErasmusMate is official Erasmus mobility management. Social features add value, but must not distort official procedures or create confusion with institutional workflows.

### Alternatives considered

- Fully integrated institutional/social navigation.
- Social-first Erasmus platform.
- Institutional-first platform with secondary social support.

The institutional-first model was selected.

### Consequences / trade-offs

- Clearer product identity.
- Better alignment with official mobility workflows.
- Social functionality must remain scoped and separated.
- Requires careful navigation and information architecture.

### Affected areas

- Navigation
- App shells
- Permissions
- Search/discovery
- Social features
- Institutional workflows
- UI hierarchy

---

## DEC-003 — Codex must make architecture and pattern decisions, but must document them

- **Date:** 2026-05-02
- **Phase:** Repository preparation
- **Status:** active
- **Evidence level:** confirmed

### Decision

Codex is allowed and expected to make architecture, design-pattern, module-structure, testing, and UI-system decisions when implementing the project.

However, meaningful decisions must be recorded in this file.

### Rationale

The project is complex enough that Codex must be able to choose maintainable solutions instead of asking for approval on every low-level implementation detail.

At the same time, previous iterations showed that undocumented decisions make the project harder to review, explain, and continue.

### Alternatives considered

- User manually defines every architecture choice.
- Codex decides freely without documentation.
- Codex decides within constraints and records decisions.

The third option was selected.

### Consequences / trade-offs

- Faster implementation.
- Better continuity across phases.
- Better evidence for TFG explanation.
- Requires discipline updating this file.
- Decisions become traceable for future review.

### Affected areas

- Architecture
- Backend
- Frontend
- Testing
- UI system
- Database
- Workflow implementation
- Documentation

---

## DEC-004 — Test-first / acceptance-first process

- **Date:** 2026-05-02
- **Phase:** Repository preparation
- **Status:** active
- **Evidence level:** confirmed

### Decision

Tests should be created before or alongside major implementation work.

The project will use an acceptance-first approach for key workflows.

### Rationale

Previous iterations relied too much on manual checking. The new iteration should avoid regressions and ensure that workflows remain functional as the product grows.

### Alternatives considered

- Manual testing only.
- Add tests after all implementation.
- Create tests before or alongside implementation.

The third option was selected.

### Consequences / trade-offs

- Stronger confidence in workflows.
- Better traceability.
- Some tests may initially fail before implementation exists.
- Requires test maintenance throughout the project.
- May slow early development but improves reliability.

### Affected areas

- Playwright E2E tests
- Vitest service/API tests
- Smoke tests
- Traceability matrix
- Workflow validation
- Pull request review

---

## DEC-005 — Use a traceability matrix for tests

- **Date:** 2026-05-02
- **Phase:** Repository preparation
- **Status:** active
- **Evidence level:** confirmed

### Decision

The project will maintain `TRACEABILITY_TEST_MATRIX.md` to link tests with workflows, requirements, business rules, actors, and expected results.

### Rationale

The project is part of a TFG and needs clear evidence that requirements and workflows are being validated. A traceability matrix makes the connection between artifacts and implementation explicit.

### Alternatives considered

- No traceability matrix.
- Informal test list.
- Formal traceability matrix.

The formal traceability matrix was selected.

### Consequences / trade-offs

- Stronger academic and engineering traceability.
- Better validation discipline.
- Easier to explain testing decisions in the final report.
- Requires updates whenever tests or workflows change.

### Affected areas

- Tests
- Requirements
- Workflows
- Documentation
- Final TFG evidence
- Review process

---

## DEC-006 — Use Conventional Commits

- **Date:** 2026-05-02
- **Phase:** Repository preparation
- **Status:** active
- **Evidence level:** confirmed

### Decision

All commits should follow the Conventional Commits format.

Examples:

- `feat(institutional): add student dashboard workflow`
- `fix(navigation): preserve demo context across shell links`
- `test(e2e): add coordinator review scenario`
- `docs(decisions): record Prisma SQLite decision`
- `refactor(ui): extract dashboard card component`
- `style(shell): align dashboard cards with Figma reference`

### Rationale

Conventional Commits make the repository easier to review, understand, and present. They also help separate features, fixes, tests, documentation, and refactors.

### Alternatives considered

- Free-form commit messages.
- Conventional Commits.

Conventional Commits were selected.

### Consequences / trade-offs

- Cleaner Git history.
- Easier review and changelog reconstruction.
- Better visibility of implementation phases.
- Requires Codex and the developer to keep commits focused.

### Affected areas

- Git history
- Pull requests
- Code review
- Project documentation

---

## DEC-007 — UI must use human-friendly language

- **Date:** 2026-05-02
- **Phase:** Repository preparation
- **Status:** active
- **Evidence level:** confirmed

### Decision

The interface must avoid overly technical or uncommon wording.

User-facing copy should be understandable by students, coordinators, and administrators without software engineering knowledge.

### Rationale

Previous generated interfaces used technical phrases that reduce usability and make the product feel less human. The project should feel like a real Erasmus product, not an internal engineering tool.

### Alternatives considered

- Technical/internal vocabulary.
- Simple user-facing vocabulary.

Simple user-facing vocabulary was selected.

### Consequences / trade-offs

- Better usability.
- Better product feel.
- Better presentation value.
- Requires reviewing generated UI copy carefully.
- Some technical precision may need to move into documentation rather than UI.

### Affected areas

- Buttons
- Page titles
- Empty states
- Error messages
- Dashboard cards
- Workflow descriptions
- Social pages
- Moderation pages
- Coordinator/admin screens

---

## DEC-008 — Main user actions should require the fewest reasonable clicks

- **Date:** 2026-05-02
- **Phase:** Repository preparation
- **Status:** active
- **Evidence level:** confirmed

### Decision

The product should reduce unnecessary navigation and keep common actions close to the user’s current context.

### Rationale

Previous iterations sometimes required extra clicks or awkward navigation. A product that can be shown or sold must make common actions obvious and efficient.

### Alternatives considered

- Page-heavy navigation with many intermediate screens.
- Contextual, task-focused navigation.

Task-focused navigation was selected.

### Consequences / trade-offs

- Better usability.
- More polished demo experience.
- Requires stronger page composition and action placement.
- Some screens may need richer detail panels or inline actions.
- More care is needed to avoid clutter.

### Affected areas

- Student dashboard
- Coordinator dashboard
- Review queues
- Learning Agreement
- Messaging
- Map
- Admin moderation
- Social discovery

---

## DEC-009 — Figma and frontend-concept are visual references, not the target stack

- **Date:** 2026-05-02
- **Phase:** Repository preparation
- **Status:** active
- **Evidence level:** confirmed

### Decision

The files under `figma/` and `figma/frontend-concept/` must be used as visual and UX references only.

They must not define the target implementation stack.

### Rationale

The frontend concept may come from a Vite/React prototype, while the final implementation is expected to be a full-stack Next.js application. Copying the concept app structure directly could confuse the architecture.

### Alternatives considered

- Copy frontend-concept directly into root.
- Ignore frontend-concept.
- Use frontend-concept as visual reference only.

The third option was selected.

### Consequences / trade-offs

- Preserves architectural consistency.
- Still uses valuable visual assets and components as inspiration.
- Codex must infer missing screens from available design patterns.
- Requires explicit guidance in `AGENTS.md` and `figma/design-notes.md`.

### Affected areas

- UI implementation
- Design system
- Repository structure
- Figma reference usage
- Component planning

---

## DEC-010 — Learning Agreement must be a structured institutional workflow

- **Date:** 2026-05-02
- **Phase:** Repository preparation
- **Status:** active
- **Evidence level:** confirmed

### Decision

Learning Agreement / course equivalence management must be implemented as a structured institutional workflow, not as a generic document upload.

### Rationale

The Learning Agreement is central to Erasmus mobility and benefits from row-level equivalence review, partial approval, resubmission, and academic summary generation.

### Alternatives considered

- Treat Learning Agreement as a normal uploaded document.
- Implement a structured table-first workflow.

The structured workflow was selected.

### Consequences / trade-offs

- More realistic institutional behavior.
- Better UX for academic equivalence review.
- More complex data model and workflow rules.
- Requires coordinator row-level review and auditability.
- Requires dedicated tests.

### Affected areas

- Institutional core
- Student workflow
- Coordinator workflow
- My Mobility Record
- Academic Summary
- Tests
- Database
- Traceability matrix

---

## DEC-011 — Grade is coordinator-controlled and non-governing for initial Learning Agreement approval

- **Date:** 2026-05-02
- **Phase:** Repository preparation
- **Status:** active
- **Evidence level:** confirmed

### Decision

Students must not edit grade values in the Learning Agreement.

Grade may exist as an optional field, but it must be controlled by the coordinator and must not govern initial Learning Agreement approval.

### Rationale

Grade belongs to a later academic recognition stage, not to the initial course-equivalence proposal. Allowing students to edit grades would be conceptually incorrect.

### Alternatives considered

- Let students enter grades.
- Remove grade entirely.
- Keep grade optional and coordinator-controlled.

The third option was selected.

### Consequences / trade-offs

- Avoids mixing planning equivalences with final recognition outcomes.
- Leaves room for future grade lifecycle.
- Requires role-specific form behavior.
- Requires tests to prevent student-side grade editing.

### Affected areas

- Learning Agreement forms
- Coordinator review
- Academic Summary
- Validation
- Permissions
- E2E tests
- Service/API tests

---

## DEC-012 — Backend must not be postponed until the end

- **Date:** 2026-05-02
- **Phase:** Repository preparation
- **Status:** active
- **Evidence level:** confirmed

### Decision

Backend implementation must be developed alongside frontend workflows.

Major flows must not be left as frontend-only screens with later backend integration.

### Rationale

Previous iterations showed that delaying backend work led to static screens, poor persistence, weak workflow behavior, and rework. The MVP must demonstrate real data and real state transitions.

### Alternatives considered

- Frontend-first implementation, backend later.
- Backend-first implementation, frontend later.
- Vertical-slice implementation with frontend and backend together.

The vertical-slice approach was selected.

### Consequences / trade-offs

- More reliable product behavior.
- Less rework.
- Better testability.
- Requires more careful phase planning.
- Each workflow takes longer but becomes more complete.

### Affected areas

- API routes
- Services
- Prisma schema
- Seed data
- E2E tests
- UI flows

---

## DEC-013 — Tests must be created before or alongside implementation

- **Date:** 2026-05-02
- **Phase:** Repository preparation
- **Status:** active
- **Evidence level:** confirmed

### Decision

For every major workflow, tests should be created before or alongside implementation.

Some tests may be initially failing if the feature is not implemented yet.

### Rationale

The new iteration aims to avoid the lack of test coverage from previous work. Test-first or acceptance-first development makes Codex’s output easier to validate.

### Alternatives considered

- Add tests after finishing all implementation.
- Manual testing only.
- Create tests before or alongside implementation.

The third option was selected.

### Consequences / trade-offs

- Better reliability.
- Clearer definition of done.
- Easier regression detection.
- More initial setup work.
- Some failing tests must be intentionally documented.

### Affected areas

- Playwright
- Vitest
- Traceability matrix
- Pull request validation
- README validation instructions

---

## DEC-014 — Demo identity can be simplified but must be reliable and honest

- **Date:** 2026-05-02
- **Phase:** Repository preparation
- **Status:** active
- **Evidence level:** confirmed

### Decision

A production-grade authentication system is not required initially, but demo identity and role switching must be reliable and honest.

If the app uses demo users, query params, local storage, cookies, or a role switcher, the mechanism must preserve context across navigation and must not imply stronger authentication than actually exists.

### Rationale

Previous iterations had issues where query-param identity or role context could be dropped, making demos fragile. A polished MVP needs predictable demo navigation.

### Alternatives considered

- Full production authentication from the start.
- Hardcoded users without visible switching.
- Simplified demo context with reliable navigation.

The third option was selected.

### Consequences / trade-offs

- Faster MVP delivery.
- More reliable demos.
- Not production-grade security.
- Requires clear documentation and tests.

### Affected areas

- Navigation
- App shell
- Social shell
- Demo role switcher
- E2E tests
- README setup/demo instructions

---

## DEC-015 — The map must be real and backend-backed

- **Date:** 2026-05-02
- **Phase:** Repository preparation
- **Status:** active
- **Evidence level:** confirmed

### Decision

Map-based discovery must use a real map and backend-backed data.

The map must not be a static placeholder.

### Rationale

The map is one of the differentiating social-support features. A static placeholder would reduce demo credibility and would not validate visibility/moderation filtering.

### Alternatives considered

- Static map mockup.
- Frontend-only hardcoded markers.
- Real map with backend-backed marker data.

The third option was selected.

### Consequences / trade-offs

- Stronger demo value.
- Requires map library integration.
- Requires map-specific visibility/filter tests.
- Must avoid unsafe private-location behavior.

### Affected areas

- Social map page
- Backend map endpoint
- Place/context model
- Moderation visibility filtering
- E2E map tests
- Service/API map tests

---

# 3. Pending future decisions

These decisions must be made by Codex during planning or implementation and then recorded here.

## Pending — Final frontend architecture

To be decided:

- app route structure
- shell structure
- component hierarchy
- layout patterns
- state management conventions
- design-system implementation

## Pending — Backend module boundaries

To be decided:

- institutional modules
- social modules
- shared modules
- service/domain/repository conventions
- API/service separation

## Pending — API route organization

To be decided:

- route grouping
- input validation style
- error handling conventions
- response DTO conventions
- role/context handling

## Pending — Database model details

To be decided:

- Prisma schema structure
- table naming
- index strategy
- seed strategy
- migration strategy
- SQLite constraints and limitations

## Pending — Testing structure

To be decided:

- Playwright folder structure
- Vitest folder structure
- test data strategy
- smoke test approach
- traceability update process

## Pending — UI system conventions

To be decided:

- card pattern
- badge pattern
- table pattern
- form pattern
- dashboard pattern
- shell layout pattern
- empty/loading/error/success pattern

## Pending — Map integration implementation

To be decided:

- map library
- marker/list synchronization
- tile provider
- reporting from map
- map visibility filtering
- map fallback behavior

## Pending — Production authentication decision

To be decided later:

- whether the MVP remains demo-auth only
- whether to add real session/auth layer
- how to migrate from demo context to real authentication

## Pending — Deployment strategy

To be decided later:

- whether the MVP is local-only
- whether it will be deployed
- hosting provider
- database provider if deployed
- environment variable strategy

---

# 4. Working rule for future phases

From now on, whenever a meaningful technical, architectural, workflow, testing, or UX/product decision is made during implementation, Codex must update this file before considering the phase complete.

No implementation phase is complete until `DECISIONS.md` has been reviewed and updated.

The developer should reject or revise any phase completion summary that does not mention whether `DECISIONS.md` was updated.
