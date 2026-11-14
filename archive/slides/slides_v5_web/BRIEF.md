# EADD — JCSSE 2026 slides v5 (web deck → PDF). BUILD BRIEF

You are building a **bespoke HTML/CSS presentation** that exports to a pixel-exact 16:9 PDF.
Aesthetic: **minimal technical (Linear / Stripe / Vercel)**. This is a research conference talk
(15–20 min). Do NOT use a slide framework — hand-build it. All content + exact numbers are below;
do NOT invent or alter any number.

## Deliverables (in this directory `slides_v5_web/`)
- `index.html` — all slides, one `<section class="slide">` per slide.
- `styles.css` — the full design system (or inline `<style>`; separate file preferred).
- `render.sh` — runs headless Chrome to produce `../jcsse2026_slides_v5.pdf`.
- Final PDF at `/Users/nusratbegum/Documents/GitHub/Final/JCSEE-Submission/jcsse2026_slides_v5.pdf`.

## Hard technical constraints
- Each slide is EXACTLY 1280×720 px (16:9). Nothing may overflow or clip.
- Fonts already downloaded in `fonts/`: `geist-400/500/600/700.woff2`, `geistmono-400/500.woff2`.
  Declare with `@font-face` (family `Geist`, weights 400/500/600/700; family `GeistMono` 400/500).
  `font-display: block`. Use ONLY these fonts. Never Inter/Arial/Roboto/system fonts.
- Print CSS:
  ```css
  @page { size: 13.333in 7.5in; margin: 0; }          /* 1280x720 @96dpi */
  html, body { margin: 0; padding: 0; }
  .slide { width: 1280px; height: 720px; position: relative; overflow: hidden;
           break-after: page; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  ```
- Charts: hand-build inline **SVG** (crisp vector in PDF). No JS chart libs, no canvas.
- No external network at render time (fonts are local). No CDN links in the final file.
- `render.sh` content (use `--headless=new`, wait for fonts):
  ```bash
  #!/bin/bash
  set -e
  DIR="$(cd "$(dirname "$0")" && pwd)"
  CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
    --run-all-compositor-stages-before-draw --virtual-time-budget=4000 \
    --print-to-pdf="$DIR/../jcsse2026_slides_v5.pdf" "file://$DIR/index.html"
  ```

## Design system (commit to it precisely)
**Dual canvas.** Light content slides + dark "moment" slides (title, section dividers, headline,
conclusion, thank-you). This contrast is the deck's signature.

Colors (CSS variables):
- `--ink:#0E0E10` (light-slide text)  `--paper:#FBFBF9` (light-slide bg, warm near-white)
- `--muted:#6B6F76`  `--hair:#E6E5E1` (hairline borders/rules)
- `--cobalt:#2D5BFF` (THE single accent — rules, key figures, active marks; use sparingly)
- Dark slides: `--night:#0B0B0D` (bg)  `--snow:#F5F5F3` (text)  `--nightmuted:#8B8E98`  `--hairdark:#26262B`
- Data-only semantic (charts only, never decoration): `--pos:#12A150` `--neg:#E5484D` `--warn:#F5A623` `--base:#8B8D98`

Type:
- Headings/numbers display: **Geist** 600/700, letter-spacing −0.02em, tight leading.
- Body: **Geist** 400/500.
- **GeistMono** 500 for: kicker/eyebrow labels (UPPERCASE, ~11px, letter-spacing 0.16em), all
  numbers/metrics/stats, axis labels, table figures, slide numbers, footer. Mono-for-data is the
  Linear signature — lean into it.
- Type scale (px): kicker 11 / label 13 / body 16–18 / lead 22 / h2 30–34 / big-number 64–120.

Layout & components:
- Margins ~72–88px. Strong baseline rhythm. 12-col mental grid; embrace asymmetry + whitespace.
- Frame header: small mono kicker (e.g. `01 / THE PROBLEM`) + bold Geist title + a 1px `--hair` rule.
- Footer (light + dark variants): left mono `EADD`, right mono `NN / total` + thin progress tick.
- Cards: 1px `--hair` border, ~14px radius, generous padding, NO heavy fills. Subtle, not boxy-noisy.
- Big stats: huge GeistMono number + small mono caption + a 3px cobalt tick. One idea per stat.
- Section dividers (dark): oversized mono section number (e.g. `02`) ghosted, big Geist title, subtitle.
- Micro-detail: hairline rules, mono tracking, a single cobalt accent per slide. Restraint = the point.
- Avoid: gradient soup, drop-shadow overload, purple-on-white cliché, rainbow palettes, emoji.

