// CLASS OO_ASSET

////MessageLog.trace("CLASS OO_ASSET")

OO.DeadLineJobSubmiter = function(_S){
	
	var S = _S;

    this.submit_render_job = function(){

        var job = new OO.DeadLineJob(); 

        job.set_xstage_path(S.get_xstage_path());
        job.create_job_files();

        var command_line = job.format_submit_command_line();

        MessageLog.trace(command_line);

		var deadline_process = new Process2(command_line); 
		deadline_process.launch();

        //MessageLog.trace(launch);
       // MessageLog.trace(deadline_process.errorMessage());
  

    }



}
