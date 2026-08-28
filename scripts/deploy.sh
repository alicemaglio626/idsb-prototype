#!/usr/bin/env bash
# Build the IDSB prototype, encrypt with StatiCrypt (password: idsb), deploy to GitHub Pages.
#
#   Usage:  npm run deploy      (from repo root)
set -euo pipefail

HERE="$(cd "$(dirname "$0")/.." && pwd)"
REMOTE="https://github.com/alicemaglio626/idsb-prototype.git"

echo "→ Building static site..."
cd "$HERE"
NODE_ENV=production npm run build

echo "→ Encrypting with StatiCrypt (password: idsb)..."
npx staticrypt dist/index.html -p idsb --short -o dist/index.html --remember 0

echo "→ Deploying to gh-pages branch..."
TMP="$(mktemp -d)"
cp -R dist/. "$TMP/"
touch "$TMP/.nojekyll"
cd "$TMP"
git init -q
git checkout -q -b gh-pages
git add -A
git -c user.name="Alice Maglio" -c user.email="alice.maglio@datavant.com" \
  commit -q -m "Deploy IDSB prototype"
git remote add origin "$REMOTE"
git push -q --force origin gh-pages
cd "$HERE"
rm -rf "$TMP"

echo ""
echo "✓ Deployed → https://alicemaglio626.github.io/idsb-prototype/"
echo "  Password: idsb"
