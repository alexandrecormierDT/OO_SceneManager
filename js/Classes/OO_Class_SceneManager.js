// CLASS OO_SceneManager

////MessageLog.trace("CLASS OO_SceneManager imported")

OO.SceneManager = function(){
	
	//access to the xstage throuht the class 
	
	this.stage = new OO.Stage(this);
	this.assets = new OO.AssetManager(this);
	this.trees = new OO.TreeManager(this);
	this.views = new OO.ViewManager(this);
	this.context = new OO.Context(this,"Shotgun");
	this.portals = new OO.PortalManager(this);
	this.setups = new OO.SetupManager(this);
	this.log = new OO.Log(this);
	

	
	this.init = function(){
		
		
		
	}
	
	this.update_render_path = function(writer_node,render_path) {
		
			
			node.setTextAttr(writer_node, "EXPORT_TO_MOVIE",1,"Output Movie")
			node.setTextAttr(writer_node, "MOVIE_PATH",1,render_path);
			
			this.log.add("setting export video to "+render_path,"file");
			
			
	}
	
	this.set_scene_settings  = function(ss){
		
		scene.setDefaultResolution (ss.RES_X, ss.RES_Y, ss.FOV);
		scene.setFrameRate (ss.FRAME_RATE);

	}
	
	
	this.add_entry_to_scene_journal = function(_text){
		
		var backdrop = this.get_backdrop_by_name("SCENE JOURNAL");
		
		var time_stamp = Date();
		
		var white_color = new $.oColorValue("#999999FF")		
		var black_color = new $.oColorValue("#000000FF")	

		var message = "\n\n"+time_stamp+"\n\n      "+_text;
			 
		if(backdrop == false){
			
			var myBackdrop =
			{
			  "position"    : {"x": 7000, "y" :200, "w":1000, "h":2000},
			  "title"       : {"text" : "SCENE JOURNAL", "color" :black_color.toHex(), "size" : 20, "font" : "Arial"},
			  "description" : {"text" : message, "color" :black_color.toHex() , "size" : 11, "font" : "Arial"},
			  "color"       : white_color.toHex() 
			};		

			Backdrop.addBackdrop("Top", myBackdrop);
			
			var newbackdrop=this.get_backdrop_by_name("SCENE JOURNAL");		
			 newbackdrop.color = white_color;

			

		}else{
			
			backdrop.body +=message
			
		}		
		
	}
	
	this.write_scene_path_backdrop = function(){
		
		var scene_path = scene.currentProjectPathRemapped() 
		
		var scene_infos = scene_path+"\n";
	
		/*
		
		
		<backdrop topLeft="-3212,323" bottomRight="-1360,490">
		  <background color="#323232FF"/>
		  <title text="SCENE NAME" color="#000000FF" size="12" font="Arial"/>
		  <description text="" color="#000000FF" size="12" font="Arial"/>
		 </backdrop>
				 
		var myBackdrop =
		{
		  "position"    : {"x": -100, "y" :-100, "w":300, "h":300},
		  "title"       : {"text" : "My Title", "color" : fromRGBAtoInt(255, 100, 100, 255), "size" : 14, "font" : "Arial"},
		  "description" : {"text" : "This is a new backdrop that will include the node covered by its area.\n", "color" : fromRGBAtoInt(100, 255, 100, 255), "size" : 14, "font" : "Arial"},
		  "color"       : fromRGBAtoInt(100, 100, 0, 255)
		};
		Backdrop.addBackdrop("Top/MyGroup", myBackdrop);		 
				 
		 
		 
		 */		
		 
		var backdrop = this.get_backdrop_by_name("SCENE NAME");
		 
		if(backdrop == false){
			
			var myBackdrop =
			{
			  "position"    : {"x": -3212, "y" :-1360, "w":1000, "h":100},
			  "title"       : {"text" : "SCENE NAME", "color" :"#FFFFFFFF", "size" : 14, "font" : "Arial"},
			  "description" : {"text" : scene_path, "color" :"#FFFFFFFF", "size" : 14, "font" : "Arial"},
			  "color"       : "#000000FF"
			};		

			Backdrop.addBackdrop("Top", myBackdrop);		

		}else{
			
			backdrop.body = scene_path;
			
		}

	}
	

	this.get_backdrop_by_name = function(bdname){

		var backdrops = OO.doc.root.backdrops;

		////MessageLog.trace("BACKDROP");
		
		var match = 0; 

		for(var b = 0 ; b < backdrops.length ; b++){

			if(backdrops[b].title == bdname){
				
				match++;
				
				return backdrops[b];
				

			};
		}
		
		if(match==0){
			
			return false;
		}
	}
	
	this.load_breakdown = function(inputtype){
		
		var asset_list=[];
		
		var shot = this.context.get_shot();
		
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

						////MessageLog.trace(second_split[3]);
						
						if(second_split[3] == shot){
							
							var assets_string = second_split[5];
							
							var assets = assets_string.split(',');
							
							////MessageLog.trace("----");
							////MessageLog.trace("CSV ASSETS");
							////MessageLog.trace("---'");
							////MessageLog.trace(assets);
							////MessageLog.trace("---");

							asset_codes = assets;
							
							break;
						}
						
					}
					
					for (var a = 0 ; a < asset_codes.length ; a++){
						
						var curac = asset_codes[a]; 
						
						var asset = {}
						
						asset.code = this.remove_spaces(curac);
						
						asset.sg_asset_type =this.context.get_type_from_asset_code(asset.code);
						
						////MessageLog.trace("CSV");
						
						////MessageLog.trace(asset.code);
						////MessageLog.trace(asset.sg_asset_type);
						
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
	
	this.load_cadre_from_psd = function(psd_path){
		
		MessageLog.trace("LOAD FROM PSD");
		
		var shot = this.context.get_shot();
		
		var group_info = CELIO.getLayerGroupInformation (psd_path);
		
		MessageLog.trace(group_info);
		
	}
	
	this.load_cadre = function(svg_path){
		
		var shot = this.context.get_shot();
		
		var svg_file = new $.oFile(svg_path);
		
		if(svg_file.exists){
			
			var svg_file_content = svg_file.read();
			
			if(svg_file_content!=false && svg_file_content!="" && svg_file_content!=undefined){
				
				XMLobj = OO.XML.parse(svg_file_content,{ preserveAttributes: true });
				
				var cadre = OO.SVG.get_cadre(XMLobj,shot);
				
				// return false if no mathcing cadre with current shot where found in the svg
				
				return cadre;

			}else{
				
				this.log.add("SVG problem with content of "+svg_path,"error");
				
				return false;	
				
			}			
			
		}else{
			
				this.log.add("SVG can't find svg file - "+svg_path,"error");
				
				return false;			
			
		}

	}
	
	
	
	
// there is a problem with characters and bg portals. some gap in the list , bg data end up in character 1

	this.create_asset_portals = function(_type,_point,_composite){

		// fetching assets and creating portals; 

		for(var a in this.assets.list){
			
			var cura = this.assets.list[a]; 
			
			var final_tpl_path = this.context.get_tpl_path(cura);
			
			var final_psd_path = this.context.get_psd_path(cura);
			
			var final_png_path = this.context.get_png_path(cura);
			
			var asset_code = cura.get_code()
			
			var asset_type = cura.get_type()
			

			if(asset_type == _type || asset_type == "all_type"){

				
				var nportal = this.portals.add(asset_code,asset_type,final_tpl_path,final_psd_path,final_png_path);	

				MessageLog.trace("*------------> creating portal for asset : "+asset_code+" type "+asset_type);
				MessageLog.trace("*------------> final_tpl_path : "+final_tpl_path)
				MessageLog.trace("*------------> final_psd_path : "+final_psd_path)
				MessageLog.trace("*------------> final_png_path : "+final_png_path)
				
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
					
					if(group != undefined) {
						
						group.linkOutNode(_composite)
						
					}

				}

			}

		}	


	}
	
	
}


