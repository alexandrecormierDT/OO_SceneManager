

OO.LipsInjector = function (){
	
	var target_layer_path; 
	
	var target_layer_drawing_column;
	
	var sub_to_expose;
	
	this.set_target_layer_path = function(_mlp){
		
		target_layer_path = _mlp
		
	}
	
	this.set_sub_to_expose = function(_se){
		
		sub_to_expose = _se;
		
	}

	
	function fetch_target_layer_drawing_column(){
		
		for(var i = 0 ; i<Timeline.numLayers;i++){

			if(Timeline.layerToNode(i)==target_layer_path){

				currentColumn = Timeline.layerToColumn(i);
				
				if(column.type(currentColumn) == "DRAWING"){
					
					readColumn = Timeline.layerToColumn(i);
					
					target_layer_drawing_column = readColumn; 
					
					break;
					
				}
			}
		}		
		
	}
	
	
	function target_layer_has_matching_sub_name(){
		
		var sub_timing = column.getDrawingTimings(target_layer_drawing_column);
				
		if(sub_timing.indexOf(sub_to_expose)!=-1){
				
			return false
						
		}	

		return true;
		
	}
	
	this.expose_sub_name_in_target_layer_at_frame = function(_frame){
		
		fetch_target_layer_drawing_column()
		
		// we only expose it if it exists inside the element subs. 
		
		if(target_layer_has_matching_sub_name()==false){
			
			column.setEntry(target_layer_drawing_column,1,_frame,sub_to_expose);
			
		}

	}
	
}