OO.SVGReader = function(_S){

	var S = _S != undefined ? _S : new OO.SceneManager();

	this.get_cadre_for_shot = function(XMLobj,shot_code){
		
		var repport ="";
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
		
		S.log.add("[SVG] Dimentions du psd","process");
		S.log.add("[SVG] bg width = "+cadre.bg.width,"process");
		S.log.add("[SVG] bg height = "+cadre.bg.height,"process");
		
		var groups = XMLobj['g'];

			for(var i in groups){
				
				cg = groups[i]; 
				var group_title = cg.title;

				if(group_title=="CADRES"){
					
					S.log.add("[SVG] found group : "+group_title,"process");
					
					var gimages = cg['image']; 
					
					for(var i in gimages){
						
						var cimage = gimages[i]; 
						//S.log.add("cadre "+cimage.title,"process");
						
						var image_title = "";
						
						var image_attributes = ""
						
						if(i == "title"){
								
							image_title = gimages[i];
							image_attributes = gimages._Attribs;
								
						}else{
							
							image_title = cimage.title;
							image_attributes = cimage._Attribs;
				
						}
						
						if(image_title == shot_code){
							
							S.log.add("[SVG] found layer ( "+image_title+" ) for shot  ( "+shot_code+" )","process");
	
							var attr = image_attributes;
							
							var rect = {
								width:attr.width,
								height:attr.height,
								x:attr.x,
								y:attr.y
							}
								
								
							S.log.add("[SVG] cadre ( "+image_title+" )","process");
							S.log.add("[SVG] width ( "+attr.width+" )","process");
							S.log.add("[SVG] height ( "+attr.height+" )","process");
							S.log.add("[SVG] x ( "+attr.x+" )","process");
							S.log.add("[SVG] y ( "+attr.y+" )","process");

								
							cadre.rect = rect;
							
							match++;
							
						}
						
						// !! would actulay need to get this from the svg infos. not from a layer
						
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