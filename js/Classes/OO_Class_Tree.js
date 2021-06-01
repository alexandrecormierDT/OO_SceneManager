// CLASS OO_Tree

////////MessageLog.trace("CLASS OO_Tree")


OO.Tree = function(_code,_nodes){
	
	
	// realy need to clean the public vars 
	
	// META 
	
	var tree_code = _code
	
	var tree_id = 0;

	
	// NODES
	
	var tree_nodes = _nodes


	// KEY NODES 
	
	var key_nodes = []
	
	// BACKDROP 
	
	var tree_backdrop_object = ""; 
	
	
	
	
	
	
	
	var map_module = false;
	
	
	// META DATS 
	
	this.get_code = function(){
		
		return tree_code;
		
	}
	
	
	// MAP MODULE

	this.set_map_module = function(_script_module){
		
		map_module  = _script_module;
		
	}
	
	this.get_map_module = function(){

		return map_module;
		
	}

	// update attributes of the map module
	
	this.update_map_module = function(_attribute,_value){

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
		
		if(this.map_module != false){
			return map_module.node_list;
		}
		
		return false; 		
		
	}
	
	//this is bad
	
	this.get_node_list = function(){
		
		if(this.map_module != false){
			return map_module.node_list;
		}
		
		return false; 		
		
	}	
	

	
	this.add_node = function(_node){
		
		if(tree_nodes.indexOf(_node) == -1){
			tree_nodes.push(node);
		}

	}

	
	this.get_nodes = function(){
		
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
		
		for(var n = 0 ; n < tree_nodes.length ; n ++){
			selection.addNodeToSelection (tree_nodes[n].path)
		}
		
	}
	
	
	// KEY NODES 
	
	this.set_key_node = function(_key,_node_path){
		
		key_nodes[_key] = _node_path;
		if(tree_nodes.indexOf(_node_path) == -1){
			tree_nodes.push(_node_path);
		}
		
	}
	
	
	//this will eventualy call the id instead of path
		
	this.get_key_node = function(_key){
		
		MessageLog.trace("FUNCTION : "+arguments.callee.name);
		return key_nodes[_key];

	}
	
	
	// ANATOMY METHO
	
	this.set_top_node = function(h){
		
		this.set_key_node("top_node",h); 
		
	}
	
	
	this.set_bottom_node = function(f){
		
		this.set_key_node("bottom_node",h); 
		
	}	
	
	this.get_top_node= function(){
		
		return OO.doc.getNodeByPath(key_nodes["top_node"]);
		
	}	
	
	this.get_bottom_node = function(){
		
		return OO.doc.getNodeByPath(this.get_key_node("bottom_node"));
		
	}
	
	
	
	function find_node_by_prefix(_prefix){
		
		for(var n = 0 ; n < tree_nodes.length  ; n ++){
			
			var current_node = OO.doc.getNodeByPath(tree_nodes[n]); 
			var name_split = current_node.name.split('_');
			if(name_split[0] == _prefix){
			
				return current_node;
				
			}
			
		}	

		return false;

	}
	
	
	this.find_top_node = function(){
		
		var top_prefix = "TOP";
		var found_node =  find_node_by_prefix(top_prefix);
		return found_node;
		
	}
	
	this.find_bottom_node = function(){
		
		var top_prefix = "BOTTOM";
		return find_node_by_prefix(top_prefix);
		
	}	
	
	this.set_top_peg = function(tp){
		
		this.set_key_node("top_peg",h); 
		
	}
	
	
	this.set_final_comp = function(fc){
		
		this.set_key_node("final_comp",h); 
		
	}
	
	// NODES 

	
	this.get_parent_group = function(){
		
		if(tree_nodes[0] != null){
			
			var first_node = $.scene.getNodeByPath(tree_nodes[0]) 
			if(first_node != null){
				return first_node.parent;	
			}

			
		}
		
		return false; 
		
	}
	
	
	// BACKDROP
	
	this.get_backdrop = function(){
		
		return tree_backdrop_object; 
		
	}
	
	this.set_backdrop = function(_bdo){
		
		tree_backdrop_object = _bdo; 
		
	}
	this.get_width = function(){
		
		if(tree_backdrop_object.width != undefined){
			
			return tree_backdrop_object.width;
			
		}else{
			
			return onodes.bounds.width;
		
		}
		
		return false;

	}
	
	this.get_height = function(){
		
		if(tree_backdrop_object.width != undefined){
			
			return tree_backdrop_object.width
			
		}else{
			
			return onodes.bounds.height;
		
		}

	}	
	
	this.get_X = function(){
		
		if(tree_backdrop_object.x != undefined){
			
			return tree_backdrop_object.x;
			
		}
		
		return 0;

	}	
	
	this.get_Y = function(){
		
		if(tree_backdrop_object.y != undefined){
			
			return tree_backdrop_object.y;
			
		}
		
		return 0;

	}		
	
	
	this.move = function(_x,_y){
		
		for(var on in tree_nodes){
		
			var cn = tree_nodes[on];
			cn.x += _x
			cn.y += _y
			
		}
		
		tree_backdrop_object.x+=x
		tree_backdrop_object.y+=y

	}
	

	this.moveTo = function(_x,_y){
		
		for(var n in tree_nodes){
		
			var cn = OO.doc.getNodeByPath(tree_nodes[n]);
			
			if(tree_backdrop_object != undefined){
			
				var diffX =   cn.x - tree_backdrop_object.x
			
				var diffY =  cn.y - tree_backdrop_object.y 
			
				cn.x = _x + diffX
				cn.y = _y + diffY
			
			}
			
		}
		
		if(tree_backdrop_object != undefined){
		
			tree_backdrop_object.x=_x
			tree_backdrop_object.y=_y
		
		}

	}
	
	this.scale = function(sx,sy){
		
		for(var n in tree_nodes){
		
			var cn =  OO.doc.getNodeByPath(tree_nodes[n]);
			
			cn.x *= sx
			cn.y *= sy
			
		}
		
		tree_backdrop_object.x*=sx
		tree_backdrop_object.y*=sy

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
	
}



