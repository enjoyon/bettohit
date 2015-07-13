/**
 * JavaScript
 * 
 * Hit To Bet - Sound.js
 * Created by Christoph Lipphart on 11th July 2015
 * (c) Copyright 2015 Christoph Lipphart
 */
 
GSound = (function()
{
	var s = {};

	var onLoaded = null;
	var soundQueue = null;

	s.stuffToLoad = 4;

	var assetsPath = "assets/audio/";
	var sounds = [
		{src: "Music.mp3", id: "music"},
		{src: "Hammer.mp3", id: "hammer"},
		{src: "Schlag.mp3", id: "schlag"},
		{src: "Stock.mp3", id: "stock"},
	];

	/**
	 * Called if a sound file was loaded
	 */
	function OnSoundLoaded()
	{
		s.stuffToLoad = s.stuffToLoad - 1;
		if (s.stuffToLoad == 0)
		{
			soundQueue = null;
			if (onLoaded) onLoaded();
		}
	}

	/**
	 * Called if a sound file cannot be loaded
	 */
	function OnFileError(evt)
	{
		console.log("preload error ", evt);
		OnSoundLoaded();
	}

	/**
	 * Setups the sound module and starts to load
	 * the required audio files.
	 * 
	 * @param {function} loaded A callback function which will be called
	 *  if all audio files are loaded.
	 */
	s.Initialize = function( loaded )
	{
		onLoaded = loaded;

		if (!createjs.Sound.initializeDefaultPlugins())
		{
			document.getElementById("no-audio").style.display = "block";
			if (onLoaded)
			{
				onLoaded();
			}
			return;
		}
		// add other extensions to try loading if the src file extension is not supported
		createjs.Sound.alternateExtensions = ["mp3"];

		// add an event listener for when load is completed
		createjs.Sound.addEventListener("fileload", OnSoundLoaded);
		createjs.Sound.registerSounds(sounds, assetsPath);

		/*
		// Instantiate a queue to preload our assets
		soundQueue = new createjs.LoadQueue(true, assetsPath);
		soundQueue.installPlugin(createjs.Sound);
		soundQueue.addEventListener("complete", OnSoundLoaded);
		soundQueue.addEventListener("error", OnFileError);
		soundQueue.loadManifest(sounds);
		*/
	};

	return s;

})();
