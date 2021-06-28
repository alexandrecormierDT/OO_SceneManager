
OO.TPL = function (_name){

    this.data = {}
	
    this.data.name = _name; 
    this.data.folder_path = "";
    this.data.file_path

    this.data.tpl_type = "master";
    this.data.tpl_id = "TPL_0000";
    this.data.asset_link ="";
    this.data.entity_type ="asset";
    this.data.asset_code ="";
    this.data.sg_asset_type  ="";
    this.data.asset_id ="";
    this.data.last_push_time ="";
    this.data.last_pull_time ="";
    this.data.birth_xstage_path ="";
    this.data.last_source_xstage_path ="";
    this.data.note =""
    this.data.task  =""
    this.data.departement  =""
    this.data.project  =""
    this.data.author = ""; 
    this.data.status =""; 

    this.data.group_path = null; 
    this.data.file_size =""; 
    this.data.number_of_files=0; 
    this.data.number_of_nodes = 0
    this.data.nodes_path_list = [];
    this.data.tpl_folder_path = ""; 

    this.data.start_frame = 1;
    this.data.number_of_frames = 1;

    this.get_node_path_array = function(){
        return this.data.nodes_path_list
    }
    this.set_tpl_folder_path = function(_tfp){
        this.data.tpl_folder_path = _tfp
    }

    this.get_tpl_folder_path = function(){
        this.data.tpl_folder_path =this.data.folder_path+ this.data.name+".tpl";
        return this.data.tpl_folder_path
    }

    this.format_properties_in_json = function(){
       var json_object = {}; 
        for(var key in this.data){
            var value = this.data[key];

            //to prevent cycling
            if(typeof value === "object" && value !== null){
                value = ""; 
            }
            if(Array.isArray(this.data[key])){
                value = this.data[key];
            }
            json_object[key] = value;
        }
        return JSON.stringify(json_object)
    }
}
