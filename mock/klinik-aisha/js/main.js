/*
  main.js — Interaksi ringkas mock laman Klinik Aisha.

  Fungsi:
   1. Menu mobile (hamburger)
   2. Header berbayang bila skrol + pautan nav aktif
   3. Status "Dibuka / Tutup" ikut waktu Malaysia (UTC+8) + serlah hari ini
   4. Tab pakej harga
   5. Kad ulasan Google (dijana daripada senarai REVIEWS)
   6. Butang skrol poster promosi
   7. Lightbox gambar (guna <dialog> asli browser)
   8. Animasi muncul ringkas (IntersectionObserver)

  Tiada library luar. Semua kod dalam satu IIFE supaya tiada pemboleh ubah global.
*/
(function () {
  "use strict";

  // Tanda bahawa JS aktif; CSS guna kelas ini untuk animasi .reveal
  document.documentElement.classList.add("js");

  /* ---------- Data klinik (ubah di sini jika waktu berubah) ---------- */
  var OPEN_HOUR = 8;    // 8:00 pagi (format 24 jam)
  var CLOSE_HOUR = 23;  // 11:00 malam (format 24 jam)

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
      : "Tutup sekarang · buka semula 8:00 pagi";

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

    // Eyebrow hero
    var heroDot = document.getElementById("heroStatusDot");
    var heroText = document.getElementById("heroStatus");
    if (heroDot && heroText) {
      heroDot.className = "status-dot " + (isOpen ? "is-open" : "is-closed");
      heroText.textContent = isOpen ? "Dibuka sekarang · setiap hari 8 pagi – 11 malam" : "Tutup sekarang · buka 8 pagi setiap hari";
    }

    // Serlah baris hari ini dalam jadual (0 = Ahad)
    var rows = document.querySelectorAll("#hours tr");
    rows.forEach(function (row) {
      row.classList.toggle("is-today", Number(row.getAttribute("data-day")) === my.getDay());
    });
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
  // Sumber: ulasan 5 bintang sebenar yang diberi pemilik (disalin dari Google Maps).
  // meta = maklumat profil pengulas; ago = tarikh relatif semasa disalin (Okt 2026).
  var REVIEWS = [
    {
      name: "AIN ATIQAH", meta: "Local Guide · 29 ulasan · 24 foto", ago: "3 bulan lalu",
      text: "Sangat berpuas hati dengan servis di Klinik Aisha. Klinik bersih, cantik dan selesa dengan suasana yang tenang. Staff mesra serta membantu dari proses pendaftaran sampai selesai. Doktor pun profesional, menerangkan keadaan dengan jelas dan membuatkan saya rasa yakin sepanjang pemeriksaan. Waktu menunggu juga tidak terlalu lama. Memang selesa datang ke sini, sangat disyorkan terutama untuk ibu mengandung yang mahukan suasana klinik yang tenang dan kemas. Doktor sangat teliti semasa melakukan detail scan dan menerangkan perkembangan bayi dengan jelas. Saya rasa lebih tenang dan yakin selepas sesi pemeriksaan."
    },
    {
      name: "Khaliesah Abbas", meta: "Local Guide · 32 ulasan · 13 foto", ago: "4 bulan lalu",
      text: "Bawak mak untuk buat medical check up and also jumpa Dr sebab mak sengal² lutut and pinggang. Klinik baru yang cntik! Dr and asst sangat² friendly and baik. Terangkan semua dgn bagus. Datanglah korang kat sini. Recommended!"
    },
    {
      name: "Aisyah Suhaimi", meta: "1 ulasan · 2 foto", ago: "4 bulan lalu",
      text: "Alhamdulillah pergi scan kat sini, doktor dan staff sangat baik dan membantu.. Harga pun berpatutan alhamdulillah.."
    },
    {
      name: "nurul syafira", meta: "2 ulasan · 2 foto", ago: "4 bulan lalu",
      text: "Staff n doctor yang ramah… jawab semua soalan yg ditanya.. ade kemudahan bgi ibu bapa yg bawa anak2… tempat yang selesa… inn shaa allah akan dtg lg… terima kasih klinik aisha.."
    },
    {
      name: "Siti Balkiah Abd Mokti", meta: "1 ulasan · 1 foto", ago: "3 bulan lalu",
      text: "Saya tertarik untuk datang ke klinik aishah kerana dari jauh klinik ini sangat cantik, menyebabkan saya terpanggil2 untuk datang ke sini. Bila saya masuk dalam layanan sangat baik dan manis. Doktor dan pembantu doktor sentiasa tersenyum manis. Semoga klinik Aishah terus maju jaya❤️"
    },
    {
      name: "Fatimah Abdullah", meta: "1 ulasan · 1 foto", ago: "3 bulan lalu",
      text: "Alhamdulillah klinik sangat selesa..dokter pun baik..penerangan yg jelas..insya Allah akan repeat lg selepas ni klau ada masalah kesihatan.."
    },
    {
      name: "Sharmin Farahin", meta: "1 ulasan · 2 foto", ago: "3 bulan lalu",
      text: "Klinik bersih cantik selesa. Doc dan staff pon sgt peramah ☺️"
    }
  ];

  // Warna avatar bergilir (gaya avatar huruf Google)
  var AVATAR_COLORS = ["#B8146B", "#7B1FA2", "#00897B", "#F4511E", "#3949AB", "#C2185B", "#5D4037"];

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

  /* ---------- 6. Butang skrol poster ---------- */
  var posters = document.getElementById("posters");
  document.querySelectorAll("[data-scroll]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var dir = Number(btn.getAttribute("data-scroll"));
      // Skrol sejauh ~80% lebar bekas supaya poster seterusnya kelihatan
      posters.scrollBy({ left: dir * posters.clientWidth * 0.8, behavior: "smooth" });
    });
  });

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
