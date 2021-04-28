

OO.MCManager = function (){
	
	var mc_list = []
	
	this.fetch_scene_mcs = function(){
		
		 mc_list  = node.getNodes(["MasterController"]);
		
	}
	
	this.hide_all_mcs = function(){

		for(var m = 0 ; m < mc_list.length ; m++){
		
			//var current_mc = new OO.MasterControler(mc_list[m])
			MessageLog.trace("mc_list[m]");
			MessageLog.trace(mc_list[m]);
			node.showControls(mc_list[m],false);	
			
			//current_mc.hide_controls();
			
		}
		
	}
	
} 