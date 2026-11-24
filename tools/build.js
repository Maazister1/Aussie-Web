// Generates the AussieWeb static HTML pages into the project folder.
const fs = require('fs');
const path = require('path');
const OUT = process.argv[2];

const A = '<i data-icon="arrow"></i>';
const FAV = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23FF6101' d='M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z'/%3E%3C/svg%3E";

function page({ file, title, desc, page = '', body, preloader = false }) {
  const R = file.includes('/') ? '../' : '';
  const html = `<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <link rel="icon" href="${FAV}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <!-- Fonts and colours live in their own files -->
  <link rel="stylesheet" href="${R}css/fonts.css">
  <link rel="stylesheet" href="${R}css/theme.css">
  <link rel="stylesheet" href="${R}css/style.css">
  <link rel="stylesheet" href="${R}css/animations.css">
</head>
<body data-root="${R}" data-page="${page}">
${preloader ? '  <div class="preloader"><div class="logo">aussie<em>web</em></div><div class="pl-bar"></div></div>\n' : ''}  <div id="site-header"></div>

  <main>
${body.replace(/\{R\}/g, R)}
  </main>

  <div id="site-footer"></div>

  <script src="${R}js/layout.js"></script>
  <script src="${R}js/packages.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/lenis@1.3.4/dist/lenis.min.js"></script>
  <script src="${R}js/main.js"></script>
</body>
</html>
`;
  const p = path.join(OUT, file);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, html);
  console.log('wrote', file);
}

/* ---------------- Shared blocks ---------------- */
const pageHero = ({ crumb, eyebrow, h1, lead, actions = true }) => `
    <section class="page-hero">
      <div class="grid-bg"></div><div class="blob blob--orange"></div>
      <div class="container hero-inner">
        ${crumb ? `<nav class="breadcrumb" data-hero>${crumb}</nav>` : ''}
        <span class="eyebrow" data-hero>${eyebrow}</span>
        <h1 data-split>${h1}</h1>
        <p class="lead" data-hero>${lead}</p>
        ${actions ? `<div class="hero-actions" data-hero>
          <a href="{R}contact.html" class="btn btn--primary btn--lg" data-magnetic>Start a project ${A}</a>
          <a href="{R}portfolio.html" class="btn btn--ghost btn--lg">See our work</a>
        </div>` : ''}
      </div>
    </section>`;

const ctaBand = (h = 'Ready to make your brand <span class="serif">fair dinkum</span> brilliant?') => `
    <section class="section section--tight">
      <div class="container">
        <div class="cta-band">
          <div class="blob blob--orange"></div><div class="blob blob--blue"></div>
          <span class="eyebrow">No worries, no pressure</span>
          <h2 data-split>${h}</h2>
          <p class="lead">Have a yarn with our team. We’ll come back within one business day with ideas, a timeline and a fixed quote.</p>
          <div class="cta-actions">
            <a href="{R}contact.html" class="btn btn--primary btn--lg" data-magnetic>Start a project ${A}</a>
            <a href="{R}pricing.html" class="btn btn--ghost btn--lg">View pricing</a>
          </div>
        </div>
      </div>
    </section>`;

const faq = (items, title = 'Got questions? <span class="serif">No worries.</span>') => `
    <section class="section">
      <div class="container">
        <div class="section-head section-head--center">
          <span class="eyebrow">FAQ</span>
          <h2 data-split>${title}</h2>
        </div>
        <div class="faq" data-stagger>
          ${items.map(([q, a]) => `<div class="faq-item"><button class="faq-q">${q}<i></i></button><div class="faq-a"><div><p>${a}</p></div></div></div>`).join('\n          ')}
        </div>
      </div>
    </section>`;

const marquee = (items) => {
  const row = items.map(i => `<span class="marquee-item">${i}</span>`).join('');
  return `<div class="marquee-track">${row}${row}</div>`;
};

const CLIENTS = ['Bondi Bakehouse', 'Harbour Legal', 'Koala Fitness', 'Outback Coffee Co.', 'Surf Coast Realty', 'Wattle &amp; Co.', 'Southern Cross Dental', 'Kangaroo Kids', 'Red Centre Tours', 'Byron Botanicals'];
const LOGO_FILES = ['bondi-bakehouse', 'harbour-legal', 'koala-fitness', 'outback-coffee', 'surf-coast-realty', 'wattle-co', 'southern-cross-dental', 'kangaroo-kids', 'red-centre-tours', 'byron-botanicals'];
const logoImg = (file, alt, cls = '') => `<img src="{R}assets/logos/${file}.svg" alt="${alt}"${cls ? ` class="${cls}"` : ''} loading="lazy">`;
const clientMarquee = `
    <div class="marquee marquee--logos" aria-label="Some of our clients">${marquee(CLIENTS.map((c, i) => logoImg(LOGO_FILES[i], c)))}</div>`;

const bigMarquee = `
    <div class="marquee-cross" aria-hidden="true">
      <div class="marquee marquee--big marquee--blue">${marquee(['No worries', 'Fair dinkum design', 'Built in Australia', 'Websites that sell', 'Brands that stick', 'Easy as'])}</div>
      <div class="marquee marquee--big">${marquee(['Website Development', 'Logo Design', 'Mobile App Development', 'Video Animation', 'Social Media Marketing', 'SEO Services', 'Content Marketing', 'UI/UX Design'])}</div>
    </div>`;

const clean = t => t.replace(/^[^A-Za-z0-9+]+s*/u, "");
const visual = (ic, t1, t2, orange = false) => `
          <div class="visual${orange ? ' visual--orange' : ''}">
            <span class="v-ring spin-slow"></span><span class="v-ring"></span><span class="v-ring spin-slow"></span>
            <div class="v-core float"><i data-icon="${ic}"></i></div>
            <span class="v-dot" style="top:22%;left:20%"></span><span class="v-dot" style="bottom:26%;right:18%"></span>
            <span class="v-tag float float--2" style="top:12%;right:8%">${clean(t1)}</span>
            <span class="v-tag float float--3" style="bottom:12%;left:8%">${clean(t2)}</span>
          </div>`;

const COLORS = ['#FF6101', '#03215C', '#0644BD', '#120902', '#E85800', '#283924'];
const REVIEWS = [
  ['Absolute legends. Our new site went live in two weeks and enquiries have literally doubled. Couldn’t recommend AussieWeb more.', 'Sarah Mitchell', 'Owner, Bondi Bakehouse — Sydney'],
  ['They nailed our logo on the first round. The whole brand kit looks a million bucks and cost a fraction of what the big agencies quoted.', 'Tom Henderson', 'Founder, Outback Coffee Co. — Brisbane'],
  ['Our app is smooth as. Members love it, and the team was dead easy to work with from day one.', 'Priya Sharma', 'Director, Koala Fitness — Melbourne'],
  ['We went from page five to the top three on Google for our main keywords in four months. Fair dinkum results.', 'Daniel Walsh', 'Partner, Harbour Legal — Sydney'],
  ['Our socials finally look professional and we’re getting real leads from Instagram. Top blokes and sheilas, the lot of them.', 'Emma Clarke', 'Founder, Wattle &amp; Co. — Adelaide'],
  ['The explainer video they made is the best thing on our website. Clear, fun and on-brand.', 'Josh Nguyen', 'CEO, Kangaroo Kids — Perth'],
  ['Honest pricing, no surprises and they always pick up the phone. That’s rare these days.', 'Megan Foster', 'Principal, Surf Coast Realty — Geelong'],
  ['From brief to launch they kept us in the loop the whole way. The new booking system has saved us hours every week.', 'Dr. Alan Brooks', 'Southern Cross Dental — Gold Coast'],
  ['Booked out three months straight after the new site and ads went live. Bonza work.', 'Kylie Robertson', 'Red Centre Tours — Alice Springs'],
  ['They actually listened. The copy sounds exactly like us, just sharper.', 'Ben Taylor', 'Byron Botanicals — Byron Bay'],
  ['Our checkout conversions jumped 41% after the UX overhaul. Numbers don’t lie.', 'Hannah Lee', 'E-commerce Manager — Hobart'],
  ['Fast, friendly and seriously talented. We’ll be using AussieWeb for every project from here on.', 'Chris Murphy', 'Murphy Plumbing — Newcastle']
];
const slug = n => n.replace('Dr. ', '').toLowerCase().replace(/[^a-z]+/g, '-').replace(/-$/, '');
const avatar = n => `<img src="{R}assets/avatars/${slug(n)}.jpg" alt="${n}" loading="lazy">`;
const reviewCard = ([q, n, r], i, extra = '') => `<div class="review${extra}"><div class="stars" aria-label="5 out of 5 stars"></div><blockquote>“${q}”</blockquote><div class="reviewer"><span class="av">${avatar(n)}</span><span><strong>${n}</strong><small>${r}</small></span></div></div>`;

