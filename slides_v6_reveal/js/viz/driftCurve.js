/* driftCurve — d3 distribution-shift morph (reference → drifted).
   Independently testable: open js/viz/_test-driftCurve.html.
   Registers window.VIZ.driftCurve.mount(el) -> { forward, backward, replay } */
(function () {
  function gaussian(x, m, s) { return Math.exp(-((x - m) ** 2) / (2 * s * s)) / (s * Math.sqrt(2 * Math.PI)); }

  function mount(el) {
    var W = 940, H = 430, m = { t: 24, r: 20, b: 46, l: 20 };
    var iw = W - m.l - m.r, ih = H - m.t - m.b;
    el.innerHTML = "";
    var svg = window.d3.select(el).append("svg")
      .attr("viewBox", "0 0 " + W + " " + H).attr("class", "viz-svg");
    var defs = svg.append("defs");
    var g1 = defs.append("filter").attr("id", "pinkglow").attr("x", "-30%").attr("y", "-30%").attr("width", "160%").attr("height", "160%");
    g1.append("feGaussianBlur").attr("stdDeviation", "5").attr("result", "b");
    var fm = g1.append("feMerge"); fm.append("feMergeNode").attr("in", "b"); fm.append("feMergeNode").attr("in", "SourceGraphic");
    // gradient fill under reference curve
    var grad = defs.append("linearGradient").attr("id", "reffill").attr("x1", 0).attr("x2", 0).attr("y1", 0).attr("y2", 1);
    grad.append("stop").attr("offset", "0%").attr("stop-color", "#FF0080").attr("stop-opacity", .35);
    grad.append("stop").attr("offset", "100%").attr("stop-color", "#FF0080").attr("stop-opacity", 0);
    var grad2 = defs.append("linearGradient").attr("id", "driftfill").attr("x1", 0).attr("x2", 0).attr("y1", 0).attr("y2", 1);
    grad2.append("stop").attr("offset", "0%").attr("stop-color", "#8D0B5D").attr("stop-opacity", .5);
    grad2.append("stop").attr("offset", "100%").attr("stop-color", "#8D0B5D").attr("stop-opacity", 0);

    var g = svg.append("g").attr("transform", "translate(" + m.l + "," + m.t + ")");
    var x = window.d3.scaleLinear().domain([-4, 8]).range([0, iw]);
    var y = window.d3.scaleLinear().domain([0, 0.42]).range([ih, 0]);
    var pts = window.d3.range(-4, 8.05, 0.1);

    // baseline axis
    g.append("line").attr("x1", 0).attr("x2", iw).attr("y1", ih).attr("y2", ih)
      .attr("stroke", "rgba(255,255,255,.18)");
    g.append("text").attr("x", iw).attr("y", ih + 32).attr("text-anchor", "end")
      .attr("fill", "rgba(255,255,255,.4)").attr("font-size", 13).attr("font-family", "Epilogue").text("feature value →");

    function area(mean, s) {
      return window.d3.area().x(function (d) { return x(d); }).y0(ih).y1(function (d) { return y(gaussian(d, mean, s)); }).curve(window.d3.curveBasis)(pts);
    }
    function line(mean, s) {
      return window.d3.line().x(function (d) { return x(d); }).y(function (d) { return y(gaussian(d, mean, s)); }).curve(window.d3.curveBasis)(pts);
    }

    var refA = g.append("path").attr("d", area(0, 1)).attr("fill", "url(#reffill)").attr("opacity", 0);
    var refL = g.append("path").attr("d", line(0, 1)).attr("fill", "none").attr("stroke", "#FF0080")
      .attr("stroke-width", 3.5).attr("filter", "url(#pinkglow)").attr("opacity", 0);
    var drA = g.append("path").attr("fill", "url(#driftfill)").attr("opacity", 0);
    var drL = g.append("path").attr("fill", "none").attr("stroke", "#ff7ab8").attr("stroke-width", 3)
      .attr("stroke-dasharray", "7 6").attr("opacity", 0);

    var tagRef = g.append("text").attr("x", x(0)).attr("y", y(gaussian(0, 0, 1)) - 16).attr("text-anchor", "middle")
      .attr("fill", "#FF0080").attr("font-size", 15).attr("font-family", "Epilogue").attr("font-weight", 600)
      .attr("opacity", 0).text("REFERENCE");
    var tagDr = g.append("text").attr("text-anchor", "middle")
      .attr("fill", "#ff7ab8").attr("font-size", 15).attr("font-family", "Epilogue").attr("font-weight", 600)
      .attr("opacity", 0).text("CURRENT · DRIFTED");
    var auc = g.append("text").attr("x", iw - 4).attr("y", 18).attr("text-anchor", "end")
      .attr("fill", "#FFFFFF").attr("font-size", 22).attr("font-family", "Epilogue").attr("font-weight", 800)
      .attr("opacity", 0);

    function intro() {
      refL.transition().duration(700).attr("opacity", 1);
      refA.transition().duration(700).attr("opacity", 1);
      tagRef.transition().delay(500).duration(500).attr("opacity", 1);
    }
    intro();

    var drifted = false;
    function forward() {
      if (drifted) return; drifted = true;
      var mean = 3.4, s = 1.35;
      drL.attr("d", line(mean, s)).transition().duration(1300).attr("opacity", 1);
      drA.attr("d", area(mean, s)).transition().duration(1300).attr("opacity", 1);
      tagDr.attr("x", x(mean)).attr("y", y(gaussian(mean, mean, s)) - 16)
        .transition().delay(700).duration(600).attr("opacity", 1);
      refL.transition().duration(900).attr("opacity", .5);
      refA.transition().duration(900).attr("opacity", .4);
      auc.text("C2ST AUC  0.81").transition().delay(900).duration(500).attr("opacity", 1);
    }
    function backward() {
      if (!drifted) return; drifted = false;
      drL.transition().duration(500).attr("opacity", 0);
      drA.transition().duration(500).attr("opacity", 0);
      tagDr.transition().duration(300).attr("opacity", 0);
      auc.transition().duration(300).attr("opacity", 0);
      refL.transition().duration(500).attr("opacity", 1);
      refA.transition().duration(500).attr("opacity", 1);
    }
    function replay() { drifted = false; refL.attr("opacity", 0); refA.attr("opacity", 0); tagRef.attr("opacity", 0);
      drL.attr("opacity", 0); drA.attr("opacity", 0); tagDr.attr("opacity", 0); auc.attr("opacity", 0); intro(); }

    return { forward: forward, backward: backward, replay: replay };
  }

  window.VIZ = window.VIZ || {};
  window.VIZ.driftCurve = { mount: mount };
})();
