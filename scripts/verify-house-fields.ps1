#!/usr/bin/env pwsh
# Verify house system fields are registered and set values

$CMS = "https://schoolpress-cms.creoleaptech.workers.dev"
$EMAIL = "tech@creoleap.com"
$PASSWORD = "Creoleap@6789"
$SCHOOL = "st-pius"

Write-Host "=== Logging in to CMS ===" -ForegroundColor Cyan
$loginResp = Invoke-RestMethod -Uri "$CMS/api/auth/login" -Method POST -ContentType "application/json" `
  -Body (@{ email = $EMAIL; password = $PASSWORD } | ConvertTo-Json) `
  -SessionVariable session

Write-Host "Login: $($loginResp | ConvertTo-Json -Compress)" -ForegroundColor Green

# Get all content to see if house fields exist
Write-Host "`n=== Getting all content ===" -ForegroundColor Cyan
try {
    $content = Invoke-RestMethod -Uri "$CMS/api/content" -Method GET -ContentType "application/json" -WebSession $session
    Write-Host "Content: $($content | ConvertTo-Json -Depth 10)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Try to get about page fields
Write-Host "`n=== Getting about page fields ===" -ForegroundColor Cyan
try {
    $aboutFields = Invoke-RestMethod -Uri "$CMS/api/content/about/fields" -Method GET -ContentType "application/json" -WebSession $session
    Write-Host "About fields: $($aboutFields | ConvertTo-Json -Depth 10)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Try different endpoint to get about page values
Write-Host "`n=== Getting about page values ===" -ForegroundColor Cyan
try {
    $aboutValues = Invoke-RestMethod -Uri "$CMS/api/content/about/values" -Method GET -ContentType "application/json" -WebSession $session
    Write-Host "About values: $($aboutValues | ConvertTo-Json -Depth 10)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
