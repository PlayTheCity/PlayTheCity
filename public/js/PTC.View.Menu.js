if (typeof PTC === 'undefined') var PTC = {};
if (typeof (PTC.View) === 'undefined') PTC.View = {};

// Module View
PTC.View.Menu = function()
{
	var scaleMenuFactor = 1.0;
	
	resize = function()
	{
		$('#background').width($(window).width());
	
		if (Platform.isMobile())
			$('#background').height($(window).height());
		else
			$('#background').height($(window).height() - $('footer').height());
		
		$('#background').css('background-image', 'url(' + PTC.Asset('background', PTC.AssetType.Scale) + ')');
	
		
		switch (getDisplayOrientation)
		{
			case DisplayOrientation.Portrait:
			{
				scaleMenuFactor = ($(window).height() < $('#menu').height()) ? getScaleFactor($('#menu').height(), $(window).height()) : 1.0;
				
				$('#background').css('background-position-x', -((nextImgDim() - $(window).height()) / 2) + 'px');
				$('#background').css('background-position', '0px ' + -((nextImgDim() - $(window).height()) / 2) + 'px');
				
				break;
			}
			case DisplayOrientation.Landscape:
			{	
				scaleMenuFactor = ($(window).width() < $('#menu').width()) ? getScaleFactor($('#menu').width(), $(window).width()) : 1.0;
				
				$('#background').css('background-position-y', -((nextImgDim() - $(window).width()) / 2) + 'px');
				$('#background').css('background-position', -((nextImgDim() - $(window).width()) / 2) + 'px 0px');
				
				break;
			}
		}
		
		
		
		$("#menu").css({
			'transform': 'scale(' + scaleMenuFactor + ',' + scaleMenuFactor +  ')',
			'-moz-transform': 'scale(' + scaleMenuFactor + ',' + scaleMenuFactor +  ')',
			'-o-transform': 'scale(' + scaleMenuFactor + ',' + scaleMenuFactor +  ')',
			'-webkit-transform': 'scale(' + scaleMenuFactor + ',' + scaleMenuFactor +  ')'
		});
		
	},
	
	init = function()
	{
		PTC.UI.Lightbox.setSize(0.4, 0.8);
		PTC.UI.Lightbox.show(
			'<font size="+1"><b>Willkommen bei Play The City</b></font><br /><br />' + 
			'<img src="' + PTC.Asset('small', PTC.AssetType.Logo) + '"><br /><br />' + 
			'Die Play The City Webversion befindet sich noch im frühen Alphazustand. Einige Funktionen werden vermutlich nicht funktionieren. Generell wird jede zweite Woche eine Version veröffentlicht. Der nächste Release ist für den 9. April 2011 geplant.<br />' +
			'<a href="http://blog.playthecity.info">Play The City Blog</a><br />' +
			'<a href="http://forum.playthecity.info">Play The City Forum</a><br />' + 
			'<br /><br /><br /><a href="javascript:PTC.UI.Lightbox.hide();">Dieses Fenster schließen</a>');
		
		
		$('#background').css('opacity', 0.2);
		
		resize();
		
		// View Buttons

		$('#btnProfile').click(function()
		{
			window.location = 'profile';
		});

		$('#btnMap').click(function()
		{
			window.location = 'map';
		});
		
		$('#btnGames').click(function()
		{
			window.location = 'quiz';
		});
		
		$('#btnCommunity').click(function()
		{
			PTC.UI.Lightbox.setSize(0.4, 0.8);
			PTC.UI.Lightbox.show(
				'<font size="+1"><b>Treten Sie mit uns in Verbindung</b></font><br /><br />' + 
				'<a href="http://blog.playthecity.info">Play The City Blog</a><br />' +
				'<a href="http://forum.playthecity.info">Play The City Forum</a><br />' + 
				'<a href="http://twitter.com/PlayTheCityDE"><img src="' + PTC.Asset('twitter', PTC.AssetType.Button) + '"></a><br />' + 
				'<a href="http://www.facebook.com/pages/Play-The-City/189917224362579"><img src="' + PTC.Asset('facebook', PTC.AssetType.Button) + '"></a><br />' +
				'<br /><br /><br /><a href="javascript:PTC.UI.Lightbox.hide();">Dieses Fenster schließen</a>');
		});
		
		$('#btnSettings').click(function()
		{
			window.location = 'settings';
		});
	};
	
	$(document).ready(function() { init(); });
	$(window).resize(function() { resize(); });
	
	return {
		init: init,
		resize: resize
	};
}();




/*btnMap.OnClick = function()
{
	window.location = 'map';
};

btnProfile.OnClick = function()
{
	window.location = 'profile';
};*/

/*btnProfile.OnClick = function()
{
	alert('profile');
};

btnMap.OnClick = function()
{
	alert('map');
};*/

