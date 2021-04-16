//MessageLog.trace("SCENE MANAGER loading classes");
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

//PATHS TO INJECT IN THE CONTEXT CLASS

OO.library_path = "P:/projects/billy/library/";
//OO.library_path = "P:/pipeline/alexDT/Harmony20/Context_library/";
OO.sg_path = "P:/projects/billy/pre_shotgun/sg_exports/";
OO.psd_path = "P:/projects/billy/pre_shotgun/batch_pool/bg/psd/";
OO.png_path = "P:/projects/billy/pre_shotgun/batch_pool/bg/png/";
OO.svg_path = "P:/projects/billy/pre_shotgun/batch_pool/bg/svg/";
OO.video_export_path = "P:/projects/billy/pre_shotgun/batch_pool/video/saison1/";
OO.vault_path = "P:/.vault/billy/";
OO.bg_preview_path = "P:/projects/billy/pre_shotgun/batch_pool/video/saison1/";


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
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_SceneFilesManager.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Stage.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Context.js");

include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Asset.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_AssetManager.js");


include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Tree.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_TreeManager.js");

include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Portal.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_PortalManager.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_PortalCreator.js");


include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_ViewManager.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_View.js");

include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_SetupManager.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Setup.js");


include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_ElementManager.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_ElementFolder.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_TVG.js");


include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_LibraryManager.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_TPL.js");




//AUTOLISPING CLASSES

include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_StoryboardOutputManager.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_VoiceTrack.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_LipsDetectionManager.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_LipsDetectionGenerator.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Lipsing.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Phoneme.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_LipsInjector.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_CharacterDetector.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_HeadAngle.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_LipsImporter.js");



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

	S.context = new OO.Context(this,"Shotgun");	
	
	S.context.set_from_scene_path();
	
	S.write_scene_path_backdrop();
	
	MessageBox.information(S.context.get_scene_path());
	
}


