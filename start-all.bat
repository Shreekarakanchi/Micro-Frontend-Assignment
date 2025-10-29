@echo off
echo 🚀 Starting Micro-Frontend Applications...
echo.

echo 📱 Starting Chat App on port 3001...
start "Chat App - Port 3001" cmd /k "cd chat && npm start"

timeout /t 2 /nobreak > nul

echo 📧 Starting Email App on port 3002...
start "Email App - Port 3002" cmd /k "cd email && npm start"

timeout /t 2 /nobreak > nul

echo 🏠 Starting Host App on port 3000...
start "Host App - Port 3000" cmd /k "cd host && npm start"

echo.
echo ✅ All applications are starting...
echo.
echo 📋 Application URLs:
echo    Host:  http://localhost:3000
echo    Chat:  http://localhost:3001
echo    Email: http://localhost:3002
echo.
echo ⏳ Wait for all webpack compilations to complete...
echo 🌐 Then open http://localhost:3000 in your browser
echo.
pause
