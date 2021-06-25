// CLASS OO_Portal


OO.PortalManager = function(_S){
	
	var S = _S;
	
	this.creator = new OO.PortalCreator(S); 
	this.fiter = new OO.PortalFiter(S); 

	var loaded_portal_objects_array = [];

	//array where portals are store by asset id [ID][PORTAL_OBJECT]
	var portal_id_table = []
	
	this.get_list = function(){return loaded_portal_objects_array;}
	this.reset_list= function(){ loaded_portal_objects_array = []; }

	this.add = function(_portal){
		portal_id_table[_portal.get_id()] = _portal;
		loaded_portal_objects_array.push(_portal);
	}
	
	this.load_from_scene = function(){
		var scene_script_module_paths = node.getNodes(["SCRIPT_MODULE"]);
		loaded_portal_objects_array = this.fetch_from_node_list(scene_script_module_paths)
	}

	this.load_from_scene_by_sg_asset_type = function(_sg_asset_type){
		var scene_script_module_paths = node.getNodes(["SCRIPT_MODULE"]);
		loaded_portal_objects_array = this.fetch_portals_from_node_list_by_asset_type(scene_script_module_paths,_sg_asset_type)
	}



	this.fetch_portals_from_node_list_by_asset_type= function(_node_list,_asset_type){

		var fetched_portals = []
		var scene_PSM = fetch_portal_modules_from_list(_node_list)

		for(var sm = 0 ; sm < scene_PSM.length ; sm++){

			var cur_script_module = scene_PSM[sm];
			var type = OO.filter_string(cur_script_module.sg_asset_type);

			if(match_sg_asset_type(type,_asset_type)){

				//building the portal instance from the nodeview
				var tpl_path = OO.filter_string(cur_script_module.tpl_path);
				var psd_path = OO.filter_string(cur_script_module.psd_path);
				var png_path = OO.filter_string(cur_script_module.png_path);
				var svg_path = OO.filter_string(cur_script_module.svg_path);
	
				//old bg portals might not have svg path so we assert them py their psd
				if(svg_path == false || svg_path == ""  || svg_path == "false" ){
					if(psd_path != false || psd_path != ""  || psd_path != "false" ){
						svg_path = S.context.convert_psd_path_to_svg_path(psd_path)
					}
				}
	
				var code = OO.filter_string(cur_script_module.code);
				var id = OO.filter_string(cur_script_module.id);
				
				//PORTAL GROUP
				var linked_group = $.scene.getNodeByPath(cur_script_module.linkedInNodes);
				
				//PORTAL PEG
				var linked_peg =  $.scene.getNodeByPath(linked_group.linkedInNodes);
	
				//TREE
				var ntree = S.trees.add(code,[]);
				
				ntree.set_key_node("PORTAL_GROUP",linked_group);
				ntree.set_key_node("PORTAL_PEG",linked_peg);
				ntree.set_key_node("PORTAL_MODULE",cur_script_module);
	
				//instanciating portal class
				var nportal = new OO.Portal();
				nportal.set_tree(ntree)
				nportal.set_code(code)
				nportal.set_sg_asset_type(type)
				nportal.set_id(id)
				nportal.set_path('tpl',tpl_path)
				nportal.set_path('png',png_path)
				nportal.set_path('psd',psd_path)
				nportal.set_path('svg',svg_path)
	
				fetched_portals.push(nportal);
			}
		}

		MessageLog.trace("load_from_node_list by asset type")
		return  fetched_portals 

	}
	
	this.fetch_portals_from_node_list= function(_node_list){

		var fetched_portals = []
		var scene_PSM = fetch_portal_modules_from_list(_node_list)

		for(var sm = 0 ; sm < scene_PSM.length ; sm++){

			var cur_script_module = scene_PSM[sm];

			var type = OO.filter_string(cur_script_module.sg_asset_type);

				//building the portal instance from the nodeview
				
				var tpl_path = OO.filter_string(cur_script_module.tpl_path);
				var psd_path = OO.filter_string(cur_script_module.psd_path);
				var png_path = OO.filter_string(cur_script_module.png_path);
				var svg_path = OO.filter_string(cur_script_module.svg_path);

				//old bg portals might not have svg path so we assert them py their psd
				if(svg_path == false || svg_path == ""  || svg_path == "false" ){
					if(psd_path != false || psd_path != ""  || psd_path != "false" ){
						svg_path = S.context.convert_psd_path_to_svg_path(psd_path)
					}
				}

				var code = OO.filter_string(cur_script_module.code);
				var id = OO.filter_string(cur_script_module.id);

				//PORTAL GROUP
				var linked_group = $.scene.getNodeByPath(cur_script_module.linkedInNodes);
				
				//PORTAL PEG
				var linked_peg =  $.scene.getNodeByPath(linked_group.linkedInNodes);

				//TREE
				var ntree = S.trees.add(code,[]);
				
				ntree.set_key_node("PORTAL_GROUP",linked_group);
				ntree.set_key_node("PORTAL_PEG",linked_peg);
				ntree.set_key_node("PORTAL_MODULE",cur_script_module);

				//instanciating portal class
				var nportal = new OO.Portal();
				nportal.set_tree(ntree)
				nportal.set_code(code)
				nportal.set_sg_asset_type(type)
				nportal.set_id(id)
				nportal.set_path('tpl',tpl_path)
				nportal.set_path('png',png_path)
				nportal.set_path('psd',psd_path)
				nportal.set_path('svg',svg_path)

				fetched_portals.push(nportal);

			}

		MessageLog.trace("load_from_node_list")
		return  fetched_portals

	}

	function fetch_portal_modules_from_list(_node_list){

		var scene_PSM = []
		
		MessageLog.trace("_node_list")
		MessageLog.trace(_node_list)
		for(var n = 0 ; n < _node_list.length ; n++){
			var cnode = $.scene.getNodeByPath(_node_list[n])
			if(cnode!=null){
				if(cnode.type == "SCRIPT_MODULE"){
					if(cnode.attributes.hasOwnProperty('portal') == true){
						scene_PSM.push(cnode);
					};
				}
			}

		}
		MessageLog.trace(scene_PSM)
		return scene_PSM
	}

	this.empty_portal = function (_portal){
		try{
			var portal_tree = _portal.get_tree()
			var portal_group = portal_tree.get_key_node("PORTAL_GROUP");
			S.trees.delete_group_nodes(portal_group.path)

			for(var g= 0 ; g < portal_group.backdrops.length ; g++){
				if(portal_group.backdrops[g] != undefined){	
					portal_group.backdrops[g].x+=2000; 
					portal_group.backdrops[g].width=20;
					portal_group.backdrops[g].height=20;
					portal_group.backdrops[g].title = "deleteme";
					portal_group.backdrops[g].body = "deleteme";				
				}
			}
			S.log.add("portal is now empty","process");

		}catch(error){
			S.log.add_script_error_object(error); 
		}
		return true;
	}


	this.empty_scene_portals_by_type = function(_asset_type){
		this.load_from_scene_by_sg_asset_type(_asset_type)
		for(var p = 0 ; p < loaded_portal_objects_array.length ; p++){
			var current_portal = loaded_portal_objects_array[p];
			this.empty_portal(current_portal);
		}
	}

	//comparing portal ids to see if it's already in the scene
	this.find_portal_by_asset_id= function(_asset_id){
		if(portal_id_table[_asset_id] == undefined){
			return false; 
		}else{
			return portal_id_table[_asset_id]
		}
	}

	this.get_scene_portal_by_asset =  function(_asset){
		for(var p = 0 ; p < loaded_portal_objects_array.length ; p++){
			var current_portal = loaded_portal_objects_array[p]; 
			if(portal_correspond_to_asset(current_portal,_asset)){
				return current_portal;
			}
		}
		return false; 
	}
	
	function portal_correspond_to_asset(_portal,_asset){
		var match = 0; 
		if(_portal.get_code() == _asset.get_code() ){
			match++;
		}
		if(_portal.get_sg_asset_type() == _asset.get_type()){
			match++;
		}
		if( match == 2){
			
			return true
		}
		return false;
		
	}
	
	function match_sg_asset_type(_input_type,_compare_type){
		
		var anim_equivalent = ["FX","Character","Prop","Vehicle"];
		

		input_type = remove_spaces(_input_type)
		compare_type = remove_spaces(_compare_type)

		if(compare_type=="bg"){
			compare_type = "BG"; 
		}

		if(_input_type=="bg"){
			input_type= "BG"; 
		}

		MessageLog.trace("_input_type")
		MessageLog.trace(input_type)
		MessageLog.trace(compare_type)

		if(input_type == compare_type ){
			return true;
		}

		if(compare_type  == "anim" && anim_equivalent.indexOf(input_type) != -1){
			MessageLog.trace("match")
			return true;
		}

		return false; 
		
	}


	function remove_spaces(str){
        str = str+""
		return str.replace(/\s/g, '');
	}
	

	this.create_single_asset_portal = function(_asset,_point,_composite){

		var current_asset  = _asset; 

		var final_psd_path = S.context.get_asset_data_path(current_asset,'psd');
		var final_svg_path = S.context.get_asset_data_path(current_asset,'svg');
		var final_png_path = S.context.get_asset_data_path(current_asset,'png');
		var final_tpl_path = S.context.get_asset_data_path(current_asset,'tpl');
		var asset_code = current_asset.get_code()
		var asset_type = current_asset.get_type()
		var asset_id = current_asset.get_id()

		
		this.creator.set_id( asset_id  )
		this.creator.set_code( asset_code )
		this.creator.set_sg_asset_type( asset_type )
		this.creator.set_tpl_path( final_tpl_path )
		this.creator.set_psd_path( final_psd_path )
		this.creator.set_png_path( final_png_path )
		this.creator.set_svg_path( final_svg_path )
		this.creator.set_content("empty")
		
		var nportal = this.creator.create_portal(); 
		this.update_script_module_attribute_key(nportal)
		
		if(nportal!=false){
			
			this.add(nportal); 
			var nportal_tree = nportal.get_tree(); 
			nportal_tree.moveTo(_point.x,_point.y);
			nportal_tree.ungroup();
			var ungrouped_portal_group = OO.doc.getNodeByPath("Top/"+nportal.get_code());
				
			if(ungrouped_portal_group != undefined){
				ungrouped_portal_group.linkOutNode(_composite)
			}			
		}

	}



	this.create_asset_portals_from_breakdown_by_type = function(_asset_type){

		var asset_object_array = S.breakdown.get_asset_list();
		MessageLog.trace(asset_object_array)

		for(var a = 0 ; a <asset_object_array.length ; a++){
			
			var current_asset = asset_object_array[a]; 
			MessageLog.trace("CURRENT ASSET")
			MessageLog.trace(current_asset)
			MessageLog.trace(current_asset.get_code())
			MessageLog.trace(current_asset.get_id())
			MessageLog.trace(current_asset.get_type())
			
			var final_psd_path = S.context.get_asset_data_path(current_asset,'psd');
			var final_png_path = S.context.get_asset_data_path(current_asset,'png');
			var final_tpl_path = S.context.get_asset_data_path(current_asset,'tpl');
			var final_svg_path = S.context.get_asset_data_path(current_asset,'svg');
			var asset_code = current_asset.get_code()
			var asset_type = current_asset.get_type()
			var asset_id = current_asset.get_id()

			
			if(asset_type == _asset_type || asset_type == "all_type"){

				this.creator.set_code( asset_code )
				this.creator.set_sg_asset_type( asset_type )
				this.creator.set_id( asset_id )
				this.creator.set_tpl_path( final_tpl_path )
				this.creator.set_psd_path( final_psd_path )
				this.creator.set_png_path( final_png_path )
				this.creator.set_svg_path( final_svg_path )
				var nportal = this.creator.create_portal();
				this.update_script_module_attribute_key(nportal)
			
				if(nportal!=false){
					this.add(nportal);  
				}
			}
		}
	}




	this.place_portals_in_line_and_connect_to_composite= function(_line_start_point,_composite){
		
		if(loaded_portal_objects_array.length > 0){
			
			for(var p = 0 ; p < loaded_portal_objects_array.length; p++){
				
				var cportal = loaded_portal_objects_array[p]
				var cportal_tree = cportal.get_tree(); 
				 
				
				if(p > 0){
					var pportal = loaded_portal_objects_array[p-1];
					S.trees.put_next_to(pportal.get_tree(),cportal.get_tree(),100);
				}else{

					cportal_tree.moveTo(_line_start_point.x,_line_start_point.y);

				}
				
			}
			
			//	ungrouping them 
			
			for(var p = 0 ; p <loaded_portal_objects_array.length; p++){
				
				var cportal = loaded_portal_objects_array[p]
				var cportal_tree = cportal.get_tree(); 
				cportal_tree.ungroup();

				if(typeof(_composite) != undefined ){
					var group = OO.doc.getNodeByPath("Top/"+cportal.get_code());
					if(group != undefined){
						group.linkOutNode(_composite)				
					}
				}
			}
		}		
	}


	this.pull_scene_portal_data_by_sg_asset_type = function(_data_type,_sg_asset_type){

		this.load_from_scene_by_sg_asset_type(_sg_asset_type);
		for(var p = 0 ; p < loaded_portal_objects_array.length ; p++){
			var current_portal = loaded_portal_objects_array[p];
			this.pull(current_portal,_data_type);
		}

	}
		
	
	
	this.pull = function(_portal,_data_type){
		
		var pulled_nodes = []; 

		S.log.add("[PortalManager]","process")
		S.log.add(_portal.get_code(),"portal")
		S.log.add(_data_type,"data_type")

		var pull_attributes_object= {
			last_pull: Math.round(+new Date())+"",
			content:_data_type
		}
		

		try{
		
			if(_portal.path_exist(_data_type) || _data_type =='elements'){

				this.update_script_module_attribute_key(_portal)
				

				switch (_data_type){
					case 'psd': 
						if(this.empty_portal(_portal)==true){
							pulled_nodes = pull_psd(_portal)
							_portal.set_several_script_module_attributes(pull_attributes_object); 
						}
					break;
					case 'png': 
						if(this.empty_portal(_portal)==true){
							pulled_nodes = pull_png(_portal); 
							_portal.set_several_script_module_attributes(pull_attributes_object); 
						};	
					break;			
					case 'tpl':
						if(this.empty_portal(_portal)==true){
							var tpl_id  = pull_tpl(_portal); 
							pull_attributes_object.content = tpl_id;
							_portal.set_several_script_module_attributes(pull_attributes_object); 
						}
					break;
					case 'elements':
						pull_elements(_portal); 
						_portal.set_several_script_module_attributes(pull_attributes_object); 
					break;
				}	
				
				
			}else{
				S.log.add("[PortalManager] data not found for path "+_portal.get_path(_data_type),"error");
			}
		}catch(error){

			S.log.add_script_error_object(error); 
		}
		return pulled_nodes; 
	}



	function pull_png(_portal){

			var portal_tree  = _portal.get_tree();	
			var portal_group = portal_tree.get_key_node("PORTAL_GROUP");
			var portal_sg_asset_type = _portal.get_sg_asset_type()

			final_path = _portal.get_path('png');

			var png_node = S.trees.import_png_in_group(final_path,portal_group);

			if(png_node != false){

				S.log.add("[PortalManager] importing PNG file to nodeview "+final_path,"process")

				//different treatment for bg
				if(portal_sg_asset_type == 'BG' || portal_sg_asset_type == 'bg'){
					S.log.add("[PortalManager] "+portal_sg_asset_type+" detected","process");
					S.log.add("[PortalManager] scaling png node with svg cadre data","process");
					//S.trees.scale_bg_node_to_png_size(png_node.path,final_path)

					S.svg_reader.set_path(_portal.get_path('svg'));
					var shot_cadre = S.svg_reader.get_layout_cadre_for_shot(S.context.get_shot())
					S.trees.scale_bg_node_to_png_size_with_cadre(png_node.path,final_path,shot_cadre)

				}else{
					S.log.add("[PortalManager] scaling png node with dimention txt data ","process");
					S.trees.scale_anim_node_to_png_size(png_node.path,final_path);
				}
				//positionning the node and renaming it 
				png_node.name = _portal.get_code();
				portal_group.multiportIn.linkOutNode(png_node,0,0,true);
				png_node.linkOutNode(portal_group.multiportOut,0,0,true);				
				png_node.centerAbove(portal_group.multiportOut, 0, -100);
			}
			return png_node;	
	}


	function pull_tpl(_portal){

		var portal_tree  = _portal.get_tree();	
		var portal_group = portal_tree.get_key_node("PORTAL_GROUP");

		MessageLog.trace(portal_tree)
		MessageLog.trace("portal_group")
		MessageLog.trace(portal_group)

		final_path = _portal.get_path('tpl') ;

		var tpl = S.tpl.parse_tpl_file_to_tpl_object(final_path)
		var tpl_id = "TPL"

		if(tpl!=false){
			tpl_id = tpl.data.tpl_id 
		}
		
		S.trees.import_tpl_in_group(final_path,portal_group)
		var tpl_group = S.trees.get_first_sub_group_in_group(portal_group); 
		S.log.add("[PortalManager] importing TPL file to nodeview "+final_path,"process")
		
		if(tpl_group != false){
			
			//positionning the nodes 
			portal_group.multiportIn.linkOutNode(tpl_group,0,0,true);
			tpl_group.linkOutNode(portal_group.multiportOut,0,0,true);
			tpl_group.centerAbove(portal_group.multiportOut, 0, -500);
			node.explodeGroup(tpl_group);
		
			S.trees.replace_group_multiports(portal_group.path);
		}

		return tpl_id
	}


	function pull_psd(_portal){
		var portal_tree  = _portal.get_tree();	
		var portal_group = portal_tree.get_key_node("PORTAL_GROUP");
		
		final_path = _portal.get_path('psd'); 
		S.log.add("[PortalManager] importing PSD file to nodeview "+final_path,"process")
					
		//we import the tpl inside the portal's group
		var nodes = S.trees.import_psd_in_group(_portal.get_code(),final_path,portal_group);
		
		// we arange the psd nodes
		var bg_tree = S.trees.add(_portal.get_code(),nodes)
		S.trees.arange_psd_node(bg_tree);

		return nodes
	}	


	function pull_elements(_portal){

		S.elements.copy_bank_to_asset_elements_folders(_portal.get_code()); 

	}	
	
	//********************************** P U S H **************************************//
	
	
	this.push_portal = function(_portal,_data_type){

		var return_obj = {}

		try{
		
			MessageLog.trace("push_portal");
			
			var export_path = _portal.get_path(_data_type);
			var export_folder_path = _portal.get_dir(_data_type);
			var export_folder_object = new $.oFolder(export_folder_path); 
			export_folder_object.create();

			
			this.update_script_module_attribute_key(_portal)
			
			var new_tpl = S.tpl.parse_portal_object_to_tpl_object(_portal)
			return_obj.tpl_id = new_tpl.data.tpl_id
			
			switch (_data_type){
				
				case 'psd': 

				break;
				
				case 'png': 					

					var display = _portal.get_code()+"_version"
					return_obj.png_path = S.views.export_currentframe_png_to(export_path,_portal.get_push_png_scale(),display);

				break;			
				
				case 'tpl':

					S.tpl.create_tpl_file_with_passeport(new_tpl,export_folder_path)
					S.log.add("exporting "+_data_type+" to "+export_path,"process");	

					//updating the portal feilds with the new tpl ID
					_portal.set_several_script_module_attributes({content:new_tpl.data.tpl_id})
					
	
				break;

				case 'elements' : 

					S.elements.copy_asset_elements_folders_to_bank(current_portal.get_code()); 

				break
			}			
		}catch(error){
			S.log.add_script_error_object(error); 
		}

		return return_obj
	}	





	this.delete_portal = function(_portal){

		//deleting nodes
		S.log.add("[PortalManager][delete_portal] "+_portal.get_code(),"process");
		var portal_tree = _portal.get_tree();
		portal_tree.delete_nodes();

		//deleting backdrop
		bd_body = _portal.get_backdrop_body();
		var portal_backdrop = S.backdrops.get_backdrop_by_body(bd_body)
		S.backdrops.delete_backdrop(portal_backdrop)

	}

	this.delete_all_scene_portals = function(){
		this.load_from_scene();
		MessageLog.trace(loaded_portal_objects_array)
		for(var p = 0 ; p < loaded_portal_objects_array.length ; p++){
			var current_portal = loaded_portal_objects_array[p];
			this.delete_portal(current_portal);
		}
	}
	
	this.delete_scene_portals_by_type = function(_asset_type){
		this.load_from_scene_by_sg_asset_type(_asset_type)
		for(var p = 0 ; p < loaded_portal_objects_array.length ; p++){
			var current_portal = loaded_portal_objects_array[p];
			this.delete_portal(current_portal);
		}
	}
	

	function udpate_portal_paths_from_vault(_portal,_new_departement){
	
		var linked_asset = S.breakdown.get_asset_object_by_code(_portal.get_code());
		var new_departement = _new_departement != undefined ? _new_departement : _portal.get_departement();

		this.update_script_module_attribute_key(_portal)

		S.context.set_library_path(OO.library_path);	
		S.context.set_vault_path(OO.vault_path)

		var path_attributes_object = {
			psd_path :S.context.get_asset_data_path(linked_asset,"psd",new_departement),
			png_path :S.context.get_asset_data_path(linked_asset,"png",new_departement),
			tpl_path :S.context.get_asset_data_path(linked_asset,"tpl",new_departement),
			svg_path :S.context.get_asset_data_path(linked_asset,"svg",new_departement),
			id:linked_asset.get_id()
		}
		
		S.log.add("updating ID - ( "+path_attributes_object.id+" ) " ,"process");
		S.log.add("updating PSD path from vault - ( "+path_attributes_object.psd_path+" ) " ,"process");
		S.log.add("updating PNG path from vault - ( "+path_attributes_object.png_path+" ) " ,"process");
		S.log.add("updating SVG path from vault - ( "+path_attributes_object.svg_path+" ) " ,"process");
		S.log.add("updating TPL path - ( "+path_attributes_object.tpl_path+" ) " ,"process");
		
		//udpate 
		_portal.set_several_script_module_attributes(path_attributes_object); 
		
	}


	
	this.update_portals_paths_by_type = function(_asset_type){
		
		try{
			
			this.load_from_scene_by_sg_asset_type(_asset_type);
			for(var p = 0 ; p < loaded_portal_objects_array.length; p++){
				var current_portal = loaded_portal_objects_array[p]
				S.log.add("updating paths of portal - "+current_portal.get_code(),"process");
				udpate_portal_paths_from_vault(current_portal);
			}	
	
		}catch(error){
	
			S.log.add_script_error_object(error); 
		}
	};

	this.change_portals_departement = function(_node_list,_departement){

		try{

			loaded_portal_objects_array = S.portals.fetch_portals_from_node_list($.scene.selectedNodes);

			for(var p = 0 ; p < loaded_portal_objects_array.length; p++){
				var current_portal = loaded_portal_objects_array[p]
				S.log.add("updating paths of portal "+current_portal.get_code()+"with new department "+_departement,"process");

				
				var new_color = S.get_departement_color(_departement);
				var portal_backdrop =current_portal.get_backdrop()
				S.backdrops.change_backdrop_color(portal_backdrop,new_color)

				current_portal.set_departement(_departement)
				portal_backdrop.title= current_portal.get_backdrop_name()

				udpate_portal_paths_from_vault(current_portal,_departement);
			}	
	
		}catch(error){
	
			S.log.add_script_error_object(error); 
		}
	}

	this.update_script_module_attribute_key = function(_portal){

		var portal_tree = _portal.get_tree()
		var module = portal_tree.get_key_node("PORTAL_MODULE");
		var sm_onode = $.scene.getNodeByPath(module.path)

		if(sm_onode.hasOwnProperty("last_pull")==false){

			node.createDynamicAttr(module, "STRING", "last_pull", "last_pull", false)
			node.setTextAttr(module,"last_pull",frame.current,"");	
			
		}
		
		if(sm_onode.hasOwnProperty("content")==false){

			node.createDynamicAttr(module, "STRING", "content", "content", false)
			node.setTextAttr(module,"content",frame.current,"");	
			
		}	
		
		if(sm_onode.hasOwnProperty("departement")==false){

			node.createDynamicAttr(module, "STRING", "departement", "departement", false)
			node.setTextAttr(module,"departement",frame.current,"");	
			
		}	
		if(sm_onode.hasOwnProperty("png_push_scale")==false){

			node.createDynamicAttr(module, "STRING", "png_push_scale", "png_scale", false)
			node.setTextAttr(module,"png_push_scale",frame.current,"1.5");	
			
		}	
		if(sm_onode.hasOwnProperty("png_resolution")==false){

			node.createDynamicAttr(module, "STRING", "png_push_resolution", "png_resolution", false)
			node.setTextAttr(module,"png_push_resolution",frame.current,"1");	
			
		}	
	}

}




MessageLog.trace("CLASS OO_PortalManager")