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
	userDepartement.editable = false;
	userDepartement.itemList =["design", "rig", "anim","bg","layout","boxanim","director","compo"];;
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
		
		var nasset = S.breakdown.get_asset_object_by_code(asset_code)
		var asset_id = 000000;
		

		if(nasset == false){
			nasset = new OO.Asset(asset_code);
			nasset.sg_asset_type = asset_type;
		}else{
			asset_type = nasset.get_sg_asset_type();
			asset_id =nasset.get_id();
		}

		
		var final_png_path = S.context.get_asset_data_path(nasset,"png",departement);
		var final_psd_path = S.context.get_asset_data_path(nasset,"psd",departement);
		var final_tpl_path = S.context.get_asset_data_path(nasset,"tpl",departement);
		var final_svg_path = S.context.get_asset_data_path(nasset,"svg",departement);
		
		S.log.add('[CREATE PORTAL]','process');
		S.log.add('[ASSET_CODE] : '+asset_code,'user_input');
		S.log.add('[ASSET_TYPE] : '+asset_type,'user_input');
		S.log.add('[ASSET_ID] : '+asset_type,'user_input');
		S.log.add('[DEPARTEMENT] : '+departement,'user_input');

		var asset_id = S.breakdown.get_asset_id(asset_code)

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

		S.portals.create_asset_portals_from_breakdown_by_type(_asset_type);
		
		if(_asset_type == "anim"){

			S.portals.create_asset_portals_from_breakdown_by_type("Character");
			S.portals.create_asset_portals_from_breakdown_by_type("Prop");
			S.portals.create_asset_portals_from_breakdown_by_type("FX");
			
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
	target_composite = $.scene.getNodeByPath("Top/TPL_EXPORT_C");	
	
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
	S.portals.pull_scene_portal_data_by_sg_asset_type('psd',_asset_type)
	return S.log;
	
} 



function pull_bg_portal_png(){
	
	var log_object = pull_png_by_asset_type("BG");
	log_object.set_script_tag("OO_pull_bg_portals_png"); 
	log_object.create_scene_script_log_file_and_folder(); 
	log_object.save_scene_script_log_file(); 
	
}

function pull_anim_portal_png(){
	
	var log_object = pull_png_by_asset_type("anim");
	log_object.set_script_tag("OO_pull_anim_portals_png"); 
	log_object.create_scene_script_log_file_and_folder(); 
	log_object.save_scene_script_log_file(); 
	
}


function pull_anim_portal_tpl(){
	
	var log_object = pull_tpl_by_asset_type("anim");
	log_object.set_script_tag("OO_pull_anim_portals_tpl"); 
	log_object.create_scene_script_log_file_and_folder(); 
	log_object.save_scene_script_log_file(); 
	
}

function pull_bg_portal_png(){
	
	var log_object = pull_png_by_asset_type("BG");
	log_object.set_script_tag("OO_pull_bg_portals_png"); 
	log_object.create_scene_script_log_file_and_folder(); 
	log_object.save_scene_script_log_file(); 
	
}



function pull_bg_portal_psd(){
	

	var log_object = pull_psd_by_asset_type("BG");
	log_object.set_script_tag("OO_pull_bg_portals_psd"); 
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
	userType.itemList = ["png","psd","tpl","elements"];
	dialog.add( userType );		
	
	if (dialog.exec()){
		DATA_TYPE = userType.currentItem;
		pull_selected_portals_process(DATA_TYPE);
	}
	
}

function pull_selected_portals_process(_data_type){

	try{

		var S = new OO.SceneManager();	
		var portal_list = S.portals.fetch_portals_from_node_list($.scene.selectedNodes);
		for(var p = 0 ; p <  portal_list.length; p++){
			
				var current_portal =  portal_list[p]
				
				//we empty the portal first 
				S.portals.empty_portal(current_portal);
				S.portals.pull(current_portal,_data_type);	

		}	

	}catch(error){
	
		S.log.add_script_error_object(error); 
	
	}

	S.log.save();	
	var log_object = S.log;
	return log_object 

} 







function push_selected_portals(_data_type){

	var S = new OO.SceneManager();	

	try{

		S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/push_portal.html");
		var portal_list = S.portals.fetch_portals_from_node_list($.scene.selectedNodes);
	
		for(var p = 0 ; p < portal_list.length; p++){
	
			var current_portal = portal_list[p];
			S.portals.push_portal(current_portal,_data_type);
			////MessageLog.trace("hellp")
			S.elements.copy_asset_elements_folders_to_bank(current_portal.get_code()); 
				
		}	

	}catch(error){
	
		S.log.add_script_error_object(error); 
		
	}

	S.log.save();
	var log_object = S.log;
	return log_object;
	
} 




