/* =========================================================
   AUSSIEWEB — SHARED LAYOUT
   Header, footer, icons and the services list live here,
   so a change here updates every page.
   Each page sets <body data-root=""> ("../" for /services/ pages).
   ========================================================= */
(function () {
  var R = document.body.getAttribute('data-root') || '';

  /* ---------- Site settings (edit contact details here) ---------- */
  var SITE = {
    phone: '+61 2 8000 1234',
    phoneHref: 'tel:+61280001234',
    email: 'gday@aussieweb.com.au',
    address: 'Level 12, 1 Martin Place, Sydney NSW 2000',
    hours: 'Mon–Fri, 9am–6pm AEST'
  };
  window.AUSSIE_SITE = SITE;

  /* ---------- Icons (Lucide-style line icons) ---------- */
  var P = {
    code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    pen: '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
    phone: '<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
    video: '<rect x="2" y="6" width="14" height="12" rx="2"/><path d="M22 8l-6 4 6 4V8z"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
    trend: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
    layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
    arrow: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    arrowUp: '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
    chevron: '<polyline points="6 9 12 15 18 9"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/>',
    call: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    award: '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    sparkle: '<path d="M12 3l1.9 5.8L20 10.5l-6.1 1.7L12 18l-1.9-5.8L4 10.5l6.1-1.7z"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    x: '<path d="M4 4l16 16M20 4L4 20"/>',
    globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    cart: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>'
  };
  function icon(name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[name] || '') + '</svg>';
  }
  var STAR = '<svg class="logo-star" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z"/></svg>';
  window.AUSSIE_ICON = icon;

  /* ---------- Services (same 8 as the reference site) ---------- */
  var SERVICES = [
    { slug: 'website-development', name: 'Website Development', short: 'Website Dev', icon: 'code', blurb: 'Lightning-fast, good-looking sites built to turn visitors into customers.' },
    { slug: 'logo-design', name: 'Logo Design', short: 'Logo Design', icon: 'pen', blurb: 'Iconic marks and brand identities that stick in people’s heads.' },
    { slug: 'mobile-app', name: 'Mobile App Development', short: 'Mobile App', icon: 'phone', blurb: 'iOS and Android apps that feel bloody brilliant to use.' },
    { slug: 'video-animation', name: 'Video Animation', short: 'Animation', icon: 'video', blurb: '2D, 3D and explainer videos that tell your story in seconds.' },
    { slug: 'smm', name: 'Social Media Marketing', short: 'SMM Service', icon: 'share', blurb: 'Scroll-stopping content and campaigns that grow a real community.' },
    { slug: 'seo', name: 'SEO Services', short: 'SEO Service', icon: 'trend', blurb: 'Climb Google and get found by Aussies searching for what you sell.' },
    { slug: 'content-marketing', name: 'Content Marketing', short: 'Content Marketing', icon: 'file', blurb: 'Words, blogs and copy that sound like you and sell like crazy.' },
    { slug: 'ui-ux', name: 'UI/UX Design', short: 'UI/UX Design', icon: 'layout', blurb: 'Interfaces that are dead simple to use and gorgeous to look at.' }
  ];
  window.AUSSIE_SERVICES = SERVICES;

  var logoHTML = '<a href="' + R + 'index.html" class="logo" aria-label="AussieWeb home">aussie<em>web</em>' + STAR + '</a>';

  /* ---------- Header ---------- */
  var megaLinks = SERVICES.map(function (s) {
    return '<a href="' + R + 'services/' + s.slug + '.html"><span class="mega-ic">' + icon(s.icon) + '</span><span><strong>' + s.name + '</strong><small>' + s.blurb.split(' ').slice(0, 6).join(' ') + '…</small></span></a>';
  }).join('');

  var header =
    '<div class="scroll-progress"></div>' +
    '<header class="site-header"><div class="container nav">' + logoHTML +
    '<ul class="nav-links">' +
    '<li><a href="' + R + 'index.html" data-nav="index">Home</a></li>' +
    '<li><a href="' + R + 'about.html" data-nav="about">About Us</a></li>' +
    '<li class="has-mega"><a href="' + R + 'services.html" class="nav-drop-btn" data-nav="services">Services ' + icon('chevron') + '</a><div class="mega">' + megaLinks + '</div></li>' +
    '<li><a href="' + R + 'portfolio.html" data-nav="portfolio">Portfolio</a></li>' +
    '<li><a href="' + R + 'pricing.html" data-nav="pricing">Pricing</a></li>' +
    '<li><a href="' + R + 'reviews.html" data-nav="reviews">Reviews</a></li>' +
    '</ul>' +
    '<div class="nav-cta"><a href="' + SITE.phoneHref + '" class="btn btn--ghost">' + icon('call') + ' Call us</a>' +
    '<a href="' + R + 'contact.html" class="btn btn--primary" data-magnetic>Start a project ' + icon('arrow') + '</a>' +
    '<button class="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span></button></div>' +
    '</div></header>' +
    '<nav class="mobile-menu" aria-label="Mobile">' +
    '<a href="' + R + 'index.html">Home</a><a href="' + R + 'about.html">About Us</a><a href="' + R + 'services.html">Services</a>' +
    '<a href="' + R + 'portfolio.html">Portfolio</a><a href="' + R + 'work.html">How We Work</a><a href="' + R + 'pricing.html">Pricing</a>' +
    '<a href="' + R + 'reviews.html">Reviews</a><a href="' + R + 'contact.html">Start a Project</a>' +
    '<p class="mm-label">Services</p><div class="mm-services">' +
    SERVICES.map(function (s) { return '<a href="' + R + 'services/' + s.slug + '.html">' + s.name + '</a>'; }).join('') +
    '</div></nav>';

  /* ---------- Footer ---------- */
  var footer =
    '<footer class="site-footer"><div class="container">' +
    '<div class="footer-top">' +
    '<div>' + logoHTML + '<p>A proudly Aussie digital studio. We build brands, websites and campaigns that punch well above their weight.</p>' +
    '<div class="socials">' +
    '<a href="#" aria-label="Instagram">' + icon('instagram') + '</a><a href="#" aria-label="LinkedIn">' + icon('linkedin') + '</a>' +
    '<a href="#" aria-label="Facebook">' + icon('facebook') + '</a><a href="#" aria-label="X">' + icon('x') + '</a></div></div>' +
    '<div class="footer-col"><h4>Services</h4><ul>' +
    SERVICES.map(function (s) { return '<li><a href="' + R + 'services/' + s.slug + '.html">' + s.name + '</a></li>'; }).join('') +
    '</ul></div>' +
    '<div class="footer-col"><h4>Company</h4><ul>' +
    '<li><a href="' + R + 'about.html">About Us</a></li><li><a href="' + R + 'work.html">How We Work</a></li>' +
    '<li><a href="' + R + 'portfolio.html">Portfolio</a></li><li><a href="' + R + 'reviews.html">Reviews</a></li>' +
    '<li><a href="' + R + 'pricing.html">Pricing</a></li><li><a href="' + R + 'contact.html">Start a Project</a></li></ul></div>' +
    '<div class="footer-col"><h4>Say g’day</h4><ul>' +
    '<li><a href="mailto:' + SITE.email + '">' + SITE.email + '</a></li><li><a href="' + SITE.phoneHref + '">' + SITE.phone + '</a></li>' +
    '<li>' + SITE.address + '</li><li>' + SITE.hours + '</li></ul></div>' +
    '</div>' +
    '<div class="footer-big" data-footer-big>aussie<em>web</em></div>' +
    '<div class="footer-bottom"><span>© ' + new Date().getFullYear() + ' AussieWeb Pty Ltd. Proudly made in Australia.</span>' +
    '<span class="fb-links"><a href="' + R + 'legal.html">Legal Requirements</a><a href="' + R + 'privacy.html">Our Policies</a></span></div>' +
    '</div></footer>' +
    '<button class="to-top" aria-label="Back to top">' + icon('arrowUp') + '</button>' +
    '<div class="cursor-dot"></div><div class="cursor-ring"></div>';

  var h = document.getElementById('site-header');
  var f = document.getElementById('site-footer');
  if (h) h.outerHTML = header;
  if (f) f.outerHTML = footer;

  /* Active nav link */
  var page = document.body.getAttribute('data-page');
  if (page) {
    var a = document.querySelector('.nav-links [data-nav="' + page + '"]');
    if (a) a.classList.add('is-active');
  }

  /* Services grid: any element with [data-services-grid] gets the 8 cards */
  document.querySelectorAll('[data-services-grid]').forEach(function (grid) {
    var exclude = grid.getAttribute('data-exclude');
    var list = SERVICES.filter(function (s) { return s.slug !== exclude; });
    grid.innerHTML = list.map(function (s, i) {
      var feature = grid.hasAttribute('data-feature-first') && i === 0 ? ' service-card--feature' : '';
      return '<a href="' + R + 'services/' + s.slug + '.html" class="service-card' + feature + '" data-tilt>' +
        '<span class="sc-num">0' + (i + 1) + '</span><span class="sc-arrow">' + icon('arrow') + '</span>' +
        '<span class="sc-icon">' + icon(s.icon) + '</span><h3>' + s.name + '</h3><p>' + s.blurb + '</p></a>';
    }).join('');
  });

  /* Rating stars */
  var STAR_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7.3L12 17.8 5.8 21.5l1.6-7.3L2 9.5l7.1-.6z"/></svg>';
  document.querySelectorAll(".stars").forEach(function (el) { el.innerHTML = STAR_SVG + STAR_SVG + STAR_SVG + STAR_SVG + STAR_SVG; });

  /* Any <i data-icon="name"></i> becomes an SVG icon */
  document.querySelectorAll('[data-icon]').forEach(function (el) {
    el.innerHTML = icon(el.getAttribute('data-icon'));
  });
})();
