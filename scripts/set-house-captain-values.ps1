#!/usr/bin/env pwsh
# Set house captain values in CMS

$CMS = "https://schoolpress-cms.creoleaptech.workers.dev"
$EMAIL = "tech@creoleap.com"
$PASSWORD = "Creoleap@6789"

Write-Host "=== Logging in to CMS ===" -ForegroundColor Cyan
$loginResp = Invoke-RestMethod -Uri "$CMS/api/auth/login" -Method POST -ContentType "application/json" `
  -Body (@{ email = $EMAIL; password = $PASSWORD } | ConvertTo-Json) `
  -SessionVariable session

Write-Host "Login: $($loginResp | ConvertTo-Json -Compress)" -ForegroundColor Green

# Set house captain values
Write-Host "`n=== Setting house captain values ===" -ForegroundColor Cyan

$valuesBody = @{
    page = "about"
    fields = @(
        @{ key = "about:house_0:captain"; value = "Tagore House Captain" },
        @{ key = "about:house_1:captain"; value = "Nehru House Captain" },
        @{ key = "about:house_2:captain"; value = "Gandhi House Captain" },
        @{ key = "about:house_3:captain"; value = "Tilak House Captain" }
    )
} | ConvertTo-Json -Depth 5

try {
    $resp = Invoke-RestMethod -Uri "$CMS/api/content/fields" -Method PUT -ContentType "application/json" `
      -Body $valuesBody -WebSession $session
    Write-Host "Values response: $($resp | ConvertTo-Json -Compress)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== Done ===" -ForegroundColor Cyan
