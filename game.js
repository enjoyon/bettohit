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

	/**
	 * Called for each image which was loaded
	 */
	function loaded()
	{
		stuffToLoad = stuffToLoad - 1;
		if (stuffToLoad <= 0 && onLoaded)
		{
			console.log("Images loaded.");
			onLoaded();
		}
	}

	/**
	 * Called when an images cannot be loaded
	 */
	function error()
	{
		console.log("Error in loading an image.");
		loaded();
	}

	/**
	 * Creates a new Image instance, 
	 * which will be immediately loaded.
	 */
	function createImage(Path)
	{
		++stuffToLoad;

		var img = new Image();
		img.onload = loaded;
		img.onerror = loaded;
		img.src = Path;
		return img;
	}

	/**
	 * Creates all required Images for the canvas rendering.
	 * 
	 * @param {function} OnLoaded Provided function will be called
	 * when all images are loaded.
	 */
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

/**
 * Container of main game
 * Handles the initialisation of the game and the attack allowence of the worms. 
 */
GGame = (function()
{
	var game = {};

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

	/**
	 * Creates a random weapon for a worm.
	 * 
	 * @param {boolean} IsLeft 
	 * 						true determines that the weapon is for the left worm, 
	 * 						false - the weapon is for the right worm
	 */
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

	/**
	 * Creates a random worm.
	 * 
	 * @param {boolean} IsLeft 
	 * 						true determines that the worm on the left should be created
	 * 						false - the worm for the right position will be created
	 * 
	 * @param {GWeapon} Weapon The weapon for the worm.
	 */
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

	/**
	 * Called from a worm which died.
	 * 
	 * @param {Worm} The worm which died and loosed the game
	 */
	game.GameOver = function( looser )
	{
		GHud.EarnMoney( looser != leftWorm );
		Looser = looser;
		IsGameOver = true;
	};

	/**
	 * Starts a new battle round
	 */
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

	/**
	 * Setups the game after all images and sounds are loaded.
	 */
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

	/**
	 * Callback for the GImages and GSound module.
	 * If one of the modules are ready this function
	 * will be called.
	 * After all modules are loaded the main game
	 * will be initialized.
	 */
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

	/**
	 * Interface to load the images
	 */
	function loadImages()
	{
		GImages.Initialize( loaded );
	}

	/**
	 * Interface to load the sound
	 */
	function loadSound()
	{
		GSound.Initialize( loaded );
	}

	/**
	 * Determines if currently a worm is attacking.
	 */
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

	/**
	 * Called by the Worm when it finished its last animation.
	 * At the end of the round worms can play an animation after DoEnd() was called.
	 * 
	 * @param {Worm} The worm which finished the last animation.
	 */
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
	 * 
	 * @param {Worm} The worm to get the opponent to.
	 */
	game.GetOpponent = function( worm )
	{
		if (worm === leftWorm) return rightWorm;
		if (worm === rightWorm) return leftWorm;
		return null;
	};

	/**
	 * Called by a worm who wishes to attack.
	 * This function prevents that both worms 
	 * attack at the same tick.
	 * Furthermore it prevents that only the first
	 * worm (in the ticking queue) will attack
	 * if both worms want to attack at the same tick.
	 * 
	 * @param {Worm} worm The worm which wants to attack.
	 */
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