/*------------------------------------------------------------------------------------------------------------------------------------------------



		UPLOAD PREVIEW TO SHOTGUN 



-------------------------------------------------------------------------------------------------------------------------------------------------------*/




// for users

function upload_render_as_SG_version_dialog(){
	
	//MessageLog.trace("UPLOAD PREVIEW TO SHOTGUN");
	
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
	 INPUT_TASK_STATUS.itemList = ["psr","ret","pdr"];
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

		var rendered_movie_path = S.render.get_rendered_movie_path()
		
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
		
		scene.saveAll();

		S.version.render_and_upload_movie_as_version_detached()
		//S.version.render_and_upload_movie_as_version_detache_with_dead_line()

		S.log.save();
		S.log.set_script_tag("OO_upload_render_as_SG_version_dialog"); 
		S.log.create_scene_script_log_file_and_folder(); 
		S.log.save_scene_script_log_file(); 	

		

	}
}

function upload_render_as_SG_version_for_task(_task_name,_version_suffix){
	
	//MessageLog.trace("upload_render_as_SG_version_for_task");
	
	var S = new OO.SceneManager();	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/upload_render_as_SG_version.html");
	S.log.add("upload_render_as_SG_version_for_task","script");
	S.log.add(_task_name,"script");
	S.log.add(_version_suffix,"script");
	
	S.context = new OO.Context(this,"Shotgun");	
	
	S.context.set_from_scene_path();

	var shot_code = S.context.get_shot()
	var version_name = shot_code+"_"+_task_name+"_"+_version_suffix;
	var task_name = _task_name
	var task_status = "pdr"

	S.render.set_movie_render_path_to_frames_folder_with_name(version_name);
	S.render.update_write_movie_render_path();
		
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

	scene.saveAll();


	S.version.render_and_upload_movie_as_version_with_deadline()
	//S.version.render_and_upload_movie_as_version()

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