# Phase E1 Batch 04 — Discoverable appointment check-in

**Date:** 21 October 2026. **Scope:** Octalve EMR independent fictional UI only.

## Verified initial problem
The appointments schedule showed a `View` link and record menu. A staff-facing check-in control existed only under the action menu of a **confirmed appointment detail**, so a first-time user could not easily discover it.

## Changed behavior
- On the appointments list, confirmed entries display **Review check-in**, leading to the existing dedicated Next.js appointment record. Other statuses retain **View**.
- On the dedicated record, confirmed appointments show a prominent **Check in (demo)** button, in addition to the action menu.
- The button and menu use the same **short quick-confirmation dialog**, with patient, clinician, date and time. It does **not** open clinical records as a popup.
- Confirmed → Checked in changes only browser-memory demonstration state. A success message and **Checked in (demo)** status follow; the action disappears after check-in.
- Already checked-in, completed and cancelled appointments cannot be checked in through that UI.
- Browser regression includes the complete path from homepage → fictional workspace → mobile More → Appointments → Review check-in → existing appointment edit → check-in confirmation → status update, before continuing through other workspaces. Responsive evidence now includes appointment check-in at 320, 390, 768 and 1440 px.

## Explicitly not implemented
Staff login, facility permission, identity verification, proof of arrival, actual clinician notification, queue allocation, patient encounter creation, patient audit logging and permanent status. A frontend demonstration is **not** clinical authority. Never enter live patient data.

## Release
Start from qualified `review/emr` `ffcd74367a845c95874fa8164e4a9c68445bd5fb`, make changes on `phase/04-appointment-checkin-visibility` and test first. Fast-forward `review/emr` only after development guard passes. Require frozen install, unit/security source tests, typecheck, lint, build and one full continuous Playwright walkthrough. Production `main` is unchanged until owner authorizes release.
