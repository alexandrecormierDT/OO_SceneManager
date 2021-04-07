

OO.Lipsing = function (){
	
	var lipsdetec = ""; 
	
	var emotion = ""; 
	
	var angle = ""; 
	
	var detected_frames = []
	
	var detected_phonemes = []; 
	
	
	this.set_lipsdetec = function(_tc){
		
		lipsdetec = _tc
		
	}
	
	this.set_emotion = function(_em){
		
		emotion = _em;
	}
	
	this.set_angle = function(_ang){
		
		angle = _ang;
	}	
	
	this.generate_lipsing_exposure_for_frame = function(_frame){
		
		
		
	}
	
}