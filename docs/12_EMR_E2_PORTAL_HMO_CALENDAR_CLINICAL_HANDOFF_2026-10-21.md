# Octalve EMR — Approved expanded scope and E2 acceptance

**Owner clarifications:** 21 October 2026. **Independent product:** `octalve-core/octalve-emr`. Octalve Finance and Booking are not runtime dependencies.

## Binding product decisions

1. **Patient-facing commerce and independent patient portal.** Pharmacy and optical inventories are not only staff lists. Eligible patients browse product catalogues, select frames/lenses and permitted items, see availability, create a basket and place orders from their portal. Inventory owns stock truth, fulfilment and substitutions. A prescription-only medicine cannot be self-authorised by a shopping-cart action: clinician-issued prescription and dispensing permissions must be verified. Separate stock reservation, payment, release and delivery/collection events; patient catalogue does not expose cost prices, staff notes or other patients.
2. **HMO/insurance available in scope.** Facility-configurable payer/HMO directory, plan, patient eligibility, member ID, coverage, preauthorisation, co-pay, claim preparation, submission and reconciliation, with payer-adapter strategy. Fallback/manual review for insurers without APIs. Never label coverage verified unless confirmed by a configured source. Self-pay, HMO and corporate classifications distinct.
3. **Calendar and external integrations available in scope.** Google Calendar, Microsoft Outlook and clinic calendar sync via configured OAuth; provider-specific consent, scoping, revocation, idempotent webhooks and conflict reconciliation. Calendar title and description must be minimum-necessary: do not leak diagnoses/patient names to shared calendars. Also plan laboratory/imaging, payment and secure messaging adapters.
4. **Clinician-to-staff handoff:** clinician can send an authorised prescription or operational task to a front-desk/dispensary/optical queue following check-in/consultation. Reception sees only the task, identity needed for fulfilment, and status—not the complete clinical note. Prescriptions remain clinician-authored and dispensing requires its own authority.
5. **Typography:** Verified official Holding `src/app/globals.css` uses `Arial, Helvetica, sans-serif`, and its hero uses `font-medium`; EMR already uses Arial, so the requested visual correction is primarily medium rather than bold/extrabold text. Retain approved #0064E0 and #000A16.
6. **Page model:** all patient, order, examination, inventory, checkout, HMO and integration details live on standalone Next.js pages. Only quick actions/confirmations use desktop popups or mobile sheets.
7. **Clinical backend absent:** no auth, clinical signing, result release, payment/HMO verification, real booking, clinical storage or NDPA compliance claim. Use only synthetic browser fixtures; clinical APIs stay fail-closed (503) through UI work.

## E2 — bounded implementation now

- Replace header's inert search-shaped link with real, keyboard-usable responsive search across session-only patients, appointments, encounters, laboratory and charge records. Results link to existing separate pages; search queries are not transmitted to an API.
- Fix desktop table columns: explicit Actions column for laboratory, encounters and billing; status and action cells separated; currency values right-aligned; mobile cards untouched.
- Apply medium typography to EMR UI following the verified Holding styles, without loading third-party fonts or importing Holding runtime code.
- Preserve brand/preview safety gates.
- Qualify exact SHA with frozen pnpm, source clinical tests, TypeScript, lint, Next build, 320/390/768/1440 browser evidence and a single complete click-based walkthrough from `/`.
- Use `phase/06-e2-search-table-typography` then `review/emr`. **Do not promote to main without owner approval.**

## Follow-on plan, bounded, no blind implementations

**E3 Patient journey:** patient self-service appointments + staff scheduling, configurable duration/buffers, check-in, queues, clinician-to-staff task/handoff and follow-up. Role-informed UI mocks only.

**E4 Ophthalmology & dental:** individual functional speciality pages with validated OD/OS/OU fields, refraction/IOP/fundus, odontogram/periodontal chart, imaging and authorised prescription model; link each to encounter and patient.

**E5 Patient shopping, HMO and external integration UI:** independent portal shell, medicine/optical catalogues, cart, orders and inventory source-of-truth design; payer plans/eligibility/claims UI and Google/Microsoft calendar connections configuration, referral/lab adapters and patient communications. No live orders, payments or provider tokens before backend approval.

**E6 Reports:** report catalogue and selectable patient, appointment, clinical, inventory, HMO, billing and operational analyses; clearly defined measures, date/facility/role filters, privacy thresholds and authorised exports.

**E7 Clinic settings & staff:** separate facility, departments, hours, services, identities/roles, patient portal, specialty charting templates, stock, suppliers, HMO, integrations, consent, communications, audit, data export and retention settings pages. Permission matrix must specify action, role, facility and clinical scope.

**D1+ Secure backend:** independent PostgreSQL, verified staff identity/MFA, facility-scoped RBAC/ABAC and audits, clinical documents, event lifecycles, provider security and transaction-controlled inventory and scheduling. Clinician domain review required before patient-to-visit-to-prescription-to-follow-up activation.

## Non-goals of E2
No real patient data, no purchased cart/stock decrement, no HMO API key submission, no calendar tokens, no clinical permission based on frontend role, no Finance or Booking runtime integration.
