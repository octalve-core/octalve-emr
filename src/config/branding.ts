/** Temporary officially approved Octalve brand images, owned as EMR repository artifacts.
 * Replace through this one module when Octalve EMR artwork is supplied.
 * The images are imported once, verified and committed to EMR. Build/runtime use local files ONLY. */
export const EMR_BRAND = {
  productName: "Octalve EMR",
  description: "Independent clinical workspace",
  sourceCommit: "32d51b3ba0e238f0ffe29e7202cc242047242059",
  iconUrl: "/branding/octalve-finance-icon.png",
  wordmarkUrl: "/branding/octalve-finance-wordmark.png",
} as const;
