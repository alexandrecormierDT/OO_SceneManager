
OO.aujourdhui = function(){
	
	var date1 = new Date();

	var dateLocale = date1.toLocaleString('fr-FR',{
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'});

	return dateLocale;	
	
}



//FILTERS

OO.filter_string =function(_str){
	
	var sanitizer = new OO.Sanitizer();  
	return  sanitizer.clean_string_general(_str); ;

}


function log_test(){
	
	var S = new OO.SceneManager();	
	
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/log_test.txt");	
	
	S.log.add("test test","INFO");
	S.log.add("test test2","INFO");
	S.log.add("test test3","INFO");
	S.log.save();
	
}


function get_unique_id(){

	var k = Math.floor(Math.random() * 10000000);
	var m =k.toString();	
	return m ;


}





// SCRIPT HELP 

function show_scene_infos(){
	
	var S = new OO.SceneManager();	

	S.context = new OO.Context(this,"Shotgun");	
	
	S.context.set_from_scene_path();
	
	S.write_scene_path_backdrop();
	
	MessageBox.information(S.context.get_scene_path());
	
}


function write_scene_journal(){
	
	var S = new OO.SceneManager();	
	
	S.context = new OO.Context(this,"Shotgun");	
	S.context.set_from_scene_path();
	S.write_scene_path_backdrop();
	S.log.create_new_log_file("P:/projects/billy/pre_shotgun/batch_pool/logs/journal.html");
	
	var scene_path = S.context.get_scene_path();
	
	var message = "";
	
	var dialog = new Dialog();
	dialog.title = "SCENE JOURNAL (no accents)";
	dialog.width = 900;
	
	var userInput = new TextEdit();
	userInput.text = ""
	dialog.add( userInput );
		
	if (dialog.exec()){
		
		message = OO.filter_string(userInput.text);
		S.log.add(message,"user message");
		S.add_entry_to_scene_journal(message)
		
	}

}


// scripts preferences for dialog prefill

function print_script_prefs(_script_name,_pref_object){
	
	var note_name = "pref_"+_script_name;
	node.add("Top",note_name,"NOTE");
	var pref_note = OO.doc.getNodeByPath(note_name);
	var json_string = JSON.stringify(_pref_object);
	pref_note.attributes.text.setValue(json_string);

}


function fetch_script_prefs(_script_name){
	
	var note_name = "pref_"+_script_name

	var pref_note = OO.doc.getNodeByPath(note_name);
	
	if(pref_note.hasOwnProperty('text')){
		
		var json_string = pref_note.text 
	
		var json_object = JSON.parse(json_string);
	
		return json_object;		
		
	}
	


}




// CLEANING THE SCENE 

function delete_misplaced_sub_files(){
	
	var S = new OO.SceneManager();	
	
	var current_scene_path = S.context.get_scene_path();
	S.scene_files.set_scene_path(current_scene_path);
	S.scene_files.elements.fetch_elements_dir_from_scene_directory();
	
	

}




// FETCHING DATAS 

function get_scene_asset_shot_list(){
	
	var S = new OO.SceneManager();		
	
	S.context = new OO.Context(this,"Shotgun");
	
	S.assets.load_project_assets();
	
	var billy_shot_list = S.assets.get_asset_shot_list("ch_billy");
	
	//////MessageLog.trace(billy_shot_list);
	
}








// B A T C H  F U N C T I O N S


include("P:/pipeline/alexdev/"+FOLDER+"/OO_SceneManager_"+FOLDER+"/js/OO_batch_functions.js");



// TO DO : UPDATE PORTALS 

function turnoff_burnin(){
	
	 node.setEnable("Top/BURNIN_FRAME",false);
	 node.setEnable("Top/BURNIN_SCENE_INFOS",false);
	 node.setEnable("Top/BURNIN_TIME_CODE",false);
	 node.setEnable("Top/BURNIN_SHOT_INFOS",false);
	 node.setEnable("Top/BURNIN_DATE",false);
	
}

function check_composite_to_2d(){
	
	node.setTextAttr("Top/CHECKC", "COMPOSITE_2D", frame.current(),"Y");
	//////MessageLog.trace("COMPOSITE_2D to Y ")
	//////MessageLog.trace(node.getTextAttr("Top/CHECKC", frame.current(),"COMPOSITE_2D"))
	
}




function orwell_sanity_check(){

	return (2+2 == 4); 
	
}


function increase_atq_filter_brightness(){
		
	 node.setTextAttr("Top/ATQ_BC","BRIGHTCONTRAST_BRIGHTNESS_ADJUSTMENT", frame.current(),100);
	

}


function set_atq_filter_brightness_to_hundred(){
		
	 node.setTextAttr("Top/ATQ_BC","BRIGHTCONTRAST_BRIGHTNESS_ADJUSTMENT", frame.current(),100);
	

}


function deadline_test(){

	var S = new OO.SceneManager();
	S.deadline.submit_render_job();

}

function batch_fix_camera_and_animatic_z(){
	
	////MessageLog.trace("SETTING CAMERA Z TO 12 AND SCALING ANIMATIC TO 0.5"); 
	
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



function sg_request_test(){

	var S = new OO.SceneManager();
	S.breakdown.load_current_shot_breakdown()
	S.breakdown.print_current_shot_infos()
	//MessageLog.trace(S.breakdown.get_asset_list())
}

function get_time_stamp_string(){
			
	var ts = Math.round(+new Date() / 10)+""
	//we keep it short
	var str = ts.substring(5);
	var str = ts
	return str;			
	
}