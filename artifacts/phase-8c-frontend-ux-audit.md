# Phase 8C.1 — Frontend UX Readiness Audit

- **Date:** 2026-05-06
- **Audit focus:** UX readiness before Phase 9A security/error-safety hardening
- **Auditor roles applied:** Senior frontend UX auditor, product designer, full-stack maintainer

## 1. Executive summary

ErasmusMate is functionally strong for MVP demo flows, but UX maturity is **mixed**: it is structurally coherent and route-complete, yet still exhibits product-polish gaps in cross-area navigation language, top-bar utility patterns (notifications/profile), visual hierarchy consistency, and copy hygiene on institutional dashboards.

The largest current UX risks are not broken flows; they are **discoverability and product affordance quality**:
- institutional ↔ social switching language is present but not yet unified as a reusable pattern;
- notifications behave as dedicated pages rather than a globally discoverable “bell” affordance;
- profile visibility is tied to a role switcher block, not a product-like top-right profile entry;
- route-shaped labels were visible in student dashboard cards (hotfixed in this phase).

## 2. Audited pages/routes

### Global / launcher
- `/` (`app/page.tsx`)
- shared top bar and role switcher (`src/components/TopBar.tsx`, `src/components/DemoRoleSwitcher.tsx`)

### Student institutional
- `/student/dashboard`, `/student/submissions`, `/student/deadlines`, `/student/learning-agreement`, `/student/exceptions`, `/student/notifications`, `/student/academic-summary`

### Coordinator institutional
- `/coordinator/dashboard`, `/coordinator/review-queue`, `/coordinator/exceptions`, `/coordinator/learning-agreement-review`, `/coordinator/deadlines`, `/coordinator/notifications`, `/coordinator/procedures`, `/coordinator/document-requirements`

### Admin institutional
- `/admin/dashboard`, `/admin/procedures`, `/admin/document-requirements`, `/admin/social-moderation`, `/admin/notifications`

### Social
- `/social/student/dashboard`, `/social/student/profile`, `/social/student/discovery`, `/social/student/connections`, `/social/student/messages`, `/social/student/recommendations`, `/social/student/map`

### UI/shared and styling conventions audited
- `src/components/layout/page-shell.tsx`
- `src/components/ShellNav.tsx`
- `src/components/*` card/button/badge/state components
- `src/components/notifications-panel.tsx`, `src/components/activity-feed-panel.tsx`
- `app/globals.css`, `tailwind.config.ts`

### Tests/documentation reviewed for UX contracts and evidence
- `tests/shared/launcher-contract.test.ts`
- `tests/shared/navigation-role-coherence.test.ts`
- `tests/institutional/**`, `tests/social/**`
- `e2e/institutional/**`, `e2e/social/**`, `e2e/smoke/routes.spec.ts`
- `TRACEABILITY_TEST_MATRIX.md`
- `artifacts/phase-8a-coverage-audit.md`
- `DECISIONS.md`, `TEST_STRATEGY.md`, `README.md`

## 3. Overall UX maturity assessment

**Current maturity: “MVP functional with moderate polish debt.”**

- Strong: workflow breadth, route structure, role-based area segmentation, deterministic demo context support.
- Moderate: visual consistency and reusable navigation semantics.
- Weak for product impression: top-right utility paradigms (notifications/profile) and copy hygiene consistency.

## 4. Navigation findings

1. Institutional/social cross-navigation exists but semantics are asymmetric.
   - Student institutional sidebar uses “Open social support”.
   - Social sidebar uses “Back to official mobility area”.
   - Top bar uses “Back to ErasmusMate home”.
   - These are understandable but not standardized as one explicit pattern family.

2. Return-to-home is discoverable in top bar but dominates as the only persistent global utility affordance.

3. Sidebars are consistent structurally, but cross-area “switch” items blend with regular section items and can be visually mistaken for same-area navigation.

## 5. Visual design findings

1. Baseline card layout and spacing are coherent across many pages.
2. Some pages still use utilitarian/native-looking inline anchors/buttons (not consistently `ButtonLink`/UI components), especially in social discovery/connections/message actions.
3. Status/badge hierarchy is present but not consistently prioritized (e.g., dashboard status text vs action clarity varies by card).

## 6. Institutional/social separation findings

- Separation is structurally sound at route/layout level.
- Language is mostly clear (“official mobility workspace” vs social dashboard), but visual differentiation is subtle; both areas use nearly identical shell chrome and tone.
- No severe semantic mixing observed.

## 7. Role clarity findings

- Demo context and role are explicit via top-bar role switcher.
- UX drawback: role and profile identity are combined in one utilitarian block; this does not feel like product-grade profile access.
- Role clarity is good for demo honesty; profile affordance discoverability is weak.

## 8. Dashboard consistency findings

- Dashboard structure is consistent (header + cards + quick actions).
- Student institutional dashboard previously exposed route-like copy in card status/description (hotfixed in this phase).
- Social dashboard CTA language is largely user-friendly and action-oriented.

