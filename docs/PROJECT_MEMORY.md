# Memori projek portfolio

Dikemas kini: 23 Oktober 2026. Rekod repo ini untuk sambungan kerja; bukan ingatan automatik semua chat.

## Tujuan dan keputusan pemilik

- Tarik perhatian majikan (jawatan sepenuh masa) dan bakal client freelance web.
- **23 Okt 2026 — bina semula laman:** ringan, tidak memanaskan peranti, mesra UI/UX untuk semua peringkat umur, mesra desktop & telefon, jarak/padding seksyen dikecilkan.
- Buang yang tidak perlu: chatbot, GSAP/ScrollTrigger, Motion One, kanvas zarah, kursor tersuai, kesan magnet/tilt, pemuat skrin penuh dan penukar bahasa EN/BM/中文. Laman kini **English sahaja** (résumé dalam English). Jika pemilik mahu BM kembali, tambah sebagai halaman/seksyen ringkas, bukan sistem i18n penuh.
- Potret pemilik: pusingan 1 dikecilkan (72–84px); pusingan 2 pemilik minta **sedikit lebih besar** → bulatan 260px (telefon ≤66vw) / 300px desktop. Pemilik kemudian meletakkan 7 gambar dalam `assets/img/me/` (asal, diabaikan Git); hero kini guna gambar berkot `me1` → `assets/img/web/me-portrait.webp` (600×600, 40 KB) kerana lebih profesional untuk recruiter.
- Tambah kemahiran **Vanilla JavaScript** dan senaraikan **semua** kemahiran résumé.
- Tambah projek: **Homestay Booking Management System** (`/adminhsj`), **Kambing Golek Melaka Official**, **Digital Invitation & RSVP Maker** (jemputan Naqiudin & Atiqah + Live Gallery). Portfolio ini sendiri dipaparkan sebagai projek vanilla JS.
- **23 Okt 2026 (pusingan 2) — pemilik: versi pertama "terlalu ringkas".** Mahu animasi, warna lebih baik, gambar lebih besar sedikit, kesan kuat untuk recruiter (sedang aktif mencari kerja sepenuh masa) dan client. Servis BUKAN vanilla sahaja: Next.js, data analytics, data science, data engineering, system engineering, UI/UX untuk keterlihatan bisnes, korporat. Terangkan kerja dari awal hingga go-live: Google Search Console, SEO, sitemap, UI/UX, development, UAT, konfigurasi. Suka travel — boleh letak gambar tetapi jangan terlalu menonjol (pemalu).
  - Hasil: palet indigo → ungu → cyan, hero gelap tetap dengan gradien bergerak, potret 260–300px dalam cincin gradien berputar (`me-portrait.webp`), cip kemahiran terapung, peranan bertukar, statistik kira naik, jalur teknologi, reveal berperingkat, bar kemajuan skrol. Animasi berterusan dijeda di luar skrin (`[data-anim]` → `.is-paused`) dan dimatikan untuk reduced-motion.
  - Seksyen baharu index: "What I bring" (6 nilai + jawatan dicari), Services (6), "How I work" (8 langkah hingga go-live), "Beyond work": jalur 5 polaroid kecil (Cappadocia, Tokyo Station, Asakusa, hutan buluh Jepun, pantai) — `travel-*.webp` 360×450 (≈137 KB jumlah) + `travel-*-lg.webp` yang hanya dimuat bila diklik. Kapsyen hanya lokasi yang jelas dikenali; gambar pantai (me6/me7) tiada lokasi. me6 (pantai bercermin mata) tidak digunakan.
- Résumé terkini = `CV-Naqiudin-IT.pdf` (Ogos 2026), sama bait dengan `assets/resume/Muhammad-Naqiudin-Resume.pdf`. Tarikh ikut résumé: Infineon “Jul 2025 – 2026”, freelance “Sept 2025 – May 2026”.

## Mock klien tersembunyi (23 Okt 2026)

- Pemilik mahu satu bahagian mock yang **tersembunyi**: pautan biasa (tidak rumit) yang hanya diberi kepada klien.
- `mock/` dijana oleh `scripts/sync-mocks.mjs` daripada `Development/Mock/<Klien>/mock_web_*`. Senarai dalam tatasusunan `MOCKS`. Jangan sunting `mock/` terus — sunting sumber dalam Mock/ dan jalankan semula skrip.
- Pautan: `/mock/` (senarai untuk pemilik), `/mock/klinik-aisha/`, `/mock/klinik-al-falah/`.
- Tersembunyi = tiada pautan dari portfolio + `noindex, nofollow, noarchive` + tiada sitemap/robots.txt (robots.txt Disallow akan mendedahkan laluan). **Bukan rahsia**: repo GitHub awam, sesiapa yang melayari repo boleh nampak.
- Setiap mock diberi jalur atas "Pratonton reka bentuk (mock) oleh Naqiudin · bukan laman web rasmi klinik" supaya tidak disangka laman rasmi. Nota dalaman (`CLIENT_NOTES.md`, `Contact.txt`) tidak diterbitkan.

