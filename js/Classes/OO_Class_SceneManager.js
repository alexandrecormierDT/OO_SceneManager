// CLASS OO_SceneManager

MessageLog.trace("CLASS OO_SceneManager imported")

OO.SceneManager = function(){
	
	
	//access to the xstage throuht the class 
	this.stage = new OO.Stage();

	//this.assets = new OO.AssetManager(this);
	//this.trees = new OO.TreeManager(this);
	this.views = new OO.ViewManager(this);
	
	this.init = function(){
		
		var xstageDOM =  getDOM();
		
		//we feed the scene xstage to the class
		this.stage.load_xml(xstageDOM);
		
		this.views.load(this.stage);
	
		
	}
	
	

	var getDOM = function(){
		
		//create an xml copy of the stage and parse it
		
		var dom_object ="";
	
		var stageFile = new $.oFile(OO.doc.stage);
		
		var content = stageFile.read();
		
		var newFile = new $.oFile(OO.doc.path+"/stage_dom.xml");		
		
		newFile.write(content,false);
		
		var xmlcontent =  newFile.parseAsXml();
		
		dom_object =  xmlcontent;
		
		return dom_object; 
		
	}
  
  
}


