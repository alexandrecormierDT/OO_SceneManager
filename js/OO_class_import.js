var ROOTPATH = ""
if(FOLDER == "proto"){
    ROOTPATH = System.getenv("SCENEMANAGER_PROTO")
}else{
    ROOTPATH = System.getenv("SCENEMANAGER_RELEASE")
}



// FOLDER should be declared in previous include : OO_SceneManager_proto or master    enable to switch from folders proto(dev) and master(for users) 

//CLASSES
include(ROOTPATH+"/js/Classes/OO_Class_Sanitizer.js");

//handy xml and svg parser 
OO.XML = require("P:/pipeline/extra_soft/pixl-xml-master/modified_xml.js");


// IMAGE FILE PARSER CLASS
include(ROOTPATH+"/js/Classes/utils/SVG_reader.js");



// SCENE MANAGER 

include(ROOTPATH+"/js/Classes/OO_Class_SceneManager.js");
include(ROOTPATH+"/js/Classes/OO_Class_Log.js");
include(ROOTPATH+"/js/Classes/OO_Class_Backdrop.js");
include(ROOTPATH+"/js/Classes/OO_Class_BackdropManager.js");

// PATHS

include(ROOTPATH+"/js/Classes/OO_Class_Context.js");

// RENDER


include(ROOTPATH+"/js/Classes/OO_Class_RenderManager.js");
include(ROOTPATH+"/js/Classes/OO_Class_DeadLineJob.js");
include(ROOTPATH+"/js/Classes/OO_Class_DeadLineJobSubmiter.js");

//BREAKDOWN 

include(ROOTPATH+"/js/Classes/OO_Class_ShotgridReader.js");
include(ROOTPATH+"/js/Classes/OO_Class_ShotgridLink.js");
include(ROOTPATH+"/js/lasses/OO_Class_Breakdown.js");
include(ROOTPATH+"/js/Classes/OO_Class_Shot.js");


// ASSETS

include(ROOTPATH+"/js/Classes/OO_Class_Asset.js");
include(ROOTPATH+"/js/Classes/OO_Class_AssetManager.js");
include(ROOTPATH+"/js/Classes/OO_Class_AssetDetector.js");

// POSING

include(ROOTPATH+"/js/Classes/OO_Class_Posing.js");
include(ROOTPATH+"/js/Classes/OO_Class_PosingManager.js");
include(ROOTPATH+"/js/Classes/OO_Class_PosingCreator.js");

// TREES

include(ROOTPATH+"/js/Classes/OO_Class_Tree.js");
include(ROOTPATH+"/js/Classes/OO_Class_TreeManager.js");
include(ROOTPATH+"/js/Classes/OO_Class_PSDReader.js");
include(ROOTPATH+"/js/Classes/OO_Class_PSDImporter.js");
include(ROOTPATH+"/js/Classes/OO_Class_TPL.js");
include(ROOTPATH+"/js/Classes/OO_Class_TPLManager.js");
include(ROOTPATH+"/js/Classes/OO_Class_TPLPasseport.js");

// PORTALS

include(ROOTPATH+"/js/Classes/OO_Class_Portal.js");
include(ROOTPATH+"/js/Classes/OO_Class_PortalManager.js");
include(ROOTPATH+"/js/Classes/OO_Class_PortalCreator.js");
include(ROOTPATH+"/js/Classes/OO_Class_Cadre.js");
include(ROOTPATH+"/js/Classes/OO_Class_SVGReader.js");
include(ROOTPATH+"/js/Classes/OO_Class_PortalFiter.js");
include(ROOTPATH+"/js/Classes/OO_Class_PortalReader.js");



// SETUP

include(ROOTPATH+"/js/Classes/OO_Class_SetupManager.js");
include(ROOTPATH+"/js/Classes/OO_Class_Setup.js");


// SCENE FILES

include(ROOTPATH+"/js/Classes/OO_Class_FileManager.js");
include(ROOTPATH+"/js/Classes/OO_Class_SceneFilesManager.js");
include(ROOTPATH+"/js/Classes/OO_Class_Stage.js");
include(ROOTPATH+"/js/Classes/OO_Class_ImageFile.js");

//ELEMENTS

include(ROOTPATH+"/js/Classes/OO_Class_ElementManager.js");
include(ROOTPATH+"/js/Classes/OO_Class_ElementFolder.js");
include(ROOTPATH+"/js/Classes/OO_Class_TVG.js");

//LIBRARY

include(ROOTPATH+"/js/Classes/OO_Class_LibraryManager.js");
include(ROOTPATH+"/js/Classes/OO_Class_TPL.js");

// MASTER CONTROLLERS

include(ROOTPATH+"/js/Classes/OO_Class_ScriptFolder.js");
include(ROOTPATH+"/js/Classes/OO_Class_TBstate.js");
include(ROOTPATH+"/js/Classes/OO_Class_MasterControler.js");
include(ROOTPATH+"/js/Classes/OO_Class_MCManager.js");


//AUTOLISPING 

include(ROOTPATH+"/js/Classes/OO_Class_StoryboardOutputManager.js");
include(ROOTPATH+"/js/Classes/OO_Class_VoiceTrack.js");
include(ROOTPATH+"/js/Classes/OO_Class_LipsDetectionManager.js");
include(ROOTPATH+"/js/Classes/OO_Class_LipsDetectionGenerator.js");
include(ROOTPATH+"/js/Classes/OO_Class_Lipsing.js");
include(ROOTPATH+"/js/Classes/OO_Class_Phoneme.js");
include(ROOTPATH+"/js/Classes/OO_Class_LipsInjector.js");
include(ROOTPATH+"/js/Classes/OO_Class_CharacterDetector.js");
include(ROOTPATH+"/js/Classes/OO_Class_HeadAngle.js");
include(ROOTPATH+"/js/Classes/OO_Class_LipsImporter.js");


// SHOTGUN

include(ROOTPATH+"/js/Classes/OO_Class_ViewManager.js");
include(ROOTPATH+"/js/Classes/OO_Class_View.js");
include(ROOTPATH+"/js/Classes/OO_Class_SGVersion.js");
include(ROOTPATH+"/js/Classes/OO_Class_SGBridge.js");
	