#!/usr/bin/env pwsh
# Try different API formats to set house system values

$CMS = "https://schoolpress-cms.creoleaptech.workers.dev"
$EMAIL = "tech@creoleap.com"
$PASSWORD = "Creoleap@6789"

Write-Host "=== Logging in to CMS ===" -ForegroundColor Cyan
$loginResp = Invoke-RestMethod -Uri "$CMS/api/auth/login" -Method POST -ContentType "application/json" `
  -Body (@{ email = $EMAIL; password = $PASSWORD } | ConvertTo-Json) `
  -SessionVariable session

Write-Host "Login: $($loginResp | ConvertTo-Json -Compress)" -ForegroundColor Green

# Try format 1: values as object
Write-Host "`n=== Try format 1: values as object ===" -ForegroundColor Cyan
$body1 = @{
    page = "about"
    values = @{
        "about:house_title" = "House System"
        "about:house_subtitle" = "Fostering teamwork, leadership, and healthy competition"
        "about:house_incharge_name" = "Mrs. Cheryl Dsouza"
        "about:house_incharge_position" = "Mistress of Houses"
    }
} | ConvertTo-Json -Depth 5

try {
    $resp = Invoke-RestMethod -Uri "$CMS/api/content/fields" -Method PUT -ContentType "application/json" `
      -Body $body1 -WebSession $session
    Write-Host "Response: $($resp | ConvertTo-Json -Compress)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Try format 2: direct values
Write-Host "`n=== Try format 2: direct values ===" -ForegroundColor Cyan
$body2 = @{
    "about:house_title" = "House System"
    "about:house_subtitle" = "Fostering teamwork, leadership, and healthy competition"
    "about:house_incharge_name" = "Mrs. Cheryl Dsouza"
    "about:house_incharge_position" = "Mistress of Houses"
} | ConvertTo-Json -Depth 5

try {
    $resp = Invoke-RestMethod -Uri "$CMS/api/content/about" -Method PUT -ContentType "application/json" `
      -Body $body2 -WebSession $session
    Write-Host "Response: $($resp | ConvertTo-Json -Compress)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Try format 3: PATCH method
Write-Host "`n=== Try format 3: PATCH method ===" -ForegroundColor Cyan
$body3 = @{
    "about:house_title" = "House System"
    "about:house_subtitle" = "Fostering teamwork, leadership, and healthy competition"
} | ConvertTo-Json -Depth 5

try {
    $resp = Invoke-RestMethod -Uri "$CMS/api/content/fields" -Method PATCH -ContentType "application/json" `
      -Body $body3 -WebSession $session
    Write-Host "Response: $($resp | ConvertTo-Json -Compress)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
