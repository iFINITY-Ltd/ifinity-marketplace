@echo off
rem iFINITY AgentZ MCP launcher (Windows).
rem
rem Claude hosts resolve the MCP `command` against the Windows PATH (they do NOT
rem inject its bundled Git Bash), so a bare `sh` command dies with `spawn sh
rem ENOENT` before any shell script can run. This .cmd is the Windows entry
rem point: it runs dist\index.js with a Node it chose itself.
rem
rem The runtime-trust policy (src/config/runtime-trust.ts): the workspace is
rem untrusted, the person's own environment (PATH, USERPROFILE, their shell
rem configuration) is trusted. Candidates, in order: the optional pin
rem (%USERPROFILE%\.ifinity-agentz\pinned-runtime), the AgentZ app's recorded
rem runtime, the app's install, then node on PATH, PATH and PATHEXT walked here
rem (never a bare name, never the current-directory search). A candidate counts
rem by its canonical target and only when that is not inside the working
rem directory or its enclosing project root (the nearest folder at or above it
rem holding .git or package.json); USERPROFILE and the folders above it never
rem count. cmd.exe cannot read a link's target, so only a candidate whose path
rem holds a link is resolved through servers\agentz-runtime.ps1; nothing else
rem is run before a candidate passes. PowerShell's stdin is NUL: stdin is the
rem MCP pipe.
rem
rem Before anything is run, the working directory becomes this plugin's own
rem folder, so a program that chooses what to run from files in the working
rem directory (a version manager's shim: volta, nvm-windows, fnm, mise...)
rem never reads the workspace's. A candidate that passes is asked, from there
rem and with stdin NUL, for its real executable (process.execPath); that path
rem must pass the same check, and it, never the shim, is what runs. The
rem connector gets the original working directory in AGENTZ_WORKSPACE_CWD and
rem returns to it as its first action (src/config/workspace-cwd.ts).
rem
rem `@echo off` is required: the MCP protocol owns stdout, so command echoing
rem must be suppressed. All diagnostics go to stderr.

setlocal enableextensions enabledelayedexpansion

rem The workspace, kept for the connector; from here on the working directory
rem is the plugin's own folder.
set "WORKSPACE_CD=%CD%"
pushd "%~dp0.." || goto no_root
set "AGENTZ_WORKSPACE_CWD=!WORKSPACE_CD!"
set "ELECTRON_RUN_AS_NODE=1"

rem dist\index.js sits one level up from this servers\ folder.
set "ENTRY=%~dp0..\dist\index.js"
set "RESOLVER=%~dp0agentz-runtime.ps1"
set "WINDIR_ROOT=%SystemRoot%"
if not defined WINDIR_ROOT set "WINDIR_ROOT=C:\Windows"
rem Some hosts (Codex) start MCP servers with a short environment allow-list;
rem PowerShell and .NET cannot load without SystemRoot, so it comes back here.
if not defined SystemRoot set "SystemRoot=%WINDIR_ROOT%"
if not defined windir set "windir=%WINDIR_ROOT%"
set "POWERSHELL=%WINDIR_ROOT%\System32\WindowsPowerShell\v1.0\powershell.exe"

rem The untrusted zone: the working directory and its enclosing project root.
rem Containment is decided only between paths in the same form (:canon): links
rem and junctions resolved, then 8.3 short form, compared case-insensitively.
set "HOMEDIR="
set "HOME_CMP="
if defined USERPROFILE (
  set "CANON_IN=%USERPROFILE%"
  call :canon
  set "HOMEDIR=!CANON!"
  set "HOME_CMP=!CMP!"
)
set "ZONE1="
set "ZONE1_CMP="
set "ZONE2_CMP="
set "CANON_IN=!WORKSPACE_CD!"
call :canon
set "WD=!CANON!"
set "WD_CMP=!CMP!"
call :home_or_above WD_CMP
if not defined HOA (
  set "ZONE1=!WD!"
  set "ZONE1_CMP=!WD_CMP!"
  call :project_root
)

set "CHOSEN="
rem 1) The optional pin.
set "LINE="
if defined USERPROFILE if exist "%USERPROFILE%\.ifinity-agentz\pinned-runtime" set /p LINE=<"%USERPROFILE%\.ifinity-agentz\pinned-runtime"
call :try LINE
if defined CHOSEN goto run
rem 2) The runtime the AgentZ app records.
set "LINE="
if defined USERPROFILE if exist "%USERPROFILE%\.ifinity-agentz\node-runtime" set /p LINE=<"%USERPROFILE%\.ifinity-agentz\node-runtime"
call :try LINE
if defined CHOSEN goto run
rem 3) The app's per-user install.
set "LINE="
if defined LOCALAPPDATA set "LINE=%LOCALAPPDATA%\Programs\@ifinitycompanion\iFINITY AgentZ.exe"
call :try LINE
if defined CHOSEN goto run
rem 4) node on PATH: each absolute entry, each PATHEXT extension.
set "EXTS=%PATHEXT%"
if not defined EXTS set "EXTS=.COM;.EXE;.BAT;.CMD"
set "REST=!PATH!"
:path_next
if not defined REST goto none
set "PDIR="
for /f "tokens=1* delims=;" %%A in ("!REST!") do (
  set "PDIR=%%~A"
  set "REST=%%B"
)
if not defined PDIR set "REST="
call :absolute PDIR
if not defined PDIR goto path_next
set "EREST=!EXTS!"
:ext_next
if not defined EREST goto path_next
set "EXT="
for /f "tokens=1* delims=;" %%A in ("!EREST!") do (
  set "EXT=%%A"
  set "EREST=%%B"
)
if not defined EXT goto path_next
set "LINE=!PDIR!\node!EXT!"
if exist "!LINE!" call :try LINE
if defined CHOSEN goto run
goto ext_next

