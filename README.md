# JCSSE 2026 — EADD Full Paper (Round 3 Camera-Ready)

Camera-ready full-paper submission to **The 23rd International Joint Conference on Computer Science and Software Engineering (JCSSE 2026)** — Full Paper track, Round 3.

**Paper title:** *Enhanced Adversarial Drift Detection for MLOps Feature Monitoring*
**Paper #:** 1571280455 (EDAS) · 2026172661 (IEEE PDF eXpress, Conference ID 68839X)
**Status:** Published in IEEE Xplore: https://ieeexplore.ieee.org/document/11596765 ([proceedings](https://ieeexplore.ieee.org/xpl/conhome/11596549/proceeding))
**Thesis:** this paper is the conference publication of the Master's thesis in [Nusrat-Thesis-Mahidol-University](https://github.com/NusratBegum/Nusrat-Thesis-Mahidol-University). The thesis re-evaluates EADD under a stricter protocol (real-world and synthetic streams, D3 compared both with its authors' settings and in an identical setup, five seeds on the annotated streams, missed drifts counted), so its results and conclusions differ from this paper. The paper is a published record: do not edit its content.

📅 **Conference:** 24–27 June 2026
📍 **Location:** The Royal River Hotel, Bangkok, Thailand
🌐 **Website:** https://jcsse2026.org/

## Known discrepancies in the published paper

