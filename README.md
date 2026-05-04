# ErasmusMate

ErasmusMate is a full-stack MVP for Erasmus mobility management.

## Current scope (Phase 4D)

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
- Social support MVP (Phase 5).
- Moderation + real map integration (Phase 6).
- Production authentication (deferred).
- File upload/storage (deferred).
- Transcript import/export (deferred).

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


## Phase 4 institutional block (completed)

- Learning Agreement backend foundation
- Student Learning Agreement table editor (`/student/learning-agreement`)
- Coordinator Learning Agreement review (`/coordinator/learning-agreement-review`)
- Student Academic Summary page (`/student/academic-summary`)

## Phase 5A social foundation (implemented)

Implemented:
- Backend-backed social profiles with role guard (student only).
- Social discovery endpoint with deterministic filtering and safe public fields.
- Student social pages:
  - `/social/student/dashboard`
  - `/social/student/profile`
  - `/social/student/discovery`
- Social APIs:
  - `GET/PATCH /api/social/profile`
  - `GET /api/social/discovery`
  - `GET /api/social/discovery/[profileId]`

Still not implemented:
- Connections, accepted-only messaging, recommendations/reviews/tips, favorites.
- Reporting/moderation actions and map-based social discovery.
