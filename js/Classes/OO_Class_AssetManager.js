OO.AssetManager = function(_S){
	
	var S = _S; 

	var asset_object_array = []

	this.detector = new OO.AssetDetector(_S)
	
	this.add = function(_asset_object){
		asset_object_array.push(_asset_object);
	}	

	this.reset_list = function(){
		asset_object_array = []
	}
	
	this.get_asset_object_by_code = function(search_code,_list){
		
		for(var a = 0 ; a < asset_object_array.length ; a++){
			var curent_asset = asset_object_array[a];
			if(curent_asset.get_code() == search_code){
				return curent_asset;
			}
		}
		return false;
	}

	this.get_asset_object_array = function(){
		return asset_object_array; 
	}

	this.set_asset_object_array = function(_array){
		asset_object_array = _array
	}

}
//MessageLog.trace("Class AssetManager");

