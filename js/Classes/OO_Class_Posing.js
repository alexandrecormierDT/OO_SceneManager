
OO.Posing = function (_posing_name){
	
    var posing_name = _posing_name

    //files
    var posing_folder_path = ""; 
    var png_path = "";

    //asset
    var asset_code = ""
    var asset_id = ""

    //frames
    var start_frame = 0 ; 
    var number_of_frames = 1; 

    //nodes
    var group_path = [];
    var root_node_path = [];
    var nodes_path_array = [];
    var read_nodes_path_array = []
    

    //rigstates
    var rigstate_object_array = []


    //tpl
    var tpl_object = null


    this.set_posing_name = function(_pn){
        posing_name = _pn
    }
    this.set_nodes_path_array = function(_pn){
        nodes_path_array = _pn
        read_nodes_path_array = get_nodes_path_by_type("READ")
    }

    this.get_nodes_path_array =function(){
        return nodes_path_array;
    }
    this.get_read_nodes_path_array =function(){
        return read_nodes_path_array;
    }

    function get_nodes_path_by_type(_node_type){
        var types_to_include = [_node_type]
        var filtered_array = []
        for(var n = 0 ; n < nodes_path_array.length ; n++){
            var current_node_path = nodes_path_array[n]
            if(types_to_include.indexOf(node.type(current_node_path))!=-1){
                filtered_array.push(current_node_path)
            }
        }
        return filtered_array;
    }


    this.set_asset_code = function(_ac){
        asset_code = _ac
    }
    this.set_folder_path = function(_pfp){
        posing_folder_path = _pfp
    }
    this.set_root_node_path = function(_rn){
        root_node_path = _rn
    }
    this.set_start_frame = function(_sf){
        start_frame = _sf
    }
    this.set_number_of_frames = function(_nf){
        number_of_frames  = _nf
    }


    this.set_tpl_object= function(_to){
        tpl_object  = _to
    }
    this.get_tpl_object= function(){
        return tpl_object
    }

    //
    this.get_asset_code = function(_ac){
        return asset_code
    }  
    this.get_name = function(){
        return posing_name
    }
    this.get_file_path = function(_file_type,_index){
        var index = _index != undefined ? _index : 0
        var file_path ="";
        switch(_file_type){
            case "png": 
            file_path=posing_folder_path+"/"+posing_name+".png"
            break; 
            case "tpl_folder": 
            file_path=posing_folder_path+"/";
            break; 
            case "rigstate": 
            file_path=this.get_file_path("tpl")+"/"+posing_name+index+".rigstate";
            break; 
            case "tpl_bare": 
            file_path=posing_name+".tpl";
            break; 
            case "tpl": 
            file_path=posing_folder_path+"/"+posing_name+".tpl";
            break; 
        }
        return file_path;
    }
    this.get_start_frame = function(){
        return start_frame
    }
    this.get_number_of_frames = function(){
        return number_of_frames
    }





    // RIGSTATE
    this.get_group_path = function(){
        return group_path
    }
    this.set_group_path = function(_gp){
        group_path = _gp
    }
    this.set_rigstate_object_array = function(_rsoa){
        rigstate_object_array =_rsoa;

    }
    this.get_rigstate_string = function(_index){
       var  index= _index!=undefined ? _index : 0
        var rigstate_string = rigstate_object_array[index].toString(group_path); 
        return rigstate_string;
    }
    
    this.parse_rigstate_file_content = function(_index){
        var  index= _index!=undefined ? _index : 0
        var file_path = this.get_file_path("rigstate",index)
        var file_object =  new $.oFile(file_path);                
        var file_content = file_object.read();    
        parsed_rigstate_object = new RigState() 
        parsed_rigstate_object.loadFromString(file_content,0,group_path);
        rigstate_object_array.push(parsed_rigstate_object)
    }

    this.apply_rigstate_at_frame = function(_frame,_index){
        MessageLog.trace("____"+_frame+"____"+_index)
        var  index= _index!=undefined ? _index : 0;
        if(rigstate_object_array[index]!=null){
            rigstate_object_array[index].applyState(_frame)
        }
    }


    
}
