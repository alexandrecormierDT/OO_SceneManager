
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
	
	
}









