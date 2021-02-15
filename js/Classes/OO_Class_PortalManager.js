// CLASS OO_Portal

MessageLog.trace("CLASS OO_PortalManager")

OO.PortalManager = function(_S){
	
	this.tpl_path = "P:/pipeline/script_modules/Portals/Portal.tpl";
	
	var S = _S;
	
	this.list = [];
	
	this.load = function(){
		
	}
	
	this.add = function(code,path){
		
		var nportal = new OO.Portal(code,path);
		
		nportal.update_path();
		
		this.list.push(nportal);
			
	}
	

	
	this.update= function(){
		
	}
	
	this.remove= function(){
		
		
	}

  
}