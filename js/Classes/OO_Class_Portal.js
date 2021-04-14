// CLASS OO_Portal

//MessageLog.trace("CLASS OO_Portal")

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

OO.Portal = function (_code,_type,_tpl_path,_psd_path,_png_path,_tree){

	// a tree with a peg a group and a script_module
	
	
	var portal_code = _code; 
	
	var portal_sg_asset_type = _type; 
	
	var portal_paths = [];
	
	/*portal_paths['tpl'] = _tpl_path;
	portal_paths['psd'] = _psd_path;
	portal_paths['png'] = _png_path;*/
	
	var portal_tree = _tree;

	var portal_department = "";
	
	var portal_content = ""; 
	
	var portal_script_module_object = null; 
	
	
	
	this.get_tree = function(){
	
		return portal_tree; 
		
	}
	
	
	this.get_code = function(){
		
		return portal_code 
	}
	
	
	this.get_department = function(){
	
		return portal_department; 
		
	}
	
	this.get_sg_asset_type = function(){
	
		return portal_sg_asset_type; 
		
	}
	
	
	this.get_path = function(_key){
		
		return portal_paths[_key];
		
	}	
	

	this.set_content = function(_tree){
		
		portal_content = _tree;
		
	}
	
	this.get_content = function(){
	
		return portal_content;
		
	}

		
	
	// PATHS

	this.update_path = function(_key,_path){
		
		if(portal_paths.hasOwnProperty(_key) == true){
			
			portal_paths[_key] = _path;
			
		}

	}
	
	
	
	this.get_dir = function(_key){
		
		if(portal_paths.hasOwnProperty(_key)){

			var path = portal_paths[_key]; 
			
			var slash_split = path.split("\\");
			
			//MessageLog.trace(slash_split); 
			var dir = "";
			
			for(var i = 0 ; i < slash_split.length-1; i ++){
				var current_split = slash_split[i] ;
				dir+=current_split;
				 
			}
			
			return dir; 
			
		}
		

		
	}
	
	this.path_exist = function(_key){
		
		var nfile = new $.oFile(portal_paths[_key] )
		
		return nfile.exists;		
	
	}
	
	

	
	
	
	// script_module
	

	function set_script_module_attribute(_attr,_value){
		
		var portal_script_module_path = portal_tree.get_key_node("PORTAL_MODULE");
		
		MessageLog.trace("portal_script_module_path")
		MessageLog.trace(portal_script_module_path)
		
		var portal_script_module_object = $.scn.getNodeByPath(portal_script_module_path)
		
		if(portal_script_module_object.attributes.hasOwnProperty(_attr)){
			
			portal_script_module_object.attributes[_attr].setValue(_value);
			
		}
		
		
		
	}

	this.set_several_script_module_attributes = function(_attributes_object){
		
		var attributes_names = Object.getOwnPropertyNames(_attributes_object); 
		
		for (var a = 0 ;  a <attributes_names.length ; a++){
			
			var cur_attr_name = attributes_names[a]
			
			var cur_attr_val = _attributes_object[cur_attr_name]
			
			set_script_module_attribute(cur_attr_name,cur_attr_val);
			
		}		
		
	}
	
	this.get_backdrop = function (){
		
		var scene_backdrops = OO.doc.root.backdrops; 
		
		for (var b = 0 ; b < scene_backdrops.length ; b++){
		
			var curb = scene_backdrops[b];
			
			if(curb.body == portal_code && curb.title == "PORTAL"){
				
				return curb;
				
				break;
				
			}

		}
		
		return false;
		
		
		
	}	

	
	

	//obsolete
	
	this.tpl_exist = function(){
		
		var tpl = new $.oFile(this.get_path('tpl'))
		
		return tpl.exists;
		
	}
	
	this.psd_exist = function(){
		
		var psd = new $.oFile(this.get_path('psd'))

		return psd.exists;
	}
	
	
	this.png_exist = function(){
		
		var png = new $.oFile(this.get_path('png'))

		return png.exists;
	}
	



	

}

