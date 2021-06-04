OO.ImageFile = function(_image_file_path){

    var image_file_path = _image_file_path;
    //environnement ! 
	var read_image_info_bat = "P:\\pipeline\\alexdev\\proto\\OO_SceneManager_proto\\bin\\read_image_infos.bat";
    var dimention_txt_creation_command_string = ""; 

	this.get_dimention_object = function(){

        // we create the file if non exsitant
		var file_test = new $.oFile(image_file_path+".txt");
        var txt_exists = file_test.exists;
        if(txt_exists == false){
            create_image_dimention_txt_for_image_file()
        }

        //we check again if the file was created
        txt_file_object = new $.oFile(image_file_path+".txt");
        if(file_test.exists){

            MessageLog.trace("reading "+image_file_path+".txt")

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

    this.create_dimention_txt_file = function(){

        create_image_dimention_txt_for_image_file()

    }


	function create_image_dimention_txt_for_image_file(){

        //create a txt file with image magic  with all the infos about the images
        
        //exemple of commande line : 
		//test "P:pipelinealexdevprotoOO_SceneManager_protoinead_image_infos.bat" "P:/projects/billy/library/boxanim/assets/Character/ch_jack/png/ch_jack.png"
        
		format_dimention_txt_creation_command_string();
		var process_create_txt = new Process2(dimention_txt_creation_command_string);
		var launch = process_create_txt.launch();

        MessageLog.trace("txt created")

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