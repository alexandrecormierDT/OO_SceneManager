//IMPORT CLASSES : 

//object to store class without conflict
var OO = {}

//OpenHamrony class
OO.doc = $.scn;

//handy xml parser 
OO.XML = require("P:/pipeline/extra_soft/pixl-xml-master/modified_xml.js");

OO.library_path = "P:/pipeline/alexDT/Harmony20/Context_library/";

OO.sg_path = "P:/pipeline/alexDT/Harmony20/Context_sg/"

// FOLDER should be declared in previous include : OO_SceneManager_proto or master    enable to switch from folders proto(dev) and master(for users) 

//CLASSES
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_SceneManager.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Log.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Stage.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Asset.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_AssetManager.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Tree.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_TreeManager.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Portal.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_PortalManager.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_ViewManager.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_View.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Context.js");



//FILTERS
OO.filter_string =function(str){

	var forbidden_chars = [];
	var clean_str = str;	
	return  clean_str;

}

//LOG
OO.log = new OO.Log("scenemanager_");





//SCRIPT : EXPIEW
function Expiew(){
	
	var S = new OO.SceneManager();
	
	//would need to add a waring message. 
	
	MessageLog.trace("Expiew");

	S.load_xstage();
	S.views.load(S.stage);
	S.views.set_output_dir("P:/projects/billy/views");
	
	if(S.views.noviews == false){
		if(S.views.InputDialog()){
			S.views.export_views();
		}		
	}


}

//SCRIPT : IMPORT BG
function Impog(){
	
	MessageLog.trace("Impog");
	
	var S = new OO.SceneManager();
	
	S.load_breakdown('json');
	
	for(var a in S.assets.list){
		
		var cura = S.assets.list[a];
		
		var apath = cura.get_tpl_path();
		
		var final_path = OO.library_path+apath;
		
		var asset_code = cura.get_code()
		
		switch(cura.get_type()){

			case ('bg'): 
			
				
				
				apath = cura.get_psd_path();
		
				final_path = OO.library_path+apath;
				

				var nodes = S.import_psd(final_path);
				
				var bg_tree = S.trees.add(asset_code,nodes)
	
				S.trees.arange_psd_node(bg_tree);
				
				
				var cadre = S.load_cadre(cura);
				
				S.trees.fit_to_camera(bg_tree,cadre);

			break; 
			
			case ('Character'):
			
				//S.import_tpl(final_path);
			
			break;
			
		}
		

	
		
	}


}

