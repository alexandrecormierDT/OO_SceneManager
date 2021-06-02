// CLASS OO.Sub 

/*
 handle sub files in the tbscene folder


*/

OO.SceneFilesManager = function (_S){
	
	var scene_path = "";
	var S = _S;

	this.elements = new OO.ElementManager();
	this.xstage = new OO.Stage(); 
	this.palettes = "";
	this.saveasoperation = new OO.SceneSaveAsOperation(_S);
	
	this.set_scene_path = function(_scene_path){
		
		scene_path = _scene_path+"";
		this.elements.set_scene_path(scene_path);
		
	}



}


OO.SceneSaveAsOperation = function (_S){

	var S = _S;
	
	var destination_folder_path = ""; 
	var suffix = ""; 
	var scene_destination_folder="";
	var version_name = scene.currentVersionName(); 
	var replace_suffix =false;

	this.set_suffix = function(_s){

		suffix = _s
	}

	this.set_replace_suffix = function(_r){

		replace_suffix = _r;
	}

	this.set_destination_folder_path = function(_fp){

		destination_folder_path = _fp
	}

	function format_scene_destination_folder(){

		scene_destination_folder = destination_folder_path+"\\"+version_name;

	}

	function format_new_version_name(){

		if(replace_suffix){

			//ep104_pl009_animatic_v001-1
			// 0       1     2       3
			var current_version =scene.currentVersionName()
			var split_underscore = current_version .split("_"); 
			var shot_code =  split_underscore[0]+"_"+split_underscore[1];  
			var version =  split_underscore[split_underscore.length-1]
			version_name = shot_code+"_"+suffix+"_"+version;

		}else{

			version_name = scene.currentVersionName()+"_"+suffix;
			
		}

		


	}

	function create_folder_if_not_existant(){

		var dir_object = new $.oFolder(destination_folder_path)
			
		if(dir_object.exists == false){
			
			dir_object.create();
			
		}


	}

	this.get_final_path = function(){

		format_new_version_name();
		format_scene_destination_folder()

		return scene_destination_folder+"\\"+version_name+".xstage"
	}


	this.save_as_new_version_with_suffix = function(){

		

		format_new_version_name()
		var saving = scene.saveAsNewVersion(version_name,true)	

		S.log.add("ssave as new version : "+version_name,"process");
		S.log.add(saving,"return");

	}

	this.save_as_to_destination_folder = function(){

		format_new_version_name();
		create_folder_if_not_existant()
		format_scene_destination_folder()
		var saving = scene.saveAs(scene_destination_folder);

		S.log.add("save scene as : "+scene_destination_folder,"process");
		S.log.add(saving,"return");

	}




}