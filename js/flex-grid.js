var FlexGrid = (function() {
	var objResponsiveDesignBoundaries = {"2": "475", "3": "644", "4": "824"};
	var selector=".rwd-example", debug_on=false;
	
	var setBoundaries = function(boundaries) {
		if (typeof(boundaries)=="string") {
			objResponsiveDesignBoundaries = JSON.parse(boundaries);
		} else if (typeof(boundaries)=="object") {
			objResponsiveDesignBoundaries = boundaries;
		}
	}
	
	var getBoundaries = function() {
		return objResponsiveDesignBoundaries;
	}
	
	var setContainer = function(container) {
		if (typeof(container)!="undefined") {
			selector = container;
		}
	}

	var getContainer = function() {
		return selector;
	}

	var setDebug = function(strDebug) {
		debug_on = strDebug;
	}

	var arrangeItemsIntoColumns = function() {
		var objWidth=getBoundaries(), strContainerSelector=getContainer();		
		var $selectorItems, strRemoveClass = "ui-block-a ui-block-b ui-block-c ui-block-d ui-block-";
		var lngColumn=0, strColumnWidth="100%";
		
		// Item count. `> div` means div only first level children  
		var $container_children_original = $(strContainerSelector+' > div');
		if (debug_on) { console.log("FlexGrid.arrangeItemsIntoColumns items count ", $container_children_original.length); }
		
		if (debug_on) { console.log("FlexGrid.arrangeItemsIntoColumns columns vs width ", objWidth); }
		if (debug_on) { console.log("FlexGrid.arrangeItemsIntoColumns viewport width", $(window).width() ); }
		if (debug_on) { console.log("FlexGrid.arrangeItemsIntoColumns viewport height", $(window).height() ); }

		if ($(window).width() >= objWidth["4"]) {
			lngColumn = 4; strColumnWidth="24%";
			if (debug_on) { console.log("FlexGrid.arrangeItemsIntoColumns columns ", lngColumn); }
			//Using $.find is sloppy
			$container_children_original.find(".ui-body").css("font-size", "125%");
			$(strContainerSelector+' > div[class|="ui-block"]').css("width", "24%");
		} else if ($(window).width() < objWidth["4"] && $(window).width() >= objWidth["3"]) {
			lngColumn = 3; strColumnWidth="32.95%";
			if (debug_on) { console.log("FlexGrid.arrangeItemsIntoColumns columns ", lngColumn); }
			$container_children_original.find(".ui-body").css("min-height", "18em");
			$(strContainerSelector+' > div[class|="ui-block"]').css("width", "32.95%");
		} else if ($(window).width() < objWidth["3"] && $(window).width() >= objWidth["2"]) {
			lngColumn = 2; strColumnWidth="49.65%";
			if (debug_on) { console.log("FlexGrid.arrangeItemsIntoColumns columns ", lngColumn); }
			$container_children_original.find(".ui-body").css("min-height", "14em").css("font-size", "1em");
			$(strContainerSelector+' > div[class|="ui-block"]').css("width", "49.65%");
		} else if ( $(window).width() < objWidth["2"] ) {
			lngColumn = 1; strColumnWidth="100%";
			if (debug_on) { console.log("FlexGrid.arrangeItemsIntoColumns columns ", lngColumn); }
			$container_children_original.find(".ui-body").css("min-height", "14em").css("font-size", "1em");
			$(strContainerSelector+' > div[class|="ui-block"]').css("width", "100%");
		}
		
		
		if (lngColumn > 0) {
			//Remove dummy div(s)
			$container_children_original.each( function(j) {
				if (debug_on) { console.log("FlexGrid.arrangeItemsIntoColumns j " + $( this ).html().length ); }
				if ( $( this ).html().length==0) {
					$( this ).remove();
				}
			});
			var lngTotalItemOriginal = $container_children_original.length;
			var strHeight = parseInt( $container_children_original.find(":eq(0)").css("height").replace('px', '') );
			var strWidth = parseInt( $container_children_original.find(":eq(0)").css("width").replace('px', '') );
			var strWidthBarrier =  objWidth[String(lngColumn)];
			if (debug_on) { console.log("FlexGrid.arrangeItemsIntoColumns strWidthBarrier", strWidthBarrier); }
			if (debug_on) { console.log("FlexGrid.arrangeItemsIntoColumns height of 1st item", strHeight); }
			if (debug_on) { console.log("FlexGrid.arrangeItemsIntoColumns width ratio", Math.round((strWidth / strWidthBarrier) * 100),"%"); }
			if (debug_on) { console.log("FlexGrid.arrangeItemsIntoColumns Width of 1st item", strWidth); }

			if (debug_on) { console.log("FlexGrid.arrangeItemsIntoColumns original # of items", lngTotalItemOriginal); }
			if (debug_on) { console.log("FlexGrid.arrangeItemsIntoColumns calculated columns", lngColumn); }
			var lngColumnModulusCount;
			if (lngTotalItemOriginal<lngColumn) {
				lngColumnModulusCount = lngColumn - lngTotalItemOriginal;
			} else {
				lngColumnModulusCount = lngTotalItemOriginal % lngColumn;
			}
			
			if (debug_on) { console.log("FlexGrid.arrangeItemsIntoColumns straggler items", lngColumnModulusCount); }
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
				if (debug_on) { console.log("FlexGrid.arrangeItemsIntoColumns lngTotalItemNew ", lngTotalItemNew, "column modulus count", lngColumnModulusCount); }
				if (lngColumnModulusCount!=0) {
					var lngModulusColumnStart = lngTotalItemNew - lngColumnModulusCount;
					$container_children.each( function(j) {
						if (debug_on) { console.log("FlexGrid.arrangeItemsIntoColumns j " + j, " modulus column start", lngModulusColumnStart); }
						if (j >= lngTotalItemNew - lngColumnModulusCount) {
							//Not a full row. This will right float modulus items
							if (debug_on) { console.log("FlexGrid.arrangeItemsIntoColumns Adding dummy column with height: "+strHeight); }
							//$( this ).css("border", "1px solid dodgerblue").css("height", strHeight).addClass("dummydeleteme ui-block-");
							$( this ).css("height", strHeight).addClass("dummydeleteme ui-block-").css("width", strColumnWidth).css("background-color", "transparent");
						}
					});
				}
				
			}
		}
		
		$container_children = $(strContainerSelector+' > div');
		if (debug_on) { console.log("FlexGrid.arrangeItemsIntoColumns container_children length ", $container_children.length); }
		if (lngColumn==4){
			if (debug_on) { console.log("FlexGrid.arrangeItemsIntoColumns column # ", lngColumn, "Should be 4"); }
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
			if (debug_on) { console.log("FlexGrid.arrangeItemsIntoColumns column # ", lngColumn, "Should be 3"); }
			$selectorItems = $(strContainerSelector+" > div:nth-of-type(" + lngColumn + "n + 1)");
			$selectorItems.removeClass(strRemoveClass).addClass("ui-block-a");
			$selectorItems = $(strContainerSelector+" > div:nth-of-type(" + lngColumn + "n + 2)");
			$selectorItems.removeClass(strRemoveClass).addClass("ui-block-b");
			$selectorItems = $(strContainerSelector+" > div:nth-of-type(" + lngColumn + "n + 3)");
			$selectorItems.removeClass(strRemoveClass).addClass("ui-block-c");
			var tmpStyleSheet = getStyleSheet();
			tmpRule = getContainer()+" > div:first-child .ui-body { border-bottom-width: 1px; }";
			tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
			tmpRule = getContainer()+" > div + div .ui-body { border-left-width: 0; }";
			tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
		} else if (lngColumn==2){
			if (debug_on) { console.log("FlexGrid.arrangeItemsIntoColumns column # ", lngColumn, "Should be 2" ); }
			$selectorItems = $(strContainerSelector+" > div:nth-of-type(" + lngColumn + "n + 1)");
			$selectorItems.removeClass(strRemoveClass).addClass("ui-block-a");
			$selectorItems = $(strContainerSelector+" > div:nth-of-type(" + lngColumn + "n + 2)");
			$selectorItems.removeClass(strRemoveClass).addClass("ui-block-b");
			var tmpStyleSheet = getStyleSheet();
			tmpRule = getContainer()+" > div + div .ui-body { border-top-width: 1px; }";
			tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
			tmpRule = getContainer()+" > div:first-child .ui-body { border-bottom-width: 0; }";
			tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
			tmpRule = getContainer()+" > div:last-child .ui-body { border-left-width: 0; }";
			tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
		} else if (lngColumn==1){
			if (debug_on) { console.log("FlexGrid.arrangeItemsIntoColumns column # ", lngColumn, "Should be 1" ); }
			$selectorItems = $(strContainerSelector+" > div:nth-of-type(" + lngColumn + "n + 1)");
			$selectorItems.removeClass(strRemoveClass).addClass("ui-block-a");
			var tmpStyleSheet = getStyleSheet();
			tmpRule = getContainer()+" > div + div .ui-body { border-top-width: 1px; }";
			tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
			tmpRule = getContainer()+" > div:first-child .ui-body { border-bottom-width: 0; }";
			tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
			tmpRule = getContainer()+" > div:last-child .ui-body { border-left-width: 0; }";
			tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
		}
	}
	
	var getFileName = function(url) {
		url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
		url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
		url = url.substring(url.lastIndexOf("/") + 1, url.length);
		return url;
	}
	
	var getStyleSheet = function(strFileName) {
		var tmpStyleSheet, tmpFileName, retVal, lngFileCount = $(document)[0].styleSheets.length;
		if (typeof(strFileName)=="undefined") { strFileName = "flex-grid.css"; }
		for(var i=0;i<lngFileCount;i++) {
			tmpStyleSheet = $(document)[0].styleSheets[i];
			
			if (typeof(tmpStyleSheet.href)!="object") {
				console.log("FlexGrid.getStyleSheet i ", i, "spreadsheet", tmpStyleSheet, tmpStyleSheet.href, typeof(tmpStyleSheet.href) );
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
	var loadStyleSheet = function(strFileName) {
		var tmpRule, tmpStyleSheet = getStyleSheet(strFileName);
		
		//css rules applicable to container div and descendant elements 
		tmpRule = getContainer()+" { display: block; margin: 0; text-align: center; width: 100%; font-size: 0.75em; margin: 0; padding: 0 1.5em; }";
		tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
		tmpRule = getContainer()+" .ui-body { text-align: left; border-color: #ddd; }";
		tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
		tmpRule = getContainer()+" div div div { text-align: center; }";
		tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
		tmpRule = getContainer()+" p { color: #777; line-height: 140%; }";
		tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
		tmpRule = getContainer()+" img { width: 135px; }";
		tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
		// Collapsing borders
		tmpRule = getContainer()+" > div + div .ui-body { border-top-width: 0; }";
		tmpStyleSheet.insertRule(tmpRule, tmpStyleSheet.cssRules.length);
		
		//pointless js method to refresh DOM
		$(document)[0].offsetHeight;
	}
	
	var init = function() {
		
		strBoundaries = $('meta[property="flex-grid\\:boundaries"]').attr("content");
		if (typeof(strBoundaries)!="undefined") {
			setBoundaries( strBoundaries );
		}
		strSelector = $('meta[property="flex-grid\\:selector"]').attr("content");
		if (typeof(strSelector)!="undefined") {
			setContainer(strSelector);
		}
		
		strDebug = $('meta[property="flex-grid\\:debug"]').attr("content");
		if (typeof(strDebug)=="string") {
			if (strDebug=="true") {
				setDebug(true);
			}
		}
		if (debug_on) { console.log("FlexGrid.init Is debug mode? HTML meta property(", strDebug, ") internally(", debug_on, ")"); }
		
		if (typeof( getContainer() )!="undefined") {
			if ( $( getContainer() ).length==1) {
				arrangeItemsIntoColumns();
				loadStyleSheet();
				$(window).on('resize orientationChange', function(e) {
					if (debug_on) { console.log("FlexGrid.init RESIZE START"); }
					arrangeItemsIntoColumns(selector);
					loadStyleSheet();
					if (debug_on) { console.log("FlexGrid.init RESIZE END"); }
				});
			}
		}
	}
	
	return {
		init: init
	};
})();
FlexGrid.init();
