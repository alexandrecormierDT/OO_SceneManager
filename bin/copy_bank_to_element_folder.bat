@echo off
set datetime=%DATE:~6,4%-%DATE:~3,2%-%DATE:~0,2%_%TIME:~0,2%-%TIME:~3,2%-%TIME:~6,2%
set project=%1
set elementfolder=%2
set asset=%3
if not "%4"=="" (
    set overwrite=%4
) else (
    set overwrite=False
)
mkdir P:\projects\%project%\bank\log\elementcopy 2>NUL
set log_file_path=P:\projects\%project%\bank\log\elementcopy\%datetime%_pull_log.txt

echo -------------------------------------------------------------- >> %log_file_path%
echo COPY PROCESS  %datetime% >> %log_file_path%
echo -------------------------------------------------------------- >> %log_file_path%
echo ____PROJECT --- %1 >> %log_file_path%
echo ____ELEMENTS_FOLDER------ %2 >> %log_file_path%
echo ____ASSET ----- %3 >> %log_file_path%
echo -------------------------------------------------------------- >> %log_file_path%

::main loop
:main
set arguments=/s /lev:1 /MT
if /i %overwrite%==False (
    set arguments=%arguments% /XC
)
for  /f "tokens=*" %%a in ('dir /b /a:d %elementfolder% ^|findstr /b /i "%asset%"') do (
    set subFolder=%%a
    call :copy
)
goto eof

::copy function
:copy
echo %subFolder% "copying element folder" 2>&1 1>> %log_file_path%

set source_folder_path=P:\projects\%project%\bank\elements\%asset%\%subFolder%
set dest_folder_path=%elementfolder%%subFolder%

robocopy %arguments% %source_folder_path% %dest_folder_path% 2>&1 1>>  %log_file_path%
goto eof

:eofexit
exit
:eofpause
pause
:eof