## Verify loop (REQUIRED before you report done)
1. Build, run `render.sh`.
2. Rasterize EVERY page: `pdftoppm -png -r 96 ../jcsse2026_slides_v5.pdf /tmp/v5 ` then Read each PNG.
3. Check on each page: no clipped/overflowing text, fonts actually rendering as Geist (not fallback),
   contrast OK, alignment to margins, charts readable, numbers correct, footer page count right.
4. Fix and re-render until ALL pages are clean. Report remaining issues honestly; do not claim done
   unless every page passes. Include final page count.

---
# CONTENT — exact, do not alter numbers

## Meta
Title: **Enhanced Adversarial Drift Detection** — subtitle *for MLOps Feature Monitoring*.
Authors: **Nusrat Begum**¹, Phaphontee Yamchote¹, Chainarong Amornbunchornvej², Thanapon Noraset¹.
¹ Faculty of ICT, Mahidol University · ² NECTEC, NSTDA, Thailand.
Venue: JCSSE 2026 · Bangkok, Thailand · June 24–27, 2026. Email: nusrat.beg@student.mahidol.ac.th
Tagline (use as recurring motif): *EADD answers WHETHER, WHEN, WHICH, and HOW SEVERE — in one pipeline.*

## Slide list (≈23 pages)
1. **Title** (dark). Eyebrow `JCSSE 2026 · STREAMING ML · EXPLAINABLE AI`. Title + subtitle. Authors + affiliations. Venue footer.
2. **Roadmap** (light). 8 steps: Motivation · Method · ASPT · SHAP+DSI · Setup · Results · Ablation · Outlook. Tagline at bottom.
3. **Section 01 — The Problem** (dark). Subtitle "Why production ML detectors miss the mark".
4. **Production ML fails silently** (light). Left: SVG line chart — accuracy decays after drift onset
   (deploy ~0.91 → after drift-onset at midpoint drops to ~0.60; mark "drift onset" + "silent failure").
   Three mono chips: `Which features?` `How severe?` `Real or noise?`.
   Right: D3 card (Gözüaçık et al., CIKM 2019; "most robust unsupervised detector, Lukats et al. 2024")
   with **three gaps**: (1) No formal significance test → false alarms on autocorrelated streams;
   (2) No feature attribution → "detect-and-discard" classifier; (3) Linear classifier → misses non-linear / incremental drift.
5. **Capability matrix** (light). Columns: Whether · Which · Severity · Streaming. Rows:
   DDM/EDDM = ✓ ✗ ✗ ✓ ; KS/KSWIN = ✓ ~ ✗ ✓ ; D3 = ✓ ✗ ✗ ✓ ; Vertex AI/Clarify = ✓ ✓ ~ ✗ ;
   TRIPODD/HDPD = ✓ ✓ ✗ ✗ ; **EADD (this work) = ✓ ✓ ✓ ✓** (highlight row, cobalt).
   Caption: "No prior unsupervised streaming detector integrates whether + which + severity."
   (✓ = --pos, ✗ = --neg, ~ = --warn.)
6. **Three contributions** (light). 3 cards:
   (1) **ASPT** — Adaptive Sequential Permutation Test. Formal permutation test gates drift confirmation.
       statistical rigor; 90–95% fewer permutations. Inspired by Gandy 2009. Confirms at i=20 vs Bmax=199.
   (2) **SHAP + DSI** — Attribution & Severity. TreeSHAP on the C2ST classifier; entropy-normalised severity.
       which features; how severe. DSI = AUC·(1 − H_norm(s)).
   (3) **Benchmark** — EADD vs 7 unsupervised detectors on synthetic + 13 real-world streams.
       4/4 coverage; 0 false alarms; P@k=R@k=1.0 (univariate).
7. **Section 02 — The EADD Pipeline** (dark). Subtitle "Four-step streaming detector".
8. **End-to-end pipeline** (light). Flow (SVG or styled boxes): Stream {x_t}∈ℝ^d → ① Adaptive Windows
   (W_ref reservoir, W_cur sliding) → ② LightGBM C2ST (AUC, H_pred) → ◇ AUC>τ? → ③ ASPT (sequential perm test)
   → ◇ p<α? → ④ TreeSHAP + DSI (attribution, severity) → **Drift Alert** (features, severity).
   "no" branches → No drift / resume. Caption: "Two-stage gate ⇒ Type I error bound: Pr(AUC>τ | H₀)·α ≤ α."
