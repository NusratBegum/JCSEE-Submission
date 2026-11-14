/* ============================================================
   EADD — JCSSE 2026 deck engine (v5)
   Presentation controller: scale-to-fit, keyboard/click/swipe nav,
   fragment stepping, on-enter animation replay, count-up numbers,
   hash sync. ?export (or print) → static mode for PDF export.
   ============================================================ */
(function () {
  "use strict";

  var slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
  var total = slides.length;
  var params = new URLSearchParams(location.search);
  var EXPORT = params.has("export") || params.has("print-pdf");

  /* ---- number this deck's content slides (skip noframenumbering-style) ---- */
  // footer page numbers are authored in HTML already; engine doesn't touch them.

  /* ---------- EXPORT / PRINT MODE ----------
     Reveal everything, freeze animations at final state, keep the
     paginated print layout. (All "hidden initial states" live under
     body.present, so simply NOT entering present mode = fully visible.) */
  if (EXPORT) {
    document.body.classList.add("exporting");
    revealAll();
    return; // print CSS handles the rest
  }

  function revealAll() {
    document.querySelectorAll(".frag").forEach(function (f) { f.classList.add("on"); });
    document.querySelectorAll("[data-count]").forEach(function (el) {
      el.textContent = el.getAttribute("data-count-final") || el.textContent;
    });
  }

  /* ---------- PRESENT MODE ---------- */
  document.body.classList.add("present");

  // Tag standard content blocks for staggered rise (skip footers & absolute UI)
  slides.forEach(function (slide) {
    var frame = slide.querySelector(":scope > .frame");
    var host = frame || slide;
    Array.prototype.forEach.call(host.children, function (child, i) {
      if (child.classList.contains("footer")) return;
      if (child.classList.contains("bg")) return;
      child.classList.add("rise");
      child.style.setProperty("--ri", i);
    });
    // special wrappers on title / divider / thank-you
    slide.querySelectorAll(":scope > .title-wrap, :scope > .ty-wrap, :scope .divider .body, :scope > .divider")
      .forEach(function (el) { el.classList.add("rise"); });

    // chart animation tagging (drives CSS .grow/.growx/.draw/.pop on enter)
    slide.querySelectorAll("svg.anim-bars rect").forEach(function (r, i) {
      r.classList.add("grow"); r.style.setProperty("--gi", i);
    });
    slide.querySelectorAll("svg.anim-barsx rect").forEach(function (r, i) {
      r.classList.add("growx"); r.style.setProperty("--gi", i);
    });
    slide.querySelectorAll("svg.anim-line path.series, svg.anim-line polyline.series").forEach(function (p) {
      p.setAttribute("pathLength", "1"); p.classList.add("draw");
    });
    slide.querySelectorAll("svg.anim-bars circle, svg.anim-line circle, svg .marker").forEach(function (m, i) {
      m.classList.add("pop"); m.style.setProperty("--pi", i);
    });
  });

  // Collect fragments per slide
  var fragsBySlide = slides.map(function (s) {
    return Array.prototype.slice.call(s.querySelectorAll(".frag"));
  });

  var cur = 0, step = 0;

  /* ---------- scale to viewport ---------- */
  function fit() {
    var s = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
    document.documentElement.style.setProperty("--scale", s);
  }
  window.addEventListener("resize", fit);
  fit();

  /* ---------- HUD ---------- */
  var hud = document.createElement("div");
  hud.className = "hud";
  hud.innerHTML =
    '<div class="hud-bar"><i></i></div>' +
    '<div class="hud-num"><span class="c">01</span> / ' + pad(total) + '</div>';
  document.body.appendChild(hud);
  var hudFill = hud.querySelector(".hud-bar > i");
  var hudCur = hud.querySelector(".hud-num .c");

  var hint = document.createElement("div");
  hint.className = "hint";
  hint.textContent = "→ next · ← back · F fullscreen · O overview";
  document.body.appendChild(hint);
  setTimeout(function () { hint.classList.add("fade"); }, 4200);

  // click zones
  var zoneL = mkZone("zone-l"), zoneR = mkZone("zone-r");
  zoneL.addEventListener("click", prev);
  zoneR.addEventListener("click", next);
  function mkZone(c) { var d = document.createElement("div"); d.className = "zone " + c; document.body.appendChild(d); return d; }

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  /* ---------- navigation ---------- */
  function show(i, dir) {
    i = Math.max(0, Math.min(total - 1, i));
    slides.forEach(function (s, k) {
      s.classList.toggle("current", k === i);
      s.classList.toggle("past", k < i);
      s.classList.toggle("future", k > i);
    });
    cur = i;
    // reset & replay animations
    var slide = slides[i];
    slide.classList.remove("shown");
    // hide all frags initially
    fragsBySlide[i].forEach(function (f) { f.classList.remove("on"); });
    // force reflow then trigger
    void slide.offsetWidth;
    slide.classList.add("shown");
    runCounts(slide);
    step = 0;
    updateHUD();
    if (("#" + (i + 1)) !== location.hash) history.replaceState(null, "", "#" + (i + 1));
  }

  function updateHUD() {
    hudCur.textContent = pad(cur + 1);
    hudFill.style.width = ((cur) / (total - 1) * 100) + "%";
  }

  function next() {
    if (step < fragsBySlide[cur].length) {
      fragsBySlide[cur][step].classList.add("on");
      step++;
      return;
    }
    if (cur < total - 1) show(cur + 1, 1);
  }
  function prev() {
    if (step > 0) { // step back a fragment
      step--;
      fragsBySlide[cur][step].classList.remove("on");
      return;
    }
    if (cur > 0) {
      show(cur - 1, -1);
      // reveal all frags of the slide we land on (came from ahead)
      var fr = fragsBySlide[cur];
      fr.forEach(function (f) { f.classList.add("on"); });
      step = fr.length;
    }
  }

  /* ---------- count-up ---------- */
  function runCounts(slide) {
    slide.querySelectorAll("[data-count]").forEach(function (el) {
      var to = parseFloat(el.getAttribute("data-count"));
      var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
      var pre = el.getAttribute("data-pre") || "";
      var suf = el.getAttribute("data-suf") || "";
      var dur = 900, t0 = null;
      function frame(t) {
        if (t0 === null) t0 = t;
        var p = Math.min(1, (t - t0) / dur);
        var e = 1 - Math.pow(1 - p, 3); // easeOutCubic
        el.textContent = pre + (to * e).toFixed(dec) + suf;
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = pre + el.getAttribute("data-count-final") + suf;
      }
      // only animate when slide visible
      requestAnimationFrame(frame);
    });
  }

  /* ---------- overview ---------- */
  var overview = false;
  function toggleOverview() { overview = !overview; document.body.classList.toggle("overview", overview); }

  /* ---------- keys ---------- */
  document.addEventListener("keydown", function (e) {
    switch (e.key) {
      case "ArrowRight": case " ": case "PageDown": e.preventDefault(); next(); break;
      case "ArrowLeft": case "PageUp": e.preventDefault(); prev(); break;
      case "ArrowDown": e.preventDefault(); if (cur < total - 1) show(cur + 1, 1); break;
      case "ArrowUp": e.preventDefault(); if (cur > 0) show(cur - 1, -1); break;
      case "Home": e.preventDefault(); show(0, -1); break;
      case "End": e.preventDefault(); show(total - 1, 1); break;
      case "f": case "F":
        if (!document.fullscreenElement) document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
        else document.exitFullscreen && document.exitFullscreen();
        break;
      case "o": case "O": toggleOverview(); break;
      default:
        if (/^[0-9]$/.test(e.key)) { /* allow typing slide#? skip */ }
    }
  });

  // overview click → jump
  document.addEventListener("click", function (e) {
    if (!overview) return;
    var s = e.target.closest(".slide");
    if (s) { var idx = slides.indexOf(s); if (idx >= 0) { toggleOverview(); show(idx, 1); } }
  });

  /* ---------- swipe ---------- */
  var tx = 0, ty = 0;
  document.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  document.addEventListener("touchend", function (e) {
    var dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) { dx < 0 ? next() : prev(); }
  }, { passive: true });

  /* ---------- boot ---------- */
  var start = 0;
  if (location.hash) { var h = parseInt(location.hash.slice(1), 10); if (h >= 1 && h <= total) start = h - 1; }
  show(start, 1);
})();
