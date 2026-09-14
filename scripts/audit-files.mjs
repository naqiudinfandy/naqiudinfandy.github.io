/** Audit pautan/aset statik dan ID HTML; hanya membaca fail yang diterbitkan.
 * fs/path/assert ialah library Node, URL menyelesaikan laluan relatif setiap halaman.
 * Fail public tanpa rujukan tidak dipadam kerana mungkin digunakan oleh pautan luar.
 */
import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['index.html', 'projects.html', 'development.html', 'legacy/index.html', 'legacy/project.html'];
const ids = new Map();
let checked = 0;
for (const page of pages) {
  const html = readFileSync(resolve(root, page), 'utf8');
  const found = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(found).size, found.length, `Duplicate ID: ${page}`);
  ids.set(page, new Set(found));
}
/** Rujukan relatif diselesaikan daripada fail asal, termasuk ../ bagi versi lama. */
function verify(value, source) {
  if (!value || /^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(value)) return;
  const [pathname, hash] = value.split('#');
  const target = resolve(root, dirname(source), decodeURIComponent(pathname.split('?')[0] || source.split('/').at(-1)));
  assert.ok(target.startsWith(root), `Reference outside site: ${source} ${value}`);
  assert.ok(existsSync(target), `Missing file: ${source} → ${value}`);
  const key = relative(root, target).replaceAll('\\', '/');
  if (hash && ids.has(key)) assert.ok(ids.get(key).has(decodeURIComponent(hash)), `Missing anchor: ${source} → ${value}`);
  checked++;
}
for (const page of pages) {
  const html = readFileSync(resolve(root, page), 'utf8');
  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) verify(match[1], page);
}
for (const source of ['style.css', 'work.css', 'legacy/style.css']) {
  // Data URI SVG boleh mengandungi url(%23id) dalaman; itu bukan fail di disk.
  const css = readFileSync(resolve(root, source), 'utf8').replace(/url\((["'])data:[\s\S]*?\1\)/g, '');
  for (const match of css.matchAll(/url\(["']?([^\s)'";]+)["']?\)/g)) verify(match[1], source);
}
for (const source of ['chatbot.js', 'chatbot-knowledge.js']) {
  const js = readFileSync(resolve(root, source), 'utf8');
  for (const match of js.matchAll(/href=["']((?:assets\/|development\.html|projects\.html|index\.html|legacy\/)[^"']*)["']/g)) verify(match[1], source);
}
const assets = ['homestay-desktop.jpg','homestay-detail.jpg','homestay-mobile.jpg','kgom-desktop.jpg','kgom-detail.jpg','kgom-mobile.jpg','portfolio-old.jpg','portfolio-new.jpg'];
const size = assets.reduce((sum, file) => sum + statSync(resolve(root, 'assets/img/work', file)).size, 0);
console.log(`${pages.length} HTML pages, ${checked} local references, unique IDs and anchors passed.`);
console.log(`8 portfolio screenshots: ${(size/1024/1024).toFixed(2)} MiB total.`);
