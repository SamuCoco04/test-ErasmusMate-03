# ErasmusMate — figma/design-notes.md

## Purpose

This document explains how Codex must use the Figma screenshots, exported CSS, and `figma/frontend-concept` files during ErasmusMate Iteration 3.

The goal is not to copy the design prototype blindly, but to extract its visual language and apply it consistently to the final full-stack MVP.

The final application must feel like a coherent product, not like a set of disconnected generated screens.

---

# 1. Design source hierarchy

Use the following order when interpreting design references:

1. Figma screenshots
2. `figma/frontend-concept/README.md`
3. `figma/frontend-concept/DESIGN_SYSTEM.md`
4. `figma/frontend-concept/src/app/components/`
5. `figma/frontend-concept/src/styles/`
6. Exported CSS files
7. Neighboring screens with similar purpose
8. Product requirements and workflows

If a specific screen is missing from Figma or from the frontend concept, infer its layout and style from similar existing screens.

Do not create a different visual style for missing screens.

---

# 2. Important warning about frontend-concept

The `figma/frontend-concept` folder is a visual and UX reference only.

It may come from a Vite/React prototype.

Codex must not:

- treat it as the final app structure
- copy the Vite setup into the project root
- copy `index.html` into the final implementation
- use the frontend-concept package setup as the final package setup
- assume that all screens are complete
- assume that all CSS exports are production-ready

Codex should use it to extract:

- navigation structure
- card patterns
- dashboard composition
- table styles
- typography rhythm
- status badge style
- form layout
- spacing
- colors
- component hierarchy
- page-level information architecture

The final implementation must follow the approved stack and architecture described in `AGENTS.md` and the final `PLAN.md`.

---

# 3. Missing screens and incomplete CSS

Not all final ErasmusMate screens have exported CSS or a direct frontend-concept equivalent.

When a screen does not have a direct design reference, Codex must:

- reuse the closest matching visual pattern
- preserve the same spacing and typography rhythm
- reuse existing card/table/badge/button patterns
- keep the same navigation hierarchy
- avoid inventing a new visual language
- keep screens visually compatible with existing student, coordinator, admin, and social areas

Examples:

- If a coordinator exception screen has no direct CSS, infer it from coordinator review screens.
- If a social moderation detail screen has no direct Figma screen, infer it from admin/moderation cards.
- If a Learning Agreement table is missing detailed CSS, infer from existing table and dashboard references.
- If a map detail panel is missing, infer from social content cards and preview panels.

---

# 4. Overall product feel

The MVP should feel:

- clean
- modern
- serious
- friendly
- institutional where needed
- social but not chaotic in the social layer
- easy to demo
- easy to understand without technical explanation

Avoid making the app feel like:

- an internal admin scaffold
- a raw CRUD generator
- a plain database interface
- a generic social network
- a tourism app
- a disconnected set of screens

The product should feel like an Erasmus mobility assistant with official process support and carefully scoped social help.

---

# 5. Visual hierarchy principles

Every page should have a clear hierarchy:

1. Page title
2. Short human-friendly description
3. Most important action or status
4. Main content
5. Secondary information
6. Supporting history/details

Avoid pages that start immediately with dense tables or raw forms.

Use visual hierarchy through:

- card grouping
- section titles
- small explanatory text
- badges
- counters
- clear primary actions
- consistent spacing

---

# 6. Navigation principles

## Institutional navigation

The institutional area is the primary area.

It should feel serious, clear, and process-oriented.

Institutional navigation should prioritize:

- Dashboard
- My Mobility Record
- Learning Agreement
- Submissions / Procedures
- Deadlines
- Exception Requests
- Review Queue for coordinators
- Moderation or governance for admins when relevant

The user should always understand:

- where they are
- what role they are using
- what action is expected next
- what is pending
- what is completed

## Social navigation

The social layer is secondary.

It must remain clearly separated from official institutional processes.

Social navigation should prioritize:

- Discover Students
- Connections
- Messages
- Recommendations / Tips / Reviews
- Favorites
- Map
- Reports where relevant

The social layer should not be mixed into institutional procedure navigation.

Do not make social discovery look like official mobility record search.

---

# 7. Dashboard principles

Dashboards must be action-oriented, not just informational.

A good ErasmusMate dashboard should answer:

- What is my current status?
- What needs my attention?
- What is due soon?
- What can I do next?
- What has changed recently?

## Student dashboard

Should show:

