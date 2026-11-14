#!/bin/bash
# Export the deck to a static, pixel-exact 16:9 PDF.
# ?export=1 puts deck.js in static mode (all fragments revealed, animations
# frozen at final state, paginated print layout) so the PDF matches the talk.
set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --run-all-compositor-stages-before-draw --virtual-time-budget=5000 \
  --print-to-pdf="$DIR/../jcsse2026_slides_v5.pdf" "file://$DIR/index.html?export=1"
echo "PDF -> $DIR/../jcsse2026_slides_v5.pdf"
