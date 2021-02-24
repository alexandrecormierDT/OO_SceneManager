// CLASS OO_Portal

MessageLog.trace("CLASS OO_PortalManager")

OO.PortalManager = function(_S){
	
	this.module_path = "P:/pipeline/script_modules/Portals/Portal.tpl";
	
	var S = _S;
	
	this.list = [];
	
	
	
	this.load_from_scene = function(){
		
		// Detect the script module with "portal" attributes among the scene nodes and fetch the linked nodes to make the tree, read the script module attributes 
		//add a new portal object to the list. 
		
		var scene_nodes = OO.doc.root.nodes;
		
		var scene_PSM = []
		
		for(var n = 0 ; n < scene_nodes.length ; n++){
			
			var cnode = scene_nodes[n];
			
			if(cnode.type == "SCRIPT_MODULE"){
				
				if(cnode.attributes.hasOwnProperty('portal') == true){
					
					//PORTAL SCRIPT MODULE
					
					scene_PSM.push(cnode);
					
				};
				
			}
			
		}

		for(var sm = 0 ; sm < scene_PSM.length ; sm++){
			
			
			var cur_script_module = scene_PSM[sm];
			
			
			
			// CODE,TYPE AND PATHS
			
			var tpl_path = OO.filter_string(cur_script_module.tpl_path);
			
			var psd_path = OO.filter_string(cur_script_module.psd_path);
			
			var code = OO.filter_string(cur_script_module.code);
			
			var type = OO.filter_string(cur_script_module.sg_asset_type);
			
			
			//PORTAL GROUP
			
			var linked_group = OO.doc.getNodeByPath(cur_script_module.linkedInNodes);
			
			MessageLog.trace("GROUP");
			
			MessageLog.trace(linked_group.name);
			
			MessageLog.trace(tpl_path);
			
			MessageLog.trace(psd_path);
			
			
			//PORTAL PEG
			
			var linked_peg = OO.doc.getNodeByPath(linked_group.linkedInNodes);
			
			MessageLog.trace("PEG");
			
			MessageLog.trace(linked_peg.name);
			
			
			//TREE
			
			MessageLog.trace("TREE");
			
			var ntree = S.trees.add(code,[]);
			
			ntree.add_node(linked_group);
			ntree.add_node(linked_peg);
			ntree.add_node(cur_script_module);
			
			ntree.script_module = cur_script_module;
			
			ntree.group = linked_group;
			
			ntree.peg = linked_peg;	

			MessageLog.trace(ntree.onodes);			
			MessageLog.trace(ntree.group);			

			var nportal = new OO.Portal(code,type,tpl_path,psd_path,ntree);
			

			
			//we gathered all informations expect the backdrop. 
			
			MessageLog.trace("PUSH PORTAL");
			
			this.list.push(nportal);
			
			
			
		}
		
		MessageLog.trace(this.list);
		
	}
	
	
	
	this.load = function(){
		
	}
	

	this.create_tree = function(_portal){
		
		
		
	}
	
	
	this.pull = function(_portal,_type){
		
		switch (_type){
			
			case 'psd': 
			
				MessageLog.trace("PULL");

				final_path = _portal.psd_path ;
				
				MessageLog.trace(final_path); 
				
				MessageLog.trace(_portal.tree.group);
				
				//we import the tpl inside the portal's group
				var nodes = S.trees.import_psd_in_group(_portal.code,final_path,_portal.tree.group);
				
				// we arange the psd nodes
				var bg_tree = S.trees.add(_portal.code,nodes)
				
				//bg_tree.set_parent_group(_portal.tree.group);
				
				S.trees.arange_psd_node(bg_tree);
			
				_portal.set_content(bg_tree);

			break;
			case 'tpl':
			
			
			break;
		}
		
	}
	
	this.push= function(type){
		
		
		
	}  
	
	this.clear = function(){
		
		
		
	}  	
	
	
	
	this.add = function(_code,_type,tpl_path,psd_path){ 
	
		MessageLog.trace("Portal ADD");
		
		var pnodes =  S.trees.import_tpl(this.module_path);
		
		var ntree = S.trees.add(_code,pnodes);
		
		//OO.Portal(_name,tpl_path,psd_path,_tree)
		var nportal = new OO.Portal(_code,_type,tpl_path,psd_path,ntree);
		
		for (var n in pnodes){
		
			var cn = pnodes[n]; 
			
			if(cn.type == "SCRIPT_MODULE"){
				
				cn.attributes.tpl_path.setValue(tpl_path);
				cn.attributes.psd_path.setValue(psd_path);
				cn.attributes.code.setValue(_code);
				cn.attributes.sg_asset_type.setValue(_type);
				nportal.tree.script_module = cn; 
				
				cn.name = "PORTAL_"+_code
				 
			}
			
			if(cn.type == "GROUP"){
				
				
				nportal.tree.group = cn; 
				cn.name = _code;
				
			}	
			
			if(cn.type == "PEG"){
				
				nportal.tree.peg = cn; 
				cn.name = "LT_"+_code;
			}			
			
		} 
		
		
		var parent_group = nportal.tree.get_parent_group();
		
		MessageLog.trace("parent_group");
		MessageLog.trace(parent_group);
		
		
		nportal.tree.backdrop = parent_group.addBackdropToNodes(pnodes, "PORTAL", _code,new $.oColorValue("#000000ff"), 0, 0, 20, 20)

		this.list.push(nportal);
		
		return nportal;
		
			
	}
	

	
	this.update= function(){
		
	}
	
	this.remove= function(){
		
		
	}

  
}