set project = %1
set source_folder_path = %2
set element_name = %3
set asset_name = %4

mkdir "P:\projects\%project%\bank\elements\%asset_name%\%element_name%
xcopy  %source_folder_path% "P:\projects\%project%\bank\elements\%asset_name%\%element_name% /e /i /h /c