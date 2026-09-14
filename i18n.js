/* ============================================================================
   i18n.js — MULTILINGUAL SUPPORT (English · Bahasa Melayu · 中文)
   ============================================================================
   HOW IT WORKS
   ------------
   1. Any element in the HTML that carries  data-i18n="some.key"  gets its text
      replaced with DICT[currentLang]["some.key"].
   2. Any element with  data-i18n-ph="some.key"  gets its *placeholder* swapped
      (used by the contact form and the chatbot input).
   3. The chosen language is saved in localStorage under "nf-lang", so the site
      remembers the visitor's choice next time.
   4. Other scripts can react to a language change by listening for the custom
      event:   document.addEventListener('languagechange', e => e.detail.lang)
      (script.js uses it for the typewriter, chatbot.js for its answers.)

   ADDING A NEW STRING
   -------------------
     • put  data-i18n="my.key"  on the element in the HTML
     • add  'my.key': '…'  to all three dictionaries below
   If a key is missing in ms/zh, the English value is used automatically, so a
   half-finished translation never breaks the page.
   ============================================================================ */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     THE DICTIONARIES
     Keys are grouped by section to keep them easy to find.
     Values may contain simple HTML (<strong>, <br>) — that is intentional.
     ------------------------------------------------------------------------ */
  const DICT = {

    /* ====================================================================
       ENGLISH — the source of truth
       ==================================================================== */
    en: {
      "nav.legacy": "Previous portfolio",
      "nav.development": "Web & Apps",
      /* -- navigation -- */
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.education': 'Education',
      'nav.experience': 'Experience',
      'nav.skills': 'Skills',
      'nav.projects': 'Projects',
      'nav.certs': 'Certifications',
      'nav.contact': 'Contact',
      'nav.hire': 'Hire Me',
      'nav.allProjects': 'All projects →',
      'nav.back': '← Back to home',

      /* -- hero -- */
      'hero.badge': 'Open to new opportunities',
      'hero.roleStatic': 'Software Engineer',
      "hero.desc": "I build websites for real businesses and applications that make work easier. As a Software Engineer at Infineon Technologies, I also work with Oracle PL/SQL, ETL and C# .NET — bringing enterprise engineering experience to every build.",
      "hero.ctaWork": "Web & App Portfolio",
      'hero.ctaCv': 'Download CV',
      'hero.statYears': 'Years Experience',
      'hero.statProjects': 'Projects Shipped',
      'hero.statCerts': 'Certifications',
      'hero.statCgpa': 'Degree CGPA',
      'hero.scroll': 'scroll',
      /* Rotating titles for the typewriter — an array, not a string */
      'hero.roles': ['Master Data Developer', 'PL/SQL Engineer', 'Data Scientist', 'Next.js Web Developer'],

      /* -- about -- */
      'about.eyebrow': 'About Me',
      'about.title': 'Data people can trust, code people enjoy.',
      'about.chip': 'Based in Melaka, MY',
      "about.p1": "I'm a Software Engineer at Infineon Technologies, working on enterprise data systems with Oracle PL/SQL, ETL and C# .NET. I turn complex requirements into reliable, usable software.",
      "about.p2": "My background spans data science at <strong>AirAsia</strong> and <strong>TM R&amp;D</strong>, and a Computer Science degree from <strong>UKM</strong> with First Class Honours.",
      "about.p3": "I also build freelance websites for businesses, including Homestay Shimah Jay and Kambing Golek Melaka Official. Explore their interfaces and case studies in my web and application portfolio.",
      'about.fact1': 'Melaka, Malaysia',
      'about.fact2': 'UKM Class of 2025',
      'about.fact3': 'First Class Honours',
      'about.fact4': 'MY · EN · ID',

      /* -- education -- */
      'edu.eyebrow': 'Education',
      'edu.title': 'Where it started.',
      'edu.lead': 'Computer Science with a Data Science specialisation — finished top of the class rather than just on time.',
      'edu.ukm.school': 'Universiti Kebangsaan Malaysia (UKM)',
      'edu.ukm.degree': 'Bachelor of Computer Science (Hons) — Data Science',
      'edu.ukm.t1': 'First Class Honours',
      'edu.ukm.t2': "Dean's List — 6 semesters",
      'edu.ukm.t3': 'FYP: Breast Cancer Prediction (HoverNet)',
      'edu.kmm.school': 'Malacca Matriculation College',
      'edu.kmm.degree': 'Physical Science — Module 2 (Computer Science)',
      'edu.kmm.t1': 'Pre-university foundation',
      'edu.kmm.t2': 'Mathematics · Physics · Computer Science',

      /* -- experience -- */
      'exp.eyebrow': 'Experience',
      'exp.title': "Where I've worked.",
      'exp.lead': 'Two years across enterprise master data, machine learning research and freelance web development.',

      'exp.ifx.role': 'Software Engineer — Master Data Developer',
      'exp.ifx.loc': 'Melaka, Malaysia',
      'exp.ifx.summary': "L3 support and development for Infineon's worldwide engineering master data systems — keeping data consistent across every system class and site.",
      'exp.ifx.b1': 'Built Oracle PL/SQL functions, procedures and packages for patching, cleansing, restructuring and automated backend tasks.',
      'exp.ifx.b2': 'Designed and refined ETL / data-warehouse flows with validation and error handling, lifting data reliability and system performance.',
      'exp.ifx.b3': 'Delivered SAP data migration, de-duplication, cleansing and reporting work that streamlined enterprise workflows by ~30%.',
      'exp.ifx.b4': 'Enhanced backend and frontend features in C# .NET, from bug fixes to full feature releases.',
      'exp.ifx.b5': 'Acted as Software Release Manager (SRM) — weekly Jenkins CI/CD releases across DEV, INT and PROD.',
      'exp.ifx.b6': 'Automated repeat tickets with KNIME workflows, saving roughly 50% of the manual handling time.',
      'exp.ifx.b7': 'Handled incidents in Remedy and change requests in Octane; version control in TFS / Azure DevOps.',

      'exp.free.role': 'Web Developer — Freelance',
      'exp.free.company': 'Independent / Client Projects',
      'exp.free.loc': 'Remote, Malaysia',
      'exp.free.summary': 'End-to-end websites for real businesses — design, build, deploy, domain, SEO and after-care.',
      'exp.free.b1': 'Responsive, high-performance sites in Next.js and TypeScript using SSR and SSG for fast first paint.',
      'exp.free.b2': 'Deployed on Vercel and Cloudflare with DNS, SSL and CDN configured for safe, global delivery.',
      'exp.free.b3': 'SEO work end to end: metadata, structured data, Lighthouse tuning, lazy loading, image optimisation and Google Search Console.',
      'exp.free.b4': 'Shipped rule-based chatbots so visitors get product answers instantly, without a backend bill.',
      'exp.free.b5': 'Ran requirements gathering directly with clients and delivered to agreed business goals and timelines.',

      'exp.aa.role': 'Data Scientist — Apprentice',
      'exp.aa.loc': 'Sepang, Malaysia',
      'exp.aa.summary': 'Joined the data science team to forecast in-flight food waste and reduce cost per flight.',
      'exp.aa.b1': 'Built XGBoost models for food-waste prediction — cleaning, feature engineering and hyperparameter tuning.',
      'exp.aa.b2': 'Used Google Cloud Platform for data tracking, validation and workflow monitoring.',
      'exp.aa.b3': 'Trained in multicultural teamwork, communication and stakeholder presentation.',

      'exp.tm.role': 'Data Science Intern',
      'exp.tm.loc': 'Cyberjaya, Malaysia',
      'exp.tm.summary': 'Network analytics — turning messy telco data into fault monitoring and quality-of-service insight.',
      'exp.tm.b1': 'Raised data quality by 90% by cleaning thousands of access-network, termination-log, CTT and speed-test records.',
      'exp.tm.b2': 'Built Random Forest Regression and LSTM time-series models predicting speed drops and faults at 80%+ accuracy.',
      'exp.tm.b3': 'Created Power BI and Python (Matplotlib / Seaborn) dashboards for weekly network performance reviews.',
      'exp.tm.b4': 'Supported the OracleDB → MariaDB migration with ETL development and rigorous testing.',
      'exp.tm.b5': 'Automated extraction with Selenium Robot Framework, cutting manual work by 60%.',
      'exp.tm.b6': 'Led Angular frontend work and REST API integration for internal monitoring platforms; contributed Spring Boot microservices.',
      'exp.tm.b7': 'Delivered 8+ Agile sprints using Jira and GitLab with cross-team collaboration.',

      /* -- skills -- */
      'skills.eyebrow': 'Skills',
      'skills.title': 'My toolkit.',
      'skills.lead': 'The tools I actually reach for — in the office, on client work and at 1 a.m. on side projects.',
      'skills.g1': 'Languages',
      'skills.g2': 'Web &amp; Frameworks',
      'skills.g3': 'Data Science &amp; AI',
      'skills.g4': 'Cloud &amp; Big Data',
      'skills.g5': 'Databases',
      'skills.g6': 'Tools &amp; Analytics',

      /* -- projects -- */
      'proj.eyebrow': 'Projects',
      'proj.title': "What I've built.",
      "proj.lead": "Client websites, useful applications and enterprise engineering. Explore the highlights, then open a case study for the details.",
      'proj.featured': 'Featured',
      'proj.client': 'Client Work',
      'proj.case': 'Case study',
      "proj.viewAll": "Explore all projects",
      'proj.p1.title': 'Enterprise Master Data Migration &amp; Cleansing',
      "proj.p1.desc": "Enterprise data migration, cleansing and ETL workflows using Oracle PL/SQL, SAP and KNIME at Infineon Technologies.",
      'proj.p3.title': 'Breast Cancer Prediction — HoverNet',
      "proj.p3.desc": "A Django research interface connecting histopathology images to HoverNet for nuclei segmentation and classification. UKM final year project.",
      'proj.p4.title': 'Real-Time Face Mask Detection',
      "proj.p4.desc": "Real-time face mask detection with YOLOv8, OpenCV and a Flask interface. Three classes, from camera input to results.",
      'proj.p5.title': 'Network Fault &amp; Speed Prediction',
      "proj.p5.desc": "Random Forest and LSTM models for network speed and fault analysis, developed during my internship at TM R&D.",
      'proj.p6.title': 'Angular &amp; REST API Platform',
      "proj.p6.desc": "An Angular application with token authentication, product management and REST API integration.",

      /* -- certifications -- */
      'cert.eyebrow': 'Certifications',
      'cert.title': 'Credentials.',
      'cert.lead': 'Hover a card to see the credential details. All verifiable — links included where the issuer provides one.',
      'cert.verify': 'Verify →',
      'cert.c1.note': 'Modelling, DAX, data preparation and report design in Power BI.',
      'cert.c2.note': 'Core data concepts, relational and non-relational data, analytics on Azure.',
      'cert.c3.note': 'React components, state management and DOM problem solving under timed conditions.',
      'cert.c4.note': 'Data structures, algorithms and applied problem solving assessment.',
      'cert.c5.id': 'Joins · aggregation · subqueries',
      'cert.c5.note': 'Intermediate SQL assessment covering complex joins, grouping and nested queries.',
      'cert.c6.note': 'Applied analytics programme — data modelling and executive reporting.',
      'cert.c7.note': 'Industry apprenticeship in data science, professional communication and teamwork.',
      'cert.awardsTitle': 'Awards &amp; Involvements',
      'cert.a1.t': 'Program Leader — SCHOOL@UKM Prototyping Workshop',
      'cert.a1.d': 'Led a Figma + Bravo Studio prototyping workshop for students · 2024',
      'cert.a2.t': 'Gold — Contingent March-Past',
      'cert.a2.d': 'Sukan Antara Fakulti (SAF), UKM · 2023',
      'cert.a3.t': 'Bronze — AR/VR Reality Competition',
      'cert.a3.d': 'Mobile Application Development Club · 2022',
      'cert.a4.t': 'Silver — IDIIC International Challenge',
      'cert.a4.d': 'International Digital Innovation &amp; Invention Challenge · 2021',

      /* -- contact -- */
      'contact.eyebrow': 'Contact',
      'contact.title': "Let's build something.",
      'contact.lead': 'Got a role, a project or just a question about the code on this page? My inbox is open.',
      'contact.email': 'Email',
      'contact.phone': 'Phone',
      'contact.location': 'Location',
      'contact.locationValue': '75460 Melaka, Malaysia',
      'contact.findMe': 'Find me online',
      'contact.resume': 'Résumé',
      'contact.note': 'Currently a full-time Software Engineer and open to <strong>freelance web projects</strong> and <strong>data engineering opportunities</strong>. I usually reply within 24 hours.',
      'contact.fName': 'Your name',
      'contact.fNamePh': 'Ahmad Zaki',
      'contact.fEmail': 'Email address',
      'contact.fEmailPh': 'you@company.com',
      'contact.fSubject': 'Subject',
      'contact.fSubjectPh': 'Freelance website enquiry',
      'contact.fMsg': 'Message',
      'contact.fMsgPh': 'Tell me about the project or role…',
      'contact.send': 'Send Message',
      'contact.formHint': 'This opens your own email app with everything filled in — nothing is stored on a server.',
      'contact.errName': 'Please tell me your name.',
      'contact.errEmail': 'That email address does not look right.',
      'contact.errMsg': 'Please write a short message first.',
      'contact.ok': 'Opening your email app… if nothing happens, mail me directly at naqiudin73@gmail.com',

      /* -- footer -- */
      'footer.tagline': 'Built by hand in Melaka, Malaysia — no page builder, no template.',

      /* -- chatbot UI (answers live in chatbot.js) -- */
      'chat.title': 'Portfolio Assistant',
      'chat.status': 'rule-based · always online',
      'chat.placeholder': 'Ask about my work…',

      /* -- projects.html -- */
      'page.eyebrow': 'Project Archive',
      'page.title': 'Every project, in detail.',
      "page.lead": "Client websites, applications, enterprise data engineering and machine learning — the brief, the implementation and the work behind each project.",
      'page.filterAll': 'All',
      'page.filterData': 'Data Engineering',
      'page.filterMl': 'Machine Learning',
      'page.filterWeb': 'Web Development',
      'page.filterApp': 'Applications',
      'page.problem': 'The problem',
      'page.did': 'What I did',
      'page.result': 'Result',
      'page.stack': 'Stack',
      'page.gallery': 'Screens',
      'page.confidential': 'Internal enterprise system — no screenshots can be shared, so the write-up describes the approach instead.'
    },

    /* ====================================================================
       BAHASA MELAYU
       ==================================================================== */
    ms: {
      "nav.legacy": "Portfolio terdahulu",
      "nav.development": "Web & Aplikasi",
      'nav.home': 'Utama',
      'nav.about': 'Tentang',
      'nav.education': 'Pendidikan',
      'nav.experience': 'Pengalaman',
      'nav.skills': 'Kemahiran',
      'nav.projects': 'Projek',
      'nav.certs': 'Sijil',
      'nav.contact': 'Hubungi',
      'nav.hire': 'Upah Saya',
      'nav.allProjects': 'Semua projek →',
      'nav.back': '← Kembali ke utama',

      'hero.badge': 'Terbuka untuk peluang baharu',
      'hero.roleStatic': 'Jurutera Perisian',
      "hero.desc": "Saya membina laman web untuk perniagaan dan aplikasi yang memudahkan kerja. Sebagai Jurutera Perisian di Infineon Technologies, saya juga menggunakan Oracle PL/SQL, ETL dan C# .NET — membawa pengalaman kejuruteraan perusahaan kepada setiap projek.",
      "hero.ctaWork": "Portfolio Web & Aplikasi",
      'hero.ctaCv': 'Muat Turun CV',
      'hero.statYears': 'Tahun Pengalaman',
      'hero.statProjects': 'Projek Disiapkan',
      'hero.statCerts': 'Pensijilan',
      'hero.statCgpa': 'PNGK Ijazah',
      'hero.scroll': 'tatal',
      'hero.roles': ['Pembangun Master Data', 'Jurutera PL/SQL', 'Saintis Data', 'Pembangun Web Next.js'],

      'about.eyebrow': 'Tentang Saya',
      'about.title': 'Data yang dipercayai, kod yang menyenangkan.',
      'about.chip': 'Berpangkalan di Melaka',
      "about.p1": "Saya Jurutera Perisian di Infineon Technologies, membangunkan sistem data perusahaan dengan Oracle PL/SQL, ETL dan C# .NET. Saya menukar keperluan kompleks kepada perisian yang stabil dan mudah digunakan.",
      "about.p2": "Latar belakang saya merangkumi sains data di <strong>AirAsia</strong> dan <strong>TM R&amp;D</strong>, serta ijazah Sains Komputer dari <strong>UKM</strong> dengan Kelas Pertama.",
      "about.p3": "Saya juga membina laman web freelance untuk perniagaan, termasuk Homestay Shimah Jay dan Kambing Golek Melaka Official. Terokai antara muka dan kajian kes dalam portfolio web dan aplikasi saya.",
      'about.fact1': 'Melaka, Malaysia',
      'about.fact2': 'Graduan UKM 2025',
      'about.fact3': 'Ijazah Kelas Pertama',
      'about.fact4': 'MY · EN · ID',

      'edu.eyebrow': 'Pendidikan',
      'edu.title': 'Di mana ia bermula.',
      'edu.lead': 'Sains Komputer dengan pengkhususan Sains Data — bukan sekadar tamat, tetapi tamat di barisan hadapan.',
      'edu.ukm.school': 'Universiti Kebangsaan Malaysia (UKM)',
      'edu.ukm.degree': 'Sarjana Muda Sains Komputer (Kepujian) — Sains Data',
      'edu.ukm.t1': 'Ijazah Kelas Pertama',
      'edu.ukm.t2': 'Anugerah Dekan — 6 semester',
      'edu.ukm.t3': 'PTA: Ramalan Kanser Payudara (HoverNet)',
      'edu.kmm.school': 'Kolej Matrikulasi Melaka',
      'edu.kmm.degree': 'Sains Fizikal — Modul 2 (Sains Komputer)',
      'edu.kmm.t1': 'Asas pra-universiti',
      'edu.kmm.t2': 'Matematik · Fizik · Sains Komputer',

      'exp.eyebrow': 'Pengalaman',
      'exp.title': 'Tempat saya bekerja.',
      'exp.lead': 'Dua tahun merentasi master data perusahaan, penyelidikan pembelajaran mesin dan pembangunan web bebas.',

      'exp.ifx.role': 'Jurutera Perisian — Pembangun Master Data',
      'exp.ifx.loc': 'Melaka, Malaysia',
      'exp.ifx.summary': 'Sokongan dan pembangunan L3 untuk sistem master data kejuruteraan Infineon di seluruh dunia — memastikan data konsisten merentas setiap kelas sistem dan lokasi.',
      'exp.ifx.b1': 'Membina fungsi, prosedur dan pakej Oracle PL/SQL untuk penampalan, pembersihan, penstrukturan semula dan automasi tugas backend.',
      'exp.ifx.b2': 'Mereka bentuk dan memperhalusi aliran ETL / gudang data dengan pengesahan dan pengendalian ralat, meningkatkan kebolehpercayaan data serta prestasi sistem.',
      'exp.ifx.b3': 'Menyiapkan kerja migrasi data SAP, penyingkiran pendua, pembersihan dan pelaporan yang melancarkan aliran kerja perusahaan sebanyak ~30%.',
      'exp.ifx.b4': 'Menambah baik ciri backend dan frontend menggunakan C# .NET, daripada pembaikan pepijat hingga pelepasan ciri penuh.',
      'exp.ifx.b5': 'Bertindak sebagai Software Release Manager (SRM) — pelepasan CI/CD Jenkins mingguan merentas DEV, INT dan PROD.',
      'exp.ifx.b6': 'Mengautomasikan tiket berulang dengan aliran kerja KNIME, menjimatkan kira-kira 50% masa pengendalian manual.',
      'exp.ifx.b7': 'Mengendalikan insiden dalam Remedy dan permintaan perubahan dalam Octane; kawalan versi menerusi TFS / Azure DevOps.',

      'exp.free.role': 'Pembangun Web — Bebas',
      'exp.free.company': 'Projek Bebas / Pelanggan',
      'exp.free.loc': 'Jarak Jauh, Malaysia',
      'exp.free.summary': 'Laman web hujung ke hujung untuk perniagaan sebenar — reka bentuk, pembinaan, pengedaran, domain, SEO dan penyelenggaraan.',
      'exp.free.b1': 'Laman responsif berprestasi tinggi dengan Next.js dan TypeScript menggunakan SSR dan SSG untuk paparan pertama yang pantas.',
      'exp.free.b2': 'Dihoskan di Vercel dan Cloudflare dengan konfigurasi DNS, SSL dan CDN untuk penghantaran global yang selamat.',
      'exp.free.b3': 'Kerja SEO menyeluruh: metadata, data berstruktur, penalaan Lighthouse, lazy loading, pengoptimuman imej dan Google Search Console.',
      'exp.free.b4': 'Membangunkan chatbot berasaskan peraturan supaya pelawat mendapat jawapan produk serta-merta tanpa kos backend.',
      'exp.free.b5': 'Mengumpul keperluan terus daripada pelanggan dan menyampaikan mengikut matlamat perniagaan serta jadual yang dipersetujui.',

      'exp.aa.role': 'Saintis Data — Perantis',
      'exp.aa.loc': 'Sepang, Malaysia',
      'exp.aa.summary': 'Menyertai pasukan sains data untuk meramal pembaziran makanan dalam penerbangan dan mengurangkan kos setiap penerbangan.',
      'exp.aa.b1': 'Membina model XGBoost untuk ramalan pembaziran makanan — pembersihan data, kejuruteraan ciri dan penalaan hiperparameter.',
      'exp.aa.b2': 'Menggunakan Google Cloud Platform untuk penjejakan data, pengesahan dan pemantauan aliran kerja.',
      'exp.aa.b3': 'Menerima latihan kerja berpasukan pelbagai budaya, komunikasi dan pembentangan kepada pihak berkepentingan.',

      'exp.tm.role': 'Pelatih Sains Data',
      'exp.tm.loc': 'Cyberjaya, Malaysia',
      'exp.tm.summary': 'Analitis rangkaian — menukar data telco yang bersepah menjadi pemantauan kerosakan dan cerapan kualiti perkhidmatan.',
      'exp.tm.b1': 'Meningkatkan kualiti data sebanyak 90% dengan membersihkan ribuan rekod rangkaian akses, log penamatan, CTT dan ujian kelajuan.',
      'exp.tm.b2': 'Membina model siri masa Random Forest Regression dan LSTM yang meramal kemerosotan kelajuan dan kerosakan dengan ketepatan 80%+.',
      'exp.tm.b3': 'Menghasilkan papan pemuka Power BI dan Python (Matplotlib / Seaborn) untuk semakan prestasi rangkaian mingguan.',
      'exp.tm.b4': 'Menyokong migrasi OracleDB → MariaDB dengan pembangunan ETL dan pengujian menyeluruh.',
      'exp.tm.b5': 'Mengautomasikan pengekstrakan data dengan Selenium Robot Framework, mengurangkan kerja manual sebanyak 60%.',
      'exp.tm.b6': 'Menerajui kerja frontend Angular dan integrasi REST API untuk platform pemantauan dalaman; menyumbang perkhidmatan mikro Spring Boot.',
      'exp.tm.b7': 'Menyiapkan 8+ pusingan sprint Agile menggunakan Jira dan GitLab dengan kerjasama merentas pasukan.',

      'skills.eyebrow': 'Kemahiran',
      'skills.title': 'Peralatan saya.',
      'skills.lead': 'Alat yang benar-benar saya gunakan — di pejabat, pada kerja pelanggan dan pada pukul 1 pagi untuk projek sampingan.',
      'skills.g1': 'Bahasa Pengaturcaraan',
      'skills.g2': 'Web &amp; Rangka Kerja',
      'skills.g3': 'Sains Data &amp; AI',
      'skills.g4': 'Awan &amp; Data Raya',
      'skills.g5': 'Pangkalan Data',
      'skills.g6': 'Alatan &amp; Analitis',

      'proj.eyebrow': 'Projek',
      'proj.title': 'Apa yang saya bina.',
      "proj.lead": "Laman web pelanggan, aplikasi yang berguna dan kejuruteraan perusahaan. Terokai sorotan ini dan buka kajian kes untuk butirannya.",
      'proj.featured': 'Pilihan',
      'proj.client': 'Kerja Pelanggan',
      'proj.case': 'Kajian kes',
      "proj.viewAll": "Terokai semua projek",
      'proj.p1.title': 'Migrasi &amp; Pembersihan Master Data Perusahaan',
      "proj.p1.desc": "Migrasi, pembersihan data dan aliran ETL perusahaan menggunakan Oracle PL/SQL, SAP dan KNIME di Infineon Technologies.",
      'proj.p3.title': 'Ramalan Kanser Payudara — HoverNet',
      "proj.p3.desc": "Antara muka penyelidikan Django yang menghubungkan imej histopatologi kepada HoverNet untuk segmentasi dan klasifikasi nukleus. Projek tahun akhir UKM.",
      'proj.p4.title': 'Pengesanan Pelitup Muka Masa Nyata',
      "proj.p4.desc": "Pengesanan pelitup muka masa nyata dengan YOLOv8, OpenCV dan antara muka Flask. Tiga kelas daripada input kamera kepada hasil.",
      'proj.p5.title': 'Ramalan Kerosakan &amp; Kelajuan Rangkaian',
      "proj.p5.desc": "Model Random Forest dan LSTM untuk analisis kelajuan serta kerosakan rangkaian, dibina ketika latihan industri di TM R&D.",
      'proj.p6.title': 'Platform Angular &amp; REST API',
      "proj.p6.desc": "Aplikasi Angular dengan pengesahan token, pengurusan produk dan integrasi REST API.",

      'cert.eyebrow': 'Pensijilan',
      'cert.title': 'Kelayakan.',
      'cert.lead': 'Tuding pada kad untuk melihat butiran sijil. Semuanya boleh disahkan — pautan disertakan jika penerbit menyediakannya.',
      'cert.verify': 'Sahkan →',
      'cert.c1.note': 'Pemodelan, DAX, penyediaan data dan reka bentuk laporan dalam Power BI.',
      'cert.c2.note': 'Konsep data teras, data hubungan dan bukan hubungan, analitis di Azure.',
      'cert.c3.note': 'Komponen React, pengurusan keadaan dan penyelesaian masalah DOM dalam masa terhad.',
      'cert.c4.note': 'Penilaian struktur data, algoritma dan penyelesaian masalah gunaan.',
      'cert.c5.id': 'Joins · pengagregatan · subkueri',
      'cert.c5.note': 'Penilaian SQL pertengahan merangkumi join kompleks, pengumpulan dan kueri bersarang.',
      'cert.c6.note': 'Program analitis gunaan — pemodelan data dan pelaporan eksekutif.',
      'cert.c7.note': 'Perantisan industri dalam sains data, komunikasi profesional dan kerja berpasukan.',
      'cert.awardsTitle': 'Anugerah &amp; Penglibatan',
      'cert.a1.t': 'Ketua Program — Bengkel Prototaip SCHOOL@UKM',
      'cert.a1.d': 'Mengetuai bengkel prototaip Figma + Bravo Studio untuk pelajar · 2024',
      'cert.a2.t': 'Emas — Perbarisan Kontinjen',
      'cert.a2.d': 'Sukan Antara Fakulti (SAF), UKM · 2023',
      'cert.a3.t': 'Gangsa — Pertandingan Realiti AR/VR',
      'cert.a3.d': 'Kelab Pembangunan Aplikasi Mudah Alih · 2022',
      'cert.a4.t': 'Perak — Cabaran Antarabangsa IDIIC',
      'cert.a4.d': 'International Digital Innovation &amp; Invention Challenge · 2021',

      'contact.eyebrow': 'Hubungi',
      'contact.title': 'Mari bina sesuatu.',
      'contact.lead': 'Ada jawatan, projek atau sekadar soalan tentang kod di halaman ini? Peti masuk saya sentiasa terbuka.',
      'contact.email': 'E-mel',
      'contact.phone': 'Telefon',
      'contact.location': 'Lokasi',
      'contact.locationValue': '75460 Melaka, Malaysia',
      'contact.findMe': 'Cari saya dalam talian',
      'contact.resume': 'Resume',
      'contact.note': 'Kini bekerja sepenuh masa sebagai Jurutera Perisian dan terbuka untuk <strong>projek web bebas</strong> serta <strong>peluang kejuruteraan data</strong>. Saya biasanya membalas dalam masa 24 jam.',
      'contact.fName': 'Nama anda',
      'contact.fNamePh': 'Ahmad Zaki',
      'contact.fEmail': 'Alamat e-mel',
      'contact.fEmailPh': 'anda@syarikat.com',
      'contact.fSubject': 'Subjek',
      'contact.fSubjectPh': 'Pertanyaan laman web bebas',
      'contact.fMsg': 'Mesej',
      'contact.fMsgPh': 'Ceritakan tentang projek atau jawatan tersebut…',
      'contact.send': 'Hantar Mesej',
      'contact.formHint': 'Ini akan membuka aplikasi e-mel anda dengan maklumat sedia diisi — tiada apa-apa disimpan di pelayan.',
      'contact.errName': 'Sila nyatakan nama anda.',
      'contact.errEmail': 'Alamat e-mel itu nampak tidak betul.',
      'contact.errMsg': 'Sila tulis mesej ringkas dahulu.',
      'contact.ok': 'Membuka aplikasi e-mel anda… jika tiada apa-apa berlaku, e-mel terus ke naqiudin73@gmail.com',

      'footer.tagline': 'Dibina sendiri di Melaka, Malaysia — tanpa pembina halaman, tanpa templat.',

      'chat.title': 'Pembantu Portfolio',
      'chat.status': 'berasaskan peraturan · sentiasa dalam talian',
      'chat.placeholder': 'Tanya tentang kerja saya…',

      'page.eyebrow': 'Arkib Projek',
      'page.title': 'Setiap projek, secara terperinci.',
      "page.lead": "Laman web pelanggan, aplikasi, kejuruteraan data perusahaan dan pembelajaran mesin — keperluan, pelaksanaan dan hasil kerja bagi setiap projek.",
      'page.filterAll': 'Semua',
      'page.filterData': 'Kejuruteraan Data',
      'page.filterMl': 'Pembelajaran Mesin',
      'page.filterWeb': 'Pembangunan Web',
      'page.filterApp': 'Aplikasi',
      'page.problem': 'Masalahnya',
      'page.did': 'Apa yang saya lakukan',
      'page.result': 'Hasil',
      'page.stack': 'Teknologi',
      'page.gallery': 'Paparan',
      'page.confidential': 'Sistem perusahaan dalaman — tangkapan skrin tidak boleh dikongsi, jadi penulisan ini menerangkan pendekatannya sahaja.'
    },

    /* ====================================================================
       中文 (SIMPLIFIED CHINESE)
       ==================================================================== */
    zh: {
      "nav.legacy": "旧版作品集",
      "nav.development": "网站与应用",
      'nav.home': '首页',
      'nav.about': '关于',
      'nav.education': '教育',
      'nav.experience': '经历',
      'nav.skills': '技能',
      'nav.projects': '项目',
      'nav.certs': '证书',
      'nav.contact': '联系',
      'nav.hire': '联系合作',
      'nav.allProjects': '全部项目 →',
      'nav.back': '← 返回首页',

      'hero.badge': '正在寻找新机会',
      'hero.roleStatic': '软件工程师',
      "hero.desc": "我为企业开发网站和实用应用程序。在英飞凌担任软件工程师期间，我使用 Oracle PL/SQL、ETL 和 C# .NET，将企业工程经验融入每个项目。",
      "hero.ctaWork": "网站与应用作品集",
      'hero.ctaCv': '下载简历',
      'hero.statYears': '年工作经验',
      'hero.statProjects': '个已交付项目',
      'hero.statCerts': '项专业认证',
      'hero.statCgpa': '本科绩点',
      'hero.scroll': '向下滚动',
      'hero.roles': ['主数据开发工程师', 'PL/SQL 工程师', '数据科学家', 'Next.js 前端开发'],

      'about.eyebrow': '关于我',
      'about.title': '值得信赖的数据，令人愉快的代码。',
      'about.chip': '常驻马来西亚马六甲',
      "about.p1": "我在英飞凌担任软件工程师，使用 Oracle PL/SQL、ETL 和 C# .NET 开发企业数据系统，将复杂需求转化为可靠、易用的软件。",
      "about.p2": "我的经历包括 <strong>AirAsia</strong> 与 <strong>TM R&amp;D</strong> 的数据科学工作，以及 <strong>UKM</strong> 计算机科学一等荣誉学位。",
      "about.p3": "我也为企业开发网站，包括 Homestay Shimah Jay 和 Kambing Golek Melaka Official。欢迎查看网站与应用作品集中的界面和案例。",
      'about.fact1': '马六甲，马来西亚',
      'about.fact2': 'UKM 2025 届',
      'about.fact3': '一等荣誉学位',
      'about.fact4': '马来语 · 英语 · 印尼语',

      'edu.eyebrow': '教育背景',
      'edu.title': '一切从这里开始。',
      'edu.lead': '计算机科学（数据科学方向）—— 不只是按时毕业，而是名列前茅。',
      'edu.ukm.school': '马来西亚国民大学（UKM）',
      'edu.ukm.degree': '计算机科学（荣誉）学士 — 数据科学',
      'edu.ukm.t1': '一等荣誉学位',
      'edu.ukm.t2': '院长优等生名单 — 6 个学期',
      'edu.ukm.t3': '毕业设计：乳腺癌预测（HoverNet）',
      'edu.kmm.school': '马六甲大学先修学院',
      'edu.kmm.degree': '物理科学 — 第二单元（计算机科学）',
      'edu.kmm.t1': '大学预科基础',
      'edu.kmm.t2': '数学 · 物理 · 计算机科学',

      'exp.eyebrow': '工作经历',
      'exp.title': '我工作过的地方。',
      'exp.lead': '两年时间跨越企业主数据、机器学习研究与自由职业网站开发。',

      'exp.ifx.role': '软件工程师 — 主数据开发',
      'exp.ifx.loc': '马六甲，马来西亚',
      'exp.ifx.summary': '为英飞凌全球工程主数据系统提供 L3 支持与开发 —— 确保数据在各系统类别与站点之间保持一致。',
      'exp.ifx.b1': '编写 Oracle PL/SQL 函数、存储过程与程序包，用于数据修补、清洗、重构以及后端任务自动化。',
      'exp.ifx.b2': '设计并优化带校验与错误处理的 ETL／数据仓库流程，显著提升数据可靠性与系统性能。',
      'exp.ifx.b3': '完成 SAP 数据迁移、去重、清洗与报表工作，使企业流程效率提升约 30%。',
      'exp.ifx.b4': '使用 C# .NET 增强前后端功能，从缺陷修复到完整功能发布。',
      'exp.ifx.b5': '担任软件发布经理（SRM）—— 每周通过 Jenkins 在 DEV、INT 与 PROD 环境执行 CI/CD 发布。',
      'exp.ifx.b6': '用 KNIME 工作流自动化重复工单，节省约 50% 的人工处理时间。',
      'exp.ifx.b7': '在 Remedy 中处理事件、在 Octane 中处理变更请求；使用 TFS／Azure DevOps 进行版本控制。',

      'exp.free.role': '网站开发 — 自由职业',
      'exp.free.company': '独立／客户项目',
      'exp.free.loc': '远程，马来西亚',
      'exp.free.summary': '为真实企业提供端到端网站服务 —— 设计、开发、部署、域名、SEO 与后续维护。',
      'exp.free.b1': '使用 Next.js 与 TypeScript 构建响应式高性能网站，通过 SSR 与 SSG 实现快速首屏。',
      'exp.free.b2': '部署于 Vercel 与 Cloudflare，配置 DNS、SSL 与 CDN，保障全球安全快速访问。',
      'exp.free.b3': '完整的 SEO 工作：元数据、结构化数据、Lighthouse 调优、懒加载、图片优化与 Google Search Console。',
      'exp.free.b4': '交付规则型聊天机器人，让访客即时获得产品答案，且无需后端成本。',
      'exp.free.b5': '直接与客户沟通需求，按约定的业务目标与时间节点交付。',

      'exp.aa.role': '数据科学家 — 学徒',
      'exp.aa.loc': '雪邦，马来西亚',
      'exp.aa.summary': '加入数据科学团队，预测机上餐食浪费并降低单次航班成本。',
      'exp.aa.b1': '构建 XGBoost 餐食浪费预测模型 —— 数据清洗、特征工程与超参数调优。',
      'exp.aa.b2': '使用 Google Cloud Platform 进行数据追踪、校验与流程监控。',
      'exp.aa.b3': '接受跨文化团队协作、沟通与向利益相关者汇报的专业训练。',

      'exp.tm.role': '数据科学实习生',
      'exp.tm.loc': '赛城，马来西亚',
      'exp.tm.summary': '网络分析 —— 把杂乱的电信数据转化为故障监控与服务质量洞察。',
      'exp.tm.b1': '清洗数千条接入网、终止日志、CTT 与测速记录，使数据质量提升 90%。',
      'exp.tm.b2': '构建随机森林回归与 LSTM 时间序列模型，以 80% 以上准确率预测网速下降与故障。',
      'exp.tm.b3': '用 Power BI 与 Python（Matplotlib／Seaborn）搭建看板，支持每周网络性能评审。',
      'exp.tm.b4': '通过 ETL 开发与严格测试，支持 OracleDB → MariaDB 的迁移。',
      'exp.tm.b5': '使用 Selenium Robot Framework 自动化数据提取，减少 60% 的人工工作量。',
      'exp.tm.b6': '主导内部监控平台的 Angular 前端开发与 REST API 集成；参与 Spring Boot 微服务开发。',
      'exp.tm.b7': '使用 Jira 与 GitLab 完成 8 个以上敏捷冲刺，并进行跨团队协作。',

      'skills.eyebrow': '技能',
      'skills.title': '我的工具箱。',
      'skills.lead': '这些是我真正在用的工具 —— 在办公室、在客户项目里，也在凌晨一点的个人项目里。',
      'skills.g1': '编程语言',
      'skills.g2': 'Web 与框架',
      'skills.g3': '数据科学与 AI',
      'skills.g4': '云与大数据',
      'skills.g5': '数据库',
      'skills.g6': '工具与分析',

      'proj.eyebrow': '项目',
      'proj.title': '我做过的东西。',
      "proj.lead": "客户网站、实用应用程序与企业工程。浏览精选作品并查看详细案例。",
      'proj.featured': '精选',
      'proj.client': '客户项目',
      'proj.case': '案例详情',
      "proj.viewAll": "浏览所有项目",
      'proj.p1.title': '企业主数据迁移与清洗',
      "proj.p1.desc": "在英飞凌使用 Oracle PL/SQL、SAP 和 KNIME 实现企业数据迁移、清洗与 ETL 流程。",
      'proj.p3.title': '乳腺癌预测 — HoverNet',
      "proj.p3.desc": "通过 Django 研究界面连接组织病理图像与 HoverNet，实现细胞核分割和分类。UKM 毕业设计。",
      'proj.p4.title': '实时口罩佩戴检测',
      "proj.p4.desc": "使用 YOLOv8、OpenCV 与 Flask 界面进行实时口罩检测，将摄像头输入分为三类。",
      'proj.p5.title': '网络故障与速率预测',
      "proj.p5.desc": "在 TM R&D 实习期间开发 Random Forest 和 LSTM 模型，用于网速与网络故障分析。",
      'proj.p6.title': 'Angular 与 REST API 平台',
      "proj.p6.desc": "包含令牌认证、产品管理与 REST API 集成的 Angular 应用。",

      'cert.eyebrow': '专业认证',
      'cert.title': '资格证书。',
      'cert.lead': '将鼠标悬停在卡片上可查看证书详情。全部可验证 —— 发证方提供链接的均已附上。',
      'cert.verify': '验证 →',
      'cert.c1.note': 'Power BI 中的建模、DAX、数据准备与报表设计。',
      'cert.c2.note': '核心数据概念、关系型与非关系型数据，以及 Azure 上的分析。',
      'cert.c3.note': '限时条件下的 React 组件、状态管理与 DOM 问题解决。',
      'cert.c4.note': '数据结构、算法与应用型问题解决能力测评。',
      'cert.c5.id': '连接查询 · 聚合 · 子查询',
      'cert.c5.note': '中级 SQL 测评，涵盖复杂连接、分组与嵌套查询。',
      'cert.c6.note': '应用分析课程 —— 数据建模与管理层报表。',
      'cert.c7.note': '数据科学行业学徒计划，涵盖专业沟通与团队协作。',
      'cert.awardsTitle': '奖项与参与',
      'cert.a1.t': '项目负责人 — SCHOOL@UKM 原型设计工作坊',
      'cert.a1.d': '为学生主讲 Figma + Bravo Studio 原型设计工作坊 · 2024',
      'cert.a2.t': '金奖 — 方队分列式',
      'cert.a2.d': 'UKM 院际运动会（SAF）· 2023',
      'cert.a3.t': '铜奖 — AR/VR 实境竞赛',
      'cert.a3.d': '移动应用开发俱乐部 · 2022',
      'cert.a4.t': '银奖 — IDIIC 国际挑战赛',
      'cert.a4.d': '国际数字创新与发明挑战赛 · 2021',

      'contact.eyebrow': '联系方式',
      'contact.title': '一起做点东西吧。',
      'contact.lead': '有职位、有项目，或只是想问问这个页面的代码？我的邮箱随时开放。',
      'contact.email': '邮箱',
      'contact.phone': '电话',
      'contact.location': '所在地',
      'contact.locationValue': '马来西亚马六甲 75460',
      'contact.findMe': '在线找到我',
      'contact.resume': '简历',
      'contact.note': '目前为全职软件工程师，同时接受 <strong>自由职业网站项目</strong> 与 <strong>数据工程机会</strong>。我通常在 24 小时内回复。',
      'contact.fName': '您的姓名',
      'contact.fNamePh': '张伟',
      'contact.fEmail': '电子邮箱',
      'contact.fEmailPh': 'you@company.com',
      'contact.fSubject': '主题',
      'contact.fSubjectPh': '网站合作咨询',
      'contact.fMsg': '留言',
      'contact.fMsgPh': '请简单说说这个项目或职位…',
      'contact.send': '发送消息',
      'contact.formHint': '这会打开您自己的邮件应用并自动填好内容 —— 不会有任何数据存到服务器上。',
      'contact.errName': '请填写您的姓名。',
      'contact.errEmail': '这个邮箱地址看起来不太对。',
      'contact.errMsg': '请先写一段简短的留言。',
      'contact.ok': '正在打开您的邮件应用…如果没有反应，请直接发信至 naqiudin73@gmail.com',

      'footer.tagline': '在马来西亚马六甲手工打造 —— 没有建站器，也没有模板。',

      'chat.title': '作品集助手',
      'chat.status': '规则驱动 · 始终在线',
      'chat.placeholder': '问问我的工作…',

      'page.eyebrow': '项目档案',
      'page.title': '每一个项目的完整细节。',
      "page.lead": "客户网站、应用程序、企业数据工程与机器学习：了解每个项目的需求、实现与工作内容。",
      'page.filterAll': '全部',
      'page.filterData': '数据工程',
      'page.filterMl': '机器学习',
      'page.filterWeb': '网站开发',
      'page.filterApp': '应用程序',
      'page.problem': '问题',
      'page.did': '我做了什么',
      'page.result': '结果',
      'page.stack': '技术栈',
      'page.gallery': '界面',
      'page.confidential': '内部企业系统 —— 无法分享截图，因此这里只描述实现思路。'
    }
  };


  /* ------------------------------------------------------------------------
     ENGINE
     ------------------------------------------------------------------------ */
  const STORAGE_KEY = 'nf-lang';
  const SUPPORTED   = ['en', 'ms', 'zh'];
  let current       = 'en';

  /** Look a key up, falling back to English then to the key itself. */
  function t(key, lang) {
    const l = lang || current;
    return (DICT[l] && DICT[l][key]) ?? DICT.en[key] ?? key;
  }

  /**
   * Walk the document and translate everything.
   * Values may contain small bits of HTML, so we use innerHTML when a '<'
   * is present and the safer textContent otherwise.
   */
  function apply(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const val = t(el.dataset.i18n, lang);
      if (typeof val !== 'string') return;             // skip arrays (hero.roles)
      // Label terjemahan mungkin berada dalam kajian kes English; tandakan bahasa label tepat.
      el.lang = lang === 'zh' ? 'zh-CN' : lang;
      // Anything containing a tag (<strong>) OR an entity (&amp;) must go through
      // innerHTML, otherwise textContent would print "&amp;" literally on screen.
      if (/[<&]/.test(val)) el.innerHTML = val;
      else el.textContent = val;
    });

    // Placeholders (inputs / textareas)
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const val = t(el.dataset.i18nPh, lang);
      if (typeof val === 'string') el.setAttribute('placeholder', val);
    });

    // Keep <html lang> honest — screen readers and Google both use it
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : lang);

    // Reflect the choice in the switcher UI
    const label = document.querySelector('.lang__current');
    if (label) label.textContent = lang.toUpperCase();
    document.querySelectorAll('.lang__menu [data-lang]').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.lang === lang);
    });
  }

  /** Public: change language, persist it and tell the rest of the app. */
  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = 'en';
    current = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* private mode */ }
    apply(lang);
    document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
  }

  /** Work out which language to start in: saved choice → browser → English. */
  function detect() {
    let saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    if (saved && SUPPORTED.includes(saved)) return saved;

    const nav = (navigator.language || 'en').toLowerCase();
    if (nav.startsWith('ms') || nav.startsWith('id')) return 'ms';
    if (nav.startsWith('zh')) return 'zh';
    return 'en';
  }

  /* ---- Wire up the switcher button + menu ---- */
  function initSwitcher() {
    const wrap = document.getElementById('lang-switch');
    if (!wrap) return;
    const btn = wrap.querySelector('.lang__btn');

    btn.addEventListener('click', e => {
      e.stopPropagation();
      const open = wrap.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });

    wrap.querySelectorAll('[data-lang]').forEach(opt => {
      opt.addEventListener('click', () => {
        setLang(opt.dataset.lang);
        wrap.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });

    // Click anywhere else (or press Escape) to close the menu
    document.addEventListener('click', () => {
      wrap.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') wrap.classList.remove('is-open');
    });
  }

  /* ---- Expose a tiny API for the other scripts ---- */
  window.I18N = {
    t,
    get lang() { return current; },
    setLang,
    /** hero.roles etc. are arrays — this returns them raw */
    list(key) {
      const v = t(key);
      return Array.isArray(v) ? v : [];
    }
  };

  /* ---- Boot ---- */
  function boot() {
    initSwitcher();
    setLang(detect());
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
