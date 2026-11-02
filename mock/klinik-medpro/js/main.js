/*
  main.js — Interaksi ringkas mock laman Klinik MedPro, Batu Berendam.

  Fungsi:
   1. Menu mobile (hamburger)
   2. Header berbayang bila skrol + pautan nav aktif ikut seksyen
   3. Status "Dibuka / Tutup" ikut waktu Malaysia (UTC+8) + serlah hari ini dalam jadual
   4. Kad ulasan Google (dijana daripada senarai REVIEWS)
   5. Borang kerjaya: susun mesej WhatsApp (tiada server, tiada data disimpan)
   6. Lightbox gambar (guna <dialog> asli browser)
   7. Animasi muncul ringkas (IntersectionObserver)

  Tiada library luar. Semua kod dalam satu IIFE supaya tiada pemboleh ubah global.
*/
(function () {
  "use strict";

  // Tanda bahawa JS aktif; CSS guna kelas ini untuk animasi .reveal
  document.documentElement.classList.add("js");

  /* ---------- Data klinik (ubah di sini jika waktu/nombor berubah) ---------- */
  var OPEN_HOUR = 9;     // 9:00 pagi (format 24 jam)
  var CLOSE_HOUR = 21;   // 9:00 malam (format 24 jam)
  var WHATSAPP = "601130044520"; // 011-3004 4520 dalam format antarabangsa (tanpa + dan 0)

  /* ---------- 1. Menu mobile ---------- */
  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  }

  navToggle.addEventListener("click", function () {
    setMenu(!nav.classList.contains("is-open"));
  });

  // Tutup menu bila pautan diklik, bila tekan Escape, atau bila klik di luar menu
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });
  document.addEventListener("click", function (e) {
    if (nav.classList.contains("is-open") && !e.target.closest("#nav, #navToggle")) setMenu(false);
  });

  /* ---------- 2. Header bila skrol + pautan aktif ---------- */
  var header = document.getElementById("header");
  var navLinks = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Serlah pautan nav bagi seksyen yang sedang berada di tengah skrin
  if ("IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = "#" + entry.target.id;
        navLinks.forEach(function (link) {
          link.classList.toggle("is-active", link.getAttribute("href") === id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    navLinks.forEach(function (link) {
      var section = document.querySelector(link.getAttribute("href"));
      if (section) sectionObserver.observe(section);
    });
  }

  /* ---------- 3. Status buka/tutup (waktu Malaysia) ---------- */
  // Kira masa Malaysia (UTC+8) tanpa bergantung pada zon waktu peranti pengguna
  function malaysiaNow() {
    var now = new Date();
    var utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utcMs + 8 * 3600000);
  }

  function updateOpenStatus() {
    var my = malaysiaNow();
    var hour = my.getHours();
    var isOpen = hour >= OPEN_HOUR && hour < CLOSE_HOUR;
    // Selepas tutup (malam) buka semula "esok"; sebelum 9 pagi buka "hari ini"
    var reopen = hour < OPEN_HOUR ? "buka 9:00 pagi ini" : "buka esok 9:00 pagi";

    // Status dalam seksyen lokasi
    var box = document.getElementById("openStatus");
    if (box) {
      box.textContent = "";
      var dot = document.createElement("span");
      dot.className = "status-dot " + (isOpen ? "is-open" : "is-closed");
      var label = document.createElement("span");
      label.textContent = isOpen ? "Dibuka sekarang · tutup 9:00 malam" : "Tutup sekarang · " + reopen;
      box.appendChild(dot);
      box.appendChild(label);
    }

    // Pil status dalam hero
    var heroDot = document.getElementById("heroStatusDot");
    var heroText = document.getElementById("heroStatus");
    if (heroDot && heroText) {
      heroDot.className = "status-dot " + (isOpen ? "is-open" : "is-closed");
      heroText.textContent = isOpen ? "Dibuka sekarang · setiap hari 9 pagi – 9 malam" : "Tutup sekarang · " + reopen;
    }

    // Serlah baris hari ini dalam jadual (0 = Ahad)
    document.querySelectorAll("#hours tr").forEach(function (row) {
      row.classList.toggle("is-today", Number(row.getAttribute("data-day")) === my.getDay());
    });
  }
  updateOpenStatus();
  setInterval(updateOpenStatus, 60000); // semak semula setiap minit

  /* ---------- 4. Ulasan Google ---------- */
  // Sumber: ulasan sebenar yang diberi pemilik (disalin dari Google Maps, 2 Nov 2026), semua 5 bintang.
  // meta = profil pengulas; ago = tarikh relatif semasa disalin; isNew = label "Baharu" dari Google.
  // Teks dikekalkan seperti asal (termasuk ejaan) kerana ia petikan pengulas.
  var REVIEWS = [
    {
      name: "Kagen Ngow", meta: "Local Guide · 19 ulasan · 7 foto", ago: "2 bulan lalu",
      text: "Went to another clinic earlier, the clinic was open at 9 but the nurse told the doctor coming at 10.15am. I was in pain and unacceptable. After that went to clinic Medpro, quickly nurse attend to me and doctor was fast response. Very professional and doctor was fast response and excellent when attending me. Price was reasonable as well. Will definitely recommend this clinic to anyone."
    },
    {
      name: "Victor Martin", meta: "Local Guide · 14 ulasan · 3 foto", ago: "2 minggu lalu", isNew: true,
      text: "I got here for some minor injuries, the staff here and doctor was very fast responsive and gave me best treatment. Recommended clinic and any other medical assistance for your convenience."
    },
    {
      name: "Sarah Amylea", meta: "4 ulasan", ago: "4 bulan lalu",
      text: "price is worth, doctor and staff very polite and assisting. they use original stuff. Recommended🔥👍🏻"
    },
    {
      name: "Eric Ong", meta: "4 ulasan", ago: "2 bulan lalu",
      text: "Very detailed explanation given by doctor. Clean and nice environment. Front desk lady was polite. Keep up the work."
    },
    {
      name: "Izzat Naim", meta: "2 ulasan · 1 foto", ago: "9 bulan lalu",
      text: "Stumble upon this clinic when going for lunch. New clinic, Chinese lady doctor very gentle and passionate, get along well with kids. Highly recommended!"
    },
    {
      name: "Sin Siuew Lim", meta: "8 ulasan", ago: "3 bulan lalu",
      text: "Good experience... Kind and friendly Dr and nurse... affordable price too..highly recommended!"
    },
    {
      name: "nurul ahmad", meta: "6 ulasan · 4 foto", ago: "3 minggu lalu", isNew: true,
      text: "good doctoer. friendly staff. comfortable. affordable price."
    }
  ];

  // Warna avatar bergilir (gaya avatar huruf Google), selari dengan palet biru tua + koral
  var AVATAR_COLORS = ["#16264A", "#E5484D", "#1F5BD8", "#0F8A6A", "#7C3AED", "#D97706", "#0E7490"];

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

      // Baris atas: avatar huruf, nama, profil, logo G
      var top = el("div", "review__top");
      var avatar = el("div", "review__avatar", r.name.trim().charAt(0).toUpperCase());
      avatar.style.background = AVATAR_COLORS[i % AVATAR_COLORS.length];
      avatar.setAttribute("aria-hidden", "true");
      var who = el("div");
      who.appendChild(el("div", "review__name", r.name));
      who.appendChild(el("div", "review__meta", r.meta));
      var g = el("span", "review__g", "G");
      g.setAttribute("aria-label", "Ulasan Google");
      top.appendChild(avatar);
      top.appendChild(who);
      top.appendChild(g);

      // Bintang + tarikh relatif (+ label Baharu jika ada)
      var rating = el("div", "review__rating");
      var stars = el("span", "stars", "★★★★★");
      stars.setAttribute("aria-label", "5 daripada 5 bintang");
      rating.appendChild(stars);
      rating.appendChild(el("small", null, r.ago));
      if (r.isNew) rating.appendChild(el("span", "review__new", "Baharu"));

      var text = el("p", "review__text", r.text);

      card.appendChild(top);
      card.appendChild(rating);
      card.appendChild(text);

      // Ulasan panjang dipendekkan dengan butang "Baca lagi"
      if (r.text.length > 240) {
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
  }

  /* ---------- 5. Borang kerjaya → WhatsApp ---------- */
  // Tiada data dihantar ke mana-mana server: borang hanya menyusun teks dan membuka wa.me.
  var careerForm = document.getElementById("careerForm");
  if (careerForm) {
    var errorBox = document.getElementById("careerError");
    careerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = careerForm.elements.name.value.trim();
      var role = careerForm.elements.role.value;
      var exp = careerForm.elements.exp.value.trim();

      if (!name) {
        errorBox.textContent = "Sila isi nama penuh anda.";
        careerForm.elements.name.focus();
        return;
      }
      errorBox.textContent = "";

      var lines = [
        "Hai Klinik MedPro, saya ingin memohon jawatan.",
        "Nama: " + name,
        "Jawatan: " + role
      ];
      if (exp) lines.push("Pengalaman: " + exp);
      lines.push("Saya boleh hantar resume melalui WhatsApp atau emel.");

      var url = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
    });
  }

  /* ---------- 6. Lightbox ---------- */
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
      lightboxImg.alt = img ? img.alt : "";
      lightbox.showModal();
    });
  });

  if (supportsDialog) {
    lightboxClose.addEventListener("click", function () { lightbox.close(); });
    // Klik pada latar gelap (di luar gambar) menutup lightbox
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) lightbox.close();
    });
    // Kosongkan src selepas tutup supaya gambar lama tidak berkelip bila dibuka semula
    lightbox.addEventListener("close", function () { lightboxImg.src = ""; });
  }

  /* ---------- 7. Animasi muncul ringkas ---------- */
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
