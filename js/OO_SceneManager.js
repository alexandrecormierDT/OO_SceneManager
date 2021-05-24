// S C E N E  M A N A G E R ---- TBSCRIPTS //

var OO = {}
$.batchMode = true;
OO.doc = $.scn;

//CLASSES

include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/OO_class_import.js");

//CONFIG

include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/OO_config.js");


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



//FILTERS

OO.filter_string =function(_str){
	
	var sanitizer = new OO.Sanitizer();  
	return  sanitizer.clean_string_general(_str); ;

}


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
	
	var note_name = "pref_"+_script_name;

	node.add("Top",note_name,"NOTE");
	
	var pref_note = OO.doc.getNodeByPath(note_name);
	
	var json_string = JSON.stringify(_pref_object);
	
	pref_note.attributes.text.setValue(json_string);

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
	
	////MessageLog.trace(billy_shot_list);
	
}















// TREE MANIPULATIONS

function create_tree_with_selection(){
	
	// save the scene ! 
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/add_tree.html");

	var selected_nodes = OO.doc.selectedNodes; 
	
	var TREE_CODE = "";
	
	////MessageLog.trace(selected_nodes);
	
	
	
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
	
	////MessageLog.trace("MODULES");
	
	////MessageLog.trace(fetched_map_modules);
	
	selection.clearSelection ()
	
	for(var n = 0 ; n < fetched_map_modules.length ; n++){
		
		var current_map_module = fetched_map_modules[n]; 
		
		var ntree = S.trees.instaciate_tree_with_map_module(current_map_module);
		
		ntree.select_nodes();
		
		ntree.update_map_module("treeid","hallo");
		
	}
	
	////MessageLog.trace(selected_nodes);
	
}



function show_layer_ID(){
	
	var S = new OO.SceneManager();	
	
	var selection = OO.doc.selectedNodes;
	
	////MessageLog.trace(S.trees.get_node_smlayerid(selection[0]));
	
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
	
	//see OO_config.js
	S.set_scene_settings(OO.project_settings);
	
	S.log.save();
	
	var log_object = S.log;
	
	return log_object;
	
}

function  import_billy_settings(){
	
	var log_object = import_project_settings("billy");
	
	log_object.set_script_tag("OO_import_billy_settings"); 
	log_object.create_scene_script_log_file_and_folder(); 
	log_object.save_scene_script_log_file();	
	
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
	;	
	
	return S.log 
	

} 


function import_layout_setup(){
	
	var log_object = import_setup('shot');
	
	log_object.set_script_tag("OO_import_layout_setup"); 
	log_object.create_scene_script_log_file_and_folder(); 
	log_object.save_scene_script_log_file(); 	
	
}
 

function load_anim_setup(){
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/load_anim_setup.html");
	
	S.context = new OO.Context(this,"Shotgun");
	
	S.context.set_library_path(OO.library_path);
	
	S.context.set_psd_path(OO.psd_path);
	
	var shot_setup = S.setups.apply('shot');	
	
	S.context.set_video_export_path(OO.video_export_path)
	var video_render_path = S.context.generate_bg_preview_render_path();
	
	S.render.set_movie_render_path(video_render_path)
	S.render.update_write_movie_render_path()

	S.log.save();

} 



//============================================================================================================================================

// PORTAL SCRIPT 

//============================================================================================================================================


