/*
  main.js — Interaksi ringkas mock laman Klinik Al Falah Umbai.

  Fungsi:
   1. Menu mobile (hamburger)
   2. Header berbayang bila skrol + pautan nav aktif
   3. Status "Dibuka / Tutup" ikut waktu Malaysia (UTC+8) + serlah hari ini
      + status Klinik Kulit (Selasa sahaja)
   4. Tab harga
   5. Kad ulasan Google (dijana daripada senarai REVIEWS)
   6. (tiada; poster guna grid/leret CSS sahaja)
   7. Lightbox gambar (guna <dialog> asli browser)
   8. Animasi muncul ringkas (IntersectionObserver)

  Tiada library luar. Semua kod dalam satu IIFE supaya tiada pemboleh ubah global.
*/
(function () {
  "use strict";

  // Tanda bahawa JS aktif; CSS guna kelas ini untuk animasi .reveal
  document.documentElement.classList.add("js");

  /* ---------- Data klinik (ubah di sini jika waktu berubah) ---------- */
  var OPEN_HOUR = 9;    // 9:00 pagi (format 24 jam)
  var CLOSE_HOUR = 23;  // 11:00 malam (format 24 jam)
  var SKIN_DAY = 2;     // Klinik Kulit: hari Selasa (0 = Ahad)
  var SKIN_OPEN = 18;   // 6:00 petang
  var SKIN_CLOSE = 22;  // 10:00 malam

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

  // Serlah pautan nav bagi seksyen yang sedang dilihat
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
  // Kira masa Malaysia tanpa bergantung pada zon waktu peranti pengguna
  function malaysiaNow() {
    var now = new Date();
    var utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utcMs + 8 * 3600000);
  }

  function updateOpenStatus() {
    var my = malaysiaNow();
    var hour = my.getHours();
    var isOpen = hour >= OPEN_HOUR && hour < CLOSE_HOUR;
    var text = isOpen
      ? "Dibuka sekarang · tutup 11:00 malam"
      : "Tutup sekarang · buka semula 9:00 pagi";

    // Kad lokasi
    var box = document.getElementById("openStatus");
    if (box) {
      box.innerHTML = "";
      var dot = document.createElement("span");
      dot.className = "status-dot " + (isOpen ? "is-open" : "is-closed");
      var label = document.createElement("span");
      label.textContent = text;
      box.appendChild(dot);
      box.appendChild(label);
    }

    // Pil status dalam hero
    var heroDot = document.getElementById("heroStatusDot");
    var heroText = document.getElementById("heroStatus");
    if (heroDot && heroText) {
      heroDot.className = "status-dot " + (isOpen ? "is-open" : "is-closed");
      heroText.textContent = isOpen ? "Dibuka sekarang · setiap hari 9 pagi – 11 malam" : "Tutup sekarang · buka 9 pagi setiap hari";
    }

    // Serlah baris hari ini dalam jadual (0 = Ahad)
    var rows = document.querySelectorAll("#hours tr");
    rows.forEach(function (row) {
      row.classList.toggle("is-today", Number(row.getAttribute("data-day")) === my.getDay());
    });

    // Status Klinik Kulit: beritahu sama ada sedang berjalan, malam ini, atau berapa hari lagi
    var skin = document.getElementById("skinStatus");
    if (skin) {
      var day = my.getDay();
      var msg;
      if (day === SKIN_DAY && hour >= SKIN_OPEN && hour < SKIN_CLOSE) msg = "● Sedang berjalan sekarang, sehingga 10 malam";
      else if (day === SKIN_DAY && hour < SKIN_OPEN) msg = "Hari ini Selasa: Klinik Kulit dibuka jam 6 petang";
      else {
        var daysLeft = (SKIN_DAY - day + 7) % 7 || 7; // bilangan hari ke Selasa seterusnya
        msg = daysLeft === 1 ? "Sesi seterusnya: esok, 6 petang" : "Sesi seterusnya: " + daysLeft + " hari lagi (Selasa)";
      }
      skin.textContent = msg;
    }
  }
  updateOpenStatus();
  setInterval(updateOpenStatus, 60000); // semak semula setiap minit

  /* ---------- 4. Tab pakej harga ---------- */
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
    // Navigasi papan kekunci kiri/kanan antara tab
    tab.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      var next = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
      activateTab(next);
      next.focus();
    });
  });

  /* ---------- 5. Ulasan Google ---------- */
  // Sumber: ulasan sebenar yang diberi pemilik (disalin dari Google Maps, Okt 2026).
  // Purata keseluruhan 4.9 diberi pemilik; bintang setiap ulasan diandaikan 5 (sila sahkan).
  // meta = maklumat profil pengulas; ago = tarikh relatif semasa disalin.
  var REVIEWS = [
    {
      name: "Yasmin Baharuddin", meta: "4 ulasan · 1 foto", ago: "Disunting 4 bulan lalu",
      text: "I had a very pleasant experience at this clinic. Dr. Nur Iylia was extremely professional, attentive, and non-judgmental throughout the consultation. She took the time to listen carefully to all of my concerns, explained my condition in detail, and provided helpful suggestions and advice regarding my symptoms and treatment options. I truly appreciated how thoroughly everything was explained, which made me feel comfortable, reassured, and well-informed.\n\nThe front desk staff were also very friendly, polite, and welcoming. They spoke gently and handled everything professionally, making the entire experience smooth and pleasant. I highly recommend this clinic, especially Dr. Nur Iylia, to anyone looking for quality healthcare and compassionate patient care."
    },
    {
      name: "Syazlin Khairiyah Binti Osman", meta: "3 ulasan", ago: "sebulan lalu",
      text: "The best clinic ever, dr ilya tu baik sangat + sporting, harga pun berpatutan, klinik bersih, wangi dan selesa, staff ramah, waiting time pun tak lama walaupun ramai🫡"
    },
    {
      name: "MOHD HAIRI A HAMID", meta: "8 ulasan · 7 foto", ago: "6 bulan lalu",
      text: "23/3/2026@ 9 am :Setiap kali pulang ke kampung umbai, klinik Al Falah sentiasa menjadi pilihan kami. Dr ilya sentiasa cakna keaadaan pesakit & mesra , staff2 klinik sangat membantu, staff Cik Umai & rakan2 sangat baik ."
    },
    {
      name: "Norlela Sulaiman", meta: "6 ulasan · 3 foto", ago: "4 bulan lalu",
      text: "Alhamdulillah selesai sudah anak berkhatan disini..nice staff and friendly doctor. not too expensive, affordable..suasana klinik yg sgt selesa juga.."
    },
    {
      name: "syida klicks", meta: "4 ulasan · 1 foto", ago: "3 bulan lalu",
      text: "Biasa memang pergi sini sebab dekat dengan rumah\nStaf yang baik dan layanan Mesra.\nDoktor pun baik dan lemah lembut."
    },
    {
      name: "Hasbul", meta: "1 ulasan · 1 foto", ago: "2 bulan lalu",
      text: "Great clinic with a clean and comfortable environment... The doctor is very kind and the staff were also friendly... Highly recommended..."
    },
    {
      name: "Noraidora Ramli", meta: "6 ulasan · 11 foto", ago: "10 bulan lalu",
      text: "Perkhidmatan berkhatan yang sangat baik, doktor dan staff yang ramah... rawatan yang cepat dan cermat..."
    }
  ];

  // Warna avatar bergilir (gaya avatar huruf Google), selari dengan palet biru klinik
  var AVATAR_COLORS = ["#1E3461", "#2878C0", "#00897B", "#E08A00", "#5E35B1", "#0277BD", "#C2185B"];

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
      var g = el("span", "review__g", "G");
      g.setAttribute("aria-label", "Ulasan Google");
      top.appendChild(avatar);
      top.appendChild(who);
      top.appendChild(g);

      var rating = el("div", "review__rating");
      var stars = el("span", "stars", "★★★★★");
      stars.setAttribute("aria-label", "5 daripada 5 bintang");
      rating.appendChild(stars);
      rating.appendChild(el("small", null, r.ago));

      var text = el("p", "review__text", r.text);

      card.appendChild(top);
      card.appendChild(rating);
      card.appendChild(text);

      // Ulasan panjang dipendekkan dengan butang "Baca lagi"
      if (r.text.length > 260) {
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

  /* ---------- 7. Lightbox ---------- */
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

  /* ---------- 8. Animasi muncul ringkas ---------- */
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
