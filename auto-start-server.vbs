' AI Future Agency - Automatic Silent Background Server & Cloudflare Tunnel Starter
Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

' Fixed project directory
projectDir = "c:\Users\hp\Downloads\Telegram Desktop\aifutureagency"
If fso.FolderExists(projectDir) Then
    WshShell.CurrentDirectory = projectDir
Else
    scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
    WshShell.CurrentDirectory = scriptDir
End If

' 1. Start PHP server silently on port 3000
WshShell.Run "php -S 0.0.0.0:3000 router.php", 0, False

' 2. Wait 2 seconds
WScript.Sleep 2000

' 3. Start Cloudflare Tunnel silently
WshShell.Run "cloudflared.exe tunnel run --token eyJhIjoiN2M1YjJmZGZmZmNjZWEzYmFhOTg3YjUzZGFlYmE4MDQiLCJ0IjoiMjM5YzNjODItNDI2NC00MDYwLWFmMTAtNDI1Y2IxZmE3MmQxIiwicyI6IlpUY3haalEyTWpRdE9Ea3hZaTAwWlRsbUxXSTRPVEl0T1dJNU4yRmhPRFEwTXprNCJ9", 0, False
