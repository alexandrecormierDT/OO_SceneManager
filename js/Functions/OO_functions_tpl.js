
function compare_portal_content_to_selected_tpl(){

	S = new OO.SceneManager();

	var library_tpl = S.library.parse_selected_tpl_to_object();
	var selected_portal_object = S.portals.fetch_portals_from_node_list($.scene.selectedNodes)[0]
	var portal_tpl = S.tpl.parse_portal_object_to_tpl_object(selected_portal_object)

	S.tpl.compare_tpl_objects(library_tpl,portal_tpl)



}




function push_selected_posing(){

    S = new OO.SceneManager();
  
    S.context.set_library_path(OO.library_path);

    var selected_layers = selected_layers_to_nodes()

   var character_detector = new OO.CharacterDetector()
   character_detector.set_source_layer_path(selected_layers[0])
   var detected_character = character_detector.get_character();

   //MessageLog.trace(selected_layers)

   if(detected_character!=false){

        var character_asset_object = S.breakdown.get_asset_object_by_code(detected_character)
       var action_tpl = S.tpl.parse_nodes_path_array_to_tpl_object(character_asset_object,selected_layers) 
       action_tpl.data.name  = "p_"+character_asset_object.get_code()+"_test"; 

       //create the action folder if missing
       action_tpl.data.folder_path = S.context.get_dir_path(character_asset_object,"action_tpl")
       var action_folder_object =new $.oFolder(action_tpl.folder_path)
       action_folder_object.create();
 
        S.tpl.create_tpl_file_with_passeport(action_tpl)

   }

    //
    //var pegDataB = new NodeState($.scene.selectedNodes[0].path, 1, ["POSITION", "SCALE", "ROTATION","DRAWING.ELEMENT","DRAWING.ELEMENT.PATH"]);
   // //MessageLog.trace(pegDataB.toString("Top"));

}
