
OO.Posing = function (_posing_name){
	
    var posing_name = _posing_name
    var asset_code = ""
    var asset_id = ""
    var rigstate_object = ""; 
    var posing_folder_path = ""; 
    var used_tvg_obj_array = [];
    var root_group_path="";
    var png_path = "";



    this.set_posing_name = function(_pn){
        posing_name = _pn
    }
    this.set_asset_code = function(_ac){
        asset_code = _ac
    }
    this.set_rigstate_object = function(_rso){
        rigstate_object= _rso
    }
    this.set_folder_path = function(_pfp){
        posing_folder_path = _pfp
    }
    this.set_used_tvg_obj_array = function(_utoa){
        used_tvg_obj_array = _utoa
    }
    


    this.set_root_group_path = function(_rg){
        root_group_path = _rg
    }
    
    this.get_asset_code = function(_ac){
        return asset_code
    }  
    this.get_name = function(){
        return posing_name
    }
    this.get_rigstate_object = function(){
        return rigstate_object
    }




    this.add_tvg_obj = function(_tvg_obj){
        used_tvg_obj_array.push(_tvg_obj)
    }

    this.get_used_tvg_obj_array = function(){
        return used_tvg_obj_array 
    }
    this.get_file_path = function(_file_type){
        var file_path ="";
        switch(_file_type){
            case "png": 
            file_path=posing_folder_path+"\\"+posing_name+".png"
            break; 
            case "rigstate": 
            file_path=posing_folder_path+"\\"+posing_name+".rigstate"
            break; 
            case "elements": 
            file_path=posing_folder_path+"\\elements\\";
            break; 
            case "passeport": 
            file_path=posing_folder_path+"\\posing_passeport.txt\\";
            break; 
        }
        return file_path;
    }

    this.get_rigstate_string = function(){
        var rigstate_string = rigstate_object.toString(root_group_path); 
        return rigstate_string;
    }

    this.parse_rigstate_file_content = function(){
        var rigstate_file_path = this.get_file_path("rigstate")
        var rigstate_file_object =  new $.oFile(rigstate_file_path);                
        var file_content = rigstate_file_object.read();    
        
        MessageLog.trace("file_content") 
        MessageLog.trace(file_content) 
        rigstate_object = new RigState() 
        rigstate_object.loadFromString(file_content,0,root_group_path);
    }

    this.fetch_used_tvg = function(){



    }

    this.apply_rigstate_at_frame = function(_frame){

        rigstate_object.applyState(_frame)
    }



    this.parse_posing_passeport_file = function(){

        /*var passeport_file_path = this.get_file_path("passeport")
        var rigstate_file_object = new PermanentFile(rigstate_file_path);		
        rigstate_file_object.open(4);                
        var file_content = rigstate_file_object.read();     
        rigstate_object = new Rigstate() 
        rigstate_object.loadFromString(file_content,0,root_group_path);*/
  
    }

}
