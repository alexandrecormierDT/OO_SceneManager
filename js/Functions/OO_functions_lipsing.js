


/*==================================================================================================================================================================

	AUTOLIPS

==================================================================================================================================================================*/


function autolips_dialog(){
	
	// selection and character detection 

	var snodes = selection.selectedNodes(); 
	
	var first_selected_node = snodes[0];
	
	var character_detector = new OO.CharacterDetector()
	character_detector.set_source_layer_path(first_selected_node)
	var detected_character = character_detector.get_character();
	
	// user input
	
	var d = new Dialog
	d.title = "AUTOLIPS";
	d.width = 100;

	var INPUT_CHARACTER = new ComboBox();
	INPUT_CHARACTER.label = "CHARACTER  : ";
	INPUT_CHARACTER.editable = false;
	INPUT_CHARACTER.itemList = [detected_character,"CH_BILLY","CH_JC","CH_SUZIE","CH_SCOTT","CH_JACK"];
	d.add( INPUT_CHARACTER);
		
	var INPUT_EMOTION = new ComboBox();
	INPUT_EMOTION.label = "EMOTION  : ";
	INPUT_EMOTION.editable = false;
	INPUT_EMOTION.itemList = ["","HAPPY","SAD"];
	d.add(INPUT_EMOTION);	

	if ( d.exec() ){

		
		var selected_character = INPUT_CHARACTER.currentItem;
		var selected_emotion = INPUT_EMOTION.currentItem;	
		
		generate_shot_lipsdetection_for_character(selected_character)
		//scene context (to replace with shotgun real infos) 
		
		var S = new OO.SceneManager();
		S.context = new OO.Context(this,"Shotgun");	
		S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/import_lipsing.html");
		var context_episode = S.context.get_episode();
		var context_shot = S.context.get_shot();
		
		// lips import process
		
		var lips_importer = new OO.LipsImporter()
		lips_importer.set_source_detec_path("P:/projects/billy/detection/")
		lips_importer.set_episode(context_episode)
		lips_importer.set_shot(context_shot)	
		lips_importer.set_character(selected_character)
		lips_importer.set_emotion(selected_emotion)
		
		lips_importer.import_lips();
		
		S.log.add("lips for character "+selected_character+" imported");
		
		
	}
		
}






function generate_shot_lipsdetection_for_character(_character){
	
	var S = new OO.SceneManager();
	
	S.context = new OO.Context(this,"Shotgun");	
	
	var current_shot = S.context.get_shot();
	//var current_episode = S.context.get_episode();
	var current_episode = S.context.get_episode();
	var current_character = _character;
	
	var storyboard_outputs = new OO.StoryboardOutputManager()
	
	storyboard_outputs.set_root_folder_path("P:/projects/billy/pre_shotgun/sbp_exports/");
	storyboard_outputs.set_current_shot(current_shot);
	storyboard_outputs.set_current_episode(current_episode);
	
	
	var lips_detection = new OO.LipsDetectionManager();
	lips_detection.set_root_folder_path("P:/projects/billy/detection/")
	lips_detection.set_current_episode(current_episode)
	lips_detection.set_current_shot(current_shot)
	lips_detection.set_current_character(current_character)
	
	
	storyboard_outputs.fetch_current_shot_voice_tracks();
	var current_voice_track_object = storyboard_outputs.get_shot_voice_track_by_character_name(current_character);
	var source_wave_file = current_voice_track_object.get_path();	
	
	lips_detection.create_shot_lipsdetection_folder()
	lips_detection.generate_lipsdetection_txt_from_wave(source_wave_file);
	
}





