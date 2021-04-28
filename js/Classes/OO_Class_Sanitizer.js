

OO.Sanitizer = function(){
	
	var forbidden_chars = []; 


	this.clean_string_general = function(_str){
	
		return  _str+"";
		
	}
	
	this.clean_string_for_command_line = function(_str){
		
		//removing spaces
		var string = _str+"";
		var clean_str = string.replace(/\s/g,'');	
		return  clean_str;		
		
	}
	
	this.clean_path_slashes = function(_str){
		
		var string = _str+"";
		
		return string.replace(/([^:]\/)\/+/g, "$1");
		
	}

}

		
	
	
  
