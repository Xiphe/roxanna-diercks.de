# Builder migration

Source: `Xiphe/sites` at `463a13d62af76b145ef9729d1a3fe7ad824da786`, builder tenant `roxy-trauer`. Architecture reference: `Xiphe/hannesdiem` at `886ce522d4f745c1f4c7824f49a6109331315c84`. Private database exports remain outside Git.

The legacy Jekyll commit `7eb09e728dd8ba4317fd81d6df19ecf68fefd543` is preserved on `pages`. Its GitHub Pages source must follow that branch; the migration's working branch is `main`.

Preserve production copy, layout, fonts, colors, responsive behavior, media credits, contact links, and animations. German is served at the root and English under `/en`; explicit `/de` prefixes canonicalize to the German root. Missing translations fall back only within an existing page, without inventing localized routes.

The user explicitly chose to keep both publicly reachable About pages despite their source draft label, omit the empty draft, and remove `/de_old` entirely. It returns 404 rather than redirecting. Preserve the summary-only English article as it currently appears.

Keep the five Brevo forms with their existing list/template and block IDs so confirmation links already sent continue to work. Correct the pet-group button to the signup on its own page, locale filtering in blog previews, ignored name fields, duplicate anchors, and the inverted search-indexing flags. Update the privacy page's hosting information from Vercel to Cloudflare; preserve other editorial content for review.

Use GitHub Issues for staged acceptance and direct commits to `main`. Review a deployed preview before switching production DNS. Existing hosting and the source database remain available for rollback.

Cloudflare proxying is reserved for Cloudflare-hosted services. External services must use DNS only, including the existing Vercel recipe sites at `rezepte`, `recipes`, and `recetas`.
