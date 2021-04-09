

OO.LipsDetectionManager = function (){
	
	var root_folder_path = ""; 
	
	this.generator = new OO.LipsDetectionGenerator(); 
	
	
	this.set_root_folder_path = function(_folder_path){
		
		root_folder_path = _folder_path;
	}
	
	
	var current_episode =""; 
	var current_shot = ""; 
	var current_season = "saison1"; 
	var current_character = "" ;
	
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
		
		current_character = _char

	}
	

	
	function render_character_lipsdetection_folder_path(){
		
		return root_folder_path+"/"+current_season+"/"+current_episode+"/"+current_shot+"/";
		
	}	
	
		
	this.create_shot_lipsdetection_folder = function(){
		
		var output_folder_path = render_character_lipsdetection_folder_path();
		
		var output_folder_object = new $.oFolder(output_folder_path );

		//this method already check for existing folder. 
		output_folder_object.create();

		
	}
	
	function render_character_lipsdetection_txt_path(){
		
		var folder_path = render_character_lipsdetection_folder_path();
		
		return folder_path+"/"+current_shot+"_"+current_character+".txt";
		
	}
	
	
	this.generate_lipsdetection_txt_from_wave = function(_wave_path){
		
		
		var current_output_path = render_character_lipsdetection_txt_path();
		
		MessageLog.trace(current_output_path);
		
		
		this.generator.set_output_path(current_output_path);
		
		this.generator.set_source_wave_path(_wave_path);
		
		this.generator.generate_lipsdetection_txt();

	}
	
	
	
	
	
	this.get_lipsdetection_txt_content = function(){
		
		var lipsdetection_txt_path = render_character_lipsdetection_txt_path();
		
		MessageLog.trace("lipsdetection_txt_path");
		MessageLog.trace(lipsdetection_txt_path);
		
		var txt_file_object = new $.oFile(lipsdetection_txt_path);
		
		if(txt_file_object.exists){
		
			var txt_content = txt_file_object.read();

			return txt_content; 
			
		}
		
		MessageLog.trace(lipsdetection_txt_path+" does not exists");
		
		return false;
		
	}
	
	
	
	
}