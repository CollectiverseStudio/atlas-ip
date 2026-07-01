<#
.SYNOPSIS
  Quarantines non-canonical Atlas PNG assets from reference-images and model-sheets.

.DESCRIPTION
  This script is intentionally conservative. It does not permanently delete files.
  It moves anything not explicitly allowlisted into archive/quarantine/<timestamp>/
  and writes a manifest of what was moved.

  Use this when AI-generated reference/model-sheet images drift from the canonical Atlas design.

.USAGE
  From the atlas-ip repository root:

    pwsh ./scripts/quarantine-noncanonical-atlas-assets.ps1

  Dry run:

    pwsh ./scripts/quarantine-noncanonical-atlas-assets.ps1 -DryRun

.NOTES
  After reviewing the quarantine folder, delete it manually if the files are confirmed wrong.
#>

param(
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

$repoRoot = (Get-Location).Path
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$quarantineRoot = Join-Path $repoRoot "archive/quarantine/$timestamp"
$manifestPath = Join-Path $quarantineRoot "quarantine-manifest.json"

# Keep only the original approved A001 baseline reference assets here.
# Everything else in reference-images or model-sheets should be treated as draft/generated
# unless it is deliberately added to this allowlist after QA.
$approvedReferenceImages = @(
  "reference-images/atlas-front.png",
  "reference-images/atlas-back.png",
  "reference-images/atlas-left-side.png",
  "reference-images/atlas-right-side.png",
  "reference-images/atlas-three-quarter-front-left.png",
  "reference-images/atlas-three-quarter-front-right.png",
  "reference-images/atlas-turnaround-360.png",
  "reference-images/atlas-expression-sheet.png",
  "reference-images/atlas-pose-sheet.png",
  "reference-images/atlas-props-sheet.png",
  "reference-images/character_lock.png"
)

# Model sheet PNGs created during the unstable generation phase are not allowed by default.
# Markdown documentation is not touched.
$approvedModelSheets = @()

$approved = @{}
foreach ($path in $approvedReferenceImages + $approvedModelSheets) {
  $approved[$path.Replace('\\','/')] = $true
}

$scanDirs = @("reference-images", "model-sheets")
$moved = @()

foreach ($dir in $scanDirs) {
  $fullDir = Join-Path $repoRoot $dir
  if (-not (Test-Path $fullDir)) { continue }

  Get-ChildItem -Path $fullDir -File -Recurse | Where-Object {
    $_.Extension.ToLowerInvariant() -in @(".png", ".jpg", ".jpeg", ".webp")
  } | ForEach-Object {
    $relative = Resolve-Path -Path $_.FullName -Relative
    $relative = $relative.TrimStart('.','\\','/').Replace('\\','/')

    if ($approved.ContainsKey($relative)) {
      return
    }

    $destination = Join-Path $quarantineRoot $relative
    $destinationDir = Split-Path $destination -Parent

    $entry = [ordered]@{
      source = $relative
      destination = $destination.Replace($repoRoot, '').TrimStart('\\','/').Replace('\\','/')
      reason = "Not in canonical allowlist; likely AI-generated drift or unstable model sheet."
    }
    $moved += $entry

    if ($DryRun) {
      Write-Host "DRY RUN: would quarantine $relative"
    } else {
      New-Item -ItemType Directory -Force -Path $destinationDir | Out-Null
      Move-Item -Path $_.FullName -Destination $destination -Force
      Write-Host "Quarantined $relative"
    }
  }
}

if (-not $DryRun) {
  New-Item -ItemType Directory -Force -Path $quarantineRoot | Out-Null
  $manifest = [ordered]@{
    createdAt = (Get-Date).ToString("o")
    policy = "Move non-allowlisted reference/model-sheet media into quarantine. Do not permanently delete until reviewed."
    approvedReferenceImages = $approvedReferenceImages
    approvedModelSheets = $approvedModelSheets
    moved = $moved
  }
  $manifest | ConvertTo-Json -Depth 10 | Set-Content -Path $manifestPath -Encoding UTF8
  Write-Host "Wrote manifest: $manifestPath"
}

Write-Host "Complete. Items flagged: $($moved.Count)"
