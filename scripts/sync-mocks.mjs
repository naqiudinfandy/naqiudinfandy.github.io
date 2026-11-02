/**
 * sync-mocks.mjs — salin mock laman web klien dari folder Development/Mock ke portfolio/mock/.
 *
 * KENAPA: mock dibina dalam folder Mock/ (sumber kerja). Untuk dikongsi dengan klien,
 * ia perlu berada dalam repo portfolio supaya GitHub Pages menerbitkannya di
 *   https://naqiudinfandy.github.io/mock/<slug>/
 * Halaman ini TERSEMBUNYI: tidak dipaut dari mana-mana halaman portfolio, dan setiap
 * halaman diberi <meta name="robots" content="noindex"> supaya Google tidak menyenaraikannya.
 * (Repo GitHub awam — sesiapa yang melayari repo masih boleh nampak fail. Ini "tersembunyi",
 *  bukan "rahsia".)
 *
 * Apa skrip ini buat untuk setiap mock dalam senarai MOCKS:
 *   1. Padam salinan lama mock/<slug>/ dan salin semula semua fail dari folder sumber,
 *      KECUALI nota dalaman (*.md, Contact.txt) dan fail sistem.
 *   2. Dalam index.html salinan: tambah meta noindex, og:url & og:image mutlak (untuk
 *      pratonton WhatsApp), dan jalur kecil "Pratonton reka bentuk — bukan laman rasmi".
 *   3. Jana semula mock/index.html (senarai semua mock untuk pemilik).
 * Folder sumber dalam Mock/ TIDAK diubah.
 *
 * Cara tambah mock baharu: tambah satu objek dalam MOCKS, kemudian jalankan
 *   node scripts/sync-mocks.mjs
 * Library: hanya modul terbina Node (fs, path, url). Tiada dependency.
 */
