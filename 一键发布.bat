@echo off
rem ===========================================================================
rem  Double-click this file to build and publish the game to GitHub Pages.
rem
rem  NOTE: this file is intentionally ASCII-only. cmd.exe reads .bat files using
rem  the OEM code page (GBK on this machine), so UTF-8 Chinese text inside a .bat
rem  turns into mojibake and can even break parsing. All Chinese output comes from
rem  the Python script instead, which handles UTF-8 properly.
rem ===========================================================================
chcp 65001 >nul
setlocal
cd /d "%~dp0"

set "PY="
where python >nul 2>nul && set "PY=python"
if not defined PY if exist "%LOCALAPPDATA%\Programs\Python\Python310\python.exe" set "PY=%LOCALAPPDATA%\Programs\Python\Python310\python.exe"
if not defined PY if exist "%LOCALAPPDATA%\Programs\Python\Python311\python.exe" set "PY=%LOCALAPPDATA%\Programs\Python\Python311\python.exe"
if not defined PY if exist "%LOCALAPPDATA%\Programs\Python\Python312\python.exe" set "PY=%LOCALAPPDATA%\Programs\Python\Python312\python.exe"
if not defined PY (
  where py >nul 2>nul
  if not errorlevel 1 set "PY=py -3"
)

if not defined PY (
  echo.
  echo [ERROR] Python was not found.
  echo         Install Python 3 from https://www.python.org/downloads/
  echo         and tick "Add python.exe to PATH" during setup.
  echo.
  pause
  exit /b 1
)

%PY% "%~dp0app\tools\deploy.py" %*
set "CODE=%ERRORLEVEL%"

echo.
if not "%CODE%"=="0" echo [exit code %CODE%]
pause
endlocal
exit /b %CODE%
