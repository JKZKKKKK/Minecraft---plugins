REM BDS�ػ����̽ű� �汾2.0

Dim Release
Set Release=WScript.CreateObject("WScript.Shell")

Dim CurrentPath
Dim CurrentBDSPath
CurrentPath = createobject("Scripting.FileSystemObject").GetFolder(".").Path
CurrentBDSPath = CurrentPath & "\bedrock_server_mod.exe"

Proce = False
Dim i
i = 0

REM 180����Զ��رսű�
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
    REM Wscript.Echo "ϵͳ�����������У�"
   Else
    REM Wscript.Echo "# �ѹرշ�����������������.."
    Release.run ".\bedrock_server_mod.exe",8,FALSE
    Exit Do
    wscript.quit(0)
End If

Loop Until Proce = False