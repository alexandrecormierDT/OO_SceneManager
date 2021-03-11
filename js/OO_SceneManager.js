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

OO.library_path = "P:/pipeline/alexDT/Harmony20/Context_library/";
OO.sg_path = "P:/projects/billy/pre_shotgun/sg_exports/";
OO.psd_path = "P:/projects/billy/pre_shotgun/batch_pool/bg/psd/";
OO.png_path = "P:/projects/billy/pre_shotgun/batch_pool/bg/png/";
OO.svg_path = "P:/projects/billy/pre_shotgun/batch_pool/bg/svg/";
OO.video_export_path = "P:/projects/billy/pre_shotgun/batch_pool/video/saison1/ep102/";

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


function print_script_prefs(_script_name,_object){
	
	var json_string = JSON.stringify(_object)
	
	
	
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

function create_portals(_type){
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/create_portals.html");
	
	S.context.set_context_type('Shotgun');	
	
	S.context.set_library_path(OO.library_path);	
	S.context.set_psd_path(OO.psd_path);
	S.context.set_png_path(OO.png_path);
	S.context.set_svg_path(OO.svg_path);
	
	S.load_breakdown('csv');
	
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


function empty_portals(_type){
	
	var S = new OO.SceneManager();	
	
	S.context.set_context_type('Shotgun');	
	
	S.context.set_library_path(OO.library_path);
	
	S.load_breakdown('csv');
	
	S.portals.load_from_scene();

	for(var p = 0 ; p < S.portals.list.length; p++){
	
		var current_portal = S.portals.list[p]
		
		var linked_asset = S.assets.get_asset_by_code(current_portal.code);
		
		if(linked_asset.get_type()== _type){
			
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
	
	S.load_breakdown('csv');
	
	S.portals.load_from_scene();

	for(var p = 0 ; p < S.portals.list.length; p++){
		
		var current_portal = S.portals.list[p]
		
		var linked_asset = S.assets.get_asset_by_code(current_portal.code);
		
		//checking asset type
		if(linked_asset.get_type() == _asset_type || _asset_type == "ALL" ){
			
			//TODO : switch per asset type
			
			//we empty the portal first 
			
			S.portals.empty(current_portal);
			
			S.log.add("pulling png of - "+current_portal.code,"process");
			
			if(current_portal.png_exist()){

				var bg_node = S.portals.pull(current_portal,'png');		
		
				var full_svg_path = S.context.get_svg_path(linked_asset);
				
				var full_psd_path = S.context.get_psd_path(linked_asset);
				
				var full_png_path = S.context.get_png_path(linked_asset);
				
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

		
			}else{
				
				S.log.add("png not found - "+S.context.get_png_path(linked_asset),"error");
				
			}			
			
		}
		


	}	

	S.log.save();
	
} 


function fit_bg_to_camera(){
	
	// loop through bg portals and change thier layout peg transform in order to fit the cadre of the current shot with the scene camera. 
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/fit_bg_to_camera.html");
	
	S.context.set_context_type('Shotgun');	
	
	S.context.set_svg_path(OO.svg_path);
	
	S.load_breakdown('csv');
	
	S.portals.load_from_scene();
	
	for(var p = 0 ; p < S.portals.list.length; p++){
		
		var current_portal = S.portals.list[p]
		
		var linked_asset = S.assets.get_asset_by_code(current_portal.code);
		
		if(current_portal.png_exist()){
			
			var full_svg_path = S.context.get_svg_path(linked_asset);
			
			MessageLog.trace("BG_PATH : ");
			
			MessageLog.trace(full_svg_path);

			var bg_cadre = S.load_cadre(full_svg_path);
			
			if(bg_cadre != false){
				
				if(bg_cadre.hasOwnProperty('rect')==true){
					
					S.trees.fit_cadre_to_camera(current_portal.tree.peg,bg_cadre);
					
				}else{
					
					//we compensate the bg secu
					
					S.trees.scale_to_camera(current_portal.tree.peg);
					
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
	
	S.load_breakdown('csv');
	
	S.portals.load_from_scene();

	for(var p = 0 ; p < S.portals.list.length; p++){
		
		var current_portal = S.portals.list[p]
		
		//we empty the portal first 
		
		S.portals.empty(current_portal);
		
		var linked_asset = S.assets.get_asset_by_code(current_portal.code);
		
		S.log.add("pulling png of - "+current_portal.code,"process");
		
		if(current_portal.png_exist()){

			var bg_node = S.portals.pull(current_portal,'png');		
	
			var full_svg_path = S.context.get_svg_path(linked_asset);
			
			var full_psd_path = S.context.get_psd_path(linked_asset);
			
			var full_png_path = S.context.get_png_path(linked_asset);
			
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
	
	S.load_breakdown('csv');
	
	S.portals.load_from_scene();

	for(var p = 0 ; p < S.portals.list.length; p++){
		
		var current_portal = S.portals.list[p]
		
		var linked_asset = S.assets.get_asset_by_code(current_portal.code);
		
		if(current_portal.psd_exist()){

			var bg_node = S.portals.pull(current_portal,'psd');		
	
			var full_svg_path = S.context.get_svg_path(linked_asset);
			
			var full_psd_path = S.context.get_psd_path(linked_asset);
			
			var full_png_path = S.context.get_png_path(linked_asset);
			
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

