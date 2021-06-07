
OO.ActionTPL = function (_file_path){
	
    var type = _type; 
    var name = _name; 
    var file_path = _file_path; 
    var folder_path = "";

    function parse_file_path(){

        var split_slash = _file_path.split("\\");
        var split_file = _file_path.split(split_slash[split_slash.length-1]);
        folder_path = split_file[0]
        name = split_file[1].split(".")[0]

    }

    this.set_folder_path = function(_fp){
        folder_path = _fp
    }

    this.export_selection = function(){
        parse_file_path()
        copypPaste.createTemplateFromSelection(name+".tpl",folder_path)	
    }


	
}
