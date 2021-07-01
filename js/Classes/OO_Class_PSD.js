// CLASS OO_PSD


OO.PSD = function (_psd_file_path){

	var psd_file_path = _psd_file_path;
	var read_image_info_bat = "P:\\pipeline\\alexdev\\"+FOLDER+"\\OO_SceneManager_"+FOLDER+"\\bin\\read_psd.bat";
	var convert_psd_to_json_bat_file = "P:\\pipeline\\alexdev\\"+FOLDER+"\\OO_SceneManager_"+FOLDER+"\\bin\\convert_psd_to_json.bat"
	var layer_objects_table = []

	this.get_psd_layer_object_array = function(){

		return parse_layers_object_from_json()
	}

	function get_json_object(){
		json_file_object = new $.oFile(format_json_path());
		var file_content = ""; 
		var return_object  = false; 
		if(json_file_object.exists==true){
			file_content = json_file_object.read()
			return_object = JSON.parse(file_content)
		}else{
			if(create_json()){
				file_content = json_file_object.read()
				return_object = JSON.parse(file_content)				
			}
		}
		return return_object
	}

	function parse_layers_object_from_json(){
		var layer_list_object = get_json_object()
		layer_objects_table = []
		for(var l = 0 ; l < layer_list_object.length ; l++){
			MessageLog.trace(layer_list_object[l])
			var nlayer = new OO.PSDLayer(layer_list_object[l].layer_name)
			var geometry = parse_object_from_geometry_string(layer_list_object[l].geometry)
			nlayer.x = geometry.x
			nlayer.y = geometry.y
			nlayer.width = geometry.width
			nlayer.height = geometry.height
			layer_objects_table[nlayer.name] = nlayer
		}
		return  layer_objects_table
	}

	function format_json_path(){
		return psd_file_path+".json"
	}

	function parse_object_from_geometry_string(_str){

		//10927x4316+0+0
		//10927x4316-0+0

		var cutin = 0;
		var cutout = 0; 
		var separators = ["x","-","+"]
		var splits = []
    	var sign = ""
		for(var i = 0 ; i < _str.length ; i++){
			var current_char = _str[i]
			var cutted_string = ""
			if(separators.indexOf(current_char)!=-1){
				cutout = i
				cutted_string= sign+_str.substring(cutin,cutout);
				splits.push(cutted_string);
				cutin=cutout+1;
				if(current_char=="-"){
					sign="-"
				}else{
					sign=""
				}
			}
			if(i==_str.length-1){
				cutout = i+1
				cutted_string= sign+_str.substring(cutin,cutout);
				splits.push(cutted_string);    	
			}
		}

		var obj = {
			width : parseInt(splits[0]),
			height: parseInt(splits[1]),
			x: parseInt(splits[2]),
			y: parseInt(splits[3])
		}


		MessageLog.trace(splits[0])
		MessageLog.trace(splits[1])
		MessageLog.trace(splits[2])
		MessageLog.trace(splits[3])

		return obj
	}

	function format_convert_command_line(){
		var command_string = convert_psd_to_json_bat_file+" "+psd_file_path; 
		return command_string;
	}

	function create_json(){
		var conversion_process = new Process2(format_convert_command_line())
		var launch = conversion_process.launch()
        if(launch==0){
            return true
        }else{
            return false;
        }
	}

	this.get_layer_object_by_name= function(_layer_name){
		parse_layers_object_from_json()
		var layer = layer_objects_table[_layer_name]
		if(layer != undefined){
			return layer;
		}else{
			return false;
		}
	
	}

	this.get_cadre_object_for_shot_code = function(_shot_code){
        var ncadre = new OO.Cadre(_shot_code)
		var layer_object = this.get_layer_object_by_name(_shot_code)
		var png_object = new OO.ImageFile(); 
		if(layer_object!=false){


			return ncadre
		}

	}
}




OO.PSDLayer = function (_layer_name){
	this.name=_layer_name
	this.width=0
	this.height=0
	this.x=0
	this.y=0
}


