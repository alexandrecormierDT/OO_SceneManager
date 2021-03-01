//IMPORT CLASSES : 

//object to store class without conflict
var OO = {}

//OpenHamrony class
OO.doc = $.scn;

//handy xml and svg parser 
OO.XML = require("P:/pipeline/extra_soft/pixl-xml-master/modified_xml.js");

// SVG PARSER CLASS
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/utils/SVG_reader.js");
OO.SVG = new SVG_reader();

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
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_SetupManager.js");
include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/Classes/OO_Class_Setup.js");



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
	
	//would need to add a warning message. 
	
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




function load_shot_setup(){
	
	var S = new OO.SceneManager();	
	
	S.context = new OO.Context("Shotgun");
	
	S.context.set_library_path(OO.library_path);
	
	var shot_setup = S.setups.apply('shot');	

} 





function pull_psd(){
	
	MessageLog.trace("PULL PSD FUNCTION");
	
	var S = new OO.SceneManager();	
	
	S.context.set_context_type('Shotgun');	
	
	S.context.set_library_path(OO.library_path);
	
	S.load_breakdown('csv');
	
	S.portals.load_from_scene();

	for(var p = 0 ; p < S.portals.list.length; p++){
		
		var cportal = S.portals.list[p]
		
		var linked_asset = S.assets.get_asset_by_code(cportal.code);
		
		if(cportal.psd_exist()){
					
			MessageLog.trace("CODE");
			
			MessageLog.trace(cportal.code);

			S.portals.pull(cportal,'psd');		
	
			var full_svg_path = S.context.get_svg_path(linked_asset);
			
			
			
			// if the bg has cadres that match the shot name. 
			
			var bg_cadre = S.load_cadre(full_svg_path);
		
			if(bg_cadre!=false){
				
				S.trees.fit_cadre_to_camera(cportal.tree.peg,bg_cadre);
				
			}else{
				
				//we compensate the bg secu
				
				S.trees.scale_to_camera(cportal.tree.peg);
			}
					
		}

	}	
	
}

function create_portals(_type){
	
	var S = new OO.SceneManager();	
	
	S.context.set_context_type('Shotgun');	
	
	S.context.set_library_path(OO.library_path);	
	
	S.load_breakdown('csv');
	

	var bg_backdrop = S.get_backdrop_by_name('BG');
	
	if(S.get_backdrop_by_name == false){
		
		bg_backdrop = {x:0,y:0};
		
	}

	var point = {
		x:bg_backdrop.x + 400,
		y:bg_backdrop.y + 400 
	}

	var bg_composite = OO.doc.getNodeByPath("Top/BG-C");

	S.create_asset_portals(_type,point,bg_composite);
	
}


function empty_portals(_type){
	
	var S = new OO.SceneManager();	
	
	S.context.set_context_type('Shotgun');	
	
	S.context.set_library_path(OO.library_path);
	
	S.load_breakdown('csv');
	
	S.portals.load_from_scene();

	for(var p = 0 ; p < S.portals.list.length; p++){
	
		var cportal = S.portals.list[p]
		
		var linked_asset = S.assets.get_asset_by_code(cportal.code);
		
		if(linked_asset.get_type()== _type){
			
			S.portals.empty(cportal);
			
		}
		
				
	}
	
	
	
}

//SCRIPT : IMPORT BG
function Impog(){
	
	MessageLog.trace("Impog");
	
	
	var S = new OO.SceneManager();
	
	S.context = new OO.Context(this,"Server");
	
	S.load_breakdown('json');
	
	for(var a in S.assets.list){
		
		var cura = S.assets.list[a];
	
		var apath = S.context.get_tpl_path(cura);
	
		var final_path = OO.library_path+apath;
		
		var asset_code = cura.get_code();
		
		switch(cura.get_type()){

			case ('bg'): 
			
				apath = cura.get_psd_path();
		
				final_path = OO.library_path+apath;
				
				var nodes = S.trees.import_psd_grouped(asset_code,final_path);
				
				var bg_tree = S.trees.add(asset_code,nodes)
				
				S.trees.arange_psd_node(bg_tree);
				
				var bg_cadre = S.load_cadre(cura);
				
				if(bg_cadre!=false){
					
					S.trees.fit_cadre_to_camera(bg_tree,bg_cadre);
					
				}else{
					
					
					
				}
				

			break; 
			
			case ('Character'):
			
				//S.trees.import_tpl_grouped(asset_code,final_path);
			
			break;
			
		}
		

	
		
	}


}

