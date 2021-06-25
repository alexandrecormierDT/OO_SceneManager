OO.ImageFile = function(_image_file_path){

    var image_file_path = _image_file_path;
    //environnement ! 
	var read_image_info_bat = "P:\\pipeline\\alexdev\\"+branch+"\\OO_SceneManager_"+branch+"\\bin\\read_image_infos.bat";
    var dimention_txt_creation_command_string = ""; 


    

	this.get_dimention_object = function(){
        var resolution_object = parse_object_from_created_or_found_dimention_txt()
        return resolution_object;
	}

    function remove_line_breaks(_str){
        var str = _str+"";
        return  str.replace(/(\r\n|\n|\r)/gm, "");
    }

    function parse_object_from_created_or_found_dimention_txt(){
        // we create the file if non exsitant

		var file_test = new $.oFile(remove_line_breaks(image_file_path+".txt"));
        MessageLog.trace("PATH")
        MessageLog.trace(remove_line_breaks(image_file_path+".txt"))
        var file_created = false;

        if( file_test.exists == false){
            file_created = create_image_dimention_txt_for_image_file()
        }

        txt_file_object = new $.oFile(image_file_path+".txt");
        
        if(txt_file_object.exists==true){
            MessageLog.trace("[ImageFile]   reading   "+image_file_path+".txt")
            //we read its content
            var txt_content = txt_file_object.read()
            var resolution_object = parse_dimention_txt_content_to_object(txt_content)
            MessageLog.trace("resolution_object")
            MessageLog.trace(resolution_object.width)
            MessageLog.trace(resolution_object.height)
            return resolution_object;
        }
        return false;
    }




    this.has_dimention_txt_file = function(){

        var file_test = new $.oFile(image_file_path+".txt");
        return file_test.exists

    }

	function create_image_dimention_txt_for_image_file(){

        //create a txt file with image magic  with all the infos about the images
        
        //exemple of commande line : 
		//test "P:pipelinealexdevprotoOO_SceneManager_protoinead_image_infos.bat" "P:/projects/billy/library/boxanim/assets/Character/ch_jack/png/ch_jack.png"
        
		format_dimention_txt_creation_command_string();
		var process_create_txt = new Process2(dimention_txt_creation_command_string);
		var launch = process_create_txt.launch();

        MessageLog.trace("launch")
        MessageLog.trace(launch)

        MessageLog.trace("[ImageFile] creating  "+image_file_path+".txt")

        if(launch==0){
            MessageLog.trace("[ImageFile] success")
            return true
        }else{
            MessageLog.trace("[ImageFile] failed")
            return false;
        }
	}


    function parse_dimention_txt_content_to_object(_content){

        // P:/projects/billy/library/boxanim/assets/Character/ch_jack/png/ch_jack.png PNG 1920x1080 1920x1080+0+0 8-bit sRGB 272985B 0.000u 0:00.023
        // 0                                                                           1     2             3      4     5      6       7     8

        //we parse the dimentions
        var space_split = _content.split(" ");
        var dimentions = space_split[2]+""
        var x_split = dimentions.split("x")

        var obj  = {
            width : parseFloat(x_split[0]),
            height :parseFloat(x_split[1])
        }

        return obj;

    }


	function format_dimention_txt_creation_command_string(_image_file_path){
		
		dimention_txt_creation_command_string = '"'+read_image_info_bat+'" "'+image_file_path+'"';
        MessageLog.trace(dimention_txt_creation_command_string)
		
	}

	
  
}