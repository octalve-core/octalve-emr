# Octalve EMR — Six-Phase Programme

| Phase | Scope | Status on 18 Oct 2026 | Exit criteria |
| --- | --- | --- | --- |
| A | Freeze Finance reference, inventory reuse, inspect rights | Completed as visual-source review | Pin commit; provenance documented; no copied donor components |
| B | Independent repository/source shell and healthcare navigation | Local package built; GitHub repo not created | Private independent repo, CI and owner UI acceptance |
| C | Patient/facility/encounter/appointment/clinical domain | Draft architecture + proposed schema | Clinician-reviewed models; data privacy and FHIR mapping acceptance |
| D | Auth, facility tenancy, roles, audit, KMS, database, recovery | **NOT IMPLEMENTED** (fail-closed stubs only) | Threat model, live DB, secure API, security and backup tests |
| E | End-to-end clinical visit workflow | Fictional UI journey only | Persisted, properly signed and role-controlled visit journey validated by clinicians |
| F | Eye and dental specialty | UI specifications only | Specialist-approved structured exams, tests, terminology, images and forms |

## Priority next build units

**Unit 1 — Clinical specifications:** patient identity and MRN, facility/onboarding roles, appointment/queue workflows, chart/encounter signing, diagnostic orders, prescription boundaries, facility billing authority, ophthalmology/dentistry field catalogue.

**Unit 2 — Secure server minimum:** managed PostgreSQL, Prisma validation + migrations, auth, facility membership, CSRF/origin checks, tenant/patient ABAC, secure encryption and audit/outbox. No open patient API.

**Unit 3 — Clinical vertical slice:** authorised patient registration and deduplication, availability-aware appointment booking, controlled check-in, actual clinician encounter, draft note, note signature and amendment, follow-up, audit read and export access.

**Unit 4 — Diagnostics and clinic finance:** service requests, result review, notification routing, lab interfaces, EMR-only charges, secure reporting and reconciled clinic payment service.

**Unit 5 — Specialty and deployment:** eye/dental structured forms with specialist review, privacy/security/accessibility tests, rollback/backup drills, compliant hosting and operational release gating.

Do not develop EMR by editing or branching Finance into production; Finance continues independently. Proposed shared UI package belongs after both products mature, not during clinical foundation setup.
