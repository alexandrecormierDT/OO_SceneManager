// CLASS OO.TVG 

/*
 handle sub files in the tbscene folder


*/

OO.ElementManager = function (_S){
	
	var S = _S;
	
	var element_list = [];
	
	var scene_elements_directory_path = ""; 
	
	this.set_scene_path = function(_scene_path){
		
		scene_elements_directory_path = _scene_path+"/elements/";
		
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
				
				element_list.push(new_element_object);					
						

			}
		
		}
		
	}
	
	this.delete_element = function(){
		
		if(scene_elements_directory_path != ""){
			
			
			
		}

	}

	
}