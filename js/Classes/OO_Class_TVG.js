// CLASS OO.TVG 

/*
 handle sub files in the tbscene folder


*/
//rename as TVG for later the concept is no clear 
//and element in lemet folder. 

OO.TVG = function (_path){
	
	var tvg_path = _path+""; 

	this.extract_tvg_name_from_path = function(){
		
		// P:/pipeline/alexDT/Harmony20/Context_scenes/ElementManager/Dirty_scene/elements//MYDRAWING/MYDRAWING-h.tvg
		
		var path_split = tvg_path.split("/"); 
		var last_split = path_split[path_split.length-1];
		return last_split;
		
	}
	
	var tvg_name = this.extract_tvg_name_from_path(); 
	
	this.extract_sub_name_from_tvg_name = function(){
		
		var six_split = tvg_name.split("-")
		var last_split = six_split[six_split.length-1]; 
		var without_extension = last_split.split(".")[0];
		return last_split;
	}
	
	var sub_name = this.extract_sub_name_from_tvg_name(); 
	
	this.extract_element_prefix_from_tvg_name = function(){
			
		var six_split = tvg_name.split("-")
		var before_last_split = six_split[six_split.length-2]; 
		var element_prefix = before_last_split;	
		return element_prefix; 
		
		
	}
	
	var element_prefix = this.extract_element_prefix_from_tvg_name();
	
	
	
	this.get_sub_name = function(){
		
		return sub_name; 
		
	}
	
	this.get_tvg_name = function(){
		
		return tvg_name; 
		
	}

	this.get_path = function(){
		
		return sub_path; 
		
	}
	
	this.get_element_prefix = function(){
		
		return element_prefix; 
		
	}
	

	
	
	
}