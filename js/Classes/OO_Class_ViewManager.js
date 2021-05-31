// CLASS OO_ViewManager

//MessageLog.trace("CLASS OO_ViewManager");

OO.ViewManager = function(_S){

	var read_image_info_bat = "P:\\pipeline\\alexdev\\proto\\OO_SceneManager_proto\\bin\\read_image_infos.bat";
	
	//reference to the singleton
	var S = _S;
	
	if(_S == ""){
	
		S = new OO.SceneManager();
	
	}
	
	this.noviews = true;
	
	
	var list_of_views = [];
	
	var output_dir = "";
	

	this.load = function(_stage){
		
			//MessageLog.trace("ViewManager Load");
		
			var TLM_list_of_views=_stage.get_TLM();
			
			if(TLM_list_of_views.length == 0){
				
				//MessageLog.trace('no views detected in the scene');

				S.log.add("no views detected" ,"error")

				MessageBox.alert("no views detected");
				
				this.noviews = true;
				
				return; 
				
			}else{
				
				this.noviews = false;

			
			}
			
			

			for(var t in TLM_list_of_views){
				
				var curTLM = TLM_list_of_views[t];
				
				if(curTLM != undefined){
					
					if(isViewName(curTLM.name)){
						
						var nview = new OO.View();
						
						nview.load(TLM_list_of_views[t]);
						
						// see class view for processing of the marker note content
						
						list_of_views.push(nview);
					
					}
					
				}
				
			}
			
	}
	
	var isViewName = function (TLM_name){
		
		var split1 = TLM_name.split("_");
		
		if(split1[0] == "VIEW"){
			
			return true;
		
		}
		
		return false;
		

		
	}
	
	this.set_output_dir = function(_path){
		
		output_dir = _path;
	}
	
	var get_export_dir = function(view){
		
		//if(view.direct_path != false){
			
			//return  "P:/"+view.direct_path;
			
		//}
		
		return  output_dir+"/"+view.asset+"/"+view.task+"/";

		
	}
	
	var get_export_path = function(view){
		
		return get_export_dir(view) + view.get_file_name();
		
	}

	var selectedViews = [];
	

	this.export_views = function(){
	
		for(var v in list_of_views){
			
				var CV = list_of_views[v];
				
				if(CV.is_selected){
					
					var final_path = get_export_dir(CV) + CV.get_file_name();
					
					var asset_dir = new $.oFolder(get_export_dir(CV)).create();
		
					//openHamrony method of oScene : exportLayoutImage(path, includedNodes, exportFrame,exportCameraFrame,exportBackground,frameScale)
					$.scene.exportLayoutImage(final_path,[],CV.exportFrame,CV.exportBackground,CV.exportCameraFrame,CV.frameScale);
					
					//QUICK TEST OF JHONIE BAT SCRIPT

					S.log.add("EXPORT MARKER" ,"process");
					
					var project_name = "billy"; 
					
					var asset_name = CV.asset;
					var version_name = CV.version;
					var file_path = final_path;
					var task_name = CV.task;
					var task_status = "psr";
					
					var bat_file = 'P:/pipeline/extra_scripts/python3.x/pnguploader/bin/pngupload.bat';
					
					var command_string = '"'+bat_file+'" -p "'+project_name+'" -a "'+asset_name+'" -f "'+file_path+'"  -n "'+version_name+'" -t "'+task_name+'" -s "'+task_status+'"';
					
					S.log.add(command_string ,"arguments")
					
					var process_export = new Process2(command_string );           // create process from single string;
					
					var launch = process_export.launch();
					var error = process_export.errorMessage();

					S.log.add(process_export ,"process")
					S.log.add(launch ,"process")
					S.log.add(error ,"process")
			
				
					
					
				
				}
				
			
		}
		
		
	}

	this.init_camera = function(){

		var node_path = "Top/Camera_Peg";
		node.setTextAttr(node_path, "POSITION.X", frame.current(),0);
		node.setTextAttr(node_path, "POSITION.Y", frame.current(),0);							
		node.setTextAttr(node_path, "SKEW", frame.current(),0);				
		node.setTextAttr(node_path, "ROTATION.ANGLEZ", frame.current(),0);				
		node.setTextAttr(node_path, "SCALE.XY", frame.current(),1);				
		node.setTextAttr(node_path, "SCALE.X", frame.current(),1);				
		node.setTextAttr(node_path, "SCALE.Y", frame.current(),1);		

	}


	this.get_image_dimentions = function (_image_file_path){

		//don't work in batch

		var file_test;

		var txt_file  = this.create_image_dimention_txt_for_image_file(_image_file_path);
		//MessageLog.trace(Object.getOwnPropertyNames(infos) );

		MessageLog.trace(txt_file);
		MessageLog.trace(txt_file);

		var dimentions = {
			height : 10, 
			width: 10
		}

		return dimentions

	}

	this.create_image_dimention_txt_for_image_file = function(_image_file_path){

		var command_line = format_dimention_txt_creation_command_string(_image_file_path);

		// uses image magick

		//test "P:pipelinealexdevprotoOO_SceneManager_protoinead_image_infos.bat" "P:/projects/billy/library/boxanim/assets/Character/ch_jack/png/ch_jack.png"

		S.log.add("creating dimention txt","file")
		S.log.add(command_line,"arguments")

		var process_create_txt = new Process2(command_line);
		var launch = process_create_txt.launchAndDetach();
		var errors = process_create_txt.errorMessage();
		
		S.log.add("launch  : "+launch,"process")
		S.log.add("errors : "+errors,"process")
		S.log.add( process_create_txt,"process")

		return _image_file_path+".txt";


	}

	function format_dimention_txt_creation_command_string(_image_file_path){
		
		var dimention_txt_creation_command_string = '"'+read_image_info_bat+'" "'+_image_file_path+'"';

		return dimention_txt_creation_command_string;

	}
	
	
	this.export_currentframe_png_to = function(_file_path,_frameScale){

			// we set the camera to 0 to avoid any weird image dimentions
			this.init_camera();

			
			var path_object = parse_path_object(_file_path)

			var params = new LayoutExportParams();

			params.renderStaticCameraAtSceneRes = true;
			params.fileFormat = 'PNG4'
			params.borderScale = _frameScale;
			params.exportCameraFrame = false;
			params.exportAllCameraFrame = false;
			params.filePattern = path_object.file_bare;
			params.fileDirectory = path_object.folder_path;
			params.whiteBackground = false;
			params.whiteBackground = false;
			params.node = $.scene.root;
			params.frame = frame.current();
			params.layoutname = path_object.file_bare;

			var exporter = new LayoutExport();
			exporter.addRender(params);

			if (!exporter.save(params)){

				throw new Error(S.log.add("failed to exportlayer at location "+_file_path,"error"));	

			}else{

				S.log.add("creating txt dimention file "+_file_path+".txt","file")
				//we create the dimention txt file to be red later at importation step
				var exported_image = new OO.ImageFile(_file_path);
				exported_image.create_dimention_txt_file()

			}



	}	

	function parse_path_object(_file_path){
	
		var str = _file_path+''; 
		var split = str.split("/");

		var file = split[split.length-1]
		var bare  = file.split('.')[0];
		var extension = file.split('.')[1];
		var split2 = str.split(file)[0];

		var return_obj = {
			file_name : file,
			folder_path : split2,
			file_bare:bare,
			file_extension:extension
		}
		return return_obj;
	
	}

	this.parse_dimention_txt = function(_file_path){

		//P:/projects/billy/library/boxanim/assets/Character/ch_jack/png/ch_jack.png PNG 1920x1080 1920x1080+0+0 8-bit sRGB 272985B 0.000u 0:00.023


	}

	
	this.write_resolution_txt = function(_path,_frameScale){
		
		var txt_path = _path+".txt"
		
		var reso_file = new $.oFile(txt_path);
		
		var width = Math.floor(1920*_frameScale);
		
		var height =  Math.floor(1080*_frameScale);
		
		var content = width+'\n'+height;

		reso_file.write(content);           // write line to file
		
	}



	this.get_views = function(){
		
			return list_of_views; 
		
	}
	
	this.InputDialog = function(){
		
		var dialog = new Dialog();
		dialog.title = "Export Views";
		dialog.width = 600;
		
		var CB_list = [];
		
		for (var v in list_of_views){
			
			var curView = list_of_views[v];

			var Vpath = get_export_path(curView);
			
			var VCB = new CheckBox();
			VCB.checked = false;
			VCB.text = curView.name+"  Frame  "+curView.exportFrame+"  -->  "+Vpath;
			dialog.add(VCB)
			
			CB_list.push(VCB);
			
		}	
		
		if ( dialog.exec() ){
			
			for (var v in list_of_views){
				
				var curView = list_of_views[v];
				
				curView.is_selected = CB_list[v].checked;
				
			}				

			return true;
			
		}
		
	}
	
  
}