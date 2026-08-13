#!/usr/bin/env pwsh
# Test CMS API endpoints

$CMS = "https://schoolpress-cms.creoleaptech.workers.dev"
$EMAIL = "tech@creoleap.com"
$PASSWORD = "Creoleap@6789"

Write-Host "=== Logging in to CMS ===" -ForegroundColor Cyan
$loginResp = Invoke-RestMethod -Uri "$CMS/api/auth/login" -Method POST -ContentType "application/json" `
  -Body (@{ email = $EMAIL; password = $PASSWORD } | ConvertTo-Json) `
  -SessionVariable session

Write-Host "Login: $($loginResp | ConvertTo-Json -Compress)" -ForegroundColor Green

# Try to get the about page content
Write-Host "`n=== Getting about page content ===" -ForegroundColor Cyan
try {
    $aboutContent = Invoke-RestMethod -Uri "$CMS/api/content/about" -Method GET -ContentType "application/json" -WebSession $session
    Write-Host "About content: $($aboutContent | ConvertTo-Json -Depth 10)" -ForegroundColor Green
} catch {
    Write-Host "Error getting about content: $($_.Exception.Message)" -ForegroundColor Red
}

# Try to get all pages
Write-Host "`n=== Getting all pages ===" -ForegroundColor Cyan
try {
    $pages = Invoke-RestMethod -Uri "$CMS/api/content/pages" -Method GET -ContentType "application/json" -WebSession $session
    Write-Host "Pages: $($pages | ConvertTo-Json -Depth 10)" -ForegroundColor Green
} catch {
    Write-Host "Error getting pages: $($_.Exception.Message)" -ForegroundColor Red
}
