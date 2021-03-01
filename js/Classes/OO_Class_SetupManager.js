// CLASS OO_ASSET

MessageLog.trace("CLASS OO_SetupManager")

OO.SetupManager = function(_S){

	var S = _S;
	
	this.dir = "P:/pipeline/scene_setups/";
	
	this.list = [];	

	this.apply = function(setup_name){ 
			
		var setup_tpl_path = this.dir+setup_name+"/tpl/setup_"+setup_name+".tpl";

		var setup_script_path = this.dir+setup_name+"/js/script_"+setup_name+".js";
			
		var setup_nodes = S.trees.import_tpl(setup_tpl_path);
		
		var setup_tree = S.trees.add(setup_name,setup_nodes);
		
		MessageLog.trace(setup_tree.name);
		
		var setup_instance  = new OO.Setup(setup_name,setup_tree,setup_script_path);

		var temp_group = setup_instance.tree.get_parent_group();

		setup_instance.tree.ungroup();

		//SHould find a cleaner way later to run the setup script !

		include(setup_script_path);

		setup_script()

		return setup_instance;

		
	}




}
