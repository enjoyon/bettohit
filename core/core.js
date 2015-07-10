/**
 * JavaScript
 * 
 * Hit To Bet - Core.js
 * Created by Christoph Lipphart on 9th July 2015
 * (c) Copyright 2015 Christoph Lipphart
 */

/**
 * Game core of Bet to Hit
 */
GCore = (function(){

	var core = {};
	
	var running = false;
	var interval = null;
	var lastUpdate = 0;

	var canvasOuter = null;
	var canvas = null;

	var stage = null;

	var deltatime = 0;
	var time = 0;

	// ///////////////////////////////////////////////////
	// public:
	// ///////////////////////////////////////////////////

	/**
	 * Starts the core ticking
	 */
	core.Start = function()
	{
		// Pretend calling set interval twice 
		if (running === false)
		{
			running = true;
			interval = window.setInterval(tick, 16);
			//start game timer
			lastUpdate = Date.now();
			time = 0;
		}
	};

	/**
	 * Stops the core ticking
	 */
	core.Stop = function()
	{
		if (running)
		{
			running = false;
			window.clearInterval(interval);
		}
	};

	/**
	 * Get the current time in seconds.
	 */
	core.GetTime = function()
	{
		return time;
	};

	/**
	 * Get the current delta time in seconds.
	 */
	core.GetDeltaTime = function()
	{
		return deltatime;
	};

	// ///////////////////////////////////////////////////
	// private:
	// ///////////////////////////////////////////////////
	
	/**
	 * Updates the core
	 * 
	 * @param deltatime:float	Delta time since last update in seconds
	 */
	function update(dt)
	{
		deltatime = dt;
		time += dt;
		
		
	}

	/**
	 * Renders the object in the canvas
	 * 
	 * @param deltatime:float Delta time since last rendering in seconds
	 */
	function render(dt)
	{
		deltatime = dt;
		stage.update();
	}

	/**
	 * Tick function of the core
	 * Updates everything
	 */
	function tick()
	{
		var now = Date.now();
		var dt = now - lastUpdate;
		lastUpdate = now;
		
		// ensure a delta time of max 50 milliseconds for the update
		if (dt > 50)
		{
			var cdt = 17;
			var total = dt;

			while(total > 0)
			{
				if (cdt > total)
				{
					cdt = total;
				}
				update(cdt * 0.001);
				total = total - cdt;
			}
		}
		else
		{
			update(dt * 0.001);
		}

		// render with total delta time of tick in seconds
		render(dt * 0.001);
	}

	/**
	 * Tries to centre the canvas inside the canvas outer box
	 */
	function centerCanvas()
	{
		if (canvas && canvasOuter)
		{
			var leftMarginToCenter = (canvasOuter.innerWidth() - canvas.width()) * 0.5;
			canvas.css("margin-left", leftMarginToCenter);
		}
	}

	/**
	 * Called on resize
	 */
	function onWindowResize()
	{
		centerCanvas();
	}
	
	var resizeTimer;
	$(window).resize(function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(onWindowResize, 100);
	});

	/**
	 * Initialize the Core after document is ready
	 */
	function initialize()
	{
		stage = new createjs.Stage("canvas");

		// find canvas
		canvasOuter = $("#center-canvas");
		canvas = $("#canvas");

		centerCanvas();
	}

	// Register initialize function of the core
	$(document).ready(initialize);

	// return the public accessible core module
	return core;
})();
