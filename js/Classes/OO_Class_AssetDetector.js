OO.AssetDetector = function (){
	
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
		
		var slash_split =  source_layer_path.split("/"); 
		for(var s= 0 ; s < slash_split.length ; s++){
			
			var current_split = slash_split[s]; 
			var underscore_split = current_split.split("_"); 
			var before_underscore = underscore_split[0].toLowerCase()
			
			if( markers.indexOf(before_underscore) != -1){
			
				//MessageLog.trace("current_split");
				//MessageLog.trace(current_split);
				var six_split = current_split.split("-"); 

				//in case the group is named "CH_JC-G"
				if(six_split.length>1 && six_split[1]=="G"){
					return six_split[0]; 
				}else{
					return current_split; 
				}
			}
		}
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
		return detected_asset_code;
		
	}
	
	
	this.get_portal_group = function(){
		
		var portal_group_object = find_portal_group_in_source_layer_path();
		return portal_group_object;
		
	}
	
	this.get_asset_group = function(){
		
		detected_asset_code = find_asset_code_in_source_layer_path()
		var before_character = source_layer_path.split(detected_asset_code)[0];
		asset_group = before_asset_code+detected_asset_code
		return asset_group;
		
	}
	
}