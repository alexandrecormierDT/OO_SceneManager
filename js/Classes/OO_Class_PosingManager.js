OO.PosingManager = function(_S){

    var S = _S ; 
    

    this.creator = new OO.PosingCreator(_S)

    this.apply_posing_at_frame = function(_posing_object,_frame){
        _posing_object.apply_rigstate_at_frame(_frame);
    }

    this.fetch_library_posings_for_asset_object = function(_asset_object){
        MessageLog.trace("fetch_library_posings_for_asset_object")
        MessageLog.trace(_asset_object.get_code())
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


    this.export_posing_to_library = function(_posing_object){
        create_posing_files_and_folder_in_library(_posing_object); 
    }


    this.import_posing_to_rig = function(){


    }

    function parse_posing_folder_to_posing_object (_posing_folder_path,_asset_object){

        var split_path = _posing_folder_path.split("/")
        var posing_name = split_path[split_path.length-1]

        var nposing = new OO.Posing(posing_name)
        nposing.set_folder_path(_posing_folder_path)
        nposing.set_root_group_path("Top/"+_asset_object.get_code())
        nposing.set_asset_code(_asset_object.get_code())

        return nposing;

    }


    function create_posing_files_and_folder_in_library(_posing_object) {

        MessageLog.trace("create_posing_files_and_folder_in_library")

        var folder_path =  format_and_create_library_posing_folder_path(_posing_object)
        _posing_object.set_folder_path(folder_path)
  
        MessageLog.trace("rigstate")
        //rigstate
        var rigstate_string = _posing_object.get_rigstate_string();
        var rigstate_file_path = _posing_object.get_file_path("rigstate")
        var rigstate_file_object = new PermanentFile(rigstate_file_path);		
        rigstate_file_object.open(4);                
        rigstate_file_object.write(rigstate_string);          
        rigstate_file_object.close();     

        MessageLog.trace("elements")
        //elements
        S.elements.copy_tvg_object_array_to_folder(_posing_object.get_used_tvg_obj_array(),_posing_object.get_file_path("elements"))

        MessageLog.trace("png")
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
        var posing_folder = asset_posings_folder+"\\"+_posing_object.get_name();
        var dir_object2 = new $.oFolder(posing_folder );
        dir_object2.create();

        MessageLog.trace("posing_folder")
        MessageLog.trace(posing_folder)


        return posing_folder
    }


    function copy_elements_to_library(_posing_object){


    }



}


this.apply_posing_to_selection = function (_posing_object){


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


