MessageLog.trace("SCENE MANAGER loading classes");
//IMPORT CLASSES : 

//object to store class without conflict
var OO = {}

$.batchMode = true;
//OpenHamrony class
OO.doc = $.scn;




//handy xml and svg parser 
OO.XML = require("P:/pipeline/extra_soft/pixl-xml-master/modified_xml.js");

// SVG PARSER CLASS
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/utils/SVG_reader.js");
OO.SVG = new SVG_reader();

//PATHS TO INJECT IN THE CONTEXT CLASS

OO.library_path = "P:/projects/billy/library/";
//OO.library_path = "P:/pipeline/alexDT/Harmony20/Context_library/";
OO.sg_path = "P:/projects/billy/pre_shotgun/sg_exports/";
OO.psd_path = "P:/projects/billy/pre_shotgun/batch_pool/bg/psd/";
OO.png_path = "P:/projects/billy/pre_shotgun/batch_pool/bg/png/";
OO.svg_path = "P:/projects/billy/pre_shotgun/batch_pool/bg/svg/";
OO.video_export_path = "P:/projects/billy/pre_shotgun/batch_pool/video/saison1/ep102/";

// PIPE COLORS :

OO.pipe_colors = {}; 
OO.pipe_colors.design = ["#246926ff","#4deb53ff"]
OO.pipe_colors.rig = ["#66571aff","#f0b129"]
OO.pipe_colors.anim = ["#7d412fff","#fa7f5aff"]
OO.pipe_colors.bg = ["#244369ff","#4f8edbff"]
OO.pipe_colors.layout = ["#327480ff","#5fdef5ff"]
OO.pipe_colors.compo = ["#6f2f80ff","##b248cfff"]
OO.pipe_colors.board = ["#5c411eff","#9e6d2eff"]
OO.pipe_colors.director = ["#6e6e6eff","#6e6e6eff"]
OO.pipe_colors.prod  = ["#ffffffff","#e0dedeff"]
OO.pipe_colors.dt  = ["#000000ff","#000000ff"]




//PROJECT SETTINGS

OO.project_settings = {
	
	NAMED_RES:"BILLY",
	FRAME_RATE : 25,
	RES_X : 1920,
	RES_Y : 1080,		
	FOV : 41.112	
	
}


