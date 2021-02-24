// CLASS OO_Tree

MessageLog.trace("CLASS OO_Tree")


OO.Tree = function(_code,_nodes){
	
	var onodes = _nodes; 
	
	this.onodes = _nodes
	
	this.node_map; 

	this.group; 
	
	this.code = _code; 
	
	this.position;
	
	this.reads;
	
	this.id = 0;
	
	this.top_peg;
	
	this.peg; 
	
	this.backdrop;
	
	this.script_module;
	
	this.final_comp;
	
	
	this.add_node = function(onode){
		
	
		this.onodes.push(onode);
		onodes.push(onode);
		
	}
	
	this.set_top_peg = function(tp){
		
		this.top_peg = tp;
		
	}
	this.set_final_comp = function(fc){
		
		this.final_comp= fc;
		
	}
	
	this.get_parent_group = function(){
		
		if(onodes != null){
			
			return this.onodes[0].parent;
			
		}
		
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
	

	this.get_nodes = function(){
	
		return onodes;
		
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

}



