

OO.Phoneme = function (_source_phoneme){
	
	var source_phoneme = _source_phoneme; 
	
	this.get_billy_phoneme = function(){
		
		var billy_phonem = convert_to_billy_phoneme()
		
		return billy_phonem;
		
	}
	
	function convert_to_billy_phoneme(){
		
		var prestonBlair_index = get_preston_blair_index(); 

		return billy_phonemes[prestonBlair_index];

		
	}
	
	function get_preston_blair_index(){
		
		var index = prestonBlair_phonemes.indexOf(source_phoneme)
		
		if(index == -1){
			return 0; 
		}
		return index;
		
	}

	
	//                     index  0        1            2             3    4   5          6       7    8
	var billy_phonemes        = ["B_M_P","EE_I_ZS_T_R","EE_I_ZS_T_R","A" ,"O","U_OU_EUH","F_V"  ,"AI","NEUTRAL"];
	var prestonBlair_phonemes = ["MBP"  ,"etc"        ,"E"          ,"AI","O","U"       ,"FV"   ,"L" ,"rest"   ]
	
	// rhubarb doc here for prestonBalir mapping : https://github.com/DanielSWolf/rhubarb-lip-sync
	
	
}