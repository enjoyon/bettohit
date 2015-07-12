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

	var assetsPath = "assets/audio/";
	var sounds = [
		{src: "Music.ogg", id: "music"},
		{src: "Hammer.wav", id: "hammer"},
		{src: "Schlag.wav", id: "schlag"},
		{src: "Stock.wav", id: "stock"},
	];

	function OnSoundLoaded()
	{
		soundQueue = null;
		if (onLoaded)
		{
			onLoaded();
		}
	}

	function OnFileError(evt)
	{
		console.log("preload error ", evt);
		OnSoundLoaded();
	}

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
