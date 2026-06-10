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
    var lanternDock = document.createElement("span");
    lanternDock.className = "lantern-dock";
    lanternDock.setAttribute("aria-hidden", "true");
    lantern.parentNode.insertBefore(lanternDock, lantern);

    var carryLantern = function (carried) {
      lantern.classList.toggle("is-carried", carried);
    };

    var checkLanternDock = function () {
      carryLantern(window.scrollY > 8);
    };
    checkLanternDock();
    window.addEventListener("scroll", checkLanternDock, { passive: true });

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
    moor();
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
      /* pale drops against the night, ink drops against the paper;
         dark-on-light needs roughly double the alpha to read the same */
      var dawn = root.dataset.theme === "dawn";
      var rgb = dawn ? "50, 44, 36" : "213, 205, 186";
      for (var i = 0; i < drops.length; i++) {
        var d = drops[i];
        var a = dawn ? Math.min(d.alpha * 2, 0.3) : d.alpha;
        ctx.strokeStyle = "rgba(" + rgb + ", " + a + ")";
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

  /* --- the water ---------------------------------------------------- */
  var sea = document.createElement("div");
  sea.className = "sea";
  sea.setAttribute("aria-hidden", "true");
  sea.innerHTML =
    '<div class="sea-water"></div>' +
    '<div class="boat">' +
      '<span class="boat-bob">' +
        '<svg viewBox="0 0 44 36" width="44" height="36" aria-hidden="true">' +
          '<path d="M4 24.5h35l-5 7H10Z" fill="currentColor" opacity=".9"/>' +
          '<path d="M21.5 5v20" fill="none" stroke="currentColor" stroke-width="1.4"/>' +
          '<path d="M20.5 7 9 22h11.5Z" fill="currentColor" opacity=".68"/>' +
          '<path d="m23 8 10.5 14H23Z" fill="currentColor" opacity=".42"/>' +
          '<path d="M7 31.5c8 1.4 22 1.4 30 0" fill="none" stroke="currentColor" stroke-width="1" opacity=".42"/>' +
          '<circle class="boat-lamp-glow" cx="32.5" cy="23.2" r="7"/>' +
          '<path class="boat-lantern-frame" d="M30.7 21.3h3.6v4.2h-3.6Zm.7 0c0-1.4 2.2-1.4 2.2 0" fill="none" stroke="currentColor" stroke-width=".8"/>' +
          '<circle class="boat-lamp" cx="32.5" cy="23.2" r="1.15"/>' +
        '</svg>' +
      '</span>' +
    '</div>';
  document.body.classList.add("has-sea");
  document.body.appendChild(sea);

  var boat = sea.querySelector(".boat");

  function sailProgress(date) {
    var minutes = date.getHours() * 60 + date.getMinutes();
    var DAWN = 7 * 60;
    var DUSK = 19 * 60;

    if (minutes >= DAWN && minutes < DUSK) {
      return { sail: (minutes - DAWN) / (12 * 60), west: false };
    }

    var nightMinutes = (minutes - DUSK + 24 * 60) % (24 * 60);
    return { sail: 1 - nightMinutes / (12 * 60), west: true };
  }

  function moor() {
    if (!boat) return;
    var position = sailProgress(new Date());
    var percent = position.sail * 100;
    var boatOffset = position.sail * 44;
    boat.style.setProperty(
      "--sail-x",
      "calc(" + percent.toFixed(4) + "% - " + boatOffset.toFixed(2) + "px)"
    );
    boat.classList.toggle("westward", position.west);
  }

  moor();
})();
