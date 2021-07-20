OO.AssetDetector = function (_S){
	
	var S = _S
	var source_layer_path = ""
	var markers = ["ch","pr","bg","fx","refx","vh"]; 
	var detected_asset_code = ""; 
	var asset_group;
	
	this.set_source_layer_path = function(_slp){
		
		source_layer_path = _slp
		
	}
	
	function find_asset_code_in_source_layer_path(){
		
		// exemple of value : Top/CH_BILLY/myselectedlayer
		// exemple of value : Top/ch_billy/CH_BILLY-G/myselectedlayer
		var return_obj = {
			character:"",
			group:""
		}

		MessageLog.trace("source_layer_path")
		MessageLog.trace(source_layer_path)
 
		var tail = "";
		var character_found = false
		var slash_split =  source_layer_path.split("/"); 

		// we look for the name of the character in the node path

		for(var s= slash_split.length-1 ; s >= 0 ; s--){
			
			var current_split = slash_split[s]
			MessageLog.trace(current_split)
			
			var lower_case_split = current_split.toLowerCase()
			var underscore_split = lower_case_split.split("_"); 
			var before_underscore = underscore_split[0]

			if(character_found==false){

				if( markers.indexOf(before_underscore) != -1){

					MessageLog.trace("current_split");
					MessageLog.trace(current_split);
					var six_split = lower_case_split.split("-"); 
					//in case the group is named "CH_JC-G"

					
					if(six_split.length>1){
						return_obj.character =  six_split[0];
					}else{
						return_obj.character =  lower_case_split;
					}
					if(S.breakdown.get_asset_object_by_code(return_obj.character)!=false){
						character_found = true;
					}
					tail= current_split
				}

			}else{
				//rebuilding the path before the character name in reverse
				tail= current_split+"/"+tail
			}
			
		}

		return_obj.group= tail;

		return return_obj; 

	}	
	
	function find_portal_group_in_source_layer_path(){
		
		// exemple of value : Top/ch_billy/CH_BILLY-G/myselectedlayer
		
		var slash_split =  source_layer_path.split("/"); 

		var  group_name = "";
		var  group_path = "";
		for(var s=slash_split.length; s > 0 ; s--){
			var current_split = slash_split[s]; 
			var underscore_split = current_split.split("_"); 
			var before_underscore = underscore_split[0]
			if( markers.indexOf(before_underscore) != -1){
				group_name =current_split;
			}
		}

		var split_name = source_layer_path.split(group_name)
		var group_path = split_name[0]+group_name;
		var obj =  {path:group_path,name:group_name}
		return obj
	}
	
	this.get_asset_code = function(){
		
		detected_asset_code = find_asset_code_in_source_layer_path();
		return detected_asset_code.character
		
	}
	
	
	this.get_portal_group = function(){
		
		var portal_group_object = find_portal_group_in_source_layer_path();
		return portal_group_object;
		
	}
	
	this.get_asset_group = function(){
		
		detected_asset_code = find_asset_code_in_source_layer_path()
		asset_group = detected_asset_code.group
		return asset_group;
		
	}
	
}