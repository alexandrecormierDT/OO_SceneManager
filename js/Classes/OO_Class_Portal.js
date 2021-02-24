// CLASS OO_Portal

MessageLog.trace("CLASS OO_Portal")

/*
	a portal is a tree with a particular setup to import and export tpl

	in the node view a portal is composed of a peg a group and a script_module with custom attributes. 
 
	
	PEG : 
	
	meant to recieve layout transformations (fit to cam ect...) 
	
	GROUP : 
	
	contains the nodes we want. they arrive here when we import them.
	and are copied from here when we export them.
	
	SCRIPT_MODULE : 
	
	provide path informations for exporting and importing. 
	
	ATTRIBUTES OF THE SCRIPT NODE

	<specs>
	  <ports>
		<in type="IMAGE"/>
		<out type="IMAGE"/>
	  </ports>

	  <attributes>
	<attr type="bool" name="portal" value=""/> 
	<attr type="String" name="id" value=""/> 
	<attr type="String" name="code" value=""/> 
	<attr type="String" name="type" value=""/> 
	<attr type="String" name="tpl_path" value=""/> 
	<attr type="String" name="psd_path" value=""/> 

	  </attributes>
	</specs>
	*/

OO.Portal = function (_code,_type,_tpl_path,_psd_path,_tree){

	// a tree with a peg a group and a script_module
	this.tree = _tree;
	
	this.tpl_path = _tpl_path;
	
	this.psd_path = _psd_path;
	
	this.code = _code; 
	
	this.sg_asset_type = _type; 
	
	this.id = 0;

	this.content; 

	
	this.update_path = function(){
		
		
		
	}
	
	this.tpl_exist = function(){
		
		var tpl = new $.oFile(this.tpl_path)
		
		return tpl.exist;
		
	}
	
	this.psd_exist = function(){
		
		var psd = new $.oFile(this.psd_path)
		
		return psd.exist;
	}

	this.set_content = function(tree){
		
		this.content = tree;
		
	}
	this.get_content = function(){
	
		return this.content;
		
	}
	
	this.get_type = function(){
		
		return this.sg_asset_type
		
	}
	
	
	this.deploy = function(){

		if(this.tree.peg != undefined && this.tree.get_parent_group() != null && this.tree.get_parent_group().path != "Top"){
	
			node.explodeGroup(this.tree.get_parent_group().path);
	
		}

	}
	

}

