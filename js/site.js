/* kasper-krog.dk: forsidens runtime. Ingen afhængigheder.
   Temakontrakten (kk-theme, dawn/dusk, 3 timers tilsidesættelse) deles med
   de gamle rum i js/main.js. Ændres den ét sted, skal den ændres begge steder. */
(function () {
  'use strict';

  var doc = document.documentElement;
  var THEME_KEY = 'kk-theme';
  var LANG_KEY = 'kk-lang';
  var OVERRIDE_HOURS = 3;
  var THEME_COLORS = { dawn: '#f2ecdf', dusk: '#12161c' };
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function timeTheme() {
    var hour = new Date().getHours();
    return hour >= 7 && hour < 19 ? 'dawn' : 'dusk';
  }

  function savedTheme() {
    try {
      var saved = JSON.parse(localStorage.getItem(THEME_KEY));
      if (saved && (saved.theme === 'dawn' || saved.theme === 'dusk') && saved.expiresAt > Date.now()) {
        return saved.theme;
      }
      localStorage.removeItem(THEME_KEY);
    } catch (e) {
      try { localStorage.removeItem(THEME_KEY); } catch (e2) {}
    }
    return null;
  }

  function applyTheme(theme) {
    doc.dataset.theme = theme;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) { meta.content = THEME_COLORS[theme]; }
    var lantern = document.getElementById('lantern');
    if (lantern) { lantern.setAttribute('aria-pressed', theme === 'dusk' ? 'true' : 'false'); }
  }

  function currentTheme() {
    return doc.dataset.theme === 'dusk' ? 'dusk' : 'dawn';
  }

  /* Lanternen: skifter tema og husker valget i tre timer. */
  var lantern = document.getElementById('lantern');
  var lanternPresses = [];
  if (lantern) {
    lantern.addEventListener('click', function () {
      var next = currentTheme() === 'dusk' ? 'dawn' : 'dusk';
      applyTheme(next);
      try {
        localStorage.setItem(THEME_KEY, JSON.stringify({
          theme: next,
          expiresAt: Date.now() + OVERRIDE_HOURS * 60 * 60 * 1000
        }));
      } catch (e) {}
      /* Tre hurtige tryk kalder regnen frem et øjeblik. */
      var now = Date.now();
      lanternPresses.push(now);
      lanternPresses = lanternPresses.filter(function (t) { return now - t < 1600; });
      if (lanternPresses.length >= 3) {
        lanternPresses = [];
        summonRain();
      }
    });
  }

  /* Følg tiden, når der ikke er en gyldig tilsidesættelse. */
  function syncTheme() {
    if (savedTheme() === null) { applyTheme(timeTheme()); }
  }
  applyTheme(savedTheme() || timeTheme());
  setInterval(syncTheme, 60000);
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) { syncTheme(); }
  });

  /* Sprogvalget huskes, så et senere besøg kan vises i det valgte sprog. */
  var langLinks = document.querySelectorAll('[data-lang-choice]');
  Array.prototype.forEach.call(langLinks, function (link) {
    link.addEventListener('click', function () {
      try { localStorage.setItem(LANG_KEY, link.getAttribute('data-lang-choice')); } catch (e) {}
    });
  });

  /* Stille ankomster. Uden JavaScript, eller med reduceret bevægelse,
     står alt fremme fra start. */
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    doc.classList.add('js-reveal');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    Array.prototype.forEach.call(document.querySelectorAll('.reveal'), function (el) {
      observer.observe(el);
    });
  }

  /* Regnen fra det gamle hus. Kun på opfordring, kun et halvt minut,
     og aldrig ved reduceret bevægelse. */
  var rainCanvas = null;
  var rainStop = null;
  function summonRain() {
    if (reducedMotion.matches || rainCanvas) { return; }
    rainCanvas = document.createElement('canvas');
    rainCanvas.className = 'rain-visit';
    rainCanvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(rainCanvas);
    var ctx = rainCanvas.getContext('2d');
    var drops = [];
    var running = true;
    function size() {
      rainCanvas.width = window.innerWidth;
      rainCanvas.height = window.innerHeight;
    }
    size();
    window.addEventListener('resize', size);
    for (var i = 0; i < 110; i++) {
      drops.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        len: 8 + Math.random() * 14,
        speed: 240 + Math.random() * 260
      });
    }
    var last = performance.now();
    function frame(now) {
      if (!running) { return; }
      var dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
      ctx.strokeStyle = currentTheme() === 'dusk' ? 'rgba(200, 210, 225, 0.28)' : 'rgba(70, 80, 95, 0.22)';
      ctx.lineWidth = 1;
      drops.forEach(function (d) {
        d.y += d.speed * dt;
        if (d.y > rainCanvas.height) { d.y = -d.len; d.x = Math.random() * rainCanvas.width; }
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 1.5, d.y + d.len);
        ctx.stroke();
      });
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    rainCanvas.classList.add('is-raining');
    rainStop = setTimeout(function () {
      rainCanvas.classList.remove('is-raining');
      setTimeout(function () {
        running = false;
        if (rainCanvas && rainCanvas.parentNode) { rainCanvas.parentNode.removeChild(rainCanvas); }
        rainCanvas = null;
      }, 1400);
    }, 26000);
  }
})();
