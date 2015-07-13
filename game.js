/**
 * JavaScript
 * 
 * Hit To Bet - Game.js
 * Created by Christoph Lipphart on 9th July 2015
 * (c) Copyright 2015 Christoph Lipphart
 */

GImages = (function()
{
	var images = {};

	images.Lefti = null;
	images.Schleimi = null;
	images.Starki = null;

	images.Background = null;
	images.Foreground = null;

	stuffToLoad = 0;

	onLoaded = null;

	function loaded()
	{
		stuffToLoad = stuffToLoad - 1;
		if (stuffToLoad <= 0 && onLoaded)
		{
			console.log("Images loaded.");
			onLoaded();
		}
	}

	function error()
	{
		console.log("Error in loading an image.");
		loaded();
	}

	function createImage(Path)
	{
		++stuffToLoad;

		var img = new Image();
		img.onload = loaded;
		img.onerror = loaded;
		img.src = Path;
		return img;
	}

	images.Initialize = function( OnLoaded )
	{
		onLoaded = OnLoaded;

		stuffToLoad = 1; // prevent onLoaded call before all images are ready

		images.Lefti		= createImage("assets/worm/Lefti.png");
		images.Schleimi		= createImage("assets/worm/Schleimi.png");
		images.Starki		= createImage("assets/worm/Starki.png");

		images.Lefti_socle		= createImage("assets/worm/Lefti-Socle.png");
		images.Schleimi_socle	= createImage("assets/worm/Schleimi-Socle.png");
		images.Starki_socle		= createImage("assets/worm/Starki-Socle.png");

		images.Background	= createImage("assets/world/background.jpg");
		images.Foreground	= createImage("assets/world/foreground.png");
		images.Lamp			= createImage("assets/world/small-lamp.png");

		images.Hammer	= createImage("assets/weapons/hammer.png");
		images.Schlag	= createImage("assets/weapons/schlag.png");
		images.Stock	= createImage("assets/weapons/stock.png");

		// HUD
		images.BetBtns		= createImage("assets/hud/bet-buttons.png");
		images.MoneyBtns	= createImage("assets/hud/money-change-buttons.png");
		images.CurrentBet	= createImage("assets/hud/current-bet.png");
		images.WormBet		= createImage("assets/hud/wormbet.png");
		images.YourMoney	= createImage("assets/hud/yourmoney.png");
		images.Multiplier	= createImage("assets/hud/multiplier.png");

		// FX
		images.Stars		= createImage("assets/fx/stars.png");

		loaded(); // clear the extra token
	};

	return images;
})();

GGame = (function()
{
	var game = {};

	var LinkiBody = null;

	var leftWorm = null;
	var leftWeapon = null;

	var rightWorm = null;
	var rightWeapon = null;

	game.stuffToLoad = 2;

	var wormWhoWantsToAttack = null;

	game.IsSomeoneAttacking = false;

	var IsGameOver = false;
	var messageField = null;
	var Looser = null;

	function GetRandomWeapon(IsLeft)
	{
		var x = Math.random();
		if (x < 0.3333333)
		{
			return GCreator.CreateHammer(IsLeft);
		}
		else if (x < 0.666666)
		{
			return GCreator.CreateStock(IsLeft);
		}
		else
		{
			return GCreator.CreateSchlag(IsLeft);
		}
	}

	function GetRandomWorm(IsLeft, Weapon)
	{
		var x = Math.random();
		if (x < 0.3333333)
		{
			return GCreator.CreateStarki(IsLeft, false, Weapon);
		}
		else if (x < 0.666666)
		{
			return GCreator.CreateSchleimi(IsLeft, false, Weapon);
		}
		else
		{
			return GCreator.CreateLefti(IsLeft, false, Weapon);
		}
	}

	game.GameOver = function( looser )
	{
		GHud.EarnMoney( looser != leftWorm );
		Looser = looser;
		IsGameOver = true;
	};

	game.InitializeRound = function()
	{
		if (rightWorm)
		{
			rightWorm.Destruct();
		}
		if (leftWorm)
		{
			leftWorm.Destruct();
		}
		rightWeapon = GetRandomWeapon(false);
		rightWorm = GetRandomWorm(false, rightWeapon);
		
		leftWeapon = GetRandomWeapon(true);
		leftWorm = GetRandomWorm(true, leftWeapon);

		// Initialize weapons
		leftWeapon.SetOwner(leftWorm);
		leftWeapon.SetOpponent(rightWorm);
		rightWeapon.SetOwner(rightWorm);
		rightWeapon.SetOpponent(leftWorm);
	};

	function setupGame()
	{
		// create world
		GWorld.Construct();

		// create particle system
		GParticles.Construct();

		// Create HUD
		GHud.Construct();
		
		game.InitializeRound();

		GCore.Start();

		var ppc = new createjs.PlayPropsConfig().set({loop: -1});
		createjs.Sound.play("music", ppc);
	}

	function loaded()
	{
		game.stuffToLoad = game.stuffToLoad - 1;
		if (game.stuffToLoad == 0)
		{
			GCore.GetStage().removeChild(messageField);
			messageField = null;
			setupGame();
		}
	}

	function loadImages()
	{
		GImages.Initialize( loaded );
	}

	function loadSound()
	{
		GSound.Initialize( loaded );
	}

	game.IsSomeoneAttacking = function()
	{
		return (rightWeapon.IsAttacking || leftWeapon.IsAttacking);
	};

	/**
	 * Initializes the game
	 */
	game.Initialize = function()
	{
		// a message on our stage that we use to let the user know what is going on.
		messageField = new createjs.Text("Loading", "bold 24px Arial", "#FFFFFF");
		messageField.maxWidth = 1000;
		messageField.textAlign = "center";  // NOTE this puts the registration point of the textField at the center
		messageField.x = 400;
		messageField.y = 300;
		GCore.GetStage().addChild(messageField);
		//update the stage to show text
		GCore.GetStage().update();

		loadImages();
		loadSound();
	};

	game.WormFinished = function( worm )
	{
		if (leftWorm === worm) leftWorm = null;
		if (rightWorm === worm) rightWorm = null;

		if (leftWorm === null && rightWorm === null)
		{
			game.InitializeRound();
		}
	};

	/**
	 * Update function of this game
	 * @param {Number} dt Delta time in seconds.
	 */
	game.Update = function(dt)
	{
		if (IsGameOver)
		{
			leftWorm.DoEnd(Looser !== leftWorm);
			rightWorm.DoEnd(Looser !== rightWorm);
			IsGameOver = false;
		}

		if (leftWorm)	leftWorm.Tick(dt);
		if (rightWorm)	rightWorm.Tick(dt);

		GParticles.Tick(dt);

		if (wormWhoWantsToAttack)
		{
			wormWhoWantsToAttack.DoAttack();
			wormWhoWantsToAttack = null;
		}


	};

	/**
	 * Gets the opponent worm to provided worm.
	 * If it is the left worm, return the right worm 
	 * and vice versa.
	 */
	game.GetOpponent = function( worm )
	{
		if (worm === leftWorm) return rightWorm;
		if (worm === rightWorm) return leftWorm;
		return null;
	};

	game.PushWishToAttack = function( worm )
	{
		if (game.IsSomeoneAttacking()) return;

		if (wormWhoWantsToAttack === null)
		{
			wormWhoWantsToAttack = worm;
		}
		else if (Math.random() > 0.5)
		{
			wormWhoWantsToAttack = worm;
		}
	};

	return game;
})();

// register debug function
GCore.RegisterGame(GGame);