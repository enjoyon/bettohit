/**
 * JavaScript
 * 
 * Hit To Bet - Core.js
 * Created by Christoph Lipphart on 9th July 2015
 * (c) Copyright 2015 Christoph Lipphart
 */

/**
 * Math utility functions
 */
GMath = (function()
{

	var math = {};

	var errortollerance = 0.0001;

	/**
	 * Limits the value between provided min and max value.
	 */
	math.Limit = function( value, min, max )
	{
		if (value < min) return min;
		if (value > max) return max;
		return value;
	};

	math.IsNearlyEqual = function( value, target )
	{
		return (value >= target - errortollerance && value <= target + errortollerance);
	};

	/**
	 * Interpolates linear between value1 and value2 
	 * where time:0=value1 and time:1=value2
	 */
	math.Lerp = function( value1, value2, time )
	{
		return value1 + (value2 - value1) * time;
	};

	// return the public accessible math module
	return math;

})();
