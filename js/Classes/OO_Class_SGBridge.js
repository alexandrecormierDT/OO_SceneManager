// CLASS OO_ASSET

////MessageLog.trace("CLASS OO_ASSET")

OO.SGBridge = function(){
	
	var current_version_object = null
	
	var movie_upload_command = "";
	var png_upload_command = "";
	
	this.set_current_version_object = function(_vo){
	
		current_version_object = _vo
		
	}
	

	function format_movie_upload_command_string(){
		
		movie_upload_command = '"'+movie_upload_bat_file_path+'" -p "'+project_name+'" -a "'+shot_name+'" -f "'+movie_file_path+'"  -n "'+version_name+'" -t "'+task_name+'"  -s  "'+task_status+'" ';
		
	}
	
	function format_png_upload_command_string(){
		
		png_command = '"'+movie_upload_bat_file_path+'" -p "'+project_name+'" -a "'+asset_name+'" -f "'+movie_file_path+'"  -n "'+version_name+'"    -t "'+task_name +'"  -s  "'+task_status+'" ';
	}	
	
	this.upload_shot_movie_version = function(_SGversion_object){
		
		format_movie_upload_command_string()
		
		MessageLog.clearLog ()
		MessageLog.trace(movie_command)
		
		p1 = new Process2(movie_command);
		MessageLog.trace(p1.launch());
		MessageLog.trace(p1.errorMessage());
		MessageLog.trace(p1);		
		

		//upload_repport = MessageLog.getLog()+"";		
		
	}
	
	this.upload_asset_png_version = function(_SGversion_object){
		
		format_png_upload_command_string()
		MessageLog.clearLog ()
		
		p1 = new Process2(png_command  );
		MessageLog.trace(p1.launch());
		MessageLog.trace(p1.errorMessage());
		MessageLog.trace(p1);		

		//upload_repport = MessageLog.getLog()+"";
		
	}
	
	this.get_upload_repport = function(){
	
		return upload_repport;
		
	}


}
