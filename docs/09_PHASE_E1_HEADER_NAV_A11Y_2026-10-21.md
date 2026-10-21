# Phase E1 / Batch 03 — Header navigation and accessibility parity

**21 October 2026.** This bounded source correction is UI-only, based on the current verified GitHub main at `6c9c6d0db1f214fb423daae0065de07aaaaf2440`. It does not activate any clinical API, authentication, patient storage, payment authority, signing, result review or clinic tenancy.

## Confirmed gaps and corrections

| Surface | Baseline observed | Batch correction | Acceptance evidence |
| --- | --- | --- | --- |
| Desktop search | Search-shaped inert div in `Shell.tsx` | Functional link to patient-directory search field; target ID added to records input | Source assertion and click-path test |
| Preview notifications | Button not connected to any notification workflow | Remove misleading interactive button; retain clearly labelled demo badge | Source assertion |
| Mobile header | Duplicate avatar/account menu alongside existing bottom **Me** route | Hide desktop account menu on mobile; retain five-item accessible bottom navigation | Source assertion and responsive screenshots |
| Desktop account popup | Did not dismiss with Escape or outside press | Escape restores trigger focus; outside pointer press closes; labelled account navigation | Source assertion; manual keyboard acceptance still needed |
| Responsive coverage | Recorded 390px route walkthrough only | Within **the same** continuous journey, screenshot dashboard, patient directory and staff profile at 320, 390, 768 and 1440 px and assert no document overflow | CI browser artifact when qualification succeeds |

## Acceptance criteria

- `pnpm install --frozen-lockfile`, `pnpm test`, `pnpm typecheck`, `pnpm lint` and `pnpm build` pass at the **exact batch SHA**.
- Browser review begins at `/` and follows visible controls. Do not jump into a deep route, manipulate persistence or use clinical APIs. One continuous recording, with 12 responsive screenshots and overflow checks.
- Verify desktop popup Escape/focus and clicking outside manually. The source test alone is **not** a browser accessibility audit.
- Vercel Preview must be verified independently if account permissions permit; a CI pass is not a substitute for a deployment check.
- `review/emr` must qualify before release; do not merge to `main` without owner approval.

## Larger E1 work still pending — do not silently mark complete

- `WorkspaceView.tsx` still uses substantive **new patient, appointment, encounter-draft and laboratory-request creation forms in modal dialogs**. This falls short of the stricter approved rule that substantive record workflows should be standalone Next.js pages. Convert these one at a time in a dedicated next bounded batch, with UI-level invalid-input and cancel/back tests. Do not change the existing dedicated detail/edit pages without verified defects.
- Audit dashboard metrics and quick actions, patient chart tabs, clinic settings, row click targets, mobile bottom-sheet focus, disabled actions and 320px wrapping in browser.
- After UI signoff, obtain clinician approval of models and workflow before implementing identity, independent PostgreSQL, audited access, immutable signed notes or live patient data.

**Safety gate:** browser fixture data is synthetic and transient; `src/server/authorization.ts` must remain deny-all and `/api/v1/patients` plus `/api/v1/appointments` must continue responding 503. Nothing in this batch authorises real patient information.

**Release log:** source branch `phase/03-emr-header-navigation-a11y`; exact final SHA, CI job URLs, browser artifact and Preview status must be appended only after independent verification.
