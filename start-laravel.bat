@echo off
title AI Future Agency - Laravel Server
color 0A
echo =========================================================
echo       AI FUTURE AGENCY - FULL STACK LARAVEL APP
echo =========================================================
echo.
echo Starting Laravel Artisan Server on port 8050...
echo.
echo Opening Application in your default browser:
echo http://127.0.0.1:8050
echo.
echo Admin Console: http://127.0.0.1:8050/admin
echo Customer Dashboard: http://127.0.0.1:8050/dashboard
echo.
echo Press Ctrl+C in this window to stop the server at any time.
echo =========================================================
echo.

cd /d "%~dp0laravel-app"
start http://127.0.0.1:8050
php artisan serve --host=127.0.0.1 --port=8050
pause
