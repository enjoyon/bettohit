/**
 * JavaScript
 * 
 * Hit To Bet - worm.js
 * Created by Christoph Lipphart on 9th July 2015
 * (c) Copyright 2015 Christoph Lipphart
 */

/**
 * Creates a new Worm
 * @param Body:GBody the body of the worm
 */
function Worm(Body, Socle, Weapon, Config, IsLeft)
{
	this.Weapon = Weapon;
	this.Socle = Socle;
	this.Body = Body;
	this.Config = Config;

	this.Visual = new createjs.Container();

	this.Paralysed = 0;
	this.IsReady = false;
	this.IsSinking = false;
	this.IsLeft = IsLeft;

	// Add Visuals to the Stage
	if (this.Body)
	{
		GWorld.AddGameObjectVisual(this.Body.Visual);
	}
	if (this.Socle)
	{
		GCore.AddVisual(this.Socle.Visual);
	}
	if (this.Weapon)
	{
		GWorld.AddGameObjectVisual(this.Weapon.Visual);
	}

	this.DoIdle();
}

Worm.OnIdleFinished = function( self )
{
	self.IsReady = true;
};

Worm.OnEndFinished = function( self )
{
	self.Destruct();
	self.IsReady = false;
	GGame.WormFinished( self );
};

Worm.prototype.DoEnd = function()
{
	this.IsReady = false;

	var finalPosition = 600 + this.Body.Height;

	createjs.Tween.get(this.Body.Visual, {}, true)
		.to({y : finalPosition}, 500, createjs.Ease.quadIn)
		.call(Worm.OnEndFinished, [this]);
};

Worm.prototype.DoIdle = function()
{
	this.IsReady = false;

	var finalPosition = this.Body.Visual.y;

	var y = 600 + this.Body.Height;
	this.Body.Visual.y = y;

	createjs.Tween.get(this.Body.Visual, {}, true)
		.to({y : finalPosition}, 2000, createjs.Ease.quadInOut)
		.call(Worm.OnIdleFinished, [this]);
};

Worm.prototype.GetWeaponPositionX = function()
{
	if (this.IsLeft)
	{
		return this.Body.Visual.x + this.Body.Image.width * 0.5 + this.Config.WeaponOffsetX;
	}
	else
	{
		return this.Body.Visual.x - this.Body.Image.width * 0.5 - this.Config.WeaponOffsetX;
	}
};

Worm.prototype.GetWeaponPositionY = function()
{
	return this.Body.Visual.y + this.Body.Image.height * 0.5 + this.Config.WeaponOffsetY;
};

Worm.prototype.Destruct = function()
{
	if (this.Body)
	{
		GWorld.RemoveGameObjectVisual(this.Body.Visual);
	}
	if (this.Socle)
	{
		GCore.RemoveVisual(this.Socle.Visual);
	}
	if (this.Weapon)
	{
		GWorld.RemoveGameObjectVisual(this.Weapon.Visual);
	}
};

/**
 * Ticks this worm and all its components
 */
Worm.prototype.Tick = function (dt)
{
	this.Attack();

	/* TEST:
	if (this.IsReady && this.IsLeft)
	{
		this.Sink(dt * 10);
	}
	*/

	if (this.IsReady)
	{
		var length = GMath.Limit(GConfig.World.WormGroundY - this.Body.Visual.y, 0, this.Body.Image.height);
		var relativeLength = length / this.Body.Image.height;
		if (relativeLength < 0.5) relativeLength = 0.5;
		relativeLength *= 2;

		// Set differently because the opponent is that worth
		if (this.IsLeft)
		{
			GHud.SetRightMultiplier(relativeLength);
		}
		else
		{
			GHud.SetLeftMultiplier(relativeLength);
		}
	}

	// Update components
	if (this.Weapon)
	{
		this.Weapon.Tick( this, dt );
	}
	if (this.Socle)
	{
		this.Socle.Tick(dt);
	}
	if (this.Body)
	{
		this.Body.Tick(dt);
	}
};

Worm.prototype.CanAttack = function()
{
	return (this.IsReady && (!this.IsSinking));
};

/**
 * Tries to initialize a fight with the weapon
 */
Worm.prototype.Attack = function()
{
	if (this.Weapon && this.CanAttack())
	{
		GGame.PushWishToAttack( this );
	}
};

/**
 * Tries to fight with the weapon
 */
Worm.prototype.DoAttack = function()
{
	if (this.Weapon && this.CanAttack())
	{
		this.Weapon.Attack();
	}
};

Worm.OnSinkingFinished = function( self )
{
	self.IsSinking = false;
};

/**
 * Sinks this Worm into the ground
 */
Worm.prototype.Sink = function( impactVolume )
{
	var sinkImpact = impactVolume * GConfig.Worm.ImpactVolumeToSink;
	var sinkTo = this.Body.Visual.y - sinkImpact;
	
	this.IsSinking = true;

	createjs.Tween.get(this.Body.Visual, {}, true)
		.to({y : sinkTo}, 300, createjs.Ease.quadOut)
		.call(Worm.OnSinkingFinished, [this]);

	
	// this.Body.Visual.y = sinkTo;

	if (sinkTo > (GConfig.World.WormGroundY - this.Config.DeathY))
	{
		GGame.GameOver( this );
	}
};

/**
 * Called when an opponent hits this worm with its weapon.
 * @param Opponent:Worm	The opponent which executes the fight.
 */
Worm.prototype.ReceiveImpact = function( ImpactVolume )
{
	ImpactVolume = ImpactVolume * 0.5 + Math.random() * ImpactVolume * this.Config.ImpactEffect;

	// Bad impact
	if (Math.random() < 0.2)
	{
		ImpactVolume *= 2;
	}

	// Limit the impact using the sole
	if (this.Socle)
	{
		ImpactVolume = this.Socle.LimitImpact(ImpactVolume);
	}

	this.Sink( ImpactVolume );
};

