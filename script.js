(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Theme (remembered) ---- */
  var root = document.documentElement;
  var themeBtn = $('#theme');
  function setTheme(t) {
    root.setAttribute('data-theme', t);
    themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    themeBtn.setAttribute('title', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
  var savedTheme = null;
  try { savedTheme = localStorage.getItem('theme'); } catch (e) { /* ignore */ }
  setTheme(savedTheme === 'light' ? 'light' : 'dark');
  themeBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
  });

  /* ---- Scroll progress line and back-to-top ---- */
  var bar = $('#bar');
  var progress = $('#progress');
  var toTop = $('#to-top');
  function onScroll() {
    var y = window.scrollY;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    bar.classList.toggle('line', y > 8);
    toTop.hidden = y < 500;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });

  /* ---- Gentle fade-in for sections ---- */
  var fades = $$('.block');
  if ('IntersectionObserver' in window && !reduce) {
    fades.forEach(function (el) { el.classList.add('fade'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    fades.forEach(function (el) { io.observe(el); });
  }

  /* ---- Highlight the current section in the top bar ---- */
  var navLinks = $$('#nav a');
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id); });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    navLinks.forEach(function (a) { var s = $(a.getAttribute('href')); if (s) { spy.observe(s); } });
  }

  /* ---- Mobile menu ---- */
  var menuBtn = $('#menu');
  var navEl = $('#nav');
  function closeMenu() {
    navEl.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
  }
  menuBtn.addEventListener('click', function () {
    var open = navEl.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  navEl.addEventListener('click', function (e) { if (e.target.tagName === 'A') { closeMenu(); } });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeMenu(); } });
  window.addEventListener('resize', function () { if (window.innerWidth > 760) { closeMenu(); } });

  /* ---- Copy email ---- */
  var copy = $('#copy');
  var copyText = $('#copy-text');
  copy.addEventListener('click', function () {
    var email = copy.getAttribute('data-email');
    function done(ok) {
      copyText.textContent = ok ? 'Copied' : email;
      setTimeout(function () { copyText.textContent = 'Copy email'; }, 1800);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(function () { done(true); }, function () { done(false); });
    } else { done(false); }
  });

  /* ---- Project filter ---- */
  var cards = $$('.card');
  var chips = $$('.chip');
  var none = $('#none');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      var shown = 0;
      chips.forEach(function (c) {
        var on = c === chip;
        c.classList.toggle('on', on);
        c.setAttribute('aria-pressed', String(on));
      });
      cards.forEach(function (c) {
        c.hidden = !(f === 'all' || c.getAttribute('data-cat').split(' ').indexOf(f) !== -1);
        if (!c.hidden) { shown++; }
      });
      none.hidden = shown !== 0;
    });
  });

  /* ---- Project details dialog ---- */
  var modal = $('#modal');
  var mLink = $('#m-link');
  var lastFocus = null;
  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      lastFocus = card;
      $('#m-title').textContent = $('.card-title', card).textContent;
      $('#m-meta').textContent = $('.d-meta', card).textContent;
      $('#m-text').textContent = $('.d-text', card).textContent;
      $('#m-tech').textContent = $('.card-tech', card).textContent;
      var link = $('.d-link', card);
      if (link) { mLink.href = link.getAttribute('data-href'); mLink.hidden = false; } else { mLink.hidden = true; }
      if (typeof modal.showModal === 'function') { modal.showModal(); } else { modal.setAttribute('open', ''); }
    });
  });
  function closeModal() {
    if (typeof modal.close === 'function') { modal.close(); } else { modal.removeAttribute('open'); }
    if (lastFocus) { lastFocus.focus(); }
  }
  $('#m-close').addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) { closeModal(); } });

  /* ---- Tabs ---- */
  var tabs = $$('.tab');
  function selectTab(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.classList.toggle('on', on);
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      $('#' + t.getAttribute('aria-controls')).hidden = !on;
    });
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectTab(tab); });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight') { next = tabs[(i + 1) % tabs.length]; }
      if (e.key === 'ArrowLeft') { next = tabs[(i - 1 + tabs.length) % tabs.length]; }
      if (next) { e.preventDefault(); selectTab(next); next.focus(); }
    });
  });

  /* ---- Coding activity (data comes from stats.js, refreshed daily) ---- */
  var S = window.STATS;
  var grid = $('#stats-grid');
  if (!S) {
    if (grid) { grid.parentNode.hidden = true; }
  } else {
    var nf = new Intl.NumberFormat('en-IN');
    $$('[data-stat]').forEach(function (el) {
      var path = el.getAttribute('data-stat').split('.');
      var v = S[path[0]] && S[path[0]][path[1]];
      el.textContent = (v === undefined || v === null) ? '-' : nf.format(v);
    });
    if (S.updated) {
      var d = new Date(S.updated + 'T00:00:00');
      $('#stats-date').textContent = 'Last updated ' + d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + '.';
    }

    var NS = 'http://www.w3.org/2000/svg';
    function svgEl(name, attrs) {
      var e = document.createElementNS(NS, name);
      Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
      return e;
    }

    // Total practice problems in the home highlights
    var solvedItem = $('#hero-solved-item');
    if (solvedItem && S.leetcode && S.gfg) {
      $('#hero-solved').textContent = nf.format((S.leetcode.solved || 0) + (S.gfg.solved || 0));
      solvedItem.hidden = false;
    }

    // GitHub contribution heatmap
    var gh = S.github || {};
    var heat = $('#heatmap');
    if (heat && gh.calendar && gh.calendar.length) {
      var cell = 11, gap = 3, left = 0, top = 16;
      var weeks = gh.calendar;
      heat.setAttribute('viewBox', '0 0 ' + (weeks.length * (cell + gap)) + ' ' + (top + 7 * (cell + gap)));
      var start = new Date(gh.calendar_start + 'T00:00:00');
      var lastMonth = -1;
      weeks.forEach(function (week, wi) {
        var offset = wi === 0 ? 7 - week.length : 0;
        var wkStart = new Date(start.getTime() + wi * 7 * 86400000);
        if (wkStart.getMonth() !== lastMonth && wi < weeks.length - 2) {
          lastMonth = wkStart.getMonth();
          var label = svgEl('text', { x: left + wi * (cell + gap), y: 10, 'font-size': 9, fill: 'currentColor' });
          label.textContent = wkStart.toLocaleDateString('en-GB', { month: 'short' });
          label.style.fill = 'var(--muted)';
          heat.appendChild(label);
        }
        week.forEach(function (count, di) {
          var level = count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4;
          var r = svgEl('rect', { x: left + wi * (cell + gap), y: top + (di + offset) * (cell + gap), width: cell, height: cell, 'class': 'l' + level });
          var t = document.createElementNS(NS, 'title');
          t.textContent = count + (count === 1 ? ' contribution' : ' contributions');
          r.appendChild(t);
          heat.appendChild(r);
        });
      });
    } else if (heat) {
      heat.parentNode.hidden = true;
      var lg = $('.heat-legend');
      if (lg) { lg.hidden = true; }
    }

    if (heat && heat.parentNode) { heat.parentNode.scrollLeft = heat.parentNode.scrollWidth; }

    // GitHub languages
    var langBox = $('#langs');
    if (langBox && gh.languages) {
      gh.languages.forEach(function (l) {
        var row = document.createElement('div');
        row.className = 'lang';
        row.innerHTML = '<span></span><div class="bar-track"><div class="bar-fill"></div></div><em></em>';
        row.children[0].textContent = l.name;
        row.children[1].firstChild.style.width = l.pct + '%';
        row.children[2].textContent = l.pct + '%';
        langBox.appendChild(row);
      });
    }

    // LeetCode donut
    var lc = S.leetcode;
    var donut = $('#donut');
    if (donut && lc) {
      var R = 38, C = 2 * Math.PI * R, total = lc.easy + lc.medium + lc.hard || 1;
      var off = 0;
      [['easy', '#3fb960'], ['medium', '#d9a441'], ['hard', '#e5594f']].forEach(function (p) {
        var len = (lc[p[0]] / total) * C;
        donut.appendChild(svgEl('circle', {
          cx: 50, cy: 50, r: R, fill: 'none', stroke: p[1], 'stroke-width': 10,
          'stroke-dasharray': len + ' ' + (C - len), 'stroke-dashoffset': -off, transform: 'rotate(-90 50 50)'
        }));
        off += len;
      });
      var num = svgEl('text', { x: 50, y: 52, 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 700 });
      num.textContent = lc.solved;
      var cap = svgEl('text', { x: 50, y: 65, 'text-anchor': 'middle', 'font-size': 7 });
      cap.textContent = 'solved';
      cap.style.fill = 'var(--muted)';
      donut.appendChild(num);
      donut.appendChild(cap);
    }
  }

  var yr = $('#year');
  if (yr) { yr.textContent = new Date().getFullYear(); }
})();