9. **ASPT** (light). Left: Problem (D3 fixed AUC threshold → false alarms on autocorrelated streams);
   Idea (permute labels iteratively, stop early when decisive); three rule boxes:
   - Early reject H₀: c_i=0, i≥Bmin, 1/(i+1)<α ⇒ confirm drift, p=1/(i+1)   (--pos)
   - Early accept H₀: c_i/i>2α, i≥Bmin ⇒ no drift, p=(c_i+1)/(i+1)            (--neg)
   - Terminal: p=(c_Bmax+1)/(Bmax+1)                                          (--base)
   Right: SVG bar chart "permutations used per decision": D3 fixed = 199, EADD drift = 20, EADD stable = 10;
   dashed line at 199 = "fixed budget". Badge: "90–95% fewer permutations · α preserved".
10. **SHAP + DSI** (light). Left: φ̄_j = (1/n)Σ_i|φ_j^(i)| , s_j = φ̄_j / Σ_k φ̄_k (which features).
    DSI = AUC × (1 − H_norm(s)) (boxed). H_norm(s) = −Σ_j s_j log₂ s_j / log₂ d ∈ [0,1] — dimensionality-invariant.
    Right: severity gradient bar LOW(<0.3, --pos) → MODERATE(0.3–0.6, --warn) → CRITICAL(>0.6, --neg) with 0/0.3/0.6/1.0 ticks.
    Tiers table: Low(<0.3) → scheduled retrain; Moderate(0.3–0.6) → audit shared source; Critical(>0.6) → audit pipeline.
    Note: "Heuristic tiers; require domain calibration."
11. **Section 03 — Experiments & Results** (dark). Subtitle "What does EADD actually do?".
12. **Setup** (light). 3 cards: EXP 1 Synthetic (n=5,000, d=5; 4 drift patterns abrupt/gradual/incremental/recurring;
    also 4 stable streams for false-alarm robustness). EXP 2 Real-world (13 streams, Lukats+ 2024; 4 annotated INSECTS,
    9 unannotated; metrics Precision/Recall/MTD). EXP 3 SHAP accuracy (n=10,000, d=10; drift @ t=5,000;
    univariate/subset/multivariate; metrics P@k/R@k/DSI). Strip: Baselines = D3, BNDM, CSDDM, IBDD, OCDD, SPLL, UDetect.
    Config = LightGBM (50 trees), N_ref=500, N_cur=200, M=50, B_max=199, B_min=10, α=0.05, τ=0.7.
13. **Headline results** (DARK moment). Four huge mono stats: `4/4` synthetic coverage · `0` false alarms on stable streams
    · `8×` faster MTD vs D3 (incremental) · `1.00` P@k=R@k (univariate SHAP). Line: "EADD is the only detector achieving
    BOTH full drift-type coverage AND zero false alarms, while answering which and how severe — in one streaming pipeline."
    Footnote: "Mann–Whitney U vs D3 on autocorrelated streams: p=0.0101 (τ=0.6)."
14. **Synthetic coverage vs false alarms** (light). SVG: bars = mean FA per type; markers/second axis = coverage (/4).
    EADD FA 0.00 cov 4 ; BNDM 4.75 cov 4 ; CSDDM 5.50 cov 4 ; IBDD 46.25 cov 4 ; OCDD 17.50 cov 4 ;
    D3 0.00 cov 2 ; SPLL 0.00 cov 2 ; UDetect 0 cov 0. Takeaway: "EADD: 4/4 coverage AND 0 false alarms.
    BNDM/CSDDM/IBDD/OCDD also hit 4/4 but pay heavy FA cost; D3/SPLL keep 0 FA only by missing half the drift types."
15. **INSECTS — faster detection** (light). Grouped SVG bars MTD (lower better): Abrupt EADD 135 / D3 155.5;
    IncrAbrupt 33 / 272.5; IncrRecur 133 / 323.5. Tiles: 8× faster (IncrAbrupt 33 vs 272.5);
    2.4× faster (IncrRecur 133 vs 323.5); 13% faster (Abrupt 135 vs 155.5). Note: "EADD beats D3 on MTD in all three
    jointly detected INSECTS streams; InsectsGradual missed by both." (EADD=--pos, D3=--base.)
