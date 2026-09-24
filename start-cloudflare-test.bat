@echo off
title AI Future Agency - Cloudflare Instant Tunnel
chcp 65001 >nul
cls
echo ========================================================
echo   AI FUTURE AGENCY - CLOUDFLARE INSTANT TUNNEL
echo ========================================================
echo.
echo আপনার লোকালহোস্ট (localhost:3000) ক্লাউডফেয়ারের মাধ্যমে
echo ইনস্ট্যান্ট পাবলিক ইন্টারনেটে লাইভ করা হচ্ছে...
echo.
echo নিচের লগটিতে https://....trycloudflare.com লিঙ্কটি দেখতে পাবেন।
echo যেকোনো মোবাইল বা কম্পিউটার থেকে এই লিঙ্কে ঢুকলে আপনার ওয়েবসাইট দেখতে পাবেন।
echo ========================================================
echo.
.\cloudflared.exe tunnel --url http://localhost:3000
pause
