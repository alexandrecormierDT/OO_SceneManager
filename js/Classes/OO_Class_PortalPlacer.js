OO.PortalPlacer = function(_S){

    var S = _S; 

    var current_shot = S.context.get_shot(); 

    this.set_current_shot = function(shot){

        
    }


    this.get_portal_bg_cadres_for_shot = function(_portal){

        var shot = S.context.get_shot();
        var svg_file = new $.oFile(svg_path);
        var full_svg_path =_portal.get_svg_path(linked_asset);
        var bg_cadre = this.load_cadre(full_svg_path);

        S.svg_reader.get_cadre_for_shot(XMLobj,current_shot)

    }



    this.get_portal_character_cadres = function(_portal){



    }

    this.load_cadre = function(svg_path){
        
        var shot = this.context.get_shot();
        var svg_file = new $.oFile(svg_path);
        
        if(svg_file.exists){
            
            var svg_file_content = svg_file.read();
            
            if(svg_file_content!=false && svg_file_content!="" && svg_file_content!=undefined){
                
                XMLobj = OO.XML.parse(svg_file_content,{ preserveAttributes: true });
                this.log.add("[SVG] searching layer cadre for ( "+shot+" ) ","process");
                var cadre = this.svg_reader.get_cadre(XMLobj,shot);
                
                // return false if no mathcing cadre with current shot where found in the svg
                
                if(cadre == false){
                    
                    this.log.add("[SVG] no cadre found for shot ( "+shot+" ) in ( "+svg_path+" ) ","error");

                }

                return cadre;

            }else{
                
                this.log.add("[SVG] problem with content of ( "+svg_path+" ) ","error");
                
                return false;	
                
            }			
            
        }else{
            
                this.log.add("[SVG] can't find svg file ( "+svg_path+" ) ","error");
                
                return false;			
            
        }

    }

    this.fit_portals_to_camera =  function(_node_list){
        
        // loop through bg portals and change thier layout peg transform in order to fit the cadre of the current shot with the scene camera. 
        
        var S = new OO.SceneManager();	
        
        S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/fit_bg_to_camera.html");
        S.portals.load_from_node_list(_node_list);
        S.context.set_context_type('Shotgun');	
        S.context.set_vault_path(OO.vault_path)
        S.assets.load_breakdown('csv');
        
        var portal_list = S.portals.get_list(); 
        
        for(var p = 0 ; p < portal_list.length; p++){
            
            var current_portal = portal_list[p]
            var current_portal_tree = current_portal.get_tree();
            var portal_peg = current_portal_tree.get_key_node("PORTAL_PEG");
            var linked_asset = S.assets.get_asset_by_code(current_portal.code);
            
            if(current_portal.png_exist()){
                
                var full_svg_path = S.context.get_svg_path(linked_asset);
                var bg_cadre = S.load_cadre(full_svg_path);
                
                if(bg_cadre != false){
                    
                    if(bg_cadre.hasOwnProperty('rect')==true){
                        
                        S.trees.fit_cadre_to_camera(portal_peg,bg_cadre);
                        S.log.add("[SVG] cadres detected ! ","success");				
                        
                    }else{

                        //we compensate the bg secu
                        
                        S.trees.scale_to_camera(portal_peg);
                        S.log.add("[SVG] no cadre detected , scaling secu by default ","error");					
                    }				
                    
                }else{
                    
                    
                }

                
                        
            }
        }	
        
        S.log.save();
        
    }


    this.fit_portal_to_camera =  function(_portal_object){
        
        // loop through bg portals and change thier layout peg transform in order to fit the cadre of the current shot with the scene camera. 
        
        var S = new OO.SceneManager();	
        
        S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/fit_bg_to_camera.html");
        S.portals.load_from_node_list(_node_list);
        S.context.set_context_type('Shotgun');	
        S.context.set_vault_path(OO.vault_path)
        S.assets.load_breakdown('csv');
        
        var portal_list = S.portals.get_list(); 
        
        for(var p = 0 ; p < portal_list.length; p++){
            
            var current_portal = portal_list[p]
            var current_portal_tree = current_portal.get_tree();
            var portal_peg = current_portal_tree.get_key_node("PORTAL_PEG");
            var linked_asset = S.assets.get_asset_by_code(current_portal.code);
            
            if(current_portal.png_exist()){
                
                var full_svg_path = S.context.get_svg_path(linked_asset);
                var bg_cadre = this.load_cadre(full_svg_path);
                
                if(bg_cadre != false){
                    
                    if(bg_cadre.hasOwnProperty('rect')==true){
                        
                        S.trees.fit_cadre_to_camera(portal_peg,bg_cadre);
                        S.log.add("[SVG] cadres detected ! ","success");				
                        
                    }else{

                        //we compensate the bg secu
                        
                        S.trees.scale_to_camera(portal_peg);
                        S.log.add("[SVG] no cadre detected , scaling secu by default ","error");					
                    }				
                    
                }else{
                    
                    
                }

                
                        
            }
        }	
        
        S.log.save();
        
    }





}