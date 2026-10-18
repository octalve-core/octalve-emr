# Octalve EMR — GitHub + Vercel preview-to-main authority (18 October 2026)

## Confirmed connection boundary
- Intended separate repository: `octalve-core/octalve-emr` (user reports created).
- The repository `octalve-core/octalve-emr` was confirmed through the connected GitHub tool on 18 October 2026. It has its own ID, independent admin/write access, is PUBLIC as of verification, and is EMPTY: no branch commit exists.
- Do not assume the repository is private: set it private in GitHub settings before adding any confidential project material. Never upload real patient data.
- Vercel verified team: **Octalve Vault** `team_048l7k9uaP1YfuEx5KaxO3dh`, slug `octalve-vault`. Create a dedicated **octalve-emr** Vercel project linked to `octalve-core/octalve-emr`. No EMR Vercel project is known to exist at this checkpoint.

## Same staging discipline as Finance, without repeated Vercel deployment quota
1. Keep `main` as the production branch, separate from Finance's main. Do not force-push or replace existing history.
2. Prepare source in `phase/00-emr-foundation`: batched commits, offline Node tests and source checks only. `vercel.json` sets `git.deploymentEnabled` **false** for `phase/**` and `review/qa/**`; skipped branches do not trigger automatic Vercel builds.
3. Complete initial real Node/pnpm install and **commit** a verified `pnpm-lock.yaml` (currently absent due to outbound network unavailable here). Review/full CI uses `--frozen-lockfile`. An opt-in manually dispatched `lockfile-bootstrap.yml` workflow can generate a downloadable lockfile if local pnpm installation is unavailable, **once that workflow file is present on the repository default branch**.
4. When an entire UI batch and full CI qualify, merge/push **one** `review/emr` branch to get one automatic Vercel Preview. Verify exact SHA, build status, functionality, mobile/desktop, and data guard. No real patient data.
5. After owner **explicit visual and release approval**, merge the tested content to EMR `main` through a PR; Git integration then performs EMR's independent Production build. Confirm its actual SHA and URL, and verify app routes. Production approval can be additionally gated through GitHub required checks and Vercel Deployment Checks; neither is presently configured or claimed.
6. Prefer automatic Git-connected builds. Do not initiate manual deploys for each UI edit or repeated API redeploy attempts. The original Finance quota errors were linked to repeated deployment attempts.

## Verified Vercel behaviour
`git.deploymentEnabled` prevents automatic deployments for selected branches. **Do not rely on an ignored-build command to avoid quotas**: Vercel notes even cancelled ignored builds can count toward quota.

Official docs: https://vercel.com/docs/project-configuration/git-configuration and https://vercel.com/docs/project-configuration/project-settings

## Brand assets
The approved temporary Octalve Finance images are **imported exactly once** using `pnpm brand:import-once` and then committed into EMR. `pnpm dev` and `pnpm build` never fetch Finance. The build uses `scripts/verify-brand-assets.mjs` to verify its own local files. Missing images fail closed. Replace with dedicated EMR assets later.

## Release limitations
No local Next.js build, lockfile, PR, deployment, GitHub push or protected branch rules have been verified in this environment. No live healthcare functionality is authorized or approved. The EMR repository exists and is accessible but remains empty at the verified checkpoint.
