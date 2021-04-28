

OO.HeadAngle = function (){
	
	var source_group = ""
	var current_frame = 0; 
	var head_layer_drawing_column = ""; 
	var head_layer_current_sub_name = ""; 
	var head_layer_path = ""; 
	var head_angle = ""; 
	
	
	this.set_source_group = function(_sg){
		
		source_group = _sg
		
	}	
	
	this.fetch_head_layer_path_in_source_group = function(){
		
		head_layer_path = source_group+"/TETE";
		
		MessageLog.trace("head_layer_path");
		
		MessageLog.trace(head_layer_path);
		
	}
	
	this.get_head_angle_at_frame = function(_frame){
		
		current_frame = _frame;
		
		extract_angle_from_sub_name()
		
		return head_angle;
		
	}

	
	function fetch_head_layer_current_sub_name(){
		
		var current_tvg_name = column.getDrawingName(head_layer_drawing_column,current_frame)
		
		head_layer_current_sub_name = extract_sub_name_from_tvg_name(current_tvg_name); 
		
		MessageLog.trace("head_layer_current_sub_name");
		
		MessageLog.trace(head_layer_current_sub_name);
		
		
	}
	
	function extract_angle_from_sub_name(){
		
		fetch_head_layer_drawing_column()
		
		fetch_head_layer_current_sub_name()
		
		underscore_split = head_layer_current_sub_name.split("_"); 
		MessageLog.trace(underscore_split.length);
		
		if(underscore_split.length > 1){
			
			head_angle = head_layer_current_sub_name[0];
			
		}else{
			
			head_angle = head_layer_current_sub_name
		}
		
		MessageLog.trace("head_angle");
		
		MessageLog.trace(head_angle);
		
	}

	
	function extract_sub_name_from_tvg_name(tvgname){
		
		var split0=tvgname.split('-');

		var split1=split0[1];
		
		var result = "";

		if(split1 != "" &&typeof(split1) == "string"){
			
			var split2 = split1.split('.')

			result = split2[0]
			
		}
		
		return result;
	}
	
	
	function fetch_head_layer_drawing_column(){
		
		for(var i = 0 ; i<Timeline.numLayers;i++){

			if(Timeline.layerToNode(i)==head_layer_path){

				currentColumn = Timeline.layerToColumn(i);
				
				if(column.type(currentColumn) == "DRAWING"){
					
					readColumn = Timeline.layerToColumn(i);
					
					head_layer_drawing_column = readColumn; 
					
					break;
					
				}
			}
		}		
		
	}
	
}