function push_selected_portals_dialog(){

	var dialog = new Dialog();
	dialog.title = "PUSH PORTAL";
	
	var tplInput = new CheckBox();
	tplInput.text = "push TPL to library";
	tplInput.checked = false;
	dialog.add(tplInput);

	var pngInput = new CheckBox();
	pngInput.text = "push PNG to library ";
	dialog.add(pngInput);

	var export_version = new CheckBox();
	export_version.text = "push PNG to shotgun version (using current camera)";
	dialog.add(export_version);

	var INPUT_TASK_NAME= new ComboBox();
	 INPUT_TASK_NAME.label = "task : ";
	 INPUT_TASK_NAME.editable = true;
	 INPUT_TASK_NAME.itemList = ["design_main","puppet_rig","test_rig"];
	 INPUT_TASK_NAME.currentItem = "puppet_rig";
	dialog.add(INPUT_TASK_NAME);	
	
	var INPUT_TASK_STATUS= new ComboBox();
	 INPUT_TASK_STATUS.label = "status : ";
	 INPUT_TASK_STATUS.editable = false;
	 INPUT_TASK_STATUS.itemList = ["psr","ret","pdr"];
	 INPUT_TASK_STATUS.currentItem = "psr";
	dialog.add(INPUT_TASK_STATUS)



	var elementsInput = new CheckBox();
	elementsInput.text = "push asset elements to bank";
	dialog.add(elementsInput);

	var paletteInput = new CheckBox();
	paletteInput.text = "push palettes to bank";
	dialog.add(paletteInput);

	if (dialog.exec())
	{
		var S = new OO.SceneManager();	

		try{
	
			S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/OO_push_portal_dialog.html");
			var portal_list = S.portals.fetch_portals_from_node_list($.scene.selectedNodes);
		
			for(var p = 0 ; p < portal_list.length; p++){
				
				var current_portal = portal_list[p];

				if(tplInput.checked == true){

					S.portals.push_portal(current_portal,"tpl");

				}

				if(pngInput.checked == true){

					push_result_obj = S.portals.push_portal(current_portal,"png");

					//export version
					if(export_version.checked == true){
						S.version.reset();
						S.version.set_project_name(S.get_current_project()) ;
						S.version.set_asset_name(current_portal.get_code()) ;
						S.version.set_version_name(current_portal.get_code()+"_"+push_result_obj.tpl_id);
						S.version.set_task_name(INPUT_TASK_NAME.currentItem);
						S.version.set_task_status (INPUT_TASK_STATUS.currentItem);
						S.version.set_png_file_path(push_result_obj.png_path);	
						S.version.upload_png_as_version()
					}
				}

				if(elementsInput.checked == true){

					S.portals.push_portal(current_portal,"elements");
					
				}


					
			}	
	
		}catch(error){
		
			S.log.add_script_error_object(error); 
			
		}
	
		S.log.save();
		var log_object = S.log;
		return log_object;
		
	}

	
} 





//----------------------------------------------------------------------------------------------- P U B L I S H -----------------------------------------------------------------//
//----------------------------------------------------------------------------------------------- P U B L I S H -----------------------------------------------------------------//

	// WARINING !  this function is runned when publishing an asset scene by jhonie shotgun python script


function push_master_asset_portal_to_folder(){
	
	// context detection 
	var S = new OO.SceneManager();	
	S.log.create_new_log_file("P:/projects/billy/logs/push_master_asset_portal.html");

	try{
	
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
	
	}catch(error){
	
		S.log.add_script_error_object(error); 
	
	}

	S.log.save();	
	S.log.set_script_tag("OO_push_master_asset_portal_to_folder"); 
	S.log.create_scene_script_log_file_and_folder(); 
	S.log.save_scene_script_log_file(); 	
	
}


//----------------------------------------------------------------------------------------------- P U B L I S H -----------------------------------------------------------------//
//----------------------------------------------------------------------------------------------- P U B L I S H -----------------------------------------------------------------//
//----------------------------------------------------------------------------------------------- P U B L I S H -----------------------------------------------------------------//


