// CLASS OO_ASSET

//////MessageLog.trace("CLASS OO_ASSET")

OO.DeadLineJob = function(){
	
    var xstage_path =""; 
    var command_line_string = ""; 

    var jobs_file_temp_folder = "P:\\pipeline\\alexdev\\temp";
    //var dead_line_path = "%DEADLINE_PATH%\\deadlinecommand.exe";
    var deadLine_root_path  = System.getenv("DEADLINE_PATH");
    var dead_line_path = deadLine_root_path+"\\deadlinecommand.exe";

    var job_info_file_path = ""; 
    var plugin_info_file_path = ""; 

    var plugin_type = "hamrony"; 

    var startf = scene.getStartFrame();
    var stopf = scene.getStopFrame();
    
    //BatchName
    var batch_name = "batch";
    var job_name = "JOB_"+get_unique_id();

    this.set_plugin = function(_p){
        plugin_type = _p;
    }

    this.set_job_name = function(_jn){

        var insert = _jn+""; 

        job_name = "JOB_"+insert+"_"+get_unique_id();
 

    }

    this.set_xstage_path = function(_xstage_path){
        xstage_path = _xstage_path;
    }

    function format_harmony_plugin_info_file_content(){
        var content;
        content = "Version=20\nSceneFile="+xstage_path+"";
        return content;
    }

    function format_command_line_plugin_info_file_content(){

        var content;
        content = "Shell=cmd\nShellExecute=True\nArguments="+command_line_string;
        //MessageLog.trace(content)

        return content;
    }


    function create_plugin_info_file(){

        var serial =get_unique_id();
        var file_path =  jobs_file_temp_folder+"\\deadline_plugin_"+serial+".info";

		var file_test = new $.oFile(file_path)
			
		if(file_test.exists == false){
				
			var plugin_info_file = new PermanentFile(file_path);
            var file_content = ""
            switch(plugin_type){
                case ('harmony'): 
                    file_content = format_harmony_plugin_info_file_content();
                break; 
                case ('command_line'):
                    file_content = format_command_line_plugin_info_file_content();
                break; 
            }
			plugin_info_file.open(4);              
			plugin_info_file.write(file_content);           
			plugin_info_file.close(); 						
				
		}

        plugin_info_file_path =  file_path;

    }


    function create_job_info_file(){

        var serial =get_unique_id();
        var file_path =  jobs_file_temp_folder+"\\deadline_job_"+serial+".info";

		var file_test = new $.oFile(file_path)
			
		if(file_test.exists == false){

            var file_content = ""; 
				
			var logfile = new PermanentFile(file_path);

            switch(plugin_type){
                case ('harmony'): 
                 file_content = format_harmony_job_info_file_content()
                break; 
                case ('command_line'):
                    file_content = format_command_line_job_info_file_content()
                break; 
            }

			logfile.open(4);              
			logfile.write(file_content);           
			logfile.close(); 						
				
		}

        job_info_file_path = file_path;

    }

    function format_harmony_job_info_file_content(){

        var content;
        content = "Plugin=ooo_Harmony\nFrames="+startf+"-"+stopf+"\nChunkSize="+stopf+"\nName="+job_name+""
       
       /* Frames=1-36
        ChunkSize=36
        Name=prout2
        JobDependencies=60afad674026630b642426c9"*/

        return content;
    }

    function format_command_line_job_info_file_content(){

        var content;
        content = "Batch="+batch_name+"\nPlugin=CommandLine\nFrames=1-1\nChunkSize=1\nName="+job_name+""
       
       /* Frames=1-1
        ChunkSize=36
        Name=prout2
        JobDependencies=60afad674026630b642426c9"*/

        return content;
    }

    this.set_command_line_string = function(_cmds){

        command_line_string = _cmds
    }

    this.create_job_files = function(){

        create_job_info_file();
        create_plugin_info_file();

    }

    this.format_submit_command_line = function(){

        /*
        "%DEADLINE_PATH%\deadlinecommand.exe" "%USERPROFILE%\Desktop\job.info" "%USERPROFILE%\Desktop\plugin.info"; 
        */
       // var command_line ='"'+dead_line_path+'" "'+job_info_file_path+'" "'+plugin_info_file_path+'"';
        var command_line =''+dead_line_path+' '+job_info_file_path+' '+plugin_info_file_path+'';

        return command_line;
        
        
    }

    function get_unique_id(){

		var k = Math.floor(Math.random() * 10000000000);
		var m =k.toString();	
			
		return m ;


    }


}