- current Erasmus stay
- next pending task
- upcoming deadlines
- Learning Agreement status
- recent decisions
- quick access to social support if appropriate
- clear route to My Mobility Record

## Coordinator dashboard

Should show:

- items waiting for review
- urgent or overdue deadlines
- exception requests
- Learning Agreement reviews
- recently updated student items
- quick action access to review queues

## Admin dashboard

Should show:

- moderation queue
- reported content
- hidden/restricted/removed content indicators
- platform governance overview
- user/content signals if implemented

Dashboards should not be plain lists. They should use cards, counters, status summaries, and direct actions.

---

# 8. Card design principles

Cards should be used to group meaningful information.

Good cards should have:

- clear title
- short supporting text
- visible status
- one main action where appropriate
- secondary metadata
- consistent padding and border radius
- visual alignment with Figma references

Avoid cards that are overloaded with too much text or too many unrelated actions.

For important status cards:

- use badges
- use short labels
- use icons only if they improve clarity
- avoid relying on color alone

---

# 9. Table design principles

Tables are important for:

- Learning Agreement
- coordinator review
- deadlines
- submissions
- admin moderation
- map result lists where applicable

Tables should be readable and action-oriented.

A good table should have:

- clear columns
- compact but readable spacing
- visible row status
- useful row-level actions
- meaningful empty state
- inline validation where useful
- sticky or repeated action area only if it improves usability

Avoid tables that feel like raw database dumps.

## Learning Agreement table

The Learning Agreement table should feel like an official academic planning tool.

Required columns should include:

- Home course code
- Home course name
- Destination course code
- Destination course name
- ECTS
- Semester
- Status
- Grade only where coordinator-side or read-only

Student must not edit grade.

Denied rows must be easy to identify.

Approved rows must not look freely editable unless the UI clearly explains that editing creates a new reviewable revision.

---

# 10. Badge and status principles

Use badges for states and categories.

Badges should be consistent across the product.

Examples:

- Pending
- In review
- Approved
- Needs correction
- Reopened
- Overdue
- Due soon
- Accepted
- Hidden
- Reported
- Visible
- Connected
- Request sent

Prefer human-friendly labels over raw database states.

For example:

- `CHANGES_REQUESTED` should appear as “Needs correction”.
- `IN_REVIEW` should appear as “In review”.
- `PARTIALLY_APPROVED` should appear as “Partially approved”.
- `DENIED` should appear as “Needs changes” or “Denied” depending on context.

Avoid exposing raw enum names in the UI.

---

# 11. Form design principles

Forms should be guided and understandable.

Each form should have:

- clear labels
- short helper text where needed
- validation messages near the problem
- obvious primary action
- cancel/back behavior where useful
- success feedback after submission

Avoid long unexplained forms.

For complex workflows:

- break the form into meaningful sections
- show what is required
- show what can be completed later
- avoid asking for data the actor should not provide

Example:

- Student should not be asked for grade in Learning Agreement.
- Coordinator can enter grade only where the workflow allows it.

---

# 12. Empty, loading, error and success states

All main pages should have good feedback states.

## Empty states

Should explain:

- what is missing
- why it matters
- what the user can do next

Bad empty state:

- “No data”

Better empty state:

- “No pending submissions. New student submissions will appear here when they are sent for review.”

## Loading states

Should be calm and consistent.

Use skeletons or simple loading cards where appropriate.

## Error states

Should be human-friendly.

Avoid technical messages unless useful for developer-only contexts.

Bad error:

- “PrismaClientKnownRequestError”

Better error:

- “We could not load this review queue. Try refreshing the page.”

## Success states

Show confirmation after important actions:

- submitted
- approved
- rejected
- message sent
- report created
- exception requested
- row saved

Success feedback should not require navigating away.

---

# 13. Language and copy principles

The interface must avoid technical implementation language.

Do not use words like:

- backend-visible
- route handler
- workflow artifact
- persisted entity
- policy-aware
- domain object
- moderation-limited state
- governance surface
- state transition

Use simpler language:

- visible
- saved
- Learning Agreement
- hidden after reports
- review queue
- needs correction
- approved
- sent
- marked as reviewed
- Erasmus stay
- student profile

The product should sound like it was written for Erasmus students, coordinators, and administrators, not software engineers.

---

# 14. Minimum-click UX principles

Common actions should be reachable in the fewest reasonable clicks.

Examples:

## Student

