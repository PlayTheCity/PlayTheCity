/*
	Play The City Core Classes and functions
*/

// http://jsperf.com/javascript-trunc
function trunc(number) { return (number | 0); }

// Format string, something we need quite often
String.prototype.format = function()
{
    var formatted = this;
    for (var i = 0; i < arguments.length; i++)
    {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};


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
			if (typeof(value) === "undefined") return;
			
			switch (value.toLowerCase())
			{
				case 'ios': return ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))); break; 
				
				case 'iphone': return navigator.userAgent.match(/iPhone/i); break;
				
				case 'ipod': return navigator.userAgent.match(/iPod/i); break;
				
				case 'ipad': return navigator.userAgent.match(/iPad/i); break;
				
				case 'android': return navigator.userAgent.match(/Android/i); break;
				
				case 'bada': return navigator.userAgent.match(/Bada/i); break;
				
				case 'webos': return navigator.userAgent.match(/webOS/i); break;
				
				case 'mobile': return (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/Bada/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)); break;
				
				case 'desktop': return !(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/Bada/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)); break;
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

PTC.AssetType =
{
	Audio: 'audio',
	Button: 'buttons',
	Icon: 'icon',
	Logo: 'logo',
	Scale: 'scalable',
	Teaser: 'teaser',
	Video: 'video'
};

// TODO: Make this available on the server-side?
PTC.Content = function(value)
{
	var
	// Content directory definitions
	_trailingSlash = '/',
	_rootDir = '..' + _trailingSlash + contentDir,
	_audioDir = PTC.AssetType.Audio,
	_buttonDir = PTC.AssetType.Button,
	_iconDir = PTC.AssetType.Icon,
	_logoDir = PTC.AssetType.Logo,
	_scaleDir = PTC.AssetType.Scale,
	_teaserDir = PTC.AssetType.Teaser,
	_videoDir = PTC.AssetType.Video;
	
	
	if ((typeof(value) === undefined) || (value == "root")) return _rootDir + _trailingSlash;
	
	var tempDir = _rootDir + _trailingSlash;
	switch (value.toLowerCase())
	{
		case 'audio': return tempDir + _audioDir + _trailingSlash; break;
		
		case 'button':
		case 'buttons': return tempDir + _buttonDir + _trailingSlash; break;
		
		case 'icon':
		case 'icons': return tempDir + _iconDir + _trailingSlash; break;
		
		case 'logo': return tempDir + _logoDir + _trailingSlash; break;
		
		case 'scale':
		case 'scalable': return tempDir + _scaleDir + _trailingSlash; break;
		
		case 'teaser': return tempDir + _teaserDir + _trailingSlash; break;
		
		case 'video': return tempDir + _videoDir + _trailingSlash; break;
	}
};

// TODO: Better name for this function (currently "reference" to NextPowerOfTwo)
function nextImgDim()
{
	var longestSide = ($(window).width() >= $(window).height()) ? longestSide = $(window).width() : longestSide = $(window).height();
	
	return ((trunc((longestSide - 1) / 512) + 1) * 512);
}

function getScaleFactor(maxValue, curValue)
{
	return (curValue / maxValue);
}

DisplayOrientation = 
{
	Landscape: 1,
	Portrait: 0
};

function getDisplayOrientation()
{
	return trunc($(window).width() / $(window).height());
}

/**
 * Asset loading
 * 
 * @param fileName: 
 * 
 */
PTC.Asset = function(fileName, assetType, options)
{
	switch (assetType)
	{
		case PTC.AssetType.Scale:
		{
			
			var imgDim = 0;
			if (typeof(options) !== "undefined")
			{
				if (options.length == 1) imgDim = options[0];
				else 
				{
					imgDim = options[options.length - 1];
					
					for (var i = 0; i < options.length; i++)
						if (options[i] == imageScale) imgDim = i;
				}
			}
			else
				imgDim = nextImgDim();
			
			return PTC.Content(assetType) + fileName + '_' + imgDim + '.jpg';
			
			break;
		}
		
		case PTC.AssetType.Button:
		case PTC.AssetType.Icon:
		case PTC.AssetType.Logo:
		case PTC.AssetType.Teaser: return (fileName.indexOf('.') == -1) ? (PTC.Content(assetType) + fileName + '.png') : (PTC.Content(assetType) + fileName); break;

		
		default: return PTC.Content(assetType) + fileName; break;
	}
};

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
