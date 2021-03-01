// CLASS OO_SceneManager

MessageLog.trace("CLASS OO_SceneManager imported")

OO.SceneManager = function(){
	
	
	//access to the xstage throuht the class 
	this.stage = new OO.Stage(this);
	this.assets = new OO.AssetManager(this);
	this.trees = new OO.TreeManager(this);
	this.views = new OO.ViewManager(this);
	this.context = new OO.Context(this,"Shotgun");
	this.portals = new OO.PortalManager(this);
	this.setups = new OO.SetupManager(this);
	
	this.init = function(){
		
	}


	this.get_backdrop_by_name = function(bdname){

		var backdrops = OO.doc.root.backdrops;

		MessageLog.trace("BACKDROP");

		for(var b = 0 ; b < backdrops.length ; b++){

			if(backdrops[b].title == bdname){
				
				return backdrops[b];

			};
		}
	}
	
	this.load_breakdown = function(inputtype){
		
		var asset_list=[];
		
		var shot = this.context.get_shot();
		
		MessageLog.trace("DETECTED SHOT");
		
		MessageLog.trace(shot);
		
		switch(inputtype){
			
			case ('json'):
			
				MessageLog.trace("LOAD JSON");
				
				var path = OO.sg_path+"/json/"+shot+".json";

				MessageLog.trace(path);
				
				var json_string = new $.oFile(path).read();
				
				var obj_list = 	JSON.parse(json_string);
		
				MessageLog.trace(Object.getOwnPropertyNames(obj_list));
				
				asset_list = obj_list.Assets;
				
			
			break;
			
			case ('xml'):
			
				//XML
				
			break;
			
			case ('csv'):
			
				// SAMPLE LINE : "1373","ep101_pl001","bg_ep101pl001_bil_ext_m_a1_ranch, pr_noissette_or","billy",
				
				var asset_codes = [];
			
				var path = OO.sg_path+"/csv/Shot.csv";
				
				var csv_string = new $.oFile(path).read();
				
				var line_split = csv_string.split("\n");
				
				
				for (var l = 1 ; l < line_split.length ; l++){
					
					var second_split = line_split[l].split('"');

					MessageLog.trace(second_split[3]);
					
					if(second_split[3] == shot){
						
						var assets_string = second_split[5];
						
						var assets = assets_string.split(',');
						
						MessageLog.trace("----");
						MessageLog.trace("CSV ASSETS");
						MessageLog.trace("---'");
						MessageLog.trace(assets);
						MessageLog.trace("---");

						asset_codes = assets;
						
						break;
					}
					
				}
				
				for (var a = 0 ; a < asset_codes.length ; a++){
					
					var curac = asset_codes[a]; 
					
					var asset = {}
					
					asset.code = this.remove_spaces(curac);
					
					asset.sg_asset_type =this.context.get_type_from_asset_code(asset.code);
					
					MessageLog.trace("CSV");
					
					MessageLog.trace(asset.code);
					MessageLog.trace(asset.sg_asset_type);
					
					asset_list.push(asset);
					
				}
				
				
				
				
			break;			
			
			case ('python'):
			
				//python sub process call 
				
			break;
			
		}
		
		for(var a in asset_list){
			
			var curItem = asset_list[a];
			
			
			
			MessageLog.trace("new asset param : ");
			MessageLog.trace(Object.getOwnPropertyNames(curItem));
			
			var asset_param = asset_list[a];
			
			
			
			this.assets.add(asset_param);
			
			
		}
		
		
		
	}
	
	this.remove_spaces = function(str){
		
	
		return str.replace(/\s/g, '');
		
	}

	
	this.load_xstage= function(){
		
		var xstageDOM = new $.oFile(OO.doc.stage).read();
		
		//we feed the scene xstage to the class
		return this.stage.parse_xml(xstageDOM);

	}
	
	
	// extract rectangle coords from svg files (export from psd) 
	
	this.load_cadre = function(svg_path){
		
		var shot = this.context.get_shot();
		
		var svg_file_content = new $.oFile(svg_path).read();
		
		if(svg_file_content!=false && svg_file_content!="" && svg_file_content!=undefined){
			
			XMLobj = OO.XML.parse(svg_file_content,{ preserveAttributes: true });
			
			var cadre = OO.SVG.get_cadre(XMLobj,shot);
			
			// return false if no mathcing cadre with current shot where found in the svg
			
			return cadre;

			
			MessageLog.trace(final_path);
		}else{
			
			return false;
			
		}
		

	}

	this.create_asset_portals = function(_type,_point,_composite){

		// fetching assets and creating portals; 

		for(var a in this.assets.list){
			
			var cura = this.assets.list[a]; 
			
			MessageLog.trace("CREATE NEW PORTAL");
			
			MessageLog.trace(cura.get_code());
			
			var final_tpl_path =   this.context.get_tpl_path(cura);
			
			var final_psd_path =   this.context.get_psd_path(cura);
			
			var asset_type = cura.get_type()
			
			var asset_code = cura.get_code()
			
			var asset_id = cura.get_id()

			if(asset_type == _type || asset_type == "all_type"){

				var nportal = this.portals.add(asset_code,asset_type,final_tpl_path,final_psd_path);	
				
				nportal.id = asset_id;

			}

		}


		if(this.portals.list.length > 0){
			
			//Placing portal trees in nodeview : 

			for(var p = 0 ; p < this.portals.list.length; p++){
				
				var cportal = this.portals.list[p]
				
				if(p > 0){
					
					var pportal = this.portals.list[p-1];
					
					this.trees.put_next_to(pportal.tree,cportal.tree,100);
					
				}else{

					
					cportal.tree.moveTo(_point.x,_point.y);

				}
				
			}
			
			//	ungrouping them 
			
			for(var p = 0 ; p < this.portals.list.length; p++){
				
				var cportal = this.portals.list[p]

				cportal.tree.ungroup();
				
				// i think the nodes pointers are lost after the ungroup; 
				
				//fix this with an id ? 
				



				if(typeof(_composite) != undefined ){

					var group = OO.doc.getNodeByPath("Top/"+cportal.code);
				
					//group.createAttribute(attrName, type, displayName, linkable)

					group.linkOutNode(_composite)
					


				}

				
				
			}

		}	


	}
	
	
}


