# Modern Web Guidance — website optimization (V3.1.6.1)

## Starting point

- Base commit: `282420003a16569c236915cb56476211215397c1`; all earlier release notes remain in `versions/`.
- Audit: initial standalone HTML is ~1,652,807 characters with 480 embedded PNG icon exports, every route's content, and the original SVG icon library.
- This working branch intentionally does not update `main` or the Muse-hosted site until verified.

## Change 1: load PNG icon exports on demand

- Original PNG files are preserved byte-for-byte as base64 entries in `assets/v1/icon-png-data.js`.
- Main `index.html` no longer embeds those export variants; 911,467 characters removed (uncompressed source comparison).
- PNG export loads the archive only when a user clicks a PNG size in the icon dialog, and reuses it for subsequent exports.
- If the CDN is unreachable (including when previewing this branch before main is merged), render a PNG from the existing SVG, keeping PNG download usable. The fallback may differ slightly in stroke or color rendering from the originally pre-rendered export; the original archive remains canonical.
- Original icon SVGs, feature routes, bilingual site content, announcement history, and `data:image` branding remain unchanged.

## Guidance and safety

- `performance`: remove non-critical work from initial page parsing; keep the above-the-fold asset priority.
- `optimize-image-priority`: retain one critical image with `fetchpriority=high` per view, and `loading=lazy` for below-the-fold pictures.
- Do not enable `content-visibility:auto` indiscriminately: it can harm the first viewport and keyboard reachability.
- Regression checks before merge: site-data equality, all routes and version entries, native dialog/search, icon SVG download, original 480 PNG variants, offline SVG-to-PNG fallback, desktop/mobile page load.

## Publishing

The HTML and the delayed icon archive must both be published from the same tested Git revision. The Muse site does NOT sync automatically with GitHub. Do not switch the Muse HTML to this revision before the archive is published to the CDN or a same-origin copy exists.
