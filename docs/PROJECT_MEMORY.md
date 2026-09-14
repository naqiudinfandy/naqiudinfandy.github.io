# Memori projek portfolio

Dikemas kini: 14 September 2026. Rekod repo ini untuk sambungan kerja; bukan ingatan automatik semua chat.

## Tujuan dan keputusan pemilik

- Tarik perhatian bakal client freelance dan syarikat yang mengambil pekerja sepenuh masa.
- Kekalkan gambar dengan penerangan sebelah-menyebelah pada mobile. My Toolkit dan What I've built menggunakan dua kolum.
- Sediakan satu pautan khas untuk web development dan application development.
- Paparkan Homestay Shimah Jay dan Kambing Golek Melaka Official dengan teknologi, kemahiran serta gambar UI sebenar.
- Paparkan portfolio lama dan baharu sebagai dua versi yang boleh dibuka.
- Chatbot perlu menjawab lebih banyak soalan dengan butiran yang berguna.
- Kekalkan fail yang berkaitan sahaja dalam Git. Résumé semasa dan PDF lama ialah perubahan pemilik sebelum tugas bermula; jangan timpa atau padam.

## Struktur dan fakta

Laman statik HTML/CSS/JavaScript, tanpa framework, bundler atau dependency runtime baharu. GSAP, ScrollTrigger dan Motion One asal datang daripada CDN; animasi mempunyai fallback. Panduan Next.js dalam projek rujukan tidak terpakai kepada kod portfolio ini; kedua-dua projek Next hanya dibaca/dijalankan untuk screenshot.

| Halaman | Kegunaan |
| --- | --- |
| `index.html` | Portfolio utama semasa, pengalaman, toolkit, sorotan projek, résumé dan hubungan |
| `development.html` | Halaman khas client: dua kajian kes freelance, empat contoh aplikasi, dua versi portfolio dan CTA |
| `projects.html` | Arkib 13 kajian kes; filter kategori, anchor dan pembesar screenshot |
| `legacy/index.html` | Versi lama daripada repo saudara `portfolio-old` |
| `legacy/project.html` | Butiran projek versi lama |

Domain yang direkod dalam README asal: `https://naqiudinfandy.github.io`. Pautan sasaran selepas deployment ialah `https://naqiudinfandy.github.io/development.html`. Menambah fail lokal tidak bermaksud URL tersebut sudah live.

Semua pautan dalaman portfolio menggunakan laluan relatif supaya berfungsi pada GitHub Pages root atau subfolder. Dasar localePath Homestay bukan sistem routing portfolio. Pilihan bahasa portfolio kekal EN/BM/ZH melalui localStorage, seperti sebelum tugas. Kandungan teknikal kajian kes dan halaman client dalam English ditandakan `lang="en"`; label terjemahan menerima bahasa masing-masing.

## Projek freelance

Homestay: Next.js 16.2.11, React 19, TypeScript, Tailwind v4. Lapan rumah, BM `/`, English `/en`, `/ms` lama redirect. Galeri, halaman rumah, planner, FAQ dan chatbot berasaskan peraturan. Pertanyaan melalui WhatsApp/platform luar; tiada pangkalan data kekosongan atau checkout bayaran.

KGOM: sumber sebenar dalam `kambinggolekmelakaofficial/website_kgom`, Next.js 16.3.1, React 19, TypeScript, Tailwind v4, Motion dan Lenis. Halaman pakej/detail, galeri, FAQ dan borang butiran majlis yang membuka WhatsApp. Tidak didakwa sebagai e-commerce atau laman dwibahasa lengkap.

Keputusan pemilik 14 September 2026: gunakan sementara `https://kambing-golek-melaka-official.vercel.app/` untuk pautan website KGOM dalam portfolio, menggantikan domain tersuai. Kedua-dua butang “Visit website” di `development.html` dan `projects.html` mesti menuju URL Vercel ini sehingga pemilik mengarahkan pertukaran.

Enam screenshot projek diambil daripada build production lokal sedia ada pada 14 September 2026. Dua screenshot portfolio diambil daripada halaman statik lokal. Tiada mockup AI atau angka peningkatan conversion/SEO direka. Foto UI memaparkan kandungan sebenar build rujukan pada waktu tangkapan; itu bukan pengesahan semua fakta perniagaan dalam laman pelanggan.

## Chatbot

`chatbot-knowledge.js` menyimpan 11 topik tambahan dan enjin padanan tulen. `chatbot.js` mengekalkan jawapan pengalaman/résumé asal serta UI. Padanan kata penuh, nama projek diberi keutamaan, sehingga tiga topik berkaitan bagi satu soalan. Soalan teknologi/gambar boleh merujuk projek terakhir. Tukar bahasa membersihkan konteks dan membatalkan timer lama.

Tiada model AI, API key, network AI atau simpanan sejarah chat. Soalan dihadkan kepada 1000 aksara; mesej pengguna menggunakan textContent. Log dihadkan kepada 80 elemen. Handoff WhatsApp membawa soalan asal secara URL-encoded; pengguna sendiri menghantar mesej. Bot tidak mengesahkan harga, deposit, tempoh siap, gaji atau kekosongan jadual.

## Versi lama dan aset

`legacy/` ialah salinan laman lama yang diterbitkan, dengan banner pulang ke portfolio semasa dan `noindex, follow`. 117 rujukan gambar diperiksa: aset dengan nama sepadan dikongsi daripada `assets/img`, 64 aset tambahan diperlukan disalin ke `legacy/image`. Kod, backup, invois, Word dan repo `.git` lama tidak disalin. Résumé versi lama juga menuju PDF semasa.

## Pengesahan dan deployment

Lihat `CHANGELOG.md` untuk hasil ujian akhir. Skrip regresi disimpan dalam `scripts/`, screenshot/log ujian dalam `.local/` yang diabaikan Git. Tiada npm build/lint kerana ini laman statik tanpa package.json. Gunakan pemeriksaan sintaks Node, audit rujukan dan ujian browser yang didokumentasikan dalam README.

Perubahan tugas ini lokal sahaja; tiada commit, push atau deployment dijalankan. Projek rujukan Homestay/KGOM dan repo `portfolio-old` tidak disunting.
