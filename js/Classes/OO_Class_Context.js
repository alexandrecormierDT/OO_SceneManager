// CLASS OO_Stage
MessageLog.trace("CLASS OO_Context")


OO.Context = function (_type){
	
	//reference to the singleton
	context_type = _type
	
	this.set_context_type = function(_ctype){
		
		context_type = _ctype;
		
	}
	
	this.get_context_type = function(){
		
		return context_type;
	}
	
	this.breakdown_scene_path = function(){
		
		var scene_path = scene.currentProjectPathRemapped()
		
		var slash_split = scene_path.split("/");
		
		MessageLog.trace("SCEN PATH");
		MessageLog.trace(scene_path);
		MessageLog.trace(slash_split);
		
		return slash_split[slash_split.length-1];
		
	}
	
	
	this.get_type_with_asset_code = function(asset_code){
		
		MessageLog.trace("get_type_with_asset_code");
		
		var short_type = asset_code.split("_")[0];
		
		MessageLog.trace(short_type);
		
		var sg_asset_type = "notype";
		
		switch(short_type){
		
			case " bg":
			
				 sg_asset_type =  "bg";
			
			break;
			case " ch":
			
				sg_asset_type = "Character";
			
			break;			
			case " p":
			
				sg_asset_type = "Posing";
			
			break;
			case " pr":
			
				sg_asset_type = "Prop";
			
			break;			
			case " fx":
			
				sg_asset_type = "Fx";
			
			break;				
		}
		
		MessageLog.trace("FOUND TYPE : ");
		MessageLog.trace(sg_asset_type);
		
		return sg_asset_type;
		
	}
	
	this.read_episode_from_bg_code = function (bg_code){
		
		var split_underscore = bg_code.split("_");
		
		var shot_code = split_underscore[1];
		
		var conformed_shot_code = shot_code.splice(5, 0, "_");
		
		return conformed_shot_code;

	}
	
	
	this.get_episode = function(){
		
		this.breakdown_scene_path();
		
		switch(context_type){
			
			case("Shotgun"):
			
				return "ep201";
		
			break;
		
		}
		
	}
	
	this.get_shot = function(){
		
		switch(context_type){
		
			case("Shotgun"):
			
				return "ep101_pl002";
				
			break;
				
			case("Server"): 
			
				return "ep201_pl010";
			
				return this.breakdown_scene_path();
			
			break;		
		
		}
		
	}
	
	this.read_CSV = function(CSV_path){
		
		
		
		
	}
	

}

		
	
	
  
