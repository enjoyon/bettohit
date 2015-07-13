/**
 * JavaScript
 * 
 * Hit To Bet - Config.js
 * Created by Christoph Lipphart on 9th July 2015
 * (c) Copyright 2015 Christoph Lipphart
 */

/**
 * Game configuration
 */
GConfig = (function()
{
	var config = {};

	/**
	 * Configuration for the Worm
	 */
	config.Worm =
	{
		/** Determines the relation of impact volume of a weapon hit to shrinking the worm */
		ImpactVolumeToSink : -10,

		/** Determines the relation of impact volume of a weapon hit to paralysed */
		ImpactVolumeToParalysedTime: 0.01,

		/** Determines the minimum limit of a paralysed state of the worm in seconds */
		MinParalysedTime : 0,

		/** Determines the maximum limit of a paralysed state of the worm in seconds */
		MaxParalysedTime : 2,

		/** Determines the speed of the sinking when the worm was hit */
		SinkingSpeed : 4,
	};

	/**
	 * Configuration of the world 
	 */
	config.World =
	{
		// Position offset of the lamp
		LampOffsetX :   10,
		LampOffsetY :  -70,

		// World Floor information
		WormGroundY : 470,
		LeftWormX	: 305,
		RightWormX	: 540,
	};

	/**
	 * Configuration of the Lefti worm
	 */
	config.Lefti =
	{
		OffsetY: 0,
		LeftOffset  : -40,
		RightOffset :  35,

		Socle :
		{
			OffsetY : -42,
			LeftOffset : -23,
			RightOffset : 20,
		},

		WeaponOffsetX : 0,
		WeaponOffsetY : 0,
		ImpactEffect  : 1,
		DeathY : 60,
	};

	/**
	 * Configuration of the Schleimi worm
	 */
	config.Schleimi =
	{
		OffsetY : 0,
		LeftOffset  : -30,
		RightOffset :  5,

		Socle :
		{
			OffsetY : -7,
			LeftOffset : -23,
			RightOffset : 40,
		},

		WeaponOffsetX : 0,
		WeaponOffsetY : 0,
		ImpactEffect  : 0.6,
		DeathY : 40,
	};

	/**
	 * Configuration of the Starki worm
	 */
	config.Starki =
	{
		LeftOffset  : -30,
		RightOffset :  10,
		OffsetY : -15,

		Socle :
		{
			OffsetY : -42,
			LeftOffset : -23,
			RightOffset : 20,
		},

		WeaponOffsetX : 30,
		WeaponOffsetY : 0,
		ImpactEffect  : 0.9,
		DeathY : 60,
	};

	/**
	 * Configuration of the Hammer weapon
	 */
	config.Hammer =
	{
		Strength : 3,
		CoolDown : 4,
		BaseRotation : 145,
		LOffsetX : 80,
		LOffsetY : -100,
		ROffsetX : 80,
		ROffsetY : -100,
		IsBackground : true,
		AttackAngle : 50,
		ReadyAngle : 200,
		Sound: "hammer",
		SoundDelay: 200,
	};

	/**
	 * Configuration of the Schlag weapon
	 */
	config.Schlag =
	{
		Strength : 2.5,
		CoolDown : 1,
		BaseRotation : 30,
		LOffsetX: 100,
		LOffsetY: -20,
		ROffsetX: 40,
		ROffsetY: -25,
		IsBackground : false,
		AttackAngle : 20,
		ReadyAngle : 155,
		Sound: "schlag",
		SoundDelay: 50,
	};

	/**
	 * Configuration of the Stock weapon
	 */
	config.Stock =
	{
		Strength : 1.5,
		CoolDown : 0.1,
		BaseRotation : 30,
		LOffsetX: 100,
		LOffsetY: -15,
		ROffsetX: 50,
		ROffsetY: -15,
		IsBackground : false,
		AttackAngle : 10,
		ReadyAngle : 150,
		Sound: "stock",
		SoundDelay: 200,
	};

	return config;

})();
