# EADD — JCSSE 2026 Speaker Script

**Talk:** Enhanced Adversarial Drift Detection for MLOps Feature Monitoring · 23rd JCSSE, Bangkok
**Budget:** ~9–10 min talk + 3–5 min Q&A · 16 slides
**Style:** storytelling — connect the problem to the solution, simple short sentences, easy to say. Set up a problem, then show how EADD answers it.
**How to use:** read aloud with a timer. `(~Xs)` = target time.

---

## Slide 1 — Title (~15s)
Hello, my name is Nusrat Begum, from Mahidol University. Today I will present our work, EADD. Think of it as a tool that watches the data going into a machine learning model. It does not only tell us *that* the data changed — it also tells us *which* parts changed, and *how badly*.

## Slide 2 — Outline (~5s)
Here is the outline.

## Slide 3 — Drift & Feature Drift (~35s)
Let me start with the problem. We train a model on some data. But after we put it in production, the real-world data slowly changes. We call this *drift*. Here is a simple example with age. The blue chart is the data we trained on. The orange chart is the data later, in production — now the people are younger. The model does not crash; it still gives answers. But the answers slowly become wrong, and nobody notices. So we want to catch this early — and without labels, because in real systems the true answers come very late, or never.

## Slide 4 — Production ML Models Fail Silently (~45s)
So why is this hard? Most detectors today only give a yes-or-no answer — did drift happen, or not. The simple statistical tests, like the KS test, check one feature at a time, so they miss changes that only show up when features move together. A stronger idea is the discriminative approach: we train a small classifier to tell old data from new data. If it can tell them apart, the data has changed. This is called the classifier two-sample test, or C2ST. The strongest method of this type is D3 — a large 2024 benchmark by Lukats confirmed this. But D3 has three weaknesses, on the right. It has no real statistical test, so it gives false alarms. It cannot tell us which feature changed. And it uses a linear model, so it misses non-linear drift. These three weaknesses are exactly what we fix.

## Slide 5 — Research Gap (~35s)
This gives us the research gap. Past work answers only one question each. Some tell us *whether and when* drift happened. Some tell us *which* feature. Some measure *how severe*. Even industry tools only do parts of this, and not in real time. So no single unsupervised, streaming method does all three together. That is exactly what our work does. EADD answers whether, when, which, and how severe — all in one pipeline. And we do this with three contributions.

## Slide 6 — Main Contributions (~30s)
Here are the three contributions. First, ASPT — a fast statistical test that confirms the drift is real. Second, we use SHAP to find which features changed, and a score called DSI to measure how severe it is. Third, we test EADD against seven other detectors, on synthetic data and on thirteen real datasets. The key idea is that we bring all three together into one pipeline. Let me show how it works.

## Slide 7 — EADD Pipeline (~55s)
Here is the full EADD pipeline. Let me walk through it from left to right. On the left, the data stream comes in. In Step 1, we keep two windows of data. One is the reference window — the older, normal data. The other is the current window — the most recent data. In Step 2, we train a LightGBM classifier, and we ask it one simple question: can it separate the two windows? If it cannot, the data is still the same — so there is no drift, and we keep watching; that is the path on the right. But if it can separate them, the data may have changed. Then we go to Step 3, where ASPT checks if this is statistically real. And only if it is real, Step 4 runs SHAP and DSI, to find which features changed and how severe. One important point: we check the classifier first, and only then run the statistical test. This order is what keeps our false alarms low.

## Slide 8 — Contribution 1: ASPT (~40s)
Our first contribution is ASPT, and it comes directly from D3's problem. D3 uses a fixed AUC threshold, which gives false alarms on noisy, autocorrelated data. We replace that with a permutation test. The idea is simple: the more we shuffle the labels, the more reliable the drift detection. This might sound slow, or computationally heavy. But our model, EADD, stops early — as soon as the answer is clear, on average after only 20 shuffles. So we save 90 to 95 percent of the work, and we still prevent false alarms.

## Slide 9 — Contribution 2: SHAP and DSI (~45s)
Our second contribution is localisation, and again it comes from a D3 problem. D3 trains a classifier just to detect drift, and then it throws the classifier away. We thought — why waste it? So we keep the classifier and run SHAP on it. The idea is simple: SHAP tells us how much each feature helped to separate old data from new. So the features at the top are the ones that drifted. But knowing which features is not enough — we also want to know how serious it is. So we built one score, the DSI. It multiplies two things: the AUC, which is how strong the drift is, and how focused the drift is across the features. If only a few features moved, the score is high — a serious, focused drift. If many features moved a little, the score is low — a spread-out drift. And we made it fair for any number of features, so whether we have five features or fifty, the score still means the same thing.

