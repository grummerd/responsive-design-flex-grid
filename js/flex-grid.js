var FlexGrid = (function() {
	var objResponsiveDesignBoundaries=[], selector=[], debug_on=[], objImageWidth=[];
	
	var setBoundaries = function(boundaries) {
		if (typeof(boundaries)=="object" && typeof(boundaries)!=null) {
			objResponsiveDesignBoundaries = boundaries;
		}
	}
	
	var getBoundaries = function(i) {
		//console.log("Flexgrid objResponsiveDesignBoundaries[i]", i, objResponsiveDesignBoundaries[i]);
		//console.log("Flexgrid objResponsiveDesignBoundaries[i].2", objResponsiveDesignBoundaries[i][2]);
		return objResponsiveDesignBoundaries[i];
	}
	
	var setContainer = function(container) {
		if (typeof(container)=="object" && typeof(container)!=null) {
			selector = container;
		}
	}

	var getContainer = function(i) {
		return selector[i];
	}

	var setDebug = function(debug) {
		debug_on = debug;
	}

	var getDebug = function(i) {
		return debug_on[i];
	}

	var setImageWidth = function(img_width) {
		if (typeof(img_width)=="object" && typeof(img_width)!=null) {
			objImageWidth = img_width;
		}
	}
	
	var getImageWidth = function(i) {
		return	objImageWidth[i];
	}

	var arrangeItemsIntoColumns = function(j) {
		var objWidth=getBoundaries(j), strContainerSelector=getContainer(j);		
		var $selectorItems, strRemoveClass = "ui-block-a ui-block-b ui-block-c ui-block-d ui-block-";
		var lngColumn=0, lngBarrierWidth, dblColumnWidthPercent=100, dblImageWidthPercent=getImageWidth(j);
		var bolDebug=getDebug(j);
		//console.log("FlexGrid container[j]", j, "debug", bolDebug);
		console.log("FlexGrid "+strContainerSelector+" dblImageWidthPercent[j]", j, "width", String(dblImageWidthPercent)+"%", dblImageWidthPercent);
		// Item count. `> div` means div only first level children  
		var $container_children_original = $(strContainerSelector+' > div');
		if (bolDebug) { console.log("FlexGrid.arrangeItemsIntoColumns items count ", $container_children_original.length); }
		
		if (bolDebug) { console.log("FlexGrid.arrangeItemsIntoColumns columns vs width ", objWidth); }
		if (bolDebug) { console.log("FlexGrid.arrangeItemsIntoColumns viewport width", $(window).width() ); }
		if (bolDebug) { console.log("FlexGrid.arrangeItemsIntoColumns viewport height", $(window).height() ); }

		if ($(window).width() >= objWidth[4]) {
			lngColumn = 4; dblColumnWidthPercent=24; dblImageWidthPercent = dblImageWidthPercent - 20;
			if (bolDebug) { console.log("FlexGrid.arrangeItemsIntoColumns columns ", lngColumn); }
			//Using $.find is sloppy
			$container_children_original.find(".ui-body").css("font-size", "125%");
			$(strContainerSelector+' > div[class|="ui-block"]').css("width", String(dblColumnWidthPercent)+"%");
		} else if ($(window).width() < objWidth[4] && $(window).width() >= objWidth[3]) {
			lngColumn = 3; dblColumnWidthPercent=32.95; dblImageWidthPercent = dblImageWidthPercent - 13;
			if (bolDebug) { console.log("FlexGrid.arrangeItemsIntoColumns columns ", lngColumn); }
			//$container_children_original.find(".ui-body").css("min-height", "18em");
			$(strContainerSelector+' > div[class|="ui-block"]').css("width", String(dblColumnWidthPercent)+"%");
		} else if ($(window).width() < objWidth[3] && $(window).width() >= objWidth[2]) {
			lngColumn = 2; dblColumnWidthPercent=49.65; dblImageWidthPercent = dblImageWidthPercent - 10;
			if (bolDebug) { console.log("FlexGrid.arrangeItemsIntoColumns columns ", lngColumn); }
			$container_children_original.find(".ui-body").css("font-size", "1em");
			//$container_children_original.find(".ui-body").css("min-height", "14em").css("font-size", "1em");
			$(strContainerSelector+' > div[class|="ui-block"]').css("width", String(dblColumnWidthPercent)+"%");
		} else if ( $(window).width() < objWidth[2] ) {
			lngColumn = 1;
			if (bolDebug) { console.log("FlexGrid.arrangeItemsIntoColumns columns ", lngColumn); }
			$container_children_original.find(".ui-body").css("font-size", "1em");
			//$container_children_original.find(".ui-body").css("min-height", "14em").css("font-size", "1em");
			$(strContainerSelector+' > div[class|="ui-block"]').css("width", String(dblColumnWidthPercent)+"%");
		}
		
		if (lngColumn > 0) {
			//Remove dummy div(s)
			$container_children_original.each( function(j) {
				if (bolDebug) { console.log("FlexGrid.arrangeItemsIntoColumns j " + $( this ).html().length ); }
				if ( $( this ).html().length==0) {
					$( this ).remove();
				}
			});
			var lngTotalItemOriginal = $container_children_original.length;
			var strHeight = parseInt( $container_children_original.find(":eq(0)").css("height").replace('px', '') );
			var strWidth = parseInt( $container_children_original.find(":eq(0)").css("width").replace('px', '') );
			//row w/ only one column, lngColumn will be 1, but the barrier starts from 2
			//var strWidthBarrier =  objWidth[lngColumn];
			if (bolDebug) { console.log("FlexGrid.arrangeItemsIntoColumns objWidth", objWidth, lngColumn, objWidth[lngColumn]); }
			if (bolDebug) { console.log("FlexGrid.arrangeItemsIntoColumns strWidthBarrier", $(window).width() ); }
			if (bolDebug) { console.log("FlexGrid.arrangeItemsIntoColumns height of 1st item", strHeight); }
			if (bolDebug) { console.log("FlexGrid.arrangeItemsIntoColumns width ratio", Math.round((strWidth / $(window).width() ) * 100),"%"); }
			if (bolDebug) { console.log("FlexGrid.arrangeItemsIntoColumns Width of 1st item", strWidth); }

			if (bolDebug) { console.log("FlexGrid.arrangeItemsIntoColumns original # of items", lngTotalItemOriginal); }
			if (bolDebug) { console.log("FlexGrid.arrangeItemsIntoColumns calculated columns", lngColumn); }
			var lngColumnModulusCount;
			if (lngTotalItemOriginal<lngColumn) {
				lngColumnModulusCount = lngColumn - lngTotalItemOriginal;
			} else {
				lngColumnModulusCount = lngTotalItemOriginal % lngColumn;
			}
			
			if (bolDebug) { console.log("FlexGrid.arrangeItemsIntoColumns straggler items", lngColumnModulusCount); }
			if (lngColumnModulusCount>0) {
				for(var i=0;i<lngColumnModulusCount;i++) {
					$(strContainerSelector).append("<div></div>");
				}
				//update selector
				var $container_children = $(strContainerSelector+' > div');
				
				var lngTotalItemNew = $container_children.length;
				var strPercentage = ((1 / lngColumn) * 100) + "%";
				var lngRowCount = (lngTotalItemNew - lngColumnModulusCount) / lngColumn;
				lngRowCount = Math.floor(lngRowCount);
				if (bolDebug) { console.log("FlexGrid.arrangeItemsIntoColumns lngTotalItemNew ", lngTotalItemNew, "column modulus count", lngColumnModulusCount); }
				if (lngColumnModulusCount!=0) {
					var lngModulusColumnStart = lngTotalItemNew - lngColumnModulusCount;
					$container_children.each( function(j) {
						if (bolDebug) { console.log("FlexGrid.arrangeItemsIntoColumns j " + j, " modulus column start", lngModulusColumnStart); }
						if (j >= lngTotalItemNew - lngColumnModulusCount) {
							//Not a full row. This will right float modulus items
							if (bolDebug) { console.log("FlexGrid.arrangeItemsIntoColumns Adding dummy column with height: "+strHeight); }
							//$( this ).css("border", "1px solid dodgerblue").css("height", strHeight).addClass("dummydeleteme ui-block-");
							$( this ).addClass("dummydeleteme ui-block-").css("width", String(dblColumnWidthPercent)+"%").css("background-color", "transparent");
						}
					});
				}
				
			}
		}
		
		var tmpStyleSheet = getStyleSheet();
		$container_children = $(strContainerSelector+' > div');
		
		tmpRule = getContainer(j)+" img { width: "+String(dblImageWidthPercent)+"%; }";
		tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
		
		if (bolDebug) { console.log("FlexGrid.arrangeItemsIntoColumns container_children length ", $container_children.length); }
		if (lngColumn==4){
			if (bolDebug) { console.log("FlexGrid.arrangeItemsIntoColumns column # ", lngColumn, "Should be 4"); }
			//$selectorItems = $container_children.find(":nth-child(" + lngColumn + "n + 1)");
			$selectorItems = $(strContainerSelector+" > div:nth-of-type(" + lngColumn + "n + 1)");
			$selectorItems.removeClass(strRemoveClass).addClass("ui-block-a");
			//$selectorItems = $container_children.find(":nth-child(" + lngColumn + "n + 2)");
			$selectorItems = $(strContainerSelector+" > div:nth-of-type(" + lngColumn + "n + 2)");
			$selectorItems.removeClass(strRemoveClass).addClass("ui-block-b");
			//$selectorItems = $container_children.find(":nth-child(" + lngColumn + "n + 3)");
			$selectorItems = $(strContainerSelector+" > div:nth-of-type(" + lngColumn + "n + 3)");
			$selectorItems.removeClass(strRemoveClass).addClass("ui-block-c");
			//$selectorItems = $container_children.find(":nth-child(" + lngColumn + "n + 4)");
			$selectorItems = $(strContainerSelector+" > div:nth-of-type(" + lngColumn + "n + 4)");
			$selectorItems.removeClass(strRemoveClass).addClass("ui-block-d");
		} else if (lngColumn==3){
			if (bolDebug) { console.log("FlexGrid.arrangeItemsIntoColumns column # ", lngColumn, "Should be 3"); }
			$selectorItems = $(strContainerSelector+" > div:nth-of-type(" + lngColumn + "n + 1)");
			$selectorItems.removeClass(strRemoveClass).addClass("ui-block-a");
			$selectorItems = $(strContainerSelector+" > div:nth-of-type(" + lngColumn + "n + 2)");
			$selectorItems.removeClass(strRemoveClass).addClass("ui-block-b");
			$selectorItems = $(strContainerSelector+" > div:nth-of-type(" + lngColumn + "n + 3)");
			$selectorItems.removeClass(strRemoveClass).addClass("ui-block-c");
			tmpRule = getContainer(j)+" > div:first-child .ui-body { border-bottom-width: 1px; }";
			tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
			tmpRule = getContainer(j)+" > div + div .ui-body { border-left-width: 0; }";
			tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
		} else if (lngColumn==2){
			if (bolDebug) { console.log("FlexGrid.arrangeItemsIntoColumns column # ", lngColumn, "Should be 2" ); }
			$selectorItems = $(strContainerSelector+" > div:nth-of-type(" + lngColumn + "n + 1)");
			$selectorItems.removeClass(strRemoveClass).addClass("ui-block-a");
			$selectorItems = $(strContainerSelector+" > div:nth-of-type(" + lngColumn + "n + 2)");
			$selectorItems.removeClass(strRemoveClass).addClass("ui-block-b");
			tmpRule = getContainer(j)+" > div + div .ui-body { border-top-width: 1px; }";
			tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
			tmpRule = getContainer(j)+" > div:first-child .ui-body { border-bottom-width: 0; }";
			tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
			tmpRule = getContainer(j)+" > div:last-child .ui-body { border-left-width: 0; }";
			tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
		} else if (lngColumn==1){
			if (bolDebug) { console.log("FlexGrid.arrangeItemsIntoColumns column # ", lngColumn, "Should be 1" ); }
			$selectorItems = $(strContainerSelector+" > div:nth-of-type(" + lngColumn + "n + 1)");
			$selectorItems.removeClass(strRemoveClass).addClass("ui-block-a");
			tmpRule = getContainer(j)+" > div + div .ui-body { border-top-width: 1px; }";
			tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
			tmpRule = getContainer(j)+" > div:first-child .ui-body { border-bottom-width: 0; }";
			tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
			tmpRule = getContainer(j)+" > div:last-child .ui-body { border-left-width: 0; }";
			tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
		}
	}
	
	var getFileName = function(url) {
		url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
		url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
		url = url.substring(url.lastIndexOf("/") + 1, url.length);
		return url;
	}
	
	var getStyleSheet = function() {
		var tmpStyleSheet, tmpFileName, retVal, lngFileCount = $(document)[0].styleSheets.length;
		var strFileName = "flex-grid.css";
		for(var i=0;i<lngFileCount;i++) {
			tmpStyleSheet = $(document)[0].styleSheets[i];
			
			if (typeof(tmpStyleSheet.href)!="object") {
				//console.log("FlexGrid.getStyleSheet i ", i, "spreadsheet", tmpStyleSheet, tmpStyleSheet.href, typeof(tmpStyleSheet.href) );
				tmpFileName = getFileName(tmpStyleSheet.href);
				if (tmpFileName==strFileName) {
					retVal = tmpStyleSheet;
				}
			}
		}
		return retVal;
	}
	
	// Support arbitrary container div/section class
	// http://stackoverflow.com/a/31660282
	var loadStyleSheet = function(j) {
		var tmpRule, tmpStyleSheet = getStyleSheet();
		
		var container = getContainer(j);
		//css rules applicable to container div and descendant elements 
		tmpRule = container+" { display: block; margin: 0; text-align: center; width: 100%; font-size: 0.75em; margin: 0; padding: 0 1.5em; }";
		tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
		tmpRule = container+" .ui-body { text-align: left; border-color: #ddd; }";
		tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
		tmpRule = container+" div div div { text-align: center; }";
		tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
		tmpRule = container+" p { color: #777; line-height: 140%; }";
		//tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
		//tmpRule = container+" img { width: 135px; }";
		tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
		// Collapsing borders
		tmpRule = container+" > div + div .ui-body { border-top-width: 0; }";
		tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
		
		//pointless js method to refresh DOM
		$(document)[0].offsetHeight;
	}
	
	var init = function() {
		
		//Force all properties to be arrays
		var lngArraySize = $('meta[property="flex-grid\\:boundaries"]').length;
		var arrBoundary = [], arrSelector = [], arrDebug = [], imgWidth=[], strDebug, strTmp;
		
		//console.log("FlexGrid count ", lngArraySize);
		
		if (lngArraySize!=0) {
			for(var i=0; i<lngArraySize;i++) {
				//console.log("Flexgrid reading meta properties [i]", i);
				strTmp = $('meta[property="flex-grid\\:boundaries"]')[i].content;
				//console.log("Flexgrid boundary[", i, "] ", strTmp);
				arrBoundary.push( JSON.parse(strTmp) );
				//console.log("Flexgrid arrBoundary ", arrBoundary);
				arrSelector.push( $('meta[property="flex-grid\\:selector"]')[i].content );
				strDebug = $('meta[property="flex-grid\\:debug"]')[i].content;
				if (typeof(strDebug)=="string") {
					if (strDebug=="true") {
						arrDebug.push( true );
					} else {
						arrDebug.push( false );
					}
				}
				
				strTmp = $('meta[property="flex-grid\\:image-width"]')[i];
				if (typeof(strTmp)=="undefined") {
					imgWidth.push(100);
				} else {
					//Should be a float number from 0-100
					imgWidth.push(strTmp.content);
				}
				
			}
		}
		//console.log("Flexgrid arrBoundary ", arrBoundary, typeof(arrBoundary) );
		//console.log("Flexgrid arrSelector ", arrSelector, typeof(arrSelector));
		//console.log("Flexgrid arrDebug ", arrDebug, typeof(arrDebug));
		setBoundaries( arrBoundary );	
		setContainer( arrSelector );
		setDebug (arrDebug);
		setImageWidth(imgWidth);
		
		//if (debug_on) { console.log("FlexGrid.init Is debug mode? HTML meta property(", strDebug, ") internally(", debug_on, ")"); }
		//console.log("FlexGrid meta boundaries", objResponsiveDesignBoundaries, " containers", selector, "debug", debug_on);
		var container;
		for (var j=0; j<lngArraySize; j++) {
			container = getContainer(j);
			
			//Check whether selector element exists
			if (typeof( container )!="undefined") {
				if ( $( container ).length==1) {
					if ( getDebug(j) ) { console.log("FlexGrid.init START"); }
					arrangeItemsIntoColumns(j);
					loadStyleSheet(j);
					if ( getDebug(j) ) { console.log("FlexGrid.init END"); }
					$(window).on('resize orientationChange', {'j': j}, function(e) {
						var data = e.data;
						//For some unknown reason, only upon resize, j starts from 1
						//console.log("FlexGrid.init RESIZE START (data.j)", data.j);
						if ( getDebug(data.j) ) { console.log("FlexGrid.init RESIZE START (data.j)", data.j); }
						arrangeItemsIntoColumns(data.j);
						//loadStyleSheet(data.j);
						if ( getDebug(data.j) ) { console.log("FlexGrid.init RESIZE END (data.j)", data.j); }
					});
				}
			}
		}
	}
	
	return {
		init: init
	};
})();
FlexGrid.init();
