// CLASS OO_Stage
//MessageLog.trace("CLASS OO_Context")

// CLASS TO HANDLE FILES , PATHS , GLOBAL CONTEXT AND INTERACTIONS


OO.Context = function (_S,_type){
	
	var CONTEXT_TYPE = _type
	
	var LIBRARY_PATH = "none";
	
	var S = _S
	
	//temporary
	var PSD_PATH = "";
	var PNG_PATH = "";
	var SVG_PATH = "";
	var VIDEO_EXPORT_PATH = "";
	var BG_PREVIEW_PATH = "";
	
	var VAULT_PATH = ""; 

	
	this.project ="";
	this.entity = ""	
	this.sg_asset_type = ""
	this.code =""
	this.version = ""
	this.user =""		
	this.task =""		
	this.software = ""				
	this.tb_file_type =""
	
	//should later fecth from csv :
	
	var BG_TASKS = [
		"pack_board",
		"recherche",
		"bg_layout",
		"trait_couleur",
		"fabrication",
		"numerisation",
		"retouche_ps",
		"confo_ps",
		"psd_to_nodes"
	]
	
	var DESIGN_TASKS = [
	
	
	
	]
	
	
//---------------------------------------------------------------------------------------------------------------------------
	
	// SETTING GLOBAL PATHS : 
	
//---------------------------------------------------------------------------------------------------------------------------
	
	this.set_video_export_path = function(_vep){
	
		VIDEO_EXPORT_PATH = _vep
		
	}
	
	this.set_bg_preview_path = function(_bp){
	
		BG_PREVIEW_PATH = _bp
		
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
	this.set_vault_path= function(_lp){
		
		VAULT_PATH = _lp;
		
	}		
	this.get_context_type = function(){
		
		return CONTEXT_TYPE;
	}
	
	
	






//---------------------------------------------------------------------------------------------------------------------------

	// FETCHING INFOS ABOUT THE SCENE 

//---------------------------------------------------------------------------------------------------------------------------	
	
	this.breakdown_scene_path = function(){
		
		var scene_path = scene.currentProjectPathRemapped()
		
		var slash_split = scene_path.split("/");
		
		return slash_split;
		
	}
	
	
	
	this.get_scene_path = function(){
		
		return scene.currentProjectPathRemapped()
		
	}
	
	
	
	// only for shotgun work scenes : 
	
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

	
	
	this.get_episode_from_scene_name = function(){
		
		//P:/projects/billy/pre_shotgun/batch_pool/xstages/test_scene/ep104_pl010_animatic_v001-1
		
		var scene_split = this.breakdown_scene_path();
		
		var scene_name = scene_split[scene_split.length-1] 
		
		var name_split = scene_name.split("_");
		
		var episode = name_split[0];

		return episode;
	}
	
	this.get_shot_code_from_scene_name = function(){
		
		//P:/projects/billy/pre_shotgun/batch_pool/xstages/test_scene/ep104_pl010_animatic_v001-1
		
		var scene_split = this.breakdown_scene_path();
		
		var scene_name = scene_split[scene_split.length-1] 
		
		var name_split = scene_name.split("_");
		
		var shot_code = name_split[0]+"_"+name_split[1];

		return shot_code;
	}
	
	this.generate_bg_preview_render_path = function(){
		
		var scene_name = scene.currentScene();
		
		var episode = this.get_episode_from_scene_name();
		
		var render_path =BG_PREVIEW_PATH+"/"+episode+"/"+scene_name+".";		
		
		return render_path;
		
	}
	
	this.generate_render_path = function(){
		
		var scene_name = scene.currentScene();
		
		var render_path =VIDEO_EXPORT_PATH+scene_name+".";
		
		return render_path;
		
	}	
	
	this.get_shotcode_from_scene_name = function(){
		
			//P:/projects/billy/pre_shotgun/batch_pool/xstages/test_scene/ep101_pl023_animatic_v001
		
			var scene_path = scene.currentScene().split("/")
			var scene_name = scene_path[scene_path.length-1]
			var shotcode = scene_name.split("_")[0]+"_"+scene_name.split("_")[1];
			//MessageLog.trace("SHOTCODE")
			//MessageLog.trace(shotcode)
			return shotcode;
		
	}
	
	this.get_shot = function(){

		return this.get_shot_code_from_scene_name()

	}
	
	this.get_episode = function(){

		return this.get_episode_from_scene_name()

	}
	
	this.get_asset_code = function(){
		
		this.set_from_scene_path();
		
		return this.asset_code;
		
	}	
	

	
	
	



//---------------------------------------------------------------------------------------------------------------------------
	
	//OLD FUNCTIONS
	
//---------------------------------------------------------------------------------------------------------------------------

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
	
	
	
	
	


//---------------------------------------------------------------------------------------------------------------------------

	// FIND DIRECTORY WHERE THE ASSET DATA IS STORED  --- won't be used much later
	
//---------------------------------------------------------------------------------------------------------------------------
	
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
						
							// png are not affected by departement branches, they need to have only one official version
							
							if(asset_type =="bg"){
								
								dir_path = PNG_PATH;
								
								
								
							}else{
								
								dir_path = LIBRARY_PATH+"/assets/"+asset_type+"/"+asset_code+"/png/"
								
							}
							
						break;
							
						case("Prototype"): 
						
							dir_path = LIBRARY_PATH+"/assets/"+asset_type+"/"+asset_code+"/png/"
						
						break;		
						
						case("Server"): 
						
							dir_path = LIBRARY_PATH+"/assets/"+asset_type+"/"+asset_code+"/png/"
						
						break;			
					}
								
				break;
				case "psd": 	
				
					switch(CONTEXT_TYPE){
						
						case("Shotgun"):
						
							// soon dirctly to shotgun folders in the vault
							
							dir_path = PSD_PATH;
							
						break;
						
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
				
					// tpl are fetched from the library 
				
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
	
	
	
	
	
	

	
	
//---------------------------------------------------------------------------------------------------------------------------
	
	// GET THE PATH OF THE REQUESTED ASSET DATA :
	
//---------------------------------------------------------------------------------------------------------------------------


	// used in many scripts : 
	
	this.get_asset_data_path = function(_asset,_data_type,_departement){
		
		var file_path = false; 
		
		var asset = _asset != undefined ? _asset : false; 
		var data_type = _data_type != undefined ? _data_type : ""; 
		var departement = _departement != undefined ? _departement : ""; 
		
		if(asset != false){
	
			var asset_type = _asset.get_type();
			var asset_code = _asset.get_code()

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
						
							var asset_type = asset_type.toUpperCase();
						
							//TEMPORARY DIRECTORY FIRST : 

							var temp_dir_path = "P:/projects/billy/pre_shotgun/batch_pool/directory/"+asset_type+"/"+asset_code+"/";
			
							file_path = this.find_file_by_extension(temp_dir_path,data_type);
							
							if(this.file_exist(file_path)== false){
								
								S.log.add("no png found in temp dir : "+temp_dir_path,"error")
								
								file_path = this.find_latest_bg_file_in_vault(asset_code,data_type);	
								
								MessageLog.trace("found png : ");
						
								MessageLog.trace(file_path);				
							}		
							
						break; 

					}
		
				
				break; 
				
				case "psd": 
				
					switch (asset_type){
						
						case ( "Character" ) : 
						case ( "Prop" ) : 
						case ( "Fx" ) : 
							
							
							
						break; 
						
						case ("bg"): 
							
							file_path = this.find_latest_bg_file_in_vault(asset_code,data_type);
							
							MessageLog.trace("found psd : ");
						
							MessageLog.trace(file_path);						
						}
	
					
				break; 	
				
				case "svg": 
				
					switch (asset_type){
						
					case ( "Character" ) : 
					case ( "Prop" ) : 
					case ( "Fx" ) : 
								
					break; 
						
					case ("bg"): 				
						
						file_path = this.find_latest_bg_file_in_vault(asset_code,data_type);
						
						MessageLog.trace("found svg : ");
						
						MessageLog.trace(file_path);
	

					}
					
				break; 			
				
				case "tpl": 
					
					file_path = dir_path+"/"+asset_code+".tpl";
					
				break; 			
			}
		
		}
		
		return file_path;
	}
	
	

	
	this.find_file_by_extension = function(_dir_path,_extension){
		
			var folder = new $.oFolder(_dir_path)
			var file_list = folder.getFiles("*."+_extension);
			
			MessageLog.trace(file_list);
			
			if(file_list.length == 0){
			
				return false;
				
			}
			
			return file_list
		
	}
	
	
	
		
	
	
	
	
	