const reviewsSlider = `
    <section class="section section--alt">
      <div class="container">
        <div class="section-head">
          <div><span class="eyebrow">Reviews</span><h2 data-split>Aussies reckon we’re <span class="serif">pretty good.</span></h2></div>
          <a href="{R}reviews.html" class="btn btn--ghost" data-reveal>Read all reviews ${A}</a>
        </div>
      </div>
      <div class="t-slider"><div class="t-track">${REVIEWS.slice(0, 6).map((r, i) => reviewCard(r, i)).join('')}${REVIEWS.slice(0, 6).map((r, i) => reviewCard(r, i)).join('')}</div></div>
    </section>`;

const WORK = [
  ['Bondi Bakehouse', 'bondi<em>bake</em>', 'logo', 'Logo &amp; Branding', 'art-2'],
  ['Harbour Legal', 'Harbour<br><em>Legal</em>', 'web', 'Website', 'art-1'],
  ['Koala Fitness', 'koala<em>fit</em>', 'app', 'Mobile App', 'art-4'],
  ['Outback Coffee Co.', 'OUTBACK<br><em>coffee</em>', 'logo', 'Logo &amp; Branding', 'art-3'],
  ['Surf Coast Realty', 'surf<em>coast</em>', 'web', 'Website', 'art-7'],
  ['Wattle &amp; Co.', 'wattle<em>&amp;co</em>', 'social', 'Social Media', 'art-8'],
  ['Southern Cross Dental', 'SXD<br><em>dental</em>', 'web', 'Website + SEO', 'art-5'],
  ['Kangaroo Kids', 'roo<em>kids</em>', 'video', 'Video Animation', 'art-6'],
  ['Red Centre Tours', 'red<em>centre</em>', 'social', 'Social Media', 'art-9']
];
const WORK_LOGO = { 'Bondi Bakehouse': 'bondi-bakehouse', 'Harbour Legal': 'harbour-legal', 'Koala Fitness': 'koala-fitness', 'Outback Coffee Co.': 'outback-coffee', 'Surf Coast Realty': 'surf-coast-realty', 'Wattle &amp; Co.': 'wattle-co', 'Southern Cross Dental': 'southern-cross-dental', 'Kangaroo Kids': 'kangaroo-kids', 'Red Centre Tours': 'red-centre-tours' };
const mockup = (cat, file, name) => {
  const lg = logoImg(file, name, 'mock-logo');
  if (cat === 'web') return `<div class="mock mock--web"><div class="mock-bar"><i></i><i></i><i></i></div><div class="mock-body">${lg}<span class="mock-h"></span><span class="mock-l"></span><span class="mock-l mock-l--s"></span><span class="mock-btn"></span></div></div>`;
  if (cat === 'app') return `<div class="mock mock--phone"><div class="mock-body">${lg}<span class="mock-card"></span><span class="mock-l"></span><span class="mock-l mock-l--s"></span><span class="mock-btn"></span></div></div>`;
  if (cat === 'social') return `<div class="mock mock--phone"><div class="mock-body">${lg}<div class="mock-grid"><i></i><i></i><i></i><i></i><i></i><i></i></div></div></div>`;
  if (cat === 'video') return `<div class="mock mock--video">${lg}<span class="mock-play"></span><span class="mock-progress"></span></div>`;
  return `<div class="mock-stack"><div class="mock mock--card-back"></div><div class="mock mock--card">${lg}</div></div>`;
};
const workCard = ([name, brand, cat, label, art]) => `<a href="{R}contact.html" class="work-card" data-cat="${cat}"><div class="work-thumb"><div class="wt-art ${art}">${mockup(cat, WORK_LOGO[name], name)}</div><span class="wt-view">View</span></div><div class="work-meta"><h3>${name}</h3><span>${label}</span></div></a>`;

const processSteps = (steps, dark = true) => `
    <section class="section${dark ? ' section--dark' : ''}">
      <div class="container">
        <div class="section-head">
          <div><span class="eyebrow">How we work</span><h2 data-split>Simple process. <span class="serif">Easy as.</span></h2></div>
          <p class="lead" data-reveal>No jargon, no runaround. Four clear steps from first chat to launch day — and we’re with you after that too.</p>
        </div>
        <div class="process" data-stagger>
          ${steps.map(([t, d]) => `<div class="step"><h3>${t}</h3><p>${d}</p></div>`).join('\n          ')}
        </div>
      </div>
    </section>`;
const DEFAULT_STEPS = [
  ['Have a yarn', 'A quick, free chat about your business, your goals and what success looks like.'],
  ['Plan &amp; design', 'We map it out, then design concepts you can see and click through before we build.'],
  ['Build &amp; refine', 'We bring it to life and refine it with you until it’s spot on. Unlimited tweaks on most plans.'],
  ['Launch &amp; grow', 'We go live, test everything, then keep improving with data, support and fresh ideas.']
];

const statsBlock = `
        <div class="stats" data-stagger>
          <div class="stat"><div class="stat-num" data-count="500" data-suffix="+">0</div><p>Aussie businesses helped</p></div>
          <div class="stat"><div class="stat-num" data-count="4.9" data-suffix="/5">0</div><p>Average client rating</p></div>
          <div class="stat"><div class="stat-num" data-count="12" data-suffix="yrs">0</div><p>Building brands online</p></div>
          <div class="stat"><div class="stat-num" data-count="48" data-suffix="h">0</div><p>Logo first concepts</p></div>
        </div>`;

