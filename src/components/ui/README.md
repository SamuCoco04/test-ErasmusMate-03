# Phase 7A UI Foundation

This folder introduces reusable, typed UI primitives for ErasmusMate pages without changing backend/domain logic.

## Components
- `button.tsx`: `Button` and `LinkButton` with `primary | secondary | ghost` variants.
- `badge.tsx`: `Badge` and `StatusBadge` with typed tones.
- `card.tsx`: `Card`, `CardHeader`, `CardBody`, `CardTitle`, `CardDescription`.
- `state.tsx`: `EmptyState`, `LoadingState`, `ErrorState`, `InlineAlert`.
- `table.tsx`: lightweight semantic table wrapper (`DataTable`, `DataTableHead`, `DataTableBody`, `DataTableRow`, `DataTableCell`, `DataTableHeadCell`).

## Layout helpers
- `src/components/layout/page-shell.tsx`: `PageShell`, `PageHeader`, `SectionHeader`.

## Phase boundaries
Phase 7A is intentionally limited to foundation + light adoption on representative pages.
Full institutional/social screen redesign, visual polish pass, and broader migration are deferred to Phase 7B/7C/7D.
