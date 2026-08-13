#!/usr/bin/env pwsh
# Set house system values after fields are registered

$CMS = "https://schoolpress-cms.creoleaptech.workers.dev"
$EMAIL = "tech@creoleap.com"
$PASSWORD = "Creoleap@6789"

Write-Host "=== Logging in to CMS ===" -ForegroundColor Cyan
$loginResp = Invoke-RestMethod -Uri "$CMS/api/auth/login" -Method POST -ContentType "application/json" `
  -Body (@{ email = $EMAIL; password = $PASSWORD } | ConvertTo-Json) `
  -SessionVariable session

Write-Host "Login: $($loginResp | ConvertTo-Json -Compress)" -ForegroundColor Green

# Set house system values
Write-Host "`n=== Setting House System values ===" -ForegroundColor Cyan

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
    Write-Host "Error setting values: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== Done ===" -ForegroundColor Cyan
