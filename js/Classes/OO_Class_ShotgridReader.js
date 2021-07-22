OO.ShotgridReader = function(_S){

    var S = _S; 
    var sg_request_bat_file_path = "P:/projects/billy/marc_to_alex/sg_requests/sg_request.bat"
    var temp_file_folder_path = System.getenv("TEMP")

    //var project = S.get_current_project();
    var project = "billy"
    
    function format_out_file_path(_tag){
        var tag = _tag!=undefined ? _tag : "notag"
        var random_serial = new Date().getTime()
        var file_name = "sgrequest_"+tag+"_"+random_serial+".txt";
        var temp_file_path = temp_file_folder_path+"/"+file_name
        return temp_file_path
    }


    function send_shot_request_for_code(_shot_code){
        var out_file_path = format_out_file_path(_shot_code)
        var request_command_line = sg_request_bat_file_path+" -p "+project+" -scode "+_shot_code+" -o "+out_file_path
		var request_process = new Process2(request_command_line);
		var launch = request_process.launch();
		S.log.add("[ShotgridReader] SHOT "+request_command_line,"arguments")
		if(launch == 0){
			S.log.add("[ShotgridReader] SHOT "+launch+" = process succeed","success")
		}else{
			S.log.add("[ShotgridReader] SHOT "+launch+" = process failed","error")
		}       

        var file_object = new $.oFile(out_file_path)
        if(file_object.exists){
            var file_content = file_object.read()
            var return_object = JSON.parse(file_content) 
            return return_object[0];
        }else{
            S.log.add(launch+" = process failed","error")
            return false;
        }
    }

    function send_asset_list_request_for_shot_id(_shot_id){
        var out_file_path = format_out_file_path(_shot_id)
        var request_command_line = sg_request_bat_file_path+" -p "+project+" -sid "+_shot_id+" -f asset_list -o "+out_file_path
		var request_process = new Process2(request_command_line);
		var launch = request_process.launch();
		S.log.add("[ShotgridReader] ASSET "+request_command_line,"arguments")
		if(launch == 0){
			S.log.add("[ShotgridReader] ASSET "+launch+" = process succeed","success")
		}else{
			S.log.add("[ShotgridReader] ASSET "+launch+" = process failed","error")
		}       

        var file_object = new $.oFile(out_file_path)
        if(file_object.exists){
            var file_content = file_object.read()
            var return_object = JSON.parse(file_content) 
            return return_object;
        }else{
            S.log.add(launch+" = process failed","error")
            return false;
        }

    }

    function  send_asset_request_for_id(_asset_id){
        var out_file_path = format_out_file_path(_asset_id)
        var request_command_line = sg_request_bat_file_path+" -p "+project+" -aid "+_asset_id+" -o "+out_file_path
		var request_process = new Process2(request_command_line);
		var launch = request_process.launch();
		S.log.add("[ShotgridReader] ASSET "+request_command_line,"arguments")
		if(launch == 0){
			S.log.add("[ShotgridReader] ASSET "+launch+" = process succeed","success")
		}else{
			S.log.add("[ShotgridReader] ASSET "+launch+" = process failed","error")
		}       

        var file_object = new $.oFile(out_file_path)
        if(file_object.exists){
            var file_content = file_object.read()
            var return_object = JSON.parse(file_content) 
            return return_object[0];
        }else{
            S.log.add(launch+" = process failed","error")
            return false;
        }
    }

    function  send_asset_request_for_code(_asset_code){
        var out_file_path = format_out_file_path(_asset_code)
        var request_command_line = sg_request_bat_file_path+" -p "+project+" --acode "+_asset_code+" -o "+out_file_path
		var request_process = new Process2(request_command_line);
		var launch = request_process.launch();
		S.log.add("[ShotgridReader] ASSET "+request_command_line,"arguments")
		if(launch == 0){
			S.log.add("[ShotgridReader] ASSET"+launch+" = process succeed","success")
		}else{
			S.log.add("[ShotgridReader] ASSET"+launch+" = process failed","error")
		}       

        var file_object = new $.oFile(out_file_path)
        if(file_object.exists){
            var file_content = file_object.read()
            //MessageLog.trace("file_content")
            //MessageLog.trace(file_content)
            var return_object = JSON.parse(file_content) 
            return return_object[0];
        }else{
            S.log.add(launch+" = process failed","error")
            return false;
        }
    }

    this.get_asset_by_id = function(_asset_id){
        return send_asset_request_for_id(_asset_id); 
    }
    
    this.get_shot_by_code= function(_shot_code){
        return send_shot_request_for_code(_shot_code); 
    }

    this.get_asset_by_code = function(_asset_code){
        return send_asset_request_for_code(_asset_code); 
    }
    this.get_asset_list_by_shot_id = function (_shot_id){
        return send_asset_list_request_for_shot_id(_shot_id); 
    }
}


function sleep(milliseconds) {
    var date = Date.now();
    var currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
  
