// CLASS OO_Stage
//MessageLog.trace("CLASS OO_Stage")


OO.Stage = function (_S){
	
	//reference to the singleton
	var S = _S;
	
	if(_S == ""){
	
		S = new OO.SceneManager();
	
	}
	
	var XMLobj; 

	var timelinemarkers = [];
	
	this.parse_xml = function(string){
		
		//external parser , on which i deactivated node.js functions to make it completely without dependencies
		//
		
		XMLobj = OO.XML.parse(string,{ preserveAttributes: true });

	}	

	this.get_TLM = function(){
		
		//MessageLog.trace("stage get_TLM");
		
		var timelineMarkers = XMLobj.timelineMarkers.timelineMarker;
		
		var list = [];
		
		for(var t in timelineMarkers){
			
			var curTLM = timelineMarkers[t];
			list.push(curTLM._Attribs);
			
		}
		
		//MessageLog.trace(list);
		

		return list;
		
	}
	
	//obsolete
	
	var get_elements_by_tag = function( _tag ){
	
		var current_list = XMLobj;
		
		var elements_list = [];
		
		for(var i =0 ; i < current_list.length;i++){
			
			var curElement = current_list[i];
			
			
			if(curElement.children.length > 0){
				
				for(c in curElement.children){
					
					current_list.push(curElement.children[c])
				}
					
					
			}	
			
			if(curElement.objectName == _tag){
				
				elements_list.push(curElement);
				
			}
		
		}	
		
		return elements_list;
		
	}
	
	

}

		
	
	
  
