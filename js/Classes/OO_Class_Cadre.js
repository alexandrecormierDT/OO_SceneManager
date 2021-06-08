// CLASS OO_Cadre

OO.Cadre = function (_name){

    var types = ["CameraIn","CameraOut","Character","Prop"]

    this.name = _name;
	this.rect = {x:0,y:0,width:0,height:0};
	this.bg = {width:0,height:0};
    this.type = "CameraIn";

    this.has_rect = function(){
        if(this.rect.x != 0 && this.rect.y != 0){
            return true; 
        }
        return false; 
    }

}

