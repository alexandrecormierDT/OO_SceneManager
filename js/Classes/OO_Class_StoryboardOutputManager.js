// CLASS StoryboardOutputManager


OO.StoryboardOutputManager = function (){
	
	var root_folder_path = "";
	var current_episode = ""; 
	var current_shot = ""; 
	var current_season = "saison1";
	var voice_tracks = [];

	// CONTEXT FOR FETCHING
	
	this.set_root_folder_path = function(_root_folder_path){
		root_folder_path = _root_folder_path;
	}
	
	this.set_current_episode = function(_ep){
		current_episode = _ep
	}
	
	this.set_current_shot = function(_shot){
		current_shot = _shot
	}
	
	this.set_current_season = function(_sea){
		current_season = _sea
	}
	
	
	function render_episode_data_folder_path(_data_type){
		
		//P:\projects\billy\pre_shotgun\sbp_exports\wave\saison1\ep101
		var episode_data_folder_path = root_folder_path+_data_type+"/"+current_season+"/"+current_episode+"/"
		return episode_data_folder_path;
		
	}
	

	
	//VOICE TRACKS
	
	this.fetch_current_shot_voice_tracks = function(){
		
		var episode_wave_folder_path = render_episode_data_folder_path('wave');
		MessageLog.trace(episode_wave_folder_path)
		var episode_folder_object = new $.oFolder(episode_wave_folder_path);
		var wave_files = episode_folder_object.getFiles(); 
		
		for(var w = 0 ; w < wave_files.length ; w++){
			
			var current_wave_file_path = wave_files[w];
			var new_voice_track_object = new OO.VoiceTrack(current_wave_file_path);
			voice_tracks.push(new_voice_track_object);
			
			
		}

	}
	
	
	
	this.get_shot_voice_track_by_character_name  = function(_character){
		for(var v = 0 ; v < voice_tracks.length ; v++){
			var current_voice_track  = voice_tracks[v];
			if(current_voice_track.get_character() == _character && current_voice_track.get_shot_code() ==  current_shot){
				return current_voice_track;
			}
		}
	}
	

}