function create_empty_portal(){
	
	var S = new OO.SceneManager();	
	
	S.log.set_script_tag("OO_create_empty_portal"); 
	S.log.create_scene_script_log_file_and_folder()
	S.context.set_library_path(OO.library_path);
	S.context.set_vault_path(OO.vault_path);
	
	var asset_code_list = S.assets.get_asset_code_string_list(); 
	
	var dialog = new Dialog();
	dialog.title = "CREATE PORTAL";
	dialog.width = 200;
	
	// put the whole list of asset here. 
	
	var userCode = new ComboBox();
	userCode.label = "Asset code";
	userCode.editable = true;
	userCode.itemList = asset_code_list;
	userCode.currentItem = "";
	dialog.add( userCode );
	
	var userType = new ComboBox();
	userType.label = "Asset type";
	userType.editable = true;
	userType.itemList = ["Character", "Prop", "Fx","bg","Vehicle"];
	dialog.add( userType );
	
	var userDepartement = new ComboBox();
	userDepartement.label = "Departement"
	userDepartement.editable = true;
	userDepartement.itemList = ["design", "rig", "anim","bg","layout","boxanim"];
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
		

		
		S.log.add('[CREATE PORTAL]','process');
		S.log.add('[ASSET_CODE] : '+asset_code,'user_input');
		S.log.add('[ASSET_TYPE] : '+asset_type,'user_input');
		S.log.add('[DEPARTEMENT] : '+departement,'user_input');
		
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

		S.log.save_scene_script_log_file(); 
		;		
		
		
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



function pull_tpl_by_asset_type(_asset_type){
	
	var S = new OO.SceneManager();	

	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/pull_asset_tpl.html");
	
	S.context.set_context_type('Shotgun');	
	
	S.context.set_library_path(OO.library_path);	
	
	S.context.set_vault_path(OO.vault_path)
	
	S.assets.load_breakdown('csv');
	
	S.portals.pull_scene_portal_tpl_by_asset_type(_asset_type)
	
	;
	return S.log;
	
	
}

function pull_tpl_anim(){
	
	var log_object = pull_tpl_by_asset_type("anim");
	
	log_object.set_script_tag("OO_pull_tpl_anim"); 
	log_object.create_scene_script_log_file_and_folder(); 
	log_object.save_scene_script_log_file(); 
	
}




function pull_png_by_asset_type(_asset_type){
	
	////////MessageLog.trace("PULL PSD FUNCTION");
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/pull_asset_type.html");

	
	S.context.set_context_type('Shotgun');	
	
	S.context.set_library_path(OO.library_path);
	
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
				
				S.log.add("[PULL_PNG] pulling png of - "+current_portal.get_code(),"process");
				
				if(current_portal.png_exist()){

					var png_node = S.portals.pull(current_portal,'png');		

					// should load the path from the portal and not check again with asset context __ weird logic. 
					
					var full_svg_path = S.context.get_asset_data_path(linked_asset,"svg");

					// if the bg has cadres that match the shot name. 
					
					var bg_cadre = S.load_cadre(full_svg_path);
					
					// only for png , the image is scaled automaticly on import
					// to compensate this we put the image back to its original pixel size with the following code :
					
					if(bg_cadre.bg != undefined){
						
						S.log.add("[PULL_PNG] reading bg  - "+ bg_cadre.bg.height,"process");
						S.log.add("[PULL_PNG] reading bg  - "+ bg_cadre.bg.height,"process");
						
						var final_sy = bg_cadre.bg.height/1080;
						
						var final_sx = final_sy;
						
						//INJECT SX
						png_node.attributes.scale.x.setValue(final_sx);
						
						//INJECT SY
						png_node.attributes.scale.y.setValue(final_sy);				
					
					}

				}else{

					S.log.add("[PULL_PNG] png not found - "+S.context.get_asset_data_path(linked_asset,"png"),"error");

				}			
				
			}
		
		}
		


	}	
	
	

	S.log.save();
	
	
	var log_object = S.log;
	
	return log_object;
	
} 


function pull_png_bg(){
	
	var log_object = pull_png_by_asset_type("bg");
	
	log_object.set_script_tag("OO_pull_png_bg"); 
	log_object.create_scene_script_log_file_and_folder(); 
	log_object.save_scene_script_log_file(); 
	
}

