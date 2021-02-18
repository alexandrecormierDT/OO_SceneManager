// CLASS OO_Tree

MessageLog.trace("CLASS OO_Tree")


OO.Tree = function(_code,_nodes,_position){
	
	var onodes = _nodes; 
	
	this.group =_nodes[0].parent;
	
	this.top_peg ="";
	
	
	this.code = _code; 
	
	this.position = _position;
	
	this.reads;
	
	this.id = 0;
	
	this.pegs = []; 
	
	this.backdrop = [];
	
	this.add_node = function(onode){
		
	
		onodes.push(onode);
		
	}
	
	this.set_top_peg = function(tp){
		
		this.top_peg = tp;
		
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
	
	

}



