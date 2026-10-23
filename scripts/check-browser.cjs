/* Semakan pelayar portfolio pada Edge (Chromium) dan WebKit (enjin Safari).

   Apa yang disemak:
     - 5 lebar skrin (320–1440px): tiada skrol mendatar, teks tidak terkeluar skrin
     - semua gambar berjaya dimuat, tiada ralat JavaScript
     - butang & pautan utama sekurang-kurangnya 44px tinggi (mudah ditekan)
     - menu telefon, butang tema, butang "Aa", lightbox, penapis projek, salin e-mel
     - mod tanpa JavaScript dan "kurangkan gerakan" tetap memaparkan kandungan
     - halaman legacy/ masih dibuka tanpa ralat

   Playwright ialah alat lokal pilihan (PLAYWRIGHT_MODULE), bukan dependency laman.
   Jalankan pelayan statik dahulu:  python -m http.server 3210 --bind 127.0.0.1
   Screenshot disimpan dalam .local/browser-check/ (tidak diterbitkan). */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium, webkit } = require(process.env.PLAYWRIGHT_MODULE || path.resolve('.local/browser/node_modules/playwright'));

const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:3210';
const out = path.resolve('.local/browser-check');
fs.mkdirSync(out, { recursive: true });
const pages = ['index.html', 'development.html', 'projects.html'];
const widths = [320, 390, 768, 1024, 1440];
let checks = 0;

/** Paksa semua gambar lazy dimuat, kemudian pastikan tiada yang gagal. */
async function images(page) {
  await page.evaluate(async () => {
    const imgs = [...document.images].filter(img => img.getAttribute('src'));
    await Promise.all(imgs.map(img => { img.loading = 'eager'; return img.decode().catch(() => {}); }));
  });
  const broken = await page.evaluate(() => [...document.images].filter(img => img.getAttribute('src') && !img.naturalWidth).map(img => img.src));
  assert.deepEqual(broken, [], 'Broken images');
  checks++;
}

/** Tiada skrol mendatar dan tiada teks terkeluar dari skrin. */
async function layout(page, label) {
  const state = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - innerWidth,
    escaped: [...document.querySelectorAll('main p, main h1, main h2, main h3, main li, .site-header a, .site-header button')]
      // Jalur teknologi (.marquee) sengaja bergerak keluar skrin, jadi dikecualikan.
      .filter(el => el.getClientRects().length && !el.closest('[hidden]') && !el.closest('.marquee'))
      .filter(el => { const r = el.getBoundingClientRect(); return r.left < -1 || r.right > innerWidth + 1; })
      .map(el => el.textContent.trim().slice(0, 40)),
  }));
  assert.ok(state.overflow <= 0, `${label}: horizontal overflow ${state.overflow}px`);
  assert.deepEqual(state.escaped, [], `${label}: text outside screen`);
  checks++;
}

/** Sasaran sentuh: butang & pautan berbentuk butang ≥ 44px. */
async function tapTargets(page, label) {
  const small = await page.evaluate(() => [...document.querySelectorAll('.btn, .icon-btn, .copy-btn, .nav a, .filters button, details.more summary')]
    .filter(el => el.getClientRects().length && !el.closest('[hidden]'))
    .filter(el => el.getBoundingClientRect().height < 43.5)
    .map(el => `${el.className} "${el.textContent.trim().slice(0, 20)}" ${Math.round(el.getBoundingClientRect().height)}px`));
  assert.deepEqual(small, [], `${label}: tap targets under 44px`);
  checks++;
}

