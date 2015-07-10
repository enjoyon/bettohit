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
		ImpactVolumeToSink : 1,

		/** Determines the relation of impact volume of a weapon hit to paralysed */
		ImpactVolumeToParalysedTime: 0.01,

		/** Determines the minimum limit of a paralysed state of the worm in seconds */
		MinParalysedTime : 0,

		/** Determines the maximum limit of a paralysed state of the worm in seconds */
		MaxParalysedTime : 2,

		/** Determines the speed of the sinking when the worm was hit */
		SinkingSpeed : 4,
	};

	return config;

})();
