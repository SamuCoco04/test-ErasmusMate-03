# ErasmusMate

ErasmusMate is a full-stack MVP for Erasmus mobility management.

## Current scope (Phase 3A)

Implemented:
- Institutional Prisma data foundation for read models.
- Deterministic institutional seed data for student/coordinator/admin dashboards.
- Read-only institutional services and API routes:
  - `GET /api/institutional/dashboard`
  - `GET /api/institutional/mobility-records/current`
  - `GET /api/institutional/procedures`
  - `GET /api/institutional/review-queue`
  - `GET /api/institutional/deadlines`
  - `GET /api/institutional/exceptions`
- Backend-backed dashboard summaries:
  - `/student/dashboard`
  - `/coordinator/dashboard`
  - `/admin/dashboard`

Not implemented yet:
- Submission mutations and transitions.
- Coordinator approve/reject/reopen decisions.
- Exception decision/apply actions.
- Learning Agreement workflows.
- Social workflows, moderation, and real map.
- Production authentication.

## Demo mode

Demo context is cookie-backed (`erasmusmate_demo_context`) and server-readable.

Roles:
- Student → `student-1`
- Coordinator → `coordinator-1`
- Admin → `admin-1`

## Local run

```bash
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev
npm run db:seed
npm run dev
```

## Validation commands

```bash
npm run test
npm run lint
npm run build
npm run test:e2e:smoke
```
