// CLASS OO_View

MessageLog.trace("CLASS OO_View");

OO.View = function(TLM){
	
	this.version = "unnamedversion"; 
	
	this.exportFrame = 0;
	
	this.exportLength = 0; 
	
	this.asset = "unnamedasset";
	 
	this.task = "unnamedtask";
	
	this.exportFormat = "png";
	
	this.exportBackground = false;
	
	this.exportCameraFrame = false;
	
	this.frameScale = 1;
	
	// reading data from an xml elment object "timelineMarker"
	
	//exmple of TLM element in xml :  <timelineMarker markerStart="4" markerLength="0" colour="#FF0000FF" note="hello" name="C_marker"/>
	this.load = function(TLM){

		MessageLog.trace(Object.getOwnPropertyNames(TLM));
		
		if(TLM.hasOwnProperty('note')){
			
			MessageLog.trace("HAS NOTE")
			MessageLog.trace(TLM.name)
			MessageLog.trace(TLM.note)

			this.exportFrame = filter(TLM.markerStart);
			this.exportLength = filter(TLM.markerLength);
			
			var note = parse_note(TLM.note);
			
			if(note!=false){

				this.version = filter(note.hasOwnProperty('version') ? note.version : this.version) ; 
				this.asset = filter(note.hasOwnProperty('asset') ? note.asset : this.asset) ; 
				this.task = filter(note.hasOwnProperty('task') ? note.task : this.task) ;				
				this.frameScale = filter(note.hasOwnProperty('frameScale') ? parseFloat(note.frameScale) : this.frameScale);
				this.exportBackground = filter(note.hasOwnProperty('exportBackground') ? (note.exportBackground == "yes"): this.exportBackground);
				this.exportCameraFrame = filter(note.hasOwnProperty('exportCameraFrame') ? (note.exportCameraFrame == "yes") : this.exportCameraFrame);		
				this.format = filter_format(note.hasOwnProperty('format') ? note.format : this.exportCameraFrame);		
				
			}
			



		
		}
		
	}
	
	var filter = function(str){
	
		return OO.filter_string(str);
		
	}
	
	var filter_format = function(f){
		
		if(allowed_formats.indexOf(f)!=-1){
		
			return f;
			
		}
		
		return allowed_formats[0];
		
	}
	
	this.get_file_name = function(){
	
		return this.asset+"_"+this.task+"_"+this.version+"."+this.exportFromat;
		
	}
	
	var allowed_formats = ['png','jpg','tga'];
	
	var parse_note = function(note){
		/*
		
		note content exemple : 
		
		version:QF
		asset:ch_billy
		task:turn
		exportBackground:yes
		exportCameraFrame:no
		frameScale:1
		task:turn
		version:test
		
		
		*/
				
		var obj = {};
		
		var line_split = note.split('\n');
		
		if(line_split.length > 0){
			
			for (var l in line_split){
			
					var line = line_split[l]

					var equal_split = line.split(":");
					
					var param = equal_split[0];
					var value = equal_split[1];
						
					obj[param] = value;
					
			}			
				
		}else{
			
			return false
			
		}
		
		
							
		MessageLog.trace("NOTES");
		MessageLog.trace(Object.getOwnPropertyNames(obj));
		
		return obj;
		
		

	}

  
}