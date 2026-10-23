# Log perubahan portfolio

## 2026-10-23 — Kad 2 kolum di telefon & halaman 404 khas

**Permintaan:** kad besar (What I bring, servis, langkah proses dan seumpamanya) jadi 2 kolum di telefon, desktop kekal 3–4 kolum; nyatakan kemahiran custom 404 dan tambah halaman 404 khas pada portfolio.

**Perubahan:**
- `site.css` §13: di bawah 700px, `.grid--m2` (kad nilai, servis & kemahiran di index; servis di development), `.process` dan `.checklist` jadi 2 kolum dengan padding/ikon/teks lebih kecil; tajuk kemahiran meletak ikon di atas teks. Jika butang “Aa” (teks besar) aktif, kembali 1 kolum. Kad projek, pengalaman dan pendidikan kekal 1 kolum (gambar/logo & teks panjang). Senarai “Every launch includes” desktop kini 3×3.
- `404.html` baharu: hero gelap, “404” bergradien terapung, laluan yang dicari (textContent), butang Home/Web case studies/All projects + pautan pantas; `noindex`; semua laluan mutlak (`/assets/…`) kerana GitHub Pages memaparkannya pada sebarang kedalaman URL.
- “Custom 404” disebut dalam servis UI/UX & SEO, langkah SEO proses (index & development), tag kemahiran, senarai “Every launch includes” dan kajian kes Homestay (projek itu ada halaman 404 khas, commit c0d8c9b).
- `audit-files.mjs`: menyelesaikan laluan bermula `/` dari akar dan mengaudit 404.html. `check-browser.cjs`: simulasi URL tidak wujud dijawab 404.html (status 404, CSS dimuat, laluan dipapar, noindex, butang Home berfungsi).

**Ujian sebenar:** audit 9 halaman, 627 rujukan lulus. `check-browser.cjs` Edge + WebKit **135 semakan lulus**. Semakan khusus 320px: tiada elemen terkeluar dari kad 2 kolum. Screenshot 404 desktop 1440 & telefon 390 diperiksa.

**Isu tertinggal:** server Python lokal tidak memaparkan 404.html automatik; tingkah laku sebenar disahkan selepas push (buka `https://naqiudinfandy.github.io/apa-apa`).

**Status deployment:** lokal sahaja — tiada commit, push atau deploy.

## 2026-10-23 — Bahagian mock klien tersembunyi

**Permintaan:** sediakan halaman mock dalam portfolio yang tersembunyi (pautan biasa, hanya untuk klien yang diberi), dengan mock Klinik Aisha Bertam Impian dan Klinik Al Falah; akan ada lagi.

**Perubahan:** `scripts/sync-mocks.mjs` baharu menyalin mock dari `Development/Mock` ke `mock/klinik-aisha/` dan `mock/klinik-al-falah/` (langkau `*.md`, `Contact.txt`), menambah `noindex, nofollow, noarchive`, og:url/og:image mutlak, dan jalur atas "Pratonton reka bentuk (mock) … bukan laman web rasmi klinik"; menjana `mock/index.html` (senarai, noindex, butang salin pautan). Tiada pautan dari halaman portfolio. `scripts/audit-files.mjs` kini turut mengaudit halaman mock. README, PROJECT_MEMORY, FILE_MAP dan `Mock/MOCK_WEBSITE_PLAYBOOK.md` (cara terbit) dikemas kini. Folder sumber dalam Mock/ tidak diubah.

**Ujian sebenar:** `node scripts/sync-mocks.mjs` (21 fail 3.59 MB; 18 fail 1.30 MB). `node scripts/audit-files.mjs`: 8 halaman, 617 rujukan lulus. Ujian Playwright scratchpad: 3 halaman mock × 4 lebar (320/390/768/1440) × Edge + WebKit = **24/24 lulus** (HTTP 200, tiada limpahan, gambar dimuat, noindex, jalur pratonton, tiada pageerror). Carian sumber: tiada pautan `mock/` dalam index/development/projects/legacy.

**Isu tertinggal:** repo GitHub awam, jadi mock boleh ditemui melalui repo (tersembunyi, bukan rahsia). `/mock/` menyenaraikan semua klien; kongsi pautan per-mock sahaja. Gambar mock tidak dimampatkan (aset asal klien).