## Struktur dan fakta

Laman statik HTML/CSS/vanilla JS tanpa framework, bundler atau dependency runtime. Satu fon Google (Plus Jakarta Sans 400/600/700/800).

| Halaman | Kegunaan |
| --- | --- |
| `index.html` | Hero + kad “At a glance”, About, 4 projek web + kad portfolio, projek lain, pengalaman, semua kemahiran, pendidikan/sijil/anugerah, hubungi |
| `development.html` | Pautan untuk client: perkhidmatan, proses 4 langkah, kajian kes `#homestay #booking #kgom #rsvp #portfolio` |
| `projects.html` | Arkib semua projek dengan penapis Web/Data/ML/Apps; anchor lama dikekalkan + `#booking #rsvp` |
| `legacy/` | Versi lama (`noindex`), CSS/JS sendiri; masih guna PNG dalam `assets/img/` |

- Fakta SEO yang dipaparkan: Homestay — sitemap meliputi setiap rumah dalam dua bahasa, pemantauan Search Console, diagnosis canonical/indexing, pembaikan amaran structured data (`homestay_shimahjay/docs/SEO_RUNBOOK.md`). KGOM — Search Console disahkan melalui DNS dan sitemap dihantar (Okt 2026, `DOKUMENTASI.md`).
- Tema cerah/gelap ikut peranti atau butang; butang “Aa” membesarkan teks 12.5%. Kedua-duanya dalam `localStorage` (`theme`, `text`), dipulihkan oleh skrip kecil dalam `<head>`.
- Ikon SVG ialah sprite `<symbol>` dalam `index.html`, disalin ke dua halaman lain. Tambah ikon baharu pada ketiga-tiga halaman.
- Domain: `https://naqiudinfandy.github.io` (GitHub Pages, repo `naqiudinfandy/naqiudinfandy.github.io`, branch `main`).

## Projek web yang dipaparkan (sumber fakta)

| Projek | Pautan | Sumber fakta |
| --- | --- | --- |
| Homestay Shimah Jay | `https://www.homestayshimahjay.com/` | `homestay_shimahjay/docs/` |
| Booking Management System | tiada pautan (belum live; log masuk production disekat sehingga DB Fasa 2) | `homestay_shimahjay/docs/ADMIN.md` |
| Kambing Golek Melaka Official | `https://www.kambinggolekmelakaofficial.my/` | `website_kgom/DOKUMENTASI.md` |
| Digital Invitation & RSVP Maker | `https://www.naqiudindanatiqah.my/` | `RSVP/rsvp_naqiudindanatiqah/docs/PROJECT_MEMORY.md` |

- **Keputusan pautan KGOM:** 14 Sep 2026 pemilik memilih URL Vercel sementara sehingga domain sedia. Pada 23 Okt 2026 domain `kambinggolekmelakaofficial.my` disahkan live (HTTP 200, apex → www), jadi portfolio kini memaut ke domain sebenar. Tukar semula jika pemilik mahu.
- **Sistem admin tiada screenshot** kerana pangkalan data lokal mengandungi data tetamu; kad menunjukkan senarai modul dan nota privasi. Jangan tambah screenshot admin melainkan dengan data contoh yang disahkan pemilik.
- Angka yang dipaparkan berasal dari dokumentasi: admin 20 halaman / 9 route API / 22 ujian E2E; KGOM 19 halaman statik / 67 ujian interaksi; RSVP 8 suis admin / 11 skrip UAT. Kemas kini jika dokumentasi projek berubah.
- Screenshot Homestay, KGOM dan RSVP dirakam daripada laman **live** pada 23 Okt 2026 (Edge, 1440×900 & 390×844), ditukar ke WebP (≤1200px desktop, 420px telefon). Banner kuki KGOM ditutup (“Perlu Sahaja”) sebelum dirakam.
- Jangan reka harga projek, angka trafik/conversion atau tempoh siap.

## Pengesahan dan deployment

Gunakan `node scripts/audit-files.mjs` dan `node scripts/check-browser.cjs` (lihat README). Ujian chatbot dibuang bersama chatbot. Lihat `CHANGELOG.md` untuk hasil sebenar.

Pemilik commit dan push sendiri. Perubahan lokal bukan bukti laman live sudah berubah; semak tab Actions / Settings → Pages selepas push.
