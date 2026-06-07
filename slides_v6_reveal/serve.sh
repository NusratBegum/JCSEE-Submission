#!/bin/bash
# Present / develop the deck. Reveal + d3 modules need http (not file://).
# Then open http://localhost:8000  — arrows to navigate, F fullscreen, S speaker notes.
cd "$(dirname "$0")"
echo "EADD deck → http://localhost:8000   (Ctrl-C to stop)"
python3 -m http.server 8000
