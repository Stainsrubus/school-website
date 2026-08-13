#!/usr/bin/env pwsh
# Register fields via discover and then set values

$CMS = "https://schoolpress-cms.creoleaptech.workers.dev"
$EMAIL = "tech@creoleap.com"
$PASSWORD = "Creoleap@6789"
$SCHOOL = "st-pius"

Write-Host "=== Logging in to CMS ===" -ForegroundColor Cyan
$loginResp = Invoke-RestMethod -Uri "$CMS/api/auth/login" -Method POST -ContentType "application/json" `
  -Body (@{ email = $EMAIL; password = $PASSWORD } | ConvertTo-Json) `
  -SessionVariable session

Write-Host "Login: $($loginResp | ConvertTo-Json -Compress)" -ForegroundColor Green

# Register all house system fields via discover
Write-Host "`n=== Registering house system fields via discover ===" -ForegroundColor Cyan

$discoverBody = @{
    school = $SCHOOL
    page = "about"
    fields = @(
        @{ key = "about:house_title"; type = "text"; label = "House System Title" },
        @{ key = "about:house_subtitle"; type = "text"; label = "House System Subtitle" },
        @{ key = "about:house_incharge_name"; type = "text"; label = "House Incharge Name" },
        @{ key = "about:house_incharge_position"; type = "text"; label = "House Incharge Position" },
        @{ key = "about:house_incharge_description"; type = "text"; label = "House Incharge Description" },
        @{ key = "about:house_0:name"; type = "text"; label = "Tagore House Name" },
        @{ key = "about:house_0:color"; type = "text"; label = "Tagore House Color" },
        @{ key = "about:house_0:incharge"; type = "text"; label = "Tagore House Incharge" },
        @{ key = "about:house_1:name"; type = "text"; label = "Nehru House Name" },
        @{ key = "about:house_1:color"; type = "text"; label = "Nehru House Color" },
        @{ key = "about:house_1:incharge"; type = "text"; label = "Nehru House Incharge" },
        @{ key = "about:house_2:name"; type = "text"; label = "Gandhi House Name" },
        @{ key = "about:house_2:color"; type = "text"; label = "Gandhi House Color" },
        @{ key = "about:house_2:incharge"; type = "text"; label = "Gandhi House Incharge" },
        @{ key = "about:house_3:name"; type = "text"; label = "Tilak House Name" },
        @{ key = "about:house_3:color"; type = "text"; label = "Tilak House Color" },
        @{ key = "about:house_3:incharge"; type = "text"; label = "Tilak House Incharge" }
    )
    defaults = @{
        "about:house_title" = "House System"
        "about:house_subtitle" = "Fostering teamwork, leadership, and healthy competition"
        "about:house_incharge_name" = "Mrs. Cheryl Dsouza"
        "about:house_incharge_position" = "Mistress of Houses"
        "about:house_incharge_description" = "Overseeing all house activities and competitions"
        "about:house_0:name" = "Tagore"
        "about:house_0:color" = "Red"
        "about:house_0:incharge" = "Mrs. Sandhya B."
        "about:house_1:name" = "Nehru"
        "about:house_1:color" = "Green"
        "about:house_1:incharge" = "Mrs. Mini P. S."
        "about:house_2:name" = "Gandhi"
        "about:house_2:color" = "Blue"
        "about:house_2:incharge" = "Mrs. Meghana T."
        "about:house_3:name" = "Tilak"
        "about:house_3:color" = "Yellow"
        "about:house_3:incharge" = "Mrs. Ashwini D."
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

# Wait a moment for the fields to be registered
Write-Host "`n=== Waiting for fields to be registered ===" -ForegroundColor Cyan
Start-Sleep -Seconds 2

# Now try to set the values
Write-Host "`n=== Setting house system values ===" -ForegroundColor Cyan

$valuesBody = @{
    page = "about"
    fields = @(
        @{ key = "about:house_title"; value = "House System" },
        @{ key = "about:house_subtitle"; value = "Fostering teamwork, leadership, and healthy competition" },
        @{ key = "about:house_incharge_name"; value = "Mrs. Cheryl Dsouza" },
        @{ key = "about:house_incharge_position"; value = "Mistress of Houses" },
        @{ key = "about:house_incharge_description"; value = "Overseeing all house activities and competitions" },
        @{ key = "about:house_0:name"; value = "Tagore" },
        @{ key = "about:house_0:color"; value = "Red" },
        @{ key = "about:house_0:incharge"; value = "Mrs. Sandhya B." },
        @{ key = "about:house_1:name"; value = "Nehru" },
        @{ key = "about:house_1:color"; value = "Green" },
        @{ key = "about:house_1:incharge"; value = "Mrs. Mini P. S." },
        @{ key = "about:house_2:name"; value = "Gandhi" },
        @{ key = "about:house_2:color"; value = "Blue" },
        @{ key = "about:house_2:incharge"; value = "Mrs. Meghana T." },
        @{ key = "about:house_3:name"; value = "Tilak" },
        @{ key = "about:house_3:color"; value = "Yellow" },
        @{ key = "about:house_3:incharge"; value = "Mrs. Ashwini D." }
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
