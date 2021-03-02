// CLASS OO_Tree

////MessageLog.trace("CLASS OO_Tree")


OO.Tree = function(_code,_nodes){
	
	var onodes = _nodes
	
	this.onodes = _nodes
	
	this.node_map; 

	this.group; 
	
	this.code = _code; 
	
	this.reads;
	
	this.id = 0;
	
	this.top_peg;
	
	this.peg; 
	
	this.backdrop;
	
	this.script_module;
	
	this.final_comp;
	
	this.node_id_list = [];
	
	this.key_nodes = [];
	

	
	
	this.add_node = function(onode){
		
		//this.mark_treeid(onode,this.code);
		
		//this.mark_node_id(onode,Math.random(100));

		onodes.push(onode);
		
		this.onodes.push(onode);

	}
	
	this.mark_node_id = function(_node,_id){
			
		_node.createAttribute("node_id", "string", "NID", false);
	
		_node.attributes.node_id.setValue(_id);				
		
	}	
	
	
	this.mark_treeid = function(_node,_id){
			
		_node.createAttribute("tree_id", "string", "TID", false);
	
		_node.attributes.tree_id.setValue(_id);				
		
	}	
	
	this.set_top_peg = function(tp){
		
		this.top_peg = tp;
		
	}
	this.set_final_comp = function(fc){
		
		this.final_comp= fc;
		
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
	
	// NODES 
	
	this.get_nodes = function(){
	
		return onodes;
		
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



