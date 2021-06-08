//============================================================================================================================================

// PORTAL SCRIPT 

//============================================================================================================================================


function create_empty_portal(){
	
	var S = new OO.SceneManager();	
	
	S.context.set_library_path(OO.library_path);
	S.context.set_vault_path(OO.vault_path);
	
	var asset_code_list = S.breakdown.get_asset_code_string_list(); 
	
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
	userDepartement.currentItem = ["boxanim"];
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
		
		//filtering user input
		var asset_code = OO.filter_string(userCode.currentItem);
		var asset_type = OO.filter_string(userType.currentItem);
		var departement = userDepartement.currentItem != ""  ? OO.filter_string(userDepartement.currentItem) : "boxanim";
		var tpl_version = OO.filter_string(userInputVersion.currentItem);
		var status = OO.filter_string(userInputStatus.currentItem);
		

		var nasset = new OO.Asset(asset_code);
		nasset.sg_asset_type = asset_type;
		
		var final_png_path = S.context.get_asset_data_path(nasset,"png",departement);
		var final_psd_path = S.context.get_asset_data_path(nasset,"psd",departement);
		var final_tpl_path = S.context.get_asset_data_path(nasset,"tpl",departement);
		var final_svg_path = S.context.get_asset_data_path(nasset,"svg",departement);
		
		S.log.add('[CREATE PORTAL]','process');
		S.log.add('[ASSET_CODE] : '+asset_code,'user_input');
		S.log.add('[ASSET_TYPE] : '+asset_type,'user_input');
		S.log.add('[DEPARTEMENT] : '+departement,'user_input');

		var asset_id = S.breakdown.get_asset_id(asset_code)

		if(asset_id == false){
			asset_id = 00000;
		}
		
		S.portals.creator.set_code( asset_code )
		S.portals.creator.set_sg_asset_type( asset_type )
		S.portals.creator.set_departement( departement )
		S.portals.creator.set_tpl_version( tpl_version )
		S.portals.creator.set_status( status )
		S.portals.creator.set_png_path( final_png_path )
		S.portals.creator.set_psd_path( final_psd_path )
		S.portals.creator.set_tpl_path( final_tpl_path )
		S.portals.creator.set_svg_path( final_svg_path )
		S.portals.creator.set_id(asset_id)
		
		var nportal = S.portals.creator.create_portal(); 
		
		if(nportal!=false){
			S.portals.add(nportal); 
		}		

		var nportal_tree = nportal.get_tree(); 
		nportal_tree.ungroup();
		S.log.save_scene_script_log_file(); 
	}
} 

function create_portals_by_asset_type(_asset_type){
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/create_asset_portals.html");
	S.log.set_script_tag("OO_create_empty_portal"); 
	S.log.create_scene_script_log_file_and_folder()

	var target_backdrop = false;
	var target_composite = false;
	
	switch(_asset_type){
		
		case ('bg'):
		case ('BG'):
			target_backdrop = S.backdrops.get_backdrop_by_name('BG');
			target_composite = $.scene.getNodeByPath("Top/BG-C");
		break; 
		case('Character'):
		case('Prop'):
		case('FX'):
		case('anim'):
			target_backdrop = S.backdrops.get_backdrop_by_name('ANIM');
			target_composite = $.scene.getNodeByPath("Top/ANIM-C");
		break;
	}
	
	if(target_backdrop == false){
		
		bg_backdrop = {x:0,y:0};
		
	}

	var line_start_point = {
		x:target_backdrop.x + 400,
		y:target_backdrop.y + 400 
	}
	
	if(target_composite != undefined){
		
		S.context.set_context_type('Shotgun');	
		S.context.set_library_path(OO.library_path);	
		S.context.set_vault_path(OO.vault_path)

		S.breakdown.load_current_shot_breakdown();

		S.portals.reset_list();
		
		//load scene portal to check if an asset already has a portal
		S.portals.load_from_scene();

		S.portals.load_asset_portals_from_breakdown_by_type(_asset_type);
		
		if(_asset_type == "anim"){

			S.portals.reset_list();
			S.portals.load_asset_portals_from_breakdown_by_type("Character");
			S.portals.load_asset_portals_from_breakdown_by_type("Prop");
			S.portals.load_asset_portals_from_breakdown_by_type("FX");
			
		}
			
		S.portals.place_portals_in_line_and_connect_to_composite(line_start_point,target_composite);
		
	}

	S.log.save();
	
	var log_object = S.log;

	return log_object 
	
}

function create_bg_portals(){
	
	var log_object = create_portals_by_asset_type('BG')
	
	log_object.set_script_tag("OO_create_bg_portals"); 
	log_object.create_scene_script_log_file_and_folder(); 
	log_object.save_scene_script_log_file(); 
}

