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

OO.Portal = function (_code,_type,_tpl_path,_psd_path,_png_path,_tree){

	// a tree with a peg a group and a script_module
	
	this.tree = _tree;
	
	this.code = _code; 
	
	this.sg_asset_type = _type; 

	this.content; 
	
	var paths; 
	

	this.tpl_path = _tpl_path

	this.psd_path = _psd_path;

	this.png_path = _png_path;


	this.png_scaled = false;
	
	
	// PATHS

	this.update_path = function(_key,_path){
		
		paths[_key] = _path;
		
	}
	
	this.add_path = function (_key,_path){
		
		paths[_key] = _path;
	}
	
	this.get_path = function(_key){
		
		return paths[_key];
		
	}
	
	this.path_exist = function(_key){
		
		var nfile = new $.oFile(paths[_key] )
		
		return nfile.exists;		
	
	}
	

	
	
	var paths = [];
	this.add_path('tpl',_tpl_path)
	this.add_path('psd',_psd_path)
	this.add_path('png',_png_path)		
	
	// script_module
	
	this.get_script_module = function(){
		
		var script_module_name = "PORTAL_"+this.get_code();
		
		return OO.doc.getNodeByPath(script_module_name);
		
	}
	
	
	this.fetch_data_from_script_module = function(){
		
		
		
	}
	
	this.set_script_module_attributes = function(_attr,_value){
		
		var script_module = this.get_script_module();
		
		script_module.attributes[_attr].setValue(_value);
		
		
	}
	
	this.get_backdrop = function (){
		
		var scene_backdrops = OO.doc.root.backdrops; 
		
		this.tree.backdrop = false;
		
		for (var b = 0 ; b < scene_backdrops.length ; b++){
		
			var curb = scene_backdrops[b];
			
			if(curb.body == this.get_code() && curb.title == "PORTAL"){
				
				return curb;
				
				break;
				
			}

		}
		
		
		
	}	

	
	

	//obsolete
	
	this.tpl_exist = function(){
		
		var tpl = new $.oFile(this.tpl_path)
		
		return tpl.exists;
		
	}
	
	this.psd_exist = function(){
		
		var psd = new $.oFile(this.psd_path)
		
		////MessageLog.trace("PSD EXIST");
		////MessageLog.trace(psd.exists);

		return psd.exists;
	}
	this.png_exist = function(){
		
		var png = new $.oFile(this.png_path)
		
		////MessageLog.trace("PSD EXIST");
		////MessageLog.trace(psd.exists);

		return png.exists;
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
	
	this.get_code = function(){
		
		return this.code
		
	}
	
	
	

	

}

