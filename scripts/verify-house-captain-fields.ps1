#!/usr/bin/env pwsh
# Verify house captain fields are registered

$CMS = "https://schoolpress-cms.creoleaptech.workers.dev"
$EMAIL = "tech@creoleap.com"
$PASSWORD = "Creoleap@6789"
$SCHOOL = "st-pius"

Write-Host "=== Logging in to CMS ===" -ForegroundColor Cyan
$loginResp = Invoke-RestMethod -Uri "$CMS/api/auth/login" -Method POST -ContentType "application/json" `
  -Body (@{ email = $EMAIL; password = $PASSWORD } | ConvertTo-Json) `
  -SessionVariable session

Write-Host "Login: $($loginResp | ConvertTo-Json -Compress)" -ForegroundColor Green

# Get all content for the school
Write-Host "`n=== Getting CMS content ===" -ForegroundColor Cyan
$content = Invoke-RestMethod -Uri "$CMS/api/content?school=$SCHOOL" -Method GET -ContentType "application/json" `
  -Headers @{ "X-Schoolpress-Key" = "spk_a6888cdabcab2b5ec887128641010023e321bb0a81c1e466" } `
  -WebSession $session

# Check about page schema for captain fields
Write-Host "`n=== Checking for house captain fields ===" -ForegroundColor Cyan
$aboutSchema = $content.schema.about

$captainFields = @(
    "about:house_0:captain",
    "about:house_1:captain",
    "about:house_2:captain",
    "about:house_3:captain"
)

foreach ($field in $captainFields) {
    if ($aboutSchema.PSObject.Properties[$field]) {
        Write-Host "  FOUND: $field (type: $($aboutSchema.$field.type), label: $($aboutSchema.$field.label))" -ForegroundColor Green
    } else {
        Write-Host "  NOT FOUND: $field" -ForegroundColor Red
    }
}

# Check values
Write-Host "`n=== Checking house captain values ===" -ForegroundColor Cyan
$aboutValues = $content.values.about

foreach ($field in $captainFields) {
    if ($aboutValues.PSObject.Properties[$field]) {
        Write-Host "  $field = $($aboutValues.$field)" -ForegroundColor Green
    } else {
        Write-Host "  NO VALUE: $field" -ForegroundColor Red
    }
}
