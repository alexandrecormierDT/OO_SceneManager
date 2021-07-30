//SCENE MANAGER MIRROR MASTER
//MessageLog.trace("SCENE MANAGER MIRROR - MASTER");

var FOLDER = "proto"; 
var ROOTPATH = ""

if(FOLDER == "proto"){
    ROOTPATH = System.getenv("SCENEMANAGER_PROTO")
}else{
    ROOTPATH = System.getenv("SCENEMANAGER_RELEASE")
}


include(ROOTPATH+"/js/OO_SceneManager.js");

