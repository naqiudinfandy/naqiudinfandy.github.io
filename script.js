/* ============================================================================
   script.js — ALL SITE INTERACTION
   ============================================================================
   Runs on both index.html and projects.html. Each feature lives in its own
   init… function and every one of them exits quietly if the elements it needs
   are not on the current page — so the same file can serve every page.

   FEATURE INDEX
     01. helpers ............ tiny utilities (select, clamp, lerp, reduced-motion)
     02. initPreloader ...... the boot animation and how it gets removed
     03. initReveal ......... fade/slide elements in as they enter the viewport
     04. initHeroIntro ...... the staged entrance animation for the hero
     05. initTypewriter ..... rotating job titles under the name
     06. initCounters ....... numbers that count up when scrolled into view
     07. initNav ............ sticky bar, hide-on-scroll, active link, drawer
     08. initScrollUi ....... top progress bar + back-to-top button
     09. initCursor ......... custom two-part cursor (desktop only)
     10. initMagnetic ....... buttons that lean toward the pointer
     11. initTilt ........... 3D card tilt that follows the mouse
     12. initGlass .......... moves the liquid-glass highlight with the pointer
     13. initParallax ....... hero floaters + GSAP scroll parallax
     14. initTimelineScrub .. the experience rail that fills as you scroll
     15. initCanvas ......... animated particle constellation background
     16. initFlipCards ...... tap-to-flip certificates on touch screens
     17. initContactForm .... validation + opens the visitor's mail app
     18. initProjectsPage ... category filters + screenshot lightbox
     19. initMisc ........... footer year, smooth anchors, external libs check

   EXTERNAL LIBRARIES (all optional — the site degrades gracefully)
     • GSAP + ScrollTrigger → scroll-driven parallax and the timeline scrub
     • Motion One           → the vanilla-JS sibling of Framer Motion, used for
                              the hero entrance and the drawer transitions
   ============================================================================ */

