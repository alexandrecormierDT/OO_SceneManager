// CLASS OO_Stage
MessageLog.trace("CLASS OO_Stage")


OO.Stage = function (){
	
	
	var XMLobj; 

	var timelinemarkers = [];
	
	//var parser = new marknote.Parser(); 
	
	this.load_xmlobj = function(xmlobject){
		
		if(typeof(xmlobject) == "object"){

			XMLobj = xmlobject.children[0].children;
			
			timelinemarkers = get_elements_by_tag('timelineMarker');
		
			return true;

		}else{
		
			return false;
			
		}
	}
	
	this.parse_xml = function(string){
		
		//external parser , on which i deactivated node.js functions to make it completely without dependencies
		//
		var XML = require("P:/pipeline/extra_soft/pixl-xml-master/modified_xml.js");
		XMLobj = XML.parse(string,{ preserveAttributes: true });

	}	
	
	var find_TLM_in_xml = function(str){
		
		
		
	}
	
	this.get_TLM = function(){
		
		
		var timelineMarkers = XMLobj.timelineMarkers.timelineMarker;
		
		var list = [];
		
		for(var t in timelineMarkers){
			
			var curTLM = timelineMarkers[t];
			MessageLog.trace(Object.getOwnPropertyNames(curTLM));
			MessageLog.trace(Object.getOwnPropertyNames(curTLM._Attribs));
			
			list.push(curTLM._Attribs);
			
		}
		

		return list
		
	}
	
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

		
	
	
  
