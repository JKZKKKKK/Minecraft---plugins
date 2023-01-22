REM BDS守护进程脚本 版本2.0

Dim Release
Set Release=WScript.CreateObject("WScript.Shell")

Dim CurrentPath
Dim CurrentBDSPath
CurrentPath = createobject("Scripting.FileSystemObject").GetFolder(".").Path
CurrentBDSPath = CurrentPath & "\bedrock_server_mod.exe"

Proce = False
Dim i
i = 0

REM 180秒后自动关闭脚本
Do
i=i+1
REM Wscript.Echo "# CloseTime: "& i & "/180s"
If i > 180 Then
  Exit Do
  wscript.quit(100)
End If
wscript.sleep 1000

Proce = False
For Each x In GetObject("winmgmts:").instancesof("win32_process")
      If x.ExecutablePath = CurrentBDSPath Then	
	REM UCase(x.Name) = UCase("bedrock_server_mod.exe")
        Proce = True
        Exit For
      End If
Next

If Proce Then
    REM Wscript.Echo "系统检测程序运行中！"
   Else
    REM Wscript.Echo "# 已关闭服务器，重新启动中.."
    Release.run ".\bedrock_server_mod.exe",8,FALSE
    Exit Do
    wscript.quit(0)
End If

Loop Until Proce = False