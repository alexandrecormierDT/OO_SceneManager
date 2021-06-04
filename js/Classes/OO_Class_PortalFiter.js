OO.PortalFiter  = function(_S){

    var S = _S; 

    var current_shot = S.context.get_shot(); 

    this.set_current_shot = function(shot){

        current_shot = _s

    }

    this.fit_portal_to_camera = function(_portal){

        var portal_svg_path =_portal.get_path('svg');
        S.svg_reader.set_path(portal_svg_path);
        var shot_cadre = S.svg_reader.get_layout_cadre_for_shot(current_shot)
        var current_portal_tree =_portal.get_tree()

        var portal_peg = current_portal_tree.get_key_node("PORTAL_PEG");

        if(shot_cadre != false){
				
            if(shot_cadre.hasOwnProperty('rect')==true){
                
                S.trees.fit_cadre_to_camera(portal_peg,shot_cadre);
                S.log.add("[PortalPlacer] portal fit to camera ","success");				
                
            }else{
                
                S.log.add("[PortalPlacer] no cadre detected, scaling secu by default ","error");					
                S.trees.scale_to_camera(portal_peg);
            }

         }				

    }

}

MessageLog.trace("Class PortalPlacer ");