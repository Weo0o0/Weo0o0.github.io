---
name: weo0o0-jekyll-ui
description: Apply UI/UX changes to this Jekyll Chirpy blog (Weo0o0-Note). Use when restyling pages, tokens, fonts, dark mode, motion, 404, search, or accessibility. Prefer small Liquid/CSS overrides over copying the Chirpy theme or adding React/Tailwind libraries.
---

# Weo0o0-Note Jekyll UI stack

This site is **Jekyll + jekyll-theme-chirpy (gem, 7.6.x) + Liquid + plain CSS/JS**. Do not introduce React, Tailwind, shadcn, or daisyUI. Do not bring back Minimal Mistakes.

## Skills to load (in order)

0. `skill-advisor` — when the user is unsure which skill to call; route intent first.
1. `impeccable` — `/impeccable critique` then polish. Existing-site first.
2. `web-design-guidelines` — audit the rendered pages and `_includes/`.
3. `frontend-design` — only after critique; keep dark editorial blog identity (not purple-gradient AI defaults).
4. `web-design-engineer` — HTML/CSS/JS artifacts when a new surface is needed.
5. `check-fix-accessibility` — WCAG 2.2 A/AA on Liquid/HTML/CSS.
6. `effective-ui-design` — contrast, 8pt spacing, `clamp()`, `prefers-reduced-motion`, dark `color-scheme`.
7. `extract-design-system` — dump tokens into CSS variables in `assets/css/weo0o0.css`; do not fork theme core.
8. `product-manager-skills` — prioritize blog work / short PRD before large UI changes.

## Where to edit

| Change | File |
| --- | --- |
| Tokens, fonts, glass, notices, motion styles | [`assets/css/weo0o0.css`](../../../assets/css/weo0o0.css) |
| Spotlight + scroll reveal behavior | [`assets/js/weo0o0-motion.js`](../../../assets/js/weo0o0-motion.js) |
| Head meta, fonts, loading our CSS/JS | [`_includes/metadata-hook.html`](../../../_includes/metadata-hook.html) |
| Sidebar tabs | [`_tabs/`](../../../_tabs/) (`order`, `icon`) |
| Sidebar contact icons / share buttons | [`_data/contact.yml`](../../../_data/contact.yml), [`_data/share.yml`](../../../_data/share.yml) |
| Site settings | [`_config.yml`](../../../_config.yml) |

Chirpy files live in the gem (`bundle info --path jekyll-theme-chirpy`). A file with the same path in this repo replaces the theme's copy, so only override a Chirpy layout or include when CSS cannot do the job, and copy it from the installed gem version.

Chirpy's dark tokens are applied on `:root[data-bs-theme='dark']`; override them there, in `weo0o0.css`.

## Invariants

- Post URLs stay `/:categories/:title/` (set in `_config.yml` defaults). Posts link to each other with this shape.
- `theme_mode: dark`. Surfaces are Catppuccin Mocha (`#1e1e2e` base, `#cdd6f4` text); brand accent stays teal `#00adb5`.
- Gowun Batang for reading text and headings, Gowun Dodum for UI, Pretendard fallback.
- Motion (ambient gradient, pointer spotlight, glass hover lift, card reveal) must stop under `prefers-reduced-motion`, and cards must never stay hidden if JS fails.
- Old posts use Minimal Mistakes markup (`{: .notice--danger}`, `.btn--success`, `{% include video %}`); keep the compatibility styles and `_includes/video` instead of rewriting post bodies.

## Git repos mapped to this project

- https://github.com/cotes2020/jekyll-theme-chirpy — theme source; match the gem version before copying any file.
- https://github.com/catppuccin/catppuccin — Mocha palette.
- https://github.com/yangheeryu/Gowun-Batang, https://github.com/yangheeryu/Gowun-Dodum — type.
- https://github.com/orioncactus/pretendard — UI fallback via jsDelivr.

### a11y verification

- https://github.com/pa11y/pa11y — `npm run pa11y:home` (Jekyll must be serving `:4000`).
- https://github.com/pa11y/pa11y-ci — `npm run pa11y:ci` uses [`.pa11yci`](../../../.pa11yci).
- https://github.com/dequelabs/axe-core — runner for both (`--runner axe`).

## Known gaps

- Several older posts reference `../images/...` files that were never committed.

## Do not install

saas-ui-skills, daisyUI, shadcn/ui, Prism React kits, vercel-composition-patterns.
