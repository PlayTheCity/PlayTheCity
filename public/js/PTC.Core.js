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
		Browser = 
		{
			get: function() { return navigator.userAgent; },
			getName: function() { return navigator.appName; },
			getVersion: function() { return navigator.appVersion; }
		},
		
		getName = function()
		{
			return navigator.platform;
		},
		
		is = function(value)
		{
			if (typeof(is) === "undefined") return;
			
			switch (is)
			{
				case 'ios':
				case 'iOS': return ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))); break; 
				
				case 'iphone':
				case 'iPhone': return navigator.userAgent.match(/iPhone/i); break;
				
				case 'ipod':
				case 'iPod': return navigator.userAgent.match(/iPod/i); break;
				
				case 'ipad':
				case 'iPad': return navigator.userAgent.match(/iPad/i); break;
				
				case 'android':
				case 'Android': return navigator.userAgent.match(/Android/i); break;
				
				case 'bada': 
				case 'Bada': return navigator.userAgent.match(/Bada/i); break;
				
				case 'webos':
				case 'webOS':
				case 'WebOS': return navigator.userAgent.match(/webOS/i); break;
				
				case 'mobile':
				case 'Mobile': return (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/Bada/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)); break;
				
				case 'desktop':
				case 'Desktop': return !(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/Bada/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)); break;
			}
		},
		
		isMobile = function()
		{
			return is('Mobile');
		},
		
		getLanguage = function()
		{
			return navigator.language;
		};
		
		return {
			Browser: Browser,
			getName: getName,
			is: is,
			isMobile: isMobile,
			getLanguage: getLanguage
		};
	}();
}

// Button interface
/*PTC.Button =
{
	OnClick: function() {},
	OnMouseDown: function() {},
	OnMouseUp: function() {},
	OnMouseOver: function() {},
	OnMouseOut: function() {}
};*/

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
