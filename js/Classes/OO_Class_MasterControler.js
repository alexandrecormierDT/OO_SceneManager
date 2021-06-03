

OO.MasterControler = function (_node_path){
	
	var node_path = _node_path
	
	var extra_files_string = ""; 
	
	var extra_file_script_path = ""; 
	
	var extra_file_tbstate_path = ""; 

	var file_column = ""; 
	
	var ui_data_object ={}; 
	
	var ui_data_string = ""; 
	
	var ui_data_poses = ""; 
	
	var ui_data_location = ""; 
	
	
	this.set_node_path = function(_np){
		
		var node_path = _np; 
	
	}
	
	this.init = function(){
		
		fetch_attributes_values_from_node()
	}
	

	this.set_ui_data_poses = function(_udp){
		
		ui_data_poses = _udp;
	}
	
	this.set_ui_data_location = function(_udl){
		
		ui_data_location = _udl
	}	
	
	this.set_extra_files_string = function(_es){
		
		extra_files_string = _es; 
	}
	
	
	this.show_controls = function(){
		
		
		node.showControls(node_path, true);	
		
	}
	
	this.hide_controls = function(){
		
		
		node.showControls(node_path, false);	
		
	}	
	
	
	function fetch_attributes_values_from_node(){
		
		ui_data_string = node.getTextAttr(node_path,frame.current(),"uiData");
		file_column = node.linkedColumn(node_path,"files")
		extra_files_string = column.getEntry(file_column,0,frame.current())
		
		parse_ui_data_string()
		
		parse_extra_files_string()
		
	}
	
	function parse_extra_files_string(){
		
		var break_split = extra_files_string.split('\n');
		extra_file_script_path = break_split[0]; 
		extra_file_tbstate_path =  break_split[1]		
		
	}
	
	
	function format_extra_files_string(){
		
		extra_files_string = extra_file_script_path+'\n'+extra_file_tbstate_path;
		
	}
	
	function parse_ui_data_string(){
		
		ui_data_object = JSON.parse(ui_data_string);
		ui_data_poses = ui_data_object.poses
		ui_data_location = ui_data_object.location;
		
	}
	
	function format_ui_data_object(){
		
		ui_data_object.poses = ui_data_poses
		ui_data_object.location = ui_data_location		
		ui_data_string = JSON.stringify(ui_data_object);

		
	}
	
	
	this.update_node_attributes = function(){
		
		format_ui_data_object()
		format_extra_files_string()
		node.setTextAttr(node_path,"uiData", frame.current(),ui_data_string);
		file_column = node.linkedColumn(node_path,"files")
		column.setEntry(file_column, 0,frame.current(), extra_files_string);

		
	}
	
	this.print_variables = function(){
		
		fetch_attributes_values_from_node()

		
	}
	
	function get_ui_data_poses_path_with_subfolder(_sub_folder_name){
		
		parse_ui_data_string()
		
		var script_split = ui_data_poses.split("/scripts/"); 
		
		var first_part = script_split[0]; 
		
		var with_sub_folder = "/scripts/"+_sub_folder_name+"/"+script_split[1];		
		
		return with_sub_folder
		
	}
	
	function get_extra_file_tbstate_path_with_subfolder(_sub_folder_name){
		
		// extra_file_tbstate_path exemple : 
		// scripts/LOOK_QFDOWN.tbState
		
		parse_extra_files_string()
		
		var script_split = extra_file_tbstate_path.split("scripts/"); 
		
		var first_part = script_split[0]; 
		
		var with_sub_folder = "scripts/"+_sub_folder_name+"/"+script_split[1];		
		
		return with_sub_folder;
		
	}
	
	this.add_subfolder_to_tbsates_path = function(_sub_folder_name){
		
		ui_data_poses = get_ui_data_poses_path_with_subfolder(_sub_folder_name);
		
		extra_file_tbstate_path = get_extra_file_tbstate_path_with_subfolder(_sub_folder_name)
		
		MessageLog.trace("ui_data_poses");
		MessageLog.trace(ui_data_poses);
		MessageLog.trace("extra_file_tbstate_path");
		MessageLog.trace(extra_file_tbstate_path);
		
	}
	
} 

MessageLog.trace("Class MasterControler ");