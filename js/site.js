/* kasper-krog.dk: runtime for both front pages and the 404, without
   dependencies. It keeps the theme and remembers the language choice;
   the pages read fine without it. */
(function () {
  'use strict';

  var doc = document.documentElement;
  var THEME_KEY = 'kk-theme';
  var LANG_KEY = 'kk-lang';
  var OVERRIDE_HOURS = 3;
  var THEME_COLORS = { dawn: '#f4f5f3', dusk: '#16181a' };

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
})();
