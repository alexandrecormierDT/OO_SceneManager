

OO.MCManager = function (){
	
	var mc_list = []
	
	this.fetch_scene_mcs = function(){
		
		 mc_list  = node.getNodes(["MasterController"]);
		
	}
	
	this.fetch_mcs_from_node_list = function(_node_list){
		
		mc_list = []
		
		for(var n = 0 ; n < _node_list.length ; n++){
			var current_node = _node_list[n]
			if(node.type(current_node) == "MasterController"){
				mc_list.push(current_node);
			}
		}	
		
	}
	
	this.hide_all_mcs = function(){
		
		for(var m = 0 ; m < mc_list.length ; m++){
		
			var current_mc = new OO.MasterControler(mc_list[m])
			current_mc.init(); 
			current_mc.hide_controls(); 

		}
		
	}
	
	
	
	this.add_sub_folder_to_mcs = function(_input_mc_list,_sub_folder_name){
		
		for(var m = 0 ; m < mc_list.length ; m++){
		
			var current_mc = new OO.MasterControler(mc_list[m])
			current_mc.init(); 
			current_mc.add_subfolder_to_tbsates_path('ch_billly');
			current_mc.update_node_attributes();

		}		
		
	}
	
	
	
} 