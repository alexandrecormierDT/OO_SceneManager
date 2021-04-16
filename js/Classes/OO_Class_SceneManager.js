// CLASS OO_SceneManager

////MessageLog.trace("CLASS OO_SceneManager imported")

OO.SceneManager = function(){
	
	//access to the xstage throuht the class 
	
	this.stage = new OO.Stage(this);
	this.assets = new OO.AssetManager(this);
	this.trees = new OO.TreeManager(this);
	this.views = new OO.ViewManager(this);
	this.context = new OO.Context(this,"Shotgun");
	this.scene_files = new OO.SceneFilesManager(this);
	this.elements = new OO.ElementManager(this);
	this.portals = new OO.PortalManager(this);
	this.setups = new OO.SetupManager(this);
	this.log = new OO.Log(this);
	
	this.svg_reader = new SVG_reader(this);
	
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
	
	this.write_shot_burnin = function(_sceneinfos,_shotinfos,_date){
		
		var backdrop = this.get_backdrop_by_name("SHOT SCENE BURNIN");
		
		if(backdrop != false){
		
			//outputs : 
		
			var SCENE_INFOS = "Top/BURNIN_SCENE_INFOS";
			var SHOT_INFOS = "Top/BURNIN_SHOT_INFOS";
			var DATE = "Top/BURNIN_DATE";
			var FRAME = "Top/BURNIN_FRAME";
			var TIME_CODE = "Top/BURNIN_TIME_CODE";
			
			//values : 

			var v_scene_infos = OO.filter_string(_sceneinfos);
			var v_shot_infos = OO.filter_string(_shotinfos);
			var v_date_infos = OO.filter_string(_date);
			
			attribute_name = "PrintInfo";
			
			node.setTextAttr(SCENE_INFOS, attribute_name, frame.current(),v_scene_infos);
			node.setTextAttr(SHOT_INFOS, attribute_name, frame.current(),v_shot_infos);
			node.setTextAttr(DATE, attribute_name, frame.current(),v_date_infos);
			node.setTextAttr(FRAME, attribute_name, frame.current(),"");
			node.setTextAttr(TIME_CODE, attribute_name, frame.current(),"");
			
		}
		
	}	
	
	this.write_asset_burnin = function(_sceneinfos,_assetinfos,_date){
		
		var backdrop = this.get_backdrop_by_name("ASSET SCENE BURNIN");
		
		if(backdrop != false){
		
			//outputs : 
		
			var SCENE_INFOS = "Top/SCENE_INFOS";
			var ASSET_INFOS = "Top/ASSET_INFOS";
			var DATE = "Top/DATE";
			var FRAME = "Top/FRAME";
			
			//values : 
			
			
			// node.setTextAttr(myNode, "PALETTES.ADD", frame.current(), palettePath);
			
			var v_scene_infos = OO.filter_string(_sceneinfos);
			var v_asset_infos = OO.filter_string(_assetinfos);
			var v_date_infos = OO.filter_string(_date);
			
			attribute_name = "PrintInfo";
			
			node.setTextAttr(SCENE_INFOS, attribute_name, frame.current(),v_scene_infos);
			node.setTextAttr(ASSET_INFOS, attribute_name, frame.current(),v_asset_infos);
			node.setTextAttr(DATE, attribute_name, frame.current(),v_date_infos);
			node.setTextAttr(FRAME, attribute_name, frame.current(),"");
			
		}
		
	}	
	
	this.add_entry_to_scene_journal = function(_text){
		
		var backdrop = this.get_backdrop_by_name("SCENE JOURNAL");
		
		var time_stamp = OO.aujourdhui();
		
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
	


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	
	
	// READING XSTAGES SVG AND PSD
	
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	
	
	
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
				
				this.log.add("[SVG] searching layer cadre for ( "+shot+" ) ","process");
				
				var cadre = this.svg_reader.get_cadre(XMLobj,shot);
				
				// return false if no mathcing cadre with current shot where found in the svg
				
				if(cadre == false){
					
					
					this.log.add("[SVG] no cadre found for shot ( "+shot+" ) in ( "+svg_path+" ) ","error");

				}

				return cadre;

			}else{
				
				this.log.add("[SVG] problem with content of ( "+svg_path+" ) ","error");
				
				return false;	
				
			}			
			
		}else{
			
				this.log.add("[SVG] can't find svg file ( "+svg_path+" ) ","error");
				
				return false;			
			
		}

	}
	
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	
	
	// P O R T A L S 
	
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	
	
		
	
	
// there is a problem with characters and bg portals. some gap in the list , bg data end up in character 1

	


	this.create_asset_portals = function(_type,_point,_composite){

		// fetching assets and creating portals; 

		for(var a in this.assets.list){
			
			var current_asset = this.assets.list[a]; 
			
			var final_psd_path = this.context.get_asset_data_path(current_asset,'psd');
			var final_png_path = this.context.get_asset_data_path(current_asset,'png');
			var final_tpl_path = this.context.get_asset_data_path(current_asset,'tpl');
			
			var asset_code = current_asset.get_code()
			
			var asset_type = current_asset.get_type()

			if(asset_type == _type || asset_type == "all_type"){
				
				this.portals.creator.set_code( asset_code )
				this.portals.creator.set_sg_asset_type( asset_type )
				this.portals.creator.set_tpl_path( final_tpl_path )
				this.portals.creator.set_psd_path( final_psd_path )
				this.portals.creator.set_png_path( final_png_path )
				
				var nportal = this.portals.creator.create_portal(); 
				
				if(nportal!=false){
					
					this.portals.add(nportal); 
					
				}
				
				MessageLog.trace("*------------> creating portal for asset : ( "+asset_code+" ) TYPE  ( "+asset_type+" )");
				
			}

		}
		
		var portal_list = this.portals.get_list()


		if(portal_list.length > 0){
			
			//Placing portal trees in nodeview : 

			for(var p = 0 ; p < portal_list.length; p++){
				
				var cportal = portal_list[p]
				
				var cportal_tree = cportal.get_tree(); 
				
				if(p > 0){
					
					var pportal = portal_list[p-1];
					
					this.trees.put_next_to(pportal.get_tree(),cportal.get_tree(),100);
					
				}else{

					cportal_tree.moveTo(_point.x,_point.y);

				}
				
			}
			
			//	ungrouping them 
			
			for(var p = 0 ; p < portal_list.length; p++){
				
				var cportal = portal_list[p]
				
				var cportal_tree = cportal.get_tree(); 

				cportal_tree.ungroup();
				
				// i think the nodes pointers are lost after the ungroup; 
				
				//fix this with an id ? 
				

				if(typeof(_composite) != undefined ){
				
					var group = OO.doc.getNodeByPath("Top/"+cportal.get_code());
					
					MessageLog.trace("((((((((((((group"); 
					MessageLog.trace("Top/"+cportal.get_code()); 
					MessageLog.trace(group); 
					
					if(group != undefined){
						
						MessageLog.trace("node linked"); 
						group.linkOutNode(_composite)
						
					}
					
				}

			}

		}	 

	}
	
	this.get_scene_master_asset = function(){
		
		this.context.set_from_scene_path();
		
		var scene_master_asset = new OO.Asset({
			code: this.context.get_master_asset_code(),
			sg_asset_type:this.context.get_master_sg_asset_type()
		})
		
		return scene_master_asset;
		
	}
	
	this.create_single_asset_portal = function(_asset,_point,_composite){

		// fetching assets and creating portals; 
		
			

			var current_asset  = _asset; 
			
			var final_psd_path = this.context.get_asset_data_path(current_asset,'psd');
			var final_png_path = this.context.get_asset_data_path(current_asset,'png');
			var final_tpl_path = this.context.get_asset_data_path(current_asset,'tpl');
			var asset_code = current_asset.get_code()
			var asset_type = current_asset.get_type()
			
			this.portals.creator.set_code( asset_code )
			this.portals.creator.set_sg_asset_type( asset_type )
			this.portals.creator.set_tpl_path( final_tpl_path )
			this.portals.creator.set_psd_path( final_psd_path )
			this.portals.creator.set_png_path( final_png_path )
			
			var nportal = this.portals.creator.create_portal(); 
			
			if(nportal!=false){
				
				this.portals.add(nportal); 
				
				MessageLog.trace("*------------> creating portal for asset : ( "+asset_code+" ) TYPE  ( "+asset_type+" )");
				
				var nportal_tree = nportal.get_tree(); 
			
				nportal_tree.moveTo(_point.x,_point.y);

				nportal_tree.ungroup();

				var ungrouped_portal_group = OO.doc.getNodeByPath("Top/"+nportal.get_code());
					
				if(ungrouped_portal_group != undefined){
					
					MessageLog.trace("node linked"); 
					
					ungrouped_portal_group.linkOutNode(_composite)
					
				}					
				
				
			}
				
			
			
		}	 

	

}


