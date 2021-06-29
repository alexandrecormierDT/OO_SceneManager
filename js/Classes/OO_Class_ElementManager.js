

OO.ElementManager = function (_S)
{

	var S = _S; 

	var elements_folders_object_array = [];
	var scene_folder_path = scene.currentProjectPathRemapped()
	var scene_elements_folder_path= scene_folder_path+"/elements/";; 

	var copy_bank_bat_file_path = "P:\\pipeline\\alexdev\\"+branch+"\\OO_SceneManager_"+branch+"\\bin\\copy_bank_to_element_folder.bat"
	var copy_element_bat_file_path = "P:\\pipeline\\alexdev\\"+branch+"\\OO_SceneManager_"+branch+"\\bin\\copy_element_folder_to_bank.bat"
	var copy_file_to_folder_bat_file_path = "P:\\pipeline\\alexdev\\"+branch+"\\OO_SceneManager_"+branch+"\\bin\\copy_file_to_folder.bat"
	
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
				//MessageLog.trace("ELEMENT ----> "+new_element_object.get_name());
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

				//MessageLog.trace(current_folder_path)

				split_slash = current_folder_path.split("/")
				element_name = split_slash[split_slash.length-1]

				var element_obj = {
					path:current_folder_path,
					name:element_name
				}

				
				if(element_obj.name.indexOf(_keyword)+""!=-1){
					elements_folders_object_array.push( element_obj);
				}		
				
				//MessageLog.trace("element_obj.name")
				//MessageLog.trace(element_obj.name)
				//MessageLog.trace(element_obj.path)
			}
		}
	}


	this.copy_asset_elements_folders_to_bank = function(_asset_code){
		copy_paste_element_folder_to_bank(S.get_current_project(),scene_elements_folder_path,_asset_code)
	}

	this.copy_bank_to_asset_elements_folders = function(_asset_code){
		copy_paste_bank_to_element_folder(S.get_current_project(),scene_elements_folder_path,_asset_code)
	}


    function copy_paste_element_folder_to_bank(_project,_elements_folder_path,_asset_code)
    {
		
        var copy_element_command_string = '"'+copy_element_bat_file_path+'" '+_project+' "'+_elements_folder_path+'" '+_asset_code

		S.log.add("[ElementManager] copy from scene elements to bank ","process")
		S.log.add("[ElementManager] "+copy_element_command_string,"arguments")
		S.deadline.submit_command_line_job(copy_element_command_string,_asset_code+"_SCENE_ELEMENT_COPY");

        return true;
    }

    function copy_paste_bank_to_element_folder(_project,_elements_folder_path,_asset_code)
    {
		
        var copy_bank_command_string = '"'+copy_bank_bat_file_path+'" '+_project+' "'+_elements_folder_path+'" '+_asset_code

		S.log.add("[ElementManager]  "+copy_bank_command_string,"arguments")
		S.deadline.submit_command_line_job(copy_bank_command_string,_asset_code+"_BANK_ELEMENT_COPY");

        return true;
    }

	function copy_paste_file_to_folder(file_path,folder_path){

		var copy_file_command_string =copy_file_to_folder_bat_file_path+' '+file_path+' '+folder_path;

		S.log.add("[ElementManager] "+copy_file_command_string,"arguments")
		S.deadline.submit_command_line_job(copy_file_command_string,"TVG_COPY");
	}

	this.get_used_tvg_in_node_array_at_frame = function (_node_path_array,_frame){
		var tvg_paths_array = []
		for(var n = 0 ; n <  _node_path_array.length ; n++ ){
			var current_node_path = _node_path_array[n]
			if(node.type(current_node_path)=="READ"){
				var element_id = node.getElementId(current_node_path);
				var current_drawing_sub_name = node.getTextAttr(current_node_path, _frame,"DRAWING.ELEMENT");
				//MessageLog.trace("element_id")
				//MessageLog.trace(element_id)
				//MessageLog.trace(current_drawing_sub_name)
				var tvg_path = ""
				tvg_paths_array.push(tvg_path)
			}
		}
		return tvg_paths_array;
	}

	this.copy_tvg_object_array_to_folder = function(_tvg_obj_array,_folder_path){
		try{
			var final_command_line = "";
			for(var t = 0 ; t <  _tvg_obj_array.length ; t++ ){
				var current_tvg_obj = _tvg_obj_array[t];
				var element_folder_path = backslash_to_slash(current_tvg_obj.get_element_folder_scene_path())
				var tvg_scene_path = backslash_to_slash(current_tvg_obj.get_scene_path())
				var folder_path_with_element_name = backslash_to_slash(_folder_path+"\\"+current_tvg_obj.element_name+"\\");

				var robocopy_line = "robocopy /s /lev:1 /MT /XC "+element_folder_path+" "+folder_path_with_element_name+" "+current_tvg_obj.sub_name; 
				final_command_line+=robocopy_line
				if(t<_tvg_obj_array.length-1){
					final_command_line+=" && "
				}
			}
			S.deadline.submit_command_line_job(final_command_line,"TVG_COPY_from_scene_to_library");
		}catch(error){
			S.log.add_script_error_object(error); 
		}
		return true; 
	}



	this.copy_elements_folder_to_scene = function(_source_elements_folder_path){

		try{
			var final_command_line = "";

			var folder_obj = new $.oFolder(_source_elements_folder_path)
			var sub_folders_array = folder_obj.getFolders();
	
			for(var f = 0 ; f < sub_folders_array.length ; f++ ){
				var current_folder_obj = sub_folders_array[f]

				var source_folder = current_folder_obj.path
				var dest_folder = backslash_to_slash(scene.currentProjectPathRemapped()+"\\elements\\"+current_folder_obj.name)
				var robocopy_line = "robocopy /s /lev:1 /MT /XC "+source_folder+" "+dest_folder; 

				final_command_line+=robocopy_line

				if(f<sub_folders_array.length-1){
					final_command_line+=" && "
				}
			}

			//MessageLog.trace(final_command_line)
			S.deadline.submit_command_line_job(final_command_line,"TVG_COPY_from_library_to_scene");

		}catch(error){
			S.log.add_script_error_object(error); 
		}



	}


	this.copy_posing_tvg_array_to_bank = function(_tvg_obj_array,_posing_name){
		try{
			for(var t = 0 ; t <  _tvg_obj_array.length ; t++ ){
				var current_tvg_obj = _tvg_obj_array[t];
				var element_folder_path = backslash_to_slash(current_tvg_obj.get_element_folder_scene_path());
				copy_paste_element_folder_to_bank(S.get_current_porject(),element_folder_path,_posing_name); 
			}
		}catch(error){
			S.log.add_script_error_object(error); 
		}
		return true; 
	}

		
   this.get_selected_tvg_obj_array_at_frame =function(_frame){
        var tvg_obj_array =[]

        var numSelLayers = Timeline.numLayerSel;
        for ( var i = 0; i < numSelLayers; i++ ){
			if ( Timeline.selIsNode(i)){
				var current_node_path = Timeline.selToNode(i);
				if(node.type(current_node_path)=="READ"){
					var tvg_obj = new OO.TVG(); 
					tvg_obj.node_path = current_node_path;
					tvg_obj.element_id = node.getElementId(current_node_path);
					tvg_obj.element_name = element.getNameById(tvg_obj.element_id)	
					//MessageLog.trace(tvg_obj.element_name)
					//MessageLog.trace(tvg_obj.element_id)
					if ( Timeline.selIsColumn(i)){
						var currentColumn = Timeline.selToColumn(i);
						if (column.type(currentColumn) == "DRAWING"){
							tvg_obj.sub_name=column.getDrawingName(currentColumn,_frame);
							//MessageLog.trace(tvg_obj.sub_name)
						}
						tvg_obj_array.push(tvg_obj)
					}
				}
			}
        }	
        return tvg_obj_array;	
    }
}

//MessageLog.trace("Class ElementManager")


function backslash_to_slash(_str){
	var str = _str+"";
	return str.replace(/\//g,"\\");
}