/* ================= HOME ================= */
page({
  file: 'index.html', page: 'index', preloader: true,
  title: 'AussieWeb | Websites, Logos &amp; Digital Marketing in Australia',
  desc: 'AussieWeb is an Australian digital studio for website development, logo design, mobile apps, video animation, SEO and social media marketing.',
  body: `
    <section class="hero">
      <div class="grid-bg"></div>
      <div class="blob blob--orange"></div><div class="blob blob--blue"></div>
      <div class="float-chip chip-1 float"><i data-icon="pen"></i>Logo in 48 hours</div>
      <div class="float-chip chip-2 float float--2"><i data-icon="trend"></i>+218% organic traffic</div>
      <div class="float-chip chip-3 float float--3"><i data-icon="pin"></i>Proudly made in Australia</div>
      <div class="container hero-inner">
        <span class="eyebrow" data-hero>G’day — Australia’s friendly digital studio</span>
        <h1 data-split>Brands that look <span class="serif">fair dinkum</span> brilliant online.</h1>
        <p class="lead" data-hero>Websites, logos, apps and marketing for Aussie businesses that want to stand out — built fast, priced fair, and backed by a team that actually picks up the phone.</p>
        <div class="hero-actions" data-hero>
          <a href="{R}contact.html" class="btn btn--primary btn--lg" data-magnetic>Start your project ${A}</a>
          <a href="{R}portfolio.html" class="btn btn--ghost btn--lg">See our work</a>
        </div>
        <div class="hero-meta" data-hero>
          <div class="avatars">${REVIEWS.slice(0, 5).map(r => `<span>${avatar(r[1])}</span>`).join('')}</div>
          <div><div class="stars" aria-label="5 out of 5 stars"></div><p><strong>4.9/5</strong> from 500+ Aussie businesses</p></div>
        </div>
      </div>
    </section>
${clientMarquee}

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div><span class="eyebrow">What we do</span><h2 data-split>Everything your brand needs, <span class="serif">under one roof.</span></h2></div>
          <a href="{R}services.html" class="btn btn--ghost" data-reveal>All services ${A}</a>
        </div>
        <div class="services-grid" data-services-grid data-stagger></div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container split">
        ${visual('sparkle', '✦ 500+ projects launched', '★ 4.9 average rating')}
        <div>
          <span class="eyebrow" data-reveal>Why AussieWeb</span>
          <h2 data-split>Big-agency quality. <span class="serif">Local mate</span> service.</h2>
          <p class="lead" data-reveal style="margin-top:24px">We’re a tight-knit crew of designers, developers and marketers who reckon great digital work shouldn’t cost the earth — or take forever.</p>
          <ul class="check-list" data-stagger>
            <li>Fixed quotes in AUD — no nasty surprises</li>
            <li>Australian-based project managers, on your time zone</li>
            <li>Unlimited revisions on most packages</li>
            <li>100% ownership of every file we create</li>
          </ul>
          <div class="hero-actions" data-reveal><a href="{R}about.html" class="btn btn--dark">Meet the team ${A}</a></div>
        </div>
      </div>
    </section>

    <section class="section section--dark">
      <div class="container">
        <div class="section-head">
          <div><span class="eyebrow">By the numbers</span><h2 data-split>Results that do the <span class="serif">talking.</span></h2></div>
        </div>
${statsBlock}
      </div>
    </section>
${bigMarquee}
${processSteps(DEFAULT_STEPS, false)}

    <section class="section section--alt">
      <div class="container">
        <div class="section-head">
          <div><span class="eyebrow">Selected work</span><h2 data-split>Work we’re <span class="serif">stoked</span> about.</h2></div>
          <a href="{R}portfolio.html" class="btn btn--ghost" data-reveal>Full portfolio ${A}</a>
        </div>
        <div class="work-grid" data-stagger>
          ${WORK.slice(0, 4).map(workCard).join('\n          ')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head section-head--center">
          <span class="eyebrow">Pricing</span>
          <h2 data-split>Honest prices. <span class="serif">No worries.</span></h2>
          <p class="lead" data-reveal>Pick a package or get a custom quote. All prices in Australian dollars, GST inclusive.</p>
        </div>
        <div data-pricing data-reveal></div>
      </div>
    </section>
${reviewsSlider}
${faq([
  ['How much does a website cost in Australia?', 'Our websites start from A$499 for a simple landing page. Most small businesses go with our Growth package at A$1,299. Big builds and e-commerce get a fixed custom quote — no hourly surprises.'],
  ['How long does it take?', 'A logo takes around 48 hours for first concepts. A standard website takes 1–3 weeks, and apps usually take 6–12 weeks depending on features.'],
  ['Do I own everything you make?', 'Too right. Once your project’s paid for, you own 100% of the files, code and designs. No lock-in contracts.'],
  ['Are you actually based in Australia?', 'Yep. Our project managers work Australian hours, so you’ll always talk to someone on your time zone.'],
  ['Can you help after launch?', 'Absolutely. We offer care plans for updates, hosting, security and ongoing marketing — or just give us a bell when you need a hand.']
])}
${ctaBand()}`
});

/* ================= ABOUT ================= */
page({
  file: 'about.html', page: 'about',
  title: 'About Us | AussieWeb',
  desc: 'Meet AussieWeb — a proudly Australian digital studio building brands, websites and campaigns for local businesses.',
  body: `${pageHero({ eyebrow: 'About us', h1: 'A proudly Aussie crew building <span class="serif">bonza</span> brands.', lead: 'We started AussieWeb with one simple idea: local businesses deserve world-class design without the big-city agency price tag.' })}

    <section class="section">
      <div class="container split">
        <div>
          <span class="eyebrow" data-reveal>Our story</span>
          <h2 data-split>From a Sydney garage to <span class="serif">500+ brands.</span></h2>
          <p class="lead" data-reveal style="margin-top:24px">It started with a laptop, a flat white and a mate’s bakery that needed a website. Twelve years on, we’re a full-service studio helping businesses right across Australia.</p>
          <p data-reveal style="margin-top:18px;color:var(--c-text-muted)">We’ve stayed small on purpose. You won’t get passed between account managers — you get a dedicated team that knows your business and genuinely cares how it goes.</p>
        </div>
        ${visual('heart', '✦ Est. 2014, Sydney', '♥ 500+ happy clients', true)}
      </div>
    </section>

    <section class="section section--dark">
      <div class="container">
        <div class="section-head">
          <div><span class="eyebrow">What we stand for</span><h2 data-split>Our values, <span class="serif">fair and square.</span></h2></div>
        </div>
        <div class="cards-3" data-stagger>
          <div class="mini-card"><div class="mc-ic"><i data-icon="shield"></i></div><h3>Straight talk</h3><p>Honest advice and fixed prices. If something isn’t right for you, we’ll tell you.</p></div>
          <div class="mini-card"><div class="mc-ic"><i data-icon="award"></i></div><h3>Craft first</h3><p>Every pixel and line of code is made with care. Good enough isn’t good enough.</p></div>
          <div class="mini-card"><div class="mc-ic"><i data-icon="users"></i></div><h3>Mates, not vendors</h3><p>We treat your business like our own and stick around long after launch.</p></div>
          <div class="mini-card"><div class="mc-ic"><i data-icon="zap"></i></div><h3>Quick smart</h3><p>Fast turnarounds without cutting corners. We respect your time.</p></div>
          <div class="mini-card"><div class="mc-ic"><i data-icon="target"></i></div><h3>Results matter</h3><p>Pretty is great, but we design to grow your leads, sales and bookings.</p></div>
          <div class="mini-card"><div class="mc-ic"><i data-icon="globe"></i></div><h3>Local at heart</h3><p>Australian-owned, Australian hours, and proud to back local businesses.</p></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
${statsBlock}
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <div class="section-head">
          <div><span class="eyebrow">The team</span><h2 data-split>The legends behind <span class="serif">the work.</span></h2></div>
        </div>
        <div class="team-grid" data-stagger>
          <div class="team-card"><div class="tc-photo art-1"><img src="{R}assets/avatars/liam-carter.jpg" alt="" loading="lazy"></div><h3>Liam Carter</h3><p>Founder &amp; Creative Director</p></div>
          <div class="team-card"><div class="tc-photo art-2"><img src="{R}assets/avatars/chloe-nguyen.jpg" alt="" loading="lazy"></div><h3>Chloe Nguyen</h3><p>Head of Design</p></div>
          <div class="team-card"><div class="tc-photo art-4"><img src="{R}assets/avatars/jack-obrien.jpg" alt="" loading="lazy"></div><h3>Jack O’Brien</h3><p>Lead Developer</p></div>
          <div class="team-card"><div class="tc-photo art-5"><img src="{R}assets/avatars/mia-patel.jpg" alt="" loading="lazy"></div><h3>Mia Patel</h3><p>Growth &amp; SEO Lead</p></div>
        </div>
      </div>
    </section>
${ctaBand('Let’s build something <span class="serif">you’re proud of.</span>')}`
});

