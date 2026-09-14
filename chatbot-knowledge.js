/* Fakta tambahan untuk pembantu portfolio. Tiada API, kunci rahsia atau data tetamu.
   Jawapan dikarang daripada repo portfolio dan dua projek freelance; EN/BM/ZH
   dikekalkan bersama supaya pertukaran bahasa tidak menukar fakta. */
(function () {
  'use strict';
  /* Setiap rekod: id untuk konteks, kw untuk padanan kata penuh, a untuk jawapan
     HTML yang dipercayai dan chips untuk cadangan susulan. */
  window.PORTFOLIO_KNOWLEDGE = [
    {
      id: 'homestay', kw: ['homestay', 'shimah', 'shimah jay', '民宿'],
      a: {
        en: '<strong>Homestay Shimah Jay</strong> is a freelance hospitality website for eight family homestays in Melaka.<ul><li><strong>Technology:</strong> Next.js 16 App Router, React 19, TypeScript and Tailwind CSS v4.</li><li><strong>UI/UX:</strong> responsive house cards, photo galleries, individual house pages and clear enquiry links.</li><li><strong>Engineering:</strong> Malay at /, English at /en, canonical/hreflang metadata, sitemap and a rule-based guest assistant.</li><li><strong>Booking journey:</strong> WhatsApp and external booking platforms; no live availability database or payment checkout.</li></ul><a href="development.html#homestay">View the case study and desktop/mobile UI ↗</a>',
        ms: '<strong>Homestay Shimah Jay</strong> ialah projek laman web freelance untuk lapan homestay keluarga di Melaka.<ul><li><strong>Teknologi:</strong> Next.js 16 App Router, React 19, TypeScript dan Tailwind CSS v4.</li><li><strong>UI/UX:</strong> kad rumah responsif, galeri foto, halaman setiap rumah dan pautan pertanyaan yang jelas.</li><li><strong>Kejuruteraan:</strong> BM di /, English di /en, metadata canonical/hreflang, sitemap dan pembantu tetamu berasaskan peraturan.</li><li><strong>Tempahan:</strong> melalui WhatsApp dan platform luar; tiada pangkalan data kekosongan langsung atau checkout bayaran.</li></ul><a href="development.html#homestay">Lihat kajian kes dan UI desktop/mobile ↗</a>',
        zh: '<strong>Homestay Shimah Jay</strong> 是为马六甲八套家庭民宿开发的客户网站。<ul><li><strong>技术：</strong>Next.js 16 App Router、React 19、TypeScript、Tailwind CSS v4。</li><li><strong>UI/UX：</strong>响应式房源卡片、相册、独立房源页面与清晰的咨询入口。</li><li><strong>工程：</strong>马来语 /、英语 /en、canonical/hreflang、站点地图与规则型助手。</li><li><strong>预订：</strong>通过 WhatsApp 和外部平台；不包含实时空房数据库或支付结账。</li></ul><a href="development.html#homestay">查看案例与桌面／手机界面 ↗</a>'
      }, chips: ['kgom', 'pricing', 'process', 'contact']
    },
    {
      id: 'kgom', kw: ['kambing', 'kambing golek', 'kgom', 'melaka official', '烤羊'],
      a: {
        en: '<strong>Kambing Golek Melaka Official</strong> is a freelance website for a Melaka catering business.<ul><li><strong>Technology:</strong> Next.js 16, React 19, TypeScript, Tailwind CSS v4, Motion and Lenis.</li><li><strong>Features:</strong> package listings and detail pages, a gallery, business information, FAQs and an event enquiry form.</li><li><strong>UI/UX:</strong> bold food photography, clear package presentation, responsive layouts and prominent WhatsApp calls to action.</li><li><strong>Enquiries:</strong> the form prepares event details for WhatsApp; the business confirms the quotation and booking.</li></ul><a href="development.html#kgom">Explore the technologies and actual UI ↗</a>',
        ms: '<strong>Kambing Golek Melaka Official</strong> ialah laman web freelance untuk perniagaan katering di Melaka.<ul><li><strong>Teknologi:</strong> Next.js 16, React 19, TypeScript, Tailwind CSS v4, Motion dan Lenis.</li><li><strong>Fungsi:</strong> senarai dan halaman pakej, galeri, maklumat perniagaan, FAQ serta borang pertanyaan majlis.</li><li><strong>UI/UX:</strong> foto makanan yang menonjol, pakej mudah dibanding, susun atur responsif dan butang WhatsApp yang jelas.</li><li><strong>Pertanyaan:</strong> borang menyediakan butiran majlis untuk WhatsApp; sebut harga dan tempahan disahkan oleh perniagaan.</li></ul><a href="development.html#kgom">Terokai teknologi dan UI sebenar ↗</a>',
        zh: '<strong>Kambing Golek Melaka Official</strong> 是为马六甲餐饮企业开发的网站。<ul><li><strong>技术：</strong>Next.js 16、React 19、TypeScript、Tailwind CSS v4、Motion、Lenis。</li><li><strong>功能：</strong>套餐列表与详情、相册、企业信息、常见问题和活动咨询表单。</li><li><strong>UI/UX：</strong>醒目的美食图片、清晰套餐与响应式布局。</li><li><strong>咨询：</strong>表单为 WhatsApp 准备活动信息，报价和预订由企业确认。</li></ul><a href="development.html#kgom">查看技术与真实界面 ↗</a>'
      }, chips: ['homestay', 'pricing', 'design', 'contact']
    },
    {
      id: 'pricing', kw: ['price', 'prices', 'pricing', 'rate', 'rates', 'cost', 'costs', 'quote', 'quotation', 'budget', 'payment', 'deposit', 'harga', 'harge', 'berapa', 'brape', 'bajet', 'bayaran', 'kos', 'sebut harga', '价格', '报价', '预算', '付款'],
      a: {
        en: 'There is no fixed price or deposit policy published in this portfolio. A quote needs the scope: <strong>website or application, page count, required features, content, integrations and target date</strong>. Domain, hosting and ongoing support should be discussed separately.<br><br>Share those details and your budget range with Naqiudin for a project-specific quote. I cannot confirm a price or accept payment.',
        ms: 'Portfolio ini tidak menetapkan harga tetap atau polisi deposit. Sebut harga memerlukan skop: <strong>laman web atau aplikasi, bilangan halaman, fungsi, kandungan, integrasi dan tarikh sasaran</strong>. Domain, hosting dan sokongan selepas siap perlu dibincangkan berasingan.<br><br>Hantar butiran itu bersama julat bajet kepada Naqiudin untuk sebut harga projek. Saya tidak boleh mengesahkan harga atau menerima bayaran.',
        zh: '作品集中没有固定价格或订金政策。报价需要明确<strong>网站或应用类型、页面数量、功能、内容、集成与目标日期</strong>。域名、托管和后续支持需另外讨论。请将需求与预算范围发给 Naqiudin；我无法确认价格或收款。'
      }, chips: ['process', 'timeline', 'contact']
    },
    {
      id: 'timeline', kw: ['timeline', 'deadline', 'duration', 'how long', 'when can', 'start date', 'urgent', 'berapa lama', 'bila siap', 'tempoh', 'tarikh siap', 'masa siap', '多久', '工期', '截止'],
      a: {
        en: 'A delivery date has to be agreed with Naqiudin after reviewing the scope and his schedule. Useful details are your launch date, page count, integrations, whether copy and images are ready, and who approves the design. I cannot promise a start date, turnaround or current availability.',
        ms: 'Tarikh siap perlu dipersetujui dengan Naqiudin selepas semakan skop dan jadual beliau. Nyatakan tarikh pelancaran, bilangan halaman, integrasi, status teks/foto serta siapa yang meluluskan reka bentuk. Saya tidak boleh menjanjikan tarikh mula, tempoh siap atau kekosongan jadual.',
        zh: '交付日期需由 Naqiudin 根据范围和日程确认。请提供目标上线时间、页面数量、集成要求、文字图片是否就绪以及设计审批人。我无法承诺开工日期、工期或当前档期。'
      }, chips: ['pricing', 'process', 'contact']
    },
    {
      id: 'process', kw: ['process', 'workflow', 'how to start', 'requirements', 'brief', 'proses', 'cara mula', 'langkah', 'keperluan', '流程', '开始', '需求'],
      a: {
        en: 'To start a project conversation, prepare:<ol><li>Your business and what visitors should do.</li><li>The pages, features and integrations you need.</li><li>Your logo, text, images and a few design references.</li><li>Your target date and budget range.</li></ol>Naqiudin can then discuss scope, design, implementation, testing and handover with you. Deliverables and terms are agreed directly for each project.',
        ms: 'Untuk memulakan perbincangan projek, sediakan:<ol><li>Perniagaan anda dan tindakan yang anda mahu pelawat lakukan.</li><li>Halaman, fungsi dan integrasi diperlukan.</li><li>Logo, teks, gambar dan contoh reka bentuk.</li><li>Tarikh sasaran dan julat bajet.</li></ol>Selepas itu, bincangkan skop, reka bentuk, pembangunan, ujian dan serahan bersama Naqiudin. Hasil serahan dan terma dipersetujui mengikut projek.',
        zh: '开始洽谈时，请准备：<ol><li>业务介绍与希望访客采取的行动。</li><li>所需页面、功能与集成。</li><li>标志、文字、图片与设计参考。</li><li>目标日期及预算范围。</li></ol>随后可与 Naqiudin 讨论范围、设计、开发、测试和交付。具体交付内容与条款按项目确认。'
      }, chips: ['pricing', 'timeline', 'contact']
    },
    {
      id: 'applications', kw: ['application', 'applications', 'app', 'apps', 'desktop', 'angular', 'django', 'vb.net', 'catalog', 'aplikasi', 'sistem', '应用', '桌面'],
      a: {
        en: 'Application work includes <strong>Angular with REST APIs</strong> (authentication and product CRUD), a <strong>PHP/MySQL product catalog</strong>, a <strong>VB.NET product/order desktop system</strong>, and a <strong>Django + HoverNet research interface</strong>. His enterprise experience also includes C# .NET enhancements and Oracle/ETL workflows.<br><br><a href="development.html#applications">See application examples ↗</a>. These examples do not establish a shipped native Android or iOS app; discuss any mobile app scope directly.',
        ms: 'Projek aplikasi merangkumi <strong>Angular dengan REST API</strong> (pengesahan dan CRUD produk), <strong>katalog PHP/MySQL</strong>, <strong>sistem desktop produk/pesanan VB.NET</strong> dan <strong>antara muka penyelidikan Django + HoverNet</strong>. Pengalaman perusahaan turut melibatkan penambahbaikan C# .NET dan aliran Oracle/ETL.<br><br><a href="development.html#applications">Lihat contoh aplikasi ↗</a>. Contoh ini tidak membuktikan aplikasi native Android atau iOS pernah dilancarkan; bincangkan skop aplikasi mobile secara terus.',
        zh: '应用项目包括 <strong>Angular + REST API</strong>（认证与产品管理）、<strong>PHP/MySQL 产品目录</strong>、<strong>VB.NET 产品／订单桌面系统</strong>及 <strong>Django + HoverNet 研究界面</strong>。企业经验还包含 C# .NET 与 Oracle/ETL。<br><a href="development.html#applications">查看应用案例 ↗</a>。这些案例不代表已发布原生 Android/iOS 应用，相关需求请直接讨论。'
      }, chips: ['skills', 'design', 'pricing', 'contact']
    },
    {
      id: 'design', kw: ['ui', 'ux', 'ui ux', 'ui/ux', 'design', 'responsive', 'mobile', 'android', 'iphone', 'ios', 'huawei', 'screenshot', 'screenshots', 'gambar', 'reka bentuk', 'telefon', '设计', '界面', '手机', '截图'],
      a: {
        en: 'The client case studies show <strong>actual desktop and mobile interfaces</strong>, with the reasoning behind layout, navigation, galleries and enquiry flows. Responsive layouts adapt to the browser viewport; touch targets, readable type and keyboard access are part of the implementation.<br><br><a href="development.html#client-work">View the UI/UX gallery ↗</a>. For a new project, share your brand assets and reference sites so the visual direction can be discussed.',
        ms: 'Kajian kes pelanggan memaparkan <strong>antara muka desktop dan mobile sebenar</strong>, bersama sebab pemilihan susun atur, navigasi, galeri dan aliran pertanyaan. Susun atur responsif mengikut saiz pelayar; sasaran sentuh, teks mudah dibaca dan akses papan kekunci turut diberi perhatian.<br><br><a href="development.html#client-work">Lihat galeri UI/UX ↗</a>. Untuk projek baharu, kongsi bahan jenama dan laman rujukan untuk berbincang tentang reka bentuk.',
        zh: '客户案例展示<strong>真实桌面与手机界面</strong>及布局、导航、相册和咨询流程的设计思路。响应式布局适应浏览器尺寸，并关注触控目标、字体可读性和键盘操作。<br><a href="development.html#client-work">查看 UI/UX 案例 ↗</a>。新项目可提供品牌素材与参考网站以讨论视觉方向。'
      }, chips: ['homestay', 'kgom', 'versions', 'contact']
    },
    {
      id: 'versions', kw: ['old portfolio', 'new portfolio', 'previous portfolio', 'version', 'versions', 'versi', 'portfolio lama', 'portfolio baru', 'portfolio baharu', '旧版', '版本'],
      a: {
        en: 'You can explore both designs: <a href="legacy/index.html">the previous portfolio ↗</a> and <a href="index.html">the current portfolio ↗</a>. They use HTML, CSS and JavaScript. <a href="development.html#portfolio-versions">Compare the previews here</a>. The previous design is preserved as an archive; the résumé link opens the current PDF.',
        ms: 'Anda boleh membuka kedua-dua reka bentuk: <a href="legacy/index.html">portfolio terdahulu ↗</a> dan <a href="index.html">portfolio terkini ↗</a>. Kedua-duanya menggunakan HTML, CSS dan JavaScript. <a href="development.html#portfolio-versions">Bandingkan preview di sini</a>. Reka bentuk lama disimpan sebagai arkib; pautan résumé membuka PDF semasa.',
        zh: '可以浏览<a href="legacy/index.html">旧版作品集 ↗</a>与<a href="index.html">当前作品集 ↗</a>，两者都使用 HTML、CSS 和 JavaScript。<a href="development.html#portfolio-versions">比较预览</a>。旧设计作为存档保留，简历链接指向当前 PDF。'
      }, chips: ['projects', 'site', 'contact']
    },
    {
      id: 'seo', kw: ['seo', 'google', 'search console', 'sitemap', 'ranking', 'rank', '搜索', '排名'],
      a: {
        en: 'His client website work includes page metadata, canonical URLs, sitemaps, structured data and image optimisation. Homestay also has language-specific URLs and hreflang. These support search discovery, but there is no guaranteed Google ranking or measured traffic uplift published here. Search Console, content and indexing should be reviewed against the actual site.',
        ms: 'Kerja laman web pelanggan meliputi metadata halaman, URL canonical, sitemap, data berstruktur dan pengoptimuman gambar. Homestay juga mempunyai URL bahasa dan hreflang. Semua ini membantu penemuan carian, tetapi tiada jaminan kedudukan Google atau peningkatan trafik terukur diterbitkan di sini. Search Console, kandungan dan pengindeksan perlu disemak berdasarkan laman sebenar.',
        zh: '客户网站包含页面元数据、canonical URL、站点地图、结构化数据和图片优化。民宿网站还包含分语言 URL 与 hreflang。这些支持搜索发现，但此处未发布排名保证或经测量的流量增幅，需结合实际网站检查。'
      }, chips: ['homestay', 'kgom', 'contact']
    },
    {
      id: 'support', kw: ['hosting', 'domain', 'maintenance', 'support', 'handover', 'source code', 'cms', 'update content', 'penyelenggaraan', 'sokongan', 'serahan', 'kemas kini', '域名', '维护', '托管', '源码'],
      a: {
        en: 'His freelance experience includes Vercel/Cloudflare deployment workflows, domain and DNS configuration, SSL and Git-based source control. For your project, agree who owns the accounts, what source code and documentation are handed over, and whether content updates, CMS access or maintenance are included. No fixed support period or maintenance fee is published here.',
        ms: 'Pengalaman freelance beliau meliputi aliran deployment Vercel/Cloudflare, domain, DNS, SSL dan kawalan versi Git. Untuk projek anda, persetujui pemilikan akaun, kod sumber dan dokumentasi yang diserahkan, serta sama ada kemas kini kandungan, CMS atau penyelenggaraan termasuk dalam skop. Tiada tempoh sokongan atau fi penyelenggaraan tetap diterbitkan di sini.',
        zh: '自由职业经验包含 Vercel/Cloudflare 部署流程、域名、DNS、SSL 和 Git。请在项目中约定账号归属、源码和文档交付，以及内容更新、CMS 或维护是否在范围内。此处没有固定支持期限或维护费。'
      }, chips: ['process', 'pricing', 'contact']
    },
    {
      id: 'hiring', kw: ['hire', 'hiring', 'full time', 'full-time', 'recruiter', 'recruitment', 'career', 'role', 'job', 'salary', 'notice period', 'gaji', 'jawatan', 'sepenuh masa', 'kerjaya', 'tempoh notis', '招聘', '全职', '薪资'],
      a: {
        en: 'Naqiudin welcomes conversations about freelance work and full-time roles. His profile combines <strong>software engineering, enterprise data development and web development</strong>, with experience at Infineon, TM R&D and AirAsia.<br><br><a href="assets/resume/Muhammad-Naqiudin-Resume.pdf" target="_blank" rel="noopener">Read the current résumé ↗</a>. Send the job description, location or remote arrangement and compensation range. Salary expectations, notice period and start date must be confirmed directly.',
        ms: 'Naqiudin terbuka untuk berbincang tentang kerja freelance dan jawatan sepenuh masa. Profil beliau menggabungkan <strong>kejuruteraan perisian, pembangunan data perusahaan dan pembangunan web</strong>, dengan pengalaman di Infineon, TM R&D dan AirAsia.<br><br><a href="assets/resume/Muhammad-Naqiudin-Resume.pdf" target="_blank" rel="noopener">Baca résumé terkini ↗</a>. Hantar deskripsi jawatan, lokasi atau aturan remote dan julat gaji. Jangkaan gaji, tempoh notis dan tarikh mula perlu disahkan terus.',
        zh: 'Naqiudin 欢迎自由职业合作与全职职位洽谈。他结合<strong>软件工程、企业数据开发与网站开发</strong>经验，曾在 Infineon、TM R&D 和 AirAsia 工作。<br><a href="assets/resume/Muhammad-Naqiudin-Resume.pdf" target="_blank" rel="noopener">查看当前简历 ↗</a>。请提供职位说明、地点或远程安排与薪资范围。期望薪资、通知期和入职时间需直接确认。'
      }, chips: ['experience', 'resume', 'skills', 'contact']
    }
  ];

  /* Enjin tulen supaya padanan dan konteks boleh diuji tanpa membuka pelayar.
     `intents` ialah jadual fakta; konteks hanya hidup dalam sesi panel semasa. */
  window.createPortfolioAssistant = function (intents) {
    let projectContext = null;
    const projectIds = ['homestay', 'kgom'];
    const serviceIds = ['pricing', 'timeline', 'process', 'support', 'hiring', 'seo'];
    /** Seragamkan tanda baca/slang tanpa memadankan cebisan kata seperti hi dalam hiring. */
    function normalise(value) {
      return String(value).normalize('NFKC').toLowerCase()
        .replace(/[^\p{L}\p{N}+#]+/gu, ' ').replace(/\s+/g, ' ').trim();
    }
    /** Pulangkan sehingga tiga topik berkaitan; nama projek diberi keutamaan. */
    function resolve(message) {
      const text = normalise(message).slice(0, 1000);
      const ranked = intents.map(intent => {
        const matches = [...new Set(intent.kw.map(normalise))].filter(key =>
          /[一-鿿]/u.test(key) ? text.includes(key) : (' ' + text + ' ').includes(' ' + key + ' '));
        return { intent, score: matches.length ? Math.max(...matches.map(k => k.length)) + (matches.length - 1) : 0 };
      }).filter(row => row.score >= 2).sort((a, b) => b.score - a.score);
      const named = ranked.filter(row => projectIds.includes(row.intent.id));
      const service = ranked.filter(row => serviceIds.includes(row.intent.id));
      let selected;
      if (named.length) {
        projectContext = named.length === 1 ? named[0].intent.id : null;
        selected = [...named, ...service];
      } else if (projectContext && /\b(stack|technolog\w*|skills?|features?|screenshots?|ui|ux|teknologi|kemahiran|fungsi|gambar|details?|butiran|more|lagi)\b|技术|界面|更多/u.test(text)) {
        selected = [{ intent: intents.find(i => i.id === projectContext) }, ...service];
      } else {
        selected = [...service];
        const primary = ranked.find(row => !serviceIds.includes(row.intent.id));
        if (primary && (!service.length || primary.score >= 7)) selected.push(primary);
        if (!selected.length && ranked.length) selected = [ranked[0]];
        if (primary && !['thanks', 'bye', 'greeting'].includes(primary.intent.id) && !service.length) projectContext = null;
      }
      const unique = [...new Map(selected.map(row => [row.intent.id, row.intent])).values()].slice(0, 3);
      return unique;
    }
    return { resolve, reset() { projectContext = null; }, remember(id) { projectContext = projectIds.includes(id) ? id : null; } };
  };
})();
