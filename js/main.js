/* kasperkrog.dk — lantern, clock, reveal, rain. No dependencies. */
(function () {
  "use strict";

  var root = document.documentElement;
  var KEY = "kk-theme";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- the lantern: dusk <-> dawn ---------------------------------- */
  var lantern = document.getElementById("lantern");
  function syncLantern() {
    lantern.setAttribute("aria-pressed", String(root.dataset.theme === "dawn"));
  }
  syncLantern();
  lantern.addEventListener("click", function () {
    root.dataset.theme = root.dataset.theme === "dusk" ? "dawn" : "dusk";
    try { localStorage.setItem(KEY, root.dataset.theme); } catch (e) {}
    syncLantern();
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
