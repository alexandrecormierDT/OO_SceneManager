OO.TPLManager = function(_S){

    var S = _S ;
    var tpl_object_array = []

    function export_group_to_path(_group,_path,_name){
        
		S.log.add("[TPLManager] exporting tpl to "+_path,"file")
		selection.addNodeToSelection(_group)
		var proccess = copyPaste.createTemplateFromSelection(_name,_path)
        S.log.add("[copyPaste] "+ proccess,"copypaste")

		return true; 
		
	}



    this.create_tpl_file_with_passeport = function(_TPLOBJECT){

        MessageLog.trace("creating tpl")

        if(_TPLOBJECT.data.group_path != undefined){

            _TPLOBJECT.data.tpl_id= "TPL_"+S.get_unique_id();
            _TPLOBJECT.data.last_push_time = Math.round(+new Date())+""
            _TPLOBJECT.data.last_source_xstage_path = S.get_xstage_path()+""
            _TPLOBJECT.data.project = S.get_current_project()+""

            _TPLOBJECT.data.file_size =1; 
            _TPLOBJECT.data.number_of_files=0; 
            _TPLOBJECT.data.number_of_nodes =get_number_of_nodes_in_group(_TPLOBJECT.data.group_path)     
            
            var export_process = export_group_to_path(_TPLOBJECT.data.group_path,_TPLOBJECT.data.folder_path,_TPLOBJECT.data.name+".tpl")

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

        var tpl_dir_path = _tpl_object.get_tpl_folder_path()
        var txt_file_path = tpl_dir_path+"//tpl_passeport.txt"; 

        var json_string = _tpl_object.format_properties_in_json()

        S.log.add("creating file "+txt_file_path,"file")

        MessageLog.trace( "tpl_dir_path" )
        MessageLog.trace( tpl_dir_path )

        var txt_file_object = new PermanentFile(txt_file_path);	
        MessageLog.trace("txt_file_object")		
        MessageLog.trace(txt_file_object)	
        txt_file_object.open(4);                
        txt_file_object.write(json_string);          
        txt_file_object.close(); 

    }

    function get_number_of_files_in_folder(_folder_path){

        return 1


    }


    function get_number_of_nodes_in_group(_group_path){

        return 1

    }








}