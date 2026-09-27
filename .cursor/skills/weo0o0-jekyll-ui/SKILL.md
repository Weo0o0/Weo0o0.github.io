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
| Day/night toggle behavior (circle reveal, labels, theme-color) | [`assets/js/weo0o0-theme.js`](../../../assets/js/weo0o0-theme.js) |
| Top banner markup: brand + status dot + `~/home/…` path, day/night toggle, hamburger, mobile drawer | [`_includes/topbar.html`](../../../_includes/topbar.html) (copy of Chirpy 7.6.0; re-copy on upgrade and keep `#sidebar-trigger`, `#topbar-title`, `#search-trigger`, which Chirpy's search script needs) |
| Banner behavior: glass on scroll, hide on scroll down, drawer (focus trap, ESC, swipe), telemetry, number-key shortcuts | [`assets/js/weo0o0-header.js`](../../../assets/js/weo0o0-header.js) |
| Head meta, fonts, loading our CSS/JS | [`_includes/metadata-hook.html`](../../../_includes/metadata-hook.html) |
| Sidebar tabs | [`_tabs/`](../../../_tabs/) (`order`, `icon`) |
| Project shelf (not a post category) | [`_tabs/projects.md`](../../../_tabs/projects.md), [`_layouts/projects.html`](../../../_layouts/projects.html), [`_data/projects.yml`](../../../_data/projects.yml). Only list public GitHub URLs a visitor can open. |
| Sidebar contact icons / share buttons | [`_data/contact.yml`](../../../_data/contact.yml), [`_data/share.yml`](../../../_data/share.yml) |
| Site settings | [`_config.yml`](../../../_config.yml) |
| Browser-tab icon (favicon) | [`assets/img/favicons/`](../../../assets/img/favicons/) and [`_includes/favicons.html`](../../../_includes/favicons.html). Chirpy's gem ships a blue bird here; replace these files to change the tab icon. Source portrait is `avatar` in `_config.yml` (`/assets/images/logo.jpg`). |

Chirpy files live in the gem (`bundle info --path jekyll-theme-chirpy`). A file with the same path in this repo replaces the theme's copy, so only override a Chirpy layout or include when CSS cannot do the job, and copy it from the installed gem version.

Chirpy applies theme tokens on `:root[data-bs-theme='dark']` and `:root[data-bs-theme='light']`; override both there, in `weo0o0.css`. Switch themes only through Chirpy's `Theme.update()` so Disqus and other listeners get the `theme-updated` message.

## Invariants

- Post URLs stay `/:categories/:title/` (set in `_config.yml` defaults). Posts link to each other with this shape.
- `theme_mode` stays empty so the day/night toggle works; a first visit starts on night (`metadata-hook.html`), and the choice is stored in `localStorage.theme`.
- Palette follows dhaatrik.github.io: night `#0b0e14` base / `#f3f4f6` text / `#3b82f6` accent, day `#f8fafc` base / `#0f172a` text / `#2563eb` accent, cyan + purple glows, dotted grid. Keep light-mode text and notices at WCAG AA.
- Gowun Batang for reading text and headings, Gowun Dodum for UI, Pretendard fallback.
- Motion (ambient gradient, pointer spotlight, glass hover lift, card reveal) must stop under `prefers-reduced-motion`, and cards must never stay hidden if JS fails.
- Below 992px the right-side drawer (`#wn-drawer`) replaces Chirpy's left sidebar; tabs come from `_tabs/` in `order`, and keys 1–9 follow the same order.
- Old posts use Minimal Mistakes markup (`{: .notice--danger}`, `.btn--success`, `{% include video %}`); keep the compatibility styles and `_includes/video` instead of rewriting post bodies.

## Git repos mapped to this project

- https://github.com/cotes2020/jekyll-theme-chirpy — theme source; match the gem version before copying any file.
- https://github.com/dhaatrik/dhaatrik.github.io — palette (`src/styles/global.css`) and the sun/moon toggle (`src/components/ThemeToggle.astro`) this site adapts.
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
