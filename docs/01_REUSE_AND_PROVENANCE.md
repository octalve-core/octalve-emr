# Phase A/B — Clean Extraction and Provenance

## Frozen source authority
- Visual reference: `octalve-core/octalve-invoice` `main` at commit `32d51b3ba0e238f0ffe29e7202cc242047242059`, inspected 18 October 2026.
- Finance source: Next.js shell `app/(dashboard)/layout.tsx`, `components/dashboard/{Sidebar,TopNavbar}.tsx`, `components/dashboard/mobile/{BottomNavbar,MobileHeader}.tsx`, `components/ui/`, `src/features/records/components/`, `app/globals.css`.
- Finance source provenance declaration: `docs/project/FINZEFY_IMPORT_PROVENANCE.md`, references `octalve-core/finzefy-nextjs-frontend` at `4660eda71248266f5b97b52638f6d26429370621` and Sapphire renderer donor at `dfd2657fc22f56c4b82808ca4072ad0300cb753c`.
- GitHub metadata did not advertise a licence for Finance, Finzefy frontend or Sapphire repository. This must be resolved with rights holders before copying original code/assets into other commercial products. No permission is inferred from public repository visibility.

## Extraction policy followed
- **Visual inspiration only**, independently authored clinical shell and components. Octalve dark sidebar `#000A16`, blue active state `#0064E0`, hover `#0052B8`, rounded cards, white main canvas, fixed sidebar and compact mobile navigation.
- **No donor code or images** imported; app shell and UI elements written anew. No Sapphire invoice renderer, Finzefy branding, financial screenshots, corporate account templates, finance demo datasets or merchant profile context included.
- Icons reference the open-source `lucide-react` package. The temporary actual Octalve icon and wordmark are selected for initial EMR branding by owner request, to be imported once and committed in EMR. Until then the UI has a generic medical icon fallback.
- Financing and clinical user accounts remain independent. Future optional shared UI package would contain only audited generic UI components, under version control with a clear licence.

## Absolute product separation

| Boundary | Finance | EMR |
| --- | --- | --- |
| Repository | `octalve-core/octalve-invoice` | `octalve-core/octalve-emr` (confirmed empty on 18 October 2026) |
| Database | Merchant/finance schema | Separate facility/patient clinical schema |
| Authentication | Finance business membership | EMR facility membership and clinical permissions |
| Transactions | Invoice/payment/receipt authority | Clinical encounter/document authority |
| Document rendering | Invoices and financial PDFs | Clinical notes, lab results, prescriptions (future) |
| Production infra | Finance deployment, secrets, storage | Independent EMR deployment, secrets, storage |
| Plans | Finance commercial entitlements | Independent EMR entitlement model (future) |
| CI | Finance source pipelines | EMR pipeline (future) |

No network bridge between products is implemented. A future integration must require a separate legal basis, user authorization and scoped API agreement; never a shared database.
