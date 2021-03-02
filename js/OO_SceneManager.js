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
OO.sg_path = "P:/projects/billy/sg_exports/"

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
	
	////MessageLog.trace("Expiew");

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
	
	////MessageLog.trace("PULL PSD FUNCTION");
	
	var S = new OO.SceneManager();	
	
	S.context.set_context_type('Shotgun');	
	
	S.context.set_library_path(OO.library_path);
	
	S.load_breakdown('csv');
	
	S.portals.load_from_scene();

	for(var p = 0 ; p < S.portals.list.length; p++){
		
		var cportal = S.portals.list[p]
		
		var linked_asset = S.assets.get_asset_by_code(cportal.code);
		
		if(cportal.psd_exist()){
					
			////MessageLog.trace("CODE");
			
			////MessageLog.trace(cportal.code);

			S.portals.pull(cportal,'psd');		
	
			var full_svg_path = S.context.get_svg_path(linked_asset);
			
			var full_psd_path = S.context.get_psd_path(linked_asset);
			
			MessageLog.trace("SVG_PATH : ");
			
			MessageLog.trace(full_svg_path);
			
			// if the bg has cadres that match the shot name. 
			
			var bg_cadre = S.load_cadre(full_svg_path);
			
			var bg_psd_cadre = S.load_cadre_from_psd(full_psd_path)
		
			if(bg_cadre!=false){
				
				S.trees.fit_cadre_to_camera(cportal.tree.peg,bg_cadre);
				
			}else{
				
				//we compensate the bg secu
				
				S.trees.scale_to_camera(cportal.tree.peg);
			}
					
		}

	}	
	
}

function map_nodes(){
	
	
	var selection = OO.doc.selectedNodes;
	
	var S = new OO.SceneManager();	
	
	var ntree = S.trees.add_tree_module("test",selection);
	
	//ntree.add_key_node(selection[0],"TOP_PEG");
	
	
}

function show_layer_ID(){
	
	var S = new OO.SceneManager();	
	
	var selection = OO.doc.selectedNodes;
	
	MessageLog.trace(S.trees.get_node_smlayerid(selection[0]));
	
	MessageBox.information(S.trees.get_node_smlayerid(selection[0]));
	
}

function select_tree_nodes(){
	
	
	var S = new OO.SceneManager();	
	
	S.trees.load_trees_from_scene();
	
	var test_tree = S.trees[0]; 
	
	//S.trees.select_tree_nodes = function(test_tree)
	
	
}




function create_portals(_type){
	
	var S = new OO.SceneManager();	
	
	S.context.set_context_type('Shotgun');	
	
	S.context.set_library_path(OO.library_path);	
	
	S.load_breakdown('csv');
	
	var target_backdrop = false;
	
	var target_composite = false;
	
	
	switch(_type){
		
		case ('bg'):
		
			target_backdrop = S.get_backdrop_by_name('BG');
			target_composite = OO.doc.getNodeByPath("Top/BG-C");
		
		break; 
		
		case('Character'):
		
			target_backdrop = S.get_backdrop_by_name('ANIM');
			target_composite = OO.doc.getNodeByPath("Top/ANIM-C");
		
		break;
		

	}
	
	if(target_backdrop == false){
		
		bg_backdrop = {x:0,y:0};
		
	}

	var point = {
		x:target_backdrop.x + 400,
		y:target_backdrop.y + 400 
	}
	
	if(target_composite != undefined){
		
		S.create_asset_portals(_type,point,target_composite);
		
	}


	
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

