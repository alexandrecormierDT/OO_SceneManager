OO.AssetManager = function(_S){
	
	var S = _S; 
	this.list = [];
	this.scene_assets = [];
	this.project_assets = [];
	var breakdown = {};
	
	this.add = function(_asset_object){
		
		this.list.push(_asset_object);
	
	}	
	
	this.get_asset_by_code = function(search_code,_list){
		
		for(var a = 0 ; a < this.list.length ; a++){
			
			var cura = this.list[a];
			if(cura.get_code() == search_code){
			
				return cura;
				
			}
			
		}
		
		return false;
		
	}

	this.get_list = function(){

		return this.list; 

	}
	

}

MessageLog.trace("Class AssetManager");

