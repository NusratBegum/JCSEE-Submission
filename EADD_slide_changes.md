# EADD Deck — Slide-by-Slide Changes (do these in Google Slides first)

Two columns per slide: **FIX** = what to correct, **CITE** = exact citation text to add (small, footer/corner).
Severity: 🔴 must-fix · 🟡 should-fix · ⚪ optional.
"In refs?" = whether that citation is already on Slide 16's reference list.

---

## Slide 1 — Title
- ⚪ FIX: email `phaphontee.yam@student.mahidol.edu` → check; others use `@…mahidol.ac.th`.
- CITE: none.

## Slide 2 — Table of Contents
- 🟡 FIX: `05 SHAP & DSI(Con2)` → `SHAP & DSI`. `08 Limitations & Future work` → `Future Work`.
- CITE: none.

## Slide 3 — Drift & Feature Drift
- ⚪ FIX: heading is sans here but monospace from slide 6 on — pick ONE style for the whole deck.
- CITE (corner): `Lu et al., 2019; Gama et al., 2014` (concept-drift surveys). **In refs? NO → add to Slide 16 if you cite.**

## Slide 4 — Production ML Models Fail Silently
- 🟡 FIX: `Most robust Unsupervised detector` → `Among the most robust unsupervised detectors` (lowercase "unsupervised").
- CITE: next to **D3** → `(Gözüaçık et al., 2019)`. Optional, next to the binary-alarm line → `C2ST: Lopez-Paz & Oquab, 2017`. **In refs? YES (both).** (Lukats 2024 already shown.)

## Slide 5 — Research Gap
- ✅ FIX: 4-question framing already corrected.
- CITE (corner): `Lukats et al., 2024`. **YES.** Optional, to strengthen the gap: `TRIPODD: Panda et al., 2024; Vertex AI: Taly et al., 2021` — **NO → add to refs if used.**

## Slide 6 — Main Contributions
- ✅ FIX: DSI formula renders clean here (`Hnorm`) — leave it.
- CITE: ASPT box → `(Gandy, 2009)`. Localisation box → `(Lundberg & Lee, 2017)`. Benchmark box → `(Lukats et al., 2024)`. **All YES.**

## Slide 7 — EADD Pipeline
- ✅ FIX: figure is clean.
- CITE (under figure caption): `reservoir sampling: Vitter, 1985 · LightGBM: Ke et al., 2017 · C2ST: Lopez-Paz & Oquab, 2017`. **All YES.**

## Slide 8 — Contribution 1: ASPT
- 🔴 FIX (BLOCKER): tofu boxes. `B□ax` → `Bmax`, `B□i□` → `Bmin`, `c_B□ax` → `c_Bmax`. Retype as plain ASCII, **or** paste the formula block as an image. (Still shows □ on my render — verify on a second laptop/projector.)
- CITE: Solution box → `(Gandy, 2009)`. **YES.**

## Slide 9 — Contribution 2: SHAP + DSI
- 🔴 FIX (BLOCKER): tofu boxes. `φ□` → `φ̄_j`, `|φᵢ□|` → `|φ_j|`, `s□` → `s_j`, `H□or□` → `Hnorm` (both places). ASCII or image.
- CITE: SHAP box → `(Lundberg & Lee, 2017; Lundberg et al., 2020)`. Entropy line → `(Shannon, 1948)`. **All YES.**

## Slide 10 — Experimental Setup
- ✅ FIX: none.
- CITE (corner): `INSECTS: Souza et al., 2020 · protocol: Lukats et al., 2024`. **Both YES.**

## Slide 11 — Result 1: Coverage + False Alarms
- 🟡 FIX: remove the **Lift** column from the table, and delete the bullet `Perfect Efficiency (1.00 Lift)`. (You don't want lift.) Keep Types / Coverage / Mean FA.
- CITE (corner): `Reporting follows Lukats et al., 2024`. **YES.**

## Slide 12 — Result 2: INSECTS
- ⚪ FIX: label the Prec/Recall columns as **EADD's** (e.g. `Prec (EADD)`), since D3's recall differs.
- CITE (corner): `INSECTS: Souza et al., 2020; Lukats et al., 2024`. **YES.**

## Slide 13 — Result 3: SHAP Attribution
- 🟡 FIX: remove the **Multivariate (10/10)** row (it's trivial — any ranking scores 1.0). Keep Univariate + Subset. Then change the banner `…across all concentration scenarios` → `…in the univariate and subset cases`.
- CITE (corner): `(Lundberg & Lee, 2017)`. **YES.**

## Slide 14 — Limitations & Future Work
- ✅ FIX: none.
- CITE: `causal attribution: Budhathoki et al., 2021` (**YES**); `e-values: Pandeva et al., 2024` (**NO → add to refs if used**).

## Slide 15 — Conclusion
- ✅ FIX: stats corrected (87.4 at τ=0.6, p=0.0101).
- CITE: none.

## Slide 16 — Thank you + References
- 🟡 FIX: if you add any **NO** citations above (Lu, Gama, Panda/TRIPODD, Taly/Vertex, Pandeva/e-values), add them here too so the in-slide citations resolve. Current list = 11 refs.

---

## Reference pool (already on Slide 16 — safe to cite anywhere)
Gözüaçık 2019 (D3) · Lukats 2024 (benchmark) · Lopez-Paz & Oquab 2017 (C2ST) · Gandy 2009 (permutation) · Ke et al. 2017 (LightGBM) · Lundberg & Lee 2017 (SHAP) · Lundberg et al. 2020 (TreeSHAP) · Vitter 1985 (reservoir) · Shannon 1948 (entropy) · Budhathoki 2021 (causal) · Souza 2020 (INSECTS).

## Must add to refs if you use them
Lu et al. 2019 · Gama et al. 2014 · Panda et al. 2024 (TRIPODD) · Taly et al. 2021 (Vertex AI) · Pandeva et al. 2024 (E-C2ST / e-values).

## Order of work
1. Apply 🔴 (slides 8, 9 tofu) — blockers.
2. Apply 🟡 (slides 2, 4, 11, 13, 16).
3. Add CITE text to each slide.
4. Then finalize speaker notes against the corrected deck.
