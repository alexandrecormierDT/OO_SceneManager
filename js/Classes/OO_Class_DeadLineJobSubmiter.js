// CLASS OO_ASSET

//////MessageLog.trace("CLASS OO_ASSET")

OO.DeadLineJobSubmiter = function(_S){
	
	var S = _S;

    this.submit_harmony_job = function(){

        S.log.add("[DeadLineJobSubmiter] submit_harmony_line_job","start")

        var job = new OO.DeadLineJob(); 

        job.set_xstage_path(S.get_xstage_path());
        job.set_plugin("harmony")
        job.create_job_files();

        var command_line = job.format_submit_command_line();

        //MessageLog.trace(command_line);

		var deadline_process = new Process2(command_line); 
		deadline_process.launch();

        ////MessageLog.trace(launch);
       // //MessageLog.trace(deadline_process.errorMessage());
  
    }


    this.submit_command_line_job = function(_cmd_line_string,_job_name){

        S.log.add("[DeadLineJobSubmiter] submit_command_line_job","start")

        var job = new OO.DeadLineJob(); 

        job.set_command_line_string(_cmd_line_string);
        job.set_plugin("command_line")
        job.set_job_name(_job_name)
        job.create_job_files();

        var command_line = job.format_submit_command_line();
        //MessageLog.trace(command_line);

		var deadline_process = new Process2(command_line); 
		var launch = deadline_process.launch();

		if(launch == 0){
			S.log.add(launch+" = deadline job launched succeed","success")
		}else{
			S.log.add(launch+" = deadline job failed to launch","error")
		}
    }



}