function pull_png_anim(){
	
	var log_object = pull_png_by_asset_type("anim");
	
	log_object.set_script_tag("OO_pull_png_anim"); 
	log_object.create_scene_script_log_file_and_folder(); 
	log_object.save_scene_script_log_file(); 
	
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
	
	////////MessageLog.trace("PULL PSD FUNCTION");
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/pull_portal.html");
	
	S.portals.load_from_node_list(OO.doc.selectedNodes);
	
	S.context.set_context_type('Shotgun');	

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
										
										////MessageLog.trace("PNG HEIGHT");
						
										////MessageLog.trace(cadre.bg.height);
										
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
	;	

	var log_object = S.log;
	
	return log_object 

} 




function push_selected_portals(_data_type){
	
	////MessageLog.trace("PUSH PORTAL FUNCTION");
	
	var S = new OO.SceneManager();	
	
	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/push_portal.html");
	
	S.portals.load_from_node_list(OO.doc.selectedNodes);
	
	S.context.set_context_type('Shotgun');	
	
	S.assets.load_breakdown('csv');
	
	var portal_list = S.portals.get_list()

	for(var p = 0 ; p < portal_list.length; p++){
		
		S.context.get_psd_path
		
		var current_portal = portal_list[p];
			
		////MessageLog.trace(current_portal.code);
		
		S.portals.push_portal(current_portal,_data_type);
			
	}	

	S.log.save();
	;
	
	var log_object = S.log;
	
	return log_object 
	
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
	
	S.log.add("updating PSD path from vault - ( "+path_attributes_object.psd_path+" ) " ,"process");
	S.log.add("updating PNG path from vault - ( "+path_attributes_object.png_path+" ) " ,"process");
	S.log.add("updating TPL path - ( "+path_attributes_object.tpl_path+" ) " ,"process");
	
	//udpate 
	
	S.portals.update_portal_script_module_attributes(_portal,path_attributes_object); 
	
}





function update_portals_paths_by_type(_asset_type){
	
	////MessageLog.trace("update_portals_paths_by_type")
	
	var S = new OO.SceneManager();	
		
	
	S.context.set_library_path(OO.library_path);	
	
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
	;
	
	var log_object = S.log;
	
	return log_object 
	
};




function update_bg_portals_paths(){
	
	var log_object = update_portals_paths_by_type('bg');
	
	log_object.set_script_tag("OO_update_bg_portals_paths"); 
	log_object.create_scene_script_log_file_and_folder(); 
	log_object.save_scene_script_log_file(); 	
	
}

function update_anim_portals_paths(){
	
	var log_object = update_portals_paths_by_type('anim');
	
	log_object.set_script_tag("OO_update_anim_portals_paths"); 
	log_object.create_scene_script_log_file_and_folder(); 
	log_object.save_scene_script_log_file(); 	
	
}

// ASSET PORTALS 

