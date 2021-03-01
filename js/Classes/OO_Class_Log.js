// CLASS OO_SceneManager

//MessageLog.trace("CLASS OO_Log imported")

OO.Log =function (_path){
		
		this.logs = []; 
		
		this.tags = [];
		
		this.path = _path;
		
		this.add = function(line,tag){
			
			this.logs.push("["+tag+"] - "+line);
			this.tags.push(tag);
			
		}
		
		this.getFilePath = function(_where){
			
			var filename = scene.currentScene()+this.path+".txt";
			

			filePath = scene.currentProjectPathRemapped()+"/"+filename;					

			
			if(_where == "root"){
				
				filePath = "P:/projects/billy/logs/"+filename;						
				
			}
			
			return filePath;
			
			
		}
		
		this.print = function(tag){
			
			var string = "";
			
			for (l in this.logs){
				
				if(tag == "all"){
					string+="\n"+this.logs[l];
				}else{
					if(this.tags[l] == tag){
						string+="\n"+this.logs[l];
					}
					
				}
				
			}
			
			return string;

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
		
		this.saveSceneLog = function(_where){
			
			var script_log = this.print("all");

			var filePath = this.getFilePath(_where);
			
			var stamp = scene.currentScene()+"\n************************************ NEW LOG >>>>"+Date();
			
			// !! need to declare the var script_log in function scope
			var new_content = stamp+script_log;
			
			logfile = new PermanentFile(filePath);

			logfile.open(4);                 // open with write only stream
			logfile.writeLine(new_content);           // write line to file
			logfile.close(); 	
			
			
			

		}
		
		this.clearLog = function(){
			
			this.logs = []; 
			
		}
		
	

	} 


