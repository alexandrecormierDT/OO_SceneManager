@echo off
setlocal enabledelayedexpansion
SET /a number=0
SET folder=%cd%
FOR /F "tokens=* USEBACKQ" %%F IN (`P:\pipeline\extra_soft\ImageMagick-7.0.10-Q16\magick.exe identify -verbose -format "%%l\n" %1`) DO (
    P:\pipeline\extra_soft\ImageMagick-7.0.10-Q16\magick.exe  convert %1[!number!] -page +0+0 "layers\\"%%F.tif
    echo %%F >> %folder%\test.txt
    SET /a number=!number!+1
)