//---------------------------------------------------------------------------------------------------------------------------	

	// SEARCHING IN THE VAULT 
	
//---------------------------------------------------------------------------------------------------------------------------
	
	// search for specified format fil in the specified task. 
	
	this.get_last_task_publish = function(_asset_code,_asset_type,_data_type,_task){
		
		// we look for publish files in the task directory 
		
		var asset_code = _asset_code;
		var asset_type = _asset_type;
		var data_type = _data_type;		
		var task = _task;		
		var dir_type = _data_type;
		
		if(_asset_type == "bg" || _asset_type == "BG" ){
			
			asset_type = _asset_type.toUpperCase();

		}
	
		if(dir_type == "png" || dir_type == "svg"){
		
			//all those format are in thepsd directory
			dir_type = "psd"
			
		}			
		
		var task_dir_path = VAULT_PATH+"/assets/"+dir_type+"/"+asset_type+"/default/"+asset_code+"/"+task+"/"
		
		var task_folder = new $.oFolder(task_dir_path);
		
		if(task_folder.exists){
			
			var latest_publish_dir = this.get_last_publish_dir(task_dir_path)
			
			if(latest_publish_dir!=false){
				
				var asked_file = this.find_file_by_extension(latest_publish_dir,data_type);
				
				if(asked_file!=false){
				
					S.log.add("found ( "+asked_file+" ) for asset ( "+asset_code+" ) ","success");
					
					return asked_file;
					
				}else{
					
					return false;
				}
				
			}else{
				
				return false;
			}
			
		}else{
			
			return false;
			
		}
		
		
	}
	
	this.find_latest_bg_file_in_vault = function(_asset_code,_data_type){
		
		var asset_code = _asset_code;
		var asset_type = "BG";
		var data_type = _data_type;
		var dir_type = _data_type

		//starting at the last task by order of fabrication. 
		
		var empty_dirs = "";
		
		// 

		for(var i = BG_TASKS.length ; i > 0 ; i --){
			
			var current_task = BG_TASKS[i]; 
			
			var vault_file_path = this.get_last_task_publish(asset_code,asset_type,data_type,current_task)
			
			if( vault_file_path != false){
				
				return  vault_file_path;
			}

		}
		
		S.log.add("no published bg ( "+_data_type+" ) found for asset ( "+_asset_code+" )","error");
		
		return false;
		
	}
	
	this.get_task_dirs = function(_dir_path){
		
		var dir = new $.oFolder(_dir_path); 
		
		var sub_folders = dir.folders;
		
		if(sub_folders.length > 0){
		
			return sub_folders;
		
		}
		
		return false; 		
		
	}

	
	
	this.get_last_publish_dir = function(_dir_path){
		
		var dir = new $.oFolder(_dir_path); 
		
		var sub_folders = dir.folders;
		
		MessageLog.trace(sub_folders);
		
		if(sub_folders.length > 0){
		
			return sub_folders[sub_folders.length-1];
		
		}
		
		return false; 
		
	}






//---------------------------------------------------------------------------------------------------------------------------

	//OTHER FUNCTIONS 

//---------------------------------------------------------------------------------------------------------------------------

	this.file_exist = function(path){
		
		var f = new $.oFile(path)
		
		//OO.log.add(path+" exist ="+f.exists)
		
		//MessageLog.trace("FILE CHECK");
		//MessageLog.trace(path+" exist ="+f.exists);
		
		return f.exists;
		
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
	
	
	
	
//---------------------------------------------------------------------------------------------------------------------------
	
	
	// PARSING STRING : 
	
	
//---------------------------------------------------------------------------------------------------------------------------
	
	
	
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
	
	this.get_bg_infos_from_name = function(bg_name){
		
		
		// name exemple : bg_ep101pl023_bos_j_a2_chemin_jack

		var firstsplit = bg_name.split("_")[1]
		
		var result = {
			bg_type :  bg_name.split("_")[0],			
			episode :   firstsplit.substring(0, 5),
			shot_number : firstsplit.substring(5, 10),
			shot_code : episode+"_"+shot_number
		}

		return result; 
		
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
	
	
	
		
	
}

		
	
	
  