/* ================= SERVICES HUB ================= */
page({
  file: 'services.html', page: 'services',
  title: 'Our Services | AussieWeb',
  desc: 'Website development, logo design, mobile apps, video animation, social media, SEO, content marketing and UI/UX design.',
  body: `${pageHero({ eyebrow: 'Services', h1: 'Eight ways we help Aussie brands <span class="serif">punch above their weight.</span>', lead: 'Pick one service or let us handle the lot. Either way, you get one team, one point of contact and one clear plan.' })}

    <section class="section" style="padding-top:20px">
      <div class="container">
        <div class="services-grid" data-services-grid data-stagger></div>
      </div>
    </section>
${bigMarquee}
${processSteps(DEFAULT_STEPS)}

    <section class="section">
      <div class="container">
        <div class="section-head section-head--center">
          <span class="eyebrow">Why choose us</span>
          <h2 data-split>The AussieWeb <span class="serif">difference.</span></h2>
        </div>
        <div class="cards-3" data-stagger>
          <div class="mini-card"><div class="mc-ic"><i data-icon="shield"></i></div><h3>Fixed AUD quotes</h3><p>You’ll know the price before we start. No hourly billing, no surprise invoices.</p></div>
          <div class="mini-card"><div class="mc-ic"><i data-icon="clock"></i></div><h3>Aussie hours</h3><p>Local project managers who answer emails and calls on your time zone.</p></div>
          <div class="mini-card"><div class="mc-ic"><i data-icon="award"></i></div><h3>You own it all</h3><p>Full ownership of every file, design and line of code. No lock-in.</p></div>
        </div>
      </div>
    </section>
${ctaBand()}`
});

