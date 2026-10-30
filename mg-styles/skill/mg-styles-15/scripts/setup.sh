#!/bin/sh
# mg-styles-15: fetch the style library (prompts, renderer, audio toolkit) and print its path.
#   sh setup.sh        clone on first run (pinned commit), print MG=<path>
#   sh setup.sh deps   npm install + Python audio packages into $MG/.venv
# The 420 MB of finished films (videos/) and the README images (docs/) are skipped.
# MG_STYLES_HOME = where the library lives (default ~/mg-styles-15). MG_STYLES_REF = commit to check out.
set -e
REPO=https://github.com/Vincentwei1021/mg-styles-15.git
REF=${MG_STYLES_REF:-49052d80bfaf9fa8412cc9710530e5e95a3b8d8c}
MG=${MG_STYLES_HOME:-$HOME/mg-styles-15}

if [ ! -f "$MG/harness/render.mjs" ]; then
  [ -e "$MG" ] && [ -n "$(ls -A "$MG" 2>/dev/null)" ] && { echo "✗ $MG exists but is not mg-styles-15. Set MG_STYLES_HOME to another folder."; exit 1; }
  command -v git >/dev/null || { echo "✗ git is needed"; exit 1; }
  echo "↓ downloading mg-styles-15 into $MG"
  git clone --quiet --filter=blob:none --no-checkout "$REPO" "$MG"
  git -C "$MG" sparse-checkout set --no-cone '/*' '!/videos/' '!/docs/'
  git -C "$MG" checkout --quiet "$REF"
fi
MG=$(cd "$MG" && pwd -P)

if [ "$1" = deps ]; then
  cd "$MG"
  [ -d node_modules/puppeteer-core ] || npm install --no-audit --no-fund --loglevel=error
  if [ ! -x .venv/bin/python ]; then
    for c in python3.12 python3.13 python3.11 python3; do
      "$c" -c 'import sys; sys.exit(sys.version_info < (3, 11))' 2>/dev/null && { "$c" -m venv .venv; break; }
    done
  fi
  [ -x .venv/bin/python ] || { echo "✗ Python 3.11+ is needed"; exit 1; }
  .venv/bin/python -c 'import numpy, scipy, soundfile, pedalboard, pyloudnorm' 2>/dev/null ||
    .venv/bin/python -m pip install --quiet --disable-pip-version-check numpy scipy soundfile numba pedalboard pyloudnorm librosa
fi

# Chrome for the renderer: MG_CHROME, else a Chrome/Chromium on PATH, else Playwright's
chrome=${MG_CHROME:-}
[ -n "$chrome" ] || [ ! -x "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ] || chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
for c in google-chrome google-chrome-stable chromium chromium-browser; do [ -n "$chrome" ] || chrome=$(command -v $c || true); done
[ -n "$chrome" ] || chrome=$(ls -d /opt/pw-browsers/chromium-*/chrome-linux*/chrome "$HOME"/.cache/ms-playwright/chromium-*/chrome-linux*/chrome 2>/dev/null | head -1)
miss=""
command -v node >/dev/null || miss="$miss node22+"
command -v ffmpeg >/dev/null || miss="$miss ffmpeg"
[ -n "$chrome" ] || miss="$miss chrome"
[ -n "$miss" ] && echo "! missing:$miss"
[ -d "$MG/node_modules/puppeteer-core" ] || echo "! packages not installed yet: run 'sh setup.sh deps' before the first render"
echo "CHROME=$chrome"
echo "MG=$MG"