OO.aujourdhui = function(){
	
	var date1 = new Date();

	var dateLocale = date1.toLocaleString('fr-FR',{
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'});

	return dateLocale;	
	
}



// FOLDER should be declared in previous include : OO_SceneManager_proto or master    enable to switch from folders proto(dev) and master(for users) 

//CLASSES
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_SceneManager.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Log.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Stage.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Asset.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_AssetManager.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Tree.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_TreeManager.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Portal.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_PortalManager.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_ViewManager.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_View.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Context.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_SetupManager.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Setup.js");



//FILTERS
OO.filter_string =function(str){

	var forbidden_chars = [];
	var clean_str = str;	
	return  clean_str;

}

//LOG

OO.log = new OO.Log("scenemanager_");



function log_test(){
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/log_test.txt");	
	
	S.log.add("test test","INFO");
	S.log.add("test test2","INFO");
	S.log.add("test test3","INFO");
	S.log.save();
	
}

// SCRIPT HELP 

function show_scene_infos(){
	
	var S = new OO.SceneManager();	

	S.context = new OO.Context("Shotgun");	
	
	S.context.set_from_scene_path();
	
	S.write_scene_path_backdrop();
	
	MessageBox.information(S.context.get_scene_path());
	
}


function write_scene_journal(){
	
	var S = new OO.SceneManager();	
	
	S.context = new OO.Context("Shotgun");	
	
	S.context.set_from_scene_path();
	
	S.write_scene_path_backdrop();
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/journal");
	
	var scene_path = S.context.get_scene_path();
	
	var message = "";
	
	var dialog = new Dialog();
	dialog.title = "SCENE JOURNAL (no accents)";
	dialog.width = 900;
	
	var userInput = new TextEdit();
	userInput.text = ""
	dialog.add( userInput );
		
	if (dialog.exec()){
		
		message = OO.filter_string(userInput.text);
		
		S.log.add(message,"user message");
		
		S.add_entry_to_scene_journal(message)
		
	}


}


// scripts preferences for dialog prefill

function print_script_prefs(_script_name,_pref_object){
	
	var note_name = "pref_"+_script_name

	node.add("Top",note_name,"NOTE");
	
	var pref_note = OO.doc.getNodeByPath(note_name);
	
	var json_string = JSON.stringify(_pref_object);
	
	pref_note.attributes.text.setValue(json_string)

	
}


function fetch_script_prefs(_script_name){
	
	var note_name = "pref_"+_script_name

	var pref_note = OO.doc.getNodeByPath(note_name);
	
	if(pref_note.hasOwnProperty('text')){
		
		var json_string = pref_note.text 
	
		var json_object = JSON.parse(json_string);
	
		return json_object;		
		
	}
	


}

// TREE MANIPULATIONS

function create_tree_with_selection(){
	
	// save the scene ! 
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/add_tree.html");

	var selected_nodes = OO.doc.selectedNodes; 
	
	var TREE_CODE = "";
	
	MessageLog.trace(selected_nodes);
	
	
	
	var dialog = new Dialog();
	dialog.title = "TREE CODE (no accents) : ";
	dialog.width = 100;
	
	var userInput = new LineEdit();
	userInput.text = ""
	dialog.add( userInput );
		
	if (dialog.exec()){
		
		TREE_CODE = OO.filter_string(userInput.text);
		 
		S.trees.add_tree( TREE_CODE,selected_nodes);
		
		S.log.add("new tree added "+TREE_CODE,"tree");
		
	}	
}


function select_tree_nodes(){
	
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/select_tree_nodes.html");

	var selected_nodes = OO.doc.selectedNodes; 
	
	var fetched_map_modules = S.trees.find_map_modules_in_nodes(selected_nodes)
	
	MessageLog.trace("MODULES");
	
	MessageLog.trace(fetched_map_modules);
	
	selection.clearSelection ()
	
	for(var n = 0 ; n < fetched_map_modules.length ; n++){
		
		var current_map_module = fetched_map_modules[n]; 
		
		var ntree = S.trees.instaciate_tree_with_map_module(current_map_module);
		
		ntree.select_nodes();
		
		ntree.update_map_module("treeid","hallo");
		
	}
	
	MessageLog.trace(selected_nodes);
	
}



function show_layer_ID(){
	
	var S = new OO.SceneManager();	
	
	var selection = OO.doc.selectedNodes;
	
	MessageLog.trace(S.trees.get_node_smlayerid(selection[0]));
	
	MessageBox.information(S.trees.get_node_smlayerid(selection[0]));
	
}


function mark_nodes(){
	
	var S = new OO.SceneManager();	
	
	var selection = OO.doc.selectedNodes;
	
	S.trees.add_id_to_nodes(selection)
	
}






//============================================================================================================================================

// SETUP SCRIPTS 

//=============================================================================================================================================

function import_project_settings(_project){
	
	var project = _project != undefined  ? _project : "billy";
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/"+project+"/pre_shotgun/batch_pool/logs/import_project_settings.html");
	
	S.set_scene_settings(OO.project_settings);
	
}

function import_setup(_setup_name){
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/import_setup.html");
	
	S.context = new OO.Context("Shotgun");
	
	S.context.set_library_path(OO.library_path);
	
	S.context.set_psd_path(OO.psd_path);
	
	S.context.set_video_export_path(OO.video_export_path)
	
	//mark scene path : 
	
	// burnin should be improted separately
	

	switch (_setup_name){
	
		case 'shot': 
		
			S.context.set_from_scene_path();
		
			var RENDER_MOV = "Top/RENDER_MOV";
			
			var video_render_path = S.context.generate_render_path();
			
			S.setups.apply(_setup_name);	
			
			// after the setup is imported in the nodeview
			
			S.write_scene_path_backdrop();
			
			S.update_render_path(RENDER_MOV,video_render_path);
			
			S.context.set_from_scene_path();
			
			S.write_shot_burnin(S.context.get_scene_path(),S.context.get_shot(),OO.aujourdhui())
			
		break; 
		
		case 'design': 
		
			S.context.set_from_scene_path();
		
			S.setups.apply(_setup_name);	
		
			// after the setup is imported in the nodeview
			
			S.write_scene_path_backdrop();
			
			S.write_asset_burnin(S.context.get_scene_path(),S.context.code,OO.aujourdhui());
			
		break; 
		
		case 'rig': 
			
		break; 		
		
	}
	
	S.log.save();

} 


function load_shot_setup(){
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/load_shot_setup.html");
	
	S.context = new OO.Context("Shotgun");
	
	S.context.set_library_path(OO.library_path);
	
	S.context.set_psd_path(OO.psd_path);
	
	S.context.set_video_export_path(OO.video_export_path)
	
	
	var shot_setup = S.setups.apply('shot');	
	
	var RENDER_MOV = "Top/RENDER_MOV";
	
	var video_render_path = S.context.generate_render_path();
	
	S.update_render_path(RENDER_MOV,video_render_path)
	
	S.log.save();

} 



//============================================================================================================================================

// PORTAL SCRIPT 

//============================================================================================================================================


function create_empty_portal(){
	
	var S = new OO.SceneManager();	
	
	S.context = new OO.Context("Shotgun");
	
	S.context.set_library_path(OO.library_path);
	
	
	var dialog = new Dialog();
	dialog.title = "CREATE PORTAL";
	dialog.width = 200;
	
	var userInput1 = new LineEdit();
	userInput1.label = "asset code";
	userInput1.text = "";
	dialog.add( userInput1 );
	
	var userInput2 = new ComboBox();
	userInput2.label = "asset type"
	userInput2.editable = true;
	userInput2.itemList = ["Character", "Prop", "Fx","bg"];
	dialog.add( userInput2 );
	
	var userInput3 = new ComboBox();
	userInput3.label = "departement"
	userInput3.editable = true;
	userInput3.itemList = ["design", "rig", "anim","bg","layout"];
	userInput3.currentItem = [""];
	dialog.add( userInput3 );
	
	if (dialog.exec()){
		
		var asset_code = OO.filter_string(userInput1.text);
		
		var asset_type = OO.filter_string(userInput2.currentItem);
		
		var departement =  OO.filter_string(userInput3.currentItem);
		
		
		var nasset = new OO.Asset({code:asset_code,sg_asset_type:asset_type});
		
		var final_png_path = S.context.get_asset_data_path(nasset,"png",departement);
		var final_psd_path = S.context.get_asset_data_path(nasset,"psd",departement);
		var final_tpl_path = S.context.get_asset_data_path(nasset,"tpl",departement);
			
			
		
		var nportal = S.portals.add(asset_code,asset_type,final_tpl_path,final_psd_path,final_png_path,departement);	
	
		nportal.tree.ungroup();
		
	}


} 


function create_empty_portal__old__(){
	
	var S = new OO.SceneManager();	
	

	
	var nportal = S.portals.add("empty");
	
	nportal.tree.ungroup();
				
} 

function empty_selected_portals(){
	
	var S = new OO.SceneManager();	
	
	S.portals.load_from_node_list(OO.doc.selectedNodes);

	for(var p = 0 ; p < S.portals.list.length; p++){
	
		var current_portal = S.portals.list[p]
		
		S.portals.empty(current_portal);

		
	}

}
function pull_selected_portals_dialog(){
	
	var DATA_TYPE ="png";

	var dialog = new Dialog();
	dialog.title = "PULL PORTAL ";
	dialog.width = 200;

	
	var userInput2 = new ComboBox();
	userInput2.label = "data type to pull : "
	userInput2.editable = true;
	userInput2.itemList = ["png","psd","tpl"];
	dialog.add( userInput2 );		
	
	if (dialog.exec()){
		
		DATA_TYPE = userInput2.currentItem;
		
		pull_selected_portals_process(DATA_TYPE);
		
	}
	
}

function pull_selected_portals_process(_data_type){
	
	////MessageLog.trace("PULL PSD FUNCTION");
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/pull_portal.html");
	
	S.portals.load_from_node_list(OO.doc.selectedNodes);
	
	S.context.set_context_type('Shotgun');	

	S.context.set_svg_path(OO.svg_path);
	
	S.assets.load_breakdown('csv');
	
	for(var p = 0 ; p < S.portals.list.length; p++){
		
			var current_portal = S.portals.list[p]
			
			//we empty the portal first 
			
			S.portals.empty(current_portal);
			
			var pulled_nodes = S.portals.pull(current_portal,_data_type);	
			
			if(pulled_nodes != false){
				
				switch (_data_type){
					
						case "png":
						
								// must find a way to get the size of the png in a different manner. without svg
						
								var linked_asset = S.assets.get_asset_by_code(current_portal.code);
								
								if(linked_asset != false){
								
									var full_svg_path = S.context.get_svg_path(linked_asset);
									
									// only for png , the image is scaled automaticly on import
									// to compensate this we put the image back to its original pixel size with the following code :
									
									var cadre = S.load_cadre(full_svg_path);
									
									if( cadre.bg != undefined){
										
										MessageLog.trace("PNG HEIGHT");
						
										MessageLog.trace(cadre.bg.height);
										
										var final_sy = cadre.bg.height/1080;
										
										var final_sx = final_sy;
										
										//INJECT SX
										pulled_nodes.attributes.scale.x.setValue(final_sx);
										
										//INJECT SY
										pulled_nodes.attributes.scale.y.setValue(final_sy);				
									
									}									
								
								}
						

										
						
						break; 
						
						case "psd": 
						
						
						break; 
						
						case "tpl": 
						
						
						break; 				
					
				}
				
				
			
			}
			
	}	

		
		
	
	


	S.log.save();		

	
} 




function push_selected_portals(_data_type){
	
	MessageLog.trace("PUSH PORTAL FUNCTION");
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/push_portal.html");
	
	S.portals.load_from_node_list(OO.doc.selectedNodes);
	
	S.context.set_context_type('Shotgun');	
	
	S.assets.load_breakdown('csv');

	for(var p = 0 ; p < S.portals.list.length; p++){
		
		S.context.get_psd_path
		var current_portal = S.portals.list[p];
			
		MessageLog.trace(current_portal.code);
		
		S.portals.push_portal(current_portal,_data_type);
			
	}	

	S.log.save();
	
} 







// ASSET PORTALS 

function create_portals(_type){
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/create_portals.html");
	
	S.context.set_context_type('Shotgun');	
	
	S.context.set_library_path(OO.library_path);	
	S.context.set_psd_path(OO.psd_path);
	S.context.set_png_path(OO.png_path);
	S.context.set_svg_path(OO.svg_path);
	
	S.assets.load_breakdown('csv');
	
	var target_backdrop = false;
	
	var target_composite = false;
	
	
	switch(_type){
		
		case ('bg'):
		
			target_backdrop = S.get_backdrop_by_name('BG');
			target_composite = OO.doc.getNodeByPath("Top/BG-C");
		
		break; 
		
		case('Character'):
		
			target_backdrop = S.get_backdrop_by_name('ANIM');
			target_composite = OO.doc.getNodeByPath("Top/ANIM-C");
		
		break;
		

	}
	
	if(target_backdrop == false){
		
		bg_backdrop = {x:0,y:0};
		
	}

	var point = {
		x:target_backdrop.x + 400,
		y:target_backdrop.y + 400 
	}
	
	if(target_composite != undefined){
		
		S.create_asset_portals(_type,point,target_composite);
		
	}

	S.log.save();
}


function empty_portals(_asset_type){
	
	var S = new OO.SceneManager();	
	
	S.context.set_context_type('Shotgun');	
	
	S.context.set_library_path(OO.library_path);
	
	S.assets.load_breakdown('csv');
	
	S.portals.load_from_scene();

	for(var p = 0 ; p < S.portals.list.length; p++){
	
		var current_portal = S.portals.list[p]
		
		var linked_asset = S.assets.get_asset_by_code(current_portal.code);
		
		if(linked_asset.get_type()== _asset_type){
			
			S.portals.empty(current_portal);
			
		}
		
	}

}


function pull_(_asset_type){
	
	////MessageLog.trace("PULL PSD FUNCTION");
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/pull_bg.html");
	
	S.context.set_context_type('Shotgun');	
	
	S.context.set_library_path(OO.library_path);
	
	S.context.set_psd_path(OO.psd_path);
	
	S.context.set_png_path(OO.png_path);
	
	S.context.set_svg_path(OO.svg_path);
	
	S.assets.load_breakdown('csv');
	
	S.portals.load_from_scene();

	for(var p = 0 ; p < S.portals.list.length; p++){
		
		var current_portal = S.portals.list[p]
		
		var linked_asset = S.assets.get_asset_by_code(current_portal.code);
		
		if(linked_asset != false){
			
			//checking asset type
			if(linked_asset.get_type() == _asset_type || _asset_type == "ALL" ){
				
				//TODO : switch per asset type
				
				//we empty the portal first 
				
				S.portals.empty(current_portal);
				
				S.log.add("pulling png of - "+current_portal.code,"process");
				
				if(current_portal.png_exist()){

					var bg_node = S.portals.pull(current_portal,'png');		
			
					var full_svg_path = S.context.get_asset_data_path(linked_asset,"svg");
					
					var full_psd_path = S.context.get_asset_data_path(linked_asset,"psd");
					
					var full_png_path = S.context.get_asset_data_path(linked_asset,"png");
					
					MessageLog.trace("BG_PATH : ");
					
					MessageLog.trace(full_psd_path);
					
					MessageLog.trace(full_svg_path);
					
					MessageLog.trace(full_png_path);
					
					// if the bg has cadres that match the shot name. 
					
					var bg_cadre = S.load_cadre(full_svg_path);
					
					// only for png , the image is scaled automaticly on import
					// to compensate this we put the image back to its original pixel size with the following code :
					
					if( bg_cadre.bg != undefined && current_portal.png_scaled == false){
						
						MessageLog.trace("BG HEIGHT");
						MessageLog.trace(bg_cadre.bg.height);
						
						var final_sy = bg_cadre.bg.height/1080;
						var final_sx = final_sy;
						
						//INJECT SX
						bg_node.attributes.scale.x.setValue(final_sx);
						
						//INJECT SY
						bg_node.attributes.scale.y.setValue(final_sy);				
					
					}

			
				}else{
					
					S.log.add("png not found - "+S.context.get_png_path(linked_asset),"error");
					
				}			
				
			}
		
		}
		


	}	

	S.log.save();
	
} 

// SELECTED  PORTALS

function fit_selected_portals_to_camera(){
	
	// loop through bg portals and change thier layout peg transform in order to fit the cadre of the current shot with the scene camera. 
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/fit_bg_to_camera.html");
	
	S.portals.load_from_node_list(OO.doc.selectedNodes);
	
	S.context.set_context_type('Shotgun');	

	S.context.set_svg_path(OO.svg_path);
	
	S.assets.load_breakdown('csv');
	
	for(var p = 0 ; p < S.portals.list.length; p++){
		
		var current_portal = S.portals.list[p]
		
		var portal_peg = current_portal.tree.get_key_node("PORTAL_PEG");
		
		var linked_asset = S.assets.get_asset_by_code(current_portal.code);
		
		if(current_portal.png_exist()){
			
			var full_svg_path = S.context.get_svg_path(linked_asset);
			
			MessageLog.trace("BG_PATH : ");
			
			MessageLog.trace(full_svg_path);

			var bg_cadre = S.load_cadre(full_svg_path);
			
			if(bg_cadre != false){
				
				if(bg_cadre.hasOwnProperty('rect')==true){
					
					S.trees.fit_cadre_to_camera(portal_peg,bg_cadre);
					
				}else{
					
					//we compensate the bg secu
					
					S.trees.scale_to_camera(portal_peg);
					
				}				
				
			}else{
				
				
			}

			
					
		}
	}	

	S.log.save();
	
}

// ALL PORTALS

function fit_bg_to_camera(){
	
	// loop through bg portals and change thier layout peg transform in order to fit the cadre of the current shot with the scene camera. 
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/fit_bg_to_camera.html");
	
	S.context.set_context_type('Shotgun');	
	
	S.context.set_svg_path(OO.svg_path);
	
	S.assets.load_breakdown('csv');
	
	S.portals.load_from_scene();
	
	for(var p = 0 ; p < S.portals.list.length; p++){
		
		var current_portal = S.portals.list[p]
		
		var portal_peg = current_portal.tree.get_key_node("PORTAL_PEG");
		
		var linked_asset = S.assets.get_asset_by_code(current_portal.code);
		
		if(current_portal.png_exist()){
			
			var full_svg_path = S.context.get_svg_path(linked_asset);
			
			MessageLog.trace("BG_PATH : ");
			
			MessageLog.trace(full_svg_path);

			var bg_cadre = S.load_cadre(full_svg_path);
			
			if(bg_cadre != false){
				
				if(bg_cadre.hasOwnProperty('rect')==true){
					
					S.trees.fit_cadre_to_camera(portal_peg,bg_cadre);
					
				}else{
					
					//we compensate the bg secu
					
					S.trees.scale_to_camera(portal_peg);
					
				}				
				
			}else{
				
				
			}

			
					
		}
	}	

	S.log.save();
	
}


function pull_png(){
	
	////MessageLog.trace("PULL PSD FUNCTION");
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/pull_png.html");
	
	S.context.set_context_type('Shotgun');	
	
	S.context.set_library_path(OO.library_path);
	
	S.context.set_psd_path(OO.psd_path);
	
	S.context.set_png_path(OO.png_path);
	
	S.context.set_svg_path(OO.svg_path);
	
	S.assets.load_breakdown('csv');
	
	S.portals.load_from_scene();

	for(var p = 0 ; p < S.portals.list.length; p++){
		
		var current_portal = S.portals.list[p]
		
		//we empty the portal first 
		
		S.portals.empty(current_portal);
		
		var linked_asset = S.assets.get_asset_by_code(current_portal.code);
		
		S.log.add("pulling png of - "+current_portal.code,"process");
		
		if(current_portal.png_exist()){

			var bg_node = S.portals.pull(current_portal,'png');		
	
			var full_svg_path = S.context.get_asset_data_path(linked_asset,"svg");
			
			var full_psd_path = S.context.get_asset_data_path(linked_asset,"psd");
			
			var full_png_path =S.context.get_asset_data_path(linked_asset,"png");
			
			MessageLog.trace("BG_PATH : ");
			
			MessageLog.trace(full_psd_path);
			
			MessageLog.trace(full_svg_path);
			
			MessageLog.trace(full_png_path);
			
			// if the bg has cadres that match the shot name. 
			
			var bg_cadre = S.load_cadre(full_svg_path);
			
			// only for png , the image is scaled automaticly on import
			// to compensate this we put the image back to its original pixel size with the following code :
			
			if( bg_cadre.bg != undefined){
				
				MessageLog.trace("BG HEIGHT");
				MessageLog.trace(bg_cadre.bg.height);
				
				var final_sy = bg_cadre.bg.height/1080;
				var final_sx = final_sy;
				
				
				
				//INJECT SX
				bg_node.attributes.scale.x.setValue(final_sx);
				
				//INJECT SY
				bg_node.attributes.scale.y.setValue(final_sy);				
			
			}

			
			//var bg_psd_cadre = S.load_cadre_from_psd(full_psd_path)
		
			if(bg_cadre.hasOwnProperty('rect')==true){
				
				S.trees.fit_cadre_to_camera(current_portal.tree.peg,bg_cadre);
				
			}else{
				
				//we compensate the bg secu
				
				S.trees.scale_to_camera(current_portal.tree.peg);
			}
					
		}else{
			
			S.log.add("png not found - "+S.context.get_png_path(linked_asset),"error");
			
		}

	}	

	S.log.save();
	
}


function pull_psd(){
	
	////MessageLog.trace("PULL PSD FUNCTION");
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/pull_psd.html");
	
	S.context.set_context_type('Shotgun');	
	
	S.context.set_library_path(OO.library_path);
	
	S.context.set_psd_path(OO.psd_path);
	
	S.context.set_png_path(OO.png_path);
	
	S.context.set_svg_path(OO.svg_path);
	
	S.assets.load_breakdown('csv');
	
	S.portals.load_from_scene();

	for(var p = 0 ; p < S.portals.list.length; p++){
		
		var current_portal = S.portals.list[p]
		
		var linked_asset = S.assets.get_asset_by_code(current_portal.code);
		
		if(current_portal.psd_exist()){

			var bg_node = S.portals.pull(current_portal,'psd');		
			
			var full_svg_path = S.context.get_asset_data_path(linked_asset,"svg");
			
			var full_psd_path = S.context.get_asset_data_path(linked_asset,"psd");
			
			var full_png_path =S.context.get_asset_data_path(linked_asset,"png");
			
			MessageLog.trace("BG_PATH : ");
			
			MessageLog.trace(full_psd_path);
			
			MessageLog.trace(full_svg_path);
			
			MessageLog.trace(full_png_path);
			
			// if the bg has cadres that match the shot name. 
			
			var bg_cadre = S.load_cadre(full_svg_path);

			
			//var bg_psd_cadre = S.load_cadre_from_psd(full_psd_path)
		
			if(bg_cadre!=false){
				
				S.trees.fit_cadre_to_camera(current_portal.tree.peg,bg_cadre);
				
			}else{
				
				//we compensate the bg secu
				
				S.trees.scale_to_camera(current_portal.tree.peg);
			}
					
		}else{
			
			S.log.add("no psd","error");
			
		}

	}	

	S.log.save();
	
}




//DESIGN SCRIPT : 


function Expiew(){
	
	var S = new OO.SceneManager();
	
	//would need to add a warning message. 
	
	////MessageLog.trace("Expiew");

	S.load_xstage();
	S.views.load(S.stage);
	S.views.set_output_dir("P:/projects/billy/views");
	
	if(S.views.noviews == false){
		
		if(S.views.InputDialog()){
			
			S.views.export_views();
			
		}		
	}

}

function export_markers_process(){
	
	var S = new OO.SceneManager();
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/export_markers.html");
	
	S.context.set_context_type('Shotgun');	
	
	S.context.set_library_path(OO.library_path);

	S.load_xstage();
	
	S.views.load(S.stage);
	
	S.views.set_output_dir("P:/projects/billy/views");
	
	if(S.views.noviews == false){
		
		if(S.views.InputDialog()){
			
			S.views.export_views();
			
		}		
		
	}

}

function export_asset_png_process(){
	
	var S = new OO.SceneManager();
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/export_asset_png.html");
	
	S.context.set_context_type('Shotgun');	
	
	S.context.set_library_path(OO.library_path);
	
	//reading scene shotgun context
	

	MessageLog.trace(S.context.set_from_scene_path()); 
	
	var current_asset = S.context.get_current_asset();
	var prefilled_path = ""; 
	
	var library_asset_path = S.context.get_asset_data_path(current_asset,"png");
	
	MessageLog.trace("PATH PNG");
	
	S.portals.load_from_node_list(OO.doc.selectedNodes);
	
	S.context.set_context_type('Shotgun');	
	
	S.assets.load_breakdown('csv');
	
	if(S.portals.list.length > 0 ){
		
		var current_portal = S.portals.list[0]
		
		library_asset_path = current_portal.get_path('png');
		
	}	
	
	MessageLog.trace(library_asset_path);
	
	var dialog = new Dialog();
	dialog.title = "EXPORT ASSET PNG";
	dialog.width = 400;
	
	var userInput1 = new LineEdit();
	userInput1.label = "png path";
	userInput1.text = library_asset_path;
	dialog.add( userInput1 );	
	
	var userInput2 = new LineEdit();
	userInput2.label = "scale image";
	userInput2.text = 1.5;
	dialog.add( userInput2 );	
	
	if (dialog.exec()){
		
		S.views.export_currentframe_png_to(userInput1.text,userInput2.text);

	}
	
}

function align_selected_nodes(_axe){
	
	scene.beginUndoRedoAccum ("align_selected_nodes")
	
	
	
	var sumX = 1;
	var sumY = 1;
	
	for(var i = 0 ; i < OO.doc.selectedNodes.length ; i++){
		
		var current_node = OO.doc.getNodeByPath(OO.doc.selectedNodes[i]);
		
		sumX+=current_node.x;
		sumY+=current_node.y;
		
	}
	
	for(var i = 0 ; i < OO.doc.selectedNodes.length ; i++){
		
		var current_node = OO.doc.getNodeByPath(OO.doc.selectedNodes[i]);
		
		switch(_axe){
		
			case "x": 

				current_node.x = (sumX/OO.doc.selectedNodes.length) - (current_node.width/2); 
			
			break;
			
			
			case "y": 
			
				current_node.y = sumY/OO.doc.selectedNodes.length; 
				
			break;
			
		}
		
	}
	
	scene.endUndoRedoAccum ()
	
}


function scale_selected_nodes(_axe){
	
	scene.beginUndoRedoAccum ("align_selected_nodes")
	
	var ref_node = OO.doc.getNodeByPath(OO.doc.selectedNodes[1]);
	
	var factor =1.1;

	var onodes = [];
	
	for(var i = 0 ; i < OO.doc.selectedNodes.length ; i++){
		
		onodes.push(OO.doc.getNodeByPath(OO.doc.selectedNodes[i]));
		
	}
	
	var sorted_by_axe = onodes.sort(function(a, b) {

		switch(_axe){
			
			case "x": 
			
				return a.x - b.x;
			
			break;
			
			case "y": 
				
				return a.y - b.y;
					
			break;
		}
		
	});
	
	var level = 0; 
	
	var last_node = sorted_by_axe[sorted_by_axe.length-1]
	
	var node_to_modifiy = sorted_by_axe;
	var point_list = [];

	for(var i =0; i < sorted_by_axe.length ; i++){
		
		var current_node = sorted_by_axe[i];
		
		var point_data  = {
			px: current_node.x,
			py: current_node.y,
			dx: current_node.x - ref_node.x,
			dy: current_node.y - ref_node.y,
		}
		
		point_list.push(point_data);
		
	}
	
	for(var i =0; i < point_list.length ; i++){
		
		var current_node = sorted_by_axe[i];
		
		var previous_node = {x:0,y:0};
		
		if(i > 0 ){
			
			var previous_node = sorted_by_axe[i-1];
			
		}
		
		var current_node = node_to_modifiy[i];
		
		switch(_axe){
			
			case "x": 

			
				current_node.x= point_list[i].px+(point_list[i].dx*factor);
				
			
			break;
			
			case "y": 
			
				current_node.y= point_list[i].py+(point_list[i].dy*factor);
						
				
			break;
			
		}
		
	}
	
	scene.endUndoRedoAccum ()
	
}