**Status deployment:** lokal sahaja — tiada commit, push atau deploy.

## 2026-10-23 (pusingan 2) — Animasi, warna, kesan untuk recruiter & servis penuh

**Permintaan:** versi ringan pertama terlalu ringkas. Tambah animasi, warna lebih baik, gambar sedikit lebih besar; servis bukan vanilla sahaja (Next.js, data analytics, data science, data engineering, system engineering, UI/UX untuk keterlihatan bisnes, korporat); terangkan kerja dari awal hingga go-live (Search Console, SEO, sitemap, UI/UX, development, UAT, konfigurasi); kesan kuat untuk recruiter (open to work, aktif mencari); seksyen travel yang tidak menonjol.

**Perubahan:**

- `assets/css/site.css` ditulis semula: palet indigo/ungu/cyan dengan gradien, hero gelap (kedua-dua tema) dengan gumpalan warna bergerak dan corak grid, potret bulat 260–300px dengan cincin conic berputar dan 3 cip kemahiran terapung, kad terangkat bila hover, garis masa bergradien, panel hubungi bergradien, lightbox "pop", bar kemajuan skrol.
- `assets/js/site.js`: tambah `initStagger`, `initPause` (jeda animasi `[data-anim]` di luar skrin & tab tersembunyi), `initRotator` (System/Data Engineer, Web Developer, Data Analyst, Data Scientist), `initCountUp`, `initProgress`. Semua gerakan dimatikan untuk reduced-motion; nilai akhir sudah dalam HTML untuk tanpa JS.
- `index.html` ditulis semula: lencana "Open to work", jalur teknologi, About + "What I bring" (6 nilai berangka daripada résumé) + jawatan dicari, Services (6), "How I work" 8 langkah hingga go-live, projek, pengalaman (dengan tag), kemahiran 9 kumpulan (tambah kumpulan UI/UX, SEO & delivery), pendidikan, "Beyond work" (satu foto travel Jepun kecil gaya polaroid), panel hubungi untuk recruiter & bisnes.
- `development.html`: hero gelap, 6 servis untuk bisnes kecil & korporat, proses 8 langkah, senarai "Every launch includes", butiran Search Console dalam kajian kes Homestay & KGOM, panel hubungi baharu. `projects.html`: hero gelap, header baharu.
- Gambar: pemilik meletakkan 7 foto dalam `assets/img/me/` semasa tugas (tiada EXIF/GPS). Hero guna foto berkot → `me-portrait.webp` (600×600, 40 KB). "Beyond work" kini jalur 5 polaroid kecil (Cappadocia, Tokyo, Asakusa, hutan buluh, pantai) 360×450 (≈137 KB) + versi `-lg` untuk lightbox (dimuat bila diklik sahaja). `assets/img/me/` ditambah ke `.gitignore` (3.7 MB fail asal). `og.jpg` dijana semula. Imej sementara `me.webp`, `me-hero.webp`, `travel-japan.webp` dipadam (belum pernah di-commit).
- `scripts/check-browser.cjs`: kecualikan `.marquee` daripada semakan teks terkeluar skrin; tambah semakan butang Copy 44px, nilai akhir kira naik, pemutar peranan bertukar, hero dijeda bila di luar skrin.

**Ujian sebenar:**

- `node scripts/audit-files.mjs`: 5 halaman, 548 rujukan tempatan lulus. CSS 42.4 KB, JS 13.7 KB.
- `node scripts/check-browser.cjs` (Edge + WebKit): **125 semakan lulus** (termasuk lightbox foto travel), tiada pageerror.
- Profil CPU Edge (CDP `TaskDuration`): selepas laman tenang, utas utama ≈0.8% di hero (animasi berjalan) dan 0.0–0.4% di setiap seksyen lain; hanya animasi titik "pulse" kecil kekal berjalan. Muatan paparan pertama sebelum skrol ≈159 KB (desktop & telefon, termasuk fon, CSS, JS dan potret); gambar lain dimuat semasa skrol.
- Semakan visual: desktop 1440 & telefon 390 (cerah), mod gelap, animasi sebenar hero di telefon.

**Isu tertinggal:** lokasi hutan buluh & pantai tidak disahkan, jadi kapsyennya umum. Ujian emulasi, bukan telefon fizikal.

