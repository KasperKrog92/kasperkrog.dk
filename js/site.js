/* kasper-krog.dk: front-page runtime, without dependencies.
   The kk-theme key, time boundary and three-hour override are shared with
   the old rooms in js/main.js. */
(function () {
  'use strict';

  var doc = document.documentElement;
  var THEME_KEY = 'kk-theme';
  var LANG_KEY = 'kk-lang';
  var OVERRIDE_HOURS = 3;
  var THEME_COLORS = { dawn: '#f4f5f3', dusk: '#16181a' };
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

  function currentTheme() {
    return doc.dataset.theme === 'dusk' ? 'dusk' : 'dawn';
  }

  function applyTheme(theme) {
    doc.dataset.theme = theme;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) { meta.content = THEME_COLORS[theme]; }
    var toggle = document.getElementById('lantern');
    if (toggle) { toggle.setAttribute('aria-pressed', theme === 'dusk' ? 'true' : 'false'); }
  }

  var themeToggle = document.getElementById('lantern');
  var themePresses = [];
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = currentTheme() === 'dusk' ? 'dawn' : 'dusk';
      applyTheme(next);
      try {
        localStorage.setItem(THEME_KEY, JSON.stringify({
          theme: next,
          expiresAt: Date.now() + OVERRIDE_HOURS * 60 * 60 * 1000
        }));
      } catch (e) {}

      var now = Date.now();
      themePresses.push(now);
      themePresses = themePresses.filter(function (time) { return now - time < 1600; });
      if (themePresses.length >= 3) {
        themePresses = [];
        summonRain();
      }
    });
  }

  function syncTheme() {
    if (savedTheme() === null) { applyTheme(timeTheme()); }
  }

  applyTheme(savedTheme() || timeTheme());
  setInterval(syncTheme, 60000);
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) { syncTheme(); }
  });

  Array.prototype.forEach.call(document.querySelectorAll('[data-lang-choice]'), function (link) {
    link.addEventListener('click', function () {
      try { localStorage.setItem(LANG_KEY, link.getAttribute('data-lang-choice')); } catch (e) {}
    });
  });

  var menuToggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('primary-nav');
  var main = document.querySelector('main');
  var footer = document.querySelector('footer');

  function setMenu(open) {
    if (!menuToggle || !menu) { return; }
    document.body.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuToggle.textContent = open ? (doc.lang === 'da' ? 'Luk' : 'Close') : 'Menu';
    if ('inert' in HTMLElement.prototype) {
      if (main) { main.inert = open; }
      if (footer) { footer.inert = open; }
    }
  }

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', function () {
      setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
    });
    Array.prototype.forEach.call(menu.querySelectorAll('a'), function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        menuToggle.focus();
      }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 700) { setMenu(false); }
    });
  }

  var seam = document.querySelector('.kind-seam');
  if (seam) {
    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      seam.classList.add('is-drawn');
    } else {
      var seamObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            seam.classList.add('is-drawn');
            seamObserver.disconnect();
          }
        });
      }, { rootMargin: '0px 0px -10% 0px', threshold: .1 });
      seamObserver.observe(seam);
    }
  }

  var rainCanvas = null;
  function summonRain() {
    if (reducedMotion.matches || rainCanvas) { return; }

    rainCanvas = document.createElement('canvas');
    rainCanvas.className = 'rain-visit';
    rainCanvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(rainCanvas);

    var context = rainCanvas.getContext('2d');
    var drops = [];
    var running = true;

    function sizeRain() {
      rainCanvas.width = window.innerWidth;
      rainCanvas.height = window.innerHeight;
    }

    sizeRain();
    window.addEventListener('resize', sizeRain);

    for (var i = 0; i < 110; i += 1) {
      drops.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        length: 8 + Math.random() * 14,
        speed: 240 + Math.random() * 260
      });
    }

    var last = performance.now();
    function drawRain(now) {
      if (!running) { return; }
      var delta = Math.min((now - last) / 1000, .05);
      last = now;
      context.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
      context.strokeStyle = currentTheme() === 'dusk' ? 'rgba(210, 218, 224, .25)' : 'rgba(70, 80, 90, .2)';
      context.lineWidth = 1;

      drops.forEach(function (drop) {
        drop.y += drop.speed * delta;
        if (drop.y > rainCanvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * rainCanvas.width;
        }
        context.beginPath();
        context.moveTo(drop.x, drop.y);
        context.lineTo(drop.x - 1.5, drop.y + drop.length);
        context.stroke();
      });
      requestAnimationFrame(drawRain);
    }

    requestAnimationFrame(drawRain);
    rainCanvas.classList.add('is-raining');
    setTimeout(function () {
      rainCanvas.classList.remove('is-raining');
      setTimeout(function () {
        running = false;
        window.removeEventListener('resize', sizeRain);
        if (rainCanvas && rainCanvas.parentNode) { rainCanvas.parentNode.removeChild(rainCanvas); }
        rainCanvas = null;
      }, 1400);
    }, 26000);
  }
})();
