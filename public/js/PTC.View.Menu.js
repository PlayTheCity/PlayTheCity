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
	
		
		switch (getDisplayOrientation())
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
			'<span class="lb_title">Willkommen bei Play The City</span><br /><br />' + 
			'<img src="' + PTC.Asset('small', PTC.AssetType.Logo) + '"><br /><br />' + 
			'Die Play The City Webversion befindet sich noch im frühen Alphazustand. Einige Funktionen werden vermutlich nicht funktionieren. Generell wird jede zweite Woche eine Version veröffentlicht. Der nächste Release ist für den 23. April 2011 geplant.<br /><br />' +
			'<a href="http://changelog.playthecity.info" target="_blank">Aktuelle Änderungen (Changelog)</a><br /><br />' +
			'<a href="http://blog.playthecity.info" target="_blank">Play The City Blog</a><br />' +
			'<a href="http://forum.playthecity.info" target="_blank">Play The City Forum</a><br />' + 
			'<br /><br /><a href="javascript:PTC.UI.Lightbox.hide();">Dieses Fenster schließen</a>');
		
		
		$('#background').css('opacity', 0.2);
		
		resize();
		
		// View Buttons

		$('#btnProfile').click(function()
		{
			PTC.UI.Lightbox.setSize(0.4, 0.8);
			PTC.UI.Lightbox.show(
				'<span class="lb_title">Profil</span><br /><br />' + 
				'<br /><br /><br /><a href="javascript:PTC.UI.Lightbox.hide();">Dieses Fenster schließen</a>');
		});

		$('#btnMap').click(function()
		{
			window.location = 'map';
		});
		
		$('#btnGames').click(function()
		{
			PTC.UI.Lightbox.setSize(0.4, 0.8);
			PTC.UI.Lightbox.show(
				'<span class="lb_title">Spiele</span><br /><br />' + 
				'<a href="/quiz">Quiz</a><br />' +
				'<br /><br /><br /><a href="javascript:PTC.UI.Lightbox.hide();">Dieses Fenster schließen</a>');
		});
		
		$('#btnCommunity').click(function()
		{
			PTC.UI.Lightbox.setSize(0.4, 0.8);
			PTC.UI.Lightbox.show(
				'<span class="lb_title">Trete mit uns in Verbindung:</span><br /><br />' + 
				'<a href="http://blog.playthecity.info" target="_blank">Play The City Blog</a><br />' +
				'<a href="http://forum.playthecity.info" target="_blank">Play The City Forum</a><br /><br />' + 
				'<a href="http://twitter.com/PlayTheCityDE" target="_blank"><img src="' + PTC.Asset('twitter', PTC.AssetType.Button) + '"></a><br />' + 
				'<a href="http://www.facebook.com/pages/Play-The-City/189917224362579" target="_blank"><img src="' + PTC.Asset('facebook', PTC.AssetType.Button) + '"></a><br />' +
				'<a href="http://www.youtube.com/playthecity" target="_blank"><img src="' + PTC.Asset('youtube', PTC.AssetType.Button) + '"></a><br />' +
				'<br /><br /><br /><a href="javascript:PTC.UI.Lightbox.hide();">Dieses Fenster schließen</a>');
		});
		
		$('#btnSettings').click(function()
		{
			PTC.UI.Lightbox.setSize(0.4, 0.8);
			PTC.UI.Lightbox.show(
				'<script>function toggleAnimations() { if (_animation == "on") quality("animation", "off"); else quality("animation", "on"); }</script>' + 
				'<script>$("#lblQualityLow,#rbtnQualityLow").click(function() { quality("visual", "low"); });</script>' +
				'<script>$("#lblQualityAvr,#rbtnQualityAvr").click(function() { quality("visual", "avr"); });</script>' +
				'<script>$("#lblQualityHigh,#rbtnQualityHigh").click(function() { quality("visual", "high"); });</script>' +
				'<span class="lb_title">Einstellungen</span><br /><br />' + 
				'<span>Grafikqualität:</span><br />' +
				'<input type="radio" id="rbtnQualityLow" name="rbQualityOptions" value="Low"><label for="rbtnQualityLow" class="rbOption" id="lblQualityLow"> Niedrig</label><br />' +
				'<input type="radio" id="rbtnQualityAvr" name="rbQualityOptions" value="Avr"><label for="rbtnQualityAvr" class="rbOption" id="lblQualityAvr"> Mittel</label><br />' +
				'<input type="radio" id="rbtnQualityHigh" name="rbQualityOptions" value="High"><label for="rbtnQualityHigh" class="rbOption" id="lblQualityHigh"> Hoch</label><br /><br /><br />' +
				'<span id="btnAnimations" class="text_button"><a href="javascript:toggleAnimations();" style="width: 200px;">Animationen: An</a></span><br />' +
				'<br /><br /><br /><a href="javascript:PTC.UI.Lightbox.hide();">Dieses Fenster schließen</a>');
		});
	};
	
	$(document).ready(function() { init(); });
	$(window).resize(function() { resize(); });
	
	return {
		init: init,
		resize: resize
	};
}();

