/*
 * Play The City UI functions
 * Relies heavily on jQuery
 * 
 * Corresponding stylesheet: ui.css
 * 
 */

if (typeof PTC === 'undefined') var PTC = {};
if (typeof (PTC.UI) === 'undefined') PTC.UI = {};

// TODO: Use desktop notifications where available



/*
 * Play The City Notification pseudo-class
 * 
 * 
 */
PTC.UI.Notification = (function(elementId, collapsed)
{
	var _elementId,
		_elementIdClose = null,
		_collapsed = false;
		_collapsedHeight = '24px',
		_expandedHeight = '60px',
		_collapsedWidth = '300px',
		_expandedWidth = '300px';
	
	/*
	 * Constructor
	 * @param div id: Element which will be a notification
	 * 		  collapsed (optional): Determines whether element will be shown collapsed or extended
	 * 
	 */ 
	if (typeof(elementId) == "string")
	{
		// If elementId string doesn't have a hash sign in it, add one
		if (elementId.indexOf('#') == -1) _elementId = '#' + elementId;
		else _elementId = elementId;
		
		// If the div doesn't have the right style class, apply it
		if (!$(_elementId).hasClass('notification')) $(_elementId).addClass('notification');
	}
	
	if (collapsed) _collapsed = collapsed;
	
	// Private methods
	var
	/*
	 * 
	 * 
	 * 
	 */
	show = function()
	{
		$(_elementId).show();
	},
	
	/*
	 * 
	 * 
	 * 
	 */
	hide = function()
	{
		$(_elementId).hide('fast');
	},
	
	addCloseHandler = function(elementIdClose)
	{
		if (typeof(elementIdClose) == "undefined") return;
		
		_elementIdClose = elementIdClose;
		
		$(_elementIdClose).click(function() { hide(); });
	}
	
	setWidth = function(collapsedWidth, expandedWidth)
	{
		_collapsedWidth = collapsedWidth;
		if (typeof(expandedWidth) != "undefined") _expandedWidth = expandedWidth;
	},
	
	setHeight = function(collapsedHeight, expandedHeight)
	{
		_collapsedHeight = collapsedHeight;
		if (typeof(expandedHeight) != "undefined") _expandedHeight = expandedHeight;
	},
	
	collapse = function()
	{
		$(_elementId).animate({width: _collapsedWidth, height: _collapsedHeight}, animInterval);
	
		if (_elementIdClose != null) $(_elementIdClose).hide();
	},
	
	expand = function()
	{
		$(_elementId).animate({width: _expandedWidth, height: _expandedHeight}, animInterval);
	
		if (_elementIdClose != null) $(_elementIdClose).show();
	},
	
	toggle = function()
	{
		if (!_collapsed) collapse();
		else extend();
	},
	
	isCollapsed = function()
	{
		return _collapsed;
	};
	
	// Set methods to public
	return {
		show: show,
		hide: hide,
		addCloseHandler: addCloseHandler,
		setWidth: setWidth,
		setHeight: setHeight,
		collapse: collapse,
		expand: expand,
		toggle: toggle,
		isCollapsed: isCollapsed
	};
});

/*
 * Play The City Lightbox pseudo-class
 * 
 * 
 */
