#!/usr/bin/env pwsh
# Explore CMS API to find how to add new fields

$CMS = "https://schoolpress-cms.creoleaptech.workers.dev"
$EMAIL = "tech@creoleap.com"
$PASSWORD = "Creoleap@6789"

Write-Host "=== Logging in to CMS ===" -ForegroundColor Cyan
$loginResp = Invoke-RestMethod -Uri "$CMS/api/auth/login" -Method POST -ContentType "application/json" `
  -Body (@{ email = $EMAIL; password = $PASSWORD } | ConvertTo-Json) `
  -SessionVariable session

Write-Host "Login: $($loginResp | ConvertTo-Json -Compress)" -ForegroundColor Green

# Try to get existing fields for about page
Write-Host "`n=== Trying different API endpoints ===" -ForegroundColor Cyan

$endpoints = @(
    "/api/content",
    "/api/content/fields",
    "/api/content/schema",
    "/api/pages",
    "/api/fields",
    "/api/schema"
)

foreach ($endpoint in $endpoints) {
    try {
        $resp = Invoke-RestMethod -Uri "$CMS$endpoint" -Method GET -ContentType "application/json" -WebSession $session
        Write-Host "SUCCESS ${endpoint}: $($resp | ConvertTo-Json -Depth 5)" -ForegroundColor Green
    } catch {
        Write-Host "FAILED ${endpoint}: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

# Try PUT to register new fields
Write-Host "`n=== Trying to register new fields ===" -ForegroundColor Cyan
try {
    $body = @{
        page = "about"
        fields = @(
            @{ key = "about:house_title"; value = "House System" }
        )
    } | ConvertTo-Json -Depth 5
    
    $resp = Invoke-RestMethod -Uri "$CMS/api/content/fields" -Method PUT -ContentType "application/json" `
      -Body $body -WebSession $session
    Write-Host "Register fields: $($resp | ConvertTo-Json -Compress)" -ForegroundColor Green
} catch {
    Write-Host "Error registering fields: $($_.Exception.Message)" -ForegroundColor Red
}
