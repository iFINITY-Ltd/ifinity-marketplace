@echo off
rem iFINITY AgentZ MCP launcher (Windows).
rem
rem Claude Code resolves the MCP `command` against the Windows PATH (it does NOT
rem inject its bundled Git Bash), so a bare `sh` command dies with `spawn sh
rem ENOENT` before any shell script can run. This .cmd is the Windows entry
rem point: it finds a Node runtime and runs dist\index.js with it, even when the
rem end user has no standalone Node — by falling back to the iFINITY AgentZ
rem desktop app's bundled Electron via ELECTRON_RUN_AS_NODE=1.
rem
rem `@echo off` is required: the MCP protocol owns stdout, so command echoing
rem must be suppressed. All diagnostics go to stderr.

setlocal enableextensions enabledelayedexpansion

rem dist\index.js sits one level up from this bin\ folder.
set "ENTRY=%~dp0..\dist\index.js"

rem 1) Explicit override (developer / packaged-runtime escape hatch).
if defined AGENTZ_NODE if exist "%AGENTZ_NODE%" (
  set "ELECTRON_RUN_AS_NODE=1"
  "%AGENTZ_NODE%" "%ENTRY%"
  exit /b !errorlevel!
)

rem 2) A real Node on PATH (developer machines).
where node >nul 2>nul
if !errorlevel! == 0 (
  node "%ENTRY%"
  exit /b !errorlevel!
)

rem 3) Runtime pointer written by the iFINITY AgentZ Hub on startup. The Hub
rem    writes forward slashes, so normalize to backslashes before use.
set "POINTER=%USERPROFILE%\.ifinity-agentz\node-runtime"
if exist "%POINTER%" (
  set /p RUNTIME=<"%POINTER%"
  if defined RUNTIME (
    set "RUNTIME=!RUNTIME:/=\!"
    if exist "!RUNTIME!" (
      set "ELECTRON_RUN_AS_NODE=1"
      "!RUNTIME!" "%ENTRY%"
      exit /b !errorlevel!
    )
  )
)

rem 4) Known per-user Hub install location.
set "HUB=%LOCALAPPDATA%\Programs\@ifinitycompanion\iFINITY AgentZ.exe"
if exist "%HUB%" (
  set "ELECTRON_RUN_AS_NODE=1"
  "%HUB%" "%ENTRY%"
  exit /b !errorlevel!
)

>&2 echo [agentz-mcp] Cannot start: no Node runtime found and the iFINITY AgentZ desktop app was not located. Open or install iFINITY AgentZ (https://ifinityagentz.co.uk), or install Node.js.
exit /b 1