/* ================= SERVICE PAGES ================= */
const SERVICES = [
  {
    slug: 'website-development', icon: 'code', name: 'Website Development', pricing: 'website',
    h1: 'Websites that look sharp and <span class="serif">sell like hotcakes.</span>',
    lead: 'Fast, mobile-friendly websites designed around your customers and built to turn clicks into calls, bookings and sales.',
    tags: ['⚡ 95+ PageSpeed', '📱 Mobile-first'],
    whatH: 'A website that works as hard <span class="serif">as you do.</span>',
    whatP: 'Whether you need a simple landing page or a full e-commerce store, we design and build it from scratch — no cookie-cutter templates.',
    checks: ['Custom design, made for your brand', 'Lightning-fast and secure hosting', 'Easy CMS so you can edit content yourself', 'SEO-ready from day one'],
    includes: [['layout', 'Custom design', 'Unique layouts crafted around your brand and goals.'], ['phone', 'Mobile-first', 'Looks and works perfectly on every screen size.'], ['zap', 'Blazing speed', 'Optimised images and code for top Google scores.'], ['cart', 'E-commerce', 'Shopify, WooCommerce or custom stores that convert.'], ['search', 'SEO foundations', 'Clean structure, meta tags and schema built in.'], ['shield', 'Secure &amp; supported', 'SSL, backups and ongoing care plans available.']],
    faqs: [['What platform do you build on?', 'We build on WordPress, Shopify, Webflow or fully custom code — whichever suits your business best. We’ll recommend the right fit during our first chat.'], ['Can I update the website myself?', 'Too right. Every site comes with an easy content editor and a quick training video.'], ['Do you do hosting?', 'Yes, we offer fast Australian-hosted plans with backups and security monitoring.'], ['How long does a website take?', 'Most websites take 1–3 weeks. Larger e-commerce or custom builds take 4–8 weeks.']]
  },
  {
    slug: 'logo-design', icon: 'pen', name: 'Logo Design', pricing: 'logo',
    h1: 'Logos so good they’ll be <span class="serif">the talk of the town.</span>',
    lead: 'Memorable logos and complete brand identities designed by real designers — first concepts in just 48 hours.',
    tags: ['✦ First concepts in 48h', '∞ Unlimited revisions'],
    whatH: 'A brand people <span class="serif">remember.</span>',
    whatP: 'Your logo is the face of your business. We dig into your story, your audience and your competitors to craft a mark that’s simple, timeless and unmistakably you.',
    checks: ['Hand-crafted by senior designers', 'Multiple unique concepts to choose from', 'All file formats for print and web', 'Full copyright ownership'],
    includes: [['pen', 'Custom logo', 'Original concepts, never templates or clip-art.'], ['sparkle', 'Brand identity', 'Colours, fonts and visual style that all fit together.'], ['file', 'Stationery', 'Business cards, letterheads and email signatures.'], ['share', 'Social kit', 'Profile pics and covers for every platform.'], ['award', 'Brand guidelines', 'A rulebook so your brand stays consistent.'], ['cart', 'Merch &amp; packaging', 'Tees, signage, labels and packaging mock-ups.']],
    faqs: [['How many logo concepts will I get?', 'Between 3 and unlimited depending on your package. Every concept is original.'], ['What files do I receive?', 'AI, EPS, SVG, PDF, PNG and JPG in full colour, black and white — everything you’ll ever need.'], ['Do I own the copyright?', 'Yes, full copyright is transferred to you once the project is paid.'], ['Can you redesign my existing logo?', 'Absolutely. We can give your current logo a modern refresh while keeping its recognition.']]
  },
  {
    slug: 'mobile-app', icon: 'phone', name: 'Mobile App Development', pricing: null,
    h1: 'Apps that people actually <span class="serif">love to use.</span>',
    lead: 'Native and cross-platform apps for iOS and Android — from first sketch to App Store launch and beyond.',
    tags: ['🍎 iOS + Android', '★ 4.8 avg app rating'],
    whatH: 'Your idea, <span class="serif">in their pocket.</span>',
    whatP: 'We design and build apps that are fast, intuitive and built to scale — whether it’s a booking app, a marketplace or an internal business tool.',
    checks: ['UX research and clickable prototypes', 'React Native and Flutter experts', 'Secure back-ends and admin dashboards', 'App Store and Google Play submission'],
    includes: [['layout', 'App UX/UI', 'Clickable prototypes before a line of code is written.'], ['phone', 'iOS &amp; Android', 'One codebase, two platforms, native performance.'], ['code', 'Back-end &amp; APIs', 'Secure servers, databases and integrations.'], ['users', 'User accounts', 'Logins, profiles, payments and push notifications.'], ['rocket', 'Store launch', 'We handle submission and approval for you.'], ['shield', 'Support &amp; updates', 'Ongoing maintenance as iOS and Android evolve.']],
    faqs: [['How much does an app cost?', 'Apps vary a lot, so we quote each one. Simple apps start around A$8,000; we’ll give you a fixed quote after a free scoping call.'], ['How long does it take?', 'Most apps take 6–12 weeks from design to launch.'], ['Do you sign an NDA?', 'Of course — happy to sign one before you share your idea.'], ['Will you maintain the app after launch?', 'Yes, we offer monthly care plans for updates, bug fixes and new features.']]
  },
  {
    slug: 'video-animation', icon: 'video', name: 'Video Animation', pricing: null,
    h1: 'Animated videos that tell your story <span class="serif">in seconds.</span>',
    lead: '2D, 3D and explainer videos that grab attention, explain the tricky stuff and get people to act.',
    tags: ['▶ 2D · 3D · Explainers', '🎙 Aussie voiceovers'],
    whatH: 'Make them stop, watch <span class="serif">and click.</span>',
    whatP: 'From 30-second social ads to full explainer videos, our animators and scriptwriters turn complex ideas into simple, memorable stories.',
    checks: ['Scriptwriting and storyboarding included', 'Professional Aussie voice artists', 'Custom illustration and motion design', 'Formats for web, social and TV'],
    includes: [['video', '2D animation', 'Clean, character-driven animation full of personality.'], ['sparkle', '3D animation', 'Product renders and cinematic 3D scenes.'], ['chat', 'Explainer videos', 'Explain your product or service in 60–90 seconds.'], ['share', 'Social ads', 'Short, punchy vertical videos for Reels and TikTok.'], ['file', 'Script &amp; storyboard', 'We plan every frame before we animate.'], ['heart', 'Voice &amp; music', 'Licensed music and local voice talent.']],
    faqs: [['How long should my video be?', 'Explainers work best at 60–90 seconds. Social ads at 15–30 seconds.'], ['How long does production take?', 'Usually 2–4 weeks depending on length and style.'], ['Can I choose the voiceover?', 'Yes, you’ll pick from a range of Australian voice artists.'], ['How much does a video cost?', 'Explainer videos start from around A$1,200. We’ll send a fixed quote based on your script length and style.']]
  },
  {
    slug: 'smm', icon: 'share', name: 'Social Media Marketing', pricing: 'social',
    h1: 'Social media that builds a <span class="serif">real community.</span>',
    lead: 'Scroll-stopping content, smart ads and genuine engagement across Instagram, Facebook, TikTok and LinkedIn.',
    tags: ['📈 3x avg engagement', '💬 Daily community care'],
    whatH: 'More followers who <span class="serif">actually buy.</span>',
    whatP: 'We plan, create and manage your social media so you can get back to running your business — and we report on what matters: leads and sales.',
    checks: ['Monthly content calendar planned for you', 'Branded graphics, reels and captions', 'Paid ads with clear ROI tracking', 'Easy-to-read monthly reports'],
    includes: [['file', 'Content strategy', 'A clear plan built around your goals and audience.'], ['pen', 'Post design', 'On-brand graphics, carousels and stories.'], ['video', 'Reels &amp; TikToks', 'Short-form video that the algorithm loves.'], ['chat', 'Community care', 'We reply to comments and DMs in your voice.'], ['target', 'Paid ads', 'Meta, TikTok and LinkedIn ads that convert.'], ['trend', 'Reporting', 'Plain-English reports on growth and results.']],
    faqs: [['Which platforms do you manage?', 'Instagram, Facebook, TikTok, LinkedIn, Pinterest and X.'], ['Do I need to approve posts?', 'Yes — you’ll see and approve every post in our content calendar before it goes live.'], ['Is ad spend included?', 'No, ad spend is paid directly to the platform. Our fee covers strategy and management.'], ['Is there a lock-in contract?', 'Nope. Month-to-month, cancel anytime with 30 days notice.']]
  },
  {
    slug: 'seo', icon: 'trend', name: 'SEO Services', pricing: 'seo',
    h1: 'Get found on Google by Aussies <span class="serif">ready to buy.</span>',
    lead: 'Local and national SEO that lifts your rankings, traffic and enquiries — with transparent reporting every month.',
    tags: ['🔍 Top 3 rankings', '📍 Local SEO experts'],
    whatH: 'Climb the rankings. <span class="serif">Stay there.</span>',
    whatP: 'No dodgy tricks — just proven, white-hat SEO that builds long-term traffic for your business.',
    checks: ['Full technical and keyword audit', 'Google Business Profile optimisation', 'Quality Australian backlinks', 'Monthly ranking and traffic reports'],
    includes: [['search', 'Keyword research', 'Find what your customers are actually searching.'], ['code', 'Technical SEO', 'Speed, structure and Core Web Vitals fixed.'], ['pin', 'Local SEO', 'Google Maps and Business Profile domination.'], ['file', 'Content SEO', 'Blogs and pages that rank and convert.'], ['globe', 'Link building', 'Quality backlinks from Australian sites.'], ['trend', 'Reporting', 'Rankings, traffic and leads, explained simply.']],
    faqs: [['How long until I see results?', 'Most clients see real movement in 2–3 months and strong results by 6 months.'], ['Do you guarantee number one?', 'Nobody honest can guarantee a #1 spot. We guarantee proven work and clear reporting.'], ['Do you do local SEO?', 'Yes — local SEO for Australian cities and suburbs is our bread and butter.'], ['Is there a contract?', 'Our SEO plans are month-to-month after an initial 3-month setup period.']]
  },
  {
    slug: 'content-marketing', icon: 'file', name: 'Content Marketing', pricing: null,
    h1: 'Words that sound like you and <span class="serif">sell like crazy.</span>',
    lead: 'Website copy, blogs, emails and ads written by Aussie copywriters who know how to connect with your customers.',
    tags: ['✍ Native Aussie writers', '📬 Emails that get opened'],
    whatH: 'Content that earns <span class="serif">trust.</span>',
    whatP: 'Great content answers your customers’ questions, builds trust and ranks on Google. We plan it, write it and publish it for you.',
    checks: ['Content strategy tied to your goals', 'SEO-optimised blogs and pages', 'Email newsletters and automations', 'Australian English, your brand voice'],
    includes: [['pen', 'Website copy', 'Clear, persuasive copy for every page.'], ['file', 'Blog articles', 'Helpful, SEO-friendly articles every month.'], ['mail', 'Email marketing', 'Newsletters and automated email flows.'], ['target', 'Ad copy', 'Headlines and ads that get the click.'], ['chat', 'Brand voice', 'A tone-of-voice guide your whole team can use.'], ['trend', 'Analytics', 'Track what content brings in leads.']],
    faqs: [['Who writes the content?', 'Our in-house Australian copywriters — never AI-only, never outsourced.'], ['Do you research my industry?', 'Yes, every piece starts with research into your industry, audience and competitors.'], ['How much does it cost?', 'Content plans start from A$600 per month. Website copy is quoted per project.'], ['Will it be SEO-friendly?', 'Absolutely — all content is optimised for the keywords that matter to you.']]
  },
  {
    slug: 'ui-ux', icon: 'layout', name: 'UI/UX Design', pricing: null,
    h1: 'Interfaces that are dead simple and <span class="serif">drop-dead gorgeous.</span>',
    lead: 'User research, wireframes and polished UI design for websites, SaaS platforms and mobile apps.',
    tags: ['🎯 Research-led design', '🧩 Figma design systems'],
    whatH: 'Design that makes it <span class="serif">easy.</span>',
    whatP: 'Good UX means more sign-ups, fewer support calls and happier customers. We design every screen around how real people think and behave.',
    checks: ['User research and journey mapping', 'Wireframes and interactive prototypes', 'Pixel-perfect UI in Figma', 'Developer-ready design systems'],
    includes: [['users', 'User research', 'Interviews, surveys and analytics to find pain points.'], ['layout', 'Wireframes', 'Map out every screen and flow before design.'], ['pen', 'UI design', 'Beautiful, on-brand screens in Figma.'], ['zap', 'Prototypes', 'Clickable prototypes to test before you build.'], ['code', 'Design systems', 'Reusable components that keep products consistent.'], ['target', 'Usability testing', 'Test with real users and improve.']],
    faqs: [['What tools do you use?', 'Mainly Figma, plus Maze and Hotjar for testing and research.'], ['Can you redesign my existing app or website?', 'Yes — we audit what you have, find the problems and redesign for better results.'], ['Do you work with our developers?', 'Absolutely. We hand over developer-ready files and stay on hand during the build.'], ['How much does UI/UX cost?', 'Projects start from around A$2,500. We’ll quote after a short discovery call.']]
  }
];

