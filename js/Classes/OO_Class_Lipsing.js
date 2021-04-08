

OO.Lipsing = function (){
	
	var lipsdetec_string = ""; 
	
	var lipsdetec_object = ""; 
	
	var emotion = ""; 
	
	var angle = ""; 
	
	var detected_frames = []
	
	var detected_phonemes = []; 
	
	var current_sub_name =""; 
	
	
	this.set_lipsdetec_string = function(_lds){
		
		lipsdetec_string = _lds
		
	}
	
	
	this.parse_frames_and_phonemes_from_lipsdetec_string = function(){
		
		var line_split =lipsdetec_string.split("\n");
		
		MessageLog.trace(line_split)
		
		for(var l = 0 ; l < line_split.length ; l++){
			
			var current_line = line_split[l]; 
			
			var space_split = current_line.split(" ");
			
			if(space_split.length > 1){
				
				var extracted_frame = remove_linebreak(space_split[0])
				var extracted_phonem = remove_linebreak(space_split[1])
				
				detected_frames.push(extracted_frame);
				detected_phonemes.push(extracted_phonem);				
			}
			
		}
		
		MessageLog.trace(detected_frames)
		MessageLog.trace(detected_phonemes)
		
	}
	
	function remove_linebreak(_string){
		
		var string = _string+"";
		
		
		var without_linebreak = _string.replace(/(\r\n|\n|\r)/gm, "");
		return without_linebreak;
		
	}
	
	function get_phonem_at_frame(_frame){
		
		for(var f = 0 ; f < detected_frames.length ; f++){
			
			current_frame = detected_frames[f]; 
			
			next_frame = detected_frames[f+1]
			
			if(current_frame == _frame ){
				
				return detected_phonemes[f];
					
			}else if(current_frame < _frame && next_frame > _frame){
				
				return detected_phonemes[f];
				
			}
			
		}
		
	}
	
	this.set_current_emotion = function(_em){
		
		current_emotion = _em;
	}
	
	this.set_current_angle = function(_ang){
		
		current_angle = _ang;
	}	
	

	function render_sub_name_with_angle_and_emotion_for_phoneme(_phoneme){
		
		var phoneme_object = new OO.Phoneme(_phoneme); 
		
		var current_billy_phoneme = phoneme_object.get_billy_phoneme();
		
		var sub_complete_name = current_angle+"_"+current_emotion+"_"+current_billy_phoneme;
		
		return sub_complete_name;
			
	}
	
	
	
	this.generate_lips_sub_name_for_frame = function(_given_frame){
		
		var phonem_at_given_frame = get_phonem_at_frame(_given_frame);  
		
		var sub_name = render_sub_name_with_angle_and_emotion_for_phoneme(phonem_at_given_frame);
		
		current_sub_name = sub_name; 
		
	}
	
	
	this.get_current_sub_name = function(){
		
		return current_sub_name;
		
	}
	
	
	
}