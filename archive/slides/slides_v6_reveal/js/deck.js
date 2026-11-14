/* deck.js — Reveal init, brand chrome, viz mounting, pager, count-up. */
(function () {
  // ---- inject persistent brand chrome ----
  function chrome() {
    var f = document.createElement("div"); f.className = "brand-frame"; document.body.appendChild(f);
    var g1 = document.createElement("div"); g1.className = "brand-glow"; document.body.appendChild(g1);
    var g2 = document.createElement("div"); g2.className = "brand-glow b2"; document.body.appendChild(g2);
    var logo = document.createElement("div"); logo.className = "brand-logo";
    logo.innerHTML = '<img src="assets/mu-ict-logo.png" alt="Mahidol University · Faculty of ICT">';
    document.body.appendChild(logo);
    var page = document.createElement("div"); page.className = "brand-page";
    page.innerHTML = '<span class="c">01</span> / 00';
    document.body.appendChild(page);
    return page;
  }
  var pgEl = chrome();
  function pad(n) { return (n < 10 ? "0" : "") + n; }

  Reveal.initialize({
    width: 1280, height: 720, margin: 0.045,
    minScale: 0.2, maxScale: 2.0,
    controls: true, controlsTutorial: false, progress: true, hash: true, center: false,
    transition: "slide", transitionSpeed: "default", backgroundTransition: "fade",
    plugins: [RevealHighlight, RevealZoom, RevealNotes]
  });

  function mountViz(slide) {
    if (!slide) return;
    slide.querySelectorAll("[data-viz]").forEach(function (el) {
      var name = el.dataset.viz;
      if (window.VIZ && window.VIZ[name]) el._inst = window.VIZ[name].mount(el);
    });
    slide.querySelectorAll("[data-count]").forEach(countUp);
  }

  function countUp(el) {
    var to = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec || "0", 10),
        suf = el.dataset.suf || "", dur = 1000, t0 = null;
    function step(t) {
      if (t0 === null) t0 = t;
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = (to * e).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function pager() {
    var i = Reveal.getIndices().h + 1, n = Reveal.getTotalSlides();
    if (pgEl) pgEl.innerHTML = '<span class="c">' + pad(i) + "</span> / " + pad(n);
    document.body.dataset.mood = (i - 1) % 6;   // drift the glows per slide
  }

  var PRINT = /print-pdf/.test(location.search);

  Reveal.on("ready", function (e) {
    if (PRINT) {
      // PDF export: every slide is laid out at once — mount all viz, freeze counters.
      document.querySelectorAll("[data-viz]").forEach(function (el) {
        var n = el.dataset.viz; if (window.VIZ && window.VIZ[n]) el._inst = window.VIZ[n].mount(el);
      });
      document.querySelectorAll("[data-count]").forEach(function (el) {
        var to = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec || "0", 10), suf = el.dataset.suf || "";
        el.textContent = to.toFixed(dec) + suf;
      });
      // reveal drift curves to their drifted state in the static PDF
      document.querySelectorAll('[data-viz="driftCurve"]').forEach(function (el) { if (el._inst && el._inst.forward) el._inst.forward(); });
      return;
    }
    mountViz(e.currentSlide); pager();
  });
  Reveal.on("slidechanged", function (e) { mountViz(e.currentSlide); pager(); });

  Reveal.on("fragmentshown", function (e) {
    var s = e.fragment.dataset.vizStep; if (!s) return;
    var host = Reveal.getCurrentSlide().querySelector('[data-viz="' + s + '"]');
    if (host && host._inst && host._inst.forward) host._inst.forward();
  });
  Reveal.on("fragmenthidden", function (e) {
    var s = e.fragment.dataset.vizStep; if (!s) return;
    var host = Reveal.getCurrentSlide().querySelector('[data-viz="' + s + '"]');
    if (host && host._inst && host._inst.backward) host._inst.backward();
  });
})();
