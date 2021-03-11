// CLASS OO_Stage
//MessageLog.trace("CLASS OO_Context")

// CLASS TO HANDLE FILES , PATHS , GLOBAL CONTEXT AND INTERACTIONS


OO.Context = function (_type){
	
	var CONTEXT_TYPE = _type
	
	var LIBRARY_PATH = "none";
	
	//temporary
	var PSD_PATH = "";
	var PNG_PATH = "";
	var SVG_PATH = "";
	var VIDEO_EXPORT_PATH = "";
	
	
	this.project ="";
	this.entity = ""	
	this.sg_asset_type = ""
	this.code =""
	this.version = ""
	this.user =""		
	this.task =""		
	this.software = ""				
	this.tb_file_type =""
	
	//TODO MAKE ONE BIG FUNCTION FOR ALL THS : (set_path(type))
	
	this.set_video_export_path = function(_vep){
	
		VIDEO_EXPORT_PATH = _vep
		
	}
	
	this.set_psd_path = function(_pp){
		
		PSD_PATH = _pp
	}
	this.set_svg_path = function(_sp){
		
		SVG_PATH = _sp
	}	
	this.set_png_path = function(_pnp){
		
		PNG_PATH = _pnp
	}	
	
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
		
		return slash_split;
		
	}
	
	this.get_scene_path = function(){
		
		return scene.currentProjectPathRemapped()
		
	}
	
	this.set_from_scene_path = function(){
		
		//P:,projects,billy,assets,Character,default,ch_mytestchar,work,a-cormier,design_main,toonboom,scenes
		// 0  1          2      3      4        5      6             7   8             9           10   11
		
		var scene_path = this.breakdown_scene_path();
		
		this.project = scene_path[2];
		this.entity = scene_path[3];
		
		switch (this.entity){
			
			case 'assets': 
			
				this.sg_asset_type = scene_path[4];
				this.code = scene_path[6];
				this.version = scene_path[7];
				this.user = scene_path[8];				
				this.task = scene_path[9];				
				this.software = scene_path[10];				
				this.tb_file_type = scene_path[11];					
				
			break; 
			
			case 'shots': 
			
				this.division = scene_path[4];
				this.episode = scene_path[6];
				this.version = scene_path[7];
				this.user = scene_path[8];				
				this.task = scene_path[9];				
				this.software = scene_path[10];				
				this.tb_file_type = scene_path[11];				
			
				
			break;
		}

	}
	
	
	
	
	this.get_type_from_asset_code = function(asset_code){
		
		//MessageLog.trace("get_type_with_asset_code");
		
		var short_type = asset_code.split("_")[0];
		
		//MessageLog.trace(short_type);
		
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
		
		//MessageLog.trace("FOUND TYPE : ");
		//MessageLog.trace(sg_asset_type);
		
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
			//MessageLog.trace("SHOTCODE")
			//MessageLog.trace(shotcode)
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
	
	
	this.get_asset_png_dir_path = function(asset){
		
		dir_path = "";
		
		switch(CONTEXT_TYPE){
			
			case("Shotgun"):
			
				dir_path = PNG_PATH;
				
			break;
				
			case("Prototype"): 
			
				dir_path = ""
			
			break;		
			
			case("Server"): 
			
				dir_path = ""
			
			break;			
		}
		
		return dir_path;		

	}
	this.get_asset_svg_dir_path = function(asset){
		
		dir_path = "";
		
		switch(CONTEXT_TYPE){
			
			case("Shotgun"):
			
				dir_path = SVG_PATH;
				
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
	this.get_asset_psd_dir_path = function(asset){
		
		dir_path = "";
		
		switch(CONTEXT_TYPE){
			
			case("Shotgun"):
			
				dir_path = PSD_PATH;
				
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
		
		//if(this.file_exist(file_path)){
			
			return file_path
			
		//}
		
		return "";
		
	}
	
	this.get_psd_path = function(asset){
		
		var dir_path = this.get_asset_psd_dir_path(asset);
		
		var file_path = dir_path+asset.get_last_publish()+".psd";
		
		if(this.file_exist(file_path)){
			
			return file_path
			
		}else{
			
			//maybe the psd starts with lt instead of bg ? 
			
			file_path = dir_path+this.get_lt_path(asset)+".psd";
			
			//if(this.file_exist(file_path)){
				
				return file_path;
				
			//}
			 
		}
		
		return "";
		
		
	}
	
	
	this.get_png_path = function(asset){
		
		var dir_path = this.get_asset_png_dir_path(asset);
		
		var file_path = dir_path+asset.get_last_publish()+".png";
		
		if(this.file_exist(file_path)){
			
			return file_path
			
		}else{
			
			//maybe the psd starts with lt instead of bg ? 
			
			file_path = dir_path+this.get_lt_path(asset)+".png";
			
			//if(this.file_exist(file_path)){
				
				return file_path;
				
			//}
			 
		}
		
		return "";
		
		
	}	
	
	this.get_asset_code_without_type = function(asset_code){
		
		// CHANGE   "bg_ep102pl022_ded_ext"   TO   "ep102pl022_ded_ext"  
		
		//MessageLog.trace("get_asset_code_without_type");
		
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
			
			//MessageLog.trace(split1[i]);
			
		}
		
		//MessageLog.trace(result);
		
		return result; 
	}
		
	
	this.get_lt_path = function(asset,_type){
		
		var asset_code_notype = this.get_asset_code_without_type(asset.get_last_publish()); 
		
		var lt_code = "lt_"+asset_code_notype;
		
		return lt_code;
		
		
	}
	
	
	this.get_svg_path = function(asset){
		
		var dir_path = this.get_asset_svg_dir_path(asset);
		
		var file_path = dir_path+asset.get_last_publish()+".svg";
		
		if(this.file_exist(file_path)){
			
			return file_path
			
		}else{
			
			//maybe the psd starts with lt instead of bg ? 
			
			file_path = dir_path+this.get_lt_path(asset)+".svg";
			
			//if(this.file_exist(file_path)){
				
				return file_path
				
			//}
			
		}
		
		return "";
		
	}	
	
	this.file_exist = function(path){
		
		var f = new $.oFile(path)
		
		//OO.log.add(path+" exist ="+f.exists)
		
		//MessageLog.trace("FILE CHECK");
		//MessageLog.trace(path+" exist ="+f.exists);
		
		return f.exists;
		
	}
	
	this.generate_render_path = function(){
		
		var scene_name = scene.currentScene();
		
		var render_path =VIDEO_EXPORT_PATH+scene_name+".";
		
		return render_path;
		
	}
	 

	
	
}

		
	
	
  