- Open next pending task from dashboard.
- Submit a document without searching through many screens.
- Open denied Learning Agreement rows directly.
- Resubmit after correction from the same workflow context.
- Open accepted message thread directly from connection.

## Coordinator

- Open review item from dashboard or review queue.
- Approve/reject from detail panel.
- See rationale field in the same decision area.
- Open Learning Agreement row review without extra intermediate pages.
- See urgent deadlines quickly.

## Admin

- Open moderation case from queue.
- Hide/remove/restrict content from detail.
- See report reason and affected content in the same place.

Avoid unnecessary pages that only contain one button leading to the real page.

---

# 15. Institutional screens design direction

Institutional screens should feel official, structured, and trustworthy.

Recommended patterns:

- dashboard cards
- deadline warning cards
- review queues
- progress indicators
- status badges
- audit/history panels
- clear task sections
- official-looking summary panels

## My Mobility Record

Should feel like the official personal mobility area.

It should include:

- Erasmus stay overview
- institution/destination data
- relevant academic information
- Academic Summary
- key official statuses

## Academic Summary

Should be read-only and polished.

It should show approved course equivalences clearly.

It should not look like an editable spreadsheet.

## Learning Agreement

Should be table-first but guided.

It should show:

- rows
- status
- denied-row rationale
- resubmission state
- coordinator decisions
- clear submit/resubmit actions

---

# 16. Coordinator screens design direction

Coordinator screens should optimize decision-making.

They should show:

- queue of pending items
- urgency/status indicators
- student context
- item details
- decision actions
- rationale input
- history/audit information
- direct navigation to related items

Coordinator should not need to click through many screens to make a decision.

Use queue + detail layouts where appropriate.

---

# 17. Admin screens design direction

Admin screens should feel like governance and moderation tools.

They should show:

- moderation queue
- report count
- reported item details
- reporter information where appropriate
- moderation actions
- visibility status
- recent moderation activity

Avoid making admin feel like a generic database table.

---

# 18. Social screens design direction

Social screens should feel friendly but still scoped to Erasmus support.

They should not become a generic social network.

## Discover Students

Should show:

- filters
- Erasmus-relevant student cards
- destination/city/stage context
- connection action
- visibility/contactability information where useful

## Connections

Should show:

- pending requests
- accepted connections
- blocked/closed states if implemented
- direct access to messages

## Messages

Should show:

- conversation list
- selected thread
- clear message box
- accepted-connection requirement

## Content

Recommendations, tips, and reviews should be organized with filters and clear cards.

## Favorites

Should help users find saved useful content quickly.

---

# 19. Map design direction

The map must be real and useful.

The map screen should combine:

- filters
- result list
- map markers
- marker/list selection
- preview panel
- detail action
- report action

Recommended flow:

1. Filter
2. See result count/list
3. Select list item or marker
4. Preview content/place
5. Open detail or report

The map should not be just a large empty map with scattered markers.

The result list and preview panel are important for usability and testability.

---

# 20. Responsive design

The MVP should work well on normal desktop/laptop screens.

Responsive behavior should be reasonable where practical.

Priority:

1. desktop/laptop demo reliability
2. tablet-level layout sanity
3. mobile basic usability if feasible

Do not over-optimize for mobile at the expense of finishing core workflows.

---

# 21. Accessibility baseline

The app should follow basic accessibility expectations.

Codex should avoid:

- nested interactive elements
- buttons used as links
- links used as buttons without semantic clarity
- color-only status communication
- unlabeled form fields
- invisible focus states
- ambiguous icons without labels

Important UI elements should have accessible names.

Current active navigation should be understandable visually and semantically where possible.

---

# 22. Design decisions to record

When Codex makes visual or UX decisions, it must record them in `DECISIONS.md`.

Examples:

- shell layout pattern
- dashboard card pattern
- table pattern
- badge/status vocabulary
- demo role switcher behavior
- map/list/preview layout
- Learning Agreement UX behavior
- empty/loading/error/success conventions
- whether missing screens are inferred from specific references

Do not make design decisions silently.

---

# 23. Definition of visual success

The visual and UX direction is successful when:

- the app no longer looks like a raw scaffold
- key screens resemble the Figma/frontend-concept visual direction
- students understand what to do next
- coordinators can review quickly
- admins can moderate clearly
- social features feel secondary but useful
- map flow is understandable
- UI copy is human-friendly
- common actions are easy to reach
- missing screens still feel visually consistent with the rest of the product
