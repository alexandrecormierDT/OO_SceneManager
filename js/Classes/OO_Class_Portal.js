// CLASS OO_Portal

MessageLog.trace("CLASS OO_Portal")

OO.Portal = function (_name,tpl_path,psd_path,_tree){

	this.tree = _tree;
	
	this.tpl_path = tpl_path;
	this.psd_path = psd_path;
	
	this.name = _name;

	
	this.update_path = function(){
		
		
		
	}
	
	this.deploy = function(){

		if(this.tree.peg != undefined && this.tree.get_parent_group() != null && this.tree.get_parent_group().path != "Top"){
	
			node.explodeGroup(this.tree.get_parent_group().path);
	
		}

	}
  
}