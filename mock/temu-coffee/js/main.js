/*
  main.js — Interaksi ringkas mock laman Temu Coffee House.

  APA:     menu mobile, header bila skrol, status buka/tutup (termasuk sesi lepas tengah malam),
           tab menu, kad ulasan + butang karusel, borang bilik majlis → WhatsApp, pautan kerjaya → WhatsApp,
           lightbox gambar, animasi muncul, jeda lampu hero bila di luar skrin.
  KENAPA:  laman statik tanpa server; semua tindakan "hantar" hanya membuka WhatsApp dengan mesej siap ditulis.
  DI MANA: dimuatkan oleh index.html (defer). Tiada library luar.

  Semua kod dalam satu IIFE supaya tiada pemboleh ubah global.
*/
(function () {
  "use strict";

  // Tanda bahawa JS aktif; CSS guna kelas ini untuk animasi .reveal
  document.documentElement.classList.add("js");

  /* ---------- Data kedai (ubah di sini jika waktu/nombor berubah) ---------- */
  var WHATSAPP = "60143507883"; // 014-350 7883 dalam format antarabangsa (tanpa + dan 0 depan)

  // Jadual ikut hari (0 = Ahad … 6 = Sabtu). Nilai = [jam buka, jam tutup] dalam format 24 jam.
  // Jam tutup > 24 bermaksud lepas tengah malam (25 = 1:00 pagi esok, 26 = 2:00 pagi esok).
  // null = tutup sepanjang hari (Selasa).
  var SCHEDULE = {
    0: [17, 26], // Ahad    5 ptg – 2 pagi
    1: [17, 25], // Isnin   5 ptg – 1 pagi
    2: null,     // Selasa  tutup
    3: [17, 25], // Rabu    5 ptg – 1 pagi
    4: [17, 25], // Khamis  5 ptg – 1 pagi
    5: [17, 26], // Jumaat  5 ptg – 2 pagi
    6: [17, 26]  // Sabtu   5 ptg – 2 pagi
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
  // Tutup menu bila pautan diklik, tekan Escape, atau klik di luar menu
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  document.addEventListener("click", function (e) {
    if (nav.classList.contains("is-open") && !e.target.closest("#nav, #navToggle")) setMenu(false);
  });

  /* ---------- 2. Header bila skrol + pautan aktif ---------- */
  var header = document.getElementById("header");
  var navLinks = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));

  function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if ("IntersectionObserver" in window) {
    // Serlah pautan nav bagi seksyen yang berada di tengah skrin
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

    // Jeda lampu berkelip bila hero di luar skrin (jimat bateri telefon)
    var hero = document.getElementById("hero");
    new IntersectionObserver(function (entries) {
      hero.classList.toggle("is-offscreen", !entries[0].isIntersecting);
    }).observe(hero);
  }

  /* ---------- 3. Status buka/tutup (waktu Malaysia, UTC+8) ---------- */
  // Kira masa Malaysia tanpa bergantung pada zon waktu peranti pengguna
  function malaysiaNow() {
    var now = new Date();
    var utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utcMs + 8 * 3600000);
  }

  // Format jam 24 → teks BM ringkas (cth. 25 → "1:00 pagi", 17 → "5:00 petang")
  function jamTeks(h) {
    var j = h % 24;
    if (j === 0) return "12:00 malam";
    if (j < 12) return j + ":00 pagi";
    if (j === 12) return "12:00 tengah hari";
    return (j - 12) + ":00 " + (j < 19 ? "petang" : "malam");
  }

  /*
    Kira status semasa. Pulangkan { open: boolean, text: string }.
    Langkah: (a) adakah kita masih dalam sesi SEMALAM yang melepasi tengah malam?
             (b) adakah sesi HARI INI sudah bermula?
             (c) jika tutup, cari sesi seterusnya (hari ini nanti, atau hari berikutnya yang dibuka).
  */
  function kiraStatus(my) {
    var day = my.getDay();
    var hour = my.getHours() + my.getMinutes() / 60;
    var semalam = SCHEDULE[(day + 6) % 7];
    var hariIni = SCHEDULE[day];

    // (a) cth. Sabtu 1:30 pagi masih dalam sesi Jumaat (tutup 26 = 2 pagi)
    if (semalam && hour + 24 < semalam[1]) return { open: true, text: "Dibuka sekarang · tutup " + jamTeks(semalam[1]) };
    // (b) sesi hari ini
    if (hariIni && hour >= hariIni[0]) return { open: true, text: "Dibuka sekarang · tutup " + jamTeks(hariIni[1]) };
    // (c) belum buka hari ini
    if (hariIni) return { open: false, text: "Tutup sekarang · buka " + jamTeks(hariIni[0]) + " ini" };
    // Hari tutup (Selasa): cari hari dibuka seterusnya
    for (var i = 1; i <= 7; i++) {
      var d = (day + i) % 7;
      if (SCHEDULE[d]) {
        var bila = i === 1 ? "esok" : DAY_NAMES[d];
        return { open: false, text: "Tutup hari ini (" + DAY_NAMES[day] + ") · buka " + bila + " " + jamTeks(SCHEDULE[d][0]) };
      }
    }
    return { open: false, text: "Tutup sekarang" };
  }

  function updateStatus() {
    var my = malaysiaNow();
    var s = kiraStatus(my);

    // Pil status dalam hero
    var heroDot = document.getElementById("heroDot");
    var heroText = document.getElementById("heroStatusText");
    if (heroDot && heroText) {
      heroDot.className = "status-dot " + (s.open ? "is-open" : "is-closed");
      heroText.textContent = s.text;
    }

    // Status dalam seksyen lokasi (dibina dengan textContent)
    var box = document.getElementById("openStatus");
    if (box) {
      box.textContent = "";
      var dot = document.createElement("span");
      dot.className = "status-dot " + (s.open ? "is-open" : "is-closed");
      var label = document.createElement("span");
      label.textContent = s.text;
      box.appendChild(dot);
      box.appendChild(label);
    }

    // Serlah baris hari ini dalam jadual. Selepas tengah malam dalam sesi semalam, serlah hari semalam.
    var hour = my.getHours();
    var semalam = SCHEDULE[(my.getDay() + 6) % 7];
    var hariJadual = semalam && hour + 24 < semalam[1] ? (my.getDay() + 6) % 7 : my.getDay();
    document.querySelectorAll("#hours tr").forEach(function (row) {
      row.classList.toggle("is-today", Number(row.getAttribute("data-day")) === hariJadual);
    });
  }
  updateStatus();
  setInterval(updateStatus, 60000); // semak semula setiap minit

  /* ---------- 4. Tab menu ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  function activateTab(tab) {
    tabs.forEach(function (t) {
      var selected = t === tab;
      t.classList.toggle("is-active", selected);
      t.setAttribute("aria-selected", String(selected));
      t.tabIndex = selected ? 0 : -1;
      var panel = document.getElementById(t.getAttribute("aria-controls"));
      panel.hidden = !selected;
      panel.classList.toggle("is-active", selected);
    });
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { activateTab(tab); });
    // Kekunci kiri/kanan untuk berpindah antara tab (aksesibiliti papan kekunci)
    tab.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      var next = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
      activateTab(next);
      next.focus();
    });
  });

  /* ---------- 5. Ulasan Google ---------- */
  // Sumber: 7 ulasan sebenar diberi pemilik (disalin dari Google, 2 Nov 2026). Purata 5.0 diberi pemilik.
  // meta = profil pengulas; ago = tarikh relatif; spend = julat belanja yang dilaporkan pengulas (jika ada);
  // isNew = label "Baharu" dari Google. Teks dikekalkan seperti asal (petikan pengulas, termasuk emoji).
  var REVIEWS = [
    {
      name: "Farhan Zulkeflee", meta: "9 ulasan · 2 foto", ago: "6 hari lalu", spend: "Makan di sini", isNew: true,
      text: "What a lovely place! Great food, lovely ambiance and absolutely loved the coffee! Huge thank you to all the staff making my birthday extra special ❤️"
    },
    {
      name: "MiEzAh MaNsoR", meta: "4 ulasan · 9 foto", ago: "sebulan lalu", spend: "RM 20–40",
      text: "Nice place to chill! Kedai cantik, suasana cozy dan makanan pun sedap. Presentation makanan menarik, drinks pun best. Waktu petang/malam lagi cantik sebab ada lampu-lampu outdoor Staff pun friendly. Dapat macam2 goodies. 😜"
    },
    {
      name: "Nur Nyna", meta: "6 ulasan · 7 foto", ago: "3 minggu lalu", spend: "RM 40–60", isNew: true,
      text: "Saya makan nasi lemak & aglio olio, nasi lemak sedap sangat condiment sume fresh tapi sambal da sedap, cume kurang kan masam n ade hint manis2 sikit mesti lg sedap, aglio olio superb n sedapppppp sangat. seafood fresh, rase 5 star. Keep it up guys. akan repeat soon.. 🌸 yang penting, tlg la jual kukis yg korang bg utk waiting food tu.. sumpahhh sedapp sgt kukis tu 😂"
    },
    {
      name: "Tina Harina", meta: "2 ulasan · 1 foto", ago: "3 minggu lalu", spend: "RM 20–40", isNew: true,
      text: "It was my 1st time here at Temu coffe house.This cozy cafe offers delicious coffee with variety drinks to choose and light to heavy snacks,a 10/10 friendly and fast service, and a peaceful and aesthetic atmosphere to hang out with.We will definitely come back again soon.🥰"
    },
    {
      name: "Hazlizah Abdullah", meta: "Local Guide · 11 ulasan · 11 foto", ago: "3 minggu lalu", spend: "RM 20–40", isNew: true,
      text: "Staff friendly & beradab. Environment nice sbb sy duduk bahagian luar. Weekend agak ramai org tp masih terkawal. And paling best dia siap bg free cookies hihi comel 🥰"
    },
    {
      name: "Ahmad Shukri", meta: "1 ulasan · 1 foto", ago: "seminggu lalu", isNew: true,
      text: "Menu dekat TEMU COFFEE memang lain dari lain. Harga Berbaloi dengan Rasa . Sedap Berpatutan dan Puas Hati. Finally Ini Rahsia kenapa Ramai Dan Lubuk Makan , Celebrate dan View memang Kayangan."
    },
    {
      name: "shely rudy", meta: "1 ulasan · 3 foto", ago: "3 minggu lalu", spend: "RM 1–20", isNew: true,
      text: "My second time here. Staff semuanya friendly. Food superb. Harga reasonable. Love it!"
    }
  ];

  // Warna avatar bergilir (gaya avatar huruf Google), selari dengan palet kopi + emas
  var AVATAR_COLORS = ["#8C5A3C", "#2C4757", "#A07A3C", "#5B3B2E", "#3F6B5C", "#7A4E6B", "#B0603C"];

  // Bina elemen dengan textContent (selamat daripada suntikan HTML)
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  var reviewsWrap = document.getElementById("reviews");
  if (reviewsWrap) {
    REVIEWS.forEach(function (r, i) {
      var card = el("article", "review");

      var top = el("div", "review__top");
      var avatar = el("div", "review__avatar", r.name.trim().charAt(0).toUpperCase());
      avatar.style.background = AVATAR_COLORS[i % AVATAR_COLORS.length];
      avatar.setAttribute("aria-hidden", "true");
      var who = el("div");
      who.appendChild(el("div", "review__name", r.name));
      who.appendChild(el("div", "review__meta", r.meta));
      top.appendChild(avatar);
      top.appendChild(who);

      // Bintang, tarikh, julat belanja dan label Baharu
      var rating = el("div", "review__rating");
      var stars = el("span", "stars", "★★★★★");
      stars.setAttribute("aria-label", "5 daripada 5 bintang");
      rating.appendChild(stars);
      rating.appendChild(el("span", null, r.ago));
      if (r.isNew) rating.appendChild(el("span", "review__new", "Baharu"));
      if (r.spend) rating.appendChild(el("span", "review__chip", r.spend));

      var text = el("p", "review__text", r.text);
      card.appendChild(top);
      card.appendChild(rating);
      card.appendChild(text);

      // Ulasan panjang dipendekkan dengan butang "Baca lagi"
      if (r.text.length > 250) {
        text.classList.add("is-clamped");
        var more = el("button", "review__more", "Baca lagi");
        more.type = "button";
        more.setAttribute("aria-expanded", "false");
        more.addEventListener("click", function () {
          var clamped = text.classList.toggle("is-clamped");
          more.textContent = clamped ? "Baca lagi" : "Tutup";
          more.setAttribute("aria-expanded", String(!clamped));
        });
        card.appendChild(more);
      }
      reviewsWrap.appendChild(card);
    });

    // Butang karusel: leret sejauh satu kad. Butang dimatikan di hujung senarai.
    var prev = document.getElementById("revPrev");
    var next = document.getElementById("revNext");
    function step() {
      var card = reviewsWrap.querySelector(".review");
      return card ? card.getBoundingClientRect().width + 16 : reviewsWrap.clientWidth; // 16px = jarak (gap) antara kad
    }
    function updateNav() {
      var max = reviewsWrap.scrollWidth - reviewsWrap.clientWidth - 2; // 2px toleransi pembundaran
      prev.disabled = reviewsWrap.scrollLeft <= 2;
      next.disabled = reviewsWrap.scrollLeft >= max;
    }
    prev.addEventListener("click", function () { reviewsWrap.scrollBy({ left: -step() }); });
    next.addEventListener("click", function () { reviewsWrap.scrollBy({ left: step() }); });
    reviewsWrap.addEventListener("scroll", updateNav, { passive: true });
    window.addEventListener("resize", updateNav);
    updateNav();
  }

  /* ---------- 6. Borang bilik majlis → WhatsApp ---------- */
  // Tiada data dihantar ke server: borang hanya menyusun teks dan membuka wa.me dalam tab baharu.
  var bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    var errorBox = document.getElementById("bookingError");

    // Tarikh minimum = hari ini (waktu Malaysia), supaya tarikh lepas tidak dipilih
    var today = malaysiaNow();
    var iso = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + String(today.getDate()).padStart(2, "0");
    bookingForm.elements.date.min = iso;

    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = bookingForm.elements;
      var name = f.name.value.trim();
      if (!name) {
        errorBox.textContent = "Sila isi nama anda.";
        f.name.focus();
        return;
      }
      errorBox.textContent = "";

      var lines = ["Hai Temu Coffee, saya ingin bertanya tentang bilik peribadi.", "Nama: " + name, "Majlis: " + f.type.value];
      if (f.date.value) {
        // Tukar YYYY-MM-DD → DD/MM/YYYY (format biasa di Malaysia)
        var p = f.date.value.split("-");
        lines.push("Tarikh: " + p[2] + "/" + p[1] + "/" + p[0]);
      }
      if (f.pax.value) lines.push("Bilangan tetamu: " + f.pax.value);
      window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
    });
  }

  /* ---------- 7. Pautan kerjaya → WhatsApp dengan nama jawatan ---------- */
  document.querySelectorAll(".role__link[data-role]").forEach(function (link) {
    var msg = "Hai Temu Coffee, saya berminat dengan jawatan " + link.getAttribute("data-role") +
      ".\nNama:\nUmur:\nPengalaman:";
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
      // Browser lama tanpa <dialog>: buka gambar dalam tab baharu
      if (!supportsDialog) { window.open(src, "_blank"); return; }
      lightboxImg.src = src;
      lightboxImg.alt = img ? img.alt : "Foto menu Temu Coffee";
      lightbox.showModal();
    });
  });
  if (supportsDialog) {
    lightboxClose.addEventListener("click", function () { lightbox.close(); });
    // Klik pada latar gelap (di luar gambar) menutup lightbox
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) lightbox.close(); });
    // Kosongkan src selepas tutup supaya gambar lama tidak berkelip bila dibuka semula
    lightbox.addEventListener("close", function () { lightboxImg.src = ""; });
  }

  /* ---------- 9. Animasi muncul ringkas ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target); // sekali sahaja, kemudian berhenti memerhati
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (node) { revealObserver.observe(node); });
  } else {
    revealEls.forEach(function (node) { node.classList.add("is-visible"); });
  }

  /* ---------- Tahun semasa di footer ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
