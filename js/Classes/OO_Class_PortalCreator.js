// CLASS OO_Portal

//////MessageLog.trace("CLASS OO_PortalManager")

OO.PortalCreator = function(_S){
	
	var script_module_path = "P:/pipeline/script_modules/Portals/Portal.tpl";
	
	var S = _S;
	
	var current_code = null;
	var current_sg_asset_type = null;
	var current_tpl_path = null;
	var current_psd_path = null;
	var current_png_path = null;		
	var current_svg_path = null;		
	var current_departement =  null;
	var current_tpl_version = null;		
	var current_status =  null;

	var created_portal = null; 
	
	this.set_sg_asset_type = function(_sat){
		current_sg_asset_type = _sat
	}; 
	
	this.set_code = function(_c){
		current_code = _c
	}; 
	
	this.set_tpl_path = function(_tp){
		current_tpl_path = _tp
	}; 
	
	this.set_psd_path = function(_psp){
		current_psd_path = _psp
	}; 
	
	this.set_png_path = function(_pnp){
		current_png_path = _pnp
	}; 
	
	this.set_svg_path = function(_svp){
		current_svg_path = _svp
	}; 
	
	
	this.set_departement = function(_d){
		current_departement = _d
	}; 
	
	this.set_tpl_version = function(_tv){
		current_tpl_version = _tv
	}; 
	this.set_status = function(_as){
		current_status = _as
	}; 	
	
	
	
	this.create_portal = function(){ 
	
		//MessageLog.trace("Portal ADD");
		
		var nportal = new OO.Portal();
		
		nportal.set_code(current_code)
		nportal.set_sg_asset_type(current_sg_asset_type)
		
		nportal.set_departement(current_departement)
		nportal.set_path('tpl',current_tpl_path)
		nportal.set_path('png',current_png_path)
		nportal.set_path('psd',current_psd_path)
		nportal.set_path('svg',current_svg_path)
		
		nportal.set_tpl_version(current_tpl_version)
		nportal.set_status(current_status)
		
		
		
		// IMPORTING THE TPL 
		
		var pnodes =  S.trees.import_tpl_in_temp_group(script_module_path);

		// BUILDING THE TREE with its key nodes
		
		var ntree = S.trees.add(current_code,pnodes);
		
		for (var n in pnodes){
		
			var cn = pnodes[n]; 
			
			if(cn.type == "SCRIPT_MODULE"){
						
				cn.name = "PORTAL_"+current_code
				ntree.set_key_node("PORTAL_MODULE",cn);

	 
			}
			
			if(cn.type == "GROUP"){
				
				cn.name = current_code;
				ntree.set_key_node("PORTAL_GROUP",cn); 
				
			}	
			
			if(cn.type == "PEG"){
				
				cn.name = "LT_"+current_code;
				ntree.set_key_node("PORTAL_PEG",cn); 
				
			}			
			
		} 
		
		// CREATING THE BACK DROP 
		
		var parent_group = ntree.get_parent_group();
		
		var departement_color = get_departement_color()
		
		ntree.set_backdrop(parent_group.addBackdropToNodes(pnodes, " < PORTAL : "+current_code+" > ",current_code,departement_color , 0, 0, 20, 20))
		
		
		
		// linking the tree to the portal instance
		
		nportal.set_tree(ntree)
		
		// updating the module now that the script module is created and defined 
		
		nportal.update_script_module_attributes_from_current_instance();		
		
		var created_portal = nportal;
		
		return nportal;
			
	}
	
	this.get_created_portal = function(){
		
		return created_portal;
		
	}

	function get_departement_color(){
		
		var departement_color = new $.oColorValue(OO.pipe_colors.dt[0]); 
		
		switch (current_departement){
			
			case "design" : 
			
				departement_color = new $.oColorValue(OO.pipe_colors.design[0])
				
			break; 
			
			case "rig" : 
			
				departement_color = new $.oColorValue(OO.pipe_colors.rig[0])
				
			break;
			
			case "bg" : 
			
				departement_color = new $.oColorValue(OO.pipe_colors.bg[0])
			
			break;			
			case "layout" : 
			
				departement_color = new $.oColorValue(OO.pipe_colors.layout[0])
			
			break;
			
			case "anim" : 
			
				departement_color = new $.oColorValue(OO.pipe_colors.anim[0])
			
			break;	
			case "compo" : 
			
				departement_color = new $.oColorValue(OO.pipe_colors.compo[0])
			
			break;	
		}

		return departement_color;
		
		
		
	}


  
}