function create_portals(_asset_type){
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/create_asset_portals.html");
	S.log.set_script_tag("OO_create_empty_portal"); 
	S.log.create_scene_script_log_file_and_folder()


	S.context.set_context_type('Shotgun');	
	
	S.context.set_library_path(OO.library_path);	
	
	S.context.set_vault_path(OO.vault_path)
	
	S.assets.load_breakdown('csv');
	
	var target_backdrop = false;
	
	var target_composite = false;
	
	//MessageLog.trace("_asset_type");
	//MessageLog.trace(_asset_type);
	
	switch(_asset_type){
		
		case ('bg'):
		case ('BG'):
		
			
			target_backdrop = S.get_backdrop_by_name('BG');
			target_composite = OO.doc.getNodeByPath("Top/BG-C");
		
		break; 
		
		case('Character'):
		case('Prop'):
		case('FX'):
		case('anim'):
		
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
	
	S.portals.load_from_scene();
	
	if(target_composite != undefined){
		
		
		//responability problem 
		S.portals.reset_list();
		
		S.load_asset_portals_by_type(_asset_type);
		
		//MessageLog.trace("S.portals.get_list()");
		//MessageLog.trace(S.portals.get_list());
	
		
		if(_asset_type == "anim"){
			
			//this is dirty i know
			S.portals.reset_list();
			S.load_asset_portals_by_type("Character");
			S.load_asset_portals_by_type("Prop");
			S.load_asset_portals_by_type("FX");
			
		}
			

		
		S.place_portal_list_in_setup(point,target_composite);
		
	}

	S.log.save();
	;
	
	var log_object = S.log;


	
	return log_object 
	
}

function create_bg_portals(){
	
	var log_object = create_portals('bg')
	
	log_object.set_script_tag("OO_create_bg_portals"); 
	log_object.create_scene_script_log_file_and_folder(); 
	log_object.save_scene_script_log_file(); 
}

function create_anim_portals(){
	
	var log_object = create_portals('anim')
	
	log_object.set_script_tag("OO_create_anim_portals"); 
	log_object.create_scene_script_log_file_and_folder(); 
	log_object.save_scene_script_log_file(); 
	
	
}











function create_master_asset_portal(){
	
	// context detection 
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/create_master_asset_portal.html");

	
	S.context.set_context_type('Shotgun');	
	S.context.set_library_path(OO.library_path);	
	S.context.set_vault_path(OO.vault_path)
	
	var target_backdrop = false;
	var target_composite = false;
	
	target_backdrop = S.get_backdrop_by_name('TPL_EXPORT');
	target_composite = OO.doc.getNodeByPath("Top/TPL_EXPORT_C");	
	
	if(target_backdrop == false){
		
		target_backdrop = {x:0,y:0};
		
	}

	var point = {
		
		x:target_backdrop.x + 400,
		y:target_backdrop.y + 400 
	}
	
	if(target_composite != undefined){
		
		var master_asset = S.get_scene_master_asset();
		
		S.create_single_asset_portal(master_asset,point,target_composite)
		
	}

	S.log.save();	
	
	S.log.set_script_tag("OO_create_master_asset_portal"); 
	S.log.create_scene_script_log_file_and_folder(); 
	S.log.save_scene_script_log_file(); 	

}







//----------------------------------------------------------------------------------------------- P U B L I S H -----------------------------------------------------------------//
//----------------------------------------------------------------------------------------------- P U B L I S H -----------------------------------------------------------------//
//----------------------------------------------------------------------------------------------- P U B L I S H -----------------------------------------------------------------//

	// WARINING !  this function is runned when publishing an asset scene by jhonie shotgun python script


function push_master_asset_portal_to_folder(){
	
	// context detection 

	var S = new OO.SceneManager();	
	
	S.context.set_context_type('Shotgun');	
	S.context.set_library_path(OO.library_path);	
	
	var master_asset = S.get_scene_master_asset();
	
	S.log.add(branch,"branch")
	S.log.add(master_asset.get_code(),"ASSET_CODE"); 
	
	
	var master_asset_portal = S.portals.get_scene_portal_by_asset(master_asset); 
	
	if(master_asset_portal != false){
		
		S.portals.push_portal(master_asset_portal,'tpl')
		var tpl_export_path  = master_asset_portal.get_path('tpl');
		S.log.add(tpl_export_path ,"PIPELINE");
		
	}else{
		
		S.log.add("no portal found in the nodeview for  "+master_asset.get_code(),"error");
	}
	
	//LOG
	
	S.log.create_new_log_file("P:/projects/billy/logs/push_master_asset_portal.html");
	S.log.save();	
	
	S.log.set_script_tag("OO_push_master_asset_portal_to_folder"); 
	S.log.create_scene_script_log_file_and_folder(); 
	S.log.save_scene_script_log_file(); 	
	
}


//----------------------------------------------------------------------------------------------- P U B L I S H -----------------------------------------------------------------//
//----------------------------------------------------------------------------------------------- P U B L I S H -----------------------------------------------------------------//
//----------------------------------------------------------------------------------------------- P U B L I S H -----------------------------------------------------------------//













function empty_portals(_asset_type){
	
	var S = new OO.SceneManager();	

	S.context.set_context_type('Shotgun');	
	
	S.assets.load_breakdown('csv');
	
	S.portals.load_from_scene();
	
	var portal_list = S.portals.get_list(); 

	for(var p = 0 ; p < portal_list.length; p++){
	
		var current_portal = portal_list[p]
		
		var linked_asset = S.assets.get_asset_by_code(current_portal.get_code());
		
		if(linked_asset.get_type() == _asset_type){
			
			S.portals.empty(current_portal);
			
		}
		
	}
	
	;
	return S.log;

}

function empty_bg_portals(){
	
	
	var log_object = empty_portals('bg');
	
	log_object.set_script_tag("OO_empty_bg_portals"); 
	log_object.create_scene_script_log_file_and_folder(); 
	log_object.save_scene_script_log_file(); 	
}



// SELECTED  PORTALS

function fit_selected_portals_to_camera(){
	
	// loop through bg portals and change thier layout peg transform in order to fit the cadre of the current shot with the scene camera. 
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/fit_bg_to_camera.html");

	
	S.portals.load_from_node_list(OO.doc.selectedNodes);
	
	S.context.set_context_type('Shotgun');	
	
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
			
			////MessageLog.trace("SVG_PATH : ");
			
			////MessageLog.trace(full_svg_path);

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
	;
	S.log.save();
	
}

// ALL PORTALS

function fit_bg_to_camera(){
	
	//FIT BG TO CAMERA
	
	// loop through bg portals and change thier layout peg transform in order to fit the cadre of the current shot with the scene camera. 
	
	var S = new OO.SceneManager();	
	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/fit_bg_to_camera.html");

	
	S.context.set_context_type('Shotgun');	
	
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
			
			var full_svg_path = S.context.get_asset_data_path(linked_asset,'svg');

			var bg_cadre = S.load_cadre(full_svg_path);
			
			if(bg_cadre != false){
				
				if(bg_cadre.hasOwnProperty('rect')==true){
					
					S.trees.fit_cadre_to_camera(portal_peg,bg_cadre);
					S.log.add("[SVG] cadres detected ! ","success");
					
				}else{
					
					//we compensate the bg secu
					
					S.trees.scale_to_camera(portal_peg)
					S.log.add("[SVG] no cadre detected , scaling secu by default ","error");
					
				}				
				
			}else{
				
				
			}
		}
	}	
	
	S.log.save();	
	
	S.log.set_script_tag("OO_fit_bg_to_camera"); 
	S.log.create_scene_script_log_file_and_folder(); 
	S.log.save_scene_script_log_file();
	;
	
}