16. **SHAP attribution — P@k=R@k=1.0** (light). SVG bar of top-feature SHAP share: Univariate 52.3, Subset 24.5,
    Multivariate 14.6; dashed "uniform 10%". Table: Univariate(1/10) AUC 0.784, top F3 (52.3%), DSI 0.193;
    Subset(3/10) AUC 0.809, F5 (24.5%), DSI 0.096; Multivariate(10/10) AUC 0.806, F2 (14.6%), DSI 0.016.
    Note: "DSI orders by concentration: univariate > subset > multivariate (consistent with H_norm)."
17. **False-alarm robustness on stable streams** (light). Grouped SVG bars (3 series EADD / D3 τ=0.6 / D3 τ=0.7):
    Gaussian i.i.d. 0/0/0 ; Autocorrelated AR(1) 0/87.4/54.6 ; Heteroscedastic 0/10.4/0 ; Correlated ρ=0.7 0/10.0/0.
    Takeaway: "0 false alarms on all 4 stable stream types. Mann–Whitney U vs D3 (τ=0.6): p=0.0101.
    ASPT suppresses 54.6 spurious D3 detections on autocorrelated AR(1) at τ=0.7." (EADD=--pos, D3τ0.6=--neg, D3τ0.7=--base.)
18. **Section 04 — Ablation & Cost** (dark). Subtitle "Where does the gain come from?".
19. **Where does the gain come from?** (light). SVG line: wall-clock vs d (10/20/50): EADD-Full 6.93/10.76/23.11;
    EADD−ASPT 6.68/10.43/22.64; D3 0.07/0.09/0.14. Three cards: "Coverage 4/4 vs D3's 2/4 → from LightGBM (non-linear C2ST);
    EADD−ASPT also reaches 4/4." / "0 false alarms on AR(1) → from ASPT; suppresses 54.6 spurious D3 detections." /
    "Cost trade-off ~50–160× D3 wall-clock — dominated by LightGBM, not ASPT (<5%)."
20. **Section 05 — Limits & Outlook** (dark). Subtitle "What EADD cannot answer — yet".
21. **Limitations & future work** (light). Limitations: wall-clock ~50–160× D3 (LightGBM retrains every M=50 steps);
    multiple testing over time (~600 tests/30K samples; Bonferroni α′≈8.3×10⁻⁵ below ASPT's 1/(Bmax+1)=0.005 floor;
    zero-FA result empirical, not theoretically guaranteed); DSI tiers heuristic, never triggered above LOW;
    SHAP correlational not causal; no isolation of reservoir sampling vs window config. Future: anytime-valid e-values
    for streaming FWER; causal attribution (Budhathoki+ AISTATS 2021); multi-domain DSI calibration; adversarial robustness;
    per-feature operating curves under correlation → feature-group SHAP.
22. **Conclusion** (DARK moment). Pill/tagline: "EADD answers WHETHER, WHEN, WHICH, HOW SEVERE — in one pipeline."
    Repeat the four stats (4/4 · 0 · 8× · 1.00). Two columns: What we built (ASPT+H_pred rigorous confirmation 90–95% perm savings;
    SHAP+DSI feature-level diagnosis + severity; benchmark vs 7 unsupervised detectors) / What it gives MLOps
    (reliable alarms on autocorrelated production streams; actionable diagnoses not just binary flags; severity-tiered prescriptions).
23. **Thank you** (dark). "Thank you." · "Questions & discussion welcome." · Nusrat Begum · nusrat.beg@student.mahidol.ac.th ·
    "Code + paper available at the project repository."

## Backup (after thank-you, numbering can continue or be marked "Backup")
B1. **Runtime scaling vs window N_cur** (light). SVG line (log-x N=100/200/500/1000): EADD-Full 5.83/6.91/10.52/11.22;
    EADD−ASPT 5.62/6.68/10.23/10.58; D3 0.11/0.07/0.04/0.03. Notes: N 200→1000 EADD grows only 1.6×; LightGBM sub-linear in N,
    near-linear in d; ASPT overhead <5%.
B2. **Correlated features (d=10)** (light). SVG bars first-detect t vs ρ: EADD t=4099 for ρ=0/0.5/0.9; D3 t=4117.
    Notes: Cholesky-mixed Gaussian, +2σ shift in 3 features at t=4000; EADD robust to correlation, stable correlated streams give 0 FA;
    SHAP under correlation → interpret at feature-group granularity.

## References to footnote where natural
D3 = Gözüaçık et al., CIKM 2019. Robustness ranking = Lukats et al., 2024. ASPT inspired by Gandy 2009.
Causal attribution = Budhathoki et al., AISTATS 2021.
