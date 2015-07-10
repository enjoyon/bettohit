/**
 * JavaScript
 * 
 * Hit To Bet - Game.js
 * Created by Christoph Lipphart on 9th July 2015
 * (c) Copyright 2015 Christoph Lipphart
 */

GWorld = (function()
{
	var world = {};

	var foreground;
	var background;

	var stuffToLoad = 2;

	var onLoaded = null;

	world.Floor = {
		Y : 470,
		LeftWormX : 305,
		RightWormX : 540,
	};

	world.GameObjectsContainer = null;

	/**
	 * Called when images for the world are loaded
	 */
	function setupStage()
	{
		foreground.Shape.y = 600 - foreground.Image.height;

		var displayObject = GCore.GetStage().addChild(background.Shape);
		GCore.GetStage().setChildIndex( displayObject, GCore.GetStage().getNumChildren()-1);

		world.GameObjectsContainer = new createjs.Container();

		GCore.AddDisplayObject(background.Shape);
		GCore.AddDisplayObject(world.GameObjectsContainer);
		GCore.AddDisplayObject(foreground.Shape);
	}

	/**
	 * Called when all resources for the world are loaded
	 */
	function loaded()
	{
		--stuffToLoad;
		if (stuffToLoad <= 0)
		{
			setupStage();
			if (onLoaded)
			{
				onLoaded();
			}
		}
	}

	function createImagePlane(Path)
	{
		var plane = {};

		var img = new Image();
		img.onload = loaded;
		img.src = Path;
		var shape = new createjs.Bitmap(img);

		plane.Image = img;
		plane.Shape = shape;

		return plane;
	}

	world.Construct = function( OnLoaded )
	{
		onLoaded = OnLoaded;
		foreground = createImagePlane("assets/world/foreground.png");
		background = createImagePlane("assets/world/background.jpg");
	};

	return world;

})();

GImages = (function()
{
	var images = {};

	var lefti = null;
	var schleimi = null;
	var starki = null;

	var stuffToLoad = 0;

	onLoaded = null;

	function loaded()
	{
		console.log("Image loaded");
		--stuffToLoad;
		if (stuffToLoad <= 0 && onLoaded)
		{
			onLoaded();
		}
	}

	function createImage(Path)
	{
		var img = new Image();
		img.onload = loaded;
		img.src = Path;
		return img;
	}

	images.Construct = function( OnLoaded )
	{
		onLoaded = OnLoaded;

		stuffToLoad = 3;
		lefti		= createImage("assets/worm/Lefti.png");
		schleimi	= createImage("assets/worm/Schleimi.png");
		starki		= createImage("assets/worm/Starki.png");
	};

	images.GetLefti = function()
	{
		return lefti;
	};

	images.GetSchleimi = function()
	{
		return schleimi;
	};

	images.GetStarki = function()
	{
		return starki;
	};

	return images;

})();


GGame = (function()
{
	var game = {};

	var LinkiBody = null;

	var leftWorm = null;
	var rightWorm = null;

	var stuffToLoad = 2;

	function loaded()
	{
		--stuffToLoad;
		if (stuffToLoad <= 0)
		{
			var bodyL = new GBody(GImages.GetSchleimi(), -10, false);
			leftWorm = new Worm(bodyL);
			
			GWorld.GameObjectsContainer.addChild(bodyL.Shape);

			var bodyR = new GBody(GImages.GetStarki(), -10, true);
			rightWorm = new Worm(bodyR);

			GWorld.GameObjectsContainer.addChild(bodyR.Shape);

			GCore.Start();
		}
	}

	function loadImages()
	{
		GImages.Construct( loaded );
	}

	function createWorld()
	{
		GWorld.Construct( loaded );
	}

	/**
	 * Initializes the game
	 */
	game.Initialize = function()
	{
		createWorld();
		loadImages();
	};

	/**
	 * Update function of this game
	 * @param {Number} dt Delta time in seconds.
	 */
	game.Update = function(dt)
	{
		leftWorm.Tick(dt);
		rightWorm.Tick(dt);
	};

	return game;
})();

// register debug function
GCore.RegisterGame(GGame);