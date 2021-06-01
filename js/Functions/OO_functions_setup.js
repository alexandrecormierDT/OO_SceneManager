
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

