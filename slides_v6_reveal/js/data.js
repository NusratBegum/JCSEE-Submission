/* ============================================================
   EADD — real experiment numbers + sources (single source of truth)
   Provenance: jcsse2026_full_paper.tex (canonical) + thesis chap IV
   + unsupervised-concept-drift-detection/experiments/results*(_cameraready).
   ============================================================ */
window.EADD = {
  meta: {
    title: "Enhanced Adversarial Drift Detection",
    sub: "for MLOps Feature Monitoring",
    authors: ["Nusrat Begum", "Phaphontee Yamchote", "Chainarong Amornbunchornvej", "Thanapon Noraset"],
    affil: ["Faculty of ICT, Mahidol University", "NECTEC, NSTDA, Thailand"],
    venue: "JCSSE 2026 · Bangkok, Thailand · June 24–27, 2026",
    email: "nusrat.beg@student.mahidol.ac.th"
  },

  // Exp 5 — 8-detector synthetic field (coverage out of 4, mean false alarms/type)
  coverageFA: [
    { d: "EADD", cov: 4, fa: 0.00, hi: true },
    { d: "BNDM", cov: 4, fa: 4.75 },
    { d: "CSDDM", cov: 4, fa: 5.50 },
    { d: "IBDD", cov: 4, fa: 46.25 },
    { d: "OCDD", cov: 4, fa: 17.50 },
    { d: "D3", cov: 2, fa: 0.00 },
    { d: "SPLL", cov: 2, fa: 0.00 },
    { d: "UDetect", cov: 0, fa: 0 }
  ],

  // Exp 2 — real-world INSECTS mean-time-to-detection (samples; lower better)
  mtd: [
    { label: "Abrupt", eadd: 135, d3: 155.5, x: "13% faster" },
    { label: "Incr-Abrupt", eadd: 33, d3: 272.5, x: "8× faster" },
    { label: "Incr-Recur", eadd: 133, d3: 323.5, x: "2.4× faster" }
  ],

  // Exp 1 — two-detector synthetic detection delay (n=10,000)
  delay: [
    { label: "Abrupt", eadd: 149, d3: 122 },
    { label: "Gradual", eadd: 589, d3: 725 },
    { label: "Incremental", eadd: 1759, d3: null },   // D3 misses
    { label: "Recurring", eadd: 149, d3: 122 }
  ],

  // Exp 3 — SHAP attribution accuracy
  shap: [
    { sc: "Univariate (1/10)", auc: 0.784, top: "F3", share: 52.3, dsi: 0.193 },
    { sc: "Subset (3/10)", auc: 0.809, top: "F5", share: 24.5, dsi: 0.096 },
    { sc: "Multivariate (10/10)", auc: 0.806, top: "F2", share: 14.6, dsi: 0.016 }
  ],

  // Exp 4 — false alarms on stable streams (EADD / D3 τ=0.6 / D3 τ=0.7)
  falseAlarms: [
    { s: "Gaussian i.i.d.", eadd: 0, d3a: 0, d3b: 0 },
    { s: "Autocorr. AR(1)", eadd: 0, d3a: 87.4, d3b: 54.6 },
    { s: "Heteroscedastic", eadd: 0, d3a: 10.4, d3b: 0 },
    { s: "Correlated ρ=0.7", eadd: 0, d3a: 10.0, d3b: 0 }
  ],
  mannWhitney: { p: 0.0101, tau: 0.6 },

  // Ablation / runtime scaling vs feature dimension d  (Ncur=200)
  runtimeD: {
    d: [5, 10, 20, 50, 100],
    full: [4.86, 6.93, 10.76, 23.11, 43.49],
    noaspt: [4.67, 6.68, 10.43, 22.64, 42.37],
    d3: [0.06, 0.07, 0.09, 0.14, 0.26]
  },
  // runtime vs current window N (d=10)
  runtimeN: {
    n: [100, 200, 500, 1000],
    full: [5.83, 6.91, 10.52, 11.22],
    noaspt: [5.62, 6.68, 10.23, 10.58],
    d3: [0.11, 0.07, 0.04, 0.03]
  },
  // correlated features — first-detection sample t
  correlated: { rho: [0.0, 0.5, 0.9], eadd: [4099, 4099, 4099], d3: [4117, 4117, 4117] },

  // ASPT permutations used per decision
  aspt: { fixed: 199, drift: 20, stable: 10 },

  // DSI severity tiers
  dsiTiers: [
    { t: "Low", r: "< 0.3", a: "Diffuse shift → scheduled retrain", c: "pos" },
    { t: "Moderate", r: "0.3 – 0.6", a: "Subset drift → audit shared source", c: "warn" },
    { t: "Critical", r: "> 0.6", a: "Concentrated → audit pipeline", c: "neg" }
  ],

  headline: [
    { n: "4/4", u: "", cap: "Synthetic drift<br>coverage", to: 4, dec: 0, suf: "/4" },
    { n: "0", u: "", cap: "False alarms on<br>stable streams", to: 0, dec: 0, suf: "" },
    { n: "8×", u: "×", cap: "Faster MTD vs D3<br>(incremental)", to: 8, dec: 0, suf: "×" },
    { n: "1.00", u: "", cap: "P@k = R@k<br>(univariate SHAP)", to: 1, dec: 2, suf: "" }
  ],

  config: "LightGBM (50 trees, lr 0.1, 31 leaves) · N_ref 500 · N_cur 200 · M 50 · B_max 199 · B_min 10 · α 0.05 · τ 0.7",
  baselines: ["D3", "BNDM", "CSDDM", "IBDD", "OCDD", "SPLL", "UDetect"],

  refs: [
    ["1", "Gözüaçık et al.", "Unsupervised concept drift detection with a discriminative classifier (D3). ACM CIKM 2019."],
    ["2", "Lukats et al.", "A benchmark & survey of fully unsupervised concept drift detectors on real-world streams. Int. J. Data Sci. Anal. 2024."],
    ["3", "Lopez-Paz & Oquab", "Revisiting classifier two-sample tests (C2ST). ICLR 2017."],
    ["4", "Gandy", "Sequential implementation of Monte Carlo tests with uniformly bounded resampling risk. JASA 2009."],
    ["5", "Ke et al.", "LightGBM: a highly efficient gradient boosting decision tree. NeurIPS 2017."],
    ["6", "Lundberg & Lee", "A unified approach to interpreting model predictions (SHAP). NeurIPS 2017."],
    ["7", "Lundberg et al.", "From local explanations to global understanding with explainable AI for trees (TreeSHAP). Nature Mach. Intell. 2020."],
    ["8", "Vitter", "Random sampling with a reservoir. ACM TOMS 1985."],
    ["9", "Shannon", "A mathematical theory of communication. Bell Syst. Tech. J. 1948."],
    ["10", "Budhathoki et al.", "Why did the distribution change? AISTATS 2021."],
    ["11", "Souza et al.", "Challenges in benchmarking stream learning (INSECTS). Data Min. Knowl. Discov. 2020."],
    ["12", "Vela et al. / Nestor et al.", "Temporal degradation of clinical prediction models. 2019–2022."],
    ["13", "Panda et al.", "Interpretable model drift detection (TRIPODD). ACM IKDD CODS-COMAD 2024."],
    ["14", "Singh et al.", "A hierarchical decomposition for explaining ML performance discrepancies (HDPD). NeurIPS 2024."]
  ]
};
