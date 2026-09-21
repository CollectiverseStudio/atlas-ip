# Decode base64-encoded PNG files back to proper binary
# Run this script from PowerShell after the copy operation
# Usage: powershell -ExecutionPolicy Bypass -File decode_pngs.ps1

$basePath = "C:\Users\bellgj\Documents\Personal\collectiverse\atlas-ip\poses\originals"
$folders = @("thesmuggler", "thevault", "thewhisper")
$totalDecoded = 0

foreach ($folder in $folders) {
    $folderPath = Join-Path $basePath $folder
    $pngFiles = Get-ChildItem -Path $folderPath -Filter "*.png"
    $count = 0
    
    foreach ($file in $pngFiles) {
        $base64Content = Get-Content -Path $file.FullName -Raw
        $bytes = [Convert]::FromBase64String($base64Content)
        [System.IO.File]::WriteAllBytes($file.FullName, $bytes)
        $count++
    }
    
    Write-Host "Decoded $count PNGs in $folder/"
    $totalDecoded += $count
}

# Clean up test file if it exists
$testFile = Join-Path $basePath "thesmuggler\test_binary.bin"
if (Test-Path $testFile) {
    Remove-Item $testFile
    Write-Host "Removed test_binary.bin"
}

Write-Host "`nTotal: $totalDecoded PNG files decoded successfully!"
Write-Host "Done!"
