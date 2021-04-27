// CLASS OO_ASSET

////MessageLog.trace("CLASS OO_ASSET")

OO.SGVersion = function(){
	
	var entity ="shot"; 
	var project_name = "billy"; 
	var shot_name = "";
	var asset_name = "";
	var version_name = "";
	var movie_file_path = "";
	var png_file_path = "";
	var task_name = "";
	var task_status = "";
	
	var movie_upload_bat_file_path = 'P:/pipeline/extra_scripts/python3.x/tbmovieupload/bin/tbmovieupload.bat';
	var png_upload_bat_file_path;
	
	var movie_command = ""; 
	var png_command = ""; 
	
	var upload_repport = ""; 
	
	
	this.set_project_name = function(_sn){
		
		shot_name = _sn
		
	}
	
	this.set_entity  = function(_e){
		
		entity = _e
		
	}	
	
	this.set_shot_name = function(_sn){
		
		shot_name = _sn
		
	}
	this.set_asset_name = function(_sn){
		
		shot_name = _sn
		
	}	
	this.set_version_name = function(_vn){
		
		version_name = _vn
	}	
	
	this.set_png_file_path = function(_pfp){
		
		png_file_path = _pfp
		
	}	
	
	this.set_movie_file_path = function(_mfp){
		
		movie_file_path = _mfp
		
	}		
	
	this.set_task_name = function(_tn){
		
		task_name = _tn
		
	}	
	
	this.set_task_status = function(_ts){
		
		task_status = _ts
		
	}		
	
	function format_movie_upload_command_string(){
		
		movie_command = '"'+movie_upload_bat_file_path+'" -p "'+project_name+'" -a "'+shot_name+'" -f "'+movie_file_path+'"  -n "'+version_name+'" -t "'+task_name+'"  -s  "'+task_status+'" ';
		
	}
	
	function format_png_upload_command_string(){
		
		png_command = '"'+movie_upload_bat_file_path+'" -p "'+project_name+'" -a "'+asset_name+'" -f "'+movie_file_path+'"  -n "'+version_name+'"    -t "'+task_name +'"  -s  "'+task_status+'" ';
	}	
	
	this.upload_movie_as_version = function(){
		
		format_movie_upload_command_string()
		
		MessageLog.clearLog ()
		MessageLog.trace(movie_command)
		
		p1 = new Process2(movie_command);
		MessageLog.trace(p1.launch());
		MessageLog.trace(p1.errorMessage());
		MessageLog.trace(p1);		
		

		//upload_repport = MessageLog.getLog()+"";		
		
	}
	
	this.upload_png_as_version = function(){
		
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
