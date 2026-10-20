# EMR UI Phase: Finance-inspired workflow parity (20 October 2026)

## Scope
This is a UI / in-memory review change exclusively within `octalve-core/octalve-emr`. No dependency on Octalve Finance, Booking, databases, secrets, clinical record authorities or subscriptions.

## User-specified corrections and mapping
1. Editable enquiries/records → eligible patient demographics, confirmed appointments, in-progress unsigned consultation drafts, pending laboratory requests. Completed clinical notes and settled charges stay read-only.
2. Mobile icon → remove mobile sidebar trigger; all secondary modules are accessible from the More route.
3. Dashboard text/icons → clinic welcome banner, segmented navigation, colourful low-opacity quick-access icons.
4. Profile → dedicated `/dashboard/profile` with role, facility and security readiness, not a dropdown detail view.
5. White backgrounds/shadows → #fff content surfaces, subtle shadows, soft rounded grey row highlights.
6. Finance action design → desktop popover menu, mobile bottom-sheet action chooser, large labelled options and icons.
7. Table three-dot menus → action button per clinical record; dedicated full detail pages with back navigation.
8. Mobile accessibility → stacked cards, stable bottom navbar, 38px action controls, focus trap/Escape in action sheet.
9. Full walkthrough → browser-generated video must begin at root and navigate only through visible controls; the GitHub Actions workflow is the source of the recording and reports any failures.
10. Release → development branch, CI and review preview; only merge after exact-SHA qualification and user authorisation.

## Dedicated inner pages
`/dashboard/patients/:id` (existing), `/dashboard/patients/:id/edit`, `/dashboard/appointments/:id`, `/dashboard/appointments/:id/edit`, `/dashboard/encounters/:id`, `/dashboard/encounters/:id/edit`, `/dashboard/laboratory/:id`, `/dashboard/laboratory/:id/edit`, `/dashboard/billing/:id`, `/dashboard/more`, `/dashboard/profile`.

## Safety boundaries
The session-only fixture cannot provide real access control, consent, durable persistence, clinician signing, provenance, audit event capture, patient messages or payment settlement. Clinical records must not be entered. Server-side permission and audit controls must be implemented and tested before accepting live data. Editing signed notes requires audited amendments, not overwriting. Lab result validation/release remains disabled.

## Acceptance tests
- EMR CI: frozen dependencies, 100% existing domain/source tests, new routes and responsive tests, TS, ESLint, Next build.
- Browser: start at `/`, click demo entry, walk through visible menu and records, enter fictional edits, mobile sheets, back links, profile, More, clinic modules and logout link; no database or direct API manipulation.
- 320/390/768/1440 px visual and horizontal-overflow checks. Review keyboard focus and touch target clarity per WCAG 2.2.

## Unresolved requirements
Real authenticated clinical backend, record history, conflict-safe appointment concurrency, role-based permissions, private document storage, digital signatures and clinical governance. This change is not a clinical production release.
