# ErasmusMate — figma/tutor-notes.md

## Purpose

This document captures the main conclusions, priorities, and product-quality observations discussed with the tutor for ErasmusMate Iteration 3.

These notes must guide Codex during planning and implementation.

They are not implementation code, but they define important quality expectations for the MVP.

---

# 1. Iteration 3 framing

Iteration 3 should not simply repeat previous implementation attempts.

The objective is to rebuild ErasmusMate from a clean repository with better preparation, better tests, better traceability, clearer design guidance, and stronger product quality.

The goal is to create a full-stack MVP that can be shown as a serious product prototype.

The product should feel suitable for:

- academic evaluation
- tutor review
- client-style presentation
- potential product demonstration
- future development continuation

The MVP should not feel like:

- a static frontend
- a technical scaffold
- a generic CRUD app
- a disconnected set of generated screens
- an app that only works because the presenter explains every step manually

---

# 2. Main tutor conclusions

The following points must be taken into account during the whole iteration:

1. The project must remain full-stack.
2. Backend and frontend must be implemented together.
3. Tests should be created before or alongside implementation.
4. End-to-end tests are especially important for the main workflows.
5. A traceability matrix of tests must be maintained.
6. Codex should use Conventional Commits.
7. Codex must record important decisions in `DECISIONS.md`.
8. The UI should be more user-friendly.
9. The interface should avoid uncommon, technical, or difficult words.
10. The number of clicks required for common actions should be reduced.
11. Figma and frontend-concept references should guide the visual result.
12. Missing screens should be designed by inferring the style from existing visual references.
13. The product should be understandable without needing constant verbal explanation.
14. The final MVP should be presentable as a product, not only as a technical experiment.

---

# 3. Full-stack expectation

The MVP must include both frontend and backend.

Frontend-only screens are not enough.

Each major workflow should include:

- UI journey
- backend route or service behavior
- persistence
- validation
- role-based behavior
- state transitions where relevant
- seed data for demo
- tests or planned tests

Previous iterations showed that if backend is postponed, the result becomes too static and requires too much rework.

For Iteration 3, backend must be developed from the beginning as part of each vertical slice.

---

# 4. Test-first expectation

Before implementing major workflows, Codex should create or update tests.

This does not mean that every test must pass immediately before the feature exists.

It means that the expected behavior should be specified early.

The preferred approach is:

1. Define workflow scenario.
2. Add or update test.
3. Implement feature.
4. Run test.
5. Fix failures.
6. Update traceability matrix.

Important workflows should have E2E coverage with Playwright.

Important backend rules should have service/API/domain tests with Vitest when practical.

---

# 5. End-to-end test priority

E2E tests are important because ErasmusMate is workflow-heavy.

The following flows should be validated with E2E tests:

- student dashboard
- official procedure submission
- coordinator review
- deadlines
- exception request
- Learning Agreement
- Academic Summary
- student discovery
- connection request
- accepted-only messaging
- social content
- reporting and moderation
- map discovery

These tests help ensure the product works as a real user journey, not just as isolated pages.

---

# 6. Traceability matrix expectation

The project must maintain `TRACEABILITY_TEST_MATRIX.md`.

The matrix must connect:

- workflow
- requirement or business rule
- actor
- test type
- test scenario
- expected result
- implementation status

This is important for the TFG because it shows that the work is not random implementation, but a controlled engineering process.

Codex must update the matrix whenever:

- a new test is added
- a test status changes
- a workflow is implemented
- a workflow is deferred
- a test is removed
- a requirement is clarified

---

# 7. Conventional commits expectation

All commits should follow Conventional Commits.

Examples:

- `feat(institutional): add student submission workflow`
- `feat(learning-agreement): implement row-level review`
- `fix(navigation): preserve demo context across shell links`
- `test(e2e): add coordinator review scenario`
- `docs(decisions): record UI language decision`
- `refactor(ui): extract dashboard card component`
- `style(shell): align navigation with Figma reference`

This makes the Git history easier to review and explain.

Codex should keep commits focused and should avoid mixing unrelated changes in the same commit.

---

# 8. Decision documentation expectation

Previous iterations suffered from important implementation decisions not being documented.

In Iteration 3, Codex must record meaningful decisions in `DECISIONS.md`.

This includes decisions about:

- architecture
- backend modules
- frontend structure
- API organization
- database schema
- testing strategy
- seed data
- design system
- UI patterns
- workflow semantics
- map integration
- demo identity
- deferred features

A phase should not be considered complete if decisions were made but not documented.

---

# 9. UI language expectation

The interface should use clear and human-friendly language.

Avoid technical or uncommon words that normal Erasmus students, coordinators, or administrators would not use.

Avoid terms such as:

- backend-visible
- workflow artifact
- persisted entity
- route handler
- domain object
- governance surface
- policy-aware
- moderation-limited state
- state transition

Prefer language such as:

- visible
- saved
- approved
- needs correction
- pending review
- hidden after reports
- review queue
- Learning Agreement
- Erasmus stay
- mark as reviewed
- send request
- report content

If technical precision is needed, it should go in documentation, not in the user interface.

---

# 10. Minimum-click expectation

The product should reduce unnecessary clicks.

Common actions should be reachable quickly.

Examples:

## Student

A student should be able to:

- see the next pending task from the dashboard
- open the next task directly
- submit a required item without navigating through unnecessary intermediate pages
- find denied Learning Agreement rows quickly
- resubmit after correction from the same workflow context
- open messages from accepted connections quickly
- use the map without switching between too many disconnected pages

## Coordinator

A coordinator should be able to:

