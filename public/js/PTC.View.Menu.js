if (typeof PTC == 'undefined') var PTC = {};

function resizeView()
{
	$('#background').width($(window).width());
	
	if (Platform.mobile())
		$('#background').height($(window).height());
	else
		$('#background').height($(window).height() - $('footer').height());
	
	var longestSide = 0,
		scaleMenu = false,
		scaleMenuFactor = 1.0,
		imageScale = 0;
	
	
	if ($(window).width() >= $(window).height()) 
	{
		longestSide = $(window).width();
		
		if ($(window).width() < $('#menu').width()) scaleMenuFactor = $(window).width() / $('#menu').width();
	}
	else 
	{
		longestSide = $(window).height();
		
		if ($(window).height() < $('#menu').height()) scaleMenuFactor = $(window).height() / $('#menu').height();
	}
	
	if (scaleMenuFactor < 1.0)
	{
		$("#menu").css({
			'transform': 'scale(' + scaleMenuFactor + ',' + scaleMenuFactor +  ')',
			'-moz-transform': 'scale(' + scaleMenuFactor + ',' + scaleMenuFactor +  ')',
			'-o-transform': 'scale(' + scaleMenuFactor + ',' + scaleMenuFactor +  ')',
			'-webkit-transform': 'scale(' + scaleMenuFactor + ',' + scaleMenuFactor +  ')'
		});
	}
	
	imageScale = ((trunc(longestSide / 512) + 1) * 512);
	$('#background').css('background-image', 'url(../content/background_' + imageScale + '.jpg)');
	
	if ($(window).width() >= $(window).height()) $('#background').css('background-position-x', -((imageScale - $(window).width()) / 2) + 'px');
	else $('#background').css('background-position-y', -((imageScale - $(window).height()) / 2) + 'px');
}

$(document).ready(function()
{
	$('#background').css('opacity', 0.1);
	
	resizeView();
});

$(window).resize(function() { resizeView(); });

function OnBtnProfileMouseDown()
{
	//$('#btnProfile').css('background-color', '#fff3cf');
	//$('#btnProfile').css('-webkit-transform', 'scale(0.75, 0.75)');
}

function OnBtnProfileMouseUp()
{
	if ($('#btnProfile').hasClass('mousedown')) $('#btnProfile').removeClass('mousedown');
}

$('#btnProfile').mousedown(function() { $(this).addClass('mousedown'); });

function OnBtnProfileClick()
{
	window.location = 'profile';
}

function OnBtnMapClick()
{
	window.location = 'map';
}
