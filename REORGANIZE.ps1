# ============================================================
# ATLAS-IP REPO REORGANIZATION SCRIPT
# Generated: 2026-08-03
# SAFETY: Only MOVES and COPIES — never deletes files
# ============================================================

$ErrorActionPreference = "Stop"
$base = "C:\Users\bellgj\Documents\Personal\collectiverse\atlas-ip"
$dataSource = "C:\Users\bellgj\Documents\Personal\collectiverse data\ip"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ATLAS-IP REPO REORGANIZATION" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# ============================================================
# STEP 1: Create target directories
# ============================================================
Write-Host "[1/10] Creating target directories..." -ForegroundColor Yellow

$dirs = @(
    "$base\characters",
    "$base\characters\poses",
    "$base\characters\reference-images",
    "$base\characters\models",
    "$base\characters\training-data",
    "$base\canon",
    "$base\canon\character-bible",
    "$base\canon\volumes",
    "$base\comics\generated",
    "$base\videos\clips",
    "$base\marketing\social-media",
    "$base\brand",
    "$base\brand\logos",
    "$base\brand\colors",
    "$base\brand\fonts",
    "$base\archive\generated",
    "$base\archive\templates"
)

foreach ($dir in $dirs) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "  Created: $dir" -ForegroundColor DarkGray
    }
}
Write-Host "  Done!" -ForegroundColor Green
Write-Host ""

# ============================================================
# STEP 2: CHARACTERS — Move poses/originals/ contents → characters/poses/
# ============================================================
Write-Host "[2/10] Moving poses/originals/ -> characters/poses/..." -ForegroundColor Yellow

$poseSrc = "$base\poses\originals"
if (Test-Path $poseSrc) {
    # Move all contents (files + subdirectories) from poses/originals/ to characters/poses/
    Get-ChildItem -Path $poseSrc -Force | ForEach-Object {
        $dest = "$base\characters\poses\$($_.Name)"
        if (-not (Test-Path $dest)) {
            Move-Item -Path $_.FullName -Destination $dest -Force
            Write-Host "  Moved: $($_.Name)" -ForegroundColor DarkGray
        }
    }
    # Also move the README and size variants (lg, md, sm) into characters/poses/
    Get-ChildItem -Path "$base\poses" -Force | ForEach-Object {
        if ($_.Name -ne "originals") {
            $dest = "$base\characters\poses\$($_.Name)"
            if (-not (Test-Path $dest)) {
                Move-Item -Path $_.FullName -Destination $dest -Force
                Write-Host "  Moved: $($_.Name)" -ForegroundColor DarkGray
            }
        }
    }
}
Write-Host "  Done!" -ForegroundColor Green
Write-Host ""

# ============================================================
# STEP 3: CHARACTERS — Move reference-images/ → characters/reference-images/
# ============================================================
Write-Host "[3/10] Moving reference-images/ -> characters/reference-images/..." -ForegroundColor Yellow

$refSrc = "$base\reference-images"
if (Test-Path $refSrc) {
    Get-ChildItem -Path $refSrc -Force | ForEach-Object {
        $dest = "$base\characters\reference-images\$($_.Name)"
        if (-not (Test-Path $dest)) {
            Move-Item -Path $_.FullName -Destination $dest -Force
            Write-Host "  Moved: $($_.Name)" -ForegroundColor DarkGray
        }
    }
}
Write-Host "  Done!" -ForegroundColor Green
Write-Host ""

# ============================================================
# STEP 4: CHARACTERS — Move models/ → characters/models/
# ============================================================
Write-Host "[4/10] Moving models/ -> characters/models/..." -ForegroundColor Yellow

$modelSrc = "$base\models"
if (Test-Path $modelSrc) {
    Get-ChildItem -Path $modelSrc -Force | ForEach-Object {
        $dest = "$base\characters\models\$($_.Name)"
        if (-not (Test-Path $dest)) {
            Move-Item -Path $_.FullName -Destination $dest -Force
            Write-Host "  Moved: $($_.Name)" -ForegroundColor DarkGray
        }
    }
}
Write-Host "  Done!" -ForegroundColor Green
Write-Host ""

# ============================================================
# STEP 5: CHARACTERS — Move tmp/ training zips → characters/training-data/
#          Move tmp/video-clips/ → videos/clips/
# ============================================================
Write-Host "[5/10] Moving tmp/ contents to proper locations..." -ForegroundColor Yellow

