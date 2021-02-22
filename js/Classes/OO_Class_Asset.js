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
	
		return attributes.code;
	
	}
	
	this.get_attribute = function(an){
	
		return attributes[an];
	
	}
	
	this.get_type = function(){
	
		return attributes.sg_asset_type;
	
	}
	
	this.get_last_publish = function(){
		
		return attributes.code;
		
	}
	
	this.get_tpl_path= function(){
		
		//return "assets/"+this.get_type()+"/"+this.get_code()+"/master/"+this.get_last_publish()+".tpl";
		return "/assets/"+this.get_type()+"/"+this.get_code()+"/M/"+this.get_last_publish()+".tpl";
		
		
	}
	
	this.get_psd_path = function(){
		
		return "/assets/"+this.get_type()+"/"+this.get_code()+"/psd/"+this.get_last_publish()+".psd";
		
	}
	
	this.get_svg_path = function(){
		
		return "/assets/"+this.get_type()+"/"+this.get_code()+"/psd/"+this.get_last_publish()+".svg";
		
	}	

	
}
