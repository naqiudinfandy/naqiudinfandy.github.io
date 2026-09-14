/* Semakan pelayar portfolio pada Edge (Chromium) dan WebKit.
   Playwright alat lokal pilihan melalui PLAYWRIGHT_MODULE, bukan dependency laman.
   Semak grid, gambar, bahasa, chat, navigasi, lightbox dan fallback tanpa JS/CDN.
   Hasil screenshot disimpan dalam .local/ supaya tidak diterbitkan bersama laman. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium, webkit } = require(process.env.PLAYWRIGHT_MODULE || path.resolve('.local/browser/node_modules/playwright'));
const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:3210';
const out = path.resolve('.local/browser-check');
fs.mkdirSync(out, { recursive: true });
let checks = 0;

/** Tunggu font serta loader sebenar, tanpa menutup overlay secara paksa. */
async function ready(page) {
  await page.waitForFunction(() => !document.querySelector('#loader') || document.querySelector('#loader').classList.contains('is-done'));
  await page.evaluate(() => document.fonts.ready);
}
/** Semua imej lazy dimuat dengan tatal; imej lightbox kosong tidak dikira. */
async function images(page) {
  await page.evaluate(async () => {
    const imgs = [...document.images].filter(img => img.getAttribute('src'));
    await Promise.all(imgs.map(img => { img.loading = 'eager'; return img.decode().catch(() => {}); }));
  });
  assert.deepEqual(await page.evaluate(() => [...document.images].filter(img => img.getAttribute('src') && !img.naturalWidth).map(img => img.src)), []);
  checks++;
}
/** Penilaian overflow juga menyemak teks utama, kerana overflow-x:hidden boleh menyembunyikan masalah. */
async function layout(page, modern) {
  // Tunggu resize/media query WebKit. Timer Playwright juga berfungsi dalam mod tanpa JS.
  await page.waitForTimeout(500);
  const state = await page.evaluate(modern => {
    const columns = selector => {
      const node = document.querySelector(selector);
      return node ? getComputedStyle(node).gridTemplateColumns.split(' ').length : null;
    };
    const escaped = [...document.querySelectorAll('main p, main h1, main h2, main h3, .skill-panel li')].filter(el => {
      if (!el.getClientRects().length || el.closest('.is-hidden')) return false;
      const r = el.getBoundingClientRect();
      return r.left < -1 || r.right > innerWidth + 1;
    }).map(el => el.textContent.trim().slice(0,80));
    return { overflow: document.documentElement.scrollWidth - innerWidth, about: columns('.about__grid'), skills: columns('.skills__grid'), projects: columns('.proj-grid'), escaped: modern ? escaped : [] };
  }, modern);
  assert.ok(state.overflow <= 1, JSON.stringify(state));
  assert.deepEqual(state.escaped, []);
  for (const key of ['about','skills','projects']) if (state[key] !== null) assert.equal(state[key], 2, key);
  checks++;
}
/** Balasan diperiksa melalui UI sebenar, termasuk padanan fakta lama. */
async function ask(page, text, expected) {
  await page.locator('#chat-text').fill(text);
  await page.locator('#chat-form').evaluate(form => form.requestSubmit());
  await page.waitForFunction(() => document.querySelector('#chat-log').getAttribute('aria-busy') === 'false');
  assert.match(await page.locator('#chat-log .msg--bot').last().innerText(), expected, text);
  checks++;
}

