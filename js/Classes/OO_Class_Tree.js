// CLASS OO_Tree

MessageLog.trace("CLASS OO_Tree")


OO.Tree = function(_code,_nodes,_position){
	
	var onodes = _nodes; 
	
	this.onodes = _nodes
	
	this.parent_group;
	
	this.top_peg ="";
	
	this.group = ""; 
	
	this.code = _code; 
	
	this.position = _position;
	
	this.reads;
	
	this.id = 0;
	
	this.pegs = []; 
	
	this.backdrop;
	
	this.script_module;
	
	this.add_node = function(onode){
		
	
		onodes.push(onode);
		
	}
	
	this.set_top_peg = function(tp){
		
		this.top_peg = tp;
		
	}

	this.get_parent_group = function(){
		
		return onodes[0].parent;
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
			
			return this.onodes.bounds.width;
		
		}
		
		return false;

	}
	
	
	this.get_height = function(){
		
		if(this.backdrop.width != undefined){
			
			return this.backdrop.width
			
		}else{
			
			return this.onodes.bounds.height;
		
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