(function () {
  'use strict';

  /* ==========================================================================
     01. HELPERS
     ========================================================================== */
  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const lerp  = (a, b, t) => a + (b - a) * t;

  /* Does the visitor prefer less movement? Honour it everywhere. */
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* Does the device have a real pointer (mouse/trackpad)? */
  const FINE_POINTER = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* Library shortcuts — these may be undefined if a CDN is blocked */
  const gsap   = window.gsap;
  const ST     = window.ScrollTrigger;
  const Motion = window.Motion;

  if (gsap && ST) gsap.registerPlugin(ST);


  /* ==========================================================================
     02. PRELOADER
     A fake-but-honest progress bar: it climbs while assets load and always
     finishes at 100% once window.load fires (or after a 3.5s safety timeout,
     so a slow image can never trap the visitor behind the loader).
     ========================================================================== */
  function initPreloader() {
    const loader = $('#loader');
    if (!loader) return;

    document.body.classList.add('is-loading');

    const fill = $('.loader__fill', loader);
    const pct  = $('.loader__pct', loader);
    let value = 0;
    let finished = false;

    // Climb towards 90% while we wait — never reach 100 until we're truly done
    const tick = setInterval(() => {
      value = Math.min(value + Math.random() * 12, 90);
      if (fill) fill.style.width = value + '%';
      if (pct)  pct.textContent = Math.floor(value) + '%';
    }, 130);

    function finish() {
      if (finished) return;
      finished = true;
      clearInterval(tick);
      if (fill) fill.style.width = '100%';
      if (pct)  pct.textContent = '100%';

      // Small beat at 100% so it doesn't feel like a glitch, then reveal
      setTimeout(() => {
        loader.classList.add('is-done');
        document.body.classList.remove('is-loading');
        document.body.classList.add('is-ready');
        initHeroIntro();                     // hero animates only after reveal
        setTimeout(() => loader.remove(), 900);
      }, 380);
    }

    window.addEventListener('load', finish);
    setTimeout(finish, 3500);                // safety net
  }


  /* ==========================================================================
     03. SCROLL REVEAL
     Every element with class .reveal starts hidden (see style.css) and gets
     .is-visible when it scrolls into view. IntersectionObserver is used rather
     than a scroll listener so it stays cheap on long pages.
     ========================================================================== */
  function initReveal() {
    const items = $$('.reveal');
    if (!items.length) return;

    if (REDUCED || !('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        // Stagger siblings slightly so groups cascade instead of popping
        const parent = entry.target.parentElement;
        const siblings = parent ? Array.from(parent.children).filter(c => c.classList.contains('reveal')) : [];
        const index = Math.max(0, siblings.indexOf(entry.target));
        entry.target.style.transitionDelay = Math.min(index * 80, 400) + 'ms';

        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);          // animate once, then stop watching
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    items.forEach(el => io.observe(el));
  }


  /* ==========================================================================
     04. HERO ENTRANCE
     Called by the preloader once the curtain is gone. Uses Motion One when it
     loaded (that's the Framer-Motion-style spring API), GSAP as second choice,
     and a plain class as the final fallback.
     ========================================================================== */
  function initHeroIntro() {
    const words = $$('.hero__title .word');
    if (!words.length) return;

    if (REDUCED) {
      words.forEach(w => { w.style.opacity = 1; w.style.transform = 'none'; });
      $$('.hero .reveal').forEach(el => el.classList.add('is-visible'));
      return;
    }

    // Start state — the words sit below their mask and blurred
    words.forEach(w => {
      w.style.opacity = '0';
      w.style.transform = 'translateY(110%) rotate(4deg)';
      w.style.filter = 'blur(8px)';
    });

    if (Motion && Motion.animate) {
      // Framer-Motion-style spring, one word after another
      Motion.animate(
        words,
        { opacity: [0, 1], transform: ['translateY(110%) rotate(4deg)', 'translateY(0) rotate(0deg)'], filter: ['blur(8px)', 'blur(0px)'] },
        { duration: 1.05, delay: Motion.stagger ? Motion.stagger(0.12) : 0, easing: [0.22, 1, 0.36, 1] }
      );
    } else if (gsap) {
      gsap.to(words, {
        opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)',
        duration: 1.05, stagger: 0.12, ease: 'expo.out'
      });
    } else {
      // No library: just show them with a CSS transition
      words.forEach((w, i) => {
        w.style.transition = 'opacity .9s ease, transform .9s cubic-bezier(.22,1,.36,1), filter .9s ease';
        setTimeout(() => { w.style.opacity = '1'; w.style.transform = 'none'; w.style.filter = 'none'; }, 90 * i);
      });
    }
  }


  /* ==========================================================================
     05. TYPEWRITER — rotating job titles
     Titles come from i18n.js ('hero.roles'), so they change with the language.
     ========================================================================== */
  function initTypewriter() {
    const target = $('#type-target');
    if (!target) return;

    let roles = ['Master Data Developer'];
    let roleIndex = 0, charIndex = 0, deleting = false, timer = null;

    function pullRoles() {
      if (window.I18N) {
        const list = window.I18N.list('hero.roles');
        if (list.length) roles = list;
      }
    }

    function step() {
      const word = roles[roleIndex % roles.length];

      if (!deleting) {
        charIndex++;
        target.textContent = word.slice(0, charIndex);
        if (charIndex === word.length) {          // finished typing → pause
          deleting = true;
          timer = setTimeout(step, 1800);
          return;
        }
      } else {
        charIndex--;
        target.textContent = word.slice(0, charIndex);
        if (charIndex === 0) {                    // finished deleting → next
          deleting = false;
          roleIndex++;
        }
      }
      timer = setTimeout(step, deleting ? 38 : 78);
    }

    pullRoles();
    if (REDUCED) { target.textContent = roles[0]; return; }
    step();

    // Restart cleanly when the visitor switches language
    document.addEventListener('languagechange', () => {
      clearTimeout(timer);
      pullRoles();
      roleIndex = 0; charIndex = 0; deleting = false;
      target.textContent = '';
      step();
    });
  }


  /* ==========================================================================
     06. COUNT-UP NUMBERS
     data-count = target value, data-suffix = "+" etc, data-decimals = "2"
     ========================================================================== */
  function initCounters() {
    const nums = $$('[data-count]');
    if (!nums.length) return;

    function run(el) {
      const target   = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const suffix   = el.dataset.suffix || '';
      const duration = 1500;
      const start    = performance.now();

      if (REDUCED) { el.textContent = target.toFixed(decimals) + suffix; return; }

      function frame(now) {
        const p = clamp((now - start) / duration, 0, 1);
        // easeOutExpo — fast at first, gently settles on the final number
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    if (!('IntersectionObserver' in window)) { nums.forEach(run); return; }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    nums.forEach(n => io.observe(n));
  }


  /* ==========================================================================
     07. NAVIGATION
     • adds .is-stuck once you scroll past the top
     • hides the bar when scrolling down, shows it again when scrolling up
     • highlights the link for whichever section is on screen
     • slides the little pill indicator to the active/hovered link
     • opens / closes the mobile drawer (with a scrim behind it)
     ========================================================================== */
  function initNav() {
    const nav = $('#navbar');
    if (!nav) return;

    const links   = $$('.nav__links a');
    const pill    = $('.nav__indicator');
    const burger  = $('#burger');
    const drawer  = $('#mobile-menu');

    /* ---- Scroll behaviour ---- */
    let lastY = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      nav.classList.toggle('is-stuck', y > 24);

      // Only auto-hide well down the page, and never while the drawer is open
      const drawerOpen = drawer && drawer.classList.contains('is-open');
      if (!drawerOpen && y > 320) {
        nav.classList.toggle('is-hidden', y > lastY + 6);
      } else {
        nav.classList.remove('is-hidden');
      }
      lastY = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---- Move the pill to a given link ---- */
    function movePill(el) {
      if (!pill || !el) return;
      pill.style.width = el.offsetWidth + 'px';
      pill.style.transform = 'translateX(' + el.offsetLeft + 'px)';
      pill.style.opacity = '1';
    }
    links.forEach(a => {
      a.addEventListener('mouseenter', () => movePill(a));
    });
    const linkBar = $('.nav__links');
    if (linkBar) {
      linkBar.addEventListener('mouseleave', () => {
        const active = links.find(a => a.classList.contains('is-active'));
        active ? movePill(active) : (pill && (pill.style.opacity = '0'));
      });
    }

    /* ---- Which section am I looking at? ---- */
    const sections = links
      .map(a => {
        const id = a.getAttribute('href');
        return id && id.startsWith('#') ? $(id) : null;
      })
      .filter(Boolean);

    if (sections.length && 'IntersectionObserver' in window) {
      const spy = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const id = '#' + entry.target.id;
          links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === id));
          const active = links.find(a => a.classList.contains('is-active'));
          if (active) movePill(active);
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach(s => spy.observe(s));
    }

    /* ---- Mobile drawer ---- */
    if (burger && drawer) {
      // The dark blurred layer behind the drawer is created here, not in HTML,
      // because it only ever exists to support this interaction.
      const scrim = document.createElement('div');
      scrim.className = 'scrim';
      document.body.appendChild(scrim);

      function setDrawer(open) {
        drawer.classList.toggle('is-open', open);
        scrim.classList.toggle('is-open', open);
        burger.classList.toggle('is-open', open);
        burger.setAttribute('aria-expanded', String(open));
        drawer.setAttribute('aria-hidden', String(!open));
        document.body.style.overflow = open ? 'hidden' : '';
      }

      burger.addEventListener('click', () => setDrawer(!drawer.classList.contains('is-open')));
      scrim.addEventListener('click', () => setDrawer(false));
      $$('a', drawer).forEach(a => a.addEventListener('click', () => setDrawer(false)));
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') setDrawer(false);
      });
    }
  }


  /* ==========================================================================
     08. SCROLL PROGRESS BAR + BACK-TO-TOP
     ========================================================================== */
  function initScrollUi() {
    const bar   = $('.scroll-progress span');
    const toTop = $('.to-top');

    function update() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (bar) bar.style.width = p + '%';
      if (toTop) toTop.classList.toggle('is-visible', window.scrollY > 600);
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }


  /* ==========================================================================
     09. CUSTOM CURSOR
     Two elements: a dot that tracks the pointer exactly, and a ring that
     eases toward it (lerp) so it trails slightly — that lag is what makes it
     feel physical rather than glued on.
     ========================================================================== */
  function initCursor() {
    const cursor = $('.cursor');
    if (!cursor || !FINE_POINTER || REDUCED) return;

    const dot   = $('.cursor__dot', cursor);
    const ring  = $('.cursor__ring', cursor);
    const label = $('.cursor__label', cursor);
    document.body.classList.add('has-cursor');

    let mx = window.innerWidth / 2,  my = window.innerHeight / 2;   // mouse
    let rx = mx, ry = my;                                           // ring pos

    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    }, { passive: true });

    (function loop() {
      rx = lerp(rx, mx, 0.16);          // 0.16 = how "heavy" the ring feels
      ry = lerp(ry, my, 0.16);
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    })();

    // Grow on anything clickable; grow more (and show a word) on media
    const hoverSel = 'a, button, .tag, .sk, input, textarea, .flip';
    const viewSel  = '.proj__media, .case__shots img, .portrait';

    document.addEventListener('mouseover', e => {
      if (e.target.closest(viewSel)) {
        cursor.classList.add('is-view');
        if (label) label.textContent = 'view';
      } else if (e.target.closest(hoverSel)) {
        cursor.classList.add('is-hover');
      }
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest(viewSel)) cursor.classList.remove('is-view');
      if (e.target.closest(hoverSel)) cursor.classList.remove('is-hover');
    });

    // Hide when the pointer leaves the window entirely
    document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });
  }


  /* ==========================================================================
     10. MAGNETIC BUTTONS
     Elements with class .magnetic lean a few pixels toward the pointer while
     it is near them, then spring back on leave.
     ========================================================================== */
  function initMagnetic() {
    if (!FINE_POINTER || REDUCED) return;

    $$('.magnetic').forEach(el => {
      const strength = 0.28;             // 0 = rigid, 1 = follows exactly

      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = '';         // CSS transition handles the spring back
      });
    });
  }


  /* ==========================================================================
     11. 3D TILT
     Any .tilt element rotates a few degrees based on where the pointer sits
     inside it. perspective + preserve-3d are already set in the CSS.
     ========================================================================== */
  function initTilt() {
    if (!FINE_POINTER || REDUCED) return;

    $$('.tilt').forEach(el => {
      const MAX = 7;                     // maximum rotation in degrees

      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width  - 0.5;   // -0.5 … 0.5
        const py = (e.clientY - r.top)  / r.height - 0.5;
        el.style.transform =
          `perspective(900px) rotateX(${-py * MAX}deg) rotateY(${px * MAX}deg) translateY(-4px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }


  /* ==========================================================================
     12. LIQUID-GLASS HIGHLIGHT
     Writes the pointer position into --mx / --my on each .glass surface; the
     CSS uses those variables to place the specular highlight (see style.css §04).
     ========================================================================== */
  function initGlass() {
    if (!FINE_POINTER || REDUCED) return;

    document.addEventListener('mousemove', e => {
      const card = e.target.closest('.glass');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%');
    }, { passive: true });
  }


  /* ==========================================================================
     13. PARALLAX
     (a) Hero decorations drift with the mouse — each has data-depth, so
         nearer objects (bigger depth) move further. That difference is what
         reads as depth.
     (b) GSAP ScrollTrigger moves the same layers, plus section media, as the
         page scrolls.
     ========================================================================== */
  function initParallax() {
    /* ---- (a) mouse parallax ---- */
    const floaters = $$('.floater');
    if (floaters.length && FINE_POINTER && !REDUCED) {
      let tx = 0, ty = 0, cx = 0, cy = 0;

      window.addEventListener('mousemove', e => {
        tx = (e.clientX / window.innerWidth  - 0.5) * 2;   // -1 … 1
        ty = (e.clientY / window.innerHeight - 0.5) * 2;
      }, { passive: true });

      (function loop() {
        cx = lerp(cx, tx, 0.06);
        cy = lerp(cy, ty, 0.06);
        floaters.forEach(f => {
          const d = parseFloat(f.dataset.depth || '0.05') * 380;
          // The `translate` property is separate from `transform`, so the CSS
          // bob/spin animations keep running underneath this offset.
          f.style.translate = (cx * d) + 'px ' + (cy * d) + 'px';
        });
        requestAnimationFrame(loop);
      })();
    }

    /* ---- (b) scroll parallax (needs GSAP) ---- */
    if (!gsap || !ST || REDUCED) return;

    // Hero content drifts up and fades as you scroll past it
    const heroContent = $('.hero__content');
    if (heroContent) {
      gsap.to(heroContent, {
        y: 90, opacity: 0.25, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 }
      });
    }

    // Background blobs move at different speeds → layered depth
    gsap.to('.bg__blob--cyan',    { yPercent: -22, ease: 'none', scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1.2 } });
    gsap.to('.bg__blob--violet',  { yPercent:  16, ease: 'none', scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1.6 } });
    gsap.to('.bg__blob--magenta', { yPercent: -12, ease: 'none', scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 2.0 } });

    // The portrait floats slightly against the text beside it
    const portrait = $('.portrait');
    if (portrait) {
      gsap.fromTo(portrait, { y: 40 }, {
        y: -40, ease: 'none',
        scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: 0.8 }
      });
    }

    // Project images pan a little inside their frames (classic subtle parallax)
    $$('.proj__media img').forEach(img => {
      gsap.fromTo(img, { yPercent: -6 }, {
        yPercent: 6, ease: 'none',
        scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
    });
  }


  /* ==========================================================================
     14. EXPERIENCE TIMELINE SCRUB
     The coloured line grows from 0 → full height as the timeline passes
     through the viewport.
     ========================================================================== */
  function initTimelineScrub() {
    const line = $('.timeline__progress');
    const wrap = $('.timeline');
    if (!line || !wrap) return;

    if (!gsap || !ST || REDUCED) { line.style.transform = 'scaleY(1)'; return; }

    gsap.to(line, {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: wrap, start: 'top 72%', end: 'bottom 60%', scrub: 0.5 }
    });
  }


  /* ==========================================================================
     15. BACKGROUND CANVAS — particle constellation
     Dots drift slowly; nearby dots are joined by a faint line; the pointer
     pushes nearby dots away. Kept deliberately cheap:
       • particle count scales with screen area and is capped
       • the loop pauses when the tab is hidden
       • it does not run at all under prefers-reduced-motion
     ========================================================================== */
  function initCanvas() {
    const canvas = $('#bg-canvas');
    if (!canvas || REDUCED) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0, dpr = 1;
    let particles = [];
    let running = true;
    const mouse = { x: -9999, y: -9999 };

    const COLORS = ['0,240,255', '81,162,255', '142,81,255', '255,0,170'];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);   // cap DPR — 3x is wasted here
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width  = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // ~1 particle per 16 000 px², between 26 and 90 of them
      const count = clamp(Math.round((w * h) / 16000), 26, 90);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.6 + 0.6,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
        a: Math.random() * 0.5 + 0.25
      }));
    }

    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around the edges instead of bouncing — feels more like space
        if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20; else if (p.y > h + 20) p.y = -20;

        // Pointer repulsion
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 130 && dist > 0) {
          const push = (130 - dist) / 130 * 1.4;
          p.x += (dx / dist) * push;
          p.y += (dy / dist) * push;
        }

        // The dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + p.c + ',' + p.a + ')';
        ctx.fill();

        // Lines to close neighbours (j starts at i+1 so each pair is drawn once)
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 118) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = 'rgba(' + p.c + ',' + (0.13 * (1 - d / 118)) + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    window.addEventListener('mouseout', () => { mouse.x = -9999; mouse.y = -9999; });

    // Don't burn battery animating a tab nobody is looking at
    document.addEventListener('visibilitychange', () => {
      running = !document.hidden;
      if (running) draw();
    });

    resize();
    draw();
  }


  /* ==========================================================================
     16. FLIP CARDS ON TOUCH
     On desktop the CSS :hover flips the certificate cards. Touch screens have
     no hover, so here a tap toggles .is-flipped instead.
     ========================================================================== */
  function initFlipCards() {
    if (FINE_POINTER) return;

    $$('.flip').forEach(card => {
      card.setAttribute('tabindex', '0');
      card.addEventListener('click', () => card.classList.toggle('is-flipped'));
    });
  }


  /* ==========================================================================
     17. CONTACT FORM
     There is no server behind this site (it is designed for GitHub Pages), so
     the form validates the input and then hands everything to the visitor's
     own email client via a mailto: link. Nothing is transmitted or stored.
     ========================================================================== */
  function initContactForm() {
    const form = $('#contact-form');
    if (!form) return;

    const status = $('#form-status');
    const T = (key, fallback) => (window.I18N ? window.I18N.t(key) : fallback) || fallback;

    form.addEventListener('submit', e => {
      e.preventDefault();

      const name    = form.name.value.trim();
      const email   = form.email.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();

      // Clear any previous error styling
      $$('input, textarea', form).forEach(f => f.classList.remove('is-error'));

      function fail(field, key, fallback) {
        field.classList.add('is-error');
        field.focus();
        if (status) {
          status.textContent = T(key, fallback);
          status.classList.add('is-error');
        }
      }

      if (!name)  return fail(form.name,  'contact.errName',  'Please tell me your name.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                  return fail(form.email, 'contact.errEmail', 'That email address does not look right.');
      if (!message) return fail(form.message, 'contact.errMsg', 'Please write a short message first.');

      // Build the mail draft
      const subj = subject || ('Portfolio enquiry from ' + name);
      const body =
        'Name: '  + name  + '\n' +
        'Email: ' + email + '\n\n' +
        message   + '\n\n—\nSent from naqiudin.dev portfolio';

      window.location.href =
        'mailto:naqiudin73@gmail.com?subject=' + encodeURIComponent(subj) +
        '&body=' + encodeURIComponent(body);

      if (status) {
        status.classList.remove('is-error');
        status.textContent = T('contact.ok', 'Opening your email app…');
      }
      form.reset();
    });
  }


  /* ==========================================================================
     18. PROJECTS PAGE — filters + lightbox
     Only runs on projects.html; exits immediately elsewhere.
     ========================================================================== */
  function initProjectsPage() {
    /* ---- Category filter ---- */
    const filterBar = $('.filters');
    if (filterBar) {
      const buttons = $$('button', filterBar);
      const cases   = $$('.case');

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const want = btn.dataset.filter;

          buttons.forEach(b => b.classList.toggle('is-active', b === btn));

          cases.forEach(c => {
            const cats = (c.dataset.cat || '').split(' ');
            const show = want === 'all' || cats.includes(want);
            c.classList.toggle('is-hidden', !show);
          });

          // Layout changed → let GSAP recalculate its scroll positions
          if (ST) ST.refresh();
        });
      });
    }

    /* ---- Screenshot lightbox ---- */
    const shots = $$('.case__shots img');
    if (!shots.length) return;

    // Built in JS because it only exists to serve this interaction
    const box = document.createElement('div');
    box.className = 'lightbox';
    box.innerHTML =
      '<button class="lightbox__x" aria-label="Close image">' +
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
      '</button><img alt="">';
    document.body.appendChild(box);

    const bigImg = $('img', box);

    function open(src, alt) {
      bigImg.src = src;
      bigImg.alt = alt || '';
      box.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      box.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    shots.forEach(img => {
      img.addEventListener('click', () => open(img.dataset.full || img.src, img.alt));
    });
    box.addEventListener('click', e => { if (e.target !== bigImg) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }


  /* ==========================================================================
     19. MISC
     ========================================================================== */
  function initMisc() {
    // Footer year — never goes stale
    const year = $('#year');
    if (year) year.textContent = String(new Date().getFullYear());

    // Tell the CSS that JS is alive (used by the .no-js reveal fallback)
    document.documentElement.classList.remove('no-js');

    // Anchor links inside the page: let CSS scroll-behavior do the work but
    // close the drawer / update the hash cleanly first.
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id === '#' || id.length < 2) return;
        const target = $(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
        history.replaceState(null, '', id);
      });
    });

    // If the layout shifts after fonts/images land, refresh GSAP's math
    if (ST) window.addEventListener('load', () => ST.refresh());
  }


  /* ==========================================================================
     BOOT — run everything once the DOM exists
     ========================================================================== */
  function boot() {
    initPreloader();
    initReveal();
    initTypewriter();
    initCounters();
    initNav();
    initScrollUi();
    initCursor();
    initMagnetic();
    initTilt();
    initGlass();
    initParallax();
    initTimelineScrub();
    initCanvas();
    initFlipCards();
    initContactForm();
    initProjectsPage();
    initMisc();

    // Pages without a preloader (projects.html) still need the hero intro
    if (!$('#loader')) initHeroIntro();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
