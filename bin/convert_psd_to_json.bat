@echo off
setlocal enabledelayedexpansion
SET folder=%cd%
echo.[> %1.json
FOR /F "tokens=* USEBACKQ" %%F IN (`P:\pipeline\extra_soft\ImageMagick-7.0.10-Q16\magick.exe identify -verbose -format "{\"layer_name\":\"%%l\",\"geometry\":\"%%g\"}," %1`) DO (
    echo.%%F>> %1.json
)
echo.{"file_name":"%1"}]>> %1.json
type %1.json