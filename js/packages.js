/* =========================================================
   AUSSIEWEB — PACKAGES & PRICES (AUD)
   Edit prices and features here. Pricing page, home page
   pricing preview and package details all read from this.
   ========================================================= */
(function () {
  var PACKAGES = [
    {
      id: 'website', label: 'Websites', unit: 'one-off',
      plans: [
        { id: 'website-starter', name: 'Starter', price: 499, desc: 'Perfect for landing pages and small ideas getting off the ground.', features: ['1–3 page website', 'Mobile-friendly design', 'Contact form', '2 rounds of revisions', 'Basic on-page SEO', 'Delivered in 7 days'] },
        { id: 'website-growth', name: 'Growth', price: 1299, popular: true, desc: 'Everything you need to scale your business online.', features: ['Up to 10 pages', 'Custom design + animations', 'CMS so you can edit it', 'Unlimited revisions', 'SEO optimised + speed tuned', 'Google Analytics setup', 'Priority support'] },
        { id: 'website-enterprise', name: 'Enterprise', price: null, desc: 'Full-scale custom builds, e-commerce and integrations.', features: ['Unlimited pages', 'E-commerce / bookings', 'Custom features & APIs', 'Dedicated project manager', 'Advanced security', '24/7 priority support'] }
      ]
    },
    {
      id: 'logo', label: 'Logo & Branding', unit: 'one-off',
      plans: [
        { id: 'logo-starter', name: 'Starter', price: 149, desc: 'A sharp, professional logo to get you started.', features: ['3 logo concepts', '2 rounds of revisions', 'Transparent PNG + JPG', 'Delivered in 48 hours'] },
        { id: 'logo-growth', name: 'Growth', price: 349, popular: true, desc: 'A complete brand kit that looks the goods everywhere.', features: ['6 logo concepts', 'Unlimited revisions', 'All source files (AI, SVG, PDF)', 'Business card + letterhead', 'Social media kit', 'Colour & font guide'] },
        { id: 'logo-enterprise', name: 'Enterprise', price: 799, desc: 'Full brand identity for businesses going big.', features: ['Unlimited concepts', 'Full brand guidelines book', 'Stationery + merchandise', 'Packaging mock-ups', 'Trademark-ready files', 'Dedicated brand designer'] }
      ]
    },
    {
      id: 'social', label: 'Social Media', unit: '/month',
      plans: [
        { id: 'social-starter', name: 'Starter', price: 399, desc: 'Stay active and look sharp on socials.', features: ['2 platforms', '12 posts per month', 'Custom branded designs', 'Captions + hashtags', 'Monthly report'] },
        { id: 'social-growth', name: 'Growth', price: 799, popular: true, desc: 'Grow a real following that actually buys.', features: ['3 platforms', '20 posts + 8 reels', 'Community management', 'Ad campaign setup', 'Competitor research', 'Fortnightly report'] },
        { id: 'social-enterprise', name: 'Enterprise', price: 1499, desc: 'Full-service social for serious brands.', features: ['All platforms', '30 posts + 15 reels', 'Influencer outreach', 'Paid ads management', 'Content shoot days', 'Weekly strategy calls'] }
      ]
    },
    {
      id: 'seo', label: 'SEO', unit: '/month',
      plans: [
        { id: 'seo-starter', name: 'Starter', price: 499, desc: 'Get found by locals searching for you.', features: ['10 target keywords', 'Google Business Profile', 'On-page optimisation', 'Technical audit', 'Monthly ranking report'] },
        { id: 'seo-growth', name: 'Growth', price: 999, popular: true, desc: 'Outrank your competitors in your city.', features: ['30 target keywords', '4 blog articles / month', 'Quality backlinks', 'Local citations', 'Speed + Core Web Vitals', 'Fortnightly report'] },
        { id: 'seo-enterprise', name: 'Enterprise', price: 1999, desc: 'National SEO for ambitious brands.', features: ['Unlimited keywords', '10 articles / month', 'Digital PR links', 'E-commerce SEO', 'Dedicated SEO strategist', 'Weekly reporting'] }
      ]
    }
  ];
  window.AUSSIE_PACKAGES = PACKAGES;

  var R = document.body.getAttribute('data-root') || '';
  var icon = window.AUSSIE_ICON || function () { return ''; };

  function priceHTML(plan, unit) {
    if (plan.price === null) return '<div class="price">Custom</div>';
    return '<div class="price"><sup>A$</sup>' + plan.price.toLocaleString('en-AU') + ' <small>' + unit + '</small></div>';
  }

  function cardHTML(plan, unit) {
    return '<div class="price-card' + (plan.popular ? ' price-card--popular' : '') + '">' +
      (plan.popular ? '<span class="badge">Most popular</span>' : '') +
      '<h3>' + plan.name + '</h3><p class="price-desc">' + plan.desc + '</p>' + priceHTML(plan, unit) +
      '<ul class="check-list">' + plan.features.map(function (f) { return '<li>' + f + '</li>'; }).join('') + '</ul>' +
      '<a href="' + R + 'package.html?plan=' + plan.id + '" class="btn ' + (plan.popular ? 'btn--primary' : 'btn--ghost') + '">Choose ' + plan.name + ' ' + icon('arrow') + '</a></div>';
  }

  /* <div data-pricing></div> renders tabs + all plans.
     <div data-pricing="website"></div> renders one category without tabs. */
  document.querySelectorAll('[data-pricing]').forEach(function (box) {
    var only = box.getAttribute('data-pricing');
    var cats = only ? PACKAGES.filter(function (c) { return c.id === only; }) : PACKAGES;
    var tabs = cats.length > 1 ? '<div style="text-align:center"><div class="pricing-toggle" role="tablist">' + cats.map(function (c, i) {
      return '<button role="tab" data-tab="' + c.id + '"' + (i === 0 ? ' class="is-active"' : '') + '>' + c.label + '</button>';
    }).join('') + '</div></div>' : '';
    var panels = cats.map(function (c, i) {
      return '<div class="pricing-grid price-panel' + (i === 0 ? ' is-active' : '') + '" data-panel="' + c.id + '">' + c.plans.map(function (p) { return cardHTML(p, c.unit); }).join('') + '</div>';
    }).join('');
    box.innerHTML = tabs + panels;
  });

  /* Package details page */
  var detail = document.querySelector('[data-package-detail]');
  if (detail) {
    var id = new URLSearchParams(location.search).get('plan') || 'website-growth';
    var cat, plan;
    PACKAGES.forEach(function (c) { c.plans.forEach(function (p) { if (p.id === id) { cat = c; plan = p; } }); });
    if (!plan) { cat = PACKAGES[0]; plan = cat.plans[1]; }

    document.title = plan.name + ' ' + cat.label + ' Package | AussieWeb';
    document.querySelectorAll('[data-pkg-name]').forEach(function (el) { el.textContent = plan.name + ' ' + cat.label; });
    document.querySelectorAll('[data-pkg-desc]').forEach(function (el) { el.textContent = plan.desc; });

    var summary = document.querySelector('[data-pkg-summary]');
    if (summary) summary.innerHTML = cardHTML(plan, cat.unit).replace(/package\.html\?plan=[^"]+/, 'contact.html?plan=' + plan.id).replace(/Choose \w+/, 'Get started');

    var feats = document.querySelector('[data-pkg-features]');
    if (feats) feats.innerHTML = plan.features.map(function (f, i) {
      return '<div class="pkg-feature" data-reveal><strong>' + f + '</strong><small>Included as standard — no hidden extras, no worries.</small></div>';
    }).join('');

    var cmp = document.querySelector('[data-pkg-compare]');
    if (cmp) {
      var all = [];
      cat.plans.forEach(function (p) { p.features.forEach(function (f) { if (all.indexOf(f) < 0) all.push(f); }); });
      cmp.innerHTML = '<div class="compare-wrap"><table class="compare"><thead><tr><th>Feature</th>' +
        cat.plans.map(function (p) { return '<th>' + p.name + '</th>'; }).join('') + '</tr></thead><tbody>' +
        all.map(function (f) {
          return '<tr><td>' + f + '</td>' + cat.plans.map(function (p) {
            return p.features.indexOf(f) > -1 ? '<td class="yes">' + icon('check') + '</td>' : '<td class="no">—</td>';
          }).join('') + '</tr>';
        }).join('') + '</tbody></table></div>';
    }

    var others = document.querySelector('[data-pkg-others]');
    if (others) others.innerHTML = cat.plans.filter(function (p) { return p.id !== plan.id; }).map(function (p) { return cardHTML(p, cat.unit); }).join('');
  }
})();
