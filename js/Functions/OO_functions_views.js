


function export_markers_process(){
	
	var S = new OO.SceneManager();
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/export_markers.html");
	S.context.set_context_type('Shotgun');	
	S.context.set_library_path(OO.library_path);
	S.load_xstage();
	S.views.load(S.stage);
	scene.saveAll();
	
	S.views.set_output_dir("P:/projects/billy/views");
	
	if(S.views.noviews == false){
		
		if(S.views.InputDialog()){
			
			S.views.export_views();
			
		}		
		
	}

	
	S.log.save();	
	S.log.set_script_tag("OO_export_markers"); 
	S.log.create_scene_script_log_file_and_folder(); 
	S.log.save_scene_script_log_file();

}



function export_asset_png_process(){
	
	var S = new OO.SceneManager();
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/export_asset_png.html");
	S.portals.load_from_node_list($.scene.selectedNodes);
	
	var portal_list = S.portals.get_list(); 
	
	if(portal_list.length > 0 ){
		
		var current_portal = portal_list[0];
		
		current_asset = new OO.Asset(current_portal.get_code()); 
		current_asset.sg_asset_type = current_portal.get_sg_asset_type();

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
		var userScale = new ComboBox();
		userScale.label = "expend camera frame : ";
		userScale.editable = false;
		userScale.itemList = [1.5,1,2];
		dialog.add( userScale);	
		
		if (dialog.exec()){
			
			var dir_object = new $.oFolder(library_asset_png_folder_path)
			
			if(dir_object.exists == false){
				
				dir_object.create();
				
			}
			
			var user_png_path = OO.filter_string(userCode.text)
			
			var user_scale = OO.filter_string(userScale.currentItem)

			MessageLog.trace("export_asset_png_process")
			MessageLog.trace("user_scale")
			MessageLog.trace(user_scale)
			MessageLog.trace("user_png_path")
			MessageLog.trace(user_png_path)

			
			
			S.views.export_currentframe_png_to(user_png_path,user_scale);

		}		
		
		
	
	}	
	

	
}
