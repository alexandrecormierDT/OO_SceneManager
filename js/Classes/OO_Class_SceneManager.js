// CLASS OO_SceneManager

MessageLog.trace("CLASS OO_SceneManager imported")

OO.SceneManager = function(){
	
	
	//access to the xstage throuht the class 
	this.stage = new OO.Stage(this);
	this.assets = new OO.AssetManager(this);
	this.trees = new OO.TreeManager(this);
	this.views = new OO.ViewManager(this);
	this.context = new OO.Context(this,"Shotgun");
	this.portals = new OO.PortalManager(this);
	
	this.init = function(){
		
	}
	
	this.load_breakdown = function(inputtype){
		
		var asset_list=[];
		
		switch(inputtype){
			
			case ('json'):
			
				var shot = this.context.get_shot();
				
				var path = OO.sg_path+"/json/"+shot+".json";

				var json_string = new $.oFile(path).read();
				
				var obj_list = 	JSON.parse(json_string);
		
				MessageLog.trace(Object.getOwnPropertyNames(obj_list));
				
				asset_list = obj_list.Assets;
				
			
			break;
			
			case ('xml'):
			
				//XML
				
			break;
			
			case ('python'):
			
				//python sub process call 
				
			break;
			
		}
		
		for(var a in asset_list){
			
			var curItem = asset_list[a];
			
			MessageLog.trace(Object.getOwnPropertyNames(curItem));
			
			var asset_param = asset_list[a];
			
			this.assets.add(asset_param);
			
			
		}
		
	}
	
	this.create_asset_portals = function(){
		
		for(var a in this.assets.list){
			
			var cura = this.assets.list[a];
		
			var apath = cura.get_tpl_path();
			
			var final_path = OO.library_path+apath;

			var nodes = this.import_tpl(this.portals.tpl_path);
			
			var nportal = this.portals.add(cura.code,final_path);
		
		}

	}
	
	this.import_tpl = function(_path){
		
		//we create a group with a the path of the tpl as name. 
		var import_group =  OO.doc.root.addGroup(_path, false, false);    
		
		var myPasteOptions = copyPaste.getCurrentPasteOptions();
		
		var nodes = import_group.importTemplate(_path,false,true);
		
		return nodes; 

	}
	
	this.import_psd = function(_path){
		
		//importPSD(path, separateLayers, addPeg, addComposite, alignment, nodePosition){Array.<$.oNode>}
		var import_group =  OO.doc.root.addGroup(_path, false, false);  
		
		var nodes = import_group.importPSD(_path,true,false,false,"ASIS");  

		return nodes; 		
		
	}
	
	this.load_xstage= function(){
		
		var xstageDOM = new $.oFile(OO.doc.stage).read();
		
		//we feed the scene xstage to the class
		return this.stage.parse_xml(xstageDOM);

	}
	
	
	this.load_cadre = function(a){
		
		var shot = this.context.get_shot();
		
		var cadre ={};
		
		var apath = a.get_svg_path();
		
		var final_path = OO.library_path+apath;
		
		var svg_file_content = new $.oFile(final_path).read();

		XMLobj = OO.XML.parse(svg_file_content,{ preserveAttributes: true });
		
		MessageLog.trace(final_path);
		
		/*MessageLog.trace(Object.getOwnPropertyNames(XMLobj));
		MessageLog.trace("XMLobj.g");
		MessageLog.trace(Object.getOwnPropertyNames(XMLobj.g));
		MessageLog.trace(Object.getOwnPropertyNames(XMLobj.g['rect']));
		MessageLog.trace(Object.getOwnPropertyNames(XMLobj.g['rect'][0]));*/
		
		var groups = XMLobj['g'];
		
		for(var i in groups){
			
			cg = groups[i]; 
			
			MessageLog.trace(Object.getOwnPropertyNames(cg));
			
			if(cg._Attribs.id=="CADRES"){
				
				var rectangles = cg['rect']; 
				
				for(var i in rectangles){
					
					var crect = rectangles[i]; 
					
					var attr = crect._Attribs;

					if(crect._Attribs.id == shot){
							
						MessageLog.trace(crect._Attribs.id);	
							
						return crect._Attribs;
						
					}
						
				}				
			}

		}

	}
	
}


