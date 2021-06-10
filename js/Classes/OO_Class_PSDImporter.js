OO.PSDImporter = function(_S){

    var psd_file_path = "";
    var psd_object = {}; 
    var S = _S; 

    this.set_psd_object = function (_psd_file_path){

        psd_file_path = _psd_file_path;
        psd_object = new OO.PSD(psd_file_path); 

    }

    this.import_psd_to_group = function(_group_node_path){




    }



}