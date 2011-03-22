/*
	Play The City Map
*/

if (typeof PTC == 'undefined') var PTC = {};

PTC.Map = function()
{
	var
	APIKEY = 'c4a96f80767b4bff94b2e65fdda49f10',
	map,
	mapId = 'map',
	maploader,
	cityBounds,
	geopin,
	pins,
	miniMapVisible = true,
	miniMapControl,
	wpId,
	
	loadMap = function()
	{
		if (typeof(CM) === "undefined") return;
		clearInterval(mapLoader); //< CM is available, remove interval
		
		var cloudmade;
		if (Platform.isMobile())
			cloudmade = new CM.Tiles.CloudMade.Mobile({key: APIKEY});
		else
			cloudmade = new CM.Tiles.CloudMade.Web({key: APIKEY, styleId: 30822});
		
		map = new CM.Map(mapId, cloudmade);

		cityBounds = new CM.LatLngBounds(new CM.LatLng(48.3275, 10.8301), new CM.LatLng(48.4153, 10.9592));

		// Init
		map.setCenter(cityBounds.getCenter(), 16);
		
		CM.Event.addListener(map, "zoomend", function()
		{
			if (map.getBoundsZoomLevel(cityBounds) >= map.getZoom())
			  map.setCenter(cityBounds.getCenter(), map.getBoundsZoomLevel(cityBounds));
		});

		map.addControl(new CM.ScaleControl());
		
		miniMapControl = new CM.OverviewMapControl();
		map.addControl(miniMapControl, new CM.ControlPosition(CM.BOTTOM_RIGHT, new CM.Size(20, 20)));
		  
		  
		  
		var searchSidebar = new CM.SearchSidebar({key: APIKEY});
		//var locationSidebar = new CM.LocationSidebar({key: APIKEY});
		
		if (!Platform.isMobile())
		{
			CM.Event.addListener(map, "sidebaropened", function()
			{
				$('#loginbox').animate({left: '+=220'}, 300);
				$('#mapOptions').animate({left: '+=220'}, 300);
			});
			  
			CM.Event.addListener(map, "sidebarclosed", function()
			{
				$('#loginbox').animate({left: '-=220'}, 300);
				$('#mapOptions').animate({left: '-=220'}, 300);
			});
		}
		  
		map.setSidebar(searchSidebar);
		
		var marker = new CM.Marker(new CM.LatLng(48.36895, 10.8974));

		  CM.Event.addListener(marker, "click", function()
		  {
			marker.openInfoWindow(
				'<a href="javascript:void(0)" onclick="showLightbox(\'box_rathaus\')"><img class="teaser" src="content/teaser_rathaus.jpg"/></a>' +
				'<span class="editable" contenteditable="true">Das Augsburger Rathaus</span>' +
				'<hr class="divider" />' +
				'<p class="editable" contenteditable="true">Das Augsburger Rathaus wurde zwischen 1615 und 1620 von Elias Holl erbaut und stellt durch seine Größe und Pracht das Selbstbewußtsein der ehemals freien Reichsstadt dar. Es beherbergt den Prunksaal "Goldener Saal", welcher zu den bedeutendsten Kulturdenkmälern der Spätrenaissance zählt.</p>' +
				'<hr class="divider" />' +
				'<span><a href="javascript:void(0)" onclick="showLightbox(\'box_rathaus\')">Hier klicken für genauere Informationen</a></span>');

			$('.wml-info-window').attr({opacity: 0.0});
			$('.wml-info-window').animate({opacity: 0.85}, 125);
		  });

		  var wikimarker = new CM.Marker(new CM.LatLng(48.368, 10.8974));

		  CM.Event.addListener(wikimarker, "click", function()
		  {
			marker.openInfoWindow(
				'<a href="javascript:void(0)" onclick="showLightbox(\'box_augsburg_wiki\')"><img class="teaser" src="content/teaser_rathaus.jpg"/></a>' +
				'<span>Wikipedia: Augsburg</span>' +
				'<hr class="divider" />' +
				'<p>Zeigt den Wikipedia-Artikel über Augsburg.</p>' +
				'<hr class="divider" />' +
				'<span><a href="javascript:void(0)" onclick="showLightbox(\'box_augsburg_wiki\')">Hier klicken für genauere Informationen</a></span>');

			$('.wml-info-window').attr({opacity: 0.0});
			$('.wml-info-window').animate({opacity: 0.85}, 125);
		  });
		
		map.addOverlay(marker);
		map.addOverlay(wikimarker);
		
		
		geopin = new CM.Marker(new CM.LatLng(0.0, 0.0));
	  
		map.addOverlay(geopin);
	  
		geopin.hide();
		
		
		
		if (!wpId) checkGeoPosition();
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
	
	resize = function()
	{
		$('#map').height($(window).height() - $('footer').height() - $('#quickbar').height());
		//map.checkResize();

		$('.white_content').width($(window).width() * 0.8);
		$('.white_content').height($(window).height() * 0.8);

		$('.white_content').css("margin-left", (- $('.white_content').width() / 2) + "px");
		$('.white_content').css("margin-top", (- $('.white_content').height() / 2) + "px");
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
	},
	
	centerMap = function()
	{
		map.setCenter(cityBounds.getCenter(), map.getZoom());
	},
	
	getMapCanvas = function()
	{
		return map;
	},
	
	toggleSearchBar = function()
	{
		map.toggleSidebar();
	},
	
	toggleQuickBar = function()
	{
		if ($('#quickbar').height() == 0)
		{
			$('#quickbar').show();
			$('#quickbar').animate({height: '28px'}, 300, "linear", function() { resize(); });
		}
		else
			$('#quickbar').animate({height: '0px'}, 300, "linear", function() { $('#quickbar').hide(); resize(); });
	};
	
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
	
	return {
		init: init,
		resize: resize,
		centerMap: centerMap,
		getMapCanvas: getMapCanvas,
		toggleSearchBar: toggleSearchBar,
		toggleQuickBar: toggleQuickBar,
		toggleMiniMap: toggleMiniMap,
		toggleControls: toggleControls
	}
}();

$(document).ready(function() { PTC.Map.init(); });
$(window).resize(function() { PTC.Map.resize(); });