- see pending review work from the dashboard
- open an item directly from the review queue
- approve or reject from the review detail
- enter rationale in the same decision context
- review Learning Agreement rows without unnecessary navigation
- see urgent deadlines and exceptions clearly

## Admin

An admin should be able to:

- see reports needing action
- open moderation detail directly
- understand why content was reported
- hide, remove, or maintain content without excessive navigation

The product should prefer task-focused layouts over page-heavy navigation.

---

# 11. Visual quality expectation

The UI must be closer to the Figma/frontend-concept references than previous iterations.

Codex should use the existing design references to infer:

- layout
- navigation
- cards
- tables
- badges
- dashboards
- forms
- map/list/detail patterns
- social screens
- coordinator/admin screens

If a screen does not exist in Figma, Codex should design it using nearby visual patterns.

The result should not look like a plain scaffold.

The final MVP should feel coherent across:

- institutional pages
- social pages
- admin pages
- Learning Agreement
- map
- dashboards

---

# 12. Product presentation expectation

The MVP should be presentable as a product.

This means:

- workflows must work
- screens must look coherent
- data must persist
- demo users must be seeded
- navigation must be reliable
- copy must be understandable
- actions must be clear
- important states must be visible
- error/empty/loading states must be handled
- the product should not depend on hidden manual fixes during demo

The presenter should not need to constantly explain where to click or why something looks unfinished.

---

# 13. Figma and missing CSS expectation

Not all screens have exported CSS or direct frontend-concept equivalents.

This is acceptable.

Codex should not stop or create a separate visual style because a specific CSS export is missing.

Instead, Codex should infer missing screens from:

- available screenshots
- existing frontend-concept components
- `DESIGN_SYSTEM.md`
- theme CSS
- neighboring role screens
- similar workflow pages

The missing screens should feel consistent with the rest of ErasmusMate.

---

# 14. Architecture expectation

Codex is expected to choose architecture and design patterns when needed.

However, these choices must be:

- maintainable
- testable
- compatible with the approved stack
- suitable for local demo
- documented in `DECISIONS.md`

Codex should decide, among other things:

- module boundaries
- route structure
- service/domain split
- validation strategy
- seed strategy
- test organization
- component architecture
- UI layout system
- map integration pattern

The user does not need to approve every small technical choice, but important choices must be documented.

---

# 15. Demo identity expectation

A production authentication system is not required at the beginning unless explicitly planned.

However, demo identity must be reliable.

If the app uses demo users, local storage, cookies, query params, or a role switcher:

- the behavior must be consistent
- navigation must preserve the selected context
- the UI must not imply real authentication if it does not exist
- student, coordinator, and admin demos must be deterministic

Fragile demo navigation was a problem in previous iterations and should not be repeated.

---

# 16. Workflow quality expectation

ErasmusMate should be workflow-driven.

Important workflows should not be implemented as isolated pages.

For example:

- submission should include student action, coordinator review, state change, and persistence
- Learning Agreement should include row creation, row review, partial approval, revision, and summary
- messaging should require accepted connection
- moderation should affect content visibility
- map results should be filtered by backend visibility rules

A page is not complete if it only displays static cards without real behavior.

---

# 17. Learning Agreement expectation

Learning Agreement remains a key institutional workflow.

It should be:

- structured
- table-first
- auditable
- understandable
- easy for student to revise
- efficient for coordinator to review

Important rules:

- student fills course equivalence data
- coordinator reviews rows
- denied rows require correction
- approved rows should not be silently overwritten
- grade is coordinator-controlled
- grade is not part of initial approval decision
- Academic Summary is read-only and official-looking

The Learning Agreement should not feel like a generic spreadsheet.

---

# 18. Social layer expectation

The social layer should be useful but secondary.

It should help Erasmus students with:

- finding other students
- connecting
- messaging accepted contacts
- reading recommendations/tips/reviews
- using the map for Erasmus-relevant places
- reporting inappropriate content

It should not become:

- a generic social network
- a tourism app
- a feed-first platform
- mixed into official institutional procedures

The interface must preserve the difference between official institutional work and social support.

---

# 19. Map expectation

The map should be real and useful.

It should include:

- map view
- result list
- filters
- marker preview
- detail navigation
- report action
- backend-backed data
- moderation/visibility filtering

The map should not be a placeholder.

The map should not include:

- live tracking
- private user locations
- route planning
- generic tourism features outside Erasmus support scope

---

# 20. Review expectation

After each major phase, Codex should perform or support a review pass.

The review should check:

- scope adherence
- broken workflows
- misleading UI copy
- excessive clicks
- accessibility basics
- missing tests
- missing traceability updates
- missing decision updates
- build/lint/test status

Blocking issues should be fixed before merge.

---

# 21. Final MVP expectation

At the end of Iteration 3, the product should support a credible demonstration:

## Student

The student can:

- view dashboard
- see pending official tasks
- submit required items
- request exceptions
- complete Learning Agreement
- view Academic Summary
- discover other students
- connect and message
- view content and map

## Coordinator

The coordinator can:

- view dashboard
- review submissions
- approve/reject/request correction
- review exceptions
- review Learning Agreement rows
- monitor deadlines
- see relevant history/audit information

## Admin

The admin can:

- access moderation queue
- review reported content
- take moderation actions
- see governance-oriented information

The final product should feel like a serious MVP, not like a raw generated prototype.

---

# 22. Priority summary for Codex

When uncertain, Codex should prioritize:

1. real backend-backed workflows
2. testability
3. traceability
4. documented decisions
5. Figma-aligned visual quality
6. clear human-friendly language
7. fewer clicks for common actions
8. institutional/social separation
9. demo reliability
10. maintainable architecture
