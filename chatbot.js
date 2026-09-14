/* ============================================================================
   chatbot.js — RULE-BASED PORTFOLIO ASSISTANT
   ============================================================================
   WHAT THIS IS
   ------------
   A small keyword-matching assistant. It is NOT connected to any AI service:
   there is no API key, no network request and no cost. Everything it can say
   is written in the INTENTS table below, in all three site languages.

   HOW IT DECIDES WHAT TO ANSWER
   -----------------------------
     1. The visitor's message is lower-cased and stripped of punctuation.
     2. Every intent scores a point for each of its keywords found in the text
        (longer keywords are worth more, so "power bi" beats a stray "bi").
     3. The highest-scoring intent wins. If nothing scores, the fallback runs.

   ADDING A NEW ANSWER
   -------------------
     Copy an existing block in INTENTS and give it:
       id       – a unique name
       kw       – array of trigger words (add Malay / Chinese words too)
       a        – { en, ms, zh } answer strings (simple HTML allowed)
       chips    – (optional) suggested follow-up intent ids
   ============================================================================ */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. THE KNOWLEDGE BASE
     ------------------------------------------------------------------------ */
  const INTENTS = [

    /* ---- Greetings ---- */
    {
      id: 'greeting',
      kw: ['hello', 'hi', 'hey', 'yo', 'good morning', 'good evening', 'good afternoon',
           'helo', 'hai', 'salam', 'assalamualaikum', 'apa khabar',
           '你好', '您好', '嗨', '哈罗'],
      a: {
        en: "Hey! 👋 I'm Naqiudin's portfolio assistant. I know his experience, projects, skills and how to reach him. What would you like to know?",
        ms: "Hai! 👋 Saya pembantu portfolio Naqiudin. Saya tahu pengalaman, projek, kemahiran dan cara menghubunginya. Apa yang anda ingin tahu?",
        zh: "你好！👋 我是 Naqiudin 的作品集助手，了解他的经历、项目、技能与联系方式。想了解什么呢？"
      },
      chips: ['experience', 'projects', 'skills', 'contact']
    },

    /* ---- Who is he / about ---- */
    {
      id: 'about',
      kw: ['who are you', 'who is', 'about', 'tell me about', 'introduce', 'yourself', 'background', 'summary', 'profile',
           'siapa', 'tentang', 'ceritakan', 'latar belakang', 'perkenalkan',
           '是谁', '介绍', '关于', '背景', '简介'],
      a: {
        en: "<strong>Muhammad Naqiudin Bin Noor Affandy</strong> — Software Engineer and L3 Master Data Solution Developer at <strong>Infineon Technologies</strong> in Melaka, Malaysia.<br><br>He keeps worldwide engineering databases accurate and fast using Oracle PL/SQL, ETL and C# .NET, and freelances as a Next.js web developer on the side. Graduated from UKM in 2025 with First Class Honours in Computer Science (Data Science), CGPA 3.70.",
        ms: "<strong>Muhammad Naqiudin Bin Noor Affandy</strong> — Jurutera Perisian dan L3 Master Data Solution Developer di <strong>Infineon Technologies</strong>, Melaka.<br><br>Beliau memastikan pangkalan data kejuruteraan seluruh dunia kekal tepat dan pantas menggunakan Oracle PL/SQL, ETL dan C# .NET, serta bekerja bebas sebagai pembangun web Next.js. Graduan UKM 2025, Ijazah Kelas Pertama Sains Komputer (Sains Data), PNGK 3.70.",
        zh: "<strong>Muhammad Naqiudin Bin Noor Affandy</strong> —— 马来西亚马六甲 <strong>英飞凌科技</strong> 的软件工程师兼 L3 主数据解决方案开发员。<br><br>他用 Oracle PL/SQL、ETL 与 C# .NET 保障全球工程数据库的准确与高效，同时以自由职业身份开发 Next.js 网站。2025 年毕业于 UKM，计算机科学（数据科学）一等荣誉，绩点 3.70。"
      },
      chips: ['experience', 'education', 'skills', 'contact']
    },

    /* ---- Work experience ---- */
    {
      id: 'experience',
      kw: ['experience', 'work', 'job', 'career', 'employment', 'worked', 'company', 'companies', 'where does he work', 'current role',
           'pengalaman', 'kerja', 'pekerjaan', 'jawatan', 'syarikat', 'kerjaya',
           '经历', '工作', '经验', '职位', '公司', '履历'],
      a: {
        en: "Two years of professional experience:<ul><li><strong>Infineon Technologies</strong> — Software Engineer, Master Data Developer (Jul 2025 → now)</li><li><strong>Freelance Web Developer</strong> — Next.js / TypeScript client sites (Sept 2025 → now)</li><li><strong>AirAsia</strong> — Data Scientist Apprentice, K-Youth Programme (Apr–Jun 2025)</li><li><strong>TM Research &amp; Development</strong> — Data Science Intern (Sept 2024 – Jan 2025)</li></ul>Ask me about any one of them for details.",
        ms: "Dua tahun pengalaman profesional:<ul><li><strong>Infineon Technologies</strong> — Jurutera Perisian, Pembangun Master Data (Jul 2025 → kini)</li><li><strong>Pembangun Web Bebas</strong> — laman Next.js / TypeScript (Sept 2025 → kini)</li><li><strong>AirAsia</strong> — Perantis Saintis Data, Program K-Youth (Apr–Jun 2025)</li><li><strong>TM Research &amp; Development</strong> — Pelatih Sains Data (Sept 2024 – Jan 2025)</li></ul>Tanya saya tentang mana-mana satu untuk butiran lanjut.",
        zh: "两年职业经历：<ul><li><strong>英飞凌科技</strong> —— 软件工程师、主数据开发（2025 年 7 月至今）</li><li><strong>自由职业网站开发</strong> —— Next.js / TypeScript 客户项目（2025 年 9 月至今）</li><li><strong>亚洲航空</strong> —— 数据科学学徒，K-Youth 计划（2025 年 4–6 月）</li><li><strong>TM 研发中心</strong> —— 数据科学实习生（2024 年 9 月 – 2025 年 1 月）</li></ul>想了解哪一段，随时问我。"
      },
      chips: ['infineon', 'freelance', 'projects', 'skills']
    },

    /* ---- Infineon specifically ---- */
    {
      id: 'infineon',
      kw: ['infineon', 'master data', 'current job', 'plsql', 'pl/sql', 'pl sql', 'oracle', 'sap', 'jenkins', 'release manager', 'etl',
           'kerja sekarang', 'data induk',
           '英飞凌', '主数据', '目前的工作'],
      a: {
        en: "At <strong>Infineon Technologies</strong> he is an L3 Master Data Solution Developer:<ul><li>Oracle PL/SQL packages, procedures and functions for patching, cleansing and restructuring</li><li>ETL and data-warehouse flows with validation and error handling</li><li>SAP data migration, de-duplication and reporting — ~30% smoother workflows</li><li>C# .NET backend and frontend enhancements</li><li>Software Release Manager for weekly Jenkins CI/CD releases (DEV / INT / PROD)</li><li>KNIME automation that cut repeat-ticket handling time by ~50%</li></ul>",
        ms: "Di <strong>Infineon Technologies</strong> beliau ialah L3 Master Data Solution Developer:<ul><li>Pakej, prosedur dan fungsi Oracle PL/SQL untuk penampalan, pembersihan dan penstrukturan semula</li><li>Aliran ETL dan gudang data dengan pengesahan serta pengendalian ralat</li><li>Migrasi data SAP, penyingkiran pendua dan pelaporan — aliran kerja ~30% lebih lancar</li><li>Penambahbaikan backend dan frontend C# .NET</li><li>Software Release Manager untuk pelepasan CI/CD Jenkins mingguan (DEV / INT / PROD)</li><li>Automasi KNIME yang mengurangkan masa tiket berulang ~50%</li></ul>",
        zh: "在 <strong>英飞凌科技</strong>，他担任 L3 主数据解决方案开发员：<ul><li>用 Oracle PL/SQL 编写程序包、存储过程与函数，处理修补、清洗与重构</li><li>带校验与错误处理的 ETL 与数据仓库流程</li><li>SAP 数据迁移、去重与报表 —— 流程效率提升约 30%</li><li>C# .NET 前后端功能增强</li><li>担任软件发布经理，负责每周 Jenkins CI/CD 发布（DEV / INT / PROD）</li><li>KNIME 自动化让重复工单处理时间减少约 50%</li></ul>"
      },
      chips: ['projects', 'skills', 'contact']
    },

    /* ---- Freelance / web work ---- */
    {
      id: 'freelance',
      kw: ['freelance', 'client', 'website for me', 'build me', 'nextjs', 'next.js', 'web developer', 'homestay', 'seo', 'vercel', 'wordpress',
           'bebas', 'laman web', 'buatkan', 'tempahan',
           '自由职业', '接单', '做网站', '外包'],
      a: {
        en: "Yes — he takes freelance web projects. Recent work includes <strong>Homestay Shimah Jay</strong>, a bilingual Next.js 16 booking site with per-house static pages, hreflang sitemaps, Google Search Console setup and a rule-based chatbot.<br><br>Typical stack: Next.js + TypeScript + Tailwind, deployed on Vercel or Cloudflare with the domain, DNS, SSL and SEO all handled. Email <a href='mailto:naqiudin73@gmail.com'>naqiudin73@gmail.com</a> to talk scope.",
        ms: "Ya — beliau menerima projek web bebas. Antara kerja terbaharu ialah <strong>Homestay Shimah Jay</strong>, laman tempahan dwibahasa Next.js 16 dengan halaman statik bagi setiap rumah, peta laman hreflang, persediaan Google Search Console dan chatbot berasaskan peraturan.<br><br>Teknologi biasa: Next.js + TypeScript + Tailwind, dihoskan di Vercel atau Cloudflare bersama domain, DNS, SSL dan SEO. E-mel <a href='mailto:naqiudin73@gmail.com'>naqiudin73@gmail.com</a> untuk berbincang.",
        zh: "可以 —— 他接自由职业的网站项目。近期作品包括 <strong>Homestay Shimah Jay</strong>：一个双语 Next.js 16 预订网站，含每套房源的静态页面、hreflang 站点地图、Google Search Console 配置与规则型聊天机器人。<br><br>常用技术：Next.js + TypeScript + Tailwind，部署在 Vercel 或 Cloudflare，域名、DNS、SSL 与 SEO 一并处理。欢迎邮件 <a href='mailto:naqiudin73@gmail.com'>naqiudin73@gmail.com</a> 洽谈。"
      },
      chips: ['contact', 'projects', 'skills']
    },

    /* ---- Skills ---- */
    {
      id: 'skills',
      kw: ['skill', 'skills', 'tech stack', 'stack', 'technology', 'technologies', 'tools', 'programming', 'language he', 'what can he do', 'expertise',
           'kemahiran', 'teknologi', 'alatan', 'bahasa pengaturcaraan', 'pakar',
           '技能', '技术栈', '会什么', '工具', '编程语言'],
      a: {
        en: "Main strengths:<ul><li><strong>Languages</strong> — Python, SQL / PL-SQL, C#, Java, TypeScript, JavaScript, PHP, R</li><li><strong>Web</strong> — Next.js, React, Angular, Node.js, Spring Boot, Django, Flask</li><li><strong>Data / AI</strong> — Scikit-Learn, TensorFlow, PyTorch, Pandas, OpenCV, YOLO, Selenium</li><li><strong>Cloud &amp; Big Data</strong> — Azure, Data Factory, Databricks, Fabric, KNIME, Hadoop, GCP</li><li><strong>Databases</strong> — OracleDB, MariaDB, SAP, MS Access</li><li><strong>Ops</strong> — Git, Jenkins, Azure DevOps, Jira, Remedy, Power BI</li></ul>",
        ms: "Kekuatan utama:<ul><li><strong>Bahasa</strong> — Python, SQL / PL-SQL, C#, Java, TypeScript, JavaScript, PHP, R</li><li><strong>Web</strong> — Next.js, React, Angular, Node.js, Spring Boot, Django, Flask</li><li><strong>Data / AI</strong> — Scikit-Learn, TensorFlow, PyTorch, Pandas, OpenCV, YOLO, Selenium</li><li><strong>Awan &amp; Data Raya</strong> — Azure, Data Factory, Databricks, Fabric, KNIME, Hadoop, GCP</li><li><strong>Pangkalan Data</strong> — OracleDB, MariaDB, SAP, MS Access</li><li><strong>Operasi</strong> — Git, Jenkins, Azure DevOps, Jira, Remedy, Power BI</li></ul>",
        zh: "主要能力：<ul><li><strong>语言</strong> —— Python、SQL / PL-SQL、C#、Java、TypeScript、JavaScript、PHP、R</li><li><strong>Web</strong> —— Next.js、React、Angular、Node.js、Spring Boot、Django、Flask</li><li><strong>数据 / AI</strong> —— Scikit-Learn、TensorFlow、PyTorch、Pandas、OpenCV、YOLO、Selenium</li><li><strong>云与大数据</strong> —— Azure、Data Factory、Databricks、Fabric、KNIME、Hadoop、GCP</li><li><strong>数据库</strong> —— OracleDB、MariaDB、SAP、MS Access</li><li><strong>工程运维</strong> —— Git、Jenkins、Azure DevOps、Jira、Remedy、Power BI</li></ul>"
      },
      chips: ['projects', 'certifications', 'experience']
    },

    /* ---- Projects ---- */
    {
      id: 'projects',
      kw: ['project', 'projects', 'portfolio', 'built', 'build', 'made', 'work sample', 'case study', 'github', 'repo',
           'projek', 'hasil kerja', 'contoh kerja', 'dibina',
           '项目', '作品', '案例', '做过', '代码库'],
      a: {
        en: "The projects are documented on the <a href='projects.html'>projects page</a>. Highlights:<ul><li><strong>Enterprise Master Data Migration</strong> — PL/SQL + ETL + SAP at Infineon</li><li><strong>Homestay Shimah Jay</strong> — bilingual Next.js 16 hospitality site</li><li><strong>Kambing Golek Melaka Official</strong> — catering website and event enquiries</li><li><strong>Breast Cancer Prediction</strong> — HoverNet deep learning, final year project</li><li><strong>Face Mask Detection</strong> — YOLOv8 + OpenCV + Flask, mAP50 0.905</li><li><strong>Network Fault Prediction</strong> — LSTM + Random Forest at TM R&amp;D</li><li><strong>Angular &amp; REST API platform</strong> — token auth + product CRUD</li></ul>",
        ms: "Projek didokumentasikan di <a href='projects.html'>halaman projek</a>. Sorotan:<ul><li><strong>Migrasi Master Data Perusahaan</strong> — PL/SQL + ETL + SAP di Infineon</li><li><strong>Homestay Shimah Jay</strong> — laman homestay dwibahasa Next.js 16</li><li><strong>Kambing Golek Melaka Official</strong> — laman katering dan pertanyaan majlis</li><li><strong>Ramalan Kanser Payudara</strong> — pembelajaran mendalam HoverNet, projek tahun akhir</li><li><strong>Pengesanan Pelitup Muka</strong> — YOLOv8 + OpenCV + Flask, mAP50 0.905</li><li><strong>Ramalan Kerosakan Rangkaian</strong> — LSTM + Random Forest di TM R&amp;D</li><li><strong>Platform Angular &amp; REST API</strong> — pengesahan token + CRUD produk</li></ul>",
        zh: "项目记录在 <a href='projects.html'>项目页面</a>。重点包括：<ul><li><strong>企业主数据迁移</strong> —— 英飞凌的 PL/SQL + ETL + SAP</li><li><strong>Homestay Shimah Jay</strong> —— 双语 Next.js 16 民宿网站</li><li><strong>Kambing Golek Melaka Official</strong> —— 餐饮与活动咨询网站</li><li><strong>乳腺癌预测</strong> —— HoverNet 深度学习毕业设计</li><li><strong>口罩检测</strong> —— YOLOv8 + OpenCV + Flask，mAP50 0.905</li><li><strong>网络故障预测</strong> —— TM 研发中心的 LSTM + 随机森林</li><li><strong>Angular 与 REST API 平台</strong> —— 令牌认证 + 产品增删改查</li></ul>"
      },
      chips: ['ml', 'infineon', 'freelance', 'contact']
    },

    /* ---- Machine learning / AI ---- */
    {
      id: 'ml',
      kw: ['machine learning', 'ml', 'ai', 'deep learning', 'model', 'yolo', 'lstm', 'xgboost', 'random forest', 'computer vision', 'data science', 'neural',
           'pembelajaran mesin', 'kecerdasan buatan', 'sains data',
           '机器学习', '人工智能', '深度学习', '模型', '数据科学'],
      a: {
        en: "Machine learning work so far:<ul><li><strong>HoverNet</strong> — nuclei segmentation + classification on the PanNuke histopathology dataset (final year project)</li><li><strong>YOLOv8 + OpenCV</strong> — real-time three-class face mask detection, mAP50 0.905</li><li><strong>LSTM &amp; Random Forest</strong> — network speed / fault forecasting at TM R&amp;D, 80%+ accuracy</li><li><strong>XGBoost</strong> — in-flight food waste prediction at AirAsia</li><li><strong>K-Means</strong> — mall customer segmentation</li><li><strong>NLP</strong> — tweet sentiment with Logistic Regression, Naive Bayes and SVM</li></ul>",
        ms: "Kerja pembelajaran mesin setakat ini:<ul><li><strong>HoverNet</strong> — segmentasi dan klasifikasi nukleus pada set data histopatologi PanNuke (projek tahun akhir)</li><li><strong>YOLOv8 + OpenCV</strong> — pengesanan pelitup muka tiga kelas masa nyata, mAP50 0.905</li><li><strong>LSTM &amp; Random Forest</strong> — ramalan kelajuan / kerosakan rangkaian di TM R&amp;D, ketepatan 80%+</li><li><strong>XGBoost</strong> — ramalan pembaziran makanan penerbangan di AirAsia</li><li><strong>K-Means</strong> — segmentasi pelanggan pusat beli-belah</li><li><strong>NLP</strong> — sentimen tweet dengan Logistic Regression, Naive Bayes dan SVM</li></ul>",
        zh: "目前的机器学习作品：<ul><li><strong>HoverNet</strong> —— PanNuke 组织病理数据集上的细胞核分割与分类（毕业设计）</li><li><strong>YOLOv8 + OpenCV</strong> —— 实时三类口罩检测，mAP50 0.905</li><li><strong>LSTM 与随机森林</strong> —— TM 研发中心的网速／故障预测，准确率 80% 以上</li><li><strong>XGBoost</strong> —— 亚洲航空的机上餐食浪费预测</li><li><strong>K-Means</strong> —— 商场客户细分</li><li><strong>NLP</strong> —— 用逻辑回归、朴素贝叶斯与 SVM 做推文情感分析</li></ul>"
      },
      chips: ['projects', 'skills', 'education']
    },

    /* ---- Education ---- */
    {
      id: 'education',
      kw: ['education', 'study', 'studied', 'university', 'degree', 'college', 'school', 'cgpa', 'gpa', 'graduate', 'ukm', 'matriculation',
           'pendidikan', 'belajar', 'universiti', 'ijazah', 'kolej', 'pngk', 'graduan',
           '教育', '学历', '大学', '学位', '绩点', '毕业'],
      a: {
        en: "<strong>Universiti Kebangsaan Malaysia (UKM)</strong>, 2021–2025<br>Bachelor of Computer Science (Hons) — Data Science<br>CGPA <strong>3.70</strong> · First Class Honours · Dean's List for 6 semesters<br><br>Before that: <strong>Malacca Matriculation College</strong> (2020–2021), Physical Science Module 2.",
        ms: "<strong>Universiti Kebangsaan Malaysia (UKM)</strong>, 2021–2025<br>Sarjana Muda Sains Komputer (Kepujian) — Sains Data<br>PNGK <strong>3.70</strong> · Ijazah Kelas Pertama · Anugerah Dekan 6 semester<br><br>Sebelum itu: <strong>Kolej Matrikulasi Melaka</strong> (2020–2021), Sains Fizikal Modul 2.",
        zh: "<strong>马来西亚国民大学（UKM）</strong>，2021–2025<br>计算机科学（荣誉）学士 —— 数据科学方向<br>绩点 <strong>3.70</strong> · 一等荣誉 · 连续 6 个学期院长优等生<br><br>此前：<strong>马六甲大学先修学院</strong>（2020–2021），物理科学第二单元。"
      },
      chips: ['certifications', 'experience', 'ml']
    },

    /* ---- Certifications ---- */
    {
      id: 'certifications',
      kw: ['certification', 'certificate', 'certified', 'credential', 'microsoft', 'hackerrank', 'azure', 'power bi', 'badge', 'award', 'achievement',
           'sijil', 'pensijilan', 'anugerah', 'pencapaian',
           '证书', '认证', '奖项', '成就'],
      a: {
        en: "Seven certifications:<ul><li>Microsoft Certified: <strong>Power BI Data Analyst Associate</strong> (2025)</li><li>Microsoft Certified: <strong>Azure Data Fundamentals</strong> (2025)</li><li>HackerRank: <strong>Frontend Developer (React)</strong> (2024)</li><li>HackerRank: <strong>Software Engineer Intern</strong> (2024)</li><li>HackerRank: <strong>SQL (Intermediate)</strong> (2024)</li><li>APU: <strong>Analyzing Data with Power BI</strong> (2025)</li><li>Khazanah <strong>K-Youth Employment Programme</strong> (2025)</li></ul>Plus awards: Gold (SAF march-past), Silver (IDIIC 2021), Bronze (AR/VR 2022).",
        ms: "Tujuh pensijilan:<ul><li>Microsoft Certified: <strong>Power BI Data Analyst Associate</strong> (2025)</li><li>Microsoft Certified: <strong>Azure Data Fundamentals</strong> (2025)</li><li>HackerRank: <strong>Frontend Developer (React)</strong> (2024)</li><li>HackerRank: <strong>Software Engineer Intern</strong> (2024)</li><li>HackerRank: <strong>SQL (Intermediate)</strong> (2024)</li><li>APU: <strong>Analyzing Data with Power BI</strong> (2025)</li><li>Khazanah <strong>K-Youth Employment Programme</strong> (2025)</li></ul>Anugerah: Emas (perbarisan SAF), Perak (IDIIC 2021), Gangsa (AR/VR 2022).",
        zh: "七项认证：<ul><li>Microsoft 认证：<strong>Power BI 数据分析师</strong>（2025）</li><li>Microsoft 认证：<strong>Azure 数据基础</strong>（2025）</li><li>HackerRank：<strong>前端开发（React）</strong>（2024）</li><li>HackerRank：<strong>软件工程实习生</strong>（2024）</li><li>HackerRank：<strong>SQL（中级）</strong>（2024）</li><li>APU：<strong>Power BI 数据分析</strong>（2025）</li><li>Khazanah <strong>K-Youth 就业计划</strong>（2025）</li></ul>另有奖项：金奖（SAF 分列式）、银奖（IDIIC 2021）、铜奖（AR/VR 2022）。"
      },
      chips: ['education', 'skills', 'contact']
    },

    /* ---- Contact ---- */
    {
      id: 'contact',
      kw: ['contact', 'email', 'reach', 'call', 'phone', 'whatsapp', 'linkedin', 'hire', 'talk', 'message', 'get in touch', 'connect',
           'hubungi', 'e-mel', 'emel', 'telefon', 'upah', 'berhubung',
           '联系', '邮箱', '电话', '微信', '合作', '联络'],
      a: {
        en: "Easiest ways to reach him:<ul><li>Email — <a href='mailto:naqiudin73@gmail.com'>naqiudin73@gmail.com</a></li><li>Phone / WhatsApp — <a href='https://wa.me/60176220665' target='_blank' rel='noopener'>+60 17-622 0665</a></li><li><a href='https://www.linkedin.com/in/naqiudin-fandy/' target='_blank' rel='noopener'>LinkedIn</a> · <a href='https://github.com/naqiudinfandy' target='_blank' rel='noopener'>GitHub</a></li></ul>Or use the form in the <a href='#contact'>Contact section</a>. He usually replies within 24 hours.",
        ms: "Cara termudah untuk menghubunginya:<ul><li>E-mel — <a href='mailto:naqiudin73@gmail.com'>naqiudin73@gmail.com</a></li><li>Telefon / WhatsApp — <a href='https://wa.me/60176220665' target='_blank' rel='noopener'>+60 17-622 0665</a></li><li><a href='https://www.linkedin.com/in/naqiudin-fandy/' target='_blank' rel='noopener'>LinkedIn</a> · <a href='https://github.com/naqiudinfandy' target='_blank' rel='noopener'>GitHub</a></li></ul>Atau gunakan borang di <a href='#contact'>bahagian Hubungi</a>. Beliau biasanya membalas dalam 24 jam.",
        zh: "最方便的联系方式：<ul><li>邮箱 —— <a href='mailto:naqiudin73@gmail.com'>naqiudin73@gmail.com</a></li><li>电话 / WhatsApp —— <a href='https://wa.me/60176220665' target='_blank' rel='noopener'>+60 17-622 0665</a></li><li><a href='https://www.linkedin.com/in/naqiudin-fandy/' target='_blank' rel='noopener'>LinkedIn</a> · <a href='https://github.com/naqiudinfandy' target='_blank' rel='noopener'>GitHub</a></li></ul>也可以用 <a href='#contact'>联系板块</a> 的表单。他通常在 24 小时内回复。"
      },
      chips: ['resume', 'availability', 'freelance']
    },

    /* ---- Resume ---- */
    {
      id: 'resume',
      kw: ['resume', 'cv', 'curriculum', 'download', 'pdf',
           'muat turun', 'salinan',
           '简历', '履历表', '下载'],
      a: {
        en: "The full CV is here: <a href='assets/resume/Muhammad-Naqiudin-Resume.pdf' target='_blank' rel='noopener'>Download the PDF →</a><br>It covers the same experience, education, certifications and skills you'll find on this page.",
        ms: "CV penuh ada di sini: <a href='assets/resume/Muhammad-Naqiudin-Resume.pdf' target='_blank' rel='noopener'>Muat turun PDF →</a><br>Ia merangkumi pengalaman, pendidikan, pensijilan dan kemahiran yang sama seperti di halaman ini.",
        zh: "完整简历在这里：<a href='assets/resume/Muhammad-Naqiudin-Resume.pdf' target='_blank' rel='noopener'>下载 PDF →</a><br>内容与本页面的经历、教育、认证与技能一致。"
      },
      chips: ['contact', 'experience', 'skills']
    },

    /* ---- Availability / rates ---- */
    {
      id: 'availability',
      kw: ['available', 'availability', 'open to work', 'looking for', 'hiring', 'vacancy', 'rate', 'price', 'cost', 'quote', 'budget', 'salary', 'notice period',
           'tersedia', 'terbuka', 'harga', 'kos', 'sebut harga', 'gaji',
           '有空', '接单吗', '价格', '报价', '预算', '薪资'],
      a: {
        en: "He is employed full-time at Infineon and <strong>open to freelance web projects</strong> plus <strong>data engineering opportunities</strong>.<br><br>Pricing depends on scope — a marketing site, an e-commerce build and a data pipeline are very different jobs. Send the requirements to <a href='mailto:naqiudin73@gmail.com'>naqiudin73@gmail.com</a> and you'll get an honest quote and timeline.",
        ms: "Beliau bekerja sepenuh masa di Infineon dan <strong>terbuka untuk projek web bebas</strong> serta <strong>peluang kejuruteraan data</strong>.<br><br>Harga bergantung pada skop — laman pemasaran, e-dagang dan saluran data adalah kerja yang sangat berbeza. Hantar keperluan anda ke <a href='mailto:naqiudin73@gmail.com'>naqiudin73@gmail.com</a> untuk sebut harga dan jadual yang jujur.",
        zh: "他目前在英飞凌全职工作，同时 <strong>接受自由职业网站项目</strong> 与 <strong>数据工程机会</strong>。<br><br>报价取决于范围 —— 营销站、电商站与数据管道是完全不同的工作量。把需求发到 <a href='mailto:naqiudin73@gmail.com'>naqiudin73@gmail.com</a>，会得到诚实的报价与时间安排。"
      },
      chips: ['contact', 'freelance', 'resume']
    },

    /* ---- Location ---- */
    {
      id: 'location',
      kw: ['where', 'location', 'based', 'live', 'city', 'country', 'melaka', 'malacca', 'malaysia', 'remote', 'relocate',
           'lokasi', 'tinggal', 'bandar', 'negara', 'berpindah',
           '在哪', '哪里', '城市', '国家', '远程'],
      a: {
        en: "Based in <strong>75460 Melaka, Malaysia</strong> 🇲🇾 — working on-site for Infineon and fully comfortable with remote collaboration for freelance work (he already works with clients remotely).",
        ms: "Berpangkalan di <strong>75460 Melaka, Malaysia</strong> 🇲🇾 — bekerja di lokasi untuk Infineon dan selesa sepenuhnya bekerja secara jarak jauh untuk kerja bebas (beliau sudah bekerja dengan pelanggan secara dalam talian).",
        zh: "常驻 <strong>马来西亚马六甲 75460</strong> 🇲🇾 —— 在英飞凌现场办公，自由职业项目完全可以远程协作（他已经在远程服务客户）。"
      },
      chips: ['contact', 'availability']
    },

    /* ---- Spoken languages ---- */
    {
      id: 'languages',
      kw: ['speak', 'language you speak', 'spoken', 'bahasa', 'malay', 'english', 'indonesia', 'multilingual',
           'bertutur', 'bahasa pertuturan',
           '语言', '会说', '说什么语言'],
      a: {
        en: "Spoken languages: <strong>Malay</strong> (native), <strong>English</strong> (full professional) and <strong>Indonesian</strong> (full professional).<br><br>This website itself is available in English, Bahasa Melayu and 中文 — use the globe button in the navigation bar.",
        ms: "Bahasa pertuturan: <strong>Melayu</strong> (ibunda), <strong>Inggeris</strong> (profesional penuh) dan <strong>Indonesia</strong> (profesional penuh).<br><br>Laman web ini sendiri tersedia dalam Bahasa Inggeris, Bahasa Melayu dan 中文 — gunakan butang glob di bar navigasi.",
        zh: "口语能力：<strong>马来语</strong>（母语）、<strong>英语</strong>（专业水平）、<strong>印尼语</strong>（专业水平）。<br><br>本网站本身提供英文、马来文与中文三种语言 —— 点击导航栏的地球按钮即可切换。"
      },
      chips: ['about', 'contact']
    },

    /* ---- How was this site built ---- */
    {
      id: 'site',
      kw: ['this site', 'this website', 'how did you build', 'built this', 'made this', 'source', 'animation', 'gsap', 'framer', 'code of this page', 'template',
           'laman ini', 'bina laman', 'animasi',
           '这个网站', '本站', '怎么做的', '动画'],
      a: {
        en: "Hand-written — no page builder and no template:<ul><li>Plain <strong>HTML + CSS + vanilla JavaScript</strong>, no build step</li><li><strong>GSAP + ScrollTrigger</strong> for scroll-driven animation and parallax</li><li><strong>Motion One</strong> (the vanilla sibling of Framer Motion) for UI transitions</li><li>Liquid-glass surfaces with <code>backdrop-filter</code> and a mouse-tracked specular highlight</li><li>A canvas particle field, a custom cursor, 3D tilt cards and this rule-based chatbot</li></ul>The source lives on <a href='https://github.com/naqiudinfandy' target='_blank' rel='noopener'>GitHub</a>.",
        ms: "Ditulis sendiri — tanpa pembina halaman dan tanpa templat:<ul><li><strong>HTML + CSS + JavaScript tulen</strong>, tiada langkah binaan</li><li><strong>GSAP + ScrollTrigger</strong> untuk animasi tatal dan paralaks</li><li><strong>Motion One</strong> (versi vanila Framer Motion) untuk peralihan UI</li><li>Permukaan kaca cecair dengan <code>backdrop-filter</code> dan sorotan mengikut tetikus</li><li>Medan zarah kanvas, kursor tersuai, kad 3D dan chatbot berasaskan peraturan ini</li></ul>Kod sumber ada di <a href='https://github.com/naqiudinfandy' target='_blank' rel='noopener'>GitHub</a>.",
        zh: "全部手写 —— 没有建站器，也没有模板：<ul><li>纯 <strong>HTML + CSS + 原生 JavaScript</strong>，无需构建步骤</li><li><strong>GSAP + ScrollTrigger</strong> 实现滚动动画与视差</li><li><strong>Motion One</strong>（Framer Motion 的原生 JS 版本）负责界面过渡</li><li>用 <code>backdrop-filter</code> 与跟随鼠标的高光实现液态玻璃质感</li><li>Canvas 粒子背景、自定义光标、3D 倾斜卡片，以及这个规则型聊天机器人</li></ul>源码在 <a href='https://github.com/naqiudinfandy' target='_blank' rel='noopener'>GitHub</a>。"
      },
      chips: ['skills', 'projects', 'contact']
    },

    /* ---- Databases / SQL ---- */
    {
      id: 'database',
      kw: ['database', 'sql', 'query', 'mariadb', 'mysql', 'data warehouse', 'migration', 'data quality', 'data engineering',
           'pangkalan data', 'kualiti data', 'migrasi',
           '数据库', '查询', '数据仓库', '数据迁移', '数据质量'],
      a: {
        en: "Database work is his core strength:<ul><li><strong>OracleDB / PL-SQL</strong> — packages, procedures, functions, patching and performance tuning at Infineon</li><li><strong>ETL &amp; data warehousing</strong> — validation, error handling, reconciliation</li><li><strong>SAP</strong> — migration, de-duplication, cleansing, reporting</li><li><strong>MariaDB / MySQL</strong> — supported an OracleDB → MariaDB migration at TM R&amp;D</li><li><strong>KNIME</strong> — automating repetitive data patching and preparation</li></ul>",
        ms: "Kerja pangkalan data ialah kekuatan terasnya:<ul><li><strong>OracleDB / PL-SQL</strong> — pakej, prosedur, fungsi, penampalan dan penalaan prestasi di Infineon</li><li><strong>ETL &amp; gudang data</strong> — pengesahan, pengendalian ralat, penyesuaian</li><li><strong>SAP</strong> — migrasi, penyingkiran pendua, pembersihan, pelaporan</li><li><strong>MariaDB / MySQL</strong> — menyokong migrasi OracleDB → MariaDB di TM R&amp;D</li><li><strong>KNIME</strong> — mengautomasikan penampalan dan penyediaan data berulang</li></ul>",
        zh: "数据库是他的核心强项：<ul><li><strong>OracleDB / PL-SQL</strong> —— 英飞凌的程序包、存储过程、函数、数据修补与性能调优</li><li><strong>ETL 与数据仓库</strong> —— 校验、错误处理、对账</li><li><strong>SAP</strong> —— 迁移、去重、清洗、报表</li><li><strong>MariaDB / MySQL</strong> —— 在 TM 研发中心支持 OracleDB → MariaDB 迁移</li><li><strong>KNIME</strong> —— 自动化重复的数据修补与准备工作</li></ul>"
      },
      chips: ['infineon', 'projects', 'skills']
    },

    /* ---- Thanks ---- */
    {
      id: 'thanks',
      kw: ['thanks', 'thank you', 'thx', 'nice', 'cool', 'awesome', 'great', 'good job', 'impressive',
           'terima kasih', 'bagus', 'hebat', 'cantik',
           '谢谢', '感谢', '不错', '很棒', '厉害'],
      a: {
        en: "Glad it helped! 🙌 If you'd like to take this further, the <a href='#contact'>contact section</a> is right there.",
        ms: "Gembira dapat membantu! 🙌 Jika anda ingin teruskan, <a href='#contact'>bahagian hubungi</a> ada di bawah.",
        zh: "很高兴能帮到你！🙌 想进一步聊聊的话，<a href='#contact'>联系板块</a> 就在下面。"
      },
      chips: ['contact', 'resume', 'projects']
    },

    /* ---- Goodbye ---- */
    {
      id: 'bye',
      kw: ['bye', 'goodbye', 'see you', 'later', 'cya',
           'selamat tinggal', 'jumpa lagi',
           '再见', '拜拜', '回头见'],
      a: {
        en: "Thanks for stopping by — enjoy the rest of the page! 👋",
        ms: "Terima kasih kerana singgah — selamat meneroka halaman ini! 👋",
        zh: "感谢来访 —— 慢慢逛！👋"
      },
      chips: ['projects', 'contact']
    }
  ];

  /* Gabungkan fakta projek yang disemak dengan rekod pengalaman sedia ada. */
  INTENTS.unshift(...(window.PORTFOLIO_KNOWLEDGE || []));

  /* Labels shown on the suggestion chips, per intent, per language */
  const CHIP_LABEL = {
    homestay: { en: 'Homestay project', ms: 'Projek Homestay', zh: '民宿项目' },
    kgom: { en: 'Kambing Golek project', ms: 'Projek Kambing Golek', zh: '烤羊网站项目' },
    pricing: { en: 'Pricing & scope', ms: 'Harga & skop', zh: '价格与范围' },
    timeline: { en: 'Project timeline', ms: 'Tempoh projek', zh: '项目工期' },
    process: { en: 'How to get started', ms: 'Cara mulakan projek', zh: '如何开始' },
    applications: { en: 'Application projects', ms: 'Projek aplikasi', zh: '应用项目' },
    design: { en: 'UI/UX & mobile', ms: 'UI/UX & mobile', zh: '界面与移动端' },
    versions: { en: 'Portfolio versions', ms: 'Versi portfolio', zh: '作品集版本' },
    seo: { en: 'SEO approach', ms: 'Pendekatan SEO', zh: 'SEO 方法' },
    support: { en: 'Hosting & support', ms: 'Hosting & sokongan', zh: '托管与支持' },
    hiring: { en: 'Hire Naqiudin', ms: 'Peluang kerjaya', zh: '招聘合作' },
    about:          { en: 'Who is he?',        ms: 'Siapa dia?',         zh: '他是谁？' },
    experience:     { en: 'Work experience',   ms: 'Pengalaman kerja',   zh: '工作经历' },
    infineon:       { en: 'Infineon role',     ms: 'Peranan Infineon',   zh: '英飞凌工作' },
    freelance:      { en: 'Freelance work',    ms: 'Kerja bebas',        zh: '自由职业' },
    skills:         { en: 'Tech stack',        ms: 'Kemahiran',          zh: '技术栈' },
    projects:       { en: 'Projects',          ms: 'Projek',             zh: '项目' },
    ml:             { en: 'ML & AI work',      ms: 'Kerja ML & AI',      zh: '机器学习' },
    education:      { en: 'Education',         ms: 'Pendidikan',         zh: '教育背景' },
    certifications: { en: 'Certifications',    ms: 'Pensijilan',         zh: '证书' },
    contact:        { en: 'Contact',           ms: 'Hubungi',            zh: '联系方式' },
    resume:         { en: 'Download CV',       ms: 'Muat turun CV',      zh: '下载简历' },
    availability:   { en: 'Available for work?',ms: 'Terbuka bekerja?',  zh: '是否接单？' },
    location:       { en: 'Where is he?',      ms: 'Di mana?',           zh: '在哪里？' },
    languages:      { en: 'Languages spoken',  ms: 'Bahasa dituturkan',  zh: '语言能力' },
    site:           { en: 'How was this built?',ms: 'Cara laman dibina', zh: '网站怎么做的' },
    database:       { en: 'Database work',     ms: 'Kerja pangkalan data', zh: '数据库经验' }
  };

  /* Opening message + the fallback when nothing matches */
  const GREETING = {
    en: "Hi! 👋 I'm a rule-based assistant — no AI service behind me, just a well-organised answer sheet about Naqiudin's work. Pick a topic or type your own question.",
    ms: "Hai! 👋 Saya pembantu berasaskan peraturan — tiada perkhidmatan AI di belakang saya, hanya senarai jawapan tersusun tentang kerja Naqiudin. Pilih topik atau taip soalan anda.",
    zh: "你好！👋 我是一个规则驱动的助手 —— 背后没有任何 AI 服务，只有一份关于 Naqiudin 工作的整理好的答案表。选个话题，或直接提问。"
  };
  const FALLBACK = {
    en: "I don't have a rule for that one yet. I'm best at questions about his <strong>experience</strong>, <strong>projects</strong>, <strong>skills</strong>, <strong>education</strong>, <strong>certifications</strong> and <strong>contact details</strong>. For anything else, email <a href='mailto:naqiudin73@gmail.com'>naqiudin73@gmail.com</a> — a real human answers there.",
    ms: "Saya belum ada peraturan untuk soalan itu. Saya paling mahir tentang <strong>pengalaman</strong>, <strong>projek</strong>, <strong>kemahiran</strong>, <strong>pendidikan</strong>, <strong>pensijilan</strong> dan <strong>maklumat hubungan</strong>. Untuk yang lain, e-mel <a href='mailto:naqiudin73@gmail.com'>naqiudin73@gmail.com</a> — manusia sebenar akan menjawab.",
    zh: "这个问题我还没有对应的规则。我最擅长回答关于他的 <strong>工作经历</strong>、<strong>项目</strong>、<strong>技能</strong>、<strong>教育</strong>、<strong>证书</strong> 与 <strong>联系方式</strong>。其他问题欢迎发邮件到 <a href='mailto:naqiudin73@gmail.com'>naqiudin73@gmail.com</a> —— 会有真人回复。"
  };
  const DEFAULT_CHIPS = ['homestay', 'kgom', 'applications', 'hiring'];



  /* Pendawaian UI: mesej pelawat sentiasa teks; hanya jawapan tempatan
     yang dikarang di atas dibenarkan sebagai HTML. Timer dibersihkan apabila
     bahasa berubah supaya jawapan bahasa lama tidak muncul kemudian. */
  let els = {};
  let started = false;
  let pending = false;
  let replyTimer;
  const assistant = window.createPortfolioAssistant(INTENTS);

  /** Bahasa jawapan mengikut pilihan bahasa laman yang aktif. */
  function lang() { return (window.I18N && window.I18N.lang) || 'en'; }

  /** Tambah gelembung; `who=me` menggunakan textContent untuk mengelakkan suntikan HTML. */
  function say(content, who) {
    const div = document.createElement('div');
    div.className = 'msg msg--' + who;
    if (who === 'me') div.textContent = content;
    else div.innerHTML = content;
    els.log.appendChild(div);
    // Had memori DOM untuk sesi panjang, tanpa menyimpan chat dalam storage.
    while (els.log.children.length > 80) els.log.firstElementChild.remove();
    els.log.scrollTop = els.log.scrollHeight;
    return div;
  }

  /** Elak susunan balasan bercampur akibat submit atau chip berulang. */
  function setPending(value) {
    pending = value;
    els.input.readOnly = value;
    els.form.querySelector('button').disabled = value;
    els.chips.querySelectorAll('button').forEach(b => { b.disabled = value; });
    els.log.setAttribute('aria-busy', String(value));
  }

  /** Handoff membawa soalan asal secara URL-encoded; pengguna sendiri menghantar mesej. */
  function handoff(question) {
    const labels = { en: 'Discuss this with Naqiudin on WhatsApp ↗', ms: 'Bincang dengan Naqiudin di WhatsApp ↗', zh: '通过 WhatsApp 联系 Naqiudin ↗' };
    const intros = { en: 'Hi Naqiudin, I saw your portfolio. My question: ', ms: 'Hai Naqiudin, saya sudah lihat portfolio anda. Soalan saya: ', zh: '你好 Naqiudin，我看过你的作品集。我的问题：' };
    const href = 'https://wa.me/60176220665?text=' + encodeURIComponent(intros[lang()] + question);
    return '<a class="chat__handoff" href="' + href + '" target="_blank" rel="noopener noreferrer">' + labels[lang()] + '</a>';
  }

  /** Paparkan indikator ringkas, kemudian jawapan dalam urutan yang sama. */
  function botReply(html, chips) {
    setPending(true);
    const typing = say('<i></i><i></i><i></i>', 'bot');
    typing.classList.add('msg--typing');
    replyTimer = setTimeout(() => {
      typing.remove();
      say(html, 'bot');
      setPending(false);
      renderChips(chips);
    }, 420);
  }

  /** Chip memberi soalan susulan yang berkaitan dengan topik semasa. */
  function renderChips(ids) {
    els.chips.replaceChildren();
    (ids && ids.length ? ids : DEFAULT_CHIPS).slice(0, 4).forEach(id => {
      const label = CHIP_LABEL[id] && (CHIP_LABEL[id][lang()] || CHIP_LABEL[id].en);
      if (!label) return;
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.disabled = pending;
      b.addEventListener('click', () => {
        if (pending) return;
        const intent = INTENTS.find(i => i.id === id);
        say(label, 'me');
        assistant.remember(id);
        botReply((intent ? intent.a[lang()] || intent.a.en : FALLBACK[lang()]) + handoff(label), intent ? intent.chips : DEFAULT_CHIPS);
      });
      els.chips.appendChild(b);
    });
  }

  /** Satu soalan boleh merangkumi projek dan topik komersial serentak. */
  function handle(value) {
    const text = value.trim().slice(0, 1000);
    if (!text || pending) return;
    say(text, 'me');
    const matches = assistant.resolve(text);
    const html = matches.length ? matches.map(i => i.a[lang()] || i.a.en).join('<hr>') : FALLBACK[lang()] || FALLBACK.en;
    botReply(html + handoff(text), matches.length ? matches[0].chips : DEFAULT_CHIPS);
    els.input.value = '';
  }

  /** Buka panel tanpa memaksa papan kekunci telefon menutup kandungan awal. */
  function openChat() {
    els.panel.inert = false;
    els.panel.classList.add('is-open');
    els.panel.setAttribute('aria-hidden', 'false');
    els.fab.classList.add('is-open', 'was-opened');
    els.fab.setAttribute('aria-expanded', 'true');
    if (!started) {
      started = true;
      say(GREETING[lang()] || GREETING.en, 'bot');
      renderChips(DEFAULT_CHIPS);
    }
    els.close.focus({ preventScroll: true });
  }

  /** Fokus dipulangkan kepada pencetus; kandungan tertutup tidak boleh ditab. */
  function closeChat() {
    els.panel.classList.remove('is-open');
    els.panel.setAttribute('aria-hidden', 'true');
    els.fab.classList.remove('is-open');
    els.fab.setAttribute('aria-expanded', 'false');
    els.fab.focus({ preventScroll: true });
    els.panel.inert = true;
  }

  /** Ketinggian sebenar kawasan pelayar, termasuk perubahan papan kekunci iOS/Android. */
  function syncViewport() {
    const viewport = window.visualViewport;
    if (!viewport) return;
    els.panel.style.setProperty('--chat-vh', viewport.height + 'px');
    els.panel.style.setProperty('--chat-top', viewport.offsetTop + 'px');
    els.panel.classList.toggle('is-keyboard', viewport.height < window.innerHeight * .78);
  }

  function init() {
    els = {
      fab: document.getElementById('chat-fab'), panel: document.getElementById('chat-panel'),
      close: document.getElementById('chat-close'), log: document.getElementById('chat-log'),
      chips: document.getElementById('chat-chips'), form: document.getElementById('chat-form'),
      input: document.getElementById('chat-text')
    };
    if (!els.fab || !els.panel) return;
    els.panel.inert = true;
    els.input.maxLength = 1000;
    els.fab.addEventListener('click', () => els.panel.classList.contains('is-open') ? closeChat() : openChat());
    els.close.addEventListener('click', closeChat);
    els.form.addEventListener('submit', e => { e.preventDefault(); handle(els.input.value); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && els.panel.classList.contains('is-open')) closeChat();
    });
    document.addEventListener('languagechange', () => {
      clearTimeout(replyTimer);
      assistant.reset();
      setPending(false);
      els.log.replaceChildren();
      els.input.value = '';
      if (started) { say(GREETING[lang()] || GREETING.en, 'bot'); renderChips(DEFAULT_CHIPS); }
    });
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', syncViewport);
      window.visualViewport.addEventListener('scroll', syncViewport);
      syncViewport();
    }
    // Pembersihan apabila dokumen ditutup; pendengar kekal sah dalam bfcache.
    window.addEventListener('pagehide', () => {
      clearTimeout(replyTimer);
      els.log.querySelectorAll('.msg--typing').forEach(el => el.remove());
      setPending(false);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
