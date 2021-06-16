OO.ElementManager = function (_S){

	var S = _S; 

	var elements_folders_object_array = [];
	var scene_elements_directory_path = ""; 
	var scene_folder_path = ""; 
	
	this.set_scene_folder_path = function(_scene_folder_path){
		scene_folder_path = _scene_folder_path;
		scene_elements_directory_path = scene_folder_path+"/elements/";
	}
	
	
	this.fetch_elements_dir_from_scene_directory = function(){
		if(scene_elements_directory_path != ""){
			var elements_folder = new $.oFolder(scene_elements_directory_path);
			var sub_folders = elements_folder.getFolders(); 
			
			for(var f = 0 ; f < sub_folders.length ; f++){
				var current_folder_path = sub_folders[f];
				var new_element_object = new OO.ElementFolder(current_folder_path);
				new_element_object.fetch_tvg_files_from_element_folder();
				MessageLog.trace("ELEMENT ----> "+new_element_object.get_name());
				elements_folders_object_array.push(new_element_object);					
			}
		}
	}


	this.copy_asset_elements_folders_to_bank = function(_asset_code){
		MessageLog.trace("test")
		this.fetch_elements_dir_from_scene_directory(); 
		for(var e = 0 ; e < elements_folders_object_array.length ; e++){
			current_obj = elements_folders_object_array[e]
			copy_paste_element_folder_to_bank(S.get_current_project(),current_obj,_asset_code)
		}

	}



	
    function copy_paste_element_folder_to_bank(_project,_element_obj,_asset_code)
    {
		
		var copy_element_bat_file_path = "P:\\pipeline\\alexdev\\proto\\OO_SceneManager_proto\\bin\\copy_element_folder_to_bank.bat"

        var command_string = copy_element_bat_file_path+' "'+_project+'" "'+_element_obj.get_folder_path()+'" "'+_element_obj.get_name()+'" "'+_asset_code;

		var process_copy_element_folder = new Process2(command_string);
		//var launch =process_copy_element_folder.launch();
		//var errors = process_copy_element_folder.errorMessage();

        MessageLog.trace(command_string)

		S.log.add("[ElementManager] "+command_string,"arguments")

		if(launch == 0){
			S.log.add("[ElementManager] "+launch+" = copy succeed","success")
		}else{
			S.log.add("[ElementManager] "+launch+" = copy failed","error")
		}

        return launch;

    }
	
	this.delete_element = function(){
		
		if(scene_elements_directory_path != ""){
			
			
			
		}

	}

	
}

MessageLog.trace("Class ElementManager")