const sectionSteps = {
  'logo-design': [['Discovery', 'We learn about your business, audience and style.'], ['Concepts', 'First logo concepts delivered within 48 hours.'], ['Refine', 'We tweak your favourite until it’s spot on.'], ['Deliver', 'You get every file, ready for print and web.']],
  'mobile-app': [['Scope', 'Define features, users and goals in a free workshop.'], ['Prototype', 'Clickable designs you can test on your phone.'], ['Build', 'Agile sprints with demos every fortnight.'], ['Launch', 'App Store + Google Play release and support.']],
  'video-animation': [['Script', 'We write a script that nails your message.'], ['Storyboard', 'See every scene sketched out before we animate.'], ['Animate', 'Illustration, motion, voice and music come together.'], ['Deliver', 'Final videos in every format you need.']],
  smm: [['Audit', 'We review your accounts, audience and competitors.'], ['Plan', 'A monthly content calendar for your approval.'], ['Create &amp; post', 'Designs, reels and captions — posted on schedule.'], ['Report', 'Clear monthly results and next steps.']],
  seo: [['Audit', 'Technical, content and competitor analysis.'], ['Strategy', 'A keyword plan focused on revenue.'], ['Optimise', 'On-page fixes, content and quality links.'], ['Report', 'Monthly rankings, traffic and leads.']]
};

SERVICES.forEach((s, idx) => {
  const related = WORK.filter(w => ({ 'website-development': 'web', 'logo-design': 'logo', 'mobile-app': 'app', 'video-animation': 'video', smm: 'social' })[s.slug] === w[2]);
  const work = (related.length >= 2 ? related : WORK).slice(0, 2);
  const pricingBlock = s.pricing ? `
    <section class="section">
      <div class="container">
        <div class="section-head section-head--center">
          <span class="eyebrow">${s.name} packages</span>
          <h2 data-split>Pick a plan. <span class="serif">Easy as.</span></h2>
          <p class="lead" data-reveal>All prices in AUD, GST inclusive. Need something different? We’ll put together a custom quote.</p>
        </div>
        <div data-pricing="${s.pricing}" data-reveal></div>
      </div>
    </section>` : `
    <section class="section">
      <div class="container">
        <div class="cta-band" style="background:var(--c-primary)">
          <span class="eyebrow" style="color:var(--c-white)">Custom quote</span>
          <h2 data-split style="font-size:clamp(2rem,4vw,3.4rem)">Every ${s.name.toLowerCase()} project is different.</h2>
          <p class="lead" style="color:rgba(255,255,255,.85)">Tell us what you need and we’ll send a fixed quote in AUD within one business day — no obligation.</p>
          <div class="cta-actions"><a href="{R}contact.html?plan=${s.slug}" class="btn btn--dark btn--lg" data-magnetic>Get my free quote ${A}</a></div>
        </div>
      </div>
    </section>`;

  page({
    file: `services/${s.slug}.html`, page: 'services',
    title: `${s.name} in Australia | AussieWeb`,
    desc: s.lead,
    body: `${pageHero({ crumb: `<a href="{R}index.html">Home</a> / <a href="{R}services.html">Services</a> / <span>${s.name}</span>`, eyebrow: s.name, h1: s.h1, lead: s.lead })}

    <section class="section section--alt">
      <div class="container split${idx % 2 ? ' split--reverse' : ''}">
        ${visual(s.icon, s.tags[0], s.tags[1], idx % 2 === 1)}
        <div>
          <span class="eyebrow" data-reveal>What you get</span>
          <h2 data-split>${s.whatH}</h2>
          <p class="lead" data-reveal style="margin-top:24px">${s.whatP}</p>
          <ul class="check-list" data-stagger>${s.checks.map(c => `<li>${c}</li>`).join('')}</ul>
          <div class="hero-actions" data-reveal><a href="{R}contact.html?plan=${s.slug}" class="btn btn--primary" data-magnetic>Get started ${A}</a></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div><span class="eyebrow">What’s included</span><h2 data-split>All the good stuff, <span class="serif">sorted.</span></h2></div>
        </div>
        <div class="cards-3" data-stagger>
          ${s.includes.map(([ic, t, d]) => `<div class="mini-card"><div class="mc-ic"><i data-icon="${ic}"></i></div><h3>${t}</h3><p>${d}</p></div>`).join('\n          ')}
        </div>
      </div>
    </section>
${processSteps(sectionSteps[s.slug] || DEFAULT_STEPS)}
${pricingBlock}

    <section class="section section--alt">
      <div class="container">
        <div class="section-head">
          <div><span class="eyebrow">Recent work</span><h2 data-split>Fresh off the <span class="serif">tools.</span></h2></div>
          <a href="{R}portfolio.html" class="btn btn--ghost" data-reveal>Full portfolio ${A}</a>
        </div>
        <div class="work-grid" data-stagger>${work.map(workCard).join('')}</div>
      </div>
    </section>
${faq(s.faqs)}

    <section class="section section--alt">
      <div class="container">
        <div class="section-head">
          <div><span class="eyebrow">More services</span><h2 data-split>Need a hand with <span class="serif">something else?</span></h2></div>
        </div>
        <div class="services-grid" data-services-grid data-exclude="${s.slug}" data-feature-first data-stagger></div>
      </div>
    </section>
${ctaBand()}`
  });
});

/* ================= PORTFOLIO ================= */
page({
  file: 'portfolio.html', page: 'portfolio',
  title: 'Portfolio | AussieWeb',
  desc: 'A look at websites, logos, apps, videos and social campaigns we’ve made for Australian businesses.',
  body: `${pageHero({ eyebrow: 'Portfolio', h1: 'Work we’re <span class="serif">bloody proud</span> of.', lead: 'A handful of brands, websites, apps and campaigns we’ve built for businesses right across Australia.', actions: false })}

    <section class="section" style="padding-top:20px">
      <div class="container">
        <div class="filters" data-filters="#work-grid" data-reveal>
          <button class="filter-btn is-active" data-filter="all">All work</button>
          <button class="filter-btn" data-filter="web">Websites</button>
          <button class="filter-btn" data-filter="logo">Logos &amp; Branding</button>
          <button class="filter-btn" data-filter="app">Mobile Apps</button>
          <button class="filter-btn" data-filter="social">Social Media</button>
          <button class="filter-btn" data-filter="video">Video</button>
        </div>
        <div class="work-grid work-grid--3" id="work-grid" data-stagger>
          ${WORK.map(workCard).join('\n          ')}
        </div>
      </div>
    </section>
${clientMarquee}
${ctaBand('Your brand could be <span class="serif">next.</span>')}`
});