function pull_psd(){
	
	////////MessageLog.trace("PULL PSD FUNCTION");
	
	var S = new OO.SceneManager();	
	
	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/pull_psd.html");
	
	S.context = new OO.Context(this,"Shotgun");	
	
	S.portals.load_from_scene();
	
	var portal_list = S.portals.get_list();

	for(var p = 0 ; p < portal_list.length; p++){
		
		var current_portal = portal_list[p]
		
		if(current_portal.psd_exist()){


			var full_psd_path = current_portal.get_path('psd');
			
			////MessageLog.trace(full_psd_path);
			
			S.log.add(full_psd_path+" --- > pulling","process");
			
			var bg_nodes = S.portals.pull(current_portal,'psd');		
			
			S.log.add(full_psd_path+" --- > psd pulled","success");
		
		}

	}	

	S.log.save();
	
}


/*------------------------------------------------------------------------------------------------------------------------------------------------



		DESIGN


-------------------------------------------------------------------------------------------------------------------------------------------------------*/





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
	
	S.portals.load_from_node_list(OO.doc.selectedNodes);
	
	S.context.set_context_type('Shotgun');	
	
	S.assets.load_breakdown('csv');
	
	
	
	var portal_list = S.portals.get_list(); 
	
	if(portal_list.length > 0 ){
		
		var current_portal = portal_list[0];
		
		current_asset = new OO.Asset({
			code: current_portal.get_code(),
			sg_asset_type:current_portal.get_sg_asset_type()
		})
		

		library_asset_png_path = S.context.get_asset_data_path(current_asset,"png");
		
		library_asset_png_folder_path = S.context.get_dir_path(current_asset,"png");

		
		var dialog = new Dialog();
		dialog.title = "EXPORT ASSET PNG";
		dialog.width = 400;
		
		var userCode = new LineEdit();
		userCode.label = "png path";
		userCode.text = library_asset_png_path;
		dialog.add( userCode );	
		
		var userScale = new LineEdit();
		userScale.label = "scale image";
		userScale.text = 1.5;
		dialog.add( userScale );	
		
		if (dialog.exec()){
			
			var dir_object = new $.oFolder(library_asset_png_folder_path)
			
			if(dir_object.exists == false){
				
				dir_object.create();
				
			}
			
			var user_png_path = OO.filter_string(userCode.text)
			
			var user_scale = OO.filter_string(userScale.text)
			
			var user_png_path
			
			S.views.export_currentframe_png_to(user_png_path,user_scale);

		}		
		
		
	
	}	
	

	
}



