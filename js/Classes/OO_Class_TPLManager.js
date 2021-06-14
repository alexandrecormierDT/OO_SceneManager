OO.TPLManager = function(_S){

    var S = _S ;

    this.create_tpl_file_with_passeport = function(_TPLOBJECT){

        MessageLog.trace("creating tpl")

        if(_TPLOBJECT.data.group_path != undefined){

            _TPLOBJECT.data.tpl_id= "TPL_"+S.get_unique_id();
            _TPLOBJECT.data.last_push_time = Math.round(+new Date())+""
            _TPLOBJECT.data.last_source_xstage_path = S.get_xstage_path()+""
            _TPLOBJECT.data.project = S.get_current_project()+""

            var tpl_node_path_list = S.trees.fetch_all_nodes_path_recursive(_TPLOBJECT.data.group_path)

            MessageLog.trace("tpl_node_path_list")
            MessageLog.trace(tpl_node_path_list)
            MessageLog.trace(_TPLOBJECT.data.group_path)
            tpl_node_path_list = S.trees.get_sub_nodes(_TPLOBJECT.data.group_path)
            MessageLog.trace(tpl_node_path_list)

            _TPLOBJECT.data.file_size =1; 
            _TPLOBJECT.data.number_of_files=0; 
            _TPLOBJECT.data.number_of_nodes =tpl_node_path_list.length;
            _TPLOBJECT.data.nodes_path_list = S.trees.format_node_path_list(tpl_node_path_list)
            
            var export_process = S.trees.export_group_to_path(_TPLOBJECT.data.group_path,_TPLOBJECT.data.folder_path,_TPLOBJECT.data.name+".tpl")

            if(export_process==true){

                _TPLOBJECT.data.file_size = get_file_size(_TPLOBJECT.get_tpl_folder_path()); 
                _TPLOBJECT.data.number_of_files = get_number_of_files_in_folder(_TPLOBJECT.get_tpl_folder_path()); 
                S.log.add("creating passport","file")

                create_passeport_for_tpl_object(_TPLOBJECT);

            }
        }
    }





    function get_file_size(_file_path){

        return 1;
    }

    function create_passeport_for_tpl_object(_tpl_object){

       var passeport =  new OO.TPLPassport()
       passeport.set_tpl_object(_tpl_object)
       passeport.create_txt()

    }


    function get_number_of_files_in_folder(_folder_path){

        return 1


    }





}