/* ================= HOW WE WORK ================= */
page({
  file: 'work.html', page: '',
  title: 'How We Work | AussieWeb',
  desc: 'Our simple, transparent process — from first chat to launch day and beyond.',
  body: `${pageHero({ eyebrow: 'How we work', h1: 'No jargon. No runaround. <span class="serif">Just good work.</span>', lead: 'Here’s exactly what happens when you work with AussieWeb — from our first chat to launch day and beyond.' })}
${processSteps(DEFAULT_STEPS)}

    <section class="section">
      <div class="container split">
        <div>
          <span class="eyebrow" data-reveal>Step 01 — Have a yarn</span>
          <h2 data-split>We start by <span class="serif">listening.</span></h2>
          <p class="lead" data-reveal style="margin-top:24px">A free 30-minute call to understand your business, customers and goals. You’ll leave with honest advice — even if you don’t go with us.</p>
          <ul class="check-list" data-stagger><li>Free discovery call</li><li>Fixed AUD quote within 24 hours</li><li>Clear timeline and milestones</li></ul>
        </div>
        ${visual('chat', '☕ Free 30-min chat', '✓ Quote in 24h')}
      </div>
    </section>

    <section class="section section--alt">
      <div class="container split split--reverse">
        <div>
          <span class="eyebrow" data-reveal>Step 02 &amp; 03 — Design &amp; build</span>
          <h2 data-split>You see it <span class="serif">before</span> we build it.</h2>
          <p class="lead" data-reveal style="margin-top:24px">We share designs and clickable prototypes early, so there are no surprises. Then we build, test and refine with you every step of the way.</p>
          <ul class="check-list" data-stagger><li>Weekly progress updates</li><li>Shared project board you can check anytime</li><li>Unlimited revisions on most plans</li></ul>
        </div>
        ${visual('layout', '✦ Live prototype', '↻ Weekly updates', true)}
      </div>
    </section>

    <section class="section">
      <div class="container split">
        <div>
          <span class="eyebrow" data-reveal>Step 04 — Launch &amp; grow</span>
          <h2 data-split>Launch day is just <span class="serif">the start.</span></h2>
          <p class="lead" data-reveal style="margin-top:24px">We handle the launch, train your team and stick around with support, care plans and marketing to keep things growing.</p>
          <ul class="check-list" data-stagger><li>30 days free support after launch</li><li>Training video for your team</li><li>Optional care &amp; growth plans</li></ul>
        </div>
        ${visual('rocket', '🚀 Go-live checklist', '♥ 30 days free support')}
      </div>
    </section>
${faq([
  ['Do I need to have everything ready before we start?', 'Not at all. We’ll help with content, images and copy if you need it.'],
  ['How do we communicate?', 'Email, phone, Zoom or WhatsApp — whatever suits you. You’ll have one dedicated project manager.'],
  ['What are the payment terms?', 'Usually 50% to start and 50% on completion. Bigger projects can be split into milestones.'],
  ['What if I’m not happy?', 'We keep refining until you are. That’s why most of our plans include unlimited revisions.']
])}
${ctaBand()}`
});

/* ================= REVIEWS ================= */
page({
  file: 'reviews.html', page: 'reviews',
  title: 'Client Reviews | AussieWeb',
  desc: 'What Australian businesses say about working with AussieWeb.',
  body: `${pageHero({ eyebrow: 'Reviews', h1: 'Don’t take our word for it. <span class="serif">Take theirs.</span>', lead: 'Real feedback from business owners right across Australia — from Bondi to Broome.', actions: false })}

    <section class="section section--dark section--tight">
      <div class="container">
${statsBlock}
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="reviews-grid" data-stagger>
          ${REVIEWS.map((r, i) => reviewCard(r, i, i === 0 ? ' review--big review--dark' : i === 4 ? ' review--orange' : i === 8 ? ' review--big' : '')).join('\n          ')}
        </div>
      </div>
    </section>
${ctaBand('Join 500+ <span class="serif">happy</span> Aussie businesses.')}`
});

/* ================= PRICING ================= */
page({
  file: 'pricing.html', page: 'pricing',
  title: 'Pricing &amp; Packages | AussieWeb',
  desc: 'Clear, fixed pricing in AUD for websites, logos, social media and SEO.',
  body: `${pageHero({ eyebrow: 'Pricing', h1: 'Fair prices. Fixed quotes. <span class="serif">No worries.</span>', lead: 'Explore our packages and pick the plan that fits your vision and budget. All prices in Australian dollars, GST inclusive.', actions: false })}

    <section class="section" style="padding-top:20px">
      <div class="container">
        <div data-pricing data-reveal></div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <div class="section-head section-head--center">
          <span class="eyebrow">Every package includes</span>
          <h2 data-split>The good stuff comes <span class="serif">standard.</span></h2>
        </div>
        <div class="cards-3" data-stagger>
          <div class="mini-card"><div class="mc-ic"><i data-icon="award"></i></div><h3>100% ownership</h3><p>All files, code and designs are yours to keep.</p></div>
          <div class="mini-card"><div class="mc-ic"><i data-icon="users"></i></div><h3>Dedicated manager</h3><p>One Aussie-based contact from start to finish.</p></div>
          <div class="mini-card"><div class="mc-ic"><i data-icon="shield"></i></div><h3>Satisfaction promise</h3><p>We refine until you’re genuinely happy.</p></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="cta-band" style="background:var(--c-primary)">
          <span class="eyebrow" style="color:var(--c-white)">Apps, video, UI/UX &amp; content</span>
          <h2 data-split style="font-size:clamp(2rem,4vw,3.4rem)">Need something custom?</h2>
          <p class="lead" style="color:rgba(255,255,255,.85)">Mobile apps, video animation, UI/UX and content marketing are quoted per project. Tell us what you need and we’ll send a fixed price within a day.</p>
          <div class="cta-actions"><a href="{R}contact.html" class="btn btn--dark btn--lg" data-magnetic>Get a custom quote ${A}</a></div>
        </div>
      </div>
    </section>
${faq([
  ['Are your prices in AUD?', 'Yes, all prices are in Australian dollars and include GST.'],
  ['Do you offer payment plans?', 'Yes. Most projects are 50% upfront and 50% on completion, and larger projects can be split into monthly payments.'],
  ['Are there any hidden fees?', 'Nope. Your quote is fixed. The only extras are optional things like premium plugins or ad spend — and we’ll always ask first.'],
  ['Can I upgrade my package later?', 'Of course. You can upgrade anytime and we’ll only charge the difference.']
])}
${ctaBand()}`
});

/* ================= PACKAGE DETAILS ================= */
page({
  file: 'package.html', page: 'pricing',
  title: 'Package Details | AussieWeb',
  desc: 'Everything included in your AussieWeb package.',
  body: `
    <section class="page-hero" data-package-detail>
      <div class="grid-bg"></div><div class="blob blob--orange"></div>
      <div class="container hero-inner">
        <nav class="breadcrumb" data-hero><a href="{R}index.html">Home</a> / <a href="{R}pricing.html">Pricing</a> / <span data-pkg-name></span></nav>
        <span class="eyebrow" data-hero>Package details</span>
        <h1 data-hero><span data-pkg-name></span> <span class="serif">package</span></h1>
        <p class="lead" data-hero data-pkg-desc></p>
      </div>
    </section>

    <section class="section" style="padding-top:10px">
      <div class="container pkg-layout">
        <div>
          <h2 style="font-size:clamp(1.8rem,3vw,2.6rem)" data-reveal>What’s <span class="serif">included</span></h2>
          <div class="pkg-features" data-pkg-features></div>
          <h2 style="font-size:clamp(1.8rem,3vw,2.6rem);margin-top:70px" data-reveal>Compare <span class="serif">plans</span></h2>
          <div data-pkg-compare data-reveal></div>
        </div>
        <aside class="pkg-summary" data-pkg-summary></aside>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <div class="section-head"><div><span class="eyebrow">Other options</span><h2>Not quite <span class="serif">right?</span></h2></div></div>
        <div class="pricing-grid" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr))" data-pkg-others></div>
      </div>
    </section>
${ctaBand()}`
});

