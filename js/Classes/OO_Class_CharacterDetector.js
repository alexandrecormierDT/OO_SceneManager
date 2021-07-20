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
		// exemple of value : Top/ch_billy/CH_BILLY-G/myselectedlayer
		var return_obj = {
			character:"",
			group:""
		}

		MessageLog.trace("source_layer_path")
		MessageLog.trace(source_layer_path)
 
		var tail = "";
		var character_found = false
		var slash_split =  source_layer_path.split("/"); 

		// we look for the name of the character in the node path

		for(var s= slash_split.length-1 ; s >= 0 ; s--){
			
			var current_split =  slash_split[s]
			var lowercase_split = current_split.toLowerCase(); 
			MessageLog.trace(current_split)
			var underscore_split = lowercase_split.split("_"); 
			var before_underscore = underscore_split[0]

			if(character_found==false){

				if( before_underscore == uppercase_marker || before_underscore == marker){
				
					var six_split = lowercase_split.split("-"); 
	
					//in case the group is named "CH_JC-G" lower case
					if(six_split.length>1 && six_split[1]=="g"){
						return_obj.character =  six_split[0];
					}else{
						return_obj.character =  current_split;
					}
					character_found = true;
					tail= current_split
				}

			}else{
				//rebuilding the path before the character name in reverse
				tail= current_split+"/"+tail
			}
			
		}

		return_obj.group= tail;

		return return_obj; 

	}
	
	
	
	
	this.get_character = function(){
		
		detected_character = find_character_in_source_layer_path();
		return detected_character.character;
		
	}
	
	this.get_character_group = function(){
		
		detected_character = find_character_in_source_layer_path();
		var character_group = detected_character.group
		return character_group;
		
	}
	
}