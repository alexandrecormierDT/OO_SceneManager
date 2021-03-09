// CLASS OO_View

//MessageLog.trace("CLASS OO_View");

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
	
	this.is_selected = false;
	
	this.name = "VIEW"
	
	//TO BY PASS SHOTGUN STRUCTURE AND EXPORT DIRECTLY TO PNG : 
	
	this.direct_path = false;
	
	this.file_name = false;

	
	// reading data from an xml elment object "timelineMarker"
	
	//exmple of TLM element in xml :  <timelineMarker markerStart="4" markerLength="0" colour="#FF0000FF" note="hello" name="C_marker"/>
	this.load = function(TLM){

		//MessageLog.trace(Object.getOwnPropertyNames(TLM));
		
		if(TLM.hasOwnProperty('note')){
			
			//MessageLog.trace("HAS NOTE")
			//MessageLog.trace(TLM.name)
			//MessageLog.trace(TLM.note)

			this.name = filter(TLM.name);
			this.exportFrame = filter(TLM.markerStart);
			this.exportLength = filter(TLM.markerLength);
			
			
			var note = parse_note(TLM.note);
			
			if(note!=false){
				
				//TO BY PASS SHOTGUN STRUCTURE AND EXPORT DIRECTLY TO PNG :

				this.direct_path = filter(note.hasOwnProperty('direct_path') ? note.direct_path : this.direct_path) ; 
				this.file_name = filter(note.hasOwnProperty('file_name') ? note.file_name : this.file_name) ; 
				
				this.version = filter(note.hasOwnProperty('version') ? note.version : this.version) ; 
				this.asset = filter(note.hasOwnProperty('asset') ? note.asset : this.asset) ; 
				this.task = filter(note.hasOwnProperty('task') ? note.task : this.task) ;				
				this.frameScale = filter(note.hasOwnProperty('frameScale') ? parseFloat(note.frameScale) : this.frameScale);
				this.exportBackground = filter(note.hasOwnProperty('exportBackground') ? (note.exportBackground == "yes"): this.exportBackground);
				this.exportCameraFrame = filter(note.hasOwnProperty('exportCameraFrame') ? (note.exportCameraFrame == "yes") : this.exportCameraFrame);		
				this.exportFormat = note.hasOwnProperty('format') ? filter_format(note.exportFormat) : this.exportFormat;		
				
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
		
		if(this.file_name == false){
	
			return this.asset+"_"+this.task+"_"+this.version+"."+this.exportFormat;
		
		}else{
			
			return this.file_name+"."+this.exportFormat;
			
		}
		
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
		
		/*
		short note content exemple : 
		
		file_name:my_test_image
		direct_path:P:C:\Users\a.cormier\Pictures\export
		
		
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
		
		
							
		//MessageLog.trace("NOTES");
		//MessageLog.trace(Object.getOwnPropertyNames(obj));
		
		return obj;
		
		

	}
	

  
}