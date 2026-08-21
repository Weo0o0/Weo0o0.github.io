---
name: weo0o0-jekyll-ui
description: Apply UI/UX changes to this Jekyll Minimal Mistakes blog (Weo0o0-Note). Use when restyling pages, tokens, fonts, dark skin, 404, search, or accessibility. Prefer Liquid/SCSS overrides over React/Tailwind libraries.
---

# Weo0o0-Note Jekyll UI stack

This site is **Jekyll + Minimal Mistakes + Liquid + SCSS + jQuery**. Do not introduce React, Tailwind, shadcn, or daisyUI.

## Skills to load (in order)

0. `skill-advisor` — when the user is unsure which skill to call; route intent first.
1. `impeccable` — `/impeccable critique` then polish. Existing-site first.
2. `web-design-guidelines` — audit `_layouts/`, `_includes/`, `_pages/`.
3. `frontend-design` — only after critique; keep dark editorial blog identity (not purple-gradient AI defaults).
4. `web-design-engineer` — HTML/CSS/JS artifacts when a new surface is needed.
5. `check-frontend-accessibility` — WCAG 2.2 A/AA on Liquid/HTML/SCSS.
6. `effective-ui-design` — contrast, 8pt spacing, `clamp()`, `prefers-reduced-motion`, dark `color-scheme`.
7. `extract-design-system` — dump tokens from `_sass` / live site into CSS variables; do not fork theme core.
8. `product-manager-skills` — prioritize blog work / short PRD before large UI changes.

## Where to edit

| Change | File |
| --- | --- |
| Tokens, fonts, skin values | [`assets/css/main.scss`](../../../assets/css/main.scss) **before** `@import` |
| Post-import CSS (404, focus, motion) | [`_sass/_weo0o0-overrides.scss`](../../../_sass/_weo0o0-overrides.scss) |
| Head meta, Pretendard CDN | [`_includes/head/custom.html`](../../../_includes/head/custom.html) |
| Nav / UI copy | [`_data/navigation.yml`](../../../_data/navigation.yml), [`_data/ui-text.yml`](../../../_data/ui-text.yml) |
| Structure | [`_layouts/`](../../../_layouts/), [`_includes/`](../../../_includes/) |

Do **not** keep adding site-specific rules to `_sass/minimal-mistakes/*.scss`. That path is the vendored theme.

## Git repos mapped to this project

### Skins (Catppuccin Mocha already wired as surfaces)

- https://github.com/catppuccin/catppuccin — Mocha hex used as `$background-color` `#1e1e2e`, `$text-color` `#cdd6f4`, `$footer-background-color` `#181825`.
- https://github.com/mmistakes/minimal-mistakes — upstream skins; copy `catppuccin_mocha` SCSS only if gem is upgraded past 4.26.2.
- Brand accent stays `#00adb5` (existing teal), not Mocha mauve.

### Type

- https://github.com/yangheeryu/Gowun-Batang — body / headings (`$serif`, `$global-font-family`).
- https://github.com/yangheeryu/Gowun-Dodum — masthead, buttons, footer (`$sans-serif`, `--note-font-ui`).
- https://github.com/orioncactus/pretendard — UI fallback via jsDelivr in `head/custom.html`.

Do not reload unused Dongle/Sunflower.

### a11y verification

- https://github.com/pa11y/pa11y — `npm run pa11y:home` (Jekyll must be serving `:4000`).
- https://github.com/pa11y/pa11y-ci — `npm run pa11y:ci` uses [`.pa11yci`](../../../.pa11yci).
- https://github.com/dequelabs/axe-core — runner for both (`--runner axe`).

## Known gaps to keep fixing

- Masthead `logo` points at missing `assets/images/logooo.jpg`.
- `_config.yml` `search:` is unset while `/search/` exists.
- 404 must stay on the dark token set (see `_pages/404.md` + `.error-page`).

## Do not install

saas-ui-skills, daisyUI, shadcn/ui, Prism React kits, vercel-composition-patterns.