function create_anim_portals(){
	
	var log_object = create_portals_by_asset_type('anim')
	
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
	
	target_backdrop = S.backdrops.get_backdrop_by_name('TPL_EXPORT');
	target_composite = $.roor.scene.getNodeByPath("Top/TPL_EXPORT_C");	
	
	if(target_backdrop == false){
		target_backdrop = {x:0,y:0};
	}

	var point = {
		x:target_backdrop.x + 400,
		y:target_backdrop.y + 400 
	}
	
	if(target_composite != undefined){
		var master_asset = S.breakdown.get_scene_master_asset();
		S.portals.create_single_asset_portal(master_asset,point,target_composite)
	}

	S.log.save();	
	
	S.log.set_script_tag("OO_create_master_asset_portal"); 
	S.log.create_scene_script_log_file_and_folder(); 
	S.log.save_scene_script_log_file(); 	

}




function pull_png_by_asset_type(_asset_type){
	
	var S = new OO.SceneManager();	
	S.portals.pull_scene_portal_data_by_sg_asset_type('png',_asset_type)
	return S.log;
	
} 

function pull_tpl_by_asset_type(_asset_type){
	
	var S = new OO.SceneManager();	
	S.portals.pull_scene_portal_data_by_sg_asset_type('tpl',_asset_type)
	return S.log;
	
} 


function pull_psd_by_asset_type(_asset_type){
	
	var S = new OO.SceneManager();	
	S.portals.pull_scene_portal_data_by_sg_asset_type('tpl',_asset_type)
	return S.log;
	
} 



function pull_bg_portal_png(){
	
	var log_object = pull_png_by_asset_type("BG");
	
	log_object.set_script_tag("OO_pull_bg_portal_png"); 
	log_object.create_scene_script_log_file_and_folder(); 
	log_object.save_scene_script_log_file(); 
	
}

function pull_anim_portal_png(){
	
	var log_object = pull_png_by_asset_type("anim");
	
	log_object.set_script_tag("OO_pull_anim_portal_png"); 
	log_object.create_scene_script_log_file_and_folder(); 
	log_object.save_scene_script_log_file(); 
	
}


function pull_anim_portal_tpl(){
	
	var log_object = pull_tpl_by_asset_type("anim");
	
	log_object.set_script_tag("OO_pull_anim_portal_tpl"); 
	log_object.create_scene_script_log_file_and_folder(); 
	log_object.save_scene_script_log_file(); 
	
}

function pull_bg_portal_png(){
	
	var log_object = pull_png_by_asset_type("BG");
	
	log_object.set_script_tag("OO_pull_bg_portal_png"); 
	log_object.create_scene_script_log_file_and_folder(); 
	log_object.save_scene_script_log_file(); 
	
}



function pull_bg_portal_psd(){
	
	var S = new OO.SceneManager();	
	
	var log_object = pull_psd_by_asset_type("BG");
	
	log_object.set_script_tag("OO_pull_bg_portal_png"); 
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
	
	var S = new OO.SceneManager();	
	S.portals.load_from_node_list($.scene.selectedNodes);
	var portal_list = S.portals.get_list()
	
	for(var p = 0 ; p <  portal_list.length; p++){
		
			var current_portal =  portal_list[p]
			
			//we empty the portal first 
			S.portals.empty_portal(current_portal);
			S.portals.pull(current_portal,_data_type);	

	}	

	S.log.save();	
	
	var log_object = S.log;
	return log_object 

} 




function push_selected_portals(_data_type){
	
	////MessageLog.trace("PUSH PORTAL FUNCTION");
	
	var S = new OO.SceneManager();	

	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/push_portal.html");
	S.portals.load_from_node_list($.scene.selectedNodes);
	S.context.set_context_type('Shotgun');	
	
	S.breakdown.load_current_shot_breakdown();
	
	var portal_list = S.portals.get_list()

	for(var p = 0 ; p < portal_list.length; p++){

		var current_portal = portal_list[p];
		S.portals.push_portal(current_portal,_data_type);
			
	}	

	S.log.save();
	
	
	var log_object = S.log;
	

	return log_object;
	
} 





//----------------------------------------------------------------------------------------------- P U B L I S H -----------------------------------------------------------------//
//----------------------------------------------------------------------------------------------- P U B L I S H -----------------------------------------------------------------//

	// WARINING !  this function is runned when publishing an asset scene by jhonie shotgun python script


