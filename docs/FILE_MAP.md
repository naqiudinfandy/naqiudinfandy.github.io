# Peta fail portfolio

| Fail / direktori | Tujuan dan hubungan |
| --- | --- |
| `index.html` | Portfolio utama; dua projek freelance didahulukan dalam sorotan |
| `development.html` | Halaman untuk dikongsi dengan client; anchor `homestay`, `kgom`, `applications`, `portfolio-versions` |
| `projects.html` | Kajian kes lengkap dan filter kategori; anchor asal dikekalkan |
| `style.css` | Token, reka bentuk dan komponen asal; grid toolkit/projek kini dua kolum |
| `work.css` | Halaman client, screenshot, versi portfolio, mobile, chat dan fallback tanpa JS |
| `script.js` | Navigasi, animasi asal, filter, lightbox boleh guna keyboard dan salinan link |
| `i18n.js` | EN/BM/ZH dan pilihan bahasa tersimpan; bahasa HTML dan label diselaraskan |
| `chatbot-knowledge.js` | Fakta projek/perkhidmatan dalam tiga bahasa dan enjin konteks yang boleh diuji |
| `chatbot.js` | Fakta pengalaman asal, UI chat, timer, had input dan handoff |
| `assets/img/work/` | 8 screenshot sebenar untuk galeri dan preview portfolio |
| `assets/img/` | Potret, logo dan screenshot projek asal |
| `assets/resume/Muhammad-Naqiudin-Resume.pdf` | Résumé semasa milik pemilik; semua pautan CV menuju fail ini |
| `legacy/` | 2 halaman versi terdahulu, CSS/JS asal dan 64 gambar tambahan yang dirujuk |
| `scripts/check-chatbot.cjs` | Regresi padanan/fakta/bahasa/konteks tanpa pelayar |
| `scripts/audit-files.mjs` | Audit rujukan fail, anchor dan ID berganda |
| `scripts/check-browser.cjs` | Edge/WebKit, responsif, bahasa, gambar dan interaksi |
| `docs/` | Memori, log perubahan dan peta fail yang dikongsi dalam Git |
| `.local/` | Alat kerja, screenshot dan log ujian; tidak diterbitkan |

Apabila butiran projek freelance berubah, selaraskan kajian kes di `development.html` dan `projects.html`, kad di `index.html`, serta fakta chatbot. Tiada proses build yang menjana atau menyegerakkan kandungan HTML tersebut secara automatik.