**Status deployment:** lokal sahaja — tiada commit, push atau deploy.

## 2026-10-23 — Bina semula portfolio: ringan, vanilla JS, projek web baharu

**Permintaan:** tambah kemahiran vanilla JS; tambah Booking Management Homestay Shimah Jay, Kambing Golek Melaka Official dan RSVP maker sebagai projek; senaraikan semua kemahiran; buang chatbot dan bahan berat supaya peranti tidak perlahan/panas; optimumkan, mesra desktop & telefon serta semua umur; projek peribadi web development; kecilkan potret; ikut résumé terkini; kurangkan margin/padding seksyen; beri cara push.

**Perubahan:**

- Tulis semula `index.html`, `development.html`, `projects.html` dengan reka bentuk baharu (tema cerah/gelap, teks 17px, butang ≥44px, jarak seksyen 52px telefon / 68px desktop).
- Satu stylesheet `assets/css/site.css` (28.7 KB) dan satu skrip `assets/js/site.js` (9.4 KB) menggantikan `style.css`, `work.css`, `script.js`, `i18n.js`, `chatbot.js`, `chatbot-knowledge.js` (jumlah 233.6 KB) serta GSAP, ScrollTrigger dan Motion One dari CDN.
- Dibuang: chatbot, penukar bahasa EN/BM/中文 (laman kini English), pemuat skrin penuh, kanvas zarah, kursor tersuai, butang magnet, kad tilt/flip, marquee, typewriter. Ujian `scripts/check-chatbot.cjs` dibuang bersama chatbot.
- Ditambah: butang “Aa” teks besar, butang tema, `<dialog>` lightbox, `<details>` “More details” untuk pengalaman, butang ke atas, penapis projek, salin e-mel, data berstruktur `Person`, gambar OG `assets/img/web/og.jpg`.
- Projek baharu: Homestay Booking Management System (tanpa screenshot — data tetamu; panel modul + nota privasi), Kambing Golek Melaka Official (pautan kini domain sebenar, disahkan HTTP 200), Digital Invitation & RSVP Maker (`naqiudindanatiqah.my`), dan portfolio ini sebagai projek vanilla JS. Halaman `development.html` kini ada seksyen Services dan proses 4 langkah.
- Kandungan ikut résumé `CV-Naqiudin-IT.pdf` (sama bait dengan PDF dalam repo): jawatan IT System Engineer – Master Data Developer, tarikh, KNIME 50%, Docker, AI agent 50%, chatbot klien 30%. Semua kemahiran résumé disenaraikan dalam 9 kumpulan + Vanilla JavaScript, Tailwind CSS, SQLite, XGBoost, GCP, Vercel, Cloudflare (dibuktikan oleh projek).
- Screenshot baharu dirakam daripada laman live (Homestay, KGOM, RSVP) dan semua gambar halaman semasa ditukar ke WebP dalam `assets/img/web/` (41 gambar + logo + OG ≈ 1.3 MB folder; potret 8 KB). PNG lama dikekalkan kerana `legacy/` masih merujuknya.
- `scripts/audit-files.mjs` dan `scripts/check-browser.cjs` ditulis semula untuk struktur baharu. README, PROJECT_MEMORY dan FILE_MAP dikemas kini.

**Fail:** `index.html`, `development.html`, `projects.html`, `assets/css/site.css`, `assets/js/site.js`, `assets/img/web/*`, `scripts/audit-files.mjs`, `scripts/check-browser.cjs`, `README.md`, `docs/*`; dipadam: `style.css`, `work.css`, `script.js`, `i18n.js`, `chatbot.js`, `chatbot-knowledge.js`, `scripts/check-chatbot.cjs`.

**Ujian sebenar:**

- `node scripts/audit-files.mjs`: 5 halaman, 511 rujukan tempatan, ID unik dan anchor lulus.
- `node --check` untuk `site.js` dan skrip ujian: lulus. `git diff --check`: lulus (hanya amaran LF/CRLF Git).
- `node scripts/check-browser.cjs` pada Edge + WebKit: **113 semakan lulus** — 3 halaman × 5 lebar (320/390/768/1024/1440) tanpa limpahan atau teks terkeluar, semua gambar dimuat, sasaran sentuh ≥44px, menu telefon (pautan & Escape, fokus kembali), tema & teks besar kekal selepas muat semula, `<details>`, lightbox (Escape, fokus kembali), penapis projek, 15 anchor, salin e-mel (Edge), mod tanpa JS, animasi muncul, halaman legacy 200, tiada pageerror.
- Semakan visual screenshot desktop 1440 dan telefon 390/320, tema cerah dan gelap.

