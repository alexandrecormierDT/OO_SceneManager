// CLASS OO_TreeManager

////MessageLog.trace("CLASS OO_TreeManager")


/*

TREE AND NODES SHOULD BE HANDLE IN A CLEANER WAY 
it's not clear how to fin the nodes related to the tree. 
when they chang group for exemple 
the nodes shoul be a simple array of nodes not a GroupeNode object 
the trees should have a node_map. 


*/

OO.TreeManager = function(_S){
	
	var S = _S;
	
	this.list = [];
	

	
	this.load = function(){
		
	}
	
	this.generate_id = function(){
		
		return new Date().getUTCMilliseconds();
		
	}
	
	this.add = function(code,nodes){
		
		var ntree = new OO.Tree(code,nodes);
		
		this.list.push(ntree);

		return ntree;
		
	}
	
	this.mark_node_id = function(_node,_id){
			
		_node.createAttribute("node_id", "string", "NID", false);
	
		_node.attributes.tree_id.setValue(_id);				
		
	}	
	
	this.mark_treeid = function(_node,_id){
			
		_node.createAttribute("tree_id", "string", "TID", false);
	
		_node.attributes.tree_id.setValue(_id);				
		
	}	
		

	this.update= function(){
		
	}
	
	this.remove= function(){
		
		
	}


	//IMPORTING TPL 
	
	this.import_tpl= function(_path){
		
		var import_group =  OO.doc.root.addGroup(_path, false, false); 

		import_group.importTemplate(_path,false,true);
		
		return import_group.nodes; 

	}	
	
	this.import_tpl_grouped = function(_code,_path){
		
		//we create a group with a the path of the tpl as name. 
		var import_group =  OO.doc.root.addGroup(_path, false, false); 
		
		var nodes = import_group.importTemplate(_path,false,true);
		
		this.add_layout_peg(import_group);	
		
		return nodes; 

	}
	
	this.import_tpl_in_group = function(_code,_path,_group){
		
		var nodes = _group.importTemplate(_path,false,true);
		
		this.add_layout_peg(import_group);	
		
		return nodes; 

	}
	
	this.import_psd_grouped = function(_code,_path){
		
		var import_group =  OO.doc.root.addGroup(_code, false, false);  
		
		import_group.createAttribute("import_path", "string", "path", true)
		
		//importPSD(path, separateLayers, addPeg, addComposite, alignment, nodePosition){Array.<$.oNode>}
		var nodes = import_group.importPSD(_path,true,false,false,"ASIS");  

		return nodes; 		
		
	}
	
	this.import_psd_in_group = function(_code,_path,_group){
		
		////MessageLog.trace("PSD GROUP");
		var psd_gp= CELIO.getLayerGroupInformation(_path);
		////MessageLog.trace(Object.getOwnPropertyNames(psd_gp));
		////MessageLog.trace(Object.getOwnPropertyNames(psd_gp.groups));
		
		for(var i = 0 ; i < psd_gp.groups.length ; i++){
			var curgp = psd_gp.groups[i];
			////MessageLog.trace(curgp);
			if(typeof(curgp) == "object"){
				
				////MessageLog.trace(Object.getOwnPropertyNames(curgp));
				////MessageLog.trace(curgp.name);
				
			}
		}

		var nodes = _group.importPSD(_path,true,false,false,"ASIS");  

		return nodes; 		
		
	}	
	
	//FUNCTION TO MAKE THE NODEVIEW PRETTY 
	
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
	
	this.add_tree_id_to_node = function (onode,id){
		
		onode.createAttribute("tree_id", type, displayName, linkable);
		
	}
	
	
	
	
	//
	//
	//
	//
	//	
	//	B G   T R E A T M E N T
	//	
	//	
	//
	//
	//
	//
	//

	this.arange_psd_node = function(t){
		
		////MessageLog.trace("ARRANGE PSD NODES");
		
		var reads = t.reads
		
		var group = t.get_parent_group();
		
		var width = this.align_nodes(reads);
		
		var top_peg = group.addNode("PEG",t.code+"-P")
		
		t.set_top_peg(top_peg);
		
		var final_comp = group.addNode("COMPOSITE",t.code+"-C");
		
		t.set_final_comp(final_comp); 
		
		t.add_node(top_peg);
		
		t.add_node(final_comp);
		
		//linkInNode(nodeToLink, ownPort, destPort, createPorts){bool}

		group.multiportIn.linkOutNode(top_peg,0,0,true);

		final_comp.linkOutNode(group.multiportOut,0,0,true);
		
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
		

		top_peg.centerAbove(reads, 0, -200);
		
		group.multiportIn.centerAbove(reads, 0, -500);
		
		final_comp.centerBelow(reads, 0, 200);
		
		group.multiportOut.centerBelow(reads, 0, 500);

		
		group.addBackdropToNodes( t.get_nodes(), t.code, "", new $.oColorValue("#5097D8ff"), 0, 0, 20, 20);
		
	}
	
	this.put_next_to = function(tree1,tree2,padding){
		
		var W = tree1.get_width(); 
		
		var X = tree1.get_X()+padding+W; 
		
		var Y = tree1.get_Y(); 
		
		tree2.moveTo(X,Y);
		
	}
	
	// on : oNode
	
	this.add_layout_peg = function(on){
		
		var group = on.parent;
		
		var npeg = group.addNode("PEG",on.name+"-P",new $.oPoint(on.x,on.y-40,0))
			
		npeg.linkOutNode(on);			
		
	}
	
	
	// CAMERA AND BG OPERATIONS
	
	
	//the size of the camera in bg is 10% bigger 

	
	this.scale_to_camera = function(top_peg){
		
		var SECU_W = 2111.99;
		
		var SECU_H = 1188;			
	
		var cam_w= 1920;
		
		var cam_h =1080;	

		var ratio = cam_w /SECU_W; 
		
		//INJECT SX
		top_peg.attributes.scale.x.setValue(ratio);
		
		//INJECT SY
		top_peg.attributes.scale.y.setValue(ratio);		
		
	}
	
	//Apply transformation to a BG TREE top_peg WITH CADRE COORDONATES (see load_cadre in scenemanager) 
	
	this.fit_cadre_to_camera = function(top_peg,cadre){
		
		var EVIL_RATIO = parseFloat(4/3)

		
		// camera dimmentions :
	
		var cam_w= 1920;
		
		var cam_h =1080;
		

		
		// cadre dimmentions :
		
		var cad_w = cadre.rect.width
		
		var cad_h = cadre.rect.height


		// scale ratio between cadre and camera

		var ratio = parseFloat(cam_w / cad_w);
		
		var ratio_y = parseFloat(cam_h / cad_h);		
		

		
		// coords of the center of the full bg in camera scale
		
				
		var bg_w = cadre.bg.width 
		
		var bg_h = cadre.bg.height
		
		// we divide by ratio to get the bg space. 
		
		var bg_cx = parseFloat((bg_w/2)) ;
		
		var bg_cy = parseFloat((bg_h/2));
		



		
		var cad_x = parseFloat(cadre.rect.x) 
		
		var cad_y = parseFloat(cadre.rect.y) 		

		
		// camera center 
		
		var cam_cx = parseFloat(cam_w/2) ;
		
		var cam_cy = parseFloat(cam_h/2) ;
		
		// camera peg coords : (for later)
		
		var campeg_x = 0
		
		var campeg_y = 0
		
		var campeg_sx = 1
		
		var campeg_sy = 1
		


		// position of the top up corner of the camera in bg space 
		
		var bg_cam_x = parseFloat(bg_cx - cam_cx);
		
		var bg_cam_y = parseFloat(bg_cy - cam_cy);
			
		
		// CALCUL OF THE TRANSFORM 
		
		
		// X
		
		var bg_x = (bg_w/2) * ratio; 
		
		var cadre_distance_to_center_x = bg_x - (cad_x * ratio) 
		
		var cadre_distance_to_cam_x =  cadre_distance_to_center_x - (cam_w / 2)
		
		
		// Y
		
		var bg_y = (bg_h/2) * ratio; 
		
		var cadre_distance_to_center_y =  bg_y - (cad_y * ratio);
		
		var cadre_distance_to_cam_y =  cadre_distance_to_center_y - (cam_h / 2)

		
		//FINAL SCALE 
		
		var final_sx = ratio ;
		
		var final_sy = ratio ;
		
		// FINAL POSITIONS
		
	
		
		
		var RATIO_PIXEL_X = parseFloat(16/(1920/2))
		
		var RATIO_PIXEL_Y = parseFloat(12/(1080/2))
		
		

		var final_x =  parseFloat(cadre_distance_to_cam_x * RATIO_PIXEL_X);
		
		var final_y =  parseFloat(-cadre_distance_to_cam_y * RATIO_PIXEL_Y)
		
		
		
		////MessageLog.trace(" ----- FINAL TRANSFORM -------------------------------- ");
		
		
			////MessageLog.trace(final_x);
		
			////MessageLog.trace(final_y);
		
		////MessageLog.trace(" ------------------------------------------------------ ");
		
		
		//INJECT X
		top_peg.attributes.position.x.setValue(final_x);
		
		//INJECT Y
		top_peg.attributes.position.y.setValue(final_y);	
		
		//INJECT SX
		top_peg.attributes.scale.x.setValue(final_sx);
		
		//INJECT SY
		top_peg.attributes.scale.y.setValue(final_sy);

	
		
	}
  	
  
  
}