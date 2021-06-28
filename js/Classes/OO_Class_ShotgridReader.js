OO.ShotgridReader = function(_S){

    var S = _S; 
    var sg_request_bat_file_path = "P:\\projects\\billy\\marc_to_alex\\sg_requests\\sg_request.bat"
    var temp_file_folder_path = "P:\\pipeline\\temp\\sg_request"

    //var project = S.get_current_project();
    var project = "billy"
    
    function format_out_file_path(){
        var random_serial = Math.floor(Math.random()*10000000000)
        var file_name = "sg_request_"+random_serial+".txt";
        var temp_file_path = temp_file_folder_path+"\\"+file_name
        return temp_file_path
    }

    function send_shot_request_and_get_json_object(_shot_code){

        var out_file_path = format_out_file_path()
        var request_command_line = sg_request_bat_file_path+" -p "+project+" -scode "+_shot_code+" -o "+out_file_path
		var request_process = new Process2(request_command_line);
		var launch = request_process.launch();
		S.log.add("[ShotgridReader] "+request_command_line,"arguments")
		if(launch == 0){
			S.log.add("[ShotgridReader] "+launch+" = process succeed","success")
		}else{
			S.log.add("[ShotgridReader] "+launch+" = process failed","error")
		}       
        //sleep(500);
        //MessageLog.trace()
        var file_object = new $.oFile(out_file_path)
        if(file_object.exists){
            var file_content = file_object.read()
            MessageLog.trace("file_content")
            MessageLog.trace(file_content)
            var return_object = JSON.parse(file_content) 
            return return_object[0];
        }else{
            S.log.add(launch+" = process failed","error")
            return false;
        }
    }

    
    this.get_shot= function(_shot_code){
        return send_shot_request_and_get_json_object(_shot_code); 
    }

    this.get_asset_json_for_code = function(_asset_code){
        return send_asset_request_and_get_json_object(_asset_code); 
    }
}


function sleep(milliseconds) {
    var date = Date.now();
    var currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
  
