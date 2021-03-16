// CLASS OO_ASSET

////MessageLog.trace("CLASS OO_ASSET")

OO.Asset = function(_param){

	
	var fields = {}
	
	//code
	//sg_asset_type
	//id
	//shots

		
	for (var p in _param){
		
		fields[p] =  _param[p];
		
	}
	
	this.get_code = function(){
	
		return	this.get_field_value("code");
	
	}
	
	this.get_id = function(){
	
		return	this.get_field_value("id");
	
	}	
	
	this.get_field_value = function(an){
	
		
		if(fields.hasOwnProperty(an)){
			return fields[an];
			
		}
		
		
		
		return "noattr"; 
	
	}
	
	this.get_shots = function(){
		
		return	this.get_field_value("shots");
		
	}
	
	this.get_type = function(){
		

		return	this.get_field_value("sg_asset_type");
	
	}
	

	this.get_last_publish = function(){
		
		return	this.get_field_value("code");
		
	}

}
