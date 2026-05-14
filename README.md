# JCSSE 2026 — EADD Full Paper (Round 3 Camera-Ready)

Camera-ready full-paper submission to **The 23rd International Joint Conference on Computer Science and Software Engineering (JCSSE 2026)** — Full Paper track, Round 3.

**Paper title:** *Enhanced Adversarial Drift Detection for MLOps Feature Monitoring*
**Paper #:** 1571280455 (EDAS) · 2026172661 (IEEE PDF eXpress, Conference ID 68839X)
**Status:** Accepted (Round 3); camera-ready submitted.

📅 **Conference:** 24–27 June 2026
📍 **Location:** The Royal River Hotel, Bangkok, Thailand
🌐 **Website:** https://jcsse2026.org/

## Files

| File | Purpose |
|---|---|
| `jcsse2026_full_paper.tex` | LaTeX source (camera-ready, 6 pages, IEEEtran A4) |
| `jcsse2026_full_paper.pdf` | Locally compiled PDF |
| `2026172661.pdf` | **IEEE PDF eXpress-certified PDF** (the file uploaded to EDAS) |
| `jcsse2026_slides.tex` / `.pdf` | Presentation slides for the conference talk |
| `CopyrightReceipt.pdf` | Signed IEEE Electronic Copyright Form (eCF) receipt |
| `IEEEtran.cls` | IEEE Conference Proceedings class (camera-ready 2018 template) |

## Format Requirements (JCSSE camera-ready)

- **Paper size:** A4
- **Class:** `\documentclass[conference,a4paper]{IEEEtran}`
- **Pages:** ≤ 6 (full paper)
- **Embedded fonts**, **PDF v1.4+**, **no bookmarks / hyperlinks / passwords**
- **Author block:** all author info present (camera-ready, not blind)
- **IEEE copyright notice** on page 1: NOT included — organizer adds it after submission
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
| Author Registration | 9 March – 15 May 2026 (Bangkok Local Time, GMT+7) |
| Non-Author Registration | 11 – 22 May 2026 (Bangkok Local Time, GMT+7) |
| Conference | 24 – 27 June 2026 |

## How to Reproduce / Recompile

```bash
pdflatex jcsse2026_full_paper.tex
pdflatex jcsse2026_full_paper.tex   # second pass to resolve \cite and \ref
```

Requires: TeX Live 2018+ with `IEEEtran.cls` (provided here), `algorithm`, `algorithmic`, `booktabs`, `tikz`, `balance` packages.

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

**Two regimes apply to this repository — see [LICENSE](LICENSE) for full terms.**

| Material | License | Notes |
|---|---|---|
| Published paper PDF (`jcsse2026_full_paper.pdf`, `2026172661.pdf`) | © 2026 IEEE. All rights reserved. | Copyright transferred to IEEE via signed eCF. Personal scholarly use only. |
| LaTeX source, figures, slides, supplementary materials (© 2026 Nusrat Begum) | [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/) | Share-only, non-commercial, no derivatives, with attribution. |

**Commercial use** of any material requires written permission from the author: `nusrat.beg@student.mahidol.ac.th`.

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
  publisher = {IEEE},
}
```
