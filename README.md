# ErasmusMate

ErasmusMate is a full-stack MVP for Erasmus mobility management.

## Current scope (Phase 3B)

Implemented:
- Institutional Prisma data foundation and deterministic seed data.
- Backend submission workflow with transitions and coordinator review actions.
- Institutional routes:
  - `GET /api/institutional/dashboard`
  - `GET /api/institutional/mobility-records/current`
  - `GET /api/institutional/procedures`
  - `GET/POST /api/institutional/submissions`
  - `GET /api/institutional/submissions/[submissionId]`
  - `PATCH /api/institutional/submissions/[submissionId]/transition`
  - `GET /api/institutional/review-queue`
  - `GET /api/institutional/deadlines`
  - `GET /api/institutional/exceptions`
- Institutional pages:
  - `/student/dashboard`
  - `/student/submissions`
  - `/coordinator/dashboard`
  - `/coordinator/review-queue`
  - `/admin/dashboard`

Pending (Phase 3C / Phase 4):
- File upload/storage integration for submissions.
- Deadline blocking and exception decision/apply workflows.
- Learning Agreement workflow.
- Social workflows, moderation, and real map integration.
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
npm run start
npm run test:e2e:smoke
```
