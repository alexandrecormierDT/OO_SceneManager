// CLASS OO_SceneManager

////////MessageLog.trace("CLASS OO_SceneManager imported")

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

	function format_batch_render_command(){

		var xstage_path = S.get_xstage_path(); 
		var harmony_path = S.get_harmony_path();
		var batch = ' -batch -scene '; 
		
		var command = '"'+harmony_path+'" '+batch+ ' "'+xstage_path+'"';

		return command; 

	}
	
	this.render_write_nodes = function(){

		S.log.add("RENDERING WRITE NODES","process")
		S.log.add("movie render path :" +movie_render_path,"path")
		var repport = $.scene.renderWriteNodes(false);
		S.log.add(repport,"process")
		
	}

	this.get_render_batch_command = function(){


		return format_batch_render_command();

	}

	this.render_in_background = function(){



	}
	
	this.get_rendered_movie_path = function(){
		
		return movie_render_path+".mov";	
		
	}
	
	this.get_unique_rendered_movie_path = function(){
		
		var serial = get_unique_id()
		return movie_render_path+"_"+serial+".mov";	
		
	}	

    function get_unique_id(){

		var k = Math.floor(Math.random() * 10000000);
		var m =k.toString();	
		return m ;


    }
}