function update_portals_paths_by_type(_asset_type){

	var S = new OO.SceneManager();	


	S.portals.update_portals_paths_by_type(_asset_type)

	return S.log;

}

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
		S.log.add_script_error_object(error); 
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

		S.log.add_script_error_object(error); 

	}



	return S.log

}

function change_selected_portals_departement_dialog(){

	var dialog = new Dialog();
	dialog.title = "CHANGE PORTAL DEPARTEMENT";
	dialog.width = 200;
	
	var userDepartement = new ComboBox();
	userDepartement.label = "Departement"
	userDepartement.editable = false;
	userDepartement.itemList = ["design", "rig", "anim","bg","layout","boxanim","director","compo"];
	userDepartement.currentItem = ["boxanim"];
	dialog.add( userDepartement );
	
	if (dialog.exec()){

		var S = new OO.SceneManager();	
		var choosed_departement = userDepartement.currentItem
		S.portals.change_portals_departement($.scene.selectedNodes,choosed_departement )

		S.log.save();	
		S.log.set_script_tag("OO_change_portals_departement"); 
		S.log.create_scene_script_log_file_and_folder(); 
		S.log.save_scene_script_log_file();

	}
}



function update_anim_portals_paths(){

	var S = new OO.SceneManager();	

	S.portals.update_portals_paths_by_type("anim")

	S.log.save();	
	S.log.set_script_tag("OO_update_anim_portals_paths"); 
	S.log.create_scene_script_log_file_and_folder(); 
	S.log.save_scene_script_log_file();

}

function update_bg_portals_paths(){

	var S = new OO.SceneManager();	

	S.portals.update_portals_paths_by_type("BG")

	S.log.save();	
	S.log.set_script_tag("OO_update_bg_portals_paths"); 
	S.log.create_scene_script_log_file_and_folder(); 
	S.log.save_scene_script_log_file();

}


function fit_selected_portals_to_camera(){
	
	// loop through bg portals and change thier layout peg transform in order to fit the cadre of the current shot with the scene camera. 
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/fit_bg_to_camera.html");
	S.context.set_context_type('Shotgun');	
	S.context.set_vault_path(OO.vault_path)
	S.breakdown.load_current_shot_breakdown();
	
	var portal_list = S.portals.fetch_portals_from_node_list($.scene.selectedNodes);
	
	
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

		S.log.add_script_error_object(error); 

	}


	//log
	S.log.save();	
	S.log.set_script_tag("OO_fit_bg_to_camera"); 
	S.log.create_scene_script_log_file_and_folder(); 
	S.log.save_scene_script_log_file();
	
	
}

function fit_anim_portals_to_bg(){
	
	//FIT BG TO CAMERA
	// loop through bg portals and change thier layout peg transform in order to fit the cadre of the current shot with the scene camera. 
	
	var S = new OO.SceneManager();	

	try{

		//fetching bg portals
		S.portals.load_from_scene_by_sg_asset_type('BG');
		var bg_portal_list = S.portals.get_list(); 
		var source_bg_portal = bg_portal_list[0];
		var source_psd_path = source_bg_portal.get_path('psd')

		S.psd_reader.set_path(source_psd_path)
		//HERE
		S.psd_reader.get_psd_layer_object_array()
		S.psd_reader.fetch_character_rest_objects_from_meta_txt();

		S.portals.load_from_scene_by_sg_asset_type('anim');
		var anim_portal_list = S.portals.get_list(); 

		for(var p = 0 ; p <  anim_portal_list.length; p++){
			var current_portal = anim_portal_list[p];
			S.portals.fiter.fit_character_portal_to_current_psd(current_portal);
		}		

	}catch(error){
		S.log.add_script_error_object(error); 
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


function rebbot_bg_portals(){

	S = new OO.SceneManager();
	S.portals.delete_scene_portals_by_type("BG");
	create_portals_by_asset_type("BG")

}




function are_selected_portals_up_to_date(){

	var S = new OO.SceneManager();
	S.context.set_vault_path(OO.vault_path)
	var portal_list = S.portals.fetch_portals_from_node_list($.scene.selectedNodes);
	for(var p = 0 ; p < portal_list.length; p++){	
		var current_portal = portal_list[p];
		var repport = S.portals.is_portal_up_to_date(current_portal)
		for(var d= 0 ; d< repport.length ; d++){
			//MessageLog.trace(repport[d])
		}
	}
}
