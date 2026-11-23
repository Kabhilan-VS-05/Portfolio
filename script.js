(function () {
  'use strict';

  var root = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function store(key, value) {
    try {
      if (value === undefined) { return localStorage.getItem(key); }
      localStorage.setItem(key, value);
    } catch (e) { /* storage blocked, ignore */ }
    return null;
  }

  /* ---------- Theme ---------- */
  var saved = store('theme');
  var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  root.setAttribute('data-theme', saved || (prefersLight ? 'light' : 'dark'));
  $('#theme-toggle').addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    store('theme', next);
  });

  /* ---------- Mobile menu ---------- */
  var menuBtn = $('#menu-btn');
  var links = $('#nav-links');
  function closeMenu() {
    links.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
  menuBtn.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  $$('a', links).forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeMenu(); } });

  /* ---------- Scroll: nav state, progress bar, back to top ---------- */
  var navAnchors = $$('a', links);
  var nav = $('#nav');
  var bar = $('#progress');
  var toTop = $('#to-top');
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    nav.classList.toggle('scrolled', y > 8);
    bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    toTop.hidden = y < 600;
    if (y < 200) { navAnchors.forEach(function (a) { a.classList.remove('active'); }); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  /* ---------- Active section highlight ---------- */
  var sections = navAnchors.map(function (a) { return $(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          navAnchors.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Count-up stats ---------- */
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduceMotion || isNaN(target)) { el.textContent = target + suffix; return; }
    var start = null;
    function step(ts) {
      if (start === null) { start = ts; }
      var p = Math.min((ts - start) / 1100, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) { requestAnimationFrame(step); }
    }
    requestAnimationFrame(step);
  }
  var counters = $$('[data-count]');
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { countUp(en.target); co.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { co.observe(c); });
  } else {
    counters.forEach(countUp);
  }

  /* ---------- Typing effect ---------- */
  var typed = $('#typed');
  var phrases = ['full-stack web apps', 'AI and vector search systems', 'computer vision pipelines', 'cross-platform mobile apps'];
  if (typed && !reduceMotion) {
    var pi = 0, ci = 0, deleting = false;
    (function tick() {
      var word = phrases[pi];
      typed.textContent = word.slice(0, ci);
      var delay = deleting ? 35 : 70;
      if (!deleting && ci === word.length) { deleting = true; delay = 1600; }
      else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 350; }
      ci += deleting ? -1 : 1;
      setTimeout(tick, delay);
    })();
  }

  /* ---------- Project filter and search ---------- */
  var chips = $$('.chip');
  var cards = $$('.project');
  var search = $('#search');
  var empty = $('#empty');
  var activeFilter = 'all';
  function applyFilter() {
    var q = (search.value || '').trim().toLowerCase();
    var shown = 0;
    cards.forEach(function (card) {
      var inCat = activeFilter === 'all' || card.getAttribute('data-cat').split(' ').indexOf(activeFilter) !== -1;
      var inText = !q || card.textContent.toLowerCase().indexOf(q) !== -1;
      var show = inCat && inText;
      card.hidden = !show;
      if (show) { shown++; }
    });
    empty.hidden = shown !== 0;
  }
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      activeFilter = chip.getAttribute('data-filter');
      chips.forEach(function (c) {
        var on = c === chip;
        c.classList.toggle('active', on);
        c.setAttribute('aria-selected', String(on));
      });
      applyFilter();
    });
  });
  search.addEventListener('input', applyFilter);

  /* ---------- Copy email ---------- */
  var copyBtn = $('#copy-email');
  var copyLabel = $('#copy-label');
  copyBtn.addEventListener('click', function () {
    var email = copyBtn.getAttribute('data-email');
    function done(ok) {
      copyLabel.textContent = ok ? 'Copied' : email;
      setTimeout(function () { copyLabel.textContent = 'Copy email'; }, 1800);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(function () { done(true); }, function () { done(false); });
    } else { done(false); }
  });

  /* ---------- Contact form (opens the visitor's mail app) ---------- */
  var form = $('#contact-form');
  var msg = $('#form-msg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.elements.name;
    var email = form.elements.email;
    var text = form.elements.message;
    var ok = true;
    [name, email, text].forEach(function (f) {
      var valid = f.value.trim() !== '' && (f !== email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim()));
      f.classList.toggle('invalid', !valid);
      if (!valid) { ok = false; }
    });
    if (!ok) {
      msg.textContent = 'Please fill in every field with a valid email.';
      msg.className = 'form-msg err';
      return;
    }
    var subject = encodeURIComponent('Portfolio message from ' + name.value.trim());
    var body = encodeURIComponent(text.value.trim() + '\n\nFrom: ' + name.value.trim() + ' (' + email.value.trim() + ')');
    msg.textContent = 'Opening your email app...';
    msg.className = 'form-msg';
    window.location.href = 'mailto:kabhilan2905@gmail.com?subject=' + subject + '&body=' + body;
  });

  /* ---------- Live GitHub repo count (falls back to the static number) ---------- */
  var repoEl = $('#gh-repos');
  if (repoEl && window.fetch) {
    fetch('https://api.github.com/users/Kabhilan-VS-05')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { if (d && typeof d.public_repos === 'number') { repoEl.textContent = d.public_repos; } })
      .catch(function () { /* keep fallback */ });
  }

  /* ---------- Footer year ---------- */
  var yr = $('#year');
  if (yr) { yr.textContent = new Date().getFullYear(); }
})();
