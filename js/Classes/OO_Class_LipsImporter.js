// CLASS AnimaticFilesManager


OO.LipsImporter = function (){
	
	var source_detec_path = "";
	
	var character = "";
	
	var emotion = "";
	
	var episode = "";
	
	var shot = "";
	
	
	
	this.set_source_detec_path = function(_sdp){
		
		source_detec_path = _sdp
	}
	this.set_character = function(_ch){
		
		character = _ch
	}
	this.set_emotion = function(_em){
		
		emotion = _em
	}
	this.set_episode = function(_ep){
		
		episode = _ep
		
	}	
	this.set_shot = function(_sh){
		
		shot = _sh
		
	}	
	
	
	function all_variables_are_filled(){
		
		var empty_arg = 0; 
		
		if(source_detec_path==""){
			empty_arg ++
		}
		if(character==""){
			empty_arg ++
		}	
		if(emotion==""){
			empty_arg ++
		}
		if(episode==""){
			empty_arg ++
		}
		if(shot==""){
			empty_arg ++
		}	

		if(empty_arg > 0){
			
			return false; 
			
		}
		
		return true
	}
	
	
	
	this.import_lips = function (){
		
		if(all_variables_are_filled()){
			
			var character_lowercase = character.toLowerCase()

			var lips_detection = new OO.LipsDetectionManager();
			lips_detection.set_root_folder_path(source_detec_path)
			lips_detection.set_current_episode(episode)
			lips_detection.set_current_shot(shot)
			lips_detection.set_current_character(character_lowercase)
			var character_lipsdetec_txt_content = lips_detection.get_lipsdetection_txt_content()
				
			MessageLog.trace("importing detec");
			MessageLog.trace(character_lipsdetec_txt_content);
			
			if(character_lipsdetec_txt_content != false){

				MessageLog.trace("injecting lips");
					
				var lipsing_object = new OO.Lipsing();
				
				lipsing_object.set_lipsdetec_string(character_lipsdetec_txt_content);
				lipsing_object.parse_frames_and_phonemes_from_lipsdetec_string(); 
				
				var character_group = "Top/"+character;
				
				var head_angle_object = new OO.HeadAngle(); 
				head_angle_object.set_source_group(character_group);
				head_angle_object.fetch_head_layer_path_in_source_group();
				
				for(var f = scene.getStartFrame() ; f < scene.getStopFrame(); f++){
					
					var detected_head_angle = head_angle_object.get_head_angle_at_frame(f);
					
					lipsing_object.set_current_emotion(emotion); 
					lipsing_object.set_current_angle(detected_head_angle); 
					lipsing_object.generate_lips_sub_name_for_frame(f);
					
					var current_sub_name =lipsing_object.get_current_sub_name(); 
					
					MessageLog.trace(current_sub_name);
					
					var lips_injector_object = new OO.LipsInjector(); 
					
					var target_lips_layer = character_group+"/LIPS"; 
					
					lips_injector_object.set_target_layer_path(target_lips_layer); 
					lips_injector_object.set_sub_to_expose(current_sub_name); 
					lips_injector_object.expose_sub_name_in_target_layer_at_frame(f);
					
				}
		
			}
		
		}else{
		
			MessageLog.trace("missing variables");
			
		}
	
	}

	
	
	
}