# Log perubahan portfolio

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
