# Peta fail portfolio

| Fail / direktori | Tujuan dan hubungan |
| --- | --- |
| `index.html` | Halaman utama; sprite ikon SVG asal (`<symbol id="i-…">`) yang disalin ke halaman lain |
| `development.html` | Halaman client; anchor `homestay`, `booking`, `kgom`, `rsvp`, `portfolio` |
| `projects.html` | Arkib semua projek + penapis kategori; anchor lama dikekalkan |
| `404.html` | Halaman tidak dijumpai khas; GitHub Pages memaparkannya untuk URL tidak wujud. Laluan mesti mutlak (`/assets/…`) |
| `assets/css/site.css` | Satu-satunya stylesheet halaman semasa: token, tema gelap, komponen, responsif, cetak |
| `assets/js/site.js` | Satu-satunya skrip: tema, saiz teks, menu telefon, nav aktif, reveal berperingkat, jeda animasi luar skrin, pemutar peranan, kira naik, bar kemajuan, lightbox, penapis, salin e-mel, ke atas |
| `assets/img/web/` | Gambar WebP halaman semasa: screenshot live, potret hero `me-portrait.webp`, foto travel `travel-*.webp` (+ `-lg` untuk lightbox), logo kecil, `project*.webp`, `og.jpg` (1200×630) |
| `assets/img/*.png`, `assets/img/work/` | Aset lama; PNG masih digunakan oleh `legacy/`. `work/` tidak dirujuk lagi tetapi disimpan untuk pautan luar |
| `assets/img/me/` | Gambar asal pemilik (saiz penuh) — **diabaikan Git**; sumber untuk `me-portrait` & `travel-*` |
| `assets/resume/Muhammad-Naqiudin-Resume.pdf` | Résumé semasa (= `CV-Naqiudin-IT.pdf`); semua butang CV menuju fail ini |
| `legacy/` | Versi portfolio terdahulu dengan CSS/JS sendiri |
| `mock/` | **Dijana** — mock klien tersembunyi (`noindex`, tidak dipaut). `mock/index.html` senarai untuk pemilik; `mock/<slug>/` salinan mock |
| `scripts/sync-mocks.mjs` | Salin mock dari `Development/Mock`, tambah noindex/og/jalur pratonton, jana `mock/index.html`. Senarai `MOCKS` di dalamnya |
| `scripts/audit-files.mjs` | Audit rujukan fail, anchor, ID berganda dan berat aset halaman semasa |
| `scripts/check-browser.cjs` | Ujian Edge + WebKit: susun atur 5 lebar, gambar, sasaran sentuh, interaksi, tanpa JS |
| `docs/` | Memori, log perubahan dan peta fail yang dikongsi dalam Git |
| `.local/` | Alat kerja, screenshot dan log ujian; tidak diterbitkan |

Apabila butiran projek web berubah, selaraskan kajian kes di `development.html`, kad di `index.html` dan ringkasan di `projects.html`. Tiada proses build yang menyegerakkan kandungan secara automatik.
