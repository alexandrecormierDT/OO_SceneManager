// CLASS OO_Tree

////MessageLog.trace("CLASS OO_Tree")


OO.Tree = function(_code,_nodes){
	
	
	// realy need to clean the public vars 
	
	// META 
	
	var code = _code
	
	
	// NODES
	
	var onodes = _nodes
	
	this.onodes = _nodes
	
	this.nodes = _nodes
	
	this.node_map; 
	
	
	// ANATOMY 
	
	this.top_node;
	
	this.bottom_node; 
	
	
	

	this.group; 
	
	this.code = _code; 
	
	
	
	this.reads;
	
	this.tree_id = 0;
	
	this.top_peg;
	
	
	this.peg; 
	
	this.backdrop;
	
	this.script_module;
	
	this.final_comp;
	
	this.node_id_list = [];
	
	this.key_nodes = ""
	
	this.map_module = false;
	
	
	// META DATS 
	
	this.get_code = function(){
		
		return this.code;
		
	}
	
	
	
	// MAP MODULE

	this.set_map_module = function(_script_module){
		
		this.map_module  = _script_module;
		
	}
	
	this.get_map_module = function(){

		return this.map_module;
		
	}
	
	// update attributes of the map module
	
	this.update_map_module = function(_attribute,_value){
		
		MessageLog.trace("update_map_module")
		MessageLog.trace(_attribute)
		MessageLog.trace(_value)
		
		var map_module = this.get_map_module();
		
		MessageLog.trace(map_module.path)
		MessageLog.trace(map_module.name)
		MessageLog.trace(map_module[_attribute])
		
		if(map_module != false){
			
			if(map_module.hasOwnProperty(_attribute)){
				
				map_module.attributes[_attribute].setValue(_value);
				
			}
			
			
		}
		
	}
	
	this.get_key_nodes = function(){
		
		
		
		
	}
	
	// NODES
	

	this.get_node_list = function(){
		
		var map_module = this.get_map_module();
		
		if(this.map_module != false){
			
			return this.map_module.node_list;
			
		}
		
		return false; 
		
	}	
	

	
	this.add_node = function(node){
		
		onodes.push(node);
		
		this.onodes.push(node);

	}
	
	
	this.get_nodes = function(){
		
	// return a list of oNodes
	
		var onode_list = []; 
		
		for(var n = 0 ; n < this.onodes.length ; n ++){
			
			onode_list.push(OO.doc.getNodeByPath(this.onodes[n]));
			
		}	

		return onode_list;
		
	}
	
	
	this.select_nodes = function(){
		
		
		var nodes = this.get_nodes();
		
		MessageLog.trace(nodes);
		
		for(var n = 0 ; n < nodes.length ; n ++){
			
			selection.addNodeToSelection (nodes[n].path)
		}
		
	}
	
	
	// ANATOMY METHO
	

	
	this.set_top_node = function(h){
		
		this.top_node = h; 
		
	}
	
	
	this.set_bottom_node = function(f){
		
		this.bottom_node = f
		
	}	
	
	this.get_top_node= function(){
		
		return OO.doc.getNodeByPath(this.top_node); 
		
	}	
	
	this.get_bottom_node = function(){
		
		return OO.doc.getNodeByPath(this.bottom_node); 
		
	}
	
	
	this.find_node_by_prefix = function(_prefix){
		
		for(var n = 0 ; n < this.nodes.length  ; n ++){
			
			var current_node = OO.doc.getNodeByPath(this.onodes[n]); 
			
			var name_split = current_node.name.split('_');
			
			MessageLog.trace(name_split);
			
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
		
		this.top_peg = tp;
		
	}
	
	
	this.set_final_comp = function(fc){
		
		this.final_comp= fc;
		
	}
	
	
	// NODES 
	
	this.count_nodes = function(){
		
		
	}
	
	this.get_node_list = function(){
		
		
		
		
	}
	
	
	
	
	this.set_group = function(){
		
		
	}
	
	this.get_parent_group = function(){
		
		if(onodes != null){
			
			return this.onodes[0].parent;
			
		}
		
	}

	this.get_group = function(){


	}
	
	
	var fetch_reads = function(){
		
		var list =[];
		
		for(var n in onodes){
			
			var cn = onodes[n]; 
			
			if(cn.type == "READ"){
			
				list.push(cn);
				
			}
			
		}
		
		return list;
		
	}

	
	this.set_nodes = function(_onodes){
		
		onodes = _onodes;
		
	}
	
	
	// KEY NODES 
	
	this.add_key_node = function(_node,_key){
		
		var key_node_array = this.get_key_nodes();
		
	}
	

	this.get_key_nodes = function(){
		
		
	}
	
	
	// SCRIPT MODULE
	
	this.update_script_module = function(){
		
		
		
	}
	
	
	this.get_script_module = function(){
		
		
	}

	this.reads = fetch_reads();
	
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
		
		for(var on in this.onodes){
		
			var cn = this.onodes[on];
			
			cn.x += _x
			cn.y += _y
			
		}
		
		this.backdrop.x+=x
		this.backdrop.y+=y

	}
	

	this.moveTo = function(_x,_y){
		
		for(var on in this.onodes){
		
			var cn = this.onodes[on];
			
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
		
		for(var on in onodes){
		
			var cn = onodes[on];
			
			cn.x *= sx
			cn.y *= sy
			
		}
		
		this.backdrop.x*=sx
		this.backdrop.y*=sy

	}	

	// the nodes are no longueur reachable after the ungroup , that's a shame, i should find a way to updatethem. with id for each node ? 
	
	this.ungroup = function(){
		
		////MessageLog.trace("BEFORE UNGROUP TREE");
		
		var node_name_list = []

		for (var i = 0 ; i < this.onodes.length ; i++){
			
			////MessageLog.trace( this.onodes[i]);
			////MessageLog.trace( this.onodes[i].name);
			
			node_name_list.push(this.onodes[i].name);
		}
		
		

		if(this.get_parent_group() != null && this.get_parent_group().path != "Top"){
	
			node.explodeGroup(this.get_parent_group().path);
	
		}
		
		////MessageLog.trace("AFTER UNGROUP TREE");

	}
	
	this.get_node_by_id = function(id){
		
		
		
	}
	
	this.udpate_onode_with_new_group = function(newgroup,node_name){
		
		
		var updated_onode  = OO.doc.getNodeByPath(newgroup+"/"+node_name);
		
		return updated_onode;
		
	}


}



