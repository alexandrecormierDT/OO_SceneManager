// CLASS AnimaticFilesManager


OO.LipsDetectionGenerator = function (){
	
	var output_path = ""; 
	
	var source_wave_path = ""; 
	
	var rhubarb_path = "P:/pipeline/extra_soft/rhubarb-lip-sync-1.10.0-win32/rhubarb.exe"; 
	
	var dat_frame_rate = 25;
	
	var detect_type = 'phonetic';
	
	
	this.set_output_path = function(_op){
		
		output_path = _op;
		
	}
	
	this.set_source_wave_path = function(_swp){
	
		source_wave_path = _swp;
		
	}
	
	this.set_rhubarb_path = function(_rp){
	
		rhubarb_path = _rp;
		
	}	
	
	function render_command_string(){

		var command_string ='"'+rhubarb_path+'" -o "'+output_path+'" "'+source_wave_path+'" -r '+detect_type+' -f dat --datFrameRate '+dat_frame_rate+' --datUsePrestonBlair';
		
		MessageLog.trace(command_string);
		
		return command_string;
		
	}
	
	this.generate_lipsdetection_txt = function(){
		
		var process_command_string = render_command_string();
		
		rhubarb_process = new Process2(process_command_string); 

		rhubarb_process.launch();
		
	}
	
	
	
}