:run
"!CHOSEN!" "%ENTRY%"
exit /b !errorlevel!

:no_root
>&2 echo [agentz-mcp] Cannot start: the plugin folder cannot be entered.
exit /b 1

:none
>&2 echo [agentz-mcp] Cannot start: no Node runtime outside this workspace. Install Node.js, or open or install iFINITY AgentZ (https://ifinityagentz.co.uk), which records its runtime, or pin one by writing its absolute path to %%USERPROFILE%%\.ifinity-agentz\pinned-runtime. A Node inside the project folder is never used.
exit /b 1

rem CHOSEN := the real executable behind the candidate in variable %1, when the
rem candidate and that executable are both files outside the zone (canonical
rem paths). With %2 = real, the candidate itself is already the real one.
:try
set "TRY=!%1!"
if not defined TRY exit /b 0
set "TRY=!TRY:"=!"
set "TRY=!TRY:/=\!"
call :absolute TRY
if not defined TRY exit /b 0
for %%F in ("!TRY!") do set "TRY=%%~fF"
if not exist "!TRY!" exit /b 0
if exist "!TRY!\*" exit /b 0
rem The executable that answered is the one already checked: no second resolve.
if "%~2"=="real" if /i "!TRY!"=="!PROBE!" (
  set "CHOSEN=!PROBE!"
  exit /b 0
)
set "CANON_IN=!TRY!"
call :canon
if not defined CANON exit /b 0
if not exist "!CANON!" exit /b 0
call :in_zone CMP
if defined IN_ZONE exit /b 0
if "%~2"=="real" (
  set "CHOSEN=!CANON!"
  exit /b 0
)
rem Ask the candidate, from the plugin folder and with stdin NUL, for the
rem executable it really is or stands in for; that one is checked and run.
set "PROBE=!CANON!"
set "REAL="
for /f "usebackq delims=" %%R in (`call "%PROBE%" -e "process.stdout.write(process.execPath)" ^<NUL 2^>NUL`) do set "REAL=%%R"
call :try REAL real
exit /b 0

rem The one containment form. From CANON_IN (an existing path): CANON := the
rem full path with every link and junction resolved (through the resolver,
rem PowerShell with stdin NUL, only when the path holds one), and CMP := CANON
rem in 8.3 short form, which every comparison uses (case-insensitively).
:canon
set "CANON="
set "CMP="
for %%F in ("!CANON_IN!") do set "CANON=%%~fF"
call :has_link CANON
if defined LINKED call :resolve_link
if not defined CANON exit /b 0
if not exist "!CANON!" (
  set "CANON="
  exit /b 0
)
for %%S in ("!CANON!") do set "CMP=%%~sS"
if "!CMP:~-1!"=="\" if not "!CMP:~-2!"==":\" set "CMP=!CMP:~0,-1!"
exit /b 0

rem CANON := CANON with every link resolved (PowerShell, stdin NUL), or nothing.
:resolve_link
set "RL_IN=!CANON!"
set "CANON="
if not exist "%POWERSHELL%" exit /b 0
for /f "usebackq delims=" %%R in (`call "%POWERSHELL%" -NoProfile -NonInteractive -ExecutionPolicy Bypass -File "%RESOLVER%" "%RL_IN%" ^<NUL`) do set "CANON=%%R"
exit /b 0

rem LINKED := 1 when the path in variable %1, or a folder above it, is a link (reparse point).
:has_link
set "LINKED="
set "HL=!%1!"
:has_link_walk
set "HL_ATTR="
for %%A in ("!HL!") do set "HL_ATTR=%%~aA"
if defined HL_ATTR if not "!HL_ATTR:l=!"=="!HL_ATTR!" (
  set "LINKED=1"
  exit /b 0
)
for %%P in ("!HL!\..") do set "HL_UP=%%~fP"
if /i "!HL_UP!"=="!HL!" exit /b 0
set "HL=!HL_UP!"
goto has_link_walk

rem IN_ZONE := 1 when the path (CMP form) in variable %1 is inside the zone:
rem equal, or the zone followed by "\" (never a bare string prefix).
:in_zone
set "IN_ZONE="
set "IZ_F=!%1!\"
if defined ZONE1_CMP (
  set "IZ_Z=!ZONE1_CMP!\"
  call :prefix_of IZ_F IZ_Z
  if defined PO set "IN_ZONE=1"
)
if defined ZONE2_CMP (
  set "IZ_Z=!ZONE2_CMP!\"
  call :prefix_of IZ_F IZ_Z
  if defined PO set "IN_ZONE=1"
)
exit /b 0

rem HOA := 1 when USERPROFILE is the folder (CMP form) in variable %1, or below it.
:home_or_above
set "HOA="
if not defined HOME_CMP exit /b 0
set "HOA_D=!%1!"
if "!HOA_D:~-1!"=="\" set "HOA_D=!HOA_D:~0,-1!"
set "HOA_D=!HOA_D!\"
set "HOA_H=!HOME_CMP!"
if not "!HOA_H:~-1!"=="\" set "HOA_H=!HOA_H!\"
call :prefix_of HOA_H HOA_D
if defined PO set "HOA=1"
exit /b 0

rem ZONE2 := the nearest folder at or above ZONE1 holding .git or package.json, below USERPROFILE.
:project_root
set "PR=!ZONE1!"
:project_walk
if exist "!PR!\.git" goto project_found
if exist "!PR!\package.json" goto project_found
for %%P in ("!PR!\..") do set "PR_UP=%%~fP"
if /i "!PR_UP!"=="!PR!" exit /b 0
set "PR=!PR_UP!"
for %%S in ("!PR!") do set "PR_CMP=%%~sS"
call :home_or_above PR_CMP
if defined HOA exit /b 0
goto project_walk
:project_found
for %%S in ("!PR!") do set "PR_CMP=%%~sS"
if "!PR_CMP:~-1!"=="\" if not "!PR_CMP:~-2!"==":\" set "PR_CMP=!PR_CMP:~0,-1!"
if /i not "!PR_CMP!"=="!ZONE1_CMP!" set "ZONE2_CMP=!PR_CMP!"
exit /b 0

rem PO := 1 when the value of variable %2 is a prefix of the value of variable %1 (case-insensitive).
:prefix_of
set "PO="
set "PO_P=!%2!"
set "PO_N=0"
:prefix_len
if defined PO_P (
  set "PO_P=!PO_P:~1!"
  set /a PO_N+=1
  goto prefix_len
)
set "PO_S=!%1!"
for %%N in (!PO_N!) do set "PO_HEAD=!PO_S:~0,%%N!"
if /i "!PO_HEAD!"=="!%2!" set "PO=1"
exit /b 0

rem Clear the variable named %1 unless it holds an absolute path (C:\... or \\server\...).
:absolute
set "ABSOLUTE_VALUE=!%1!"
if "!ABSOLUTE_VALUE:~1,2!"==":\" exit /b 0
if "!ABSOLUTE_VALUE:~0,2!"=="\\" exit /b 0
set "%1="
exit /b 0
