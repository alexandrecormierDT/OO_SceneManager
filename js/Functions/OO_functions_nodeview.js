

function align_selected_nodes(_axe){
	
	scene.beginUndoRedoAccum ("align_selected_nodes")
	
	var sumX = 1;
	var sumY = 1;
	
	for(var i = 0 ; i < OO.doc.selectedNodes.length ; i++){
		
		var current_node = OO.doc.getNodeByPath(OO.doc.selectedNodes[i]);
		sumX+=current_node.x;
		sumY+=current_node.y;
		
	}
	
	for(var i = 0 ; i < OO.doc.selectedNodes.length ; i++){
		
		var current_node = OO.doc.getNodeByPath(OO.doc.selectedNodes[i]);
		
		switch(_axe){
		
			case "x": 

				current_node.x = (sumX/OO.doc.selectedNodes.length) - (current_node.width/2); 
			
			break;
			
			
			case "y": 
			
				current_node.y = sumY/OO.doc.selectedNodes.length; 
				
			break;
			
		}
		
	}
	
	scene.endUndoRedoAccum ()
	
}


function scale_selected_nodes(_axe){
	
	scene.beginUndoRedoAccum ("align_selected_nodes")
	
	var ref_node = OO.doc.getNodeByPath(OO.doc.selectedNodes[1]);
	
	var factor =1.1;

	var onodes = [];
	
	for(var i = 0 ; i < OO.doc.selectedNodes.length ; i++){
		
		onodes.push(OO.doc.getNodeByPath(OO.doc.selectedNodes[i]));
		
	}
	
	var sorted_by_axe = onodes.sort(function(a, b) {

		switch(_axe){
			
			case "x": 
			
				return a.x - b.x;
			
			break;
			
			case "y": 
				
				return a.y - b.y;
					
			break;
		}
		
	});
	
	var level = 0; 
	
	var last_node = sorted_by_axe[sorted_by_axe.length-1]
	
	var node_to_modifiy = sorted_by_axe;
	var point_list = [];

	for(var i =0; i < sorted_by_axe.length ; i++){
		
		var current_node = sorted_by_axe[i];
		
		var point_data  = {
			px: current_node.x,
			py: current_node.y,
			dx: current_node.x - ref_node.x,
			dy: current_node.y - ref_node.y,
		}
		
		point_list.push(point_data);
		
	}
	
	for(var i =0; i < point_list.length ; i++){
		
		var current_node = sorted_by_axe[i];
		
		var previous_node = {x:0,y:0};
		
		if(i > 0 ){
			
			var previous_node = sorted_by_axe[i-1];
			
		}
		
		var current_node = node_to_modifiy[i];
		
		switch(_axe){
			
			case "x": 

			
				current_node.x= point_list[i].px+(point_list[i].dx*factor);
				
			
			break;
			
			case "y": 
			
				current_node.y= point_list[i].py+(point_list[i].dy*factor);
						
				
			break;
			
		}
		
	}
	
	scene.endUndoRedoAccum ()
	
}


function copy_node_name_process(){
	
	var snodes = selection.selectedNodes(); 
	
	////MessageLog.trace(snodes);
	
	    var d = new Dialog
	    d.title = "COPY NODE NAME";
	    d.width = 100;

		var INPUTX = new ComboBox();
		 INPUTX.label = "SOURCE  : ";
		 INPUTX.editable = false;
		 INPUTX.itemList = snodes;
		d.add(INPUTX);
			
		var INPUTY = new ComboBox();
		 INPUTY.label = "TARGET  : ";
		 INPUTY.editable = false;
		 INPUTY.itemList = snodes;
		d.add(INPUTY);	
		
		var INPUTP = new ComboBox();
		 INPUTP.label = "PREFIX  : ";
		 INPUTP.editable = true;
		 INPUTP.itemList = ["","FRONT_","BACK_"];
		d.add(INPUTP);	
		
	if ( d.exec() ){

		var source_node = $.scene.getNodeByPath(INPUTX.currentItem);
		var target_node = $.scene.getNodeByPath(INPUTY.currentItem);				
		var prefix = INPUTP.currentItem;				
			
		var new_name = prefix+source_node.name+"_";
			
		target_node.name = new_name 
		
		selection.clearSelection();
		selection.addNodeToSelection(INPUTY.currentItem)
        
	} 
	
}

