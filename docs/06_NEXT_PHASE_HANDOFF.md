# Octalve EMR — Exact Continuation Handoff (18 October 2026)

## Product identity and constraints
Independent Octalve EMR product. Never alter or depend upon `octalve-core/octalve-invoice`. Keep separate repo, db, auth, deployment, storage, subscription and clinical document authority. Visual continuity: dark fixed desktop sidebar #000A16, Octalve active blue #0064E0, white cards, mobile five-tab nav. Avoid importing source assets/components from Finance donors without proven reuse rights.

## Current output
Archive: `octalve-emr-foundation.zip` (extracts `octalve-emr/`). Demo: `demo/preview.html`. Next.js UI source: `app/`, `src/components/`, `src/lib/`. Clinical draft schema `prisma/schema.prisma`, fail-closed API endpoints `app/api/v1/`, docs `docs/`.

## Verified and not verified
- 9 Node tests pass; 15 TS/TSX files syntax-parse without errors.
- Standalone browser UI: ten sections, 4 responsive viewports, session-only patient, appointment, note interactions tested.
- **Not checked:** dependency install, Next full type/build/lint, Prisma validate, backend integration, real clinical data, live auth and deployment. npm registry was unreachable in the build environment.

## Next steps, in exact order
1. Repository `octalve-core/octalve-emr` already exists, currently PUBLIC and EMPTY at the confirmed checkpoint; set PRIVATE, then create first commit and independent phase branch. No Finance branching or force pushes. Review source provenance/legal ownership.
2. On a connected machine: install dependencies, generate and commit pnpm lockfile, run Next typecheck/lint/build and fix actual failures; validate current Next.js security patches. Add independent CI with frozen pnpm install, tests, build and dependency scanning.
3. Review UI at desktop/tablet/mobile against desired visual identity; do not invent medical branding assets or claim owner approval. Check accessibility and all real Next app routes.
4. Obtain qualified clinician approval of scope and workflows for ophthalmology, dentistry and general outpatient; version precise clinical fields, status/authorisation transitions, terminology, patient and practitioner identity.
5. Draft NDPA/privacy impact assessment and security threat model. Decide regulated hosting, database/KMS/backup policy, clinic tenancy and read-audit requirements.
6. Revise and validate schema; implement real authentication, MFA, facility membership/ABAC, audit and storage before opening patient APIs. Test cross-tenant authorization on every clinical action.
7. Build secure vertical slice: patient registration/deduplication, appointment availability, visit check-in, encounter, signed clinical notes with immutable version history, test orders, reporting and follow-up. Test concurrency and clinical exceptions.
8. Add lab/pharmacy, specialty forms, medical images and EMR-only billing under separate verified approvals, then perform clinical acceptance and release checks.

## Critical prohibitions
Do not store real patient data in client context or demo fixtures; never expose patient CRUD publicly; never use Finance merchant-preview state as healthcare auth; never claim demo activity was audited, clinical notes signed, prescriptions sent or diagnostics completed; never let an administrator role silently grant unrestricted access to sensitive patient records; never silently overwrite a signed note.

## 18 Oct update — Repo + Release Preparation (separate user request)
- User reports creating `octalve-core/octalve-emr`. Direct GitHub repository lookup confirmed `octalve-core/octalve-emr` with independent admin/write access; repository PUBLIC and empty, no push/PR/merge performed.
- Real Octalve Finance icon and wordmark temporarily selected, source pinned to Finance SHA `32d51b3ba0e238f0ffe29e7202cc242047242059`. MUST be imported once and checked into EMR with exact Git blob integrity checks. No development/build/runtime connection to Finance. Images not yet embedded in offline ZIP.
- New `vercel.json` prevents automated deployments from phase/** and review/qa/** branches while permitting review/emr Preview and main Production through a separate project. No Vercel project has been linked or deployed.
- `.github/workflows/source-guard.yml` runs cheap independent clinical source tests. `.github/workflows/review-qualification.yml` gates dependency/build qualification; requires committed pnpm-lock.yaml. One-time lockfile bootstrap workflow is included, but is discoverable as workflow_dispatch only after installed on repository default branch.
- 10/10 local Node tests pass. Next build/typecheck/lint and updated screenshots are still unverified due to outbound package/network/browser constraints.
- **Next allowed write after final source audit:** inspect actual `octalve-core/octalve-emr` contents, default branch, privacy and permissions. Create `phase/00-emr-foundation` based on its existing main, upload only new EMR source (do not overwrite unexpectedly existing files), test, publish one review/emr Preview on independent Octalve Vault Vercel project. Production requires owner approval.
