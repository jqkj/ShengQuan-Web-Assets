# Repository guidance for AI coding agents

This repository is the **public Sacred Spring showcase website**, not the playable CK3 mod source.

## Modern Web Guidance

Before material HTML, CSS, client-side JavaScript, performance, or accessibility changes, consult Google's [Modern Web Guidance](https://github.com/GoogleChrome/modern-web-guidance-src/tree/main/guides/modern-web-guidance). If the modern-web-guidance CLI is installed, use a focused 2–5 word `search` query, `retrieve` the matching guide, and verify the change against it. If the CLI cannot access the network, read the relevant checked-in upstream guide source rather than inventing advice.

Modern platform features should have the fallback required by the retrieved guide if not Baseline Widely available. Prefer native HTML, CSS, and browser APIs to adding a framework or runtime dependency.

## Preservation rules

- **Never delete or overwrite a historical release:** keep `versions/*.md`, `versions/index.json`, and standalone `versions/*.html` in sync as versions grow. Preserve original historical wording, limitations, and dates; do not silently convert a site-entry date into a claimed game release date.
- Preserve the Chinese and English content, existing in-site `#...` deep links, module routing, icon downloads, and independent URLs when making layout or architecture changes.
- Keep the Lady of the Lake color system (navy, lake blue, ivory, antique gold) as the visual identity. Dragon Realm may have regional motifs, but the shared site remains Lake Lady themed.
- Large images stay in `assets/v1` or `assets/releases` rather than being inlined into `index.html`.
- **480 canonical icon PNG exports** live in `assets/v1/icon-png-data.js` and are loaded only on actual PNG export; the SVG library remains in the main site, also providing a graceful export fallback.
- Do not convert the whole site to a new framework without a separate plan and acceptance tests.

## Publishing and testing

GitHub commits do not publish the Muse-hosted site. Release HTML pages under `versions/` are standalone static-host files; Muse currently uses internal hash routes until explicitly synchronized.

On a change branch, verify at minimum:

1. `index.html` client-side script parses; embedded `site-data`, `asset-data`, and `icon-data` remain valid JSON.
2. The original feature routes, five professions, release entries, and historic links are present.
3. All 480 original PNG export variants remain available, download-on-demand still works, and the SVG fallback is tested for offline/CDN failure.
4. Static release pages load directly in a browser, display Chinese and English, preserve full history, work with keyboard, and have valid relative assets and links.
5. Desktop/mobile navigation, dialogs, search, lightbox, back navigation, and images are checked in a real browser; run performance profiling (LCP/INP/CLS) before making performance claims.
6. Never merge into `main` or claim a Muse publication solely on source-only checks.
