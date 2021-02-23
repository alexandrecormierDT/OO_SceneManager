// CLASS OO_Portal

MessageLog.trace("CLASS OO_PortalManager")

OO.PortalManager = function(_S){
	
	this.module_path = "P:/pipeline/script_modules/Portals/Portal.tpl";
	
	var S = _S;
	
	this.list = [];
	
	this.load = function(){
		
	}
	

	this.create_tree = function(){
		
		
		
	}
	
	this.add = function(_code,tpl_path,psd_path){ 
		
		var pnodes =  S.trees.import_tpl(this.module_path);
		
		var ntree = S.trees.add(_code,pnodes);
		
		//OO.Portal(_name,tpl_path,psd_path,_tree)
		var nportal = new OO.Portal(_code,tpl_path,psd_path,ntree);
		
		for (var n in pnodes){
		
			var cn = pnodes[n]; 
			
			if(cn.type == "SCRIPT_MODULE"){
				
				cn.attributes.tpl_path.setValue(tpl_path);
				cn.attributes.psd_path.setValue(psd_path);
				nportal.tree.script_module = cn; 
				
				cn.name = "PORTAL_"+_code
				 
			}
			
			if(cn.type == "GROUP"){
				
				nportal.tree.group = cn; 
				cn.name = _code;
				
			}	
			
			if(cn.type == "PEG"){
				
				nportal.tree.peg = cn; 
				cn.name = "LT_"+_code;
			}			
			
		} 
		
		var parent_group = nportal.tree.get_parent_group();
		
		nportal.tree.backdrop = parent_group.addBackdropToNodes(pnodes, "PORTAL", _code,new $.oColorValue("#000000ff"), 0, 0, 20, 20)

		this.list.push(nportal);
		
			
	}
	

	
	this.update= function(){
		
	}
	
	this.remove= function(){
		
		
	}

  
}