/*------------------------------------------------------------------------------------------------------------------------------------------------



		RIG



-------------------------------------------------------------------------------------------------------------------------------------------------------*/



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
	
	////MessageLog.trace(snodes);
	
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

function add_sub_folder_to_selected_mcs_dialog(){
	
	MessageLog.trace("add_sub_folder_to_selected_mcs_dialog");
	
	var S = new OO.SceneManager();	
	
	S.context = new OO.Context(this,"Shotgun");
	var asset_code_list = S.assets.get_asset_code_string_list(); 
	
	var selected_nodes = selection.selectedNodes(); 
	
	var MCM = new OO.MCManager();
	
	MCM.fetch_mcs_from_node_list(selected_nodes); 
	
	var d = new Dialog
	d.title = "COPY NODE NAME";
	d.width = 100;
	
	var INPUT_SUB_FOLDER_NAME = new ComboBox();
	INPUT_SUB_FOLDER_NAME.label = "SUB FOLDER NAME : ";
	INPUT_SUB_FOLDER_NAME.editable = true;
	INPUT_SUB_FOLDER_NAME.itemList = asset_code_list;
	d.add(INPUT_SUB_FOLDER_NAME);	
		
	if ( d.exec() ){
		
		var sub_folder_name = INPUT_SUB_FOLDER_NAME.currentItem
		
		MessageLog.trace("sub_folder_name");
		MessageLog.trace(sub_folder_name);
		
		MCM.add_sub_folder_to_mcs(sub_folder_name); 
		
	}
	
}






/*------------------------------------------------------------------------------------------------------------------------------------------------



		UPLOAD PREVIEW TO SHOTGUN 



-------------------------------------------------------------------------------------------------------------------------------------------------------*/




// for users

