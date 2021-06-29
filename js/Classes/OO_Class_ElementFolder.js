// CLASS OO.TVG 

/*
 handle sub files in the tbscene folder
*/

OO.ElementFolder = function (_folder_path){
	
	//convert to string
	var element_folder_path = _folder_path+"" ; 

	var tvg_object_array = [];
	
	this.extract_element_name_from_path = function(){
		var path_split = element_folder_path.split("/"); 
		var last_split = path_split[path_split.length-1];
		return last_split;

	}	
	
	this.get_folder_path = function(){
		return element_folder_path; 
	}
	
	this.get_name = function(){
		var element_name = this.extract_element_name_from_path(); 
		return element_name; 
	}

	this.fetch_tvg_files_from_element_folder = function(){
		
		if(element_folder_path != ""){
		
			var element_folder = new $.oFolder(element_folder_path);
			
			var tvg_files = element_folder.getFiles(); 
			for(var s = 0 ; s < tvg_files.length ; s++){
				
				var current_tvg_file_path = tvg_files[s];
				var new_tvg_object = new OO.TVG(current_tvg_file_path);
				//MessageLog.trace("SUB NAME --->"+new_tvg_object.get_sub_name()); 
				//MessageLog.trace("TVG NAME --->"+new_tvg_object.get_tvg_name()); 
				//MessageLog.trace("PREFIX NAME --->"+new_tvg_object.get_element_prefix()); 
				tvg_object_array.push(new_tvg_object);
				
			}
		}
		
	}
	
	this.delete_sub = function(_sub){
	}
	
	this.tvg_has_current_element_prefix = function(_sub){
	}
	
	this.get_array_of_subs_with_wrong_prefix = function(){
	}	
	
	this.delete_subs_with_wrong_prefix = function(){
	}
	
}