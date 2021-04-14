// CLASS OO_Tree

//////MessageLog.trace("CLASS OO_Tree")


OO.Tree = function(_code,_nodes){
	
	
	// realy need to clean the public vars 
	
	// META 
	
	var tree_code = _code
	
	var tree_id = 0;
	
	
	// NODES
	
	var tree_nodes = _nodes


	// KEY NODES 
	
	var key_nodes = []
	
	
	// ANATOMY 
	
	this.top_node;
	
	this.bottom_node; 
	
	this.backdrop;

	
	this.map_module = false;
	
	
	// META DATS 
	
	this.get_code = function(){
		
		tree_code;
		
	}
	
	
	// MAP MODULE

	this.set_map_module = function(_script_module){
		
		this.map_module  = _script_module;
		
	}
	
	this.get_map_module = function(){

		return this.map_module;
		
	}
	
	this.fetch_map_module = function(){

		
	}
		
	// update attributes of the map module
	
	this.update_map_module = function(_attribute,_value){
		
		var map_module = this.get_map_module();

		if(map_module != false){
			
			if(map_module.hasOwnProperty(_attribute)){
				
				map_module.attributes[_attribute].setValue(_value);
				
				return true;
				
			}
			
			
		}
		
		return false; 
		
	}

	
	// NODES
	
	this.fetch_node_list = function(){
		
		var map_module = this.get_map_module();
		
		if(this.map_module != false){
			
			return this.map_module.node_list;
			
		}
		
		return false; 		
		
	}
	
	//this is bad
	
	this.get_node_list = function(){
		
		var map_module = this.get_map_module();
		
		if(this.map_module != false){
			
			return this.map_module.node_list;
			
		}
		
		return false; 		
		
	}	
	

	
	this.add_node = function(_node){
		
		if(tree_nodes.indexOf(_node) == -1){
		
			tree_nodes.push(node);
		
		}

	}

	
	this.get_nodes = function(){
		
	// return a list of oNodes
	
		var onode_list = []; 
		
		for(var n = 0 ; n < tree_nodes.length ; n ++){
			
			onode_list.push($.scene.getNodeByPath(tree_nodes[n]));
			
		}	

		return onode_list;
		
	}
	
	this.get_reads = function(){
		
	// return a list of oNodes
	
		var read_list = []; 
		
		for(var n = 0 ; n < tree_nodes.length ; n ++){
			
			var current_onode = OO.doc.getNodeByPath(tree_nodes[n]); 
			
			if(current_onode.type == "READ"){
				
				read_list.push(OO.doc.getNodeByPath(tree_nodes[n]));
				
			}
			
		}	

		return read_list;
		
	}
	
	this.select_nodes = function(){
		
		var nodes = this.get_nodes();
		
		//MessageLog.trace(nodes);
		
		for(var n = 0 ; n < nodes.length ; n ++){
			
			selection.addNodeToSelection (nodes[n].path)
		}
		
	}
	
	
	// KEY NODES 
	
	this.set_key_node = function(_key,_node){
		
		key_nodes[_key] = _node;
		
		if(tree_nodes.indexOf(_node) == -1){
			
			tree_nodes.push(_node);
			
		}
		
	}
	
	
	//this will eventualy call the id instead of path
		
	this.get_key_node = function(_key){
		
		return OO.doc.getNodeByPath(key_nodes[_key]);

	}
	
	
	// ANATOMY METHO
	
	this.set_top_node = function(h){
		
		this.set_key_node("top_node",h); 
		
	}
	
	
	this.set_bottom_node = function(f){
		
		this.set_key_node("bottom_node",h); 
		
	}	
	
	this.get_top_node= function(){
		
		return OO.doc.getNodeByPath(this.get_key_node("top_node"));
		
	}	
	
	this.get_bottom_node = function(){
		
		return OO.doc.getNodeByPath(this.get_key_node("bottom_node"));
		
	}
	
	
	this.find_node_by_prefix = function(_prefix){
		
		for(var n = 0 ; n < tree_nodes.length  ; n ++){
			
			var current_node = OO.doc.getNodeByPath(tree_nodes[n]); 
			
			var name_split = current_node.name.split('_');
			
			//MessageLog.trace(name_split);
			
			if(name_split[0] == _prefix){
			
				return current_node;
				
			}
			
		}	

		return false;

	}
	
	
	this.find_top_node = function(){
		
		var top_prefix = "TOP";
		
		var found_node =  this.find_node_by_prefix(top_prefix);

		return found_node;
		
	}
	
	this.find_bottom_node = function(){
		
		var top_prefix = "BOTTOM";
		
		return this.find_node_by_prefix(top_prefix);
		
	}	
	
	this.set_top_peg = function(tp){
		
		this.set_key_node("top_peg",h); 
		
	}
	
	
	this.set_final_comp = function(fc){
		
		this.set_key_node("final_comp",h); 
		
	}
	
	// NODES 

	
	this.get_parent_group = function(){
		
		var _tree_nodes = this.get_nodes();
		
		if(_tree_nodes != null  && _tree_nodes.length > 0){
			
			return tree_nodes[0].parent;
			
		}
		
		return false; 
		
	}

	this.get_group = function(){


	}
	
	
	// SCRIPT MODULE


	this.get_width = function(){
		
		if(this.backdrop.width != undefined){
			
			return this.backdrop.width;
			
		}else{
			
			return onodes.bounds.width;
		
		}
		
		return false;

	}
	
	this.main_group = function(){
		
		
		
	}
	
	this.get_height = function(){
		
		if(this.backdrop.width != undefined){
			
			return this.backdrop.width
			
		}else{
			
			return onodes.bounds.height;
		
		}

	}	
	
	this.get_X = function(){
		
		if(this.backdrop.x != undefined){
			
			return this.backdrop.x;
			
		}
		
		return 0;

	}	
	
	this.get_Y = function(){
		
		if(this.backdrop.y != undefined){
			
			return this.backdrop.y;
			
		}
		
		return 0;

	}		
	this.move = function(_x,_y){
		
		for(var on in tree_nodes){
		
			var cn = tree_nodes[on];
			
			cn.x += _x
			cn.y += _y
			
		}
		
		this.backdrop.x+=x
		this.backdrop.y+=y

	}
	

	this.moveTo = function(_x,_y){
		
		for(var n in tree_nodes){
		
			var cn = OO.doc.getNodeByPath(tree_nodes[n]);
			
			if(this.backdrop != undefined){
			
				var diffX =   cn.x - this.backdrop.x
			
				var diffY =  cn.y - this.backdrop.y 
			
				cn.x = _x + diffX
				cn.y = _y + diffY
			
			}
			
		}
		
		if(this.backdrop != undefined){
		
			this.backdrop.x=_x
			this.backdrop.y=_y
		
		}

	}
	
	this.scale = function(sx,sy){
		
		for(var n in tree_nodes){
		
			var cn =  OO.doc.getNodeByPath(tree_nodes[n]);
			
			cn.x *= sx
			cn.y *= sy
			
		}
		
		this.backdrop.x*=sx
		this.backdrop.y*=sy

	}	

	// the nodes are no longueur reachable after the ungroup , that's a shame, i should find a way to updatethem. with id for each node ? 
	
	this.ungroup = function(){
		
		var node_name_list = []

		for (var i = 0 ; i < tree_nodes.length ; i++){
			
			var current_node = OO.doc.getNodeByPath(tree_nodes[i]);

			node_name_list.push(current_node);
		}
		

		if(this.get_parent_group() != null && this.get_parent_group().path != "Top"){
	
			node.explodeGroup(this.get_parent_group().path);
	
		}


	}
	
	this.udpate_onode_with_new_group = function(newgroup,node_name){
		
		var updated_onode  = OO.doc.getNodeByPath(newgroup+"/"+node_name);
		
		return updated_onode;
		
	}


}



