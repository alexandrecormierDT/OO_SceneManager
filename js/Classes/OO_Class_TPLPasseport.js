OO.TPLPassport = function(){

    var file_path="";
    var content = "";
    var tpl_object ={};

    function read_txt(){
        var pfile = new $.oFile(file_path);
        if(pfile.exists){
            var pstring = pfile.read();
            return  pstring;
        }
        return false
    }

    this.set_file_path = function(_fp){

        file_path = _fp
    }

    this.set_tpl_object = function(_to){

        tpl_object = _to;
    }

    this.get_tpl_object = function(){

        return tpl_object;

    }


    this.parse_content_to_TPL_object = function(){

        content = read_txt(); 
        var json_obj = JSON.parse(content);
        
        var tpl_object = new OO.TPL(json_obj.name)
        var property_list = Object.getOwnPropertyNames(json_obj)
         for(var i = 0 ; i< property_list.length ; i++){
             var current_prop = property_list[i]; 
             tpl_object[current_prop] = detach_object[current_prop]+"";
         }

    }

    this.create_txt = function(){

        var tpl_dir_path = tpl_object.get_tpl_folder_path()
        var txt_file_path = tpl_dir_path+"//tpl_passeport.txt"; 

        var json_string = tpl_object.format_properties_in_json()

        MessageLog.trace( "tpl_dir_path" )
        MessageLog.trace( tpl_dir_path )

        var txt_file_object = new PermanentFile(txt_file_path);	
        txt_file_object.remove();    

        var txt_file_object = new PermanentFile(txt_file_path);	    
        txt_file_object.open(4);  
        txt_file_object.write(json_string);          
        txt_file_object.close(); 

    }

    this.format_TPL_object = function(){

        var property_list = Object.getOwnPropertyNames(tpl_object.data)
        var json_object = {}; 
        var detach_object =tpl_object.data; 
        var string = "{"
         for(var i = 0 ; i< property_list.length ; i++){
             var current_prop = property_list[i]; 
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
         return string;
    }

}





