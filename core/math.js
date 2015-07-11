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

	var errortollerance = 0.1;

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

	/**
	 * Formats a number
	 * http://phpjs.org/functions/number_format/
	 */
	math.Format = function(number, decimals, dec_point, thousands_sep)
	{
		number = (number + '')
		.replace(/[^0-9+\-Ee.]/g, '');
		var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		s = '',
		toFixedFix = function(n, prec) {
		  var k = Math.pow(10, prec);
		  return '' + (Math.round(n * k) / k)
		    .toFixed(prec);
		};
		// Fix for IE parseFloat(0.55).toFixed(0) = 0;
		s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
		.split('.');
		if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
		}
		if ((s[1] || '')
		.length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1)
		  .join('0');
		}
		return s.join(dec);
	};

	// return the public accessible math module
	return math;

})();

/**
 * decimal_sep: character used as deciaml separtor, it defaults to '.' when omitted
 * thousands_sep: char used as thousands separator, it defaults to ',' when omitted
 * 
 * http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
 */
Number.prototype.toMoney = function(decimals, decimal_sep, thousands_sep)
{
   var n = this,
   c = isNaN(decimals) ? 2 : Math.abs(decimals), //if decimal is zero we must take it, it means user does not want to show any decimal
   d = decimal_sep || '.', //if no decimal separator is passed we use the dot as default decimal separator (we MUST use a decimal separator)

   /*
   according to [http://stackoverflow.com/questions/411352/how-best-to-determine-if-an-argument-is-not-sent-to-the-javascript-function]
   the fastest way to check for not defined parameter is to use typeof value === 'undefined' 
   rather than doing value === undefined.
   */
   t = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep, //if you don't want to use a thousands separator you can pass empty string as thousands_sep value

   sign = (n < 0) ? '-' : '',

   //extracting the absolute value of the integer part of the number and converting to string
   i = parseInt(n = Math.abs(n).toFixed(c)) + '',

   j = ((j = i.length) > 3) ? j % 3 : 0;
   return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
}
