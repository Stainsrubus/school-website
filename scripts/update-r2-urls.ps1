$ErrorActionPreference = "Continue"
$baseLocal = "C:\Users\chris\Desktop\school-website"

# Read mapping
$mapping = Get-Content "$baseLocal\r2-mapping.json" | ConvertFrom-Json

# Files to update
$files = @(
    "$baseLocal\components\sections\features-section.tsx",
    "$baseLocal\components\sections\footer.tsx",
    "$baseLocal\components\sections\navigation.tsx",
    "$baseLocal\components\sections\gallery-section.tsx",
    "$baseLocal\components\about\aboutPage.tsx",
    "$baseLocal\components\sections\academics-page.tsx",
    "$baseLocal\components\sections\facilities-page.tsx",
    "$baseLocal\src\routes\gallery.tsx",
    "$baseLocal\components\sections\hero-section.tsx"
)

$totalReplacements = 0

foreach ($file in $files) {
    if (-not (Test-Path $file)) {
        Write-Host "SKIP: $file not found" -ForegroundColor Yellow
        continue
    }
    
    $content = Get-Content $file -Raw -Encoding UTF8
    $fileReplacements = 0
    
    foreach ($entry in $mapping) {
        $oldPath = $entry.local
        $newUrl = $entry.r2
        
        # Handle case-insensitive matching (JPG vs jpg)
        if ($content -match [regex]::Escape($oldPath)) {
            $content = $content -replace [regex]::Escape($oldPath), $newUrl
            $fileReplacements++
        }
    }
    
    if ($fileReplacements -gt 0) {
        Set-Content -Path $file -Value $content -Encoding UTF8 -NoNewline
        $totalReplacements += $fileReplacements
        Write-Host "UPDATED: $file ($fileReplacements replacements)" -ForegroundColor Green
    } else {
        Write-Host "NO CHANGES: $file" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "=== COMPLETE ==="
Write-Host "Total replacements: $totalReplacements"
