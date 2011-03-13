if (typeof PTC == 'undefined') var PTC = {};

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
