/*
  main.js — Interaksi ringkas mock laman Sudo Bakery.

  APA:     menu mobile, header bila skrol, status buka/tutup DUA cawangan (waktu Malaysia),
           tab kategori roti, tab cawangan (tukar peta), karusel idea makan, galeri "Lihat lagi gambar",
           pautan kerjaya → WhatsApp, lightbox, animasi muncul, jeda cop berputar bila hero di luar skrin.
  KENAPA:  laman statik tanpa server; semua tindakan pesanan/mohon kerja membuka WhatsApp/pautan rasmi kedai.
  DI MANA: dimuatkan oleh index.html (defer). Tiada library luar; semua dalam satu IIFE (tiada global).
*/
(function () {
  "use strict";

  document.documentElement.classList.add("js"); // CSS guna kelas ini untuk .reveal & galeri telefon

  /* ---------- Data kedai (ubah di sini jika waktu/nombor berubah) ---------- */
  var WHATSAPP = "60166231662"; // 016-623 1662 dalam format antarabangsa

  // Jadual setiap cawangan ikut hari (0 = Ahad … 6 = Sabtu). Nilai = [jam buka, jam tutup] dalam jam
  // perpuluhan 24 jam (18.5 = 6:30 petang). null = tutup. Cuti umum TIDAK dikira (tiada senarai cuti).
  var BRANCHES = {
    pj: {  // Peringgit Jaya: setiap hari 10:00 pagi – 6:30 petang (tutup cuti umum)
      name: "Peringgit Jaya",
      days: { 0: [10, 18.5], 1: [10, 18.5], 2: [10, 18.5], 3: [10, 18.5], 4: [10, 18.5], 5: [10, 18.5], 6: [10, 18.5] }
    },
    ksb: { // Kota Syahbandar: Rabu – Ahad 9:00 pagi – 6:00 petang; Isnin & Selasa tutup (poster kedai)
      name: "Kota Syahbandar",
      days: { 0: [9, 18], 1: null, 2: null, 3: [9, 18], 4: [9, 18], 5: [9, 18], 6: [9, 18] }
    }
  };
  var DAY_NAMES = ["Ahad", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu"];

  /* ---------- 1. Menu mobile ---------- */
  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  }
  navToggle.addEventListener("click", function () { setMenu(!nav.classList.contains("is-open")); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  document.addEventListener("click", function (e) {
    if (nav.classList.contains("is-open") && !e.target.closest("#nav, #navToggle")) setMenu(false);
  });

  /* ---------- 2. Header bila skrol + pautan aktif + jeda cop ---------- */
  var header = document.getElementById("header");
  var navLinks = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
  function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if ("IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = "#" + entry.target.id;
        navLinks.forEach(function (link) { link.classList.toggle("is-active", link.getAttribute("href") === id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    navLinks.forEach(function (link) {
      var section = document.querySelector(link.getAttribute("href"));
      if (section) sectionObserver.observe(section);
    });
    // Cop "südo" berputar tanpa henti → jeda bila hero tidak kelihatan (jimat bateri telefon)
    var hero = document.getElementById("hero");
    new IntersectionObserver(function (entries) {
      hero.classList.toggle("is-offscreen", !entries[0].isIntersecting);
    }).observe(hero);
  }

  /* ---------- 3. Status buka/tutup setiap cawangan ---------- */
  function malaysiaNow() {
    var now = new Date();
    return new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 8 * 3600000);
  }
  // Jam perpuluhan → teks BM (cth. 18.5 → "6:30 ptg", 9 → "9:00 pagi")
  function jamTeks(h) {
    var j = Math.floor(h), m = Math.round((h - j) * 60);
    var mm = (m < 10 ? "0" : "") + m;
    if (j < 12) return j + ":" + mm + " pagi";
    if (j === 12) return "12:" + mm + " tgh hari";
    return (j - 12) + ":" + mm + " ptg";
  }
  // Pulangkan { open, text } bagi satu cawangan pada masa Malaysia `my`
  function kiraStatus(branch, my) {
    var day = my.getDay();
    var hour = my.getHours() + my.getMinutes() / 60;
    var today = branch.days[day];
    if (today && hour >= today[0] && hour < today[1]) return { open: true, text: "Dibuka sekarang · tutup " + jamTeks(today[1]) };
    if (today && hour < today[0]) return { open: false, text: "Tutup sekarang · buka " + jamTeks(today[0]) + " ini" };
    // Sudah tutup hari ini, atau hari tutup: cari hari dibuka seterusnya
    for (var i = 1; i <= 7; i++) {
      var d = (day + i) % 7;
      if (branch.days[d]) {
        var bila = i === 1 ? "esok" : DAY_NAMES[d];
        var awal = today ? "Tutup sekarang" : "Tutup hari ini (" + DAY_NAMES[day] + ")";
        return { open: false, text: awal + " · buka " + bila + " " + jamTeks(branch.days[d][0]) };
      }
    }
    return { open: false, text: "Tutup" };
  }
  function updateStatus() {
    var my = malaysiaNow();
    // Hero: cawangan utama Peringgit Jaya
    var pj = kiraStatus(BRANCHES.pj, my);
    document.getElementById("heroDot").className = "status-dot " + (pj.open ? "is-open" : "is-closed");
    document.getElementById("heroStatus").textContent = "Peringgit Jaya · " + pj.text;
    // Setiap panel cawangan (elemen .status[data-branch])
    document.querySelectorAll(".status[data-branch]").forEach(function (box) {
      var s = kiraStatus(BRANCHES[box.getAttribute("data-branch")], my);
      box.textContent = "";
      var dot = document.createElement("span");
      dot.className = "status-dot " + (s.open ? "is-open" : "is-closed");
      var label = document.createElement("span");
      label.textContent = s.text;
      box.appendChild(dot);
      box.appendChild(label);
    });
  }
  updateStatus();
  setInterval(updateStatus, 60000); // semak semula setiap minit

  /* ---------- 4. Tab (dipakai oleh tab roti DAN tab cawangan) ---------- */
  // tabs: senarai butang role="tab"; onChange: fungsi pilihan dipanggil dengan panel yang aktif
  function setupTabs(tabs, onChange) {
    function activate(tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        panel.hidden = !on;
        panel.classList.toggle("is-active", on);
        if (on && onChange) onChange(panel);
      });
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { activate(tab); });
      // Kekunci kiri/kanan untuk berpindah tab (aksesibiliti papan kekunci)
      tab.addEventListener("keydown", function (e) {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        var next = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
        activate(next);
        next.focus();
      });
    });
  }
  setupTabs(Array.prototype.slice.call(document.querySelectorAll(".tab")));
  // Tab cawangan: tukar src iframe peta kepada peta cawangan dipilih (data-map pada panel)
  var branchMap = document.getElementById("branchMap");
  setupTabs(Array.prototype.slice.call(document.querySelectorAll(".branch-tab")), function (panel) {
    var src = panel.getAttribute("data-map");
    if (branchMap && src && branchMap.getAttribute("src") !== src) branchMap.setAttribute("src", src);
  });

  /* ---------- 5. Karusel idea makan ---------- */
  var recipes = document.getElementById("recipes");
  var recPrev = document.getElementById("recPrev");
  var recNext = document.getElementById("recNext");
  if (recipes && recPrev && recNext) {
    function step() {
      var card = recipes.querySelector(".recipe");
      return card ? card.getBoundingClientRect().width + 16 : recipes.clientWidth; // 16px = jarak antara kad
    }
    function updateNav() {
      var max = recipes.scrollWidth - recipes.clientWidth - 2; // 2px toleransi pembundaran
      recPrev.disabled = recipes.scrollLeft <= 2;
      recNext.disabled = recipes.scrollLeft >= max;
    }
    recPrev.addEventListener("click", function () { recipes.scrollBy({ left: -step() }); });
    recNext.addEventListener("click", function () { recipes.scrollBy({ left: step() }); });
    recipes.addEventListener("scroll", updateNav, { passive: true });
    window.addEventListener("resize", updateNav);
    updateNav();
  }

  /* ---------- 6. Galeri telefon: "Lihat lagi gambar" ---------- */
  var gallery = document.getElementById("gallery");
  var galleryMore = document.getElementById("galleryMore");
  if (gallery && galleryMore) {
    var VISIBLE = 5; // mesti sama dengan :nth-child(n+6) dalam CSS
    var moreLabel = "Lihat lagi gambar (" + (gallery.querySelectorAll(".gallery__item").length - VISIBLE) + ")";
    galleryMore.textContent = moreLabel;
    galleryMore.addEventListener("click", function () {
      var open = gallery.classList.toggle("is-expanded");
      galleryMore.textContent = open ? "Tunjuk kurang" : moreLabel;
      galleryMore.setAttribute("aria-expanded", String(open));
      if (!open) gallery.scrollIntoView({ block: "start" }); // kembali ke atas galeri selepas ditutup
    });
  }

  /* ---------- 7. Kerjaya → WhatsApp dengan nama jawatan ---------- */
  document.querySelectorAll(".role__link[data-role]").forEach(function (link) {
    var msg = "Hai Sudo Bakery, saya berminat dengan jawatan " + link.getAttribute("data-role") +
      ".\nNama:\nUmur:\nCawangan pilihan (Peringgit Jaya / Kota Syahbandar):\nPengalaman:";
    link.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg);
  });

  /* ---------- 8. Lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");
  var supportsDialog = lightbox && typeof lightbox.showModal === "function";
  document.querySelectorAll("[data-lightbox]").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var src = trigger.getAttribute("data-lightbox");
      var img = trigger.querySelector("img");
      if (!supportsDialog) { window.open(src, "_blank"); return; } // browser lama: tab baharu
      lightboxImg.src = src;
      lightboxImg.alt = img ? img.alt : "Poster Sudo Bakery";
      lightbox.showModal();
    });
  });
  if (supportsDialog) {
    lightboxClose.addEventListener("click", function () { lightbox.close(); });
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) lightbox.close(); }); // klik latar
    lightbox.addEventListener("close", function () { lightboxImg.src = ""; }); // elak gambar lama berkelip
  }

  /* ---------- 9. Animasi muncul ringkas ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target); // sekali sahaja
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (node) { revealObserver.observe(node); });
  } else {
    revealEls.forEach(function (node) { node.classList.add("is-visible"); });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