## Slide 10 — Experimental Setup (~40s)
Now, how did we test it? We used three kinds of data. First, synthetic data, where we control everything — five thousand samples, five features, and all four drift types: abrupt, gradual, incremental, and recurring. We also added four streams with no drift at all, just to see if the model raises false alarms. Second, real data — thirteen streams, and four of them, the INSECTS datasets, have the real drift points labelled, so we can check the timing. Third, a special SHAP test: we hid the drift inside features we already know, so we can check if SHAP really points to the right ones. And one important thing — we used the same settings for every detector, so the comparison is fair.

## Slide 11 — Result 1: Coverage and False Alarms (~40s)
This is our first and most important result, so let me explain the two columns. Coverage is how many of the four drift types a detector catches. Mean FA is how many false alarms it makes when there is no drift. Now here is the interesting part — the trade-off. These detectors, BNDM, CSDDM, IBDD, and OCDD, catch all four types. Sounds great — but look at the false alarms; IBDD raises over 46. On the other side, D3 and SPLL make zero false alarms, but they catch only two of four. So every detector is good at one thing and bad at the other. Except EADD. It is the only one that does both — all four types, and zero false alarms. The wide coverage comes from LightGBM, and the zero false alarms come from ASPT.

## Slide 12 — Result 2: Real-World INSECTS (~35s)
Synthetic data is one thing, but does it work on real data? Yes. We use the INSECTS streams, and here we measure detection delay — how fast we catch the drift, so lower is better. EADD is faster than D3 on every dataset where both methods find the drift. And look at this one — EADD catches it at 33 steps, while D3 takes 272. That is about 8 times faster. Both methods miss one dataset, the gradual one, because it changes too slowly for either of them. You might notice the precision looks low on some rows — but that is only because the labels are very sparse. Our recall is 1.0, so we do catch the real drift.

## Slide 13 — Result 3: SHAP Attribution (~30s)
Now the last result — is the attribution actually correct? To test this, we hid the drift in features we already know, and we checked if SHAP finds them. The important case is the univariate one: only one feature out of ten changed. And SHAP put exactly that feature at the top, with 52 percent of the importance — perfect precision and recall. The DSI score also ranked the cases correctly, by how focused the drift is. So SHAP does not just give a number — it points to the right feature.

## Slide 14 — Limitations and Future Work (~30s)
Now the limitations, honestly. First, speed: EADD is 50 to 160 times slower than D3, because we retrain the model often. Second, we run many tests over time without correction, so our zero false alarms is a result we measured, not a formal guarantee. Third, the severity levels are still rough, and were never triggered in our tests. For the future, we plan faster statistics with e-values, causal attribution, and better calibration of the severity score.

## Slide 15 — Conclusion (~30s)
To conclude. EADD turns a simple yes-or-no alarm into a full diagnosis. It confirms the drift, finds which features changed, and measures how severe. Our main results: it finds all four drift types with zero false alarms — the only method to do both; it is up to 8 times faster than D3 on real data; and it points to the right feature perfectly in the univariate case. So, in one pipeline, EADD answers whether, when, which, and how severe.

## Slide 16 — Thank you + References (~8s)
Thank you for listening. The references are on this slide. I am happy to take your questions.

---

# Q&A — likely questions (simple spoken answers)

**"It is 50 to 160 times slower than D3 — can you really use it?"**
Yes, in our setting. One check takes only a few seconds, and we check every 50 samples, not every sample. Drift builds up over thousands of samples, so a few seconds is fine. If we need it faster, we can use fewer trees.

**"Why do you miss the gradual INSECTS dataset?"**
Both EADD and D3 miss it. The drift is too slow and has no clear point. To catch it, we would have to lower the threshold, and then we get many false alarms. We chose to stay precise instead.

**"The precision is very low, around 0.14. Is that a problem?"**
It comes from the labels, not from mistakes. The true drift points are labelled very sparsely. So if we detect a little before or after the labelled point, it is counted as wrong. Our recall is 1.0, so we do find the real drift.

**"SHAP shows correlation, not cause."**
Yes, and we say this as a limitation. When features are correlated, we read the result as a group of features, not one. Finding the true cause is our next step. But for pointing to the right area, SHAP is already useful.

**"Is this just D3 plus LightGBM plus SHAP plus a permutation test?"**
It is a combination, but not a simple one. The classifier check must come before the permutation test, or the false-alarm control breaks. SHAP must be used on this special classifier, not a normal one. And the severity score must work for any number of features. No earlier streaming method puts all three together.

**"Show the evidence for zero false alarms versus D3."**
On autocorrelated data, EADD makes zero false alarms. D3 makes 87.4 at threshold 0.6, and that difference is significant — Mann–Whitney test, p equals 0.0101. At threshold 0.7, D3 makes 54.6.
*(Self-note: do not say "54.6 with p = 0.0101" — they are different thresholds.)*

---

## Pre-talk checklist
- [x] Slide changes applied and re-exported.
- [ ] Present from **Google Slides / your own laptop** — the PDF still shows □ on slides 8 & 9 on machines without the font. Don't trust the venue PC with the raw PDF.
- [x] Lift removed (Slide 11); multivariate removed (Slide 13).
- [ ] Practice with a timer — target ~9–10 min.
