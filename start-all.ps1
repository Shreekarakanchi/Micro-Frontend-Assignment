# Windows PowerShell Script to Start All Micro-Frontends
# Run this script from the micro-frontend root directory

Write-Host "🚀 Starting Micro-Frontend Applications..." -ForegroundColor Green
Write-Host ""

# Start Chat App (Port 3001)
Write-Host "📱 Starting Chat App on port 3001..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\chat'; npm start; Write-Host 'Chat App Running on http://localhost:3001' -ForegroundColor Green"

# Wait a moment before starting next app
Start-Sleep -Seconds 2

# Start Email App (Port 3002)
Write-Host "📧 Starting Email App on port 3002..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\email'; npm start; Write-Host 'Email App Running on http://localhost:3002' -ForegroundColor Green"

# Wait a moment before starting host
Start-Sleep -Seconds 2

# Start Host App (Port 3000)
Write-Host "🏠 Starting Host App on port 3000..." -ForegroundColor Magenta
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\host'; npm start; Write-Host 'Host App Running on http://localhost:3000' -ForegroundColor Green"

Write-Host ""
Write-Host "✅ All applications are starting..." -ForegroundColor Green
Write-Host ""
Write-Host "📋 Application URLs:" -ForegroundColor White
Write-Host "   Host:  http://localhost:3000" -ForegroundColor Cyan
Write-Host "   Chat:  http://localhost:3001" -ForegroundColor Yellow
Write-Host "   Email: http://localhost:3002" -ForegroundColor Magenta
Write-Host ""
Write-Host "⏳ Wait for all webpack compilations to complete..." -ForegroundColor Yellow
Write-Host "🌐 Then open http://localhost:3000 in your browser" -ForegroundColor Green
