// S C E N E  M A N A G E R ---- TBSCRIPTS //

var OO = {}
$.batchMode = true;
OO.doc = $.scene;

var ROOTPATH = ""
if(FOLDER == "proto"){
    ROOTPATH = System.getenv("SCENEMANAGER_PROTO")
}else{
    ROOTPATH = System.getenv("SCENEMANAGER_RELEASE")
}

MessageLog.trace(ROOTPATH)

//CLASSES

include(ROOTPATH+"/js/OO_class_import.js");

//CONFIG

include(ROOTPATH+"/js/OO_config.js");


// FUNCTIONS 

include(ROOTPATH+"/js/Functions/OO_functions_palettes.js");
include(ROOTPATH+"/js/Functions/OO_functions_scene.js");
include(ROOTPATH+"/js/Functions/OO_functions_misc.js");
include(ROOTPATH+"/js/Functions/OO_functions_posing.js");
include(ROOTPATH+"/js/Functions/OO_functions_mc.js");
include(ROOTPATH+"/js/Functions/OO_functions_trees.js");
include(ROOTPATH+"/js/Functions/OO_functions_setup.js");
include(ROOTPATH+"/js/Functions/OO_functions_nodeview.js");
include(ROOTPATH+"/js/Functions/OO_functions_portals.js");
include(ROOTPATH+"/js/Functions/OO_functions_upload.js");
include(ROOTPATH+"/js/Functions/OO_functions_views.js");
include(ROOTPATH+"/js/Functions/OO_functions_lipsing.js");
include(ROOTPATH+"/js/Functions/OO_functions_tpl.js");


