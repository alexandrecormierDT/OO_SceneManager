// CLASS OO_AssetManager

//MessageLog.trace("CLASS OO_AssetManager")

OO.AssetManager = function(_S){
	
	var S = _S; 
	
	this.list = [];
	
	
	var breakdown = {};
	
	this.add = function(asset_param){
		
		var nAsset = new OO.Asset(asset_param);
		
		this.list.push(nAsset);
		
	}	
	
	this.get_asset_by_code = function(search_code){
		
		for(var a = 0 ; a < this.list.length ; a++){
			
			var cura = this.list[a];
			
			if(cura.get_code() == search_code){
			
				return cura;
				
			}
			
		}
		
		return false;
		
	}

	
}
