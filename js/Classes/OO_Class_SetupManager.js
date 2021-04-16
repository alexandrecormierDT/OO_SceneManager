// CLASS OO_ASSET

MessageLog.trace("CLASS OO_SetupManager")

OO.SetupManager = function(_S){

	var S = _S;
	
	this.dir = "P:/pipeline/scene_setups/";
	
	this.list = [];	

	this.apply = function(setup_name){ 
	
		MessageLog.trace("apply "+setup_name)
	
		if(this.get_current_setup(setup_name) == false){
			
			S.log.add("installing "+setup_name+" ","check");
			
			var setup_tpl_path = this.dir+setup_name+"/tpl/setup_"+setup_name+".tpl";

			var setup_script_path = this.dir+setup_name+"/js/script_"+setup_name+".js";
				
			var setup_nodes = S.trees.import_tpl_in_temp_group(setup_tpl_path);
			
			var setup_tree = S.trees.add(setup_name,setup_nodes);
			
			S.log.add(setup_tree.code,"tree");
			
			setup_tree.ungroup();

			//SHould find a cleaner way later to run the setup script !

			include(setup_script_path);

			setup_script();
			
			S.log.add("setup "+setup_name+" imported","check");

			return setup_tree;
			
		}

		
	}
	
	
	this.get_current_setup = function(setup_name){
		
		var CSB = S.get_backdrop_by_name("CURRENT_SETUP"); 
		
		if(CSB == false){
		
			return false;
			
		}else{
			
			S.log.add("setup "+setup_name+" already imported","error");
			
			return CSB.body;
			
		}
		
		
	}

}




