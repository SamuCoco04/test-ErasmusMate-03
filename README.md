# ErasmusMate

ErasmusMate is a full-stack MVP for Erasmus mobility management.

## Demo mode (Phase 2D)

This repository currently uses **demo-only identity** (not production authentication):

- The authoritative demo context is a **server-readable HTTP-only cookie** (`erasmusmate_demo_context`).
- A top-bar **Demo mode** switcher lets you select Student, Coordinator, or Admin.
- Switching role calls `PATCH /api/demo-context`, updates the cookie, and refreshes server-rendered pages.
- Social dashboard remains student-scoped and intentionally separate from institutional routes.
- Placeholder dashboards only show demo context and honest “pending workflow” cards.

### Seeded demo users/roles

- Student → `student-1`
- Coordinator → `coordinator-1`
- Admin → `admin-1`

## Local run

```bash
npm install
cp .env.example .env
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

## Reset and reseed

```bash
npm run db:reset
npm run db:seed
```

## Validation and tests

```bash
npm run test
npm run lint
npm run build
npm run test:e2e:smoke
```

For local Playwright smoke runs with automatic server startup:

```bash
PLAYWRIGHT_START_SERVER=1 npm run test:e2e:smoke
```

## Scope status reminder

Implemented so far in this phase:

- demo context cookie foundation
- demo context API
- role switcher wiring
- smoke foundations for demo context

Not implemented in this phase:

- institutional workflow business logic
- social workflow business logic
- Learning Agreement workflow
- moderation workflow
- real map integration
- production authentication
