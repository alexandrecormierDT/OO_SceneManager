
OO.TPL = function (_name){

    this.data = {}
	
    this.data.name = _name; 
    this.data.folder_path = "";

    this.data.file_path

    this.data.tpl_type = "master";
    this.data.tpl_id = 0000;
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


    this.data.group_path = ""; 
    this.data.file_size =""; 
    this.data.number_of_files=0; 
    this.data.number_of_nodes = 0
    this.data.nodes_path_list = "";


    this.get_tpl_folder_path = function(){

        return this.data.folder_path+"//"+ this.data.name+".tpl";;
    
    }

    this.format_properties_in_json = function(){

       var property_list = Object.getOwnPropertyNames(this.data)
       var json_object = {}; 
       var detach_object = this.data; 
       var string = "{"

        for(var i = 0 ; i< property_list.length ; i++){
            var current_prop = property_list[i]; 
            MessageLog.trace(current_prop)
            json_object[current_prop] = detach_object[current_prop]+"";
            var coma = ','
            if(i ==0){
                 coma =''
            }else{
                coma= ',';
            }
            string+=coma+'\n'+'"'+current_prop+'":"'+detach_object[current_prop]+'"'
        }

        string += "}"

        MessageLog.trace(string)
        return string;

    }
}
