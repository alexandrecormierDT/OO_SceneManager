// CLASS OO_ASSET

MessageLog.trace("CLASS OO_ASSET")

OO.Asset = function(_param){

	
	var attributes = {}
	
	var cameras = [];
		
	for (var p in _param){
		
		attributes[p] =  _param[p];
		
	}

	MessageLog.trace("new asset : "+attributes.code)
	
	this.get_code = function(){
	
		return	this.get_attribute("code");
	
	}
	
	this.get_id = function(){
	
		return	this.get_attribute("id");
	
	}	
	
	this.get_attribute = function(an){
		
		MessageLog.trace("get attr "+an)
		MessageLog.trace(attributes[an])
		
		if(attributes.hasOwnProperty(an)){
			return attributes[an];
			
		}
		
		
		
		return "noattr"; 
	
	}
	
	this.get_type = function(){
		

		return	this.get_attribute("sg_asset_type");
	
	}
	

	this.get_last_publish = function(){
		
		return	this.get_attribute("code");
		
	}

}
