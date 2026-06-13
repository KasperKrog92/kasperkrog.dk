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
    lanternDock.innerHTML =
      '<svg class="lantern-rig" viewBox="0 0 56 84" aria-hidden="true">' +
        '<g class="lantern-chain">' +
          '<ellipse cx="28" cy="4" rx="2.5" ry="4"/>' +
          '<ellipse cx="28" cy="12" rx="4" ry="2.5"/>' +
          '<ellipse cx="28" cy="20" rx="2.5" ry="4"/>' +
          '<path d="M28 24v7"/>' +
        '</g>' +
        '<path d="M28 30C14.5 30 5 39 5 52v20h7"/>' +
        '<path d="M28 30c13.5 0 23 9 23 22v20h-7"/>' +
        '<path d="M12 68v7M44 68v7"/>' +
      '</svg>';
    lantern.parentNode.insertBefore(lanternDock, lantern);

    var carryLantern = function (carried) {
      lantern.classList.toggle("is-carried", carried);
      lanternDock.classList.toggle("is-empty", carried);
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
  function minuteTick() {
    applyTheme(storedTheme() || timeTheme());
    syncLantern();
    moor();
  }
  setInterval(minuteTick, 60000);
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) minuteTick();
  });

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
  sea.innerHTML =
    '<div class="sea-water" aria-hidden="true"></div>' +
    '<button class="boat" type="button" aria-label="Hear a word from the passing ship" aria-controls="boat-message">' +
      '<span class="boat-bob">' +
        '<span class="boat-ship" aria-hidden="true"></span>' +
      '</span>' +
    '</button>';

  var boatMessage = document.createElement("p");
  boatMessage.className = "boat-message";
  boatMessage.id = "boat-message";
  boatMessage.setAttribute("role", "status");
  boatMessage.setAttribute("aria-live", "polite");
  boatMessage.setAttribute("aria-atomic", "true");
  /* The whole line lives in a hidden span so assistive tech hears it once,
     while the visible "ink" span is written out a character at a time. */
  boatMessage.innerHTML =
    '<span class="visually-hidden boat-say"></span>' +
    '<span class="boat-ink" aria-hidden="true"></span>';

  document.body.classList.add("has-sea");
  document.body.appendChild(sea);
  document.body.appendChild(boatMessage);

  var boat = sea.querySelector(".boat");
  var boatSay = boatMessage.querySelector(".boat-say");
  var boatInk = boatMessage.querySelector(".boat-ink");
  /* The passing ship recites the opening verse of The Pale Beyond, one line
     each time it is asked. The lines are borrowed from the game. */
  var boatMessages = [
    "O' the air be's cold, of flake and white, as a sailor begs their pledge…",
    "That in the dark they'll brace themselves, for horrors still ahead.",
    "To the souls around them, shielding fear, dividing up their dread.",
    "A hunger draws the desperate here…",
    "Such lonely souls need led.",
    "What will ye do, when steel hearts break and courage does abscond?",
    "I'll learn to live a life out here, out in The Pale Beyond."
  ];
  /* After the last line the ship falls quiet for a few presses before the
     verse comes round again. */
  var SILENT_PRESSES = 3;
  var TYPE_MS = 45;   /* pace of the writing, per character */
  var HOLD_MS = 4500; /* how long a finished line lingers before it fades */
  var boatStep = -1;
  var boatHideTimer = null;
  var boatTypeTimer = null;

  function clearBoatTimers() {
    if (boatHideTimer) {
      clearTimeout(boatHideTimer);
      boatHideTimer = null;
    }
    if (boatTypeTimer) {
      clearInterval(boatTypeTimer);
      boatTypeTimer = null;
    }
  }

  function hideBoatMessage() {
    clearBoatTimers();
    boatMessage.classList.remove("is-writing");
    boatMessage.classList.remove("is-visible");
  }

  function writeBoatLine(text) {
    boatSay.textContent = text;
    boatInk.textContent = "";
    boatMessage.classList.add("is-visible");

    if (reduced) {
      boatInk.textContent = text;
      boatHideTimer = setTimeout(hideBoatMessage, HOLD_MS);
      return;
    }

    boatMessage.classList.add("is-writing");
    var i = 0;
    boatTypeTimer = setInterval(function () {
      i += 1;
      boatInk.textContent = text.slice(0, i);
      if (i >= text.length) {
        clearInterval(boatTypeTimer);
        boatTypeTimer = null;
        boatMessage.classList.remove("is-writing");
        boatHideTimer = setTimeout(hideBoatMessage, HOLD_MS);
      }
    }, TYPE_MS);
  }

  if (boat) {
    /* Each press writes out the next line, which fades on its own once the
       hand lifts, or sooner if the card itself is clicked. Presses past the
       last line do nothing until the verse begins again. */
    boat.addEventListener("click", function () {
      boatStep = (boatStep + 1) % (boatMessages.length + SILENT_PRESSES);
      if (boatStep < boatMessages.length) {
        clearBoatTimers();
        writeBoatLine(boatMessages[boatStep]);
      }
    });
    boatMessage.addEventListener("click", hideBoatMessage);
  }

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

  var lastSail = null;

  function moor() {
    if (!boat) return;
    var position = sailProgress(new Date());
    /* a tab that slept through hours catches up by snapping, not by
       speeding across the water — the 60s drift is for minutes only */
    var leap = lastSail === null ||
      Math.abs(position.sail - lastSail) > 2 / 720;
    if (leap) boat.style.transition = "none";
    var percent = position.sail * 100;
    var boatOffset = position.sail * 60;
    boat.style.setProperty(
      "--sail-x",
      "calc(" + percent.toFixed(4) + "% - " + boatOffset.toFixed(2) + "px)"
    );
    boatMessage.style.setProperty(
      "--sail-x",
      "calc(" + percent.toFixed(4) + "% - " + boatOffset.toFixed(2) + "px)"
    );
    boat.classList.toggle("westward", position.west);
    if (leap) {
      void boat.offsetWidth;
      boat.style.transition = "";
    }
    lastSail = position.sail;
  }

  moor();
})();