$tmpSrc = "$base\tmp"
if (Test-Path $tmpSrc) {
    # Training zips -> characters/training-data/
    $zips = @("atlas-training-images.zip", "director-training-images.zip")
    foreach ($zip in $zips) {
        $src = "$tmpSrc\$zip"
        if (Test-Path $src) {
            Move-Item -Path $src -Destination "$base\characters\training-data\$zip" -Force
            Write-Host "  Moved: $zip -> characters/training-data/" -ForegroundColor DarkGray
        }
    }
    # Video clips -> videos/clips/
    $clipsSrc = "$tmpSrc\video-clips"
    if (Test-Path $clipsSrc) {
        Get-ChildItem -Path $clipsSrc -Force | ForEach-Object {
            Move-Item -Path $_.FullName -Destination "$base\videos\clips\$($_.Name)" -Force
            Write-Host "  Moved: $($_.Name) -> videos/clips/" -ForegroundColor DarkGray
        }
    }
}
Write-Host "  Done!" -ForegroundColor Green
Write-Host ""

# ============================================================
# STEP 6: CANON — Move character-bible/ contents → canon/character-bible/
#          Move CHARACTER_ROSTER.md to canon/ root
#          Copy 212 .docx from collectiverse data/ip/ → canon/volumes/
# ============================================================
Write-Host "[6/10] Setting up canon/ directory..." -ForegroundColor Yellow

$cbSrc = "$base\character-bible"
if (Test-Path $cbSrc) {
    Get-ChildItem -Path $cbSrc -Force | ForEach-Object {
        if ($_.Name -eq "CHARACTER_ROSTER.md") {
            # Move to canon/ root
            Move-Item -Path $_.FullName -Destination "$base\canon\CHARACTER_ROSTER.md" -Force
            Write-Host "  Moved: CHARACTER_ROSTER.md -> canon/" -ForegroundColor DarkGray
        } else {
            $dest = "$base\canon\character-bible\$($_.Name)"
            if (-not (Test-Path $dest)) {
                Move-Item -Path $_.FullName -Destination $dest -Force
                Write-Host "  Moved: $($_.Name) -> canon/character-bible/" -ForegroundColor DarkGray
            }
        }
    }
}

# Copy .docx volumes from collectiverse data source
Write-Host "  Copying .docx volumes from collectiverse data/ip/..." -ForegroundColor DarkGray
if (Test-Path $dataSource) {
    $docxFiles = Get-ChildItem -Path $dataSource -Filter "*.docx" -File
    $count = 0
    foreach ($file in $docxFiles) {
        $dest = "$base\canon\volumes\$($file.Name)"
        if (-not (Test-Path $dest)) {
            Copy-Item -Path $file.FullName -Destination $dest -Force
            $count++
        }
    }
    Write-Host "  Copied $count .docx files to canon/volumes/" -ForegroundColor DarkGray
} else {
    Write-Host "  WARNING: Source path not found: $dataSource" -ForegroundColor Red
}
Write-Host "  Done!" -ForegroundColor Green
Write-Host ""

# ============================================================
# STEP 7: COMICS — Move generated comic folders → comics/generated/
#          ARCHIVE — Move generated loose images → archive/generated/
# ============================================================
Write-Host "[7/10] Sorting generated/ contents..." -ForegroundColor Yellow

$genSrc = "$base\generated"
if (Test-Path $genSrc) {
    # Comic directories -> comics/generated/
    $comicDirs = @("comic-001", "comic-011-atlas-meets-the-director")
    foreach ($dir in $comicDirs) {
        $src = "$genSrc\$dir"
        if (Test-Path $src) {
            Move-Item -Path $src -Destination "$base\comics\generated\$dir" -Force
            Write-Host "  Moved: $dir -> comics/generated/" -ForegroundColor DarkGray
        }
    }
    # Heroes folder -> marketing (these are marketing hero images)
    $heroesSrc = "$genSrc\heroes"
    if (Test-Path $heroesSrc) {
        Move-Item -Path $heroesSrc -Destination "$base\marketing\heroes" -Force
        Write-Host "  Moved: heroes/ -> marketing/heroes/" -ForegroundColor DarkGray
    }
    # All remaining loose files (atlas-*.png, panel-*.png) -> archive/generated/
    Get-ChildItem -Path $genSrc -File -Force | ForEach-Object {
        Move-Item -Path $_.FullName -Destination "$base\archive\generated\$($_.Name)" -Force
        Write-Host "  Moved: $($_.Name) -> archive/generated/" -ForegroundColor DarkGray
    }
}
Write-Host "  Done!" -ForegroundColor Green
Write-Host ""

