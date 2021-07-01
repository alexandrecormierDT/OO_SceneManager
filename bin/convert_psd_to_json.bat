@echo off
setlocal enabledelayedexpansion
SET /a number=0
SET folder=%cd%
echo.[> %folder%\%1.json
FOR /F "tokens=* USEBACKQ" %%F IN (`P:\pipeline\extra_soft\ImageMagick-7.0.10-Q16\magick.exe identify -verbose -format "{'layer_name':'%%l','geometry':'%%g'}," %1`) DO (
    echo.%%F>> %folder%\test.json
)
echo.{'file_name':'%1'}]>> %folder%\%1.json
::FOR /F "tokens=* USEBACKQ" %%F IN (`P:\pipeline\extra_soft\ImageMagick-7.0.10-Q16\magick.exe identify -verbose -format "%%l" %1`) DO (
  ::  echo %%F >> %folder%\test.txt
::)

type %folder%\%1.json