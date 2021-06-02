// CLASS OO_Portal


OO.PortalManager = function(_S){
	
	var S = _S;
	
	this.creator = new OO.PortalCreator(S); 
	
	var list = [];
	
	this.get_list = function(){
	
		return list;
		
	}
	
	this.reset_list= function(){
		
		list = []; 
	}
	
	
	this.add = function(_portal){
		
		list.push(_portal);
		
	}
	
	this.load_from_scene = function(){
		
		// Detect the script module with "portal" attributes among the scene nodes and fetch the linked nodes to make the tree, read the script module attributes 
		//add a new portal object to the list. 
		
		// init list
		var scene_nodes = OO.doc.root.nodes;
		this.load_from_node_list(scene_nodes)

	}
	
	this.allready_loaded = function(_portal){
		
		
		
	}
	
	this.get_scene_portal_by_asset =  function(_asset){
		
		this.load_from_scene(); 
		
		for(var p = 0 ; p < list.length ; p++){
			
			var current_portal = list[p]; 
			if(portal_correspond_to_asset(current_portal,_asset)){
				return current_portal;
			}
			
		}

		return false; 
		
	}
	
	function portal_correspond_to_asset(_portal,_asset){
		
		var match = 0; 

		if(_portal.get_code() == _asset.get_code() ){
			match++;
		}
		if(_portal.get_sg_asset_type() == _asset.get_sg_asset_type()){
			match++;
		}
		
		if( match == 2){
			
			return true
		}
		
		return false;
		
		
	}
	

	
	this.load_from_node_list= function(_node_list){
		
		// init list
		
		list = [];
		
		// Detect the script module with "portal" attributes among the selected nodes and fetch the linked nodes to make the tree, read the script module attributes 
		//add a new portal object to the list. 

		//we fetch the Portal Script Modules in the selection
		var scene_PSM = []
		for(var n = 0 ; n < _node_list.length ; n++){
			var cnode = OO.doc.getNodeByPath(_node_list[n])
			if(cnode.type == "SCRIPT_MODULE"){
				if(cnode.attributes.hasOwnProperty('portal') == true){
					scene_PSM.push(cnode);
				};
			}
			
		}

		for(var sm = 0 ; sm < scene_PSM.length ; sm++){

			var cur_script_module = scene_PSM[sm];
		
			// CODE,TYPE AND PATHS
			
			var tpl_path = OO.filter_string(cur_script_module.tpl_path);
			var psd_path = OO.filter_string(cur_script_module.psd_path);
			var png_path = OO.filter_string(cur_script_module.png_path);
			var code = OO.filter_string(cur_script_module.code);
			var type = OO.filter_string(cur_script_module.sg_asset_type);
			
			
			//PORTAL GROUP
			var linked_group = OO.doc.getNodeByPath(cur_script_module.linkedInNodes);
			
			//PORTAL PEG
			var linked_peg = OO.doc.getNodeByPath(linked_group.linkedInNodes);

			//TREE
			var ntree = S.trees.add(code,[]);
			
			ntree.set_key_node("PORTAL_GROUP",linked_group);
			ntree.set_key_node("PORTAL_PEG",linked_peg);
			ntree.set_key_node("PORTAL_MODULE",cur_script_module);

			var nportal = new OO.Portal();
			
			nportal.set_tree(ntree)
			nportal.set_code(code)
			nportal.set_sg_asset_type(type)
			nportal.set_path('tpl',tpl_path)
			nportal.set_path('png',png_path)
			nportal.set_path('psd',psd_path)

			this.add(nportal);

		}
		

	}	
	
	this.update_portal_script_module_attributes = function (_portal,_attributes_object){
		
		_portal.set_several_script_module_attributes(_attributes_object);
		
	}
	

	
	this.pull_scene_portal_tpl_by_asset_type = function(_sg_asset_type){
		
		this.load_from_scene(); 
		
		for(var p = 0 ; p < list.length ; p++){
			
			var current_portal = list[p]; 
			
			if(portal_match_sg_asset_type(current_portal,_sg_asset_type)){
				
				var tpl_group = this.pull(current_portal,'tpl');
			}
			
		}
		return false; 		
		
		
	}
	
	
	
	function portal_match_sg_asset_type(_portal,_sg_asset_type){
		
		var current_type = _portal.get_sg_asset_type(); 
		var anim_equivalent = ["FX","Character", "Prop","Vehicle"];
		if(current_type == _sg_asset_type ){
			
			return true;
		}
		if(_sg_asset_type == "anim" && anim_equivalent.indexOf(current_type) != -1){
			return true;
		}
		return false; 
		
	}
	
	
	this.pull = function(_portal,_data_type){

		MessageLog.trace("FUNCTION : "+arguments.callee.name);
		
		var pulled_nodes = []; 
		
		if(_portal.path_exist(_data_type)){
			
			switch (_data_type){
				case 'psd': 
					pulled_nodes = pull_psd(_portal)
				break;
				case 'png': 
					pulled_nodes = pull_png(_portal); 
				break;			
				case 'tpl':
					pulled_nodes = pull_tpl(_portal); 
				break;
			}			
			
		}else{
			S.log.add("[PORTAL PULL] data not found "+_portal.get_path(_data_type),"error");
		}

		return pulled_nodes; 

	}





	function pull_png(_portal){

			var portal_tree  = _portal.get_tree();	
			var portal_group = portal_tree.get_key_node("PORTAL_GROUP");
			var portal_sg_asset_type = _portal.get_sg_asset_type()

			final_path = _portal.get_path('png');

			var png_node = S.trees.import_png_in_group(final_path,portal_group);

			if(png_node != false){

				// scale the read to fit the original size of the png
				S.trees.scale_anim_node_to_png_size(png_node.path,final_path)


				//different treatment for bg
				if(portal_sg_asset_type == 'bg'){
					S.trees.scale_bg_node_to_png_size(png_node.path,final_path)
				}

				S.log.add("[PORTAL PULL] png node created ","process")
				S.log.add("[PORTAL PULL] importing png = "+png_node,"process")


				MessageLog.trace("positionning the node and renaming it ")
				
				//positionning the node and renaming it 
				png_node.name = _portal.get_code();
				portal_group.multiportIn.linkOutNode(png_node,0,0,true);
				png_node.linkOutNode(portal_group.multiportOut,0,0,true);				
				png_node.centerAbove(portal_group.multiportOut, 0, -100);

			}

			return png_node;	

	}





	function pull_tpl(_portal){

		MessageLog.trace("FUNCTION : "+arguments.callee.name);

		var portal_tree  = _portal.get_tree();	
		var portal_group = portal_tree.get_key_node("PORTAL_GROUP");
		var pulled_nodes = []; 
				

		final_path = _portal.get_path('tpl') ;
		
		
		S.trees.import_tpl_in_group(final_path,portal_group)
		var tpl_group = S.trees.get_first_sub_group_in_group(portal_group); 
		
		if(tpl_group != false){
			
			
			//positionning the nodes 
			portal_group.multiportIn.linkOutNode(tpl_group,0,0,true);
			tpl_group.linkOutNode(portal_group.multiportOut,0,0,true);
			tpl_group.centerAbove(portal_group.multiportOut, 0, -500);
			node.explodeGroup(tpl_group);
			
			
			S.trees.replace_group_multiports(portal_group.path);

			//pulled_nodes = portal_group.nodes;	
			
			
		}
		
		//return pulled_nodes; 

	}




	function pull_psd(_portal){


		var portal_tree  = _portal.get_tree();	
		var portal_group = portal_tree.get_key_node("PORTAL_GROUP");
				
		final_path = _portal.get_path('psd'); 
					
		//we import the tpl inside the portal's group
		var nodes = S.trees.import_psd_in_group(_portal.get_code(),final_path,portal_group);
		
		// we arange the psd nodes
		var bg_tree = S.trees.add(_portal.get_code(),nodes)
		
		S.trees.arange_psd_node(bg_tree);
		var pbackdrop = _portal.get_backdrop();
		pbackdrop.color = new $.oColorValue("#5097D8ff");

		return nodes
		
	}	





	
	//********************************** P U S H **************************************//
	
	
	this.push_portal = function(_portal,_data_type){
		
			//MessageLog.trace("PUSH ");
			
			var export_path = _portal.get_path(_data_type);
			var export_folder_path = _portal.get_dir(_data_type);
			var export_folder_object = new $.oFolder(export_folder_path); 
			export_folder_object.create()
			var export_process = false;
			
			var portal_tree = _portal.get_tree();
			
			switch (_data_type){
				
				case 'psd': 

				break;
				
				case 'png': 					

				break;			
				
				case 'tpl':
				
					var tpl_name = _portal.get_code();
					var portal_group = portal_tree.get_key_node("PORTAL_GROUP");
					S.log.add("exporting "+_data_type+" to "+_portal.get_path(_data_type),"process");
					export_process = S.trees.export_group_to_path(portal_group,export_folder_path,tpl_name);
				
				break;
			}			

			S.log.add("export status "+export_process,"report");
			


	}	

	// should be handled by the tree class
	
	this.empty = function (_portal){
		
		var all_reads = []
		var all_pegs = []
		var all_composites = []
		var portal_tree = _portal.get_tree()
		var portal_group = portal_tree.get_key_node("PORTAL_GROUP");
		
		for(var n = 0 ; n < portal_group.nodes.length ; n ++){
			
			var curn = portal_group.nodes[n]; 
			
			if(curn.type !== "MULTIPORT_IN" && curn.type !== "MULTIPORT_OUT" ){
				
				if(curn.type == "READ"){
					
					all_reads.push(curn.path);
				}
				if(curn.type == "PEG"){
					
					all_pegs.push(curn.path);
				}			
				if(curn.type == "COMPOSITE"){
					
					all_composites.push(curn.path);
				}	

			}
		
		}
		
		for(var n = 0 ; n < all_reads.length ; n ++){
			
			var curr = all_reads[n]; 
			node.deleteNode(curr,true,true); 

		}		
		
		for(var n = 0 ; n < all_pegs.length ; n ++){
			
			var curp = all_pegs[n]; 
			node.deleteNode(curp,true,true); 

		}			
		
		for(var n = 0 ; n < all_composites.length ; n ++){
			
			var curc = all_composites[n]; 
			node.deleteNode(curc,true,true); 

		}		
		
		//until we can delete backdrops.....
		
		if(portal_group.backdrops[0] != undefined){
		
			portal_group.backdrops[0].x+=2000; 
			portal_group.backdrops[0].width=20;
			portal_group.backdrops[0].height=20;
			portal_group.backdrops[0].title = "deleteme";
			portal_group.backdrops[0].body = "deleteme";
		
		}
		
		var pbackdrop = _portal.get_backdrop();
		
		if(pbackdrop != false){
				
			pbackdrop.color = new $.oColorValue("#000000ff");		
		
		}

		
		S.log.add("portal is now empty","process");
	}
	

	this.delete_portal = function(_portal){
		
		
	}

  
}


MessageLog.trace("CLASS OO_PortalManager")