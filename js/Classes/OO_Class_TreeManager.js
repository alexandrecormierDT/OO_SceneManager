// CLASS OO_TreeManager

MessageLog.trace("CLASS OO_TreeManager")

OO.TreeManager = function(_S){
	
	var S = _S;
	
	this.list = [];
	
	this.load = function(){
		
	}
	
	this.add = function(code,nodes){
		
		var ntree = new OO.Tree(code,nodes);
		this.list.push(ntree);

		return ntree;
	}
	
	
	

	this.update= function(){
		
	}
	
	this.remove= function(){
		
		
	}
	
	this.move_tree = function(){
		
		
		
	}
	
	this.align_nodes = function (node_list){

		var last_x = 0; 
		var last_y = 0;	
		var last_width = 0; 
		
		var padding = 10
		
		var total_width;
		
		for(var n in node_list){
			
			var cn = node_list[n]; 

			if(n == 0 ){

				last_x = cn.x; 
				last_y = cn.y;
				last_width = cn.width;

			}else{
				
				cn.y = last_y;
				
				cn.x = (last_width)+last_x+padding;
				
				last_x = cn.x; 
				
				last_width = cn.width;
			
			}
			
			total_width+=cn.x;
			
		}	

		return total_width;
		
	}
	
	this.fit_to_camera = function(t){
		
		
		
	}
	
	this.arange_psd_node = function(t){
		
		var reads = t.reads
		
		var group = t.group;
		
		var width = this.align_nodes(reads);
		
		var top_peg = group.addNode("PEG",t.code+"-P")
		
		t.set_top_peg(top_peg);
		
		var final_comp = group.addNode("COMPOSITE",t.code+"-C");
		
		//linkInNode(nodeToLink, ownPort, destPort, createPorts){bool}

		top_peg.linkInNode(group.multiportIn);
		
		final_comp.linkOutNode(group.multiportOut);
		
		final_comp.attributes.composite_mode.setValue("Pass Through");
		
		
		
		var z_factor = 0.001;
		
		for(var r = reads.length-1 ; r >= 0 ; r--){
			
			var cr = reads[r]; 
			
			var npeg = group.addNode("PEG",cr.name+"-P",new $.oPoint(cr.x,cr.y-40,0))
			
			//linkOutNode(nodeToLink, ownPort, destPort, createPorts){bool}
			
			
			top_peg.linkOutNode(npeg);
			
			cr.linkOutNode(final_comp);
			
			var Z = (reads.length-r)*z_factor;
			
			npeg.linkOutNode(cr);
			
			cr.attributes.can_animate.setValue("N");
			
			cr.attributes.use_drawing_pivot.setValue("Apply Embedded Pivot on Parent Peg");
			

			npeg.attributes.position.separate.setValue("On");
			
			npeg.attributes.position.z.setValue(Z);
			
			
			t.add_node(npeg);
			

		}
		

		
		top_peg.centerAbove(reads, 0, -200)
		
		group.multiportIn.centerAbove(reads, 0, -500);
		
		final_comp.centerBelow(reads, 0, 200);
		
		group.multiportOut.centerBelow(reads, 0, 500);
		
		t.add_node(top_peg);
		
		t.add_node(final_comp);
		
		group.addBackdropToNodes( t.get_nodes(), t.code, "", new $.oColorValue("#5097D8ff"), 0, 0, 20, 20);
		
	}
	
	// on : oNode
	
	this.add_layout_peg = function(on){
		
		var group = on.parent;
		
		var npeg = group.addNode("PEG",on.name+"-P",new $.oPoint(on.x,on.y-40,0))
			
		npeg.linkOutNode(on);			
		
	}
	
	
	
	this.fit_to_camera = function(tree,cadre){
		
		var top_peg = tree.top_peg;
		
		var w= 1920; 
		
		var h = 1080; 
		
		var cw = cadre.width; 
		
		var ch = cadre.height
		
		var cx = cadre.x; 
		
		var cy = cadre.y
		
		var finalx = 0;
		var finaly = 0;
		var finalsxy = 0;
		var finalsx = 0;
		var finalsy = 0;
		
		MessageLog.trace(Object.getOwnPropertyNames(top_peg.attributes));
		
		//for(var p in Object.getOwnPropertyNames(top_peg.attributes)){ MessageLog.trace(Object.getOwnPropertyNames(top_peg.attributes)[p]);
		
		top_peg.attributes.position.x.setValue(finalx);
		top_peg.attributes.position.y.setValue(finaly);
		//top_peg.attributes.scale.xy.setValue(finalsxy);
		top_peg.attributes.scale.y.setValue(finalsy);
		top_peg.attributes.scale.x.setValue(finalsx);
		
		
	}
  	
  
  
}