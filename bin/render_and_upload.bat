"C:/Program Files (x86)/Toon Boom Animation/Toon Boom Harmony 20 Premium/win64/bin/HarmonyPremium.exe" -batch "%1"
::pause before upload, uses the ping trick since there's a STDOUT glitch when using TIMEOUT
ping -n 1 -w 5000 10.151.0.1
"P:/pipeline/extra_scripts/python3.x/tbmovieupload/bin/tbmovieupload.bat" -p %2 -a %3 -f %4  -n %5 -t %6  -s  %7