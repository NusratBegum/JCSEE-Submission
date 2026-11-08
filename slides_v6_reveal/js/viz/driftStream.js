/* driftStream — live animated concept-drift explainer (canvas, 60fps).
   Streaming points whose distribution shifts at drift onset; live histogram
   morphs and the detector fires. Loops. window.VIZ.driftStream.mount(el). */
(function () {
  function gauss(m, s) { var u = Math.random() || 1e-9, v = Math.random(); return m + s * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }

  function mount(el) {
    if (el._raf) cancelAnimationFrame(el._raf);
    el.innerHTML = "";
    var W = 1120, H = 348, DPR = 2;
    var wrap = document.createElement("div"); wrap.style.position = "relative"; wrap.style.maxWidth = W + "px"; wrap.style.width = "100%";
    var cv = document.createElement("canvas"); cv.width = W * DPR; cv.height = H * DPR;
    cv.style.width = "100%"; cv.style.display = "block";
    wrap.appendChild(cv); el.appendChild(wrap);
    var alert = document.createElement("div");
    alert.style.cssText = "position:absolute;left:50%;top:14px;transform:translateX(-50%);opacity:0;transition:opacity .4s;" +
      "font-family:Epilogue;font-weight:700;font-size:14px;letter-spacing:.14em;color:#fff;" +
      "background:rgba(255,0,128,.9);padding:7px 16px;border-radius:999px;box-shadow:0 0 22px rgba(255,0,128,.7);";
    alert.textContent = "● DRIFT DETECTED";
    wrap.appendChild(alert);
    var ctx = cv.getContext("2d"); ctx.scale(DPR, DPR);

    var streamW = 720, histX = 770, histW = 330, midY = H / 2;
    var pts = [], frame = 0, period = 720, driftStart = 300, driftEnd = 430;
    var EPI = "Epilogue, sans-serif";

    function valScale(v) { return midY - v * 34; }   // feature value → y

    function draw() {
      frame = (frame + 1) % period;
      var phase = frame < driftStart ? 0 : frame < driftEnd ? (frame - driftStart) / (driftEnd - driftStart) : 1;
      var mean = phase * 3.2, drifting = frame >= driftStart;

      ctx.clearRect(0, 0, W, H);
      // baseline axis
      ctx.strokeStyle = "rgba(255,255,255,.12)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, midY); ctx.lineTo(streamW, midY); ctx.stroke();
      // emit a point at right edge
      pts.push({ x: streamW, v: gauss(mean, 1), drift: drifting });
      // move + draw points
      for (var i = pts.length - 1; i >= 0; i--) {
        var p = pts[i]; p.x -= 2.6;
        if (p.x < -6) { pts.splice(i, 1); continue; }
        var y = valScale(p.v), a = Math.max(.12, Math.min(1, p.x / streamW));
        if (p.drift) { ctx.fillStyle = "rgba(255,0,128," + a + ")"; ctx.shadowColor = "rgba(255,0,128,.8)"; ctx.shadowBlur = 8; }
        else { ctx.fillStyle = "rgba(255,255,255," + (a * .6) + ")"; ctx.shadowBlur = 0; }
        ctx.beginPath(); ctx.arc(p.x, y, p.drift ? 3.2 : 2.4, 0, 6.283); ctx.fill();
      }
      ctx.shadowBlur = 0;
      // drift onset marker scrolls with the stream
      var onsetX = streamW - (frame - driftStart) * 2.6;
      if (drifting && onsetX > 0 && onsetX < streamW) {
        ctx.strokeStyle = "rgba(255,0,128,.55)"; ctx.setLineDash([5, 5]);
        ctx.beginPath(); ctx.moveTo(onsetX, 24); ctx.lineTo(onsetX, H - 24); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = "#FF0080"; ctx.font = "600 12px " + EPI; ctx.fillText("drift onset", onsetX + 6, 34);
      }
      // live histogram of recent values (right panel)
      var recent = pts.filter(function (p) { return p.x > streamW - 220; });
      var bins = new Array(16).fill(0), bw = histW / 16;
      recent.forEach(function (p) { var b = Math.floor((p.v + 4) / 8 * 16); if (b >= 0 && b < 16) bins[b]++; });
      var mx = Math.max(4, Math.max.apply(null, bins));
      ctx.strokeStyle = "rgba(255,255,255,.12)"; ctx.beginPath(); ctx.moveTo(histX, H - 40); ctx.lineTo(histX + histW, H - 40); ctx.stroke();
      for (var b2 = 0; b2 < 16; b2++) {
        var h = bins[b2] / mx * 150, bx = histX + b2 * bw;
        var grad = ctx.createLinearGradient(0, H - 40 - h, 0, H - 40);
        grad.addColorStop(0, drifting ? "#FF0080" : "#8D0B5D"); grad.addColorStop(1, "rgba(141,11,93,.2)");
        ctx.fillStyle = grad; ctx.fillRect(bx + 1, H - 40 - h, bw - 2, h);
      }
      // labels
      ctx.fillStyle = "rgba(255,255,255,.45)"; ctx.font = "600 12px " + EPI;
      ctx.fillText("STREAMING FEATURE  {xₜ}", 4, 18);
      ctx.fillText("LIVE DISTRIBUTION", histX, 18);
      ctx.fillStyle = drifting ? "#FF0080" : "rgba(255,255,255,.45)";
      ctx.fillText(drifting ? "AUC ↑  separable" : "AUC ≈ 0.5  stable", histX, H - 18);

      alert.style.opacity = (frame >= driftStart + 40 && frame < period - 30) ? "1" : "0";
      el._raf = requestAnimationFrame(draw);
    }
    draw();
    return { stop: function () { if (el._raf) cancelAnimationFrame(el._raf); } };
  }
  window.VIZ = window.VIZ || {};
  window.VIZ.driftStream = { mount: mount };
})();
