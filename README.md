# Octalve EMR — Independent Clinical Product Foundation

> **Status (18 October 2026):** Standalone, fictional-data UI prototype + proposed healthcare data model + fail-closed API stubs. **NOT** a production EMR, not a secure patient-record service, not clinically certified. Do not enter or upload real patient information.

Octalve EMR is a **separate product** built as a clean-room visual adaptation of the Octalve Finance UI shell. It is not a Finance fork and does not import Finance domain logic, payment integrations, project credentials, patient data, authentication, subscriptions, database, deployment configuration or document renderers.

## Delivered now

- Self-contained browser preview: [`demo/preview.html`](demo/preview.html). Opens without installing dependencies; includes fictional patient and clinic workflows that reset on refresh.
- Next.js 16 App Router / React 19 / TypeScript / Tailwind 4 source with independently implemented dark desktop sidebar (`#000A16`), Octalve blue (`#0064E0`), fixed navigation, mobile five-tab bar, responsive data tables, cards, status chips and dialogs.
- Clinical Overview, Patients, Patient Detail, Appointments, Encounters, Laboratory & Diagnostics, Ophthalmology, Dental Care, Billing, Reports and Clinic Settings.
- Standalone `/login` and `/signup` preview pages; inputs intentionally disabled until authentic identity, MFA and facility authorization exist. `/` redirects to `/login`; `/dashboard` remains a public fictional demo.
- In-memory demo actions: add fictional patient, schedule fictional appointment (same-clinician/same-start conflict check), create unsigned fictional note and diagnostic request, check in a fictional patient. Nothing is transmitted or persisted.
- Clinical domain pure-function tests, proposed Prisma/PostgreSQL schema with facility-scoped records, deny-by-default server authorization stub, disabled patient and appointment APIs, and architecture/privacy/provenance documents.

## Not delivered / not safe for live use

- No working user authentication, clinical RBAC, MFA, facility verification, actual patient persistence, encrypted clinical storage, signed medical notes, e-prescriptions, interoperability service, real FHIR endpoint, secure patient portal, audit logging, clinic payment processing, laboratory integration, subscriptions, backup/restore, clinical validation or production deployment.
- No database was provisioned, no migrations were applied, no live patient data was used, and no GitHub/Vercel projects were created.
- The proposed schema is a design contract, **not** a complete or reviewed production implementation. Relations, terminology constraints, indexes, locking, access policies and encryption must be validated during the backend stage.

## Local use

1. **Preview without installation:** open `demo/preview.html` in any modern browser. Use only its fictional sample records.
2. **Run Next.js locally** on a development machine with internet access, Node.js compatible with the selected Next.js version and pnpm installed:

   ```powershell
   corepack enable
   corepack prepare pnpm@10.18.3 --activate
   pnpm install
   pnpm dev
   ```

3. Open `http://localhost:3000/` for sign-in/signup previews, or `http://localhost:3000/dashboard` for the fictional clinic workspace.
4. To run offline-compatible checks: `node --test tests/*.test.mjs`. Once dependencies are installed, run `pnpm typecheck`, `pnpm lint`, `pnpm build` and browser tests before deployment.

**Important:** This package includes a review-only CI workflow and Vercel branch deployment rules. It does not include a lockfile because the build environment could not connect to the npm registry. Generate and commit `pnpm-lock.yaml` with `pnpm install` on a connected machine, then run frozen-lockfile CI. The Next.js package versions in `package.json` must be checked against current security advisories before production use.

## Establish a separate, private GitHub repository

The owner reports creating `octalve-core/octalve-emr`, but the EMR repository has now been verified via the connected GitHub account with admin/write rights and no commits. Verify the actual initial branch and files; **do not** overwrite an existing README or force-push. Once the repo is accessible, work on a separate phase branch rather than committing to main directly. See `docs/07_GITHUB_VERCEL_RELEASE_STRATEGY.md`. **Safe publishing process:** Inspect the actual remote default branch before writing. If it has `main`, clone it into a separate clean directory, create `phase/00-emr-foundation`, and copy these files into that new branch, preserving the existing remote files and history. If the remote is truly empty, create a minimal `main` baseline first and then the phase branch. We deliberately do not provide a blanket push command that could overwrite your existing repository state.

If Git reports an existing remote or branch, inspect the actual state first. Do **not** force push. Do not push any `.env` or patient data. Keep Octalve Finance (`octalve-core/octalve-invoice`) unchanged.

## Temporary real brand assets

The owner approved using official Octalve Finance icon/wordmark until original EMR artwork is supplied. Use `pnpm brand:import-once` only during initial asset import; thereafter `pnpm dev`/`pnpm build` use and verify EMR-owned local files; see `public/branding/README.md`. **The PNG assets are not included in this offline ZIP**. Run `pnpm brand:import-once` on a trusted connected machine, check hashes, and COMMIT both original PNGs into EMR. Thereafter the application builds and runs without contacting Finance.

## Controlled preview and release

See `docs/07_GITHUB_VERCEL_RELEASE_STRATEGY.md`. Phase branches are excluded from automatic Vercel deployments; one `review/emr` Preview precedes any separately approved EMR main production build.

## Recommended backend execution order

1. Clinician-reviewed healthcare requirements, FHIR R4.0.1 mappings and privacy impact assessment.
2. Real identity and facility membership/record-level access control, all server-side; audit read, export, mutation, signing and emergency access.
3. Versioned Prisma migrations, database constraints, KMS-backed encryption, private storage and tested backups.
4. Authoritative patient registration, appointments, encounters and clinical note revision/signing.
5. Orders, observations, laboratory results, medication workflows, clinical billing and verified specialty templates.
6. Security testing, clinical safety validation, interoperability conformance and production-readiness approval.

See `docs/` for source provenance, phase gates, domain model, security controls and acceptance checklists.
