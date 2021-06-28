OO.PosingManager = function(_S){

    var S = _S ; 
    this.creator = new OO.PosingCreator(_S)

    this.apply_posing_at_frame = function(_posing_object,_first_frame){

        var posing_tpl = S.tpl.parse_tpl_file_to_tpl_object(_posing_object.get_file_path("tpl"))
        S.tpl.paste_action_tpl_to_frame(posing_tpl,_first_frame)

        _posing_object.set_start_frame(posing_tpl.data.tart_frame)
        _posing_object.set_number_of_frames(posing_tpl.data.number_of_frames)
        for(var index = 0 ; index < posing_tpl.data.number_of_frames; index++){
            _posing_object.apply_rigstate_at_frame(_first_frame+index,index);
        }
    }

    this.fetch_library_posings_for_asset_object = function(_asset_object){
        var posing_object_array = []
        var library_asset_posings_folder_path = S.context.get_dir_path(_asset_object,"posings")
        var folder_obj = new $.oFolder(library_asset_posings_folder_path)
        var sub_folders_array = folder_obj.getFolders();
        for(var f = 0 ; f < sub_folders_array.length ; f++ ){
            var current_folder_obj = sub_folders_array[f]
            if(is_posing_folder(current_folder_obj.path)){
                var nposing =  parse_posing_folder_to_posing_object(current_folder_obj.path,_asset_object)
                posing_object_array.push(nposing)
            }
        }
        return posing_object_array;
    }

    function is_posing_folder(_folder_path){
        // check for "p_"
        return true; 
    }

    this.filter_nodes= function(_node_path_array){
        var types_to_exclude = ["GROUP","MasterController","COLOR_ART","LINE_ART","UNDERLAY","OVERLAY","COMPOSITE","CUTTER","AutoPatchModule","AutoFoldModule"]
        var filtered_array = []
        for(var n = 0 ; n < _node_path_array.length ; n++){
            var current_node_path = _node_path_array[n]
           if(types_to_exclude.indexOf(node.type(current_node_path))==-1){

                filtered_array.push(current_node_path)
            }
        }
        return filtered_array;
    }




    this.export_posing_to_library = function(_posing_object){
        create_posing_files_and_folder_in_library(_posing_object); 
    }

    function parse_posing_folder_to_posing_object (_posing_folder_path,_asset_object){

        var split_path = _posing_folder_path.split("/")
        var posing_name = split_path[split_path.length-1]

        var nposing = new OO.Posing(posing_name)
        nposing.set_folder_path(_posing_folder_path)
        nposing.set_asset_code(_asset_object.get_code())
        nposing.set_group_path("Top/"+_asset_object.get_code())

        //tpl
        var tpl_object = S.tpl.parse_tpl_file_to_tpl_object(nposing.get_file_path("tpl"))
        var number_of_frames = 1
        if(tpl_object !=false){
            number_of_frames = tpl_object.data.number_of_frames
        }

        //rigstate
        for(var f = 0 ; f <  number_of_frames ; f++){
            nposing.parse_rigstate_file_content(f)
        }

        return nposing;
    }


    function create_posing_files_and_folder_in_library(_posing_object) {

        var folder_path =  format_and_create_library_posing_folder_path(_posing_object)
        _posing_object.set_folder_path(folder_path)

        //tpl
        linked_asset = S.breakdown.get_asset_object_by_code(_posing_object.get_asset_code())
        var posing_tpl = S.tpl.parse_posing_object_to_tpl_object(_posing_object,linked_asset)
        S.tpl.create_tpl_file_with_passeport(posing_tpl)

       //rigstate
       for(var index = 0 ; index < _posing_object.get_number_of_frames(); index++){
        var rigstate_string = _posing_object.get_rigstate_string(index);
        var rigstate_file_path = _posing_object.get_file_path("rigstate",index)
        var rigstate_file_object = new PermanentFile(rigstate_file_path);        
        rigstate_file_object.open(4);                
        rigstate_file_object.write(rigstate_string);          
        rigstate_file_object.close();    
       }

        //png
        S.views.export_currentframe_png_to(_posing_object.get_file_path("png"),1)


    }

    function format_and_create_library_posing_folder_path(_posing_object){

        //folder "asset/posings"
        var asset_object = S.breakdown.get_asset_object_by_code(_posing_object.get_asset_code())
        var asset_posings_folder = S.context.get_dir_path(asset_object,'posings')
        var dir_object1 = new $.oFolder(asset_posings_folder);
        dir_object1.create();

        //folder "asset/posings/posing_name"
        var posing_folder = asset_posings_folder+_posing_object.get_name();
        var dir_object2 = new $.oFolder(posing_folder );
        dir_object2.create();

        MessageLog.trace("posing_folder")
        MessageLog.trace(posing_folder)

        return posing_folder
    }
}



function selected_layers_to_nodes(){
    node_list = Array();
    var numSelLayers = Timeline.numLayerSel;
    
    for ( var i = 0; i < numSelLayers; i++ )
    {
        if ( Timeline.selIsNode( i ) ){
            node_list.push(Timeline.selToNode(i));
        }
    }
    return unique_array(node_list);
}

function unique_array(arr){
		
    var unique_array = Array();
    for(var i = 0 ; i<arr.length;i++){
        if(unique_array.indexOf(arr[i])==-1){
            unique_array.push(arr[i]);
        }
    }
    return unique_array;
    
}


