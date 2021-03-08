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
	
	this.module_path = "P:/pipeline/script_modules/TreeMap/TreeMap.tpl";
	
	this.load = function(){
		
	}
	
	// CREATE TREE 
	
	this.add = function(_code,_nodes){
		
		var ntree = new OO.Tree(_code,_nodes);
		
		//var script_module = this.add_tree_module(_code,_nodes);
		
		this.list.push(ntree);

		return ntree;
		
	}
	
	this.add_tree_module = function(_code,_nodes){
		
		var first_node = _nodes[0] != undefined ? _nodes[0] : _nodes[0].nodes[0]; 
		
		var parent_group = first_node.parent;
		
		if( parent_group =="Top"){
			parent_group =OO.doc.root;
			
		}
		
		MessageLog.trace(parent_group)
		
		var script_module = this.import_tpl_in_group(_code,this.module_path,parent_group)[0];
		 
		var map_string = this.map_nodes(_nodes);
		
		MessageLog.trace(script_module.name)
		
		script_module.attributes.node_map.setValue(map_string);
		
		script_module.attributes.code.setValue(_code);

		script_module.linkInNode(first_node);
		
		script_module.name = "Tree_"+_code
		
		script_module.centerBelow(_nodes,100,50)
		
		return script_module; 
		
		
	}


	this.map_nodes = function(_nodes,_override){
		
		var override = _override != undefined ? _override : false;
 
		var map_string = "";
		
		for(var s = 0 ; s < _nodes.length ; s++){
			
			var curn = _nodes[s];
			
			MessageLog.trace( curn);
			
			var layer_id = curn.type+"_"+get_unique_id()
			
			// if the node already has an ID we jut read it unless we want to override the id (dangerous) 
			
			if(curn.hasOwnProperty("smlayerid")==false || override == true ){
				
				node.createDynamicAttr(curn, "STRING", "smlayerid", "smlayerid", false)
				
			}else{
				
				layer_id = curn.smlayerid;
			}
			
			node.setTextAttr(curn,"smlayerid",frame.current,layer_id);
			
			var row = curn.name+":"+curn.smlayerid;
			
			if(s==0){
				
				map_string+=row;
				
			}else{
				
				map_string+=",";
				map_string+=row;
				
			}
			
			
		}
		
		function get_unique_id(){
			

			var k = Math.floor(Math.random() * 10000000);
			var m =k.toString();	
				
			return m ;
			
		}
		
		return map_string;
		
	}
	
	
	// READING SCENES
	
	
	this.select_tree_nodes = function(tree){
		
		selectedNodes = tree.get_nodes();
		
	}
	
	this.load_trees_from_scene = function(){
		
		//beware it's only searhcing in root and not in sub groups
		
		var scene_nodes = OO.doc.root.nodes;
		
		var scene_TSM = []
		
		for(var n = 0 ; n < scene_nodes.length ; n++){
			
			var cnode = scene_nodes[n];
			
			if(cnode.type == "SCRIPT_MODULE"){
				
				if(cnode.hasOwnProperty('treemap') == true){
					
					//TREE SCRIPT MODULE
					
					scene_TSM.push(cnode);
					
				};
				
			}
			
		}
		
		for(var sm = 0 ; sm < scene_TSM.length ; sm++){
			
			var cur_script_module = scene_TSM[sm];
		
			// CODE,MAP AND ID
			
			var node_map_string  = OO.filter_string(cur_script_module.node_map);
			
			var code = OO.filter_string(cur_script_module.code);
			
			var treeid = OO.filter_string(cur_script_module.treeid);

			var node_map = this.parse_node_map(node_map_string);
			
			ntree.node_map = node_map;
			
			var tree_nodes = this.get_node_list_from_map(node_map);
			
			var ntree = new OO.Tree(code,tree_nodes);
			
			this.list.push(ntree);

		}		
		
	}
	
	this.get_node_list_from_map = function(node_map){ 
		
		var node_list = []
		
		for(var i = 0 ; i< node_map.length; i++){
			
			var currow = node_map[i];
			
			var search_node = this.find_node_by_smlayerid(currow.id)
			
			if(search_node != false){
				
				node_list.push(search_node);
				
			}
			
		}
		
		return node_list;
		
	}
	
	this.get_node_smlayerid = function(_node){
		
		if(_node.hasOwnProperty('smlayerid')){
		
			return  _node.smlayerid;
			
		}		
		
		return false;
		
	}
	
	this.parse_node_map = function(_node_map){
		
		var splitcoma = _node_map.split(',');
		
		var node_map_array = []; 
		
		for(var i = 0 ; i< splitcoma.length; i++){
			
			var row = splitcoma[i]; 
			
			var splitequal = row.split(":");
			
			var row = {name:splitequal[0],id:splitequal[1]};
			
			node_map_array.push(row);
			
		}
		
		return node_map_array;
		
		
	}
	
	this.find_node_by_smlayerid = function(_smlayerid){
		
		var scene_nodes = OO.doc.root.nodes;
		
		for(var n = 0 ; n < scene_nodes.length ; n++){		
		
			if(this.get_node_smlayerid(curn) == _smlayerid){
				
				return  curn;
			}

		}
		
		return false;
		
	}
	
	
	// EDITING TREES
	
	this.add_node = function(node,tree){
		
		
	}
	
	this.get_tree_module = function(tree){
		
		
		
		
	}
		

	this.update= function(){
		
	}
	
	this.remove= function(){
		
		
	}


	//DIFFERENT IMPORTING TPL METHODS : 
	
	this.import_tpl_ungrouped= function(_path){
		
		S.log.add("importing tpl "+_path,"file")
		
		return OO.doc.root.importTemplate(_path,false,true);

	}	
	
	this.import_tpl= function(_path){
	
		
		S.log.add("importing tpl "+_path,"file")
			
		var import_group =  OO.doc.root.addNode("GROUP",_path); 	
		
		natif_Import_TPL_in_group(_path,import_group.path);

	
		var updated_group = OO.doc.$node(import_group.path)
		
		return updated_group.nodes; 

	}	
	
	function natif_Import_TPL_in_group(path,group){

			var myCopyOptions = copyPaste.getCurrentCreateOptions();
			
			var myPasteOptions = copyPaste.getCurrentPasteOptions();
			
			myPasteOptions.extendScene = false;

			//myCopyOptions.addModelsDir = false;
			
			var myDragObject = copyPaste.copyFromTemplate(path,0,0,myCopyOptions);
			
			MessageLog.trace(myDragObject);
			
			MessageLog.trace(copyPaste.pasteTemplateIntoGroup(path,group,0));	

			selection.clearSelection();
			
			return true; 

	}
	
	function natif_Import_TPL(path){

			var myCopyOptions = copyPaste.getCurrentCreateOptions();
			
			var myPasteOptions = copyPaste.getCurrentPasteOptions();
			
			myPasteOptions.extendScene = false;

			myCopyOptions.addModelsDir = false;
			
			var myDragObject = copyPaste.copyFromTemplate(path,0,0,myCopyOptions);
			
			MessageLog.trace(myDragObject);
			
			copyPaste.pasteNewNodes(myDragObject,"",myPasteOptions);

			selection.clearSelection();

			

			
			return true; 

	}
	
	this.import_tpl_grouped = function(_code,_path){
		
		S.log.add("importing tpl "+_path,"file")
		
		
		//we create a group with a the path of the tpl as name. 
		var import_group =  OO.doc.root.addGroup(_path, false, false); 
		
		var nodes = import_group.importTemplate(_path,false,true);
		
		this.add_layout_peg(import_group);	
		
		return nodes; 

	}
	
	this.import_tpl_in_group = function(_code,_path,_group){
		
		S.log.add("importing tpl "+_path,"file")
		
		
		var nodes = _group.importTemplate(_path,false,true);
		
		return nodes; 

	}
	
	this.import_psd_grouped = function(_code,_path){
		
		S.log.add("importing psd "+_path,"file")
		
		
		var import_group =  OO.doc.root.addGroup(_code, false, false);  
		
		import_group.createAttribute("import_path", "string", "path", true)
		
		//importPSD(path, separateLayers, addPeg, addComposite, alignment, nodePosition){Array.<$.oNode>}
		var nodes = import_group.importPSD(_path,true,false,false,"ASIS");  

		return nodes; 		
		 
	}
	
	this.import_psd_in_group = function(_code,_path,_group){
		
		S.log.add("importing psd "+_path,"file")

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
		
		if(cadre.hasOwnProperty('rect')==true){
			
			MessageLog.trace("FIT TO CAMERA");
			
			MessageLog.trace("CADRE "+cadre);
			
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
			
			
			// camera_peg 
			
			var camera_peg = OO.doc.getNodeByPath("Top/Camera_Peg");
			
			
			
			/*var cam_peg_x = node.getTextAttr(camera_peg,frame.current(),"position.x")
			var cam_peg_y = node.getTextAttr(camera_peg,frame.current(),"position.y")
			var cam_peg_z = node.getTextAttr(camera_peg,frame.current(),"position.z")*/

			
			var column3D = get_linked_3D_columns(camera_peg)
			
			var next_3d_key = get_next_3Dkey(column3D);
			
			
			var cam_peg_x = toonboom_coords_to_float(next_3d_key[0]);
			var cam_peg_y = toonboom_coords_to_float(next_3d_key[1]);
			var cam_peg_z = toonboom_coords_to_float(next_3d_key[2]);		
			
			
			MessageLog.trace("CAMERA PEG")
			MessageLog.trace(cam_peg_x)
			MessageLog.trace(cam_peg_y)
			MessageLog.trace(cam_peg_z)
			

			
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
			
			

			var final_x =  parseFloat(cadre_distance_to_cam_x * RATIO_PIXEL_X) + parseFloat(cam_peg_x);
			
			var final_y =  parseFloat(-cadre_distance_to_cam_y * RATIO_PIXEL_Y)+ parseFloat(cam_peg_y);
			
			var final_z =  parseFloat(cam_peg_z);
			
			
			
			MessageLog.trace(" ----- FIT TO CAMERA -------------------------------- ");
			
				MessageLog.trace("X = "+final_x);
			
				MessageLog.trace("Y = "+final_y);
				
				MessageLog.trace("Z = "+final_z);
			
			MessageLog.trace(" ------------------------------------------------------ ");
			
			
			//INJECT X
			top_peg.attributes.position.x.setValue(final_x);
			
			//INJECT Y
			top_peg.attributes.position.y.setValue(final_y);
			
			//INJECT Y
			top_peg.attributes.position.z.setValue(final_z);
			
			//INJECT SX
			top_peg.attributes.scale.x.setValue(final_sx);
			
			//INJECT SY
			top_peg.attributes.scale.y.setValue(final_sy);
			
			S.log.add("fit to camera X = "+final_x+ "Y = "+final_y+ "Z = "+final_z,"process")
		
		
		}

	
		
	}
	
	function get_linked_3D_columns(_node){
		
		var node_columns = Array();
	
		var attrList = getAttributesNameList (_node);
		
		for (var i=0; i<attrList.length; i++){
			
			var attribute_name = attrList[i]
			
			//MessageLog.trace("*****"+attribute_name);
			
			if(attribute_name == "POSITION.3DPATH"){
			
				var linked_column = node.linkedColumn(_node,attribute_name)
				
				if( linked_column !=""){
					
					MessageLog.trace(attribute_name);

					node_columns = (linked_column);
				}
				
			}

			
		}
		
		return node_columns;
		
		
	}
  	
	function getAttributesNameList (snode){
		
		//MessageLog.trace(arguments.callee.name)
		
		var attrList = node.getAttrList(snode, frame.current(),"");
		var name_list= Array();
		
		for (var i=0; i<attrList.length; i++){	

			var attr = attrList[i];
			var a_name = attr.keyword();
			var sub_attr = attr.getSubAttributes()
			name_list.push(a_name);

			if(sub_attr.length > 0){
				for (var j=0; j<sub_attr.length; j++){	
					attrList.push(sub_attr[j]);
					var sub_attr_name = sub_attr[j].fullKeyword()
					name_list.push(sub_attr_name);
				}
			}
			
		}
		
		//MessageLog.trace(name_list)
		
		return name_list;
		
	} 
 	
	function get_next_3Dkey(_column){
		
		//MessageLog.trace(arguments.callee.name)

		sub_column = 4;
		key = Array();
		s = 1;
		
		for (var f = 0 ; f<=frame.numberOf();f++){
				

				 if(column.isKeyFrame(_column,s,f)){
		
					for (s = s ; s<sub_column;s++){

						key.push(column.getEntry(_column,s,f))

					}
					
					return key;
	
				}
					
		}
		
		return false;

	}
	
	function toonboom_coords_to_float(tbv){
		
		var result = 0
		
		result= tbv.split(" ")[0];
		var letter = tbv.split(" ")[1];
		
		
		
		if(letter == "W" || letter =="B" || letter =="S"){
			
			result = "-"+result;
		}
		
		
		result = parseFloat(result)
		
		//MessageLog.trace(" from "+tbv+"  to   "+result)

		return result
		
	}		 
}

