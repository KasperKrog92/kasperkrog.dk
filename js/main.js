/* kasper-krog.dk — lantern, clock, reveal, rain. No dependencies. */
(function () {
  "use strict";

  var root = document.documentElement;
  var KEY = "kk-theme";
  var THEME_TTL = 3 * 60 * 60 * 1000;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- the lantern: dusk <-> dawn ---------------------------------- */
  var lantern = document.getElementById("lantern");
  var themeColor = document.querySelector('meta[name="theme-color"]');

  function timeTheme() {
    var hour = new Date().getHours();
    return hour >= 7 && hour < 19 ? "dawn" : "dusk";
  }

  function storedTheme() {
    try {
      var saved = JSON.parse(localStorage.getItem(KEY));
      if (saved && (saved.theme === "dawn" || saved.theme === "dusk") &&
          saved.expiresAt > Date.now()) {
        return saved.theme;
      }
      localStorage.removeItem(KEY);
    } catch (e) {
      try { localStorage.removeItem(KEY); } catch (storageError) {}
    }
    return null;
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (themeColor) {
      themeColor.content = theme === "dawn" ? "#ece5d6" : "#0e1216";
    }
  }

  function syncLantern() {
    if (!lantern) return;
    lantern.setAttribute("aria-pressed", String(root.dataset.theme === "dawn"));
  }
  syncLantern();
  if (lantern) {
    lantern.addEventListener("click", function () {
      root.dataset.theme = root.dataset.theme === "dusk" ? "dawn" : "dusk";
      try {
        localStorage.setItem(KEY, JSON.stringify({
          theme: root.dataset.theme,
          expiresAt: Date.now() + THEME_TTL
        }));
      } catch (e) {}
      applyTheme(root.dataset.theme);
      syncLantern();
    });
  }
  setInterval(function () {
    applyTheme(storedTheme() || timeTheme());
    syncLantern();
  }, 60000);

  /* --- the harbor clock --------------------------------------------- */
  var clock = document.getElementById("aarhus-time");
  if (clock) {
    var fmt = new Intl.DateTimeFormat("da-DK", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Copenhagen"
    });
    var tick = function () { clock.textContent = fmt.format(new Date()); };
    tick();
    setInterval(tick, 30000);
  }

  /* --- quiet arrivals ------------------------------------------------ */
  var targets = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* --- rain ----------------------------------------------------------- */
  var canvas = document.getElementById("rain");
  if (canvas && !reduced) {
    var ctx = canvas.getContext("2d");
    var w, h, drops;
    var DRIFT = 0.18; // slight wind from the east

    function makeDrop() {
      return {
        x: Math.random() * (w + 40),
        y: Math.random() * h,
        len: 9 + Math.random() * 14,
        speed: 1.4 + Math.random() * 2.1,
        alpha: 0.04 + Math.random() * 0.1
      };
    }

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      var count = Math.min(150, Math.floor((w * h) / 14000));
      drops = [];
      for (var i = 0; i < count; i++) drops.push(makeDrop());
    }
    resize();
    window.addEventListener("resize", resize);

    (function frame() {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      for (var i = 0; i < drops.length; i++) {
        var d = drops[i];
        ctx.strokeStyle = "rgba(213, 205, 186, " + d.alpha + ")";
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.len * DRIFT, d.y + d.len);
        ctx.stroke();
        d.y += d.speed;
        d.x -= d.speed * DRIFT;
        if (d.y > h + 20) {
          d.y = -20;
          d.x = Math.random() * (w + 40);
        }
      }
      window.requestAnimationFrame(frame);
    })();
  }
})();
