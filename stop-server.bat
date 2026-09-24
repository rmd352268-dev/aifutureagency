@echo off
title AI Future Agency - Stop Server & Tunnel
chcp 65001 >nul
cls
echo ========================================================
echo   AI FUTURE AGENCY - সার্ভার এবং ক্লাউডফেয়ার টানেল বন্ধ করা হচ্ছে
echo ========================================================
echo.

echo [*] PHP Server বন্ধ করা হচ্ছে...
taskkill /F /IM php.exe >nul 2>&1

echo [*] Cloudflare Tunnel বন্ধ করা হচ্ছে...
taskkill /F /IM cloudflared.exe >nul 2>&1

echo.
echo [OK] সার্ভার এবং ক্লাউডফেয়ার টানেল সফলভাবে বন্ধ করা হয়েছে!
echo.
pause
