#!/usr/bin/env pwsh
# Try to add fields via different endpoints

$CMS = "https://schoolpress-cms.creoleaptech.workers.dev"
$EMAIL = "tech@creoleap.com"
$PASSWORD = "Creoleap@6789"
$SCHOOL = "st-pius"

Write-Host "=== Logging in to CMS ===" -ForegroundColor Cyan
$loginResp = Invoke-RestMethod -Uri "$CMS/api/auth/login" -Method POST -ContentType "application/json" `
  -Body (@{ email = $EMAIL; password = $PASSWORD } | ConvertTo-Json) `
  -SessionVariable session

Write-Host "Login: $($loginResp | ConvertTo-Json -Compress)" -ForegroundColor Green

# Try to get schema
Write-Host "`n=== Trying to get schema ===" -ForegroundColor Cyan
$endpoints = @(
    "/api/schema",
    "/api/content/schema",
    "/api/pages/about/schema",
    "/api/fields",
    "/api/content/fields/schema"
)

foreach ($endpoint in $endpoints) {
    try {
        $resp = Invoke-RestMethod -Uri "$CMS$endpoint" -Method GET -ContentType "application/json" -WebSession $session
        Write-Host "SUCCESS ${endpoint}: $($resp | ConvertTo-Json -Depth 5)" -ForegroundColor Green
    } catch {
        Write-Host "FAILED ${endpoint}: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

# Try to POST to discover with different format
Write-Host "`n=== Trying discover with different format ===" -ForegroundColor Cyan
$discoverBody2 = @{
    school = $SCHOOL
    page = "about"
    fields = @(
        @{ key = "about:house_title"; type = "text"; label = "House System Title" }
    )
    defaults = @{
        "about:house_title" = "House System"
    }
    collections = @()
} | ConvertTo-Json -Depth 10

try {
    $resp = Invoke-RestMethod -Uri "$CMS/api/discover?school=$SCHOOL" -Method POST -ContentType "application/json" `
      -Headers @{ "X-Schoolpress-Key" = "spk_a6888cdabcab2b5ec887128641010023e321bb0a81c1e466" } `
      -Body $discoverBody2 -WebSession $session
    Write-Host "Discover2 response: $($resp | ConvertTo-Json -Compress)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Try to set values again
Write-Host "`n=== Setting values again ===" -ForegroundColor Cyan
$valuesBody = @{
    page = "about"
    fields = @(
        @{ key = "about:house_title"; value = "House System" }
    )
} | ConvertTo-Json -Depth 5

try {
    $resp = Invoke-RestMethod -Uri "$CMS/api/content/fields" -Method PUT -ContentType "application/json" `
      -Body $valuesBody -WebSession $session
    Write-Host "Values response: $($resp | ConvertTo-Json -Compress)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
