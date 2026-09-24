@echo off
title AI Future Agency - 1-Click Auto Push to GitHub
chcp 65001 >nul
echo ========================================================
echo   ⚡ AI FUTURE AGENCY - AUTO SYNC TO GITHUB ^& CLOUD
echo ========================================================
echo.
echo 📦 Staging all modified files...
git add .
echo.
echo 📝 Committing latest updates...
git commit -m "Auto-update: %date% %time%"
echo.
echo 🚀 Pushing updates directly to GitHub...
git push origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo   ✅ SUCCESS: Changes pushed to GitHub!
    echo   🌐 Cloud deployment is updating automatically!
    echo ========================================================
) else (
    echo ========================================================
    echo   ⚠️ Push failed or GitHub remote is not linked yet.
    echo ========================================================
)
echo.
pause
