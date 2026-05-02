# ErasmusMate Design System

## Overview
ErasmusMate is a two-layer platform combining institutional Erasmus mobility management with a social-support layer for student connections.

## Design Principles

### 1. Clear Separation of Concerns
- **Institutional Core**: Primary layer with calm, trustworthy blue tones
- **Social-Support Layer**: Secondary layer with warm orange accents
- Clear visual and navigational separation between the two

### 2. Hierarchy & Structure
- Institutional procedures take visual priority
- Social features are clearly separate, never mixed with official processes
- Strong status visibility and traceability throughout

### 3. Accessibility & Trust
- WCAG-compliant color contrast
- Clear typography hierarchy
- Minimal, professional aesthetic
- Production-ready component patterns

## Color System

### Institutional Colors
- Primary: `#1e3a8a` (Deep Blue)
- Secondary: `#3b82f6` (Bright Blue)
- Background: `#eff6ff` (Light Blue)

### Social Colors
- Primary: `#ea580c` (Orange)
- Secondary: `#fb923c` (Light Orange)
- Background: `#fff7ed` (Cream)

### Status Colors
- Success: `#16a34a` (Green)
- Warning: `#eab308` (Yellow)
- Error: `#dc2626` (Red)
- Pending: `#eab308` (Yellow)
- Review: `#3b82f6` (Blue)

## Typography
- Base font size: 16px
- Headings: Medium weight (500)
- Body text: Normal weight (400)
- Clear hierarchy: h1 > h2 > h3 > body

## Components

### Design System Components
- **Button**: Primary, Secondary, Outline, Ghost, Destructive, Social variants
- **Card**: Flexible container with hover states and padding options
- **StatusChip**: Visual status indicators with consistent styling
- **Input**: Text inputs with icons, labels, validation states
- **ProgressIndicator**: Multi-step process visualization

### Navigation Components
- **TopNavigation**: Role-based with section switcher for students
- **SideNavigation**: Context-aware based on role and section
- Clear distinction between institutional and social navigation

## User Roles

### Student
- **Institutional**: Dashboard, procedures, submissions, deadlines, exceptions
- **Social**: Discovery, connections, messaging, map explorer

### Coordinator
- Review queue, approval workflows, deadline management
- Delegation and audit-aware interfaces

### Administrator
- Moderation queue, user management, feature scoping
- Platform health and integration monitoring

## Key Screens

### Institutional Layer
1. Student Dashboard - Overview of mobility status
2. Document Submission - Multi-step upload with validation
3. Submission Detail - Review outcomes and history
4. Coordinator Review - Approve/reject/reopen workflows
5. Admin Moderation - Content and user governance

### Social Layer
1. Social Discovery - Find and connect with students
2. Connections List - Manage network
3. Messaging - Chat with accepted connections only
4. Map Discovery - Location-based content exploration
5. Create Recommendation - Share experiences

## Responsive Strategy
- **Mobile-first** for student flows
- **Desktop-optimized** for coordinator/admin dashboards
- Adaptive layouts for all screen sizes

## Key UX Patterns

### Status Visibility
- Clear status chips throughout
- Timeline and progress indicators
- Audit trail information

### Decision Recording
- Rationale fields for all decisions
- History and traceability
- Validation checklists

### Privacy & Consent
- Explicit consent controls
- Visibility settings
- No private location tracking
- Moderation and reporting built-in

### Error Handling
- Clear validation messages
- Submission state management
- Integration failure handling

## Navigation Rules

### Institutional Navigation
- Primary focus and prominence
- Official procedures remain separate from social
- Clear procedural flows

### Social Navigation
- Clearly marked as secondary
- Separate from official workflows
- Messaging only after connection acceptance

## Implementation Notes

### Technology
- React + TypeScript
- Tailwind CSS v4
- Responsive components
- Production-ready patterns

### File Structure
```
components/
├── design-system/     # Reusable design components
├── navigation/        # Navigation components
├── student/          # Student institutional screens
├── coordinator/      # Coordinator screens
├── admin/           # Admin screens
├── social/          # Social-support layer screens
└── auth/            # Authentication screens
```

## Future Considerations
- Dark mode support
- Internationalization (i18n)
- Accessibility enhancements
- Animation and micro-interactions
- Performance optimization
