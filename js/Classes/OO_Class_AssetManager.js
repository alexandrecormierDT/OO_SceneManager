// CLASS OO_AssetManager

//MessageLog.trace("CLASS OO_AssetManager")

OO.AssetManager = function(_S){
	
	var S = _S; 
	
	this.list = [];
	
	this.scene_assets = [];
	
	this.project_assets = [];
	
	var breakdown = {};
	
	this.add = function(asset_param){
		
		var nAsset = new OO.Asset(asset_param);
		
		this.list.push(nAsset);
		
	}	
	
	this.get_asset_by_code = function(search_code,_list){
		
		for(var a = 0 ; a < this.list.length ; a++){
			
			var cura = this.list[a];
			
			if(cura.get_code() == search_code){
			
				return cura;
				
			}
			
		}
		
		return false;
		
	}
	
	
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
	//FETCHING DATA  FROM SHOTGUN
	
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	// SHOT SCENE
	
	this.load_breakdown = function(inputtype){
		
		var asset_list=[];
		
		var shot = S.context.get_shot();
		
		////MessageLog.trace("DETECTED SHOT");
		
		////MessageLog.trace(shot);
		
		switch(inputtype){
			
			case ('json'):
			
				////MessageLog.trace("LOAD JSON");
				
				var path = OO.sg_path+"/json/"+shot+".json";

				////MessageLog.trace(path);
				
				var json_string = new $.oFile(path).read();
				
				var obj_list = 	JSON.parse(json_string);
		
				////MessageLog.trace(Object.getOwnPropertyNames(obj_list));
				
				asset_list = obj_list.Assets;
				
			
			break;
			
			case ('xml'):
			
				//XML
				
			break;
			
			case ('csv'):
			
				// SAMPLE LINE : "1373","ep101_pl001","bg_ep101pl001_bil_ext_m_a1_ranch, pr_noissette_or","billy",
				
				var asset_codes = [];
			
				var path = OO.sg_path+"/csv/Shot.csv";
				
				var csv_file = new $.oFile(path);
				
				if(csv_file.exists){
					
					var csv_string = new $.oFile(path).read();
					
					var line_split = csv_string.split("\n");
					
					
					for (var l = 1 ; l < line_split.length ; l++){
						
						var second_split = line_split[l].split('"');
						
						if(second_split[3] == shot){
							
							var assets_string = second_split[5];
							
							var assets = assets_string.split(',');

							asset_codes = assets;
							
							break;
						}
						
					}
					
					for (var a = 0 ; a < asset_codes.length ; a++){
						
						var curac = asset_codes[a]; 
						
						var asset = {}
						
						asset.code = this.remove_spaces(curac);
						
						asset.sg_asset_type = S.context.get_type_from_asset_code(asset.code);
						
						asset_list.push(asset);
						
					}
					
				}else{
					
					Log.add(path+" don't exist");
				}
				
				
				
				
				
			break;			
			
			case ('python'):
			
				//python sub process call 
				
			break;
			
		}
		
		for(var a in asset_list){
			
			var curItem = asset_list[a];
			
			////MessageLog.trace("new asset param : ");
			////MessageLog.trace(Object.getOwnPropertyNames(curItem));
			
			var asset_param = asset_list[a];
			
			this.add(asset_param);
			
		}
		
		
		
	}
	
	// ASSET SCENE
	

	this.remove_spaces = function(str){
		
		return str.replace(/\s/g, '');
		
	}
	
	this.load_project_assets = function(inputtype){
		
		var project_asset_list = [];
		
		switch(inputtype){
			
			case ('json'):
				
			break;
			
			case ('xml'):
			

			break;
			
			case ('csv'):
			
				// SAMPLE LINE : "1656","pr_rocking_chair_billy","Prop","ep102_pl001, ep102_pl002, ep102_pl005, ep102_pl006, ep102_pl007, ep102_pl009, ep102_pl010","billy",
				//              0   1  2         3              4   5  6    7                                                                                      8  9     10
				
			
				var path = OO.sg_path+"/csv/Asset.csv";
				
				var csv_file = new $.oFile(path);
				
				if(csv_file.exists){
					
					var csv_string = new $.oFile(path).read();
					
					var line_split = csv_string.split("\n");
					
					
					
					for (var l = 1 ; l < line_split.length ; l++){
						
						var second_split = line_split[l].split('"');
						
						var asset_param = {
							
							id:second_split[1] != undefined ? this.remove_spaces(second_split[1]) : "",
							code:second_split[3] != undefined ? this.remove_spaces(second_split[3]) : "",
							sg_asset_type:second_split[5] != undefined ? this.remove_spaces(second_split[5]) : "",
							shots:[]
	
						};
						
						if(shot_string != undefined){
						
							var shot_string = second_split[7]
							
							var shots = shot_string.split(',');
							
							for (var s = 0 ; s < shots.length ; s++){
								
								var shot = this.remove_spaces(shots[s]);
								
								asset_param.shots.push(shot);
								
							}							
							
						}

						
						var new_asset  = new OO.Asset(asset_param);
						
						project_asset_list.push(new_asset);
						
					}
					

					
				}else{
					
					Log.add(path+" don't exist");
				}
				
			break;			
			
			case ('python'):
			
				//python sub process call 
				
			break;
			
		}
		
		this.project_assets = project_asset_list;
		
		return project_asset_list;
		
	}
	
	this.get_asset_shot_list = function(_asset_code){
		
		this.load_project_assets('csv'); 
		
		for(var a = 0 ; a < this.project_assets.length; a++){
			
			current_asset = this.project_assets[a]; 
			
			MessageLog.trace(current_asset.get_code());
			
			if(current_asset.get_code() == _asset_code){
				
				return current_asset.get_shots();
				
			}
			
		}
		
	}	
	

	
}