**Isu tertinggal:** ujian ialah emulasi, bukan telefon fizikal. Laman kini English sahaja (keputusan sesi ini; boleh tambah BM ringkas jika pemilik mahu). `assets/img/work/*.jpg` tidak dirujuk lagi tetapi tidak dipadam. Status RSVP “Live” bermaksud laman hadapan live; pangkalan data RSVP/Live Gallery belum disambung. Sistem admin homestay belum live.

**Status deployment:** lokal sahaja — tiada commit, push atau deploy. Pemilik push sendiri (arahan dalam README §Deploying).

## 2026-09-14 — Gunakan pautan Vercel KGOM sementara

**Permintaan:** gunakan `https://kambing-golek-melaka-official.vercel.app/` dahulu sebagai pautan website Kambing Golek Melaka Official.

**Perubahan/fail:** butang “Visit website” KGOM di `development.html` ditukar daripada domain tersuai kepada URL Vercel. `projects.html` sudah menggunakan URL yang diminta ketika tugas bermula. Keputusan pautan sementara direkod dalam `docs/PROJECT_MEMORY.md`.

**Pengesahan:** audit fail lulus untuk 5 halaman dan 509 rujukan tempatan; `git diff --check` lulus. Kedua-dua pautan kajian kes disemak melalui carian sumber. Tiada perubahan layout atau logik JavaScript, jadi ujian browser penuh tidak diulang.

**Isu tertinggal/status deployment:** tiada isu lokal dikenal pasti; status laman Vercel tidak diuji. Perubahan tugas ini lokal sahaja, tanpa commit, push atau deployment.

## 2026-09-14 — Portfolio client, projek freelance, chatbot dan mobile

**Permintaan:** tambah Homestay Shimah Jay dan Kambing Golek Melaka Official dengan teknologi, kemahiran serta gambar UI/UX; sediakan halaman perkongsian web/application development; perincikan chatbot; kekalkan dua kolum untuk potret/penerangan, toolkit dan projek pada mobile; paparkan versi portfolio lama/baharu; kemaskan gitignore serta pengalaman desktop/mobile untuk client freelance dan peluang kerja sepenuh masa.

**Perubahan:**

- Tambah `development.html` dengan dua kajian kes freelance, empat contoh aplikasi, pautan website, CTA pertanyaan, résumé dan butang menyalin pautan. Metadata perkongsian tersedia.
- Dahulukan dua projek pelanggan dalam sorotan homepage. Ringkaskan pengenalan dan kad supaya dua kolum mudah dibaca pada telefon; maklumat pengalaman dan kajian kes penuh dikekalkan di bahagian berkaitan.
- Ganti fakta Homestay lama (enam rumah dan URL `/ms`) dengan lapan rumah, BM di `/` dan English di `/en`. Tambah KGOM berdasarkan sumber sebenar `website_kgom`. Tiada harga projek, conversion, angka trafik, tempoh siap atau sokongan native Android/iOS direka.
- Tangkap enam screenshot UI sebenar daripada build production lokal kedua-dua projek rujukan, serta dua preview portfolio. Lapan aset di `assets/img/work` berjumlah kira-kira 1.09 MiB. Galeri menerima keyboard, fokus pulang dan Escape.
- Terbitkan salinan terpilih versi lama dalam `legacy/` dengan pautan kembali, `noindex` dan résumé semasa. 117 rujukan gambar diselesaikan: 53 menggunakan aset kongsi dan 64 aset tambahan disalin. Repo `portfolio-old` asal tidak diubah.
- Tambah `chatbot-knowledge.js`: 11 topik baharu dalam EN/BM/ZH, padanan kata penuh, nama projek dan konteks soalan susulan. Chat boleh menggabungkan sehingga tiga topik berkaitan, mempunyai had 1000 aksara, menghalang submit bertindih, membatalkan balasan apabila bahasa berubah, dan membuka WhatsApp bersama soalan asal. Bot kekal berasaskan peraturan tanpa AI API atau rekod chat tersimpan.
- Tambah `work.css`: dua kolum pada 320px, kontras teks lebih jelas, potret sticky mobile, skrin chat mengikut visual viewport/safe-area, input 16px dan fallback tanpa JavaScript. Kekalkan identiti visual asal.
- Baiki limpahan intrinsik blok kod dalam arkib, statistik dan nama fail panjang dalam versi lama. Baiki fokus Safari/WebKit dengan membuang transition `visibility` pada lightbox/chat/menu. Menu tertutup `inert`, fokus dan scroll dipulihkan apabila ditutup atau resize ke desktop.
- `.gitignore` mengecualikan alat `.local`, dokumen/draf, laporan, rahsia dan PDF résumé lama yang belum dijejak. Fail laman, screenshot runtime, `legacy`, dokumentasi dan skrip ujian kekal boleh dijejak. PDF résumé semasa 779,213 bait dan PDF lama 812,831 bait milik pemilik tidak disunting.
- README, memori dan peta fail diselaraskan; dakwaan lama bahawa gitignore menjamin `git add .` selamat diganti dengan arahan menyemak diff.