function write_scene_journal(){
	
	var S = new OO.SceneManager();	
	
	S.context = new OO.Context(this,"Shotgun");	
	
	S.context.set_from_scene_path();
	
	S.write_scene_path_backdrop();
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/journal.html");
	
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


// CLEANING THE SCENE 

function delete_misplaced_sub_files(){
	
	var S = new OO.SceneManager();	

	
	var current_scene_path = S.context.get_scene_path();
	
	S.scene_files.set_scene_path(current_scene_path);
	
	S.scene_files.elements.fetch_elements_dir_from_scene_directory();
	
	

}




















// FETCHING DATAS 


function get_scene_asset_shot_list(){
	
	var S = new OO.SceneManager();		
	
	S.context = new OO.Context(this,"Shotgun");
	
	S.assets.load_project_assets();
	
	var billy_shot_list = S.assets.get_asset_shot_list("ch_billy");
	
	//MessageLog.trace(billy_shot_list);
	
}




// TREE MANIPULATIONS

function create_tree_with_selection(){
	
	// save the scene ! 
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/add_tree.html");

	var selected_nodes = OO.doc.selectedNodes; 
	
	var TREE_CODE = "";
	
	//MessageLog.trace(selected_nodes);
	
	
	
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
	
	//MessageLog.trace("MODULES");
	
	//MessageLog.trace(fetched_map_modules);
	
	selection.clearSelection ()
	
	for(var n = 0 ; n < fetched_map_modules.length ; n++){
		
		var current_map_module = fetched_map_modules[n]; 
		
		var ntree = S.trees.instaciate_tree_with_map_module(current_map_module);
		
		ntree.select_nodes();
		
		ntree.update_map_module("treeid","hallo");
		
	}
	
	//MessageLog.trace(selected_nodes);
	
}



function show_layer_ID(){
	
	var S = new OO.SceneManager();	
	
	var selection = OO.doc.selectedNodes;
	
	//MessageLog.trace(S.trees.get_node_smlayerid(selection[0]));
	
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
	
	S.context = new OO.Context(this,"Shotgun");
	
	S.context.set_library_path(OO.library_path);
	
	
	
	//mark scene path : 
	
	// burnin should be improted separately
	

	switch (_setup_name){
	
		case 'shot': 
		
			S.context.set_from_scene_path();
		
			var RENDER_MOV = "Top/RENDER_MOV";
			
			S.context.set_bg_preview_path(OO.bg_preview_path);
			
			var video_render_path = S.context.generate_bg_preview_render_path();
			
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
	
	S.context = new OO.Context(this,"Shotgun");
	
	S.context.set_library_path(OO.library_path);
	
	S.context.set_psd_path(OO.psd_path);
	
	var shot_setup = S.setups.apply('shot');	
	
	var RENDER_MOV = "Top/RENDER_MOV";
	
	S.context.set_video_export_path(OO.video_export_path)
	
	var video_render_path = S.context.generate_preview_render_path();
	
	S.update_render_path(RENDER_MOV,video_render_path)
	
	S.log.save();

} 



//============================================================================================================================================

// PORTAL SCRIPT 

//============================================================================================================================================


function create_empty_portal(){
	
	var S = new OO.SceneManager();	
	
	S.context = new OO.Context(this,"Shotgun");
	
	S.context.set_library_path(OO.library_path);
	
	
	var dialog = new Dialog();
	dialog.title = "CREATE PORTAL";
	dialog.width = 200;
	
	var userCode = new ComboBox();
	userCode.label = "Asset code";
	userCode.editable = true;
	userCode.itemList = ["ch_", "pr_", "fx_","bg_"];
	userCode.currentItem = [""];
	dialog.add( userCode );
	
	var userType = new ComboBox();
	userType.label = "Asset type"
	userType.editable = true;
	userType.itemList = ["Character", "Prop", "Fx","bg"];
	dialog.add( userType );
	
	var userDepartement = new ComboBox();
	userDepartement.label = "Departement"
	userDepartement.editable = true;
	userDepartement.itemList = ["design", "rig", "anim","bg","layout"];
	userDepartement.currentItem = [""];
	dialog.add( userDepartement );
	
	var userInputVersion = new ComboBox();
	userInputVersion.label = "Version"
	userInputVersion.editable = true;
	userInputVersion.itemList = ["v01", "v02", "v03","v04","v04_retake","v04_valid","v04_check"];
	userInputVersion.currentItem = [""];
	dialog.add( userInputVersion );
	
	var userInputStatus = new ComboBox();
	userInputStatus.label = "Status"
	userInputStatus.editable = true;
	userInputStatus.itemList = ["wip","valid", "check"];
	userInputStatus.currentItem = [""];
	dialog.add( userInputStatus );
	
	if (dialog.exec()){
		
		var asset_code = OO.filter_string(userCode.currentItem);
		
		var asset_type = OO.filter_string(userType.currentItem);
		
		var departement = OO.filter_string(userDepartement.currentItem);
		
		var tpl_version = OO.filter_string(userInputVersion.currentItem);
		
		var status = OO.filter_string(userInputStatus.currentItem);
		
		var nasset = new OO.Asset({code:asset_code,sg_asset_type:asset_type});
		
		var final_png_path = S.context.get_asset_data_path(nasset,"png",departement);
		var final_psd_path = S.context.get_asset_data_path(nasset,"psd",departement);
		var final_tpl_path = S.context.get_asset_data_path(nasset,"tpl",departement);
		
		S.portals.creator.set_code( asset_code )
		S.portals.creator.set_sg_asset_type( asset_type )
		S.portals.creator.set_departement( departement )
		S.portals.creator.set_tpl_version( tpl_version )
		S.portals.creator.set_status( status )
		S.portals.creator.set_png_path( final_png_path )
		S.portals.creator.set_psd_path( final_psd_path )
		S.portals.creator.set_tpl_path( final_tpl_path )
		
		var nportal = S.portals.creator.create_portal(); 
		
		if(nportal!=false){
			
			S.portals.add(nportal); 
			
		}		

		var nportal_tree = nportal.get_tree(); 
	
		nportal_tree.ungroup();
		
	}


} 



function empty_selected_portals(){
	
	var S = new OO.SceneManager();	
	
	S.portals.load_from_node_list(OO.doc.selectedNodes);
	
	var portal_list = S.portals.get_list()

	for(var p = 0 ; p < portal_list.length; p++){
	
		var current_portal = portal_list[p]
		
		S.portals.empty(current_portal);

		
	}

}


function pull_selected_portals_dialog(){
	
	var DATA_TYPE ="png";

	var dialog = new Dialog();
	dialog.title = "PULL PORTAL ";
	dialog.width = 200;

	
	var userType = new ComboBox();
	userType.label = "data type to pull : "
	userType.editable = true;
	userType.itemList = ["png","psd","tpl"];
	dialog.add( userType );		
	
	if (dialog.exec()){
		
		DATA_TYPE = userType.currentItem;
		
		pull_selected_portals_process(DATA_TYPE);
		
	}
	
}

function pull_selected_portals_process(_data_type){
	
	//////MessageLog.trace("PULL PSD FUNCTION");
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/pull_portal.html");
	
	S.portals.load_from_node_list(OO.doc.selectedNodes);
	
	S.context.set_context_type('Shotgun');	

	S.context.set_svg_path(OO.svg_path);
	
	S.assets.load_breakdown('csv');
	
	var portal_list = S.portals.get_list()
	
	for(var p = 0 ; p <  portal_list.length; p++){
		
			var current_portal =  portal_list[p]
			
			//we empty the portal first 
			
			S.portals.empty(current_portal);
			
			
			//  !
			
			var pulled_nodes = S.portals.pull(current_portal,_data_type);	
			
			
			
			//after pull code ___ to be cleaned __ should be a separate function
			
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
										
										//MessageLog.trace("PNG HEIGHT");
						
										//MessageLog.trace(cadre.bg.height);
										
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
	
	//MessageLog.trace("PUSH PORTAL FUNCTION");
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/push_portal.html");
	
	S.portals.load_from_node_list(OO.doc.selectedNodes);
	
	S.context.set_context_type('Shotgun');	
	
	S.assets.load_breakdown('csv');
	
	var portal_list = S.portals.get_list()

	for(var p = 0 ; p < portal_list.length; p++){
		
		S.context.get_psd_path
		
		var current_portal = portal_list[p];
			
		//MessageLog.trace(current_portal.code);
		
		S.portals.push_portal(current_portal,_data_type);
			
	}	

	S.log.save();
	
} 

function udpate_portal_paths_from_vault(_portal){
	
	var S = new OO.SceneManager();	
		
	S.context.set_context_type('Shotgun');	
	
	S.context.set_vault_path(OO.vault_path)	
	
	S.assets.load_breakdown('csv');

	var linked_asset = S.assets.get_asset_by_code(_portal.get_code());
	
	var path_attributes_object = {
		psd_path :S.context.get_asset_data_path(linked_asset,"psd"),
		png_path :S.context.get_asset_data_path(linked_asset,"png"),
		tpl_path :S.context.get_asset_data_path(linked_asset,"tpl")
	}
	
	//set var 
	
	//udpate 
	
	S.portals.update_portal_script_module_attributes(_portal,path_attributes_object); 
	
}





function update_portals_paths_by_type(_asset_type){
	
	//MessageLog.trace("update_portals_paths_by_type")
	
	var S = new OO.SceneManager();	
		
	
	S.context.set_library_path(OO.library_path);	
	
	S.context.set_psd_path(OO.psd_path);
	
	S.context.set_png_path(OO.png_path);
	
	S.context.set_svg_path(OO.svg_path);
	
	S.context.set_vault_path(OO.vault_path)
	
	S.assets.load_breakdown('csv');
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/update_portals_path.html");
	
	
	S.portals.load_from_scene();
	
	var portal_list = S.portals.get_list()

	for(var p = 0 ; p < portal_list.length; p++){
		
		var current_portal = portal_list[p]
		
		var linked_asset = S.assets.get_asset_by_code(current_portal.get_code());
		
		if(linked_asset != false){

			if(linked_asset.get_type() == _asset_type || _asset_type == "ALL" ){
				
				S.log.add("updating paths of portal - "+current_portal.get_code(),"process");
				
				udpate_portal_paths_from_vault(current_portal);
				
			}
		
		}
		
	}	

	S.log.save();
	
	
};



// ASSET PORTALS 

function create_portals(_asset_type){
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/create_portals.html");
	
	S.context.set_context_type('Shotgun');	
	
	S.context.set_library_path(OO.library_path);	
	
	S.context.set_psd_path(OO.psd_path);
	
	S.context.set_png_path(OO.png_path);
	
	S.context.set_svg_path(OO.svg_path);
	
	S.context.set_vault_path(OO.vault_path)
	
	S.assets.load_breakdown('csv');
	
	var target_backdrop = false;
	
	var target_composite = false;
	
	
	switch(_asset_type){
		
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
		
		
		//responability problem 
		
		S.create_asset_portals(_asset_type,point,target_composite);
		
	}

	S.log.save();
	
}


function empty_portals(_asset_type){
	
	var S = new OO.SceneManager();	
	
	S.context.set_context_type('Shotgun');	
	
	S.context.set_library_path(OO.library_path);
	
	S.assets.load_breakdown('csv');
	
	S.portals.load_from_scene();
	
	var portal_list = S.portals.get_list(); 

	for(var p = 0 ; p < portal_list.length; p++){
	
		var current_portal = portal_list[p]
		
		var linked_asset = S.assets.get_asset_by_code(current_portal.code);
		
		if(linked_asset.get_type()== _asset_type){
			
			S.portals.empty(current_portal);
			
		}
		
	}

}


function update_portal_(_asset_type){
	
	
	
	
}



function pull_(_asset_type){
	
	//////MessageLog.trace("PULL PSD FUNCTION");
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/pull_bg.html");
	
	S.context.set_context_type('Shotgun');	
	
	S.context.set_library_path(OO.library_path);
	
	S.context.set_psd_path(OO.psd_path);
	
	S.context.set_png_path(OO.png_path);
	
	S.context.set_svg_path(OO.svg_path);
	
	S.context.set_vault_path(OO.vault_path)
	
	S.assets.load_breakdown('csv');
	
	S.portals.load_from_scene();
	
	var portal_list = S.portals.get_list();

	for(var p = 0 ; p < portal_list.length; p++){
		
		var current_portal = portal_list[p]
		
		var linked_asset = S.assets.get_asset_by_code(current_portal.get_code());
		
		if(linked_asset != false){
			
			//checking asset type
			if(linked_asset.get_type() == _asset_type || _asset_type == "ALL" ){
				
				
				S.log.add("pulling png of - "+current_portal.get_code(),"process");
				
				if(current_portal.png_exist()){

					var png_node = S.portals.pull(current_portal,'png');		

					// should load the path from the portal and not check again with asset context __ weird logic. 
					
					var full_svg_path = S.context.get_asset_data_path(linked_asset,"svg");

					// if the bg has cadres that match the shot name. 
					
					var bg_cadre = S.load_cadre(full_svg_path);
					
					// only for png , the image is scaled automaticly on import
					// to compensate this we put the image back to its original pixel size with the following code :
					
					if(bg_cadre.bg != undefined){
						
						var final_sy = bg_cadre.bg.height/1080;
						
						var final_sx = final_sy;
						
						//INJECT SX
						png_node.attributes.scale.x.setValue(final_sx);
						
						//INJECT SY
						png_node.attributes.scale.y.setValue(final_sy);				
					
					}

				}else{

					S.log.add("png not found - "+S.context.get_asset_data_path(linked_asset,"png"),"error");

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
	
	S.context.set_vault_path(OO.vault_path)
	
	S.assets.load_breakdown('csv');
	
	var portal_list = S.portals.get_list(); 
	
	
	for(var p = 0 ; p < portal_list.length; p++){
		
		var current_portal = portal_list[p]
		
		var current_portal_tree = current_portal.get_tree();
		
		var portal_peg = current_portal_tree.get_key_node("PORTAL_PEG");
		
		var linked_asset = S.assets.get_asset_by_code(current_portal.code);
		
		if(current_portal.png_exist()){
			
			var full_svg_path = S.context.get_svg_path(linked_asset);
			
			//MessageLog.trace("SVG_PATH : ");
			
			//MessageLog.trace(full_svg_path);

			var bg_cadre = S.load_cadre(full_svg_path);
			
			if(bg_cadre != false){
				
				if(bg_cadre.hasOwnProperty('rect')==true){
					
					S.trees.fit_cadre_to_camera(portal_peg,bg_cadre);
					
					S.log.add("[SVG] cadres detected ! ","success");				
					
				}else{
					
					//we compensate the bg secu
					
					S.trees.scale_to_camera(portal_peg);
					
					S.log.add("[SVG] no cadre detected , scaling secu by default ","error");					
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
	
	S.context.set_vault_path(OO.vault_path)
	
	S.assets.load_breakdown('csv');
	
	S.portals.load_from_scene();
	
	var portal_list = S.portals.get_list(); 
	
	for(var p = 0 ; p < portal_list.length; p++){
		
		var current_portal = portal_list[p]
		
		var current_portal_tree = current_portal.get_tree(); 
		
		var portal_peg = current_portal_tree.get_key_node("PORTAL_PEG");
		
		var linked_asset = S.assets.get_asset_by_code(current_portal.get_code());
		
		if(current_portal.png_exist()){
			
			var full_svg_path = S.context.get_svg_path(linked_asset);
			
			//MessageLog.trace("SVG_PATH : ");
			
			//MessageLog.trace(full_svg_path);

			var bg_cadre = S.load_cadre(full_svg_path);
			
			if(bg_cadre != false){
				
				if(bg_cadre.hasOwnProperty('rect')==true){
					

					S.trees.fit_cadre_to_camera(portal_peg,bg_cadre);
					
					S.log.add("[SVG] cadres detected ! ","success");
					
				}else{
					
					//we compensate the bg secu
					
					S.trees.scale_to_camera(portal_peg);
					
					S.log.add("[SVG] no cadre detected , scaling secu by default ","error");
					
				}				
				
			}else{
				
				
			}
		}
	}	

	S.log.save();
	
}


function pull_psd(){
	
	//////MessageLog.trace("PULL PSD FUNCTION");
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/pull_psd.html");
	
	S.context = new OO.Context(this,"Shotgun");	
	
	S.portals.load_from_scene();
	
	var portal_list = S.portals.get_list();

	for(var p = 0 ; p < portal_list.length; p++){
		
		var current_portal = portal_list[p]
		
		if(current_portal.psd_exist()){


			var full_psd_path = current_portal.get_path('psd');
			
			//MessageLog.trace(full_psd_path);
			
			S.log.add(full_psd_path+" --- > pulling","process");
			
			var bg_node = S.portals.pull(current_portal,'psd');		
			
			S.log.add(full_psd_path+" --- > psd pulled","success");
		
		}

	}	

	S.log.save();
	
}




//DESIGN SCRIPT : 


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
	

	//MessageLog.trace(S.context.set_from_scene_path()); 
	
	var current_asset = S.context.get_current_asset();
	var prefilled_path = ""; 
	
	var library_asset_path = S.context.get_asset_data_path(current_asset,"png");
	
	//MessageLog.trace("PATH PNG");
	
	S.portals.load_from_node_list(OO.doc.selectedNodes);
	
	S.context.set_context_type('Shotgun');	
	
	S.assets.load_breakdown('csv');
	
	var portal_list = S.portals.list.get_list(); 
	
	if(portal_list.length > 0 ){
		
		var current_portal = portal_list[0]
		
		library_asset_path = current_portal.get_path('png');
		
	}	
	
	//MessageLog.trace(library_asset_path);
	
	var dialog = new Dialog();
	dialog.title = "EXPORT ASSET PNG";
	dialog.width = 400;
	
	var userCode = new LineEdit();
	userCode.label = "png path";
	userCode.text = library_asset_path;
	dialog.add( userCode );	
	
	var userType = new LineEdit();
	userType.label = "scale image";
	userType.text = 1.5;
	dialog.add( userType );	
	
	if (dialog.exec()){
		
		S.views.export_currentframe_png_to(userCode.text,userType.text);

	}
	
}



// RIG

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


function copy_node_name_process(){
	
	var snodes = selection.selectedNodes(); 
	
	//MessageLog.trace(snodes);
	
	    var d = new Dialog
	    d.title = "COPY NODE NAME";
	    d.width = 100;

		var INPUTX = new ComboBox();
		 INPUTX.label = "SOURCE  : ";
		 INPUTX.editable = false;
		 INPUTX.itemList = snodes;
		d.add(INPUTX);
			
		var INPUTY = new ComboBox();
		 INPUTY.label = "TARGET  : ";
		 INPUTY.editable = false;
		 INPUTY.itemList = snodes;
		d.add(INPUTY);	
		
		var INPUTP = new ComboBox();
		 INPUTP.label = "PREFIX  : ";
		 INPUTP.editable = true;
		 INPUTP.itemList = ["","FRONT_","BACK_"];
		d.add(INPUTP);	
		
	if ( d.exec() ){

		var source_node = $.scene.getNodeByPath(INPUTX.currentItem);
		var target_node = $.scene.getNodeByPath(INPUTY.currentItem);				
		var prefix = INPUTP.currentItem;				
			
		var new_name = prefix+source_node.name+"_";
			
		target_node.name = new_name 
		
		selection.clearSelection();
		selection.addNodeToSelection(INPUTY.currentItem)
	} 
	
}


function update_movie_path(_writer_node,_render_path) {
	
		var render_path = generate_render_path()

		//node.setTextAttr(writer_node, "EXPORT_TO_MOVIE",1,"Output Movie")
		node.setTextAttr(_writer_node, "MOVIE_PATH",1,_render_path);
		//node.setTextAttr(writer_node, "DRAWING_NAME",1,render_path);
		
}

function quick_update_movie_path(_render_path) {
	
		var _writer_node = "Top/RENDER_MOV"

		//node.setTextAttr(writer_node, "EXPORT_TO_MOVIE",1,"Output Movie")
		node.setTextAttr(_writer_node, "MOVIE_PATH",1,_render_path);
		//node.setTextAttr(writer_node, "DRAWING_NAME",1,render_path);
		
}

function get_scene_render_path(){
	
		return scene.currentProjectPathRemapped()	

	
}

function send_video_as_version(){
	
	var S = new OO.SceneManager();	
	
	S.context = new OO.Context(this,"Shotgun");	
	
	S.context.set_from_scene_path();
	
	S.write_scene_path_backdrop();
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/send_version_video");
	
	
	//MessageLog.trace("send video as version");
	
	//$.scene.renderWriteNodes(false,,,,,,"P:/pipeline/alexdev/batch/after_render/after_render.js")
	
	var scene_path = S.context.get_scene_path();	
	
	var video_name = "video_test"; 
	
	var final_path = scene_path+"/frames/"+video_name
	
	quick_update_movie_path(final_path);
	
	//$.scene.renderWriteNodes(false,"","","","","","//MessageLog.trace(render is finished)")
	$.scene.renderWriteNodes(false,"","","","","","P:/pipeline/alexdev/batch/after_render/after_render.js")
	
}

function background_render_scene(){
	
	$.scene.renderWriteNodes(false);
	
}

function create_asset_dir(){
	
	//MessageLog.trace("ASSSET DIR");
	
	var S = new OO.SceneManager();	
	
	S.context = new OO.Context(this,"Shotgun");	
	
	S.context.set_context_type('Shotgun');	

	S.context.set_svg_path(OO.svg_path);
	
	S.assets.load_project_assets("csv")

	for(var i = 0 ; i < S.assets.project_assets.length ; i ++){
		
		var current_asset = S.assets.project_assets[i];
		
		if(current_asset.get_type() == "BG"){
			
			var type = current_asset.get_type();
			
			var code = current_asset.get_code();
			
			//MessageLog.trace(code);
			
			
			var dir_path = "P:/projects/billy/pre_shotgun/batch_pool/directory/"+type+"/"+code+"/";
			
			//var files = S.context.find_file_by_extension(dir_path,"png");
			
			////MessageLog.trace(dir_path);
			
			////MessageLog.trace(files[0]);
			
			var test_path ="P:/projects/billy/pre_shotgun/batch_pool/directory/test/";
			
			S.context.get_last_publish_dir(test_path);
			
			//var asset_dir = new $.oFolder(final_path).create();
	
		}
		
	}
	
}


/*==================================================================================================================================================================

	AUTOLIPS

==================================================================================================================================================================*/


function autolips_dialog(){
	
	// selection and character detection 

	var snodes = selection.selectedNodes(); 
	
	var first_selected_node = snodes[0];
	
	var character_detector = new OO.CharacterDetector()
	character_detector.set_source_layer_path(first_selected_node)
	var detected_character = character_detector.get_character();
	
	// user input
	
	var d = new Dialog
	d.title = "AUTOLIPS";
	d.width = 100;

	var INPUT_CHARACTER = new ComboBox();
	INPUT_CHARACTER.label = "CHARACTER  : ";
	INPUT_CHARACTER.editable = false;
	INPUT_CHARACTER.itemList = [detected_character,"CH_BILLY","CH_JC","CH_SUZIE","CH_SCOTT","CH_JACK"];
	d.add( INPUT_CHARACTER);
		
	var INPUT_EMOTION = new ComboBox();
	INPUT_EMOTION.label = "EMOTION  : ";
	INPUT_EMOTION.editable = false;
	INPUT_EMOTION.itemList = ["","HAPPY","SAD"];
	d.add(INPUT_EMOTION);	

	if ( d.exec() ){

		var selected_character = INPUT_CHARACTER.currentItem;
		var selected_emotion = INPUT_EMOTION.currentItem;	

		//scene context (to replace with shotgun real infos) 
		
		var S = new OO.SceneManager();
		S.context = new OO.Context(this,"Shotgun");	
		S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/import_lipsing.html");
		var context_episode = S.context.get_episode();
		var context_shot = S.context.get_shot();
		
		// lips import process
		
		var lips_importer = new OO.LipsImporter()
		lips_importer.set_source_detec_path("P:/projects/billy/detection/")
		lips_importer.set_episode(context_episode)
		lips_importer.set_shot(context_shot)	
		lips_importer.set_character(selected_character)
		lips_importer.set_emotion(selected_emotion)
		
		lips_importer.import_lips();
		
		S.log.add("lips for character "+selected_character+" imported");
		
		
	}
		
}






function generate_shot_lipsdetection_for_character(_character){
	
	var S = new OO.SceneManager();
	
	S.context = new OO.Context(this,"Shotgun");	
	
	var current_episode = S.context.get_episode();
	var current_shot = S.context.get_shot();
	var current_character = _character;
	
	var storyboard_outputs = new OO.StoryboardOutputManager()
	
	storyboard_outputs.set_root_folder_path("P:/projects/billy/pre_shotgun/sbp_exports/");
	storyboard_outputs.set_current_shot(current_shot);
	storyboard_outputs.set_current_episode(current_episode);
	
	
	var lips_detection = new OO.LipsDetectionManager();
	lips_detection.set_root_folder_path("P:/projects/billy/detection/")
	lips_detection.set_current_episode(current_episode)
	lips_detection.set_current_shot(current_shot)
	lips_detection.set_current_character(current_character)
	
	
	storyboard_outputs.fetch_current_shot_voice_tracks();
	var current_voice_track_object = storyboard_outputs.get_shot_voice_track_by_character_name(current_character);
	var source_wave_file = current_voice_track_object.get_path();	
	
	lips_detection.create_shot_lipsdetection_folder()
	lips_detection.generate_lipsdetection_txt_from_wave(source_wave_file);
	
}











/*

	B A T C H   M O D E

*/



function get_bg_preview_path(){
	
	var S = new OO.SceneManager();	
	
	S.context = new OO.Context(this,"Shotgun");	
	
	S.context.set_bg_preview_path(OO.bg_preview_path)
	
	return S.context.generate_bg_preview_render_path()
	
}

function batch_preview_bg(){
		
	import_project_settings();

	import_setup('shot');

	create_portals('bg');
	
	pull_("bg");
	
	fit_bg_to_camera();
	
	//turnoff_burnin()
	
	//check_composite_to_2d()

	//background_render_scene()

	//MessageLog.trace("SAVING...");
	
	var saving = scene.saveAll();
		
	MessageLog.trace("scene was saved : "+saving);	


}


// BG LAYOUT 

function batch_update_bg_paths(){
		
	MessageLog.trace("BATCH UPDATE BG PATHS FROM VAULT ...");

	update_portals_paths_by_type('bg');

	var saving = scene.saveAll();
		
	MessageLog.trace("scene was saved : "+saving);

}

function batch_empty_bg_portals(){
		
	MessageLog.trace("BATCH EMPTY BG PORTALS...");
	
	empty_portals('bg')

	var saving = scene.saveAll();
		
	MessageLog.trace("scene was saved : "+saving);
}


function batch_pull_png_bg_portals(){
		
	MessageLog.trace("BATCH PULL PNG ON BG PORTALS...");
	
	pull_('bg')
	
	var saving = scene.saveAll();
		
	MessageLog.trace("scene was saved : "+saving);	

}






function batch_increase_atq_filter_brightness(){
		
	MessageLog.trace("BATCH INCREASE ATQ FILTER BRIGHTNESS...");

	 node.setTextAttr("Top/ATQ_BC","BRIGHTCONTRAST_BRIGHTNESS_ADJUSTMENT", frame.current(),100);
	
	var saving = scene.saveAll();
		
	MessageLog.trace("scene was saved : "+saving);	

}








function batch_box_anim(){
		
	//import_project_settings()

	//import_setup('shot')

	//create_portals('bg')
	
	//pull_("anim");
	
	//fit_bg_to_camera();
	
	//turnoff_burnin()
	
	//check_composite_to_2d()

	background_render_scene()

	//MessageLog.trace("SAVING...");

	var saving = scene.saveAll();
	
	//MessageLog.trace("scene was saved : "+saving);	

}


// TO DO : UPDATE PORTALS 

function turnoff_burnin(){
	
	 node.setEnable("Top/BURNIN_FRAME",false);
	 node.setEnable("Top/BURNIN_SCENE_INFOS",false);
	 node.setEnable("Top/BURNIN_TIME_CODE",false);
	 node.setEnable("Top/BURNIN_SHOT_INFOS",false);
	 node.setEnable("Top/BURNIN_DATE",false);
	
}

function check_composite_to_2d(){
	
	node.setTextAttr("Top/CHECKC", "COMPOSITE_2D", frame.current(),"Y");
	//MessageLog.trace("COMPOSITE_2D to Y ")
	//MessageLog.trace(node.getTextAttr("Top/CHECKC", frame.current(),"COMPOSITE_2D"))
	
}






function orwell_sanity_check(){

	return (2+2 == 4); 
	
}
