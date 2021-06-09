// CLASS OO_Portal

////MessageLog.trace("CLASS OO_Portal")

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

OO.Portal = function (){

	
	var portal_code = null;
	var portal_id = null;
	var portal_sg_asset_type = null
	var portal_departement = "boxanim";
	var portal_tpl_version = null;
	var portal_status = null; 
	var portal_paths = [];
	var portal_backdrop_name = "PORTAL";
	var portal_backdrop_body = "";
	
	
	// TREE
	var portal_tree = null;
	
	
	//SETTERS
	
	this.set_code = function(_pc){
		portal_code = _pc;
	}	
	this.set_id = function(_i){
		portal_id = _i;
	}	
		
	this.set_sg_asset_type = function(_c){
		portal_sg_asset_type = _c;
	}	
				
	this.set_path = function(_key,_path){
		portal_paths[_key] = _path;
		
	}	
	

	this.set_departement = function(_d){
		portal_departement = _d;
	}	
	
	this.set_tpl_version = function(_tv){
		portal_tpl_version = _tv;
	}	
	
	this.set_status = function(_tv){
		portal_status = _tv;
	}	

	// TREE
	this.set_tree = function(_pt){
		portal_tree = _pt;
		
	}
	
	//GETTERS

	this.get_tree = function(){
		return portal_tree; 
		
	}
	
	this.get_code = function(){
		return portal_code;
	}

	this.get_id = function(){
		return portal_id;
	}
	
	this.get_departement = function(){
		return portal_departement; 
		
	}
	
	this.get_sg_asset_type = function(){
		return portal_sg_asset_type; 
		
	}
	
	this.get_tpl_version = function(){
		return portal_tpl_version; 
		
	}
	
	this.get_status_version = function(){
		return portal_status; 
		
	}		
	
	this.get_path = function(_key){
		
		if(portal_paths.hasOwnProperty(_key) == true){
			return portal_paths[_key];
		}
		return false; 
		
	}	

	this.get_backdrop_name = function(){

		format_backdrop_name()
		return portal_backdrop_name;

	}
	this.get_backdrop_body = function(){

		format_backdrop_body()
		return portal_backdrop_body;

	}

	this.change_backdrop_color_to = function(_color_object){


	}

	this.get_backdrop_object = function(){
		format_backdrop_name()
		

	}


	function format_backdrop_name(){

		departement_name_upper_case = portal_departement.toUpperCase();
		portal_backdrop_name =" < "+departement_name_upper_case+" PORTAL : "+portal_code+" > ";
		MessageLog.trace(portal_backdrop_name)

	}

	function format_backdrop_body(){

		portal_backdrop_body = portal_code

	}

	// PATHS

	this.update_path = function(_key,_path){
	
		if(portal_paths.hasOwnProperty(_key) == true){
			
			portal_paths[_key] = _path;
			
		}

	}
	
	// used in push portal , to find where to export the tpl for exemple 
	
	this.get_dir = function(_key){
		
		if(portal_paths.hasOwnProperty(_key)){

			var path = portal_paths[_key]; 
			var slash_split = path.split("/");
			var file = slash_split[slash_split.length-1]
			var dir = path.split(file)[0]
			
			return dir; 
			
		}

	}
	
	
	this.path_exist = function(_key){
		
		var nfile = new $.oFile(portal_paths[_key] )
		return nfile.exists;		
	
	}

	// script_module
	
	var portal_script_module_object = null; 
	
	this.update_script_module_attributes_from_current_instance = function(){
		
		var attributes_object = get_attributes_object_from_current_instance()
		this.set_several_script_module_attributes(attributes_object);
		
	}
	
	function get_attributes_object_from_current_instance(){
		
		var attr_object = {
			code: portal_code,
			id: portal_id,
			tpl_version: portal_tpl_version,
			sg_asset_type: portal_sg_asset_type,
			departement: portal_departement,
			tpl_path: portal_paths['tpl'],
			psd_path: portal_paths['psd'],
			png_path: portal_paths['png'],
			svg_path: portal_paths['svg']
		}
		
		return attr_object;
		
	}

	this.set_several_script_module_attributes = function(_attributes_object){
		
		var attributes_names = Object.getOwnPropertyNames(_attributes_object); 
		
		for (var a = 0 ;  a <attributes_names.length ; a++){
			
			var cur_attr_name = attributes_names[a]
			var cur_attr_val = _attributes_object[cur_attr_name]
			set_script_module_attribute(cur_attr_name,cur_attr_val);
			
		}		
		
	}
	
	function set_script_module_attribute(_attr,_value){
		
		var portal_script_module_path = portal_tree.get_key_node("PORTAL_MODULE");
		var portal_script_module_object = $.scn.getNodeByPath(portal_script_module_path)
		
		if(portal_script_module_object.attributes.hasOwnProperty(_attr)){
			
			portal_script_module_object.attributes[_attr].setValue(_value);
			
		}
		
	}

			
	this.get_backdrop = function (){
		var scene_backdrops = OO.doc.root.backdrops;
		for (var b = 0 ; b < scene_backdrops.length ; b++){
			var curb = scene_backdrops[b];
			if(curb.body == portal_code){
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

MessageLog.trace("Class Portal");
