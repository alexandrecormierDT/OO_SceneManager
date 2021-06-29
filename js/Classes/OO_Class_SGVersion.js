// CLASS OO_ASSET

//////MessageLog.trace("CLASS OO_ASSET")

OO.SGVersion = function(_S){
	
	var S = _S;
	var entity =""; 
	var project_name = "billy"; 
	var shot_name = "";
	var asset_name = "";
	var version_name = "";
	var movie_file_path = "";
	var png_file_path = "";
	var task_name = "";
	var task_status = "";
	
	var movie_upload_bat_file_path = 'P:/pipeline/extra_scripts/python3.x/tbmovieupload/bin/tbmovieupload.bat';
	var render_and_upload_bat_file_path = "P:/pipeline/alexdev/proto/OO_SceneManager_proto/bin/render_and_upload.bat"
	var png_upload_bat_file_path = 'P:/pipeline/extra_scripts/python3.x/pnguploader/bin/pngupload.bat';
	
	var movie_upload_command = ""; 
	var render_and_upload_movie_command = ""; 
	var png_upload_command = ""; 
	
	var upload_repport = ""; 

	this.reset = function(){

		entity =""; 
		project_name = S.get_current_project(); 
		shot_name = "";
		asset_name = "";
		version_name = "";
		movie_file_path = "";
		png_file_path = "";
		task_name = "";
		task_status = "";

	}
	
	
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
		asset_name = _sn
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
		movie_upload_command = '"'+movie_upload_bat_file_path+'" -p "'+project_name+'" -a "'+shot_name+'" -f "'+movie_file_path+'"  -n "'+version_name+'" -t "'+task_name+'"  -s  "'+task_status+'" ';
	}


	function format_render_and_upload_command_string(){
		render_and_upload_movie_command ='"'+render_and_upload_bat_file_path+'" "'+S.get_xstage_path()+'" "'+project_name+'" "'+shot_name+'" "'+movie_file_path+'" "'+version_name+'" "'+task_name+'"  "'+task_status+'" '
	}

	this.render_and_upload_movie_as_version_detached = function(){
	
		S.log.add("render_and_upload_movie_as_version","script")
		format_render_and_upload_command_string();

		//MessageLog.trace(render_and_upload_movie_command)
		S.log.add(render_and_upload_movie_command,"arguments")
		//S.deadline.submit_command_line_job(render_and_upload_movie_command,version_name);

		var process_render_movie = new Process2(render_and_upload_movie_command);
		var launch = process_render_movie.launchAndDetach();
		
		if(launch == 0){
			S.log.add(launch+" = upload succeed","success")
		}else{
			S.log.add(launch+" = upload failed","error")
		}
	}

	this.render_and_upload_movie_as_version_with_deadline = function(){

		S.log.add("render_and_upload_movie_as_version","script")
		format_render_and_upload_command_string();
		//MessageLog.trace(render_and_upload_movie_command)
		S.log.add(render_and_upload_movie_command,"arguments")
		S.deadline.submit_command_line_job(render_and_upload_movie_command,version_name);

	}

	this.render_and_upload_movie_as_version = function(){
		
		S.log.add("render_and_upload_movie_as_version","script")
		format_render_and_upload_command_string();
		//MessageLog.trace(render_and_upload_movie_command)

		S.log.add(render_and_upload_movie_command,"arguments")
		
		var process_render_movie = new Process2(render_and_upload_movie_command);
		var launch = process_render_movie.launch();
		
		if(launch == 0){
			S.log.add(launch+" = upload succeed","success")
		}else{
			S.log.add(launch+" = upload failed","error")
		}

		
	}



	
	this.upload_movie_as_version = function(){
		
		format_movie_upload_command_string()
		
		//MessageLog.clearLog();
		//MessageLog.trace(movie_upload_command)
		var process_movie = new Process2(movie_upload_command);

		//MessageLog.trace(process_movie.launch());
		//MessageLog.trace(process_movie.errorMessage());
		//MessageLog.trace(process_movie);		

		S.log.add("TBMOVIEUPLAOD","start")
		S.log.add(movie_upload_command,"arguments")
		if(launch == 0){
			S.log.add(launch+" = upload succeed","success")
		}else{
			S.log.add(launch+" = upload failed","error")

		}
	}




	
	function format_png_upload_command_string(){
		
		png_upload_command = '"'+png_upload_bat_file_path+'" -p "'+project_name+'" -a "'+asset_name+'" -f "'+png_file_path+'"  -n "'+version_name+'"    -t "'+task_name +'"  -s  "'+task_status+'" ';
	}	

	
	this.upload_png_as_version = function(){
		
		format_png_upload_command_string()

		//MessageLog.trace(png_upload_command);
		
		var process_png = new Process2(png_upload_command);
		var launch = process_png.launchAndDetach();

		//S.deadline.submit_command_line_job(png_upload_command);

		S.log.add(png_upload_command,"arguments")
		if(launch == 0){
			S.log.add(launch+" = upload succeed","success")
		}else{
			S.log.add(launch+" = upload failed","error")

		}
		
	}

	this.upload_png_as_version_with_deadline = function(){
		
		format_png_upload_command_string()
		S.deadline.submit_command_line_job(png_upload_command);
		
	}
	
	this.get_upload_repport = function(){
	
		return upload_repport;
		
	}


}


//MessageLog.trace("Class SGVersion ");