**Fail:** `index.html`, `projects.html`, `development.html`, `style.css`, `work.css`, `script.js`, `i18n.js`, `chatbot.js`, `chatbot-knowledge.js`, `legacy/`, `assets/img/work/`, `.gitignore`, `README.md`, `scripts/` dan `docs/`.

**Ujian sebenar:**

- `node scripts/check-chatbot.cjs`: 42 semakan lulus.
- `node scripts/audit-files.mjs`: 5 halaman HTML, 509 rujukan tempatan, ID unik, fail gambar dan anchor lulus.
- `node --check` bagi semua JavaScript semasa, skrip browser dan JavaScript versi lama: lulus.
- `git diff --check`: lulus; Git hanya memaklumkan normalisasi LF/CRLF bagi fail sedia ada.
- Edge dan WebKit: lima halaman pada 320, 360, 390, 430, 768, 1024 dan 1440px; tiga bahasa pada halaman semasa; gambar berjaya dimuat, dua kolum dan tiada limpahan selepas layout selesai. Semakan ini lulus.
- Desktop 1440px dengan tetikus dan animasi biasa: tiga halaman semasa lulus pada Edge dan WebKit, tanpa pageerror. Screenshot profil, halaman client dan kajian kes diperiksa secara visual.
- Pusingan penuh `scripts/check-browser.cjs`: **146 semakan lulus** pada Edge dan WebKit. Meliputi layout, gambar, bahasa, menu/fokus/resize, keyboard lightbox, soalan dan susulan chatbot, input HTML sebagai teks, handoff soalan asal, pembatalan timer bahasa lama, submit berulang, skrin pendek 390×460, salinan link, filter/anchor, reduced-motion, CDN disekat dan tanpa JS. Tiada pageerror pada halaman yang diuji.

Laman portfolio ialah HTML statik, jadi build Next.js, hydration dan React Strict Mode tidak terpakai. Tiada dependency aplikasi atau sub-agent ditambah. Playwright sedia ada di direktori alat projek saudara digunakan untuk pengesahan; README menerangkan pemasangan pilihan secara lokal untuk mesin lain.

**Had/isu tertinggal:** ujian ialah emulasi browser, bukan semua model Android/iOS/Huawei fizikal. Akaun hosting tidak diakses, status deployment/domain live tidak diuji dalam tugas ini, dan jadual/harga projek perlu dibincang terus. Kandungan teknikal kajian kes kekal English dengan atribut bahasa; navigasi dan chatbot menyokong EN/BM/ZH. Kandungan projek pelanggan perlu diselaraskan secara manual antara halaman kajian kes, kad dan chatbot apabila berubah.

**Status deployment:** lokal sahaja. Tiada commit, push atau deploy. Server preview portfolio: `http://127.0.0.1:3210`; server sementara Homestay/KGOM untuk tangkapan telah dihentikan. Pautan client yang dirancang selepas deployment ialah `https://naqiudinfandy.github.io/development.html`. Git status kedua-dua repo projek rujukan kekal bersih.
