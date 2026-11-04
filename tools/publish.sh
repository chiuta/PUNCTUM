#!/bin/sh
# Pregătește rădăcina depozitului pentru GitHub Pages: build + PWA + copiere (ca la celelalte aplicații).
# Folosire: sh tools/publish.sh 2.5
set -e
cd "$(dirname "$0")/.."
V="${1:?versiune}"
python3 build.py
node tools/make_pwa.js "$V"
cp dist/pwa/index.html index.html
cp dist/punctum.html punctum.html
for f in manifest.webmanifest sw.js icon.svg icon-192.png icon-512.png icon-maskable-512.png; do cp "dist/pwa/$f" "$f"; done
echo "rădăcină gata (v$V)"
