// CLASS OO_Stage
MessageLog.trace("CLASS OO_Context")


OO.Context = function (_S,_type){
	
	//reference to the singleton
	var context_type = _type
	var S = _S;
	
	if(_S == ""){
	
		S = new OO.SceneManager();
	
	}
	
	
	this.get_episode = function(){
		
		switch(context_type){
			
			case("Shotgun"):
			
				return "ep201";
		
			break;
		
		}
		
	}
	
	this.get_shot = function(){
		
		switch(context_type){
		
			case("Shotgun"):
			
				return "ep201_pl010";
			
			break;		
		
		}
		
	}
	

}

		
	
	
  
