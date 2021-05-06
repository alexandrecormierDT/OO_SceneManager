/*

	B A T C H      F U N C T I O N 
	
	OO_batch_functions.js
	
	these functions are called by js script in the batch directory

*/



function get_bg_preview_path(){
	
	var S = new OO.SceneManager();	
	
	S.context = new OO.Context(this,"Shotgun");	
	
	S.context.set_bg_preview_path(OO.bg_preview_path)
	
	return S.context.generate_bg_preview_render_path()
	
}

function batch_preview_bg(){
		
	import_project_settings();

	import_setup('shot');

	create_portals('bg');
	
	pull_("bg");
	
	fit_bg_to_camera();
	
	var saving = scene.saveAll();


}


// BG LAYOUT 

function batch_fix_camera_and_animatic_z(){
	
	//MessageLog.trace("SETTING CAMERA Z TO 12 AND SCALING ANIMATIC TO 0.5"); 
	
	var camera_path = "Top/Camera"; 
	var animatic_path = "Top/Animatic"; 

	var camera_offset_z =   node.getTextAttr(camera_path, frame.current(), "OFFSET.Z");
	
	if(camera_offset_z != 12){
		
		var camera_ratio = 12/camera_offset_z;
		
		node.setTextAttr(camera_path,"OFFSET.Z", frame.current(),12);
		node.setTextAttr(animatic_path,"SCALE.X", frame.current(),camera_ratio);
		node.setTextAttr(animatic_path,"SCALE.Y", frame.current(),camera_ratio);
		
	}
	
}



function batch_import_shot_setup(){
		
	//MessageLog.trace("BATCH IMPORT SHOT SETUP AND SET PROJECT SETTINGS ...");
	
	import_project_settings()

	import_setup('shot')
	
	var saving = scene.saveAll();
		
	//MessageLog.trace("scene was saved : "+saving);

}

function batch_import_anim_setup(){
		
	var S = new OO.SceneManager();	
	
	S.context = new OO.Context(this,"Shotgun");	
	
	S.context.set_from_scene_path();
	
	var video_name = S.context.get_shot();
	
	if(video_name == undefined){
		
		video_name = "output"; 
	}
	
	MessageLog.trace("output");
	
	S.render.set_movie_render_path_to_frames_folder_with_name("output");
	S.render.update_write_movie_render_path();
	
	var saving = scene.saveAll();

}



function batch_create_bg_portals(){
		
	//MessageLog.trace("CREATE BG PROTALS...");
	
	create_bg_portals();
	
	var saving = scene.saveAll();
		
	//MessageLog.trace("scene was saved : "+saving);

}


function batch_empty_update_pull_upload_bg(){
	
	empty_bg_portals()
	
	update_bg_portals_paths()
	
	pull_bg();
	
	scene.saveAll();
	
	upload_bg_preview_to_SG()
	
}

function  batch_empty_update_pull_upload_layout(){
	
	empty_bg_portals()
	
	update_bg_portals_paths()
	
	pull_bg();
	
	scene.saveAll();
	
	upload_layout_preview_to_SG()	
	
	
}

function batch_upload_layout(){
	
	upload_layout_preview_to_SG()
	
}


function batch_update_bg_paths(){
		
	//MessageLog.trace("BATCH UPDATE BG PATHS FROM VAULT ...");

	update_portals_paths_by_type('bg');

	var saving = scene.saveAll();
		
	//MessageLog.trace("scene was saved : "+saving);

}

function batch_empty_bg_portals(){
		
	//MessageLog.trace("BATCH EMPTY BG PORTALS...");
	
	empty_portals('bg')

	var saving = scene.saveAll();
}


function batch_pull_png_bg_portals(){
		
	//MessageLog.trace("BATCH PULL PNG ON BG PORTALS...");
	
	pull_('bg')
	
	var saving = scene.saveAll();

}

function batch_fit_bg_to_camera(){
		
	//MessageLog.trace("BATCH FIT BG TO CAMERA...");
	
	fit_bg_to_camera();
	
	var saving = scene.saveAll();	

}



function batch_create_anim_portals(){
		
	//MessageLog.trace("BATCH CREATE ANIM PORTALS...");

	create_anim_portals();

	scene.saveAll();
		
	//MessageLog.trace("scene was saved : "+saving);

}


function batch_pull_tpl_anim_portals(){
		
	//MessageLog.trace("BATCH PULL TPL ON ANIM PORTALS...");
	
	pull_scene_portal_tpl_by_asset_type('anim')
	
	var saving = scene.saveAll();
		
	//MessageLog.trace("scene was saved : "+saving);	

}






function batch_increase_atq_filter_brightness(){
		
	//MessageLog.trace("BATCH INCREASE ATQ FILTER BRIGHTNESS...");

	 node.setTextAttr("Top/ATQ_BC","BRIGHTCONTRAST_BRIGHTNESS_ADJUSTMENT", frame.current(),100);
	
	var saving = scene.saveAll();
		
	//MessageLog.trace("scene was saved : "+saving);	

}



	

