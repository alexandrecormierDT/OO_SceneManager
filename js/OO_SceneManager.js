//IMPORT CLASSES : 

//object to store class without conflict
var OO = {}

//OpenHamrony class
OO.doc = $.scn;


include("P:/pipeline/alexdev/"+folder+"/OO_SceneManager/js/Classes/OO_Class_SceneManager.js");
include("P:/pipeline/alexdev/"+folder+"/OO_SceneManager/js/Classes/OO_Class_Log.js");
include("P:/pipeline/alexdev/"+folder+"/OO_SceneManager/js/Classes/OO_Class_Stage.js");
//include("P:/pipeline/alexdev/"+folder+"/OO_SceneManager/js/Classes/OO_Class_Asset.js");
//include("P:/pipeline/alexdev/"+folder+"/OO_SceneManager/js/Classes/OO_Class_AssetManager.js");
//include("P:/pipeline/alexdev/"+folder+"/OO_SceneManager/js/Classes/OO_Class_Tree.js");
//include("P:/pipeline/alexdev/"+folder+"/OO_SceneManager/js/Classes/OO_Class_TreeManager.js");
//include("P:/pipeline/alexdev/"+folder+"/OO_SceneManager/js/Classes/OO_Class_Portal.js");
//include("P:/pipeline/alexdev/"+folder+"/OO_SceneManager/js/Classes/OO_Class_PortalManager.js");
include("P:/pipeline/alexdev/"+folder+"/OO_SceneManager/js/Classes/OO_Class_ViewManager.js");
include("P:/pipeline/alexdev/"+folder+"/OO_SceneManager/js/Classes/OO_Class_View.js");

OO.filter_string =function(str){

	var forbidden_char = [];
	
	var clean_str = str;
		
	return  clean_str;
	
	
}


OO.log = new OO.Log("scenemanager_");



function OO_main(){
	
	MessageLog.trace("oo_main");

}

function exportViews(){
	
	var S = new OO.SceneManager();
	
	MessageLog.trace("oo_main");
	
	S.init();
	S.views.set_output_dir("P:/projects/billy/views/");
	S.views.export_views();

	
}