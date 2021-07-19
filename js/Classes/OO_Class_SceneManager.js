// CLASS OO_SceneManager

////////MessageLog.trace("CLASS OO_SceneManager imported")

OO.SceneManager = function(){
	
	var harmony_path = 'C:/Program Files (x86)/Toon Boom Animation/Toon Boom Harmony 20 Premium/win64/bin/HarmonyPremium.exe';
	
	this.stage = new OO.Stage(this);
	this.backdrops = new OO.BackdropManager(this);
	this.assets = new OO.AssetManager(this);
	this.breakdown = new OO.Breakdown(this);
	this.shotgrid = new OO.ShotgridReader(this);
	this.trees = new OO.TreeManager(this);
	this.views = new OO.ViewManager(this);
	this.context = new OO.Context(this);
	this.scene_files = new OO.SceneFilesManager(this);
	this.elements = new OO.ElementManager(this);
	this.posings = new OO.PosingManager(this);
	this.portals = new OO.PortalManager(this);
	this.setups = new OO.SetupManager(this);
	this.log = new OO.Log();
	this.render = new OO.RenderManager(this);
	this.version = new OO.SGVersion(this);
	this.deadline = new OO.DeadLineJobSubmiter(this);
	this.svg_reader = new OO.SVGReader(this);
	this.psd_reader = new OO.PSDReader(this);
	this.scene_settings = ""; 
	this.psd_importer = new OO.PSDImporter(this)
	this.tpl = new OO.TPLManager(this)
	this.library = new OO.LibraryManager(this)
	//this.bank = new OO.Bank(this)


	this.get_current_project = function(){
		return "billy";
	}

	this.get_current_user_name = function(){
		user_name = System.getenv("USERNAME");
		return user_name;
	}

	this.get_unique_id = function(){

		var k = Math.floor(Math.random() * 10000000);
		var m =k.toString();	
		return m ;		
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

	this.reset_resolution = function(){

		scene.setDefaultResolution (1920,1080, 41.112);
		scene.setFrameRate (25);

	}

	this.multiply_resolution_by = function(_factor){

		var rx =1920*_factor;
		var ry =1080*_factor;

		var fov = 41.112

		//MessageLog.trace("multiply_resolution_by")
		//MessageLog.trace(_factor)
		//MessageLog.trace(rx )
		//MessageLog.trace(ry )
		//MessageLog.trace(fov)

		scene.setDefaultResolution(rx,ry,fov);

	}

	this.get_harmony_path = function(){

		return harmony_path;

	}


	this.get_xstage_path = function(){

		var version_name = scene.currentVersionName(); 
		var scene_path = scene.currentProjectPathRemapped();
		var xstage_path = scene_path+"/"+version_name+".xstage";
		return xstage_path;

	}


	this.get_scene_folder_path = function(){

		var scene_path = scene.currentProjectPathRemapped();
		return scene_path;

	}


	//proto
	this.get_TLM_object_array =  function (){

		var obj_array = []

		for(var f = 0 ; f < frame.numberOf () ; f++ ){

				if(frame.hasTimelineMarker(f)){
					var obj = {
						note : frame.timelineMarkerNote (f),
						exportFrame : frame.timelineMarkerStart (f),
						exportLength : frame.timelineMarkerLength(f)
					}

					obj_array.push(obj);

				}

		}

		return obj_array;

	}
	
	this.write_shot_burnin = function(_sceneinfos,_shotinfos,_date){
		
		var backdrop = this.backdrops.get_backdrop_by_name("SHOT SCENE BURNIN");
		
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
		
		var backdrop = this.backdrops.get_backdrop_by_name("ASSET SCENE BURNIN");
		
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
		
		var backdrop = this.backdrops.get_backdrop_by_name("SCENE JOURNAL");
		
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
			
			var newbackdrop=this.backdrops.get_backdrop_by_name("SCENE JOURNAL");		
			 newbackdrop.color = white_color;

		}else{
			
			backdrop.body +=message
			
		}		
		
	}
	
	this.write_scene_path_backdrop = function(){
		
		var scene_path = scene.currentProjectPathRemapped() 
		var scene_infos = scene_path+"\n";	
		var backdrop = this.backdrops.get_backdrop_by_name("SCENE NAME");
		 
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
	



//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	
	
	// READING XSTAGES SVG AND PSD
	
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	
	
	
	this.load_xstage= function(){
		
		var xstageDOM = new $.oFile(OO.doc.stage).read();
		
		//we feed the scene xstage to the class
		return this.stage.parse_xml(xstageDOM);

	}


	this.get_departement_color = function(_departement){
		
		var departement_color = new $.oColorValue(OO.pipe_colors.dt[0]); 
		
		switch (_departement){
			
			case "design" : 
			
				departement_color = new $.oColorValue(OO.pipe_colors.design[0])
				
			break; 
			
			case "rig" : 
			
				departement_color = new $.oColorValue(OO.pipe_colors.rig[0])
				
			break;

			case "director" : 
				departement_color = new $.oColorValue(OO.pipe_colors.director[0])
			break;
			
			case "bg" : 
				departement_color = new $.oColorValue(OO.pipe_colors.bg[0])
			break;			
			case "layout" : 
				departement_color = new $.oColorValue(OO.pipe_colors.layout[0])
			break;
			
			case "anim" : 
				departement_color = new $.oColorValue(OO.pipe_colors.anim[0])
			break;	
			case "compo" : 
			
				departement_color = new $.oColorValue(OO.pipe_colors.compo[0])
			
			break;	
			case "boxanim" : 
			
				departement_color = new $.oColorValue(OO.pipe_colors.layout[0])
			
			break;
		}

		return departement_color;
		
		
		
	}
	

}

//MessageLog.trace("Class SceneManager ");

