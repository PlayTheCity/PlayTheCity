/*
 * Play The City UI functions
 * Relies heavily on jQuery
 * 
 * Corresponding stylesheet: ui.css
 * 
 */

if (typeof PTC == 'undefined') var PTC = {};
if (typeof (PTC.UI) == 'undefined') PTC.UI = {};


// Animation Interval: 300ms
const animInterval = 300;

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
