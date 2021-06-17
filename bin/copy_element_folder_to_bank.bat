@echo off
SET project = %1
SET source = %2
SET asset= %3


for  /f "delims=" %%a in ('dir /b  /a:d %2 ^|findstr /l /i "%3"') do (
    echo %%a
    if exist P:\projects\%1\bank\elements\%3\%%a (
        xcopy %2%%a P:\projects\%1\bank\elements\%3\%%a /K /D /H /-Y
    ) else (

        mkdir P:\projects\%1\bank\elements\%3\%%a
        xcopy %2%%a P:\projects\%1\bank\elements\%3\%%a /K /D /H /-Y

    )
    
)