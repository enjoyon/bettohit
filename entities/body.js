/**
 * JavaScript
 * 
 * Hit To Bet - body.js
 * Created by Christoph Lipphart on 10th July 2015
 * (c) Copyright 2015 Christoph Lipphart
 */

/**
 * Creates a new Worm
 * @param {HTMLImage} Image a loaded image for the body
 */
function GBody(Image, Config, IsLeft)
{
	this.Image = Image;
	this.Visual = new createjs.Bitmap(Image);
	this.IsSinking = false;

	this.Visual.y = GConfig.World.WormGroundY - this.Image.height + Config.OffsetY;

	this.Height = this.Image.height;
	this.Width = this.Image.width;

	if (IsLeft)
	{
		this.Visual.x = GConfig.World.LeftWormX - (this.Image.width * 0.5) + Config.LeftOffset;
	}
	else
	{
		this.Visual.scaleX = -1;
		this.Visual.x = GConfig.World.RightWormX + (this.Image.width * 0.5) + Config.RightOffset;
	}

	this.IsLeft  = IsLeft;
	this.IsRight = !IsLeft;
}

/**
 * Sets the y position of the worm seeing it 
 * as length of the worm which is out of the floor.
 * @param {Number} length	The length of the worm.
 */
GBody.prototype.SetLength = function(length)
{
	this.Visual.y = length;
};

/**
 * Gets the Y location of the worm = length of worm which is out of the hole
 */
GBody.prototype.GetLength = function()
{
	return this.Visual.y;
};

/**
 * Sets the body to be sinking.
 * TODO: Change the face
 */
GBody.prototype.SetIsSinking = function( IsSinking )
{
	this.IsSinking = IsSinking;
};

/**
 * Ticks the body
 */
GBody.prototype.Tick = function( dt )
{
	// nothing to do here at the moment
};
