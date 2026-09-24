@echo off
title AI Future Agency - Local Server
color 0A
cls

echo ================================================================
echo       AI FUTURE AGENCY - LOCALHOST SERVER STARTING...
echo ================================================================
echo.

set PORT=3000

echo [i] Starting server on Port: %PORT%...
echo.

:: Check for PHP first (recommended for clean /admin and /login routes)
where php >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] PHP detected (Version 8.x). Starting PHP Router Engine...
    echo.
    echo ================================================================
    echo    LOCAL SERVER IS LIVE! CLICK OR VISIT ANY LINK BELOW:
    echo ================================================================
    echo.
    echo   [1] Public Website   : http://localhost:%PORT%/
    echo   [2] Admin Panel      : http://localhost:%PORT%/admin
    echo   [3] Member Login     : http://localhost:%PORT%/login
    echo   [4] Registration     : http://localhost:%PORT%/register
    echo   [5] User Dashboard   : http://localhost:%PORT%/dashboard
    echo.
    echo   [Admin Login Credentials]
    echo   Username : admin
    echo   Password : admin123
    echo.
    echo ================================================================
    echo   Keep this black window OPEN while using your website!
    echo ================================================================
    echo.

    :: Open browser after 1 second delay
    start "" cmd /c "timeout /t 1 /nobreak >nul & start http://localhost:%PORT%/"
    php -S 0.0.0.0:%PORT% router.php
    goto end
)

:: Fallback to Python if PHP is not in PATH
where python >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Python detected. Starting Python HTTP Engine...
    echo.
    echo ================================================================
    echo    LOCAL SERVER IS LIVE! VISIT ANY LINK BELOW:
    echo ================================================================
    echo.
    echo   [1] Public Website   : http://localhost:%PORT%/
    echo   [2] Admin Panel      : http://localhost:%PORT%/admin
    echo   [3] Member Login     : http://localhost:%PORT%/login.html
    echo   [4] Registration     : http://localhost:%PORT%/register.html
    echo.
    echo   [Admin Login Credentials]
    echo   Username : admin
    echo   Password : admin123
    echo.
    echo ================================================================
    echo   Keep this black window OPEN while using your website!
    echo ================================================================
    echo.

    start "" cmd /c "timeout /t 1 /nobreak >nul & start http://localhost:%PORT%/"
    python -m http.server %PORT%
    goto end
)

echo [ERROR] Neither PHP nor Python was found on your system PATH.
echo Please make sure PHP or Python is installed.
echo.
pause

:end
