/**
 * JavaScript
 * 
 * Hit To Bet - Socle.js
 * Created by Christoph Lipphart on 11th July 2015
 * (c) Copyright 2015 Christoph Lipphart
 */

/**
 * Creates a new Socle
 */
function GSocle(Image, Damping, Config, IsLeft)
{
	this.Image   = Image;
	this.Visual  = new createjs.Bitmap(Image);
	this.Damping = GMath.Limit(Damping, 0.0, 1.0);

	this.Visual.y = GConfig.World.WormGroundY - this.Image.height * 0.5 + Config.Socle.OffsetY;

	if (IsLeft)
	{
		this.Visual.x = GConfig.World.LeftWormX - (this.Image.width * 0.5) + Config.Socle.LeftOffset;
	}
	else
	{
		this.Visual.scaleX = -1;
		this.Visual.x = GConfig.World.RightWormX + (this.Image.width * 0.5) + Config.Socle.RightOffset;
	}
}

/**
 * Ticks the socle.
 * @param {Number} dt Delta time in seconds
 */
GSocle.prototype.Tick = function(dt)
{
	// Nothing to do here
};

/**
 * Limits the impact of the weapon.
 * @param {Number} Impact The impact volume of the current attack.
 * @return The reduced impact volume.
 */
GSocle.prototype.LimitImpact = (function()
{
	var LuckyArray = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];

	var Index1 = Math.round(Math.random() * LuckyArray.length);
	var Index2 = Math.round(Math.random() * LuckyArray.length);

	while(Index1 == Index2)
	{
		Index2 = Math.round(Math.random() * LuckyArray.length);
	}
	// Real function
	function reduceImpact( Impact )
	{
		++Index1;
		Index1 = Index1 % LuckyArray.length;

		var luckyvalue = LuckyArray[Index1];
		if (luckyvalue == 1)
		{
			++Index2;
			Index2 = Index2 % LuckyArray.length;
			if (LuckyArray[Index2] == 1)
			{
				return 0;
			}
		}
		
		// Reduces impact
		var result = Impact - Impact * this.Damping;
		return GMath.Limit(result, 0, Impact);
		
	}

	return reduceImpact;

})();