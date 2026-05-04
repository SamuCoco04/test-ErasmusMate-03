# ErasmusMate

ErasmusMate is a full-stack MVP for Erasmus mobility management.

The product combines two clearly separated layers:

1. **Institutional core**
   - official Erasmus mobility procedures
   - mobility records
   - document submissions
   - deadlines
   - exception requests
   - coordinator review
   - Learning Agreement / course equivalences
   - Academic Summary
   - auditability and traceability

2. **Social-support layer**
   - student discovery
   - connection requests
   - accepted-only messaging
   - recommendations, tips and reviews
   - favorites
   - reports and moderation
   - map-based Erasmus discovery

The institutional core is the primary layer.  
The social layer is secondary and must remain separated from official institutional workflows.

---

# Repository status

This repository currently starts from documentation, requirements artifacts, and Figma/design references.

The implementation will be generated and evolved following:

- `AGENTS.md`
- `PLAN.md`
- `DECISIONS.md`
- `TEST_STRATEGY.md`
- `TRACEABILITY_TEST_MATRIX.md`
- `artifacts/`
- `figma/`

Codex must read these files before planning or implementing.

---

# Current repository structure

Expected structure before implementation:

    README.md
    AGENTS.md
    PLAN.md
    DECISIONS.md
    TEST_STRATEGY.md
    TRACEABILITY_TEST_MATRIX.md

    artifacts/
      README.md
      requirements/
      business-rules/
      workflows/
      domain-model/
      architecture/
      plans-archive/

    figma/
      screenshots/
      exported-css/
      design-notes.md
      tutor-notes.md
      frontend-concept/

---

# Main project goals

The final MVP should be:

- backend-backed
- frontend-complete
- locally runnable
- testable
- traceable to requirements and workflows
- visually aligned with Figma references
- easy to understand for students, coordinators and administrators
- efficient to use with the fewest reasonable clicks
- suitable to show to a tutor, client, or potential buyer

The project must avoid:

- frontend-only static screens
- disconnected workflows
- undocumented architecture decisions
- missing tests
- unclear traceability
- overly technical UI wording
- unnecessary clicks for common actions
- mixing institutional and social concerns

---

# Implementation principles

The implementation must follow these principles:

1. **Full-stack from the beginning**
   - backend and frontend must be implemented together
   - major workflows must not remain frontend-only mocks

2. **Workflow-first**
   - implement complete user journeys, not isolated screens
   - each major workflow needs persistence, validation, state, role guards and UI

3. **Test-first / acceptance-first**
   - tests should be created before or alongside implementation
   - Playwright should cover E2E workflows
   - Vitest should cover important service/API/domain rules where practical

4. **Traceability**
   - tests must be linked to workflows and rules in `TRACEABILITY_TEST_MATRIX.md`

5. **Decision documentation**
   - meaningful decisions must be recorded in `DECISIONS.md`

6. **Conventional commits**
   - commits must follow Conventional Commits

7. **Figma-driven visual quality**
   - Figma and frontend-concept references must guide the UI
   - missing screens should be inferred from existing visual patterns

8. **Human-friendly UI**
   - avoid technical/internal vocabulary in user-facing copy
   - use clear labels and reduce unnecessary clicks

---

# Planned technology direction

The planned stack is:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui-style components
- React Hook Form
- Zod
- Prisma
- SQLite for local development/demo
- Playwright
- Vitest

Architecture and design-pattern details will be refined by Codex during planning and implementation, then recorded in `DECISIONS.md`.

---

# Design references

The `figma/` folder contains visual references.

The `figma/frontend-concept/` folder may include a Vite/React design prototype and CSS/theme files.

Important:

- `figma/frontend-concept/` is visual reference only
- it is not the final implementation stack
- Codex must not copy the Vite project structure into the final app
- missing screens must be designed by inferring style from available references

See:

- `figma/design-notes.md`
- `figma/tutor-notes.md`

---

# Testing and traceability

Testing is defined in:

- `TEST_STRATEGY.md`
- `TRACEABILITY_TEST_MATRIX.md`

Expected testing layers:

- Playwright E2E tests
- Vitest service/API/domain tests
- smoke tests for app boot and main routes

The traceability matrix must be updated whenever tests or workflows change.

---

# Decisions

Project decisions are recorded in:

- `DECISIONS.md`

Every meaningful technical, architecture, workflow, testing, or UX/product decision must be recorded there.

A phase is not complete until the relevant decisions are documented.

---

# Conventional commits

Use Conventional Commits.

Examples:

    feat(institutional): add student dashboard workflow
    feat(learning-agreement): implement row-level review
    fix(navigation): preserve demo context across shell links
    test(e2e): add coordinator review scenario
    docs(decisions): record UI language decision
    refactor(ui): extract dashboard card component
    style(shell): align navigation with Figma reference

---

# Local development

Implementation has not necessarily been generated yet.

Once the app exists, expected commands will likely include:

    npm install
    npx prisma generate
    npx prisma migrate dev
    npm run db:seed
    npm run lint
    npm run build
    npm run test
    npx playwright test
    npm run dev

Codex must update this README with the final exact setup commands once the implementation is created.

---

# Demo expectations

The final MVP should support credible demo journeys for:

## Student

- open dashboard
- view pending official tasks
- submit required items
- request exceptions
- complete Learning Agreement
- view Academic Summary
- discover students
- connect and message
- use recommendations and map

## Coordinator

- open dashboard
- review submissions
- approve/reject/request correction
- review exceptions
- review Learning Agreement rows
- monitor deadlines
- inspect relevant history/audit information

## Admin

- open governance/moderation area
- review reports
- take moderation actions
- verify visibility impact

---

# Important note for Codex

Before implementing anything, Codex must:

1. read all project governance documents
2. inspect `artifacts/`
3. inspect `figma/`
4. inspect `figma/frontend-concept/`
5. produce a plan
6. document architecture decisions in `DECISIONS.md`
7. create or update tests and traceability before or alongside implementation

Do not start implementation blindly.

## Planning status

`PLAN.md` now contains the accepted Iteration 3 execution plan baseline used before implementation starts.



## Testing commands

- `npm run test` — run Vitest contracts in `tests/`.
- `npm run test:watch` — run Vitest in watch mode.
- `npm run test:service` — run service/API/domain contract tests.
- `npm run test:e2e` — run Playwright E2E contracts in `e2e/`.
- `npm run test:e2e:smoke` — run Playwright smoke route contracts only.