A later review of the code history (November 2026) found that the paper does not describe some of its experiments correctly. The paper is a published record and is not changed here; a correction through IEEE after the thesis defense is for all co-authors to decide. The code is in [unsupervised-concept-drift-detection](https://github.com/NusratBegum/unsupervised-concept-drift-detection) (`legacy/`, `experiments/results/`, `experiments/results_cameraready/`).

1. **D3 window sizes.** The paper says D3 was run with windows matched to EADD's. It used 100/50 samples in the false-alarm experiment and 300/120 on the synthetic streams.
2. **ASPT in two results.** The INSECTS table (Table III) and the stable-stream false-alarm results came from code versions before ASPT was added (commits `c461b3c` and `9b22ab7`). The claim that ASPT removes spurious detections is therefore not supported by those runs.
3. **Abstract p-value.** The abstract pairs the 54.6 false alarms of D3 with p = 0.0101, which belongs to the threshold 0.6; at the paper's threshold 0.7 the p-value is 0.2266.
4. **Settings.** The paper gives a SHAP threshold of 0.8 and a +2 sigma shift; the code uses 0.7 and +3 sigma. The software versions listed are older than those used.
5. **Size of the INSECTS result.** The INSECTS comparison was a single unseeded run. With five seeds and missed drifts counted, D3 with LightGBM has a higher recall than EADD on these streams (thesis, Chapter 4).

## Files

| File | Purpose |
|---|---|
| `jcsse2026_full_paper.tex` / `.pdf` | LaTeX source and compiled PDF (camera-ready, 6 pages, IEEEtran A4) |
| `2026172661.pdf` | **IEEE PDF eXpress-certified PDF** (the file uploaded to EDAS) |
| `jcsse2026_final_presentation.pdf` | Slides presented at the conference (16 slides) |
| `EADD_speaker_notes.md`, `EADD_footnotes.md`, `EADD_slide_changes.md` | Notes for the talk |
| `figures/` | Slide figures (PDF/PNG) and `make_figures.py`, which regenerates them; the paper's only figure is drawn in TikZ |
| `CopyrightReceipt.pdf` | Signed IEEE Electronic Copyright Form (eCF) receipt |
| `IEEEtran.cls` | IEEE Conference Proceedings class (camera-ready 2018 template) |
| `archive/slides/` | Earlier slide drafts (v1 to v6); not maintained |

## Format Requirements (JCSSE camera-ready)

- **Paper size:** A4
- **Class:** `\documentclass[conference,a4paper]{IEEEtran}`
- **Pages:** ≤ 6 (full paper)
- **Embedded fonts**, **PDF v1.4+**, **no bookmarks / hyperlinks / passwords**
- **Author block:** all author info present (camera-ready, not blind)
- **IEEE copyright notice** on page 1: not in the submitted file (the organizer adds it in IEEE Xplore); the copies posted here carry the IEEE accepted-version notice, added on 17 Nov 2026
- **Validation:** all final PDFs must pass IEEE PDF eXpress at https://ieee-pdf-express.org/ (Conference ID `68839X`) before EDAS upload

## Important Dates (JCSSE 2026, Round 3 track)

| Event | Date |
|---|---|
| Call for Special Sessions | 15 October 2025 |
| Deadline for Submission 1st Round | 31 January 2026 |
| Notification of Acceptance 1st Round | 1 March 2026 |
| Camera Ready Submission 1st Round | 1 – 27 March 2026 |
| Deadline for Submission 2nd Round | 30 March 2026 |
| Notification of Acceptance 2nd Round | 30 April 2026 |
| Camera Ready Submission 2nd Round | 1 March – 15 May 2026 |
| **Deadline for Submission 3rd Round** | **24 April 2026** |
| **Notification of Acceptance 3rd Round** | **6 May 2026** |
| **Camera Ready Submission 3rd Round** | **6 May – 15 May 2026** ← this paper |
| Early Bird Registration | 9 March – 10 May 2026 (Bangkok Local Time, GMT+7) |
| Author Registration | 9 March – 17 May 2026 (Bangkok Local Time, GMT+7) |
| Non-Author Registration | 11 – 22 May 2026 (Bangkok Local Time, GMT+7) |
| Conference | 24 – 27 June 2026 |

## How to Reproduce / Recompile

```bash
pdflatex jcsse2026_full_paper.tex
pdflatex jcsse2026_full_paper.tex   # second pass to resolve \cite and \ref
```

Requires: TeX Live 2018+ with `IEEEtran.cls` (provided here) and the packages `cite`, `amsmath`, `amssymb`, `amsfonts`, `algorithm`, `algorithmic`, `graphicx`, `textcomp`, `xcolor`, `booktabs`, `array`, `enumitem`, `balance`, `tikz`.

## Publication

- Accepted full papers are published in **IEEE Xplore** (requires in-person presentation by at least one registered author).
- Selected papers may be invited for extended publication in **ECTI-CIT** (SCOPUS-indexed).

## Contact

**Conference enquiries:** jcsse2026@kmutt.ac.th
**Author (corresponding):** Nusrat Begum — `nusrat.beg@student.mahidol.ac.th`

---

*Template based on the official IEEE Conference Proceedings camera-ready 2018 template and JCSSE 2026 guidelines.*

---

## License

See [LICENSE](LICENSE).

| Material | Copyright | Terms |
|---|---|---|
| The paper: `jcsse2026_full_paper.tex`, `jcsse2026_full_paper.pdf`, `2026172661.pdf` | © 2026 IEEE (transferred with the signed eCF) | Authors' accepted version, posted under the IEEE author posting policy; the IEEE notice is on page 1 of each PDF |
| Talk materials: slides, speaker notes, slide figures, `archive/slides/` | © 2026 Nusrat Begum | [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/) |

**Citation** (required for any sharing):

```bibtex
@inproceedings{begum2026eadd,
  author    = {Begum, Nusrat and Yamchote, Phaphontee and
               Amornbunchornvej, Chainarong and Noraset, Thanapon},
  title     = {Enhanced Adversarial Drift Detection for MLOps
               Feature Monitoring},
  booktitle = {Proc. 23rd International Joint Conference on Computer
               Science and Software Engineering (JCSSE)},
  year      = {2026},
  pages     = {684--689},
  doi       = {10.1109/JCSSE68839.2026.11596765},
  publisher = {IEEE},
}
```
