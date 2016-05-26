var FlexGrid = (function() {
	var objResponsiveDesignBoundaries = {"1": "340", "2": "475", "3": "644", "4": "824"};
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

	var toggleDebug = function() {
		debug_on = !debug_on;
	}

	var arrangeItemsIntoColumns = function() {
		var objWidth=getBoundaries(), strContainerSelector=getContainer();		
		var $selectorItems, strRemoveClass = "ui-block-a ui-block-b ui-block-c ui-block-d ui-block-";
		var lngColumn=0, strColumnWidth="100%";
		
		if (debug_on) { console.log("columns vs width ", objWidth); }
		if (debug_on) { console.log("viewport width", $(window).width() ); }
		if (debug_on) { console.log("viewport height", $(window).height() ); }

		if ($(window).width() >= objWidth["4"] ) {
			lngColumn = 4; strColumnWidth="24%";
			if (debug_on) { console.log("columns ", lngColumn); }
			$(strContainerSelector).find(".ui-body").css("font-size", "125%");
			$(strContainerSelector).find("div[class|='ui-block']").css("width", "24%");
		} else if ($(window).width() < objWidth["4"] && $(window).width() >= objWidth["3"]) {
			lngColumn = 3; strColumnWidth="32.95%";
			if (debug_on) { console.log("columns ", lngColumn); }
			$(strContainerSelector).find(".ui-body").css("min-height", "18em");
			$(strContainerSelector).find("div[class|='ui-block']").css("width", "32.95%");
		} else if ($(window).width() < objWidth["3"] && $(window).width() >= objWidth["2"]) {
			lngColumn = 2; strColumnWidth="49.65%";
			if (debug_on) { console.log("columns ", lngColumn); }
			$(strContainerSelector).find(".ui-body").css("min-height", "14em");
			$(strContainerSelector).find("div[class|='ui-block']").css("width", "49.65%");
			$(strContainerSelector).find(".ui-body").css("font-size", "0.8em");
		} else if ( $(window).width() < objWidth["2"] ) {
			lngColumn = 1; strColumnWidth="100%";
			if (debug_on) { console.log("columns ", lngColumn); }
			$(strContainerSelector).find(".ui-body").css("min-height", "14em");
			$(strContainerSelector).find(".ui-body").css("font-size", "0.8em");
			$(strContainerSelector).find("div[class|='ui-block']").css("width", "100%");
		}
		
		if (lngColumn > 0) {
			if (debug_on) { console.log("items " + $(strContainerSelector).children().length ); }
			$(strContainerSelector).children().each( function(j) {
				console.log("j " + $( this ).html().length );
				if ( $( this ).html().length==0) {
					$( this ).remove();
				}
			});
			var lngTotalItemOriginal = $(strContainerSelector).children().length;
			var strHeight = parseInt( $(strContainerSelector).children(":eq(0)").css("height").replace('px', '') );
			var strWidth = parseInt( $(strContainerSelector).children(":eq(0)").css("width").replace('px', '') );
			var strWidthBarrier =  objWidth[String(lngColumn)];
			if (debug_on) { console.log("strWidthBarrier", strWidthBarrier); }
			if (debug_on) { console.log("original # of items", lngTotalItemOriginal); }
			if (debug_on) { console.log("height of 1st item", strHeight); }
			
			if (debug_on) { console.log("width ratio", Math.round((strWidth / strWidthBarrier) * 100),"%"); }
			if (debug_on) { console.log("Width of 1st item", strWidth); }
			
			var lngColumnModulusCount = lngTotalItemOriginal % lngColumn;
			if (debug_on) { console.log("straggler items", lngColumnModulusCount); }
			if (lngColumnModulusCount>0) {
				for(var i=0;i<lngColumnModulusCount;i++) {
					$(strContainerSelector).append("<div></div>");
				}
				var lngTotalItemNew = $(strContainerSelector).children().length;
				var strPercentage = ((1 / lngColumn) * 100) + "%";
				var lngRowCount = (lngTotalItemNew - lngColumnModulusCount) / lngColumn;
				lngRowCount = Math.floor(lngRowCount);
				if (debug_on) { console.log("lngTotalItemNew ", lngTotalItemNew, "column modulus count", lngColumnModulusCount); }
				if (lngColumnModulusCount!=0) {
					var lngModulusColumnStart = lngTotalItemNew - lngColumnModulusCount;
					$(strContainerSelector).children().each( function(j) {
						if (debug_on) { console.log("j " + j, " modulus column start", lngModulusColumnStart); }
						if (j >= lngTotalItemNew - lngColumnModulusCount) {
							//Not a full row. This will right float modulus items
							if (debug_on) { console.log("Adding dummy column with height: "+strHeight); }
							//$( this ).css("border", "1px solid dodgerblue").css("height", strHeight).addClass("dummydeleteme ui-block-");
							$( this ).css("height", strHeight).addClass("dummydeleteme ui-block-").css("width", strColumnWidth).css("background-color", "#fff");
						}
					});
				}
				
			}
		}
		
		if (lngColumn==4){
			if (debug_on) { console.log("column # ", lngColumn, "Should be 4"); }
			$selectorItems = $( strContainerSelector ).children(":nth-child(" + lngColumn + "n + 1)");
			$selectorItems.removeClass(strRemoveClass).addClass("ui-block-a");
			$selectorItems = $( strContainerSelector ).children(":nth-child(" + lngColumn + "n + 2)");
			$selectorItems.removeClass(strRemoveClass).addClass("ui-block-b");
			$selectorItems = $( strContainerSelector ).children(":nth-child(" + lngColumn + "n + 3)");
			$selectorItems.removeClass(strRemoveClass).addClass("ui-block-c");
			$selectorItems = $( strContainerSelector ).children(":nth-child(" + lngColumn + "n + 4)");
			$selectorItems.removeClass(strRemoveClass).addClass("ui-block-d");
		} else if (lngColumn==3){
			if (debug_on) { console.log("column # ", lngColumn, "Should be 3"); }
			$selectorItems = $( strContainerSelector ).children(":nth-child(" + lngColumn + "n + 1)");
			$selectorItems.removeClass(strRemoveClass).addClass("ui-block-a");
			$selectorItems = $( strContainerSelector ).children(":nth-child(" + lngColumn + "n + 2)");
			$selectorItems.removeClass(strRemoveClass).addClass("ui-block-b");
			$selectorItems = $( strContainerSelector ).children(":nth-child(" + lngColumn + "n + 3)");
			$selectorItems.removeClass(strRemoveClass).addClass("ui-block-c");
		} else if (lngColumn==2){
			if (debug_on) { console.log("column # ", lngColumn, "Should be 2" ); }
			$selectorItems = $( strContainerSelector ).children(":nth-child(" + lngColumn + "n + 1)");
			$selectorItems.removeClass(strRemoveClass).addClass("ui-block-a");
			$selectorItems = $( strContainerSelector ).children(":nth-child(" + lngColumn + "n + 2)");
			$selectorItems.removeClass(strRemoveClass).addClass("ui-block-b");
		} else if (lngColumn==1){
			if (debug_on) { console.log("column # ", lngColumn, "Should be 1" ); }
			$selectorItems = $( strContainerSelector ).children(":nth-child(" + lngColumn + "n + 1)");
			$selectorItems.removeClass(strRemoveClass).addClass("ui-block-a");
		}
	}

	var init = function() {
		strBoundaries = $('meta[property="flex-grid\\:boundaries"]');
		if (typeof(strBoundaries)!="undefined") {
			setBoundaries( strBoundaries );
		}
		strSelector = $('meta[property="flex-grid\\:selector"]');
		if (typeof(strSelector)!="undefined") {
			setContainer(strSelector);
		}
		
		strDebug = $('meta[property="flex-grid\\:debug"]');
		if (typeof(strDebug)=="string") {
			if (strDebug=="true") {
				toggleDebug();
			}
		}
		
		arrangeItemsIntoColumns();
		$(window).on('resize orientationChange', function(e) {
			if (debug_on) { console.log("RESIZE START"); }
			arrangeItemsIntoColumns(selector);
			if (debug_on) { console.log("RESIZE END"); }
		});
	}
	
	return {
		init: init
	};
})();

$(document).ready(function() {
	FlexGrid.init();
});
