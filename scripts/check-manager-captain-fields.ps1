#!/usr/bin/env pwsh
# Check CMS schema for manager and house captain fields

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

# Check about page schema for relevant fields
Write-Host "`n=== Checking about page schema ===" -ForegroundColor Cyan
$aboutSchema = $content.schema.about

$relevantFields = @(
    "*manager*",
    "*principal*",
    "*house*",
    "*captain*",
    "*incharge*"
)

Write-Host "Fields matching manager/principal/house/captain/incharge:" -ForegroundColor Yellow
foreach ($field in $aboutSchema.PSObject.Properties) {
    $fieldName = $field.Name
    foreach ($pattern in $relevantFields) {
        if ($fieldName -like $pattern) {
            Write-Host "  - $fieldName (type: $($field.Value.type), label: $($field.Value.label))" -ForegroundColor Green
        }
    }
}

# Check values
Write-Host "`n=== Checking about page values ===" -ForegroundColor Cyan
$aboutValues = $content.values.about

Write-Host "Values for manager/principal/house/captain/incharge:" -ForegroundColor Yellow
foreach ($field in $aboutValues.PSObject.Properties) {
    $fieldName = $field.Name
    foreach ($pattern in $relevantFields) {
        if ($fieldName -like $pattern) {
            Write-Host "  - $fieldName = $($field.Value)" -ForegroundColor Green
        }
    }
}

# Check if house captain fields exist
Write-Host "`n=== Checking for house captain fields ===" -ForegroundColor Cyan
$captainFields = @(
    "about:house_captain*",
    "about:captain*",
    "about:house_0:captain*",
    "about:house_1:captain*",
    "about:house_2:captain*",
    "about:house_3:captain*"
)

$foundCaptain = $false
foreach ($field in $aboutSchema.PSObject.Properties) {
    $fieldName = $field.Name
    foreach ($pattern in $captainFields) {
        if ($fieldName -like $pattern) {
            Write-Host "  FOUND: $fieldName" -ForegroundColor Green
            $foundCaptain = $true
        }
    }
}

if (-not $foundCaptain) {
    Write-Host "  No house captain fields found in schema" -ForegroundColor Red
}

# Check if manager message fields exist
Write-Host "`n=== Checking for manager message fields ===" -ForegroundColor Cyan
$managerFields = @(
    "about:manager*",
    "about:principal*message*",
    "about:principal*photo*"
)

$foundManager = $false
foreach ($field in $aboutSchema.PSObject.Properties) {
    $fieldName = $field.Name
    foreach ($pattern in $managerFields) {
        if ($fieldName -like $pattern) {
            Write-Host "  FOUND: $fieldName" -ForegroundColor Green
            $foundManager = $true
        }
    }
}

if (-not $foundManager) {
    Write-Host "  No manager fields found in schema" -ForegroundColor Red
}

Write-Host "`n=== Summary ===" -ForegroundColor Cyan
Write-Host "Total about page fields: $($aboutSchema.PSObject.Properties.Count)" -ForegroundColor Yellow
Write-Host "Total about page values: $($aboutValues.PSObject.Properties.Count)" -ForegroundColor Yellow
