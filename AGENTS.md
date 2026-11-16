# Agent implementation guide — ShengQuan-Web-Assets

This repository is the public, bilingual **Sacred Spring / 圣泉传说** showcase and asset library, **not** the CK3 gameplay mod source. Check the current `main` before reusing an old branch or patch; older optimization experiments are not automatically compatible with today's deployment.

## Publishing contract (Muse single HTML)

- `index.html` is the **only HTML file** copied into the existing Muse space. It contains the required CSS, JavaScript, `site-data`, `asset-data`, and `icon-data`. Do not add required external CSS/JS, HTML subpages, or network-fetched app code to the Muse entry point.
- Every player-facing topic, profession, glossary and release remains reachable through existing hash routes such as `#compendium`, `#m9`, `#profession-apothecary`, `#resources`, `#versions`, and `#v3161`. Preserve refresh, browser back/forward, bilingual switching and keyboard navigation.
- Large illustrations, screenshot galleries and game resource PNGs live in GitHub's `assets/` tree and are referenced by HTTPS/CDN URLs. Keep CDN revision and asset paths in sync.
- `topics/*.html` and `versions/*.html` are **optional standalone/static-host archives**, not extra files Muse can publish in the same space. They must not become dependencies of `index.html`.
- **GitHub commits do not publish Muse.** A separate manual Muse update and real-browser verification are required. See `MUSE_SINGLE_HTML.md`.

## Preserve content and visual identity

- Keep the Lady of the Lake palette (navy, lake blue, ivory, antique gold) and its restrained medieval visual language. Do not replace it with unrelated regional styling.
- Preserve all existing Chinese/English feature descriptions, 30 topic routes, five Astartes professions, source links, and recorded releases unless the underlying mod code or an explicit editorial decision justifies a change.
- Never overwrite or silently revise historical announcements. Add new `versions/<version>.md` records, update `versions/index.json` and site release data, and preserve the difference between **site-entry** and **actual release** dates.
- Independent release pages are indexed with `entries[].page` and `static_archive` in `versions/index.json`; these paths refer to repository/static-host files, **not** Muse navigation.
- Do not invent CK3 mechanics, conditions, UI icons, or claims of implemented features. Verify substantive statements against the gameplay source when available; otherwise mark uncertainty.

## Icon and performance rules

- Keep the 48 original in-page SVG icon definitions. The current Muse app generates selected light/dark PNG exports via browser Canvas **on demand**; it intentionally does **not** embed the old 480 PNG exports or require `assets/v1/icon-png-data.js`.
- Do not reinstate the superseded lazy-PNG external-script plan from `opt/modern-web-guidance-3161`: it conflicts with Muse single-file deployment. Keep native dialogs, image loading priorities, responsive behavior, and reduced-motion support.
- For modern HTML/CSS/JS changes, apply relevant web platform guidance without adding heavy frameworks. Report measured performance improvements only after testing, never from file-size estimates alone.

## Minimal validation before proposing a merge

1. Run `node scripts/verify-muse-single-html.mjs` and `node topics/verify-wiki.mjs`.
2. Recheck the touched routes and both languages. For a version change, keep `site-data.releases`, `versions/index.json`, standalone `versions/*.html`, and original `versions/*.md` in agreement.
3. Browser-check desktop/mobile entry load, search, dialogs, navigation, image loading, PNG export, keyboard and deep-link behavior. **Do not claim browser tests passed if only source checks were run.**
4. Do not merge an old optimization branch wholesale into `main`. Port only reviewed changes compatible with the current single-HTML contract and preserve existing working content.
