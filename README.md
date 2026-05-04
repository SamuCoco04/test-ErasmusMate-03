# ErasmusMate

ErasmusMate is a full-stack MVP for Erasmus mobility management.

## Current scope (Phase 4A)

Completed institutional scope:
- Phase 3 dashboards, submissions, deadlines, and exceptions backend/UI shells.
- Learning Agreement backend foundation (model, services, API routes, deterministic seed, and service tests).
- Academic Summary derived read model from latest approved Learning Agreement rows.

Learning Agreement API routes added:
- `GET/POST /api/institutional/learning-agreement`
- `GET /api/institutional/learning-agreement/review-queue`
- `GET /api/institutional/learning-agreement/[agreementId]`
- `POST /api/institutional/learning-agreement/[agreementId]/rows`
- `PATCH /api/institutional/learning-agreement/[agreementId]/rows/[rowId]`
- `POST /api/institutional/learning-agreement/[agreementId]/submit`
- `POST /api/institutional/learning-agreement/[agreementId]/resubmit`
- `POST /api/institutional/learning-agreement/[agreementId]/rows/[rowId]/decision`
- `GET /api/institutional/academic-summary`

Pending scope:
- Full student Learning Agreement table editor UI (Phase 4B).
- Full coordinator Learning Agreement review UI (Phase 4C).
- Polished Mobility Record – Academic Summary UI (Phase 4D).
- Social support MVP (Phase 5).
- Moderation + real map integration (Phase 6).
- Production authentication and file upload/storage (deferred).

## Demo mode

Demo context is cookie-backed (`erasmusmate_demo_context`) and server-readable.

## Validation command sequence

```bash
npm install
export DATABASE_URL="file:./dev.db"
npx prisma generate
npx prisma migrate dev
npm run db:seed
npm run db:seed
npm run test
npm run lint
npm run build
```


## Phase 4A route notes

- Student Learning Agreement UI route is intentionally a placeholder in Phase 4A: `/student/learning-agreement`.
- Coordinator Learning Agreement review UI route is intentionally a placeholder in Phase 4A: `/coordinator/learning-agreement-review`.
- Role-guarded API behavior is expected:
  - `GET /api/institutional/learning-agreement` is for `STUDENT`.
  - `GET /api/institutional/learning-agreement/review-queue` is for `COORDINATOR`.
  - Wrong roles return controlled `403 {"error":"Forbidden"}` responses.
