OO.BackdropManager = function(_S){

    var S = _S; 

	this.get_backdrop_by_name = function(bdname){

		var backdrops = $.scene.root.backdrops;
		var match = 0; 

		for(var b = 0 ; b < backdrops.length ; b++){
			if(backdrops[b].title == bdname){
				match++;
				return backdrops[b];
			};
		}
		
		if(match==0){
			
			return false;
		}
	}

	//native test
	function fetch_group_backdrops(_group_node_path){
		var backdrops_object_array = Backdrop.backdrops(_group_node_path);
		for(var i=0; i< backdrops_object_array.length; i++){
			current_backdrop = backdrops_object_array[i]; 
		}

	}
	

    this.delete_backdrop = function(_backdrop){

		//there is no delete function yet so we put the backdrop faraway
		_backdrop.x = 15000;
		_backdrop.y = 10000;
		_backdrop.w = 10;
		_backdrop.h = 10;
		_backdrop.title = "todelete";
		_backdrop.body = "";

    }

    this.change_backdrop_color = function(_backdrop,_color_object){

		_backdrop.color = _color_object;


    }
    this.change_backdrop_title = function(_backdrop,_title){

		_backdrop.title = _title;


    }	

}