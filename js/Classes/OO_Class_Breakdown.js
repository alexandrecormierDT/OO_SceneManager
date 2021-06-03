OO.Breakdown = function(_S){

	var S = _S; 
	
	this.list = [];

    var input_type ="csv";
    var asset_list =[];
    var shot_list =[];
    var shot_breakdown_csv_path = OO.sg_path+"/csv/Shot.csv";
    var asset_breakdown_csv_path = OO.sg_path+"/csv/Asset.csv";

	// add asset objects to the asset manager broken down in the specified shot

	this.parse_assets_objects_from_shot = function(_shot_code){
		
		var asset_object_array=[];
		S.log.add("[Breakdown] loading asset breakdown for shot "+_shot_code,"info");
		
		switch(input_type){
			case ('rest'):
				//xzfanakyavvH7&uqhmcwueolr
			break;
			case ('csv'):
				S.log.add("[Breakdown] loading breakdown from "+shot_breakdown_csv_path+" ..." ,"process");
                var shot_object = parse_csv_and_find_shot(_shot_code);
                asset_object_array = parse_shot_asset_list(shot_object);
			break;			
		}

        return asset_object_array;

	}

    function parse_csv_and_find_shot(_shot_code){

        var csv_file = new $.oFile(shot_breakdown_csv_path);
        if(csv_file.exists){

            var csv_string = csv_file .read();
            var line_split = csv_string.split("\n");

            for (var l = 1 ; l < line_split.length ; l++){

                // SAMPLE LINE : "1373","ep101_pl001","bg_ep101pl001_bil_ext_m_a1_ranch, pr_noissette_or","billy",
                //               0  1   2      3      4     5                                             6  7
                
                var second_split = line_split[l].split('"');
                if(second_split[3] == _shot_code){

                    //parsing shot line
                    var shot_id = second_split[1];
                    var shot_project = second_split[7];
                    var assets = parse_coma_list_and_remove_spaces(second_split[5]+"");
         
                    //instanciating shot object
                    var shot_object = new OO.Shot(_shot_code); 
                    shot_object.assets =  assets;
                    shot_object.id =  shot_id;
                    shot_object.project =  shot_project;

                    return shot_object;
                }
            }

        }else{
            
            S.log.add("[Breakdown] "+ path+" don't exist","error");
        }
        
    }

    
    function parse_shot_asset_list(_shot_object){

        var asset_object_array =[]
        for (var a = 0 ; a < _shot_object.assets.length ; a++){
            var current_asset = _shot_object.assets[a]; 
            var asset_object = parse_csv_and_find_asset(current_asset)
            asset_object_array.push(asset_object)
        }
        return asset_object_array; 
    }


    function parse_csv_and_find_asset(_asset_code){

        var csv_file = new $.oFile(asset_breakdown_csv_path);
        if(csv_file.exists){

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
	
	this.load_project_assets = function(input_type){
		
		var project_asset_list = [];
		switch(input_type){
			case ('csv'):
				var path = OO.sg_path+"/csv/Asset.csv";
				var csv_file = new $.oFile(path);
				
				if(csv_file.exists){
                    var csv_string = new $.oFile(path).read();
                }
				
		}
        
		this.project_assets = project_asset_list;
		return project_asset_list;
		
	}
	
	this.get_asset_code_string_list = function(){
		
		var asset_code_string_list = [];
		this.load_project_assets('csv'); 
		for(var a = 0 ; a < this.project_assets.length; a++){
			current_asset = this.project_assets[a]; 
			asset_code_string_list.push(current_asset.get_code());
		}		
		return asset_code_string_list
	}
	
}

MessageLog.trace("Class Breakdown");
