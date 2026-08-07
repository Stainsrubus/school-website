#!/usr/bin/env pwsh
# Fix stale /st_pius/ image paths in CMS values to R2 URLs

$CMS = "https://schoolpress-cms.creoleaptech.workers.dev"
$EMAIL = "tech@creoleap.com"
$PASSWORD = "Creoleap@6789"

Write-Host "=== Logging in to CMS ===" -ForegroundColor Cyan
$loginResp = Invoke-RestMethod -Uri "$CMS/api/auth/login" -Method POST -ContentType "application/json" `
  -Body (@{ email = $EMAIL; password = $PASSWORD } | ConvertTo-Json) `
  -SessionVariable session

Write-Host "Login: $($loginResp | ConvertTo-Json -Compress)" -ForegroundColor Green

# Get cookies from session
$cookies = $session.Cookies.GetCookies($CMS)

# Build the fields update for the "home" page
$R2 = "$CMS/api/assets/st-pius"
$homeFields = @(
  @{ key = "feature_0:image"; value = "$R2/smartLearning.JPG" },
  @{ key = "feature_1:image"; value = "$R2/leader1.jpeg" },
  @{ key = "feature_2:image"; value = "$R2/sport1.jpg" },
  @{ key = "feature_3:image"; value = "$R2/art2.jpeg" }
)

Write-Host "`n=== Updating home page fields ===" -ForegroundColor Cyan
$body = @{ page = "home"; fields = $homeFields } | ConvertTo-Json -Depth 5
$resp = Invoke-RestMethod -Uri "$CMS/api/content/fields" -Method PUT -ContentType "application/json" `
  -Body $body -WebSession $session
Write-Host "Home: $($resp | ConvertTo-Json -Compress)" -ForegroundColor Green

# About page fields
$aboutFields = @(
  @{ key = "about:principal:photo"; value = "$R2/principal.JPG" },
  @{ key = "about:facility_0:image"; value = "$R2/IMG_8389.JPG" },
  @{ key = "about:facility_1:image"; value = "$R2/ict.JPG" },
  @{ key = "about:facility_2:image"; value = "$R2/library.JPG" },
  @{ key = "about:facility_3:image"; value = "$R2/smart.JPG" },
  @{ key = "about:facility_4:image"; value = "$R2/culturals3.jpeg" },
  @{ key = "about:facility_5:image"; value = "$R2/art2.jpeg" },
  @{ key = "about:facility_6:image"; value = "$R2/sport1.jpg" },
  @{ key = "about:facility_7:image"; value = "$R2/culturals4.jpeg" }
)

Write-Host "`n=== Updating about page fields ===" -ForegroundColor Cyan
$body = @{ page = "about"; fields = $aboutFields } | ConvertTo-Json -Depth 5
$resp = Invoke-RestMethod -Uri "$CMS/api/content/fields" -Method PUT -ContentType "application/json" `
  -Body $body -WebSession $session
Write-Host "About: $($resp | ConvertTo-Json -Compress)" -ForegroundColor Green

# Academics page fields
$acadFields = @(
  @{ key = "academics:subject_0:image"; value = "$R2/smartLearning.JPG" },
  @{ key = "academics:subject_1:image"; value = "$R2/science.jpg" },
  @{ key = "academics:subject_2:image"; value = "$R2/culturals3.jpeg" },
  @{ key = "academics:subject_3:image"; value = "$R2/expo.jpg" },
  @{ key = "academics:subject_4:image"; value = "$R2/ict.JPG" },
  @{ key = "academics:subject_5:image"; value = "$R2/art2.jpeg" }
)

Write-Host "`n=== Updating academics page fields ===" -ForegroundColor Cyan
$body = @{ page = "academics"; fields = $acadFields } | ConvertTo-Json -Depth 5
$resp = Invoke-RestMethod -Uri "$CMS/api/content/fields" -Method PUT -ContentType "application/json" `
  -Body $body -WebSession $session
Write-Host "Academics: $($resp | ConvertTo-Json -Compress)" -ForegroundColor Green

# Facilities page fields
$facFields = @(
  @{ key = "facilities:facility_0:image"; value = "$R2/science.jpg" },
  @{ key = "facilities:facility_1:image"; value = "$R2/ict.JPG" },
  @{ key = "facilities:facility_2:image"; value = "$R2/library.JPG" },
  @{ key = "facilities:facility_3:image"; value = "$R2/smart.JPG" },
  @{ key = "facilities:facility_4:image"; value = "$R2/culturals3.jpeg" },
  @{ key = "facilities:facility_5:image"; value = "$R2/art2.jpeg" },
  @{ key = "facilities:facility_6:image"; value = "$R2/sport1.jpg" },
  @{ key = "facilities:facility_7:image"; value = "$R2/culturals4.jpeg" }
)

Write-Host "`n=== Updating facilities page fields ===" -ForegroundColor Cyan
$body = @{ page = "facilities"; fields = $facFields } | ConvertTo-Json -Depth 5
$resp = Invoke-RestMethod -Uri "$CMS/api/content/fields" -Method PUT -ContentType "application/json" `
  -Body $body -WebSession $session
Write-Host "Facilities: $($resp | ConvertTo-Json -Compress)" -ForegroundColor Green

Write-Host "`n=== All CMS values updated ===" -ForegroundColor Cyan