function upload_render_as_SG_version_dialog(){
	
	MessageLog.trace("UPLOAD PREVIEW TO SHOTGUN");
	
	var S = new OO.SceneManager();	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/upload_render_as_SG_version.html");
	S.context = new OO.Context(this,"Shotgun");	
	
	var sanitizer = new OO.Sanitizer();
	
	
	S.context.set_from_scene_path();
	var input_task_name = S.context.get_task()
	var input_version_name = "versioname";
	var input_task_status = "psr";
	var input_shot_name = S.context.get_shot()
	
	var d = new Dialog
	d.title = "UPLOAD PREVIEW TO SHOTGUN";
	d.width = 500;


	var INPUT_SHOT_NAME= new ComboBox();
	 INPUT_SHOT_NAME.label = "SHOT NAME : ";
	 INPUT_SHOT_NAME.editable = true;
	 INPUT_SHOT_NAME.itemList = [];
	 INPUT_SHOT_NAME.currentItem = input_shot_name;
	d.add(INPUT_SHOT_NAME);
		
	var INPUT_TASK_NAME= new ComboBox();
	 INPUT_TASK_NAME.label = "TASK NAME : ";
	 INPUT_TASK_NAME.editable = true;
	 INPUT_TASK_NAME.itemList = ["animatic","layout_bg","bg","pl_box_anim","blocking","animation","compositing"];
	 INPUT_TASK_NAME.currentItem = input_task_name;
	d.add(INPUT_TASK_NAME);	
	
	var INPUT_TASK_STATUS= new ComboBox();
	 INPUT_TASK_STATUS.label = "TASK_STATUS : ";
	 INPUT_TASK_STATUS.editable = false;
	 INPUT_TASK_STATUS.itemList = ["psr","ret","pdr","ip"];
	 INPUT_TASK_STATUS.currentItem = input_task_status;
	d.add(INPUT_TASK_STATUS);		
	
	var INPUT_VERSION_SUFFIX= new ComboBox();
	INPUT_VERSION_SUFFIX.label = "VERSION SUFFIX (keep it short) : ";
	INPUT_VERSION_SUFFIX.editable = true;
	INPUT_VERSION_SUFFIX.itemList = [""];
	INPUT_VERSION_SUFFIX.currentItem = input_version_name;
	d.add(INPUT_VERSION_SUFFIX);

		
	if ( d.exec() ){	

		var selected_shot_name = sanitizer.clean_string_for_command_line( INPUT_SHOT_NAME.currentItem)
		var selected_version_suffix = sanitizer.clean_string_for_command_line(INPUT_VERSION_SUFFIX.currentItem)
		var selected_task_name = sanitizer.clean_string_for_command_line(INPUT_TASK_NAME.currentItem)
		var selected_task_status = sanitizer.clean_string_for_command_line(INPUT_TASK_STATUS.currentItem)
		
		var formated_version_name = selected_shot_name+"_"+selected_task_name+"_"+selected_version_suffix
		
		S.render.set_movie_render_path_to_frames_folder_with_name(formated_version_name);
		S.render.update_write_movie_render_path();


		
		S.render.render_write_nodes();
		
		var rendered_movie_path = S.render.get_rendered_movie_path()
		
		
		//do the render with process command line ?
		
	
		S.version.set_shot_name(selected_shot_name) ;
		S.version.set_version_name(formated_version_name);
		S.version.set_task_name(selected_task_name);
		S.version.set_task_status (selected_task_status );
		S.version.set_movie_file_path(rendered_movie_path);	
		
		S.log.add("uploading version for "+selected_shot_name,"process");
		S.log.add("version name "+formated_version_name,"process");
		S.log.add("task name "+selected_task_name,"process");
		S.log.add("task status "+selected_task_status,"process");
		S.log.add("movie file path "+rendered_movie_path,"process");
		
		S.version.upload_movie_as_version(); 
		
		S.log.save();

		S.log.set_script_tag("OO_upload_render_as_SG_version_dialog"); 
		S.log.create_scene_script_log_file_and_folder(); 
		S.log.save_scene_script_log_file(); 	
		
	}

	
}





