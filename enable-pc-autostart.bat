@echo off
title AI Future Agency - Enable Auto Start on PC Boot
chcp 65001 >nul
cls
echo ========================================================
echo   AI FUTURE AGENCY - AUTO-START ON PC BOOT SETUP
echo ========================================================
echo.
echo [1/2] Windows Startup ফোল্ডারে অটো-স্টার্ট স্ক্রিপ্ট সেট করা হচ্ছে...

set "STARTUP_FOLDER=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "SOURCE_VBS=%~dp0auto-start-server.vbs"
set "DEST_VBS=%STARTUP_FOLDER%\aifuture-autostart.vbs"

copy /y "%SOURCE_VBS%" "%DEST_VBS%" >nul

if %errorlevel% equ 0 (
    echo [OK] সফলভাবে Windows Startup ফোল্ডারে সেট করা হয়েছে!
    echo.
    echo [2/2] সুবিধা:
    echo   - এখন থেকে আপনার পিসি অন হওয়ার সাথে সাথেই ওয়েবসাইট ব্যাকগ্রাউন্ডে চালু হয়ে যাবে।
    echo   - কোনো কালো কমান্ড স্ক্রিন সামনে আসবে না, সম্পূর্ণ নিরবে চলবে।
    echo   - আপনি লোকালহোস্টে বা ক্লাউডফেয়ার টানেলে সার্বক্ষণিক লাইভ এক্সেস পাবেন।
) else (
    echo [ERROR] অটো-স্টার্ট সেট করতে সমস্যা হয়েছে। অনুগ্রহ করে ম্যানুয়ালি ফাইল কপি করুন।
)

echo.
echo ========================================================
echo   সেটআপ সম্পন্ন! যেকোনো কি চেপে উইন্ডোটি বন্ধ করুন।
echo ========================================================
pause >nul
