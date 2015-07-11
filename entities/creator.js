/**
 * JavaScript
 * 
 * Hit To Bet - Creator.js
 * Created by Christoph Lipphart on 11th July 2015
 * (c) Copyright 2015 Christoph Lipphart
 */

GCreator = (function ()
{
	var c = {};

	function CreateWorm(BodyImg, SocleImg, Config, IsLeft, Weapon)
	{
		var socle = null;
		if (SocleImg)
		{
			socle = new GSocle(SocleImg, Math.random(), Config, IsLeft);
		}

		var bodyL = new GBody(BodyImg, Config, IsLeft);
		return new Worm(bodyL, socle, Weapon, Config, IsLeft);
	}

	c.CreateLefti = function(IsLeft, HasSocle, Weapon)
	{
		var SocleImg = (HasSocle?GImages.Lefti_socle:null);
		return CreateWorm(GImages.Lefti, SocleImg, GConfig.Lefti, IsLeft, Weapon);
	};

	c.CreateSchleimi = function(IsLeft, HasSocle, Weapon)
	{
		var SocleImg = (HasSocle?GImages.Schleimi_socle:null);
		return CreateWorm(GImages.Schleimi, SocleImg, GConfig.Schleimi, IsLeft, Weapon);
	};

	c.CreateStarki = function(IsLeft, HasSocle, Weapon)
	{
		var SocleImg = (HasSocle?GImages.Starki_socle:null);
		return CreateWorm(GImages.Starki, SocleImg, GConfig.Starki, IsLeft, Weapon);
	};

	c.CreateHammer = function(IsLeft)
	{
		return new GWeapon(GImages.Hammer, GConfig.Hammer, IsLeft);
	};

	c.CreateSchlag = function(IsLeft)
	{
		return new GWeapon(GImages.Schlag, GConfig.Schlag, IsLeft);
	};

	c.CreateStock = function(IsLeft)
	{
		return new GWeapon(GImages.Stock, GConfig.Stock, IsLeft);
	};


	return c;

})();