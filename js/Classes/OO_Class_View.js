// CLASS OO_View

MessageLog.trace("CLASS OO_View");

OO.View = function(TLM){
	
	this.version_name = "unamed_version"; 
	
	this.exportFrame = 0;
	
	this.exportLength = 0; 
	
	this.asset = "unamed_asset";
	
	this.task = "unamed_task";
	
	
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

			this.exportFrame = TLM.markerStart;
			this.exportLength = TLM.markerLength;
			this.version_name =TLM.name;
			
			var note =parse_note(TLM.note);
			
			if(note!=false){

				this.asset = note.hasOwnProperty('asset') ? note.asset : this.asset ; 
				this.task = note.hasOwnProperty('task') ? note.task : this.task ;				
				this.frameScale = note.hasOwnProperty('frameScale') ? parseFloat(note.frameScale) : this.frameScale;
				this.exportBackground = note.hasOwnProperty('exportBackground') ? (note.exportBackground == "yes"): this.exportBackground;
				this.exportCameraFrame = note.hasOwnProperty('exportCameraFrame') ? (note.exportCameraFrame == "yes") : this.exportCameraFrame;		
				
			}
			



		
		}
		
	}
	
	this.get_file_name = function(){
	
		return this.asset+"_"+this.task+"_"+this.version_name+"."+this.exportFromat;
		
	}
	
	var parse_note = function(note){
		/*
		
		note content exemple : 
		
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