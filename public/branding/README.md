# Temporary Octalve branding (self-contained EMR assets)

The owner approved using the original Octalve Finance icon and wordmark temporarily in EMR. For **build independence**, the files must exist INSIDE `public/branding/` in the EMR repository and be checked in before any deployment. No runtime or build step fetches Finance.

- `octalve-finance-icon.png` — pinned original image from Finance commit `32d51b3ba0e238f0ffe29e7202cc242047242059`, expected Git SHA `209327186b2f8e2952d12fb7b7eec1486c18d97e`.
- `octalve-finance-wordmark.png` — pinned original image from the same commit, expected Git SHA `924c1b7ee0141969bbb05c2055db192785e12b50`.

**Once-only setup** (on a trusted machine with network): `pnpm brand:import-once`, then `pnpm brand:verify`, commit both PNGs to **EMR only**. This is a one-time import of the approved graphical assets, not an EMR-to-Finance service integration. `pnpm dev` and `pnpm build` never contact Finance. If assets are missing or modified, builds fail closed.

Once the owner provides EMR-specific artwork, replace both assets and revise `src/config/branding.ts`, `app/layout.tsx` and `scripts/verify-brand-assets.mjs`; remove the one-time importer from the project.
