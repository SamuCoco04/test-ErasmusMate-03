# ErasmusMate — artifacts/plans-archive

## Purpose

This folder stores previous plans, iteration records, retrospectives, and historical planning documents for ErasmusMate.

The current execution plan is always `PLAN.md` at the repository root.

This folder is for historical context only.

---

# What belongs here

Use this folder for:

- previous iteration plans
- old Codex-generated plans
- Learning Agreement planning notes
- retrospectives
- tutor review summaries
- abandoned approaches
- comparison notes between iterations
- phase summaries from previous work

Examples:

- `PLAN_ITERATION_1.md`
- `PLAN_ITERATION_2.md`
- `LEARNING_AGREEMENT_PLAN.md`
- `ITERATION_2_RETROSPECTIVE.md`
- `CODEX_PLAN_REVIEW_NOTES.md`

---

# Source-of-truth rule

Archived plans are not the current source of truth.

Current source priority:

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

If an archived plan conflicts with current instructions, follow the current root documents.

---

# How to use archived plans

Archived plans can help Codex and the developer understand:

- what was previously attempted
- what worked
- what failed
- what was deferred
- what should not be repeated blindly
- why Iteration 3 uses a more test-first and documentation-driven process

Archived plans should inform context, not override current planning.

---

# Current status

This folder is prepared for previous iteration plans and retrospective documents.

If previous plans are added later, they should be placed here instead of cluttering the repository root.

---

# Guidance for Codex

Codex may inspect this folder for context, but it must not treat archived plans as active instructions unless the root `PLAN.md` explicitly says so.

If Codex uses information from an archived plan to justify an implementation choice, the resulting decision should be recorded in `DECISIONS.md`.

---

# Naming convention

Recommended names for future files:

- `PLAN_ITERATION_1.md`
- `PLAN_ITERATION_2.md`
- `PLAN_LEARNING_AGREEMENT.md`
- `RETROSPECTIVE_ITERATION_2.md`
- `OLD_CODEX_PLAN.md`
- `TUTOR_REVIEW_NOTES.md`
