/* ==========================================================================
   site.js — interaksi & animasi ringan untuk semua halaman portfolio.

   KENAPA tiada library: semua kesan di bawah menggunakan API browser biasa
   (IntersectionObserver, requestAnimationFrame, <dialog>). Animasi berterusan
   dijeda bila tidak kelihatan supaya telefon tidak panas, dan semua gerakan
   dimatikan jika pelawat memilih "kurangkan gerakan" dalam tetapan peranti.

   Fungsi:
     1.  initTheme()      — butang tema cerah/gelap (localStorage "theme")
     2.  initTextSize()   — butang "Aa" untuk teks lebih besar (localStorage "text")
     3.  initMenu()       — menu telefon (buka/tutup, Escape, saiz skrin berubah)
     4.  initActiveNav()  — tanda pautan menu bagi seksyen yang sedang dibaca
     5.  initStagger()    — beri --i kepada anak [data-stagger] untuk kesan berperingkat
     6.  initReveal()     — animasi muncul sekali sahaja semasa skrol
     7.  initPause()      — jeda animasi [data-anim] bila di luar skrin / tab tersembunyi
     8.  initRotator()    — tukar perkataan peranan dalam hero setiap 2.6 saat
     9.  initCountUp()    — angka statistik dikira naik bila kelihatan
     10. initProgress()   — bar kemajuan skrol di atas skrin
     11. initLightbox()   — besarkan screenshot dalam <dialog>
     12. initFilters()    — penapis kategori di projects.html
     13. initCopy()       — salin alamat e-mel
     14. initToTop()      — butang kembali ke atas
   Skrip dimuat dengan "defer", jadi DOM sudah sedia semasa ia berjalan.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  // true jika pelawat meminta gerakan dikurangkan (tetapan aksesibiliti peranti).
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  /** Simpan/baca localStorage dengan selamat (mod peribadi boleh menyekatnya). */
  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      if (value === null) localStorage.removeItem(key); else localStorage.setItem(key, value);
    } catch (e) { /* laman tetap berfungsi tanpa simpanan */ }
    return null;
  }

  /** Senarai NodeList → Array (sokongan pelayar lama). */
  function all(selector, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(selector)); }

  /* 1. Tema: data-theme pada <html> mengatasi tetapan peranti. Skrip kecil dalam
        <head> sudah memulihkan pilihan lama sebelum laman dilukis (tiada kelipan). */
  function initTheme() {
    var btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    var media = window.matchMedia('(prefers-color-scheme: dark)');
    function isDark() { return root.dataset.theme ? root.dataset.theme === 'dark' : media.matches; }
    function sync() {
      btn.setAttribute('aria-pressed', String(isDark()));
      btn.setAttribute('aria-label', isDark() ? 'Switch to light theme' : 'Switch to dark theme');
    }
    btn.addEventListener('click', function () {
      root.dataset.theme = isDark() ? 'light' : 'dark';
      store('theme', root.dataset.theme);
      sync();
    });
    sync();
  }

  /* 2. Saiz teks: data-text="large" membesarkan font-size akar (lihat site.css). */
  function initTextSize() {
    var btn = document.querySelector('[data-text-toggle]');
    if (!btn) return;
    function sync() { btn.setAttribute('aria-pressed', String(root.dataset.text === 'large')); }
    btn.addEventListener('click', function () {
      if (root.dataset.text === 'large') { delete root.dataset.text; store('text', null); }
      else { root.dataset.text = 'large'; store('text', 'large'); }
      sync();
    });
    sync();
  }

  /* 3. Menu telefon: panel [hidden] dibuka/ditutup oleh butang ☰. */
  function initMenu() {
    var btn = document.querySelector('[data-menu-toggle]');
    var panel = document.getElementById('mobile-nav');
    if (!btn || !panel) return;
    function setOpen(open) {
      panel.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    btn.addEventListener('click', function () { setOpen(panel.hidden); });
    panel.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden) { setOpen(false); btn.focus(); }
    });
    window.matchMedia('(min-width: 1040px)').addEventListener('change', function (e) { if (e.matches) setOpen(false); });
  }

  /* 4. Pautan menu aktif melalui IntersectionObserver (tiada kiraan setiap skrol). */
  function initActiveNav() {
    var links = all('.nav a[href^="#"]');
    if (!links.length || !hasIO) return;
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('is-active'); });
        if (map[entry.target.id]) map[entry.target.id].classList.add('is-active');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(map).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  /* 5. Berperingkat: setiap anak .reveal / .hero-in dalam [data-stagger] diberi --i
        (0, 1, 2…) supaya CSS melambatkan kemunculannya sedikit demi sedikit. */
  function initStagger() {
    all('[data-stagger]').forEach(function (group) {
      all('.reveal, .hero-in', group).forEach(function (el, i) { el.style.setProperty('--i', String(i % 8)); });
    });
  }

  /* 6. Reveal: .reveal diberi .is-in sekali, kemudian berhenti diperhati. */
  function initReveal() {
    var items = all('.reveal');
    if (!items.length) return;
    if (!hasIO || reduceMotion) { items.forEach(function (el) { el.classList.add('is-in'); }); return; }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); observer.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { observer.observe(el); });
  }

  /* 7. Jeda animasi berterusan: [data-anim] mendapat .is-paused bila di luar skrin.
        Bila tab disembunyikan, semua dijeda melalui kelas pada <html>. */
  function initPause() {
    var zones = all('[data-anim]');
    if (hasIO) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { entry.target.classList.toggle('is-paused', !entry.isIntersecting); });
      });
      zones.forEach(function (el) { observer.observe(el); });
    }
    document.addEventListener('visibilitychange', function () { root.classList.toggle('is-paused', document.hidden); });
  }

  /* 8. Pemutar perkataan: data-words="A|B|C". Teks penuh untuk pembaca skrin
        berada dalam elemen .sr-only berasingan, jadi pemutar ini aria-hidden. */
  function initRotator() {
    var box = document.querySelector('[data-rotator]');
    if (!box || reduceMotion) return;
    var word = box.querySelector('.rotator__word');
    var words = box.getAttribute('data-words').split('|');
    var index = 0;
    var paused = false;
    if (hasIO) new IntersectionObserver(function (e) { paused = !e[0].isIntersecting; }).observe(box);
    setInterval(function () {
      if (paused || document.hidden) return;
      index = (index + 1) % words.length;
      word.classList.add('is-out');
      setTimeout(function () {
        word.textContent = words[index];
        word.classList.remove('is-out');
        word.classList.add('is-in');
        // Dua bingkai supaya pelayar melukis keadaan "is-in" sebelum dibuang (peralihan masuk).
        requestAnimationFrame(function () { requestAnimationFrame(function () { word.classList.remove('is-in'); }); });
      }, 300);
    }, 2600);
  }

  /* 9. Kiraan naik: data-count="3.70" data-decimals="2" data-prefix="" data-suffix="+".
        HTML asal sudah mengandungi nilai akhir (untuk tanpa JS / kurangkan gerakan). */
  function initCountUp() {
    var items = all('[data-count]');
    if (!items.length || !hasIO || reduceMotion) return;
    function run(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      var start = null;
      var duration = 1400; // milisaat
      function frame(now) {
        if (start === null) start = now;
        var t = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { run(entry.target); observer.unobserve(entry.target); }
      });
    }, { threshold: .6 });
    items.forEach(function (el) { observer.observe(el); });
  }

  /* 10. Bar kemajuan skrol: dikemas kini paling banyak sekali setiap bingkai. */
  function initProgress() {
    var bar = document.querySelector('.progress span');
    if (!bar) return;
    var ticking = false;
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(window.scrollY / max, 1) : 0) + ')';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* 11. Lightbox: butang [data-zoom] membawa URL gambar dan kapsyen.
         <dialog> mengurus fokus, Escape dan latar; fokus kembali ke butang asal. */
  function initLightbox() {
    var triggers = all('[data-zoom]');
    var dialog = document.getElementById('lightbox');
    if (!triggers.length || !dialog || typeof dialog.showModal !== 'function') return;
    var img = dialog.querySelector('img');
    var caption = dialog.querySelector('[data-lightbox-caption]');
    var opener = null;
    triggers.forEach(function (btn) {
      btn.addEventListener('click', function () {
        opener = btn;
        img.src = btn.getAttribute('data-zoom');
        img.alt = btn.querySelector('img') ? btn.querySelector('img').alt : '';
        caption.textContent = btn.getAttribute('data-caption') || img.alt;
        dialog.showModal();
      });
    });
    dialog.querySelector('[data-lightbox-close]').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', function () {
      img.removeAttribute('src');
      if (opener) opener.focus();
    });
  }

  /* 12. Penapis: [data-filter] menyorok item [data-cat] yang tiada kategori itu. */
  function initFilters() {
    var buttons = all('[data-filter]');
    var cases = all('[data-cat]');
    var status = document.getElementById('filter-status');
    if (!buttons.length) return;
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cat = btn.getAttribute('data-filter');
        var shown = 0;
        buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
        cases.forEach(function (c) {
          var match = cat === 'all' || c.getAttribute('data-cat').split(' ').indexOf(cat) > -1;
          c.hidden = !match;
          if (match) { shown++; c.classList.add('is-in'); }
        });
        if (status) status.textContent = 'Showing ' + shown + ' project' + (shown === 1 ? '' : 's') + '.';
      });
    });
  }

  /* 13. Salin e-mel: Clipboard API; jika gagal, pelawat masih boleh klik pautan mailto. */
  function initCopy() {
    all('[data-copy]').forEach(function (btn) {
      var status = document.getElementById(btn.getAttribute('aria-describedby'));
      btn.addEventListener('click', function () {
        var text = btn.getAttribute('data-copy');
        function say(msg) { if (status) status.textContent = msg; }
        if (!navigator.clipboard) { say('Copy is not supported here. Please select the email above.'); return; }
        navigator.clipboard.writeText(text).then(function () { say('Email copied: ' + text); }, function () {
          say('Could not copy. Please select the email above.');
        });
      });
    });
  }

  /* 14. Butang ke atas: muncul selepas penanda #top-sentinel hilang dari skrin. */
  function initToTop() {
    var btn = document.querySelector('.to-top');
    var sentinel = document.getElementById('top-sentinel');
    if (!btn || !sentinel || !hasIO) return;
    new IntersectionObserver(function (entries) {
      btn.classList.toggle('is-visible', !entries[0].isIntersecting);
    }, { rootMargin: '400px 0px 0px 0px' }).observe(sentinel);
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      var brand = document.querySelector('.brand');
      if (brand) brand.focus({ preventScroll: true });
    });
  }

  // Tahun semasa dalam footer.
  all('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  initTheme();
  initTextSize();
  initMenu();
  initActiveNav();
  initStagger();
  initReveal();
  initPause();
  initRotator();
  initCountUp();
  initProgress();
  initLightbox();
  initFilters();
  initCopy();
  initToTop();
})();
