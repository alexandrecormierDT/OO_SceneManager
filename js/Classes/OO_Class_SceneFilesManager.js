// CLASS OO.Sub 

/*
 handle sub files in the tbscene folder


*/

OO.SceneFilesManager = function (_S){
	
	var scene_path = "";
	
	var S = _S;

	this.elements = new OO.ElementManager();
	
	this.xstage = new OO.Stage(); 
	
	this.palettes = ""; 
	
	this.set_scene_path = function(_scene_path){
		
		scene_path = _scene_path+"";
		
		this.elements.set_scene_path(scene_path);
		
	}
	
}