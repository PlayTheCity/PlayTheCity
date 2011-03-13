/*
	Play The City Core Classes
*/

if (typeof PTC == 'undefined') var PTC = {};

PlayTheCity.App = (function()
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
}
