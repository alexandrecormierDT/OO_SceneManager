// CLASS OO_SceneManager

//MessageLog.trace("CLASS OO_Log imported")

OO.Log =function (_S){
		
		this.logs = []; 
		
		this.lines = []; 
		
		this.tags = [];
		
		this.path;
		
		this.html = "";
		
		this.S = _S
		
		this.add = function(line,tag){
			
			var tag = tag == undefined || tag == "" ? "log" : tag; 
			
			this.logs.push("["+tag+"] - "+line);
			
			this.lines.push(line);
			this.tags.push(tag);
			
			MessageLog.trace("["+tag+"]___"+line)
			
		}
		
		this.create_new_log_file = function(_filepath){
			
			
			var file_test = new $.oFile(_filepath)
			
			if(file_test.exists == false){
				
				logfile = new PermanentFile(_filepath);
				var stamp = scene.currentScene()+"**************** NEW LOG >>>>"+Date();

				logfile.open(4);                 // open with write only stream
				logfile.writeLine(stamp);           // write line to file
				logfile.close(); 						
				
			}
			
			this.path = _filepath;
			
		}
		
		this.getFilePath = function(_where){
			
			var filename = scene.currentScene()+this.path+".txt";
			

			filePath = scene.currentProjectPathRemapped()+"/"+filename;					

			
			if(_where == "root"){
				
				filePath = "P:/projects/billy/logs/"+filename;						
				
			}
			
			return filePath;
			
			
		}
		
		
		
		this.print = function(tag,output_type){
			
			var stamp = "";
			var string = "";
			var style = '<style type="text/css">.error{border:solid red;} .logbox{margin: 1% 0; padding: 10px; border: solid;}</style>'
			
			var scene_path = OO.doc.path +"/"+ OO.doc.name
			
			switch(output_type){
				
				case "txt": 
			
					stamp = scene_path+"**************** NEW LOG >>>>"+Date();
			
					for (l in this.logs){
						
						if(tag == "all"){
							string+="\n"+"["+this.tags[l]+"] - "+this.lines[l];
						}else{
							if(this.tags[l] == tag){
								string+="\n"+"["+this.tags[l]+"] - "+this.lines[l];
							}
							
						}
						 
					}	
				
				break; 
				case "html": 
				
					stamp = "<div class='logbox'><h3><span class='scene'> "+scene_path+" </span></h3><span class='entry'>"+Date()+"</span><br>";
				
					for (l in this.logs){
						
						if(tag == "all"){
							string+="<div class='logline "+this.tags[l]+"'><span class='logtag'><b>["+this.tags[l]+"]</b></span>- <span  class='logcontent'>"+this.lines[l]+"</span></div>";
						}else{
							if(this.tags[l] == tag){
								string+="<div class='logline "+this.tags[l]+"'><span class='logtag'><b>["+this.tags[l]+"]</b></span>- <span  class='logcontent'>"+this.lines[l]+"</span></div>";
							}
							
						}
						
					}	

					string+="</div>";
				
				break;
				
			}
			
			return style+stamp+string;

		}
		
		this.getERROR_count =function(){
			
			var nb =0;
			 
			for (l in this.logs){
				if(this.tags[l] == "ERROR"){
					nb++;
				}
			}
					
			
			return nb; 
			
		}
		
		this.saveSceneLog = function(){
			
			var script_log = this.print("all","html");

			var filePath = this.path;
			
			// !! need to declare the var script_log in function scope
			var new_content = script_log;
			
			logfile = new PermanentFile(this.path);

			logfile.open(4);                 // open with write only stream
			logfile.writeLine(new_content);           // write line to file
			logfile.close(); 	
			
			
			

		}
		
		this.save = function(){
			
			var script_log = this.print("all","html");

			var filePath = this.path;
			
			// !! need to declare the var script_log in function scope
			var new_content = script_log;
			
			logfile = new PermanentFile(this.path);

			logfile.open(4);                 // open with write only stream
			logfile.writeLine(new_content);           // write line to file
			logfile.close(); 	
			
			
			

		}		
		this.clearLog = function(){
			
			this.logs = []; 
			
		}
		
	

	} 


