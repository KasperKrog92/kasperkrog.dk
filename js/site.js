/* kasper-krog.dk: runtime for both front pages and the 404, without
   dependencies. */
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

  // Linjen: the route diagram shows one stop at a time on wide screens.
  // Phones and script-less visits read every stop as one page.
  var route = document.getElementById('route');
  if (route) { setUpLine(route); }

  function setUpLine(route) {
    var danish = doc.lang === 'da';
    var words = danish
      ? { stop: 'Station', of: 'af', next: 'Næste', end: 'Endestation' }
      : { stop: 'Stop', of: 'of', next: 'Next', end: 'End of the line' };
    var aliases = { arbejde: 'folkfestival', work: 'folk-festival' };
    var wide = window.matchMedia('(min-width: 900px)');
    var links = Array.prototype.slice.call(route.querySelectorAll('a'));
    var stops = links.map(function (link) { return document.getElementById(link.hash.slice(1)); });
    var boardNext = document.getElementById('board-next');
    var current = -1;

    var train = document.createElement('span');
    train.className = 'train';
    route.appendChild(train);

    function nameOf(i) { return links[i].textContent.trim(); }

    function indexOf(id) {
      id = aliases[id] || id;
      for (var n = 0; n < stops.length; n += 1) { if (stops[n].id === id) { return n; } }
      return -1;
    }

    function centerOf(i) {
      var dot = links[i].querySelector('.dot').getBoundingClientRect();
      return dot.left + dot.width / 2 - route.getBoundingClientRect().left;
    }

    function placeTrain() {
      if (current < 0 || !wide.matches) { return; }
      var x = centerOf(current);
      route.style.setProperty('--progress', (x - centerOf(0)) + 'px');
      route.style.setProperty('--train-x', (x - 5) + 'px');
    }

    function go(i, moveFocus, keepUrl) {
      i = Math.max(0, Math.min(stops.length - 1, i));
      if (i === current) { return; }
      var back = i < current;
      current = i;
      stops.forEach(function (stop, n) {
        stop.classList.toggle('is-current', n === i);
        stop.classList.toggle('from-left', back);
      });
      links.forEach(function (link, n) {
        link.parentNode.classList.toggle('passed', n < i);
        if (n === i) { link.setAttribute('aria-current', 'step'); } else { link.removeAttribute('aria-current'); }
      });
      if (boardNext) { boardNext.textContent = i < stops.length - 1 ? nameOf(i + 1) : words.end; }
      if (!keepUrl && history.replaceState) { history.replaceState(null, '', '#' + stops[i].id); }
      placeTrain();
      if (moveFocus) { stops[i].querySelector('h1, h2').focus({ preventScroll: true }); }
    }

    stops.forEach(function (stop, n) {
      var heading = stop.querySelector('h1, h2');
      if (heading) { heading.setAttribute('tabindex', '-1'); }
      if (n === stops.length - 1) { return; }
      var foot = document.createElement('div');
      foot.className = 'stop-foot';
      var where = document.createElement('span');
      where.textContent = words.stop + ' ' + (n + 1) + ' ' + words.of + ' ' + stops.length;
      var next = document.createElement('button');
      next.type = 'button';
      next.className = 'next';
      next.textContent = words.next + ': ' + nameOf(n + 1) + ' →';
      next.addEventListener('click', function () { go(n + 1, true); });
      foot.appendChild(where);
      foot.appendChild(next);
      stop.querySelector('.stop-copy').appendChild(foot);
    });

    document.addEventListener('click', function (event) {
      var target = event.target.closest('a[href^="#"], [data-go]');
      if (!target) { return; }
      var n = indexOf(target.getAttribute('data-go') || target.hash.slice(1));
      if (n < 0) { return; }
      event.preventDefault();
      if (wide.matches) {
        go(n, true);
      } else {
        stops[n].scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth' });
        if (history.replaceState) { history.replaceState(null, '', '#' + stops[n].id); }
      }
    });

    document.addEventListener('keydown', function (event) {
      if (!wide.matches || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) { return; }
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName)) { return; }
      if (event.key === 'ArrowRight') { go(current + 1, false); }
      if (event.key === 'ArrowLeft') { go(current - 1, false); }
    });

    window.addEventListener('hashchange', function () {
      var n = indexOf(location.hash.slice(1));
      if (n >= 0 && wide.matches) { go(n, true); }
    });

    window.addEventListener('resize', placeTrain);
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(placeTrain); }

    doc.classList.add('line-ready');
    var start = indexOf(location.hash.slice(1));
    go(start < 0 ? 0 : start, false, true);
    if (start > 0 && !wide.matches) { stops[start].scrollIntoView(); }
    // A deep link on a short wide screen: the browser's own fragment scroll
    // would push the route out of view, so keep the top in place.
    if (start > 0 && wide.matches) {
      window.addEventListener('load', function () { window.scrollTo(0, 0); });
    }
  }

  // Departure board clock
  var boardTime = document.getElementById('board-time');
  function tick() {
    var now = new Date();
    boardTime.textContent = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  }
  if (boardTime) {
    tick();
    setInterval(tick, 15000);
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
