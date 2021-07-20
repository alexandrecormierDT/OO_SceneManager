
function create_posing_from_selection_dialog(){

	var S = new OO.SceneManager();
	var selected_nodes_paths = selected_layers_to_nodes();
	S.assets.detector.set_source_layer_path(selected_nodes_paths[0])
	var asset_code = S.assets.detector.get_asset_code()


	var d = new Dialog
	d.title = "EXPORT NEW POSING FOR : "+asset_code.toUpperCase();
	d.width = 400;
	var POSING_SUFFIX = new ComboBox();
	POSING_SUFFIX.label = "p_"+asset_code+"_";
	POSING_SUFFIX.editable = true;
	POSING_SUFFIX.itemList = [];
	d.add(POSING_SUFFIX);

	var number_of_selected_frames = selection.numberOfFrames() != 0 ? selection.numberOfFrames() : 1;
	//MessageLog.trace("number_of_selected_frames")
	//MessageLog.trace(number_of_selected_frames)
	//MessageLog.trace(selection.numberOfFrames())
	//MessageLog.trace(selection.isSelectionRange())

	if ( d.exec() ){
		create_posing_from_selection_process(POSING_SUFFIX.currentItem)
    }
}

function create_posing_from_selection_process(_suffix){

	var S = new OO.SceneManager();	

	S.context.set_library_path(OO.library_path);	
	S.context.set_vault_path(OO.vault_path)

	try{

		var selected_nodes_paths = selected_layers_to_nodes();
		var number_of_selected_frames = 1
		if(selection.isSelectionRange()){
			number_of_selected_frames = selection.numberOfFrames();
		}

		//MessageLog.trace("number_of_selected_frames")
		//MessageLog.trace(number_of_selected_frames)

		//detecting asset from selected nodes
		S.assets.detector.set_source_layer_path(selected_nodes_paths[0])
		var detected_asset_code = S.assets.detector.get_asset_code()
		var detected_group = S.assets.detector.get_asset_group()
		var linked_asset_object = S.breakdown.get_asset_object_by_code(detected_asset_code)

		MessageLog.trace("detected_group")
		MessageLog.trace(detected_group)
		
		//creating posing object with the PosingCreator class
		S.posings.creator.reset()
		S.posings.creator.set_suffix(_suffix); 
		S.posings.creator.set_group_path(detected_group); 
		S.posings.creator.set_frame(frame.current()); 
		S.posings.creator.set_frame_range(frame.current(),number_of_selected_frames); 
		S.posings.creator.set_linked_asset_object(linked_asset_object); 
		S.posings.creator.set_nodes(selected_nodes_paths); 

		var new_posing = S.posings.creator.create_posing_object();

		S.posings.export_posing_to_library(new_posing)

	}catch(error){
		S.log.add_script_error_object(error); 
	}
}

function import_library_posing_for_selected_asset_dialog(){

	//MessageLog.trace("import_library_posing_for_selected_asset")

	var S = new OO.SceneManager();	

	S.context.set_library_path(OO.library_path);	
	S.context.set_vault_path(OO.vault_path)

	//var selected_nodes_paths = selection.selectedNodes(0); 
	var selected_nodes_paths = selected_layers_to_nodes()

	//detecting asset from selected nodes
	S.assets.detector.set_source_layer_path(selected_nodes_paths[0])
	var detected_asset_code = S.assets.detector.get_asset_code()
	var detected_asset_group = S.assets.detector.get_asset_group()

	MessageLog.trace("-----------------detected_asset_group")
	MessageLog.trace(detected_asset_group)

	var linked_asset_object = S.breakdown.get_asset_object_by_code(detected_asset_code)

	//MessageLog.trace("linked_asset_object.get_code()")
	//MessageLog.trace(linked_asset_object.get_code())
	
	var asset_posing_obj_array = S.posings.fetch_library_posings_for_asset_object(linked_asset_object)

	var posing_names_string_array = []

	for(var p = 0 ; p < asset_posing_obj_array.length ; p++){
		posing_names_string_array[p] = asset_posing_obj_array[p].get_suffix()
	}

	var d = new Dialog
	d.title = "IMPORT POSING";
	d.width = 300;

	var SELECTED_POSING = new ComboBox();
	SELECTED_POSING.label = "POSING LIST : ";
	SELECTED_POSING.editable = false;
	SELECTED_POSING.itemList = posing_names_string_array;
	d.add(SELECTED_POSING);

	if ( d.exec() ){
		var selected_posing_index = posing_names_string_array.indexOf(SELECTED_POSING.currentItem)
		var selected_posing_obj =  asset_posing_obj_array[selected_posing_index]
		try{
			selected_posing_obj.set_group_path(detected_asset_group)
			S.posings.apply_posing_at_frame(selected_posing_obj,frame.current())
			
		}catch(error){

			S.log.add_script_error_object(error); 
		}
	}
}


function import_library_posing_for_selected_asset(){

	//MessageLog.trace("import_library_posing_for_selected_asset")
	var S = new OO.SceneManager();	

	S.context.set_library_path(OO.library_path);	
	S.context.set_vault_path(OO.vault_path)

	try{
		//var selected_nodes_paths = selection.selectedNodes(0); 
		var selected_nodes_paths = selected_layers_to_nodes()

		//detecting asset from selected nodes
		S.assets.detector.set_source_layer_path(selected_nodes_paths[0])
		var detected_asset_code = S.assets.detector.get_asset_code()
		var linked_asset_object = S.breakdown.get_asset_object_by_code(detected_asset_code)

		//MessageLog.trace("linked_asset_object.get_code()")
		//MessageLog.trace(linked_asset_object.get_code())
		
		S.posings.fetch_library_posings_for_asset_object(linked_asset_object)

	}catch(error){
		S.log.add_script_error_object(error); 
	}
}




