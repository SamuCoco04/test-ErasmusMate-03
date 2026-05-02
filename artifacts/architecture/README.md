# ErasmusMate — artifacts/architecture

## Purpose

This folder stores architecture-specific documentation for ErasmusMate.

It should contain documents that explain or constrain how the system is technically organized.

Architecture decisions may also be recorded in `DECISIONS.md`. This folder is for longer architecture notes, diagrams, proposals, or supporting material.

---

# What belongs here

Use this folder for documents such as:

- architecture proposals
- module boundary notes
- backend architecture notes
- frontend architecture notes
- API design notes
- database architecture notes
- testing architecture notes
- deployment notes
- security and permission notes
- map integration notes
- design-pattern explanations
- diagrams or Mermaid architecture models

---

# Relationship with DECISIONS.md

`DECISIONS.md` is the official decision log.

Use `DECISIONS.md` to record:

- the decision made
- rationale
- alternatives considered
- trade-offs
- status

Use this folder to store supporting architecture material when a decision needs more detail than a short decision record.

Example:

- `DECISIONS.md` records: “Use Prisma + SQLite for local demo persistence.”
- `artifacts/architecture/` may contain: “database-model-notes.md” or “persistence-strategy.md”.

---

# Current status

This folder is prepared for architecture notes that may be generated or added during Iteration 3.

If Codex makes meaningful architecture decisions during implementation, those decisions must be recorded in `DECISIONS.md`.

If additional architecture explanations are needed, they may be added here.

---

# Guidance for Codex

Before implementing architecture-sensitive work, Codex should inspect:

- `AGENTS.md`
- `PLAN.md`
- `DECISIONS.md`
- `TEST_STRATEGY.md`
- `TRACEABILITY_TEST_MATRIX.md`
- `artifacts/requirements/`
- `artifacts/business-rules/`
- `artifacts/workflows/`
- `artifacts/domain-model/`
- this folder

Codex may add architecture notes here when useful, but it must not replace `DECISIONS.md` as the decision log.

---

# Naming convention

Recommended names for future files:

- `frontend-architecture.md`
- `backend-architecture.md`
- `api-architecture.md`
- `database-strategy.md`
- `testing-architecture.md`
- `map-integration.md`
- `deployment-notes.md`
- `security-permissions.md`
