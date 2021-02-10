// CLASS OO_ViewManager

MessageLog.trace("CLASS OO_ViewManager");

OO.ViewManager = function(_S){
	
	//reference to the singleton
	var S = _S;
	
	if(_S == ""){
	
		S = new OO.SceneManager();
	
	}
	
	
	var list = [];
	
	var output_dir = "";
	

	this.load = function(_stage){
		
		var TLM_list=_stage.get_timelinemarkers();

			
			for(var t in TLM_list){
				
				var curTLM = TLM_list[t];
				
				MessageLog.trace("NAME");
				MessageLog.trace(curTLM.name);
				
				if(isViewName(curTLM.name)){
					
					var nview = new OO.View();
					
					nview.load(TLM_list[t]);
					
					list.push(nview);
				
					
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
		
		return  output_dir+"\\"+view.asset+"\\"+view.task+"\\";

		
	}
	
	
	
	this.exportDialog = function(){
		
		
		
		
		
		
	}
	
	var selectedViews = [];
	

	this.export_views = function(){
		
		MessageLog.trace("LIST");
		MessageLog.trace(list.length);
	
		for(var v in list){
			
				var CV = list[v];
				
				var final_path = get_export_dir(CV) + CV.get_file_name();
				
				var asset_dir = new $.oFolder(get_export_dir(CV)).create();
	
				//openHamrony method of oScene : exportLayoutImage(path, includedNodes, exportFrame,exportCameraFrame,exportBackground,frameScale)
				OO.doc.exportLayoutImage(final_path,[],CV.exportFrame,CV.exportBackground,CV.exportCameraFrame,CV.frameScale);
				
			
		}
		
		
	}
	

	this.get_views = function(){
		
			return list; 
		
	}
	
  
}