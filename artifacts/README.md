# ErasmusMate — artifacts/README.md

## Purpose

This folder contains the functional, domain, and planning artifacts that define ErasmusMate’s intended scope.

Codex must inspect these artifacts before planning or implementing.

The artifacts are the main source for:

- requirements
- business rules
- workflows
- domain model
- architecture notes
- previous iteration decisions and plans

---

# Folder structure

Expected structure:

    artifacts/
      README.md
      requirements/
      business-rules/
      workflows/
      domain-model/
      architecture/
      plans-archive/

---

# 1. requirements/

This folder should contain the final or latest requirements documents.

Examples:

- functional requirements
- non-functional requirements
- role-specific requirements
- institutional requirements
- social-support requirements
- Learning Agreement requirements
- map/recommendation/moderation requirements

Codex must use this folder to understand what the system must do.

Important:

- Do not invent requirements if they are not supported by the artifacts.
- If a requirement is ambiguous, make the safest reasonable assumption and document it in `DECISIONS.md`.
- Preserve the distinction between institutional core and social-support features.

---

# 2. business-rules/

This folder should contain business rules and constraints.

Examples:

- role permissions
- institutional workflow rules
- deadline rules
- submission/review rules
- exception request rules
- Learning Agreement rules
- social visibility rules
- connection/messaging rules
- moderation rules
- map visibility rules

Codex must use these rules when implementing backend guards and workflow state transitions.

Important:

- Business rules must not be enforced only in frontend state.
- Important rules should be implemented in backend services or route handlers.
- Important rules should be covered by service/API tests where practical.

---

# 3. workflows/

This folder should contain workflow definitions.

Examples:

- student mobility workflow
- document submission workflow
- coordinator review workflow
- deadline workflow
- exception request workflow
- Learning Agreement workflow
- social discovery workflow
- connection workflow
- messaging workflow
- recommendation/review workflow
- reporting/moderation workflow
- map discovery workflow

Codex must implement workflows end-to-end, not as isolated screens.

Each major workflow should include:

- actor
- trigger
- preconditions
- states
- transitions
- validation
- exceptions
- end condition
- UI journey
- backend persistence
- tests

---

# 4. domain-model/

This folder should contain domain model documents and diagrams.

Examples:

- institutional domain model
- social domain model
- entity definitions
- relationship diagrams
- state models
- Mermaid diagrams if available

Codex must use this folder when designing:

- Prisma schema
- service modules
- route structure
- validation schemas
- seed data
- tests

Important:

- Domain models guide implementation, but Codex may refine technical structure if needed.
- Any meaningful deviation from the domain model must be documented in `DECISIONS.md`.

---

# 5. architecture/

This folder should contain architecture notes and constraints.

Examples:

- architecture proposals
- module boundaries
- API design notes
- previous architecture evaluations
- security/permission notes
- testing architecture
- map integration notes
- deployment notes if any

Codex must inspect this folder before deciding architecture.

If architecture is not fully specified, Codex is expected to choose a maintainable architecture and record it in `DECISIONS.md`.

---

# 6. plans-archive/

This folder should contain previous plans and iteration records.

Examples:

- iteration 1 plan
- iteration 2 plan
- Learning Agreement plan
- previous Codex plans
- retrospective notes
- old execution plans

These files are historical context.

They should help Codex understand:

- what was previously attempted
- what worked
- what failed
- what decisions should not be repeated blindly
- what should be improved in Iteration 3

Important:

- Archived plans are not automatically the current source of truth.
- The current plan is `PLAN.md`.
- If archived plans conflict with current instructions, follow `AGENTS.md` and `PLAN.md`.

---

# Source priority

When implementing, Codex should follow this order:

1. `AGENTS.md`
2. `PLAN.md`
3. `TEST_STRATEGY.md`
4. `TRACEABILITY_TEST_MATRIX.md`
5. `DECISIONS.md`
6. `artifacts/requirements/`
7. `artifacts/business-rules/`
8. `artifacts/workflows/`
9. `artifacts/domain-model/`
10. `artifacts/architecture/`
11. `artifacts/plans-archive/`
12. `figma/`
13. `figma/frontend-concept/`

Functional scope should come primarily from requirements, business rules, workflows and domain models.

Visual and interaction direction should come primarily from Figma and frontend-concept.

Architecture should be chosen by Codex when not fully specified, then documented in `DECISIONS.md`.

---

# How Codex should use this folder

Before generating a plan or implementation, Codex must:

1. list or inspect relevant artifacts
2. identify which artifacts drive the current task
3. avoid implementing unsupported features
4. preserve institutional/social separation
5. update `DECISIONS.md` when making interpretation or architecture decisions
6. update `TRACEABILITY_TEST_MATRIX.md` when adding or changing tests

---

# Minimum expected artifacts

Before major implementation starts, try to include at least:

## requirements/

- final requirements document
- requirements for institutional core
- requirements for social layer
- requirements for Learning Agreement/map/moderation if separate

## business-rules/

- role and permission rules
- submission/review rules
- deadline/exception rules
- social visibility/contact rules
- moderation rules

## workflows/

- institutional workflows
- social workflows
- Learning Agreement workflow
- map/reporting workflow

## domain-model/

- institutional domain model
- social domain model
- state models if available

## architecture/

- any current architecture constraints or proposals

## plans-archive/

- iteration 1 plan
- iteration 2 plan
- Learning Agreement plan
- retrospective notes if available

---

# Important implementation note

Do not treat artifacts as decorative documentation.

They must influence:

- implementation plan
- data model
- service modules
- API routes
- UI flows
- tests
- traceability matrix
- decisions log

If the final implementation deviates from an artifact, the deviation must be explained in `DECISIONS.md`.
