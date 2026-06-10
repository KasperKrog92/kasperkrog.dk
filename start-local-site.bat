@echo off
setlocal

cd /d "%~dp0"
title kasper-krog.dk local server

where python >nul 2>&1
if errorlevel 1 (
  echo Python could not be found.
  echo Install Python or run the site with another local web server.
  echo.
  pause
  exit /b 1
)

echo Serving kasper-krog.dk at http://localhost:8741/
echo Close this window to stop the local server.
echo.

start "" powershell.exe -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Milliseconds 800; Start-Process 'http://localhost:8741/'"
python -m http.server 8741

echo.
echo The local server stopped or could not start.
pause
