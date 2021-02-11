// CLASS OO_SceneManager

MessageLog.trace("CLASS OO_SceneManager imported")

OO.SceneManager = function(){
	
	
	//access to the xstage throuht the class 
	this.stage = new OO.Stage();

	//this.assets = new OO.AssetManager(this);
	//this.trees = new OO.TreeManager(this);
	this.views = new OO.ViewManager(this);
	
	this.init = function(){
		
		var xstageDOM = new $.oFile(OO.doc.stage).read();
		
		//we feed the scene xstage to the class
		this.stage.parse_xml(xstageDOM);
		
		this.views.load(this.stage);
	
		
	}
	
	
	//obsolete

	var getDOM = function(){
		
		//create an xml copy of the stage and parse it
		
		var dom_object ="";
	
		/*var stageFile = new $.oFile(OO.doc.stage);
		
		var content = stageFile.read();
		
		var newFile = new $.oFile(OO.doc.path+"/stage_dom.xml");		
		
		MessageLog.trace(newFile);
		
		newFile.write(content,false);*/
		
		var stageFile = new $.oFile(OO.doc.stage);
		MessageLog.trace(stageFile);
		var xmlcontent =  stageFile.parseAsXml();
		
		MessageLog.trace("XML OBJECT : ");
		MessageLog.trace(Object.getOwnPropertyNames(xmlcontent));
		MessageLog.trace(xmlcontent.children.length);
		MessageLog.trace(Object.getOwnPropertyNames(xmlcontent.children));
		
		
		dom_object =  xmlcontent;
		
		return dom_object; 
		
	}
  
  
}


