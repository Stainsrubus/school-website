#!/usr/bin/env pwsh
# Check what fields are currently registered for about page

$CMS = "https://schoolpress-cms.creoleaptech.workers.dev"
$EMAIL = "tech@creoleap.com"
$PASSWORD = "Creoleap@6789"
$SCHOOL = "st-pius"
$KEY = "spk_a6888cdabcab2b5ec887128641010023e321bb0a81c1e466"

Write-Host "=== Logging in to CMS ===" -ForegroundColor Cyan
$loginResp = Invoke-RestMethod -Uri "$CMS/api/auth/login" -Method POST -ContentType "application/json" `
  -Body (@{ email = $EMAIL; password = $PASSWORD } | ConvertTo-Json) `
  -SessionVariable session

Write-Host "Login: $($loginResp | ConvertTo-Json -Compress)" -ForegroundColor Green

# Try to get the bridge data for the about page
Write-Host "`n=== Getting bridge data for about page ===" -ForegroundColor Cyan
try {
    $resp = Invoke-RestMethod -Uri "$CMS/api/bridge?school=$SCHOOL&page=about" -Method GET -ContentType "application/json" `
      -Headers @{ "X-Schoolpress-Key" = $KEY } `
      -WebSession $session
    Write-Host "Bridge data: $($resp | ConvertTo-Json -Depth 10)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Try to get the bridge data without specifying page
Write-Host "`n=== Getting bridge data (all pages) ===" -ForegroundColor Cyan
try {
    $resp = Invoke-RestMethod -Uri "$CMS/api/bridge?school=$SCHOOL" -Method GET -ContentType "application/json" `
      -Headers @{ "X-Schoolpress-Key" = $KEY } `
      -WebSession $session
    Write-Host "Bridge data (all): $($resp | ConvertTo-Json -Depth 10)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Try to get content for the school
Write-Host "`n=== Getting content for school ===" -ForegroundColor Cyan
try {
    $resp = Invoke-RestMethod -Uri "$CMS/api/content?school=$SCHOOL" -Method GET -ContentType "application/json" `
      -Headers @{ "X-Schoolpress-Key" = $KEY } `
      -WebSession $session
    Write-Host "Content: $($resp | ConvertTo-Json -Depth 10)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
