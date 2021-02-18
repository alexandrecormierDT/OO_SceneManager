// CLASS OO_Stage
MessageLog.trace("CLASS OO_Context")


OO.Context = function (_S,_type){
	
	//reference to the singleton
	var context_type = _type
	var S = _S;
	
	if(_S == ""){
	
		S = new OO.SceneManager();
	
	}
	
	
	this.breakdown_scene_path = function(){
		
		var scene_path = scene.currentProjectPathRemapped()
		
		var slash_split = scene_path.split("/");
		
		MessageLog.trace("SCEN PATH");
		MessageLog.trace(scene_path);
		MessageLog.trace(slash_split);
		
		return slash_split[slash_split.length-1];
		
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
			
				return "ep201_pl010";
				
			break;
				
			case("Server"): 
			
				return this.breakdown_scene_path();
			
			break;		
		
		}
		
	}
	

}

		
	
	
  
