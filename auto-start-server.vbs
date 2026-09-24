' AI Future Agency - Automatic Silent Background Server Starter
Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

' Get directory of this script
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
WshShell.CurrentDirectory = scriptDir

' Launch PHP server silently (0 = hide window, False = don't block)
WshShell.Run "php -S 0.0.0.0:3000 router.php", 0, False
