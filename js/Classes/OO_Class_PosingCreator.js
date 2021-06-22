OO.PosingCreator = function(_S){

    var S = _S ; 

    var current_nodes_array = []; 
    var current_suffix = ""
    var current_frame = 0;
    var current_root_group_path = "Top";
    var current_linked_asset_object = ""; 
    var rigstates_objects_array = []

    this.reset = function(){
        current_nodes = [];
        current_suffix = ""
        current_frame = 0;
        current_root_group_path = "Top";
        current_linked_asset_object = ""; 
    }

    this.set_suffix = function(_sfx){
        current_suffix = _sfx+""
    }

    this.set_linked_asset_object = function(_lao){
        current_linked_asset_object = _lao
    }

    this.set_nodes = function(_cn){
        current_nodes_array  = _cn
    }

    this.set_frame = function(_f){
        current_frame = _f;
    }

    this.set_root_group_path= function(_rg){
        current_root_group_path = _rg;
    }

    function fetch_tvg_obj_array(){
        var tvg_obj_array = S.elements.get_selected_tvg_obj_array_at_frame(current_frame)
        return tvg_obj_array
    }

    this.add_rigstate = function(){
        var RS = new RigState(format_name(),current_frame, current_root_group_path);
  
        rigstates_objects_array.push(RS )
        return RS;
    }
    
    function create_rig_state(){
        var RS = new RigState(format_name(),current_frame, current_root_group_path);
        return RS;
    }

    function format_name(){

        var asset_code = current_linked_asset_object.get_code()

       // var pname = "p_"+asset_code+"_"+current_root_group_path+"_"+current_suffix;
        var pname = "p_"+asset_code+"_"+current_suffix;

        MessageLog.trace("pname")
        MessageLog.trace(pname)
        return pname; 
    }

    this.create_posing_object = function(){

        var new_posing_object = new OO.Posing(format_name())
        new_posing_object.set_root_group_path(current_root_group_path)
        new_posing_object.set_rigstate_object(create_rig_state())
        new_posing_object.set_used_tvg_obj_array(fetch_tvg_obj_array())
        new_posing_object.set_asset_code(current_linked_asset_object.get_code());
        return new_posing_object; 

    }



}

