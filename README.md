# 圣泉传说 · Sheng Quan Chuan Shuo Web Assets

This public repository contains **website-only assets** for the non-commercial CK3 fan project *Sheng Quan Chuan Shuo*.

- `index.html`: one Chinese/English SPA for source control and optional static hosting.
- `assets/v1/*.webp`: 80 optimized images: 18 cover images, 18 thumbnails, screenshots, location map and hero images.
- `asset_manifest.json`: file mapping used by the website.
- Small SVG and PNG icons remain embedded in the HTML, avoiding hundreds of image requests.
- Private mod source, artwork masters, and unreleased designs are deliberately excluded.

## Delivery
The main website remains on Muse unless separately published elsewhere. Updating this GitHub repo **does not automatically update Muse**. The HTML uses CDN URLs such as:
`https://cdn.jsdelivr.net/gh/jqkj/ShengQuan-Web-Assets@main/assets/v1/cover-m1.webp`

For changes to image bytes, prefer a new folder such as `assets/v2` and update HTML references to avoid stale CDN caches. Verify CDN availability and the site's CSP before switching the live Muse page.

## Artwork & copyright
Original artwork is publicly visible for website use, **not licensed for redistribution, modification or commercial reuse**. Third-party IP, marks and game assets remain with their respective owners. Some images were made with AI assistance and their copyright status may vary by jurisdiction. This project is unofficial and is not affiliated with or endorsed by Paradox Interactive or Games Workshop. This repository does not grant an open-source artwork license.
