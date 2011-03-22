if (typeof PTC == 'undefined') var PTC = {};
if (typeof (PTC.View) == 'undefined') PTC.View = {};

// Module View
PTC.View.Menu = function()
{
	var
	longestSide = 0,
	scaleMenuFactor = 1.0,
	imageScale = 0;
	
	resize = function()
	{
		$('#background').width($(window).width());
	
		if (Platform.isMobile())
			$('#background').height($(window).height());
		else
			$('#background').height($(window).height() - $('footer').height());
		
		
		if ($(window).width() >= $(window).height()) 
		{
			longestSide = $(window).width();
			
			if ($(window).width() < $('#menu').width()) scaleMenuFactor = $(window).width() / $('#menu').width();
			else scaleMenuFactor = 1.0;
		}
		else 
		{
			longestSide = $(window).height();
			
			if ($(window).height() < $('#menu').height()) scaleMenuFactor = $(window).height() / $('#menu').height();
			else scaleMenuFactor = 1.0;
		}
		
		$("#menu").css({
			'transform': 'scale(' + scaleMenuFactor + ',' + scaleMenuFactor +  ')',
			'-moz-transform': 'scale(' + scaleMenuFactor + ',' + scaleMenuFactor +  ')',
			'-o-transform': 'scale(' + scaleMenuFactor + ',' + scaleMenuFactor +  ')',
			'-webkit-transform': 'scale(' + scaleMenuFactor + ',' + scaleMenuFactor +  ')'
		});
		
		imageScale = ((trunc((longestSide - 1) / 512) + 1) * 512);
		$('#background').css('background-image', 'url(../content/background_' + imageScale + '.jpg)');
		
		if ($(window).width() >= $(window).height()) 
		{
			$('#background').css('background-position-x', -((imageScale - $(window).width()) / 2) + 'px');
			$('#background').css('background-position', -((imageScale - $(window).width()) / 2) + 'px 0px');
		}
		else 
		{
			$('#background').css('background-position-y', -((imageScale - $(window).height()) / 2) + 'px');
			$('#background').css('background-position', '0px ' + -((imageScale - $(window).height()) / 2) + 'px');
		}
	},
	
	init = function()
	{
		$('#background').css('opacity', 0.1);
		
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

