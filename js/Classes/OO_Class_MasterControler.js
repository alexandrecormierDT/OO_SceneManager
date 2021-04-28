

OO.MasterControler = function (_node_path){
	
	var node_path = _node_path
	
	this.set_node_path = function(_np){
		
		var node_path = _np; 
	
	}
	
	this.show_controls = function(){
		
		
		node.showControls(node_path, true);	
		
	}
	
	this.hide_controls = function(){
		
		
		node.showControls(node_path, false);	
		
	}	
	
} 