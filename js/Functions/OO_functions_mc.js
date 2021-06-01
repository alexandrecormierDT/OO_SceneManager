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










