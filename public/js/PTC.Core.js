/*
	Play The City Core Classes and functions
*/

// http://jsperf.com/javascript-trunc
function trunc(number) { return (number | 0); }

if (typeof PTC == 'undefined') var PTC = {};

// Temporary class, until Charybdis is included
if (typeof(Platform) == "undefined")
{
	Platform = function()
	{
		var 
		mobile = function()
		{
			return (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/Bada/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i));
		},
		iOS = function()
		{
			return ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)));
		},
		iPhone = function()
		{
			return navigator.userAgent.match(/iPhone/i);
		},
		iPod = function()
		{
			return navigator.userAgent.match(/iPod/i);
		},
		iPad = function()
		{
			return navigator.userAgent.match(/iPad/i);
		},
		Android = function()
		{
			return navigator.userAgent.match(/Android/i);
		};
		
		return {
			mobile: mobile,
			iOS: iOS,
			iPhone: iPhone,
			iPod: iPod,
			iPad: iPad,
			Android: Android
		};
	}();
}


/*PlayTheCity.App = (function()
{
	var
	addModule = function()
	{
	
	},
	
	show = function(appView, useLightbox)
	{
		// Undefined objects cannot be shown
		if (typeof(appView) == "undefined") return;
		
		// Assume URL
		if (typeof(appView) == "string")
		{
			if (useLightbox)
			{
				// Open URL in Lightbox as an iFrame
			}
			else location.href = appView;
		}
		else
		{
			if (useLightbox)
			{
			
			}
			else
			{
			
			}
		}
	};

	return {
	
	};
})();

// Layer = Binds an object to DOM element
PlayTheCity.Layer = function()
{

}

// Don't use Module Pattern in this case, as it's not playing that well with inheritence and extensibility
PlayTheCity.Module =
{
	name: "newModule",
	extends: function(newObject)
	{
		// Use jQuery if possible
		if (typeof(jQuery) != "undefined") jQuery.extend(this, newObject);
		else
		{
			
		}
	}
};

function createModule(moduleName, extendArgs)
{
    if (typeof(moduleName) != "string") return;
    
    var tempModule = PlayTheCity.Module;
    tempModule.name = moduleName;
    if (typeof(extendArgs) != "undefined") tempModule.extends(extendArgs);
    
    return tempModule;
}*/
