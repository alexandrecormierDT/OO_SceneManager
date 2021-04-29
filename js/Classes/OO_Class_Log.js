// CLASS OO_SceneManager

//MessageLog.trace("CLASS OO_Log imported")

OO.Log =function (){
		
		var log_name = ""; 
		
		var log_list = []; 
		
		var lines = []; 
		
		var tags = [];
		
		var external_path;
		
		var scene_script_log_path = null; 
		
		var script_tag = null 
		
		this.add = function(line,tag){
			
			var tag = tag == undefined || tag == "" ? "log" : tag; 
			
			log_list.push("["+tag+"] - "+line);
			
			lines.push(line);
			tags.push(tag);
			
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
			
			external_path = _filepath;
			
		}
		
		this.getFilePath = function(_where){
			
			var filename = scene.currentScene()+external_path+".txt";
			

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
			
					stamp = scene_path+"**************** NEW LOG >>>>"+OO.aujourdhui();
			
					for (l in log_list){
						
						if(tag == "all"){
							string+="\n"+"["+tags[l]+"] - "+lines[l];
						}else{
							if(tags[l] == tag){
								string+="\n"+"["+tags[l]+"] - "+lines[l];
							}
							
						}
						 
					}	
				
				break; 
				
				case "html": 
				
					stamp = "<div class='logbox'><h3><span class='scene'> "+scene_path+" </span></h3><span class='entry'>"+Date()+"</span><br>";
				
					for (l in log_list){
						
						if(tag == "all"){
							string+="<div class='logline "+tags[l]+"'><span class='logtag'><b>["+tags[l]+"]</b></span>- <span  class='logcontent'>"+lines[l]+"</span></div>";
						}else{
							if(tags[l] == tag){
								string+="<div class='logline "+tags[l]+"'><span class='logtag'><b>["+tags[l]+"]</b></span>- <span  class='logcontent'>"+lines[l]+"</span></div>";
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
			 
			for (l in log_list){
				if(tags[l] == "ERROR" || tags[l] == "error"){
					nb++;
				}
			}
					
			
			return nb; 
			
		}
		

		this.create_scene_script_log_file_and_folder = function(){
			
			if(script_tag != null){
					
				var scene_log_dir = create_scene_log_folder_if_missing()
				var file_path = scene_log_dir+"/"+script_tag+".html"; 
				var file_test = new $.oFile(file_path)
				
				if(file_test.exists == false){
					
					logfile = new PermanentFile(file_path);						
					
				}
				
				scene_script_log_path = file_path;
			
			}
			
		}		
		
		
		this.set_script_tag = function(_st){
			
			script_tag = _st
			
		}
		
		function create_scene_log_folder_if_missing(){
			
			var scene_dir = scene.currentProjectPathRemapped();
			
			var log_dir_path = scene.currentProjectPathRemapped()+"/Log";
			
			var dir_object = new $.oFolder(log_dir_path)
			
			if(dir_object.exists == false){
				
				dir_object.create();
				
			}			
			
			return log_dir_path;
			
			
		}
		
		this.get_log_list = function(){
			
			return log_list; 
			
		}
		
		
		this.copy_log_from_other_log_object = function(_other_log_object){
			
			log_list = _other_log_object.get_log_list();
			
		}
		
		this.set_log_list = function(_content){
			
			
			
			
		}

		this.save_scene_script_log_file = function(){
			
			if(scene_script_log_path != null){

				var new_line = this.print("all","html");
				logfile = new PermanentFile(scene_script_log_path);
				logfile.open(4);                
				logfile.writeLine(new_line);          
				logfile.close(); 

			}
			
		}
		
		this.save = function(){
			
			var script_log = this.print("all","html");

			var filePath = external_path;
			
			// !! need to declare the var script_log in function scope
			var new_content = script_log;
			
			logfile = new PermanentFile(external_path);

			logfile.open(4);                 // open with write only stream
			logfile.writeLine(new_content);           // write line to file
			logfile.close(); 	
			
			
			

		}		
		this.clearLog = function(){
			
			log_list = []; 
			
		}
		
	

	} 


