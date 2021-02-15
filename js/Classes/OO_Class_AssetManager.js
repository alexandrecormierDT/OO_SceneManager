// CLASS OO_AssetManager

MessageLog.trace("CLASS OO_AssetManager")

OO.AssetManager = function(_S){
	
	var S = _S; 
	
	this.list = [];
	
	
	var breakdown = {};
	
	this.add = function(asset_param){
		
		var nAsset = new OO.Asset(asset_param);
		
		this.list.push(nAsset);
		
	}	

	
}
