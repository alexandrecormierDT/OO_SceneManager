// CLASS OO_ASSET

MessageLog.trace("CLASS OO_SetupManager")

OO.SetupManager = function(_S){

	var S = _S;
	
	this.dir = "P:\pipeline\scene_setups";
	
	this.list = [];	
	
	
	this.apply_setup = function(setup_name){ 
			
		var setup_tpl_path = this.dir+"/"+setup_name+"/setup_"+setup_name+".tpl";
			
		var setup_tree = S.trees.import_tpl= function(setup_tpl_path);

	}


}
