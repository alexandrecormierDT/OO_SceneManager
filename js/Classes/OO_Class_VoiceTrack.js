
OO.VoiceTrack = function (_file_path){
	
	
	//SOURCE FILE
	
	var sound_file_path = _file_path+""
	
	//exemple : P:\projects\billy\pre_shotgun\sbp_exports\wave\saison1\ep101\audio_ep101_pl003_1.wave

	

	function extract_file_name_from_path(){
		
		var path_split = sound_file_path.split("/"); 
		var last_split = path_split[path_split.length-1];
		return last_split;		
	}
	
	var file_name = extract_file_name_from_path();



	function extract_shot_code_name_from_file_name(){
		
		var without_extension =  file_name.split(".")[0]
		
		//audio_ep101_pl003_1.wave
		
		var name_split = without_extension.split("_"); 
		
		//audio_ep101_pl003_1
		//  0    1      2    3
		var shot_code = name_split[1]+"_"+name_split[2];
		
		return shot_code;	
		
	}	
	
	var shot_code = extract_shot_code_name_from_file_name()
	
	

	
	function extract_track_number_from_file_name(){
		
		var without_extension =  file_name.split(".")[0]
		
		//audio_ep101_pl003_1.wave
		
		var name_split = without_extension.split("_"); 
		
		//audio_ep101_pl003_1
		//  0    1      2    3
		var track_number = name_split[3];
		
		return track_number;	
	}
		
	var track_number = extract_track_number_from_file_name()
	
	
	var tracknumber_character_correspondance = []
	
	tracknumber_character_correspondance[0] = "ch_billy"
	tracknumber_character_correspondance[1] = "ch_jc"
	tracknumber_character_correspondance[2] = "ch_suzie"
	tracknumber_character_correspondance[3] = "ch_scott"
	tracknumber_character_correspondance[4] = "ch_jack"
	tracknumber_character_correspondance[5] = "ch_billy"
	tracknumber_character_correspondance[6] = "ch_billy"
	tracknumber_character_correspondance[7] = "ch_billy"
	tracknumber_character_correspondance[8] = "ch_billy"
	tracknumber_character_correspondance[9] = "ch_billy"
	tracknumber_character_correspondance[10] = "ch_billy"
	tracknumber_character_correspondance[11] = "ch_billy"
	tracknumber_character_correspondance[12] = "ch_billy"
	tracknumber_character_correspondance[13] = "ch_billy"
	tracknumber_character_correspondance[14] = "ch_billy"
	
	
	function get_character_from_track_number(){
		
		return tracknumber_character_correspondance[track_number]
		
	}
	

	
	var character = get_character_from_track_number();
	
	
	
	
	
	//GETTERS
	
		
	this.get_character = function(){
		
		return character;
	}
	
	this.get_character_uppercase = function(){
		
		return character.toUpperCase();
	}
	
	this.get_shot_code = function(){
		
		return shot_code;
	}
	
	this.get_path = function(){
	
		return sound_file_path; 
		
	}
	
	this.get_file_name = function(){
	
		return sound_file_path; 
		
	}
}