/*
	Play The City Map
*/

if (typeof PTC === 'undefined') var PTC = {};

PTC.Map = function()
{
	var
	APIKEY = 'c4a96f80767b4bff94b2e65fdda49f10',
	map,
	innerMapId = 'innerMap',
	outerMapId = 'outerMap',
	defaultStyle = 30822,
	_styleId = 0,
	_firstInit = true,
	mapLoader,
	cityBounds,
	geopin,
	pins,
	miniMapVisible = true,
	sidebarVisible = false,
	miniMapControl,
	markerClick,
	savedPosition,
	savedZoom,
	dragStart,
	wpId,
	showTreasures = true,
	
	firstInitMap = function()
	{
		cityBounds = new CM.LatLngBounds(new CM.LatLng(48.3275, 10.8301), new CM.LatLng(48.4153, 10.9592));
		savedPosition = cityBounds.getCenter();
		savedZoom = 16;
		
		_firstInit = false;
	}

	loadMap = function(style)
	{
		if (typeof(CM) === "undefined") return;
		else
			clearInterval(mapLoader); //< CM is available, remove interval
		
		
		if (typeof(style) === "undefined") style = defaultStyle;
		
		if (style == _styleId) return;
		else _styleId = style;
		
		
		if (_firstInit) firstInitMap();
		
		// If there is already a map, remove that one
		if ($('#' + innerMapId).hasClass('wml-wrapper'))
		{
			$('#' + innerMapId).remove();
			
			// Append a fresh one :)
			$('#' + outerMapId).append('<div id=' + innerMapId + '></div>');
		}
		
		var cloudmade = (Platform.isMobile()) ? (new CM.Tiles.CloudMade.Mobile({key: APIKEY})) : (new CM.Tiles.CloudMade.Web({key: APIKEY, styleId: _styleId}));

		//if (map) map = null;
		
		map = new CM.Map(innerMapId, cloudmade);

		// Init
		map.setCenter(savedPosition, savedZoom);
		
		
		// 30822: PTC Standard Map
		
		CM.Event.addListener(map, "zoomend", function()
		{
			if (map.getBoundsZoomLevel(cityBounds) >= map.getZoom())
			  map.setCenter(cityBounds.getCenter(), map.getBoundsZoomLevel(cityBounds));
			  
			$('#slider_arrow').css('top', (map.getZoom() / map.getBoundsZoomLevel(cityBounds)) * $('#slider').height() - $('#slider').height());
			
			$('.treasure').show();
			
			if (map.getZoom() > 16)
			{
				if (showTreasures) $('.treasure').show();
				else $('.treasure').hide();
			}
			else
			{
				$('.treasure').hide();
			}
			
		});

		map.addControl(new CM.ScaleControl());
		
		if (miniMapVisible)
		{
			miniMapControl = new CM.OverviewMapControl();
			map.addControl(miniMapControl, new CM.ControlPosition(CM.BOTTOM_RIGHT, new CM.Size(12, 20)));
		}  
		  
		  
		var searchSidebar = new CM.SearchSidebar({key: APIKEY});
		//var locationSidebar = new CM.LocationSidebar({key: APIKEY});
		
		if (!Platform.isMobile())
		{
			CM.Event.addListener(map, "sidebaropened", function()
			{
				$('#loginbox').animate({left: '+=220'}, animInterval);
				$('#mapOptions').animate({left: '+=220'}, animInterval);
			});
			  
			CM.Event.addListener(map, "sidebarclosed", function()
			{
				$('#loginbox').animate({left: '-=220'}, animInterval);
				$('#mapOptions').animate({left: '-=220'}, animInterval);
			});
		}
		
		t1pos = new CM.LatLng(48.36895, 10.8978);
		t2pos = new CM.LatLng(48.37934, 10.8725);
		t3pos = new CM.LatLng(48.36463, 10.8541);
		t4pos = new CM.LatLng(48.37934, 10.8725);
		t5pos = new CM.LatLng(48.39354, 10.8753);
		t6pos = new CM.LatLng(48.38135, 10.8965);
		
		CM.Event.addListener(map, "move", function()
		{
			if ($('#bubbleWindow').is(':visible'))
			{
				var point = map.fromLatLngToContainerPixel(markerClick);
			
				$('#bubbleWindow').css('left', point.x - ($('#bubbleWindow').outerWidth() / 2) + 'px');
				$('#bubbleWindow').css('top', point.y - $('#bubbleWindow').outerHeight() - 48 + 'px');
			}
			
			if (map.getZoom() > 16)
			{
				var tp1 = map.fromLatLngToContainerPixel(t1pos);
				$('#t1').css('left', tp1.x);
				$('#t1').css('top', tp1.y);
				
				var tp2 = map.fromLatLngToContainerPixel(t2pos);
				$('#t2').css('left', tp2.x);
				$('#t2').css('top', tp2.y);
				
				var tp3 = map.fromLatLngToContainerPixel(t3pos);
				$('#t3').css('left', tp3.x);
				$('#t3').css('top', tp3.y);
				
				var tp4 = map.fromLatLngToContainerPixel(t4pos);
				$('#t4').css('left', tp4.x);
				$('#t4').css('top', tp4.y);
				
				var tp5 = map.fromLatLngToContainerPixel(t5pos);
				$('#t5').css('left', tp5.x);
				$('#t5').css('top', tp5.y);
				
				var tp6 = map.fromLatLngToContainerPixel(t5pos);
				$('#t6').css('left', tp6.x);
				$('#t6').css('top', tp6.y);
			}
		});
		
		CM.Event.addListener(map, "dragstart", function()
		{
			dragStart = map.getBounds();
		});
		
		CM.Event.addListener(map, "dragend", function()
		{
			if (!cityBounds.contains(map.getBounds()))
			{
				/*var boundX, boundY;
				
				if (!cityBounds.contains(map.getBounds().getNorthEast()))
				{	
					boundX = (map.getBounds().getNorthEast().lat() < cityBounds.getNorthEast().lat()) ? cityBounds.getNorthEast().lat() : dragStart.getNorthEast().lat();
					boundY = (map.getBounds().getNorthEast().lng() < cityBounds.getNorthEast().lng()) ? cityBounds.getNorthEast().lng() : dragStart.getNorthEast().lng();
					
					dragStart.extend(new CM.LatLng(boundX, boundY));
				}
				
				if (!cityBounds.contains(map.getBounds().getSouthWest()))
				{
					boundX = (map.getBounds().getSouthWest().lat() > cityBounds.getSouthWest().lat()) ? cityBounds.getSouthWest().lat() : dragStart.getSouthWest().lat();
					boundY = (map.getBounds().getSouthWest().lng() > cityBounds.getSouthWest().lng()) ? cityBounds.getSouthWest().lng() : dragStart.getSouthWest().lng();
					
					dragStart.extend(new CM.LatLng(boundX, boundY));
				}*/
				
				map.panTo(dragStart.getCenter());
			}
		});
		
		CM.Event.addListener(map, "click", function()
		{
			PTC.UI.BubbleWindow.hide();
		});
		  
		map.setSidebar(searchSidebar);
		
		if (sidebarVisible) map.openSidebar();
		
		
		var marker = new CM.Marker(new CM.LatLng(48.36895, 10.8974));

		  CM.Event.addListener(marker, "click", function()
		  {
			/*marker.openInfoWindow(
				'<a href="javascript:void(0)" onclick="showLightbox(\'box_rathaus\')"><img class="teaser" src="content/teaser_rathaus.jpg"/></a>' +
				'<span class="editable" contenteditable="true">Das Augsburger Rathaus</span>' +
				'<hr class="divider" />' +
				'<p class="editable" contenteditable="true">Das Augsburger Rathaus wurde zwischen 1615 und 1620 von Elias Holl erbaut und stellt durch seine Größe und Pracht das Selbstbewußtsein der ehemals freien Reichsstadt dar. Es beherbergt den Prunksaal "Goldener Saal", welcher zu den bedeutendsten Kulturdenkmälern der Spätrenaissance zählt.</p>' +
				'<hr class="divider" />' +
				'<span><a href="javascript:void(0)" onclick="showLightbox(\'box_rathaus\')">Hier klicken für genauere Informationen</a></span>');*/
			
			markerClick = marker.getLatLng();
			var point = map.fromLatLngToContainerPixel(marker.getLatLng());
			
			PTC.UI.BubbleWindow.pos(point.x, point.y);
			PTC.UI.BubbleWindow.show('Das Augsburger Rathaus', 'Das Augsburger Rathaus wurde zwischen 1615 und 1620 von Elias Holl erbaut und stellt durch seine Größe und Pracht das Selbstbewußtsein der ehemals freien Reichsstadt dar. Es beherbergt den Prunksaal "Goldener Saal", welcher zu den bedeutendsten Kulturdenkmälern der Spätrenaissance zählt.', 'content/teaser/rathaus.jpg', null, true);
		  });

		  var wikimarker = new CM.Marker(new CM.LatLng(48.368, 10.8974));

		  CM.Event.addListener(wikimarker, "click", function()
		  {
			/*marker.openInfoWindow(
				'<a href="javascript:void(0)" onclick="showLightbox(\'box_augsburg_wiki\')"><img class="teaser" src=/></a>' +
				'<span>Wikipedia: Augsburg</span>' +
				'<hr class="divider" />' +
				'<p>Zeigt den Wikipedia-Artikel über Augsburg.</p>' +
				'<hr class="divider" />' +
				'<span><a href="javascript:void(0)" onclick="showLightbox(\'box_augsburg_wiki\')">Hier klicken für genauere Informationen</a></span>');*/

			markerClick = wikimarker.getLatLng();
			var point = map.fromLatLngToContainerPixel(wikimarker.getLatLng());
			
			
			PTC.UI.BubbleWindow.pos(point.x, point.y);
			PTC.UI.BubbleWindow.show('Augsburg Panorama', 'Zeigt das Panorama aus der Sicht des Perlachturms.', 'content/teaser/panorama.jpg', showPanorama, true);
		  });
		
		map.addOverlay(marker);
		map.addOverlay(wikimarker);
		
		
		geopin = new CM.Marker(new CM.LatLng(0.0, 0.0));
	  
		map.addOverlay(geopin);
	  
		geopin.hide();
		
		
		
		checkGeoPosition();
	},
	
	// TODO: Change alert into PTC.UI.Notification
	// TODO: Implement accuracy checking like at http://www.thedotproduct.org/experiments/geo/geo.js
	checkGeoPosition = function()
	{
		if (Modernizr.geolocation)
		{
			geopin.show();
		
			wpId = navigator.geolocation.watchPosition(
			function(position)
			{
				geopin.setLatLng(new CM.LatLng(position.coords.latitude, position.coords.longitude));
			}, 
			function(msg)
			{
				switch (msg.code)
				{
					case error.TIMEOUT: alert("Timeout!"); break;
					default: alert("Geolocation Error"); break;
				};
			}, 
			{enableHighAccuracy:true, maximumAge:30000, timeout:27000});
		}
		else
			alert('Geolocation not available');
	},
	
	savePosition = function()
	{
		savedPosition = map.getBounds().getCenter();
		savedZoom = map.getZoom();
	}
	
	resize = function()
	{
		$('#' + outerMapId).height($(window).height() - $('footer').height() - $('#quickbar').height());
	},
	
	init = function()
	{
		resize();
		
		// Async load CloudMade
		(function() {
		function async_load(){
			var s = document.createElement('script');
			s.type = 'text/javascript';
			s.async = true;
			s.src = 'http://tile.cloudmade.com/wml/latest/web-maps-lite.js';
			var x = document.getElementsByTagName('script')[0];
			x.parentNode.insertBefore(s, x);
			
			mapLoader = setInterval(loadMap, 125);
		}
		if (window.attachEvent)
			window.attachEvent('onload', async_load);
		else
			window.addEventListener('load', async_load, false);
		})();
		
		// View Events
		refreshMap = function(nameString, style)
		{
			$('#rbtn' + nameString).attr('checked', 'checked');
			savePosition();
			loadMap(style);
		};
		
		
		OnRbMidnightClick = function() { refreshMap('Midnight', 999);  };
		OnRbAllClick = function() { refreshMap('All', 30822); };
		OnRbEatingOutClick = function() { refreshMap('EatingOut', 33976); };
		OnRbLodgingClick = function() { refreshMap('Lodging', 33981); };
		OnRbRetailClick = function() { refreshMap('Retail', 33977); };
		OnRbCultureClick = function() { refreshMap('Culture', 33982); };
		OnRbTransportationClick = function() { refreshMap('Transportation', 33929); };
		OnRbNoneClick = function() { refreshMap('None', 33973); };
		
		$('#lblMidnight,#rbtnMidnight').click(OnRbMidnightClick);
		$('#lblAll,#rbtnAll').click(OnRbAllClick);
		$('#lblEatingOut,#rbtnEatingOut').click(OnRbEatingOutClick);
		$('#lblLodging,#rbtnLodging').click(OnRbLodgingClick);
		$('#lblRetail,#rbtnRetail').click(OnRbRetailClick);
		$('#lblCulture,#rbtnCulture').click(OnRbCultureClick);
		$('#lblTransportation,#rbtnTransportation').click(OnRbTransportationClick);
		$('#lblNone,#rbtnNone').click(OnRbNoneClick);
		
		$('#chbTreasure').click(function() 
		{ 
			showTreasures =! showTreasures; 
			if (map.getZoom() > 16)
			{
				if ($('.treasure').is(':visible') && !showTreasures) $('.treasure').hide();
				else $('.treasure').show();
			}
		});
	},
	
	centerMap = function()
	{
		map.panTo(cityBounds.getCenter());
	},
	
	getMapCanvas = function()
	{
		return map;
	},
	
	toggleSearchBar = function()
	{
		sidebarVisible =! sidebarVisible;
		map.toggleSidebar();
	},
	
	toggleQuickBar = function()
	{
		if ($('#quickbar').height() == 0)
		{
			$('#quickbar').show();
			$('#quickbar').animate({height: '28px'}, animInterval, "linear", function() { resize(); });
		}
		else
			$('#quickbar').animate({height: '0px'}, animInterval, "linear", function() { $('#quickbar').hide(); resize(); });
	},
	
	toggleMiniMap = function()
	{
		if (miniMapVisible)
		{
			map.removeControl(miniMapControl);
			miniMapVisible = false;
		}
		else
		{
			map.addControl(miniMapControl, new CM.ControlPosition(CM.BOTTOM_RIGHT, new CM.Size(20, 20)));
			miniMapVisible = true;
		}
	},
	
	toggleControls = function()
	{
		$('#mapNav').toggle();
	};
	
	// Attach module
	$(document).ready(function() { init(); });
	$(window).resize(function() { resize(); });
	
	return {
		init: init,
		resize: resize,
		loadMap: loadMap,
		
		savePosition: savePosition,
		centerMap: centerMap,
		getMapCanvas: getMapCanvas,
		
		toggleSearchBar: toggleSearchBar,
		toggleQuickBar: toggleQuickBar,
		toggleMiniMap: toggleMiniMap,
		toggleControls: toggleControls
	}
}();

function treasureClick(id)
{
	$('#' + id + '').css('background-image', 'url(../content/icons/treasure_open.png)');
	PTC.Achievements.show('Schatzsucher');
	
	PTC.UI.BubbleWindow.pos($('#' + id + '').position().left, $('#' + id + '').position().top);
	
	switch (id)
	{
		case 't1':
		{
			PTC.UI.BubbleWindow.show('Schatzkiste', 'Diese Schatzkisten sind auf der ganzen Karte verteilt. Finde sie, in jeder ist eine Überraschung versteckt.');
			break;
		}
		
		default:
			break;
	}
}
