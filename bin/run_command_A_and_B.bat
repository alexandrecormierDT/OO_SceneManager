set harmony_path = "C:/Program Files (x86)/Toon Boom Animation/Toon Boom Harmony 20 Premium/win64/bin/HarmonyPremium.exe"
set xstage_path = %1
set movieupload_path = "P:/pipeline/extra_scripts/python3.x/tbmovieupload/bin/tbmovieupload.bat"
"%harmony_path%" -batch "%xstage_path%"
"%movieupload_path%" -p "%2" -a "%3" -f "%4"  -n "%5" -t "%6"  -s  "%7" ';
