#!/usr/bin/env pwsh
# Add house captain fields to CMS

$CMS = "https://schoolpress-cms.creoleaptech.workers.dev"
$EMAIL = "tech@creoleap.com"
$PASSWORD = "Creoleap@6789"
$SCHOOL = "st-pius"

Write-Host "=== Logging in to CMS ===" -ForegroundColor Cyan
$loginResp = Invoke-RestMethod -Uri "$CMS/api/auth/login" -Method POST -ContentType "application/json" `
  -Body (@{ email = $EMAIL; password = $PASSWORD } | ConvertTo-Json) `
  -SessionVariable session

Write-Host "Login: $($loginResp | ConvertTo-Json -Compress)" -ForegroundColor Green

# Register house captain fields via discover
Write-Host "`n=== Registering house captain fields ===" -ForegroundColor Cyan

$discoverBody = @{
    school = $SCHOOL
    page = "about"
    fields = @(
        @{ key = "about:house_0:captain"; type = "text"; label = "Tagore House Captain" },
        @{ key = "about:house_1:captain"; type = "text"; label = "Nehru House Captain" },
        @{ key = "about:house_2:captain"; type = "text"; label = "Gandhi House Captain" },
        @{ key = "about:house_3:captain"; type = "text"; label = "Tilak House Captain" }
    )
    defaults = @{
        "about:house_0:captain" = "Tagore House Captain"
        "about:house_1:captain" = "Nehru House Captain"
        "about:house_2:captain" = "Gandhi House Captain"
        "about:house_3:captain" = "Tilak House Captain"
    }
    collections = @()
} | ConvertTo-Json -Depth 10

try {
    $resp = Invoke-RestMethod -Uri "$CMS/api/discover?school=$SCHOOL" -Method POST -ContentType "application/json" `
      -Headers @{ "X-Schoolpress-Key" = "spk_a6888cdabcab2b5ec887128641010023e321bb0a81c1e466" } `
      -Body $discoverBody -WebSession $session
    Write-Host "Discover response: $($resp | ConvertTo-Json -Compress)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== Done ===" -ForegroundColor Cyan
