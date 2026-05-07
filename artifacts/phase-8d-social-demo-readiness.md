# Phase 8D.1 — Social Demo Data and Connection Request Lifecycle Readiness

## 1) Seeded social demo states added
- Added deterministic demo students/profiles `student-7..10` / `sp-student-7..10`.
- Added incoming pending request seed `conn-seed-5` (`sp-student-7 -> sp-student-1`).
- Added two requestable profiles (`sp-student-8`, `sp-student-9`).
- Added privacy-restricted unavailable profile (`sp-student-10`, `contactPreference: HIDDEN`).
- Kept existing seed IDs stable.

## 2) Request/cancel/re-request behavior
- Request creation remains idempotent-by-pair and reuses existing pair row after CANCELLED/REJECTED.
- Added backend enforcement for privacy-restricted request targets (`HIDDEN` and `CONNECTIONS_ONLY` unavailable for new requests).
- Discovery now surfaces `Request sent` + direct `Cancel request` path to Connections.

## 3) Accept/reject behavior
- Incoming pending requests can be accepted/rejected by receiver through transition API and UI controls in Connections.

## 4) Block/unblock behavior
- Block keeps pair non-messageable.
- Unblock returns pair to non-connected (`CANCELLED`) state, enabling future request flow.

## 5) Privacy/unavailable explanation behavior
- Discovery shows explicit unavailable explanation for privacy-restricted profiles.

## 6) Tests added/updated
- Extended service tests for accept/reject lifecycle and privacy-restricted request guard.
- Extended UI contract tests for discovery labels/copy (`Cancel request`, unavailable explanation).

## 7) Remaining deferred items
- Full social E2E workflows remain deferred except manual deterministic demo paths.
