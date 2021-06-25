OO.TPLManager = function(_S){

    var S = _S ;

    
    this.create_tpl_file_with_passeport = function(_TPLOBJECT){
        
        //! the export folder path needs to be set in the object !

        if(_TPLOBJECT.data.folder_path != undefined){

            _TPLOBJECT.data.tpl_id= "TPL_"+S.get_unique_id();
            _TPLOBJECT.data.last_push_time = Math.round(+new Date())+""
            _TPLOBJECT.data.last_source_xstage_path = S.get_xstage_path()+""
            _TPLOBJECT.data.project = S.get_current_project()+""

            S.log.add("[TPLManager] creating tpl "+_TPLOBJECT.data.tpl_id,"file")
             create_passeport_file_for_tpl_object(_TPLOBJECT);

            var export_process = S.trees.export_group_to_path(_TPLOBJECT.data.nodes_path_list,_TPLOBJECT.data.folder_path,_TPLOBJECT.data.name+".tpl")

            if(export_process==true){
                _TPLOBJECT.data.file_size = 0
                _TPLOBJECT.data.number_of_files = 0
                S.log.add("[TPLManager] creating passport txt","file")
                create_passeport_file_for_tpl_object(_TPLOBJECT);
            }
        }
    }

    function create_passeport_file_for_tpl_object(_tpl_object){
       var passeport =  new OO.TPLPassport()
       passeport.set_tpl_object(_tpl_object)
       passeport.create_txt()
    }

    this.parse_tpl_file_to_tpl_object = function(_tpl_file_path){

		var passeport = new OO.TPLPassport()
		passeport.set_file_path(_tpl_file_path+"/tpl_passeport.txt")
        MessageLog.trace(_tpl_file_path+"/tpl_passeport.txt")
		var tpl_object = passeport.parse_content_to_TPL_object()
		if(tpl_object != false){
			return tpl_object
		}
		return false; 
    }

    this.parse_nodes_path_array_to_tpl_object = function(_asset,_node_path_array){

        var new_tpl = new OO.TPL(_asset.get_code())

        //from nodes
        new_tpl.data.asset_code =_asset.get_code();
        new_tpl.data.asset_id =_asset.get_id();
        new_tpl.data.tpl_id = "ACTION_TPL_123"
        new_tpl.data.sg_asset_type = _asset.get_sg_asset_type();
        new_tpl.data.nodes_path_list = _node_path_array
        new_tpl.data.number_of_nodes = _node_path_array.length;


        //from_scene_infos
        new_tpl.data.last_source_xstage_path = S.get_xstage_path()+""
        new_tpl.data.project = S.get_current_project()+""

        return new_tpl;
    }

    this.parse_posing_object_to_tpl_object = function(_posing_object,_asset){


        var new_tpl = new OO.TPL(_posing_object.get_name())

        //from asset
        new_tpl.data.asset_code =_asset.get_code();
        new_tpl.data.asset_id =_asset.get_id();
        new_tpl.data.tpl_id = "POSING_"+Math.floor(Math.random*100000)
        new_tpl.data.sg_asset_type = _asset.get_sg_asset_type();
        new_tpl.data.tpl_type = "action"

        //from posing
        new_tpl.data.folder_path= _posing_object.get_file_path("tpl_folder"); 

        //we only export reads for posing and let the rigstate take care of other node types. 
        new_tpl.data.nodes_path_list = _posing_object.get_read_nodes_path_array(); 
        new_tpl.data.number_of_nodes = _posing_object.get_read_nodes_path_array().length

        new_tpl.data.start_frame = _posing_object.get_start_frame()
        new_tpl.data.number_of_frames= _posing_object.get_number_of_frames(); 
        new_tpl.data.group_path = _posing_object.get_group_path(); 


        //from_scene_infos
        new_tpl.data.last_source_xstage_path = S.get_xstage_path()+""
        new_tpl.data.project = S.get_current_project()+""

        return new_tpl;
    }

    this.parse_portal_object_to_tpl_object = function(_portal_object){

        var new_tpl = new OO.TPL(_portal_object.get_code())

        //from portal
        var portal_tree = _portal_object.get_tree();
        new_tpl.data.group_path = portal_tree.get_key_node("PORTAL_GROUP").path;
        new_tpl.data.folder_path = _portal_object.get_dir('tpl')
        new_tpl.data.asset_code =_portal_object.get_code();
        new_tpl.data.asset_id = _portal_object.get_id();
        new_tpl.data.tpl_id = _portal_object.get_content();
        new_tpl.data.departement = _portal_object.get_departement();
        new_tpl.data.sg_asset_type = _portal_object.get_sg_asset_type();

        //node
        var tpl_node_path_list = new_tpl.data.group_path
        new_tpl.data.nodes_path_list = tpl_node_path_list
        new_tpl.data.number_of_nodes = tpl_node_path_list.length;

        //from_scene_infos
        new_tpl.data.last_source_xstage_path = S.get_xstage_path()+""
        new_tpl.data.project = S.get_current_project()+""

        return new_tpl;
    }

    this.compare_tpl_objects = function(_A,_B){

        var differences_object_array = []
        for (var key in _A.data) {
            if (_A.data.hasOwnProperty(key)) {
                if(_B.data.hasOwnProperty(key)){
                    if(_A.data[key]!=_B.data[key]){
                        if(key == "nodes_path_list"){
                            for(var n = 0 ; n < _A.data[key].length ; n++){
                                if(Array.isArray(_B.data[key]) &&_B.data[key].indexOf(_A.data[key][n])==-1 ){
                                    var diff = new  OO.TPL_difference(key,_A.data[key][n],"no node"); 
                                    differences_object_array.push(diff);
                                }
                            }
                        }else{
                            var diff = new  OO.TPL_difference(key,_A.data[key],_B.data[key]); 
                            differences_object_array.push(diff)
                        }
                    }
                }
            }
        }      
        for(var d= 0 ; d< differences_object_array.length ; d++){
            MessageLog.trace(differences_object_array[d].print())
        }
        return differences_object_array
    }


    this.paste_action_tpl_to_frame = function(_tpl_obj,_frame){

        //copyPaste.setNumFramesSrc(1);
        copyPaste.useCreateTemplateSpecial(false, false, false, false);

        copyPaste.usePasteSpecial(true);
        copyPaste.setPasteSpecialForcesKeyFrameAtBegAndEnd(true);
        copyPaste.setPasteSpecialDrawingAutomaticExtendExposure(true,true);
        copyPaste.setPasteSpecialMatchNodeName(true);
        copyPaste.setPasteSpecialFullTransfer(true);
    
        // make sure that we do not paste any palettes (as requested).
        copyPaste.setPasteSpecialColorPaletteOption( "REUSE_PALETTES" );
        copyPaste.setPasteSpecialColorPaletteOption( "DO_NOTHING" );
        copyPaste.setPasteSpecialDrawingFileMode("ONLY_CREATE_IF_DOES_NOT_EXIST")
        copyPaste.setPasteSpecialDrawingAction("ADD_OR_REMOVE_EXPOSURE")

       MessageLog.trace("__________________________")
       MessageLog.trace(_tpl_obj.get_tpl_folder_path())
       MessageLog.trace(_tpl_obj.data.start_frame)
       MessageLog.trace(_tpl_obj.data.number_of_frames)
       MessageLog.trace(_tpl_obj.data.nodes_path_list)

       var drag_object = copyPaste.copyFromTemplate(_tpl_obj.get_tpl_folder_path(), _tpl_obj.data.start_frame,  _tpl_obj.data.number_of_frames, copyPaste.getCurrentCreateOptions() );
       var copy_process = copyPaste.paste(drag_object,_tpl_obj.data.nodes_path_list,_frame,_tpl_obj.data.number_of_frames,copyPaste.getCurrentPasteOptions() )	
        //copyPaste.paste(dragObject,_tpl_obj.data.nodes_path_list,_frame,1,pasteOptions )	
        MessageLog.trace(copy_process)
    }
}


 OO.TPL_difference = function(_key,_valueA,_valueB){

    this.comparekey = _key
    this.valueA =_valueA
    this.valueB =_valueB

    this.print = function(){
        var string = "tpl mismatch on ( "+_key+" ) :  ( "+_valueB+" ) instead of  ( "+_valueA+" )"; 
        return string;
    }

    

}
