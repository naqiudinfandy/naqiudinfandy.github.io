/** Audit pautan/aset statik dan ID HTML; hanya membaca fail yang diterbitkan.
 * Semak: setiap href/src/data-zoom tempatan wujud, anchor (#id) wujud dalam halaman sasaran,
 * tiada ID berganda, dan jumlah saiz gambar/CSS/JS yang dimuat oleh halaman semasa.
 * fs/path/assert ialah library Node; URL relatif diselesaikan daripada fail asal (termasuk ../).
 * Fail tanpa rujukan TIDAK dipadam kerana mungkin digunakan oleh pautan luar.
 */
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const current = ['index.html', 'development.html', 'projects.html'];
// Mock klien tersembunyi (mock/<slug>/index.html) juga diaudit supaya pautan/gambar tidak rosak.
const mockPages = existsSync(resolve(root, 'mock')) ? ['mock/index.html', ...readdirSync(resolve(root, 'mock'), { withFileTypes: true }).filter(d => d.isDirectory()).map(d => 'mock/' + d.name + '/index.html')] : [];
const pages = [...current, '404.html', 'legacy/index.html', 'legacy/project.html', ...mockPages];
const ids = new Map();
let checked = 0;

for (const page of pages) {
  const html = readFileSync(resolve(root, page), 'utf8');
  const found = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(found).size, found.length, `Duplicate ID: ${page}`);
  ids.set(page, new Set(found));
}

/** Selesaikan satu rujukan relatif; kembalikan laluan fail jika tempatan. */
function verify(value, source) {
  if (!value || /^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(value)) return null;
  const [pathname, hash] = value.split('#');
  // Laluan bermula '/' (contoh dalam 404.html) diselesaikan dari akar laman; '/' sahaja = index.html.
  const clean = decodeURIComponent(pathname.split('?')[0] || source.split('/').at(-1));
  const target = clean.startsWith('/') ? resolve(root, '.' + (clean === '/' ? '/index.html' : clean)) : resolve(root, dirname(source), clean);
  assert.ok(target.startsWith(root), `Reference outside site: ${source} ${value}`);
  assert.ok(existsSync(target), `Missing file: ${source} → ${value}`);
  const key = relative(root, target).replaceAll('\\', '/');
  if (hash && ids.has(key)) assert.ok(ids.get(key).has(decodeURIComponent(hash)), `Missing anchor: ${source} → ${value}`);
  checked++;
  return target;
}

const weight = new Map();
for (const page of pages) {
  // Buang komen HTML dahulu supaya contoh dalam komen tidak dikira sebagai pautan.
  const html = readFileSync(resolve(root, page), 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  for (const match of html.matchAll(/\b(?:href|src|data-zoom)=["']([^"']+)["']/g)) {
    const target = verify(match[1], page);
    // Kira berat aset unik bagi halaman semasa (bukan pautan ke halaman HTML lain atau PDF).
    if (target && current.includes(page) && !/\.(html|pdf)$/i.test(target)) weight.set(target, statSync(target).size);
  }
}
for (const source of ['assets/css/site.css', 'legacy/style.css']) {
  const css = readFileSync(resolve(root, source), 'utf8').replace(/url\((["'])data:[\s\S]*?\1\)/g, '');
  for (const match of css.matchAll(/url\(["']?([^\s)'";]+)["']?\)/g)) verify(match[1], source);
}

const kb = bytes => `${(bytes / 1024).toFixed(1)} KB`;
const total = [...weight.values()].reduce((a, b) => a + b, 0);
const code = ['assets/css/site.css', 'assets/js/site.js'].map(f => statSync(resolve(root, f)).size);
console.log(`${pages.length} HTML pages, ${checked} local references, unique IDs and anchors passed.`);
console.log(`Current pages use ${weight.size} local assets, ${kb(total)} in total (CSS ${kb(code[0])}, JS ${kb(code[1])}).`);
