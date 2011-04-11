/*
 * Play The City Achievements
 * 
 * Depends on PTC UI
 * 
 * 
 */

if (typeof PTC === 'undefined') var PTC = {};

// Achievement "Singleton": Revealing module pattern
PTC.Achievements = function()
{
	//Private object "array" stores all achievements
	var array = {},
		_localStorageKey,
	
	initialize = function(localStorageKey)
	{
		// Saves localStorage key internally
		_localStorageKey = localStorageKey;
	
		// Loads achievements from local storage if any
		if (window.localStorage)
			if ((typeof(window.localStorage[_localStorageKey]) != "undefined") && (window.localStorage[_localStorageKey] != null) && (window.localStorage[_localStorageKey] != "")) array = JSON.parse(window.localStorage[_localStorageKey]);
	},
	
	register = function(text, description, icon)
	{
		array[text] = { active: false };
		if (typeof(description) !== "undefined") array[text]["description"] = description;
		if (typeof(icon) !== "undefined") array[text]["icon"] = icon;
	},
	
	getCount = function()
	{
		var count = 0;
		for (var i in array) count++;
		return count;
	}
	
	getUnlockedCount = function()
	{
		var count = 0;
		for (var i in array)
		{
			if (array[i]["active"]) count++;
		}
		return count;
	}
	
	list = function()
	{
		// Locked achievements will be shown in a grey-ish color
		var result = "";
		for (var i in array)
		{
			if (array[i]["active"]) result += '<div class="ach_box unlocked"><span class="ach_unlocked">' + i + '</span><br /><span class="ach_details">' + array[i]["description"] + '</span></div><br /><br />';
			else result += '<div class="achievement locked"><span class="ach_locked">' + i + '</span><br /><span class="ach_details">' + array[i]["description"] + '</span></div><br /><br />';
		}
		
		return result;
	}
	
	show = function(text)
	{
		// If someone forget to register an achievement
		if (array[text] === "undefined") register(text);
	
		if (!array[text]["active"])
		{
			if ((typeof(array[text].icon) != "undefined") && (array[text].icon != "")) $('#achievement_box').css("background-image", "url(" + array[text].icon + ")");
			
			
			$('#status.achievement #text').html(text);
			$('#status.achievement').show();
			$('#status.achievement').css({opacity: 0.0});
			
			$('#status.achievement').animate({opacity: 1.0, bottom: '8px'}, 750);
			
			setTimeout(function() 
			{ 
			  $('#status.achievement').animate({opacity: 0.0, bottom: '-120px'}, 750, "linear", function() { $('#achievement_box').hide(); });
			}, 3000);
			
			array[text].active = true;
		}
		
		if (window.localStorage) window.localStorage[_localStorageKey] = JSON.stringify(array);
	};
	
	return {
		initialize: initialize,
		getCount: getCount,
		getUnlockedCount: getUnlockedCount,
		list: list,
		register: register,
		show: show
	};
}();