## 9. Forms/tables/cards/buttons consistency findings

- Learning Agreement and institutional forms are generally structured and readable.
- Table/button styles differ by page in details (some native anchors/buttons with ad-hoc classes).
- CTA hierarchy is not always predictable (primary vs secondary intent varies).

## 10. Empty/loading/error state findings

- State components exist, but utilization across all pages is uneven.
- Some sections rely on minimal/no contextual helper text for empty outcomes.
- Error discoverability appears more backend-safe than UX-friendly (messages may be terse).

## 11. Accessibility/readability findings

- Semantic headings and readable font sizes are broadly acceptable.
- Inconsistent button/anchor component usage can create uneven focus styles and keyboard affordances.
- Utility affordances (notifications/profile) are text-only discoverability; icon-level scanning support is limited.

## 12. Demo/screenshot readiness findings

- Demo journeys are runnable and coherent.
- Screens are generally presentable, but top-right utility affordances and inconsistent action styling reduce “product-like” impression in stakeholder demos.

## 13. Severity-ranked issues

## Critical
- None (no demo-blocking UX failures identified).

## High
1. Cross-area navigation pattern is not unified into a single explicit interaction/copy system.
2. Notifications are page-centric only; global bell affordance is missing from top-right utility model.
3. Profile access is not represented as a dedicated profile/avatar affordance near top-right utilities.
4. Route-like/internal copy surfaced in student dashboard cards (addressed by hotfix in this phase).
5. Cross-area switch links are visually similar to same-area nav items, reducing switch-intent clarity.

## Medium
1. Inconsistent component-level CTA styling (mixed anchor/button patterns).
2. Weak visual differentiation between institutional and social area shells.
3. Sidebar information hierarchy is flat (section grouping opportunities).
4. Empty/help states are uneven in instructional quality.

## Low
1. Minor label harmonization opportunities across dashboards.
2. Minor spacing and density tuning opportunities for card lists/tables.
3. Iconography opportunities for faster scanning (without redesigning structure).

## 14. Recommended Phase 8C.2 frontend hotfix backlog

1. **Navigation copy contract**: normalize cross-area labels to a single pair convention (e.g., “Go to Social Support” / “Return to Official Mobility”).
2. **Top-bar utility prototype (non-invasive)**: add placeholder utility slots for future bell/profile affordances with current links retained.
3. **Notification discoverability uplift**: add a global top-bar notifications entry point for current role area (even before full bell behavior).
4. **Profile discoverability uplift**: add top-right “Profile / Demo account” entry next to role switcher for student social and institutional contexts.
5. **CTA consistency pass**: replace ad-hoc `<a>`/`button` controls in social pages with shared button components where safe.
6. **Sidebar intent separation**: style cross-area switch item as a grouped “Area switch” item.

## 15. Items deferred to Phase 9C final UX polish

- Full bell icon notification system behavior and unread badge lifecycle.
- Full avatar/profile menu pattern with role switching and account submenu behavior.
- Institutional vs social shell theming differentiation strategy.
- Comprehensive button/card/table spacing and density polish pass.
- Full accessibility pass (focus outlines, keyboard order, ARIA deep audit).

## 16. Items explicitly out of scope

- Auth redesign.
- Backend schema changes.
- Major layout redesign.
- Large Tailwind/global CSS rewrite.
- New institutional/social workflow features.

## 17. Phase 8C.1 low-risk hotfixes actually implemented

1. Removed route-like/internal labels from student institutional dashboard cards:
   - Replaced `Open /student/exceptions`, `Open /student/deadlines`, `Open /coordinator/exceptions` copy with user-facing status text.
2. Added a focused UI contract test to prevent reintroduction of route-like labels in the student dashboard.

## 18. Phase 8C.2 follow-up

### High findings reduced in this hotfix phase

1. **Cross-area navigation consistency improved**
   - Institutional and social student layouts now use aligned wording: `Go to social area` and `Go to official mobility area`.
   - Area-switch actions are styled with a distinct `area-switch` visual treatment so they are less likely to be mistaken for regular in-area navigation.

2. **Global notification affordance introduced**
   - Top bar now provides an `Open notifications` bell affordance in the top-right utility cluster.
   - It links to existing notification pages and shows unread count when available from current user notifications.

3. **Global profile affordance introduced**
   - Top bar now provides an `Open profile` affordance adjacent to notifications.
   - It links to currently available profile/workspace routes without inventing new account pages.

4. **Route-copy hygiene strengthened**
   - Additional UI contract coverage was added to reduce risk of route-like copy reappearing on key dashboard surfaces.

### Deferred items for Phase 9C

- Full notifications dropdown experience, per-type deep links, and advanced lifecycle UX remain deferred.
- Rich profile/account menu behavior remains deferred.
- Larger dashboard visual hierarchy redesign and broader shell differentiation remain deferred.

### Current limitations

- Notification affordance is currently a safe click-through entry point to existing notifications pages rather than a full inline feed.
- Profile affordance is currently route-link based, not an account management menu.
