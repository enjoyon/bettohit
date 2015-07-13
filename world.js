/**
 * JavaScript
 * 
 * Hit To Bet - World.js
 * Created by Christoph Lipphart on 11th July 2015
 * (c) Copyright 2015 Christoph Lipphart
 */

/**
 * The World contains the background and foreground.
 * It has a container for the game objects,
 * knows where the floor starts
 * and has the Lamp in the centre.
 */
GWorld = (function()
{
	var world = {};

	var foreground;
	var background;
	var lamp;

	world.GameObjectsContainer = null;
	world.FX = null;

	/**
	 * Positions the lamp
	 */
	function setupLamp()
	{
		lamp.Visual.x = 400 - (lamp.Image.width * 0.5) + GConfig.World.LampOffsetX;
		lamp.Visual.y = GConfig.World.LampOffsetY;
	}

	/**
	 * Positions the foreground
	 */
	function setupForeground()
	{
		foreground.Visual.y = 600 - foreground.Image.height;
	}

	/**
	 * Adds the created Visuals to the stage and positions it.
	 */
	function setupStage()
	{
		// add DisplayObjects to canvas
		GCore.AddVisual(background.Visual);
		GCore.AddVisual(lamp.Visual);
		GCore.AddVisual(world.GameObjectsContainer);
		GCore.AddVisual(world.FX);
		GCore.AddVisual(foreground.Visual);

		setupLamp();
		setupForeground();
	}

	/**
	 * Creates a DisplayObject/Visual for the stage of provided Image.
	 * 
	 * @param {Image} img.
	 */
	function createImagePlane(Img)
	{
		var plane = {};

		var visual = new createjs.Bitmap(Img);

		plane.Image  = Img;
		plane.Visual = visual;

		return plane;
	}

	/**
	 * Adds the provided Visual on top of the stage.
	 */
	world.AddGameObjectVisual = function( Visual )
	{
		var obj = world.GameObjectsContainer.addChild(Visual);
		// Bug fix of library to ensure that the Visual is on top of the list.
		world.GameObjectsContainer.setChildIndex( obj, world.GameObjectsContainer.getNumChildren()-1);
	};

	/**
	 * Removes the provided Visual from the stage.
	 */
	world.RemoveGameObjectVisual = function( Visual )
	{
		world.GameObjectsContainer.removeChild(Visual);
	};

	/**
	 * Creates the world
	 * @attention Call it only if the images for the world are loaded!
	 */
	world.Construct = function()
	{
		foreground	= createImagePlane(GImages.Foreground);
		background	= createImagePlane(GImages.Background);
		lamp		= createImagePlane(GImages.Lamp);

		world.GameObjectsContainer = new createjs.Container();
		world.FX = new createjs.Container();

		setupStage();
	};

	return world;

})();