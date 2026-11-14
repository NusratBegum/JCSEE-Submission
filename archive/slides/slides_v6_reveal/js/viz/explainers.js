/* explainers.js — animated visual explainers for the hard concepts.
   Registers window.VIZ.{c2st, asptDemo, shapFeat, dsiGauge, live}. */
(function () {
  var d3 = window.d3, ss = window.ss;
  var PINK = "#FF0080", PLUM = "#8D0B5D", GREY = "#9aa0b0", WHITE = "#fff",
      FAINT = "rgba(255,255,255,.45)", AXIS = "rgba(255,255,255,.16)";
  function gauss(m, s) { var u = Math.random() || 1e-9, v = Math.random(); return m + s * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
  function svg(el, W, H) {
    el.innerHTML = "";
    var s = d3.select(el).append("svg").attr("viewBox", "0 0 " + W + " " + H).style("width", "100%").style("max-width", W + "px");
    var f = s.append("defs").append("filter").attr("id", "gl").attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%");
    f.append("feGaussianBlur").attr("stdDeviation", 4).attr("result", "b");
    var m = f.append("feMerge"); m.append("feMergeNode").attr("in", "b"); m.append("feMergeNode").attr("in", "SourceGraphic");
    return s;
  }
  function epi(sel) { return sel.attr("font-family", "Epilogue"); }

  /* ---- C2ST: two clouds separate, AUC rises ---- */
  function c2st(el) {
    if (el._t) clearInterval(el._t);
    var W = 720, H = 380, s = svg(el, W, H);
    var x = d3.scaleLinear().domain([-3, 9]).range([40, W - 40]);
    var y = d3.scaleLinear().domain([-3, 3]).range([H - 40, 40]);
    s.append("line").attr("x1", 40).attr("x2", W - 40).attr("y1", H - 30).attr("y2", H - 30).attr("stroke", AXIS);
    var ref = d3.range(80).map(function () { return [gauss(0, 1), gauss(0, 1)]; });
    var cur = d3.range(80).map(function () { return [gauss(0, 1), gauss(0, 1)]; });
    var gR = s.append("g"), gC = s.append("g");
    gR.selectAll("circle").data(ref).enter().append("circle").attr("r", 3.4).attr("fill", "rgba(154,160,176,.7)")
      .attr("cx", function (d) { return x(d[0]); }).attr("cy", function (d) { return y(d[1]); });
    var cc = gC.selectAll("circle").data(cur).enter().append("circle").attr("r", 3.4).attr("fill", PINK).attr("filter", "url(#gl)")
      .attr("cx", function (d) { return x(d[0]); }).attr("cy", function (d) { return y(d[1]); });
    var bound = s.append("line").attr("stroke", WHITE).attr("stroke-dasharray", "6 5").attr("stroke-width", 1.5).attr("opacity", 0)
      .attr("y1", 30).attr("y2", H - 30);
    var auc = epi(s.append("text")).attr("x", W - 44).attr("y", 36).attr("text-anchor", "end")
      .attr("fill", WHITE).attr("font-size", 24).attr("font-weight", 800).text("AUC 0.50");
    var tagR = epi(s.append("text")).attr("fill", GREY).attr("font-size", 14).attr("font-weight", 600).attr("x", x(0)).attr("y", H - 10).attr("text-anchor", "middle").text("reference");
    var tagC = epi(s.append("text")).attr("fill", PINK).attr("font-size", 14).attr("font-weight", 600).attr("opacity", 0).text("current");
    function sep(shift) {
      cc.transition().duration(1400).attr("cx", function (d) { return x(d[0] + shift); });
      var bx = x(shift / 2);
      bound.transition().delay(700).duration(700).attr("opacity", shift > 1 ? .8 : 0).attr("x1", bx).attr("x2", bx);
      tagC.transition().duration(800).attr("opacity", shift > 1 ? 1 : 0).attr("x", x(shift)).attr("y", H - 10);
      var a = 0.5 + 0.31 * Math.min(1, shift / 4);
      auc.transition().duration(1400).tween("t", function () { var i = d3.interpolateNumber(parseFloat(auc.text().replace("AUC ", "")), a); return function (t) { auc.text("AUC " + i(t).toFixed(2)); }; })
        .attr("fill", shift > 1 ? PINK : WHITE);
    }
    var on = false; el._t = setInterval(function () { on = !on; sep(on ? 3.6 : 0); }, 2600); sep(3.6);
    return { stop: function () { clearInterval(el._t); } };
  }

  /* ---- ASPT: permutations tick in, early-stop ---- */
  function asptDemo(el) {
    if (el._t) clearInterval(el._t);
    var W = 720, H = 360, s = svg(el, W, H), cols = 20, rows = 10, cw = (W - 80) / cols, ch = 22;
    epi(s.append("text")).attr("x", 40).attr("y", 30).attr("fill", FAINT).attr("font-size", 13).attr("font-weight", 600).text("PERMUTATIONS (each = one shuffled-label test)");
    var cells = [];
    for (var i = 0; i < cols * rows; i++) {
      cells.push(s.append("rect").attr("x", 40 + (i % cols) * cw).attr("y", 50 + Math.floor(i / cols) * ch)
        .attr("width", cw - 3).attr("height", ch - 3).attr("rx", 2).attr("fill", "rgba(255,255,255,.06)"));
    }
    var counter = epi(s.append("text")).attr("x", W - 44).attr("y", 30).attr("text-anchor", "end").attr("fill", WHITE).attr("font-size", 22).attr("font-weight", 800).text("i = 0");
    var verdict = epi(s.append("text")).attr("x", 40).attr("y", H - 20).attr("fill", PINK).attr("font-size", 18).attr("font-weight", 700).attr("opacity", 0);
    function run() {
      cells.forEach(function (c) { c.attr("fill", "rgba(255,255,255,.06)"); }); verdict.attr("opacity", 0);
      var k = 0, stop = 20;
      el._t2 && clearInterval(el._t2);
      el._t2 = setInterval(function () {
        if (k < stop) { cells[k].transition().duration(150).attr("fill", PINK).attr("filter", "url(#gl)"); counter.text("i = " + (k + 1)); k++; }
        else { clearInterval(el._t2);
          for (var j = stop; j < cells.length; j++) cells[j].attr("opacity", .25);
          verdict.text("stop at i=20  ·  reject H₀  ·  p = 1/21 < α  ·  90% saved").transition().duration(500).attr("opacity", 1);
        }
      }, 90);
    }
    run(); el._t = setInterval(run, 5200);
    return { stop: function () { clearInterval(el._t); clearInterval(el._t2); } };
  }

  /* ---- SHAP per-feature attribution (univariate scenario; F3 is ground truth) ---- */
  function shapFeat(el) {
    var W = 720, H = 360, m = { t: 30, r: 60, b: 40, l: 56 }, iw = W - m.l - m.r, ih = H - m.t - m.b;
    var s = svg(el, W, H), g = s.append("g").attr("transform", "translate(" + m.l + "," + m.t + ")");
    // F3 measured top share 52.3%; others illustrative small (labelled)
    var data = [["F0", 4], ["F1", 5], ["F2", 6], ["F3", 52.3], ["F4", 5], ["F5", 6], ["F6", 4], ["F7", 5], ["F8", 4], ["F9", 4]];
    var y = d3.scaleBand().domain(data.map(function (d) { return d[0]; })).range([0, ih]).padding(.34);
    var x = d3.scaleLinear().domain([0, 60]).range([0, iw]);
    epi(g.append("text")).attr("x", 0).attr("y", -12).attr("fill", FAINT).attr("font-size", 13).attr("font-weight", 600).text("SHAP ATTRIBUTION SHARE  (which feature drove drift?)");
    data.forEach(function (d, i) {
      var gt = d[0] === "F3";
      epi(g.append("text")).attr("x", -10).attr("y", y(d[0]) + y.bandwidth() / 2).attr("dy", ".34em").attr("text-anchor", "end")
        .attr("fill", gt ? PINK : FAINT).attr("font-size", 13).attr("font-weight", gt ? 700 : 500).text(d[0]);
      var bar = g.append("rect").attr("x", 0).attr("y", y(d[0])).attr("height", y.bandwidth()).attr("rx", 3).attr("width", 0)
        .attr("fill", gt ? PINK : "rgba(154,160,176,.45)").attr("filter", gt ? "url(#gl)" : null);
      bar.transition().delay(i * 60).duration(800).attr("width", x(d[1]));
      if (gt) epi(g.append("text")).attr("x", x(d[1]) + 8).attr("y", y(d[0]) + y.bandwidth() / 2).attr("dy", ".34em")
        .attr("fill", WHITE).attr("font-size", 15).attr("font-weight", 800).attr("opacity", 0).text("52.3%  ← ground truth")
        .transition().delay(900).duration(400).attr("opacity", 1);
    });
    return {};
  }

  /* ---- DSI gauge ---- */
  function dsiGauge(el) {
    var val = parseFloat(el.dataset.dsi || "0.19");
    var W = 720, H = 200, s = svg(el, W, H), x0 = 50, x1 = W - 50, yb = 120;
    var zones = [[0, .3, "#36e29b", "LOW"], [.3, .6, "#ffc24b", "MODERATE"], [.6, 1, PINK, "CRITICAL"]];
    var x = d3.scaleLinear().domain([0, 1]).range([x0, x1]);
    zones.forEach(function (z) {
      s.append("rect").attr("x", x(z[0])).attr("y", yb).attr("width", x(z[1]) - x(z[0])).attr("height", 26).attr("fill", z[2]).attr("opacity", .85);
      epi(s.append("text")).attr("x", (x(z[0]) + x(z[1])) / 2).attr("y", yb + 46).attr("text-anchor", "middle").attr("fill", z[2]).attr("font-size", 12).attr("font-weight", 700).text(z[3]);
    });
    [0, .3, .6, 1].forEach(function (t) { epi(s.append("text")).attr("x", x(t)).attr("y", yb - 8).attr("text-anchor", "middle").attr("fill", FAINT).attr("font-size", 12).text(t); });
    var needle = s.append("path").attr("fill", WHITE).attr("filter", "url(#gl)").attr("d", "M0,0 L-9,-26 L9,-26 Z").attr("transform", "translate(" + x(0) + "," + yb + ")");
    needle.transition().duration(1200).ease(d3.easeCubicOut).attr("transform", "translate(" + x(val) + "," + yb + ")");
    var lab = epi(s.append("text")).attr("x", x(0)).attr("y", yb - 36).attr("text-anchor", "middle").attr("fill", WHITE).attr("font-size", 26).attr("font-weight", 800).text("0.00");
    lab.transition().duration(1200).tween("t", function () { var i = d3.interpolateNumber(0, val); return function (t) { lab.text("DSI " + i(t).toFixed(2)); }; })
      .attr("x", x(val));
    return {};
  }

  /* ---- LIVE interactive detector (drag slider → AUC + alarm) ---- */
  function live(el) {
    el.innerHTML = "";
    var W = 760, H = 300;
    var s = svg(el, W, H);
    var x = d3.scaleLinear().domain([-4, 8]).range([40, W - 40]);
    var yb = H - 60;
    function curveData(mean, sd) { return d3.range(-4, 8.05, 0.1).map(function (v) { return [v, Math.exp(-((v - mean) ** 2) / (2 * sd * sd)) / (sd * 2.5066)]; }); }
    var yS = d3.scaleLinear().domain([0, 0.42]).range([yb, 20]);
    var line = d3.line().x(function (d) { return x(d[0]); }).y(function (d) { return yS(d[1]); }).curve(d3.curveBasis);
    s.append("line").attr("x1", 40).attr("x2", W - 40).attr("y1", yb).attr("y2", yb).attr("stroke", AXIS);
    var ref = s.append("path").attr("d", line(curveData(0, 1))).attr("fill", "none").attr("stroke", GREY).attr("stroke-width", 3);
    var cur = s.append("path").attr("fill", "none").attr("stroke", PINK).attr("stroke-width", 3.5).attr("filter", "url(#gl)");
    var auc = epi(s.append("text")).attr("x", W - 44).attr("y", 34).attr("text-anchor", "end").attr("font-size", 26).attr("font-weight", 800);
    var badge = epi(s.append("text")).attr("x", 44).attr("y", 34).attr("font-size", 18).attr("font-weight", 700);
    epi(s.append("text")).attr("x", x(0)).attr("y", yb + 20).attr("text-anchor", "middle").attr("fill", GREY).attr("font-size", 13).attr("font-weight", 600).text("reference");
    function update(mean) {
      cur.attr("d", line(curveData(mean, 1)));
      var a = ss ? ss.cumulativeStdNormalProbability(Math.abs(mean) / Math.SQRT2) : 0.5 + 0.31 * Math.min(1, mean / 4);
      auc.text("AUC " + a.toFixed(2)).attr("fill", a > 0.7 ? PINK : WHITE);
      if (a > 0.7) badge.text("● DRIFT").attr("fill", PINK); else badge.text("○ stable").attr("fill", FAINT);
    }
    var slider = document.createElement("input");
    slider.type = "range"; slider.min = 0; slider.max = 4; slider.step = 0.05; slider.value = 0;
    slider.className = "live-slider";
    slider.addEventListener("input", function () { update(parseFloat(slider.value)); });
    el.appendChild(slider);
    var hint = document.createElement("div"); hint.className = "live-hint";
    hint.innerHTML = '◄ drag to shift the <b>current</b> distribution ►';
    el.appendChild(hint);
    update(0);
    // gentle auto-demo until user interacts
    var t = 0, auto = setInterval(function () { if (document.activeElement === slider) { clearInterval(auto); return; } t += 0.04; var m = 2 + 2 * Math.sin(t); slider.value = m; update(m); }, 60);
    el._stopAuto = function () { clearInterval(auto); };
    return { stop: function () { clearInterval(auto); } };
  }

  /* ---- H_pred: entropy line dropping as drift builds (continuous sub-threshold signal) ---- */
  function entropyDrop(el) {
    var W = 720, H = 320, m = { t: 30, r: 24, b: 44, l: 50 }, iw = W - m.l - m.r, ih = H - m.t - m.b;
    var s = svg(el, W, H), g = s.append("g").attr("transform", "translate(" + m.l + "," + m.t + ")");
    var x = d3.scaleLinear().domain([0, 100]).range([0, iw]);
    var y = d3.scaleLinear().domain([0, 1]).range([ih, 0]);
    g.append("g").attr("class", "axis").call(d3.axisLeft(y).ticks(4).tickSize(-iw)).selectAll("path,line").attr("stroke", "rgba(255,255,255,.08)");
    epi(g.selectAll(".axis text")).attr("fill", FAINT).attr("font-size", 12);
    // entropy stays ~high then drops after drift builds
    var data = d3.range(0, 101).map(function (t) { return [t, t < 45 ? 0.92 + (Math.random() - .5) * .04 : Math.max(0.12, 0.92 - (t - 45) * 0.014)]; });
    var line = d3.line().x(function (d) { return x(d[0]); }).y(function (d) { return y(d[1]); }).curve(d3.curveBasis);
    var p = g.append("path").attr("d", line(data)).attr("fill", "none").attr("stroke", PINK).attr("stroke-width", 3.5).attr("filter", "url(#gl)");
    var len = p.node().getTotalLength();
    p.attr("stroke-dasharray", len).attr("stroke-dashoffset", len).transition().duration(1800).attr("stroke-dashoffset", 0);
    g.append("line").attr("x1", x(45)).attr("x2", x(45)).attr("y1", 0).attr("y2", ih).attr("stroke", "rgba(255,255,255,.3)").attr("stroke-dasharray", "5 5");
    epi(g.append("text")).attr("x", x(45) + 6).attr("y", 16).attr("fill", FAINT).attr("font-size", 12).text("drift builds");
    epi(g.append("text")).attr("x", 0).attr("y", -12).attr("fill", FAINT).attr("font-size", 13).attr("font-weight", 600).text("PREDICTION ENTROPY  H_pred  (every step, even sub-threshold)");
    epi(g.append("text")).attr("x", iw).attr("y", y(.12) + 4).attr("text-anchor", "end").attr("fill", PINK).attr("font-size", 13).attr("font-weight", 700)
      .attr("opacity", 0).text("low entropy → confident drift").transition().delay(1700).duration(400).attr("opacity", 1);
    return {};
  }

  window.VIZ = window.VIZ || {};
  window.VIZ.entropyDrop = { mount: entropyDrop };
  window.VIZ.c2st = { mount: c2st };
  window.VIZ.asptDemo = { mount: asptDemo };
  window.VIZ.shapFeat = { mount: shapFeat };
  window.VIZ.dsiGauge = { mount: dsiGauge };
  window.VIZ.live = { mount: live };
})();
