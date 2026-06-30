#!/bin/bash
# Deploy Atlas assets from atlas-ip (canonical) → Collectiverse app (runtime)
#
# Usage:
#   ./scripts/deploy-to-app.sh              # Deploy all
#   ./scripts/deploy-to-app.sh --poses      # Poses only
#   ./scripts/deploy-to-app.sh --comics     # Comics only
#   ./scripts/deploy-to-app.sh --brand      # Brand assets only
#   ./scripts/deploy-to-app.sh --dry-run    # Show what would be copied

set -e

# Paths
ATLAS_IP="$(cd "$(dirname "$0")/.." && pwd)"
APP_REPO="$(cd "$ATLAS_IP/../collectiverse/apps/web/public" 2>/dev/null && pwd)"

if [ -z "$APP_REPO" ] || [ ! -d "$APP_REPO" ]; then
  echo "❌ App repo not found at expected location."
  echo "   Expected: $ATLAS_IP/../collectiverse/apps/web/public"
  echo "   Adjust APP_REPO path in this script if your repo is elsewhere."
  exit 1
fi

DRY_RUN=false
DEPLOY_POSES=true
DEPLOY_COMICS=true
DEPLOY_BRAND=true

# Parse args
for arg in "$@"; do
  case $arg in
    --dry-run) DRY_RUN=true ;;
    --poses) DEPLOY_COMICS=false; DEPLOY_BRAND=false ;;
    --comics) DEPLOY_POSES=false; DEPLOY_BRAND=false ;;
    --brand) DEPLOY_POSES=false; DEPLOY_COMICS=false ;;
  esac
done

echo "🚀 Atlas Asset Deployment"
echo "═══════════════════════════════════════════════════"
echo "  Source: $ATLAS_IP"
echo "  Target: $APP_REPO"
echo "  Dry run: $DRY_RUN"
echo "═══════════════════════════════════════════════════"

copy_files() {
  local src="$1"
  local dst="$2"
  local label="$3"

  if [ ! -d "$src" ]; then
    echo "  ⚠️  Source not found: $src"
    return
  fi

  local count=$(find "$src" -type f | wc -l)
  echo "  📂 $label: $count files"

  if [ "$DRY_RUN" = true ]; then
    echo "     → Would copy to: $dst"
  else
    mkdir -p "$dst"
    cp -r "$src"/* "$dst"/
    echo "     ✓ Copied to: $dst"
  fi
}

# 1. Poses (originals + variants)
if [ "$DEPLOY_POSES" = true ]; then
  echo ""
  echo "── Poses ──"
  copy_files "$ATLAS_IP/poses/originals" "$APP_REPO/images/atlas/poses" "Original PNGs"
  copy_files "$ATLAS_IP/poses/sm" "$APP_REPO/images/atlas/poses/sm" "Small WebP"
  copy_files "$ATLAS_IP/poses/md" "$APP_REPO/images/atlas/poses/md" "Medium WebP"
  copy_files "$ATLAS_IP/poses/lg" "$APP_REPO/images/atlas/poses/lg" "Large WebP"
fi

# 2. Comics
if [ "$DEPLOY_COMICS" = true ]; then
  echo ""
  echo "── Comics ──"
  copy_files "$ATLAS_IP/comics" "$APP_REPO/images/atlas/comics" "Comic PNGs"
fi

# 3. Brand assets
if [ "$DEPLOY_BRAND" = true ]; then
  echo ""
  echo "── Brand ──"
  # Brand has a specific structure: brand/atlas/ + brand/collectiverse-logo.png
  if [ "$DRY_RUN" = true ]; then
    echo "  📂 Brand assets: 3 files"
    echo "     → Would copy to: $APP_REPO/brand/"
  else
    mkdir -p "$APP_REPO/brand/atlas"
    cp "$ATLAS_IP/logos/brand/atlas-mascot.png" "$APP_REPO/brand/atlas/" 2>/dev/null || true
    cp "$ATLAS_IP/logos/brand/atlas-comic-strip.png" "$APP_REPO/brand/atlas/" 2>/dev/null || true
    cp "$ATLAS_IP/logos/brand/collectiverse-logo.png" "$APP_REPO/brand/" 2>/dev/null || true
    echo "  📂 Brand assets: ✓ Copied"
  fi
fi

echo ""
echo "═══════════════════════════════════════════════════"
if [ "$DRY_RUN" = true ]; then
  echo "  Dry run complete. No files were copied."
else
  echo "  ✅ Deployment complete!"
  echo ""
  echo "  Next: cd $APP_REPO/.. && git add . && git commit -m 'Update Atlas assets from atlas-ip'"
fi
echo "═══════════════════════════════════════════════════"
