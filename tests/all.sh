#!/bin/sh
# rulează toate testele: sh tests/all.sh [dist/punctum.html]
F=${1:-dist/punctum.html}; export NODE_PATH=${NODE_PATH:-/opt/npm-tools/node_modules}; R=0
for t in run adversarial a11y contrast i18n_cov; do echo "== $t"; node tests/$t.js $F || R=1; done
exit $R
