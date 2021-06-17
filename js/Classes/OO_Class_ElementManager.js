

OO.ElementManager = function (_S)
{

	var S = _S; 

	var elements_folders_object_array = [];
	var scene_folder_path = scene.currentProjectPathRemapped()
	var scene_elements_folder_path= scene_folder_path+"/elements/";; 
	
	this.set_scene_folder_path = function(_scene_folder_path){
		scene_folder_path = _scene_folder_path;
		scene_elements_folder_path= scene_folder_path+"/elements/";
	}
	
	
	this.fetch_elements_dir_from_scene_directory = function(){
		if(scene_elements_folder_path!= ""){
			var elements_folder = new $.oFolder(scene_elements_directory_path);
			var sub_folders = elements_folder.getFolders(); 
			for(var f = 0 ; f < sub_folders.length ; f++){
				var current_folder_path = sub_folders[f];
				var new_element_object = new OO.ElementFolder(current_folder_path);
				//new_element_object.fetch_tvg_files_from_element_folder();
				MessageLog.trace("ELEMENT ----> "+new_element_object.get_name());
				elements_folders_object_array.push(new_element_object);					
			}
		}
	}



	this.fetch_element_dir_path_from_scene_directory_by_keyword = function(_keyword){
		if(scene_elements_folder_path!= ""){
			var elements_folder = new $.oFolder(scene_elements_directory_path);
			var sub_folders = elements_folder.getFolders(); 
			for(var f = 0 ; f < sub_folders.length ; f++){

				var current_folder_path = sub_folders[f]+"";

				MessageLog.trace(current_folder_path)

				split_slash = current_folder_path.split("/")
				element_name = split_slash[split_slash.length-1]

				var element_obj = {
					path:current_folder_path,
					name:element_name
				}

				
				if(element_obj.name.indexOf(_keyword)+""!=-1){
					elements_folders_object_array.push( element_obj);
				}		
				
				MessageLog.trace("element_obj.name")
				MessageLog.trace(element_obj.name)
				MessageLog.trace(element_obj.path)
			}
		}
	}

	this.copy_asset_elements_folders_to_bank = function(_asset_code){
		
		copy_paste_element_folder_to_bank(S.get_current_project(),scene_elements_folder_path,_asset_code)
	}



	
    function copy_paste_element_folder_to_bank(_project,_elements_folder_path,_asset_code)
    {
		
		var copy_element_bat_file_path = "P:\\pipeline\\alexdev\\proto\\OO_SceneManager_proto\\bin\\copy_element_folder_to_bank.bat"
        var command_string = copy_element_bat_file_path+' '+_project+' '+_elements_folder_path+' '+_asset_code+'';

		var process_copy_element_folder = new Process2(command_string);
		var launch =process_copy_element_folder.launch();
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
		
		if(scene_elements_folder_path!= ""){
			
			
			
		}

	}

	
}

MessageLog.trace("Class ElementManager")