import { readFileSync, writeFileSync, rmSync, mkdirSync, readdirSync, statSync, copyFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');   // folder portfolio
const mockSource = resolve(root, '../Mock');                           // Development/Mock
const outDir = resolve(root, 'mock');
const siteUrl = 'https://naqiudinfandy.github.io';

/**
 * Senarai mock yang diterbitkan.
 * slug    — bahagian pautan: /mock/<slug>/ (huruf kecil, sempang, mudah dibaca)
 * name    — nama klinik/perniagaan untuk halaman senarai
 * type    — penerangan ringkas jenis laman
 * source  — folder mock dalam Development/Mock (relatif)
 * updated — tarikh versi mock (untuk paparan sahaja)
 * exclude — (pilihan) senarai laluan fail relatif dalam folder mock yang TIDAK disalin.
 *           Guna untuk foto yang tidak dipaparkan tetapi sensitif (cth. wajah kanak-kanak),
 *           kerana repo portfolio adalah awam. Contoh: ['img/building/inside.png'].
 */
const MOCKS = [
  {
    slug: 'klinik-aisha',
    name: 'Klinik Aisha Bertam Impian',
    type: 'Klinik keluarga, ibu & anak · Melaka',
    source: 'KlinikAishaBertamImpian/mock_web_KlinikAishaBertamImpian',
    updated: '22 Okt 2026',
  },
  {
    slug: 'klinik-al-falah',
    name: 'Klinik Al Falah Umbai',
    type: 'Klinik keluarga · Merlimau, Melaka',
    source: 'KlinikAlFalah/Mock_web_KlinikAlFalah',
    updated: '22 Okt 2026',
  },
  {
    slug: 'klinik-medpro',
    name: 'Klinik MedPro',
    type: 'Klinik keluarga & klinik panel · Batu Berendam, Melaka',
    source: 'KlinikMedPro/Mock_web_KlinikMedPro',
    updated: '2 Nov 2026',
  },
  {
    slug: 'temu-coffee',
    name: 'Temu Coffee House',
    type: 'Kafe estetik & bilik majlis · Padang Temu, Melaka',
    source: 'TemuCoffeeHouse/Mock_web_TemuCoffeeHouse',
    updated: '2 Nov 2026',
    // inside.png: wajah kanak-kanak (tidak dipaparkan). food5: salinan tanpa sambungan; laman guna food5.webp.
    exclude: ['img/building/inside.png', 'img/servis/food5'],
  },
];

/** Fail yang tidak diterbitkan: nota dalaman pemilik dan fail sistem. */
const SKIP = /(\.md$|^Contact\.txt$|^Thumbs\.db$|^desktop\.ini$|^\.DS_Store$|^\.)/i;

/** Salin folder secara rekursif, langkau fail dalam SKIP. Pulangkan bilangan & saiz. */
// exclude = Set laluan relatif (garis condong ke hadapan) yang dilangkau; base = folder akar mock.
function copyDir(from, to, stats = { files: 0, bytes: 0 }, exclude = new Set(), base = from) {
  mkdirSync(to, { recursive: true });
  for (const entry of readdirSync(from)) {
    if (SKIP.test(entry)) continue;
    const src = join(from, entry);
    const dest = join(to, entry);
    if (exclude.has(relative(base, src).split('\\').join('/'))) { stats.skipped = (stats.skipped || 0) + 1; continue; }
    if (statSync(src).isDirectory()) copyDir(src, dest, stats, exclude, base);
    else { copyFileSync(src, dest); stats.files++; stats.bytes += statSync(src).size; }
  }
  return stats;
}

/** Escape teks ringkas untuk HTML (nama dari senarai MOCKS). */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Ubah index.html salinan: noindex, og mutlak, jalur pratonton. Idempotent kerana fail sentiasa disalin semula. */
function prepareIndex(file, mock) {
  let html = readFileSync(file, 'utf8');
  const pageUrl = `${siteUrl}/mock/${mock.slug}/`;
  const meta = [
    '  <!-- [sync-mocks] Halaman pratonton tersembunyi: jangan disenaraikan oleh enjin carian. -->',
    '  <meta name="robots" content="noindex, nofollow, noarchive">',
    `  <meta property="og:url" content="${pageUrl}">`,
  ].join('\n');
  html = html.replace(/(<meta charset="[^"]*">)/i, `$1\n${meta}`);
  // og:image relatif → mutlak supaya pratonton WhatsApp/Facebook berfungsi.
  html = html.replace(/(<meta property="og:image" content=")(?!https?:)([^"]+)(")/i, `$1${pageUrl}$2$3`);
  // Jalur kecil di atas: jujur bahawa ini mock, supaya tidak disangka laman rasmi.
  const ribbon = '\n<!-- [sync-mocks] Jalur pratonton (bukan sebahagian reka bentuk klien). -->\n'
    + '<div role="note" style="background:#111827;color:#f9fafb;font:600 13px/1.4 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;text-align:center;padding:7px 14px;position:relative;z-index:1000">'
    + 'Pratonton reka bentuk (mock) oleh Naqiudin · bukan laman web rasmi</div>';
  html = html.replace(/(<body[^>]*>)/i, `$1${ribbon}`);
  if (!html.includes('noindex')) throw new Error(`Gagal menambah noindex: ${file}`);
  writeFileSync(file, html);
  const og = html.match(/<meta property="og:image" content="([^"]+)"/i);
  return og ? og[1].replace(pageUrl, '') : '';
}

/** Halaman senarai mock untuk pemilik (juga noindex, tidak dipaut dari portfolio). */
function listPage(items) {
  const cards = items.map(m => `
        <article class="card card--lift project">
          <a class="project__media" href="${m.slug}/" tabindex="-1" aria-hidden="true">${m.image ? `<img src="${m.slug}/${m.image}" alt="" loading="lazy" decoding="async">` : ''}</a>
          <div class="project__body">
            <div class="project__meta"><span class="badge">Mock</span><span class="badge">${esc(m.updated)}</span></div>
            <h2 style="font-size:1.2rem;margin:0">${esc(m.name)}</h2>
            <p>${esc(m.type)}</p>
            <p class="small" style="word-break:break-all"><code>${siteUrl}/mock/${m.slug}/</code></p>
            <div class="btn-row">
              <a class="btn btn--primary btn--sm" href="${m.slug}/">Buka mock</a>
              <button class="btn btn--ghost btn--sm" type="button" data-copy="${siteUrl}/mock/${m.slug}/" aria-describedby="copy-status">Salin pautan</button>
            </div>
          </div>
        </article>`).join('');
  return `<!DOCTYPE html>
<!--
  mock/index.html — DIJANA oleh scripts/sync-mocks.mjs. Jangan sunting terus; ubah senarai MOCKS
  dalam skrip itu dan jalankan semula. Halaman tersembunyi untuk pemilik: tidak dipaut dari
  portfolio dan bertanda noindex. Kongsi pautan setiap mock (/mock/<slug>/) kepada klien,
  bukan halaman senarai ini, supaya klien tidak nampak mock klien lain.
-->
<html lang="ms">
<head>
  <meta charset="UTF-8">
  <meta name="robots" content="noindex, nofollow, noarchive">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mock Laman Web · Naqiudin</title>
  <meta name="theme-color" content="#090e24">
  <script>
    (function (r) {
      r.classList.add('js');
      try {
        var t = localStorage.getItem('theme'); if (t) r.dataset.theme = t;
        if (localStorage.getItem('text') === 'large') r.dataset.text = 'large';
      } catch (e) {}
    })(document.documentElement);
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap">
  <link rel="stylesheet" href="../assets/css/site.css">
  <script src="../assets/js/site.js" defer></script>
</head>
<body>
<main id="main">
  <section class="hero page-hero" aria-labelledby="page-title" data-anim>
    <div class="hero__bg" aria-hidden="true"><span class="blob blob--1"></span><span class="blob blob--2"></span><span class="hero__grid-bg"></span></div>
    <div class="container">
      <span class="eyebrow" style="color:#c7d2fe">Pratonton untuk klien</span>
      <h1 id="page-title">Mock laman web</h1>
      <p class="lead">Reka bentuk cadangan untuk semakan klien. Halaman ini tidak disenaraikan di Google dan tidak dipaut dari portfolio.</p>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <p class="copy-status" id="copy-status" role="status" aria-live="polite" style="color:var(--ok);margin-bottom:12px"></p>
      <div class="grid grid--2">${cards}
      </div>
      <p class="muted small" style="margin-top:24px">© Muhammad Naqiudin · <a href="../index.html">Portfolio</a></p>
    </div>
  </section>
</main>
</body>
</html>
`;
}

// ---- Jalankan ----
mkdirSync(outDir, { recursive: true });
const published = [];
for (const mock of MOCKS) {
  const src = resolve(mockSource, mock.source);
  if (!existsSync(join(src, 'index.html'))) throw new Error(`Tiada index.html dalam ${src}`);
  const dest = join(outDir, mock.slug);
  rmSync(dest, { recursive: true, force: true });
  const stats = copyDir(src, dest, undefined, new Set(mock.exclude || []));
  // Pastikan setiap laluan exclude benar-benar wujud (elak salah taip yang menerbitkan fail sensitif)
  for (const ex of mock.exclude || []) {
    if (!existsSync(join(src, ex))) throw new Error(`exclude tidak dijumpai dalam ${mock.slug}: ${ex}`);
    if (existsSync(join(dest, ex))) throw new Error(`exclude masih disalin: ${mock.slug}/${ex}`);
  }
  const image = prepareIndex(join(dest, 'index.html'), mock);
  published.push({ ...mock, image });
  console.log(`mock/${mock.slug}/  ← ${relative(resolve(root, '..'), src)}  (${stats.files} fail, ${(stats.bytes / 1024 / 1024).toFixed(2)} MB)`);
}
// Buang folder mock lama yang sudah tiada dalam senarai (contoh: klien dibatalkan).
for (const entry of readdirSync(outDir)) {
  const full = join(outDir, entry);
  if (statSync(full).isDirectory() && !MOCKS.some(m => m.slug === entry)) {
    rmSync(full, { recursive: true, force: true });
    console.log(`dibuang: mock/${entry}/ (tiada dalam senarai MOCKS)`);
  }
}
writeFileSync(join(outDir, 'index.html'), listPage(published));
console.log(`mock/index.html dijana (${published.length} mock). Pautan: ${siteUrl}/mock/`);
