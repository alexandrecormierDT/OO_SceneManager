OO.Asset = function(_asset_code){
	MessageLog.trace("New Object Asset ");
	this.code=_asset_code;
	this.id = 0;
	this.sg_asset_type ="";
	this.shots=[];
	this.project="";

	this.get_code = function(){
		return	this.code;
	}
	this.get_id = function(){
		return	this.id;
	}	
	this.get_shots = function(){
		return	this.shots;
	}
	this.get_type = function(){
		return	this.sg_asset_type;
	}
	this.get_lower_case_type = function(){
		return	this.sg_asset_type.toLowerCase();
	}
	this.get_sg_asset_type = function(){
		return	this.sg_asset_type;
	}
	this.get_last_publish = function(){
		return	this.code;
	}

}

MessageLog.trace("Class Asset");