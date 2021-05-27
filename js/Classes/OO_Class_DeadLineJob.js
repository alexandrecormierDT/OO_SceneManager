// CLASS OO_ASSET

////MessageLog.trace("CLASS OO_ASSET")

OO.DeadLineJob = function(){
	
    var xstage_path; 

    var jobs_file_temp_folder = "P:\\pipeline\\alexdev\\temp";
    //var dead_line_path = "%DEADLINE_PATH%\\deadlinecommand.exe";
    var dead_line_path = "C:\\Program Files\\Thinkbox\\Deadline10\\bin\\deadlinecommand.exe";

    var job_info_file_path = ""; 
    var plugin_info_file_path = ""; 

    var startf = scene.getStartFrame();
    var stopf = scene.getStopFrame();

    

    var job_name = "JOB_"+get_unique_id();


    this.set_xstage_path = function(_xstage_path){

        xstage_path = _xstage_path;

    }

    function format_plugin_info_file_content(){

        var content;

        content = "Version=20\nSceneFile="+xstage_path+"";

        return content;
    }



    function create_plugin_info_file(){

        var serial =get_unique_id();
        var file_path =  jobs_file_temp_folder+"\\deadline_plugin_"+serial+".info";

		var file_test = new $.oFile(file_path)
			
		if(file_test.exists == false){
				
			var logfile = new PermanentFile(file_path);

			logfile.open(4);              
			logfile.write(format_plugin_info_file_content());           
			logfile.close(); 						
				
		}

        plugin_info_file_path =  file_path;

    }


    function create_job_info_file(){

        var serial =get_unique_id();
        var file_path =  jobs_file_temp_folder+"\\deadline_job_"+serial+".info";

		var file_test = new $.oFile(file_path)
			
		if(file_test.exists == false){
				
			var logfile = new PermanentFile(file_path);
			var file_content = format_job_info_file_content()

			logfile.open(4);              
			logfile.write(format_job_info_file_content());           
			logfile.close(); 						
				
		}

        job_info_file_path = file_path;

    }

    function format_job_info_file_content(){

        var content;

        MessageLog.trace(startf+" "+stopf)

        content = "Plugin=Harmony\nFrames="+startf+"-"+stopf+"\nChunkSize="+stopf+"\nName="+job_name+""
       
       /* Frames=1-36
        ChunkSize=36
        Name=prout2
        JobDependencies=60afad674026630b642426c9"*/

        return content;
    }

    function format_json_object(){



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

		var k = Math.floor(Math.random() * 10000000);
		var m =k.toString();	
			
		return m ;


    }


}
