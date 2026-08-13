#!/usr/bin/env pwsh
# Get about page content and try to update it

$CMS = "https://schoolpress-cms.creoleaptech.workers.dev"
$EMAIL = "tech@creoleap.com"
$PASSWORD = "Creoleap@6789"

Write-Host "=== Logging in to CMS ===" -ForegroundColor Cyan
$loginResp = Invoke-RestMethod -Uri "$CMS/api/auth/login" -Method POST -ContentType "application/json" `
  -Body (@{ email = $EMAIL; password = $PASSWORD } | ConvertTo-Json) `
  -SessionVariable session

Write-Host "Login: $($loginResp | ConvertTo-Json -Compress)" -ForegroundColor Green

# Get about page content
Write-Host "`n=== Getting about page content ===" -ForegroundColor Cyan
try {
    $aboutContent = Invoke-RestMethod -Uri "$CMS/api/content/about" -Method GET -ContentType "application/json" -WebSession $session
    Write-Host "About content keys: $($aboutContent.fields.PSObject.Properties.Name -join ', ')" -ForegroundColor Green
    Write-Host "About content: $($aboutContent | ConvertTo-Json -Depth 10)" -ForegroundColor Green
} catch {
    Write-Host "Error getting about content: $($_.Exception.Message)" -ForegroundColor Red
}

# Try to update about page with house system fields
Write-Host "`n=== Trying to update about page ===" -ForegroundColor Cyan
try {
    $body = @{
        fields = @{
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
    } | ConvertTo-Json -Depth 10
    
    $resp = Invoke-RestMethod -Uri "$CMS/api/content/about" -Method PUT -ContentType "application/json" `
      -Body $body -WebSession $session
    Write-Host "Update response: $($resp | ConvertTo-Json -Compress)" -ForegroundColor Green
} catch {
    Write-Host "Error updating about content: $($_.Exception.Message)" -ForegroundColor Red
}
