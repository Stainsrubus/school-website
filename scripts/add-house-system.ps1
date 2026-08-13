#!/usr/bin/env pwsh
# Add House System content to CMS

$CMS = "https://schoolpress-cms.creoleaptech.workers.dev"
$EMAIL = "tech@creoleap.com"
$PASSWORD = "Creoleap@6789"

Write-Host "=== Logging in to CMS ===" -ForegroundColor Cyan
$loginResp = Invoke-RestMethod -Uri "$CMS/api/auth/login" -Method POST -ContentType "application/json" `
  -Body (@{ email = $EMAIL; password = $PASSWORD } | ConvertTo-Json) `
  -SessionVariable session

Write-Host "Login: $($loginResp | ConvertTo-Json -Compress)" -ForegroundColor Green

# House System fields for the about page
$houseFields = @(
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

Write-Host "`n=== Adding House System fields to about page ===" -ForegroundColor Cyan
$body = @{ page = "about"; fields = $houseFields } | ConvertTo-Json -Depth 5
$resp = Invoke-RestMethod -Uri "$CMS/api/content/fields" -Method PUT -ContentType "application/json" `
  -Body $body -WebSession $session
Write-Host "About (House System): $($resp | ConvertTo-Json -Compress)" -ForegroundColor Green

Write-Host "`n=== House System CMS fields added successfully ===" -ForegroundColor Cyan
