# ErasmusMate

ErasmusMate is a full-stack MVP for Erasmus mobility management.

## Current scope (Phase 3D)

Completed institutional scope:
- Student dashboard, submissions, deadlines, and exceptions pages.
- Coordinator dashboard, review queue, deadlines, and exceptions pages.
- Admin institutional overview dashboard.
- Backend submissions workflow with role/ownership guards, deadline blocking, transitions, and audit/event records.
- Backend exceptions workflow with review/apply transitions, deadline override application, and audit records.

Current institutional routes:
- `/student/dashboard`
- `/student/submissions`
- `/student/deadlines`
- `/student/exceptions`
- `/coordinator/dashboard`
- `/coordinator/review-queue`
- `/coordinator/deadlines`
- `/coordinator/exceptions`
- `/admin/dashboard`

Pending areas:
- Learning Agreement / Academic Summary in Phase 4.
- Social support MVP in Phase 5.
- Moderation and real map integration in Phase 6.
- Production authentication deferred.
- File upload/storage deferred.

## Demo mode

Demo context is cookie-backed (`erasmusmate_demo_context`) and server-readable.

## Validation command sequence

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run db:seed
npm run db:seed
npm run test
npm run lint
npm run build
```
