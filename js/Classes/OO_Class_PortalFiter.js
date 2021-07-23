OO.PortalFiter  = function(_S){

    var S = _S; 

    var current_shot = S.context.get_shot(); 

    this.set_current_shot = function(shot){
        current_shot = _s
    }


    this.get_current_cadre_from_psd= function(_psd_path){

        S.log.add('[PortalFiter] reading cadre directly from PSD layers with image magick','process')
        S.psd_reader.set_path(_psd_path);
        var cadre =   S.psd_reader.get_cadre_object_for_shot_code(current_shot)
        return cadre;
    }

    this.get_current_cadre_from_svg = function(_svg_path){

        S.log.add('[PortalFiter] reading cadre from svg','process')

        var svg_path =_svg_path
        
        //old bg portals might not have svg path so we assert them py their psd
        if(svg_path == false || svg_path == ""  || svg_path == "false" ){
            if(psd_path != false || psd_path != ""  || psd_path != "false" ){
                svg_path = S.context.convert_psd_path_to_svg_path(psd_path)
            }
        }

        //we instaciate the cadre class
        S.svg_reader.set_path(svg_path);
        var shot_cadre = S.svg_reader.get_layout_cadre_for_shot(current_shot)
        return shot_cadre; 

    }

    this.fit_portal_to_camera = function(_portal){

        var shot_cadre = this.get_current_cadre_from_psd(_portal.get_path('psd'))

		// in case no data where ectracted from the psd 
		if(shot_cadre == undefined){
			S.log.add("[PortalFiter] reading from psd issued no data , switching back to svg  ","rollback");	
			shot_cadre = this.get_current_cadre_from_svg(_portal.get_path('svg'))
		}

        //fetch portal nodes
        var current_portal_tree =_portal.get_tree()
        var portal_peg = current_portal_tree.get_key_node("PORTAL_PEG");

        //we apply the transformation
        if(shot_cadre != false && shot_cadre != undefined){
            if(shot_cadre.has_rect()==true){
                this.transform_peg_to_fit_cadre(portal_peg,shot_cadre);
                S.log.add("[PortalFiter] portal fit to camera ","success");				              
            }else{
                S.log.add("[PortalFiter] no cadre detected, scaling secu by default ","error");					
                this.scale_to_camera(portal_peg);
            }
        }
    }
    

	
	this.scale_to_camera = function(top_peg){
		
		var SECU_W = 2111.99;	
		var cam_w= 1920;
		var ratio = cam_w /SECU_W; 
		
		//INJECT SX
		top_peg.attributes.scale.x.setValue(ratio);
		
		//INJECT SY
		top_peg.attributes.scale.y.setValue(ratio);		
		
	}


    this.transform_peg_to_fit_cadre = function(top_peg,cadre){
		
		if(cadre.hasOwnProperty('rect')==true){

            S.log.add("[PortalFiter] input cadre Bg.width ( "+cadre.bg.width+" )","info");
            S.log.add("[PortalFiter] input cadre Bg.height ( "+cadre.bg.height+" ) ","info");
            S.log.add("[PortalFiter] input cadre rect.width ( "+cadre.rect.width+" )","info");
            S.log.add("[PortalFiter] input cadre rect.height( "+cadre.rect.height+" )","info");
            S.log.add("[PortalFiter] input cadre rect.x ( "+cadre.rect.x+" )","info");
            S.log.add("[PortalFiter] input cadre rect.y ( "+cadre.rect.y+" )","info");

			// camera dimmentions :
		
			var cam_w= 1920;
			var cam_h =1080;
			
			// cadre dimmentions :
			
			var cad_w = cadre.rect.width
			var cad_h = cadre.rect.height


			// scale ratio between cadre and camera

			var ratio = parseFloat(cam_w / cad_w);	
			

			// coords of the center of the full bg in camera scale
			
					
			var bg_w = cadre.bg.width 
			var bg_h = cadre.bg.height
			
			// we divide by ratio to get the bg space. 
			
			var bg_cx = parseFloat((bg_w/2)) ;
			var bg_cy = parseFloat((bg_h/2));
			var cad_x = parseFloat(cadre.rect.x) 
			var cad_y = parseFloat(cadre.rect.y) 		


			// camera_peg 
			
			var camera_peg = OO.doc.getNodeByPath("Top/Camera_Peg");
			var column3D = S.trees.get_linked_3D_columns(camera_peg)
			var next_3d_key = S.trees.get_next_3Dkey(column3D);
			
			// if the camera has no key the coords are probably at 0 but it's not 100% sure.. need to check this. 
			
			var cam_peg_x = 0;
			var cam_peg_y = 0;
			var cam_peg_z = 0;

			node.setTextAttr("Top/Camera_Peg", "ROTATION.ANGLEZ", frame.current(),0);		
			node.setTextAttr("Top/Camera_Peg", "ROTATION.ANGLEY", frame.current(),0);		
			node.setTextAttr("Top/Camera_Peg", "ROTATION.ANGLEX", frame.current(),0);
			
			if(next_3d_key != false){
				
				cam_peg_x = S.trees.toonboom_coords_to_float(next_3d_key[0]);
				cam_peg_y = S.trees.toonboom_coords_to_float(next_3d_key[1]);
				cam_peg_z = S.trees.toonboom_coords_to_float(next_3d_key[2]);	
	
				
			}else{
				
				//////MessageLog.trace("reseting camera");
				
				S.log.add("[PortalFiter] reseting camera coords","warning");
				
				//we actualy put the camera coords to 0 if there is no camera moves
				
				node.setTextAttr("Top/Camera_Peg","POSITION.SEPARATE",frame.current(),"On");
			
				//INJECT X
				camera_peg.attributes.position.x.setValue(0);
				
				//INJECT Y
				camera_peg.attributes.position.y.setValue(0);
				
				//INJECT Y
				camera_peg.attributes.position.z.setValue(0);	
				
				//INJECT ANGLE Z
				node.setTextAttr("Top/Camera_Peg", "ROTATION.ANGLEZ", frame.current(),0);		
				node.setTextAttr("Top/Camera_Peg", "ROTATION.ANGLEY", frame.current(),0);		
				node.setTextAttr("Top/Camera_Peg", "ROTATION.ANGLEX", frame.current(),0);		
			}

			// camera center 
			var cam_cx = parseFloat(cam_w/2) ;
			var cam_cy = parseFloat(cam_h/2) ;
			

			// position of the top up corner of the camera in bg space 
			var bg_cam_x = parseFloat(bg_cx - cam_cx);
			var bg_cam_y = parseFloat(bg_cy - cam_cy);
				
			 
			// CALCUL OF THE TRANSFORM 
			
			// X
			var bg_x = (bg_w/2) * ratio; 
			var cadre_distance_to_center_x = bg_x - (cad_x * ratio) 
			var cadre_distance_to_cam_x =  cadre_distance_to_center_x - (cam_w / 2)
			
			
			// Y
			var bg_y = (bg_h/2) * ratio; 
			var cadre_distance_to_center_y =  bg_y - (cad_y * ratio);
			var cadre_distance_to_cam_y =  cadre_distance_to_center_y - (cam_h / 2)

			
			//FINAL SCALE 
			var final_sx = ratio ;
			var final_sy = ratio ;
			
			// FINAL POSITIONS
			var RATIO_PIXEL_X = parseFloat(16/(1920/2))
			var RATIO_PIXEL_Y = parseFloat(12/(1080/2))
			
			var final_x =  parseFloat(cadre_distance_to_cam_x * RATIO_PIXEL_X) + parseFloat(cam_peg_x);
			var final_y =  parseFloat(-cadre_distance_to_cam_y * RATIO_PIXEL_Y)+ parseFloat(cam_peg_y);
			var final_z =  parseFloat(cam_peg_z);

			if(final_sx != NaN && final_sy != NaN && final_x != NaN && final_y != NaN){
			
				//INJECT X
				top_peg.attributes.position.x.setValue(final_x);
				
				//INJECT Y
				top_peg.attributes.position.y.setValue(final_y);
				
				//INJECT Y
				top_peg.attributes.position.z.setValue(final_z);
				
				//INJECT SX
				top_peg.attributes.scale.x.setValue(final_sx);
				
				//INJECT SY
				top_peg.attributes.scale.y.setValue(final_sy);
				
				S.log.add("[PortalFiter]  - reading camera peg coords  X = "+cam_peg_x+ " Y = "+cam_peg_y+"  Z = "+cam_peg_z,"process");
				S.log.add("[PortalFiter]  - changing bg scale SX = "+final_sx+ " SY = "+final_sy,"process");
				S.log.add("[PortalFiter]  - changing bg position X = "+final_x+ " Y = "+final_y+ " Z = "+final_z,"process");

			}else{

				S.log.add("[PortalFiter]  - NaN values X = "+final_x+ " Y = "+final_y+ " Z = "+final_z,"error");

			}
			

		
		
		}

	
		
	}







}

//MessageLog.trace("Class PortalPlacer ");