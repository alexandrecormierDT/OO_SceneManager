OO.Shot = function(_shot_code){
    //MessageLog.trace("New Object Shot ");
    this.code = _shot_code
    this.asset_code_list = []; 
    this.id = ""; 
    this.project =""; 
    this.sequence =""; 

    this.get_id = function(){
        return this.id;
    }
    this.get_code = function(){
        return this.code;
    }


}

//MessageLog.trace("Class Shot ");