PTC.UI.Lightbox = function()
{
	var 
	_whiteContent = '.lightbox.content',
	_fadeContent = '.lightbox.fade',
	_innerContent = '#innerContent',
	_sizeX = 0.8,
	_sizeY = 0.8,
	
	init = function()
	{
		hide();
		resize();
	},
	
	setSize = function(sizeX, sizeY)
	{
		if ((sizeX != _sizeX) || (sizeY != _sizeY))
		{
			if (sizeX != _sizeX) _sizeX = sizeX;
			if (sizeY != _sizeY) _sizeY = sizeY;
			
			resize();
		}
	},
	
	resetSize = function()
	{
		setSize(0.8, 0.8);
	},
	
	resize = function()
	{
		$(_fadeContent).width($(window).width());
		$(_fadeContent).height($(window).height());
		
		if (_sizeX <= 1.0) $(_whiteContent).width($(window).width() * _sizeX);
		else $(_whiteContent).width(_sizeX + 'px');
		
		if (_sizeY <= 1.0) $(_whiteContent).height($(window).height() * _sizeY);
		else $(_whiteContent).height(_sizeY + 'px');


		$(_whiteContent).css("left", ( ($(window).width() - $(_whiteContent).outerWidth()) / 2) + "px");
		$(_whiteContent).css("top", ( ($(window).height() - $(_whiteContent).outerHeight()) / 2) + "px");
	
		$(_innerContent).width($(_whiteContent).innerWidth() - 16);
		$(_innerContent).height($(_whiteContent).innerHeight() - 16);
	},
	
	show = function(content, iframe)
	{
		if (iframe)
			$(_innerContent).html('<iframe src="' + content + '" width="100%" height="100%"></iframe>');
		else
			if (typeof(content) != "undefined") $(_innerContent).html(content);
		

		$(_whiteContent).show();
		$(_fadeContent).show();

		$(_fadeContent).css('opacity', 0.0);
		$(_fadeContent).animate({opacity: 0.8}, animInterval);
	},
	
	hide = function()
	{
		$(_fadeContent).fadeOut(animInterval, "linear", function()
		{
			$(_whiteContent).hide();
			$(_fadeContent).hide();
		});
	};
	
	$(document).ready(function() { init(); });
	$(window).resize(function() { resize(); });
	
	return {
		setSize: setSize,
		resetSize: resetSize,
		
		show: show,
		hide: hide
	};
}();



PTC.UI.BubbleWindow = function()
{
	var
	_bubbleWindow,
	_showSettings =
	{
		title: "",
		content: "",
		teaser: "",
		moreFunc: null,
		editable: false
	},
	
	pos = function(posx, posy)
	{
		$('#bubbleWindow').css('left', posx - ($('#bubbleWindow').outerWidth() / 2) + 'px');
		$('#bubbleWindow').css('top', posy - $('#bubbleWindow').outerHeight() - 48 + 'px');
	},
	
	// TODO: Change parameter to object literal
	show = function(title, content, teaser, moreFunc, editable)
	{
		if (typeof(content) === "undefined") return;
		
		if ((typeof(title) === "string") && (title != ""))
		{
			$('#bubbleWindow #title').html(title);
			
			$('#bubbleWindow #title').show();
			$('#bubbleWindow #title_divider').show();
		}
		else
		{
			$('#bubbleWindow #title').hide();
			$('#bubbleWindow #title_divider').hide();
		}
		
		$('#bubbleWindow #content').html(content);
		
		if ((typeof(teaser) === "string") && (teaser != ""))
		{
			$('#bubbleWindow #teaser').attr('src', teaser);
			
			$('#bubbleWindow #teaser').show();
		}
		else
		{
			$('#bubbleWindow #teaser').hide();
		}
		
		
		if ((typeof(moreFunc) !== "undefined") && (moreFunc != "") && (moreFunc != null)) 
		{
			$('#bubbleWindow .func').click(moreFunc);
			
			$('#bubbleWindow #clickMore').show();
			$('#bubbleWindow #func_divider').show();
		}
		else
		{
			$('#bubbleWindow #clickMore').hide();
			$('#bubbleWindow #func_divider').hide();
		}
			
		
		if (!editable) $('#bubbleWindow #actions').hide();
		
		$('#bubbleWindow').show();
		$('#bubbleWindow').css({opacity: 0.0});
		$('#bubbleWindow').animate({opacity: 0.85}, animInterval);
	},
	
	hide = function()
	{
		$('#bubbleWindow').fadeOut(animInterval, function() { $('#bubbleWindow').hide(); });
	},
	
	toggleEdit = function()
	{
		if ($('#bubbleWindow #title').hasClass('editable')) $('#bubbleWindow #title').removeClass('editable');
		else $('#bubbleWindow #title').addClass('editable');
		
		if ($('#bubbleWindow #content').hasClass('editable')) $('#bubbleWindow #content').removeClass('editable');
		else $('#bubbleWindow #content').addClass('editable');
	};
	
	return {
		pos: pos,
		show: show,
		hide: hide,
		toggleEdit: toggleEdit
	};
}();
