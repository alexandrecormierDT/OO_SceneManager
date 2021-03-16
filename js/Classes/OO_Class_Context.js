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
		MessageLog.trace("SVG_PATH");
		MessageLog.trace(SVG_PATH);
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
		
		
		// P:,projects,billy,assets,Character,default,ch_mytestchar,work,a-cormier,design_main,toonboom,scenes
		
		var scene_path = this.breakdown_scene_path();
		
		this.project = scene_path[2];
		this.entity = scene_path[3];
		
		var data = {};
		data.project = scene_path[2];
		data.entity = scene_path[3];		
		
		MessageLog.trace(scene_path);
		MessageLog.trace(scene_path[4]);
		
		switch (this.entity){
			
			case 'assets': 
			
				this.sg_asset_type = scene_path[4];
				this.code = scene_path[6];
				this.version = scene_path[7];
				this.user = scene_path[8];				
				this.task = scene_path[9];				
				this.software = scene_path[10];				
				this.tb_file_type = scene_path[11];			

				data.sg_asset_type = scene_path[4];
				data.code = scene_path[6];
				data.version = scene_path[7];
				data.user = scene_path[8];				
				data.task = scene_path[9];				
				data.software = scene_path[10];				
				data.tb_file_type = scene_path[11];					
				
			break; 
			
			case 'shots': 
			
				this.division = scene_path[4];
				this.episode = scene_path[6];
				this.version = scene_path[7];
				this.user = scene_path[8];				
				this.task = scene_path[9];				
				this.software = scene_path[10];				
				this.tb_file_type = scene_path[11];				
			
				data.division = scene_path[4];
				data.episode = scene_path[6];
				data.version = scene_path[7];
				data.user = scene_path[8];				
				data.task = scene_path[9];				
				data.software = scene_path[10];				
				data.tb_file_type = scene_path[11];		
				
			break;
		}
		
		return data; 

	}
	
	this.get_current_asset = function(){
		
		var data = this.set_from_scene_path();
		
		var current_asset = new OO.Asset({
			code: data.code,
			sg_asset_type: data.sg_asset_type,
		
		})
		
		MessageLog.trace(data.code)
		MessageLog.trace(data.sg_asset_type)
		
		return current_asset;

	}
	
	
	this.get_library_asset_path = function(_asset_code,_asset_type){
		
		var path =  LIBRARY_PATH+"/"+_departement+"/assets/"+_asset_type+"/"+_asset_code+"/png/"+_asset_code+".png";
		
		return path;
		
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
				//need to reed the csv here
				return this.get_shotcode_from_scene_name()
				
			break;
				
			case("Server"): 
			
				return this.get_shotcode_from_scene_name()
			
			break;		
		
		}
		
	}
	
	this.get_asset_code = function(){
		
		this.set_from_scene_path();
		
		return this.asset_code;
		
	}	
	
	//OLD FUNCTIONS
	
	this.get_asset_png_dir_path = function(_asset){
		
		var dir_path = this.get_dir_path(_asset,'png');	
		
		return dir_path;		

	}
	
	
	this.get_asset_svg_dir_path = function(_asset){
		
		dir_path = this.get_dir_path(_asset,'svg');	
		
		return dir_path;
	}	
	
		
	
	this.get_lt_path = function(_asset){
		
		var asset_code_notype = this.get_asset_code_without_type(_asset.get_last_publish()); 
		
		var lt_code = "lt_"+asset_code_notype;
		
		return lt_code;
		
		
	}
	
	
	this.get_svg_path = function(_asset){
		
		return this.get_asset_data_path(_asset,'svg')
		
	}	
	
	// FIND DIRECTORY WHERE THE ASSET DATA IS STORED (LIBRARY) 
	
	this.get_dir_path = function(_asset,_data_type,_departement){
		
		var asset = _asset != undefined ? _asset : false; 
		var data_type = _data_type != undefined ? _data_type : ""; 
		var departement = _departement != undefined ? _departement : ""; 
		
		var asset_type = _asset.get_type();
		var asset_code = _asset.get_code();	
		
		var dir_path = false; 
		
		if(asset != false){

			switch (data_type){
				
				case "png": 		
					
					switch(CONTEXT_TYPE){
						
						case("Shotgun"):
						
							if(asset_type =="bg"){
								
								dir_path = PNG_PATH;
								
							}else{
								
								dir_path = LIBRARY_PATH+"/"+departement+"/assets/"+asset_type+"/"+asset_code+"/png/"
								
							}
							
						break;
							
						case("Prototype"): 
						
							dir_path = LIBRARY_PATH+"/"+departement+"/assets/"+asset_type+"/"+asset_code+"/png/"
						
						break;		
						
						case("Server"): 
						
							dir_path = LIBRARY_PATH+"/"+departement+"/assets/"+asset_type+"/"+asset_code+"/png/"
						
						break;			
					}
								
				break;
				case "psd": 	
				
					switch(CONTEXT_TYPE){
						
						case("Shotgun"):
						
							// soon dirctly to shotgun folders in the vault
							
							dir_path = PSD_PATH;
							
						break;
							
						case("Prototype"): 
						
							dir_path = LIBRARY_PATH+"/"+departement+"/assets/"+asset_type+"/"+asset_code+"/psd/"
						
						break;		
						
						case("Server"): 
						
							dir_path = LIBRARY_PATH+"/"+departement+"/assets/"+asset_type+"/"+asset_code+"/psd/"
						
						break;			
					}			
					
				break;		
				case "tpl": 	
				
					switch(CONTEXT_TYPE){
						
						case("Shotgun"):
						
							dir_path = LIBRARY_PATH+"/"+departement+"/assets/"+asset_type+"/"+asset_code+"/master/"
							
						break;
							
						case("Prototype"): 
						
							dir_path = LIBRARY_PATH+"/"+departement+"/assets/"+asset_type+"/"+asset_code+"/master/"
						
						break;		
						
						case("Server"): 
						
							dir_path = LIBRARY_PATH+"/"+departement+"/assets/"+asset_type+"/"+asset_code+"/master/"
						
						break;			
					}				
				break;	
				
				case "svg": 
						
					switch(CONTEXT_TYPE){
						
						case("Shotgun"):
						
							dir_path = SVG_PATH;
							
						break;
							
						case("Prototype"): 
						
							dir_path = LIBRARY_PATH+"/"+departement+"/assets/"+asset_type()+"/"+asset_code+"/psd/"
						
						break;		
						
						case("Server"): 
						
							dir_path = LIBRARY_PATH+"/"+departement+"/assets/"+asset_type()+"/"+asset_code+"/psd/"
						
						break;	
						
					}
				
				break;
				
			}
		
		}
		
		return dir_path; 
	}
	
	// GET THE PATH OF THE REQUESTED ASSET DATA :
	
	this.get_asset_data_path = function(_asset,_data_type,_departement){
		
		var file_path = false; 
		
		var asset = _asset != undefined ? _asset : false; 
		var data_type = _data_type != undefined ? _data_type : ""; 
		var departement = _departement != undefined ? _departement : ""; 
		
		if(asset != false){
	
			var asset_type = _asset.get_type();
			var asset_code = _asset.get_last_publish()

			var dir_path = 	this.get_dir_path(asset,data_type,departement);
			
			switch (data_type){
				
				case "png": 

					switch (asset_type){
						
						case ( "Character" ) : 
						case ( "Prop" ) : 
						case ( "Fx" ) : 
							
							file_path = dir_path+"/"+asset_code+".png";
							
						break; 
						
						case ("bg"): 
						
							file_path = dir_path+"/"+asset_code+".png";
						
							if(this.file_exist(file_path)){

								
							}else{
								
								//maybe the psd starts with lt instead of bg ? 
								
								file_path = dir_path+this.get_lt_path(asset)+".png";
								 
							}			
							
						break; 

					}
		
				
				break; 
				
				case "psd": 
					
					file_path = dir_path+"/"+asset_code+".psd";
					
					if(this.file_exist(file_path)){
						
					}else{
						
						//maybe the psd starts with lt instead of bg ? 

						file_path = dir_path+this.get_lt_path(asset)+".psd";
						 
					}			
					
				break; 	
				case "svg": 
				
					dir_path = this.get_asset_svg_dir_path(asset);
					
					file_path = dir_path+"/"+asset_code+".svg";
					
					if(this.file_exist(file_path)){
						
					}else{
						
						//maybe the psd starts with lt instead of bg ? 
						
						file_path = dir_path+this.get_lt_path(asset)+".svg";
						
						MessageLog.trace("lt_file_path")
						
						MessageLog.trace(file_path)
						
					}			
					
				break; 			
				case "tpl": 
					
					file_path = dir_path+"/"+asset_code+".tpl";
					
				break; 			
			}
		
		}
		
		return file_path;
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
	 

	
	this.get_xli_of_png  = function(_pngpath){
		
		//TRY TO READ THIS : 
		
		/*
				
		<!DOCTYPE XLI>
		<XLI>
		 <LayoutPosition scale="3.000005722045898" translationZFields="0" translationYFields="-8.355551434330707" translationXFields="-10.53332813795944"/>
		 <ResolutionInfo requiredResolutionX="5760" requiredResolutionY="3240" scaleToRequiredResolution="1" resolutionX="5760" resolutionY="3240"/>
		</XLI>
			
		
		SPLIT " : 
		
		 <ResolutionInfo requiredResolutionX=,5760, requiredResolutionY=,3240, scaleToRequiredResolution=,1, resolutionX=,5760, resolutionY=,3240,/>
		   0                                   1           2                3                4            5      6         7        8         9
		*/
		
		var pngfile = new $.oFile(_pngpath)
		
		if(pngfile.exists){

			
			var nfile = new $.oFile(_pngpath+".xli")
			
			if(nfile.exists){
				
				var txti_content = nfile.read()
				
				var resolution = {
					width: parseFloat(txti_content.split('\n')[3].split('"')[1]),
					height:  parseFloat(txti_content.split('\n')[3].split('"')[3]),
				}
				
				MessageLog.trace("width");
				MessageLog.trace(resolution.width);
				MessageLog.trace("height");
				MessageLog.trace(resolution.height);
				
				return resolution;
				
			}else{
				
				return false; 
				
			}
			
		}else{
			
			return false; 
			
		}
		
		
	}
	
	
	this.get_txt_of_png = function(_pngpath){
		
		//CUSTOM TXT FORMAT CREATED BY THE VIEWS CLASS  : 
		
		/*
				
		*/
		
		var pngfile = new $.oFile(_pngpath)
		
		if(pngfile.exists){

			var nfile = new $.oFile(_pngpath+".txt")
			
			MessageLog.trace(nfile);
			
			if(nfile.exists){
				
				var txt_content = nfile.read()
				MessageLog.trace(txt_content);
				MessageLog.trace(txt_content.split('\n'));
				
				var resolution = {
					width: parseFloat(txt_content.split('\n')[0]),
					height: parseFloat(txt_content.split('\n')[1])
				}
				
				MessageLog.trace("width");
				MessageLog.trace(resolution.width);
				MessageLog.trace("height");
				MessageLog.trace(resolution.height);
				
				return resolution;
				
			}else{
				
				return false; 
				
			}
			
		}else{
			
			return false; 
			
		}		
		
	}
		
	
}

		
	
	
  