/* ================= CONTACT / START A PROJECT ================= */
page({
  file: 'contact.html', page: '',
  title: 'Start a Project | AussieWeb',
  desc: 'Tell us about your project and get a fixed quote in AUD within one business day.',
  body: `
    <section class="page-hero" style="padding-bottom:120px">
      <div class="grid-bg"></div><div class="blob blob--orange"></div>
      <div class="container hero-inner split" style="align-items:start">
        <div>
          <span class="eyebrow" data-hero>Start a project</span>
          <h1 data-split style="font-size:clamp(2.6rem,5vw,4.6rem)">Let’s have a <span class="serif">yarn.</span></h1>
          <p class="lead" data-hero>Tell us a bit about your project. We’ll get back to you within one business day with ideas, a timeline and a fixed quote. No worries, no obligation.</p>
          <div class="contact-info" data-stagger>
            <a href="tel:+61280001234"><i data-icon="call"></i><span><small>Give us a bell</small><strong>+61 2 8000 1234</strong></span></a>
            <a href="mailto:gday@aussieweb.com.au"><i data-icon="mail"></i><span><small>Flick us an email</small><strong>gday@aussieweb.com.au</strong></span></a>
            <div><i data-icon="pin"></i><span><small>Pop in for a coffee</small><strong>Level 12, 1 Martin Place, Sydney NSW 2000</strong></span></div>
            <div><i data-icon="clock"></i><span><small>Office hours</small><strong>Mon–Fri, 9am–6pm AEST</strong></span></div>
          </div>
        </div>
        <div class="form-card" data-reveal>
          <form data-form>
            <div class="form-grid">
              <div class="field"><label for="f-name">Your name *</label><input id="f-name" name="name" required placeholder="Jane Smith"></div>
              <div class="field"><label for="f-biz">Business name</label><input id="f-biz" name="business" placeholder="Smith &amp; Co."></div>
              <div class="field"><label for="f-email">Email *</label><input id="f-email" type="email" name="email" required placeholder="jane@example.com.au"></div>
              <div class="field"><label for="f-phone">Phone</label><input id="f-phone" type="tel" name="phone" placeholder="04xx xxx xxx"></div>
              <div class="field field--full"><label>What do you need?</label>
                <div class="chip-group">
                  <label><input type="checkbox" name="services" value="website"><span>Website</span></label>
                  <label><input type="checkbox" name="services" value="logo"><span>Logo</span></label>
                  <label><input type="checkbox" name="services" value="app"><span>Mobile App</span></label>
                  <label><input type="checkbox" name="services" value="video"><span>Video</span></label>
                  <label><input type="checkbox" name="services" value="smm"><span>Social Media</span></label>
                  <label><input type="checkbox" name="services" value="seo"><span>SEO</span></label>
                  <label><input type="checkbox" name="services" value="content"><span>Content</span></label>
                  <label><input type="checkbox" name="services" value="uiux"><span>UI/UX</span></label>
                </div>
              </div>
              <div class="field"><label for="f-budget">Budget (AUD)</label>
                <select id="f-budget" name="budget"><option>Under $500</option><option>$500 – $1,500</option><option selected>$1,500 – $5,000</option><option>$5,000 – $15,000</option><option>$15,000+</option></select></div>
              <div class="field"><label for="f-plan">Package (optional)</label><input id="f-plan" name="plan" placeholder="e.g. Website Growth"></div>
              <div class="field field--full"><label for="f-msg">Tell us about your project *</label><textarea id="f-msg" name="message" required placeholder="What are you looking to build, and what’s your timeline?"></textarea></div>
            </div>
            <div style="margin-top:24px"><button type="submit" class="btn btn--primary btn--lg" data-magnetic>Send my enquiry ${A}</button></div>
            <p class="form-note">We’ll never share your details. Read our <a href="{R}privacy.html" style="color:var(--c-primary)">privacy policy</a>.</p>
          </form>
          <div class="form-success">
            <div class="ok"><i data-icon="check"></i></div>
            <h3>Cheers, we’ve got it!</h3>
            <p style="color:var(--c-text-muted);margin-top:10px">One of the team will be in touch within one business day. Have a ripper of a day!</p>
          </div>
        </div>
      </div>
    </section>
${clientMarquee}`
});

/* ================= LEGAL & PRIVACY ================= */
const prosePage = ({ file, title, eyebrow, h1, lead, sections }) => page({
  file, page: '', title: `${title} | AussieWeb`, desc: lead,
  body: `${pageHero({ eyebrow, h1, lead, actions: false })}

    <section class="section" style="padding-top:20px">
      <div class="container prose-wrap">
        <nav class="toc">${sections.map(([h], i) => `<a href="#s${i + 1}">${h}</a>`).join('')}</nav>
        <article class="prose" data-reveal>
          <span class="updated">Last updated: 23 November 2026 — template content, please have it reviewed by a lawyer.</span>
          ${sections.map(([h, body], i) => `<h2 id="s${i + 1}">${h}</h2>${body}`).join('\n          ')}
        </article>
      </div>
    </section>`
});

prosePage({
  file: 'legal.html', title: 'Legal Requirements', eyebrow: 'Legal',
  h1: 'Legal <span class="serif">requirements.</span>',
  lead: 'The terms that apply when you use our website and services. Written in plain English, as much as we can.',
  sections: [
    ['About us', '<p>AussieWeb Pty Ltd (ABN 00 000 000 000) is an Australian company providing digital design, development and marketing services. “We”, “us” and “our” refer to AussieWeb.</p>'],
    ['Using our website', '<p>By using this website you agree to these terms. Content on this site is for general information only and may change without notice.</p>'],
    ['Quotes &amp; payments', '<p>All quotes are in Australian dollars and include GST unless stated otherwise. Quotes are valid for 30 days.</p><ul><li>Projects generally require a 50% deposit before work begins.</li><li>The remaining balance is due on completion, before final files are released or the site goes live.</li><li>Monthly services are billed in advance and can be cancelled with 30 days notice.</li></ul>'],
    ['Revisions &amp; scope', '<p>Each package includes the revisions stated in it. Work outside the agreed scope will be quoted separately and only started with your approval.</p>'],
    ['Intellectual property', '<p>Once paid in full, you own the final designs, code and content we create for you. We may show the work in our portfolio unless you ask us not to.</p>'],
    ['Australian Consumer Law', '<p>Our services come with guarantees that cannot be excluded under the Australian Consumer Law. Nothing in these terms limits your rights under that law.</p>'],
    ['Refunds', '<p>If we haven’t started work, deposits are fully refundable. Once work has begun, refunds are assessed fairly based on work completed, in line with the Australian Consumer Law.</p>'],
    ['Liability', '<p>To the extent permitted by law, our liability is limited to re-supplying the services or the cost of having them re-supplied.</p>'],
    ['Governing law', '<p>These terms are governed by the laws of New South Wales, Australia.</p>']
  ]
});

prosePage({
  file: 'privacy.html', title: 'Our Policies', eyebrow: 'Privacy policy',
  h1: 'Our <span class="serif">policies.</span>',
  lead: 'How we collect, use and protect your personal information, in line with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.',
  sections: [
    ['What we collect', '<p>We collect information you give us, such as your name, email, phone number, business details and project information, when you fill in a form, email or call us.</p><p>We also collect basic analytics data such as pages visited and device type.</p>'],
    ['How we use it', '<ul><li>To respond to your enquiries and provide quotes</li><li>To deliver and manage your project</li><li>To send invoices and important updates</li><li>To improve our website and services</li></ul>'],
    ['Marketing', '<p>We’ll only send you marketing emails if you opt in, and every email includes an unsubscribe link, in line with the Spam Act 2003.</p>'],
    ['Sharing your information', '<p>We never sell your information. We only share it with trusted providers (like hosting, email and payment services) who help us run our business.</p>'],
    ['Storage &amp; security', '<p>Your information is stored securely and only accessed by team members who need it.</p>'],
    ['Cookies', '<p>Our website uses cookies for analytics and to improve your experience. You can turn off cookies in your browser settings.</p>'],
    ['Access &amp; correction', '<p>You can ask to access or correct your personal information at any time by emailing gday@aussieweb.com.au.</p>'],
    ['Complaints', '<p>If you have a privacy concern, contact us first and we’ll respond within 30 days. If you’re not satisfied, you can contact the Office of the Australian Information Commissioner (OAIC).</p>']
  ]
});
