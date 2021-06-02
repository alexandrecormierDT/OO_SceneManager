function scene_save_as_with_task_suffix_to_folder(_ts,_folder_path){

    var saveAsOperation = new OO.SceneSaveAsOperation()
	saveAsOperation.set_suffix(_ts);
	saveAsOperation.set_destination_folder_path(_folder_path);
	saveAsOperation.set_replace_suffix(true);

    MessageBox.information("about to save scene as "+saveAsOperation.get_final_path())

    saveAsOperation.save_as_new_version_with_suffix()
    saveAsOperation.save_as_to_destination_folder()

}

function save_as_scene_for_task(_task_name){

	var S = new OO.SceneManager();	

	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/scene_save_as_scene_for_task.html");

    var episode_name = scene.currentVersionName().split("_")[0];
    var folder_path = "P://projects//billy//pre_shotgun//batch_pool//xstages//saison1//"+_task_name+"//"+episode_name

	S.scene_files.saveasoperation.set_suffix(_task_name);
	S.scene_files.saveasoperation.set_destination_folder_path(folder_path);
	S.scene_files.saveasoperation.set_replace_suffix(true);
    S.scene_files.saveasoperation.save_as_new_version_with_suffix()
    S.scene_files.saveasoperation.save_as_to_destination_folder()

	
	var log_object = S.log;
	
	log_object.set_script_tag("OO_scene_save_as_scene_for_task"); 
	log_object.create_scene_script_log_file_and_folder(); 
	log_object.save_scene_script_log_file(); 

}