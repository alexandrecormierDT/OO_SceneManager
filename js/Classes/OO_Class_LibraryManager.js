// CLASS OO.LibraryManager

/*
 handle sub files in the tbscene folder


*/

OO.LibraryManager = function (_S){
		
	var root_folder_path = ""; 
	var current_folder_path = ""; 
	var S = _S
	
	var current_departement = ""; 
	var current_asset_code = ""; 
	var current_asset_type = ""; 
	var current_status = ""; 
	var current_tpl_list = [];

	this.set_root_folder_path = function (_rfp){
		
		root_folder_path = _rfp;
		
	}
	
	this.set_current_departement = function (_cd){
		
		current_departement = _cd;
		
	}
	
	this.set_current_asset_code = function (_cd){
		
		current_departement = _cd;
		
	}	
	
	this.set_current_asset_type = function (_at){
		
		current_asset_type = _at;
		
	}		
	
	this.set_current_status = function (_cd){
		
		current_status = _cd;
		
	}		
	
	function is_tpl_folder(_folder_path){
		
		
		
	}
	
	this.fetch_tpl_folders_from_current_folder  = function(){
		
		if(current_folder_path  != ""){
		
			var current_folder_object = new $.oFolder(element_folder_path);
			var sub_folder_path_array = current_folder_object.getFolders();
	
			for(var s = 0 ; s < sub_folder_path_array.length ; s++){
				
				var current_sub_folder_path = sub_folder_path_arrays[s];
				if(is_tpl_folder(current_sub_folder_path)){
					var new_tvg_object = new OO.TPL(current_sub_folder_path);
				}
			}
		}
	}

	this.parse_selected_tpl_to_object = function(){

		var selected_tpl_file_path = library.getSelectedTemplate(0);
		var library_tpl_object = S.tpl.parse_tpl_file_to_tpl_object(selected_tpl_file_path)
		return library_tpl_object

	}
	
}