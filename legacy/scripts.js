/* Versi portfolio terdahulu: kod asal untuk paparan arkib dan interaksi berkaitan. */
/* ============================================
   MUHAMMAD NAQIUDIN — PORTFOLIO SCRIPTS
   Clean, Modern JS — No unnecessary libraries
   Uses Intersection Observer for scroll animations
   ============================================ */

(function () {
  'use strict';

  /* ---------- DOM Elements ---------- */
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.querySelector('.nav-mobile');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');

  /* ---------- Navbar Scroll Effect ---------- */
  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* ---------- Mobile Menu Toggle ---------- */
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMobile.classList.toggle('open');
      document.body.style.overflow = navMobile.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Active Nav Link on Scroll ---------- */
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  /* ---------- Intersection Observer — Scroll Animations ---------- */
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      animatedElements.forEach(el => observer.observe(el));
    } else {
      // Fallback: show all elements immediately
      animatedElements.forEach(el => el.classList.add('visible'));
    }
  }
  // Run after DOM is fully parsed
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }

  /* ---------- Skills Tabs ---------- */
  function initSkillsTabs() {
    const tabs = document.querySelectorAll('.skills-tabs .tab-btn');
    const grids = document.querySelectorAll('.skills-grid');

    if (tabs.length === 0) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        grids.forEach(grid => {
          grid.classList.remove('active');
          if (grid.getAttribute('data-tab') === target) {
            grid.classList.add('active');
            // Re-trigger animations for the newly visible grid
            grid.querySelectorAll('.fade-in').forEach(item => {
              item.classList.remove('visible');
              void item.offsetWidth; // force reflow
              item.classList.add('visible');
            });
          }
        });
      });
    });
  }
  initSkillsTabs();

  /* ---------- Certification Slider ---------- */
  function initCertSlider() {
    const track = document.querySelector('.cert-track');
    const prevBtn = document.querySelector('.cert-prev');
    const nextBtn = document.querySelector('.cert-next');

    if (!track || !prevBtn || !nextBtn) return;

    const scrollAmount = 340;

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }
  initCertSlider();

  /* ---------- Swiper Init (for project.html) ---------- */
  function initSwipers() {
    if (typeof Swiper === 'undefined') return;

    document.querySelectorAll('.project-swiper').forEach(el => {
      new Swiper(el, {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        grabCursor: true,
        pagination: {
          el: el.querySelector('.swiper-pagination'),
          clickable: true,
        },
        navigation: {
          nextEl: el.querySelector('.swiper-button-next'),
          prevEl: el.querySelector('.swiper-button-prev'),
        },
      });
    });
  }
  // Init swipers after page load to ensure Swiper library is ready
  window.addEventListener('load', initSwipers);

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ---------- Project Detail Nav Active State (project.html) ---------- */
  function initProjectDetailNav() {
    const projectNavLinks = document.querySelectorAll('.project-detail-nav a');
    if (projectNavLinks.length === 0) return;

    const projectSections = document.querySelectorAll('.project-section[id]');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY + 150;

      projectSections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
          projectNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { passive: true });
  }
  initProjectDetailNav();

})();
