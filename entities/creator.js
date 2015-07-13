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

	/**
	 * Creates a new instance of a worm.
	 * 
	 * @param {GBody} The body of the worm
	 * @param [{Image} SocleImg] The socle image for the socle
	 * @param {GConfig} Config The config object for the worm
	 * @param {boolean} IsLeft 
	 * 						true to create a worm for the left side, 
	 * 						false to create one for the right side
	 * @param {GWeapon} Weapon The weapon for the worm.
	 * 
	 * @return A new Worm instance.
	 */
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

	/**
	 * Creates a new instance of the Lefti worm.
	 * 
	 * @param {boolean} IsLeft 
	 * 						true to create a worm for the left side, 
	 * 						false to create one for the right side
	 * @param {boolean} HasSocle
	 * 						true to give the worm a socle
	 * @param {GWeapon} Weapon The weapon for the worm.
	 * 
	 * @return A new Worm instance representing the Lefti.
	 */
	c.CreateLefti = function(IsLeft, HasSocle, Weapon)
	{
		var SocleImg = (HasSocle?GImages.Lefti_socle:null);
		return CreateWorm(GImages.Lefti, SocleImg, GConfig.Lefti, IsLeft, Weapon);
	};

	/**
	 * Creates a new instance of the Schleimi worm.
	 * 
	 * @param {boolean} IsLeft 
	 * 						true to create a worm for the left side, 
	 * 						false to create one for the right side
	 * @param {boolean} HasSocle
	 * 						true to give the worm a socle
	 * @param {GWeapon} Weapon The weapon for the worm.
	 * 
	 * @return A new Worm instance representing the Schleimi.
	 */
	c.CreateSchleimi = function(IsLeft, HasSocle, Weapon)
	{
		var SocleImg = (HasSocle?GImages.Schleimi_socle:null);
		return CreateWorm(GImages.Schleimi, SocleImg, GConfig.Schleimi, IsLeft, Weapon);
	};

	/**
	 * Creates a new instance of the Starki worm.
	 * 
	 * @param {boolean} IsLeft 
	 * 						true to create a worm for the left side, 
	 * 						false to create one for the right side
	 * @param {boolean} HasSocle
	 * 						true to give the worm a socle
	 * @param {GWeapon} Weapon The weapon for the worm.
	 * 
	 * @return A new Worm instance representing the Starki.
	 */
	c.CreateStarki = function(IsLeft, HasSocle, Weapon)
	{
		var SocleImg = (HasSocle?GImages.Starki_socle:null);
		return CreateWorm(GImages.Starki, SocleImg, GConfig.Starki, IsLeft, Weapon);
	};

	/**
	 * Creates a new instance of the Hammer weapon.
	 * 
	 * @param {boolean} IsLeft 
	 * 						true to create a weapon for the left worm, 
	 * 						false to create one for the right worm
	 * 
	 * @return A new Weapon instance representing the Hammer.
	 */
	c.CreateHammer = function(IsLeft)
	{
		return new GWeapon(GImages.Hammer, GConfig.Hammer, IsLeft);
	};

	/**
	 * Creates a new instance of the Schlag weapon.
	 * 
	 * @param {boolean} IsLeft 
	 * 						true to create a weapon for the left worm, 
	 * 						false to create one for the right worm
	 * 
	 * @return A new Weapon instance representing the Schlag.
	 */
	c.CreateSchlag = function(IsLeft)
	{
		return new GWeapon(GImages.Schlag, GConfig.Schlag, IsLeft);
	};

	/**
	 * Creates a new instance of the Stock weapon.
	 * 
	 * @param {boolean} IsLeft 
	 * 						true to create a weapon for the left worm, 
	 * 						false to create one for the right worm
	 * 
	 * @return A new Weapon instance representing the Stock.
	 */
	c.CreateStock = function(IsLeft)
	{
		return new GWeapon(GImages.Stock, GConfig.Stock, IsLeft);
	};


	return c;

})();