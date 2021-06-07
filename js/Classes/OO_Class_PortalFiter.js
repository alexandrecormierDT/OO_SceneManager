OO.PortalFiter  = function(_S){

    var S = _S; 

    var current_shot = S.context.get_shot(); 

    this.set_current_shot = function(shot){

        current_shot = _s

    }

    this.fit_portal_to_camera = function(_portal){

        var svg_path =_portal.get_path('svg');
        
        //old bg portals might not have svg path so we assert them py their psd
        if(svg_path == false || svg_path == ""  || svg_path == "false" ){
            if(psd_path != false || psd_path != ""  || psd_path != "false" ){
                svg_path = S.context.convert_psd_path_to_svg_path(psd_path)
            }
        }


        //we instaciate the cadre class
        S.svg_reader.set_path(svg_path);
        var shot_cadre = S.svg_reader.get_layout_cadre_for_shot(current_shot)

        //fetch portal nodes
        var current_portal_tree =_portal.get_tree()
        var portal_peg = current_portal_tree.get_key_node("PORTAL_PEG");

        //we apply the transformation
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