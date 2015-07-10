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
function Worm(Body)
{
	this.Weapon = null;
	this.Sole = null;
	this.Body = Body;

	this.Paralysed = 0;
	this.CurrentLength = 0;
	this.TargetLength = 0;
}

/**
 * Ticks this worm and all its components
 */
Worm.prototype.Tick = function (dt)
{
	var canFight = true;

	// If the worm was hit and the target length is lower
	if (!GMath.IsNearlyEqual(this.CurrentLength, this.TargetLength))
	{
		GMath.Lerp(this.CurrentLength, this.TargetLength, dt * GConfig.Worm.SinkingSpeed);
		if (this.Body)
		{
			this.Body.SetLength(this.CurrentLength);
		}
		this.Body.IsSinking(true);
		canFight = false;
	}
	else
	{
		this.Body.IsSinking(false);
	}

	// If the worm is paralysed
	if (this.Paralysed > 0)
	{
		this.Paralysed -= dt;
		canFight = false;
	}
	
	// Try to fight
	if (canFight)
	{
		this.Fight();
	}

	this.Weapon.Tick(dt);
	this.Sole.Tick(dt);
	this.Body.Tick(dt);
};

/**
 * Tries to fight with the weapon
 */
Worm.prototype.Fight = function()
{
	if (this.Weapon)
	{
		if (this.Weapon.CanAttack())
		{
			this.Weapon.Attack();
		}
	}
};

/**
 * Sinks this Worm into the ground
 */
Worm.prototype.Sink = function( impactVolume )
{
	var sinkImpact = impactVolume * GConfig.Worm.ImpactVolumeToSink;

	this.TargetLength = GMath.Limit(this.TargetLength - impactVolume, 0, this.TargetLength);
};

/**
 * Paralyse the worm 
 */
Worm.prototype.Paralyse = function( impactVolume )
{
	// Get the paralysed 
	var paralysedTime = impactVolume * GConfig.Worm.ImpactVolumeToParalysedTime;

	// limit the paralysed time
	this.Paralysed = GMath.Limit(paralysedTime, GConfig.Worm.MinParalysedTime, GConfig.Worm.MaxParalysedTime);
};

/**
 * Called when an opponent hits this worm with its weapon.
 * @param Opponent:Worm	The opponent which executes the fight.
 */
Worm.prototype.ReceiveImpact = function(Opponent)
{
	if (Opponent)
	{
		var impactVolume = 0;

		// What is the strength of the opponents weapon
		if (Opponent.Weapon)
		{
			impactVolume += Opponent.Weapon.GetStrength();
		}

		// Limit the impact using the sole
		if (this.Sole)
		{
			impactVolume = this.Sole.LimitImpact(impactVolume);
		}

		this.Sink( impactVolume );
		this.Paralyse( impactVolume );
	}
};

