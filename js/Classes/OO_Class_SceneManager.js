// CLASS OO_SceneManager

MessageLog.trace("CLASS OO_SceneManager imported")

function OO_SceneManager(){
	
	//OpenHarmony Class
	var doc = $.scn;
	
	this.stage = new Stage(doc.stage.parseAsXml());
	this.assets = new OO_AssetManager(doc);
	this.trees = new OO_TreeManager(doc);
	this.views = new OO_ViewManager(doc);
	
	
  
  
}