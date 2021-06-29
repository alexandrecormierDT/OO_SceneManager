











// TREE MANIPULATIONS

function create_tree_with_selection(){
	
	// save the scene ! 
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/add_tree.html");

	var selected_nodes = OO.doc.selectedNodes; 
	
	var TREE_CODE = "";
	
	//////MessageLog.trace(selected_nodes);
	
	
	
	var dialog = new Dialog();
	dialog.title = "TREE CODE (no accents) : ";
	dialog.width = 100;
	
	var userInput = new LineEdit();
	userInput.text = ""
	dialog.add( userInput );
		
	if (dialog.exec()){
		
		TREE_CODE = OO.filter_string(userInput.text);
		 
		S.trees.add_tree( TREE_CODE,selected_nodes);
		
		S.log.add("new tree added "+TREE_CODE,"tree");
		
	}	
}


function select_tree_nodes(){
	
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/select_tree_nodes.html");


	var selected_nodes = OO.doc.selectedNodes; 
	
	var fetched_map_modules = S.trees.find_map_modules_in_nodes(selected_nodes)
	
	//////MessageLog.trace("MODULES");
	
	//////MessageLog.trace(fetched_map_modules);
	
	selection.clearSelection ()
	
	for(var n = 0 ; n < fetched_map_modules.length ; n++){
		
		var current_map_module = fetched_map_modules[n]; 
		
		var ntree = S.trees.instaciate_tree_with_map_module(current_map_module);
		
		ntree.select_nodes();
		
		ntree.update_map_module("treeid","hallo");
		
	}
	
	//////MessageLog.trace(selected_nodes);
	
}



function show_layer_ID(){
	
	var S = new OO.SceneManager();	
	
	var selection = OO.doc.selectedNodes;
	
	//////MessageLog.trace(S.trees.get_node_smlayerid(selection[0]));
	
	MessageBox.information(S.trees.get_node_smlayerid(selection[0]));
	
}


function mark_nodes(){
	
	var S = new OO.SceneManager();	
	
	var selection = OO.doc.selectedNodes;
	
	S.trees.add_id_to_nodes(selection)
	
}



