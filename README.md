# Enhanced Adversarial Drift Detection for MLOps Feature Monitoring

Paper source, final PDFs and talk materials for the full paper presented at the **23rd International Joint Conference on Computer Science and Software Engineering (JCSSE 2026)**, Bangkok, Thailand, 24 to 27 June 2026.

[![IEEE Xplore](https://img.shields.io/badge/IEEE%20Xplore-11596765-00629B)](https://ieeexplore.ieee.org/document/11596765)
[![DOI](https://img.shields.io/badge/DOI-10.1109%2FJCSSE68839.2026.11596765-blue)](https://doi.org/10.1109/JCSSE68839.2026.11596765)

**Authors:** Nusrat Begum (Mahidol University), Phaphontee Yamchote (Mahidol University), Chainarong Amornbunchornvej (NECTEC, NSTDA), Thanapon Noraset (Mahidol University)
**Status:** Published in IEEE Xplore, pp. 684 to 689 ([proceedings](https://ieeexplore.ieee.org/xpl/conhome/11596549/proceeding)). This repository is a frozen record: the paper source and PDFs are not edited.

## Citation

```bibtex
@inproceedings{begum2026eadd,
  author    = {Begum, Nusrat and Yamchote, Phaphontee and
               Amornbunchornvej, Chainarong and Noraset, Thanapon},
  title     = {Enhanced Adversarial Drift Detection for MLOps
               Feature Monitoring},
  booktitle = {2026 23rd International Joint Conference on Computer
               Science and Software Engineering (JCSSE)},
  address   = {Bangkok, Thailand},
  year      = {2026},
  pages     = {684--689},
  doi       = {10.1109/JCSSE68839.2026.11596765},
  publisher = {IEEE},
}
```

Machine-readable metadata is in [`CITATION.cff`](CITATION.cff) (GitHub shows it under "Cite this repository"). The page numbers and DOI match the Crossref record of the DOI.

## Abstract

Machine learning models in production suffer from distribution drift, where evolving input features degrade performance. Existing unsupervised detectors signal that drift occurred, but not which features drifted or how severe the shift is. This paper proposes Enhanced Adversarial Drift Detection (EADD), extending the D3 discriminative detector with three contributions: (1) an Adaptive Sequential Permutation Test (ASPT) for rigorous drift confirmation, cutting permutation budget by 90 to 95%; (2) SHAP-based drift localisation and a Drift Severity Index (DSI) for feature-level diagnosis and severity quantification; and (3) benchmarking against seven unsupervised detectors on synthetic and real-world streams. EADD achieves full drift type coverage (4/4) with zero false alarms on synthetic data, detects drift on three of four annotated INSECTS datasets, and outperforms D3 on detection delay in all three detected cases (up to 8x faster). SHAP attribution reaches perfect accuracy (P@k = R@k = 1.0) on controlled synthetic scenarios. On autocorrelated streams, EADD produces zero false alarms versus D3's 54.6 (p = 0.0101, Mann-Whitney U).

*Abstract as published. Some of these statements are affected by the known discrepancies listed below (items 2, 3 and 5).*

## Relation to the thesis and the code

This paper is the conference publication of a Master's thesis at the Faculty of ICT, Mahidol University.

- Thesis: [NusratBegum/Nusrat-Thesis-Mahidol-University](https://github.com/NusratBegum/Nusrat-Thesis-Mahidol-University)
- Code and results: [NusratBegum/unsupervised-concept-drift-detection](https://github.com/NusratBegum/unsupervised-concept-drift-detection). The code behind this paper's numbers is in `legacy/` (`experiment1..7_*.py`, `experiment_camera_ready.py`), `experiments/results/` and `experiments/results_cameraready/`.

After the paper, the thesis corrected the evaluation and the method: it re-evaluates EADD under a stricter protocol (real-world and synthetic streams, D3 compared both with its authors' settings and in an identical setup, five seeds on the annotated streams, missed drifts counted), so its results and conclusions differ from this paper. Numbers from the thesis are not copied into the paper.

## Known discrepancies in the published paper

A later review of the code history (November 2026) found that the paper does not describe some of its experiments correctly. The paper is a published record and is not changed here; a correction through IEEE after the thesis defense is for all co-authors to decide. The code is in [unsupervised-concept-drift-detection](https://github.com/NusratBegum/unsupervised-concept-drift-detection) (`legacy/`, `experiments/results/`, `experiments/results_cameraready/`).

1. **D3 window sizes.** The paper says D3 was run with windows matched to EADD's. It used 100/50 samples in the false-alarm experiment and 300/120 on the synthetic streams.
2. **ASPT in two results.** The INSECTS table (Table III) and the stable-stream false-alarm results came from code versions before ASPT was added (commits `c461b3c` and `9b22ab7`). The claim that ASPT removes spurious detections is therefore not supported by those runs.
3. **Abstract p-value.** The abstract pairs the 54.6 false alarms of D3 with p = 0.0101, which belongs to the threshold 0.6; at the paper's threshold 0.7 the p-value is 0.2266.
4. **Settings.** The paper gives a SHAP threshold of 0.8 and a +2 sigma shift; the code uses 0.7 and +3 sigma. The software versions listed are older than those used.
5. **Size of the INSECTS result.** The INSECTS comparison was a single unseeded run. With five seeds and missed drifts counted, D3 with LightGBM has a higher recall than EADD on these streams (thesis, Chapter 4).

## Repository contents

| Path | Contents |
|---|---|
| `jcsse2026_full_paper.tex` | LaTeX source of the camera-ready paper (IEEEtran, A4, 6 pages). Its only figure is drawn in TikZ, so it needs no image files |
| `jcsse2026_full_paper.pdf` | Camera-ready PDF compiled from the source, with the IEEE accepted-version notice on page 1 |
| `2026172661.pdf` | The IEEE PDF eXpress-certified PDF uploaded to EDAS (paper 1571280455; PDF eXpress conference ID 68839X), with the same notice |
| `IEEEtran.cls` | IEEE conference class (2018 camera-ready template) |
| `CopyrightReceipt.pdf` | Receipt of the signed IEEE Electronic Copyright Form |
| `jcsse2026_final_presentation.pdf` | The 16-slide deck presented at the conference |
| `EADD_speaker_notes.md` | Slide-by-slide speaker script for the talk (about 9 to 10 minutes, with target times per slide) |
| `EADD_footnotes.md` | Numbered reference list for the deck: one number per reference, in order of first appearance |
| `EADD_slide_changes.md` | Slide-by-slide list of corrections and citations to add, made while preparing the final deck |
| `figures/` | Slide figures (PDF and PNG) and `make_figures.py`, which regenerates them. These are for the slides, not the paper |
| `archive/slides/` | Earlier slide drafts kept as a history of the talk: Beamer versions v1 to v4 (`.tex` and `.pdf`), v5 and v6 PDFs, `slides_v5_web/` (hand-built HTML deck for v5 and its build brief) and `slides_v6_reveal/` (reveal.js deck for v6 with vendored libraries, fonts and icons). Not maintained: their relative paths to `figures/` no longer resolve |
| `CITATION.cff` | Citation metadata |
| `LICENSE` | Copyright and license terms (see below) |

## Building the paper

```bash
pdflatex jcsse2026_full_paper.tex
pdflatex jcsse2026_full_paper.tex   # second pass resolves \cite and \ref
```

Requires TeX Live 2018 or later with `IEEEtran.cls` (provided here) and the packages `cite`, `amsmath`, `amssymb`, `amsfonts`, `algorithm`, `algorithmic`, `graphicx`, `textcomp`, `xcolor`, `booktabs`, `array`, `enumitem`, `balance` and `tikz`. The bibliography is inline (`thebibliography`), so BibTeX is not needed. A fresh build does not include the accepted-version notice that was stamped on the committed PDFs.

The slide figures are regenerated with `python figures/make_figures.py`. The script reads results from the code repository, which it expects to be cloned next to this repository (`../unsupervised-concept-drift-detection/experiments`, relative to the repository root).

<details>
<summary>Submission record (JCSSE 2026 camera-ready requirements and dates)</summary>

Submitted to the Full Paper track, Round 3. Conference website: https://jcsse2026.org/. Venue: The Royal River Hotel, Bangkok.

**Format requirements**

- **Paper size:** A4
- **Class:** `\documentclass[conference,a4paper]{IEEEtran}`
- **Pages:** ≤ 6 (full paper)
- **Embedded fonts**, **PDF v1.4+**, **no bookmarks / hyperlinks / passwords**
- **Author block:** all author info present (camera-ready, not blind)
- **IEEE copyright notice** on page 1: not in the submitted file (the organizer adds it in IEEE Xplore); the copies posted here carry the IEEE accepted-version notice, added on 17 Nov 2026
- **Validation:** all final PDFs must pass IEEE PDF eXpress at https://ieee-pdf-express.org/ (Conference ID `68839X`) before EDAS upload

**Dates**

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

</details>

## License and copyright

See [LICENSE](LICENSE).

| Material | Copyright | Terms |
|---|---|---|
| The paper: `jcsse2026_full_paper.tex`, `jcsse2026_full_paper.pdf`, `2026172661.pdf` | © 2026 IEEE (transferred with the signed eCF) | Authors' accepted version, posted under the IEEE author posting policy; the IEEE notice is on page 1 of each PDF |
| Talk materials: slides, speaker notes, slide figures, `archive/slides/` | © 2026 Nusrat Begum | [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/) |

Third-party files under `archive/slides/slides_v6_reveal/vendor/` and the web fonts keep their own licenses. Please cite the paper (above) when sharing any of this material.

## Contact

Nusrat Begum, `nusrat.beg@student.mahidol.ac.th`
