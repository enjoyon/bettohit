/**
 * JavaScript
 * 
 * Hit To Bet - Particles.js
 * Created by Christoph Lipphart on 11th July 2015
 * (c) Copyright 2015 Christoph Lipphart
 */

/**
 * Game core of Bet to Hit
 */
GParticles = (function()
{
	var p = {};

	var sprite = null;

	p.Construct = function()
	{
		// Sprite sheet data
		var data = {
			images: [GImages.Stars],
			frames: {width: 21, height: 23, regX: 10, regY: 11}
		};

		// set up an animation instance, which we will clone
		sprite = new createjs.Sprite(new createjs.SpriteSheet(data));
	};

	function addSparkles(count, x, y, speed, speedY)
	{
		//create the specified number of sparkles
		for (var i = 0; i < count; i++) {
			
			var sparkle = sprite.clone();

			// set display properties
			sparkle.x = x;
			sparkle.y = y;
			sparkle.alpha = Math.random() * 0.5 + 0.5;
			sparkle.scaleX = sparkle.scaleY = Math.random() + 0.3;

			// set up velocities
			var a = Math.PI * 2 * Math.random();
			var v = (Math.random() - 0.5) * 30 * speed;
			sparkle.vX = Math.cos(a) * v;
			sparkle.vY = Math.sin(a) * v + speedY;
			sparkle.vS = (Math.random() - 0.5) * 0.2; // scale
			sparkle.vA = -Math.random() * 0.05 - 0.01; // alpha

			// start the animation on a random frame
			sparkle.gotoAndPlay(Math.random() * sparkle.spriteSheet.getNumFrames());

			// add to the display list
			GWorld.FX.addChild(sparkle);
		}
	}

	p.Attack = function (x, y)
	{
		addSparkles(Math.random() * 100 + 20 | 0, x, y, 1, 0);
	}

	function WinParticles(x, y)
	{
		addSparkles(Math.random() * 200 + 1 | 0, x, y, 1, -20);
	}

	p.Win = function (x, y)
	{
		WinParticles(x, y);
		setTimeout(WinParticles, 10, x, y);
		setTimeout(WinParticles, 50, x, y);
		setTimeout(WinParticles, 100, x, y);
		setTimeout(WinParticles, 200, x, y);
		setTimeout(WinParticles, 300, x, y);
		setTimeout(WinParticles, 500, x, y);
		setTimeout(WinParticles, 700, x, y);
	}

	p.Tick = function(dt)
	{
		// loop through all of the active sparkles on stage:
		var l = GWorld.FX.getNumChildren();
		var m = dt * 50;
		for (var i = l - 1; i >= 0; i--) 
		{
			var sparkle = GWorld.FX.getChildAt(i);
			var preY = sparkle.y;

			// apply gravity and friction
			sparkle.vY += 0.8 * m;
			sparkle.vX *= 0.98 * m;

			// update position, scale, and alpha:
			sparkle.x += sparkle.vX * m;
			sparkle.y += sparkle.vY * m;
			sparkle.scaleX = sparkle.scaleY = sparkle.scaleX + sparkle.vS * m;
			sparkle.alpha += sparkle.vA * m;

			//remove sparkles that are off screen or not invisble
			if (GMath.IsNearlyEqual(sparkle.y, preY) || sparkle.alpha <= 0 || sparkle.y > 600) {
				GWorld.FX.removeChildAt(i);
			}
		}
	};

	return p;

})();
