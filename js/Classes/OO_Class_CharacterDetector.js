OO.CharacterDetector = function (){
	
	var source_layer_path = ""
	
	var marker = "ch"; 
	
	var uppercase_marker = marker.toUpperCase();
	
	var detected_character = ""; 
	
	var character_group = ""; 
	
	
	this.set_source_layer_path = function(_slp){
		
		source_layer_path = _slp
		
	}
	
	
	
	function find_character_in_source_layer_path(){
		
		// exemple of value : Top/CH_BILLY/myselectedlayer
		
		var slash_split =  source_layer_path.split("/"); 
		
		for(var s= 0 ; s < slash_split.length ; s++){
			
			var current_split = slash_split[s]; 
			
			var underscore_split = current_split.split("_"); 
			
			var before_underscore = underscore_split[0]
			
			if( before_underscore == uppercase_marker){
			
				MessageLog.trace("current_split");
				MessageLog.trace(current_split);
				return current_split; 
			
			}
			
		}
		

		
	}
	
	
	
	
	this.get_character = function(){
		
		detected_character = find_character_in_source_layer_path();
		
		return detected_character;
		
	}
	
	this.get_character_group = function(){
		
		detected_character = find_character_in_source_layer_path();
		
		var before_character = source_layer_path.split(detected_character)[0];
		
		var character_group = before_character+detected_character
		
		return character_group;
		
	}
	
}