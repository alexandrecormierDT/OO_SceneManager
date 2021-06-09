OO.ShotgridLink = function(_entity_object){

    var shot_object = ""; 
    var asset_object = ""; 
    var shot_page_code ="5721"; 
    var asset_page_code ="5722"; 
    var shotgrid_website = "https://ooolala.shotgunstudio.com/page/"; 

    this.set_shot_object = function(_so){

        shot_object = _so
    }

    this.set_asset_object = function(_ao){

        asset_object = _ao

    }


    this.get_shot_link = function(){

        //https://ooolala.shotgunstudio.com/page/5721#Shot_1373
        var link = shotgrid_website+shot_page_code+"#Shot_"+shot_object.get_id()
        return link;

    }

    
    this.get_asset_link = function(){

        //exemple
        //https://ooolala.shotgunstudio.com/page/5722#Asset_1611
        var link = shotgrid_website+asset_page_code+"#Asset_"+asset_object.get_id()
        return link;

    }

    this.get_html_asset_link = function(){

        return '<a href="'+ this.get_asset_link()+' >'+asset_object.get_code()+'</a>'
    
    }
    this.get_html_shot_link = function(){

        return '<a href="'+ this.get_shot_link()+' >'+shot_object.get_code()+'</a>'
    
    }

}