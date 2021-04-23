// CLASS OO_ViewManager

//MessageLog.trace("CLASS OO_ViewManager");

OO.ViewManager = function(_S){
	
	//reference to the singleton
	var S = _S;
	
	if(_S == ""){
	
		S = new OO.SceneManager();
	
	}
	
	this.noviews = true;
	
	
	var list_of_views = [];
	
	var output_dir = "";
	

	this.load = function(_stage){
		
			//MessageLog.trace("ViewManager Load");
		
			var TLM_list_of_views=_stage.get_TLM();
			
			if(TLM_list_of_views.length == 0){
				
				OO.log.add('no views detected in the scene','ERROR');
				
				//MessageLog.trace('no views detected in the scene');
				
				this.noviews = true;
				
				return; 
				
			}else{
				
				this.noviews = false;

			
			}
			
			

			for(var t in TLM_list_of_views){
				
				var curTLM = TLM_list_of_views[t];
				
				if(curTLM != undefined){
					
					if(isViewName(curTLM.name)){
						
						var nview = new OO.View();
						
						nview.load(TLM_list_of_views[t]);
						
						// see class view for processing of the marker note content
						
						list_of_views.push(nview);
					
					}
					
				}
				
			}
			
			

		
	}
	
	var isViewName = function (TLM_name){
		
		var split1 = TLM_name.split("_");
		
		if(split1[0] == "VIEW"){
			
			return true;
		
		}
		
		return false;
		
		
	}
	
	this.set_output_dir = function(_path){
		
		output_dir = _path;
	}
	
	var get_export_dir = function(view){
		
		if(view.direct_path != false){
			
			return  "P:/"+view.direct_path;
			
		}
		
		return  output_dir+"/"+view.asset+"/"+view.task+"/";

		
	}
	
	var get_export_path = function(view){
		
		return get_export_dir(view) + view.get_file_name();
		
	}

	var selectedViews = [];
	

	this.export_views = function(){
	
		for(var v in list_of_views){
			
				var CV = list_of_views[v];
				
				if(CV.is_selected){
					
					var final_path = get_export_dir(CV) + CV.get_file_name();
					
					var asset_dir = new $.oFolder(get_export_dir(CV)).create();
		
					//openHamrony method of oScene : exportLayoutImage(path, includedNodes, exportFrame,exportCameraFrame,exportBackground,frameScale)
					OO.doc.exportLayoutImage(final_path,[],CV.exportFrame,CV.exportBackground,CV.exportCameraFrame,CV.frameScale);
					
					//QUICK TEST OF JHONIE BAT SCRIPT
					
					var project_name = "billy"; 
					
					var asset_name = CV.asset;
					var version_name = CV.version;
					var file_path = final_path;
					var task_name = CV.task;
					var task_status = "psr";
					
					var bat_file = 'P:/pipeline/extra_scripts/python3.x/pnguploader/bin/pngupload.bat';
					
					var command = '"'+bat_file+'" -p "'+project_name+'" -a "'+asset_name+'" -f "'+file_path+'"  -n "'+version_name+'" -t "'+task_name+'" -s "'+task_status+'"';
					
					MessageLog.trace("command");
					MessageLog.trace(command);
					
					p1 = new Process2(command );           // create process from single string

					;
					
					MessageLog.trace(p1.launch());
					MessageLog.trace(p1.errorMessage());
					MessageLog.trace(p1);
					
					
					
					//
				
					
					
				
				}
				
			
		}
		
		
	}
	
	this.export_currentframe_png_to = function(_path,_frameScale){

		
			//openHamrony method of oScene : exportLayoutImage(path, includedNodes, exportFrame,exportCameraFrame,exportBackground,frameScale)
			
			OO.doc.exportLayoutImage(_path,[],frame.current(),false,false,_frameScale);
			
			
			this.write_resolution_txt(_path,_frameScale);


	}	
	
	this.write_resolution_txt = function(_path,_frameScale){
		
		var with_ratio = _frameScale*(4/3)
		
		var txt_path = _path+".txt"
		
		var reso_file = new $.oFile(txt_path);
		
		var width = Math.floor(1920*with_ratio );
		
		var height =  Math.floor(1080*with_ratio );
		
		var content = width+"\n"+height;

		reso_file.write(content);           // write line to file
		
	}



	this.get_views = function(){
		
			return list_of_views; 
		
	}
	
	this.InputDialog = function(){
		
		var dialog = new Dialog();
		dialog.title = "Export Views";
		dialog.width = 600;
		
		var CB_list = [];
		
		for (var v in list_of_views){
			
			var curView = list_of_views[v];

			var Vpath = get_export_path(curView);
			
			var VCB = new CheckBox();
			VCB.checked = false;
			VCB.text = curView.name+"  Frame  "+curView.exportFrame+"  -->  "+Vpath;
			dialog.add(VCB)
			
			CB_list.push(VCB);
			
		}	
		
		if ( dialog.exec() ){
			
			for (var v in list_of_views){
				
				var curView = list_of_views[v];
				
				curView.is_selected = CB_list[v].checked;
				
			}				

			return true;
			
		}
		
	}
	
  
}