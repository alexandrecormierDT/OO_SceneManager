OO.SVGReader = function(_S){

	var S = _S != undefined ? _S : new OO.SceneManager();
	var SVG_file_path = ""; 
	var XMLobj = ""; 

	this.set_path = function(_path){

		SVG_file_path = _path;
		parse_svg_to_xml();

	}

	function parse_svg_to_xml(){

        var svg_file = new $.oFile(SVG_file_path);
        if(svg_file.exists){
            
            var svg_file_content = svg_file.read();
            if(svg_file_content!=false && svg_file_content!="" && svg_file_content!=undefined){
                
                XMLobj = OO.XML.parse(svg_file_content,{ preserveAttributes: true });

            }else{
                
                S.log.add("[SVGReader] problem with content of ( "+svg_path+" ) ","error");
                return false;	
                
            }			
            
        }else{
            
            S.log.add("[SVGReader] can't find svg file ( "+svg_path+" ) ","error");
            return false;			
            
        }

	}

	this.get_character_cadre_for_shot = function(shot_code){

			//todo
	}

	this.get_layout_cadre_for_shot = function(_shot_code){
		
		var cadre = {};
		var match = 0;
		var attr = XMLobj._Attribs
		
		if(attr.hasOwnProperty('height')==true){
			
			match++;
			var rect = {
				width:attr.width,
				height:attr.height
			}			
			cadre.bg = rect;
			
		}
		
		S.log.add("[SVGReader] Dimentions du psd","process");
		S.log.add("[SVGReader] bg width = "+cadre.bg.width,"process");
		S.log.add("[SVGReader] bg height = "+cadre.bg.height,"process");
		
		var groups = XMLobj['g'];

		for(var i in groups){
			
			cg = groups[i]; 
			var group_title = cg.title;

			if(group_title=="CADRES"){
				
				S.log.add("[SVG] found group : "+group_title,"process");
				
				var gimages = cg['image']; 
				
				for(var i in gimages){
					
					var cimage = gimages[i]; 
					var image_title = "";
					var image_attributes = ""
					
					if(i == "title"){
							
						image_title = gimages[i];
						image_attributes = gimages._Attribs;
							
					}else{
						
						image_title = cimage.title;
						image_attributes = cimage._Attribs;
			
					}
					
					if(image_title == _shot_code){
						
						S.log.add("[SVGReader] found layer ( "+image_title+" ) for shot  ( "+_shot_code+" )","process");
						var attr = image_attributes;
						
						var rect = {
							width:attr.width,
							height:attr.height,
							x:attr.x,
							y:attr.y
						}
							
						S.log.add("[SVGReader] cadre ( "+image_title+" )","process");
						S.log.add("[SVGReader] width ( "+attr.width+" )","process");
						S.log.add("[SVGReader] height ( "+attr.height+" )","process");
						S.log.add("[SVGReader] x ( "+attr.x+" )","process");
						S.log.add("[SVGReader] y ( "+attr.y+" )","process");

							
						cadre.rect = rect;
						
						match++;
						
					}
					
					if(cimage.title == "bg_size"){
						
						var attr = cimage._Attribs;
						
						var rect = {
							width:attr.width,
							height:attr.height,
						}
							
						cadre.bg = rect;
					}
						
				}				
				
			}

		}
			
		if(match > 0){
			
			return cadre ;
			
		}else{

			return false ;
			
		}

	}
	
}

MessageLog.trace("Class SVGReader ");