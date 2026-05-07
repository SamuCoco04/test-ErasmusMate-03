# Phase 8D.1 — Demo Data Expansion and Deadline Calendar View

## 1) Calendar addition summary

- Added a simple read-only calendar section to `/student/deadlines`.
- Calendar marks dates with seeded deadlines and allows simple date filtering by clicking a day.
- Added an upcoming deadline list next to the calendar context to improve demo storytelling.

## 2) Seed data expansion summary

- Extended deterministic institutional deadline seed set with additional future and near-term examples (`dead-6`, `dead-7`).
- Kept existing seeded IDs untouched to preserve test compatibility.

## 3) Demo routes improved

- `/student/deadlines` now includes a read-only monthly calendar and focused day filtering.

## 4) Known limitations

- Calendar month is chosen from the densest seeded month and is intentionally read-only.
- No external calendar sync, drag/drop, recurring events, or edit-in-calendar behavior.

## 5) Deferred to later phases (9C / 10A)

- Broader visual redesign polish for complex calendar interactions.
- Advanced calendar controls (month navigation, richer interactions).
- Security and error-hardening work remains deferred to Phase 9A.