(async () => {
  for (const engine of ['edge','webkit']) {
    const browser = await (engine === 'edge' ? chromium.launch({channel:'msedge'}) : webkit.launch());
    try {
      const context = await browser.newContext({viewport:{width:390,height:844}, isMobile:true, hasTouch:true, reducedMotion:'reduce'});
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      for (const route of ['index.html','development.html','projects.html','legacy/index.html','legacy/project.html']) {
        await page.goto(`${base}/${route}`, {waitUntil:'networkidle'});
        if (!route.startsWith('legacy')) await ready(page);
        await images(page);
        for (const width of [320,360,390,430,768,1024,1440]) {
          await page.setViewportSize({width,height:844});
          await layout(page, !route.startsWith('legacy'));
        }
        if (!route.startsWith('legacy')) {
          for (const language of ['ms','zh','en']) {
            await page.evaluate(language => window.I18N.setLang(language), language);
            assert.equal(await page.locator('html').getAttribute('lang'), language === 'zh' ? 'zh-CN' : language);
            await page.setViewportSize({width:320,height:844});
            await layout(page, true);
          }
        }
        console.log(engine, route, 'layout & assets passed');
      }
      await page.setViewportSize({width:390,height:844});
      await page.goto(`${base}/development.html`, {waitUntil:'networkidle'});
      await page.locator('#burger').click();
      assert.equal(await page.locator('#mobile-menu').evaluate(el=>el.inert),false);
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('#mobile-menu').evaluate(el=>el.inert),true);
      await page.locator('#burger').click();
      await page.setViewportSize({width:1440,height:900});
      await page.waitForTimeout(500);
      assert.equal(await page.locator('body').evaluate(el=>el.style.overflow),''); checks++;
      await page.setViewportSize({width:390,height:844});
      await page.locator('#homestay .case__shots img').first().scrollIntoViewIfNeeded();
      await page.locator('#homestay .case__shots img').first().focus();
      await page.keyboard.press('Enter');
      assert.equal(await page.locator('.lightbox').getAttribute('aria-hidden'),'false');
      await page.keyboard.press('Tab');
      assert.equal(await page.locator('.lightbox__x').evaluate(el=>el===document.activeElement),true);
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.lightbox').getAttribute('aria-hidden'),'true');
      assert.equal(await page.locator('#homestay .case__shots img').first().evaluate(el=>el===document.activeElement),true); checks++;
      await page.locator('#chat-fab').click();
      await ask(page,'What technologies did you use for homestay?',/Next.js 16/);
      await ask(page,'more details',/eight family homestays/);
      await ask(page,'Tell me about kambing golek',/Motion and Lenis/);
      await ask(page,'price and timeline',/no fixed price|delivery date/i);
      await ask(page,'hiring full-time notice period',/notice period and start date/i);
      await ask(page,'Infineon experience',/Infineon/);
      await ask(page,'this shipping thing',/I don.t have a rule/);
      await ask(page,'<img src=x onerror=alert(1)>',/I don.t have a rule/);
      assert.equal(await page.locator('#chat-log .msg--me img').count(),0);
      const question='boleh bincang harga & skop?';
      await page.evaluate(()=>window.I18N.setLang('ms'));
      await ask(page,question,/sebut harga|Sebut harga/);
      const handoff=await page.locator('#chat-log .msg--bot').last().locator('.chat__handoff').getAttribute('href');
      assert.ok(new URL(handoff).searchParams.get('text').includes(question)); checks++;
      // Tukar bahasa ketika balasan masih tertangguh; jawapan lama mesti dibatalkan.
      await page.locator('#chat-text').fill('homestay');
      await page.locator('#chat-form').evaluate(form=>form.requestSubmit());
      await page.evaluate(()=>window.I18N.setLang('zh'));
      await page.waitForTimeout(600);
      assert.equal(await page.locator('.msg--typing').count(),0);
      assert.equal(await page.locator('#chat-log .msg--bot').count(),1);
      await ask(page,'民宿技术',/八套/);
      await page.evaluate(()=>window.I18N.setLang('en'));
      await page.locator('#chat-text').fill('homestay');
      await page.locator('#chat-form').evaluate(form=>{form.requestSubmit();form.requestSubmit();});
      await page.waitForTimeout(550);
      assert.equal(await page.locator('#chat-log .msg--me').count(),1); checks++;
      await page.setViewportSize({width:390,height:460});
      await page.waitForTimeout(500);
      const box=await page.locator('#chat-panel').boundingBox();
      assert.ok(box.y>=0 && box.y+box.height<=460,JSON.stringify(box)); checks++;
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('#chat-fab').evaluate(el=>el===document.activeElement),true);
      assert.equal(await page.locator('#chat-panel').evaluate(el=>el.inert),true);
      await page.setViewportSize({width:390,height:844});
      await page.locator('#share-work').click();
      await page.waitForFunction(()=>document.querySelector('#share-status').textContent.length>0); checks++;
      await page.goto(`${base}/projects.html`,{waitUntil:'networkidle'});
      await page.locator('[data-filter="app"]').click();
      assert.equal(await page.locator('#homestay').isVisible(),false);
      await page.evaluate(()=>{location.hash='homestay';});
      await page.locator('#homestay').waitFor({state:'visible'}); checks++;
      // Screenshot semakan dengan imej sudah decode untuk mengelakkan ruang lazy kosong.
      await page.goto(`${base}/index.html`,{waitUntil:'networkidle'}); await ready(page); await images(page);
      for(const section of ['about','skills','projects']) {
        await page.locator('#'+section).evaluate(el=>el.scrollIntoView({block:'start'}));
        await page.screenshot({path:path.join(out,`${engine}-${section}-390.png`)});
      }
      assert.deepEqual(errors,[]); checks++;
      await context.close();

      // Motion biasa + CDN disekat: kandungan dan interaksi mesti masih berfungsi.
      const fallback = await browser.newContext({viewport:{width:390,height:844}});
      await fallback.route('https://cdn.jsdelivr.net/**',route=>route.abort());
      const fp=await fallback.newPage();
      await fp.goto(base+'/index.html',{waitUntil:'networkidle'}); await ready(fp);
      await fp.locator('#about').scrollIntoViewIfNeeded();
      await fp.waitForFunction(()=>document.querySelector('.about__copy').classList.contains('is-visible'));
      await fp.locator('#chat-fab').click(); await ask(fp,'homestay',/Next.js/);
      await fallback.close(); checks++;
      const nojs=await browser.newContext({viewport:{width:320,height:700},javaScriptEnabled:false});
      const np=await nojs.newPage();
      await np.goto(base+'/development.html',{waitUntil:'networkidle'});
      assert.ok(await np.locator('#homestay').isVisible()); await layout(np,true);
      await np.goto(base+'/index.html',{waitUntil:'networkidle'});
      assert.equal(await np.locator('#loader').isVisible(),false); await layout(np,true);
      await nojs.close(); checks++;
      console.log(engine,'interactions, motion/CDN fallback and no-JS passed');
    } finally { await browser.close(); }
  }
  console.log(`${checks} browser checks passed.`);
})().catch(error=>{console.error(error);process.exitCode=1;});
