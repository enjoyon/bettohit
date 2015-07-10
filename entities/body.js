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
function GBody(Image, OffsetX, Flipped)
{
	this.Image = Image;
	this.Shape = new createjs.Bitmap(Image);
	this.IsSinking = false;

	this.Shape.y = GWorld.Floor.Y - this.Image.height;

	this.Height = this.Image.height;
	this.Width = this.Image.width;

	if (Flipped)
	{
		this.Shape.scaleX = -1;
		this.Shape.x = GWorld.Floor.RightWormX + (this.Image.width * 0.5) - OffsetX;
	}
	else
	{
		this.Shape.x = GWorld.Floor.LeftWormX - (this.Image.width * 0.5) + OffsetX;
	}

	this.IsFlipped = Flipped;
}

/**
 * Sets the y position of the worm seeing it 
 * as length of the worm which is out of the floor.
 * @param {Number} length	The length of the worm.
 */
GBody.prototype.SetLength = function(length)
{
	this.Shape.y = length;
};

GBody.prototype.GetLength = function()
{
	return this.Shape.y;
};

/**
 * Sets the body to be sinking.
 * TODO: Change the face
 */
GBody.prototype.SetIsSinking = function( IsSinking )
{
	this.IsSinking = IsSinking;
};

GBody.prototype.Tick = function( dt )
{

};