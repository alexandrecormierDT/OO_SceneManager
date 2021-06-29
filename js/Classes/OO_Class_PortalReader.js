OO.PortalReader = function(_S){
	
	var S = _S;

    var scene_portal_objects_array = []; 

    this.fetch_portal_modules_from_list = function(_node_list){

		var scene_PSM = []
		//MessageLog.trace("_node_list")
		//MessageLog.trace(_node_list)
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
		//MessageLog.trace(scene_PSM)
		return scene_PSM
	}


	this.load_from_node_list= function(_node_list){

		this.reset_list()
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

				this.add(nportal);

			}
		
		//MessageLog.trace("load_from_node_list")

	}

    this.compare_scene_portal_with_breakdown = function(){



    }

}

//MessageLog.trace("Class PortalReader");