$ErrorActionPreference = "Continue"
$bucket = "schoolpress-assets"
$baseLocal = "C:\Users\chris\Desktop\school-website"

# Collect all files from the mapping
$mapping = Get-Content "$baseLocal\r2-mapping.json" | ConvertFrom-Json

$total = $mapping.Count
$i = 0
$uploaded = 0
$failed = 0

foreach ($entry in $mapping) {
    $i++
    $pct = [math]::Round(($i / $total) * 100)
    
    # Determine local path from the mapping's local field
    $localRelative = $entry.local.TrimStart('/')
    $localPath = "$baseLocal\public\$($localRelative -replace '/', '\')"
    
    # Determine R2 key from the mapping's r2 URL (strip the origin prefix)
    $r2Url = $entry.r2
    $r2Key = $r2Url -replace '^https://schoolpress-cms\.creoleaptech\.workers\.dev/api/assets/', ''
    
    if (-not (Test-Path $localPath)) {
        Write-Host "[$i/$total] ($pct%) SKIP (not found): $localRelative" -ForegroundColor Yellow
        continue
    }
    
    Write-Host "[$i/$total] ($pct%) Uploading: $r2Key"
    
    $result = & npx wrangler r2 object put "$bucket/$r2Key" --file "$localPath" --content-type "auto" --remote 2>&1
    if ($LASTEXITCODE -eq 0) {
        $uploaded++
    } else {
        $failed++
        Write-Host "  FAILED" -ForegroundColor Red
    }
}

# Also upload hero-video.mp4 and icon.svg
$extra = @(
    @{ local = "$baseLocal\public\hero-video.mp4"; key = "st-pius/hero-video.mp4"; mime = "video/mp4" },
    @{ local = "$baseLocal\public\icon.svg"; key = "st-pius/icon.svg"; mime = "image/svg+xml" }
)

foreach ($item in $extra) {
    if (Test-Path $item.local) {
        Write-Host "Uploading extra: $($item.key)"
        $result = & npx wrangler r2 object put "$bucket/$($item.key)" --file "$($item.local)" --content-type "$($item.mime)" --remote 2>&1
        if ($LASTEXITCODE -eq 0) { $uploaded++ } else { $failed++; Write-Host "  FAILED" -ForegroundColor Red }
    }
}

Write-Host ""
Write-Host "=== COMPLETE ==="
Write-Host "Uploaded: $uploaded / $($total + $extra.Count)"
Write-Host "Failed: $failed"
