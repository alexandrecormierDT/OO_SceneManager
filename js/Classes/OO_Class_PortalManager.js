// CLASS OO_Portal

////MessageLog.trace("CLASS OO_PortalManager")

OO.PortalManager = function(_S){
	
	this.module_path = "P:/pipeline/script_modules/Portals/Portal.tpl";
	
	var S = _S;
	
	this.list = [];
	
	this.load_from_scene = function(){
		
		// Detect the script module with "portal" attributes among the scene nodes and fetch the linked nodes to make the tree, read the script module attributes 
		//add a new portal object to the list. 
		
		// init list

		var scene_nodes = OO.doc.root.nodes;
		
		this.load_from_node_list(scene_nodes)
		

	}
	
	this.load_from_node_list= function(_node_list){
		
		// init list
		
		this.list = [];
		
		// Detect the script module with "portal" attributes among the selected nodes and fetch the linked nodes to make the tree, read the script module attributes 
		//add a new portal object to the list. 
		
		var scene_PSM = []
		
		for(var n = 0 ; n < _node_list.length ; n++){
			
			var cnode = OO.doc.getNodeByPath(_node_list[n]);
			
			if(cnode.type == "SCRIPT_MODULE"){
				
				if(cnode.attributes.hasOwnProperty('portal') == true){
					
					scene_PSM.push(cnode);
					
				};
				
			}
			
		}

		for(var sm = 0 ; sm < scene_PSM.length ; sm++){
			
			
			var cur_script_module = scene_PSM[sm];
		
			// CODE,TYPE AND PATHS
			
			
			var tpl_path = OO.filter_string(cur_script_module.node_map);
			
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

			
			
			var nportal = new OO.Portal(code,type,tpl_path,psd_path,png_path,ntree);
			
			//we gathered all informations expect the backdrop. 

			
			this.list.push(nportal);

		}
		

	}	
	
	
	this.pull = function(_portal,_data_type){
		
		if(_portal.path_exist(_data_type)){
			
			switch (_data_type){
				
				case 'psd': 
				
					final_path = _portal.psd_path ;
					
					//we import the tpl inside the portal's group
					var nodes = S.trees.import_psd_in_group(_portal.code,final_path,_portal.tree.group);
					
					// we arange the psd nodes
					var bg_tree = S.trees.add(_portal.code,nodes)
					
					//bg_tree.set_parent_group(_portal.tree.group);
					
					S.trees.arange_psd_node(bg_tree);
				
					_portal.set_content(bg_tree);
					
					var pbackdrop = _portal.get_backdrop();
					
					pbackdrop.color = new $.oColorValue("#5097D8ff");
					
					

				break;
				
				case 'png': 

					final_path = _portal.png_path ;
					
					MessageLog.trace(final_path); 
					
					var portal_group = _portal.tree.get_key_node("PORTAL_GROUP");
					
					var png_node = portal_group.importImage(final_path);
					
					S.log.add("import png = "+png_node,"process")
					
					png_node.name = _portal.code;
					
					
					portal_group.multiportIn.linkOutNode(png_node,0,0,true);
					
					png_node.linkOutNode(portal_group.multiportOut,0,0,true);				
					
					png_node.centerAbove(portal_group.multiportOut, 0, -100);
					
					
					
					var pbackdrop = _portal.get_backdrop();
					
					pbackdrop.color = new $.oColorValue("#5097D8ff");
					
					return png_node;

				break;			
				
				case 'tpl':
				
				
				break;
			}			
			
		}else{
			
			S.log.add("data not found "+_portal.get_path(_data_type),"error");
			
		}

	}
	
	// should be handled by the tree class
	
	this.empty = function (_portal){
		
		var all_reads = []
		var all_pegs = []
		var all_composites = []
		var list_type = []
		
		var portal_group = _portal.tree.get_key_node("PORTAL_GROUP");
		
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
				
		pbackdrop.color = new $.oColorValue("#000000ff");
		
		S.log.add("portal is now empty","process");
	}
	
	this.push= function(type){
			
	}  
	
	this.clear = function(){
		
	}  	
	
	
	// CREATING THE PORTAL TREE
	
	
	this.add = function(_code,_type,_tpl_path,_psd_path,_png_path){ 
	
		var code = _code != undefined ? _code : "empty"; 
		var type = _type != undefined ? _code : ""; 
		var tpl_path = _tpl_path != undefined ? _tpl_path : ""; 
		var psd_path = _psd_path != undefined ? _psd_path : ""; 
		var png_path = _png_path != undefined ? _png_path : ""; 
	
		////MessageLog.trace("Portal ADD");
		
		var pnodes =  S.trees.import_tpl(this.module_path);
		
		var ntree = S.trees.add(_code,pnodes);
		
		//OO.Portal(_name,tpl_path,psd_path,_tree)
		var nportal = new OO.Portal(_code,type,tpl_path,psd_path,png_path,ntree);
		
		for (var n in pnodes){
		
			var cn = pnodes[n]; 
			
			if(cn.type == "SCRIPT_MODULE"){
				
				cn.attributes.tpl_path.setValue(tpl_path);
				cn.attributes.psd_path.setValue(psd_path);
				cn.attributes.png_path.setValue(png_path);
				
				cn.attributes.code.setValue(_code);
				cn.attributes.sg_asset_type.setValue(_type);
				
				cn.name = "PORTAL_"+_code
				
				nportal.tree.set_key_node("PORTAL_MODULE",cn); 
				
				 
			}
			
			if(cn.type == "GROUP"){
				
				
				cn.name = _code;
				
				nportal.tree.set_key_node("PORTAL_GROUP",cn); 
				
			}	
			
			if(cn.type == "PEG"){
				
				
				cn.name = "LT_"+_code;
				
				nportal.tree.set_key_node("PORTAL_PEG",cn); 
			}			
			
		} 
		
		
		var parent_group = nportal.tree.get_parent_group();
		
		nportal.tree.backdrop = parent_group.addBackdropToNodes(pnodes, "PORTAL", _code,new $.oColorValue("#000000ff"), 0, 0, 20, 20)

		this.list.push(nportal);
		
		return nportal;
		
			
	}
	

	
	this.update= function(){
		
	}
	
	this.remove= function(){
		
		
	}

  
}