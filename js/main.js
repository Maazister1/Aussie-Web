/* =========================================================
   AUSSIEWEB — INTERACTIONS & ANIMATIONS
   Uses GSAP + ScrollTrigger + SplitText and Lenis (loaded
   from CDN). If they fail to load, the site still works.

   Attributes you can put on any element:
     data-reveal            fade + slide up on scroll
     data-stagger           children animate in one by one
     data-split             heading animates line by line
     data-parallax="0.2"    moves slower/faster on scroll
     data-count="250"       number counts up (data-suffix="+")
     data-magnetic          button follows the mouse a little
     data-tilt              card tilts in 3D on hover
   ========================================================= */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGSAP = typeof window.gsap !== 'undefined';
  var html = document.documentElement;
  var header = document.querySelector('.site-header');

  /* ---------- Smooth scroll (Lenis) ---------- */
  var lenis = null;
  if (!reduce && typeof window.Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    if (hasGSAP && window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
    }
  }
  function scrollToY(y) { lenis ? lenis.scrollTo(y) : window.scrollTo({ top: y, behavior: 'smooth' }); }

  /* ---------- Header hide/show, progress bar, back-to-top ---------- */
  var lastY = 0;
  var progress = document.querySelector('.scroll-progress');
  var toTop = document.querySelector('.to-top');
  function onScroll() {
    var y = window.scrollY;
    if (header) {
      header.classList.toggle('is-scrolled', y > 20);
      header.classList.toggle('is-hidden', y > 400 && y > lastY && !html.classList.contains('menu-open'));
    }
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    if (toTop) toTop.classList.toggle('is-shown', y > 800);
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', function () { scrollToY(0); });

  /* ---------- Mobile menu ---------- */
  var burger = document.querySelector('.burger');
  if (burger) burger.addEventListener('click', function () {
    var open = html.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', open);
    if (lenis) open ? lenis.stop() : lenis.start();
    document.body.style.overflow = open ? 'hidden' : '';
  });

  /* ---------- Custom cursor ---------- */
  var dot = document.querySelector('.cursor-dot');
  var ring = document.querySelector('.cursor-ring');
  if (dot && ring && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduce) {
    var mx = -100, my = -100, rx = -100, ry = -100;
    window.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; });
    (function loop() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseover', function (e) {
      ring.classList.toggle('is-hover', !!e.target.closest('a, button, [data-tilt], label, input, select, textarea'));
    });
  } else if (dot && ring) { dot.remove(); ring.remove(); }

  /* ---------- Magnetic buttons ---------- */
  if (!reduce) document.querySelectorAll('[data-magnetic]').forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left - r.width / 2) * 0.3;
      var y = (e.clientY - r.top - r.height / 2) * 0.4;
      el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    });
    el.addEventListener('mouseleave', function () { el.style.transform = ''; });
  });

  /* ---------- Card tilt + spotlight origin ---------- */
  document.querySelectorAll('[data-tilt]').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      card.style.setProperty('--mx', px * 100 + '%');
      card.style.setProperty('--my', py * 100 + '%');
      if (!reduce) card.style.transform = 'perspective(900px) rotateX(' + (0.5 - py) * 8 + 'deg) rotateY(' + (px - 0.5) * 8 + 'deg) translateY(-6px)';
    });
    card.addEventListener('mouseleave', function () { card.style.transform = ''; });
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.setAttribute('aria-expanded', 'false');
    q.addEventListener('click', function () {
      var item = q.closest('.faq-item');
      var open = !item.classList.contains('is-open');
      item.parentElement.querySelectorAll('.faq-item.is-open').forEach(function (o) { o.classList.remove('is-open'); o.querySelector('.faq-q').setAttribute('aria-expanded', 'false'); });
      item.classList.toggle('is-open', open);
      q.setAttribute('aria-expanded', open);
      if (window.ScrollTrigger) setTimeout(function () { ScrollTrigger.refresh(); }, 500);
    });
  });

  /* ---------- Pricing tabs ---------- */
  document.querySelectorAll('[data-pricing]').forEach(function (box) {
    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-tab]');
      if (!b) return;
      box.querySelectorAll('[data-tab]').forEach(function (t) { t.classList.toggle('is-active', t === b); });
      box.querySelectorAll('[data-panel]').forEach(function (p) {
        var on = p.getAttribute('data-panel') === b.getAttribute('data-tab');
        p.classList.toggle('is-active', on);
        if (on && hasGSAP && !reduce) gsap.from(p.children, { y: 40, autoAlpha: 0, duration: .6, stagger: .08, ease: 'power3.out' });
      });
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });
  });

  /* ---------- Portfolio filters ---------- */
  document.querySelectorAll('[data-filters]').forEach(function (bar) {
    var grid = document.querySelector(bar.getAttribute('data-filters'));
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('.filter-btn');
      if (!b || !grid) return;
      bar.querySelectorAll('.filter-btn').forEach(function (x) { x.classList.toggle('is-active', x === b); });
      var f = b.getAttribute('data-filter');
      var shown = [];
      grid.querySelectorAll('.work-card').forEach(function (c) {
        var match = f === 'all' || c.getAttribute('data-cat') === f;
        c.classList.toggle('is-hidden', !match);
        if (match) shown.push(c);
      });
      if (hasGSAP && !reduce) gsap.fromTo(shown, { y: 40, autoAlpha: 0, scale: .96 }, { y: 0, autoAlpha: 1, scale: 1, duration: .6, stagger: .06, ease: 'power3.out' });
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });
  });

  /* ---------- Forms (front-end only; connect to Formspree/your backend later) ---------- */
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    var plan = new URLSearchParams(location.search).get('plan');
    var planField = form.querySelector('[name="plan"]');
    if (plan && planField) planField.value = plan.replace(/-/g, ' ');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = form.parentElement.querySelector('.form-success');
      if (ok) { form.style.display = 'none'; ok.classList.add('is-shown'); }
      if (ok && hasGSAP) gsap.from(ok, { y: 30, autoAlpha: 0, duration: .7, ease: 'power3.out' });
    });
  });

  /* ---------- Counters ---------- */
  function runCounter(el) {
    var end = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var dec = (el.getAttribute('data-count').split('.')[1] || '').length;
    if (reduce) { el.innerHTML = end.toFixed(dec) + '<span class="accent">' + suffix + '</span>'; return; }
    var start = null, dur = 2000;
    (function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var v = end * (1 - Math.pow(1 - p, 4));
      el.innerHTML = v.toFixed(dec) + '<span class="accent">' + suffix + '</span>';
      if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { runCounter(en.target); io.unobserve(en.target); } });
    }, { threshold: .5 });
    counters.forEach(function (c) { io.observe(c); });
  } else counters.forEach(runCounter);

  /* =========================================================
     GSAP animations
     ========================================================= */
  if (!hasGSAP || reduce) {
    var pl = document.querySelector('.preloader');
    if (pl) pl.remove();
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  if (window.SplitText) gsap.registerPlugin(SplitText);

  /* Preloader (home page, once per visit) */
  var preloader = document.querySelector('.preloader');
  var introDelay = 0;
  if (preloader) {
    if (sessionStorage.getItem('aw-loaded')) { preloader.remove(); }
    else {
      sessionStorage.setItem('aw-loaded', '1');
      introDelay = 1.5;
      if (lenis) lenis.stop();
      var tl = gsap.timeline({ onComplete: function () { preloader.remove(); if (lenis) lenis.start(); } });
      tl.from('.preloader .logo', { yPercent: 110, duration: .8, ease: 'power4.out' })
        .to('.preloader .pl-bar', { scaleX: 1, duration: .7, ease: 'power2.inOut' }, '-=.3')
        .to(preloader, { yPercent: -100, duration: .8, ease: 'power4.inOut' }, '+=.05');
    }
  }

  /* Header drops in */
  gsap.from('.site-header .nav > *', { y: -30, autoAlpha: 0, duration: .8, stagger: .08, ease: 'power3.out', delay: introDelay + .1 });

  /* Split headings */
  function splitHeadings() {
    document.querySelectorAll('[data-split]').forEach(function (el) {
      var inHero = !!el.closest('.hero, .page-hero');
      if (window.SplitText) {
        var split = new SplitText(el, { type: 'lines,words', mask: 'lines', linesClass: 'split-line' });
        gsap.from(split.words, {
          yPercent: 110, rotate: 4, duration: 1, stagger: .04, ease: 'power4.out',
          delay: inHero ? introDelay + .25 : 0,
          scrollTrigger: inHero ? null : { trigger: el, start: 'top 85%' }
        });
      } else {
        gsap.from(el, { y: 50, autoAlpha: 0, duration: 1, ease: 'power3.out', delay: inHero ? introDelay + .2 : 0, scrollTrigger: inHero ? null : { trigger: el, start: 'top 85%' } });
      }
    });
  }
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(splitHeadings);

  /* Hero extras */
  var heroBits = gsap.utils.toArray('.hero [data-hero], .page-hero [data-hero]');
  if (heroBits.length) gsap.from(heroBits, { y: 40, autoAlpha: 0, duration: 1, stagger: .12, ease: 'power3.out', delay: introDelay + .6 });
  gsap.utils.toArray('.float-chip').forEach(function (c, i) {
    gsap.from(c, { scale: 0, autoAlpha: 0, duration: .9, ease: 'back.out(1.8)', delay: introDelay + 1 + i * .15 });
  });

  /* Reveal on scroll */
  gsap.utils.toArray('[data-reveal]').forEach(function (el) {
    gsap.from(el, { y: 60, autoAlpha: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });

  /* Stagger children */
  gsap.utils.toArray('[data-stagger]').forEach(function (wrap) {
    var kids = wrap.querySelectorAll(':scope > *');
    gsap.from(kids, { y: 70, autoAlpha: 0, duration: .9, stagger: .09, ease: 'power3.out', scrollTrigger: { trigger: wrap, start: 'top 85%' } });
  });

  /* Parallax */
  gsap.utils.toArray('[data-parallax]').forEach(function (el) {
    var s = parseFloat(el.getAttribute('data-parallax')) || .2;
    gsap.to(el, { yPercent: -100 * s, ease: 'none', scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* Visual cards: rings rotate + scale on scroll */
  gsap.utils.toArray('.visual').forEach(function (v) {
    gsap.from(v, { scale: .85, rotate: -4, autoAlpha: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: v, start: 'top 85%' } });
  });

  /* CTA band scales up */
  gsap.utils.toArray('.cta-band').forEach(function (c) {
    gsap.from(c, { scale: .9, borderRadius: '80px', duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 90%' } });
  });

  /* Big footer word slides in letter by letter */
  var big = document.querySelector('[data-footer-big]');
  if (big) {
    gsap.from(big, { yPercent: 60, autoAlpha: 0, duration: 1.4, ease: 'power4.out', scrollTrigger: { trigger: big, start: 'top 95%' } });
  }

  /* Marquee skews with scroll speed */
  var skewEls = gsap.utils.toArray('.marquee:not(.marquee--big), .t-slider');
  if (skewEls.length) {
    var setSkew = gsap.quickTo(skewEls, 'skewX', { duration: .4, ease: 'power3' });
    ScrollTrigger.create({
      onUpdate: function (self) { setSkew(gsap.utils.clamp(-8, 8, self.getVelocity() / -300)); }
    });
  }

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
