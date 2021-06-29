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

		var cadre = new OO.Cadre(_shot_code)

		var match = 0;
		var attr = XMLobj._Attribs
		
		if(attr.hasOwnProperty('height')==true){
			match++;
			cadre.bg.width = attr.width
			cadre.bg.height = attr.height
		}
		
		S.log.add("[SVGReader] Dimentions du psd","infos");
		S.log.add("[SVGReader] bg width = "+cadre.bg.width,"infos");
		S.log.add("[SVGReader] bg height = "+cadre.bg.height,"infos");
		
		var groups = XMLobj['g'];

		for(var i in groups){
			
			cg = groups[i]; 
			var group_title = cg.title;

			

			if(group_title=="CADRES"){
				
				S.log.add("[SVGReader] found group : "+group_title,"success");
				var gimages = cg['image']; 
				
				for(var i in gimages){
					
					var cimage = gimages[i]; 
					var image_title = "";
					var image_attributes = "";
					
					if(i == "title"){
							
						image_title = gimages[i];
						image_attributes = gimages._Attribs;
							
					}else{
						
						image_title = cimage.title;
						image_attributes = cimage._Attribs;
			
					}

					S.log.add("[SVGReader] cadre layer : "+image_title,"listing");
					
					if(image_title == _shot_code){
						
						S.log.add("[SVGReader] found layer ( "+image_title+" ) for shot  ( "+_shot_code+" )","success");
						var attr = image_attributes;
	

						cadre.rect.x = attr.x;
						cadre.rect.y = attr.y;
						cadre.rect.width= attr.width;
						cadre.rect.height= attr.height;

						S.log.add("[SVGReader] cadre ( "+image_title+" )","infos");
						S.log.add("[SVGReader] width ( "+attr.width+" )","infos");
						S.log.add("[SVGReader] height ( "+attr.height+" )","infos");
						S.log.add("[SVGReader] x ( "+attr.x+" )","infos");
						S.log.add("[SVGReader] y ( "+attr.y+" )","infos");
						
						match++;
						
					}
					
					if(cimage.title == "bg_size"){
						
						var attr = cimage._Attribs;

						var cadre = new OO.Cadre(cimage.title); 
			
						cadre.bg.width = attr.width
						cadre.bg.height = attr.height

						//MessageLog.trace("cadre")
						//MessageLog.trace(cadre)
						//MessageLog.trace(Object.getOwnPropertyNames(cadre))
					}
				}				
			}
		}
			
		if(match > 0){
			
			return cadre ;
			
		}else{

			S.log.add("[SVGReader] no cadre found for ( "+_shot_code+" )","error");

			return false ;
			
		}
	}

	
}

//MessageLog.trace("Class SVGReader ");