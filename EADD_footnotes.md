# EADD Deck — Footnotes & Reference Numbering (single source of truth)

**Rule:** each reference gets ONE number, in order of first appearance. Used on every slide it appears.
On a slide: small `[n]` next to the item + line `[n] Topic: Author, Year` at the bottom.

---

## MASTER NUMBERED LIST (strict appearance order, Uber = [5])

| # | Reference | Topic |
|---|---|---|
| [1] | Lu et al., 2019 (and Gama et al., 2014) | concept drift |
| [2] | Gözüaçık et al., 2019 | D3 |
| [3] | Lukats et al., 2024 | benchmark / baselines |
| [4] | Lopez-Paz & Oquab, 2017 | C2ST |
| [5] | Pan et al., 2020 | adversarial validation (Uber) |
| [6] | Gandy, 2009 | permutation test (ASPT) |
| [7] | Lundberg & Lee, 2017 | SHAP |
| [8] | Vitter, 1985 | reservoir sampling |
| [9] | Ke et al., 2017 | LightGBM |
| [10] | Lundberg et al., 2020 | TreeSHAP |
| [11] | Shannon, 1948 | entropy |
| [12] | Souza et al., 2020 | INSECTS |
| [13] | Budhathoki et al., 2021 | causal attribution |
| [14] | Pandeva et al., 2024 | e-values (E-C2ST) — *only if you cite e-values* |

---

## PER-SLIDE FOOTNOTES (✓ done · ✏️ fix · ➕ add)

**Slide 3** ✓ done
`[1] Concept drift: Lu et al., 2019; Gama et al., 2014`

**Slide 4** ✏️ resolve the `[?]` → `[5]`
`[2] D3: Gözüaçık et al., 2019`
`[3] Benchmark: Lukats et al., 2024`
`[4] C2ST: Lopez-Paz & Oquab, 2017`
`[5] Adversarial validation (Uber): Pan et al., 2020`   ← change the "Uber [?]" marker to [5]

**Slide 5** ✓ done
`[3] Benchmark: Lukats et al., 2024`

**Slide 6** ✏️ FIX all three numbers (you had [5][6][7]; correct is [6][7][3])
`[6] ASPT: Gandy, 2009`                 ← was [5]
`[7] SHAP: Lundberg & Lee, 2017`        ← was [6]
`[3] Benchmark: Lukats et al., 2024`    ← was [7] (Lukats is already [3])

**Slide 7** ➕ add
`[8] Reservoir sampling: Vitter, 1985`
`[9] LightGBM: Ke et al., 2017`
`[4] C2ST: Lopez-Paz & Oquab, 2017`

**Slide 8** ➕ add
`[6] Permutation test: Gandy, 2009`
`[2] D3: Gözüaçık et al., 2019`

**Slide 9** ➕ add
`[7] SHAP: Lundberg & Lee, 2017`
`[10] TreeSHAP: Lundberg et al., 2020`
`[11] Entropy: Shannon, 1948`

**Slide 10** ➕ add
`[12] INSECTS: Souza et al., 2020`
`[3] Benchmark protocol: Lukats et al., 2024`

**Slide 11** ➕ add
`[3] Baselines & reporting: Lukats et al., 2024`

**Slide 12** ➕ add
`[12] INSECTS: Souza et al., 2020`
`[3] Lukats et al., 2024`

**Slide 13** ➕ add
`[7] SHAP: Lundberg & Lee, 2017`
`[10] TreeSHAP: Lundberg et al., 2020`

**Slide 14** ➕ add
`[13] Causal attribution: Budhathoki et al., 2021`
(+ `[14] e-values: Pandeva et al., 2024` — only if you cite e-values inline)

**Slides 15, 16** — no footnote.

---

## SLIDE 16 — FINAL NUMBERED REFERENCE LIST (replace the bullets)

[1] J. Lu, A. Liu, F. Dong, F. Gu, J. Gama, G. Zhang, "Learning under concept drift: A review," *IEEE Trans. Knowl. Data Eng.*, 2019. (with J. Gama et al., "A survey on concept drift adaptation," *ACM Comput. Surv.*, 2014)
[2] Ö. Gözüaçık, A. Büyükçakır, H. Bonab, F. Can, "Unsupervised concept drift detection with a discriminative classifier (D3)," *ACM CIKM*, 2019.
[3] D. Lukats, O. Zielinski, A. Hahn, F. Stahl, "A benchmark and survey of fully unsupervised concept drift detectors on real-world data streams," *Int. J. Data Sci. Anal.*, 2024.
[4] D. Lopez-Paz, M. Oquab, "Revisiting classifier two-sample tests (C2ST)," *ICLR*, 2017.
[5] J. Pan, V. Pham, M. Dorairaj, H. Chen, J.-Y. Lee, "Adversarial validation approach to concept drift at Uber," *AdKDD/KDD*, 2020.
[6] A. Gandy, "Sequential implementation of Monte Carlo tests with uniformly bounded resampling risk," *JASA*, 2009.
[7] S. M. Lundberg, S.-I. Lee, "A unified approach to interpreting model predictions (SHAP)," *NeurIPS*, 2017.
[8] J. S. Vitter, "Random sampling with a reservoir," *ACM TOMS*, 1985.
[9] G. Ke, Q. Meng, T. Finley, et al., "LightGBM: A highly efficient gradient boosting decision tree," *NeurIPS*, 2017.
[10] S. M. Lundberg, G. Erion, H. Chen, et al., "From local explanations to global understanding with explainable AI for trees (TreeSHAP)," *Nature Mach. Intell.*, 2020.
[11] C. E. Shannon, "A mathematical theory of communication," *Bell Syst. Tech. J.*, 1948.
[12] V. M. A. Souza, D. M. Dos Reis, A. G. Maletzke, G. E. A. P. A. Batista, "Challenges in benchmarking stream learning algorithms with real-world data (INSECTS)," *Data Min. Knowl. Discov.*, 2020.
[13] K. Budhathoki, D. Janzing, P. Bloebaum, L. Minorics, "Why did the distribution change?," *AISTATS*, 2021.
[14] T. Pandeva, T. Bakker, C. A. Naesseth, P. Forré, "E-valuating classifier two-sample tests," *TMLR*, 2024. — *optional*

Keep "Full list in paper & GitHub" note.

---

## ALSO FIX (small bugs in latest export)
- **Slide 6:** old numbers `[5][6][7]` → new `[6][7][3]` (above).
- **Slide 8:** dark box tofu `Drift: i=20 (B□ax 199)` → `Drift: i=20 (Bmax = 199)`.
- **Slide 9:** extra `)` and floating `.` after DSI → `DSI = AUC × (1 − Hnorm(s))`.
- **Slide 11:** **Lift** column came back — remove again if you don't want it.
