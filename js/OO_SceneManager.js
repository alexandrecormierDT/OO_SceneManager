//IMPORT CLASSES : 

//object to store class without conflict
var OO = {}

//OpenHamrony class
OO.doc = $.scn;


// FOLDER should be declared in previous include : OO_SceneManager_proto or master    enable to switch from folders proto(dev) and master(for users) 


include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_SceneManager.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Log.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Stage.js");
//include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Asset.js");
//include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_AssetManager.js");
//include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Tree.js");
//include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_TreeManager.js");
//include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Portal.js");
//include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_PortalManager.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_ViewManager.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_View.js");

OO.filter_string =function(str){

	var forbidden_char = [];
	var clean_str = str;	
	return  clean_str;

}

OO.log = new OO.Log("scenemanager_");


function exportViews(){
	
	var S = new OO.SceneManager();
	
	MessageLog.trace("oo_main");
	
	S.init();
	S.views.set_output_dir("P:/projects/billy/views");
	if(S.views.InputDialog()){
		
		S.views.export_views();
		
	}

}