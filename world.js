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

	function setupLamp()
	{
		lamp.Visual.x = 400 - (lamp.Image.width * 0.5) + GConfig.World.LampOffsetX;
		lamp.Visual.y = GConfig.World.LampOffsetY;
	}

	function setupForeground()
	{
		foreground.Visual.y = 600 - foreground.Image.height;
	}

	/**
	 * Called when images for the world are loaded
	 */
	function setupStage()
	{
		// add DisplayObjects to canvas
		GCore.AddVisual(background.Visual);
		GCore.AddVisual(world.GameObjectsContainer);
		GCore.AddVisual(lamp.Visual);
		GCore.AddVisual(foreground.Visual);

		setupLamp();
		setupForeground();
	}

	function createImagePlane(Img)
	{
		var plane = {};

		var visual = new createjs.Bitmap(Img);

		plane.Image  = Img;
		plane.Visual = visual;

		return plane;
	}

	world.AddGameObjectVisual = function( Visual )
	{
		var obj = world.GameObjectsContainer.addChild(Visual);
		// Bug fix of library to ensure that the Visual is on top of the list.
		world.GameObjectsContainer.setChildIndex( obj, world.GameObjectsContainer.getNumChildren()-1);
	};

	world.RemoveGameObjectVisual = function( Visual )
	{
		world.GameObjectsContainer.removeChild(Visual);
	};

	world.Construct = function()
	{
		foreground	= createImagePlane(GImages.Foreground);
		background	= createImagePlane(GImages.Background);
		lamp		= createImagePlane(GImages.Lamp);

		world.GameObjectsContainer = new createjs.Container();

		setupStage();
	};

	return world;

})();