// CLASS OO.TVG 
OO.TVG = function (){
	
	this.sub_name
	this.node_path
	this.element_id
	this.element_name
	this.sub_name = ""
	
	this.get_scene_path = function(){
		var path = scene.currentProjectPathRemapped()+"\\elements\\"+this.element_name+"\\"+this.sub_name
		return path
	}

	this.get_element_folder_scene_path = function(){
		var path = scene.currentProjectPathRemapped()+"\\elements\\"+this.element_name+"\\"
		return path
	}


	/*this.extract_sub_name_from_tvg_name = function(){
		var six_split = this.tvg_name.split("-")
		var last_split = six_split[six_split.length-1]; 
		var sub_name =last_split;	
		return sub_name; 
	}*/

	
}