OO.PosingCreator = function(_S){

    // parse name , create rigstate and create final posing object

    var S = _S ; 

    var current_name = ""; 
    var current_nodes_array = []; 
    var current_suffix = ""
    var current_linked_asset_object = ""; 
    var current_root_node_path = ""; 
    var current_start_frame = 1;
    var current_number_of_frames = 1;
    var current_frame = 1;


    this.reset = function(){
        current_name = ""; 
        current_nodes_array = [];
        current_suffix = ""
        current_linked_asset_object = ""; 
        current_root_node_path = ""; 
        current_start_frame = 1;
        current_number_of_frames = 1;
    }

    this.set_suffix = function(_sfx){
        current_suffix = _sfx+""
    }

    this.set_linked_asset_object = function(_lao){
        current_linked_asset_object = _lao
    }

    this.set_frame = function(_f){
        current_frame = _f;
    }

    this.set_frame_range = function(_start,_number){
        current_start_frame = _start
        current_number_of_frames = _number
    }

    this.set_nodes = function(_cn){
        current_nodes_path_array  = _cn
    }

    this.set_group_path= function(_gp){
        current_group_path = _cn
    }


    function format_name(){

        var asset_code = current_linked_asset_object.get_code()

       // var pname = "p_"+asset_code+"_"+current_root_group_path+"_"+current_suffix;
        var pname = "p_"+asset_code+"_"+current_suffix;
        return pname; 
    }

    function format_group_path(){

        return "Top/"+current_linked_asset_object.get_code()
    }

    function create_full_group_rigstate(){
        var RS = new RigState(format_name(),current_frame, current_group_path);
        return RS;
    }

    function filter_types(_node_path_array){
        var filtered_array = []
        var excluded_node_types = ["MasterController","COMPOSITE","CUTTER","COLOR_ART","COLOR_MASK","OVERLAY","UNDERLAY","VISIBILITY"]
        for(var n = 0 ; n < _node_path_array.length ; n++){
            if(excluded_node_types.indexOf(node.type(current_nodes_path_array))==-1){
                filtered_array.push(_node_path_array[n])
            }
        }
        return filtered_array;
    }

    function create_rigstate_from_node_path_array_for_frame(_frame){
        var nodes_path = filter_types(current_nodes_path_array)
        var RS = new RigState(current_name,_frame);
        for(var n = 0 ; n < nodes_path.length ; n++){
            var current_node_path = nodes_path[n];
            var attributes_list = node.getAllAttrKeywords(current_node_path)
            attributes_list.push("DRAWING.ELEMENT")	
            RS.addNodeAttrList(current_node_path, attributes_list,_frame);
        }
        return RS;
    }


    function create_rigstate_object_array(){

        var last_frame = current_start_frame+current_number_of_frames
        var objects_array = []
        for(var f = current_start_frame ; f <  last_frame  ; f++){
            var new_rigstate = create_rigstate_from_node_path_array_for_frame(f)
            objects_array.push(new_rigstate)
        }
        return objects_array
    }

    this.create_posing_object = function(){

        current_group_path = format_group_path()
        current_name = format_name();

        var new_posing_object = new OO.Posing(current_name)
        new_posing_object.set_group_path(current_group_path);
        new_posing_object.set_root_node_path(current_root_node_path);
        new_posing_object.set_asset_code(current_linked_asset_object.get_code());
        new_posing_object.set_nodes_path_array(current_nodes_path_array);
        new_posing_object.set_start_frame(current_start_frame )
        new_posing_object.set_number_of_frames(current_number_of_frames )
        new_posing_object.set_rigstate_object_array(create_rigstate_object_array())
        return new_posing_object; 

    }



}

