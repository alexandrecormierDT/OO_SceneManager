// CLASS OO_Stage
MessageLog.trace("CLASS OO_Context")

// CLASS TO HANDLE FILES , PATHS , GLOBAL CONTEXT AND INTERACTIONS


OO.Context = function (_type){
	
	CONTEXT_TYPE = _type
	
	LIBRARY_PATH = "none";
	
	this.set_context_type = function(_ctype){
		
		CONTEXT_TYPE = _ctype;
		
	}
	
	this.set_library_path= function(_lp){
		
		LIBRARY_PATH = _lp;
		
	}
		
	this.get_context_type = function(){
		
		return CONTEXT_TYPE;
	}
	
	this.breakdown_scene_path = function(){
		
		var scene_path = scene.currentProjectPathRemapped()
		
		var slash_split = scene_path.split("/");
		
		MessageLog.trace("SCEN PATH");
		MessageLog.trace(scene_path);
		MessageLog.trace(slash_split);
		
		return slash_split[slash_split.length-1];
		
	}
	
	
	this.get_type_from_asset_code = function(asset_code){
		
		MessageLog.trace("get_type_with_asset_code");
		
		var short_type = asset_code.split("_")[0];
		
		MessageLog.trace(short_type);
		
		var sg_asset_type = "notype";
		
		switch(short_type){
		
			case "bg":
			
				 sg_asset_type =  "bg";
			
			break;
			case "ch":
			
				sg_asset_type = "Character";
			
			break;			
			case "p":
			
				sg_asset_type = "Posing";
			
			break;
			case "pr":
			
				sg_asset_type = "Prop";
			
			break;			
			case "fx":
			
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
		
		switch(CONTEXT_TYPE){
			
			case("Shotgun"):
			
				return "ep201";
		
			break;
		
		}
		
	}
	
	
	this.get_shotcode_from_scene_name = function(){
		
			var scene_path = scene.currentScene().split("/")
			var scene_name = scene_path[scene_path.length-1]
			var shotcode = scene_name.split("_")[0]+"_"+scene_name.split("_")[1];
			MessageLog.trace("SHOTCODE")
			MessageLog.trace(shotcode)
			return shotcode;
		
	}
	
	this.get_shot = function(){
		
		switch(CONTEXT_TYPE){
		
			case("Shotgun"):
			
				//return "ep101_pl015";
				
				return this.get_shotcode_from_scene_name()
				
			break;
				
			case("Server"): 
			
				//return "ep201_pl010";
			
				return this.breakdown_scene_path();
			
			break;		
		
		}
		
	}
	
	this.get_asset_psd_dir_path = function(asset){
		
		dir_path = "";
		
		switch(CONTEXT_TYPE){
			
			case("Shotgun"):
			
				dir_path = "P:/projects/billy/layout/to_publish/ep102/psd/";
				
			break;
				
			case("Prototype"): 
			
				dir_path = LIBRARY_PATH+"assets/"+asset.get_type()+"/"+asset.get_code()+"/psd/"
			
			break;		
			
			case("Server"): 
			
				dir_path = LIBRARY_PATH+"assets/"+asset.get_type()+"/"+asset.get_code()+"/psd/"
			
			break;			
		}
		
		return dir_path;
		
	}
	
	this.get_asset_tpl_dir_path = function(asset){
		
		dir_path = "";
		
		switch(CONTEXT_TYPE){
			
			case("Shotgun"):
			
				dir_path = LIBRARY_PATH+"assets/"+asset.get_type()+"/"+asset.get_code()+"/M/"
				
			break;
				
			case("Prototype"): 
			
				dir_path = LIBRARY_PATH+"assets/"+asset.get_type()+"/"+asset.get_code()+"/M/"
			
			break;		
			
			case("Server"): 
			
				dir_path = LIBRARY_PATH+"assets/"+asset.get_type()+"/"+asset.get_code()+"/M/"
			
			break;			
		}
		
		return dir_path;
		
	}
	
	this.get_tpl_path= function(asset){
		
		var dir_path = this.get_asset_tpl_dir_path(asset);
		
		var file_path = dir_path+asset.get_last_publish()+".tpl";
		
		if(this.file_exist(file_path)){
			
			return file_path
			
		}
		
		return "";
		
	}
	
	this.get_psd_path = function(asset){
		
		var dir_path = this.get_asset_psd_dir_path(asset);
		
		var file_path = dir_path+asset.get_last_publish()+".psd";
		
		if(this.file_exist(file_path)){
			
			return file_path
			
		}else{
			
			//maybe the psd starts with lt instead of bg ? 
			
			file_path = this.get_lt_path(asset)+".psd";
			
			if(this.file_exist(file_path)){
				
				return file_path;
				
			}
			
		}
		
		return "";
		
		
	}
	
	this.get_asset_code_without_type = function(asset_code){
		
		// CHANGE   "bg_ep102pl022_ded_ext"   TO   "ep102pl022_ded_ext"  
		
		MessageLog.trace("get_asset_code_without_type");
		
		var split1 =  asset_code.split("_");
		
		var result = ""; 
		
		for(var i = 0 ; i < split1.length ; i++){
			
			if(i == 1){
				result +=split1[i];
			}
			if(i > 1){
				result +="_"
				result +=split1[i];
			}
			
			MessageLog.trace(split1[i]);
			
		}
		
		MessageLog.trace(result);
		
		return result; 
	}
		
	
	this.get_lt_path = function(asset){
		
		var asset_code_notype = this.get_asset_code_without_type(asset.get_last_publish()); 
		
		var lt_code = "lt_"+asset_code_notype;
		
		var dir_path = this.get_asset_psd_dir_path(asset);
		
		return dir_path+lt_code;
		
		
	}
	
	
	this.get_svg_path = function(asset){
		
		var dir_path = this.get_asset_psd_dir_path(asset);
		
		var file_path = dir_path+asset.get_last_publish()+".svg";
		
		if(this.file_exist(file_path)){
			
			return file_path
			
		}else{
			
			//maybe the psd starts with lt instead of bg ? 
			
			file_path = this.get_lt_path(asset)+".svg";
			
			if(this.file_exist(file_path)){
				
				return file_path
				
			}
			
		}
		
		return "";
		
	}	
	
	this.file_exist = function(path){
		
		var f = new $.oFile(path)
		
		//OO.log.add(path+" exist ="+f.exists)
		
		MessageLog.trace("FILE CHECK");
		MessageLog.trace(path+" exist ="+f.exists);
		
		return f.exists;
		
	}
	
	
	
}

		
	
	
  
