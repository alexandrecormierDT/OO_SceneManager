

OO.LipsDetectionManager = function (){
	
	var root_folder_path = ""; 
	
	this.generator = new OO.LipsDetectionGenerator(); 
	
	
	this.set_root_folder_path = function(_folder_path){
		
		root_folder_path = _folder_path;
	}
	
	
	
	
	//INPUTS FOR FECTHING 
	
	
	this.set_current_episode = function(_ep){
		
		current_episode = _ep
		
	}
	
	this.set_current_shot = function(_shot){
		
		current_shot = _shot

	}


	this.set_current_season = function(_sea){
		
		current_season = _sea

	}
	
	this.set_current_character = function(_char){
		
		current_season = _char

	}
	
	function render_character_lipsdetection_file_path(){
		
		return root_folder_path+"/"+current_season+"/"+current_episode+"/"+current_shot+"/"+current_shot+"_"+current_character+".txt";
		
	}
	
	
	function render_character_lipsdetection_folder_path(){
		
		return root_folder_path+"/"+current_season+"/"+current_episode+"/"+current_shot+"/";
		
	}	
	
	
	this.create_shot_lipsdetection_folder = function(){
		
		var output_folder_path = render_character_lipsdetection_folder_path();
		
		var output_folder_object = new $.oFolder(output_path);

		//this method already check for existing folder. 
		output_folder_object.create();

		
	}
	
	
	this.generate_lipsdetection_txt_from_wave = function(_wave_path){
		
		var current_output_path = render_character_lipsdetection_file_path();
		
		this.generator.set_output_path(current_output_path);
		
		this.generator.set_source_wave_path(_wave_path);
		
		this.generator.generate_lipsdetection_file();
		
		

	}
	
	this.get_lipsdetection_txt_content_for_character = function(_character){
		
		var lipsdetection_file_path = render_character_lipsdetection_file_path();
		
		var lipsdetection_file_object = new $.oFile(lipsdetection_file_path);
		
		if(lipsdetection_file_object.exists){
		
			var txt_content = lipsdetection_file_object.read();
			
			
			
			return txt_content; 
			
		}
		
		return false;
		
	}
	
	
	
	
}