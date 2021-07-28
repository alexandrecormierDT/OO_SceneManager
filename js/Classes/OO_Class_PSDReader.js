// CLASS OO_PSD


OO.PSDReader= function (_S){

	var S = _S
	var psd_file_path = "";
	var read_image_info_bat = "P:\\pipeline\\alexdev\\"+FOLDER+"\\OO_SceneManager_"+FOLDER+"\\bin\\read_psd.bat";
	var convert_psd_to_json_bat_file = "P:\\pipeline\\alexdev\\"+FOLDER+"\\OO_SceneManager_"+FOLDER+"\\bin\\convert_psd_to_json.bat"
	var get_psd_meta_description_bat_file = "P:\\pipeline\\alexdev\\"+FOLDER+"\\OO_SceneManager_"+FOLDER+"\\bin\\get_psd_meta_description.bat"
	var layer_objects_table = []
	var character_rest_object_table = []; 

	var cadre_types = ["CameraIn","CameraOut","CharacterTransformed","CharacterRest","Prop"]

	this.set_path =function(_path){
		psd_file_path = _path
	}

	this.get_psd_layer_object_array = function(){
		return parse_layers_object_from_json()
	}

	function get_json_object(){

		//TODO : sometimes the json gives 

		var path = format_json_path()
		json_file_object = new $.oFile(path);
		var file_content = ""; 
	
		if(json_file_object.exists==true){
			file_content = json_file_object.read()
		}else{
			create_json()
			if(json_file_object.exists==true){
				file_content = json_file_object.read()
			}			
		}
		var return_object = false;
		try {
			MessageLog.trace(file_content)
			return_object = JSON.parse(file_content)	
		} catch (error) {
			S.log.add_script_error_object(error); 
			return_object = false;
		}

		return return_object
	}

	function parse_layers_object_from_json(){
		var layer_list_object = get_json_object()
		layer_objects_table = []
		for(var l = 0 ; l < layer_list_object.length ; l++){
			var nlayer = new OO.PSDLayer(layer_list_object[l].layer_name)
			var geometry = parse_object_from_geometry_string(layer_list_object[l].geometry+'')
			//nlayer.type = detect_cadre_type_from_layer_name(layer_list_object[l].layer_name);
			nlayer.x = geometry.x
			nlayer.y = geometry.y
			nlayer.width = geometry.width
			nlayer.height = geometry.height
			layer_objects_table[nlayer.name] = nlayer
			MessageLog.trace("nlayer.name")
			MessageLog.trace(nlayer.name)
		}
		return  layer_objects_table
	}

	function detect_cadre_type_from_layer_name(_layer_name){
		var underscore_split = _layer_name.split("_");
		var type = cadre_types[0]; 
		if(underscore_split[0]=="ch"){
			type = cadre_types[2]; 
		}
		return type; 
	}

	function format_json_path(){
		return psd_file_path+".json"
	}



	function parse_object_from_geometry_string(_str){

		//10927x4316+0+0
		//10927x4316-0+0
		if(_str!=undefined){

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

			MessageLog.trace("obj.x")
			MessageLog.trace(obj.x)
			MessageLog.trace("obj.y")
			MessageLog.trace(obj.y)
			return obj
		}


	}

	function format_convert_command_line(){
		var command_string = convert_psd_to_json_bat_file+' "'+make_path_compatible_for_json(psd_file_path)+'"'; 
		return command_string;
	}

	function create_json(){
		var command_line = format_convert_command_line()
		var conversion_process = new Process2(format_convert_command_line())
		var launch = conversion_process.launch()
		S.log.add(command_line,'arguments')
		
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

	function assert_png_path(){

		return  psd_file_path.split(".")[0]+".png";
	}

	this.get_cadre_object_for_shot_code = function(_shot_code){
		var layer_object = this.get_layer_object_by_name(_shot_code)
		var canvas_layer = this.get_layer_object_by_name("")
		if(layer_object!=false){
			var ncadre = new OO.Cadre(_shot_code)
			ncadre.bg.width =canvas_layer.width
			ncadre.bg.height =canvas_layer.height
			ncadre.rect.width = layer_object.width
			ncadre.rect.height = layer_object.height
			ncadre.rect.x = layer_object.x
			ncadre.rect.y = layer_object.y
			return ncadre
		}
	}




	// META DATA
	this.fetch_character_rest_objects_from_meta_txt  = function(){
		
		var meta_object_array = parse_object_array_from_txt_meta_content()
		for(var m = 0 ; m < meta_object_array.length ; m++){

			//{"id":1613,"ln":"ch_jc","pos":[919,158],"h":1035,"w":484}

			var nCharacterRest = new OO.CharacterRest(meta_object_array[m].ln)
			nCharacterRest.id = meta_object_array[m].id
			nCharacterRest.x = meta_object_array[m].pos[0]
			nCharacterRest.y = meta_object_array[m].pos[1]
			nCharacterRest.width = meta_object_array[m].w
			nCharacterRest.heigth = meta_object_array[m].h
			var key  = nCharacterRest.id
			character_rest_object_table[key] = nCharacterRest 
		}
		MessageLog.trace(character_rest_object_table)

	}

	function calculate_transformation_object(_CharRestObj,_LayerObject){

		MessageLog.trace("_CharRestObj")
		MessageLog.trace(_CharRestObj.width)
		MessageLog.trace(_CharRestObj.x)
		MessageLog.trace(_CharRestObj.y)

		MessageLog.trace("_LayerObject")
		MessageLog.trace(_LayerObject.width)
		MessageLog.trace(_LayerObject.x )
		MessageLog.trace(_LayerObject.y )


		var scale_x = parseFloat(_LayerObject.width) / parseFloat(_CharRestObj.width)
		var distance_x = parseFloat(_LayerObject.x) - parseFloat(_CharRestObj.x)
		var distance_y = parseFloat(_LayerObject.y) - parseFloat(_CharRestObj.y)

		MessageLog.trace("TRANSFORM OBJECT")
		MessageLog.trace(scale_x)
		MessageLog.trace(distance_x )
		MessageLog.trace(distance_y )

		return {
			sx:scale_x,
			dx:distance_x,
			dy:distance_y
		}
	}

	this.get_character_transformation_by_id = function(_asset_id){
		var character_rest_object = character_rest_object_table[_asset_id]
		if(character_rest_object  != undefined){
			var layer_name = character_rest_object.layer_name;
			MessageLog.trace("_______character_rest_object.ln")
			MessageLog.trace(layer_name)
			var layer_object = this.get_layer_object_by_name(layer_name)
			var character_transfrom_object = calculate_transformation_object(character_rest_object,layer_object); 
			return character_transfrom_object
		}else{
			S.log.add('[PSDReader] unable to find character_transformation for asset_id '+_asset_id,'error')
			return false; 
		}	
	}


	function format_txt_meta_path(){
		return psd_file_path+"_meta.txt"
	}

	function parse_object_array_from_txt_meta_content(){
		//'exif:ImageDescription=[{"id":1613,"ln":"ch_jc","pos":[919,158],"h":1035,"w":484},{"id":1611,"ln":"ch_billy","pos":[812,0],"h":1459,"w":698},{"id":1614,"ln":"ch_suzie","pos":[914,215],"h":921,"w":494}]
		var content = get_txt_meta_object_content()
		var equal_split = content.split("=")

		var meta_json_string = equal_split[1]
		var obj_array = []
		try {
			MessageLog.trace("meta_json_string")
			MessageLog.trace(meta_json_string)
			obj_array = JSON.parse(meta_json_string)	
		} catch (error) {
			S.log.add_script_error_object(error); 
			obj_array = false;
		}

		return obj_array; 

	}

	function get_txt_meta_object_content(){

		create_meta_txt()
		var path = format_txt_meta_path()
		json_file_object = new $.oFile(path);
		var file_content = false; 
	
		if(json_file_object.exists==true){
			file_content = json_file_object.read()
		}

		return  file_content;
	}

	function make_path_compatible_for_json(_path){
		var parts = _path.split('/');
   		var output = parts.join('//');
		return output; 

	}

	function parse_object_from_meta_txt_content(_content){
		var ch_array = {};
		//'exif:ImageDescription=[{"id":1613,"ln":"ch_jc","pos":[919,158],"h":1035,"w":484},{"id":1611,"ln":"ch_billy","pos":[812,0],"h":1459,"w":698},{"id":1614,"ln":"ch_suzie","pos":[914,215],"h":921,"w":494}]
		return ch_array
	}

	function create_meta_txt(){
		var command_line = format_meta_command_line()
		var meta_process = new Process2(command_line)
		var launch = meta_process.launch()
		S.log.add('[PSDReader] '+command_line,'arguments')
		
        if(launch==0){
			S.log.add('[PSDReader] process launched','sucess')
            return true

        }else{
			S.log.add('[PSDReader] process failed to launch','error')
            return false;
        }
	}



	function format_meta_command_line(){
		var txt_path  = format_txt_meta_path()
		var command_string = get_psd_meta_description_bat_file+' "'+make_path_compatible_for_json(psd_file_path)+'" "'+make_path_compatible_for_json(txt_path)+'"'; 
		return command_string;
	}



}




OO.PSDLayer = function (_layer_name){
	this.name=_layer_name
	this.width=0
	this.height=0
	this.x=0
	this.y=0
}



OO.CharacterRest = function (_layer_name){
	this.layer_name=_layer_name
	this.width=0
	this.height=0
	this.x=0
	this.y=0
}



