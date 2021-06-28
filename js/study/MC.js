

function TB_PL_MC(){
	// Sets a Suffix and recolors selected Columns 
	// 
	// Jrl 2010/12/10
	//steve 2014/2/11 Modified to work in 10.3.1
	
	
	var n = selection.numberOfNodesSelected();
	var i, posx, posy;
	var gray = new ColorRGBA( 200,210,210);
	var green = new ColorRGBA( 180,255,160);
	var yellow = new ColorRGBA( 255,240,170);
	var pink = new ColorRGBA( 255,195,235);
	
	var separator = ".."
	var suffix = (separator + "MC");	
	var c = yellow;

	scene.beginUndoRedoAccum("Mark Column");
	if (n > 0)
	{
		for (i = 0; i < n; ++i)
		{
			var selNode = selection.selectedNode(i);
			
			var nodeNamePath= selNode.split("/");
			var NodeName = nodeNamePath[nodeNamePath.length - 1];
			var oldNodeName = NodeName.split(separator);
			var newNodeName = (oldNodeName[0] + suffix);

			System.println("--> newNodeName:" + newNodeName   ); 

			var columnId = node.linkedColumn(selNode,"DRAWING.ELEMENT");
			var columnName = column.getDisplayName(columnId);
			var oldColumnName = columnName.split(separator);
			newColumnName = (oldColumnName[0] + suffix);
		
			System.println("--> newColumnName:" + newColumnName   ); 
					
			var elementKey = column.getElementIdOfDrawing(columnId);
			var elementName = element.getNameById(elementKey);
			var oldElementName =  elementName.split(separator);
			newElementName = (oldElementName[0] + suffix);
			
			System.println("--> newElementName:" + newElementName   ); 
			
			//Increment if node name exists
			extra = 1;
			underscore="_";
			while (node.subNodeByName(node.root(), newNodeName) != "") {
				System.println(" Node double found: "+newNodeName);
				newNodeName = NodeName + suffix + underscore + extra;
				++extra;
			}
			System.println(" Name for new node: "+newNodeName);
			
			//Increment if column name exists
			ccn=1;
			flag=0;
			extra=0;
			while (ccn>0) {
				if (flag>0) {
                         var newColumnName = oldColumnName[0] + suffix + underscore + extra;}
				ccn=checkColumnName(newColumnName);
				System.println(" Number of column doubles: "+ccn);
				if (ccn>0) {++extra;underscore="_";flag=1;}
			}
			System.println(" Name for new column: "+newColumnName);
			
			//Increment if element name exists
			cen=1;
			flag=0;
			extra=0;
			while (cen>0) {
				if (flag>0) {
                         var newElementName = oldElementName[0] + suffix + underscore + extra;}
				cen=checkElementName(newElementName);
				System.println(" Number of element doubles: "+cen);
				if (cen>0) {++extra;underscore="_";flag=1;}
			}
			System.println(" Name for new element: "+newElementName);
			
			
			if (node.rename(selNode, newNodeName)) {
				column.rename(columnId,newColumnName);
				element.renameById( elementKey, newElementName);

				column.setColorForXSheet(newColumnName, c) ;
			}
			
		}
	}
	scene.endUndoRedoAccum();
}



function checkColumnName( newColumnName) {
		//Checking new column name for doubles
		var numC =column.numberOf();
		var columnTwin = 0;
		for (count = 0; count < numC;++count)
		{
			checkingC = column.getName(count);
			System.println("Checking Column #" + count + " ("+checkingC+")"); 
			if (checkingC==newColumnName) {
				++columnTwin;
				System.println("--> Found Column name already in use: " + newColumnName   ); 
			}
		}
		if (columnTwin==0) { System.println("No Column name doubles detected." );  }
		
		return columnTwin;
}


function checkElementName( newElementName ) {
		//Checking new element name for doubles
		en=element.numberOf();
		var elementTwin = 0;
		for (count = 0; count < en; ++count)
		{
			elementId=element.id(count);
			System.println("Checking element #" + count + " " + element.getNameById(elementId)  ); 
			if (newElementName == element.getNameById(elementId)) {
				++elementTwin;
				System.println("--> Found Element name already in use: " + newElementName   ); 
			}
		}
		if (elementTwin==0) { System.println("No Element name doubles detected." );  }
				
		return elementTwin;
}