# ============================================================
# STEP 8: MARKETING — Move social-media/ → marketing/social-media/
# ============================================================
Write-Host "[8/10] Moving social-media/ -> marketing/social-media/..." -ForegroundColor Yellow

$smSrc = "$base\social-media"
if (Test-Path $smSrc) {
    Get-ChildItem -Path $smSrc -Force | ForEach-Object {
        Move-Item -Path $_.FullName -Destination "$base\marketing\social-media\$($_.Name)" -Force
        Write-Host "  Moved: $($_.Name)" -ForegroundColor DarkGray
    }
}
Write-Host "  Done!" -ForegroundColor Green
Write-Host ""

# ============================================================
# STEP 9: BRAND — Move logos/, color-specifications/, design-system.json, fonts/
# ============================================================
Write-Host "[9/10] Setting up brand/ directory..." -ForegroundColor Yellow

# Move logos/ contents -> brand/logos/
$logosSrc = "$base\logos"
if (Test-Path $logosSrc) {
    Get-ChildItem -Path $logosSrc -Force | ForEach-Object {
        $dest = "$base\brand\logos\$($_.Name)"
        if (-not (Test-Path $dest)) {
            Move-Item -Path $_.FullName -Destination $dest -Force
            Write-Host "  Moved: logos/$($_.Name) -> brand/logos/" -ForegroundColor DarkGray
        }
    }
}

# Move color-specifications/ contents -> brand/colors/
$colorSrc = "$base\color-specifications"
if (Test-Path $colorSrc) {
    Get-ChildItem -Path $colorSrc -Force | ForEach-Object {
        $dest = "$base\brand\colors\$($_.Name)"
        if (-not (Test-Path $dest)) {
            Move-Item -Path $_.FullName -Destination $dest -Force
            Write-Host "  Moved: color-specifications/$($_.Name) -> brand/colors/" -ForegroundColor DarkGray
        }
    }
}

# Move design-system.json -> brand/
$dsSrc = "$base\design-system.json"
if (Test-Path $dsSrc) {
    Move-Item -Path $dsSrc -Destination "$base\brand\design-system.json" -Force
    Write-Host "  Moved: design-system.json -> brand/" -ForegroundColor DarkGray
}

# Move fonts/ -> brand/fonts/
$fontsSrc = "$base\fonts"
if (Test-Path $fontsSrc) {
    Get-ChildItem -Path $fontsSrc -Force | ForEach-Object {
        $dest = "$base\brand\fonts\$($_.Name)"
        if (-not (Test-Path $dest)) {
            Move-Item -Path $_.FullName -Destination $dest -Force
            Write-Host "  Moved: fonts/$($_.Name) -> brand/fonts/" -ForegroundColor DarkGray
        }
    }
}
Write-Host "  Done!" -ForegroundColor Green
Write-Host ""

# ============================================================
# STEP 10: CLEANUP — Move placeholders/misc to archive, remove empties
# ============================================================
Write-Host "[10/10] Cleaning up placeholders and misc..." -ForegroundColor Yellow

# Move templates/ -> archive/templates/
$tmplSrc = "$base\templates"
if (Test-Path $tmplSrc) {
    Get-ChildItem -Path $tmplSrc -Force | ForEach-Object {
        Move-Item -Path $_.FullName -Destination "$base\archive\templates\$($_.Name)" -Force
        Write-Host "  Moved: templates/$($_.Name) -> archive/templates/" -ForegroundColor DarkGray
    }
}

# Move production/ -> archive/ (single file, not in target structure)
$prodSrc = "$base\production"
if (Test-Path $prodSrc) {
    $prodDest = "$base\archive\production"
    New-Item -ItemType Directory -Path $prodDest -Force | Out-Null
    Get-ChildItem -Path $prodSrc -Force | ForEach-Object {
        Move-Item -Path $_.FullName -Destination "$prodDest\$($_.Name)" -Force
        Write-Host "  Moved: production/$($_.Name) -> archive/production/" -ForegroundColor DarkGray
    }
}

