// CLASS TO HANDLE FILES , PATHS , GLOBAL CONTEXT AND INTERACTIONS
OO.Context = function (_S,_type){
	
	var CONTEXT_TYPE = _type == undefined ? "Shotgun" : _type;
	var LIBRARY_PATH = "none";
	
	var S = _S;
	var sanitizer = new OO.Sanitizer();
	
	//temporary
	var PSD_PATH = "";
	var PNG_PATH = "";
	var SVG_PATH = "";
	var VIDEO_EXPORT_PATH = "";
	var BG_PREVIEW_PATH = "";
	
	var VAULT_PATH = OO.vault_path; 
	
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
	
	var BG_TASKS = ["pack_board","recherche","bg_layout","trait_couleur","fabrication","numerisation","retouche_ps","confo_ps","psd_to_nodes"]
	
	var DESIGN_TASKS = [""]
	
	
//---------------------------------------------------------------------------------------------------------------------------
	
	// SETTING GLOBAL PATHS : 
	
//---------------------------------------------------------------------------------------------------------------------------
	
	this.set_video_export_path = function(_vep){
	
		VIDEO_EXPORT_PATH = _vep
		
	}
	
	this.set_bg_preview_path = function(_bp){
	
		BG_PREVIEW_PATH = _bp
		
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
	
	this.get_master_asset_code = function(){
		
		return this.code; 
		
	}
	


	this.get_master_sg_asset_type = function(){
		
		return this.sg_asset_type; 
		
	}



//---------------------------------------------------------------------------------------------------------------------------

	// FETCHING INFOS ABOUT THE SCENE 

//---------------------------------------------------------------------------------------------------------------------------	
	
	this.breakdown_scene_path = function(){
		
		var scene_path = scene.currentProjectPathRemapped()
		var slash_split = scene_path.split("/");
		return slash_split;
		
	}

	function is_inside_the_vault(){
		
		var scene_path = scene.currentProjectPathRemapped()
		var slash_split = scene_path.split("\\");

		if(slash_split[0] == "P:" && slash_split[1] == ".vault"){
			return true; 
		}
		
		return false;
		
	}
	
	
	
	this.get_scene_path = function(){
		
		return scene.currentProjectPathRemapped()
		
	}
	
	this.set_from_scene_path = function(){
		
		// PATH EXEMPLES
		
		// P R O J E C T 
		
		// ASSET
		
		// P:,projects,billy,assets,Character,default,ch_mytestchar,work,a-cormier,design_main,toonboom,scenes
		// 0  1          2      3      4        5      6             7   8             9           10   11
		
		// SHOT
		
		// P:/projects/billy/pre_production_test/pipeline_dev/seuqence_test/ep222_pl001/animation/work/a-cormier/toonboom/scenes
		// 0    1        2        3                4              5             6            7       8     9        10      11
		
		// V A U L T
		
		// ASSET
		
		// P:,.vault,billy,assets,tbscene,Character,default,ch_mytestchar,puppet_rig,1
		// 0     1    2      3      4         5       6           7           8      9
		
		// SHOT
		
		// P:\.vault\billy\saison1\tbscene\ep101_chdor\ep101_sq020\ep101_pl019\blocking\2
		// 0      2    3      4         5      6              7        8           9     10
		
		
		var scene_path = this.breakdown_scene_path();
		
		var data = {};	
		
			if(scene_path[3] == 'assets'){
				
				//P:,projects,billy,assets,Character,default,ch_mytestchar,work,a-cormier,design_main,toonboom,scenes
				// 0  1          2      3      4        5      6             7   8             9           10   11
			
				this.entity == 'asset'; 
				this.project = scene_path[2];
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
				
			}else{

				//SHOT
				
				this.entity = "shot"; 
			
				if(scene_path[3] == "pre_shotgun"){
					
					//P:/projects/billy/pre_shotgun/batch_pool/xstages/saison1/ep101/ep101_pl105_animatic_v001
					//0  1          2      3           4          5       6       7    8 
					
					this.project = scene_path[2];
					this.division = scene_path[6];
					this.episode = scene_path[7];
					this.shot_code = scene_path[6];						
					this.scene_folder = scene_path[8];	
					this.shot_code = this.get_shot_code_from_scene_name();
					
				
					
				}else{
					
					// P:/projects/billy/pre_production_test/pipeline_dev/seuqence_test/ep222_pl001/animation/work/a-cormier/toonboom/scenes
					// 0    1        2        3                4              5             6            7       8     9        10      11
						
					this.project = scene_path[2];
					this.division = scene_path[3];
					this.episode = scene_path[4];
					this.sequence = scene_path[5];
					this.shot_code = scene_path[6];
					this.task = scene_path[7];				
					this.section = scene_path[8];				
					this.user = scene_path[9];				
					this.software = scene_path[10];				
					this.scene_folder = scene_path[11];				
				
					data.project = scene_path[2];
					data.division = scene_path[3];
					data.episode = scene_path[4];
					data.sequence = scene_path[5];
					data.shot = scene_path[6];
					data.task = scene_path[7];				
					data.section = scene_path[8];				
					data.user = scene_path[9];				
					data.software = scene_path[10];				
					data.scene_folder = scene_path[11];							
				}
			}

		return data; 

	}
	
	this.get_task = function(){
		return this.task; 
	}
	
	this.get_current_asset = function(){
		
		var data = this.set_from_scene_path();
		var current_asset = new OO.Asset(data.code);
		current_asset.sg_asset_type = data.sg_asset_type;
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

	this.get_shot = function(){
		this.set_from_scene_path();
		return this.shot_code;
	}
	
	this.get_episode = function(){
		this.set_from_scene_path();
		return this.episode;
	}
	
	this.get_asset_code = function(){
		this.set_from_scene_path();
		return this.asset_code;
	}	

//---------------------------------------------------------------------------------------------------------------------------

	// FIND DIRECTORY WHERE THE ASSET DATA IS STORED  --- won't be used much later
	
//---------------------------------------------------------------------------------------------------------------------------
	
	this.get_dir_path = function(_asset,_data_type,_departement){
		
		var asset = _asset != undefined ? _asset : false; 
		var data_type = _data_type != undefined ? _data_type : ""; 
		var departement = _departement != undefined ? _departement : "boxanim"; 
		var asset_type = _asset.get_type();
		var asset_code = _asset.get_code();	
		var dir_path = false; 
		
		if(asset != false){
			switch (data_type){
				case "png": 		
					dir_path = LIBRARY_PATH+"/"+departement+"/assets/"+asset_type+"/"+asset_code+"/png/"
					break;
				case "psd": 	
					dir_path = PSD_PATH;
					break;		
				case "tpl": 	
					dir_path = LIBRARY_PATH+"/"+departement+"/assets/"+asset_type+"/"+asset_code+"/master/"
					break;	
				case "svg":
					dir_path = SVG_PATH;
					break;
			}
		}
		
		return sanitizer.clean_path_slashes(dir_path); 
		
	}

	this.convert_psd_path_to_svg_path = function(_psd_path){

		var svg_path = _psd_path+"".split(".")[0]+".svg";
		return svg_path;

	}
	

	// used in many scripts : 
	this.get_asset_data_path = function(_asset,_data_type,_departement){
		
		var file_path = false; 
		var asset = _asset != undefined ? _asset : false;
		var data_type = _data_type != undefined ? _data_type : ""; 
		var departement = _departement != undefined ? _departement : "boxanim"; 
		
		if(asset != false){
	
			var asset_type = asset.get_type();
			var asset_code = asset.get_code()
			var dir_path = 	this.get_dir_path(asset,data_type,departement);
			
			switch (data_type){
				
				case "png":
					switch (asset_type){
						case ( "Character" ) : 
						case ( "Prop" ) : 
						case ( "Fx" ) : 
							file_path = dir_path+"/"+asset_code+".png";
							break; 
						case ("BG"): 
							file_path = this.find_latest_bg_file_in_vault(asset_code,data_type);	
							break; 
					}
		
				break; 
		
				case "psd":
					switch (asset_type){
						case ("BG"): 
							file_path = this.find_latest_bg_file_in_vault(asset_code,data_type);
						}
				break; 	
				case "svg": 
					switch (asset_type){
						case ( "Character" ) : 
						case ( "Prop" ) : 
						case ( "Fx" ) : 
						break; 
						case ("BG"): 				
							file_path = this.find_latest_bg_file_in_vault(asset_code,data_type);
						}
				break; 			
				
				case "tpl": 
					
					file_path = dir_path+"/"+asset_code+".tpl";
					
				break; 			
			}
		
		}
		
		return sanitizer.clean_path_slashes(file_path);
	}
	
	this.find_file_by_extension = function(_dir_path,_extension){

		var folder = new $.oFolder(_dir_path)
		var file_list = folder.getFiles("*."+_extension);
		if(file_list.length == 0){
			return false;
		}
		// return the last file in case the publish folder is a MESS !
		return file_list[file_list.length-1];
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

		MessageLog.trace(asset_code)
		
		if(_asset_type == "bg"){
			asset_type = "BG";
		}

		if(dir_type == "png" || dir_type == "svg"){
			//all those format are in the psd directory
			dir_type = "psd"
		}			
		
		var task_dir_path = VAULT_PATH+"/assets/"+dir_type+"/"+asset_type+"/default/"+asset_code+"/"+task+"/"

		MessageLog.trace(task_dir_path)

		var task_folder = new $.oFolder(task_dir_path);
		
		if(task_folder.exists){
			
			var latest_publish_dir = this.get_last_publish_dir(task_dir_path)
			if(latest_publish_dir!=false){
				
				var asked_file = this.find_file_by_extension(latest_publish_dir,data_type);
				if(asked_file!=false){
					S.log.add("found ( "+asked_file+" ) for asset ( "+asset_code+" ) ","success");
					return asked_file;
				}
			}
		}
		
		return false;
	
	}
	
	this.find_latest_bg_file_in_vault = function(_asset_code,_data_type){
		
		var asset_code = _asset_code;
		var data_type = _data_type;
		var asset_type = "BG";

		var vault_file_path = "";

		for(var i = BG_TASKS.length-1 ; i > 0 ; i --){
			
			var current_task = BG_TASKS[i]; 
			vault_file_path = this.get_last_task_publish(asset_code,asset_type,data_type,current_task)
			
			if( vault_file_path != false){
				
				return  vault_file_path;
			}

		}
		
		S.log.add("vault path not found ( "+vault_file_path+" )","error");
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
		return f.exists;
	}
	
	this.get_txt_path_from_png_path = function(_png_path){

		var txt_file_path = _png_path+".txt"
		var txt_file_object = new $.oFile(txt_file_path)
		
		if(txt_file_object.exists){
			return txt_file_path;
		}else{
			return false;  
		}
	}
	
	
	this.get_resolution_object_from_txt = function(_txt_path){
		
		var txt_file_object = new $.oFile(_txt_path)
		
		if(txt_file_object.exists){

				var txt_content = txt_file_object.read()
				var resolution_object = {
					width: parseFloat(txt_content.split('\n')[0]),
					height: parseFloat(txt_content.split('\n')[1])
				}
				return resolution_object;
			
		}else{
			S.log.add("can't find txt resoltion file ( "+_txt_path+" )","error"); 
			return false; 
		}	
		
	}
	
	
	
//---------------------------------------------------------------------------------------------------------------------------
	
	
	// PARSING STRING : 
	
	
//---------------------------------------------------------------------------------------------------------------------------
	
	
	
	this.get_type_from_asset_code = function(asset_code){

		var short_type = asset_code.split("_")[0];
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
			case "refx":
				sg_asset_type = "FX"; 
				break;				
		}
		
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
		}
		return result; 
	}	

}

MessageLog.trace("Class Context");		
	
	
  
