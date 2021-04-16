// CLASS OO_TreeManager
// CLASS OO_TreeManager

//////MessageLog.trace("CLASS OO_TreeManager")


/*


TREE AND NODES SHOULD BE HANDLE IN A CLEANER WAY 
it's not clear how to find the nodes related to the tree. 
when they chang group for exemple 
the nodes shoul be a simple array of nodes not a GroupeNode object 
the trees should have a node_map. 


*/

OO.TreeManager = function(_S){
	
	var S = _S;
	
	this.list = [];
	
	this.module_path = "P:/pipeline/script_modules/TreeMap/TreeMap.tpl";
	
	
	// CREATE TREE 
	
	
	//obsolete
	this.add = function(_code,_nodes){
		
		var ntree = new OO.Tree(_code,_nodes);
		
		//var script_module = this.add_tree_module(_code,_nodes);
		
		this.list.push(ntree);

		return ntree;
		
	}
	
	this.add_tree = function(_code,_nodes){
		
		// intance of class Tree , see OO_Clas_Tree.js
		
		var ntree = new OO.Tree(_code,_nodes);
		
		// marking nodes with unique id
		
		var tree_nodes = ntree.get_nodes();
		
	
		this.add_id_to_nodes(tree_nodes)
		
		//for the id to be writen in the xstage 
		
		scene.saveAll();
		
		// FINDING AND SETTING TOP AND BOTTOM NODES
		
		if(tree_nodes.length > 0){
		
			var node_to_link = tree_nodes[0];
			
			var found_top_node = ntree.find_top_node();
			
			if(found_top_node != false){
				
				ntree.set_top_node(found_top_node);
				
				node_to_link = found_top_node;
			}
			
			var found_bottom_node = ntree.find_bottom_node();
			
			if(found_bottom_node != false){
				
				ntree.set_bottom_node(found_bottom_node);
			}		


					
			// parsing node map (list of node with their ids) 
			
			var node_map_string = this.stringify_node_list(tree_nodes);
			
			
			
			// adding linking and setting map module 
			
			var map_module = this.add_map_module(_code,node_to_link);
			
			map_module.name = "TreeMap_"+_code
			
			ntree.set_map_module(map_module);
			
			ntree.update_map_module("code",_code);
			
			ntree.update_map_module("node_list",node_map_string);
			
			ntree.update_map_module("node_count",tree_nodes.length);
				
				
			this.list.push(ntree);
		
		}

		return ntree;			

		
	}	
	
	
	// import the treemap script module from the library and link it to a given node
	// return oNode object

	this.add_map_module = function(_code,_node_to_link){
		
		//MessageLog.trace("TOP NODE");
		
		//MessageLog.trace(_node_to_link)
		
		var script_module = false;

		if(_node_to_link != false){
			
			var parent_group = _node_to_link.parent;
			
			if( parent_group =="Top"){
				
				parent_group =OO.doc.root;
				
			}
			
			//MessageLog.trace(parent_group)
			
			// importing tpl as oNode object
			
			script_module = this.import_tpl_in_group(_code,this.module_path,parent_group)[0];
			
			// module name 
			

			
			// setting attritubes 
			
			script_module.attributes.code.setValue(_code);
			
			// linking node module to the top node

			script_module.linkInNode(_node_to_link);
			
			
			// position of the module : 
			
			script_module.centerBelow(_node_to_link,100,50)
			


		}

		return script_module; 		

		
	}
	
	
	// TREE ID FUNCTIONS :
	
	this.add_id_to_nodes = function(_nodes,_override){
		
		// mark nodes with unique id by adding a dynamic attribute 

		for(var s = 0 ; s < _nodes.length ; s++){
			
			var curn = _nodes[s];
			
			var layer_id = this.add_unique_id_to_onode(curn,_override);

		}
		
		
	}
	
	// create dynamic attribute "smlayerid" and fill it with ID  
	// RETURN ID
	
	this.add_unique_id_to_onode = function(_onode,_override){
		
		
		
		var override = _override != undefined ? _override : false;
			
		var layer_id = _onode.type+"_"+get_unique_id()
		
		// if the node already has an ID we jut read it 
		
		if(_onode.hasOwnProperty("smlayerid")==false){
			
			//adding a dynamic attribute "smlayerid"
			
			node.createDynamicAttr(_onode, "STRING", "smlayerid", "smlayerid", false)
			
			node.setTextAttr(_onode,"smlayerid",frame.current,layer_id);	
			
		}else{
			
			if(override == true){
				
				//unless we want to override the id (dangerous) 
				
				node.setTextAttr(_onode,"smlayerid",frame.current,layer_id);		
			}
			
			layer_id = _onode.smlayerid;
		}
		
			
		return layer_id;
		
		
	}

	function get_unique_id(){
		

		var k = Math.floor(Math.random() * 10000000);
		var m =k.toString();	
			
		return m ;
		
	}


	// TREE MAP 

	this.stringify_node_list = function(_nodes){
		
		var map_string = "";
		
		for(var s = 0 ; s < _nodes.length ; s++){
			
			var curn = _nodes[s];
			
			var layer_id = this.add_unique_id_to_onode(curn);
		
			if(curn.hasOwnProperty("smlayerid")==true){
				
				var row = curn.name+":"+curn.smlayerid;
				
			}
			
			
			if(s==0){
				
				map_string+=row;
				
			}else{
				
				map_string+=",";
				map_string+=row;
				
			}
			
			
		}
		
		S.log.add(map_string,"nodes");
		
		return map_string;		

	}
	

	
	this.parse_node_list = function(_node_list_string){ 
	
		var ID_list = [];
		
		var split_row = _node_list_string.split(","); 
		
		for(var r = 0 ; r < split_row.length; r++){
			
			var current_row = split_row[r];
			
			var split_coma = current_row.split(":"); 
			
			var ID = split_coma[1]
			
			ID_list.push(ID)
			
		}
		
		return ID_list 
		
	}	
	
	
	this.fetch_nodes_by_id = function(_ID_list){
		
		var id_to_find = _ID_list;
		
		var inspected_nodes = this.get_all_nodes();
		
		var found_nodes = []

		for(var n = 0 ; n < inspected_nodes.length ; n ++){
			
			var current_node = OO.doc.getNodeByPath(inspected_nodes[n]);

			if(current_node.hasOwnProperty("smlayerid")){
				
				var found_index = _ID_list.indexOf(current_node.smlayerid) 
			
				if(found_index != -1){
					
					found_nodes.push(current_node);
					
					id_to_find.splice(found_index, 1);
					
					if(id_to_find == 0){
						
						// all nodes where found
						
						return found_nodes;
						
					}
					
				}
				
			}
			
		}
		
		for(var i = 0 ; i <  id_to_find.length ; i ++){
			
			S.log.add(id_to_find[i]+" not found","search result")
			
		}
		
		return found_nodes;
		
	}
	
	
	this.get_node_id = function(_node){
	
		var onode = OO.doc.getNodeByPath(_node); 
		
		if(onode.hasOwnProperty('smlayerdid')){
		
			return onode.smlayerid;
			
		}
		
		return false;
		
	}
	
	// KEY NODES 
	
	this.add_key_node_to_tree = function(_key,_node,_tree){
		
		var node_id = this.get_node_id(_node);
		
		var key_node = {key:_key,node:node_id};
		
		var key_node_list = this.parse_key_node_list(_tree.get_key_notes());
		
		key_node_list.push(key_node);
		
		var key_node_list_string = this.stringify_key_nodes_list(key_node_list);
		
	}
	
	
	
	// READING SCENES
	

	this.find_map_modules_in_nodes = function(_nodes){
		
		var map_module_list = [];
		
		for(var n = 0 ; n < _nodes.length ; n ++){
		
			var current_onode = OO.doc.getNodeByPath(_nodes[n]);
			
			if(current_onode.type == "SCRIPT_MODULE"){
			
				if(current_onode.hasOwnProperty("treemap")){
						
					map_module_list.push(current_onode);
	
				}
				
			}
			
		}
		
		if(map_module_list.length == 0){
		
			return false;
			
		}
		
		return map_module_list; 
		
	}
	
	
	
	
	this.instaciate_tree_with_map_module = function(_map_module){
		
		// read the map_module attribute and instanciate a new tree object with the fetched data. 
		
		var tree_code = _map_module.code;
		
		var tree_id = _map_module.treeid;
		
		var node_list_string = OO.filter_string(_map_module.node_list)

		var id_list = this.parse_node_list(node_list_string);
		
		var tree_nodes = this.fetch_nodes_by_id(id_list);
		
		var ntree = new OO.Tree(tree_code,tree_nodes); 
		
		ntree.set_map_module(_map_module);
		
		return ntree;
		
	}
	
	
	
	this.fetch_trees_from_nodes = function(){
		
		
		
	}
	
	this.get_all_nodes = function(){
	
		var groups_to_analyse = [OO.doc.root]
		
		var node_list = []
		
		for(var g = 0 ; g < groups_to_analyse.length ; g++){
			
			var group_nodes = groups_to_analyse[g].nodes;

			for(var n = 0 ; n < group_nodes.length ; n++){
				
				var current_node = OO.doc.getNodeByPath(group_nodes[n]);
				
				if(current_node.type == "GROUP"){
					
					groups_to_analyse.push(current_node); 
					
				}
				
				node_list.push(current_node);
		
			}	

		}		
		
		return node_list;
		
		
	}
	
	this.get_all_child_nodes = function(){
		
		

	}
	
	
	
	
	
	this.load_trees_from_scene = function(){
		
		var scene_nodes = this.get_all_nodes();
		
		var scene_map_modules = this.find_map_module_in_nodes(scene_nodes);
		
		for(var m = 0 ; m < scene_map_modules.length ; m++){
			
			var cur_map_module = scene_map_modules[m];
				
			var ntree = this.instaciate_tree_with_map_module(cur_map_module);
			
			this.list.push(ntree);

		}		
		
	}
	
	
	
	this.get_node_smlayerid = function(_node){
		
		if(_node.hasOwnProperty('smlayerid')){
		
			return  _node.smlayerid;
			
		}		
		
		return false;
		
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


	this.import_tpl_in_temp_group = function(_tpl_file_path){
		
		// create a group , import the tpl inside of it and return the nodes contained in this group 
	
		S.log.add("importing tpl "+_tpl_file_path,"file");
			
		var import_group =  OO.doc.root.addNode("GROUP","TEMP"+_tpl_file_path); 	
		
		copypaste_tpl_in_group(_tpl_file_path,import_group.path);

		var updated_group = OO.doc.getNodeByPath(import_group.path)
		
		return updated_group.nodes; 

	}	
	
	this.import_tpl_in_group = function(_tpl_file_path,_group_scene_path){
		
		copypaste_tpl_in_group(_tpl_file_path,_group_scene_path);
		
	}
	
	function copypaste_tpl_in_group(tpl_file_path,group_scene_path){
		
		MessageLog.trace("natif_Import_TPL_in_group");
			
		MessageLog.trace(tpl_file_path);

		var myCopyOptions = copyPaste.getCurrentCreateOptions();
			
		var myPasteOptions = copyPaste.getCurrentPasteOptions();
			
		myPasteOptions.extendScene = false;

		var myDragObject = copyPaste.copyFromTemplate(tpl_file_path,0,0,myCopyOptions);
			
		copyPaste.pasteNewNodes(myDragObject,group_scene_path,myPasteOptions);		
			
		return true; 

	}
	
	
	
	this.import_psd_in_group = function(_code,_path,_group){
		
		S.log.add("importing psd "+_path,"file")

		var nodes = _group.importPSD(_path,true,false,false,"ASIS");  

		return nodes; 		
		
	}	
	
	
	
	this.import_png_in_group = function(_png_path,_group){

		var png_file_object = new $.oFile(_png_path)
		
		if(png_file_object.exists){

			var png_node = OO.doc.getNodeByPath(_group.importImage(_png_path));
			
			
			//shorten the name if it's too long
			if(png_node.name.length > 30){
				
				var new_name = png_node.name.substring(30,-1000)
				
				png_node.name = new_name;
				
			}
			
			node.setLocked(png_node.path, true);
			 
			S.log.add("import png = "+png_node,"process")

			var txt_path = S.context.get_txt_path_from_png_path(_png_path); 

			if(txt_path != false){
				
				var txt_resolution_object = S.context.get_resolution_object_from_txt(txt_path); 
				// we scale back the png to the pixel size 
				
				//billy project param ? 
				var final_sy = txt_resolution_object.height/1080;
				
				var final_sx = final_sy;
				
				//INJECT SX
				png_node.attributes.scale.x.setValue(final_sx);
				
				//INJECT SY
				png_node.attributes.scale.y.setValue(final_sy);	
				
			}
			
			//png_node
			
			// extend exposure. 
			
			this.extend_exposition_to_scene_length(png_node);
			
			return png_node;
			
		}else{
		
			return false;
			
		}
							
	}
	
	// TO DO ! 
	
	this.extend_exposition_to_scene_length= function(_onode){
		
		//MessageLog.trace("extend_exposition_to_scene_length");
		
		var scene_length = scene.getStopFrame()+1
 
		var dnode = OO.doc.getNodeByPath(_onode);
		
		var drawingAttribute = dnode.attributes.drawing.element
		
		for(var f = 0 ; f < scene_length ; f++){

			drawingAttribute.setValue ("1", f);   
			
		}
		
	}
	
	
	
	
	
	// E X P O R T    T P L 
	

	
	this.export_group_to_path = function(_group,_path,_tpl_name){
		
		
		S.log.add("exporting tpl to "+_path,"file")
		
		var tpl_name = ""; 
		var tpl_name = ""; 
		
		selection.addNodeToSelection(_group)
		
		copyPaste.createTemplateFromSelection(_tpl_name,_path)	
		
		//MessageLog.trace("exporting "+_group.nodes)
		//MessageLog.trace(" to "+_path)
		
		//var exportProcess = $.scene.exportTemplate(_group,_path); // "createPalette" value will create one palette for all colors

		//return exportProcess; 		
		
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
	//	                  B G   T R E A T M E N T
	//	
	//	
	

	

	this.arange_psd_node = function(_tree){
		
		//////MessageLog.trace("ARRANGE PSD NODES");
		
		var reads = _tree.get_reads();
		
		var group = _tree.get_parent_group();
		
		var width = this.align_nodes(reads);
		
		var top_peg = group.addNode("PEG",_tree.get_code()+"-P")
		
		_tree.set_key_node("top_peg",top_peg);
		
		var final_comp = group.addNode("COMPOSITE",_tree.get_code()+"-C");
		
		_tree.set_key_node("final_comp",final_comp); 
		
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
			var Z = (reads.length-r)*z_factor;
			
			npeg.linkOutNode(cr);
			
			cr.attributes.can_animate.setValue("N");
			
			cr.attributes.use_drawing_pivot.setValue("Apply Embedded Pivot on Parent Peg");
			

			npeg.attributes.position.separate.setValue("On");
			
			npeg.attributes.position.z.setValue(Z);
			
			_tree.add_node(npeg);
			

		}
		

		top_peg.centerAbove(reads, 0, -200);
		
		group.multiportIn.centerAbove(reads, 0, -500);
		
		final_comp.centerBelow(reads, 0, 200);
		
		group.multiportOut.centerBelow(reads, 0, 500);

		
		//group.addBackdropToNodes( _tree.get_nodes(), _tree.get_code(), "", new $.oColorValue("#5097D8ff"), 0, 0, 20, 20);
		
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
			
			//MessageLog.trace("FIT TO CAMERA");
			
			//MessageLog.trace("CADRE "+cadre);
			
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


			
			var column3D = get_linked_3D_columns(camera_peg)
			
			var next_3d_key = get_next_3Dkey(column3D);
			
			// if the camera has no key the coords are probably at 0 but it's not 100% sure.. need to check this. 
			
			var cam_peg_x = 0;
			var cam_peg_y = 0;
			var cam_peg_z = 0;
			
			if(next_3d_key != false){
				
				cam_peg_x = toonboom_coords_to_float(next_3d_key[0]);
				cam_peg_y = toonboom_coords_to_float(next_3d_key[1]);
				cam_peg_z = toonboom_coords_to_float(next_3d_key[2]);	
				
			}else{
				
				//MessageLog.trace("reseting camera");
				
				S.log.add("reseting camera coords","warning");
				
				//we actualy put the camera coords to 0 if there is no camera moves
				
				node.setTextAttr("Top/Camera_Peg","POSITION.SEPARATE",frame.current(),"On");
			
				//INJECT X
				camera_peg.attributes.position.x.setValue(0);
				
				//INJECT Y
				camera_peg.attributes.position.y.setValue(0);
				
				//INJECT Y
				camera_peg.attributes.position.z.setValue(0);		
				
				
			}

			
			// camera center 
			
			var cam_cx = parseFloat(cam_w/2) ;
			
			var cam_cy = parseFloat(cam_h/2) ;
			

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
			
			S.log.add("fit to camera - reading camera peg coords  X = "+cam_peg_x+ " Y = "+cam_peg_y+"  Z = "+cam_peg_z,"process");
			S.log.add("fit to camera - changing bg scale SX = "+final_sx+ " SY = "+final_sy,"process");
			S.log.add("fit to camera - changing bg position X = "+final_x+ " Y = "+final_y+ " Z = "+final_z,"process");
		
		
		}

	
		
	}
	
	function get_linked_3D_columns(_node){
		
		var node_columns = Array();
	
		var attrList = getAttributesNameList (_node);
		
		for (var i=0; i<attrList.length; i++){
			
			var attribute_name = attrList[i]
			
			if(attribute_name == "POSITION.3DPATH"){
			
				var linked_column = node.linkedColumn(_node,attribute_name)
				
				if( linked_column !=""){

					node_columns = (linked_column);
				}
				
			}

			
		}
		
		return node_columns;
		
		
	}
  	
	function getAttributesNameList (snode){
		
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
		
		return name_list;
		
	} 
 	
	function get_next_3Dkey(_column){

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

		return result
		
	}		 
	
	
	this.create_tree_file = function(_filepath){
		
		
		var file_test = new $.oFile(_filepath)
		
		if(file_test.exists == false){
			
			logfile = new PermanentFile(_filepath);
			var stamp = scene.currentScene()+"**************** NEW LOG >>>>"+OO.aujourdhui();

			logfile.open(4);                 // open with write only stream
			logfile.writeLine(stamp);           // write line to file
			logfile.close(); 						
			
		}
		
		this.path = _filepath;
		
	}
	
	
	
	
}

