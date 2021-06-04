/*

 CLASS BREAKDOWN 
 this class reads the shotgun database (currently in form of csv files) and instanciate Shot and Asset classes. 

*/

OO.Breakdown = function(_S){

	var S = _S; 
    var asset_list =[];
    var shot_list =[];

    var input_type ="csv";
    var shot_breakdown_csv_path = OO.sg_path+"/csv/Shot.csv";
    var asset_breakdown_csv_path = OO.sg_path+"/csv/Asset.csv";
    var current_shot = ""; 

	// add asset objects to the asset manager broken down in the specified shot

    this.set_current_shot = function(_cs){
        current_shot = _cs
    }

    this.get_asset_list = function(){

        return asset_list;

    }


    this.load_current_shot_breakdown = function(){

        current_shot_code = S.context.get_shot(); 
        current_shot = parse_shot_csv_and_find_shot(current_shot_code); 
        
        asset_list = parse_asset_code_list(current_shot.asset_code_list);

        MessageLog.trace("current_shot.asset_code_list")
        MessageLog.trace(current_shot.asset_code_list)
        
    }

    
    function parse_asset_code_list(_asset_code_list){
        var asset_object_array =[]
        for (var a = 0 ; a < _asset_code_list.length ; a++){
            var current_asset_code = _asset_code_list[a]; 
            var asset_object = parse_asset_csv_and_find_asset(current_asset_code)
            asset_object_array.push(asset_object)
        }
        return asset_object_array; 
    }

	function parse_assets_objects_from_shot(_shot_code){
		var asset_object_array=[];
		S.log.add("[Breakdown] loading asset breakdown for shot "+_shot_code,"info");
		
		switch(input_type){
			case ('rest'):
				//xzfanakyavvH7&uqhmcwueolr
			break;
			case ('csv'):
				S.log.add("[Breakdown] loading breakdown from "+shot_breakdown_csv_path+" ..." ,"process");
                var shot_object = parse_csv_and_find_shot(_shot_code);
                asset_object_array = parse_asset_code_list(shot_object.asset_code_list);
			break;			
		}
        return asset_object_array;
	}

    function parse_shot_csv_and_find_shot(_shot_code){

        var csv_file = new $.oFile(shot_breakdown_csv_path);

        if(csv_file.exists){

            var csv_string = csv_file.read();
            var line_split = csv_string.split('\n');

            for (var l = 1 ; l < line_split.length ; l++){

                // SAMPLE LINE : "1373","ep101_pl001","bg_ep101pl001_bil_ext_m_a1_ranch, pr_noissette_or","billy",
                //               0  1   2      3      4     5                                             6  7
                
                var second_split = line_split[l].split('"');
                if(second_split[3] == _shot_code){

                    MessageLog.trace(_shot_code)

                    //parsing shot line
                    var shot_id = second_split[1];
                    var shot_project = second_split[7];
                    var assets = parse_coma_list_and_remove_spaces(second_split[5]+"");
         
                    //instanciating shot object
                    var shot_object = new OO.Shot(_shot_code); 
                    shot_object.asset_code_list =  assets;
                    shot_object.id =  shot_id;
                    shot_object.project =  shot_project;

                    return shot_object;
                }

            }

        }else{
            
            S.log.add("[Breakdown] "+ path+" don't exist","error");
        }
        
    }



    function parse_asset_csv_and_find_asset(_asset_code){

        var csv_file = new $.oFile(asset_breakdown_csv_path);
        if(csv_file.exists){

            csv_string = csv_file.read()
            var line_split = csv_string.split("\n");
				
            //loop throught lines
            for (var l = 1 ; l < line_split.length ; l++){

				// SAMPLE LINE : "1656","pr_rocking_chair_billy","Prop","ep102_pl001, ep102_pl002, ep102_pl005, ep102_pl006, ep102_pl007, ep102_pl009, ep102_pl010","billy",
				//              0   1  2         3              4   5  6    7                                                                                      8  9     10
                var second_split = line_split[l].split('"');
                var code = remove_spaces(second_split[3]) 

                if(code == _asset_code){

                    //parsing line
                    var asset_id = remove_spaces(second_split[1]);
                    var sg_asset_type = remove_spaces(second_split[5]);
                    var project  = second_split[9];
                    var shots = parse_coma_list_and_remove_spaces(second_split[7]+"");

                    //instanciating asset object
                    var asset_object = new OO.Asset(_asset_code);
                    asset_object.id = asset_id;
                    asset_object.sg_asset_type  = sg_asset_type;
                    asset_object.project   = project ;
                    asset_object.shots   = shots;

                    return asset_object;

                }
            }
        }
    }



    function parse_asset_csv_to_asset_code_list(){

        var csv_file = new $.oFile(asset_breakdown_csv_path);
        var asset_code_list = []; 

        if(csv_file.exists){

            var line_split = csv_string.split("\n");

            for (var l = 1 ; l < line_split.length ; l++){                                                                          
                var second_split = line_split[l].split('"');
                var code = remove_spaces(second_split[3]) 
                asset_code_list.push(code)
            }
        }

        return asset_code_list
    }
	
	this.get_asset_code_string_list = function(){
		return parse_asset_csv_to_asset_code_list();
	}



    function parse_coma_list_and_remove_spaces(_string){

        //parsing array and removing spaces from items
        var input_array = _string.split(',');
        var clean_array = []

        for(var a = 0 ; a<input_array.length;a++){
            clean_array.push(remove_spaces(input_array[a]))
        }
        return clean_array;
    }

	function remove_spaces(str){
		return str.replace(/\s/g, '');
	}


    this.get_scene_master_asset = function(){

		S.context.set_from_scene_path();
        var asset_code = S.context.get_master_asset_code();
		var scene_master_asset = parse_asset_csv_and_find_asset(asset_code)
		return scene_master_asset;
		
	}


	
}

MessageLog.trace("Class Breakdown");
