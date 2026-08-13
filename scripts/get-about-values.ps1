#!/usr/bin/env pwsh
# Get current about page values and try to update them

$CMS = "https://schoolpress-cms.creoleaptech.workers.dev"
$EMAIL = "tech@creoleap.com"
$PASSWORD = "Creoleap@6789"

Write-Host "=== Logging in to CMS ===" -ForegroundColor Cyan
$loginResp = Invoke-RestMethod -Uri "$CMS/api/auth/login" -Method POST -ContentType "application/json" `
  -Body (@{ email = $EMAIL; password = $PASSWORD } | ConvertTo-Json) `
  -SessionVariable session

Write-Host "Login: $($loginResp | ConvertTo-Json -Compress)" -ForegroundColor Green

# Try to get about page content via different endpoints
Write-Host "`n=== Getting about page content ===" -ForegroundColor Cyan

$endpoints = @(
    "/api/content/about",
    "/api/content/about/fields",
    "/api/content/about/values",
    "/api/pages/about",
    "/api/pages/about/fields"
)

foreach ($endpoint in $endpoints) {
    try {
        $resp = Invoke-RestMethod -Uri "$CMS$endpoint" -Method GET -ContentType "application/json" -WebSession $session
        Write-Host "SUCCESS ${endpoint}: $($resp | ConvertTo-Json -Depth 10)" -ForegroundColor Green
    } catch {
        Write-Host "FAILED ${endpoint}: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

# Try to update an existing field to see if the endpoint works
Write-Host "`n=== Trying to update existing field ===" -ForegroundColor Cyan
$existingFieldBody = @{
    page = "about"
    fields = @(
        @{ key = "about:welcome_title"; value = "St. Pius X High School - Test" }
    )
} | ConvertTo-Json -Depth 5

try {
    $resp = Invoke-RestMethod -Uri "$CMS/api/content/fields" -Method PUT -ContentType "application/json" `
      -Body $existingFieldBody -WebSession $session
    Write-Host "Update existing field response: $($resp | ConvertTo-Json -Compress)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
