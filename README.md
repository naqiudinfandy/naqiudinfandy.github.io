# Muhammad Naqiudin — Personal Portfolio

> **This website is my own work.** Every line of HTML, CSS and JavaScript in this
> repository was designed and written by me — Muhammad Naqiudin Bin Noor Affandy.
> No page builder, no purchased theme, no site template. The layout was designed
> first in Figma and then hand-coded. The only third-party code is three small
> animation libraries loaded from a CDN (listed under *Tech stack* below).

Live site: **https://naqiudinfandy.github.io**

---

## Kemas kini portfolio — 14 September 2026

Halaman khas client ialah [`development.html`](development.html). Ia memaparkan Homestay Shimah Jay, Kambing Golek Melaka Official, contoh aplikasi dan dua versi portfolio. Pautan sasaran selepas deployment: `https://naqiudinfandy.github.io/development.html`. Kerja sesi ini masih lokal; belum commit, push atau deploy.

Versi lama boleh dibuka melalui [`legacy/index.html`](legacy/index.html). [Memori projek](docs/PROJECT_MEMORY.md), [peta fail](docs/FILE_MAP.md) dan [log perubahan](docs/CHANGELOG.md) merekod keputusan dan pengesahan semasa.

## Table of contents

- [About me](#about-me)
- [Résumé](#résumé)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Running it locally](#running-it-locally)
- [Deploying to GitHub Pages](#deploying-to-github-pages)
- [Features built into the site](#features-built-into-the-site)
- [How to edit the content](#how-to-edit-the-content)
- [Browser support & accessibility](#browser-support--accessibility)
- [What is not in this repository](#what-is-not-in-this-repository)
- [Licence & contact](#licence--contact)

---

## About me

**Muhammad Naqiudin Bin Noor Affandy**
Software Engineer — Master Data Developer
75460 Melaka, Malaysia

| | |
|---|---|
| Email | naqiudin73@gmail.com |
| Phone | +60 17-622 0665 |
| LinkedIn | https://www.linkedin.com/in/naqiudin-fandy/ |
| GitHub | https://github.com/naqiudinfandy |

Detail-oriented Data & Software Engineer with over 2 years in the industry,
currently serving as a Software Engineer for L3 Master Data Solution Development
at Infineon Technologies. Experienced in enterprise data systems, database
development and backend application engineering with SQL, Python, C# and Azure
DevOps on large-scale systems. Microsoft-certified in Azure Data Fundamentals and
Power BI Data Analyst Associate, with practical experience across machine
learning, AI, data analytics and cloud-based data workflows.

---

## Résumé

The full PDF lives at [`assets/resume/Muhammad-Naqiudin-Resume.pdf`](assets/resume/Muhammad-Naqiudin-Resume.pdf).
A summary of the same information is below, so this README stands on its own.

### Education

**Universiti Kebangsaan Malaysia (UKM)** · Sept 2021 – Jul 2025
Bachelor of Computer Science (Hons), Data Science
CGPA **3.70** · First Class Honours · Dean's List for 6 semesters

**Malacca Matriculation College** · May 2020 – May 2021
Physical Science (Module 2)

### Work experience

#### Infineon Technologies — Software Engineer, Master Data Developer
*Jul 2025 – present · Melaka, Malaysia*

- Led incident resolution in Remedy for low- to critical-priority issues and executed Change Requests through Octane for system repairs and enhancements.
- Maintained Infineon's enterprise engineering database systems, ensuring data integrity, availability and consistent flow across system classes and worldwide environments.
- Managed Oracle databases with PL/SQL for patching, cleaning, restructuring, updates and data manipulation; developed functions, procedures and packages to automate backend tasks.
- Developed and refined ETL and data-warehousing processes including validation and error management, improving data reliability and system performance.
- Enhanced backend and frontend features with C# .NET, contributing to system improvements, feature releases and performance optimisation.
- Led release management and CI/CD as Software Release Manager (SRM), delivering stable weekly Jenkins releases across DEV, INT and PROD.
- Delivered SAP-related projects covering data migration, restructuring, duplicate management, data cleansing and reporting — streamlining workflow by 30%.
- Used Jira for issue tracking, WinSCP for secure file transfer and TFS/Azure DevOps with Visual Studio for version control and collaborative development.
- Built KNIME workflows automating comparable problem tickets (data patching, manipulation, clean data preparation in Excel), saving 50% of the time.
- Collaborated with users, engineers and cross-functional teams to resolve database, backend and UI issues.
- Produced technical documentation, UML diagrams and workflow visualisations for database scripts, ETL processes and system architecture.
- Used GitHub Copilot, GPT, Claude, Grok and LLaMA to accelerate development and debugging, improving productivity by 25%.

#### Freelance Web Developer
*Sept 2025 – present · Remote, Malaysia*

- Designed responsive, high-performance websites for clients with Next.js and TypeScript, prioritising scalability, SEO and modern UI/UX practice.
- Frontend and full-stack development including SSR and SSG for optimised performance.
- Managed Vercel and Cloudflare deployments including domain configuration, DNS records, SSL and CDN for safe, fast global delivery.
- Used GitHub for source control and collaborative workflows, including branching strategies and pull requests.
- Implemented SEO best practice, metadata structuring and performance tuning (Lighthouse improvements, lazy loading, image optimisation).
- Configured domain routing, DNS records and hosting environments for consistent uptime.
- Engaged directly with clients to gather requirements, propose solutions and deliver against business goals and timelines.
- Implemented rule-based chatbots so visitors get product answers instantly.
- Handled Google Search Console.

#### AirAsia (K-Youth Employment Programme) — Data Scientist, Apprenticeship
*Apr 2025 – Jun 2025 · Sepang, Malaysia*

- Received professional training in multiculturalism, communication, presentation and team collaboration.
- Developed XGBoost machine learning models for food waste prediction, including data cleaning, feature engineering and hyperparameter tuning.
- Gained hands-on experience with Google Cloud Platform for data tracking, validation and workflow monitoring.

#### TM Research & Development — Data Science Intern
*Sept 2024 – Jan 2025 · Cyberjaya, Malaysia*

- Improved data quality by 90% by processing and cleaning thousands of records from complex network datasets (access networks, termination logs, CTT, speed tests), enabling accurate fault monitoring and QoS analysis.
- Developed Random Forest Regression and LSTM time-series models to anticipate internet speed changes and network failures at 80%+ accuracy.
- Built analytical dashboards with Power BI and Python (Matplotlib, Seaborn) presenting weekly network performance insights.
- Supported the OracleDB → MariaDB conversion with rigorous testing and ETL development.
- Automated data extraction and transformation with Selenium Robot Framework, reducing manual tasks by 60%.
- Led Angular frontend development and REST API integration for internal platforms including data visualisation and monitoring dashboards.
- Contributed Spring Boot backend services within a microservices architecture.
- Delivered 8+ Agile sprint cycles using Jira and GitLab with cross-team collaboration.

### Certifications

| Certification | Issuer | Year |
|---|---|---|
| Software Engineer Intern | HackerRank | 2024 |
| Frontend Developer (React) | HackerRank | 2024 |
| SQL (Intermediate) | HackerRank | 2024 |
| Azure Data Fundamentals | Microsoft | 2025 |
| Power BI Data Analyst Associate | Microsoft | 2025 |
| K-Youth Employment Programme | Khazanah Nasional | 2025 |
| Analyzing Data with Power BI | Asia Pacific University (APU) | 2025 |

### Awards & involvements

- **Program Leader** — SCHOOL@UKM workshop, prototyping with Figma and Bravo (2024)
- **Gold Award** — Contingent March-Past, Sukan Antara Fakulti (SAF), UKM (2023)
- **Bronze Award** — AR/VR Reality Competition, Mobile Application Development Club (2022)
- **Silver Award** — International Digital Innovation and Invention Challenge, IDIIC (2021)

### Skills

| Area | Tools |
|---|---|
| Programming | Python, Java, SQL, C#, PHP, R, HTML, CSS, JavaScript, TypeScript |
| Web development | React, Angular, Next.js, Django, Flask, REST API, Git, Spring Boot, Node.js |
| Data science & AI | Scikit-Learn, Ultralytics, TensorFlow, PyTorch, OpenCV, Pandas, NumPy, Seaborn, Matplotlib, Anaconda, LabelImg, Selenium |
| Big data & cloud | Hadoop, Hive, Microsoft Azure, Microsoft Fabric, Azure DevOps Server, Azure Data Factory, Azure Databricks, KNIME |
| Data analytics | Power BI, Tableau, Google Sheets, Excel, Pivot, Looker |
| Databases | MariaDB, OracleDB, Microsoft Access, phpMyAdmin, SAP |
| Tools & software | GitLab, GitHub, Linux, VMware, Ubuntu, VS Code, Visual Studio, WinSCP, Confluence, Remedy, Jira, SharePoint, GitHub Copilot, Jenkins |

### Languages

Malay (native) · English (full professional) · Indonesian (full professional)

References available on request.

---

## Tech stack

The site is deliberately dependency-free: **there is nothing to install and no
build step.** Open `index.html` and it runs.

| Layer | Choice | Why |
|---|---|---|
| Markup | Semantic HTML5 | Works everywhere, indexes well, no framework tax |
| Styling | Hand-written CSS with custom properties | One design-token block controls the whole theme |
| Behaviour | Vanilla JavaScript (IIFE modules) | No bundler, no `node_modules`, instant deploys |
| Scroll animation | [GSAP](https://gsap.com) + ScrollTrigger (CDN) | Parallax layers and the scrubbed experience timeline |
| UI motion | [Motion One](https://motion.dev) (CDN) | Motion One is Framer Motion's vanilla-JS sibling — same spring-based API, usable without React |
| Fonts | Barlow Condensed · DM Sans · JetBrains Mono | Display / body / mono, matching the Figma design |

> **A note on "Framer Motion":** Framer Motion is a React library, and this site
> is intentionally not a React app. Motion One is by the same author and provides
> the same animation model for plain JavaScript, so that is what is used here.

Every library is loaded defensively — if a CDN is blocked, the animations fall
back to CSS transitions and the site keeps working.

---

## Project structure

```
portfolio/
├── index.html             Portfolio utama semasa
├── development.html       Halaman khas perkongsian client
├── projects.html          Arkib 13 kajian kes
├── style.css / work.css   Reka bentuk dan penyesuaian responsif
├── script.js              Interaksi bersama dan salinan link
├── i18n.js                Pilihan English / Bahasa Melayu / 中文
├── chatbot-knowledge.js   Fakta projek dan enjin konteks
├── chatbot.js             Jawapan pengalaman dan UI chatbot
├── assets/                Gambar yang digunakan dan résumé semasa
├── legacy/                Dua halaman portfolio lama dan aset berkaitan
├── scripts/               Ujian chatbot, browser dan audit fail
├── docs/                  Memori, peta fail dan changelog
└── .gitignore             Arkib peribadi, alat lokal dan fail sementara
```

Tiga halaman semasa berkongsi CSS, navigasi, bahasa dan chatbot. Versi lama menggunakan CSS/JS asal serta pautan pulang ke portfolio semasa. Ia berkongsi aset yang sepadan dan PDF résumé semasa.

---

## Running it locally

The site is static, so the simplest option works:

```bash
# 1. Just open the file
start index.html          # Windows
open index.html           # macOS
```

For a local server (recommended, so relative paths behave exactly like production):

```bash
# Python — no install needed
python -m http.server 8000
# then visit http://localhost:8000

# or Node
npx serve .
```

---

## Deploying to GitHub Pages

Repository ini sudah mempunyai sejarah Git. Semak `git status` dan `git diff` dahulu, kemudian pilih fail yang hendak dikomit. `.gitignore` menapis fail baharu; ia tidak membuang fail yang sudah dijejak. Perubahan résumé pemilik mesti disemak berasingan.

Deployment bergantung pada tetapan GitHub Pages repository. Selepas commit dan push dibuat oleh pemilik, semak status Pages serta URL sebenar. Ujian lokal bukan bukti laman live telah berubah.

---

## Features built into the site

**Motion & interaction**
- Loading animation with a simulated progress indicator and a curtain reveal
- Staged hero entrance (masked word reveal with a spring easing)
- Scroll-reveal on every section via `IntersectionObserver`
- GSAP ScrollTrigger parallax: hero content, background aurora layers, portrait and project images all move at different rates
- Experience timeline whose coloured rail fills as you scroll through it
- Custom two-part cursor — a dot that tracks exactly and a ring that eases behind it, growing on hover and showing "view" over media
- Magnetic buttons that lean toward the pointer
- 3D tilt on cards, a pure-CSS spinning cube in the hero, and certificate cards that flip in 3D
- Animated canvas particle constellation that reacts to the mouse
- Typewriter that rotates job titles (and re-types them in the chosen language)
- Count-up statistics, infinite logo marquee, animated SVG chart

**Liquid glass**
Surfaces use `backdrop-filter: blur() saturate()` plus two pseudo-elements: a
specular highlight whose position is written from JavaScript into `--mx` / `--my`,
and a masked gradient border that mimics a refracted edge.

**Multilingual — English, Bahasa Melayu, 中文**
Any element with `data-i18n="key"` is swapped by `i18n.js`. The choice is saved
in `localStorage`, `<html lang>` is updated for screen readers and search
engines, and a `languagechange` event lets the typewriter and chatbot follow
along. The detailed case-study copy in `projects.html` and `development.html` stays in English on
purpose — that is the language its metrics and tooling are documented in.

**Rule-based chatbot**

`chatbot-knowledge.js` menambah 11 topik: dua projek freelance, harga/skop, tempoh, proses, aplikasi, UI/UX, versi portfolio, SEO, hosting/sokongan dan peluang kerja. Enjin menggunakan kata penuh dan konteks projek untuk soalan susulan, serta boleh menjawab sehingga tiga topik berkaitan dalam satu soalan. `chatbot.js` mengekalkan fakta pengalaman asal dan mengurus panel.

Tiada AI API, kos model atau sejarah chat tersimpan. Soalan dihadkan kepada 1000 aksara, teks pengguna tidak dirender sebagai HTML, dan butang WhatsApp membawa soalan asal untuk dihantar sendiri oleh pelawat. Harga, deposit, jadual, gaji dan terma projek mesti disahkan terus dengan Naqiudin.

**Responsive & accessible**
Mobile-first breakpoints at 1024px, 700px and 400px; a slide-in drawer with
staggered links on small screens; a skip link; visible focus rings;
`prefers-reduced-motion` support that disables every decorative animation; and a
print stylesheet that turns the page into a clean document.

---

## How to edit the content

| I want to change… | Edit this |
|---|---|
| Any visible text (all 3 languages) | `i18n.js` — find the key, change all three dictionaries |
| A section's structure or a new card | `index.html` (each section has a numbered comment banner) |
| Colours, spacing, fonts | `style.css` §01 *Design tokens* — the `:root` block |
| A project case study | Selaraskan `projects.html`, `development.html`, kad utama dan fakta chatbot |
| What the chatbot knows | `chatbot-knowledge.js` untuk projek/perkhidmatan; `chatbot.js` untuk pengalaman asal |
| The CV file | Replace `assets/resume/Muhammad-Naqiudin-Resume.pdf` (keep the filename) |
| Screenshots | Drop files into `assets/img/` and point the `<img src>` at them |

Adding a new project card takes three steps: duplicate an `<article class="proj">`
in `index.html`, duplicate an `<article class="case">` in `projects.html` with a
matching `id`, and point the card's "Case study" link at `projects.html#that-id`.

---

## Browser support & accessibility

Sasaran semasa ialah browser berasaskan Chromium dan WebKit pada desktop/mobile. Dua kolum dikekalkan untuk profil, toolkit dan sorotan projek, termasuk lebar 320px. Panel chat menggunakan saiz visual viewport dan safe-area, input 16px, had mesej serta kawalan fokus. Lightbox boleh dibuka dengan Enter/Space dan ditutup dengan Escape. Menu mobile melepaskan scroll apabila skrin dibesarkan.

Ujian browser ialah emulasi, bukan pengesahan setiap telefon Android, iPhone atau Huawei fizikal. Lihat changelog untuk hasil ujian sebenar; tiada dakwaan semua model peranti atau Firefox telah diuji dalam sesi ini.

Jalankan server statik dahulu, contohnya `python -m http.server 3210 --bind 127.0.0.1`.

```powershell
node scripts/check-chatbot.cjs
node scripts/audit-files.mjs
node --check chatbot.js
node --check chatbot-knowledge.js
node --check script.js
node --check i18n.js

# Playwright hanyalah alat pengesahan lokal, bukan dependency laman.
npm install --prefix .local/browser --no-save playwright
.local/browser/node_modules/.bin/playwright install webkit
$env:PLAYWRIGHT_MODULE = (Resolve-Path .local/browser/node_modules/playwright).Path
$env:PORTFOLIO_URL = 'http://127.0.0.1:3210'
node scripts/check-browser.cjs
```

Edge perlu tersedia pada mesin untuk channel `msedge`. Screenshot ujian disimpan di `.local/browser-check/`. Laman tidak menggunakan React, jadi hydration atau React Strict Mode tidak terpakai; pengesahan meliputi JavaScript biasa, reduced-motion, CDN disekat dan mod tanpa JS.

---

## What is not in this repository

`.gitignore` mengecualikan `archived/`, `.local/`, dependencies, laporan ujian, `.env`, dokumen pejabat, fail sementara dan PDF résumé bernama `*-old*.pdf`. Fail Word dan sumber gambar yang tidak digunakan tidak disalin daripada projek rujukan. Fail laman, dokumentasi, skrip ujian dan `legacy/` mesti kekal dalam Git.

Repo saudara `portfolio-old` kekal tidak disentuh. Hanya dua halaman lama, CSS/JS dan aset yang dirujuk diterbitkan dalam `legacy/`; résumé menggunakan PDF semasa. Enam screenshot freelance dirakam daripada build production lokal projek asal, manakala dua preview versi dirakam daripada laman portfolio lokal. Screenshot runtime ini sengaja dikongsi di `assets/img/work/`.

---

## Licence & contact

The **code** in this repository is free for you to read and learn from.
The **content** — my photograph, CV, project write-ups, screenshots and personal
details — is mine; please do not republish it as your own portfolio.

If something here is useful to you, or you want to work together:

**naqiudin73@gmail.com** · [LinkedIn](https://www.linkedin.com/in/naqiudin-fandy/) · [GitHub](https://github.com/naqiudinfandy)
