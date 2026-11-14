# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The camera-ready JCSSE 2026 paper "Enhanced Adversarial Drift Detection for MLOps Feature Monitoring" (published, IEEE Xplore document 11596765) and the slides presented at the conference. It is a published record, needed for graduation.

## Rules

- Do not change the content of `jcsse2026_full_paper.tex`, `jcsse2026_full_paper.pdf`, `2026172661.pdf` (the IEEE PDF eXpress file) or `CopyrightReceipt.pdf`. Corrections to the paper are a decision for all co-authors and go through IEEE, not through this repo.
- The thesis (sibling repo `Nusrat-Thesis-Mahidol-University`) re-evaluates EADD under a stricter protocol and reaches different conclusions. Do not "sync" numbers from the thesis into the paper.
- Commit only from inside this folder. The parent `Final/` folder is not a git repository.

## Commands

```bash
pdflatex jcsse2026_full_paper.tex && pdflatex jcsse2026_full_paper.tex
python figures/make_figures.py        # regenerates the paper figures
```

## Layout

`figures/` holds the paper figures and their script. `jcsse2026_final_presentation.pdf` is the deck that was presented; `EADD_speaker_notes.md`, `EADD_footnotes.md` and `EADD_slide_changes.md` belong to it. `archive/slides/` holds earlier slide drafts and is not maintained (their relative paths to `figures/` no longer resolve).

The experiment code that produced the paper's numbers is in the sibling repo `unsupervised-concept-drift-detection` (`experiment1..7_*.py`, `experiment_camera_ready.py`, `experiments/results/`).
