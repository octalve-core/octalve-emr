# Build / Review Evidence — 18 October 2026

## Source and tooling
- Visual reference: Octalve Finance `main` commit `32d51b3ba0e238f0ffe29e7202cc242047242059`.
- Development package: new independent Octalve EMR source, no direct Finance code imports.
- Source audit: static check confirms no `MerchantPreviewProvider`, invoice-generator or Finance invoice route in shell or demo state.

## Successfully checked
- `node --test tests/*.test.mjs`: 9 unit + source-guard checks passed.
- TypeScript/TSX files parsed using locally available TypeScript compiler transpilation diagnostics; syntactic error count 0. **This is NOT type-checking.**
- Standalone `demo/preview.html`: Playwright Chromium headless via inline HTML (direct file and localhost navigation were blocked in this container). Desktop 1440×900, tablet 768×1024 and mobile 390×844 / 320×720 rendered with no page JavaScript errors and no page-level horizontal overflow.
- Browser interactions at all four widths: navigate all ten clinical sections; add fictional patient; search/filter; open patient record; schedule fictional appointment; create unsigned fictional encounter note.
- Images: `demo/emr-1440.png`, `demo/emr-390.png` and patient-detail captures are actual screenshot outputs from the standalone preview.

## Not verified
- Next.js package install, TypeScript full semantic check, ESLint, production build: npm registry DNS inaccessible (`EAI_AGAIN`). No dependency lockfile could be built.
- Prisma schema validation/migration: CLI and database unavailable.
- Server-side authentication, encryption, KMS, signed notes, NDPA compliance, FHIR conformance, clinical safety, production deployment: NOT tested or implemented.
- No Vercel deployment or live EMR repository exists. Must not represent any page as a production patient-record service.

## Required before deployment
Run pnpm install on a connected developer machine, pin lockfile, `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, Playwright against Next app routes, Prisma `validate`, integration/negative authorisation tests. Resolve failures before claiming readiness. Separate frontend UI acceptance from backend clinical approval.

## 18 Oct repository-ready hardening
- One-time import the approved temporary Octalve brand images into EMR, verify Git blob hashes, and commit the local PNGs. There is no runtime/build-time connection to Finance.
- Add isolated Github clinical guard, reviewed-build and optional lockfile-bootstrap workflows.
- Add Vercel Git branch auto-deployment exclusion instead of ignored build steps (cancelled builds may count to quota).
- Local verification: `node --test tests/*.test.mjs` **12/12 passed**; no Finance record context imported into shell.
- No claims of remote GitHub push, Next.js dependency build, Vercel deployment or latest browser screenshot verification.
