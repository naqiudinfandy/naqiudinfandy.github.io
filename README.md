# Muhammad Naqiudin — Personal Portfolio

> **This website is my own work.** Every line of HTML, CSS and JavaScript was written by me,
> Muhammad Naqiudin Bin Noor Affandy. No page builder, no purchased theme, no framework.

Live site: **https://naqiudinfandy.github.io**

| Page | What it shows |
| --- | --- |
| [`index.html`](index.html) | Home: summary, web projects, experience, all skills, education, certificates, contact |
| [`development.html`](development.html) | Web development case studies — the link to share with clients |
| [`projects.html`](projects.html) | Every project (web, data, machine learning, apps) with a category filter |
| [`legacy/index.html`](legacy/index.html) | Previous portfolio version, kept for reference (`noindex`) |

Project records: [memori projek](docs/PROJECT_MEMORY.md) · [peta fail](docs/FILE_MAP.md) · [log perubahan](docs/CHANGELOG.md).

---

## Tech stack

**Plain HTML + one CSS file + one vanilla JavaScript file.** Nothing to install, no build step.

| Layer | Choice | Why |
| --- | --- | --- |
| Markup | Semantic HTML5 | Fast, accessible, indexes well |
| Styling | [`assets/css/site.css`](assets/css/site.css) with CSS custom properties | One token block controls light and dark themes |
| Behaviour | [`assets/js/site.js`](assets/js/site.js), vanilla JS, no libraries | Menu, theme, larger text, lightbox, filter, copy email |
| Images | WebP in [`assets/img/web/`](assets/img/web/), lazy-loaded | About 1 MB for every image the current pages use |
| Font | Plus Jakarta Sans (Google Fonts, 4 weights) | One family keeps downloads small |

Removed in October 2026 to keep the site light and stop phones heating up: GSAP, ScrollTrigger,
Motion One, the canvas particle background, custom cursor, magnetic/tilt effects, the rule-based
chatbot and the EN/BM/中文 language switcher. The previous version is still under `legacy/` and in Git history.

Motion is now done with plain CSS and a few lines of JavaScript: a drifting gradient hero, a rotating
ring around the portrait, floating skill chips, a rotating role line, count-up stats, a technology
marquee, staggered scroll reveals and a scroll progress bar. Continuous animations pause automatically
when they leave the screen or the tab is hidden, and everything turns off for “reduce motion”.
Measured idle main-thread use is under 1% once the page settles.

## Page structure (index.html)

Hero (open to work, roles, portrait, stats) → technology strip → About + “What I bring” for recruiters →
Services (system engineering, data engineering, analytics & BI, data science & AI, web & app development,
UI/UX & SEO) → “From idea to go-live” 8-step process → featured projects → more projects → experience →
skills → education & certificates → beyond work (travel) → contact.

## Features

- Mobile-first layout tested from 320px to 1440px; buttons and links are at least 44px tall.
- **Light / dark theme** (follows the device, or the visitor's choice) and an **“Aa” larger-text button**, both remembered in `localStorage`.
- Simple mobile menu (Escape closes it), skip link, visible focus rings, `<details>` for long job descriptions.
- Native `<dialog>` image viewer for screenshots; focus returns to the image when closed.
- One-time scroll reveal using `IntersectionObserver`; turned off for “reduce motion”; content stays visible without JavaScript.
- Project filter on `projects.html`; old anchors such as `projects.html#yolo` still work.
- On phones, large card groups (what I bring, services, skills, process steps) switch to two columns; the larger-text mode returns them to one column.
- Custom `404.html` (GitHub Pages serves it for any missing URL; it uses root paths like `/assets/…`).
- Print stylesheet, Open Graph image (`assets/img/web/og.jpg`) and `Person` structured data.

## How to edit the content

| I want to change… | Edit this |
| --- | --- |
| Text, projects, experience, skills | The HTML page itself (each section has a comment banner) |
| Colours, spacing, font sizes | `assets/css/site.css` §01 — the `:root` block (dark theme just below it) |
| A web project case study | `development.html`, plus its card in `index.html` and summary in `projects.html` |
| The CV | Replace `assets/resume/Muhammad-Naqiudin-Resume.pdf` (keep the filename) |
| Screenshots | Add a small WebP to `assets/img/web/` and point the `<img src>` / `data-zoom` at it |

The SVG icon set is written once at the top of `index.html` (`<symbol id="i-…">`) and copied into the
other two pages. If you add an icon, add it to all three pages.

## Running and testing locally

```powershell
# 1. Start a local server (from this folder)
python -m http.server 3210 --bind 127.0.0.1
# then open http://127.0.0.1:3210

# 2. Check links, images, anchors and page weight
node scripts/audit-files.mjs

# 3. Browser checks on Edge + WebKit (Playwright is a local tool, not a site dependency)
npm install --prefix .local/browser --no-save playwright
.local/browser/node_modules/.bin/playwright install webkit
$env:PLAYWRIGHT_MODULE = (Resolve-Path .local/browser/node_modules/playwright).Path
$env:PORTFOLIO_URL = 'http://127.0.0.1:3210'
node scripts/check-browser.cjs
```

The browser check covers 5 screen widths on all 3 pages, images, tap-target size, mobile menu,
theme and text size, lightbox, filter, copy email, no-JavaScript mode, scroll reveal, count-up values,
the role rotator, pausing the hero animation off-screen and the legacy pages.
Screenshots go to `.local/browser-check/` (ignored by Git). This is emulation, not every physical phone.

## Hidden client mock-ups (`/mock/`)

Website mock-ups for prospective clients live under `mock/<slug>/` (for example
`https://naqiudinfandy.github.io/mock/klinik-aisha/`). They are not linked from the portfolio and carry
`noindex`, so only people with the link find them. The repository is public, so this is hidden, not secret.

`mock/` is generated. Edit the mock in `Development/Mock/`, list it in `MOCKS` inside
`scripts/sync-mocks.mjs`, then run `node scripts/sync-mocks.mjs`. Share each mock's own link with its
client; `/mock/` itself lists every mock.

## Deploying to GitHub Pages

The repository is `naqiudinfandy/naqiudinfandy.github.io`; GitHub Pages publishes the `main` branch.

```powershell
cd C:\Users\User\Documents\Development\portfolio
git status                    # review what changed
git add -A                    # .gitignore keeps archived/ and .local/ out
git commit -m "Rebuild portfolio: lighter vanilla JS site and new web projects"
git push origin main
```

After pushing, open the repository's **Actions** tab (or **Settings → Pages**) and wait for the
“pages build and deployment” run to turn green (usually 1–2 minutes). Then open the live site and press
**Ctrl + F5** to skip the browser cache. A local test is not proof the live site has changed.

## What is not in this repository

`.gitignore` excludes `archived/`, `.local/`, dependencies, test reports, `.env`, office documents and
old résumé PDFs named `*-old*.pdf`. The sibling repo `portfolio-old` is untouched; a selected copy lives in `legacy/`.

## Licence & contact

The **code** is free to read and learn from. The **content** — my photograph, CV, project write-ups,
screenshots and personal details — is mine; please do not republish it as your own portfolio.

**naqiudin73@gmail.com** · [LinkedIn](https://www.linkedin.com/in/naqiudin-fandy/) · [GitHub](https://github.com/naqiudinfandy)
