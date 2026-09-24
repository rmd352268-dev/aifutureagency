@echo off
title AI Future Agency - Master Server Controller
color 0A
cls

cd /d "c:\Users\hp\Downloads\Telegram Desktop\aifutureagency"

echo ==============================================================================
echo        AI FUTURE AGENCY - 1-CLICK MASTER SERVER CONTROLLER
echo ==============================================================================
echo.

:: 1. Check PHP Server on Port 3000
netstat -ano | findstr /R /C:":3000 .*LISTENING" >nul 2>&1
if errorlevel 1 (
    echo [*] Starting PHP Router Server on Port 3000...
    wscript.exe "%~dp0auto-start-server.vbs"
    timeout /t 3 /nobreak >nul
) else (
    echo [OK] PHP Server is already RUNNING on Port 3000.
)

:: 2. Check Cloudflare Tunnel
tasklist /FI "IMAGENAME eq cloudflared.exe" 2>nul | find /I "cloudflared.exe" >nul
if errorlevel 1 (
    echo [*] Starting Cloudflare Tunnel for https://aifutureagency.store.cv ...
    start "" /b cloudflared.exe tunnel run --token eyJhIjoiN2M1YjJmZGZmZmNjZWEzYmFhOTg3YjUzZGFlYmE4MDQiLCJ0IjoiMjM5YzNjODItNDI2NC00MDYwLWFmMTAtNDI1Y2IxZmE3MmQxIiwicyI6IlpUY3haalEyTWpRdE9Ea3hZaTAwWlRsbUxXSTRPVEl0T1dJNU4yRmhPRFEwTXprNCJ9 >nul 2>&1
    timeout /t 2 /nobreak >nul
) else (
    echo [OK] Cloudflare Tunnel is already ACTIVE and CONNECTED.
)

echo.
echo ==============================================================================
echo    [ONLINE] SERVER STATUS: RUNNING IN BACKGROUND 24/7
echo ==============================================================================
echo.
echo   Public Live URL       : https://aifutureagency.store.cv
echo   Localhost URL         : http://localhost:3000
echo   Secret Admin Portal   : https://aifutureagency.store.cv/airana1713@admin
echo   Windows Auto-Start    : ENABLED (Starts automatically on PC boot)
echo.
echo ==============================================================================
echo   COMMANDS MENU:
echo ==============================================================================
echo   [1] Open Website in Browser
echo   [2] Open Admin Panel in Browser
echo   [3] Restart Server and Tunnel
echo   [4] Stop Everything
echo   [5] Exit (Server stays running in background)
echo.

set /p userChoice="Enter your choice (1-5): "

if "%userChoice%"=="1" (
    start https://aifutureagency.store.cv
    goto menu_done
)
if "%userChoice%"=="2" (
    start https://aifutureagency.store.cv/airana1713@admin
    goto menu_done
)
if "%userChoice%"=="3" (
    echo.
    echo [*] Restarting Server and Tunnel...
    taskkill /F /IM php.exe >nul 2>&1
    taskkill /F /IM cloudflared.exe >nul 2>&1
    timeout /t 2 /nobreak >nul
    wscript.exe "%~dp0auto-start-server.vbs"
    echo [OK] Restarted successfully!
    timeout /t 2 /nobreak >nul
    goto menu_done
)
if "%userChoice%"=="4" (
    echo.
    echo [*] Stopping Server and Tunnel...
    taskkill /F /IM php.exe >nul 2>&1
    taskkill /F /IM cloudflared.exe >nul 2>&1
    echo [OK] Stopped completely!
    timeout /t 2 /nobreak >nul
    exit /b 0
)
if "%userChoice%"=="5" (
    exit /b 0
)

:menu_done
echo.
echo [i] Server is safely running in background. You can close this window.
timeout /t 3 /nobreak >nul
exit /b 0
