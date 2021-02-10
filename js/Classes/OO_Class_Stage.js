// CLASS OO_Stage
MessageLog.trace("CLASS OO_Stage")

OO.Stage = function (){
	
	
	var xmlelements; 

	var timelinemarkers = [];
	
	//var parser = new marknote.Parser(); 
	
	this.load_xml = function(xmlobject){
		
		xmlelements = xmlobject.children[0].children;
		
		timelinemarkers = get_elements_by_tag('timelineMarker');

	}
	
	
	this.get_timelinemarkers = function(){
		
		
		MessageLog.trace(timelinemarkers);
		return timelinemarkers;
		
	}
	
	var get_elements_by_tag = function( _tag ){
	
		var current_list = xmlelements;
		
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

		
	
	
  