function push_master_asset_portal_to_folder(){
	
	// context detection 

	var S = new OO.SceneManager();	
	
	var master_asset = S.breakdown.get_scene_master_asset();
	
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









function udpate_portal_paths_from_vault(_portal){
	
	var S = new OO.SceneManager();	
		
	S.context.set_context_type('Shotgun');	
	
	S.context.set_vault_path(OO.vault_path)	
	
	S.breakdown.load_current_shot_breakdown();

	var linked_asset = S.assets.get_asset_object_by_code(_portal.get_code());
	
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
	
	try{

		var S = new OO.SceneManager();	

		S.context.set_library_path(OO.library_path);	
		S.context.set_vault_path(OO.vault_path)
		S.assets.load_breakdown('csv');
		S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/update_portals_path.html");


		S.breakdown.load_current_shot_breakdown();

		var portal_list = S.portals.get_list();

		for(var p = 0 ; p < portal_list.length; p++){
			
			var current_portal = portal_list[p]
			var linked_asset = S.assets.get_asset_object_by_code(current_portal.get_code());
			
			if(linked_asset != false){

				if(linked_asset.get_type() == _asset_type || _asset_type == "ALL" ){
					
					S.log.add("updating paths of portal - "+current_portal.get_code(),"process");
					udpate_portal_paths_from_vault(current_portal);
					
				}
			
			}
			
		}	

	}catch(error){

		S.log.add(error,"error"); 
	
	}
	

	S.log.save();
	var log_object = S.log;
	
	return log_object 
	
};




function update_bg_portals_paths(){
	
	var log_object = update_portals_paths_by_type('BG');
	
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






function empty_portals(_asset_type){
	
	var S = new OO.SceneManager();	

	try{

		S.portals.empty_scene_portals_by_type(_asset_type);

	}catch(error){

		S.log.add("file "+error.fileName+"  line "+error.lineNumber,"error"); 
		S.log.add(error.message,"error"); 
	}
	
	S.log.save();
	return S.log;

}

function empty_bg_portals(){
	
	
	var log_object = empty_portals('BG');
	
	log_object.set_script_tag("OO_empty_bg_portals"); 
	log_object.create_scene_script_log_file_and_folder(); 
	log_object.save_scene_script_log_file(); 	



	
}


function empty_selected_portals(){
	
	var S = new OO.SceneManager();	

	try{

		S.portals.load_from_node_list($.scene.selectedNodes);
		var portal_list = S.portals.get_list()

		for(var p = 0 ; p < portal_list.length; p++){
		
			var current_portal = portal_list[p]
			S.portals.empty(current_portal);
		}

	}catch(error){

		S.log.add(error,"error"); 

	}



	return S.log

}



function fit_selected_portals_to_camera(){
	
	// loop through bg portals and change thier layout peg transform in order to fit the cadre of the current shot with the scene camera. 
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/fit_bg_to_camera.html");
	S.context.set_context_type('Shotgun');	
	S.context.set_vault_path(OO.vault_path)
	S.assets.load_breakdown('csv');
	
	S.portals.load_from_node_list($.scene.selectedNodes);
	var portal_list = S.portals.get_list(); 
	
	
	for(var p = 0 ; p < portal_list.length; p++){
		
		var current_portal = portal_list[p]
		S.portals.placer.fit_portal_to_camera(current_portal);

	}	

	//log
	S.log.save();	
	S.log.set_script_tag("OO_fit_selected_portals_to_camera"); 
	S.log.create_scene_script_log_file_and_folder(); 
	S.log.save_scene_script_log_file();


	
}



function fit_bg_portals_to_camera(){
	
	//FIT BG TO CAMERA
	// loop through bg portals and change thier layout peg transform in order to fit the cadre of the current shot with the scene camera. 
	
	var S = new OO.SceneManager();	

	try{

		//fetching bg portals
		S.portals.load_from_scene_by_sg_asset_type('BG');
		var bg_portal_list = S.portals.get_list(); 

		for(var p = 0 ; p < bg_portal_list.length; p++){

			//moving portal peg
			var current_portal = bg_portal_list[p];
			S.portals.fiter.fit_portal_to_camera(current_portal);

		}		


	}catch(error){

		S.log.add(error,"error"); 

	}


	//log
	S.log.save();	
	S.log.set_script_tag("OO_fit_bg_to_camera"); 
	S.log.create_scene_script_log_file_and_folder(); 
	S.log.save_scene_script_log_file();
	
	
}



function delete_bg_portals(){

	S = new OO.SceneManager();
	S.portals.delete_scene_portals_by_type("BG");

	//log
	S.log.save();	
	S.log.set_script_tag("OO_delete_bg_portals"); 
	S.log.create_scene_script_log_file_and_folder(); 
	S.log.save_scene_script_log_file();

}

function delete_anim_portals(){

	S = new OO.SceneManager();
	S.portals.delete_scene_portals_by_type("anim");
	//log
	S.log.save();	
	S.log.set_script_tag("OO_delete_anim_portals"); 
	S.log.create_scene_script_log_file_and_folder(); 
	S.log.save_scene_script_log_file();
	
}
