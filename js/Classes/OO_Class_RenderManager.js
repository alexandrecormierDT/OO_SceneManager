// CLASS OO_SceneManager

//////MessageLog.trace("CLASS OO_SceneManager imported")

OO.RenderManager = function(_S){
	
	var S = _S;
	
	var movie_writer_node_path = "Top/RENDER_MOV"; 
	
	var frames_writer_node_path = "Top/RENDER_FRAMES"; 
	
	var movie_render_path = ""; 
	
	var frames_render_path = ""; 
	
	var movie_format; 
	
	var frames_format; 
	
	var movie_name;
	
	
	this.set_movie_writer_node_path = function (_mwnp){
		
		movie_writer_node_path = _mwnp
		
	}
	
	this.set_frames_writer_node_path = function (_fwnp){
		
		frames_writer_node_path = _fwnp
		
	}
	
	this.set_movie_render_path = function (_mp){
		
		movie_render_path = _mp
		
	}
	
	this.set_movie_render_path_to_frames_folder_with_name = function (_name){
		
		movie_name = _name;
		
		movie_render_path = get_scene_frames_folder()+_name; 
		
	}
	
	this.set_frames_render_path = function (_fp){
		
		frames_render_path = _fp
	}
	
	
	
	this.update_write_movie_render_path = function(){
		
		node.setTextAttr(movie_writer_node_path, "MOVIE_PATH",1,movie_render_path);
	
	}
	
	this.update_write_frames_render_path = function(){
		
		node.setTextAttr(frames_writer_node_path, "DRAWING_NAME",1,frames_render_path);
	
	}
	
	function get_scene_frames_folder(){
		
		return scene.currentProjectPath()+"/frames/";	
		
	}
	
	this.render_write_nodes = function(){
		
		try{
		
			$.scene.renderWriteNodes(false);
		
		}catch(error){
			
			S.log.add("[RENDER] "+error,"error");
			
		}
		
		
	}
	
	this.get_rendered_movie_path = function(){
		
		return movie_render_path+".mov";	
		
	}
	
	
}