async function run(browserType, name, options = {}) {
  const browser = await browserType.launch(options);
  const errors = [];
  const watch = page => page.on('pageerror', e => errors.push(`${name}: ${e.message}`));

  // 1. Susun atur, gambar dan sasaran sentuh pada setiap halaman & lebar.
  for (const file of pages) {
    for (const width of widths) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      const page = await context.newPage(); watch(page);
      await page.goto(`${base}/${file}`, { waitUntil: 'load' });
      await layout(page, `${name} ${file} ${width}`);
      await tapTargets(page, `${name} ${file} ${width}`);
      if (width === 390) await images(page);
      if (width === 390 || width === 1440) await page.screenshot({ path: path.join(out, `${name}-${file.replace('.html', '')}-${width}.png`) });
      await context.close();
    }
  }

  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
  const page = await context.newPage(); watch(page);
  await page.goto(`${base}/index.html`, { waitUntil: 'load' });

  // 2. Menu telefon: buka, pautan menutup menu, Escape menutup dan fokus kembali.
  const menuBtn = page.locator('[data-menu-toggle]');
  await menuBtn.click();
  assert.equal(await menuBtn.getAttribute('aria-expanded'), 'true');
  assert.equal(await page.locator('#mobile-nav').isVisible(), true);
  await page.locator('#mobile-nav a[href="#skills"]').click();
  assert.equal(await page.locator('#mobile-nav').isVisible(), false, 'menu closes after link');
  await menuBtn.click();
  await page.keyboard.press('Escape');
  assert.equal(await menuBtn.getAttribute('aria-expanded'), 'false');
  assert.equal(await page.evaluate(() => document.activeElement.hasAttribute('data-menu-toggle')), true, 'focus returns to menu button');
  checks += 4;

  // 3. Tema & saiz teks disimpan selepas muat semula.
  await page.locator('[data-theme-toggle]').click();
  const theme = await page.evaluate(() => document.documentElement.dataset.theme);
  assert.ok(theme === 'dark' || theme === 'light');
  await page.locator('[data-text-toggle]').click();
  await page.reload({ waitUntil: 'load' });
  assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), theme, 'theme persists');
  assert.equal(await page.evaluate(() => document.documentElement.dataset.text), 'large', 'text size persists');
  await layout(page, `${name} index large-text`);
  await page.locator('[data-text-toggle]').click();
  checks += 3;

  // 4. <details> pengalaman boleh dibuka.
  await page.locator('#experience details.more summary').first().click();
  assert.equal(await page.locator('#experience details.more').first().evaluate(d => d.open), true);
  checks++;

  // 4b. Foto travel: polaroid kecil membuka versi besar dalam lightbox.
  const travel = page.locator('.travel-strip .polaroid button').first();
  await travel.scrollIntoViewIfNeeded();
  await travel.click();
  assert.equal(await page.locator('#lightbox').evaluate(d => d.open), true, 'travel lightbox opens');
  assert.match(await page.locator('#lightbox img').getAttribute('src'), /-lg\.webp$/);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#lightbox').evaluate(d => d.open), false);
  checks += 3;

  // 5. Lightbox: buka dengan klik, tutup dengan Escape, fokus kembali ke gambar.
  await page.goto(`${base}/development.html#homestay`, { waitUntil: 'load' });
  const shot = page.locator('#homestay [data-zoom]').first();
  await shot.click();
  assert.equal(await page.locator('#lightbox').evaluate(d => d.open), true, 'lightbox opens');
  assert.ok(await page.locator('#lightbox img').evaluate(img => img.complete && img.naturalWidth > 0 || new Promise(r => img.onload = () => r(img.naturalWidth > 0))));
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#lightbox').evaluate(d => d.open), false, 'lightbox closes');
  assert.equal(await shot.evaluate(el => el === document.activeElement), true, 'focus returns to image');
  checks += 4;

  // 6. Penapis projek.
  await page.goto(`${base}/projects.html`, { waitUntil: 'load' });
  const visible = () => page.evaluate(() => [...document.querySelectorAll('[data-cat]')].filter(el => !el.hidden).map(el => el.id));
  const all = await visible();
  await page.locator('[data-filter="ml"]').click();
  const ml = await visible();
  assert.ok(ml.length > 0 && ml.length < all.length && ml.includes('yolo') && !ml.includes('kgom'), 'ml filter');
  await page.locator('[data-filter="app"]').click();
  assert.deepEqual(await visible(), ['vbapp']);
  await page.locator('[data-filter="all"]').click();
  assert.equal((await visible()).length, all.length);
  checks += 3;

  // 7. Anchor lama & baharu wujud (pautan luar tidak rosak).
  for (const id of ['masterdata', 'homestay', 'kgom', 'fyp', 'yolo', 'network', 'foodwaste', 'angular', 'sentiment', 'kmeans', 'catalog', 'vbapp', 'portfolio', 'booking', 'rsvp']) {
    assert.equal(await page.locator(`#${id}`).count(), 1, `projects.html#${id}`);
  }
  checks++;
  await context.close();

  // 8. Salin e-mel (Chromium sahaja: WebKit Playwright tidak menyokong kebenaran clipboard).
  if (name === 'edge') {
    const c = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'] });
    const p = await c.newPage(); watch(p);
    await p.goto(`${base}/index.html#contact`, { waitUntil: 'load' });
    await p.locator('[data-copy]').click();
    await p.waitForFunction(() => document.getElementById('copy-status').textContent.includes('copied'));
    assert.equal(await p.evaluate(() => navigator.clipboard.readText()), 'naqiudin73@gmail.com');
    checks++;
    await c.close();
  }

  // 9. Tanpa JavaScript: kandungan .reveal tetap kelihatan, menu telefon tersembunyi.
  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const nj = await noJs.newPage();
  for (const file of pages) {
    await nj.goto(`${base}/${file}`, { waitUntil: 'load' });
    const hidden = await nj.evaluate(() => [...document.querySelectorAll('.reveal')].filter(el => getComputedStyle(el).opacity !== '1').length);
    assert.equal(hidden, 0, `${file} no-JS reveal content visible`);
    checks++;
  }
  await noJs.close();

  // 10. Animasi muncul berfungsi biasa (tanpa reduced-motion) dan elemen akhirnya kelihatan.
  const motion = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const mp = await motion.newPage(); watch(mp);
  await mp.goto(`${base}/index.html`, { waitUntil: 'load' });
  // Kiraan naik berakhir pada nilai sebenar, dan pemutar peranan bertukar perkataan.
  await mp.waitForTimeout(3200);
  assert.deepEqual(await mp.locator('.stat b').allTextContents(), ['2+ yrs', '3', '3.70', '7'], 'count-up final values');
  assert.notEqual(await mp.locator('.rotator__word').textContent(), 'System Engineer', 'role rotator changes');
  assert.equal(await mp.locator('.hero').evaluate(el => el.classList.contains('is-paused')), false);
  await mp.locator('#contact').scrollIntoViewIfNeeded();
  await mp.waitForTimeout(900);
  assert.equal(await mp.locator('#contact .reveal').first().evaluate(el => getComputedStyle(el).opacity), '1');
  // Animasi hero dijeda bila hero di luar skrin (jimat bateri/haba).
  assert.equal(await mp.locator('.hero').evaluate(el => el.classList.contains('is-paused')), true, 'hero animation paused offscreen');
  checks += 4;

  // 10b. Halaman 404 khas: tiru GitHub Pages yang menjawab URL tidak wujud (pada sebarang
  //      kedalaman) dengan kandungan 404.html. Gaya mesti dimuat kerana laluan bermula "/".
  const notFound = fs.readFileSync(path.resolve('404.html'), 'utf8');
  await mp.route('**/projek-lama/tiada/halaman', route => route.fulfill({ status: 404, contentType: 'text/html', body: notFound }));
  const nf = await mp.goto(`${base}/projek-lama/tiada/halaman`, { waitUntil: 'load' });
  assert.equal(nf.status(), 404);
  assert.equal(await mp.locator('#nf-path').textContent(), '/projek-lama/tiada/halaman', '404 shows requested path');
  assert.equal(await mp.locator('.hero').evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(9, 14, 36)', '404 stylesheet loaded from /assets');
  assert.ok(await mp.locator('meta[name="robots"][content*="noindex"]').count(), '404 noindex');
  await mp.locator('.nf .btn--primary').click();
  await mp.waitForURL(`${base}/`);
  assert.equal(await mp.locator('#hero-title').count(), 1, '404 home button works');
  checks += 5;

  // 11. Versi lama masih dibuka.
  for (const file of ['legacy/index.html', 'legacy/project.html']) {
    const res = await mp.goto(`${base}/${file}`, { waitUntil: 'load' });
    assert.equal(res.status(), 200, file);
    checks++;
  }
  await motion.close();

  await browser.close();
  assert.deepEqual(errors.filter(e => !e.includes('legacy')), [], 'page errors');
  console.log(`${name}: ok`);
}

(async () => {
  await run(chromium, 'edge', { channel: 'msedge' });
  await run(webkit, 'webkit');
  console.log(`${checks} browser checks passed.`);
})().catch(error => { console.error(error); process.exit(1); });