function upload_render_as_SG_version_for_task(_task_name,_version_suffix){
	
	MessageLog.trace("UPLOAD PREVIEW TO SHOTGUN");
	
	var S = new OO.SceneManager();	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/upload_render_as_SG_version.html");
	
	S.context = new OO.Context(this,"Shotgun");	
	
	S.context.set_from_scene_path();

	
	var shot_code = S.context.get_shot()
	var version_name = shot_code+"_"+_task_name+"_"+_version_suffix;
	var task_name = _task_name
	var task_status = "pdr"

	S.render.set_movie_render_path_to_frames_folder_with_name("output");
	S.render.update_write_movie_render_path();
	S.render.render_write_nodes();
		
	var rendered_movie_path = S.render.get_rendered_movie_path()



		
	S.version.set_shot_name(shot_code) ;
	S.version.set_version_name(version_name);
	S.version.set_task_name(task_name);
	S.version.set_task_status (task_status);
	S.version.set_movie_file_path(rendered_movie_path);	

	S.log.add("shot_code : "+shot_code,"input");
	S.log.add("version_name : "+version_name,"input");
	S.log.add("task_name : "+task_name,"input");
	S.log.add("task_status : "+task_status,"input");
	S.log.add("rendered movie path :"+rendered_movie_path,"path"); 


	S.version.upload_movie_as_version(); 


	S.log.save();
	var log_object = S.log;
	
	
	return log_object; 
		
	
}

function upload_bg_preview_to_SG(){
	
	var log_object = upload_render_as_SG_version_for_task('bg','bab'); 
	
	log_object.set_script_tag("OO_upload_bg_preview_to_SG"); 
	log_object.create_scene_script_log_file_and_folder(); 
	log_object.save_scene_script_log_file(); 	
	
}

function upload_layout_preview_to_SG(){
	
	var log_object = upload_render_as_SG_version_for_task('layout_bg','bab'); 
	
	log_object.set_script_tag("OO_upload_layout_preview_to_SG"); 
	log_object.create_scene_script_log_file_and_folder(); 
	log_object.save_scene_script_log_file(); 	
}

function upload_box_anim_preview_to_SG(){
	
	var log_object = upload_render_as_SG_version_for_task('pl_box_anim','bab'); 
	log_object.set_script_tag("OO_upload_box_anim_preview_to_SG"); 
	log_object.create_scene_script_log_file_and_folder(); 
	log_object.save_scene_script_log_file(); 
	
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







/*==================================================================================================================================================================

	show_current_angle_eye_mc

==================================================================================================================================================================*/

function show_current_angle_eye_mc(){
	
	var snodes = selection.selectedNodes(); 
	
	var first_selected_node = snodes[0];
	
	var character_detector = new OO.CharacterDetector()
	character_detector.set_source_layer_path(first_selected_node)
	var detected_character = character_detector.get_character();	
	
	var character_group = character_detector.get_character_group()
	
	var head_angle_object = new OO.HeadAngle(); 
	head_angle_object.set_source_group(character_group);
	head_angle_object.fetch_head_layer_path_in_source_group();	
	
	var current_head_angle = head_angle_object.get_head_angle_at_frame(frame.current())
	
	var mc_node_path = character_group+"/mc_LOOK_"+current_head_angle;
	
	MessageLog.trace("mc_node_path");
	MessageLog.trace(mc_node_path);
	
	var MCM = new OO.MCManager();
	MCM.fetch_scene_mcs(); 
	MCM.hide_all_mcs(); 
	
	var eye_mc = new OO.MasterControler(mc_node_path);
	eye_mc.show_controls();

	
	
}













// B A T C H  F U N C T I O N S


include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/OO_batch_functions.js");



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
	////MessageLog.trace("COMPOSITE_2D to Y ")
	////MessageLog.trace(node.getTextAttr("Top/CHECKC", frame.current(),"COMPOSITE_2D"))
	
}




function orwell_sanity_check(){

	return (2+2 == 4); 
	
}


function increase_atq_filter_brightness(){
		
	 node.setTextAttr("Top/ATQ_BC","BRIGHTCONTRAST_BRIGHTNESS_ADJUSTMENT", frame.current(),100);
	

}


function set_atq_filter_brightness_to_hundred(){
		
	 node.setTextAttr("Top/ATQ_BC","BRIGHTCONTRAST_BRIGHTNESS_ADJUSTMENT", frame.current(),100);
	

}
