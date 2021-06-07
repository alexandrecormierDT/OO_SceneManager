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

    //find a matching asset to complete the data on the asset
    function parse_asset_code_list(_asset_code_list){
        var asset_object_array =[]
        for (var a = 0 ; a < _asset_code_list.length ; a++){
            var current_asset_code = _asset_code_list[a]; 
            var asset_object = parse_asset_csv_and_find_asset(current_asset_code)
            if(asset_object!=false){
                asset_object_array.push(asset_object)
            }
        }
        return asset_object_array; 
    }

    function parse_shot_csv_and_find_shot(_shot_code){

        csv_string = get_shot_csv_content();
        var match = 0; 
        if(csv_string!=false){

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
                    shot_object.id= shot_id;
                    shot_object.project = shot_project;

                    match++;

                    return shot_object;
                }

            }

        }
        if(match ==0){

            S.log.add("[Breakdown] can't find shot ( "+_shot_code+" ) in Shot.csv database ","error")
            return false 

        }
        
    }



    function parse_asset_csv_and_find_asset(_asset_code){

        csv_string = get_asset_csv_content()
        var match = 0;
        if(csv_string!=false){

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
                    var shots = parse_coma_list_and_remove_spaces(second_split[7]);

                    //instanciating asset object
                    var asset_object = new OO.Asset(_asset_code);
                    asset_object.id = asset_id;
                    asset_object.sg_asset_type = sg_asset_type;
                    asset_object.project = project ;
                    asset_object.shots = shots;

                    MessageLog.trace("_______----_______")
                    MessageLog.trace(_asset_code)
                    MessageLog.trace(asset_object.id )
                    MessageLog.trace( asset_object.sg_asset_type)
                    MessageLog.trace(asset_object.project)

                    match++;

                    return asset_object;

                }
            }
        }

        if(match == 0){

            S.log.add("[Breakdown] can't find asset ( "+_asset_code+" ) in Asset.csv database ","error")
            return false 

        }
    }



    function parse_asset_csv_to_asset_code_list(){

        var asset_code_list = []; 

        csv_string = get_asset_csv_content()
        if(csv_string!=false){

            var line_split = csv_string.split("\n");

            for (var l = 1 ; l < line_split.length ; l++){       

                var second_split = line_split[l].split('"');

                var code = remove_spaces(second_split[3]) 

                MessageLog.trace("code")
                MessageLog.trace(code)
                asset_code_list.push(code)
            }
        }

        return asset_code_list
    }
	
	this.get_asset_code_string_list = function(){
		return parse_asset_csv_to_asset_code_list();
	}

    function get_asset_csv_content(){
        var csv_file = new $.oFile(asset_breakdown_csv_path);
        if(csv_file.exists){
            csv_string = csv_file.read();
            return  csv_string

        }else{
            
            S.log.add("[Breakdown] "+ asset_breakdown_csv_path+" don't exist","error");
        }
        return false
    }


    function get_shot_csv_content(){
        var csv_file = new $.oFile(shot_breakdown_csv_path);
        if(csv_file.exists){
            csv_string = csv_file.read();
            return  csv_string;

        }else{
            
            S.log.add("[Breakdown] "+ shot_breakdown_csv_path+" don't exist","error");
        }
        return false
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
        str = str+""
		return str.replace(/\s/g, '');
	}


    this.get_scene_master_asset = function(){

		S.context.set_from_scene_path();
        var asset_code = S.context.get_master_asset_code();
		var scene_master_asset = parse_asset_csv_and_find_asset(asset_code)
		return scene_master_asset;
		
	}

    this.get_shot_id = function(_code){

        var shot_object =  parse_shot_csv_and_find_shot(_code)
        if(shot_object!=false){
         return shot_object.get_id()
        }
        return false

    }

    this.get_asset_id = function(_code){

       var asset_object =  parse_asset_csv_and_find_asset(_code)
       if(asset_object!=false){
        return asset_object.get_id()
       }
       return false
        
    }


	
}

MessageLog.trace("Class Breakdown");
