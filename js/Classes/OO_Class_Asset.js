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
	
		return	get_field_value("code");
	
	}
	
	this.get_id = function(){
	
		return	get_field_value("id");
	
	}	
	
	function get_field_value(_an){
	
		
		if(fields.hasOwnProperty(_an)){
			return fields[_an];
			
		}
		
		
		
		return "noattr"; 
	
	}
	
	this.get_shots = function(){
		
		return	get_field_value("shots");
		
	}
	
	this.get_type = function(){

		return	get_field_value("sg_asset_type");
	
	}
	this.get_sg_asset_type = function(){
		

		return	get_field_value("sg_asset_type");
	
	}
		

	this.get_last_publish = function(){
		
		return	get_field_value("code");
		
	}

}
