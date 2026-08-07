$ErrorActionPreference = "Continue"
$bucket = "schoolpress-assets"
$baseLocal = "C:\Users\chris\Desktop\school-website\public"

# Collect all files
$files = @()
Get-ChildItem -Path "$baseLocal\st_pius" -Recurse -File | ForEach-Object {
    $relative = $_.FullName.Replace("$baseLocal\", "").Replace("\", "/")
    $r2Key = "st-pius/$($_.Name)"
    $files += @{ LocalPath = $_.FullName; R2Key = $r2Key; Size = $_.Length }
}
Get-ChildItem -Path "$baseLocal\images" -Recurse -File | ForEach-Object {
    $relative = $_.FullName.Replace("$baseLocal\", "").Replace("\", "/")
    $r2Key = "school-website/$relative"
    $files += @{ LocalPath = $_.FullName; R2Key = $r2Key; Size = $_.Length }
}

$mapping = @()
$total = $files.Count
$i = 0
$uploaded = 0
$failed = 0

foreach ($file in $files) {
    $i++
    $pct = [math]::Round(($i / $total) * 100)
    Write-Host "[$i/$total] ($pct%) Uploading: $($file.R2Key) ($([math]::Round($file.Size/1KB))KB)"
    
    $result = & npx wrangler r2 object put "$bucket/$($file.R2Key)" --file "$($file.LocalPath)" --content-type "auto" 2>&1
    if ($LASTEXITCODE -eq 0) {
        $uploaded++
        $mapping += @{ local = "/$($file.R2Key.Replace('st-pius/','st_pius/').Replace('school-website/',''))"; r2 = "https://schoolpress-cms.creoleaptech.workers.dev/api/assets/$($file.R2Key)" }
    } else {
        $failed++
        Write-Host "  FAILED: $result" -ForegroundColor Red
    }
}

# Save mapping
$mappingJson = $mapping | ConvertTo-Json -Depth 3
$mappingJson | Out-File -FilePath "C:\Users\chris\Desktop\school-website\r2-mapping.json" -Encoding utf8

Write-Host ""
Write-Host "=== COMPLETE ==="
Write-Host "Uploaded: $uploaded / $total"
Write-Host "Failed: $failed"
Write-Host "Mapping saved to: r2-mapping.json"
