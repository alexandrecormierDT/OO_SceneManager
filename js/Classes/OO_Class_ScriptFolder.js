// CLASS OO.TVG 

/*
 handle sub files in the tbscene folder
*/

OO.ScriptFolder = function (_folder_path){
	
	//convert to string
	var script_folder_path = _folder_path+"" ; 

	var tbstates_list = [];
	var script_list = [];
	var sub_folders = [];
	
	
	this.get_folder_path = function(){
		
		return script_folder_path; 
		
	}

	this.fetch_tbstates_files_from_script_folder = function(){
		
		if(script_folder_path != ""){
		
			var script_folder = new $.oFolder(script_folder_path);
			
			var tvg_files = script_folder.getFiles(); 
			
			for(var s = 0 ; s < tvg_files.length ; s++){
				
				var current_tvg_file_path = tvg_files[s];
				
				var new_tvg_object = new OO.TVG(current_tvg_file_path);
				
				//MessageLog.trace("SUB NAME --->"+new_tvg_object.get_sub_name()); 
				//MessageLog.trace("TVG NAME --->"+new_tvg_object.get_tvg_name()); 
				//MessageLog.trace("PREFIX NAME --->"+new_tvg_object.get_script_prefix()); 
				
				tvg_list.push(new_tvg_object);
				
			}
		
		}
		
	}
	
	this.create_sub_folder = function(){
		
		
	}
	
	this.move_tbstates_to_folder = function(_folder){
		
		
		
		
	}


	
	
}