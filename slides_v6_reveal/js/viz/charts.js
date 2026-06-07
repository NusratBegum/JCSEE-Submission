/* charts.js — brand-styled d3 charts. window.VIZ.chart.mount(el)
   el.dataset.chart selects the chart; data pulled from window.EADD. */
(function () {
  var d3 = window.d3, E = window.EADD;
  var PINK = "#FF0080", PLUM = "#8D0B5D", PLUM2 = "#5e2b4a", GREY = "#9aa0b0",
      WHITE = "#FFFFFF", AXIS = "rgba(255,255,255,.16)", FAINT = "rgba(255,255,255,.45)";

  function svgBase(el, W, H) {
    el.innerHTML = "";
    var svg = d3.select(el).append("svg").attr("viewBox", "0 0 " + W + " " + H).attr("class", "viz-svg");
    var defs = svg.append("defs");
    var f = defs.append("filter").attr("id", "g_" + Math.random().toString(36).slice(2, 7))
      .attr("x", "-40%").attr("y", "-40%").attr("width", "180%").attr("height", "180%");
    f.append("feGaussianBlur").attr("stdDeviation", 4).attr("result", "b");
    var m = f.append("feMerge"); m.append("feMergeNode").attr("in", "b"); m.append("feMergeNode").attr("in", "SourceGraphic");
    var grad = defs.append("linearGradient").attr("id", "barpink").attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", 1);
    grad.append("stop").attr("offset", "0%").attr("stop-color", PINK);
    grad.append("stop").attr("offset", "100%").attr("stop-color", PLUM);
    return { svg: svg, glow: f.attr("id") };
  }
  function lbl(sel) { return sel.attr("font-family", "Epilogue").attr("font-weight", 600); }

  // ---- vertical grouped bars (mtd, falseAlarms, delay, correlated) ----
  function groupedBars(el, rows, series, opts) {
    opts = opts || {};
    var W = 760, H = 344, m = { t: 26, r: 16, b: 50, l: 50 };
    var iw = W - m.l - m.r, ih = H - m.t - m.b;
    var b = svgBase(el, W, H), g = b.svg.append("g").attr("transform", "translate(" + m.l + "," + m.t + ")");
    var x0 = d3.scaleBand().domain(rows.map(function (r) { return r.label || r.s; })).range([0, iw]).padding(.32);
    var x1 = d3.scaleBand().domain(series.map(function (s) { return s.key; })).range([0, x0.bandwidth()]).padding(.18);
    var maxv = d3.max(rows, function (r) { return d3.max(series, function (s) { return r[s.key] || 0; }); });
    var y = d3.scaleLinear().domain([0, maxv * 1.16]).range([ih, 0]);
    // axis
    g.append("g").attr("class", "axis").attr("transform", "translate(0," + ih + ")").call(d3.axisBottom(x0).tickSize(0)).select(".domain").attr("stroke", AXIS);
    lbl(g.selectAll(".axis text")).attr("fill", FAINT).attr("font-size", 14).attr("dy", "1.4em");
    g.append("line").attr("x1", 0).attr("x2", 0).attr("y1", 0).attr("y2", ih).attr("stroke", AXIS);
    [0.25, 0.5, 0.75, 1].forEach(function (t) {
      var yy = y(maxv * t);
      g.append("line").attr("x1", 0).attr("x2", iw).attr("y1", yy).attr("y2", yy).attr("stroke", "rgba(255,255,255,.06)");
    });
    rows.forEach(function (r) {
      var grp = g.append("g").attr("transform", "translate(" + x0(r.label || r.s) + ",0)");
      series.forEach(function (s) {
        var v = r[s.key]; if (v == null) {
          grp.append("text").attr("x", x1(s.key) + x1.bandwidth() / 2).attr("y", ih - 8).attr("text-anchor", "middle")
            .attr("fill", FAINT).attr("font-size", 12).attr("font-family", "Epilogue").text("miss");
          return;
        }
        var bar = grp.append("rect").attr("x", x1(s.key)).attr("width", x1.bandwidth())
          .attr("y", ih).attr("height", 0).attr("rx", 3)
          .attr("fill", s.fill).attr("filter", s.glow ? "url(#" + b.glow + ")" : null);
        bar.transition().duration(900).delay(120).ease(d3.easeCubicOut)
          .attr("y", y(v)).attr("height", ih - y(v));
        grp.append("text").attr("x", x1(s.key) + x1.bandwidth() / 2).attr("y", y(v) - 8).attr("text-anchor", "middle")
          .attr("fill", s.key === series[0].key ? WHITE : FAINT).attr("font-size", 13).attr("font-family", "Epilogue").attr("font-weight", 700)
          .attr("opacity", 0).text(v).transition().delay(900).duration(400).attr("opacity", 1);
      });
    });
    // legend
    var lg = g.append("g").attr("transform", "translate(" + (iw - series.length * 130) + ",-6)");
    series.forEach(function (s, i) {
      var gg = lg.append("g").attr("transform", "translate(" + i * 130 + ",0)");
      gg.append("rect").attr("width", 16).attr("height", 11).attr("rx", 2).attr("y", -10).attr("fill", s.fill);
      lbl(gg.append("text")).attr("x", 22).attr("fill", FAINT).attr("font-size", 13).text(s.name);
    });
  }

  // ---- coverage vs FA dual ----
  function coverageFA(el) {
    var rows = E.coverageFA, W = 880, H = 330, m = { t: 28, r: 44, b: 46, l: 46 };
    var iw = W - m.l - m.r, ih = H - m.t - m.b;
    var b = svgBase(el, W, H), g = b.svg.append("g").attr("transform", "translate(" + m.l + "," + m.t + ")");
    var x = d3.scaleBand().domain(rows.map(function (r) { return r.d; })).range([0, iw]).padding(.42);
    var yF = d3.scaleLinear().domain([0, 50]).range([ih, 0]);
    var yC = d3.scaleLinear().domain([0, 4]).range([ih, 0]);
    g.append("line").attr("y1", 0).attr("y2", ih).attr("stroke", AXIS);
    g.append("line").attr("x1", iw).attr("x2", iw).attr("y1", 0).attr("y2", ih).attr("stroke", "rgba(255,0,128,.3)");
    g.append("g").attr("class", "axis").attr("transform", "translate(0," + ih + ")").call(d3.axisBottom(x).tickSize(0)).select(".domain").attr("stroke", AXIS);
    lbl(g.selectAll(".axis text")).attr("fill", FAINT).attr("font-size", 13).attr("dy", "1.3em");
    rows.forEach(function (r) {
      var bx = x(r.d);
      var bar = g.append("rect").attr("x", bx).attr("width", x.bandwidth()).attr("rx", 3)
        .attr("y", ih).attr("height", 0).attr("fill", r.hi ? "url(#barpink)" : "rgba(154,160,176,.5)")
        .attr("filter", r.hi ? "url(#" + b.glow + ")" : null);
      bar.transition().duration(850).attr("y", yF(r.fa)).attr("height", ih - yF(r.fa));
      g.append("text").attr("x", bx + x.bandwidth() / 2).attr("y", yF(r.fa) - 7).attr("text-anchor", "middle")
        .attr("fill", r.hi ? PINK : FAINT).attr("font-size", 12).attr("font-family", "Epilogue").attr("font-weight", 700)
        .attr("opacity", 0).text(r.fa.toFixed(2)).transition().delay(850).duration(300).attr("opacity", 1);
      // coverage marker
      var cy = yC(r.cov);
      var c = g.append("circle").attr("cx", bx + x.bandwidth() / 2).attr("cy", cy).attr("r", 0)
        .attr("fill", "none").attr("stroke", r.hi ? PINK : WHITE).attr("stroke-width", r.hi ? 3 : 1.6)
        .attr("filter", r.hi ? "url(#" + b.glow + ")" : null);
      c.transition().delay(600).duration(400).attr("r", 6);
    });
    lbl(g.append("text")).attr("x", -m.l + 6).attr("y", -10).attr("fill", FAINT).attr("font-size", 12).text("FALSE ALARMS");
    lbl(g.append("text")).attr("x", iw + 8).attr("y", -10).attr("fill", PINK).attr("font-size", 12).text("COVERAGE /4 ○");
  }

  // ---- multi-line (runtime) ----
  function multiLine(el, cfg) {
    var W = 760, H = 380, m = { t: 24, r: 90, b: 50, l: 56 };
    var iw = W - m.l - m.r, ih = H - m.t - m.b;
    var b = svgBase(el, W, H), g = b.svg.append("g").attr("transform", "translate(" + m.l + "," + m.t + ")");
    var xs = cfg.xs, lines = cfg.lines, logx = cfg.logx;
    var x = (logx ? d3.scaleLog() : d3.scaleLinear()).domain([xs[0], xs[xs.length - 1]]).range([0, iw]);
    var maxv = d3.max(lines, function (l) { return d3.max(l.v); });
    var y = d3.scaleLinear().domain([0, maxv * 1.1]).range([ih, 0]);
    g.append("g").attr("class", "axis").attr("transform", "translate(0," + ih + ")")
      .call(d3.axisBottom(x).tickValues(xs).tickFormat(d3.format("d")).tickSize(0));
    g.append("g").attr("class", "axis").call(d3.axisLeft(y).ticks(4).tickSize(-iw));
    g.selectAll(".axis path,.axis line").attr("stroke", AXIS);
    g.selectAll(".axis line").attr("stroke", "rgba(255,255,255,.06)");
    lbl(g.selectAll(".axis text")).attr("fill", FAINT).attr("font-size", 12);
    lbl(g.append("text")).attr("x", iw / 2).attr("y", ih + 42).attr("text-anchor", "middle").attr("fill", FAINT).attr("font-size", 13).text(cfg.xlabel);
    lines.forEach(function (l) {
      var line = d3.line().x(function (d, i) { return x(xs[i]); }).y(function (d) { return y(d); }).curve(d3.curveMonotoneX);
      var p = g.append("path").datum(l.v).attr("fill", "none").attr("stroke", l.color)
        .attr("stroke-width", l.w || 3).attr("stroke-dasharray", l.dash || null)
        .attr("d", line).attr("filter", l.glow ? "url(#" + b.glow + ")" : null);
      var len = p.node().getTotalLength();
      if (!l.dash) p.attr("stroke-dasharray", len).attr("stroke-dashoffset", len).transition().duration(1200).attr("stroke-dashoffset", 0);
      g.append("text").attr("x", x(xs[xs.length - 1]) + 6).attr("y", y(l.v[l.v.length - 1])).attr("dy", "0.32em")
        .attr("fill", l.color).attr("font-size", 12).attr("font-family", "Epilogue").attr("font-weight", 700)
        .attr("opacity", 0).text(l.name).transition().delay(1000).duration(400).attr("opacity", 1);
    });
  }

  // ---- horizontal bars (ASPT) ----
  function hbars(el) {
    var rows = [{ k: "D3 fixed budget", v: E.aspt.fixed, c: GREY }, { k: "EADD · drift", v: E.aspt.drift, c: PINK, glow: 1 }, { k: "EADD · stable", v: E.aspt.stable, c: PLUM, glow: 1 }];
    var W = 760, H = 300, m = { t: 20, r: 60, b: 40, l: 150 };
    var iw = W - m.l - m.r, ih = H - m.t - m.b;
    var b = svgBase(el, W, H), g = b.svg.append("g").attr("transform", "translate(" + m.l + "," + m.t + ")");
    var y = d3.scaleBand().domain(rows.map(function (r) { return r.k; })).range([0, ih]).padding(.4);
    var x = d3.scaleLinear().domain([0, 199]).range([0, iw]);
    g.append("line").attr("x1", x(199)).attr("x2", x(199)).attr("y1", -6).attr("y2", ih).attr("stroke", "rgba(255,0,128,.4)").attr("stroke-dasharray", "4 4");
    lbl(g.append("text")).attr("x", x(199)).attr("y", -10).attr("text-anchor", "end").attr("fill", PINK).attr("font-size", 12).text("FIXED BUDGET 199");
    rows.forEach(function (r) {
      lbl(g.append("text")).attr("x", -12).attr("y", y(r.k) + y.bandwidth() / 2).attr("dy", ".34em").attr("text-anchor", "end").attr("fill", FAINT).attr("font-size", 14).text(r.k);
      var bar = g.append("rect").attr("x", 0).attr("y", y(r.k)).attr("height", y.bandwidth()).attr("rx", 4).attr("width", 0)
        .attr("fill", r.glow ? "url(#barpink)" : "rgba(154,160,176,.5)").attr("filter", r.glow ? "url(#" + b.glow + ")" : null);
      bar.transition().duration(900).attr("width", x(r.v));
      g.append("text").attr("x", x(r.v) + 10).attr("y", y(r.k) + y.bandwidth() / 2).attr("dy", ".34em")
        .attr("fill", WHITE).attr("font-size", 16).attr("font-family", "Epilogue").attr("font-weight", 800)
        .attr("opacity", 0).text(r.v).transition().delay(700).duration(400).attr("opacity", 1);
    });
  }

  // ---- SHAP top-feature share ----
  function shapBars(el) {
    var rows = E.shap.map(function (s) { return { label: s.sc.split(" ")[0], v: s.share }; });
    var W = 620, H = 360, m = { t: 24, r: 20, b: 48, l: 46 };
    var iw = W - m.l - m.r, ih = H - m.t - m.b;
    var b = svgBase(el, W, H), g = b.svg.append("g").attr("transform", "translate(" + m.l + "," + m.t + ")");
    var x = d3.scaleBand().domain(rows.map(function (r) { return r.label; })).range([0, iw]).padding(.45);
    var y = d3.scaleLinear().domain([0, 70]).range([ih, 0]);
    g.append("line").attr("y1", 0).attr("y2", ih).attr("stroke", AXIS);
    g.append("g").attr("class", "axis").attr("transform", "translate(0," + ih + ")").call(d3.axisBottom(x).tickSize(0)).select(".domain").attr("stroke", AXIS);
    lbl(g.selectAll(".axis text")).attr("fill", FAINT).attr("font-size", 14).attr("dy", "1.3em");
    g.append("line").attr("x1", 0).attr("x2", iw).attr("y1", y(10)).attr("y2", y(10)).attr("stroke", "rgba(255,255,255,.25)").attr("stroke-dasharray", "4 4");
    lbl(g.append("text")).attr("x", iw).attr("y", y(10) - 6).attr("text-anchor", "end").attr("fill", FAINT).attr("font-size", 11).text("uniform 10%");
    rows.forEach(function (r) {
      var bar = g.append("rect").attr("x", x(r.label)).attr("width", x.bandwidth()).attr("rx", 3).attr("y", ih).attr("height", 0)
        .attr("fill", "url(#barpink)").attr("filter", "url(#" + b.glow + ")");
      bar.transition().duration(850).attr("y", y(r.v)).attr("height", ih - y(r.v));
      g.append("text").attr("x", x(r.label) + x.bandwidth() / 2).attr("y", y(r.v) - 8).attr("text-anchor", "middle")
        .attr("fill", WHITE).attr("font-size", 15).attr("font-family", "Epilogue").attr("font-weight", 800)
        .attr("opacity", 0).text(r.v + "%").transition().delay(850).duration(300).attr("opacity", 1);
    });
  }

  function mount(el) {
    var t = el.dataset.chart;
    if (t === "coverageFA") return coverageFA(el);
    if (t === "mtd") return groupedBars(el, E.mtd, [
      { key: "eadd", name: "EADD", fill: "url(#barpink)", glow: 1 }, { key: "d3", name: "D3", fill: "rgba(154,160,176,.5)" }]);
    if (t === "delay") return groupedBars(el, E.delay, [
      { key: "eadd", name: "EADD", fill: "url(#barpink)", glow: 1 }, { key: "d3", name: "D3", fill: "rgba(154,160,176,.5)" }]);
    if (t === "falseAlarms") return groupedBars(el, E.falseAlarms, [
      { key: "eadd", name: "EADD", fill: "url(#barpink)", glow: 1 },
      { key: "d3a", name: "D3 τ=0.6", fill: PLUM }, { key: "d3b", name: "D3 τ=0.7", fill: "rgba(154,160,176,.5)" }]);
    if (t === "correlated") return groupedBars(el, E.correlated.rho.map(function (r, i) {
      return { label: "ρ=" + r, eadd: E.correlated.eadd[i], d3: E.correlated.d3[i] };
    }), [{ key: "eadd", name: "EADD", fill: "url(#barpink)", glow: 1 }, { key: "d3", name: "D3", fill: "rgba(154,160,176,.5)" }]);
    if (t === "runtimeD") return multiLine(el, { xs: E.runtimeD.d, xlabel: "feature dimension  d", lines: [
      { name: "EADD", v: E.runtimeD.full, color: PINK, glow: 1 },
      { name: "−ASPT", v: E.runtimeD.noaspt, color: PLUM, dash: "5 4" },
      { name: "D3", v: E.runtimeD.d3, color: GREY }] });
    if (t === "runtimeN") return multiLine(el, { xs: E.runtimeN.n, logx: 1, xlabel: "current window  N", lines: [
      { name: "EADD", v: E.runtimeN.full, color: PINK, glow: 1 },
      { name: "−ASPT", v: E.runtimeN.noaspt, color: PLUM, dash: "5 4" },
      { name: "D3", v: E.runtimeN.d3, color: GREY }] });
    if (t === "aspt") return hbars(el);
    if (t === "shap") return shapBars(el);
  }

  window.VIZ = window.VIZ || {};
  window.VIZ.chart = { mount: mount };
})();