# Move trademarks/ -> legal/trademarks/ (consolidate legal)
$tmSrc = "$base\trademarks"
if (Test-Path $tmSrc) {
    $tmDest = "$base\legal\trademarks"
    New-Item -ItemType Directory -Path $tmDest -Force | Out-Null
    Get-ChildItem -Path $tmSrc -Force | ForEach-Object {
        Move-Item -Path $_.FullName -Destination "$tmDest\$($_.Name)" -Force
        Write-Host "  Moved: trademarks/$($_.Name) -> legal/trademarks/" -ForegroundColor DarkGray
    }
}

# Move atlas_character_traits_seed.json -> canon/
$seedFile = "$base\atlas_character_traits_seed.json"
if (Test-Path $seedFile) {
    Move-Item -Path $seedFile -Destination "$base\canon\atlas_character_traits_seed.json" -Force
    Write-Host "  Moved: atlas_character_traits_seed.json -> canon/" -ForegroundColor DarkGray
}

# Move reference-lock/ (empty) and model-sheets/ (empty) to archive
$emptyDirs = @("reference-lock", "model-sheets")
foreach ($dir in $emptyDirs) {
    $src = "$base\$dir"
    if (Test-Path $src) {
        $archDest = "$base\archive\$dir"
        if (-not (Test-Path $archDest)) {
            Move-Item -Path $src -Destination $archDest -Force
            Write-Host "  Moved: $dir/ -> archive/$dir/" -ForegroundColor DarkGray
        }
    }
}

# Remove now-empty source directories (only if empty)
$dirsToRemoveIfEmpty = @(
    "$base\poses\originals",
    "$base\poses",
    "$base\reference-images",
    "$base\models",
    "$base\tmp\video-clips",
    "$base\tmp",
    "$base\character-bible",
    "$base\generated",
    "$base\social-media",
    "$base\logos",
    "$base\color-specifications",
    "$base\fonts",
    "$base\templates",
    "$base\drafts\model-sheets",
    "$base\drafts\reference-images",
    "$base\drafts",
    "$base\animation",
    "$base\expressions",
    "$base\icons",
    "$base\merchandise",
    "$base\props",
    "$base\source-files",
    "$base\production",
    "$base\trademarks"
)

foreach ($dir in $dirsToRemoveIfEmpty) {
    if (Test-Path $dir) {
        $items = Get-ChildItem -Path $dir -Force -Recurse | Where-Object { $_.Name -ne "README.md" }
        if ($items.Count -eq 0) {
            # Move any README to archive before removing
            $readme = "$dir\README.md"
            if (Test-Path $readme) {
                $archReadme = "$base\archive\readmes-from-placeholders"
                New-Item -ItemType Directory -Path $archReadme -Force | Out-Null
                $leafName = Split-Path $dir -Leaf
                Move-Item -Path $readme -Destination "$archReadme\$leafName-README.md" -Force
            }
            Remove-Item -Path $dir -Recurse -Force
            Write-Host "  Removed empty dir: $dir" -ForegroundColor DarkGray
        } else {
            Write-Host "  SKIPPED (not empty): $dir" -ForegroundColor DarkYellow
        }
    }
}

Write-Host "  Done!" -ForegroundColor Green
Write-Host ""

# ============================================================
# SUMMARY
# ============================================================
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  REORGANIZATION COMPLETE!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Key changes:" -ForegroundColor White
Write-Host "  - characters/ now has poses, reference-images, models, training-data" -ForegroundColor White
Write-Host "  - canon/ has character-bible, volumes (212 .docx), CHARACTER_ROSTER.md" -ForegroundColor White
Write-Host "  - comics/generated/ has the comic output folders" -ForegroundColor White
Write-Host "  - videos/clips/ has video clips from tmp/" -ForegroundColor White
Write-Host "  - marketing/social-media/ has the 18 PNGs" -ForegroundColor White
Write-Host "  - brand/ consolidates logos, colors, fonts, design-system.json" -ForegroundColor White
Write-Host "  - archive/ has old generated images, templates, and deprecated content" -ForegroundColor White
Write-Host "  - Empty placeholder directories removed (READMEs preserved in archive)" -ForegroundColor White
Write-Host ""
Write-Host "NOT touched: .git/, assets/ (5.8GB music), node_modules/, scripts/, ai-prompts/," -ForegroundColor Gray
Write-Host "             production-bible/, legal/, licensing/, copyright/, comics/ (existing)," -ForegroundColor Gray
Write-Host "             videos/ (existing), package.json, tsconfig.json, README.md" -ForegroundColor Gray
Write-Host ""
Write-Host "Run 'git status' to review all changes before committing." -ForegroundColor Yellow
