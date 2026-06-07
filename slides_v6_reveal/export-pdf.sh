#!/bin/bash
# Export the deck to a static PDF via reveal.js print-pdf + headless Chrome.
set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT=8021
# start a throwaway server
( cd "$DIR" && python3 -m http.server $PORT >/dev/null 2>&1 ) &
SRV=$!
trap 'kill $SRV 2>/dev/null' EXIT
for i in $(seq 1 30); do curl -s -o /dev/null "http://localhost:$PORT/index.html" && break; sleep 0.3; done
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --run-all-compositor-stages-before-draw --virtual-time-budget=8000 \
  --print-to-pdf="$DIR/../jcsse2026_slides_v6.pdf" \
  "http://localhost:$PORT/index.html?print-pdf"
echo "PDF -> $DIR/../jcsse2026_slides_v6.pdf"
