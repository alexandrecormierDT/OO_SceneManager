@echo off
set datetime=%DATE:~6,4%-%DATE:~3,2%-%DATE:~0,2%_%TIME:~0,2%-%TIME:~3,2%-%TIME:~6,2%
set sourcefolderpath=%1
set destfolderpath=%2
set project=billy

mkdir P:\projects\%project%\bank\log\elementcopy 2>NUL
set log_file_path=P:\projects\%project%\bank\log\elementcopy\%datetime%_copytvg_log.txt

echo -------------------------------------------------------------- >> %log_file_path%
echo COPY PROCESS  %datetime% >> %log_file_path%
echo -------------------------------------------------------------- >> %log_file_path%

set arguments=/s /lev:1 /MT /XC

set source=%sourcefolderpath%
set dest=%destfolderpath%

robocopy %arguments% %source% %dest% 2>&1 1>>  %log_file_path%

