// CLASS OO_ASSET

MessageLog.trace("CLASS OO_Setup")

OO.Setup = function(_name,_tree,_script){

	this.tree = _tree; 
	
	this.name = _name; 
	
	var script = require(_script);
	
	this.run_script= function(){

		script.run();

	}
}
