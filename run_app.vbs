Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

currentDir = fso.GetParentFolderName(WScript.ScriptFullName)

WshShell.Run "cmd /c cd /d """ & currentDir & """ && npm run build", 0, True

WshShell.Run "cmd /c cd /d """ & currentDir & """ && npm run preview", 0, False

Dim objShell
Set objShell = CreateObject("Shell.Application")
objShell.ShellExecute "http://localhost:4173/", "", "", "open", 1